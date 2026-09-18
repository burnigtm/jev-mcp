import { z } from "zod";
import { getConfig } from "../config.js";
import { JevValidationError } from "../errors.js";
import { stepQuestions } from "../packs/step.js";
import {
  codingLoopAction,
  distributionSupportsConfidence,
  requireCompleteContext,
  validatePolicyThresholds,
  worstAction,
  type PolicyAction,
} from "../policy.js";
import { asChoice, asNoul } from "../result.js";
import { systemOne, withToolContext, type ToolContext } from "../typesafe.js";
import {
  codingLoopSignals,
  executionFactsSchema,
  partnerRouting,
  readCodingLoopAnswers,
  routingInput,
  type ExecutionFacts,
  type Handoff,
  type PartnerTier,
} from "./coding-loop.js";
import {
  argumentsSchema,
  coverageSchema,
  ineligibility,
  probability,
  reasonSchema,
  toolCandidateSchema,
  usageSchema,
  type Reason,
  type ToolCandidate,
} from "./tool-route.js";

export const stepInputSchema = z.object({
  task: z.string().min(1).describe("What the coding agent is trying to do"),
  observation: z.string().describe("Current turn: last diff, command output, test results, or blocker"),
  extras: z.record(z.string(), z.any()).optional().describe("Optional extra JSON fields included in Jev state"),
  execution: executionFactsSchema,
  candidates: z.array(toolCandidateSchema).max(32).optional().describe("Up to 32 host-prepared calls to choose from. Omit when none is prepared; ineligible candidates are filtered locally and never reach Jev."),
  auto_accept: z.number().min(0).max(1).optional(),
  review_at: z.number().min(0).max(1).optional(),
  model: z.string().optional(),
}).superRefine((input, context) => {
  const seen = new Set<string>();
  (input.candidates ?? []).forEach((candidate, index) => {
    if (seen.has(candidate.id)) context.addIssue({ code: "custom", path: ["candidates", index, "id"], message: "Candidate IDs must be unique" });
    seen.add(candidate.id);
  });
});

export type StepInput = z.input<typeof stepInputSchema>;

const stepReasonSchema = z.enum([...reasonSchema.options, "routing_blocked_dispatch"]);
type StepReason = z.infer<typeof stepReasonSchema>;
const choiceAnswerSchema = z.object({
  choice: z.string(),
  confidence: probability,
  probabilities: z.record(z.string(), probability),
});

export const stepOutputSchema = z.object({
  model: z.string(),
  usage: usageSchema,
  truncated: z.boolean(),
  coverage: coverageSchema,
  action: z.enum(["auto", "review", "escalate"]),
  handoff: z.enum(["execute_tool", "use_tools", "gather_context", "partner_model", "ask_user", "stop", "review"]),
  call: z.object({ candidate_id: z.string(), name: z.string(), arguments: argumentsSchema }).nullable(),
  partner_model: z.object({
    required: z.boolean(),
    tier: z.enum(["none", "cheap", "standard", "reasoning"]),
    reason_codes: z.array(z.string()),
  }),
  selection: z.object({ id: z.string().nullable(), confidence: probability, suitability: probability.nullable() }).nullable(),
  blocked_candidates: z.array(z.object({ id: z.string(), reason_codes: z.array(reasonSchema).min(1) })),
  reason_codes: z.array(stepReasonSchema).min(1),
  next: choiceAnswerSchema,
  model_tier: choiceAnswerSchema,
  focus: choiceAnswerSchema,
  risk: z.object({
    score: z.number().min(0),
    confidence: probability,
    legend: z.record(z.string(), z.unknown()),
    probabilities: z.record(z.string(), probability),
  }),
  done_enough: probability,
  needs_more_context: probability,
  needs_generation: probability,
  tests_likely_fail: probability,
  thresholds: z.object({ auto_accept: probability, review_at: probability, dispatch_at: probability }),
});

type StepHandoff = Handoff | "execute_tool";

/** Route the coding step and select a prepared call in one Jev request. */
export async function runStep(rawInput: StepInput, context?: ToolContext) {
  return withToolContext(context, async scoped => {
    const parsed = stepInputSchema.safeParse(rawInput);
    if (!parsed.success) throw new JevValidationError(parsed.error.message);
    const input = parsed.data;
    const config = getConfig();
    const autoAccept = input.auto_accept ?? config.autoAccept;
    const reviewAt = input.review_at ?? config.reviewAt;
    validatePolicyThresholds(autoAccept, reviewAt);
    // Routing an executable call and buying a partner turn share one fixed floor,
    // even when callers lower their judgment thresholds.
    const dispatchAt = Math.max(0.8, autoAccept);
    const execution: ExecutionFacts = {
      prepared_tool_call: input.execution?.prepared_tool_call ?? false,
      context_complete: input.execution?.context_complete ?? false,
      failed_attempts: input.execution?.failed_attempts ?? 0,
    };
    const supplied = input.candidates ?? [];
    const blocked: Array<{ id: string; reason_codes: Reason[] }> = [];
    const eligible = supplied.filter(candidate => {
      const reasons = ineligibility(candidate);
      if (reasons.length) blocked.push({ id: candidate.id, reason_codes: reasons });
      return reasons.length === 0;
    });

    // One request answers both recipes; ineligible candidates get no question.
    const result = await systemOne({
      state: {
        task: input.task,
        observation: input.observation,
        extras: input.extras ?? {},
        execution,
        candidates: eligible,
      },
      questions: stepQuestions(eligible.length),
      model: input.model,
    }, scoped);

    const incomplete = result.truncated || !result.coverage.complete;
    const answers = readCodingLoopAnswers(result);
    const action = requireCompleteContext(codingLoopAction({
      nextChoice: answers.next.choice,
      nextConfidence: answers.next.confidence,
      riskScore: answers.risk.score,
      doneEnough: answers.doneEnough.noul,
      autoAccept,
      reviewAt,
    }), incomplete);

    // Selection policy matches jev_tool_route, including its dispatch floor.
    const reasons: StepReason[] = [];
    if (incomplete) reasons.push("incomplete_context");
    let selection: { id: string | null; confidence: number; suitability: number | null } | null = null;
    let candidate: ToolCandidate | undefined;
    let needsReview = false;
    if (!supplied.length) {
      reasons.push("no_candidates");
    } else if (!eligible.length) {
      reasons.push("no_eligible_candidates");
    } else {
      const selected = asChoice(result.answers.selected);
      const index = eligible.findIndex((_candidate, i) => selected.choice === `call_${i}`);
      candidate = eligible[index];
      const suitability = candidate ? asNoul(result.answers[`suitable_${index}`]).noul : null;
      selection = { id: candidate?.id ?? null, confidence: selected.confidence, suitability };
      if (selected.confidence < dispatchAt || !distributionSupportsConfidence(selected.probabilities, dispatchAt)) reasons.push("selection_uncertain");
      if (!candidate) reasons.push("no_suitable_call");
      if (suitability !== null && suitability < dispatchAt) reasons.push("suitability_uncertain");
      needsReview = candidate?.effect === "external_write" || candidate?.effect === "destructive";
      if (needsReview) reasons.push("effect_requires_review");
    }
    const dispatchable = Boolean(candidate) && reasons.length === 0;
    // Judge the selection before routing appends its own reason codes.
    const selectionVerdict = selectionAction(selection, reasons, reviewAt);

    const routing = partnerRouting({
      ...routingInput(answers),
      action,
      incomplete,
      // A dispatchable call is a prepared call, so coding policy defers to tools
      // exactly as it does for a host-declared one.
      execution: { ...execution, prepared_tool_call: dispatchable || execution.prepared_tool_call },
      autoAccept,
    });

    let handoff: StepHandoff = routing.handoff;
    let partnerModel: { required: boolean; tier: PartnerTier; reason_codes: string[] } = routing.partner_model;
    let call: { candidate_id: string; name: string; arguments: unknown } | null = null;
    if (dispatchable && candidate && routing.handoff === "use_tools") {
      handoff = "execute_tool";
      call = { candidate_id: candidate.id, name: candidate.name, arguments: candidate.arguments };
    } else if (dispatchable) {
      // Terminal, risky, uncertain, or repeatedly failing steps outrank a call.
      reasons.push("routing_blocked_dispatch");
    } else if (routing.partner_model.required && declinedForUncertainty(reasons)) {
      // Prepared candidates that Jev would not confidently select are evidence
      // about selection, not a reason to buy a generative turn. The equivalent
      // two-call flow sets execution.prepared_tool_call and stops at use_tools.
      handoff = needsReview ? "review" : "gather_context";
      partnerModel = { required: false, tier: "none", reason_codes: ["prepared_candidates_declined"] };
    }
    // A selected external or destructive call needs review, as in jev_tool_route.
    // Terminal, tool, and partner handoffs still outrank that.
    if (needsReview && handoff === "gather_context") handoff = "review";
    if (!reasons.length) reasons.push("accepted");

    return stepOutputSchema.parse({
      model: result.model,
      usage: result.usage,
      truncated: result.truncated,
      coverage: result.coverage,
      action: worstAction([action, selectionVerdict]),
      handoff,
      call,
      partner_model: partnerModel,
      selection,
      blocked_candidates: blocked,
      reason_codes: reasons,
      ...codingLoopSignals(answers),
      thresholds: { auto_accept: autoAccept, review_at: reviewAt, dispatch_at: dispatchAt },
    });
  });
}

/** Jev declined the prepared calls without confidently ruling them all out. */
function declinedForUncertainty(reasons: StepReason[]): boolean {
  return reasons.some(reason =>
    reason === "selection_uncertain" || reason === "suitability_uncertain" || reason === "effect_requires_review");
}

/**
 * An uncertain or policy-blocked selection cannot leave the step on `auto`. A
 * confident `none` is a clean judgment, so it keeps the coding-loop action.
 */
function selectionAction(
  selection: { confidence: number; suitability: number | null } | null,
  reasons: StepReason[],
  reviewAt: number,
): PolicyAction {
  if (!selection) return "auto";
  if (selection.confidence < reviewAt || (selection.suitability !== null && selection.suitability < reviewAt)) return "escalate";
  return declinedForUncertainty(reasons) ? "review" : "auto";
}
