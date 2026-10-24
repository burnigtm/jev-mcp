/**
 * Opt-in local decision ledger (JEV_MCP_LEDGER=1).
 *
 * Every tool result gets a `decision_id`; with the ledger on, a content-free record of the decision is appended to a
 * monthly JSONL file, and `jev_feedback` can later label it correct / false_alarm / missed. The ledger is
 * observability, never a guard: a write failure is counted and swallowed, and it can never change a decision.
 *
 * Privacy: no tool input or output text is stored. An input is represented only by an HMAC keyed with a random
 * per-install secret, so short or guessable inputs cannot be recovered by hashing candidates. Free text exists only in
 * a feedback `note`, which the user writes. File mode 0600 has no effect on Windows; rely on the profile directory ACL.
 */
import { createHmac, randomBytes } from "node:crypto";
import { closeSync, existsSync, linkSync, mkdirSync, openSync, readFileSync, statSync, unlinkSync, writeFileSync, writeSync } from "node:fs";
import { homedir } from "node:os";
import { join, isAbsolute } from "node:path";
import { recordLedgerEvent } from "./stats.js";

export const FEEDBACK_OUTCOMES = ["correct", "false_alarm", "missed"] as const;
export type FeedbackOutcome = (typeof FEEDBACK_OUTCOMES)[number];

export type LedgerSettings = { enabled: boolean; dir: string; maxBytes: number };

export const DECISION_ID_PATTERN = /^d_[0-9a-f]{24}$/;
export const MAX_NOTE_CHARS = 500;
const KEY_FILE = "ledger.key";
const keys = new Map<string, Buffer>();
/** Feedback already written by this process, so a repeated call is ignored. */
const writtenFeedback = new Set<string>();
const MAX_REMEMBERED_FEEDBACK = 5_000;

export function defaultLedgerDir(): string {
  return join(homedir(), ".jev-mcp");
}

export function newDecisionId(): string {
  return `d_${randomBytes(12).toString("hex")}`;
}

/** JSON with object keys sorted at every depth, so equal inputs always serialize identically. */
export function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().filter((key) => record[key] !== undefined).map((key) => `${JSON.stringify(key)}:${canonicalJson(record[key])}`).join(",")}}`;
  }
  return JSON.stringify(value) ?? "null";
}

function ensureDir(dir: string): void {
  if (!isAbsolute(dir)) throw new Error("ledger_dir_not_absolute");
  mkdirSync(dir, { recursive: true, mode: 0o700 });
}

const MIN_KEY_BYTES = 16;

/**
 * Publish the key so that no reader can see it half-written: write a private temporary file, then link it into
 * place. `link` fails if the key already exists, so exactly one racing process wins and the rest read its key.
 */
function publishKey(dir: string, path: string): void {
  const secret = randomBytes(32).toString("hex");
  const temporary = join(dir, `${KEY_FILE}.${process.pid}.${randomBytes(4).toString("hex")}.tmp`);
  writeFileSync(temporary, secret, { flag: "wx", mode: 0o600 });
  try {
    linkSync(temporary, path);
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "EEXIST") return;
    // A file system without hard links: fall back to an exclusive create, which readers retry past (see readKey).
    try {
      writeFileSync(path, secret, { flag: "wx", mode: 0o600 });
    } catch (inner) {
      if ((inner as NodeJS.ErrnoException).code !== "EEXIST") throw inner;
    }
  } finally {
    try {
      unlinkSync(temporary);
    } catch {
      // The temporary name is unique; leaving it behind only wastes a few bytes.
    }
  }
}

function sleepSync(ms: number): void {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

/** Read the key, waiting briefly if another process is still writing it (an empty or short file). */
function readKey(path: string): Buffer {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const key = Buffer.from(readFileSync(path, "utf8").trim(), "hex");
    if (key.length >= MIN_KEY_BYTES) return key;
    sleepSync(10);
  }
  throw new Error("ledger_key_invalid");
}

function loadKey(dir: string): Buffer {
  const cached = keys.get(dir);
  if (cached) return cached;
  ensureDir(dir);
  const path = join(dir, KEY_FILE);
  if (!existsSync(path)) publishKey(dir, path);
  const key = readKey(path);
  keys.set(dir, key);
  return key;
}

/** Keyed fingerprint of a tool input; stable for equal inputs on one install, meaningless elsewhere. */
export function inputHmac(dir: string, args: unknown): string {
  return createHmac("sha256", loadKey(dir)).update(canonicalJson(args)).digest("hex");
}

export function ledgerFile(dir: string, now = new Date()): string {
  const month = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  return join(dir, `ledger-${month}.jsonl`);
}

function append(settings: LedgerSettings, record: Record<string, unknown>, now: Date): boolean {
  try {
    ensureDir(settings.dir);
    const path = ledgerFile(settings.dir, now);
    const line = `${JSON.stringify(record)}\n`;
    let size = 0;
    try {
      size = statSync(path).size;
    } catch {
      size = 0;
    }
    if (size + line.length > settings.maxBytes) {
      recordLedgerEvent("dropped");
      return false;
    }
    // One write(2) on an O_APPEND descriptor: concurrent servers interleave whole lines, not fragments.
    const fd = openSync(path, "a", 0o600);
    try {
      writeSync(fd, line);
    } finally {
      closeSync(fd);
    }
    recordLedgerEvent("written");
    return true;
  } catch {
    recordLedgerEvent("error");
    return false;
  }
}

export type DecisionRecordInput = {
  decisionId: string;
  tool: string;
  args: unknown;
  payload: Record<string, unknown>;
  durationMs: number;
};

/** A short, content-free summary of the parts of a result that differ per tool. */
function detail(tool: string, payload: Record<string, unknown>): Record<string, unknown> | undefined {
  const recommendation = payload.recommendation as { action?: unknown } | undefined;
  if (tool === "jev_screen" && typeof recommendation?.action === "string") return { recommendation: recommendation.action };
  if (tool === "jev_rank" && typeof payload.exists_verdict === "string") return { exists_verdict: payload.exists_verdict };
  if (tool === "jev_verify" && payload.summary && typeof payload.summary === "object") return { summary: payload.summary };
  return undefined;
}

export function recordDecision(settings: LedgerSettings, input: DecisionRecordInput, now = new Date()): boolean {
  if (!settings.enabled) return false;
  try {
    const { payload } = input;
    return append(settings, {
      v: 1,
      kind: "decision",
      ts: now.toISOString(),
      decision_id: input.decisionId,
      tool: input.tool,
      model: payload.model,
      action: payload.action,
      reason_codes: Array.isArray(payload.reason_codes) ? payload.reason_codes : undefined,
      thresholds: payload.thresholds,
      truncated: payload.truncated,
      usage: payload.usage,
      latency_ms: Math.round(input.durationMs),
      input_hmac: inputHmac(settings.dir, input.args),
      detail: detail(input.tool, payload),
    }, now);
  } catch {
    recordLedgerEvent("error");
    return false;
  }
}

export function recordToolError(settings: LedgerSettings, tool: string, code: string, durationMs: number, now = new Date()): boolean {
  if (!settings.enabled) return false;
  return append(settings, { v: 1, kind: "error", ts: now.toISOString(), tool, code, latency_ms: Math.round(durationMs) }, now);
}

export type FeedbackResult = { recorded: boolean; reason?: "ledger_disabled" | "duplicate" | "write_failed" };

export function recordFeedback(settings: LedgerSettings, input: { decisionId: string; outcome: FeedbackOutcome; note?: string }, now = new Date()): FeedbackResult {
  if (!settings.enabled) return { recorded: false, reason: "ledger_disabled" };
  const key = `${input.decisionId}\u0000${input.outcome}\u0000${input.note ?? ""}`;
  if (writtenFeedback.has(key)) return { recorded: false, reason: "duplicate" };
  const ok = append(settings, {
    v: 1,
    kind: "feedback",
    ts: now.toISOString(),
    decision_id: input.decisionId,
    outcome: input.outcome,
    ...(input.note ? { note: input.note.slice(0, MAX_NOTE_CHARS) } : {}),
  }, now);
  if (!ok) return { recorded: false, reason: "write_failed" };
  if (writtenFeedback.size >= MAX_REMEMBERED_FEEDBACK) writtenFeedback.clear();
  writtenFeedback.add(key);
  return { recorded: true };
}

/** Test helper: forget cached keys and remembered feedback. */
export function resetLedgerState(): void {
  keys.clear();
  writtenFeedback.clear();
}
