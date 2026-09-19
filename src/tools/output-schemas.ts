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

export const reviewOutputSchema = z.object({
  ...baseToolOutputShape,
  composite: probabilitySchema,
  safe_to_apply: probabilitySchema,
  scores: z.record(z.string(), z.object({ score: z.number(), confidence: probabilitySchema })),
  weights: z.record(z.string(), z.number()),
  thresholds: z.object({ auto_accept: probabilitySchema, review_at: probabilitySchema }),
});

export const verifyOutputSchema = z.object({
  ...baseToolOutputShape,
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
  thresholds: z.object({ auto_accept: probabilitySchema }),
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
