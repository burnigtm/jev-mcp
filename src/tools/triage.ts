import { z } from "zod";
import { getConfig } from "../config.js";
import { JevValidationError } from "../errors.js";
import { DEFAULT_FAILURE_CAUSES, triageQuestions, type FailureCause } from "../packs/triage.js";
import { requireCompleteContext, tightenJudgmentThresholds, triageAction, type PolicyAction } from "../policy.js";
import { asChoice, asNoul } from "../result.js";
import { systemOne, type ToolContext } from "../typesafe.js";
import { containsInjectionInstruction, sanitizeJudgeText, sanitizeUntrustedDocument } from "../untrusted.js";
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
    progress: progress.choice as "advancing" | "repeating" | "regressing" | "complete",
    recoverable,
    failedAttempts,
    autoAccept,
    reviewAt,
  });
  if (policy === "auto" && (suspicious || causeId === "unknown")) policy = "review";
  const actionPolicy = requireCompleteContext(policy, incomplete);

  const reasons: TriageReason[] = [];
  if (cause.confidence < reviewAt) reasons.push("cause_uncertain");
  if (causeId === "unknown") reasons.push("cause_unknown");
  if (progress.choice === "repeating") reasons.push("progress_repeating");
  if (progress.choice === "regressing") reasons.push("progress_regressing");
  if (recoverable < reviewAt) reasons.push("not_recoverable");
  if (strategy.confidence < reviewAt) reasons.push("strategy_uncertain");
  if (strategy.choice === "ask_user") reasons.push("human_decision_required");
  if (strategy.choice === "escalate") reasons.push("strategy_escalate");
  if (strategy.choice === "retry" && failedAttempts >= 2) reasons.push("retry_budget_exhausted");
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
    reason_codes: reasons,
    thresholds: { auto_accept: autoAccept, review_at: reviewAt },
  });
}
