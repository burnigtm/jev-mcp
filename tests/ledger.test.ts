import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, afterEach, before, test } from "node:test";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { getConfig } from "../src/config.ts";
import { errorDetails } from "../src/errors.ts";
import { canonicalJson, DECISION_ID_PATTERN, inputHmac, ledgerFile, newDecisionId, recordDecision, recordFeedback, recordToolError, resetLedgerState } from "../src/ledger.ts";
import { createJevServer } from "../src/server.ts";
import { resetStats, statsSnapshot } from "../src/stats.ts";
import { feedbackInputSchema, runFeedback } from "../src/tools/feedback.ts";
import { envScope } from "./helpers/fixture.ts";

const root = fileURLToPath(new URL("../", import.meta.url));
const restoreEnv = envScope(["JEV_MCP_MOCK", "TYPESAFE_API_KEY", "JEV_MCP_LEDGER", "JEV_MCP_LEDGER_DIR", "JEV_MCP_LEDGER_MAX_BYTES", "JEV_MCP_CACHE_TTL_MS"]);
const dirs: string[] = [];
const tempDir = () => {
  const dir = mkdtempSync(join(tmpdir(), "jev-ledger-test-"));
  dirs.push(dir);
  return dir;
};
const lines = (dir: string) => readdirSync(dir).filter((name) => name.startsWith("ledger-")).sort().flatMap((name) => readFileSync(join(dir, name), "utf8").split("\n").filter(Boolean).map((line) => JSON.parse(line) as Record<string, any>));

before(() => {
  process.env.JEV_MCP_MOCK = "1";
  for (const name of ["JEV_MCP_LEDGER", "JEV_MCP_LEDGER_DIR", "JEV_MCP_LEDGER_MAX_BYTES", "JEV_MCP_CACHE_TTL_MS"]) delete process.env[name];
});
afterEach(() => {
  resetLedgerState();
  resetStats();
  delete process.env.JEV_MCP_LEDGER;
  delete process.env.JEV_MCP_LEDGER_DIR;
  delete process.env.JEV_MCP_LEDGER_MAX_BYTES;
});
after(() => {
  restoreEnv();
  for (const dir of dirs) rmSync(dir, { recursive: true, force: true });
});

const payload = (extra: Record<string, unknown> = {}) => ({
  model: "jev-1.14.0", action: "review", reason_codes: ["blast_radius_uncertain"], thresholds: { auto_accept: 0.8, review_at: 0.5 },
  truncated: false, usage: { input_tokens: 120, output_tokens: 9 }, ...extra,
});

// --- Primitives -----------------------------------------------------------------------------------------

test("decision ids are unique, well formed, and recognised by the feedback pattern", () => {
  const ids = new Set(Array.from({ length: 2_000 }, () => newDecisionId()));
  assert.equal(ids.size, 2_000);
  for (const id of ids) assert.match(id, DECISION_ID_PATTERN);
  for (const bad of ["", "d_", "d_xyz", `d_${"0".repeat(23)}`, `D_${"0".repeat(24)}`, `d_${"g".repeat(24)}`, ` d_${"0".repeat(24)}`]) assert.doesNotMatch(bad, DECISION_ID_PATTERN);
});

test("canonicalJson ignores key order and undefined, at every depth", () => {
  assert.equal(canonicalJson({ b: 1, a: { d: [3, { y: 1, x: 2 }], c: undefined } }), canonicalJson({ a: { c: undefined, d: [3, { x: 2, y: 1 }] }, b: 1 }));
  assert.notEqual(canonicalJson({ a: 1 }), canonicalJson({ a: 2 }));
  assert.notEqual(canonicalJson([1, 2]), canonicalJson([2, 1]));
  assert.equal(canonicalJson(undefined), "null");
});

test("the input fingerprint is keyed per install, stable, and does not contain the input", () => {
  const first = tempDir();
  const second = tempDir();
  const args = { diff: "SECRET-DIFF-TEXT", request: "SECRET-REQUEST" };
  const a = inputHmac(first, args);
  assert.equal(a, inputHmac(first, { request: "SECRET-REQUEST", diff: "SECRET-DIFF-TEXT" }), "key order does not matter");
  assert.notEqual(a, inputHmac(first, { ...args, diff: "other" }));
  assert.notEqual(a, inputHmac(second, args), "a different install has a different key, so fingerprints do not match");
  assert.match(a, /^[0-9a-f]{64}$/);
  assert.match(readFileSync(join(first, "ledger.key"), "utf8"), /^[0-9a-f]{64}$/);
  resetLedgerState();
  assert.equal(inputHmac(first, args), a, "the key persists across processes");
});

// --- Records and privacy --------------------------------------------------------------------------------

test("a decision record has the documented fields and no input or output text", () => {
  const dir = tempDir();
  const settings = { enabled: true, dir, maxBytes: 1_000_000 };
  const ok = recordDecision(settings, {
    decisionId: newDecisionId(), tool: "jev_review", durationMs: 312.6,
    args: { request: "SENTINEL-REQUEST", diff: "SENTINEL-DIFF +password=hunter2", tests: "SENTINEL-TESTS" },
    payload: payload({ summary: "SENTINEL-OUTPUT", recommendation: { action: "block", reason: "SENTINEL-REASON" }, coverage: { original_chars: 9 } }),
  }, new Date("2026-10-24T12:00:00Z"));
  assert.equal(ok, true);
  const [record] = lines(dir);
  assert.deepEqual(Object.keys(record!).sort(), ["action", "decision_id", "input_hmac", "kind", "latency_ms", "model", "reason_codes", "thresholds", "tool", "truncated", "ts", "usage", "v"].sort());
  assert.equal(record!.ts, "2026-10-24T12:00:00.000Z");
  assert.equal(record!.latency_ms, 313);
  assert.deepEqual(record!.reason_codes, ["blast_radius_uncertain"]);
  const raw = readdirSync(dir).map((name) => readFileSync(join(dir, name), "utf8")).join("\n");
  for (const sentinel of ["SENTINEL", "hunter2", "password"]) assert.doesNotMatch(raw, new RegExp(sentinel), sentinel);
});

test("per-tool detail keeps only short, content-free summaries", () => {
  const dir = tempDir();
  const settings = { enabled: true, dir, maxBytes: 1_000_000 };
  const base = { decisionId: newDecisionId(), args: {}, durationMs: 1 };
  recordDecision(settings, { ...base, tool: "jev_screen", payload: payload({ recommendation: { action: "block", reason: "free text" } }) });
  recordDecision(settings, { ...base, decisionId: newDecisionId(), tool: "jev_rank", payload: payload({ exists_verdict: "partial", winner: "src/secret/path.ts" }) });
  recordDecision(settings, { ...base, decisionId: newDecisionId(), tool: "jev_verify", payload: payload({ summary: { verified: 1, contradicted: 0, unsupported: 0, needs_review: 0 }, results: [{ claim: "SENTINEL-CLAIM" }] }) });
  const [screen, rank, verify] = lines(dir);
  assert.deepEqual(screen!.detail, { recommendation: "block" });
  assert.deepEqual(rank!.detail, { exists_verdict: "partial" });
  assert.deepEqual(verify!.detail, { summary: { verified: 1, contradicted: 0, unsupported: 0, needs_review: 0 } });
  assert.doesNotMatch(readFileSync(join(dir, readdirSync(dir).find((n) => n.startsWith("ledger-"))!), "utf8"), /SENTINEL|secret\/path|free text/);
});

test("when disabled nothing is written, not even a key", () => {
  const dir = tempDir();
  const disabled = { enabled: false, dir, maxBytes: 1_000_000 };
  assert.equal(recordDecision(disabled, { decisionId: newDecisionId(), tool: "jev_review", args: {}, payload: payload(), durationMs: 1 }), false);
  assert.equal(recordToolError(disabled, "jev_review", "TIMEOUT", 5), false);
  assert.deepEqual(recordFeedback(disabled, { decisionId: newDecisionId(), outcome: "correct" }), { recorded: false, reason: "ledger_disabled" });
  assert.deepEqual(readdirSync(dir), []);
});

test("files rotate by UTC month", () => {
  const dir = tempDir();
  const settings = { enabled: true, dir, maxBytes: 1_000_000 };
  const record = (when: string) => recordDecision(settings, { decisionId: newDecisionId(), tool: "jev_review", args: { when }, payload: payload(), durationMs: 1 }, new Date(when));
  record("2026-10-31T23:59:59Z");
  record("2026-11-01T00:00:00Z");
  record("2026-11-30T12:00:00Z");
  assert.deepEqual(readdirSync(dir).filter((n) => n.startsWith("ledger-")).sort(), ["ledger-2026-10.jsonl", "ledger-2026-11.jsonl"]);
  assert.equal(ledgerFile(dir, new Date("2027-01-05T00:00:00Z")), join(dir, "ledger-2027-01.jsonl"));
});

test("the size cap drops records and counts them instead of writing or throwing", () => {
  const dir = tempDir();
  const settings = { enabled: true, dir, maxBytes: 1_500 };
  const when = new Date("2026-10-24T00:00:00Z");
  let written = 0;
  for (let i = 0; i < 20; i += 1) if (recordDecision(settings, { decisionId: newDecisionId(), tool: "jev_review", args: { i }, payload: payload(), durationMs: 1 }, when)) written += 1;
  const size = statSync(ledgerFile(dir, when)).size;
  assert.ok(size <= 1_500, `file is ${size} bytes`);
  assert.ok(written >= 1 && written < 20);
  const stats = statsSnapshot(undefined, 0).ledger;
  assert.deepEqual([stats.written, stats.dropped, stats.errors], [written, 20 - written, 0]);
  for (const record of lines(dir)) assert.equal(record.kind, "decision", "every stored line is complete");
});

test("a ledger that cannot be written is counted and never raises", () => {
  const blocker = join(tempDir(), "not-a-directory");
  writeFileSync(blocker, "x");
  const settings = { enabled: true, dir: join(blocker, "ledger"), maxBytes: 1_000_000 };
  assert.equal(recordDecision(settings, { decisionId: newDecisionId(), tool: "jev_review", args: {}, payload: payload(), durationMs: 1 }), false);
  assert.equal(recordToolError(settings, "jev_review", "TIMEOUT", 1), false);
  assert.deepEqual(recordFeedback(settings, { decisionId: newDecisionId(), outcome: "correct" }), { recorded: false, reason: "write_failed" });
  assert.equal(statsSnapshot(undefined, 0).ledger.errors >= 3, true);
  const relative = { enabled: true, dir: "relative/dir", maxBytes: 1_000_000 };
  assert.equal(recordDecision(relative, { decisionId: newDecisionId(), tool: "jev_review", args: {}, payload: payload(), durationMs: 1 }), false);
  assert.equal(existsSync("relative"), false, "a relative directory is refused, not created");
});

test("several processes appending at once never produce a partial or corrupt line", async () => {
  const dir = tempDir();
  const writer = join(root, "tests", "helpers", "ledger-writer.ts");
  const runs = Array.from({ length: 6 }, (_, index) => new Promise<number>((resolve, reject) => {
    const child = spawn(process.execPath, ["--import", "tsx", writer, dir, "40", `p${index}`], { cwd: root, stdio: "ignore" });
    child.on("error", reject);
    child.on("close", (code) => resolve(code ?? 1));
  }));
  assert.deepEqual(await Promise.all(runs), [0, 0, 0, 0, 0, 0]);
  const records = lines(dir);
  assert.equal(records.length, 240);
  assert.equal(new Set(records.map((record) => record.decision_id)).size, 240);
  assert.equal(new Set(records.map((record) => record.input_hmac)).size, 240, "each distinct input has its own fingerprint, from one shared key");
  assert.equal(readdirSync(dir).filter((name) => name === "ledger.key").length, 1, "the racing processes agreed on one key");
}, { timeout: 90_000 });

// --- Feedback ---------------------------------------------------------------------------------------------------

test("feedback is appended, repeated labels are ignored within a process, and notes are bounded", () => {
  const dir = tempDir();
  const settings = { enabled: true, dir, maxBytes: 1_000_000 };
  const id = newDecisionId();
  assert.deepEqual(recordFeedback(settings, { decisionId: id, outcome: "false_alarm", note: "fine to run" }), { recorded: true });
  assert.deepEqual(recordFeedback(settings, { decisionId: id, outcome: "false_alarm", note: "fine to run" }), { recorded: false, reason: "duplicate" });
  assert.deepEqual(recordFeedback(settings, { decisionId: id, outcome: "missed" }), { recorded: true }, "a different label is a new record; the latest wins when read");
  assert.deepEqual(recordFeedback(settings, { decisionId: newDecisionId(), outcome: "correct", note: "x".repeat(2_000) }), { recorded: true });
  const stored = lines(dir);
  assert.deepEqual(stored.map((record) => [record.kind, record.outcome]), [["feedback", "false_alarm"], ["feedback", "missed"], ["feedback", "correct"]]);
  assert.equal(stored[0]!.note, "fine to run");
  assert.equal(stored[2]!.note.length, 500);
});

test("the feedback schema accepts only a real decision id and a known outcome", () => {
  const good = { decision_id: newDecisionId(), outcome: "correct" };
  assert.equal(feedbackInputSchema.safeParse(good).success, true);
  assert.equal(feedbackInputSchema.safeParse({ ...good, outcome: "wrong" }).success, false);
  assert.equal(feedbackInputSchema.safeParse({ ...good, decision_id: "d_short" }).success, false);
  assert.equal(feedbackInputSchema.safeParse({ ...good, note: "x".repeat(501) }).success, false);
  assert.equal(feedbackInputSchema.safeParse({ outcome: "correct" }).success, false);
});

test("runFeedback strips control characters from the note and reports a disabled ledger", async () => {
  const id = newDecisionId();
  assert.deepEqual(await runFeedback({ decision_id: id, outcome: "correct" }), { recorded: false, decision_id: id, outcome: "correct", reason: "ledger_disabled" });
  const dir = tempDir();
  process.env.JEV_MCP_LEDGER = "1";
  process.env.JEV_MCP_LEDGER_DIR = dir;
  const result = await runFeedback({ decision_id: id, outcome: "false_alarm", note: "it\u0000 was\u202E fine" });
  assert.equal(result.recorded, true);
  // Control and bidi characters become spaces, so the stored note is exactly what a reader sees.
  assert.equal(lines(dir)[0]!.note, "it  was  fine");
});

// --- Server and CLI ----------------------------------------------------------------------------------------------------

async function connect() {
  const server = createJevServer();
  const client = new Client({ name: "ledger-test", version: "0.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  return client;
}
const call = async (client: Client, name: string, args: Record<string, unknown>) => {
  const result = await client.callTool({ name, arguments: args });
  return { result, body: (result.structuredContent ?? JSON.parse((result.content as Array<{ text: string }>)[0]!.text)) as Record<string, any> };
};

test("every judgment result carries a fresh decision_id, even when answered from the cache", async () => {
  process.env.JEV_MCP_CACHE_TTL_MS = "60000";
  const client = await connect();
  try {
    const args = { text: "Release notes for version 2 of the pager library." };
    const first = await call(client, "jev_screen", args);
    const second = await call(client, "jev_screen", args);
    assert.match(first.body.decision_id, DECISION_ID_PATTERN);
    assert.match(second.body.decision_id, DECISION_ID_PATTERN);
    assert.notEqual(first.body.decision_id, second.body.decision_id);
    assert.deepEqual(second.body.usage, { input_tokens: 0, output_tokens: 0 }, "the second answer was served from the cache");
  } finally {
    await client.close();
    delete process.env.JEV_MCP_CACHE_TTL_MS;
  }
});

test("with the ledger on, a decision and its feedback land in the file, and errors are recorded with their code", async () => {
  const dir = tempDir();
  process.env.JEV_MCP_LEDGER = "1";
  process.env.JEV_MCP_LEDGER_DIR = dir;
  const client = await connect();
  try {
    const screened = await call(client, "jev_screen", { text: "SENTINEL-BODY: Release notes for version 2 of the pager library." });
    const id = screened.body.decision_id as string;
    assert.equal(lines(dir).filter((record) => record.kind === "decision").length, 1);
    const feedback = await call(client, "jev_feedback", { decision_id: id, outcome: "correct", note: "looked right" });
    assert.deepEqual(feedback.body, { recorded: true, decision_id: id, outcome: "correct" });
    assert.equal(feedback.body.decision_id, id);
    assert.equal("model" in feedback.body, false, "feedback is not a judgment");
    const again = await call(client, "jev_feedback", { decision_id: id, outcome: "correct", note: "looked right" });
    assert.equal(again.body.reason, "duplicate");

    process.env.JEV_MCP_MOCK = "0";
    delete process.env.TYPESAFE_API_KEY;
    const failed = await call(client, "jev_screen", { text: "x" });
    assert.equal(failed.result.isError, true);
    process.env.JEV_MCP_MOCK = "1";

    const stored = lines(dir);
    assert.deepEqual(stored.map((record) => record.kind), ["decision", "feedback", "error"]);
    assert.equal(stored[0]!.decision_id, id);
    assert.equal(stored[0]!.tool, "jev_screen");
    assert.equal(stored[2]!.code, errorDetails(new (await import("../src/errors.ts")).JevConfigError("x")).code);
    assert.doesNotMatch(readdirSync(dir).map((name) => readFileSync(join(dir, name), "utf8")).join("\n"), /SENTINEL-BODY/);
    const snapshot = JSON.parse((await client.readResource({ uri: "jev://stats" })).contents[0]!.text as string);
    assert.equal(snapshot.ledger.written, 3);
  } finally {
    process.env.JEV_MCP_MOCK = "1";
    await client.close();
  }
});

test("without the ledger, feedback records nothing and says so", async () => {
  const client = await connect();
  try {
    const { body } = await call(client, "jev_feedback", { decision_id: newDecisionId(), outcome: "missed" });
    assert.equal(body.recorded, false);
    assert.equal(body.reason, "ledger_disabled");
    const listed = (await client.listTools()).tools.find((tool) => tool.name === "jev_feedback")!;
    assert.deepEqual(listed.annotations, { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false });
    const judgment = (await client.listTools()).tools.find((tool) => tool.name === "jev_review")!;
    assert.equal(judgment.annotations?.readOnlyHint, true);
  } finally {
    await client.close();
  }
});

function cli(args: string[], env: Record<string, string> = {}) {
  const clean = { ...process.env };
  for (const name of Object.keys(clean)) if (name.startsWith("JEV_MCP_") || name.startsWith("TYPESAFE_")) delete clean[name];
  return spawnSync(process.execPath, ["--import", "tsx", "src/index.ts", ...args], { cwd: root, encoding: "utf8", timeout: 60_000, env: { ...clean, JEV_MCP_MOCK: "1", ...env } });
}

test("jev-mcp feedback records to the ledger, and fails loudly when it cannot", () => {
  const dir = tempDir();
  const id = newDecisionId();
  const ok = cli(["feedback", id, "false_alarm", "--note", "fine to run"], { JEV_MCP_LEDGER: "1", JEV_MCP_LEDGER_DIR: dir });
  assert.equal(ok.status, 0, ok.stderr);
  assert.deepEqual(JSON.parse(ok.stdout), { recorded: true, decision_id: id, outcome: "false_alarm" });
  assert.equal(lines(dir)[0]!.note, "fine to run");

  const disabled = cli(["feedback", id, "correct"]);
  assert.equal(disabled.status, 1);
  assert.equal(JSON.parse(disabled.stdout).reason, "ledger_disabled");

  for (const args of [["feedback"], ["feedback", id], ["feedback", "d_nope", "correct"], ["feedback", id, "wrong"], ["feedback", id, "correct", "--bogus"], ["feedback", id, "correct", "--note"], ["feedback", id, "correct", "--note", "a", "--note", "b"]]) {
    const bad = cli(args, { JEV_MCP_LEDGER: "1", JEV_MCP_LEDGER_DIR: dir });
    assert.equal(bad.status, 1, args.join(" "));
    assert.equal(bad.stdout, "", "nothing is printed to stdout on a usage error");
  }
  assert.equal(lines(dir).length, 1, "invalid invocations wrote nothing");
});

test("ledger configuration is validated", () => {
  process.env.JEV_MCP_LEDGER_DIR = "relative/path";
  assert.throws(() => getConfig(), (error: unknown) => errorDetails(error).code === "CONFIG_ERROR");
  process.env.JEV_MCP_LEDGER_DIR = tempDir();
  process.env.JEV_MCP_LEDGER_MAX_BYTES = "100";
  assert.throws(() => getConfig(), (error: unknown) => errorDetails(error).code === "CONFIG_ERROR");
  process.env.JEV_MCP_LEDGER_MAX_BYTES = "2048";
  process.env.JEV_MCP_LEDGER = "yes";
  const config = getConfig();
  assert.deepEqual([config.ledger, config.ledgerMaxBytes], [true, 2048]);
  delete process.env.JEV_MCP_LEDGER;
  assert.equal(getConfig().ledger, false);
});
