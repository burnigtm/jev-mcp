import { open, stat } from "node:fs/promises";
import { isAbsolute, relative, resolve } from "node:path";
import { effectiveEffect, commandSegments, type Effect } from "./effects.js";
import { errorDetails } from "./errors.js";
import { workingChanges } from "./git.js";
import { worstAction, type PolicyAction } from "./policy.js";
import { redactSecrets } from "./redact.js";
import { evaluatePolicy, loadRepoPolicy, NO_POLICY_VERDICT, POLICY_FILE_NAME, type PolicyVerdict } from "./repo-policy.js";
import { isSensitivePath } from "./sensitive.js";
import { containsInjectionInstruction } from "./untrusted.js";

/**
 * The decision core shared by the Claude Code hooks, `jev-mcp check` and the CI gate. Two questions:
 * may this single action proceed (`checkToolUse`), and does this set of changes hold up (`checkChanges`).
 * Everything that can be decided without a model is decided first; the model is only asked about the
 * gray zone. A result only ever restricts: `auto` means "no objection", never "permitted".
 */

export type CheckSource = "not_applicable" | "read_only" | "file_edit" | "policy" | "model" | "fail_closed" | "no_task" | "sensitive" | "config";

export type CheckResult = {
  action: PolicyAction;
  source: CheckSource;
  reasons: string[];
  /** The policy rule that decided, when one did. */
  rule: string | null;
  effect: Effect | null;
  model_calls: number;
};

export type ToolUseEvent = {
  tool_name?: unknown;
  tool_input?: unknown;
  cwd?: unknown;
  transcript_path?: unknown;
  /** The approved task, when the caller has it (otherwise it is read from the transcript). */
  task?: unknown;
};

export type MappedAction = {
  name: string;
  description: string;
  effect: Effect;
  target?: string;
  command?: string;
  kind: "command" | "file";
};

const SHELL_TOOLS = new Set(["Bash", "PowerShell"]);
const FILE_TOOLS = new Set(["Write", "Edit", "MultiEdit", "NotebookEdit"]);
/** Reads are only checked against sensitive and protected paths; they never reach the model. */
const READ_TOOLS = new Set(["Read"]);

/** Hook tool names this module checks. Anything else is not applicable. */
export function isCheckedTool(name: unknown): boolean {
  return typeof name === "string" && (SHELL_TOOLS.has(name) || FILE_TOOLS.has(name) || READ_TOOLS.has(name));
}

function text(value: unknown, max: number): string | undefined {
  return typeof value === "string" ? value.slice(0, max) : undefined;
}

export function actionFromTool(event: ToolUseEvent): MappedAction | null {
  if (typeof event.tool_name !== "string" || typeof event.tool_input !== "object" || event.tool_input === null) return null;
  const input = event.tool_input as Record<string, unknown>;
  const name = event.tool_name;
  if (SHELL_TOOLS.has(name)) {
    const command = text(input.command, 8_000);
    if (!command) return null;
    // The hook declares nothing about the command; the classifier raises this to what the text shows.
    return { name, description: text(input.description, 500) || `Run a ${name} command`, effect: "read_only", command, kind: "command" };
  }
  if (FILE_TOOLS.has(name) || READ_TOOLS.has(name)) {
    const target = text(input.file_path ?? input.notebook_path ?? input.path, 2_000);
    if (!target) return null;
    return { name, description: `${name} ${target}`, effect: READ_TOOLS.has(name) ? "read_only" : "local_write", target, kind: "file" };
  }
  return null;
}

/** Files that configure this guard or the agent's own permissions: editing them is never routine. */
const SELF_PROTECTED = [POLICY_FILE_NAME, ".claude/settings.json", ".claude/settings.local.json", ".claude/hooks/"];

function relativeToWorkspace(cwd: string, path: string): string | null {
  const absolute = isAbsolute(path) ? path : resolve(cwd, path);
  const rel = relative(cwd, absolute);
  if (rel === "" || rel.startsWith("..") || isAbsolute(rel)) return null;
  return rel.split("\\").join("/");
}

/** The last human prompt in a Claude Code transcript, read defensively from the tail of the file. */
export async function readTask(transcriptPath: unknown): Promise<string | undefined> {
  if (typeof transcriptPath !== "string" || !transcriptPath) return undefined;
  try {
    const info = await stat(transcriptPath);
    if (!info.isFile()) return undefined;
    const length = Math.min(info.size, 2_000_000);
    const handle = await open(transcriptPath, "r");
    let raw: string;
    try {
      const buffer = Buffer.alloc(length);
      await handle.read(buffer, 0, length, info.size - length);
      raw = buffer.toString("utf8");
    } finally {
      await handle.close();
    }
    const lines = raw.split("\n");
    // The first line of a tail read may be cut in half; JSON.parse rejects it below.
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i]!.trim();
      if (!line) continue;
      let entry: { type?: unknown; isSidechain?: unknown; isMeta?: unknown; message?: { content?: unknown } };
      try {
        entry = JSON.parse(line);
      } catch {
        continue;
      }
      if (entry.type !== "user" || entry.isSidechain === true || entry.isMeta === true) continue;
      const content = entry.message?.content;
      const parts = typeof content === "string"
        ? [content]
        : Array.isArray(content)
          ? content.flatMap((block: unknown) => (typeof block === "object" && block !== null && (block as { type?: unknown }).type === "text" && typeof (block as { text?: unknown }).text === "string" ? [(block as { text: string }).text] : []))
          : [];
      const prompt = parts.join("\n").trim();
      // Command wrappers and system reminders are harness text, not something the user typed.
      if (!prompt || /^<(system-reminder|command-|local-command|user-prompt-submit-hook)/.test(prompt)) continue;
      return prompt.slice(0, 4_000);
    }
  } catch {
    return undefined;
  }
  return undefined;
}

/**
 * What to do when the model cannot be asked. A flaky network must not block a present user from routine
 * work, but a destructive action should not slip through unreviewed.
 */
export function failClosedAction(effect: Effect | null): PolicyAction {
  if (effect === "destructive") return "escalate";
  if (effect === "external_write" || effect === "unknown") return "review";
  return "auto";
}

export type ToolUseOptions = {
  /** Absolute deadline (ms since epoch) for the model call. */
  deadline?: number;
  /** False when a per-session call cap has been reached; the fail-closed rules apply instead. */
  allowModel?: boolean;
  /** Called just before a model call, to count it. */
  onModelCall?: () => void;
};

function pathTokens(command: string): string[] {
  try {
    // `HEAD:.env` and `--file=.env` carry a path after a separator.
    return commandSegments(command).flatMap(segment => segment.tokens.slice(1).flatMap(token => [token, ...token.split(/[:=]/).slice(1)]));
  } catch {
    return [];
  }
}

export async function checkToolUse(event: ToolUseEvent, options: ToolUseOptions = {}): Promise<CheckResult> {
  const mapped = actionFromTool(event);
  const none: CheckResult = { action: "auto", source: "not_applicable", reasons: [], rule: null, effect: null, model_calls: 0 };
  if (!mapped) return none;
  const cwd = typeof event.cwd === "string" && event.cwd ? event.cwd : process.cwd();

  let policy;
  try {
    policy = loadRepoPolicy(cwd);
  } catch {
    // A policy file that cannot be read is something to look at, not something to ignore.
    return { action: "review", source: "config", reasons: ["policy_unreadable"], rule: null, effect: mapped.effect, model_calls: 0 };
  }

  if (mapped.kind === "file") return checkFileEdit(mapped, cwd, policy);

  const effects = effectiveEffect(mapped.effect, mapped.command);
  const suspicious = mapped.command !== undefined && containsInjectionInstruction(mapped.command);
  const verdict: PolicyVerdict = policy
    ? evaluatePolicy(policy, { command: mapped.command, allowEligible: effects.effective === "read_only" && effects.confirmedReadOnly && !suspicious })
    : NO_POLICY_VERDICT;
  const sensitive = pathTokens(mapped.command!).some(token => isSensitivePath(token));
  const base = { rule: verdict.rule, effect: effects.effective, model_calls: 0 };

  if (verdict.decision === "deny") return { action: "escalate", source: "policy", reasons: ["policy_denied"], ...base };
  const floors: string[] = [];
  if (verdict.decision === "review") floors.push("policy_review");
  if (sensitive) floors.push("sensitive_path");
  if (suspicious) floors.push("injection_suspected");
  if (effects.effective === "read_only" && effects.confirmedReadOnly && floors.length === 0) {
    return { action: "auto", source: "read_only", reasons: [], ...base };
  }
  // A review floor is final for a read-only command that touches a sensitive path: asking is enough.
  if (effects.effective === "read_only" && effects.confirmedReadOnly) {
    return { action: "review", source: floors.includes("policy_review") ? "policy" : "sensitive", reasons: floors, ...base };
  }

  const task = typeof event.task === "string" && event.task.trim() ? event.task.trim().slice(0, 4_000) : await readTask(event.transcript_path);
  if (!task) {
    return { action: worstAction(["review", ...(failClosedAction(effects.effective) === "escalate" ? ["escalate" as const] : [])]), source: "no_task", reasons: [...floors, "no_task"], ...base };
  }
  if (options.allowModel === false) {
    return { action: worstAction(["auto", ...(floors.length ? ["review" as const] : []), failClosedAction(effects.effective)]), source: "fail_closed", reasons: [...floors, "call_cap"], ...base };
  }

  try {
    options.onModelCall?.();
    const { runScope } = await import("./tools/scope.js");
    const scope = await runScope({
      task,
      action: {
        name: mapped.name,
        description: mapped.description,
        effect: mapped.effect,
        command: redactSecrets(mapped.command!).text,
      },
    }, options.deadline === undefined ? undefined : { deadline: options.deadline });
    return {
      action: worstAction([scope.action, ...(floors.length ? ["review" as const] : [])]),
      source: "model",
      reasons: [...floors, ...scope.reason_codes.filter((code: string) => code !== "accepted")],
      rule: verdict.rule,
      effect: effects.effective,
      model_calls: 1,
    };
  } catch (error) {
    const code = errorDetails(error).code;
    return {
      action: worstAction(["auto", ...(floors.length ? ["review" as const] : []), failClosedAction(effects.effective)]),
      source: "fail_closed",
      reasons: [...floors, `model_unavailable:${code.toLowerCase()}`],
      rule: verdict.rule,
      effect: effects.effective,
      model_calls: 1,
    };
  }
}

function checkFileEdit(mapped: MappedAction, cwd: string, policy: ReturnType<typeof loadRepoPolicy>): CheckResult {
  const target = mapped.target!;
  const verdict = policy ? evaluatePolicy(policy, { target }) : NO_POLICY_VERDICT;
  const base = { rule: verdict.rule, effect: mapped.effect, model_calls: 0 };
  if (verdict.decision === "deny") return { action: "escalate", source: "policy", reasons: ["policy_denied"], ...base };
  const rel = relativeToWorkspace(cwd, target);
  const reading = mapped.effect === "read_only";
  const reasons: string[] = [];
  if (verdict.decision === "review") reasons.push("policy_review");
  // Reading outside the workspace is routine (docs, other repositories); writing there is not.
  if (rel === null && !reading) reasons.push("outside_workspace");
  // A home-directory key or credential file is outside the workspace, so test the absolute path as well.
  if (isSensitivePath(rel ?? target)) reasons.push("sensitive_path");
  if (rel !== null && !reading && SELF_PROTECTED.some(path => rel === path || (path.endsWith("/") && rel.startsWith(path)))) reasons.push("config_change");
  if (reasons.length) return { action: "review", source: reasons.includes("policy_review") ? "policy" : "sensitive", reasons, ...base };
  return { action: "auto", source: "file_edit", reasons: [], ...base };
}

// --- Changes ----------------------------------------------------------------------------------------

/** Up to five completion claims from an assistant's closing message. */
export function extractClaims(message: unknown): string[] {
  if (typeof message !== "string") return [];
  const claims: string[] = [];
  const completion = /\b(fixed|fixes|implemented|added|adds|updated|refactored|removed|resolved|passes|passing|passed|all tests|tests? (?:pass|are passing|now pass)|works?|done|complete[d]?|finished)\b/i;
  for (const raw of message.replace(/```[\s\S]*?```/g, " ").split(/(?<=[.!?])\s+|\n+/)) {
    const sentence = raw.replace(/^[\s>*\-\d.)]+/, "").trim();
    if (sentence.length < 12 || sentence.length > 300 || sentence.endsWith("?")) continue;
    if (!completion.test(sentence)) continue;
    if (!claims.includes(sentence)) claims.push(sentence);
    if (claims.length === 5) break;
  }
  return claims;
}

export type ChangesInput = {
  cwd: string;
  request: string;
  claims?: string[];
  evidence?: string;
  tests?: string;
  base?: string;
  risk?: boolean;
  deadline?: number;
};

export type ChangesResult = {
  action: PolicyAction;
  reasons: string[];
  files: number;
  secrets_redacted: number;
  withheld: string[];
  claims: string[];
  gate: unknown | null;
  model_calls: number;
};

export type GateDiffInput = {
  diff: string;
  /** Repository-relative paths whose content was withheld because they are sensitive. */
  withheld: string[];
  truncated: boolean;
  request: string;
  claims?: string[];
  evidence?: string;
  tests?: string;
  risk?: boolean;
  deadline?: number;
};

/** Redact, apply the deterministic floors, and run the completion gate on a diff that is already in hand. */
export async function gateDiff(input: GateDiffInput): Promise<ChangesResult> {
  const diff = redactSecrets(input.diff);
  const tests = redactSecrets(input.tests ?? "");
  const evidence = redactSecrets(input.evidence ?? "");
  const claims = input.claims ?? [];
  const floors: string[] = [];
  if (diff.count > 0) floors.push("secret_in_diff");
  if (input.withheld.length) floors.push("sensitive_file_changed");
  if (input.truncated) floors.push("diff_truncated");

  const context = input.deadline === undefined ? undefined : { deadline: input.deadline };
  if (claims.length === 0) {
    // Nothing was claimed, so there is nothing to verify: judge the patch and its security, and do not invent a
    // claim that no evidence could support.
    const [{ runReview }, { runRisk }] = await Promise.all([import("./tools/review.js"), import("./tools/risk.js")]);
    const common = { request: input.request, diff: diff.text, tests: tests.text };
    const [review, security] = await Promise.all([
      runReview(common, context),
      input.risk === false ? Promise.resolve(null) : runRisk(common, context),
    ]);
    const reasons = [...floors];
    for (const code of [...review.reason_codes, ...(security?.reason_codes ?? [])]) if (code !== "accepted" && !reasons.includes(code)) reasons.push(code);
    return {
      action: worstAction([review.action, ...(security ? [security.action] : []), ...(floors.length ? ["review" as const] : [])]),
      reasons,
      files: (diff.text.match(/^diff --git /gm) ?? []).length,
      secrets_redacted: diff.count + tests.count + evidence.count,
      withheld: input.withheld,
      claims,
      gate: { review, security, chunks: [...(review.chunks ?? []), ...(security?.chunks ?? [])] },
      model_calls: security ? 2 : 1,
    };
  }

  const { runGate } = await import("./tools/gate.js");
  const gate = await runGate({
    request: input.request,
    diff: diff.text,
    claims,
    evidence: `${evidence.text}\nChanged files: ${(diff.text.match(/^diff --git /gm) ?? []).length}`.trim(),
    tests: tests.text,
    risk: input.risk ?? true,
  }, context);
  const reasons = [...floors, ...gate.reason_codes.filter((code: string) => code !== "accepted")];
  return {
    action: worstAction([gate.action, ...(floors.length ? ["review" as const] : [])]),
    reasons,
    files: (diff.text.match(/^diff --git /gm) ?? []).length,
    secrets_redacted: diff.count + tests.count + evidence.count,
    withheld: input.withheld,
    claims,
    gate,
    model_calls: 1,
  };
}

/** Gate the working tree's uncommitted changes against the request and the completion claims. */
export async function checkChanges(input: ChangesInput): Promise<ChangesResult> {
  const changes = await workingChanges(input.cwd, input.base);
  const empty = { files: 0, secrets_redacted: 0, withheld: [] as string[], claims: [] as string[], gate: null, model_calls: 0 };
  if (!changes) return { action: "auto", reasons: ["not_a_repository"], ...empty };
  if (!changes.diff.trim()) return { action: "auto", reasons: ["no_changes"], ...empty };
  return gateDiff({ ...input, diff: changes.diff, withheld: changes.withheld, truncated: changes.truncated });
}
