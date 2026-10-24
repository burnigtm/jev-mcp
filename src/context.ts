import { isSafeRef, repoRoot, runGit } from "./git.js";
import { parseUnifiedDiff } from "./diff.js";
import { isTestFile } from "./diff-chunks.js";
import { redactSecrets } from "./redact.js";
import { isSensitivePath } from "./sensitive.js";
import { containsInjectionInstruction, sanitizeJudgeText } from "./untrusted.js";

/**
 * Where a changed symbol is used elsewhere in the repository. A diff shows the definition but not its callers,
 * so a correct change to a shared function looks like an unbounded blast radius to a reviewer who cannot see who
 * depends on it. The snippets are untrusted text: sanitized, redacted, and dropped if they look like
 * instructions. They are evidence for the judge only; the decision policy is unchanged, so they can lower
 * uncertainty but cannot turn a hold into an approval by themselves.
 */

export type Caller = { path: string; line?: number; text: string; symbol?: string };

export type CallerContext = {
  symbols: string[];
  callers: Caller[];
  /** Matches found before the cap. */
  total: number;
  /** Matches dropped because their text looked like an instruction. */
  withheld: number;
};

export const MAX_SYMBOLS = 8;
export const MAX_CALLERS = 20;
const PER_SYMBOL = 6;
const MAX_LINE_CHARS = 240;

const STOP_NAMES = new Set([
  "main", "init", "test", "tests", "run", "get", "set", "default", "index", "handler", "constructor", "render", "setup", "build", "start",
  "stop", "update", "create", "delete", "remove", "list", "load", "save", "data", "name", "value", "type", "types", "options", "props", "state",
  "error", "result", "item", "items", "describe", "expect", "exports", "module", "require", "import", "export", "function", "class", "self",
  "this", "args", "print", "write", "read", "open", "close", "find", "each", "call", "apply", "bind", "emit", "send", "path", "file", "line",
  "text", "node", "next", "done", "make", "from", "with", "json", "util", "utils", "helper", "helpers", "config", "log", "debug", "info",
]);

const DECLARATIONS: RegExp[] = [
  /^(?:export\s+)?(?:default\s+)?(?:async\s+)?function\*?\s+([A-Za-z_][A-Za-z0-9_]*)/,
  /^(?:export\s+)?(?:abstract\s+)?class\s+([A-Za-z_][A-Za-z0-9_]*)/,
  /^(?:export\s+)?(?:const|let|var)\s+([A-Za-z_][A-Za-z0-9_]*)\s*[:=]/,
  /^(?:export\s+)?(?:interface|type|enum)\s+([A-Za-z_][A-Za-z0-9_]*)/,
  /^(?:pub(?:\([^)]*\))?\s+)?(?:async\s+)?fn\s+([A-Za-z_][A-Za-z0-9_]*)/,
  /^(?:async\s+)?def\s+([A-Za-z_][A-Za-z0-9_]*)/,
  /^func\s+(?:\([^)]*\)\s*)?([A-Za-z_][A-Za-z0-9_]*)/,
];

const IMPORT_LINE = /^(?:import|from|use|using|package|#include|export\s*(?:\*|\{[^}]*\})\s*from)\b/;

function declaredName(line: string): string | null {
  const trimmed = line.trim();
  for (const pattern of DECLARATIONS) {
    const match = pattern.exec(trimmed);
    if (match) return match[1]!;
  }
  return null;
}

function usable(name: string): boolean {
  return name.length >= 4 && /^[A-Za-z_][A-Za-z0-9_]*$/.test(name) && !STOP_NAMES.has(name.toLowerCase());
}

/**
 * Symbols whose callers matter: names of declarations the diff removes or rewrites (their signature may have
 * changed) and the enclosing declarations named in hunk headers (their behavior changed). A name that is only
 * declared by added lines is new and has no callers yet.
 */
export function changedSymbols(diff: string): string[] {
  const parsed = parseUnifiedDiff(diff);
  if (!parsed) return [];
  const removed: string[] = [];
  const enclosing: string[] = [];
  const added = new Set<string>();
  for (const file of parsed.files) {
    if (file.binary) continue;
    for (const hunk of file.hunks) {
      const lines = hunk.split(/\r?\n/);
      const header = /^@@[^@]*@@\s?(.*)$/.exec(lines[0] ?? "")?.[1];
      const context = header ? declaredName(header) : null;
      if (context) enclosing.push(context);
      for (const line of lines.slice(1)) {
        if (line.startsWith("-")) {
          const name = declaredName(line.slice(1));
          if (name) removed.push(name);
        } else if (line.startsWith("+")) {
          const name = declaredName(line.slice(1));
          if (name) added.add(name);
        }
      }
    }
  }
  const ordered: string[] = [];
  for (const name of [...removed, ...enclosing]) if (usable(name) && !ordered.includes(name)) ordered.push(name);
  // A name only ever added is new; one that is also removed or enclosing already made the list above.
  return ordered.slice(0, MAX_SYMBOLS).filter(name => !(added.has(name) && !removed.includes(name) && !enclosing.includes(name)));
}

/** `git grep -z -n` prints `path NUL line NUL text` and a newline after each match. */
function parseGrep(output: string, ref: string | undefined): Array<{ path: string; line: number; text: string }> {
  const hits: Array<{ path: string; line: number; text: string }> = [];
  let start = 0;
  while (start < output.length) {
    const pathEnd = output.indexOf("\0", start);
    if (pathEnd < 0) break;
    const lineEnd = output.indexOf("\0", pathEnd + 1);
    if (lineEnd < 0) break;
    let textEnd = output.indexOf("\n", lineEnd + 1);
    if (textEnd < 0) textEnd = output.length;
    const path = output.slice(start, pathEnd);
    const line = Number(output.slice(pathEnd + 1, lineEnd));
    if (path && Number.isInteger(line)) hits.push({ path: ref && path.startsWith(`${ref}:`) ? path.slice(ref.length + 1) : path, line, text: output.slice(lineEnd + 1, textEnd) });
    start = textEnd + 1;
  }
  return hits;
}

export type FindOptions = {
  /** Paths changed by the diff; their own text is already in front of the judge. */
  changed?: Iterable<string>;
  /** Search this ref instead of the working tree. */
  ref?: string;
};

/** Callers of `symbols` outside the changed files, from `git grep`. Returns an empty context when git cannot answer. */
export async function findCallers(cwd: string, symbols: string[], options: FindOptions = {}): Promise<CallerContext> {
  const empty: CallerContext = { symbols: [], callers: [], total: 0, withheld: 0 };
  const names = symbols.filter(usable).slice(0, MAX_SYMBOLS);
  if (names.length === 0) return empty;
  if (options.ref !== undefined && !isSafeRef(options.ref)) return empty;
  const root = await repoRoot(cwd);
  if (!root) return empty;
  const changed = new Set([...(options.changed ?? [])].map(path => path.replace(/\\/g, "/")));

  const found: Caller[] = [];
  let withheld = 0;
  for (const symbol of names) {
    const args = ["grep", "-z", "-n", "-w", "-I", "--no-color", "--fixed-strings", "-e", symbol, ...(options.ref ? [options.ref] : [])];
    const result = await runGit(args, root, { maxBytes: 400_000 });
    // Exit 1 means no match; a size cut still yields usable leading matches.
    if (!result.ok && !result.truncated) continue;
    let taken = 0;
    for (const hit of parseGrep(result.stdout, options.ref)) {
      if (taken >= PER_SYMBOL) break;
      const path = hit.path.replace(/\\/g, "/");
      if (changed.has(path) || isSensitivePath(path) || /(^|\/)(node_modules|dist|build|vendor|\.git)\//.test(path)) continue;
      const trimmed = hit.text.trim();
      // The definition itself (in an unchanged copy) and an import of it are not uses.
      if (declaredName(trimmed) === symbol || IMPORT_LINE.test(trimmed)) continue;
      if (containsInjectionInstruction(trimmed)) {
        withheld += 1;
        continue;
      }
      found.push({ path, line: hit.line, text: redactSecrets(sanitizeJudgeText(trimmed, MAX_LINE_CHARS)).text, symbol });
      taken += 1;
    }
  }
  // Callers in ordinary code before callers in tests: tests show intent, code shows dependence.
  const sorted = [...found].sort((a, b) => Number(isTestFile(a.path)) - Number(isTestFile(b.path)));
  return { symbols: names, callers: sorted.slice(0, MAX_CALLERS), total: found.length, withheld };
}

/** Changed paths named in a unified diff (both sides of a rename). */
export function changedPaths(diff: string): string[] {
  const parsed = parseUnifiedDiff(diff);
  if (!parsed) return [];
  return parsed.files.flatMap(file => [file.path, ...(file.oldPath ? [file.oldPath] : [])]);
}

/** Callers for a diff, ready to pass to the review tools as `context.callers`. */
export async function callerContextForDiff(cwd: string, diff: string, options: { ref?: string } = {}): Promise<CallerContext> {
  return findCallers(cwd, changedSymbols(diff), { changed: changedPaths(diff), ref: options.ref });
}
