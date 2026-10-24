/**
 * Unified-diff parsing for the chunked review. The parse is lossless: `preamble` plus every file's
 * `header` and `hunks`, concatenated, reproduce the input byte for byte. File labels come from the
 * diff text itself, which the author of the diff controls, so they only decide how to group text
 * and never what is trusted.
 */

export type DiffFile = {
  /** Path after the change (the old path for a deletion). */
  path: string;
  /** Previous path when the file was renamed or copied. */
  oldPath?: string;
  status: "modified" | "added" | "deleted" | "renamed";
  binary: boolean;
  /** Lines before the first hunk, for example `diff --git`, mode, index and `---`/`+++` lines. */
  header: string;
  /** Each hunk with its `@@` line, including trailing `\ No newline at end of file` markers. */
  hunks: string[];
  additions: number;
  deletions: number;
};

export type ParsedDiff = { preamble: string; files: DiffFile[] };

const GIT_FILE = /^diff --git /;
const HUNK = /^@@ /;

export function parseUnifiedDiff(diff: string): ParsedDiff | undefined {
  const lines = diff.split(/(?<=\n)/);
  const gitStarts = lines.flatMap((line, index) => (GIT_FILE.test(line) ? [index] : []));
  const starts = gitStarts.length > 0 ? gitStarts : classicStarts(lines);
  if (starts.length === 0) return undefined;
  const preamble = lines.slice(0, starts[0]).join("");
  const files = starts.map((start, i) => parseSection(lines.slice(start, starts[i + 1] ?? lines.length)));
  return { preamble, files };
}

/** `--- a/x` followed by `+++ b/x` and a hunk header, without `diff --git` (plain `diff -u`, `svn diff`). */
function classicStarts(lines: string[]): number[] {
  const starts: number[] = [];
  for (let i = 0; i + 2 < lines.length; i++) {
    // Body lines begin with a space, plus or minus, so a real file start needs the whole triple.
    if (lines[i]!.startsWith("--- ") && lines[i + 1]!.startsWith("+++ ") && HUNK.test(lines[i + 2]!)) starts.push(i);
  }
  return starts;
}

function parseSection(section: string[]): DiffFile {
  const firstHunk = section.findIndex(line => HUNK.test(line));
  const headerLines = firstHunk === -1 ? section : section.slice(0, firstHunk);
  const bodyLines = firstHunk === -1 ? [] : section.slice(firstHunk);
  const header = headerLines.join("");

  const hunks: string[] = [];
  let current: string[] = [];
  let additions = 0;
  let deletions = 0;
  for (const line of bodyLines) {
    if (HUNK.test(line)) {
      if (current.length > 0) hunks.push(current.join(""));
      current = [];
    }
    current.push(line);
    if (line.startsWith("+")) additions++;
    else if (line.startsWith("-")) deletions++;
  }
  if (current.length > 0) hunks.push(current.join(""));

  // Match on lines without their terminator: `$` would otherwise stop at a trailing newline.
  const bare = headerLines.map(line => line.replace(/\r?\n$/, ""));
  const binary = bare.some(line => /^Binary files .* differ$/.test(line) || line === "GIT binary patch");
  const added = bare.some(line => line.startsWith("new file mode ") || line === "--- /dev/null");
  const deleted = bare.some(line => line.startsWith("deleted file mode ") || line === "+++ /dev/null");
  const renameFrom = bare.map(line => /^(?:rename|copy) from (.+)$/.exec(line)?.[1]).find(Boolean);
  const renameTo = bare.map(line => /^(?:rename|copy) to (.+)$/.exec(line)?.[1]).find(Boolean);

  const paths = sectionPaths(headerLines);
  const path = renameTo ?? (deleted ? paths.old ?? paths.new : paths.new ?? paths.old) ?? "unknown";
  const oldPath = renameFrom ?? undefined;
  return {
    path: unquote(path),
    ...(oldPath !== undefined && unquote(oldPath) !== unquote(path) ? { oldPath: unquote(oldPath) } : {}),
    status: added ? "added" : deleted ? "deleted" : oldPath !== undefined && unquote(oldPath) !== unquote(path) ? "renamed" : "modified",
    binary,
    header,
    hunks,
    additions,
    deletions,
  };
}

function sectionPaths(headerLines: string[]): { old?: string; new?: string } {
  let oldPath: string | undefined;
  let newPath: string | undefined;
  for (const line of headerLines) {
    if (line.startsWith("--- ")) oldPath = stripPrefix(line.slice(4), "a/");
    else if (line.startsWith("+++ ")) newPath = stripPrefix(line.slice(4), "b/");
  }
  if (oldPath === undefined && newPath === undefined) {
    const git = headerLines[0] ? gitHeaderPaths(headerLines[0]) : undefined;
    if (git) return { old: git.old, new: git.new };
  }
  return { ...(oldPath !== undefined ? { old: oldPath } : {}), ...(newPath !== undefined ? { new: newPath } : {}) };
}

function stripPrefix(raw: string, prefix: "a/" | "b/"): string | undefined {
  const value = raw.replace(/\r?\n$/, "").replace(/\t.*$/, "");
  if (value === "/dev/null") return undefined;
  const bare = value.startsWith('"') ? value.slice(1, value.endsWith('"') ? -1 : undefined) : value;
  return bare.startsWith(prefix) ? bare.slice(prefix.length) : bare;
}

/** `diff --git a/P b/P` with an unquoted P that may contain spaces: P is recoverable from the length. */
function gitHeaderPaths(line: string): { old: string; new: string } | undefined {
  const rest = line.replace(/\r?\n$/, "").slice("diff --git ".length);
  const quoted = /^"a\/(.*)" "b\/(.*)"$/.exec(rest);
  if (quoted) return { old: quoted[1]!, new: quoted[2]! };
  const half = (rest.length - 5) / 2;
  if (Number.isInteger(half) && half > 0 && rest.startsWith("a/") && rest.slice(2, 2 + half) === rest.slice(2 + half + 3)) {
    const same = rest.slice(2, 2 + half);
    return { old: same, new: same };
  }
  const plain = /^a\/(.+) b\/(.+)$/.exec(rest);
  return plain ? { old: plain[1]!, new: plain[2]! } : undefined;
}

/** Git quotes unusual names as C strings; keep the readable ones and leave escapes as written. */
function unquote(value: string): string {
  return value.replace(/\r?\n$/, "");
}

/** Reassemble a parsed diff exactly as it was parsed. */
export function renderParsedDiff(parsed: ParsedDiff): string {
  return parsed.preamble + parsed.files.map(file => file.header + file.hunks.join("")).join("");
}
