import { z } from "zod";

export const probabilitySchema = z.number().min(0).max(1);
export const usageSchema = z.object({
  input_tokens: z.number().nonnegative(),
  output_tokens: z.number().nonnegative(),
});
export const actionSchema = z.enum(["auto", "review", "escalate"]);
export const coverageSchema = z.object({
  complete: z.boolean(),
  original_chars: z.number().int().nonnegative(),
  evaluated_chars: z.number().int().nonnegative(),
  estimated_tokens: z.object({
    state: z.number().int().nonnegative(),
    questions: z.number().int().nonnegative(),
    longest_question: z.number().int().nonnegative(),
  }),
  estimator: z.literal("chars/4"),
});

export const baseToolOutputShape = {
  model: z.string(),
  usage: usageSchema,
  truncated: z.boolean(),
  coverage: coverageSchema,
  action: actionSchema,
};

export const evaluateOutputSchema = z.object({
  ...baseToolOutputShape,
  answers: z.record(z.string(), z.unknown()),
});

const confidenceShape = {
  confidence: probabilitySchema,
};

export const codingLoopOutputSchema = z.object({
  ...baseToolOutputShape,
  handoff: z.enum(["use_tools", "gather_context", "partner_model", "ask_user", "stop", "review"]),
  partner_model: z.object({
    required: z.boolean(),
    tier: z.enum(["none", "cheap", "standard", "reasoning"]),
    reason_codes: z.array(z.string()),
  }),
  next: z.object({ choice: z.string(), ...confidenceShape, probabilities: z.record(z.string(), probabilitySchema) }),
  model_tier: z.object({ choice: z.string(), ...confidenceShape, probabilities: z.record(z.string(), probabilitySchema) }),
  focus: z.object({ choice: z.string(), ...confidenceShape, probabilities: z.record(z.string(), probabilitySchema) }),
  risk: z.object({
    score: z.number(),
    ...confidenceShape,
    legend: z.record(z.string(), z.unknown()),
    probabilities: z.record(z.string(), probabilitySchema),
  }),
  done_enough: probabilitySchema,
  needs_more_context: probabilitySchema,
  needs_generation: probabilitySchema,
  tests_likely_fail: probabilitySchema,
  thresholds: z.object({ auto_accept: probabilitySchema, review_at: probabilitySchema, partner_auto_accept: probabilitySchema }),
});

export const reviewReasonSchema = z.enum([
  "accepted",
  "incomplete_context",
  "unsafe_to_apply",
  "safe_to_apply_uncertain",
  "correctness_concern",
  "correctness_uncertain",
  "spec_mismatch",
  "spec_match_uncertain",
  "test_gap",
  "test_gap_uncertain",
  "blast_radius",
  "blast_radius_uncertain",
  "composite_low",
  "review_required",
]);
export type ReviewReason = z.infer<typeof reviewReasonSchema>;

export const reviewOutputSchema = z.object({
  ...baseToolOutputShape,
  reason_codes: z.array(reviewReasonSchema).min(1),
  composite: probabilitySchema,
  safe_to_apply: probabilitySchema,
  scores: z.record(z.string(), z.object({ score: z.number(), confidence: probabilitySchema })),
  weights: z.record(z.string(), z.number()),
  thresholds: z.object({ auto_accept: probabilitySchema, review_at: probabilitySchema }),
});

export const verifyOutputSchema = z.object({
  ...baseToolOutputShape,
  all_claims_verified: z.boolean(),
  summary: z.object({
    verified: z.number().int().nonnegative(),
    contradicted: z.number().int().nonnegative(),
    unsupported: z.number().int().nonnegative(),
    needs_review: z.number().int().nonnegative(),
  }),
  results: z.array(z.object({
    claim: z.string(),
    verdict: z.enum(["verified", "contradicted", "unsupported"]),
    confidence: probabilitySchema,
    probabilities: z.record(z.string(), probabilitySchema),
    action: actionSchema,
  })),
  thresholds: z.object({ auto_accept: probabilitySchema, review_at: probabilitySchema }),
});

export const screenOutputSchema = z.object({
  ...baseToolOutputShape,
  probabilities: z.record(z.string(), probabilitySchema),
  recommendation: z.object({
    action: z.enum(["pass", "review", "block", "skip"]),
    reason: z.string(),
  }),
  thresholds: z.object({ block_at: probabilitySchema, review_at: probabilitySchema }),
});

const rankCoverageSchema = z.object({
  complete: z.boolean(),
  estimated_tokens: z.object({
    state: z.number().int().nonnegative(),
    questions: z.number().int().nonnegative(),
    longest_question: z.number().int().nonnegative(),
  }),
  estimator: z.literal("chars/4"),
  estimated_tokens_scope: z.literal("final_request"),
  candidate_fields: z.object({
    complete: z.boolean(),
    candidates_considered: z.number().int().nonnegative(),
    original_chars: z.number().int().nonnegative(),
    evaluated_chars: z.number().int().nonnegative(),
  }),
});

const choiceOutputSchema = z.object({
  choice: z.string(),
  confidence: probabilitySchema,
  probabilities: z.record(z.string(), probabilitySchema),
});

const scoreOutputSchema = z.object({
  score: z.number().min(0).max(2),
  confidence: probabilitySchema,
  probabilities: z.record(z.string(), probabilitySchema),
  legend: z.record(z.string(), z.unknown()),
});

export const scopeReasonSchema = z.enum([
  "accepted",
  "in_scope",
  "out_of_scope",
  "scope_uncertain",
  "effect_mismatch",
  "effect_uncertain",
  "confirmation_required",
  "confirmation_uncertain",
  "external_effect",
  "destructive_effect",
  "unknown_effect",
  "risk_review",
  "risk_uncertain",
  "injection_suspected",
  "incomplete_context",
  "review_required",
]);

export const scopeOutputSchema = z.object({
  ...baseToolOutputShape,
  scope: z.object({
    in_scope: probabilitySchema,
    effect_match: probabilitySchema,
    needs_confirmation: probabilitySchema,
  }),
  risk: scoreOutputSchema,
  reason_codes: z.array(scopeReasonSchema).min(1),
  thresholds: z.object({ auto_accept: probabilitySchema, review_at: probabilitySchema }),
});

export const triageReasonSchema = z.enum([
  "accepted",
  "cause_uncertain",
  "cause_unknown",
  "progress_repeating",
  "progress_regressing",
  "not_recoverable",
  "recoverability_uncertain",
  "retry_budget_exhausted",
  "human_decision_required",
  "strategy_uncertain",
  "strategy_escalate",
  "injection_suspected",
  "incomplete_context",
  "loop_detected",
  "progress_inconsistent",
  "review_required",
]);

export const triageOutputSchema = z.object({
  ...baseToolOutputShape,
  cause: z.object({
    id: z.string(),
    confidence: probabilitySchema,
    probabilities: z.record(z.string(), probabilitySchema),
  }),
  progress: choiceOutputSchema.extend({
    choice: z.enum(["first_attempt", "advancing", "repeating", "regressing", "complete"]),
  }),
  recoverable: probabilitySchema,
  strategy: choiceOutputSchema.extend({
    choice: z.enum(["retry", "change_approach", "gather_context", "ask_user", "stop", "escalate"]),
  }),
  loop: z.object({
    detected: z.boolean(),
    repeats: z.number().int().nonnegative(),
    kind: z.enum(["none", "repeated_attempt", "same_failure"]),
    improving: z.boolean().optional(),
  }),
  reason_codes: z.array(triageReasonSchema).min(1),
  thresholds: z.object({ auto_accept: probabilitySchema, review_at: probabilitySchema }),
});

export const riskReasonSchema = z.enum([
  "accepted",
  "authorization_concern",
  "validation_concern",
  "secret_exposure",
  "data_loss",
  "concurrency_concern",
  "dependency_concern",
  "external_effect",
  "severity_review",
  "severity_uncertain",
  "concern_uncertain",
  "injection_suspected",
  "incomplete_context",
  "review_required",
]);

export const riskOutputSchema = z.object({
  ...baseToolOutputShape,
  flags: z.record(z.string(), probabilitySchema),
  severity: scoreOutputSchema,
  reason_codes: z.array(riskReasonSchema).min(1),
  thresholds: z.object({ auto_accept: probabilitySchema, review_at: probabilitySchema }),
});

export const rankOutputSchema = z.object({
  ...baseToolOutputShape,
  coverage: rankCoverageSchema,
  exists: probabilitySchema,
  exists_verdict: z.enum(["answered", "partial", "absent"]),
  winner: z.string(),
  winner_confidence: probabilitySchema,
  top: z.array(z.object({ id: z.string(), probability: probabilitySchema })),
  chunked: z.boolean(),
  chunks: z.number().int().positive().optional(),
});
