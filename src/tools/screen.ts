import { z } from "zod";
import { getConfig } from "../config.js";
import { screenQuestions } from "../packs/screen.js";
import { screenAction, screenRecommendation } from "../policy.js";
import { asNoul } from "../result.js";
import { systemOne } from "../typesafe.js";

export const screenInputSchema = z.object({
  text: z.string().describe("Fetched or pasted text before the agent reads it"),
  purpose: z.string().optional().describe("What the agent is trying to do; enables relevance and skip"),
  block_at: z.number().min(0).max(1).optional(),
  review_at: z.number().min(0).max(1).optional(),
  model: z.string().optional(),
});

export type ScreenInput = z.infer<typeof screenInputSchema>;

export async function runScreen(input: ScreenInput) {
  const config = getConfig();
  const blockAt = input.block_at ?? config.blockAt;
  const reviewAt = input.review_at ?? 0.25;
  const hasPurpose = Boolean(input.purpose?.trim());
  const result = await systemOne({
    state: {
      text: input.text,
      purpose: input.purpose ?? "",
    },
    questions: screenQuestions(hasPurpose),
    model: input.model,
  });
  const injection = asNoul(result.answers.injection).noul;
  const substance = asNoul(result.answers.substance).noul;
  const relevance = hasPurpose ? asNoul(result.answers.relevance).noul : undefined;
  const recommendation = screenRecommendation({
    injection,
    substance,
    relevance,
    blockAt,
    reviewAt,
  });
  const reason =
    recommendation === "block"
      ? `injection probability ${injection.toFixed(2)} >= block threshold ${blockAt}`
      : recommendation === "review"
        ? `injection probability ${injection.toFixed(2)} >= review threshold ${reviewAt}`
        : recommendation === "skip"
          ? relevance !== undefined && relevance < 0.35
            ? `relevance ${relevance.toFixed(2)} is too low`
            : `substance ${substance.toFixed(2)} is too low`
          : "content looks safe to read";
  return {
    model: result.model,
    usage: result.usage,
    truncated: result.truncated,
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
