/**
 * Repository policy file (`.jev-policy.json`): deterministic rules evaluated before any Jev request.
 *
 * - `protected_paths`: globs whose floor is `review` or `deny`.
 * - `commands.deny` / `commands.review`: command patterns that must be refused or reviewed.
 * - `commands.allow_read_only`: read-only commands the repo owner has chosen to skip the model for.
 *
 * Rules can only tighten a decision, with one bounded exception: an `allow_read_only` pattern lets a command that the
 * classifier has fully confirmed as read-only skip the model. It never applies to anything else, and a `deny` or
 * `review` match always wins. A policy that cannot be read or validated is an error, never silently ignored: a broken
 * file must not quietly switch the deny rules off.
 *
 * Patterns are token prefixes with `*` for "any one token", never user regular expressions, so they cannot cause
 * catastrophic backtracking (globs are matched by a linear-time algorithm, never compiled to a regular expression). The policy is trusted input from whoever owns the checkout; a pull request must not be able
 * to loosen its own policy, so CI reads it from the base ref (a later PR).
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, isAbsolute, join, posix, resolve } from "node:path";
import { z } from "zod";
import { canonicalFlags, commandSegments, type CommandSegment } from "./effects.js";
import { JevConfigError } from "./errors.js";

export const POLICY_FILE_NAME = ".jev-policy.json";
const MAX_POLICY_BYTES = 65_536;
const MAX_RULES = 200;
const MAX_PATH_CHARS = 1_024;
const MAX_CANDIDATE_PATHS = 200;

// --- Paths and globs --------------------------------------------------------------------------------------

/** A repository-relative POSIX path, or null when it is invalid or points outside `root`. */
export function normalizeRepoPath(raw: string, root?: string): string | null {
  if (!raw || raw.length > MAX_PATH_CHARS || raw.includes("\u0000")) return null;
  let path = raw.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
  if (/^[A-Za-z]:\//.test(path) || path.startsWith("/")) {
    if (!root) return null;
    const base = root.replace(/\\/g, "/").replace(/\/+$/, "");
    const lowered = path.toLowerCase();
    if (!(lowered === base.toLowerCase() || lowered.startsWith(`${base.toLowerCase()}/`))) return null;
    path = path.slice(base.length).replace(/^\//, "");
  }
  path = posix.normalize(path.replace(/^\.\//, ""));
  if (path === "." || path === "") return null;
  if (path === ".." || path.startsWith("../")) return null;
  return path.replace(/\/$/, "");
}

const GLOB_CHARS = /^[A-Za-z0-9_.\-/*?@+~ ]+$/;

function validGlob(glob: string): boolean {
  if (!GLOB_CHARS.test(glob) || glob.startsWith("/") || /^[A-Za-z]:/.test(glob)) return false;
  return !glob.split("/").some((part) => part === "..");
}

/** `*` and `?` inside one path segment, matched in O(pattern x text) with no recursion or regular expression. */
function globSegmentMatches(pattern: string, text: string): boolean {
  let p = 0;
  let t = 0;
  let star = -1;
  let mark = 0;
  while (t < text.length) {
    if (p < pattern.length && (pattern[p] === "?" || pattern[p] === text[t])) {
      p += 1;
      t += 1;
    } else if (p < pattern.length && pattern[p] === "*") {
      star = p;
      p += 1;
      mark = t;
    } else if (star >= 0) {
      p = star + 1;
      mark += 1;
      t = mark;
    } else {
      return false;
    }
  }
  while (p < pattern.length && pattern[p] === "*") p += 1;
  return p === pattern.length;
}

export type CompiledGlob = { glob: string; test: (path: string) => boolean };

/**
 * Compile a glob. `**` as a whole segment crosses directories, `*` and `?` do not. A pattern with no `/` matches a
 * file or directory of that name at any depth (like gitignore), and a pattern that names a directory also covers
 * everything inside it. Case-insensitive. Matching is a linear-time dynamic program over path segments, so no
 * pattern, however it is written, can cause catastrophic backtracking.
 */
export function compileGlob(glob: string): CompiledGlob {
  if (!validGlob(glob)) throw new JevConfigError(`Invalid policy glob: ${JSON.stringify(glob.slice(0, 80))}`);
  const segments = glob.replace(/^\.\//, "").split("/").filter(Boolean).map((segment) => (/^\*{2,}$/.test(segment) ? "**" : segment.replace(/\*{2,}/g, "*").toLowerCase()));
  if (!segments.length) throw new JevConfigError(`Invalid policy glob: ${JSON.stringify(glob.slice(0, 80))}`);
  const anyDepth = segments.length === 1 && segments[0] !== "**";
  return {
    glob,
    test(path: string): boolean {
      const parts = path.toLowerCase().split("/").filter(Boolean);
      if (anyDepth) return parts.some((part) => globSegmentMatches(segments[0]!, part));
      const seen = new Set<number>();
      const from = (pi: number, si: number): boolean => {
        // The pattern is consumed: whatever remains of the path is inside the matched directory.
        if (pi === segments.length) return true;
        const key = pi * (parts.length + 1) + si;
        if (seen.has(key)) return false;
        seen.add(key);
        if (segments[pi] === "**") return from(pi + 1, si) || (si < parts.length && from(pi, si + 1));
        return si < parts.length && globSegmentMatches(segments[pi]!, parts[si]!) && from(pi + 1, si + 1);
      };
      return from(0, 0);
    },
  };
}

// --- Command patterns -------------------------------------------------------------------------------------

export type CommandPattern = { source: string; tokens: string[]; flags: string[] };

const PATTERN_CHARS = /^[A-Za-z0-9_.\-/*:@+=,~% ]+$/;

export function parseCommandPattern(source: string): CommandPattern {
  const parts = source.trim().split(/\s+/).filter(Boolean);
  if (!parts.length || parts.length > 12 || source.length > 200 || !PATTERN_CHARS.test(source)) {
    throw new JevConfigError(`Invalid policy command pattern: ${JSON.stringify(source.slice(0, 80))}`);
  }
  const tokens: string[] = [];
  const flags: string[] = [];
  for (const part of parts) {
    if (part.startsWith("-") && part.length > 1) flags.push(...canonicalFlags(part));
    else tokens.push(part.toLowerCase());
  }
  if (!tokens.length) throw new JevConfigError(`A policy command pattern needs a program name: ${JSON.stringify(source.slice(0, 80))}`);
  return { source: source.trim(), tokens, flags };
}

/** Positional tokens must match as a prefix (`*` matches any one token); every pattern flag must be present, in any order. */
export function segmentMatches(pattern: CommandPattern, segment: CommandSegment): boolean {
  if (segment.tokens.length < pattern.tokens.length) return false;
  for (let i = 0; i < pattern.tokens.length; i += 1) {
    const want = pattern.tokens[i]!;
    if (want !== "*" && want !== segment.tokens[i]) return false;
  }
  return pattern.flags.every((flag) => segment.flags.includes(flag));
}

// --- Policy file ---------------------------------------------------------------------------------------------

const patternList = z.array(z.string().min(1).max(200)).max(MAX_RULES).optional();
const policySchema = z.object({
  version: z.literal(1),
  protected_paths: z.array(z.object({
    glob: z.string().min(1).max(200),
    floor: z.enum(["review", "deny"]),
  }).strict()).max(MAX_RULES).optional(),
  commands: z.object({ deny: patternList, review: patternList, allow_read_only: patternList }).strict().optional(),
  require_gate_on_stop: z.boolean().optional(),
}).strict();

export type RepoPolicy = {
  file: string;
  root: string;
  protectedPaths: Array<{ glob: string; floor: "review" | "deny"; matcher: CompiledGlob }>;
  commands: { deny: CommandPattern[]; review: CommandPattern[]; allowReadOnly: CommandPattern[] };
  requireGateOnStop: boolean;
};

export function parseRepoPolicy(text: string, file: string): RepoPolicy {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    throw new JevConfigError(`Invalid ${POLICY_FILE_NAME} (${file}): not valid JSON.`);
  }
  const parsed = policySchema.safeParse(raw);
  if (!parsed.success) {
    const issues = parsed.error.issues.slice(0, 5).map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`).join("; ");
    throw new JevConfigError(`Invalid ${POLICY_FILE_NAME} (${file}): ${issues}`);
  }
  const policy = parsed.data;
  return {
    file,
    root: dirname(file),
    protectedPaths: (policy.protected_paths ?? []).map((rule) => ({ glob: rule.glob, floor: rule.floor, matcher: compileGlob(rule.glob) })),
    commands: {
      deny: (policy.commands?.deny ?? []).map(parseCommandPattern),
      review: (policy.commands?.review ?? []).map(parseCommandPattern),
      allowReadOnly: (policy.commands?.allow_read_only ?? []).map(parseCommandPattern),
    },
    requireGateOnStop: policy.require_gate_on_stop === true,
  };
}

/** The policy file that governs `startDir`: `JEV_POLICY_FILE` if set (`none` disables), else the nearest one up to the repository root. */
export function findPolicyFile(startDir: string, env: NodeJS.ProcessEnv = process.env): string | null {
  const override = env.JEV_POLICY_FILE?.trim();
  if (override) {
    if (override.toLowerCase() === "none") return null;
    if (!isAbsolute(override)) throw new JevConfigError("JEV_POLICY_FILE must be an absolute path (or `none`).");
    if (!existsSync(override)) throw new JevConfigError(`JEV_POLICY_FILE does not exist: ${override}`);
    return override;
  }
  let dir = resolve(startDir);
  for (let depth = 0; depth < 25; depth += 1) {
    const candidate = join(dir, POLICY_FILE_NAME);
    if (existsSync(candidate)) return candidate;
    if (existsSync(join(dir, ".git"))) return null;
    const parent = dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
  return null;
}

const cache = new Map<string, { mtimeMs: number; size: number; policy: RepoPolicy }>();

/** Load and cache (by path, mtime and size) the policy governing `startDir`; null when there is none. Throws on a broken file. */
export function loadRepoPolicy(startDir = process.cwd(), env: NodeJS.ProcessEnv = process.env): RepoPolicy | null {
  const file = findPolicyFile(startDir, env);
  if (!file) return null;
  const stat = statSync(file);
  if (!stat.isFile() || stat.size > MAX_POLICY_BYTES) throw new JevConfigError(`${POLICY_FILE_NAME} (${file}) must be a regular file of at most ${MAX_POLICY_BYTES} bytes.`);
  const hit = cache.get(file);
  if (hit && hit.mtimeMs === stat.mtimeMs && hit.size === stat.size) return hit.policy;
  const policy = parseRepoPolicy(readFileSync(file, "utf8"), file);
  cache.set(file, { mtimeMs: stat.mtimeMs, size: stat.size, policy });
  return policy;
}

export function clearPolicyCache(): void {
  cache.clear();
}

// --- Evaluation -------------------------------------------------------------------------------------------------

export type PolicyVerdict = { decision: "none" | "allow" | "review" | "deny"; rule: string | null };

export const NO_POLICY_VERDICT: PolicyVerdict = { decision: "none", rule: null };

export type PolicyInput = {
  command?: string;
  target?: string;
  /** The caller has established that the effective effect is read-only and the command was confirmed read-only. */
  allowEligible?: boolean;
};

function candidatePaths(policy: RepoPolicy, input: PolicyInput, segments: CommandSegment[]): string[] {
  const raws = [input.target, ...segments.flatMap((segment) => segment.tokens.slice(1))].filter((value): value is string => typeof value === "string" && value.length > 0);
  const seen = new Set<string>();
  for (const raw of raws) {
    const path = normalizeRepoPath(raw, policy.root);
    if (path) seen.add(path);
    if (seen.size >= MAX_CANDIDATE_PATHS) break;
  }
  return [...seen];
}

/** Deny beats review, and review beats allow. `allow` needs an explicit pattern for every command segment. */
export function evaluatePolicy(policy: RepoPolicy, input: PolicyInput): PolicyVerdict {
  const segments = input.command ? commandSegments(input.command) : [];
  const paths = candidatePaths(policy, input, segments);
  const commandHit = (patterns: CommandPattern[]) => patterns.find((pattern) => segments.some((segment) => segmentMatches(pattern, segment)));
  const pathHit = (floor: "review" | "deny") => policy.protectedPaths.find((rule) => rule.floor === floor && paths.some((path) => rule.matcher.test(path)));

  const deniedCommand = commandHit(policy.commands.deny);
  if (deniedCommand) return { decision: "deny", rule: `command:${deniedCommand.source}` };
  const deniedPath = pathHit("deny");
  if (deniedPath) return { decision: "deny", rule: `path:${deniedPath.glob}` };
  const reviewCommand = commandHit(policy.commands.review);
  if (reviewCommand) return { decision: "review", rule: `command:${reviewCommand.source}` };
  const reviewPath = pathHit("review");
  if (reviewPath) return { decision: "review", rule: `path:${reviewPath.glob}` };

  if (input.allowEligible && segments.length > 0 && policy.commands.allowReadOnly.length > 0) {
    const unmatched = segments.find((segment) => !policy.commands.allowReadOnly.some((pattern) => segmentMatches(pattern, segment)));
    if (!unmatched) {
      const first = policy.commands.allowReadOnly.find((pattern) => segmentMatches(pattern, segments[0]!))!;
      return { decision: "allow", rule: `command:${first.source}` };
    }
  }
  return NO_POLICY_VERDICT;
}
