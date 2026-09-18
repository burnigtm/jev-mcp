import type { Questions } from "@typesafe-ai/sdk";
import { codingLoopQuestions } from "./coding-loop.js";
import { toolRouteQuestions } from "./tool-route.js";

/**
 * Coding-loop routing and prepared-call selection in one question map. Jev runs
 * every question in parallel and in isolation, so the fused map answers both
 * recipes in a single request. The two packs share no question id.
 */
export function stepQuestions(eligibleCount: number): Questions {
  if (eligibleCount <= 0) return codingLoopQuestions();
  return { ...codingLoopQuestions(), ...toolRouteQuestions(eligibleCount) };
}
