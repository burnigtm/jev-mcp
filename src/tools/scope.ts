import { z } from "zod";
import { getConfig } from "../config.js";
import { scopeQuestions } from "../packs/scope.js";
import {
  confidenceSupportsAuto,
  requireCompleteContext,
  scopeAction,
  tightenJudgmentThresholds,
  type ActionEffect,
  type PolicyAction,
} from "../policy.js";
import { asNoul, asScore } from "../result.js";
import { systemOne, type ToolContext } from "../typesafe.js";
import { containsInjectionInstruction, judgeTextClipped, sanitizeJudgeText } from "../untrusted.js";
import { scopeReasonSchema, scopeOutputSchema } from "./output-schemas.js";

const effectSchema = z.enum(["read_only", "local_write", "external_write", "destructive", "unknown"]);

export const scopeInputSchema = z.object({
  task: z.string().min(1).describe("What the user approved"),
  approved_scope: z.string().optional().describe("Explicit constraints, targets, or non-goals for the approved task"),
  action: z.object({
    name: z.string().min(1).max(256).describe("Action or command name"),
    description: z.string().min(1).max(8_000).describe("What the action does, including its target and side effects"),
    effect: effectSchema.describe("Host-declared effect; the server never executes the action"),
    target: z.string().max(2_000).optional().describe("Path, URL, resource, or other exact target"),
    command: z.string().max(8_000).optional().describe("Optional redacted command text; never include secrets"),
  }),
  auto_accept: z.number().min(0).max(1).optional(),
  review_at: z.number().min(0).max(1).optional(),
  model: z.string().optional(),
});

export type ScopeInput = z.infer<typeof scopeInputSchema>;
type ScopeReason = z.infer<typeof scopeReasonSchema>;

const MAX_DESCRIPTION_CHARS = 8_000;
const MAX_COMMAND_CHARS = 8_000;
const MAX_TARGET_CHARS = 2_000;

export async function runScope(input: ScopeInput, context?: ToolContext) {
  const config = getConfig();
  const { autoAccept, reviewAt } = tightenJudgmentThresholds(input.auto_accept, input.review_at, config.autoAccept, config.reviewAt);
  const effect = input.action.effect as ActionEffect;
  const clipped = judgeTextClipped(input.action.description, MAX_DESCRIPTION_CHARS)
    || (input.action.target !== undefined && judgeTextClipped(input.action.target, MAX_TARGET_CHARS))
    || (input.action.command !== undefined && judgeTextClipped(input.action.command, MAX_COMMAND_CHARS));
  const action = {
    name: sanitizeJudgeText(input.action.name, 256),
    description: sanitizeJudgeText(input.action.description, MAX_DESCRIPTION_CHARS),
    effect,
    target: input.action.target === undefined ? "" : sanitizeJudgeText(input.action.target, MAX_TARGET_CHARS),
    command: input.action.command === undefined ? "" : sanitizeJudgeText(input.action.command, MAX_COMMAND_CHARS),
  };
  const suspicious = containsInjectionInstruction(input.action.description)
    || (input.action.target !== undefined && containsInjectionInstruction(input.action.target))
    || (input.action.command !== undefined && containsInjectionInstruction(input.action.command));

  const result = await systemOne({
    state: {
      task: input.task,
      approved_scope: input.approved_scope ?? "",
      action,
    },
    questions: scopeQuestions(),
    model: input.model,
  }, context);

  const inScope = asNoul(result.answers.in_scope).noul;
  const effectMatch = asNoul(result.answers.effect_match).noul;
  const needsConfirmation = asNoul(result.answers.needs_confirmation).noul;
  const risk = asScore(result.answers.risk);
  const incomplete = result.truncated || !result.coverage.complete || clipped;

  let policy: PolicyAction = scopeAction({
    effect,
    inScope,
    effectMatch,
    needsConfirmation,
    riskScore: risk.score,
    riskConfidence: risk.confidence,
    riskProbabilities: risk.probabilities,
    autoAccept,
    reviewAt,
  });
  if (policy === "auto" && suspicious) policy = "review";
  const actionPolicy = requireCompleteContext(policy, incomplete);

  const reasons: ScopeReason[] = [];
  if (inScope < reviewAt) reasons.push("out_of_scope");
  else if (inScope < autoAccept) reasons.push("scope_uncertain");
  if (effectMatch < reviewAt) reasons.push("effect_mismatch");
  else if (effectMatch < autoAccept) reasons.push("effect_uncertain");
  if (needsConfirmation >= autoAccept) reasons.push("confirmation_required");
  else if (needsConfirmation >= reviewAt) reasons.push("confirmation_uncertain");
  if (effect === "external_write") reasons.push("external_effect");
  if (effect === "destructive") reasons.push("destructive_effect");
  if (effect === "unknown") reasons.push("unknown_effect");
  if (risk.score >= 1.5) reasons.push("risk_review");
  else if (!confidenceSupportsAuto(risk.confidence, risk.probabilities, autoAccept)) reasons.push("risk_uncertain");
  if (suspicious) reasons.push("injection_suspected");
  if (incomplete) reasons.push("incomplete_context");
  if (actionPolicy === "auto") {
    reasons.length = 0;
    reasons.push("accepted");
  } else if (reasons.length === 0) {
    reasons.push("review_required");
  }

  return scopeOutputSchema.parse({
    model: result.model,
    usage: result.usage,
    truncated: result.truncated || clipped,
    coverage: incomplete ? { ...result.coverage, complete: false } : result.coverage,
    action: actionPolicy,
    scope: { in_scope: inScope, effect_match: effectMatch, needs_confirmation: needsConfirmation },
    risk: {
      score: risk.score,
      confidence: risk.confidence,
      probabilities: risk.probabilities,
      legend: risk.legend,
    },
    reason_codes: reasons,
    thresholds: { auto_accept: autoAccept, review_at: reviewAt },
  });
}
