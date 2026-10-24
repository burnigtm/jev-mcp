import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { appendFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, afterEach, before, test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { calibrate, DEFAULT_MIN_SAMPLE, renderCalibration } from "../src/calibrate.ts";
import { renderSarif, type CiResult } from "../src/ci.ts";
import { newDecisionId, recordDecision, recordFeedback, resetLedgerState, ledgerFile, type FeedbackOutcome, type LedgerSettings } from "../src/ledger.ts";
import { createJevServer, LEDGER_URI } from "../src/server.ts";
import { envScope } from "./helpers/fixture.ts";

/** PR 9: what the ledger says (suggests, never applies), the jev://ledger resource, and SARIF. */

const root = fileURLToPath(new URL("../", import.meta.url));
const restoreEnv = envScope(["JEV_MCP_MOCK", "JEV_MCP_LEDGER", "JEV_MCP_LEDGER_DIR", "JEV_POLICY_FILE"]);
const dirs: string[] = [];
const tempDir = () => {
  const dir = mkdtempSync(join(tmpdir(), "jev-cal-"));
  dirs.push(dir);
  return dir;
};

before(() => {
  process.env.JEV_MCP_MOCK = "1";
  process.env.JEV_POLICY_FILE = "none";
  delete process.env.JEV_MCP_LEDGER;
  delete process.env.JEV_MCP_LEDGER_DIR;
});
afterEach(() => {
  resetLedgerState();
  delete process.env.JEV_MCP_LEDGER;
  delete process.env.JEV_MCP_LEDGER_DIR;
});
after(() => {
  restoreEnv();
  for (const dir of dirs) rmSync(dir, { recursive: true, force: true });
});

function settingsFor(dir: string): LedgerSettings {
  return { enabled: true, dir, maxBytes: 50_000_000 };
}

type Spec = { tool?: string; action: "auto" | "review" | "escalate"; reasons?: string[]; input?: unknown; label?: FeedbackOutcome };

/** Write decisions (and optional labels) with the real ledger writer. */
function fill(dir: string, specs: Spec[], now = new Date()): string[] {
  const settings = settingsFor(dir);
  const ids: string[] = [];
  specs.forEach((spec, index) => {
    const id = newDecisionId();
    ids.push(id);
    recordDecision(settings, {
      decisionId: id,
      tool: spec.tool ?? "jev_review",
      args: spec.input ?? { n: index },
      payload: { model: "jev-test", action: spec.action, reason_codes: spec.reasons ?? (spec.action === "auto" ? ["accepted"] : ["review_required"]), usage: { input_tokens: 1, output_tokens: 1 }, truncated: false },
      durationMs: 1,
    }, now);
    if (spec.label) recordFeedback(settings, { decisionId: id, outcome: spec.label }, now);
  });
  return ids;
}

const many = (count: number, spec: Spec): Spec[] => Array.from({ length: count }, () => ({ ...spec }));

// --- Report ---------------------------------------------------------------------------------------------------

test("an empty or missing ledger gives a report of zeros and no suggestions", () => {
  for (const dir of [tempDir(), join(tempDir(), "nope")]) {
    const report = calibrate({ dir });
    assert.equal(report.ledger.decisions, 0);
    assert.deepEqual(report.by_tool, {});
    assert.deepEqual(report.suggestions, []);
    assert.ok(report.notes.some(note => /never applies/.test(note)));
  }
});

test("counts, rates and labels per tool; the last label wins", () => {
  const dir = tempDir();
  const ids = fill(dir, [
    { action: "auto" }, { action: "auto" }, { action: "review", reasons: ["test_gap"] }, { action: "escalate", reasons: ["unsafe_to_apply"] },
    { tool: "jev_scope", action: "auto" },
  ]);
  recordFeedback(settingsFor(dir), { decisionId: ids[2]!, outcome: "false_alarm" });
  recordFeedback(settingsFor(dir), { decisionId: ids[3]!, outcome: "correct" });
  recordFeedback(settingsFor(dir), { decisionId: ids[0]!, outcome: "correct" });
  recordFeedback(settingsFor(dir), { decisionId: ids[1]!, outcome: "missed" });
  recordFeedback(settingsFor(dir), { decisionId: ids[1]!, outcome: "correct", note: "changed my mind" });
  const report = calibrate({ dir });
  assert.equal(report.ledger.decisions, 5);
  assert.equal(report.ledger.labeled, 4);
  assert.equal(report.ledger.unlabeled, 1);
  const review = report.by_tool.jev_review!;
  assert.deepEqual(review.actions, { auto: 2, review: 1, escalate: 1 });
  assert.equal(review.review_rate, 0.25);
  assert.equal(review.escalate_rate, 0.25);
  assert.deepEqual(review.outcomes, { correct: 3, false_alarm: 1, missed: 0 });
  assert.equal(review.false_alarm_rate, 0.5, "one false alarm among the two labeled holds");
  assert.equal(review.miss_rate, 0, "no miss among the two labeled approvals");
  assert.equal(report.by_tool.jev_scope!.labeled, 0);
  assert.equal(report.by_tool.jev_scope!.false_alarm_rate, null);
});

test("silence is not correct: unlabeled decisions never feed a rate or a suggestion", () => {
  const dir = tempDir();
  fill(dir, many(100, { action: "review", reasons: ["test_gap"] }));
  const report = calibrate({ dir });
  assert.equal(report.by_tool.jev_review!.false_alarm_rate, null);
  assert.deepEqual(report.suggestions, []);
  assert.ok(report.notes.some(note => /Only 0 of 100 decisions are labeled/.test(note)));
});

test("a reason code produces a suggestion only past the minimum sample, and never alongside a miss", () => {
  const dir = tempDir();
  fill(dir, many(DEFAULT_MIN_SAMPLE - 1, { action: "review", reasons: ["test_gap"], label: "false_alarm" }));
  assert.deepEqual(calibrate({ dir }).suggestions, [], "one label short");
  fill(dir, [{ action: "review", reasons: ["test_gap"], label: "false_alarm" }]);
  const enough = calibrate({ dir });
  const reason = enough.by_reason.find(item => item.reason === "test_gap")!;
  assert.equal(reason.enough, true);
  assert.equal(reason.false_alarm_rate, 1);
  assert.deepEqual(enough.suggestions.map(item => [item.kind, item.tool, item.reason]), [["consider_policy", "jev_review", "test_gap"]]);
  assert.match(enough.suggestions[0]!.text, /Nothing was changed/);

  fill(dir, [{ action: "auto", label: "missed" }]);
  const withMiss = calibrate({ dir });
  assert.deepEqual(withMiss.suggestions.map(item => item.kind), ["tighten"], "a miss replaces any suggestion to loosen");
  assert.match(withMiss.suggestions[0]!.text, /Do not loosen/);
});

test("a reason with mostly correct holds is not a candidate for anything", () => {
  const dir = tempDir();
  fill(dir, [...many(15, { action: "review", reasons: ["unsafe_to_apply"], label: "correct" }), ...many(5, { action: "review", reasons: ["unsafe_to_apply"], label: "false_alarm" })]);
  assert.deepEqual(calibrate({ dir }).suggestions, []);
});

test("the same input getting different actions is reported, and only past a threshold", () => {
  const dir = tempDir();
  const specs: Spec[] = [];
  for (let i = 0; i < 3; i++) specs.push({ action: "auto", input: { case: i } }, { action: "review", input: { case: i } });
  specs.push(...many(20, { action: "auto" }).map((spec, i) => ({ ...spec, input: { unique: i } })));
  fill(dir, specs);
  const report = calibrate({ dir });
  assert.equal(report.unstable_inputs.groups, 3);
  assert.deepEqual(report.unstable_inputs.by_tool, { jev_review: 3 });
  assert.deepEqual(report.suggestions.map(item => item.kind), ["investigate"]);
  const quiet = tempDir();
  fill(quiet, [{ action: "auto", input: { a: 1 } }, { action: "review", input: { a: 1 } }, ...many(40, { action: "auto" }).map((spec, i) => ({ ...spec, input: { u: i } }))]);
  assert.equal(calibrate({ dir: quiet }).unstable_inputs.groups, 1);
  assert.deepEqual(calibrate({ dir: quiet }).suggestions, [], "one unstable input is noise");
});

test("damaged and hostile ledger lines are skipped, not trusted", () => {
  const dir = tempDir();
  fill(dir, [{ action: "auto" }]);
  const file = ledgerFile(dir);
  appendFileSync(file, "not json\n{broken\n");
  appendFileSync(file, `${JSON.stringify({ v: 1, kind: "decision", decision_id: "d_x", tool: "jev_review; rm -rf", action: "auto", reason_codes: [] })}\n`);
  appendFileSync(file, `${JSON.stringify({ v: 1, kind: "decision", decision_id: "d_y", tool: "jev_review", action: "approve-everything", reason_codes: [] })}\n`);
  appendFileSync(file, `${JSON.stringify({ v: 1, kind: "decision", decision_id: "d_z", tool: "jev_review", action: "review", reason_codes: ["ok", "<script>"] })}\n`);
  appendFileSync(file, `${JSON.stringify({ v: 1, kind: "feedback", decision_id: "d_z", outcome: "great" })}\n`);
  appendFileSync(file, `${JSON.stringify({ v: 1, kind: "error", tool: "jev_review", code: "TIMEOUT" })}\n`);
  const report = calibrate({ dir });
  assert.equal(report.ledger.malformed_lines, 2);
  assert.equal(report.ledger.errors, 1);
  assert.equal(report.ledger.decisions, 2, "the original and the one valid hostile-looking line");
  assert.deepEqual(Object.keys(report.by_tool), ["jev_review"]);
  assert.ok(report.by_reason.every(item => /^[\w:.-]+$/.test(item.reason)));
  assert.equal(report.ledger.labeled, 0, "an unknown outcome is not a label");
});

test("--since keeps only later months; the report holds no fingerprints and changes no file", () => {
  const dir = tempDir();
  fill(dir, [{ action: "auto" }], new Date(Date.UTC(2026, 0, 15)));
  fill(dir, [{ action: "review", reasons: ["test_gap"] }], new Date(Date.UTC(2026, 5, 15)));
  assert.equal(calibrate({ dir }).ledger.files, 2);
  const later = calibrate({ dir, since: "2026-03" });
  assert.equal(later.ledger.files, 1);
  assert.equal(later.ledger.decisions, 1);
  const before = statSync(ledgerFile(dir, new Date(Date.UTC(2026, 5, 15))));
  const json = JSON.stringify(calibrate({ dir }));
  assert.doesNotMatch(json, /input_hmac|[0-9a-f]{64}/);
  const after = statSync(ledgerFile(dir, new Date(Date.UTC(2026, 5, 15))));
  assert.equal(after.size, before.size);
  assert.equal(after.mtimeMs, before.mtimeMs);
});

test("the text rendering carries the table, the suggestions and the notes", () => {
  const dir = tempDir();
  fill(dir, [...many(20, { action: "review", reasons: ["test_gap"], label: "false_alarm" }), { action: "auto" }]);
  const text = renderCalibration(calibrate({ dir }));
  assert.match(text, /jev_review\s+21/);
  assert.match(text, /\[consider_policy\]/);
  assert.match(text, /Note: Only decisions labeled/);
  assert.match(renderCalibration(calibrate({ dir: tempDir() })), /Suggestions: none/);
});

// --- jev://ledger ---------------------------------------------------------------------------------------------------

async function readLedgerResource(env: Record<string, string | undefined>) {
  for (const [name, value] of Object.entries(env)) {
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
  const server = createJevServer();
  const client = new Client({ name: "ledger-test", version: "0.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  try {
    const listed = await client.listResources();
    assert.ok(listed.resources.some(resource => resource.uri === LEDGER_URI));
    const resource = await client.readResource({ uri: LEDGER_URI });
    return JSON.parse((resource.contents[0] as { text: string }).text);
  } finally {
    await client.close();
    await server.close();
  }
}

test("jev://ledger says so when the ledger is off, and summarizes it when on", async () => {
  const off = await readLedgerResource({ JEV_MCP_LEDGER: undefined });
  assert.equal(off.enabled, false);
  const dir = tempDir();
  fill(dir, [{ action: "review", reasons: ["test_gap"], label: "false_alarm" }, { action: "auto" }]);
  const on = await readLedgerResource({ JEV_MCP_LEDGER: "1", JEV_MCP_LEDGER_DIR: dir });
  assert.equal(on.ledger.decisions, 2);
  assert.equal(on.by_tool.jev_review.labeled, 1);
  assert.doesNotMatch(JSON.stringify(on), /input_hmac|[0-9a-f]{64}/);
});

// --- SARIF ----------------------------------------------------------------------------------------------------------

function sample(overrides: Partial<CiResult> = {}): CiResult {
  return {
    action: "review", mode: "jev", reasons: ["policy_review", "lockfile_changed"], files: 3, commits: true,
    policy: { source: "base", findings: [{ path: "docs/a b.md", decision: "review", rule: "docs/**" }, { path: "infra/main.tf", decision: "deny", rule: "infra/**" }] },
    claims: [], secrets_redacted: 0, withheld: [".env"], held: [{ files: ["src/a.ts", "src/b.ts"], action: "escalate" }, { files: ["src/c.ts"], action: "review" }],
    callers: null, unsupported_claims: ["a claim written by the author"], fail_on: "review", exit_code: 10, model_calls: 2, ...overrides,
  };
}

test("SARIF: schema fields, levels, file-level locations, and rules for exactly what was reported", () => {
  const sarif = JSON.parse(renderSarif(sample()));
  assert.equal(sarif.version, "2.1.0");
  assert.match(sarif.$schema, /sarif-2\.1\.0/);
  const run = sarif.runs[0];
  assert.equal(run.tool.driver.name, "jev-mcp");
  const byRule = (id: string) => run.results.filter((item: { ruleId: string }) => item.ruleId === id);
  assert.equal(byRule("policy_denied")[0].level, "error");
  assert.equal(byRule("policy_denied")[0].locations[0].physicalLocation.artifactLocation.uri, "infra/main.tf");
  assert.equal(byRule("policy_review")[0].locations[0].physicalLocation.artifactLocation.uri, "docs/a%20b.md", "paths are percent-encoded");
  assert.deepEqual(byRule("jev_held_part").map((item: { level: string }) => item.level), ["error", "error", "warning"]);
  assert.equal(byRule("sensitive_file_changed")[0].locations[0].physicalLocation.region.startLine, 1);
  assert.equal(byRule("jev_result")[0].locations, undefined);
  const ruleIds = run.tool.driver.rules.map((rule: { id: string }) => rule.id);
  assert.deepEqual([...ruleIds].sort(), [...new Set(run.results.map((item: { ruleId: string }) => item.ruleId))].sort());
  assert.doesNotMatch(JSON.stringify(sarif), /a claim written by the author/);
});

test("SARIF: nothing for a clean result; hostile paths and a flood of files are bounded", () => {
  assert.deepEqual(JSON.parse(renderSarif(sample({ action: "auto", reasons: [], policy: { source: "none", findings: [] }, withheld: [], held: [] }))).runs[0].results, []);
  const hostile = ["../../etc/passwd", "/abs/path", "ok/" + String.fromCharCode(10) + "x", "src/fine.ts"];
  const results = JSON.parse(renderSarif(sample({ policy: { source: "none", findings: [] }, withheld: [], held: [{ files: hostile, action: "review" }] }))).runs[0].results;
  const uris = results.flatMap((item: { locations?: Array<{ physicalLocation: { artifactLocation: { uri: string } } }> }) => item.locations?.map(location => location.physicalLocation.artifactLocation.uri) ?? []);
  assert.deepEqual(uris, ["src/fine.ts"]);
  const flood = Array.from({ length: 500 }, (_value, i) => `src/f${i}.ts`);
  assert.equal(JSON.parse(renderSarif(sample({ held: [{ files: flood, action: "review" }] }))).runs[0].results.length, 100);
});

// --- Process level ----------------------------------------------------------------------------------------------------

function cli(args: string[], env: Record<string, string> = {}, cwd = root) {
  return spawnSync(process.execPath, ["--import", pathToFileURL(join(root, "node_modules", "tsx", "dist", "loader.mjs")).href, join(root, "src", "index.ts"), ...args], {
    cwd, encoding: "utf8", env: { ...process.env, JEV_MCP_MOCK: "1", JEV_POLICY_FILE: "none", ...env }, timeout: 60_000,
  });
}

test("process: jev-mcp calibrate reads a ledger directory and validates its options", () => {
  const dir = tempDir();
  fill(dir, [...many(20, { action: "review", reasons: ["test_gap"], label: "false_alarm" })]);
  const json = cli(["calibrate", "--dir", dir, "--json"]);
  assert.equal(json.status, 0, json.stderr);
  assert.equal(JSON.parse(json.stdout).ledger.decisions, 20);
  const text = cli(["calibrate", "--dir", dir, "--min-sample", "5"]);
  assert.match(text.stdout, /\[consider_policy\]/);
  assert.equal(cli(["calibrate", "--dir", dir, "--since", "last-week"]).status, 2);
  assert.equal(cli(["calibrate", "--dir", dir, "--min-sample", "0"]).status, 2);
  assert.equal(cli(["calibrate", "--bogus"]).status, 2);
  const viaEnv = cli(["calibrate", "--json"], { JEV_MCP_LEDGER_DIR: dir });
  assert.equal(JSON.parse(viaEnv.stdout).ledger.decisions, 20, "the configured ledger directory is the default");
});

test("process: jev-mcp ci --format sarif prints SARIF and keeps the exit codes", () => {
  const dir = tempDir();
  const run = (...args: string[]) => spawnSync("git", ["-c", "user.name=t", "-c", "user.email=t@example.com", ...args], { cwd: dir, encoding: "utf8" });
  run("init", "-q");
  run("checkout", "-q", "-b", "trunk");
  writeFileSync(join(dir, ".jev-policy.json"), JSON.stringify({ version: 1, protected_paths: [{ glob: "docs/**", floor: "review" }] }));
  writeFileSync(join(dir, "a.ts"), "export const a = 1;\n");
  run("add", "-A");
  run("commit", "-q", "-m", "base");
  run("checkout", "-q", "-b", "topic");
  mkdirSync(join(dir, "docs"));
  writeFileSync(join(dir, "docs", "guide.md"), "changed\n");
  run("add", "-A");
  run("commit", "-q", "-m", "docs");
  const result = cli(["ci", "--base", "trunk", "--head", "topic", "--deterministic-only", "--format", "sarif"], {}, dir);
  assert.equal(result.status, 10, result.stderr);
  const sarif = JSON.parse(result.stdout);
  assert.equal(sarif.runs[0].results.some((item: { ruleId: string }) => item.ruleId === "policy_review"), true);
  assert.equal(readFileSync(join(dir, "a.ts"), "utf8"), "export const a = 1;\n");
});
