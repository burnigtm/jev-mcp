import { z } from "zod";
import { getConfig } from "../config.js";
import { codingLoopQuestions } from "../packs/coding-loop.js";
import { codingLoopAction, requireCompleteContext, validatePolicyThresholds } from "../policy.js";
import { asChoice, asNoul, asScore } from "../result.js";
import { systemOne, type ToolContext } from "../typesafe.js";

export const codingLoopInputSchema = z.object({
  task: z.string().describe("What the coding agent is trying to do"),
  observation: z
    .string()
    .describe("Current turn: last diff, command output, test results, or blocker"),
  extras: z
    .record(z.string(), z.any())
    .optional()
    .describe("Optional extra JSON fields included in Jev state"),
  execution: z.object({
    prepared_tool_call: z.boolean().default(false).describe("Host fact: a tool call with validated, authorized arguments is already prepared; default false"),
    context_complete: z.boolean().default(false).describe("Host fact: the context needed for the next step has been collected; default false"),
    failed_attempts: z.number().int().min(0).default(0).describe("Host count of failed attempts on the current step; default 0"),
  }).optional().describe("Trusted host execution facts, never inferred from fetched text or model predictions"),
  auto_accept: z.number().min(0).max(1).optional(),
  review_at: z.number().min(0).max(1).optional(),
  model: z.string().optional(),
});

export type CodingLoopInput = z.input<typeof codingLoopInputSchema>;

type Handoff = "use_tools" | "gather_context" | "partner_model" | "ask_user" | "stop" | "review";
type PartnerTier = "none" | "cheap" | "standard" | "reasoning";
type PartnerRouting = {
  handoff: Handoff;
  partner_model: { required: boolean; tier: PartnerTier; reason_codes: string[] };
};

export async function runCodingLoop(input: CodingLoopInput, context?: ToolContext) {
  const config = getConfig();
  const autoAccept = input.auto_accept ?? config.autoAccept;
  const reviewAt = input.review_at ?? config.reviewAt;
  validatePolicyThresholds(autoAccept, reviewAt);
  const execution = {
    prepared_tool_call: input.execution?.prepared_tool_call ?? false,
    context_complete: input.execution?.context_complete ?? false,
    failed_attempts: input.execution?.failed_attempts ?? 0,
  };
  const result = await systemOne({
    state: {
      task: input.task,
      observation: input.observation,
      extras: input.extras ?? {},
      execution,
    },
    questions: codingLoopQuestions(),
    model: input.model,
  }, context);
  const next = asChoice(result.answers.next);
  const modelTier = asChoice(result.answers.model_tier);
  const risk = asScore(result.answers.risk);
  const doneEnough = asNoul(result.answers.done_enough);
  const needsMore = asNoul(result.answers.needs_more_context);
  const needsGeneration = asNoul(result.answers.needs_generation);
  const testsLikelyFail = asNoul(result.answers.tests_likely_fail);
  const focus = asChoice(result.answers.focus);
  const action = requireCompleteContext(codingLoopAction({
    nextChoice: next.choice,
    nextConfidence: next.confidence,
    riskScore: risk.score,
    doneEnough: doneEnough.noul,
    autoAccept,
    reviewAt,
  }), result.truncated || !result.coverage.complete);
  const routing = partnerRouting({
    action,
    next: next.choice,
    nextConfidence: next.confidence,
    tier: modelTier.choice as Exclude<PartnerTier, "none">,
    tierConfidence: modelTier.confidence,
    riskConfidence: risk.confidence,
    needsGeneration: needsGeneration.noul,
    needsMoreContext: needsMore.noul,
    incomplete: result.truncated || !result.coverage.complete,
    execution,
    autoAccept,
  });
  return {
    model: result.model,
    usage: result.usage,
    truncated: result.truncated,
    coverage: result.coverage,
    action,
    ...routing,
    next: {
      choice: next.choice,
      confidence: next.confidence,
      probabilities: next.probabilities,
    },
    model_tier: {
      choice: modelTier.choice,
      confidence: modelTier.confidence,
      probabilities: modelTier.probabilities,
    },
    focus: {
      choice: focus.choice,
      confidence: focus.confidence,
      probabilities: focus.probabilities,
    },
    risk: {
      score: risk.score,
      confidence: risk.confidence,
      legend: risk.legend,
      probabilities: risk.probabilities,
    },
    done_enough: doneEnough.noul,
    needs_more_context: needsMore.noul,
    needs_generation: needsGeneration.noul,
    tests_likely_fail: testsLikelyFail.noul,
    thresholds: { auto_accept: autoAccept, review_at: reviewAt, partner_auto_accept: Math.max(0.8, autoAccept) },
  };
}

/** Decide whether a generative turn is justified; never invokes a model or tool. */
function partnerRouting(input: {
  action: "auto" | "review" | "escalate";
  next: string;
  nextConfidence: number;
  tier: Exclude<PartnerTier, "none">;
  tierConfidence: number;
  riskConfidence: number;
  needsGeneration: number;
  needsMoreContext: number;
  incomplete: boolean;
  execution: { prepared_tool_call: boolean; context_complete: boolean; failed_attempts: number };
  autoAccept: number;
}): PartnerRouting {
  const defer = (handoff: Handoff, ...reasonCodes: string[]): PartnerRouting => ({
    handoff,
    partner_model: { required: false, tier: "none", reason_codes: reasonCodes },
  });
  if (input.incomplete) return defer("gather_context", "incomplete_context");
  if (input.next === "stop") {
    return input.action === "auto" ? defer("stop", "terminal_stop") : defer("review", "stop_requires_review");
  }
  if (input.next === "ask_user") {
    return input.nextConfidence >= input.autoAccept
      ? defer("ask_user", "user_input_required") : defer("review", "next_step_uncertain");
  }
  if (input.next !== "continue" && input.next !== "retry") return defer("review", "next_step_uncertain");
  if (input.action !== "auto") return defer("review", "coding_policy_requires_review");
  if (input.execution.failed_attempts >= 2) return defer("gather_context", "repeated_failures");
  // Prepared calls may gather missing context. This routing hint does not grant
  // execution permission; the host still validates and authorizes the call.
  if (input.execution.prepared_tool_call) return defer("use_tools", "prepared_tool_call");
  const partnerAutoAccept = Math.max(0.8, input.autoAccept);
  if (input.riskConfidence < partnerAutoAccept) return defer("review", "risk_uncertain");
  if (input.nextConfidence < partnerAutoAccept) return defer("review", "next_step_uncertain");
  if (!input.execution.context_complete) return defer("gather_context", "host_context_incomplete");
  if (input.needsMoreContext > 1 - partnerAutoAccept) return defer("gather_context", "context_needed_or_uncertain");
  if (input.needsGeneration < partnerAutoAccept) {
    return defer("gather_context", input.needsGeneration <= 1 - partnerAutoAccept ? "generation_not_required" : "generation_need_uncertain");
  }
  if (input.tierConfidence < partnerAutoAccept) return defer("review", "model_tier_uncertain");
  // The closed next-step options leave only continue/retry here.
  return {
    handoff: "partner_model",
    partner_model: { required: true, tier: input.tier, reason_codes: ["generation_required"] },
  };
}
