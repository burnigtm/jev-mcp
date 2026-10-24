import assert from "node:assert/strict";
import { test } from "node:test";
import type { ScoreResponse } from "@typesafe-ai/sdk";
import { DEFAULT_FAILURE_CAUSES, triageQuestions } from "../src/packs/triage.ts";
import { acceptableRegionConfidence, confidenceFromProbabilities, riskAction } from "../src/policy.ts";
import { reviewReasonSchema } from "../src/tools/output-schemas.ts";
import { projectReview } from "../src/tools/review.ts";
import type { EvaluateResponse } from "../src/typesafe.ts";
import { ACTION_RANK, seeded } from "./helpers/fixture.ts";

/**
 * Calibration changes from the live value benchmark: "lower is better" scores
 * (blast radius, test gap, severity) need confidence in their accepted region,
 * not in one exact level; reviews explain themselves; triage separates runtime
 * exceptions from assertion failures.
 */

function scoreFrom(probabilities: number[]): ScoreResponse {
  const record = Object.fromEntries(probabilities.map((p, i) => [String(i), p]));
  return {
    type: "score",
    score: probabilities.reduce((sum, p, i) => sum + p * i, 0),
    confidence: confidenceFromProbabilities(record),
    probabilities: record,
    legend: Object.fromEntries(probabilities.map((_, i) => [String(i), `level ${i}`])),
  };
}

const STRONG_HIGH = [0, 0.02, 0.98]; // correctness / spec match ≈ 2, confident
const CLEAN_LOW = [0.98, 0.02, 0]; // test gap / blast radius ≈ 0, confident

function review(dims: { correctness?: number[]; spec?: number[]; testGap?: number[]; blast?: number[] }, safe = 0.92, autoAccept = 0.8, reviewAt = 0.5) {
  const result: EvaluateResponse = {
    model: "jev-fixture",
    usage: { input_tokens: 1, output_tokens: 1 },
    truncated: false,
    coverage: { complete: true, original_chars: 1, evaluated_chars: 1, estimated_tokens: { state: 1, questions: 1, longest_question: 1 }, estimator: "chars/4" },
    answers: {
      correctness: scoreFrom(dims.correctness ?? STRONG_HIGH),
      spec_match: scoreFrom(dims.spec ?? STRONG_HIGH),
      test_gap: scoreFrom(dims.testGap ?? CLEAN_LOW),
      blast_radius: scoreFrom(dims.blast ?? CLEAN_LOW),
      safe_to_apply: { type: "noul", noul: safe },
    },
  };
  return projectReview(result, autoAccept, reviewAt);
}

// --- Region confidence -------------------------------------------------------------

test("acceptableRegionConfidence is bounded, scale-invariant, and monotone in the accepted region", () => {
  const random = seeded(11);
  assert.equal(acceptableRegionConfidence({}, 1), 0);
  assert.equal(acceptableRegionConfidence({ "0": 0, "1": 0, "2": 0 }, 1), 0);
  for (let i = 0; i < 2_000; i += 1) {
    const raw = Array.from({ length: 3 }, () => random());
    const probs = Object.fromEntries(raw.map((p, j) => [String(j), p]));
    const scaled = Object.fromEntries(raw.map((p, j) => [String(j), p * 7]));
    const low = acceptableRegionConfidence(probs, 0);
    const mid = acceptableRegionConfidence(probs, 1);
    const all = acceptableRegionConfidence(probs, 2);
    assert.ok(low >= 0 && low <= mid + 1e-12 && mid <= all + 1e-12 && all <= 1);
    assert.ok(Math.abs(all - 1) < 1e-12, "the full range is certain");
    assert.ok(Math.abs(acceptableRegionConfidence(scaled, 1) - mid) < 1e-12, "scale-invariant");
    // Region confidence is equivalent to "P(worst level) <= 1 - threshold".
    const worst = raw[2]! / raw.reduce((a, b) => a + b, 0);
    assert.ok(Math.abs(mid - (1 - worst)) < 1e-12);
  }
});

// --- Review --------------------------------------------------------------------------

test("review: a blast radius split between none and bounded no longer blocks an otherwise excellent patch", () => {
  // Shape observed live: score ≈ 0.3–0.6, confidence 0.43–0.78, almost no mass at level 2.
  for (const blast of [[0.5, 0.45, 0.05], [0.6, 0.38, 0.02], [0.3, 0.68, 0.02]]) {
    const result = review({ blast });
    assert.ok(scoreFrom(blast).confidence < 0.8, "the old exact-level rule would have blocked this");
    assert.equal(result.action, "auto", JSON.stringify(blast));
    assert.deepEqual(result.reason_codes, ["accepted"]);
  }
});

test("review: real blast-radius or test-gap risk still blocks, with a named reason", () => {
  const wideish = review({ blast: [0.3, 0.4, 0.3] });
  assert.notEqual(wideish.action, "auto");
  assert.ok(wideish.reason_codes.includes("blast_radius_uncertain"));
  // Expected score 0.9 is under the floor, but 25% sits at "critical path untested".
  const untested = review({ testGap: [0.35, 0.4, 0.25] });
  assert.notEqual(untested.action, "auto");
  assert.ok(untested.reason_codes.includes("test_gap_uncertain"));
  // Expected score above the floor is named as a gap, not as uncertainty.
  const overFloor = review({ testGap: [0.2, 0.5, 0.3] });
  assert.notEqual(overFloor.action, "auto");
  assert.ok(overFloor.reason_codes.includes("test_gap"));
  const confidentlyWide = review({ blast: [0, 0.02, 0.98] });
  assert.equal(confidentlyWide.action, "escalate");
  assert.ok(confidentlyWide.reason_codes.includes("blast_radius"));
});

test("review: correctness and spec match keep the strict exact-level requirement", () => {
  const splitCorrectness = review({ correctness: [0.02, 0.45, 0.53] });
  assert.notEqual(splitCorrectness.action, "auto");
  assert.ok(splitCorrectness.reason_codes.includes("correctness_uncertain"));
  const flatSpec = review({ spec: [1 / 3, 1 / 3, 1 / 3] });
  assert.notEqual(flatSpec.action, "auto");
  assert.ok(flatSpec.reason_codes.includes("spec_match_uncertain"));
  const unsafe = review({}, 0.3);
  assert.equal(unsafe.action, "escalate");
  assert.ok(unsafe.reason_codes.includes("unsafe_to_apply"));
});

test("review: reason codes are always valid, nonempty, and say accepted exactly when the action is auto", () => {
  const random = seeded(12);
  const dist = () => {
    const raw = Array.from({ length: 3 }, () => random() ** 2);
    const total = raw.reduce((a, b) => a + b, 0);
    return raw.map((p) => p / total);
  };
  for (let i = 0; i < 3_000; i += 1) {
    const result = review({ correctness: dist(), spec: dist(), testGap: dist(), blast: dist() }, random());
    assert.ok(result.reason_codes.length > 0);
    for (const code of result.reason_codes) assert.ok(reviewReasonSchema.options.includes(code));
    assert.equal(result.reason_codes.includes("accepted"), result.action === "auto");
    if (result.action === "auto") assert.deepEqual(result.reason_codes, ["accepted"]);
  }
});

test("review: tightening auto_accept never softens the projected action", () => {
  const random = seeded(13);
  const dist = () => {
    const raw = Array.from({ length: 3 }, () => random() ** 3);
    const total = raw.reduce((a, b) => a + b, 0);
    return raw.map((p) => p / total);
  };
  for (let i = 0; i < 2_000; i += 1) {
    const dims = { correctness: dist(), spec: dist(), testGap: dist(), blast: dist() };
    const safe = 0.4 + random() * 0.6;
    const ranks = [[0.8, 0.5], [0.9, 0.6], [0.95, 0.9], [1, 1]].map(([auto, rev]) => ACTION_RANK[review(dims, safe, auto, rev).action]);
    for (let j = 1; j < ranks.length; j += 1) assert.ok(ranks[j]! >= ranks[j - 1]!, JSON.stringify({ dims, safe }));
  }
});

// --- Risk severity ---------------------------------------------------------------------

const CLEAN_FLAGS = { authorization: 0.02, input_validation: 0.02, secret_exposure: 0.02, data_loss: 0.02, concurrency: 0.02, dependency: 0.02, external_effect: 0.02 };

test("risk: a low severity split between none and bounded is auto-eligible; real severity mass is not", () => {
  const split = scoreFrom([0.6, 0.38, 0.02]);
  assert.ok(split.confidence < 0.8);
  const bars = { autoAccept: 0.8, reviewAt: 0.5 };
  assert.equal(riskAction({ flags: CLEAN_FLAGS, severityScore: split.score, severityConfidence: split.confidence, severityProbabilities: split.probabilities, ...bars }), "auto");
  const serious = scoreFrom([0.5, 0.2, 0.3]);
  assert.equal(riskAction({ flags: CLEAN_FLAGS, severityScore: serious.score, severityConfidence: serious.confidence, severityProbabilities: serious.probabilities, ...bars }), "review");
  const bounded = scoreFrom([0.05, 0.7, 0.25]);
  assert.notEqual(riskAction({ flags: CLEAN_FLAGS, severityScore: bounded.score, severityConfidence: bounded.confidence, severityProbabilities: bounded.probabilities, ...bars }), "auto", "score >= 1.2 floor still applies");
});

// --- Triage causes ---------------------------------------------------------------------

test("triage: default causes separate runtime exceptions from assertion failures and static errors", () => {
  const ids = DEFAULT_FAILURE_CAUSES.map((cause) => cause.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ["test_failure", "runtime_exception", "compile_or_type_error"]) assert.ok(ids.includes(id), id);
  const byId = Object.fromEntries(DEFAULT_FAILURE_CAUSES.map((cause) => [cause.id, cause.description]));
  assert.match(byId.runtime_exception!, /TypeError/);
  assert.doesNotMatch(byId.compile_or_type_error!, /TypeError/);
  const criteria = triageQuestions(DEFAULT_FAILURE_CAUSES).cause;
  assert.ok(criteria?.type === "choice" && Object.keys(criteria.criteria).length === DEFAULT_FAILURE_CAUSES.length + 1);
});

test("risk: a flag that is neither a concern nor confidently absent is named concern_uncertain", async () => {
  const { mock } = await import("node:test");
  const { responds } = await import("./helpers/fixture.ts");
  const previous = { mock: process.env.JEV_MCP_MOCK, key: process.env.TYPESAFE_API_KEY };
  process.env.JEV_MCP_MOCK = "0";
  process.env.TYPESAFE_API_KEY = "fixture-key";
  try {
    responds(() => ({ external_effect: 0.3 }));
    const { runRisk } = await import("../src/tools/risk.ts");
    const result = await runRisk({ request: "Log timing", diff: "+  logger.debug(\"took\", { ms });", auto_accept: 0.8 });
    assert.equal(result.action, "review");
    assert.deepEqual(result.reason_codes, ["concern_uncertain"]);
  } finally {
    mock.restoreAll();
    if (previous.mock === undefined) delete process.env.JEV_MCP_MOCK; else process.env.JEV_MCP_MOCK = previous.mock;
    if (previous.key === undefined) delete process.env.TYPESAFE_API_KEY; else process.env.TYPESAFE_API_KEY = previous.key;
  }
});
