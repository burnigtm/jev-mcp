import { z } from "zod";
import { parseQuestions, type QuestionInput } from "../questions.js";
import { actionFromConfidence, minConfidence } from "../policy.js";
import { getConfig } from "../config.js";
import { systemOne } from "../typesafe.js";
import { asChoice, asNoul, asScore } from "../result.js";

export const questionInputSchema = z.object({
  type: z.enum(["noul", "choice", "score"]).describe("Jev primitive"),
  instructions: z.string().describe("One atomic question"),
  criteria: z
    .union([
      z.record(z.string(), z.string().nullable()),
      z.array(z.string()),
      z.object({
        true: z.string().optional(),
        false: z.string().optional(),
      }),
    ])
    .optional()
    .describe("Choice map, score levels, or noul true/false descriptions"),
});

export const evaluateInputSchema = z.object({
  state: z
    .union([z.string(), z.record(z.string(), z.any()), z.array(z.any())])
    .describe("Shared state to judge: text or JSON"),
  questions: z
    .record(z.string(), questionInputSchema)
    .describe("Named noul, choice, and score questions evaluated in parallel"),
  model: z.string().optional().describe("Override, default jev-latest"),
});

export type EvaluateInput = z.infer<typeof evaluateInputSchema>;

export async function runEvaluate(input: EvaluateInput) {
  const questions = parseQuestions(input.questions as Record<string, QuestionInput>);
  const result = await systemOne({
    state: input.state,
    questions,
    model: input.model,
  });
  const confidences: number[] = [];
  for (const answer of Object.values(result.answers)) {
    if (answer.type === "choice") {
      confidences.push(asChoice(answer).confidence);
    } else if (answer.type === "score") {
      confidences.push(asScore(answer).confidence);
    } else {
      const noul = asNoul(answer).noul;
      confidences.push(Math.abs(noul - 0.5) * 2);
    }
  }
  const config = getConfig();
  return {
    model: result.model,
    answers: result.answers,
    usage: result.usage,
    truncated: result.truncated,
    action: actionFromConfidence(minConfidence(confidences), config.autoAccept, config.reviewAt),
  };
}
