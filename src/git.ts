import { spawn } from "node:child_process";
import { lstat, readFile, realpath } from "node:fs/promises";
import { isAbsolute, relative, resolve, sep } from "node:path";
import { isSensitivePath } from "./sensitive.js";

/**
 * Read-only access to the working tree's changes for the hooks and the CI gate. Git is run with an
 * argument array and no shell, with external diff and text conversion disabled, a clean environment,
 * and caps on output size and time. Nothing here writes to the repository.
 */

export const GIT_TIMEOUT_MS = 15_000;
export const MAX_DIFF_BYTES = 8_000_000;
export const MAX_UNTRACKED_FILES = 50;
export const MAX_UNTRACKED_BYTES = 100_000;

export type GitResult = { ok: boolean; stdout: string; truncated: boolean; code: number | null };

function gitEnv(): NodeJS.ProcessEnv {
  const keep = /^(PATH|PATHEXT|SystemRoot|WINDIR|COMSPEC|TEMP|TMP|USERPROFILE|HOME|APPDATA|LOCALAPPDATA|LANG|LC_ALL)$/i;
  const env: NodeJS.ProcessEnv = {};
  for (const [name, value] of Object.entries(process.env)) if (value !== undefined && keep.test(name)) env[name] = value;
  return { ...env, GIT_OPTIONAL_LOCKS: "0", GIT_PAGER: "cat", GIT_TERMINAL_PROMPT: "0", GIT_CONFIG_NOSYSTEM: "1" };
}

export function runGit(args: string[], cwd: string, options: { maxBytes?: number; timeoutMs?: number } = {}): Promise<GitResult> {
  const maxBytes = options.maxBytes ?? MAX_DIFF_BYTES;
  return new Promise(resolvePromise => {
    // `core.fsmonitor=false` and `core.pager=cat` keep a repository's own configuration from running helpers.
    const child = spawn("git", ["-c", "core.fsmonitor=false", "-c", "core.pager=cat", ...args], {
      cwd,
      env: gitEnv(),
      shell: false,
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
    });
    const chunks: Buffer[] = [];
    let size = 0;
    let truncated = false;
    const timer = setTimeout(() => child.kill(), options.timeoutMs ?? GIT_TIMEOUT_MS);
    child.stdout.on("data", (chunk: Buffer) => {
      if (truncated) return;
      size += chunk.length;
      if (size > maxBytes) {
        truncated = true;
        child.kill();
        return;
      }
      chunks.push(chunk);
    });
    child.stderr.on("data", () => undefined);
    child.on("error", () => {
      clearTimeout(timer);
      resolvePromise({ ok: false, stdout: "", truncated: false, code: null });
    });
    child.on("close", code => {
      clearTimeout(timer);
      resolvePromise({ ok: code === 0 && !truncated, stdout: Buffer.concat(chunks).toString("utf8"), truncated, code });
    });
  });
}

export async function repoRoot(cwd: string): Promise<string | null> {
  const result = await runGit(["rev-parse", "--show-toplevel"], cwd, { maxBytes: 10_000 });
  const root = result.stdout.trim();
  return result.ok && root ? root : null;
}

export type WorkingChanges = {
  root: string;
  /** Unified diff of tracked changes plus new untracked files, sensitive files already replaced by a placeholder. */
  diff: string;
  truncated: boolean;
  /** Repository-relative paths whose content was withheld because they are sensitive. */
  withheld: string[];
  untrackedSkipped: number;
};

const NO_EXT = ["--no-ext-diff", "--no-textconv", "--no-color"];

/** Changes against `base` (default HEAD; the index when the repository has no commit yet). */
export async function workingChanges(cwd: string, base?: string): Promise<WorkingChanges | null> {
  const root = await repoRoot(cwd);
  if (!root) return null;
  const head = await runGit(["rev-parse", "--verify", "--quiet", "HEAD"], root, { maxBytes: 1_000 });
  const against = base ?? (head.ok ? "HEAD" : undefined);
  const tracked = await runGit(["diff", ...NO_EXT, ...(against ? [against] : [])], root);
  if (!tracked.ok && !tracked.truncated) return null;
  const names = await runGit(["ls-files", "--others", "--exclude-standard", "-z"], root, { maxBytes: 1_000_000 });
  const untracked = names.stdout.split("\0").filter(Boolean);

  const parts: string[] = [];
  let skipped = 0;
  const realRoot = await realpath(root);
  for (const name of untracked.slice(0, MAX_UNTRACKED_FILES)) {
    const section = await untrackedSection(realRoot, name);
    if (section) parts.push(section);
    else skipped += 1;
  }
  skipped += Math.max(0, untracked.length - MAX_UNTRACKED_FILES);

  const withheld: string[] = [];
  const diff = withholdSensitive(tracked.stdout + parts.join(""), withheld);
  return { root, diff, truncated: tracked.truncated, withheld, untrackedSkipped: skipped };
}

/** A new file as an added-file diff, or null when it is sensitive, binary, large, a symlink or outside the repository. */
async function untrackedSection(realRoot: string, name: string): Promise<string | null> {
  if (isSensitivePath(name)) return null;
  const full = resolve(realRoot, name);
  const inside = relative(realRoot, full);
  if (inside.startsWith("..") || isAbsolute(inside)) return null;
  try {
    const stat = await lstat(full);
    if (!stat.isFile() || stat.isSymbolicLink() || stat.size > MAX_UNTRACKED_BYTES) return null;
    const real = await realpath(full);
    if (relative(realRoot, real).startsWith("..")) return null;
    const content = await readFile(real);
    if (content.includes(0)) return null;
    const lines = content.toString("utf8").split(/\r?\n/);
    if (lines.at(-1) === "") lines.pop();
    const path = name.split(sep).join("/");
    return `diff --git a/${path} b/${path}\nnew file mode 100644\n--- /dev/null\n+++ b/${path}\n@@ -0,0 +1,${lines.length} @@\n${lines.map(line => `+${line}`).join("\n")}\n`;
  } catch {
    return null;
  }
}

/** Replace the body of any sensitive file's section with a placeholder; the file stays visible by name. */
export function withholdSensitive(diff: string, withheld: string[]): string {
  const sections = diff.split(/(?<=\n)(?=diff --git )/);
  return sections.map(section => {
    const match = /^diff --git a\/(.+?) b\/(.+?)\r?\n/.exec(section);
    const path = match?.[2];
    if (!match || !path || !isSensitivePath(path)) return section;
    withheld.push(path);
    return `diff --git a/${path} b/${path}\n[content of a sensitive file withheld]\n`;
  }).join("");
}

// --- Between two refs (the CI gate) ------------------------------------------------------------------

const SAFE_REF = new RegExp("^[A-Za-z0-9._/@^~{}:+-]+$");

/** A ref the CI gate may pass to git: no leading dash (an option), no `..` (a range of our own making), no whitespace. */
export function isSafeRef(ref: string): boolean {
  return ref.length > 0 && ref.length <= 200 && !ref.startsWith("-") && !ref.includes("..") && SAFE_REF.test(ref);
}

export type ChangedFile = { status: string; path: string; oldPath?: string };

export type RefChanges = {
  root: string;
  diff: string;
  truncated: boolean;
  withheld: string[];
  files: ChangedFile[];
  /** Commit messages between the refs; untrusted text. */
  commits: string;
};

/** Parse `git diff --name-status -z`: `M\0path\0`, or `R100\0old\0new\0` for a rename or copy. */
export function parseNameStatus(raw: string): ChangedFile[] {
  const parts = raw.split("\0");
  const files: ChangedFile[] = [];
  for (let i = 0; i < parts.length;) {
    const status = parts[i++];
    if (!status) continue;
    if (/^[RC]/.test(status)) {
      const oldPath = parts[i++];
      const path = parts[i++];
      if (path !== undefined && oldPath !== undefined) files.push({ status: status[0]!, path, oldPath });
    } else {
      const path = parts[i++];
      if (path !== undefined) files.push({ status: status[0]!, path });
    }
  }
  return files;
}

/** Changes introduced by `head` since it diverged from `base` (a three-dot diff). Null when the refs do not resolve. */
export async function refChanges(cwd: string, base: string, head: string): Promise<RefChanges | null> {
  if (!isSafeRef(base) || !isSafeRef(head)) return null;
  const root = await repoRoot(cwd);
  if (!root) return null;
  for (const ref of [base, head]) {
    const found = await runGit(["rev-parse", "--verify", "--quiet", `${ref}^{commit}`], root, { maxBytes: 1_000 });
    if (!found.ok) return null;
  }
  const range = `${base}...${head}`;
  const diff = await runGit(["diff", ...NO_EXT, range], root);
  if (!diff.ok && !diff.truncated) return null;
  const names = await runGit(["diff", ...NO_EXT, "--name-status", "-z", "-M", range], root, { maxBytes: 2_000_000 });
  const log = await runGit(["log", "-n", "50", "--format=%B%x00", `${base}..${head}`], root, { maxBytes: 200_000 });
  const withheld: string[] = [];
  return {
    root,
    diff: withholdSensitive(diff.stdout, withheld),
    truncated: diff.truncated,
    withheld,
    files: parseNameStatus(names.stdout),
    commits: log.stdout.split("\0").map(message => message.trim()).filter(Boolean).join("\n---\n"),
  };
}

/** A file's content at a ref, or null. Used to read the policy from the base ref, which a pull request cannot edit. */
export async function showFile(cwd: string, ref: string, path: string): Promise<string | null> {
  if (!isSafeRef(ref) || path.includes("\0") || path.startsWith("-")) return null;
  const root = await repoRoot(cwd);
  if (!root) return null;
  const result = await runGit(["show", `${ref}:${path}`], root, { maxBytes: 200_000 });
  return result.ok ? result.stdout : null;
}
