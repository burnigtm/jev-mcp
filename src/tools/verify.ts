import { z } from "zod";
import { getConfig } from "../config.js";
import { verifyQuestions } from "../packs/verify.js";
import { actionFromConfidence, requireCompleteContext, validatePolicyThresholds } from "../policy.js";
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
  claims: z.array(z.string().min(1)).min(1).describe("Factual claims to check"),
  evidence: evidenceSchema.describe("Source text, or a list of {id, text} documents"),
  auto_accept: z.number().min(0).max(1).optional(),
  model: z.string().optional(),
});

export type VerifyInput = z.infer<typeof verifyInputSchema>;

export async function runVerify(input: VerifyInput, context?: ToolContext) {
  const config = getConfig();
  const autoAccept = input.auto_accept ?? config.autoAccept;
  validatePolicyThresholds(autoAccept, Math.min(0.5, autoAccept));
  const result = await systemOne({
    state: {
      claims: input.claims,
      evidence: input.evidence,
    },
    questions: verifyQuestions(input.claims.length),
    model: input.model,
  }, context);

  const results = projectClaims(result, input.claims, autoAccept);
  const summary = summarizeClaims(results);

  let action: PolicyAction = "auto";
  if (results.some((item) => item.verdict === "contradicted" && item.action === "auto")) {
    action = "escalate";
  } else if (results.some((item) => item.action !== "auto") || summary.contradicted > 0) {
    action = "review";
  }

  return {
    model: result.model,
    usage: result.usage,
    truncated: result.truncated,
    coverage: result.coverage,
    action: requireCompleteContext(action, result.truncated || !result.coverage.complete),
    summary,
    results,
    thresholds: { auto_accept: autoAccept },
  };
}

/** Confidence-based projection; callers can apply stricter verdict-specific policy. */
export function projectClaims(
  result: EvaluateResponse,
  claims: string[],
  autoAccept: number,
  reviewAt = Math.min(0.5, autoAccept),
) {
  return claims.map((claim, index) => {
    const answer = asChoice(result.answers[`claim_${index}`]);
    const verdict = answer.choice as "verified" | "contradicted" | "unsupported";
    return {
      claim,
      verdict,
      confidence: answer.confidence,
      probabilities: answer.probabilities,
      action: requireCompleteContext(
        actionFromConfidence(answer.confidence, autoAccept, reviewAt),
        result.truncated || !result.coverage.complete,
      ),
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
