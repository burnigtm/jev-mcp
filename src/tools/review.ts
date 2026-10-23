import { z } from "zod";
import { getConfig } from "../config.js";
import { reviewQuestions } from "../packs/review.js";
import { acceptableRegionConfidence, confidenceSupportsAuto, minConfidence, requireCompleteContext, reviewAction, reviewComposite, tightenJudgmentThresholds } from "../policy.js";
import type { ReviewReason } from "./output-schemas.js";
import { asNoul, asScore } from "../result.js";
import { systemOne, type EvaluateResponse, type ToolContext } from "../typesafe.js";

export const reviewInputSchema = z.object({
  request: z.string().describe("What the user asked for"),
  diff: z.string().describe("Proposed patch, file excerpt, or change summary"),
  tests: z.string().optional().describe("Test output if any"),
  auto_accept: z.number().min(0).max(1).optional(),
  review_at: z.number().min(0).max(1).optional(),
  model: z.string().optional(),
});

export type ReviewInput = z.infer<typeof reviewInputSchema>;

export async function runReview(input: ReviewInput, context?: ToolContext) {
  const config = getConfig();
  const { autoAccept, reviewAt } = tightenJudgmentThresholds(input.auto_accept, input.review_at, config.autoAccept, config.reviewAt);
  const result = await systemOne({
    state: {
      request: input.request,
      diff: input.diff,
      tests: input.tests ?? "",
    },
    questions: reviewQuestions(),
    model: input.model,
  }, context);
  return {
    model: result.model,
    usage: result.usage,
    truncated: result.truncated,
    coverage: result.coverage,
    ...projectReview(result, autoAccept, reviewAt),
  };
}

/** Shared scoring policy for the standalone review and combined gate. */
export function projectReview(result: EvaluateResponse, autoAccept: number, reviewAt: number) {
  const correctness = asScore(result.answers.correctness);
  const specMatch = asScore(result.answers.spec_match);
  const testGap = asScore(result.answers.test_gap);
  const blastRadius = asScore(result.answers.blast_radius);
  const safeToApply = asNoul(result.answers.safe_to_apply);
  const composite = reviewComposite({
    correctness: correctness.score,
    specMatch: specMatch.score,
    testGap: testGap.score,
    blastRadius: blastRadius.score,
  });
  // Correctness and spec match must be confident in their exact level. Test gap and
  // blast radius only need confidence that they stay within their accepted floor (<= 1).
  const testGapRegion = acceptableRegionConfidence(testGap.probabilities, 1);
  const blastRadiusRegion = acceptableRegionConfidence(blastRadius.probabilities, 1);
  let policyAction = reviewAction({
    composite,
    safeToApply: safeToApply.noul,
    minConfidence: minConfidence([
      correctness.confidence,
      specMatch.confidence,
      testGapRegion,
      blastRadiusRegion,
    ]),
    correctness: correctness.score,
    specMatch: specMatch.score,
    testGap: testGap.score,
    blastRadius: blastRadius.score,
    autoAccept,
    reviewAt,
  });
  const exactLevel = (score: typeof correctness) => confidenceSupportsAuto(score.confidence, score.probabilities, autoAccept);
  if (policyAction === "auto" && (!exactLevel(correctness) || !exactLevel(specMatch))) {
    policyAction = "review";
  }
  const incomplete = result.truncated || !result.coverage.complete;
  const action = requireCompleteContext(policyAction, incomplete);

  const reasons: ReviewReason[] = [];
  if (incomplete) reasons.push("incomplete_context");
  if (safeToApply.noul < 0.4) reasons.push("unsafe_to_apply");
  else if (safeToApply.noul < autoAccept) reasons.push("safe_to_apply_uncertain");
  if (correctness.score < 1) reasons.push("correctness_concern");
  else if (!exactLevel(correctness)) reasons.push("correctness_uncertain");
  if (specMatch.score < 1) reasons.push("spec_mismatch");
  else if (!exactLevel(specMatch)) reasons.push("spec_match_uncertain");
  if (testGap.score > 1) reasons.push("test_gap");
  else if (testGapRegion < autoAccept) reasons.push("test_gap_uncertain");
  if (blastRadius.score > 1) reasons.push("blast_radius");
  else if (blastRadiusRegion < autoAccept) reasons.push("blast_radius_uncertain");
  if (composite < 0.7) reasons.push("composite_low");
  if (action === "auto") {
    reasons.length = 0;
    reasons.push("accepted");
  } else if (reasons.length === 0) {
    reasons.push("review_required");
  }
  return {
    action,
    reason_codes: reasons,
    composite,
    safe_to_apply: safeToApply.noul,
    scores: {
      correctness: { score: correctness.score, confidence: correctness.confidence },
      spec_match: { score: specMatch.score, confidence: specMatch.confidence },
      test_gap: { score: testGap.score, confidence: testGap.confidence },
      blast_radius: { score: blastRadius.score, confidence: blastRadius.confidence },
    },
    weights: {
      correctness: 0.4,
      spec_match: 0.3,
      test_gap: 0.15,
      blast_radius: 0.15,
    },
    thresholds: { auto_accept: autoAccept, review_at: reviewAt },
  };
}
