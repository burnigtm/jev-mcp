/**
 * Deterministic classification of shell commands into effects.
 *
 * This only ever TIGHTENS a decision: `effectiveEffect` is the strictest of the effect a host declared and
 * the effect inferred here, and a command the classifier cannot fully understand is `unknown`, never
 * `read_only`. A program it does not recognize contributes no information, so the declared effect stands.
 *
 * The command is parsed twice, once with POSIX rules and once with Windows rules (literal backslashes,
 * backtick and `^` escapes, `%VAR%`), and the strictest result wins. That covers bash, PowerShell and cmd
 * without guessing which shell the host will use.
 *
 * It is not a sandbox. Code hidden inside an interpreter's inline script (`python -c "..."`) is not
 * analyzed; the judge still sees the command text.
 */

export type Effect = "read_only" | "local_write" | "external_write" | "destructive" | "unknown";

/** `unknown` ranks below `destructive` so a known-destructive command is never masked by an unparsed one. */
const RANK: Record<Effect, number> = { read_only: 0, local_write: 1, external_write: 2, unknown: 3, destructive: 4 };

export function strictestEffect(...effects: Array<Effect | null | undefined>): Effect {
  let best: Effect = "read_only";
  for (const effect of effects) if (effect && RANK[effect] > RANK[best]) best = effect;
  return best;
}

export type CommandClassification = {
  /** Strictest effect among recognized parts; null when nothing was recognized. */
  effect: Effect | null;
  /** True only when every part is a recognized read-only command with no write, redirect or expansion tricks. */
  confirmed_read_only: boolean;
  /** Short, content-free labels for what was recognized, for explanations and tests. */
  matched: string[];
};

export type EffectiveEffect = {
  declared: Effect;
  inferred: Effect | null;
  effective: Effect;
  matched: string[];
  upgraded: boolean;
};

// --- Lexer ----------------------------------------------------------------------------------------------

type Mode = "posix" | "win";
type Word = { text: string; expanded: boolean; glob: boolean };
type Redirect = { op: string; target: string };
type Segment = { words: Word[]; redirects: Redirect[]; subst: string[]; heredocBody: string | null; pipedFrom: boolean };
type Lexed = { segments: Segment[]; unparsed: boolean };

const MAX_COMMAND_CHARS = 20_000;
const MAX_DEPTH = 3;

function newSegment(pipedFrom = false): Segment {
  return { words: [], redirects: [], subst: [], heredocBody: null, pipedFrom };
}

/** Index of the character after the group that opens at `start` (which points at the opener). */
function scanGroup(src: string, start: number, open: string, close: string): number {
  let depth = 0;
  let quote: string | null = null;
  for (let i = start; i < src.length; i += 1) {
    const c = src[i]!;
    if (quote) {
      if (c === "\\" && quote === '"') i += 1;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === "'" || c === '"') quote = c;
    else if (c === "\\") i += 1;
    else if (c === open) depth += 1;
    else if (c === close) {
      depth -= 1;
      if (depth === 0) return i + 1;
    }
  }
  return -1;
}

function lex(src: string, mode: Mode): Lexed {
  const segments: Segment[] = [];
  let seg = newSegment();
  let word: Word | null = null;
  let pendingRedirect: string | null = null;
  let pendingHeredoc: { delimiter: string; strip: boolean } | null = null;
  let unparsed = false;

  const endWord = () => {
    if (!word) return;
    if (pendingRedirect !== null) {
      seg.redirects.push({ op: pendingRedirect, target: word.text });
      pendingRedirect = null;
    } else {
      seg.words.push(word);
    }
    word = null;
  };
  const endSegment = (nextPiped = false) => {
    endWord();
    if (pendingRedirect !== null) {
      unparsed = true;
      pendingRedirect = null;
    }
    if (seg.words.length || seg.redirects.length || seg.subst.length) segments.push(seg);
    seg = newSegment(nextPiped);
  };
  const add = (text: string, flags: Partial<Word> = {}) => {
    word ??= { text: "", expanded: false, glob: false };
    word.text += text;
    if (flags.expanded) word.expanded = true;
    if (flags.glob) word.glob = true;
  };

  let i = 0;
  while (i < src.length) {
    const c = src[i]!;
    const next = src[i + 1];

    if (c === " " || c === "\t" || c === "\r") {
      endWord();
      i += 1;
      continue;
    }
    if (c === "\n") {
      endWord();
      if (pendingHeredoc) {
        // The body is data up to the delimiter line; it is classified only if an interpreter reads it.
        const lines = src.slice(i + 1).split("\n");
        const body: string[] = [];
        let consumed = 0;
        let closed = false;
        for (const line of lines) {
          consumed += line.length + 1;
          const candidate = pendingHeredoc.strip ? line.replace(/^\t+/, "") : line;
          if (candidate.replace(/\r$/, "") === pendingHeredoc.delimiter) {
            closed = true;
            break;
          }
          body.push(line);
        }
        if (!closed) unparsed = true;
        seg.heredocBody = body.join("\n");
        pendingHeredoc = null;
        i += 1 + consumed;
        endSegment();
        continue;
      }
      endSegment();
      i += 1;
      continue;
    }
    if (c === "#" && word === null) {
      // A comment runs to the end of the line.
      while (i < src.length && src[i] !== "\n") i += 1;
      continue;
    }
    if (c === "\\" && mode === "posix") {
      if (next === "\n") {
        i += 2;
        continue;
      }
      if (next !== undefined) add(next);
      i += 2;
      continue;
    }
    if ((c === "^" || c === "`") && mode === "win") {
      if (next === "\n") {
        i += 2;
        continue;
      }
      if (next !== undefined) add(next);
      i += 2;
      continue;
    }
    if (c === "{" && mode === "win" && word === null) {
      // PowerShell script blocks (`ForEach-Object { Remove-Item $_ }`) hold commands of their own.
      const end = scanGroup(src, i, "{", "}");
      if (end < 0) {
        unparsed = true;
        break;
      }
      seg.subst.push(src.slice(i + 1, end - 1));
      add("", { expanded: false });
      i = end;
      continue;
    }
    if (c === "'") {
      const end = src.indexOf("'", i + 1);
      if (end < 0) {
        unparsed = true;
        add(src.slice(i + 1));
        break;
      }
      add(src.slice(i + 1, end));
      if (end === i + 1) add("");
      i = end + 1;
      continue;
    }
    if (c === '"') {
      i += 1;
      let closed = false;
      while (i < src.length) {
        const d = src[i]!;
        if (d === '"') {
          closed = true;
          i += 1;
          break;
        }
        if (d === "\\" && mode === "posix" && i + 1 < src.length && '"\\$`\n'.includes(src[i + 1]!)) {
          if (src[i + 1] !== "\n") add(src[i + 1]!);
          i += 2;
        } else if (d === "`" && mode === "win" && i + 1 < src.length) {
          add(src[i + 1]!);
          i += 2;
        } else if (d === "$" && src[i + 1] === "(") {
          const end = scanGroup(src, i + 1, "(", ")");
          if (end < 0) {
            unparsed = true;
            i = src.length;
            break;
          }
          seg.subst.push(src.slice(i + 2, end - 1));
          add("\u0001", { expanded: true });
          i = end;
        } else if (d === "$" && src[i + 1] === "{") {
          const end = scanGroup(src, i + 1, "{", "}");
          if (end < 0) {
            unparsed = true;
            i = src.length;
            break;
          }
          add("\u0001", { expanded: true });
          i = end;
        } else if (d === "$" && /[A-Za-z_0-9@*#?!$-]/.test(src[i + 1] ?? "")) {
          add("\u0001", { expanded: true });
          i += 2;
        } else if (d === "`" && mode === "posix") {
          const end = src.indexOf("`", i + 1);
          if (end < 0) {
            unparsed = true;
            i = src.length;
            break;
          }
          seg.subst.push(src.slice(i + 1, end));
          add("\u0001", { expanded: true });
          i = end + 1;
        } else {
          add(d);
          i += 1;
        }
      }
      if (!closed) unparsed = true;
      add("");
      continue;
    }
    if (c === "$" && mode === "win" && word === null && /^\$(_|psitem)(?![A-Za-z0-9_])/i.test(src.slice(i, i + 8))) {
      add("\u0002");
      i += src.slice(i + 1, i + 7).toLowerCase().startsWith("psitem") ? 7 : 2;
      continue;
    }
    if (c === "$") {
      if (next === "(") {
        const double = src[i + 2] === "(";
        const end = scanGroup(src, i + 1, "(", ")");
        if (end < 0) {
          unparsed = true;
          break;
        }
        if (!double) seg.subst.push(src.slice(i + 2, end - 1));
        add("\u0001", { expanded: true });
        i = end;
        continue;
      }
      if (next === "{") {
        const end = scanGroup(src, i + 1, "{", "}");
        if (end < 0) {
          unparsed = true;
          break;
        }
        add("\u0001", { expanded: true });
        i = end;
        continue;
      }
      if (/[A-Za-z_0-9@*#?!$-]/.test(next ?? "")) {
        add("\u0001", { expanded: true });
        i += 2;
        while (i < src.length && /[A-Za-z_0-9]/.test(src[i]!)) i += 1;
        continue;
      }
      add("$");
      i += 1;
      continue;
    }
    if (c === "`" && mode === "posix") {
      const end = src.indexOf("`", i + 1);
      if (end < 0) {
        unparsed = true;
        break;
      }
      seg.subst.push(src.slice(i + 1, end));
      add("\u0001", { expanded: true });
      i = end + 1;
      continue;
    }
    if (c === "%" && mode === "win") {
      const end = src.indexOf("%", i + 1);
      if (end > i + 1 && !/\s/.test(src.slice(i + 1, end))) {
        add("\u0001", { expanded: true });
        i = end + 1;
        continue;
      }
    }
    if ((c === "<" || c === ">") && next === "(" && mode === "posix") {
      const end = scanGroup(src, i + 1, "(", ")");
      if (end < 0) {
        unparsed = true;
        break;
      }
      seg.subst.push(src.slice(i + 2, end - 1));
      add("\u0001", { expanded: true });
      i = end;
      continue;
    }
    if (c === "<" || c === ">") {
      // `2>file` style: a purely numeric word directly before the operator is a file descriptor.
      if (word && /^\d+$/.test((word as Word).text)) word = null;
      else endWord();
      let op = c;
      let j = i + 1;
      while (j < src.length && "<>&|".includes(src[j]!) && op.length < 3) {
        op += src[j]!;
        j += 1;
      }
      i = j;
      if (op === "<<" || op === "<<-") {
        // Read the delimiter word now; the body starts on the next line.
        while (src[i] === " " || src[i] === "\t") i += 1;
        let delimiter = "";
        while (i < src.length && !/[\s;&|<>()]/.test(src[i]!)) {
          if (src[i] !== "'" && src[i] !== '"' && src[i] !== "\\") delimiter += src[i]!;
          i += 1;
        }
        pendingHeredoc = { delimiter, strip: op === "<<-" };
        continue;
      }
      if (op === "<<<") {
        pendingRedirect = op;
        continue;
      }
      if (/^[<>]&\d*$/.test(op) || op === ">&" || op === "<&") {
        // `2>&1` duplicates a descriptor and writes nothing; consume the target digit(s) or name.
        pendingRedirect = op;
        continue;
      }
      pendingRedirect = op;
      continue;
    }
    if (c === ";" || c === "\n") {
      endSegment();
      i += 1;
      continue;
    }
    if (c === "&" && next === "&") {
      endSegment();
      i += 2;
      continue;
    }
    if (c === "|" && next === "|") {
      endSegment();
      i += 2;
      continue;
    }
    if (c === "|") {
      endSegment(true);
      i += next === "&" ? 2 : 1;
      continue;
    }
    if (c === "&") {
      endSegment();
      i += 1;
      continue;
    }
    if (c === "(" || c === ")") {
      endSegment();
      i += 1;
      continue;
    }
    if (c === "*" || c === "?" || c === "[") {
      add(c, { glob: true });
      i += 1;
      continue;
    }
    add(c);
    i += 1;
  }
  endSegment();
  if (pendingHeredoc) unparsed = true;
  return { segments, unparsed };
}

// --- Argument helpers ----------------------------------------------------------------------------------

type Parsed = { positional: string[]; flags: Set<string>; raw: string[] };

/** Programs whose single-dash flags may be bundled (`rm -rf`): each letter is also recorded as its own flag. */
const BUNDLED = new Set(["rm", "cp", "mv", "ls", "chmod", "chown", "chgrp", "tar", "du", "grep", "sort", "tail", "head", "ln", "mkdir", "sed", "git", "kill", "curl", "wget", "unzip", "zip", "dd"]);

function parseArgs(program: string, args: string[]): Parsed {
  const flags = new Set<string>();
  const positional: string[] = [];
  let past = false;
  for (const arg of args) {
    if (past || !arg.startsWith("-") || arg === "-") {
      positional.push(arg);
      continue;
    }
    if (arg === "--") {
      past = true;
      continue;
    }
    const lower = arg.toLowerCase();
    flags.add(lower.split("=")[0]!);
    if (BUNDLED.has(program) && /^-[A-Za-z]+$/.test(arg)) for (const letter of arg.slice(1)) flags.add(`-${letter}`).add(`-${letter.toLowerCase()}`);
  }
  return { positional, flags, raw: args };
}

const has = (parsed: Parsed, ...names: string[]) => names.some((name) => parsed.flags.has(name));
/** PowerShell accepts unambiguous prefixes of parameter names (`-Rec` for `-Recurse`). */
const hasPrefix = (parsed: Parsed, minimum: number, full: string) =>
  [...parsed.flags].some((flag) => flag.length >= minimum && full.startsWith(flag) && flag.startsWith("-"));
const anyGlob = (words: Word[]) => words.some((word) => word.glob);

// --- Program tables ---------------------------------------------------------------------------------------

const READ_ONLY = new Set([
  "ls", "dir", "cat", "type", "head", "tail", "more", "less", "wc", "grep", "egrep", "fgrep", "rg", "ag", "fd", "fdfind", "pwd", "echo", "printf", "whoami", "id",
  "uname", "date", "which", "where", "whereis", "file", "stat", "du", "df", "tree", "sort", "uniq", "cut", "tr", "diff", "cmp", "basename", "dirname", "realpath",
  "readlink", "ps", "printenv", "hostname", "uptime", "jq", "yq", "true", "false", "sleep", "test", "[", "seq", "nl", "tac", "rev", "column", "fold", "expand",
  "md5sum", "sha1sum", "sha256sum", "sha512sum", "cksum", "b2sum", "xxd", "hexdump", "od", "strings", "nproc", "free", "lsof", "pgrep", "history", "cd", "pushd", "popd",
  "set-location", "get-location", "sl", "gl", "findstr", "tasklist", "ver", "vol", "hostname.exe", "ipconfig", "ping", "nslookup", "dig", "host", "traceroute", "tracert",
  "clear", "cls", "write-output", "write-host", "write-error", "write-warning", "write-verbose", "where-object", "select-object", "sort-object", "measure-object", "group-object",
  "compare-object", "format-table", "format-list", "format-custom", "format-wide", "out-string", "out-host", "out-null", "convertto-json", "convertfrom-json", "convertto-csv",
  "convertfrom-csv", "resolve-path", "split-path", "join-path", "test-path", "test-connection", "select-string", "start-sleep", "tee-object-readonly", "node-version",
]);
/** PowerShell verbs that only read. */
const READ_VERB = /^(get|select|measure|group|compare|format|test|resolve|split|join|convertto|convertfrom|show|find|read|out-string|out-host|out-null)-/i;
const INTERPRETERS = new Set(["sh", "bash", "zsh", "dash", "ksh", "fish", "csh", "tcsh", "python", "python3", "python2", "py", "node", "nodejs", "deno", "bun", "perl", "ruby", "php", "lua", "pwsh", "powershell", "cmd", "iex", "invoke-expression"]);
const SHELLS = new Set(["sh", "bash", "zsh", "dash", "ksh", "fish", "csh", "tcsh"]);
const WRAPPERS = new Set(["env", "sudo", "doas", "nohup", "time", "command", "builtin", "exec", "setsid", "stdbuf", "nice", "ionice", "timeout", "watch", "xargs", "caffeinate", "chrt", "unbuffer", "start", "call"]);
const LEADING_KEYWORDS = new Set(["{", "}", "!", "if", "then", "else", "elif", "fi", "do", "done", "while", "until", "for", "case", "esac", "select", "function", "&"]);
const CLOUD = new Set(["aws", "gcloud", "az", "doctl", "oci", "ibmcloud", "linode-cli", "heroku", "fly", "flyctl", "vercel", "netlify", "wrangler", "firebase", "supabase", "railway"]);

const DESTRUCTIVE_PROGRAMS = new Set(["shred", "mkfs", "mkfs.ext4", "mkfs.xfs", "mkfs.vfat", "mkfs.btrfs", "wipefs", "fdisk", "sfdisk", "parted", "diskpart", "format", "format-volume", "clear-disk", "shutdown", "reboot", "halt", "poweroff", "init", "restart-computer", "stop-computer", "remove-computer", "cipher", "truncate-all"]);
const LOCAL_WRITE_PROGRAMS = new Set([
  "touch", "mkdir", "md", "cp", "copy", "xcopy", "mv", "move", "ren", "rename", "ln", "mklink", "install", "patch", "tee", "tar", "unzip", "zip", "gzip", "gunzip", "bzip2", "xz", "7z", "7za",
  "chmod", "chown", "chgrp", "attrib", "icacls", "setx", "export", "alias", "ulimit", "umask", "source", ".", "kill", "pkill", "killall", "taskkill", "stop-process", "start-process",
  "set-content", "add-content", "out-file", "new-item", "copy-item", "move-item", "rename-item", "set-item", "expand-archive", "compress-archive", "set-variable", "new-variable", "sc", "ac",
  "ni", "ci", "mi", "ri-write", "tee-object", "export-csv", "export-clixml", "set-itemproperty", "new-itemproperty", "set-executionpolicy", "systemctl", "service", "launchctl", "crontab",
  "make", "cmake", "ninja", "mvn", "gradle", "gradlew", "ant", "msbuild", "dotnet", "cargo", "go", "rustc", "gcc", "g++", "clang", "javac", "tsc", "webpack", "vite", "esbuild", "rollup",
  "pytest", "jest", "vitest", "mocha", "tox", "nox", "poetry", "pipenv", "uv", "bundle", "gem", "composer", "mix", "swift", "flutter", "bazel", "code", "vim", "nano", "emacs", "sed-i",
]);
const EXTERNAL_PROGRAMS = new Set(["ssh", "scp", "sftp", "rsync", "nc", "ncat", "netcat", "telnet", "ftp", "mosh", "send-mailmessage", "mail", "sendmail", "mutt", "twine", "slack", "gh-mutate"]);
const SQL_CLIENTS = new Set(["psql", "mysql", "mariadb", "sqlite3", "sqlcmd", "mongosh", "mongo", "redis-cli", "clickhouse-client", "cqlsh"]);

type Result = { effect: Effect | null; readOnly: boolean; matched: string[] };
const result = (effect: Effect | null, matched: string, readOnly = false): Result => ({ effect, readOnly, matched: matched ? [matched] : [] });
const NONE: Result = { effect: null, readOnly: false, matched: [] };

function classifySql(sql: string): Effect {
  if (/\b(drop|truncate|delete\s+from|alter\s+table|grant|revoke|flushall|flushdb|del\b)/i.test(sql)) return "destructive";
  if (/\b(insert|update|create|replace|merge|upsert|set\b|call|exec)/i.test(sql)) return "external_write";
  return "read_only";
}

// --- Per-program handlers -----------------------------------------------------------------------------------

function gitEffect(args: string[]): Result {
  // Skip global options so `git -C x -c k=v push -f` is seen as `push -f`.
  let i = 0;
  while (i < args.length) {
    const a = args[i]!;
    if (a === "-C" || a === "-c" || a === "--git-dir" || a === "--work-tree" || a === "--namespace" || a === "--exec-path") i += 2;
    else if (a.startsWith("-")) i += 1;
    else break;
  }
  const sub = (args[i] ?? "").toLowerCase();
  const rest = args.slice(i + 1);
  const p = parseArgs("git", rest);
  const force = has(p, "-f", "--force", "--force-with-lease", "--force-if-includes") || rest.some((arg) => /^\+[^+]/.test(arg));
  switch (sub) {
    case "": return result("read_only", "git", true);
    case "status": case "log": case "diff": case "show": case "blame": case "ls-files": case "ls-tree": case "rev-parse": case "rev-list": case "describe": case "shortlog":
    case "grep": case "cat-file": case "name-rev": case "count-objects": case "whatchanged": case "show-ref": case "merge-base": case "diff-tree": case "diff-index": case "ls-remote": case "check-ignore": case "version": case "help": case "var":
      return result("read_only", `git ${sub}`, true);
    case "branch": case "tag":
      if (has(p, "-D") || (has(p, "-d", "--delete") && force)) return result("destructive", `git ${sub} -D`);
      if (has(p, "-d", "--delete", "-m", "-M", "-c", "-C", "--move", "--copy")) return result("local_write", `git ${sub} -d`);
      return p.positional.length && sub === "branch" && !has(p, "-l", "--list", "-a", "-r", "-v", "--show-current") ? result("local_write", "git branch <name>") : result(p.positional.length && sub === "tag" && !has(p, "-l", "--list") ? "local_write" : "read_only", `git ${sub}`, !(p.positional.length && !has(p, "-l", "--list", "-a", "-r", "-v", "--show-current")));
    case "remote":
      return /^(add|set-url|remove|rm|rename|set-head|prune)$/.test((rest[0] ?? "").toLowerCase()) ? result("local_write", "git remote edit") : result("read_only", "git remote", true);
    case "config":
      return has(p, "--get", "--get-all", "--list", "-l", "--get-regexp") ? result("read_only", "git config --get", true) : result("local_write", "git config");
    case "stash":
      if (/^(list|show)$/.test((rest[0] ?? "").toLowerCase())) return result("read_only", "git stash list", true);
      return /^(drop|clear)$/.test((rest[0] ?? "").toLowerCase()) ? result("destructive", "git stash drop") : result("local_write", "git stash");
    case "reflog": return /^(expire|delete)$/.test((rest[0] ?? "").toLowerCase()) ? result("destructive", "git reflog expire") : result("read_only", "git reflog", true);
    case "clean": return has(p, "-n", "--dry-run") ? result("read_only", "git clean -n", true) : result("destructive", "git clean");
    case "reset": return has(p, "--hard", "--merge", "--keep") && !has(p, "--keep") ? result("destructive", "git reset --hard") : result("local_write", "git reset");
    case "restore": return has(p, "--staged") && !has(p, "--worktree", "-w") ? result("local_write", "git restore --staged") : result("destructive", "git restore");
    case "checkout": return rest.includes("--") || has(p, "-f", "--force", "--theirs", "--ours", "-b", "-B") === false && rest.some((arg) => arg === ".") ? result("destructive", "git checkout -- <paths>") : (has(p, "-f", "--force") ? result("destructive", "git checkout -f") : result("local_write", "git checkout"));
    case "switch": return has(p, "-f", "--force", "--discard-changes") ? result("destructive", "git switch -f") : result("local_write", "git switch");
    case "push": return force || has(p, "--delete", "-d", "--mirror", "--prune") ? result("destructive", "git push --force") : result("external_write", "git push");
    case "gc": case "prune": case "filter-branch": case "filter-repo": case "update-ref": case "replace": return result("destructive", `git ${sub}`);
    case "rm": return has(p, "-f", "--force") || has(p, "-r") ? result("destructive", "git rm -r") : result("local_write", "git rm");
    case "fetch": case "pull": case "clone": case "init": case "add": case "commit": case "merge": case "rebase": case "cherry-pick": case "revert": case "mv": case "apply": case "am":
    case "submodule": case "worktree": case "bisect": case "notes": case "archive": case "bundle": case "sparse-checkout": case "maintenance": case "lfs": case "format-patch": case "request-pull":
      return result("local_write", `git ${sub}`);
    default: return result(null, "");
  }
}

function npmLike(program: string, args: string[]): Result {
  const p = parseArgs(program, args);
  const sub = (p.positional[0] ?? "").toLowerCase();
  if (/^(publish|unpublish|deprecate|dist-tag|access|owner|login|logout|adduser|token|team|org|star|unstar|stars|hook|profile|set-script|whoami-login)$/.test(sub)) {
    return result(sub === "unpublish" ? "destructive" : "external_write", `${program} ${sub}`);
  }
  if (/^(ls|list|ll|la|view|info|show|v|outdated|search|s|find|explain|why|ping|root|prefix|bin|help|docs|home|repo|bugs|fund|doctor-readonly|whoami|diff|query|sbom)$/.test(sub)) return result("read_only", `${program} ${sub}`, true);
  if (sub === "config" || sub === "c") return /^(get|list|ls)$/.test((p.positional[1] ?? "").toLowerCase()) ? result("read_only", `${program} config get`, true) : result("local_write", `${program} config set`);
  if (sub === "audit") return p.positional[1] === "fix" ? result("local_write", `${program} audit fix`) : result("read_only", `${program} audit`, true);
  if (sub === "pack" && has(p, "--dry-run")) return result("read_only", `${program} pack --dry-run`, true);
  if (sub === "") return result("read_only", program, true);
  return result("local_write", `${program} ${sub}`);
}

function pipLike(program: string, args: string[]): Result {
  const sub = (args.find((arg) => !arg.startsWith("-")) ?? "").toLowerCase();
  if (/^(list|show|freeze|check|search|index|help|config-get|inspect|debug)$/.test(sub)) return result("read_only", `${program} ${sub}`, true);
  if (sub === "upload" || sub === "publish") return result("external_write", `${program} ${sub}`);
  return result(sub ? "local_write" : "read_only", `${program} ${sub}`.trim(), !sub);
}

function ghEffect(args: string[]): Result {
  const p = parseArgs("gh", args);
  const area = (p.positional[0] ?? "").toLowerCase();
  const verb = (p.positional[1] ?? "").toLowerCase();
  if (area === "api") {
    const method = (() => {
      const index = args.findIndex((arg) => arg === "-X" || arg === "--method");
      return index >= 0 ? (args[index + 1] ?? "").toUpperCase() : (args.find((arg) => /^(-X|--method=)/.test(arg)) ?? "").replace(/^(-X|--method=)/, "").toUpperCase();
    })();
    if (method === "DELETE") return result("destructive", "gh api -X DELETE");
    if (method && method !== "GET") return result("external_write", `gh api -X ${method}`);
    if (has(p, "-f", "-F", "--field", "--raw-field", "--input")) return result("external_write", "gh api with fields");
    return result("read_only", "gh api", true);
  }
  if (/^(view|list|status|checks|diff|ls|download|watch|browse|search|get|show)$/.test(verb) || (area === "auth" && verb === "status") || area === "status" || area === "search" || area === "browse") return result("read_only", `gh ${area} ${verb}`, true);
  if (/^(delete|remove|rm|archive)$/.test(verb)) return result("destructive", `gh ${area} ${verb}`);
  return result(area ? "external_write" : "read_only", `gh ${area} ${verb}`.trim(), !area);
}

function dockerLike(program: string, args: string[]): Result {
  const p = parseArgs(program, args);
  const sub = (p.positional[0] ?? "").toLowerCase();
  const sub2 = (p.positional[1] ?? "").toLowerCase();
  if (/^(ps|images|image|logs|inspect|version|info|stats|top|diff|history|port|events|search|ls|config)$/.test(sub) && !(sub === "image" && /^(rm|prune|push)$/.test(sub2))) return result("read_only", `${program} ${sub}`, true);
  if (/^(rm|rmi|prune|kill|stop|down|volume|system|network|builder|container|image)$/.test(sub) && /^(rm|rmi|prune|kill|stop|down|remove)$/.test(sub === "rm" || sub === "rmi" || sub === "prune" || sub === "kill" || sub === "stop" || sub === "down" ? sub : sub2)) return result("destructive", `${program} ${sub} ${sub2}`.trim());
  if (sub === "push" || (sub2 === "push")) return result("external_write", `${program} push`);
  return result(sub ? "local_write" : "read_only", `${program} ${sub}`.trim(), !sub);
}

function kubectlLike(program: string, args: string[]): Result {
  const p = parseArgs(program, args);
  const sub = (p.positional[0] ?? "").toLowerCase();
  if (/^(get|describe|logs|top|version|explain|api-resources|api-versions|cluster-info|diff|events|auth|wait|config|completion|plugin|kustomize)$/.test(sub)) return result(sub === "config" && /^(set|use|delete|rename)/.test((p.positional[1] ?? "").toLowerCase()) ? "local_write" : "read_only", `${program} ${sub}`, sub !== "config");
  if (/^(delete|drain|uncordon-all|replace|taint)$/.test(sub)) return result("destructive", `${program} ${sub}`);
  return result(sub ? "external_write" : "read_only", `${program} ${sub}`.trim(), !sub);
}

function helmLike(args: string[]): Result {
  const sub = (args.find((arg) => !arg.startsWith("-")) ?? "").toLowerCase();
  if (/^(list|ls|status|get|show|template|lint|search|history|version|env|repo|dependency|diff|verify|pull|inspect)$/.test(sub)) return result("read_only", `helm ${sub}`, true);
  if (/^(uninstall|delete)$/.test(sub)) return result("destructive", `helm ${sub}`);
  return result(sub ? "external_write" : "read_only", `helm ${sub}`.trim(), !sub);
}

function terraformLike(program: string, args: string[]): Result {
  const sub = (args.find((arg) => !arg.startsWith("-")) ?? "").toLowerCase();
  if (sub === "destroy") return result("destructive", `${program} destroy`);
  if (sub === "apply" || sub === "import" || sub === "taint" || sub === "untaint" || sub === "force-unlock") return result("external_write", `${program} ${sub}`);
  if (/^(plan|validate|show|output|providers|version|graph|fmt|state|workspace|console|test)$/.test(sub)) return result(sub === "fmt" && !args.includes("-check") ? "local_write" : "read_only", `${program} ${sub}`, sub !== "fmt");
  return result(sub ? "local_write" : "read_only", `${program} ${sub}`.trim(), !sub);
}

function cloudLike(program: string, args: string[]): Result {
  const words = args.filter((arg) => !arg.startsWith("-")).map((arg) => arg.toLowerCase());
  if (words.some((w) => /^(delete|remove|rm|terminate|destroy|purge|drop|deregister|revoke|detach-delete|delete-.*|remove-.*|terminate-.*)$/.test(w))) return result("destructive", `${program} delete`);
  if (words.length && words.every((w) => /^(describe.*|list.*|get.*|show.*|ls|read.*|query|logs|status|whoami|version|help|config|sts|caller-identity|account|projects|auth)$/.test(w) || !/^[a-z]/.test(w) || words.indexOf(w) === 0 && /^(s3|ec2|iam|lambda|rds|sts|ecs|eks|sqs|sns|cloudformation|dynamodb|compute|storage|container|functions|run|app|apps|ssm|logs|monitoring)$/.test(w))) {
    return result("read_only", `${program} read`, true);
  }
  return result("external_write", `${program} ${words.slice(0, 2).join(" ")}`.trim());
}

function curlLike(program: string, args: string[], words: Word[]): Result {
  const p = parseArgs(program, args);
  const methodIndex = args.findIndex((arg) => /^(-X|--request|-Method|-method)$/i.test(arg));
  const method = (methodIndex >= 0 ? args[methodIndex + 1] ?? "" : (args.find((arg) => /^(-X|--request=|-method=)/i.test(arg)) ?? "").replace(/^(-X|--request=|-method=)/i, "")).toUpperCase();
  const output = has(p, "-o", "-O", "--output", "--remote-name", "-outfile", "-j", "--remote-header-name");
  void words;
  if (method === "DELETE") return result("destructive", `${program} DELETE`);
  const body = has(p, "-d", "--data", "--data-raw", "--data-binary", "--data-urlencode", "-f", "--form", "-t", "--upload-file", "--json", "-body", "-form", "-infile", "--post-data", "--post-file");
  if ((method && method !== "GET" && method !== "HEAD") || body) return result("external_write", `${program} ${method || "POST"}`);
  if (program === "wget" || output) return result("local_write", `${program} download`);
  return result("read_only", `${program} GET`, true);
}

function rmLike(program: string, args: string[], words: Word[], bulk: boolean): Result {
  const p = parseArgs(program, args);
  const recursive = has(p, "-r", "--recursive", "/s", "-recurse", "-s") || hasPrefix(p, 4, "-recurse") || (program !== "rm" && p.raw.some((arg) => /^\/s$/i.test(arg)));
  const force = has(p, "-f", "--force", "-force", "/f", "/q") || hasPrefix(p, 3, "-force");
  const broad = anyGlob(words.slice(1)) || p.positional.some((arg) => arg === "." || arg === ".." || arg === "/" || arg === "~" || arg === "*" || /^[A-Za-z]:\\?$/.test(arg));
  if (recursive || broad || bulk || (force && p.positional.length > 1) || program === "rd" || program === "rmdir" && recursive) return result("destructive", `${program} recursive/broad`);
  return result("local_write", `${program} file`);
}

function psCmdlet(program: string, args: string[], words: Word[]): Result | null {
  const p = parseArgs(program, args);
  const lower = program.toLowerCase();
  if (/^(invoke-expression|iex)$/.test(lower)) return result("unknown", "iex");
  if (/^(invoke-webrequest|invoke-restmethod|iwr|irm)$/.test(lower)) {
    const m = (args.findIndex((arg) => /^-method$/i.test(arg)) >= 0 ? args[args.findIndex((arg) => /^-method$/i.test(arg)) + 1] ?? "" : "").toUpperCase();
    if (m === "DELETE") return result("destructive", `${program} DELETE`);
    if ((m && m !== "GET" && m !== "HEAD") || has(p, "-body", "-form", "-infile")) return result("external_write", `${program} ${m || "POST"}`);
    return has(p, "-outfile") ? result("local_write", `${program} -OutFile`) : result("read_only", `${program} GET`, true);
  }
  if (/^(remove-item|ri|rm|del|erase|rd|rmdir|remove-itemproperty|clear-content|clear-item|clear-itemproperty|clear-recyclebin)$/.test(lower) && (lower.includes("-") || ["ri"].includes(lower))) {
    const recursive = hasPrefix(p, 4, "-recurse") || has(p, "-r");
    const force = hasPrefix(p, 3, "-force");
    return anyGlob(words.slice(1)) || recursive || force || /^clear-/.test(lower) ? result("destructive", `${program} -Recurse/-Force`) : result("local_write", program);
  }
  if (/^(start-process|saps|start-job|invoke-command|icm|new-pssession|enter-pssession)$/.test(lower)) return result("unknown", program);
  if (/^(set-content|add-content|out-file|new-item|copy-item|move-item|rename-item|set-item|expand-archive|compress-archive|export-csv|export-clixml|tee-object|set-itemproperty|new-itemproperty|install-module|install-package|install-script|update-module|set-variable|new-variable|set-executionpolicy|register-scheduledtask|new-service|set-service|stop-service|start-service|restart-service|set-alias|new-alias|import-module-write)$/.test(lower)) return result("local_write", program);
  if (/^(publish-module|publish-script|send-mailmessage|publish-package|new-azresource|remove-azresource|set-azresource)$/.test(lower)) return result(/^remove-/.test(lower) ? "destructive" : "external_write", program);
  if (/^(stop-process|kill|spps|stop-computer|restart-computer|format-volume|clear-disk|remove-partition|remove-computer)$/.test(lower)) return result(/computer|volume|disk|partition/.test(lower) ? "destructive" : "local_write", program);
  if (lower.includes("-") && READ_VERB.test(lower)) return result("read_only", program, true);
  if (/^(foreach-object|%|where-object|\?|foreach|select|measure|group)$/.test(lower)) return result("read_only", program, true);
  return null;
}

// --- Segment and command classification ---------------------------------------------------------------------------

type Merge = { effect: Effect | null; readOnly: boolean; matched: string[]; sawAny: boolean };

function combine(into: Merge, part: Result): void {
  if (part.effect && (into.effect === null || RANK[part.effect] > RANK[into.effect])) into.effect = part.effect;
  if (part.effect !== "read_only" || !part.readOnly) into.readOnly = false;
  into.matched.push(...part.matched);
  into.sawAny = true;
}

function skipFlagsWithValues(args: string[], valued: Set<string>): number {
  let i = 0;
  while (i < args.length && args[i]!.startsWith("-") && args[i] !== "--") {
    i += valued.has(args[i]!) ? 2 : 1;
  }
  if (args[i] === "--") i += 1;
  return i;
}

/** Classify an embedded command string, or give up (as `unknown`) once nesting gets too deep. */
function nested(src: string, depth: number, label: string): CommandClassification {
  return depth >= MAX_DEPTH ? { effect: "unknown", confirmed_read_only: false, matched: [label] } : classifyString(src, depth + 1);
}

/**
 * An expanded argument can carry a flag the classifier never sees (`find . $ARGS` with ARGS=-delete), and a heredoc
 * feeds unseen input to its command, so neither is ever confirmed read-only. The effect itself is unchanged.
 */
function classifySegment(segment: Segment, mode: Mode, depth: number, bulk = false): Merge {
  const merged = classifySegmentCore(segment, mode, depth, bulk);
  if (segment.words.slice(1).some((word) => word.expanded) || segment.heredocBody !== null) merged.readOnly = false;
  return merged;
}

function classifySegmentCore(segment: Segment, mode: Mode, depth: number, bulk = false): Merge {
  const merged: Merge = { effect: null, readOnly: true, matched: [], sawAny: false };
  const words = [...segment.words];
  while (words.length && (LEADING_KEYWORDS.has(words[0]!.text) || /^[A-Za-z_][A-Za-z0-9_]*=/.test(words[0]!.text))) words.shift();
  for (const redirect of segment.redirects) {
    const target = redirect.target.toLowerCase();
    if (/^[<>]&/.test(redirect.op) || redirect.op === "<" || redirect.op === "<<<") continue;
    if (target === "/dev/null" || target === "nul" || target === "$null" || target === "\u0001" && false) continue;
    if (/^&?\d+$/.test(target)) continue;
    combine(merged, result("local_write", `redirect ${redirect.op}`));
  }
  for (const inner of segment.subst) {
    const part = depth >= MAX_DEPTH ? { effect: "unknown" as Effect, confirmed_read_only: false, matched: ["nested substitution"] } : classifyOnce(inner, mode, depth + 1);
    combine(merged, { effect: part.effect, readOnly: part.confirmed_read_only, matched: part.matched.map((label) => `subst:${label}`) });
    if (part.effect === null) merged.readOnly = merged.readOnly && false;
  }
  if (!words.length) return merged;
  const head = words[0]!;
  if (head.expanded) {
    // A variable or substitution in command position can name any program.
    combine(merged, result("unknown", "dynamic command name"));
    return merged;
  }
  const program = head.text.replace(/\\/g, "/").split("/").pop()!.toLowerCase().replace(/\.(exe|com|cmd|bat)$/, "");
  const args = words.slice(1).map((word) => word.text);

  const stdinFromPipe = segment.pipedFrom || segment.heredocBody !== null;
  if (INTERPRETERS.has(program) && stdinFromPipe && !args.some((arg) => /^(-c|-e|-command|-c|\/c|-encodedcommand|-enc)$/i.test(arg))) {
    combine(merged, result("unknown", `${program} reads piped or heredoc code`));
    return merged;
  }

  if (WRAPPERS.has(program)) {
    let rest: string[];
    if (program === "env") {
      let i = 0;
      while (i < args.length && (args[i]!.startsWith("-") || /^[A-Za-z_][A-Za-z0-9_]*=/.test(args[i]!))) i += args[i] === "-u" || args[i] === "-C" ? 2 : 1;
      rest = args.slice(i);
    } else if (program === "sudo" || program === "doas") {
      rest = args.slice(skipFlagsWithValues(args, new Set(["-u", "-g", "-h", "-p", "-C", "-D", "-r", "-t", "-U", "-T", "-R"])));
      if (!rest.length) {
        combine(merged, result("unknown", `${program} shell`));
        return merged;
      }
    } else if (program === "timeout") {
      const index = skipFlagsWithValues(args, new Set(["-s", "-k", "--signal", "--kill-after"]));
      rest = args.slice(index + 1);
    } else if (program === "xargs") {
      rest = args.slice(skipFlagsWithValues(args, new Set(["-I", "-n", "-P", "-d", "-E", "-L", "-s", "-a", "-i", "--max-args", "--max-procs", "--delimiter"])));
      if (!rest.length) rest = ["echo"];
      bulk = true;
    } else if (program === "nice" || program === "ionice" || program === "chrt" || program === "stdbuf" || program === "watch") {
      rest = args.slice(skipFlagsWithValues(args, new Set(["-n", "-c", "-p", "-i", "-o", "-e", "-d", "--interval"])));
    } else if (program === "start" || program === "call") {
      rest = args.filter((arg) => !/^\/(b|wait|min|max|d.*|i)$/i.test(arg));
      if (rest[0]?.startsWith('"') || rest[0] === "") rest = rest.slice(1);
    } else {
      rest = args.slice(skipFlagsWithValues(args, new Set()));
    }
    if (!rest.length) {
      combine(merged, result("read_only", program, true));
      return merged;
    }
    const tail = rest.length <= words.length - 1 && rest.every((text, index) => words[words.length - rest.length + index]!.text === text);
    const innerWords: Word[] = tail ? words.slice(words.length - rest.length) : rest.map((text) => ({ text, expanded: false, glob: false }));
    const inner = classifySegment({ ...segment, words: innerWords, redirects: [], subst: [] }, mode, depth, bulk);
    combine(merged, { effect: inner.effect, readOnly: inner.readOnly && inner.sawAny, matched: [program, ...inner.matched] });
    if (inner.effect === null) merged.readOnly = false;
    return merged;
  }

  if (SHELLS.has(program) || program === "cmd" || program === "pwsh" || program === "powershell") {
    const index = args.findIndex((arg) => /^(-[a-z]*c|-command|\/c|\/k|-c|-commandwithargs|-cwa)$/i.test(arg) && !/^-encodedcommand$/i.test(arg));
    const encoded = args.some((arg) => /^-(e|ec|enc|encodedcommand)$/i.test(arg));
    if (encoded) {
      combine(merged, result("unknown", `${program} encoded command`));
      return merged;
    }
    if (index >= 0) {
      const script = args.slice(index + 1).join(" ");
      if (words.slice(index + 2).some((word) => word.expanded)) combine(merged, result("unknown", `${program} dynamic script`));
      const part = nested(script, depth, "nested shell");
      combine(merged, { effect: part.effect, readOnly: part.confirmed_read_only, matched: [program, ...part.matched] });
      return merged;
    }
    // Running a script file or an interactive shell: nothing to analyze.
    combine(merged, result(args.length ? null : "unknown", program));
    if (!args.length) merged.sawAny = true;
    merged.readOnly = false;
    return merged;
  }

  if (program === "eval") {
    combine(merged, result("unknown", "eval"));
    return merged;
  }
  if (program === "find" || program === "fd" || program === "fdfind") {
    if (args.some((arg) => arg === "-delete")) {
      combine(merged, result("destructive", "find -delete"));
      return merged;
    }
    const exec = args.findIndex((arg) => /^(-exec|-execdir|-ok|-okdir|-x|--exec|--exec-batch|-X)$/.test(arg));
    if (exec >= 0) {
      const tail = args.slice(exec + 1);
      const end = tail.findIndex((arg) => arg === ";" || arg === "+" || arg === "\\;");
      const innerWords = (end >= 0 ? tail.slice(0, end) : tail).filter((arg) => arg !== "{}");
      const inner = classifySegment({ ...segment, words: innerWords.map((text) => ({ text, expanded: false, glob: false })), redirects: [], subst: [] }, mode, depth, true);
      combine(merged, { effect: inner.effect ?? "unknown", readOnly: false, matched: ["find -exec", ...inner.matched] });
      return merged;
    }
    if (args.some((arg) => /^-(fprint0?|fprintf|fls)$/.test(arg))) combine(merged, result("local_write", "find -fprint"));
    else combine(merged, result("read_only", "find", true));
    return merged;
  }

  let handled: Result | null = null;
  if (program === "git") handled = gitEffect(args);
  else if (program === "npm" || program === "npx" || program === "yarn" || program === "pnpm" || program === "bun" || program === "pnpx" || program === "corepack") handled = program === "npx" || program === "pnpx" ? result("local_write", `${program}`) : npmLike(program, args);
  else if (program === "pip" || program === "pip3" || program === "pipx" || program === "conda" || program === "mamba") handled = pipLike(program, args);
  else if (program === "gh") handled = ghEffect(args);
  else if (program === "docker" || program === "podman" || program === "docker-compose" || program === "nerdctl") handled = dockerLike(program, args);
  else if (program === "kubectl" || program === "oc" || program === "k3s" || program === "minikube") handled = kubectlLike(program, args);
  else if (program === "helm" || program === "helmfile") handled = helmLike(args);
  else if (program === "terraform" || program === "tofu" || program === "terragrunt" || program === "pulumi") handled = terraformLike(program, args);
  else if (CLOUD.has(program)) handled = cloudLike(program, args);
  else if (program === "curl" || program === "wget" || program === "http" || program === "https" || program === "xh") handled = curlLike(program, args, words);
  else if (program === "rm" || program === "del" || program === "erase" || program === "rd" || program === "rmdir" || program === "unlink") handled = program === "rmdir" && !args.some((arg) => /^\/s$/i.test(arg)) ? result("local_write", "rmdir") : rmLike(program, args, words, bulk);
  else if (program === "dd") handled = args.some((arg) => /^of=/.test(arg)) ? result("destructive", "dd of=") : result("read_only", "dd", false);
  else if (program === "truncate") handled = result("destructive", "truncate");
  else if (program === "chmod" || program === "chown" || program === "chgrp") handled = parseArgs(program, args).flags.has("-r") || has(parseArgs(program, args), "--recursive", "/t") ? result("destructive", `${program} -R`) : result("local_write", program);
  else if (program === "mv" || program === "cp" || program === "move" || program === "copy") handled = has(parseArgs(program, args), "-f", "--force", "/y") && anyGlob(words.slice(1)) ? result("destructive", `${program} -f with glob`) : result("local_write", program);
  else if (program === "robocopy") handled = args.some((arg) => /^\/(mir|purge|mov|move)$/i.test(arg)) ? result("destructive", "robocopy /mir") : result("local_write", "robocopy");
  else if (program === "reg") handled = /^delete$/i.test(args[0] ?? "") ? result("destructive", "reg delete") : /^(add|import|copy|load|restore|save|unload)$/i.test(args[0] ?? "") ? result("local_write", "reg write") : result("read_only", "reg query", true);
  else if (program === "sed" || program === "perl" && false) handled = has(parseArgs("sed", args), "-i", "--in-place") || args.some((arg) => /^-[a-z]*i/.test(arg) && program === "sed") ? result("local_write", "sed -i") : result("read_only", "sed", true);
  else if (program === "awk" || program === "gawk" || program === "mawk") handled = args.some((arg) => /system\s*\(|\|\s*getline|print\s*>|printf\s*>|-i\s*inplace/.test(arg)) ? result("unknown", "awk system/redirect") : result("read_only", "awk", true);
  else if (program === "tar") handled = /(^-?[a-z]*[xc])/.test(args[0] ?? "") || has(parseArgs("tar", args), "-x", "-c", "--extract", "--create", "--append", "-r", "-u") ? result("local_write", "tar create/extract") : result("read_only", "tar", true);
  else if (program === "unzip") handled = has(parseArgs("unzip", args), "-l", "-v", "-t") ? result("read_only", "unzip -l", true) : result("local_write", "unzip");
  else if (SQL_CLIENTS.has(program)) {
    const sqlIndex = args.findIndex((arg) => /^(-c|-e|--command|--execute|--eval|--query)$/.test(arg));
    handled = sqlIndex >= 0 ? result(classifySql(args[sqlIndex + 1] ?? ""), `${program} sql`, classifySql(args[sqlIndex + 1] ?? "") === "read_only") : result("external_write", `${program} session`);
  } else if (program === "systemctl" || program === "service") handled = /^(status|is-active|is-enabled|list-units|list-unit-files|show|cat|list-timers)$/.test(args.find((arg) => !arg.startsWith("-")) ?? "") || /\bstatus\b/.test(args.join(" ")) ? result("read_only", `${program} status`, true) : result(/^(stop|disable|mask|kill)$/.test(args.find((arg) => !arg.startsWith("-")) ?? "") ? "destructive" : "local_write", `${program} change`);
  else if (program === "kill" || program === "pkill" || program === "killall" || program === "taskkill") handled = result(has(parseArgs("kill", args), "-9", "-kill", "/f", "-sigkill") || args.includes("-KILL") ? "destructive" : "local_write", `${program}`);
  else if (program === "crontab") handled = has(parseArgs(program, args), "-l") ? result("read_only", "crontab -l", true) : has(parseArgs(program, args), "-r") ? result("destructive", "crontab -r") : result("local_write", "crontab");
  else if (EXTERNAL_PROGRAMS.has(program)) {
    // `ssh host cmd` runs cmd remotely: keep the stricter of "external" and the inner command.
    const hostIndex = program === "ssh" ? args.findIndex((arg, index) => !arg.startsWith("-") && !(index > 0 && /^-[oplFiJ]$/.test(args[index - 1]!))) : -1;
    const innerText = hostIndex >= 0 ? args.slice(hostIndex + 1).join(" ") : "";
    const inner = innerText && depth < MAX_DEPTH ? classifyString(innerText, depth + 1) : null;
    handled = result(strictestEffect("external_write", inner?.effect), program);
  } else if (DESTRUCTIVE_PROGRAMS.has(program) || program.startsWith("mkfs.")) handled = result("destructive", program);
  else if (psCmdlet(program, args, words)) handled = psCmdlet(program, args, words);
  else if (program === "tee") handled = result("local_write", "tee");
  else if (LOCAL_WRITE_PROGRAMS.has(program)) handled = result("local_write", program);
  else if (INTERPRETERS.has(program)) handled = NONE;
  else if (READ_ONLY.has(program)) handled = (program === "env" ? NONE : result("read_only", program, true));

  const part = handled ?? NONE;
  if (part.effect === null) merged.readOnly = false;
  combine(merged, part);
  return merged;
}

function classifyOnce(src: string, mode: Mode, depth: number): CommandClassification {
  const lexed = lex(src, mode);
  const merged: Merge = { effect: null, readOnly: true, matched: [], sawAny: false };
  if (lexed.unparsed) combine(merged, result("unknown", "unparsed shell syntax"));
  for (const segment of lexed.segments) {
    const part = classifySegment(segment, mode, depth);
    if (part.effect !== null) combine(merged, { effect: part.effect, readOnly: part.readOnly, matched: part.matched });
    else {
      merged.readOnly = false;
      merged.matched.push(...part.matched);
    }
  }
  if (lexed.unparsed) {
    merged.readOnly = false;
    for (const piece of src.split(/[;&|\n]+/)) {
      const trimmed = piece.trim();
      if (!trimmed || trimmed.length >= src.length) continue;
      const part = classifyOnce(trimmed, mode, depth);
      if (part.effect) combine(merged, { effect: part.effect, readOnly: false, matched: part.matched });
    }
  }
  return {
    effect: merged.effect,
    confirmed_read_only: merged.effect === "read_only" && merged.readOnly && lexed.segments.length > 0,
    matched: [...new Set(merged.matched)],
  };
}

function classifyString(src: string, depth: number): CommandClassification {
  if (src.length > MAX_COMMAND_CHARS) return { effect: "unknown", confirmed_read_only: false, matched: ["command too long"] };
  const a = classifyOnce(src, "posix", depth);
  const b = classifyOnce(src, "win", depth);
  const effect = a.effect === null ? b.effect : b.effect === null ? a.effect : RANK[a.effect] >= RANK[b.effect] ? a.effect : b.effect;
  return {
    effect,
    confirmed_read_only: a.confirmed_read_only && b.confirmed_read_only,
    matched: [...new Set([...a.matched, ...b.matched])],
  };
}

/** Classify a shell command (bash, PowerShell or cmd) into the effect it would have if run. */
export function classifyCommand(command: string): CommandClassification {
  return classifyString(command, 0);
}

/** Strictest of the declared effect and what the command text shows. Never looser than the declaration. */
export function effectiveEffect(declared: Effect, command?: string): EffectiveEffect {
  const inferred = command ? classifyCommand(command) : null;
  const effective = strictestEffect(declared, inferred?.effect);
  return { declared, inferred: inferred?.effect ?? null, effective, matched: inferred?.matched ?? [], upgraded: effective !== declared };
}
