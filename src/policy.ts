import { JevValidationError } from "./errors.js";

export type PolicyAction = "auto" | "review" | "escalate";
export type ScreenRecommendation = "pass" | "review" | "block" | "skip";

export const DEFAULT_AUTO_ACCEPT = 0.8;
export const DEFAULT_REVIEW_AT = 0.5;
export const DEFAULT_BLOCK_AT = 0.75;
export const DEFAULT_SKIP_BELOW = 0.35;

export function validatePolicyThresholds(autoAccept: number, reviewAt: number): void {
  if (!Number.isFinite(autoAccept) || !Number.isFinite(reviewAt) || autoAccept < 0 || reviewAt < 0 || autoAccept > 1 || reviewAt > autoAccept) {
    throw new JevValidationError("Thresholds must satisfy 0 <= review_at <= auto_accept <= 1.");
  }
}

export function requireCompleteContext(action: PolicyAction, truncated: boolean): PolicyAction {
  return truncated && action === "auto" ? "review" : action;
}

export function confidenceFromProbabilities(
  probabilities: Record<string, number>,
): number {
  const values = Object.values(probabilities);
  if (values.length === 0) {
    return 0;
  }
  const n = values.length;
  const max = Math.max(...values);
  const uniform = 1 / n;
  if (max <= uniform) {
    return 0;
  }
  return (max - uniform) / (1 - uniform);
}

/** Additional routing guard, not a reconstruction of the provider's confidence statistic. */
export function distributionSupportsConfidence(probabilities: Record<string, number>, threshold: number): boolean {
  const values = Object.values(probabilities);
  if (values.length < 2) return false;
  const total = values.reduce((sum, value) => sum + value, 0);
  if (total <= 0) return false;
  const uniform = 1 / values.length;
  // Normalize the small rounding error allowed by response validation. Compare
  // peaks directly so an exact threshold is not lost to subtract/divide noise.
  const requiredPeak = uniform + (1 - uniform) * threshold;
  const roundingTolerance = Number.EPSILON * (values.length + 2);
  return Math.max(...values) / total + roundingTolerance >= requiredPeak;
}

/**
 * A provider-reported confidence may be malformed or stale. Keep that value
 * for diagnostics, but do not let it authorize an automatic decision when the
 * accompanying distribution cannot support the same threshold.
 */
export function confidenceSupportsAuto(
  confidence: number,
  probabilities: Record<string, number>,
  threshold: number,
): boolean {
  return confidence >= threshold && distributionSupportsConfidence(probabilities, threshold);
}

export function actionFromConfidence(
  confidence: number,
  autoAccept = DEFAULT_AUTO_ACCEPT,
  reviewAt = DEFAULT_REVIEW_AT,
): PolicyAction {
  validatePolicyThresholds(autoAccept, reviewAt);
  if (confidence >= autoAccept) {
    return "auto";
  }
  if (confidence >= reviewAt) {
    return "review";
  }
  return "escalate";
}

export function minConfidence(values: Array<number | undefined>): number {
  const present = values.filter((value): value is number => typeof value === "number");
  if (present.length === 0) {
    return 0;
  }
  return Math.min(...present);
}

export function codingLoopAction(input: {
  nextChoice: string;
  nextConfidence: number;
  riskScore: number;
  doneEnough: number;
  autoAccept?: number;
  reviewAt?: number;
}): PolicyAction {
  const autoAccept = input.autoAccept ?? DEFAULT_AUTO_ACCEPT;
  const reviewAt = input.reviewAt ?? DEFAULT_REVIEW_AT;
  validatePolicyThresholds(autoAccept, reviewAt);
  if (input.nextConfidence < reviewAt) {
    return "escalate";
  }
  if (input.nextChoice === "ask_user") {
    return "review";
  }
  if (input.riskScore >= 1.5) {
    return input.nextConfidence >= autoAccept ? "review" : "escalate";
  }
  if (input.nextChoice === "stop" && input.doneEnough < 0.7) {
    return "review";
  }
  if (input.nextConfidence >= autoAccept && input.riskScore < 1.2) {
    return "auto";
  }
  return "review";
}

export function reviewAction(input: {
  composite: number;
  safeToApply: number;
  minConfidence: number;
  autoAccept?: number;
  reviewAt?: number;
}): PolicyAction {
  const autoAccept = input.autoAccept ?? DEFAULT_AUTO_ACCEPT;
  const reviewAt = input.reviewAt ?? DEFAULT_REVIEW_AT;
  validatePolicyThresholds(autoAccept, reviewAt);
  if (input.minConfidence < reviewAt || input.safeToApply < 0.4) {
    return "escalate";
  }
  if (input.safeToApply >= autoAccept && input.composite >= 0.7 && input.minConfidence >= autoAccept) {
    return "auto";
  }
  return "review";
}

export function screenRecommendation(input: {
  injection: number;
  substance: number;
  relevance?: number;
  blockAt?: number;
  reviewAt?: number;
  skipBelow?: number;
}): ScreenRecommendation {
  const blockAt = input.blockAt ?? DEFAULT_BLOCK_AT;
  const reviewAt = input.reviewAt ?? 0.25;
  const skipBelow = input.skipBelow ?? DEFAULT_SKIP_BELOW;
  if (input.injection >= blockAt) {
    return "block";
  }
  if (input.injection >= reviewAt) {
    return "review";
  }
  if (input.substance < skipBelow) {
    return "skip";
  }
  if (input.relevance !== undefined && input.relevance < skipBelow) {
    return "skip";
  }
  return "pass";
}

export function screenAction(recommendation: ScreenRecommendation): PolicyAction {
  if (recommendation === "block") {
    return "escalate";
  }
  if (recommendation === "review") {
    return "review";
  }
  return "auto";
}

export function reviewComposite(scores: {
  correctness: number;
  specMatch: number;
  testGap: number;
  blastRadius: number;
}): number {
  const correctness = clamp01(scores.correctness / 2);
  const specMatch = clamp01(scores.specMatch / 2);
  const tests = clamp01(1 - scores.testGap / 2);
  const blast = clamp01(1 - scores.blastRadius / 2);
  return 0.4 * correctness + 0.3 * specMatch + 0.15 * tests + 0.15 * blast;
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}
