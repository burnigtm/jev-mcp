import { JevValidationError } from "./errors.js";

export type PolicyAction = "auto" | "review" | "escalate";
export type ScreenRecommendation = "pass" | "review" | "block" | "skip";

export const DEFAULT_AUTO_ACCEPT = 0.8;
export const DEFAULT_REVIEW_AT = 0.5;
export const DEFAULT_BLOCK_AT = 0.75;
export const DEFAULT_SKIP_BELOW = 0.35;

/** Per-call thresholds may only raise the env floors. An inverted caller pair still fails. */
export function tightenJudgmentThresholds(
  callerAuto: number | undefined,
  callerReview: number | undefined,
  envAuto: number,
  envReview: number,
): { autoAccept: number; reviewAt: number } {
  if (callerAuto !== undefined && callerReview !== undefined) {
    validatePolicyThresholds(callerAuto, callerReview);
  }
  const autoAccept = Math.max(callerAuto ?? envAuto, envAuto);
  const reviewAt = Math.max(callerReview ?? envReview, envReview);
  validatePolicyThresholds(autoAccept, reviewAt);
  return { autoAccept, reviewAt };
}

/** A higher screen block_at blocks later, so a call can only lower it. */
export function tightenBlockAt(caller: number | undefined, envBlock: number): number {
  if (caller === undefined) return envBlock;
  if (!Number.isFinite(caller) || caller < 0 || caller > 1) {
    throw new JevValidationError("block_at must be between 0 and 1.");
  }
  return Math.min(caller, envBlock);
}

/** A higher screen review_at reviews later, so a call can only lower the 0.25 floor. */
export function tightenScreenReviewAt(caller: number | undefined, defaultReview = 0.25): number {
  if (caller === undefined) return defaultReview;
  if (!Number.isFinite(caller) || caller < 0 || caller > 1) {
    throw new JevValidationError("review_at must be between 0 and 1.");
  }
  return Math.min(caller, defaultReview);
}

export function validatePolicyThresholds(autoAccept: number, reviewAt: number): void {
  if (!Number.isFinite(autoAccept) || !Number.isFinite(reviewAt) || autoAccept < 0 || reviewAt < 0 || autoAccept > 1 || reviewAt > autoAccept) {
    throw new JevValidationError("Thresholds must satisfy 0 <= review_at <= auto_accept <= 1.");
  }
}

export function requireCompleteContext(action: PolicyAction, truncated: boolean): PolicyAction {
  return truncated && action === "auto" ? "review" : action;
}

/** Combining independent judgments never softens the strictest one. */
export function worstAction(actions: PolicyAction[]): PolicyAction {
  if (actions.includes("escalate")) return "escalate";
  if (actions.includes("review")) return "review";
  return "auto";
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

export type ActionEffect = "read_only" | "local_write" | "external_write" | "destructive" | "unknown";
export type TriageProgress = "advancing" | "repeating" | "regressing" | "complete";
export type TriageStrategy = "retry" | "change_approach" | "gather_context" | "ask_user" | "stop" | "escalate";

/** A Noul is "confidently false" only when its yes-probability is low enough. */
export function probabilitySupportsAbsence(probability: number, threshold: number): boolean {
  return probability <= 1 - threshold + 1e-9;
}

/**
 * Semantic preflight for one host-prepared action. This never grants
 * authorization; it only decides whether the action needs review/escalation.
 */
export function scopeAction(input: {
  effect: ActionEffect;
  inScope: number;
  effectMatch: number;
  needsConfirmation: number;
  riskScore: number;
  riskConfidence: number;
  riskProbabilities: Record<string, number>;
  autoAccept?: number;
  reviewAt?: number;
}): PolicyAction {
  const autoAccept = input.autoAccept ?? DEFAULT_AUTO_ACCEPT;
  const reviewAt = input.reviewAt ?? DEFAULT_REVIEW_AT;
  validatePolicyThresholds(autoAccept, reviewAt);
  if (input.inScope < reviewAt || input.effectMatch < reviewAt) return "escalate";
  if (input.needsConfirmation >= autoAccept) return "escalate";
  if (input.effect === "external_write" || input.effect === "destructive" || input.effect === "unknown") return "review";
  if (input.riskScore >= 1.5) return "review";
  if (input.inScope < autoAccept || input.effectMatch < autoAccept || input.needsConfirmation >= reviewAt) return "review";
  if (!probabilitySupportsAbsence(input.needsConfirmation, autoAccept)) return "review";
  if (!confidenceSupportsAuto(input.riskConfidence, input.riskProbabilities, autoAccept)) return "review";
  return input.riskScore < 1.2 ? "auto" : "review";
}

/** Failure/loop triage. The host still chooses and executes any recovery call. */
export function triageAction(input: {
  causeConfidence: number;
  causeProbabilities: Record<string, number>;
  strategy: TriageStrategy;
  strategyConfidence: number;
  strategyProbabilities: Record<string, number>;
  progress: TriageProgress;
  recoverable: number;
  failedAttempts: number;
  autoAccept?: number;
  reviewAt?: number;
}): PolicyAction {
  const autoAccept = input.autoAccept ?? DEFAULT_AUTO_ACCEPT;
  const reviewAt = input.reviewAt ?? DEFAULT_REVIEW_AT;
  validatePolicyThresholds(autoAccept, reviewAt);
  if (input.causeConfidence < reviewAt) return "escalate";
  if (input.causeConfidence < autoAccept) return "review";
  if (input.strategyConfidence < reviewAt) return "escalate";
  if (input.strategyConfidence < autoAccept) return "review";
  if (input.strategy === "escalate") return "escalate";
  if (input.strategy === "ask_user") return "review";
  if (input.progress === "repeating" || input.progress === "regressing") return "review";
  if (input.progress === "complete" && input.strategy !== "stop") return "review";
  if (input.strategy === "stop" && input.progress !== "complete") return "review";
  if (input.recoverable < reviewAt) return "escalate";
  if (input.recoverable < autoAccept) return "review";
  if (input.strategy === "retry" && input.failedAttempts >= 2) return "review";
  if (
    !confidenceSupportsAuto(input.causeConfidence, input.causeProbabilities, autoAccept)
    || !confidenceSupportsAuto(input.strategyConfidence, input.strategyProbabilities, autoAccept)
  ) {
    return "review";
  }
  return "auto";
}

export const CRITICAL_RISK_FLAGS = ["authorization", "secret_exposure", "data_loss"] as const;

/** Security-focused patch triage; `auto` is evidence, never merge permission. */
export function riskAction(input: {
  flags: Record<string, number>;
  severityScore: number;
  severityConfidence: number;
  severityProbabilities: Record<string, number>;
  autoAccept?: number;
  reviewAt?: number;
}): PolicyAction {
  const autoAccept = input.autoAccept ?? DEFAULT_AUTO_ACCEPT;
  const reviewAt = input.reviewAt ?? DEFAULT_REVIEW_AT;
  validatePolicyThresholds(autoAccept, reviewAt);
  for (const flag of CRITICAL_RISK_FLAGS) {
    const probability = input.flags[flag] ?? 0;
    if (probability >= autoAccept) return "escalate";
    if (probability >= reviewAt) return "review";
  }
  for (const probability of Object.values(input.flags)) {
    if (probability >= autoAccept) return "review";
    if (probability >= reviewAt) return "review";
  }
  if (input.severityScore >= 1.9) return "escalate";
  if (input.severityScore >= 1.5) return "review";
  if (!Object.values(input.flags).every((probability) => probabilitySupportsAbsence(probability, autoAccept))) return "review";
  if (!confidenceSupportsAuto(input.severityConfidence, input.severityProbabilities, autoAccept)) return "review";
  return input.severityScore < 1.2 ? "auto" : "review";
}

export function reviewAction(input: {
  composite: number;
  safeToApply: number;
  minConfidence: number;
  correctness: number;
  specMatch: number;
  testGap: number;
  blastRadius: number;
  autoAccept?: number;
  reviewAt?: number;
}): PolicyAction {
  const autoAccept = input.autoAccept ?? DEFAULT_AUTO_ACCEPT;
  const reviewAt = input.reviewAt ?? DEFAULT_REVIEW_AT;
  validatePolicyThresholds(autoAccept, reviewAt);
  if (input.minConfidence < reviewAt || input.safeToApply < 0.4) {
    return "escalate";
  }
  // Scores are 0–2. A perfect weighted sum can still hide a failed dimension.
  const dimensionsClear = input.correctness >= 1
    && input.specMatch >= 1
    && input.testGap <= 1
    && input.blastRadius <= 1;
  if (
    dimensionsClear
    && input.safeToApply >= autoAccept
    && input.composite >= 0.7
    && input.minConfidence >= autoAccept
  ) {
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
