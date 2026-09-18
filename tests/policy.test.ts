import assert from "node:assert/strict";
import { test } from "node:test";
import {
  actionFromConfidence,
  codingLoopAction,
  confidenceFromProbabilities,
  reviewAction,
  reviewComposite,
  screenRecommendation,
} from "../src/policy.ts";

test("confidence is 1 when a choice is certain", () => {
  assert.equal(confidenceFromProbabilities({ a: 1, b: 0 }), 1);
});

test("confidence is 0 when a choice is uniform", () => {
  assert.equal(confidenceFromProbabilities({ a: 0.5, b: 0.5 }), 0);
});

test("actionFromConfidence uses named thresholds", () => {
  assert.equal(actionFromConfidence(0.9, 0.8, 0.5), "auto");
  assert.equal(actionFromConfidence(0.6, 0.8, 0.5), "review");
  assert.equal(actionFromConfidence(0.2, 0.8, 0.5), "escalate");
});

test("coding loop escalates low-confidence next", () => {
  assert.equal(
    codingLoopAction({
      nextChoice: "continue",
      nextConfidence: 0.3,
      riskScore: 0.2,
      doneEnough: 0.1,
    }),
    "escalate",
  );
});

test("coding loop auto-continues low-risk high-confidence work", () => {
  assert.equal(
    codingLoopAction({
      nextChoice: "continue",
      nextConfidence: 0.9,
      riskScore: 0.4,
      doneEnough: 0.2,
    }),
    "auto",
  );
});

test("coding loop never auto-applies destructive risk", () => {
  assert.equal(
    codingLoopAction({
      nextChoice: "continue",
      nextConfidence: 0.95,
      riskScore: 2,
      doneEnough: 0.1,
    }),
    "review",
  );
});

test("stop cannot bypass risk or completion requirements", () => {
  assert.equal(codingLoopAction({ nextChoice: "stop", nextConfidence: 0.95, riskScore: 2, doneEnough: 0.95 }), "review");
  assert.equal(codingLoopAction({ nextChoice: "stop", nextConfidence: 0.95, riskScore: 0, doneEnough: 0.1 }), "review");
  assert.equal(codingLoopAction({ nextChoice: "stop", nextConfidence: 0.95, riskScore: 0, doneEnough: 0.7 }), "auto");
  assert.equal(codingLoopAction({ nextChoice: "stop", nextConfidence: 0.3, riskScore: 0, doneEnough: 0.99 }), "escalate");
  assert.throws(() => actionFromConfidence(0.9, 0.4, 0.8), /Thresholds/);
});

test("review composite weights correctness highest", () => {
  const good = reviewComposite({ correctness: 2, specMatch: 2, testGap: 0, blastRadius: 0 });
  const bad = reviewComposite({ correctness: 0, specMatch: 2, testGap: 0, blastRadius: 0 });
  assert.ok(good > 0.95);
  assert.ok(bad < 0.7);
});

test("reviewAction escalates unsafe patches", () => {
  assert.equal(
    reviewAction({ composite: 0.9, safeToApply: 0.2, minConfidence: 0.9 }),
    "escalate",
  );
});

test("screenRecommendation blocks injection", () => {
  assert.equal(
    screenRecommendation({ injection: 0.9, substance: 0.9, blockAt: 0.75, reviewAt: 0.25 }),
    "block",
  );
  assert.equal(
    screenRecommendation({ injection: 0.04, substance: 0.1, blockAt: 0.75, reviewAt: 0.25 }),
    "skip",
  );
  assert.equal(
    screenRecommendation({ injection: 0.04, substance: 0.9, relevance: 0.1, blockAt: 0.75, reviewAt: 0.25 }),
    "skip",
  );
  assert.equal(
    screenRecommendation({ injection: 0.04, substance: 0.9, relevance: 0.9, blockAt: 0.75, reviewAt: 0.25 }),
    "pass",
  );
});
