import { spawn } from "node:child_process";
import { appendFileSync, mkdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { checkChanges, checkToolUse, extractClaims, isCheckedTool, readTask, type ChangesResult, type CheckResult } from "./check.js";
import { defaultLedgerDir, newDecisionId, recordDecision, type LedgerSettings } from "./ledger.js";
import type { PolicyAction } from "./policy.js";
import { redactSecrets } from "./redact.js";
import { loadRepoPolicy } from "./repo-policy.js";

/**
 * Claude Code hook adapters over the check core. The contract (verified against the hooks documentation):
 * the event arrives as JSON on stdin; printing nothing and exiting 0 leaves the normal permission flow in
 * place; a PreToolUse hook may print `permissionDecision` `ask` or `deny` (this adapter never prints
 * `allow`, so a hook can only restrict); a Stop hook may print `{ "decision": "block", "reason": ... }`.
 * Only a single JSON line goes to stdout. Diagnostics go to stderr.
 */

export type HookKind = "pre-tool-use" | "stop";
export type HookRun = { stdout: string; stderr: string; exitCode: number };

const SILENT: HookRun = { stdout: "", stderr: "", exitCode: 0 };
export const DEFAULT_HOOK_DEADLINE_MS = 20_000;
export const DEFAULT_STOP_DEADLINE_MS = 80_000;
export const DEFAULT_SESSION_CALL_CAP = 200;
export const MAX_STOP_BLOCKS = 2;

type HookMode = "off" | "shadow" | "enforce";

function modeOf(env: NodeJS.ProcessEnv): HookMode {
  const raw = env.JEV_MCP_HOOKS?.trim().toLowerCase();
  if (raw === "off" || raw === "0" || raw === "false") return "off";
  if (raw === "shadow") return "shadow";
  return "enforce";
}

function intOf(raw: string | undefined, fallback: number): number {
  const value = Number(raw);
  return raw && Number.isSafeInteger(value) && value > 0 ? value : fallback;
}

// --- Per-session counters ---------------------------------------------------------------------------

/** One byte appended per event: the file size is the count, and concurrent hooks cannot lose an increment. */
function counterFile(sessionId: unknown, name: string): string | null {
  if (typeof sessionId !== "string" || !sessionId) return null;
  const dir = join(tmpdir(), "jev-mcp-hooks");
  try {
    mkdirSync(dir, { recursive: true, mode: 0o700 });
  } catch {
    return null;
  }
  return join(dir, `${createHash("sha256").update(sessionId).digest("hex").slice(0, 24)}.${name}`);
}

function readCount(file: string | null): number {
  if (!file) return 0;
  try {
    return statSync(file).size;
  } catch {
    return 0;
  }
}

function bump(file: string | null): void {
  if (!file) return;
  try {
    appendFileSync(file, "x", { mode: 0o600 });
  } catch {
    // A counter that cannot be written only loosens a cost cap, never a decision.
  }
}

function ledgerSettings(env: NodeJS.ProcessEnv): LedgerSettings {
  return {
    enabled: ["1", "true", "yes"].includes(env.JEV_MCP_LEDGER?.trim().toLowerCase() ?? ""),
    dir: env.JEV_MCP_LEDGER_DIR?.trim() || defaultLedgerDir(),
    maxBytes: intOf(env.JEV_MCP_LEDGER_MAX_BYTES, 50_000_000),
  };
}

function record(env: NodeJS.ProcessEnv, tool: string, args: unknown, action: PolicyAction, reasons: string[], source: string, durationMs: number): void {
  try {
    recordDecision(ledgerSettings(env), {
      decisionId: newDecisionId(),
      tool,
      args,
      payload: { model: source, action, reason_codes: reasons, usage: { input_tokens: 0, output_tokens: 0 }, truncated: false },
      durationMs,
    });
  } catch {
    // The ledger is observability only.
  }
}

function oneLine(text: string, max = 600): string {
  return text.replace(/\s+/g, " ").trim().slice(0, max);
}

function preToolUseOutput(decision: "ask" | "deny", reason: string): string {
  return `${JSON.stringify({ hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: decision, permissionDecisionReason: oneLine(reason) } })}\n`;
}

function parseEvent(stdin: string): Record<string, unknown> | null {
  try {
    const value = JSON.parse(stdin.replace(/^\uFEFF/, "").trim());
    return typeof value === "object" && value !== null && !Array.isArray(value) ? value as Record<string, unknown> : null;
  } catch {
    return null;
  }
}

/**
 * Only an explicit `deny` rule in the repository's own policy blocks an action outright. A deny cannot be
 * overridden by the user at the prompt, and a model's judgment (or a missing one) is not a rule, so every other
 * hold is an `ask`: the user stays in control and an overcautious judgment costs one confirmation, not a dead end.
 */
function isPolicyDenial(result: CheckResult): boolean {
  return result.action === "escalate" && result.source === "policy" && result.reasons.includes("policy_denied");
}

function describe(result: CheckResult): string {
  const why = result.reasons.length ? ` (${result.reasons.join(", ")})` : "";
  if (result.source === "no_task") return `Jev cannot see the task you approved, so this action needs your decision${why}.`;
  if (isPolicyDenial(result)) return `Blocked by the repository policy${result.rule ? ` (${result.rule})` : ""}${why}.`;
  if (result.source === "fail_closed") return `Jev could not be reached, so this ${result.effect ?? "unclassified"} action needs your decision${why}.`;
  if (result.action === "escalate") return `Jev flags this action as risky or outside the task${why}. Confirm only if you intend it.`;
  return `Jev asks you to confirm this action${why}.`;
}

// --- PreToolUse -------------------------------------------------------------------------------------

async function preToolUse(event: Record<string, unknown>, env: NodeJS.ProcessEnv, mode: HookMode): Promise<HookRun> {
  if (!isCheckedTool(event.tool_name)) return SILENT;
  const started = performance.now();
  const calls = counterFile(event.session_id, "calls");
  const cap = intOf(env.JEV_MCP_HOOK_MAX_CALLS, DEFAULT_SESSION_CALL_CAP);
  const deadline = Date.now() + intOf(env.JEV_MCP_HOOK_DEADLINE_MS, DEFAULT_HOOK_DEADLINE_MS);
  const result = await checkToolUse(event, {
    deadline,
    allowModel: readCount(calls) < cap,
    onModelCall: () => bump(calls),
  });
  record(env, "hook:pre-tool-use", { tool: event.tool_name, effect: result.effect }, result.action, result.reasons, result.source, performance.now() - started);
  if (mode === "shadow") {
    return { stdout: "", stderr: `jev-mcp hook (shadow): ${event.tool_name} -> ${result.action} [${result.source}] ${result.reasons.join(",")}\n`, exitCode: 0 };
  }
  if (result.action === "auto") return SILENT;
  return { stdout: preToolUseOutput(isPolicyDenial(result) ? "deny" : "ask", describe(result)), stderr: "", exitCode: 0 };
}

// --- Stop -------------------------------------------------------------------------------------------

function runTestCommand(command: string, cwd: string, timeoutMs: number): Promise<string> {
  return new Promise(resolve => {
    // The command comes from the user's own environment (JEV_MCP_TEST_COMMAND), never from a repository file.
    const child = spawn(command, { cwd, shell: true, windowsHide: true, stdio: ["ignore", "pipe", "pipe"], env: { ...process.env, JEV_MCP_HOOK_ACTIVE: "1" } });
    let output = "";
    const keep = (chunk: Buffer) => {
      output = (output + chunk.toString("utf8")).slice(-20_000);
    };
    child.stdout.on("data", keep);
    child.stderr.on("data", keep);
    const timer = setTimeout(() => child.kill(), timeoutMs);
    child.on("error", () => {
      clearTimeout(timer);
      resolve("The test command could not be started.");
    });
    child.on("close", code => {
      clearTimeout(timer);
      resolve(`$ ${command}\n${output}\n[exit code ${code ?? "killed"}]`);
    });
  });
}

function stopReason(result: ChangesResult): string {
  const gate = result.gate as { verification?: { results?: Array<{ claim: string; verdict: string }> } } | null;
  const open = (gate?.verification?.results ?? []).filter(item => item.verdict !== "verified").map(item => `"${oneLine(item.claim, 120)}"`);
  const claims = open.length ? ` Claims not supported by the evidence: ${open.join("; ")}.` : "";
  return oneLine(`Jev held this stop (${result.reasons.join(", ") || "review_required"}).${claims} Address these, or say plainly why they do not apply, then finish.`, 900);
}

async function stop(event: Record<string, unknown>, env: NodeJS.ProcessEnv, mode: HookMode): Promise<HookRun> {
  // A stop already continued by this hook must be allowed to finish, or the session could never end.
  if (event.stop_hook_active === true) return SILENT;
  const cwd = typeof event.cwd === "string" && event.cwd ? event.cwd : process.cwd();
  let policy;
  try {
    policy = loadRepoPolicy(cwd);
  } catch {
    return SILENT;
  }
  if (!policy?.requireGateOnStop) return SILENT;
  const blocks = counterFile(event.session_id, "stops");
  if (readCount(blocks) >= MAX_STOP_BLOCKS) return SILENT;
  const request = await readTask(event.transcript_path);
  if (!request) return SILENT;

  const started = performance.now();
  const testCommand = env.JEV_MCP_TEST_COMMAND?.trim();
  const tests = testCommand ? redactSecrets(await runTestCommand(testCommand, cwd, intOf(env.JEV_MCP_TEST_TIMEOUT_MS, 120_000))).text : "";
  const claims = extractClaims(event.last_assistant_message);
  const result = await checkChanges({
    cwd,
    request,
    claims,
    tests,
    evidence: tests || "No test command was run for this check.",
    deadline: Date.now() + intOf(env.JEV_MCP_STOP_DEADLINE_MS, DEFAULT_STOP_DEADLINE_MS),
  });
  record(env, "hook:stop", { files: result.files, claims: result.claims.length }, result.action, result.reasons, "gate", performance.now() - started);
  if (result.action === "auto") return SILENT;
  if (mode === "shadow") return { stdout: "", stderr: `jev-mcp hook (shadow): stop -> ${result.action} ${result.reasons.join(",")}\n`, exitCode: 0 };
  bump(blocks);
  return { stdout: `${JSON.stringify({ decision: "block", reason: stopReason(result) })}\n`, stderr: "", exitCode: 0 };
}

// --- Entry ------------------------------------------------------------------------------------------

/** Run one hook invocation. Never throws: any failure leaves the normal flow in place. */
export async function runHook(kind: HookKind, stdin: string, env: NodeJS.ProcessEnv = process.env): Promise<HookRun> {
  const mode = modeOf(env);
  if (mode === "off") return SILENT;
  // A hook fired by a process this guard started (for example the test command) must not recurse.
  if (env.JEV_MCP_HOOK_ACTIVE === "1") return SILENT;
  const event = parseEvent(stdin);
  if (!event) return { stdout: "", stderr: "jev-mcp hook: ignoring input that is not a JSON object\n", exitCode: 0 };
  try {
    return kind === "stop" ? await stop(event, env, mode) : await preToolUse(event, env, mode);
  } catch {
    return { stdout: "", stderr: "jev-mcp hook: internal error; the normal permission flow applies\n", exitCode: 0 };
  }
}
