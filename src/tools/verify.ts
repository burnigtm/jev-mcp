import { z } from "zod";
import { getConfig } from "../config.js";
import { JevBudgetError } from "../errors.js";
import { MAX_CLAIMS } from "../limits.js";
import { verifyQuestions } from "../packs/verify.js";
import { actionFromConfidence, confidenceSupportsAuto, escalationCutoff, requireCompleteContext, tightenJudgmentThresholds, validatePolicyThresholds, worstAction } from "../policy.js";
import { asChoice } from "../result.js";
import { systemOne, type EvaluateResponse, type ToolContext } from "../typesafe.js";
import type { PolicyAction } from "../policy.js";

export const evidenceSchema = z.union([
  z.string(),
  z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    }),
  ),
]);

export const verifyInputSchema = z.object({
  claims: z.array(z.string().min(1)).min(1).max(MAX_CLAIMS).describe(`Factual claims to check; at most ${MAX_CLAIMS} per request`),
  evidence: evidenceSchema.describe("Source text, or a list of {id, text} documents"),
  auto_accept: z.number().min(0).max(1).optional(),
  review_at: z.number().min(0).max(1).optional(),
  model: z.string().optional(),
});

export type VerifyInput = z.infer<typeof verifyInputSchema>;

export async function runVerify(input: VerifyInput, context?: ToolContext) {
  if (input.claims.length > MAX_CLAIMS) {
    throw new JevBudgetError(`Verification accepts at most ${MAX_CLAIMS} claims per request. Split the claims before verifying.`);
  }
  const config = getConfig();
  const { autoAccept, reviewAt } = tightenJudgmentThresholds(input.auto_accept, input.review_at, config.autoAccept, config.reviewAt);
  validatePolicyThresholds(autoAccept, reviewAt);
  const result = await systemOne({
    state: {
      claims: input.claims,
      evidence: input.evidence,
    },
    questions: verifyQuestions(input.claims.length),
    model: input.model,
  }, context);

  const results = projectClaims(result, input.claims, autoAccept, reviewAt);
  const summary = summarizeClaims(results);
  const allClaimsVerified = results.length > 0
    && !result.truncated
    && result.coverage.complete
    && results.every((item) => item.verdict === "verified" && item.action === "auto");

  // Combining claims never softens the strictest per-claim judgment.
  const action = worstAction(results.map((item) => item.action));

  return {
    model: result.model,
    usage: result.usage,
    truncated: result.truncated,
    coverage: result.coverage,
    action: requireCompleteContext(action, result.truncated || !result.coverage.complete),
    all_claims_verified: allClaimsVerified,
    summary,
    results,
    thresholds: { auto_accept: autoAccept, review_at: reviewAt },
  };
}

export type ClaimVerdict = "verified" | "contradicted" | "unsupported";

/**
 * Verdict-specific policy shared by jev_verify and jev_gate: low confidence
 * escalates, a confident contradiction escalates, and any non-verified verdict
 * needs review. A confident classification alone never approves a claim.
 */
export function claimAction(
  item: { verdict: ClaimVerdict; confidence: number; probabilities: Record<string, number> },
  autoAccept: number,
  reviewAt: number,
): PolicyAction {
  let action = actionFromConfidence(item.confidence, autoAccept, reviewAt);
  if (action === "auto" && !confidenceSupportsAuto(item.confidence, item.probabilities, autoAccept)) {
    action = "review";
  }
  if (item.confidence < reviewAt || (item.verdict === "contradicted" && item.confidence >= escalationCutoff(autoAccept))) {
    return "escalate";
  }
  if (item.verdict !== "verified") return worstAction([action, "review"]);
  return action;
}

export function projectClaims(
  result: EvaluateResponse,
  claims: string[],
  autoAccept: number,
  reviewAt = Math.min(0.5, autoAccept),
) {
  const incomplete = result.truncated || !result.coverage.complete;
  return claims.map((claim, index) => {
    const answer = asChoice(result.answers[`claim_${index}`]);
    const verdict = answer.choice as ClaimVerdict;
    const action = claimAction({ verdict, confidence: answer.confidence, probabilities: answer.probabilities }, autoAccept, reviewAt);
    return {
      claim,
      verdict,
      confidence: answer.confidence,
      probabilities: answer.probabilities,
      action: requireCompleteContext(action, incomplete),
    };
  });
}

export function summarizeClaims(results: ReturnType<typeof projectClaims>) {
  return {
    verified: results.filter((item) => item.verdict === "verified").length,
    contradicted: results.filter((item) => item.verdict === "contradicted").length,
    unsupported: results.filter((item) => item.verdict === "unsupported").length,
    needs_review: results.filter((item) => item.action !== "auto").length,
  };
}
