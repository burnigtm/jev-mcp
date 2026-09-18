import { z } from "zod";
import { getConfig } from "../config.js";
import { codingLoopQuestions } from "../packs/coding-loop.js";
import { codingLoopAction, requireCompleteContext, validatePolicyThresholds } from "../policy.js";
import { asChoice, asNoul, asScore } from "../result.js";
import { systemOne, type ToolContext } from "../typesafe.js";

export const codingLoopInputSchema = z.object({
  task: z.string().describe("What the coding agent is trying to do"),
  observation: z
    .string()
    .describe("Current turn: last diff, command output, test results, or blocker"),
  extras: z
    .record(z.string(), z.any())
    .optional()
    .describe("Optional extra JSON fields included in Jev state"),
  auto_accept: z.number().min(0).max(1).optional(),
  review_at: z.number().min(0).max(1).optional(),
  model: z.string().optional(),
});

export type CodingLoopInput = z.infer<typeof codingLoopInputSchema>;

export async function runCodingLoop(input: CodingLoopInput, context?: ToolContext) {
  const config = getConfig();
  const autoAccept = input.auto_accept ?? config.autoAccept;
  const reviewAt = input.review_at ?? config.reviewAt;
  validatePolicyThresholds(autoAccept, reviewAt);
  const result = await systemOne({
    state: {
      task: input.task,
      observation: input.observation,
      extras: input.extras ?? {},
    },
    questions: codingLoopQuestions(),
    model: input.model,
  }, context);
  const next = asChoice(result.answers.next);
  const modelTier = asChoice(result.answers.model_tier);
  const risk = asScore(result.answers.risk);
  const doneEnough = asNoul(result.answers.done_enough);
  const needsMore = asNoul(result.answers.needs_more_context);
  const testsLikelyFail = asNoul(result.answers.tests_likely_fail);
  const focus = asChoice(result.answers.focus);
  const action = codingLoopAction({
    nextChoice: next.choice,
    nextConfidence: next.confidence,
    riskScore: risk.score,
    doneEnough: doneEnough.noul,
    autoAccept,
    reviewAt,
  });
  return {
    model: result.model,
    usage: result.usage,
    truncated: result.truncated,
    coverage: result.coverage,
    action: requireCompleteContext(action, result.truncated),
    next: {
      choice: next.choice,
      confidence: next.confidence,
      probabilities: next.probabilities,
    },
    model_tier: {
      choice: modelTier.choice,
      confidence: modelTier.confidence,
      probabilities: modelTier.probabilities,
    },
    focus: {
      choice: focus.choice,
      confidence: focus.confidence,
      probabilities: focus.probabilities,
    },
    risk: {
      score: risk.score,
      confidence: risk.confidence,
      legend: risk.legend,
      probabilities: risk.probabilities,
    },
    done_enough: doneEnough.noul,
    needs_more_context: needsMore.noul,
    tests_likely_fail: testsLikelyFail.noul,
    thresholds: { auto_accept: autoAccept, review_at: reviewAt },
  };
}
