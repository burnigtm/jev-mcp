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
  if (!parsed.success) throw new JevResponseError();
  const result = parsed.data;
  if (Object.keys(result.answers).length !== Object.keys(questions).length) throw new JevResponseError();
  for (const [id, question] of Object.entries(questions)) {
    const answer = Object.hasOwn(result.answers, id) ? result.answers[id] : undefined;
    if (!answer || answer.type !== question.type) throw new JevResponseError();
    if (answer.type === "noul") continue;
    const expected = question.type === "choice" ? Object.keys(question.criteria)
      : question.type === "score" ? question.criteria.map((_, i) => String(i)) : [];
    const actual = Object.keys(answer.probabilities);
    if (actual.length !== expected.length || expected.some(key => !Object.hasOwn(answer.probabilities, key))) throw new JevResponseError();
    const total = Object.values(answer.probabilities).reduce((sum, value) => sum + value, 0);
    if (Math.abs(total - 1) > 0.01) throw new JevResponseError();
    if (answer.type === "choice") {
      if (!expected.includes(answer.choice) || answer.probabilities[answer.choice]! + 1e-9 < Math.max(...Object.values(answer.probabilities))) throw new JevResponseError();
    }
    if (answer.type === "score") {
      const expectedScore = expected.reduce((sum, key) => sum + Number(key) * answer.probabilities[key]!, 0);
      if (answer.score > expected.length - 1 || expected.some(key => !Object.hasOwn(answer.legend, key)) || Math.abs(answer.score - expectedScore) > 0.01 * (expected.length - 1)) throw new JevResponseError();
    }
  }
  return result as SystemOneResult<Q>;
}
