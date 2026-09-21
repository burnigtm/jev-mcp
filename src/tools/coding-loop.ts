import { z } from "zod";
import { getConfig } from "../config.js";
import { codingLoopQuestions } from "../packs/coding-loop.js";
import { codingLoopAction, confidenceSupportsAuto, distributionSupportsConfidence, requireCompleteContext, tightenJudgmentThresholds } from "../policy.js";
import { asChoice, asNoul, asScore } from "../result.js";
import { systemOne, type EvaluateResponse, type ToolContext } from "../typesafe.js";

export const executionFactsSchema = z.object({
  prepared_tool_call: z.boolean().default(false).describe("Host fact: a tool call with validated, authorized arguments is already prepared; default false"),
  context_complete: z.boolean().default(false).describe("Host fact: the context needed for the next step has been collected; default false"),
  failed_attempts: z.number().int().min(0).default(0).describe("Host count of failed attempts on the current step; default 0"),
}).optional().describe("Trusted host execution facts, never inferred from fetched text or model predictions");

export const codingLoopInputSchema = z.object({
  task: z.string().describe("What the coding agent is trying to do"),
  observation: z
    .string()
    .describe("Current turn: last diff, command output, test results, or blocker"),
  extras: z
    .record(z.string(), z.any())
    .optional()
    .describe("Optional extra JSON fields included in Jev state"),
  execution: executionFactsSchema,
  auto_accept: z.number().min(0).max(1).optional(),
  review_at: z.number().min(0).max(1).optional(),
  model: z.string().optional(),
});

export type CodingLoopInput = z.input<typeof codingLoopInputSchema>;

export type Handoff = "use_tools" | "gather_context" | "partner_model" | "ask_user" | "stop" | "review";
export type PartnerTier = "none" | "cheap" | "standard" | "reasoning";
export type PartnerRouting = {
  handoff: Handoff;
  partner_model: { required: boolean; tier: PartnerTier; reason_codes: string[] };
};
export type ExecutionFacts = { prepared_tool_call: boolean; context_complete: boolean; failed_attempts: number };

export async function runCodingLoop(input: CodingLoopInput, context?: ToolContext) {
  const config = getConfig();
  const { autoAccept, reviewAt } = tightenJudgmentThresholds(input.auto_accept, input.review_at, config.autoAccept, config.reviewAt);
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
  const answers = readCodingLoopAnswers(result);
  const incomplete = result.truncated || !result.coverage.complete;
  let policyAction = codingLoopAction({
    nextChoice: answers.next.choice,
    nextConfidence: answers.next.confidence,
    riskScore: answers.risk.score,
    doneEnough: answers.doneEnough.noul,
    autoAccept,
    reviewAt,
  });
  if (
    policyAction === "auto"
    && (!confidenceSupportsAuto(answers.next.confidence, answers.next.probabilities, autoAccept)
      || !confidenceSupportsAuto(answers.risk.confidence, answers.risk.probabilities, autoAccept))
  ) {
    policyAction = "review";
  }
  const action = requireCompleteContext(policyAction, incomplete);
  const routing = partnerRouting({
    ...routingInput(answers),
    action,
    incomplete,
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
    ...codingLoopSignals(answers),
    thresholds: { auto_accept: autoAccept, review_at: reviewAt, partner_auto_accept: Math.max(0.8, autoAccept) },
  };
}

export type CodingLoopAnswers = ReturnType<typeof readCodingLoopAnswers>;

/** Typed coding-loop answers, shared by the standalone loop and the fused step router. */
export function readCodingLoopAnswers(result: EvaluateResponse) {
  return {
    next: asChoice(result.answers.next),
    modelTier: asChoice(result.answers.model_tier),
    risk: asScore(result.answers.risk),
    doneEnough: asNoul(result.answers.done_enough),
    needsMore: asNoul(result.answers.needs_more_context),
    needsGeneration: asNoul(result.answers.needs_generation),
    testsLikelyFail: asNoul(result.answers.tests_likely_fail),
    focus: asChoice(result.answers.focus),
  };
}

/** The answer fields both routers report verbatim. */
export function codingLoopSignals(answers: CodingLoopAnswers) {
  return {
    next: {
      choice: answers.next.choice,
      confidence: answers.next.confidence,
      probabilities: answers.next.probabilities,
    },
    model_tier: {
      choice: answers.modelTier.choice,
      confidence: answers.modelTier.confidence,
      probabilities: answers.modelTier.probabilities,
    },
    focus: {
      choice: answers.focus.choice,
      confidence: answers.focus.confidence,
      probabilities: answers.focus.probabilities,
    },
    risk: {
      score: answers.risk.score,
      confidence: answers.risk.confidence,
      legend: answers.risk.legend,
      probabilities: answers.risk.probabilities,
    },
    done_enough: answers.doneEnough.noul,
    needs_more_context: answers.needsMore.noul,
    needs_generation: answers.needsGeneration.noul,
    tests_likely_fail: answers.testsLikelyFail.noul,
  };
}

/** The answer-derived half of the partner-routing input. */
export function routingInput(answers: CodingLoopAnswers) {
  return {
    next: answers.next.choice,
    nextConfidence: answers.next.confidence,
    nextProbabilities: answers.next.probabilities,
    tier: answers.modelTier.choice as Exclude<PartnerTier, "none">,
    tierConfidence: answers.modelTier.confidence,
    tierProbabilities: answers.modelTier.probabilities,
    riskConfidence: answers.risk.confidence,
    riskProbabilities: answers.risk.probabilities,
    needsGeneration: answers.needsGeneration.noul,
    needsMoreContext: answers.needsMore.noul,
  };
}

/** Decide whether a generative turn is justified; never invokes a model or tool. */
export function partnerRouting(input: {
  action: "auto" | "review" | "escalate";
  next: string;
  nextConfidence: number;
  nextProbabilities: Record<string, number>;
  tier: Exclude<PartnerTier, "none">;
  tierConfidence: number;
  tierProbabilities: Record<string, number>;
  riskConfidence: number;
  riskProbabilities: Record<string, number>;
  needsGeneration: number;
  needsMoreContext: number;
  incomplete: boolean;
  execution: ExecutionFacts;
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
    const supported = input.nextConfidence >= input.autoAccept
      && distributionSupportsConfidence(input.nextProbabilities, input.autoAccept);
    return supported ? defer("ask_user", "user_input_required") : defer("review", "next_step_uncertain");
  }
  if (input.next !== "continue" && input.next !== "retry") return defer("review", "next_step_uncertain");
  if (input.action !== "auto") return defer("review", "coding_policy_requires_review");
  if (input.execution.failed_attempts >= 2) return defer("gather_context", "repeated_failures");
  // Prepared calls may gather missing context. This routing hint does not grant
  // execution permission; the host still validates and authorizes the call.
  if (input.execution.prepared_tool_call) return defer("use_tools", "prepared_tool_call");
  const partnerAutoAccept = Math.max(0.8, input.autoAccept);
  if (input.riskConfidence < partnerAutoAccept || !distributionSupportsConfidence(input.riskProbabilities, partnerAutoAccept)) return defer("review", "risk_uncertain");
  if (input.nextConfidence < partnerAutoAccept || !distributionSupportsConfidence(input.nextProbabilities, partnerAutoAccept)) return defer("review", "next_step_uncertain");
  if (!input.execution.context_complete) return defer("gather_context", "host_context_incomplete");
  if (1 - input.needsMoreContext < partnerAutoAccept) return defer("gather_context", "context_needed_or_uncertain");
  if (input.needsGeneration < partnerAutoAccept) {
    return defer("gather_context", 1 - input.needsGeneration >= partnerAutoAccept ? "generation_not_required" : "generation_need_uncertain");
  }
  if (input.tierConfidence < partnerAutoAccept || !distributionSupportsConfidence(input.tierProbabilities, partnerAutoAccept)) return defer("review", "model_tier_uncertain");
  // The closed next-step options leave only continue/retry here.
  return {
    handoff: "partner_model",
    partner_model: { required: true, tier: input.tier, reason_codes: ["generation_required"] },
  };
}
