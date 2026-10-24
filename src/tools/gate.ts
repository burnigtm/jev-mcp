import { z } from "zod";
import { getConfig } from "../config.js";
import { JevBudgetError } from "../errors.js";
import { chunkedGateVerificationQuestions, chunkQuestions } from "../packs/chunked.js";
import { gateQuestions } from "../packs/gate.js";
import { MAX_CLAIMS } from "../limits.js";
import { confidenceSupportsAuto, tightenJudgmentThresholds, worstAction } from "../policy.js";
import { systemOne, type EvaluateResponse, type ToolContext } from "../typesafe.js";
import { sanitizeUntrustedDocument } from "../untrusted.js";
import { addUsage, chunkedCoverage, chunkedIncomplete, chunkSummaries, mergeReviews, mergeRisks, omittedFiles, reviewFloors, riskFloors, runChunks, singleOrChunked, type ChunkedPlan } from "./chunked.js";
import { contextSchema, judgeContext } from "./context-input.js";
import { chunksOutputShape, reviewReasonSchema, riskOutputSchema } from "./output-schemas.js";
import { projectReview } from "./review.js";
import { dependenciesSchema, fileSchema, projectRisk, riskInputSuspicious, sanitizeDependencies, sanitizeFiles } from "./risk.js";
import { evidenceSchema, projectClaims, summarizeClaims } from "./verify.js";

export const gateInputSchema = z.object({
  request: z.string().describe("What the user asked for; this is not evidence of completion"),
  diff: z.string().describe("Proposed patch, file excerpt, or change summary to review"),
  claims: z.array(z.string().min(1)).min(1).max(MAX_CLAIMS).describe(`Completion claims to check against evidence; at most ${MAX_CLAIMS} per request`),
  evidence: evidenceSchema.describe("Sources that support the claims; include relevant diff or test logs here"),
  tests: z.string().optional().describe("Test output for the patch review"),
  risk: z.boolean().optional().describe("Also run the jev_risk security flags in the same Jev request; default false"),
  files: z.array(fileSchema).max(100).optional().describe("Changed files and change kinds for the security check (risk: true)"),
  dependencies: dependenciesSchema.optional().describe("New or changed external dependencies for the security check (risk: true)"),
  context: contextSchema.optional(),
  auto_accept: z.number().min(0).max(1).optional(),
  review_at: z.number().min(0).max(1).optional(),
  model: z.string().optional(),
});

export type GateInput = z.infer<typeof gateInputSchema>;

const probabilitySchema = z.number().min(0).max(1);
const actionSchema = z.enum(["auto", "review", "escalate"]);
const thresholdsSchema = z.object({ auto_accept: probabilitySchema, review_at: probabilitySchema });
const scoreSchema = z.object({ score: z.number().min(0).max(2), confidence: probabilitySchema });

export const gateReasonCodeSchema = z.enum([
  "accepted",
  "incomplete_context",
  "review_escalated",
  "review_required",
  "claims_contradicted",
  "claims_unsupported",
  "claim_confidence_low",
  "claim_confidence_below_auto_accept",
  "confidence_incoherent",
  "security_review",
  "security_escalated",
]);

const securitySchema = riskOutputSchema.pick({ action: true, flags: true, severity: true, reason_codes: true, thresholds: true });

export const gateOutputSchema = z.object({
  decision_id: z.string().optional(),
  ...chunksOutputShape,
  model: z.string(),
  usage: z.object({ input_tokens: z.number().nonnegative(), output_tokens: z.number().nonnegative() }),
  truncated: z.boolean(),
  coverage: z.object({
    complete: z.boolean(),
    original_chars: z.number().int().nonnegative(),
    evaluated_chars: z.number().int().nonnegative(),
    estimated_tokens: z.object({
      state: z.number().int().nonnegative(),
      questions: z.number().int().nonnegative(),
      longest_question: z.number().int().nonnegative(),
    }),
    estimator: z.literal("chars/4"),
  }),
  action: actionSchema,
  reason_codes: z.array(gateReasonCodeSchema).min(1),
  review: z.object({
    action: actionSchema,
    reason_codes: z.array(reviewReasonSchema).min(1),
    composite: probabilitySchema,
    safe_to_apply: probabilitySchema,
    scores: z.object({
      correctness: scoreSchema,
      spec_match: scoreSchema,
      test_gap: scoreSchema,
      blast_radius: scoreSchema,
    }),
    weights: z.object({
      correctness: z.literal(0.4),
      spec_match: z.literal(0.3),
      test_gap: z.literal(0.15),
      blast_radius: z.literal(0.15),
    }),
    thresholds: thresholdsSchema,
  }),
  verification: z.object({
    action: actionSchema,
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
    })).min(1),
    thresholds: thresholdsSchema,
  }),
  security: securitySchema.optional(),
});

export async function runGate(input: GateInput, context?: ToolContext) {
  if (input.claims.length > MAX_CLAIMS) {
    throw new JevBudgetError(`The completion gate accepts at most ${MAX_CLAIMS} claims per request. Split the claims before gating.`);
  }
  const config = getConfig();
  const { autoAccept, reviewAt } = tightenJudgmentThresholds(input.auto_accept, input.review_at, config.autoAccept, config.reviewAt);
  const risk = input.risk === true;
  // Security mode strips hidden characters, matching the standalone jev_risk projection.
  const diff = risk ? sanitizeUntrustedDocument(input.diff) : input.diff;
  const tests = input.tests === undefined ? "" : risk ? sanitizeUntrustedDocument(input.tests) : input.tests;
  const security = risk ? { files: sanitizeFiles(input.files), dependencies: sanitizeDependencies(input.dependencies) } : {};
  const shown = judgeContext(input.context);
  const callers = shown !== undefined;
  const questions = gateQuestions(input.claims.length, { risk, callers });
  // Oversized state is cut from the tail of the serialized JSON. Keep what every verdict depends on and
  // is small (request, claims, evidence, file list) first, and the bulky diff and test log last.
  const state = { request: input.request, claims: input.claims, evidence: input.evidence, ...security, ...(shown ? { context: shown } : {}), diff, tests };
  const suspicious = risk && riskInputSuspicious(input.diff, input.tests);
  return singleOrChunked(
    {
      diff,
      tests,
      whole: { state, questions },
      base: { request: input.request, ...security, ...(shown ? { context: shown } : {}) },
      questions: chunkQuestions({ review: true, risk, callers }),
    },
    async () => {
      const result = await systemOne({ state, questions, model: input.model }, context);
      return gateOutputSchema.parse(projectGate(result, input.claims, autoAccept, reviewAt, risk ? { suspicious } : undefined));
    },
    planned => runChunkedGate(planned, input, { autoAccept, reviewAt, risk, suspicious, callers }, context),
  );
}

/**
 * A diff too large for one request: the patch is reviewed (and, with `risk`, security-checked) in
 * chunks, and the claims are verified once against the evidence alone, as `jev_verify` would.
 */
async function runChunkedGate(
  first: ChunkedPlan,
  input: GateInput,
  options: { autoAccept: number; reviewAt: number; risk: boolean; suspicious: boolean; callers: boolean },
  context?: ToolContext,
) {
  const { autoAccept, reviewAt, risk, suspicious, callers } = options;
  const [chunked, verification] = await Promise.all([
    runChunks(first, chunkQuestions({ review: true, risk, callers }), input.model, context),
    systemOne({
      state: { request: input.request, claims: input.claims, evidence: input.evidence },
      questions: chunkedGateVerificationQuestions(input.claims.length),
      model: input.model,
    }, context),
  ]);
  const { planned, results: chunkResults } = chunked;
  const chunkIncomplete = chunkedIncomplete(planned, chunkResults);
  const verificationIncomplete = verification.truncated || !verification.coverage.complete;
  const reviews = chunkResults.map(result => projectReview(result, autoAccept, reviewAt));
  const risks = risk
    ? chunkResults.map(result => projectRisk(result, { autoAccept, reviewAt, suspicious, incomplete: result.truncated || !result.coverage.complete }))
    : [];
  const coverage = chunkedCoverage(planned, chunkResults);
  const composed = composeGate({
    model: chunkResults[0]!.model,
    usage: addUsage(chunked.usage, verification.usage),
    truncated: chunkIncomplete || verificationIncomplete,
    coverage: { ...coverage, complete: coverage.complete && !verificationIncomplete },
    incomplete: chunkIncomplete || verificationIncomplete,
    review: mergeReviews(reviews, { floors: reviewFloors(planned.plan.floors), incomplete: chunkIncomplete }),
    results: projectClaims(verification, input.claims, autoAccept, reviewAt),
    ...(risk ? { security: mergeRisks(risks, { floors: riskFloors(planned.plan.floors), incomplete: chunkIncomplete }) } : {}),
    autoAccept,
    reviewAt,
  });
  const actions = reviews.map((part, i) => worstAction([part.action, ...(risks[i] ? [risks[i]!.action] : [])]));
  return gateOutputSchema.parse({
    ...composed,
    chunks: chunkSummaries(planned, actions),
    ...(omittedFiles(planned) ? { omitted_files: omittedFiles(planned) } : {}),
  });
}

/** Deterministic policy after the single shared evaluation has completed. */
export function projectGate(
  result: EvaluateResponse,
  claims: string[],
  autoAccept: number,
  reviewAt: number,
  risk?: { suspicious: boolean },
) {
  const incomplete = result.truncated || !result.coverage.complete;
  return composeGate({
    model: result.model,
    usage: result.usage,
    truncated: result.truncated,
    coverage: result.coverage,
    incomplete,
    review: projectReview(result, autoAccept, reviewAt),
    results: projectClaims(result, claims, autoAccept, reviewAt),
    ...(risk ? { security: projectRisk(result, { autoAccept, reviewAt, suspicious: risk.suspicious, incomplete }) } : {}),
    autoAccept,
    reviewAt,
  });
}

/** The overall gate verdict from a patch review, the claim results and an optional security check. */
function composeGate(parts: {
  model: string;
  usage: EvaluateResponse["usage"];
  truncated: boolean;
  coverage: EvaluateResponse["coverage"];
  incomplete: boolean;
  review: ReturnType<typeof projectReview>;
  results: ReturnType<typeof projectClaims>;
  security?: ReturnType<typeof projectRisk>;
  autoAccept: number;
  reviewAt: number;
}) {
  const { incomplete, review, results, security, autoAccept, reviewAt } = parts;
  const verification = {
    action: worstAction(results.map((item) => item.action)),
    summary: summarizeClaims(results),
    results,
    thresholds: { auto_accept: autoAccept, review_at: reviewAt },
  };
  const action = worstAction([review.action, verification.action, ...(security ? [security.action] : [])]);
  const reasonCodes: Array<z.infer<typeof gateReasonCodeSchema>> = [];
  if (incomplete) reasonCodes.push("incomplete_context");
  if (review.action === "escalate") reasonCodes.push("review_escalated");
  if (review.action === "review") reasonCodes.push("review_required");
  if (verification.summary.contradicted > 0) reasonCodes.push("claims_contradicted");
  if (verification.summary.unsupported > 0) reasonCodes.push("claims_unsupported");
  if (results.some((item) => item.confidence < reviewAt)) reasonCodes.push("claim_confidence_low");
  if (results.some((item) => item.confidence >= reviewAt && item.confidence < autoAccept)) {
    reasonCodes.push("claim_confidence_below_auto_accept");
  }
  if (results.some((item) => item.confidence >= autoAccept && !confidenceSupportsAuto(item.confidence, item.probabilities, autoAccept))) {
    reasonCodes.push("confidence_incoherent");
  }
  if (security?.action === "escalate") reasonCodes.push("security_escalated");
  if (security?.action === "review") reasonCodes.push("security_review");
  if (action === "auto") reasonCodes.push("accepted");
  return {
    model: parts.model,
    usage: parts.usage,
    truncated: parts.truncated,
    coverage: parts.coverage,
    action,
    reason_codes: reasonCodes,
    review,
    verification,
    ...(security ? { security } : {}),
  };
}
