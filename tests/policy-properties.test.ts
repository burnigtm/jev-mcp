import assert from "node:assert/strict";
import { test } from "node:test";
import { JevValidationError } from "../src/errors.ts";
import {
  actionFromConfidence,
  codingLoopAction,
  confidenceFromProbabilities,
  confidenceSupportsAuto,
  CRITICAL_RISK_FLAGS,
  distributionSupportsConfidence,
  minConfidence,
  probabilitySupportsAbsence,
  requireCompleteContext,
  reviewAction,
  reviewComposite,
  riskAction,
  scopeAction,
  screenAction,
  screenRecommendation,
  tightenBlockAt,
  tightenJudgmentThresholds,
  tightenScreenReviewAt,
  triageAction,
  validatePolicyThresholds,
  worstAction,
  type ActionEffect,
  type PolicyAction,
  type TriageProgress,
  type TriageStrategy,
} from "../src/policy.ts";
import { claimAction } from "../src/tools/verify.ts";
import { ACTION_RANK, seeded } from "./helpers/fixture.ts";

/**
 * Property suite for the deterministic policy layer. Every guardrail decision
 * flows through these functions, so they are checked over seeded random and
 * exhaustive grids rather than a handful of examples.
 */

const SAMPLES = 3_000;
const GRID = Array.from({ length: 21 }, (_, i) => i / 20);
const THRESHOLD_PAIRS = [[0.5, 0.3], [0.8, 0.5], [0.9, 0.6], [0.95, 0.9], [1, 1]] as const;
/** Callers can only tighten from the env floor, whose default auto_accept is 0.8. */
const TIGHTENING = THRESHOLD_PAIRS.filter(([auto]) => auto >= 0.8);
const rank = (action: PolicyAction) => ACTION_RANK[action];

/**
 * Two orderings: across caller tightening, actions must be fully monotone;
 * across any pair (including a loosened env), a stricter pair must never
 * produce `auto` where the looser one did not.
 */
function assertMonotone(decide: (autoAccept: number, reviewAt: number) => PolicyAction, label: string) {
  const all = THRESHOLD_PAIRS.map(([auto, review]) => decide(auto, review));
  for (let i = 1; i < all.length; i += 1) {
    if (all[i] === "auto") assert.equal(all[i - 1], "auto", `stricter pair newly auto: ${label}`);
  }
  const tightened = TIGHTENING.map(([auto, review]) => decide(auto, review));
  for (let i = 1; i < tightened.length; i += 1) {
    assert.ok(rank(tightened[i]!) >= rank(tightened[i - 1]!), `tightening softened ${tightened[i - 1]} to ${tightened[i]}: ${label}`);
  }
}
const pick = <T>(random: () => number, items: readonly T[]): T => items[Math.floor(random() * items.length)]!;

/** A peaked distribution whose reported confidence matches its shape. */
function peaked(confidence: number, size = 3): Record<string, number> {
  const peak = (1 + (size - 1) * confidence) / size;
  return Object.fromEntries(Array.from({ length: size }, (_, i) => [String(i), i === 0 ? peak : (1 - peak) / (size - 1)]));
}

// --- Combinators ------------------------------------------------------------

test("worstAction is order-independent and returns the strictest member", () => {
  const actions: PolicyAction[] = ["auto", "review", "escalate"];
  assert.equal(worstAction([]), "auto");
  const random = seeded(1);
  for (let i = 0; i < SAMPLES; i += 1) {
    const list = Array.from({ length: 1 + Math.floor(random() * 6) }, () => pick(random, actions));
    const expected = list.reduce((a, b) => (rank(a) >= rank(b) ? a : b));
    assert.equal(worstAction(list), expected);
    assert.equal(worstAction([...list].reverse()), expected);
    assert.equal(worstAction([...list, ...list]), expected, "idempotent");
  }
});

test("requireCompleteContext never lets truncated context stay auto and never changes complete context", () => {
  for (const action of ["auto", "review", "escalate"] as const) {
    assert.notEqual(requireCompleteContext(action, true), "auto");
    assert.ok(rank(requireCompleteContext(action, true)) >= rank(action));
    assert.equal(requireCompleteContext(action, false), action);
  }
});

// --- Threshold handling -------------------------------------------------------

test("tightenJudgmentThresholds only ever tightens and always returns a valid pair", () => {
  const values = [undefined, ...GRID];
  for (const [envAuto, envReview] of THRESHOLD_PAIRS) {
    for (const callerAuto of values) {
      for (const callerReview of values) {
        let result: { autoAccept: number; reviewAt: number };
        try {
          result = tightenJudgmentThresholds(callerAuto, callerReview, envAuto, envReview);
        } catch (err) {
          assert.ok(err instanceof JevValidationError);
          // Only an explicitly inverted caller pair, or a caller review_at that cannot fit
          // under an explicit caller auto_accept, may fail.
          assert.ok(callerAuto !== undefined && callerReview !== undefined, `${callerAuto}/${callerReview} on ${envAuto}/${envReview}`);
          continue;
        }
        assert.ok(result.autoAccept >= envAuto && result.reviewAt >= envReview, "never looser than env");
        assert.ok(result.reviewAt <= result.autoAccept, "ordered");
        if (callerAuto !== undefined) assert.ok(result.autoAccept >= callerAuto);
        if (callerReview !== undefined) assert.ok(result.reviewAt >= callerReview);
      }
    }
  }
});

test("threshold validators reject non-finite and out-of-range values", () => {
  for (const [auto, review] of [[Number.NaN, 0.5], [0.8, Number.NaN], [1.1, 0.5], [0.8, -0.1], [-0.1, -0.2], [0.4, 0.5], [Infinity, 0.5]]) {
    assert.throws(() => validatePolicyThresholds(auto!, review!), JevValidationError, `${auto}/${review}`);
  }
  for (const bad of [Number.NaN, -0.01, 1.01, Infinity]) {
    assert.throws(() => tightenBlockAt(bad, 0.75), JevValidationError);
    assert.throws(() => tightenScreenReviewAt(bad), JevValidationError);
  }
  for (const value of GRID) {
    assert.equal(tightenBlockAt(value, 0.75), Math.min(value, 0.75));
    assert.equal(tightenScreenReviewAt(value), Math.min(value, 0.25));
  }
  assert.equal(tightenBlockAt(undefined, 0.6), 0.6);
  assert.equal(tightenScreenReviewAt(undefined), 0.25);
});

// --- Confidence statistics ---------------------------------------------------

test("confidenceFromProbabilities is bounded, 0 for uniform or empty, and 1 for one-hot", () => {
  assert.equal(confidenceFromProbabilities({}), 0);
  const random = seeded(2);
  for (let size = 2; size <= 8; size += 1) {
    const uniform = Object.fromEntries(Array.from({ length: size }, (_, i) => [String(i), 1 / size]));
    assert.equal(confidenceFromProbabilities(uniform), 0);
    const oneHot = Object.fromEntries(Array.from({ length: size }, (_, i) => [String(i), i === 0 ? 1 : 0]));
    assert.equal(confidenceFromProbabilities(oneHot), 1);
    for (let i = 0; i < 200; i += 1) {
      const raw = Array.from({ length: size }, () => random());
      const total = raw.reduce((a, b) => a + b, 0);
      const value = confidenceFromProbabilities(Object.fromEntries(raw.map((v, j) => [String(j), v / total])));
      assert.ok(value >= 0 && value <= 1 + 1e-12);
    }
  }
});

test("distributionSupportsConfidence is scale-invariant and rejects degenerate distributions", () => {
  assert.equal(distributionSupportsConfidence({ only: 1 }, 0.5), false, "a single option carries no evidence");
  assert.equal(distributionSupportsConfidence({ a: 0, b: 0 }, 0.5), false, "zero mass");
  const random = seeded(3);
  for (let i = 0; i < SAMPLES; i += 1) {
    const size = 2 + Math.floor(random() * 6);
    const raw = Object.fromEntries(Array.from({ length: size }, (_, j) => [String(j), random()]));
    const threshold = random();
    const scale = 0.5 + random() * 3;
    const scaled = Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, v * scale]));
    assert.equal(distributionSupportsConfidence(raw, threshold), distributionSupportsConfidence(scaled, threshold));
  }
  for (let size = 2; size <= 8; size += 1) {
    const uniform = Object.fromEntries(Array.from({ length: size }, (_, i) => [String(i), 1 / size]));
    assert.equal(distributionSupportsConfidence(uniform, 0.01), false, "a flat distribution supports no positive threshold");
    assert.equal(confidenceSupportsAuto(0.99, uniform, 0.8), false, "reported confidence cannot override a flat shape");
  }
  for (const threshold of GRID) {
    assert.equal(distributionSupportsConfidence(peaked(threshold), threshold), true, `exact peak at ${threshold}`);
  }
});

test("minConfidence ignores missing values and probabilitySupportsAbsence mirrors the threshold", () => {
  assert.equal(minConfidence([]), 0);
  assert.equal(minConfidence([undefined, undefined]), 0);
  assert.equal(minConfidence([0.9, undefined, 0.4]), 0.4);
  for (const threshold of GRID) {
    assert.equal(probabilitySupportsAbsence(1 - threshold, threshold), true, "inclusive boundary");
    assert.equal(probabilitySupportsAbsence(Math.min(1, 1 - threshold + 0.01), threshold), threshold === 0 ? true : false);
  }
});

// --- actionFromConfidence -----------------------------------------------------

test("actionFromConfidence is monotone in confidence and in both thresholds", () => {
  for (const [auto, review] of THRESHOLD_PAIRS) {
    let previous = Infinity;
    for (const confidence of GRID) {
      const current = rank(actionFromConfidence(confidence, auto, review));
      assert.ok(current <= previous, "more confidence is never stricter");
      previous = current;
    }
  }
  for (const confidence of GRID) {
    for (let i = 1; i < THRESHOLD_PAIRS.length; i += 1) {
      const [looseAuto, looseReview] = THRESHOLD_PAIRS[i - 1]!;
      const [strictAuto, strictReview] = THRESHOLD_PAIRS[i]!;
      assert.ok(rank(actionFromConfidence(confidence, strictAuto, strictReview)) >= rank(actionFromConfidence(confidence, looseAuto, looseReview)));
    }
  }
});

// --- Coding loop --------------------------------------------------------------

test("codingLoopAction: ask_user, high risk, and premature stop are never auto; stricter thresholds never loosen", () => {
  const nexts = ["continue", "retry", "ask_user", "stop"];
  for (const nextChoice of nexts) {
    for (const nextConfidence of GRID) {
      for (const riskScore of [0, 0.5, 1.19, 1.2, 1.49, 1.5, 2]) {
        for (const doneEnough of [0, 0.69, 0.7, 1]) {
          const actions = THRESHOLD_PAIRS.map(([autoAccept, reviewAt]) =>
            codingLoopAction({ nextChoice, nextConfidence, riskScore, doneEnough, autoAccept, reviewAt }));
          for (let i = 1; i < actions.length; i += 1) assert.ok(rank(actions[i]!) >= rank(actions[i - 1]!), "monotone in thresholds");
          for (const action of actions) {
            if (nextChoice === "ask_user") assert.notEqual(action, "auto");
            if (riskScore >= 1.2) assert.notEqual(action, "auto");
            if (nextChoice === "stop" && doneEnough < 0.7) assert.notEqual(action, "auto");
          }
          const [autoAccept, reviewAt] = [0.8, 0.5];
          const action = codingLoopAction({ nextChoice, nextConfidence, riskScore, doneEnough, autoAccept, reviewAt });
          if (nextConfidence < reviewAt) assert.equal(action, "escalate");
          if (action === "auto") assert.ok(nextConfidence >= autoAccept);
        }
      }
    }
  }
});

// --- Scope --------------------------------------------------------------------

test("scopeAction: risky effects are never auto, auto implies every fact cleared, thresholds are monotone", () => {
  const effects: ActionEffect[] = ["read_only", "local_write", "external_write", "destructive", "unknown"];
  const random = seeded(4);
  for (let i = 0; i < SAMPLES * 3; i += 1) {
    const effect = pick(random, effects);
    const riskConfidence = random();
    const base = {
      effect,
      inScope: random(),
      effectMatch: random(),
      needsConfirmation: pick(random, [random(), random() * 0.1]),
      riskScore: pick(random, [0, 0.4, 1.19, 1.2, 1.5, 2]),
      riskConfidence,
      riskProbabilities: random() < 0.5 ? peaked(riskConfidence) : { "0": 1 / 3, "1": 1 / 3, "2": 1 / 3 },
    };
    // Bias half the samples toward the high-confidence region where auto is reachable.
    if (random() < 0.5) Object.assign(base, { inScope: 0.8 + random() * 0.2, effectMatch: 0.8 + random() * 0.2 });
    assertMonotone((autoAccept, reviewAt) => scopeAction({ ...base, autoAccept, reviewAt }), JSON.stringify(base));
    const action = scopeAction({ ...base, autoAccept: 0.8, reviewAt: 0.5 });
    if (effect !== "read_only" && effect !== "local_write") assert.notEqual(action, "auto");
    if (base.inScope < 0.5 || base.effectMatch < 0.5 || base.needsConfirmation >= 0.8) assert.equal(action, "escalate");
    if (action === "auto") {
      assert.ok(base.inScope >= 0.8 && base.effectMatch >= 0.8 && base.needsConfirmation <= 0.2 + 1e-9 && base.riskScore < 1.2);
      assert.ok(confidenceSupportsAuto(base.riskConfidence, base.riskProbabilities, 0.8));
    }
  }
});

// --- Triage -------------------------------------------------------------------

test("triageAction: non-progress, retry exhaustion, ask_user, and escalate never reach auto", () => {
  const strategies: TriageStrategy[] = ["retry", "change_approach", "gather_context", "ask_user", "stop", "escalate"];
  const progresses: TriageProgress[] = ["advancing", "repeating", "regressing", "complete"];
  const random = seeded(5);
  let autos = 0;
  for (let i = 0; i < SAMPLES * 3; i += 1) {
    const causeConfidence = 0.5 + random() * 0.5;
    const strategyConfidence = 0.5 + random() * 0.5;
    const base = {
      causeConfidence,
      causeProbabilities: peaked(causeConfidence),
      strategy: pick(random, strategies),
      strategyConfidence,
      strategyProbabilities: peaked(strategyConfidence, 6),
      progress: pick(random, progresses),
      recoverable: random(),
      failedAttempts: Math.floor(random() * 4),
    };
    const actions = THRESHOLD_PAIRS.map(([autoAccept, reviewAt]) => triageAction({ ...base, autoAccept, reviewAt }));
    for (let j = 1; j < actions.length; j += 1) assert.ok(rank(actions[j]!) >= rank(actions[j - 1]!), JSON.stringify(base));
    const action = triageAction({ ...base, autoAccept: 0.8, reviewAt: 0.5 });
    if (action === "auto") autos += 1;
    if (base.strategy === "escalate" && causeConfidence >= 0.8 && strategyConfidence >= 0.8) assert.equal(action, "escalate");
    if (base.strategy === "ask_user") assert.notEqual(action, "auto");
    if (base.progress === "repeating" || base.progress === "regressing") assert.notEqual(action, "auto");
    if (base.strategy === "retry" && base.failedAttempts >= 2) assert.notEqual(action, "auto");
    if ((base.progress === "complete") !== (base.strategy === "stop")) assert.notEqual(action, "auto");
    if (action === "auto") assert.ok(base.recoverable >= 0.8 && causeConfidence >= 0.8 && strategyConfidence >= 0.8);
  }
  assert.ok(autos > 0, "the property space must include reachable auto decisions");
});

// --- Risk ---------------------------------------------------------------------

test("riskAction: critical flags escalate, any concern blocks auto, auto implies confident absence", () => {
  const flagNames = ["authorization", "input_validation", "secret_exposure", "data_loss", "concurrency", "dependency", "external_effect"];
  const random = seeded(6);
  for (let i = 0; i < SAMPLES * 3; i += 1) {
    const flags = Object.fromEntries(flagNames.map((name) => [name, random() < 0.8 ? random() * 0.1 : random()]));
    const severityConfidence = random();
    const base = {
      flags,
      severityScore: pick(random, [0, 0.3, 1.19, 1.2, 1.5, 1.9, 2]),
      severityConfidence,
      severityProbabilities: random() < 0.7 ? peaked(severityConfidence) : { "0": 1 / 3, "1": 1 / 3, "2": 1 / 3 },
    };
    assertMonotone((autoAccept, reviewAt) => riskAction({ ...base, autoAccept, reviewAt }), JSON.stringify(base));
    const action = riskAction({ ...base, autoAccept: 0.8, reviewAt: 0.5 });
    if (CRITICAL_RISK_FLAGS.some((flag) => flags[flag]! >= 0.8)) assert.equal(action, "escalate");
    if (Object.values(flags).some((p) => p >= 0.5)) assert.notEqual(action, "auto");
    if (base.severityScore >= 1.9) assert.equal(action, "escalate");
    if (action === "auto") {
      assert.ok(Object.values(flags).every((p) => p <= 0.2 + 1e-9));
      assert.ok(base.severityScore < 1.2);
    }
  }
});

// --- Review -------------------------------------------------------------------

test("reviewAction: every failed dimension blocks auto; unsafe patches escalate; thresholds are monotone", () => {
  const scores = [0, 0.5, 1, 1.5, 2];
  const random = seeded(7);
  for (let i = 0; i < SAMPLES * 2; i += 1) {
    const dims = { correctness: pick(random, scores), specMatch: pick(random, scores), testGap: pick(random, scores), blastRadius: pick(random, scores) };
    const base = { ...dims, composite: reviewComposite(dims), safeToApply: random(), minConfidence: random() };
    const actions = THRESHOLD_PAIRS.map(([autoAccept, reviewAt]) => reviewAction({ ...base, autoAccept, reviewAt }));
    for (let j = 1; j < actions.length; j += 1) assert.ok(rank(actions[j]!) >= rank(actions[j - 1]!));
    const action = reviewAction({ ...base, autoAccept: 0.8, reviewAt: 0.5 });
    if (base.safeToApply < 0.4 || base.minConfidence < 0.5) assert.equal(action, "escalate");
    if (dims.correctness < 1 || dims.specMatch < 1 || dims.testGap > 1 || dims.blastRadius > 1) assert.notEqual(action, "auto");
    if (action === "auto") assert.ok(base.composite >= 0.7 && base.safeToApply >= 0.8 && base.minConfidence >= 0.8);
  }
});

test("reviewComposite is bounded, clamps out-of-range scores, and rewards each dimension", () => {
  assert.equal(reviewComposite({ correctness: 2, specMatch: 2, testGap: 0, blastRadius: 0 }), 1);
  assert.equal(reviewComposite({ correctness: 0, specMatch: 0, testGap: 2, blastRadius: 2 }), 0);
  assert.equal(reviewComposite({ correctness: 9, specMatch: 9, testGap: -9, blastRadius: -9 }), 1);
  assert.equal(reviewComposite({ correctness: -9, specMatch: -9, testGap: 9, blastRadius: 9 }), 0);
  const base = { correctness: 1, specMatch: 1, testGap: 1, blastRadius: 1 };
  assert.ok(reviewComposite({ ...base, correctness: 2 }) > reviewComposite(base));
  assert.ok(reviewComposite({ ...base, specMatch: 2 }) > reviewComposite(base));
  assert.ok(reviewComposite({ ...base, testGap: 0 }) > reviewComposite(base));
  assert.ok(reviewComposite({ ...base, blastRadius: 0 }) > reviewComposite(base));
});

// --- Screen -------------------------------------------------------------------

test("screenRecommendation is monotone in injection and in a lowered block threshold", () => {
  const screenRank = { pass: 0, skip: 0, review: 1, block: 2 } as const;
  for (const substance of [0, 0.34, 0.35, 1]) {
    for (const relevance of [undefined, 0, 0.34, 0.35, 1]) {
      let previous = -1;
      for (const injection of GRID) {
        const current = screenRank[screenRecommendation({ injection, substance, relevance })];
        assert.ok(current >= previous, "more injection is never less strict");
        previous = current;
        for (const blockAt of GRID.filter((value) => value >= 0.25)) {
          const lowered = screenRecommendation({ injection, substance, relevance, blockAt: Math.max(0.25, blockAt - 0.2) });
          assert.ok(screenRank[lowered] >= screenRank[screenRecommendation({ injection, substance, relevance, blockAt })]);
        }
      }
    }
  }
  assert.equal(screenRecommendation({ injection: 0, substance: 1, relevance: 0.1 }), "skip");
  assert.equal(screenRecommendation({ injection: 0, substance: 0.1 }), "skip");
  assert.equal(screenRecommendation({ injection: 0.3, substance: 0 }), "review", "injection outranks skip");
  assert.deepEqual(["pass", "skip", "review", "block"].map((r) => screenAction(r as never)), ["auto", "auto", "review", "escalate"]);
});

// --- Regressions found by this suite ------------------------------------------

const CLEAN_FLAGS = { authorization: 0.02, input_validation: 0.02, secret_exposure: 0.02, data_loss: 0.02, concurrency: 0.02, dependency: 0.02, external_effect: 0.02 };
const CLEAN_SEVERITY = { severityScore: 0, severityConfidence: 1, severityProbabilities: { "0": 1, "1": 0, "2": 0 } };

test("regression: a moderate critical flag never masks a confident one", () => {
  assert.equal(riskAction({ flags: { ...CLEAN_FLAGS, data_loss: 0.95 }, ...CLEAN_SEVERITY }), "escalate");
  assert.equal(riskAction({ flags: { ...CLEAN_FLAGS, authorization: 0.6, data_loss: 0.95 }, ...CLEAN_SEVERITY }), "escalate");
  assert.equal(riskAction({ flags: { ...CLEAN_FLAGS, input_validation: 0.6, secret_exposure: 0.9 }, ...CLEAN_SEVERITY }), "escalate");
});

test("regression: a moderate flag never masks an escalating severity score", () => {
  assert.equal(riskAction({ flags: { ...CLEAN_FLAGS, authorization: 0.6 }, ...CLEAN_SEVERITY, severityScore: 2 }), "escalate");
});

test("regression: raising auto_accept never delays escalation of a judged concern", () => {
  for (const autoAccept of [0.8, 0.9, 0.95, 1]) {
    assert.equal(riskAction({ flags: { ...CLEAN_FLAGS, data_loss: 0.85 }, ...CLEAN_SEVERITY, autoAccept, reviewAt: 0.5 }), "escalate");
    assert.equal(scopeAction({
      effect: "read_only", inScope: 0.99, effectMatch: 0.99, needsConfirmation: 0.85,
      riskScore: 0, riskConfidence: 1, riskProbabilities: { "0": 1, "1": 0, "2": 0 }, autoAccept, reviewAt: 0.5,
    }), "escalate");
    assert.equal(claimAction({ verdict: "contradicted", confidence: 0.85, probabilities: peaked(0.85) }, autoAccept, 0.5), "escalate");
  }
});

test("regression: triage escalations are decided before any review-band return", () => {
  const base = {
    causeConfidence: 0.7, causeProbabilities: peaked(0.7), strategyConfidence: 0.7, strategyProbabilities: peaked(0.7, 6),
    progress: "advancing" as const, recoverable: 0.9, failedAttempts: 0,
  };
  assert.equal(triageAction({ ...base, strategy: "escalate" }), "escalate", "a recommended escalation is not softened by moderate cause confidence");
  assert.equal(triageAction({ ...base, strategy: "change_approach", recoverable: 0.2 }), "escalate");
  assert.equal(triageAction({ ...base, strategy: "change_approach", progress: "repeating", recoverable: 0.2 }), "escalate");
  assert.equal(triageAction({ ...base, strategy: "change_approach" }), "review");
});

test("claimAction: confident verified is the only auto verdict and thresholds are monotone", () => {
  const verdicts = ["verified", "contradicted", "unsupported"] as const;
  for (const verdict of verdicts) {
    for (const confidence of GRID) {
      for (const shape of ["peaked", "flat"] as const) {
        const probabilities = shape === "peaked" ? peaked(confidence) : { verified: 1 / 3, contradicted: 1 / 3, unsupported: 1 / 3 };
        assertMonotone((auto, review) => claimAction({ verdict, confidence, probabilities }, auto, review), `${verdict}@${confidence}/${shape}`);
        const action = claimAction({ verdict, confidence, probabilities }, 0.8, 0.5);
        if (action === "auto") assert.ok(verdict === "verified" && confidence >= 0.8 && shape === "peaked");
        if (confidence < 0.5) assert.equal(action, "escalate");
      }
    }
  }
});
