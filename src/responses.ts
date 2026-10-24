import { z } from "zod";
import type { Questions, SystemOneResult } from "@typesafe-ai/sdk";
import { JevResponseError } from "./errors.js";

const probability = z.number().min(0).max(1);
const probabilities = z.record(z.string(), probability);
const answerSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("noul"), noul: probability }),
  z.object({ type: z.literal("choice"), choice: z.string(), confidence: probability, probabilities }),
  z.object({ type: z.literal("score"), score: z.number().min(0), confidence: probability, probabilities, legend: z.record(z.string(), z.unknown()) }),
]);
const responseSchema = z.object({
  model: z.string().min(1),
  answers: z.record(z.string(), answerSchema),
  usage: z.object({ input_tokens: z.number().int().nonnegative(), output_tokens: z.number().int().nonnegative() }),
});

/** Validate the provider boundary before policy reads any numeric judgments. */
export function validateResponse<Q extends Questions>(raw: unknown, questions: Q): SystemOneResult<Q> {
  const parsed = responseSchema.safeParse(raw);
  if (!parsed.success) throw new JevResponseError("shape");
  const result = parsed.data;
  if (Object.keys(result.answers).length !== Object.keys(questions).length) throw new JevResponseError("answer_count");
  for (const [id, question] of Object.entries(questions)) {
    const answer = Object.hasOwn(result.answers, id) ? result.answers[id] : undefined;
    if (!answer || answer.type !== question.type) throw new JevResponseError("answer_type");
    if (answer.type === "noul") continue;
    const expected = question.type === "choice" ? Object.keys(question.criteria)
      : question.type === "score" ? question.criteria.map((_, i) => String(i)) : [];
    const actual = Object.keys(answer.probabilities);
    if (actual.length !== expected.length || expected.some(key => !Object.hasOwn(answer.probabilities, key))) throw new JevResponseError("option_keys");
    const total = Object.values(answer.probabilities).reduce((sum, value) => sum + value, 0);
    // Provider responses round each option probability to 2 decimal places, so n
    // options can accumulate up to n * 0.005 rounding drift plus IEEE-754 noise.
    const totalTolerance = Math.min(0.25, Math.max(0.02, expected.length * 0.005)) + 1e-9;
    if (Math.abs(total - 1) > totalTolerance) throw new JevResponseError("probability_mass");
    if (answer.type === "choice") {
      if (!expected.includes(answer.choice)) throw new JevResponseError("choice_unknown");
      if (answer.probabilities[answer.choice]! + 1e-9 < Math.max(...Object.values(answer.probabilities))) throw new JevResponseError("choice_not_argmax");
    }
    if (answer.type === "score") {
      const expectedScore = expected.reduce((sum, key) => sum + Number(key) * answer.probabilities[key]!, 0);
      const scoreTolerance = 0.02 * (expected.length - 1) + 1e-9;
      if (answer.score > expected.length - 1) throw new JevResponseError("score_range");
      if (expected.some(key => !Object.hasOwn(answer.legend, key))) throw new JevResponseError("score_legend");
      if (Math.abs(answer.score - expectedScore) > scoreTolerance) throw new JevResponseError("score_mismatch");
    }
  }
  return result as SystemOneResult<Q>;
}
