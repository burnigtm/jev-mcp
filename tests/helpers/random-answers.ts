import { mock } from "node:test";
import { TypeSafeClient, type Questions } from "@typesafe-ai/sdk";
import { confidenceFromProbabilities } from "../../src/policy.ts";
import { seeded } from "./fixture.ts";

/**
 * Valid provider answers drawn at random, deterministic in the request's state: the same state always gets the same
 * answers, whatever bar a tool is then asked to apply. That makes "the same judgment at different bars" testable.
 */

type Rnd = () => number;

function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Normalize to two decimals, as the provider does, with the remainder on the largest option. */
function distribution(weights: number[]): number[] {
  const total = weights.reduce((sum, weight) => sum + weight, 0) || 1;
  const rounded = weights.map(weight => Math.round((weight / total) * 100) / 100);
  const drift = Math.round((1 - rounded.reduce((sum, value) => sum + value, 0)) * 100) / 100;
  const largest = rounded.indexOf(Math.max(...rounded));
  rounded[largest] = Math.round((rounded[largest]! + drift) * 100) / 100;
  return rounded;
}

/** Mostly peaked, sometimes flat or split, as real answers are. */
function weights(count: number, rnd: Rnd): number[] {
  const shape = rnd();
  const peak = Math.floor(rnd() * count);
  return Array.from({ length: count }, (_value, index) => {
    if (shape < 0.45) return index === peak ? 0.55 + rnd() * 0.45 : rnd() * 0.12;
    if (shape < 0.75) return index === peak ? 0.3 + rnd() * 0.3 : rnd() * 0.3;
    return rnd();
  });
}

/** A question's favorable answer: a Noul value, a choice key or a score level. Real answers cluster near it. */
export type Favorable = Record<string, number | string>;

/** Peak on `index` with mass `peak`, the rest spread at random. */
function peakOn(count: number, index: number, peak: number, rnd: Rnd): number[] {
  const rest = Array.from({ length: count }, () => rnd());
  const restTotal = rest.reduce((sum, value, i) => sum + (i === index ? 0 : value), 0) || 1;
  return distribution(rest.map((value, i) => (i === index ? peak : ((1 - peak) * value) / restTotal)));
}

export function randomAnswers(questions: Questions, rnd: Rnd, favorable: Favorable = {}): Record<string, unknown> {
  const answers: Record<string, unknown> = {};
  for (const [id, question] of Object.entries(questions)) {
    const wanted = favorable[id];
    // Two thirds of the time a favorable question is answered near its favorable value, with varying confidence.
    const near = wanted !== undefined && rnd() < 0.66;
    if (question.type === "noul" && near && typeof wanted === "number") {
      answers[id] = { type: "noul", noul: Math.round(Math.min(1, Math.max(0, wanted + (rnd() - 0.5) * 0.5)) * 100) / 100 };
    } else if (question.type === "choice" && near && typeof wanted === "string" && Object.keys(question.criteria).includes(wanted)) {
      const keys = Object.keys(question.criteria);
      const probabilities = peakOn(keys.length, keys.indexOf(wanted), 0.4 + rnd() * 0.6, rnd);
      const byKey = Object.fromEntries(keys.map((key, index) => [key, probabilities[index]!]));
      const winner = keys[probabilities.indexOf(Math.max(...probabilities))]!;
      answers[id] = { type: "choice", choice: winner, confidence: Math.round(confidenceFromProbabilities(byKey) * 100) / 100, probabilities: byKey };
    } else if (question.type === "score" && near && typeof wanted === "number") {
      const levels = question.criteria.map((_text, index) => String(index));
      const probabilities = peakOn(levels.length, Math.min(levels.length - 1, Math.max(0, wanted)), 0.4 + rnd() * 0.6, rnd);
      const byLevel = Object.fromEntries(levels.map((level, index) => [level, probabilities[index]!]));
      const score = Math.round(levels.reduce((sum, level) => sum + Number(level) * byLevel[level]!, 0) * 100) / 100;
      answers[id] = {
        type: "score", score, confidence: Math.round(confidenceFromProbabilities(byLevel) * 100) / 100, probabilities: byLevel,
        legend: Object.fromEntries(levels.map((level, index) => [level, question.criteria[index]])),
      };
    } else if (question.type === "noul") {
      const band = rnd();
      answers[id] = { type: "noul", noul: Math.round((band < 0.4 ? rnd() * 0.15 : band < 0.7 ? 0.85 + rnd() * 0.15 : rnd()) * 100) / 100 };
    } else if (question.type === "choice") {
      const keys = Object.keys(question.criteria);
      const probabilities = distribution(weights(keys.length, rnd));
      const winner = probabilities.indexOf(Math.max(...probabilities));
      const byKey = Object.fromEntries(keys.map((key, index) => [key, probabilities[index]!]));
      answers[id] = { type: "choice", choice: keys[winner]!, confidence: Math.round(confidenceFromProbabilities(byKey) * 100) / 100, probabilities: byKey };
    } else {
      const levels = question.criteria.map((_text, index) => String(index));
      const probabilities = distribution(weights(levels.length, rnd));
      const byLevel = Object.fromEntries(levels.map((level, index) => [level, probabilities[index]!]));
      const score = Math.round(levels.reduce((sum, level) => sum + Number(level) * byLevel[level]!, 0) * 100) / 100;
      answers[id] = {
        type: "score", score, confidence: Math.round(confidenceFromProbabilities(byLevel) * 100) / 100, probabilities: byLevel,
        legend: Object.fromEntries(levels.map((level, index) => [level, question.criteria[index]])),
      };
    }
  }
  return answers;
}

/** Replace the SDK call with random answers keyed to the request state. `salt` makes a different draw for the same state. */
export function respondsRandomly(salt = 0, favorable: Favorable = {}) {
  return mock.method(TypeSafeClient.prototype, "systemOne", async (request: { state: unknown; questions: Questions; model: string }) => ({
    model: "jev-random",
    usage: { input_tokens: 100, output_tokens: 10 },
    answers: randomAnswers(request.questions, seeded(hash(JSON.stringify(request.state)) ^ salt), favorable),
  }));
}
