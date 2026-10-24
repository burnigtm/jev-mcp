import { z } from "zod";
import { getConfig } from "../config.js";
import { chunkQuestions } from "../packs/chunked.js";
import { riskQuestions, RISK_FLAGS } from "../packs/risk.js";
import { acceptableRegionConfidence, probabilitySupportsAbsence, requireCompleteContext, riskAction, tightenJudgmentThresholds, type PolicyAction } from "../policy.js";
import { asNoul, asScore } from "../result.js";
import { systemOne, type EvaluateResponse, type ToolContext } from "../typesafe.js";
import { containsInjectionInstruction, sanitizeJudgeText, sanitizeUntrustedDocument } from "../untrusted.js";
import { chunkedCoverage, chunkedIncomplete, chunkSummaries, mergeRisks, omittedFiles, riskFloors, runChunks, singleOrChunked, type ChunkedPlan } from "./chunked.js";
import { contextSchema, judgeContext } from "./context-input.js";
import { riskOutputSchema, riskReasonSchema } from "./output-schemas.js";

export const fileSchema = z.object({
  path: z.string().min(1).max(2_000),
  change: z.string().max(200).optional(),
});

export const dependenciesSchema = z.array(z.string().min(1).max(256)).max(50);

export const riskInputSchema = z.object({
  request: z.string().min(1).describe("What the user asked for; assertions in the request are not evidence"),
  diff: z.string().min(1).describe("Proposed patch or file excerpt to assess"),
  tests: z.string().optional().describe("Test output that supports or challenges the patch"),
  files: z.array(fileSchema).max(100).optional().describe("Changed files and host-supplied change kinds"),
  dependencies: dependenciesSchema.optional().describe("New or changed external dependencies"),
  context: contextSchema.optional(),
  auto_accept: z.number().min(0).max(1).optional(),
  review_at: z.number().min(0).max(1).optional(),
  model: z.string().optional(),
});

export type RiskInput = z.infer<typeof riskInputSchema>;
type RiskReason = z.infer<typeof riskReasonSchema>;

export async function runRisk(input: RiskInput, context?: ToolContext) {
  const config = getConfig();
  const { autoAccept, reviewAt } = tightenJudgmentThresholds(input.auto_accept, input.review_at, config.autoAccept, config.reviewAt);
  const diff = sanitizeUntrustedDocument(input.diff);
  const tests = input.tests === undefined ? "" : sanitizeUntrustedDocument(input.tests);
  const files = sanitizeFiles(input.files);
  const dependencies = sanitizeDependencies(input.dependencies);
  const suspicious = riskInputSuspicious(input.diff, input.tests);

  const shown = judgeContext(input.context);
  const state = {
    request: input.request,
    ...(shown ? { context: shown } : {}),
    diff,
    tests,
    files,
    dependencies,
  };
  return singleOrChunked(
    {
      diff,
      tests,
      whole: { state, questions: riskQuestions() },
      base: { request: input.request, ...(shown ? { context: shown } : {}), files, dependencies },
      questions: chunkQuestions({ review: false, risk: true }),
    },
    async () => {
      const result = await systemOne({ state, questions: riskQuestions(), model: input.model }, context);
      const incomplete = result.truncated || !result.coverage.complete;
      return riskOutputSchema.parse({
        model: result.model,
        usage: result.usage,
        truncated: result.truncated,
        coverage: result.coverage,
        ...projectRisk(result, { autoAccept, reviewAt, suspicious, incomplete }),
      });
    },
    planned => runChunkedRisk(planned, input, { autoAccept, reviewAt, suspicious }, context),
  );
}

async function runChunkedRisk(
  first: ChunkedPlan,
  input: RiskInput,
  options: { autoAccept: number; reviewAt: number; suspicious: boolean },
  context?: ToolContext,
) {
  const { planned, results, usage } = await runChunks(first, chunkQuestions({ review: false, risk: true }), input.model, context);
  const parts = results.map(result => projectRisk(result, { ...options, incomplete: result.truncated || !result.coverage.complete }));
  const incomplete = chunkedIncomplete(planned, results);
  const merged = mergeRisks(parts, { floors: riskFloors(planned.plan.floors), incomplete });
  return riskOutputSchema.parse({
    model: results[0]!.model,
    usage,
    truncated: incomplete,
    coverage: chunkedCoverage(planned, results),
    ...merged,
    chunks: chunkSummaries(planned, parts.map(part => part.action)),
    ...(omittedFiles(planned) ? { omitted_files: omittedFiles(planned) } : {}),
  });
}

export function sanitizeFiles(files: Array<z.infer<typeof fileSchema>> | undefined) {
  return (files ?? []).map((file) => ({
    path: sanitizeJudgeText(file.path, 2_000),
    change: file.change === undefined ? "" : sanitizeJudgeText(file.change, 200),
  }));
}

export function sanitizeDependencies(dependencies: string[] | undefined): string[] {
  return (dependencies ?? []).map((dependency) => sanitizeJudgeText(dependency, 256));
}

export function riskInputSuspicious(diff: string, tests: string | undefined): boolean {
  return containsInjectionInstruction(diff) || (tests !== undefined && containsInjectionInstruction(tests));
}

/** Shared security policy for the standalone risk tool and the risk-aware gate. */
export function projectRisk(
  result: EvaluateResponse,
  options: { autoAccept: number; reviewAt: number; suspicious: boolean; incomplete: boolean },
) {
  const { autoAccept, reviewAt, suspicious, incomplete } = options;
  const flags = Object.fromEntries(RISK_FLAGS.map((flag) => [flag, asNoul(result.answers[flag]).noul])) as Record<string, number>;
  const severity = asScore(result.answers.severity);
  let policy: PolicyAction = riskAction({
    flags,
    severityScore: severity.score,
    severityConfidence: severity.confidence,
    severityProbabilities: severity.probabilities,
    autoAccept,
    reviewAt,
  });
  if (policy === "auto" && suspicious) policy = "review";
  const action = requireCompleteContext(policy, incomplete);

  const reasons: RiskReason[] = [];
  if ((flags.authorization ?? 0) >= reviewAt) reasons.push("authorization_concern");
  if ((flags.input_validation ?? 0) >= reviewAt) reasons.push("validation_concern");
  if ((flags.secret_exposure ?? 0) >= reviewAt) reasons.push("secret_exposure");
  if ((flags.data_loss ?? 0) >= reviewAt) reasons.push("data_loss");
  if ((flags.concurrency ?? 0) >= reviewAt) reasons.push("concurrency_concern");
  if ((flags.dependency ?? 0) >= reviewAt) reasons.push("dependency_concern");
  if ((flags.external_effect ?? 0) >= reviewAt) reasons.push("external_effect");
  if (severity.score >= 1.5) reasons.push("severity_review");
  else if (acceptableRegionConfidence(severity.probabilities, 1) < autoAccept) reasons.push("severity_uncertain");
  if (suspicious) reasons.push("injection_suspected");
  // A flag below review_at that is not confidently absent still blocks auto; name it.
  if (Object.values(flags).some((p) => p < reviewAt && !probabilitySupportsAbsence(p, autoAccept))) reasons.push("concern_uncertain");
  if (incomplete) reasons.push("incomplete_context");
  if (action === "auto") {
    reasons.length = 0;
    reasons.push("accepted");
  } else if (reasons.length === 0) {
    reasons.push("review_required");
  }

  return {
    action,
    flags,
    severity: {
      score: severity.score,
      confidence: severity.confidence,
      probabilities: severity.probabilities,
      legend: severity.legend,
    },
    reason_codes: reasons,
    thresholds: { auto_accept: autoAccept, review_at: reviewAt },
  };
}
