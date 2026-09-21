import { z } from "zod";
import { getConfig } from "../config.js";
import { JevBudgetError } from "../errors.js";
import { gateQuestions } from "../packs/gate.js";
import { MAX_CLAIMS } from "../limits.js";
import { confidenceSupportsAuto, requireCompleteContext, tightenJudgmentThresholds, worstAction, type PolicyAction } from "../policy.js";
import { systemOne, type EvaluateResponse, type ToolContext } from "../typesafe.js";
import { projectReview } from "./review.js";
import { evidenceSchema, projectClaims, summarizeClaims } from "./verify.js";

export const gateInputSchema = z.object({
  request: z.string().describe("What the user asked for; this is not evidence of completion"),
  diff: z.string().describe("Proposed patch, file excerpt, or change summary to review"),
  claims: z.array(z.string().min(1)).min(1).max(MAX_CLAIMS).describe(`Completion claims to check against evidence; at most ${MAX_CLAIMS} per request`),
  evidence: evidenceSchema.describe("Sources that support the claims; include relevant diff or test logs here"),
  tests: z.string().optional().describe("Test output for the patch review"),
  auto_accept: z.number().min(0).max(1).optional(),
  review_at: z.number().min(0).max(1).optional(),
  model: z.string().optional(),
});

export type GateInput = z.infer<typeof gateInputSchema>;

const probabilitySchema = z.number().min(0).max(1);
const actionSchema = z.enum(["auto", "review", "escalate"]);
const thresholdsSchema = z.object({ auto_accept: probabilitySchema, review_at: probabilitySchema });
const scoreSchema = z.object({ score: z.number().min(0).max(2), confidence: probabilitySchema });

export const gateReasonCodeSchema = z.enum([
  "accepted",
  "incomplete_context",
  "review_escalated",
  "review_required",
  "claims_contradicted",
  "claims_unsupported",
  "claim_confidence_low",
  "claim_confidence_below_auto_accept",
  "confidence_incoherent",
]);

export const gateOutputSchema = z.object({
  model: z.string(),
  usage: z.object({ input_tokens: z.number().nonnegative(), output_tokens: z.number().nonnegative() }),
  truncated: z.boolean(),
  coverage: z.object({
    complete: z.boolean(),
    original_chars: z.number().int().nonnegative(),
    evaluated_chars: z.number().int().nonnegative(),
    estimated_tokens: z.object({
      state: z.number().int().nonnegative(),
      questions: z.number().int().nonnegative(),
      longest_question: z.number().int().nonnegative(),
    }),
    estimator: z.literal("chars/4"),
  }),
  action: actionSchema,
  reason_codes: z.array(gateReasonCodeSchema).min(1),
  review: z.object({
    action: actionSchema,
    composite: probabilitySchema,
    safe_to_apply: probabilitySchema,
    scores: z.object({
      correctness: scoreSchema,
      spec_match: scoreSchema,
      test_gap: scoreSchema,
      blast_radius: scoreSchema,
    }),
    weights: z.object({
      correctness: z.literal(0.4),
      spec_match: z.literal(0.3),
      test_gap: z.literal(0.15),
      blast_radius: z.literal(0.15),
    }),
    thresholds: thresholdsSchema,
  }),
  verification: z.object({
    action: actionSchema,
    summary: z.object({
      verified: z.number().int().nonnegative(),
      contradicted: z.number().int().nonnegative(),
      unsupported: z.number().int().nonnegative(),
      needs_review: z.number().int().nonnegative(),
    }),
    results: z.array(z.object({
      claim: z.string(),
      verdict: z.enum(["verified", "contradicted", "unsupported"]),
      confidence: probabilitySchema,
      probabilities: z.record(z.string(), probabilitySchema),
      action: actionSchema,
    })).min(1),
    thresholds: thresholdsSchema,
  }),
});

export async function runGate(input: GateInput, context?: ToolContext) {
  if (input.claims.length > MAX_CLAIMS) {
    throw new JevBudgetError(`The completion gate accepts at most ${MAX_CLAIMS} claims per request. Split the claims before gating.`);
  }
  const config = getConfig();
  const { autoAccept, reviewAt } = tightenJudgmentThresholds(input.auto_accept, input.review_at, config.autoAccept, config.reviewAt);
  const result = await systemOne({
    state: {
      request: input.request,
      diff: input.diff,
      tests: input.tests ?? "",
      claims: input.claims,
      evidence: input.evidence,
    },
    questions: gateQuestions(input.claims.length),
    model: input.model,
  }, context);
  return projectGate(result, input.claims, autoAccept, reviewAt);
}

/** Deterministic policy after the single shared evaluation has completed. */
export function projectGate(result: EvaluateResponse, claims: string[], autoAccept: number, reviewAt: number) {
  const incomplete = result.truncated || !result.coverage.complete;
  const review = projectReview(result, autoAccept, reviewAt);
  const results = projectClaims(result, claims, autoAccept, reviewAt).map((item) => {
    let action: PolicyAction = item.action;
    if (item.confidence < reviewAt || (item.verdict === "contradicted" && item.confidence >= autoAccept)) {
      action = "escalate";
    } else if (item.verdict !== "verified") {
      action = "review";
    }
    return { ...item, action: requireCompleteContext(action, incomplete) };
  });
  const verification = {
    action: worstAction(results.map((item) => item.action)),
    summary: summarizeClaims(results),
    results,
    thresholds: { auto_accept: autoAccept, review_at: reviewAt },
  };
  const action = worstAction([review.action, verification.action]);
  const reasonCodes: Array<z.infer<typeof gateReasonCodeSchema>> = [];
  if (incomplete) reasonCodes.push("incomplete_context");
  if (review.action === "escalate") reasonCodes.push("review_escalated");
  if (review.action === "review") reasonCodes.push("review_required");
  if (verification.summary.contradicted > 0) reasonCodes.push("claims_contradicted");
  if (verification.summary.unsupported > 0) reasonCodes.push("claims_unsupported");
  if (results.some((item) => item.confidence < reviewAt)) reasonCodes.push("claim_confidence_low");
  if (results.some((item) => item.confidence >= reviewAt && item.confidence < autoAccept)) {
    reasonCodes.push("claim_confidence_below_auto_accept");
  }
  if (results.some((item) => item.confidence >= autoAccept && !confidenceSupportsAuto(item.confidence, item.probabilities, autoAccept))) {
    reasonCodes.push("confidence_incoherent");
  }
  if (action === "auto") reasonCodes.push("accepted");
  return {
    model: result.model,
    usage: result.usage,
    truncated: result.truncated,
    coverage: result.coverage,
    action,
    reason_codes: reasonCodes,
    review,
    verification,
  };
}
