import assert from "node:assert/strict";
import { after, afterEach, before, mock, test } from "node:test";
import { TypeSafeClient, type Questions } from "@typesafe-ai/sdk";
import { clearCache } from "../src/cache.ts";
import { errorDetails } from "../src/errors.ts";
import { estimateTokens } from "../src/limits.ts";
import { OUTPUT_TOKENS_PER_QUESTION, releaseTokens, resetStats, statsSnapshot, tokensSpent, tryReserveTokens } from "../src/stats.ts";
import { gateOutputSchema, runGate } from "../src/tools/gate.ts";
import { reviewOutputSchema } from "../src/tools/output-schemas.ts";
import { runReview } from "../src/tools/review.ts";
import { runScreen } from "../src/tools/screen.ts";
import { detectLoop, failureCount, loopFingerprint, runTriage } from "../src/tools/triage.ts";
import { systemOne } from "../src/typesafe.ts";
import { answerAll, envScope, responds, type ApiRequest } from "./helpers/fixture.ts";

/** PR 1 hardening: loop-detector progress override, token-budget reservation, gate state order and output parsing. */

const restoreEnv = envScope(["JEV_MCP_MOCK", "TYPESAFE_API_KEY", "TYPESAFE_BASE_URL", "JEV_MCP_TOKEN_BUDGET", "JEV_MCP_CACHE_TTL_MS", "JEV_MCP_AUTO_ACCEPT", "JEV_MCP_REVIEW_AT"]);

before(() => {
  process.env.JEV_MCP_MOCK = "0";
  process.env.TYPESAFE_API_KEY = "fixture-key";
  for (const name of ["TYPESAFE_BASE_URL", "JEV_MCP_TOKEN_BUDGET", "JEV_MCP_CACHE_TTL_MS", "JEV_MCP_AUTO_ACCEPT", "JEV_MCP_REVIEW_AT"]) delete process.env[name];
});

afterEach(() => {
  mock.restoreAll();
  clearCache();
  resetStats();
  delete process.env.JEV_MCP_TOKEN_BUDGET;
});

after(restoreEnv);

const attempt = (action: string, result: string) => ({ action, result, failed: true });

// --- Loop detector -------------------------------------------------------------------

test("failureCount reads counts next to failure words and does not double count overlaps", () => {
  assert.equal(failureCount("Tests: 9 failed, 36 passed"), 9);
  assert.equal(failureCount("✖ 4 problems (1 error, 0 warnings)"), 4);
  assert.equal(failureCount("FAIL pager\nfailures: 7"), 7);
  assert.equal(failureCount("Tests: 0 failed, 12 passed"), 0);
  assert.equal(failureCount("12 tests failed, 3 errors"), 12);
  assert.equal(failureCount("all good"), undefined);
  assert.equal(failureCount("attempt 3/5 timed out"), undefined);
});

test("loop detector: shrinking failure counts are progress, in every wording and with a repeated action", () => {
  const cases: Array<[Array<{ action: string; result: string; failed: boolean }>, string]> = [
    [[attempt("fix parser", "Tests: 9 failed, 36 passed"), attempt("fix lexer", "Tests: 5 failed, 40 passed")], "Tests: 2 failed, 43 passed"],
    [[attempt("rerun tests", "Tests: 9 failed"), attempt("rerun tests", "Tests: 5 failed")], "Tests: 2 failed"],
    [[attempt("lint", "✖ 12 problems (4 errors)"), attempt("lint", "✖ 7 problems (2 errors)")], "✖ 3 problems (1 error)"],
    [[attempt("build", "failures: 8"), attempt("build", "failures: 3")], "failures: 0"],
  ];
  for (const [attempts, failure] of cases) {
    const verdict = detectLoop(attempts, [], failure);
    assert.equal(verdict.detected, false, failure);
    assert.equal(verdict.improving, true, failure);
  }
});

test("loop detector: stuck, growing, and uncounted repeats are still loops", () => {
  const loops: Array<[Array<{ action: string; result: string; failed: boolean }>, string]> = [
    [[attempt("fix a", "Tests: 3 failed"), attempt("fix b", "Tests: 3 failed")], "Tests: 3 failed"],
    [[attempt("fix a", "Tests: 2 failed"), attempt("fix b", "Tests: 5 failed")], "Tests: 9 failed"],
    [[attempt("fix a", "Tests: 5 failed"), attempt("fix b", "Tests: 5 failed")], "Tests: 2 failed"], // not strictly shrinking between attempts
    [[attempt("retry upload", "attempt 3 timed out"), attempt("retry upload", "attempt 4 timed out")], "attempt 5 timed out"],
    [[attempt("edit parse", "TypeError at parse:12:3"), attempt("edit lexer", "TypeError at parse:40:9")], "TypeError at parse:77:1"],
  ];
  for (const [attempts, failure] of loops) {
    const verdict = detectLoop(attempts, [], failure);
    assert.equal(verdict.detected, true, failure);
    assert.notEqual(verdict.improving, true, failure);
  }
});

test("loop detector: progress needs a known count at every step and at least two attempts", () => {
  assert.equal(detectLoop([attempt("fix a", "Tests: 9 failed"), attempt("fix b", "something odd happened")], [], "Tests: 2 failed").improving, undefined);
  assert.equal(detectLoop([attempt("fix a", "Tests: 9 failed")], [], "Tests: 2 failed").detected, false);
  assert.equal(detectLoop([{ action: "fix a", failed: true }, attempt("fix b", "Tests: 5 failed")], [], "Tests: 2 failed").improving, undefined);
});

test("loop fingerprints still mask volatile values", () => {
  assert.equal(loopFingerprint("2026-10-24T10:00:01Z FAIL (12ms) 0xdeadbeef1"), loopFingerprint("2026-10-24T11:30:59Z FAIL (803ms) 0xcafebabe22"));
});

test("jev_triage: a shrinking-failure trajectory is not forced to review by the loop detector", async () => {
  responds(() => ({ cause: "cause_0", progress: "advancing", strategy: "change_approach", recoverable: 0.95 }));
  const progressing = await runTriage({
    task: "Fix the parser", failure: "Tests: 2 failed, 43 passed",
    attempts: [attempt("fix parser", "Tests: 9 failed, 36 passed"), attempt("fix lexer", "Tests: 5 failed, 40 passed")],
  });
  assert.equal(progressing.loop.detected, false);
  assert.equal(progressing.loop.improving, true);
  assert.equal(progressing.reason_codes.includes("loop_detected"), false);
  const stuck = await runTriage({
    task: "Fix the parser", failure: "Tests: 5 failed, 40 passed",
    attempts: [attempt("fix parser", "Tests: 5 failed, 40 passed"), attempt("fix lexer", "Tests: 5 failed, 40 passed")],
  });
  assert.equal(stuck.loop.detected, true);
  assert.notEqual(stuck.action, "auto");
});

// --- Token budget --------------------------------------------------------------------------

const ONE_QUESTION: Questions = { ok: { type: "noul", instructions: "Is this a status line?" } };
const reservationFor = (state: string) => estimateTokens({ state, questions: ONE_QUESTION }) + OUTPUT_TOKENS_PER_QUESTION;

function slowProvider(options: { delayMs?: number; fail?: boolean } = {}) {
  let started = 0;
  const provider = mock.method(TypeSafeClient.prototype, "systemOne", async (request: ApiRequest) => {
    started += 1;
    await new Promise((resolve) => setTimeout(resolve, options.delayMs ?? 25));
    if (options.fail) throw new Error("socket hang up");
    return { model: "jev-fixture", usage: { input_tokens: 40, output_tokens: 4 }, answers: answerAll(request.questions) };
  });
  return { provider, started: () => started };
}

test("budget: concurrent calls cannot all pass the same check", async () => {
  const reservation = reservationFor("status line");
  process.env.JEV_MCP_TOKEN_BUDGET = String(reservation * 2); // room for exactly two in-flight reservations
  const { started } = slowProvider();
  const outcomes = await Promise.allSettled(Array.from({ length: 6 }, () => systemOne({ state: "status line", questions: ONE_QUESTION })));
  const rejected = outcomes.filter((outcome) => outcome.status === "rejected");
  assert.equal(started(), 2, "only two requests reached the provider");
  assert.equal(rejected.length, 4);
  for (const outcome of rejected) assert.equal(errorDetails((outcome as PromiseRejectedResult).reason).code, "BUDGET_EXHAUSTED");
  assert.equal(statsSnapshot(reservation * 2, 0).budget.reserved, 0, "reservations are released when requests settle");
});

test("budget: a dispatched request that fails is charged at its reservation", async () => {
  const reservation = reservationFor("status line");
  process.env.JEV_MCP_TOKEN_BUDGET = String(reservation * 3);
  slowProvider({ fail: true });
  await assert.rejects(systemOne({ state: "status line", questions: ONE_QUESTION }));
  assert.equal(tokensSpent(), reservation, "unknown usage is charged at the reservation");
  const snapshot = statsSnapshot(reservation * 3, 0);
  assert.equal(snapshot.provider.failed_requests, 1);
  assert.equal(snapshot.provider.requests, 0, "no successful request was recorded");
  // Enough failed requests exhaust the budget even though none returned usage.
  await assert.rejects(systemOne({ state: "status line", questions: ONE_QUESTION }));
  await assert.rejects(systemOne({ state: "status line", questions: ONE_QUESTION }));
  await assert.rejects(systemOne({ state: "status line", questions: ONE_QUESTION }), (err: unknown) => errorDetails(err).code === "BUDGET_EXHAUSTED");
});

test("budget: requests refused before dispatch are not charged", async () => {
  process.env.TYPESAFE_API_KEY = "";
  try {
    process.env.JEV_MCP_TOKEN_BUDGET = "10000";
    await assert.rejects(systemOne({ state: "status line", questions: ONE_QUESTION }), (err: unknown) => errorDetails(err).code === "CONFIG_ERROR");
    assert.equal(tokensSpent(), 0);
    assert.equal(statsSnapshot(10000, 0).budget.reserved, 0);
  } finally {
    process.env.TYPESAFE_API_KEY = "fixture-key";
  }
});

test("budget: tryReserveTokens is atomic, honours the cap, and release is idempotent at zero", () => {
  assert.equal(tryReserveTokens(100, undefined), 100);
  assert.equal(tryReserveTokens(100, 150), 100, "first request fits: nothing is committed yet");
  assert.equal(tryReserveTokens(100, 150), undefined, "committed reservations already reach the cap");
  releaseTokens(200);
  releaseTokens(200);
  assert.equal(statsSnapshot(1000, 0).budget.reserved, 0);
  assert.equal(tryReserveTokens(100, 150), 100, "capacity is back after release");
});

test("budget: cache hits and successful calls keep the original accounting", async () => {
  process.env.JEV_MCP_TOKEN_BUDGET = "100000";
  responds();
  await systemOne({ state: "status line", questions: ONE_QUESTION });
  assert.equal(tokensSpent(), 110);
  assert.equal(statsSnapshot(100000, 0).provider.failed_requests, 0);
});

// --- Gate hygiene --------------------------------------------------------------------------

const GATE_INPUT = { request: "Fix the pager", diff: "-a\n+b", tests: "1 passed", claims: ["Tests pass"], evidence: "1 passed" };

test("gate: claims and evidence precede the bulky diff and tests in the judged state", async () => {
  const provider = responds(() => ({ correctness: 2, spec_match: 2, safe_to_apply: 0.95, claim_0: "verified" }));
  await runGate(GATE_INPUT);
  const first = Object.keys((provider.mock.calls[0]!.arguments[0] as ApiRequest).state);
  assert.deepEqual(first, ["request", "claims", "evidence", "diff", "tests"]);
  await runGate({ ...GATE_INPUT, risk: true, files: [{ path: "src/pager.ts" }], dependencies: [] });
  const risky = Object.keys((provider.mock.calls[1]!.arguments[0] as ApiRequest).state);
  assert.deepEqual(risky, ["request", "claims", "evidence", "files", "dependencies", "diff", "tests"]);
});

test("gate: an oversized diff truncates the diff, never the claims or evidence", async () => {
  const provider = responds(() => ({ correctness: 2, spec_match: 2, safe_to_apply: 0.95, claim_0: "verified" }));
  const result = await runGate({ ...GATE_INPUT, diff: "+ filler line of code\n".repeat(30_000), evidence: "UNIQUE-EVIDENCE-MARKER" });
  assert.equal(result.truncated, true);
  assert.notEqual(result.action, "auto");
  const sent = JSON.stringify((provider.mock.calls[0]!.arguments[0] as ApiRequest).state);
  assert.match(sent, /UNIQUE-EVIDENCE-MARKER/);
  assert.match(sent, /Tests pass/);
});

test("review, gate and screen outputs are validated against their output schemas", async () => {
  responds(() => ({ correctness: 2, spec_match: 2, safe_to_apply: 0.95, claim_0: "verified", substance: 0.95 }));
  const gate = await runGate(GATE_INPUT);
  assert.deepEqual(gateOutputSchema.parse(gate), gate);
  const review = await runReview({ request: "Fix the pager", diff: "-a\n+b", tests: "1 passed" });
  assert.deepEqual(reviewOutputSchema.parse(review), review);
  const screen = await runScreen({ text: "Release notes for version 2 of the pager library." });
  assert.ok(["pass", "review", "block", "skip"].includes(screen.recommendation.action));
});

// --- Response failure reasons ---------------------------------------------------------------

import { JevResponseError } from "../src/errors.ts";
import { validateResponse } from "../src/responses.ts";

const REASON_QUESTIONS: Questions = {
  flag: { type: "noul", instructions: "flag?" },
  pick: { type: "choice", instructions: "pick?", criteria: { a: "A", b: "B", c: "C" } },
  level: { type: "score", instructions: "level?", criteria: ["low", "mid", "high"] },
};

function goodResponse(): Record<string, any> {
  return {
    model: "jev", usage: { input_tokens: 10, output_tokens: 2 },
    answers: {
      flag: { type: "noul", noul: 0.9 },
      pick: { type: "choice", choice: "a", confidence: 0.85, probabilities: { a: 0.9, b: 0.05, c: 0.05 } },
      level: { type: "score", score: 0.2, confidence: 0.8, probabilities: { "0": 0.8, "1": 0.2, "2": 0 }, legend: { "0": "low", "1": "mid", "2": "high" } },
    },
  };
}

test("response rejections carry a fixed reason name that identifies the failed rule", () => {
  const cases: Array<[string, (r: Record<string, any>) => void]> = [
    ["shape", (r) => { r.usage.input_tokens = -1; }],
    ["answer_count", (r) => { delete r.answers.flag; }],
    ["answer_type", (r) => { r.answers.flag = { type: "score", score: 0, confidence: 1, probabilities: { "0": 1, "1": 0, "2": 0 }, legend: {} }; }],
    ["option_keys", (r) => { delete r.answers.pick.probabilities.c; r.answers.pick.probabilities.b = 0.1; }],
    ["probability_mass", (r) => { r.answers.pick.probabilities = { a: 0.6, b: 0.1, c: 0.1 }; }],
    ["choice_unknown", (r) => { r.answers.pick.choice = "z"; }],
    ["choice_not_argmax", (r) => { r.answers.pick.choice = "b"; }],
    ["score_range", (r) => { r.answers.level.score = 3; }],
    ["score_legend", (r) => { delete r.answers.level.legend["2"]; }],
    ["score_mismatch", (r) => { r.answers.level.score = 1.8; }],
  ];
  for (const [reason, mutate] of cases) {
    const response = goodResponse();
    mutate(response);
    assert.throws(() => validateResponse(response, REASON_QUESTIONS), (err: unknown) => err instanceof JevResponseError && err.reason === reason, reason);
  }
  assert.doesNotThrow(() => validateResponse(goodResponse(), REASON_QUESTIONS));
});

test("rejected provider responses are counted by reason in jev://stats counters and keep the generic message", async () => {
  mock.method(TypeSafeClient.prototype, "systemOne", async (request: ApiRequest) => {
    const answers = answerAll(request.questions);
    (answers.ok as { noul: number }).noul = 2; // outside [0, 1]
    return { model: "jev-fixture", usage: { input_tokens: 10, output_tokens: 1 }, answers };
  });
  await assert.rejects(systemOne({ state: "status line", questions: ONE_QUESTION }), (err: unknown) => {
    assert.ok(err instanceof JevResponseError);
    assert.equal(errorDetails(err).message, "TypeSafe returned an invalid response. No decision was accepted.");
    assert.doesNotMatch(errorDetails(err).message, /shape|noul/);
    return true;
  });
  const snapshot = statsSnapshot(undefined, 0);
  assert.deepEqual(snapshot.provider.response_failures, { shape: 1 });
  assert.equal(snapshot.provider.failed_requests, 1, "the request was dispatched, so its cost is charged");
});

test("a non-JSON provider body is reported as not_json", async () => {
  mock.method(TypeSafeClient.prototype, "systemOne", async () => { throw new SyntaxError("Unexpected token < in JSON"); });
  await assert.rejects(systemOne({ state: "status line", questions: ONE_QUESTION }), (err: unknown) => err instanceof JevResponseError && err.reason === "not_json");
  assert.deepEqual(statsSnapshot(undefined, 0).provider.response_failures, { not_json: 1 });
});
