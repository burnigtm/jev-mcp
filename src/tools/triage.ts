import { z } from "zod";
import { getConfig } from "../config.js";
import { JevValidationError } from "../errors.js";
import { DEFAULT_FAILURE_CAUSES, triageQuestions, type FailureCause } from "../packs/triage.js";
import { requireCompleteContext, tightenJudgmentThresholds, triageAction, type PolicyAction, type TriageProgress } from "../policy.js";
import { asChoice, asNoul } from "../result.js";
import { systemOne, type ToolContext } from "../typesafe.js";
import { containsInjectionInstruction, normalizedJudgeText, sanitizeJudgeText, sanitizeUntrustedDocument } from "../untrusted.js";
import { triageOutputSchema, triageReasonSchema } from "./output-schemas.js";

const causeSchema = z.object({
  id: z.string().min(1).max(128),
  description: z.string().min(1).max(2_000),
});

const attemptSchema = z.object({
  action: z.string().min(1).max(2_000),
  result: z.string().max(8_000).optional(),
  failed: z.boolean().optional(),
});

const historySchema = z.object({
  action: z.string().min(1).max(2_000),
  observation: z.string().max(8_000),
});

export const triageInputSchema = z.object({
  task: z.string().min(1).describe("What the coding agent is trying to do"),
  failure: z.string().min(1).describe("The failing test, compiler, or command output"),
  causes: z.array(causeSchema).min(2).max(16).optional().describe("Host-supplied candidate causes; defaults to a small generic taxonomy"),
  attempts: z.array(attemptSchema).max(12).optional().describe("Recent attempts on the current problem"),
  history: z.array(historySchema).max(12).optional().describe("Recent action/observation pairs for loop-progress detection"),
  auto_accept: z.number().min(0).max(1).optional(),
  review_at: z.number().min(0).max(1).optional(),
  model: z.string().optional(),
});

export type TriageInput = z.infer<typeof triageInputSchema>;
type TriageReason = z.infer<typeof triageReasonSchema>;

export async function runTriage(input: TriageInput, context?: ToolContext) {
  const config = getConfig();
  const { autoAccept, reviewAt } = tightenJudgmentThresholds(input.auto_accept, input.review_at, config.autoAccept, config.reviewAt);
  const originalCauses: readonly FailureCause[] = input.causes ?? DEFAULT_FAILURE_CAUSES;
  const seen = new Set<string>();
  for (const cause of originalCauses) {
    if (seen.has(cause.id)) throw new JevValidationError(`Duplicate failure cause ID: ${cause.id}.`);
    seen.add(cause.id);
    if (cause.id === "unknown") throw new JevValidationError("Failure cause ID `unknown` is reserved.");
    if (cause.id === "__proto__" || cause.id === "constructor" || cause.id === "prototype") {
      throw new JevValidationError(`Failure cause ID ${cause.id} is reserved.`);
    }
  }
  const causes = originalCauses.map((cause, index) => ({
    id: `cause_${index}`,
    original_id: sanitizeJudgeText(cause.id, 128),
    description: sanitizeJudgeText(cause.description, 1_000),
  }));
  const failure = sanitizeUntrustedDocument(input.failure);
  const attempts = (input.attempts ?? []).map((attempt) => ({
    action: sanitizeJudgeText(attempt.action, 2_000),
    result: attempt.result === undefined ? "" : sanitizeUntrustedDocument(attempt.result),
    failed: attempt.failed !== false,
  }));
  const history = (input.history ?? []).map((entry) => ({
    action: sanitizeJudgeText(entry.action, 2_000),
    observation: sanitizeUntrustedDocument(entry.observation),
  }));
  const suspicious = containsInjectionInstruction(input.failure)
    || attempts.some((attempt) => containsInjectionInstruction(attempt.action) || containsInjectionInstruction(attempt.result))
    || history.some((entry) => containsInjectionInstruction(entry.action) || containsInjectionInstruction(entry.observation))
    || originalCauses.some((cause) => containsInjectionInstruction(cause.description));
  const loop = detectLoop(input.attempts ?? [], input.history ?? [], input.failure);

  const result = await systemOne({
    state: {
      task: input.task,
      failure,
      causes: causes.map(({ id, original_id, description }) => ({ id, original_id, description })),
      attempts,
      history,
    },
    questions: triageQuestions(causes),
    model: input.model,
  }, context);

  const cause = asChoice(result.answers.cause);
  const progress = asChoice(result.answers.progress);
  const recoverable = asNoul(result.answers.recoverable).noul;
  const strategy = asChoice(result.answers.strategy);
  const causeIndex = cause.choice.startsWith("cause_") ? Number(cause.choice.slice("cause_".length)) : -1;
  const causeId = cause.choice === "unknown"
    ? "unknown"
    : causes[causeIndex]?.original_id;
  if (!causeId) throw new JevValidationError("Provider selected an unknown failure cause label.");
  const causeProbabilities = Object.fromEntries(Object.entries(cause.probabilities).map(([key, probability]) => {
    if (key === "unknown") return [key, probability];
    const index = key.startsWith("cause_") ? Number(key.slice("cause_".length)) : -1;
    return [causes[index]?.original_id ?? key, probability];
  }));

  const failedAttempts = attempts.filter((attempt) => attempt.failed).length;
  const incomplete = result.truncated || !result.coverage.complete;
  let policy: PolicyAction = triageAction({
    causeConfidence: cause.confidence,
    causeProbabilities: cause.probabilities,
    strategy: strategy.choice as "retry" | "change_approach" | "gather_context" | "ask_user" | "stop" | "escalate",
    strategyConfidence: strategy.confidence,
    strategyProbabilities: strategy.probabilities,
    progress: progress.choice as TriageProgress,
    recoverable,
    failedAttempts,
    autoAccept,
    reviewAt,
  });
  // "first_attempt" is only coherent when the host supplied no attempts or history.
  const progressInconsistent = progress.choice === "first_attempt" && (attempts.length > 0 || history.length > 0);
  if (policy === "auto" && (suspicious || causeId === "unknown" || loop.detected || progressInconsistent)) policy = "review";
  const actionPolicy = requireCompleteContext(policy, incomplete);

  const reasons: TriageReason[] = [];
  if (cause.confidence < reviewAt) reasons.push("cause_uncertain");
  if (causeId === "unknown") reasons.push("cause_unknown");
  if (progress.choice === "repeating") reasons.push("progress_repeating");
  if (progress.choice === "regressing") reasons.push("progress_regressing");
  if (recoverable < reviewAt) reasons.push("not_recoverable");
  else if (recoverable < autoAccept) reasons.push("recoverability_uncertain");
  if (strategy.confidence < reviewAt) reasons.push("strategy_uncertain");
  if (strategy.choice === "ask_user") reasons.push("human_decision_required");
  if (strategy.choice === "escalate") reasons.push("strategy_escalate");
  if (strategy.choice === "retry" && failedAttempts >= 2) reasons.push("retry_budget_exhausted");
  if (loop.detected) reasons.push("loop_detected");
  if (progressInconsistent) reasons.push("progress_inconsistent");
  if (suspicious) reasons.push("injection_suspected");
  if (incomplete) reasons.push("incomplete_context");
  if (actionPolicy === "auto") {
    reasons.length = 0;
    reasons.push("accepted");
  } else if (reasons.length === 0) {
    reasons.push("review_required");
  }

  return triageOutputSchema.parse({
    model: result.model,
    usage: result.usage,
    truncated: result.truncated,
    coverage: result.coverage,
    action: actionPolicy,
    cause: { id: causeId, confidence: cause.confidence, probabilities: causeProbabilities },
    progress: { choice: progress.choice, confidence: progress.confidence, probabilities: progress.probabilities },
    recoverable,
    strategy: { choice: strategy.choice, confidence: strategy.confidence, probabilities: strategy.probabilities },
    loop,
    reason_codes: reasons,
    thresholds: { auto_accept: autoAccept, review_at: reviewAt },
  });
}

export type LoopVerdict = { detected: boolean; repeats: number; kind: "none" | "repeated_attempt" | "same_failure" };

/**
 * Mask values that change between otherwise identical runs so a rerun with a
 * new timestamp, duration, PID, or temp path still fingerprints the same.
 */
export function loopFingerprint(text: string): string {
  return normalizedJudgeText(text)
    .toLowerCase()
    .replace(/\d{4}-\d{2}-\d{2}[t ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:z|[+-]\d{2}:?\d{2})?/g, "<time>")
    .replace(/(?:[a-z]:)?[\\/][^\s'"`]*?(?:tmp|temp)[\\/][^\s'"`]*/g, "<tmp>")
    .replace(/\b(?:0x)?[0-9a-f]{7,}\b/g, "<hex>")
    .replace(/\b\d+(?:\.\d+)?\s*(?:ms|s|sec|seconds|m|min)\b/g, "<dur>")
    .replace(/\d+/g, "<n>");
}

/**
 * Deterministic backstop for loop detection: Jev may report `advancing` even
 * when the host has the same failing action and result on record. Never
 * inspects the model's answer; only host-supplied attempts, history, and failure.
 */
export function detectLoop(
  attempts: ReadonlyArray<{ action: string; result?: string; failed?: boolean }>,
  history: ReadonlyArray<{ action: string; observation: string }>,
  failure: string,
): LoopVerdict {
  const failed = attempts.filter((attempt) => attempt.failed !== false);
  const counts = new Map<string, number>();
  const bump = (key: string) => counts.set(key, (counts.get(key) ?? 0) + 1);
  for (const attempt of failed) bump(JSON.stringify(["attempt", loopFingerprint(attempt.action), loopFingerprint(attempt.result ?? "")]));
  for (const entry of history) bump(JSON.stringify(["history", loopFingerprint(entry.action), loopFingerprint(entry.observation)]));
  const repeats = Math.max(0, ...counts.values());
  if (repeats >= 2) return { detected: true, repeats, kind: "repeated_attempt" };
  // The latest attempt usually produced the current failure; only an identical
  // failure across two or more failed attempts shows that nothing is changing.
  const current = loopFingerprint(failure);
  const sameFailure = failed.filter((attempt) => attempt.result !== undefined && loopFingerprint(attempt.result) === current).length;
  if (sameFailure >= 2) return { detected: true, repeats: sameFailure, kind: "same_failure" };
  return { detected: false, repeats, kind: "none" };
}
