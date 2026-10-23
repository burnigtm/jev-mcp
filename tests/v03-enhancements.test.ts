import assert from "node:assert/strict";
import { after, afterEach, before, beforeEach, mock, test } from "node:test";
import { cacheGet, cacheSet, clearCache } from "../src/cache.ts";
import { errorDetails } from "../src/errors.ts";
import { gateQuestions } from "../src/packs/gate.ts";
import { reviewQuestions } from "../src/packs/review.ts";
import { riskQuestions } from "../src/packs/risk.ts";
import { verifyQuestions } from "../src/packs/verify.ts";
import { tightenJudgmentThresholds } from "../src/policy.ts";
import { resetStats, statsSnapshot } from "../src/stats.ts";
import { codingLoopInputSchema } from "../src/tools/coding-loop.ts";
import { gateOutputSchema, runGate } from "../src/tools/gate.ts";
import { runReview } from "../src/tools/review.ts";
import { runScreen } from "../src/tools/screen.ts";
import { runToolRoute } from "../src/tools/tool-route.ts";
import { detectLoop, loopFingerprint, runTriage } from "../src/tools/triage.ts";
import { runVerify } from "../src/tools/verify.ts";
import { responds, type ApiRequest } from "./helpers/fixture.ts";

const envNames = [
  "JEV_MCP_MOCK", "TYPESAFE_API_KEY", "TYPESAFE_BASE_URL", "JEV_MCP_AUTO_ACCEPT", "JEV_MCP_REVIEW_AT",
  "JEV_MCP_CACHE_TTL_MS", "JEV_MCP_CACHE_MAX_ENTRIES", "JEV_MCP_TOKEN_BUDGET",
];
const previousEnv = new Map(envNames.map((name) => [name, process.env[name]]));

before(() => {
  process.env.JEV_MCP_MOCK = "0";
  process.env.TYPESAFE_API_KEY = "fixture-key";
  for (const name of envNames.slice(2)) delete process.env[name];
});

beforeEach(() => {
  clearCache();
  resetStats();
});

afterEach(() => {
  mock.restoreAll();
  delete process.env.JEV_MCP_CACHE_TTL_MS;
  delete process.env.JEV_MCP_TOKEN_BUDGET;
});

after(() => {
  clearCache();
  resetStats();
  for (const [name, value] of previousEnv) {
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
});

const CLEAN_REVIEW = { correctness: 2, spec_match: 2, safe_to_apply: 0.95 };

// --- Bug fixes ---------------------------------------------------------------

test("verify: a low-confidence claim escalates the whole verification", async () => {
  responds(() => ({ claim_0: "verified", "claim_0.confidence": 0.3, claim_1: "verified" }));
  const result = await runVerify({ claims: ["Tests pass", "Lint passes"], evidence: "Tests pass. Lint passes." });
  assert.equal(result.results[0]?.action, "escalate");
  assert.equal(result.action, "escalate", "per-claim escalate must not be softened to review");
});

test("verify: a confident contradiction escalates per claim and counts as needing review", async () => {
  responds(() => ({ claim_0: "contradicted" }));
  const result = await runVerify({ claims: ["Helmets are optional"], evidence: "Every rider must wear a helmet." });
  assert.equal(result.results[0]?.action, "escalate");
  assert.equal(result.summary.needs_review, 1);
  assert.equal(result.action, "escalate");
  assert.equal(result.all_claims_verified, false);
});

test("screen: a stricter block_at below the default review cutoff is accepted", async () => {
  responds(() => ({ substance: 0.95 }));
  const result = await runScreen({ text: "Ordinary release notes for version 2.", block_at: 0.2 });
  assert.equal(result.thresholds.block_at, 0.2);
  assert.equal(result.thresholds.review_at, 0.2);
});

test("thresholds: a lone stricter review_at raises auto_accept instead of failing", () => {
  assert.deepEqual(tightenJudgmentThresholds(undefined, 0.9, 0.8, 0.5), { autoAccept: 0.9, reviewAt: 0.9 });
  assert.deepEqual(tightenJudgmentThresholds(undefined, 0.6, 0.8, 0.5), { autoAccept: 0.8, reviewAt: 0.6 });
  assert.throws(() => tightenJudgmentThresholds(0.3, 0.9, 0.8, 0.5), /Thresholds/);
});

test("triage: host cause IDs are sanitized before reaching the judge", async () => {
  let seen: ApiRequest | undefined;
  responds((request) => {
    seen = request;
    return { cause: "cause_0", strategy: "change_approach", recoverable: 0.95 };
  });
  await runTriage({
    task: "Fix parser",
    failure: "TypeError in parse",
    causes: [{ id: "bad‮id", description: "Parser bug" }, { id: "env", description: "Environment" }],
  });
  const causes = seen?.state.causes as Array<{ original_id: string }>;
  assert.doesNotMatch(causes[0]!.original_id, /‮/);
});

test("tool route reports its dispatch floor separately", async () => {
  const result = await runToolRoute({ task: "Fix", observation: "", candidates: [] });
  assert.equal(result.thresholds.dispatch_at, 0.8);
});

test("coding loop rejects an empty task like the other routers", () => {
  assert.equal(codingLoopInputSchema.safeParse({ task: "", observation: "x" }).success, false);
});

// --- Response cache ----------------------------------------------------------

test("cache: an identical request is served without a provider call or token spend", async () => {
  process.env.JEV_MCP_CACHE_TTL_MS = "60000";
  const provider = responds(() => CLEAN_REVIEW);
  const input = { request: "Fix pagination", diff: "-a\n+b", tests: "1 passed" };
  const first = await runReview(input);
  const second = await runReview(input);
  assert.equal(provider.mock.callCount(), 1);
  assert.deepEqual(first.usage, { input_tokens: 100, output_tokens: 10 });
  assert.deepEqual(second.usage, { input_tokens: 0, output_tokens: 0 });
  assert.equal(second.action, first.action);

  // Policy still runs on cached answers: stricter thresholds apply immediately.
  const stricter = await runReview({ ...input, auto_accept: 0.99, review_at: 0.99 });
  assert.equal(provider.mock.callCount(), 1);
  assert.equal(stricter.thresholds.auto_accept, 0.99);

  const snapshot = statsSnapshot(undefined, 1);
  assert.equal(snapshot.provider.requests, 1);
  assert.equal(snapshot.provider.cache_hits, 2);
});

test("cache: off by default, and a changed request misses", async () => {
  const provider = responds(() => CLEAN_REVIEW);
  await runReview({ request: "Fix", diff: "+a" });
  await runReview({ request: "Fix", diff: "+a" });
  assert.equal(provider.mock.callCount(), 2);

  process.env.JEV_MCP_CACHE_TTL_MS = "60000";
  await runReview({ request: "Fix", diff: "+a" });
  await runReview({ request: "Fix", diff: "+b" });
  assert.equal(provider.mock.callCount(), 4);
});

test("cache: entries expire and the LRU evicts the oldest entry", () => {
  cacheSet("a", { value: 1 }, 1_000, 2, 0);
  assert.deepEqual(cacheGet("a", 500), { value: 1 });
  assert.equal(cacheGet("a", 1_000), undefined);

  cacheSet("x", 1, 1_000, 2, 0);
  cacheSet("y", 2, 1_000, 2, 0);
  cacheGet("x", 1); // x is now most recent
  cacheSet("z", 3, 1_000, 2, 0);
  assert.equal(cacheGet("y", 1), undefined);
  assert.equal(cacheGet("x", 1), 1);
  assert.equal(cacheGet("z", 1), 3);
});

test("cache: callers cannot mutate a cached result", async () => {
  cacheSet("k", { answers: { a: 1 } }, 1_000, 4, 0);
  const copy = cacheGet<{ answers: { a: number } }>("k", 1)!;
  copy.answers.a = 99;
  assert.deepEqual(cacheGet("k", 1), { answers: { a: 1 } });
});

// --- Token budget --------------------------------------------------------------

test("budget: an exhausted budget fails closed before any provider request", async () => {
  process.env.JEV_MCP_TOKEN_BUDGET = "50";
  const provider = responds(() => CLEAN_REVIEW);
  await runReview({ request: "Fix", diff: "+a" });
  await assert.rejects(runReview({ request: "Fix", diff: "+b" }), (err: unknown) => {
    assert.equal(errorDetails(err).code, "BUDGET_EXHAUSTED");
    assert.equal(errorDetails(err).retryable, false);
    return true;
  });
  assert.equal(provider.mock.callCount(), 1);
  const snapshot = statsSnapshot(50, 0);
  assert.equal(snapshot.budget.spent, 110);
  assert.equal(snapshot.budget.remaining, 0);
  assert.equal(snapshot.provider.budget_rejections, 1);
});

test("budget: cache hits are still served after the budget is spent", async () => {
  process.env.JEV_MCP_TOKEN_BUDGET = "50";
  process.env.JEV_MCP_CACHE_TTL_MS = "60000";
  responds(() => CLEAN_REVIEW);
  await runReview({ request: "Fix", diff: "+a" });
  const cached = await runReview({ request: "Fix", diff: "+a" });
  assert.deepEqual(cached.usage, { input_tokens: 0, output_tokens: 0 });
});

test("budget: invalid budget and cache settings are configuration errors", async () => {
  responds();
  for (const [name, value] of [["JEV_MCP_TOKEN_BUDGET", "0"], ["JEV_MCP_CACHE_TTL_MS", "-1"], ["JEV_MCP_CACHE_TTL_MS", "1.5"]] as const) {
    process.env[name] = value;
    await assert.rejects(runReview({ request: "Fix", diff: "+a" }), (err: unknown) => errorDetails(err).code === "CONFIG_ERROR");
    delete process.env[name];
  }
});

// --- Security-aware gate -------------------------------------------------------

test("gate risk: question IDs for review, claims, and security never collide", () => {
  const review = Object.keys(reviewQuestions());
  const claims = Object.keys(verifyQuestions(3));
  const security = Object.keys(riskQuestions());
  const all = [...review, ...claims, ...security];
  assert.equal(new Set(all).size, all.length);
  assert.deepEqual(Object.keys(gateQuestions(3, { risk: true })).sort(), [...all].sort());
  assert.deepEqual(Object.keys(gateQuestions(3)).sort(), [...review, ...claims].sort());
});

test("gate risk: one request returns review, verification, and security", async () => {
  const provider = responds(() => ({ ...CLEAN_REVIEW, claim_0: "verified" }));
  const result = await runGate({
    request: "Fix parser", diff: "-a\n+b", tests: "1 passed", claims: ["Tests pass"], evidence: "1 passed",
    risk: true, files: [{ path: "src/parser.ts", change: "modified" }], dependencies: [],
  });
  assert.equal(provider.mock.callCount(), 1);
  const request = provider.mock.calls[0]!.arguments[0] as ApiRequest;
  assert.ok("authorization" in request.questions && "claim_0" in request.questions && "correctness" in request.questions);
  assert.deepEqual(request.state.files, [{ path: "src/parser.ts", change: "modified" }]);
  assert.equal(result.action, "auto");
  assert.equal(result.security?.action, "auto");
  assert.deepEqual(result.reason_codes, ["accepted"]);
  gateOutputSchema.parse(result);
});

test("gate risk: a critical security flag escalates an otherwise clean gate", async () => {
  responds(() => ({ ...CLEAN_REVIEW, claim_0: "verified", secret_exposure: 0.95 }));
  const result = await runGate({
    request: "Add logging", diff: "+console.log(process.env.API_KEY)", claims: ["Logging added"], evidence: "Logging added", risk: true,
  });
  assert.equal(result.review.action, "auto");
  assert.equal(result.verification.action, "auto");
  assert.equal(result.security?.action, "escalate");
  assert.equal(result.action, "escalate");
  assert.ok(result.reason_codes.includes("security_escalated"));
});

test("gate without risk keeps its original shape", async () => {
  const provider = responds(() => ({ ...CLEAN_REVIEW, claim_0: "verified" }));
  const result = await runGate({ request: "Fix", diff: "+a", claims: ["Done"], evidence: "Done" });
  const request = provider.mock.calls[0]!.arguments[0] as ApiRequest;
  assert.equal("authorization" in request.questions, false);
  assert.equal("security" in result, false);
});

// --- Deterministic loop detector -----------------------------------------------

test("loop fingerprints ignore timestamps, durations, hex ids, and counts", () => {
  assert.equal(
    loopFingerprint("2026-10-23T10:00:01Z FAIL parse (12ms) at 0xdeadbeef1 line 40"),
    loopFingerprint("2026-10-23T10:05:44Z FAIL parse (803ms) at 0xcafebabe2 line 41"),
  );
  assert.notEqual(loopFingerprint("FAIL parse"), loopFingerprint("FAIL render"));
});

test("detectLoop: repeated attempts and persistent identical failures are loops", () => {
  const same = { action: "rerun npm test", result: "FAIL parser.test.ts (31ms)", failed: true };
  assert.deepEqual(detectLoop([same, { ...same, result: "FAIL parser.test.ts (44ms)" }], [], "FAIL"), {
    detected: true, repeats: 2, kind: "repeated_attempt",
  });
  const twoApproaches = [
    { action: "edit tokenizer", result: "TypeError at parse:12", failed: true },
    { action: "edit lexer", result: "TypeError at parse:12", failed: true },
  ];
  assert.equal(detectLoop(twoApproaches, [], "TypeError at parse:12").kind, "same_failure");
});

test("detectLoop: the latest attempt producing the current failure is not a loop", () => {
  const verdict = detectLoop([{ action: "edit parser", result: "TypeError at parse", failed: true }], [], "TypeError at parse");
  assert.equal(verdict.detected, false);
  assert.equal(detectLoop([
    { action: "edit tokenizer", result: "TypeError", failed: true },
    { action: "edit lexer", result: "RangeError", failed: true },
  ], [], "SyntaxError").detected, false);
});

test("triage: a detected loop blocks auto even when Jev reports advancing", async () => {
  responds(() => ({ cause: "cause_0", progress: "advancing", strategy: "change_approach", recoverable: 0.95 }));
  const clean = await runTriage({ task: "Fix parser", failure: "TypeError in parse", attempts: [{ action: "edit parse", result: "RangeError", failed: true }] });
  assert.equal(clean.action, "auto");
  assert.equal(clean.loop.detected, false);

  const looping = await runTriage({
    task: "Fix parser",
    failure: "TypeError in parse",
    attempts: [1, 2, 3].map((n) => ({ action: "rerun tests", result: `2026-10-23T10:0${n}:00Z TypeError in parse`, failed: true })),
  });
  assert.equal(looping.progress.choice, "advancing", "the model's answer is reported unchanged");
  assert.equal(looping.loop.detected, true);
  assert.equal(looping.loop.repeats, 3);
  assert.notEqual(looping.action, "auto");
  assert.ok(looping.reason_codes.includes("loop_detected"));
});
