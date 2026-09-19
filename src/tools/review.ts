import { z } from "zod";
import { getConfig } from "../config.js";
import { reviewQuestions } from "../packs/review.js";
import { confidenceSupportsAuto, minConfidence, requireCompleteContext, reviewAction, reviewComposite, validatePolicyThresholds } from "../policy.js";
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
  const autoAccept = input.auto_accept ?? config.autoAccept;
  const reviewAt = input.review_at ?? config.reviewAt;
  validatePolicyThresholds(autoAccept, reviewAt);
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
  let policyAction = reviewAction({
    composite,
    safeToApply: safeToApply.noul,
    minConfidence: minConfidence([
      correctness.confidence,
      specMatch.confidence,
      testGap.confidence,
      blastRadius.confidence,
    ]),
    autoAccept,
    reviewAt,
  });
  const scoreDistributions = [correctness, specMatch, testGap, blastRadius];
  if (
    policyAction === "auto"
    && scoreDistributions.some(score => !confidenceSupportsAuto(score.confidence, score.probabilities, autoAccept))
  ) {
    policyAction = "review";
  }
  const action = requireCompleteContext(policyAction, result.truncated || !result.coverage.complete);
  return {
    action,
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
