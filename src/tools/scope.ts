import { z } from "zod";
import { getConfig } from "../config.js";
import { scopeQuestions } from "../packs/scope.js";
import {
  confidenceSupportsAuto,
  escalationCutoff,
  requireCompleteContext,
  scopeAction,
  tightenJudgmentThresholds,
  worstAction,
  type ActionEffect,
  type PolicyAction,
} from "../policy.js";
import { asNoul, asScore } from "../result.js";
import { systemOne, type ToolContext } from "../typesafe.js";
import { effectiveEffect } from "../effects.js";
import { evaluatePolicy, loadRepoPolicy, NO_POLICY_VERDICT } from "../repo-policy.js";
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
  const declaredEffect = input.action.effect as ActionEffect;
  // The declared effect is a host claim. Policy uses the strictest of it and what the command text shows.
  const effects = effectiveEffect(declaredEffect, input.action.command);
  const effect = effects.effective as ActionEffect;
  const clipped = judgeTextClipped(input.action.description, MAX_DESCRIPTION_CHARS)
    || (input.action.target !== undefined && judgeTextClipped(input.action.target, MAX_TARGET_CHARS))
    || (input.action.command !== undefined && judgeTextClipped(input.action.command, MAX_COMMAND_CHARS));
  const action = {
    name: sanitizeJudgeText(input.action.name, 256),
    description: sanitizeJudgeText(input.action.description, MAX_DESCRIPTION_CHARS),
    effect: declaredEffect,
    target: input.action.target === undefined ? "" : sanitizeJudgeText(input.action.target, MAX_TARGET_CHARS),
    command: input.action.command === undefined ? "" : sanitizeJudgeText(input.action.command, MAX_COMMAND_CHARS),
  };
  const suspicious = containsInjectionInstruction(input.action.description)
    || (input.action.target !== undefined && containsInjectionInstruction(input.action.target))
    || (input.action.command !== undefined && containsInjectionInstruction(input.action.command));

  // Deterministic repository policy first: a decisive result costs no tokens. `deny` and `allow` are final;
  // `review` still asks Jev and keeps the stricter answer, so no judgment is lost.
  const policy = loadRepoPolicy();
  const verdict = policy
    ? evaluatePolicy(policy, { command: input.action.command, target: input.action.target, allowEligible: effects.effective === "read_only" && effects.confirmedReadOnly && !suspicious })
    : NO_POLICY_VERDICT;
  const effectReport = { declared: effects.declared, inferred: effects.inferred, effective: effects.effective, matched: effects.matched };
  if (verdict.decision === "deny" || verdict.decision === "allow") {
    return scopeOutputSchema.parse({
      model: "local-policy",
      usage: { input_tokens: 0, output_tokens: 0 },
      truncated: false,
      coverage: { complete: true, original_chars: 0, evaluated_chars: 0, estimated_tokens: { state: 0, questions: 0, longest_question: 0 }, estimator: "chars/4" },
      action: verdict.decision === "deny" ? "escalate" : "auto",
      effect: effectReport,
      policy: verdict,
      scope: null,
      risk: null,
      reason_codes: [verdict.decision === "deny" ? "policy_denied" : "policy_allowed"],
      thresholds: { auto_accept: autoAccept, review_at: reviewAt },
    });
  }

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

  let judged: PolicyAction = scopeAction({
    effect,
    inScope,
    effectMatch,
    needsConfirmation,
    riskScore: risk.score,
    riskConfidence: risk.confidence,
    riskProbabilities: risk.probabilities,
    autoAccept,
    reviewAt,
    escalationFloor: config.autoAccept,
  });
  if (judged === "auto" && suspicious) judged = "review";
  const modelAction = requireCompleteContext(judged, incomplete);
  const actionPolicy = verdict.decision === "review" ? worstAction([modelAction, "review"]) : modelAction;

  const reasons: ScopeReason[] = [];
  if (verdict.decision === "review") reasons.push("policy_review");
  if (inScope < reviewAt) reasons.push("out_of_scope");
  else if (inScope < autoAccept) reasons.push("scope_uncertain");
  if (effectMatch < reviewAt) reasons.push("effect_mismatch");
  else if (effectMatch < autoAccept) reasons.push("effect_uncertain");
  if (needsConfirmation >= escalationCutoff(autoAccept, config.autoAccept)) reasons.push("confirmation_required");
  else if (needsConfirmation >= reviewAt) reasons.push("confirmation_uncertain");
  if (effect === "external_write") reasons.push("external_effect");
  if (effect === "destructive") reasons.push("destructive_effect");
  if (effect === "unknown") reasons.push("unknown_effect");
  if (effects.upgraded) reasons.push("effect_upgraded");
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
    effect: effectReport,
    policy: verdict,
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
