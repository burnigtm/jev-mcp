import { mock } from "node:test";
import { TypeSafeClient, type Questions } from "@typesafe-ai/sdk";

/** Not a test file: shared provider fixtures for the policy and invariant suites. */

export type ApiRequest = { state: Record<string, unknown>; questions: Questions; model: string };
export type AnswerSpec = Record<string, number | string>;
export type Shape = "peaked" | "flat";

/**
 * Answer every question in a request. Nouls default to 0.02, choices to their
 * first option, scores to level 0. `spec[id]` overrides the value and
 * `spec["id.confidence"]` a choice's confidence. A `flat` shape reports high
 * confidence over a uniform distribution, which policy must never trust.
 */
export function answerAll(questions: Questions, spec: AnswerSpec = {}, shape: Shape = "peaked", confidence = 0.98) {
  const answers: Record<string, unknown> = {};
  for (const [id, question] of Object.entries(questions)) {
    if (question.type === "noul") {
      answers[id] = { type: "noul", noul: typeof spec[id] === "number" ? spec[id] : 0.02 };
    } else if (question.type === "choice") {
      const keys = Object.keys(question.criteria);
      const winner = typeof spec[id] === "string" ? spec[id] as string : keys[0]!;
      const answerConfidence = typeof spec[`${id}.confidence`] === "number" ? spec[`${id}.confidence`] as number : confidence;
      const peak = shape === "flat" ? 1 / keys.length : (1 + (keys.length - 1) * answerConfidence) / keys.length;
      const rest = shape === "flat" ? 1 / keys.length : (1 - peak) / (keys.length - 1);
      answers[id] = {
        type: "choice", choice: winner, confidence: shape === "flat" ? 0.99 : answerConfidence,
        probabilities: Object.fromEntries(keys.map((key) => [key, key === winner ? peak : rest])),
      };
    } else {
      const levels = question.criteria;
      if (shape === "flat") {
        const middle = (levels.length - 1) / 2;
        answers[id] = {
          type: "score", score: middle, confidence: 0.99,
          probabilities: Object.fromEntries(levels.map((_text, index) => [String(index), 1 / levels.length])),
          legend: Object.fromEntries(levels.map((text, index) => [String(index), text])),
        };
        continue;
      }
      const level = typeof spec[id] === "number" ? spec[id] as number : 0;
      answers[id] = {
        type: "score", score: level, confidence: 1,
        probabilities: Object.fromEntries(levels.map((_text, index) => [String(index), index === level ? 1 : 0])),
        legend: Object.fromEntries(levels.map((text, index) => [String(index), text])),
      };
    }
  }
  return answers;
}

/** Replace the SDK call with a deterministic responder; returns the mock for call inspection. */
export function responds(spec: (request: ApiRequest) => AnswerSpec = () => ({}), shape: Shape = "peaked") {
  return mock.method(TypeSafeClient.prototype, "systemOne", async (request: ApiRequest) => ({
    model: "jev-fixture",
    usage: { input_tokens: 100, output_tokens: 10 },
    answers: answerAll(request.questions, spec(request), shape),
  }));
}

/** Snapshot and restore environment variables around a suite. */
export function envScope(names: string[]) {
  const previous = new Map(names.map((name) => [name, process.env[name]]));
  return () => {
    for (const [name, value] of previous) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  };
}

/** Deterministic PRNG so property tests are reproducible across runs and platforms. */
export function seeded(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const ACTION_RANK = { auto: 0, review: 1, escalate: 2 } as const;
