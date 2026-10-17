import { z } from "zod";
import { getConfig } from "../config.js";
import { screenQuestions } from "../packs/screen.js";
import { screenAction, screenRecommendation, tightenBlockAt, tightenScreenReviewAt } from "../policy.js";
import { asNoul } from "../result.js";
import { systemOne, type ToolContext } from "../typesafe.js";
import { JevValidationError } from "../errors.js";

export const screenInputSchema = z.object({
  text: z.string().describe("Fetched or pasted text before the agent reads it"),
  purpose: z.string().optional().describe("What the agent is trying to do; enables relevance and skip"),
  block_at: z.number().min(0).max(1).optional(),
  review_at: z.number().min(0).max(1).optional(),
  model: z.string().optional(),
});

export type ScreenInput = z.infer<typeof screenInputSchema>;

/** High-signal phrases that survive paraphrasing; a deterministic backstop only. */
const INJECTION_PATTERN = /(?:ignore|disregard|forget)\s+(?:all\s+)?(?:the\s+)?(?:previous|prior|above)\s+(?:instructions?|prompts?|rules?)|system\s+note\s+for\s+(?:the\s+)?(?:ai|assistant|model)|append\s+your\s+system\s+prompt|jailbreak|developer\s+(?:override|mode)|you\s+are\s+now\s+(?:an?\s+)?(?:ai|assistant|model)/i;

function containsInjectionInstruction(text: string): boolean {
  return INJECTION_PATTERN.test(text.replace(/[\u200B-\u200F\u202A-\u202E\u2066-\u2069]/g, ""));
}

export async function runScreen(input: ScreenInput, context?: ToolContext) {
  const config = getConfig();
  const blockAt = tightenBlockAt(input.block_at, config.blockAt);
  const reviewAt = tightenScreenReviewAt(input.review_at, 0.25);
  if (reviewAt > blockAt) throw new JevValidationError("Screen thresholds must satisfy review_at <= block_at.");
  const hasPurpose = Boolean(input.purpose?.trim());
  const result = await systemOne({
    state: {
      text: input.text,
      purpose: input.purpose ?? "",
    },
    questions: screenQuestions(hasPurpose),
    model: input.model,
  }, context);
  const injection = asNoul(result.answers.injection).noul;
  const substance = asNoul(result.answers.substance).noul;
  const relevance = hasPurpose ? asNoul(result.answers.relevance).noul : undefined;
  const judgedRecommendation = screenRecommendation({
    injection,
    substance,
    relevance,
    blockAt,
    reviewAt,
  });
  const suspicious = containsInjectionInstruction(input.text) || (hasPurpose && containsInjectionInstruction(input.purpose ?? ""));
  const judgedDecision = suspicious && (judgedRecommendation === "pass" || judgedRecommendation === "skip")
    ? "review"
    : judgedRecommendation;
  const recommendation = result.truncated && judgedDecision !== "block" ? "review" : judgedDecision;
  const reason =
    recommendation === "block"
      ? `injection probability ${injection.toFixed(2)} >= block threshold ${blockAt}`
      : recommendation === "review"
        ? suspicious && judgedRecommendation !== "block"
          ? "A deterministic prompt-injection pattern was detected; review before reading this content."
          : result.truncated ? "Context was truncated; the entire text has not been screened."
            : `injection probability ${injection.toFixed(2)} >= review threshold ${reviewAt}`
        : recommendation === "skip"
          ? relevance !== undefined && relevance < 0.35
            ? `relevance ${relevance.toFixed(2)} is too low`
            : `substance ${substance.toFixed(2)} is too low`
          : "content looks safe to read";
  return {
    model: result.model,
    usage: result.usage,
    truncated: result.truncated,
    coverage: result.coverage,
    action: screenAction(recommendation),
    probabilities: {
      injection,
      substance,
      ...(relevance !== undefined ? { relevance } : {}),
    },
    recommendation: { action: recommendation, reason },
    thresholds: { block_at: blockAt, review_at: reviewAt },
  };
}
