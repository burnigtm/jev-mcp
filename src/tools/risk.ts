import { z } from "zod";
import { getConfig } from "../config.js";
import { riskQuestions, RISK_FLAGS } from "../packs/risk.js";
import { requireCompleteContext, riskAction, tightenJudgmentThresholds, type PolicyAction } from "../policy.js";
import { asNoul, asScore } from "../result.js";
import { systemOne, type ToolContext } from "../typesafe.js";
import { containsInjectionInstruction, sanitizeJudgeText, sanitizeUntrustedDocument } from "../untrusted.js";
import { riskOutputSchema, riskReasonSchema } from "./output-schemas.js";

const fileSchema = z.object({
  path: z.string().min(1).max(2_000),
  change: z.string().max(200).optional(),
});

export const riskInputSchema = z.object({
  request: z.string().min(1).describe("What the user asked for; assertions in the request are not evidence"),
  diff: z.string().min(1).describe("Proposed patch or file excerpt to assess"),
  tests: z.string().optional().describe("Test output that supports or challenges the patch"),
  files: z.array(fileSchema).max(100).optional().describe("Changed files and host-supplied change kinds"),
  dependencies: z.array(z.string().min(1).max(256)).max(50).optional().describe("New or changed external dependencies"),
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
  const files = (input.files ?? []).map((file) => ({
    path: sanitizeJudgeText(file.path, 2_000),
    change: file.change === undefined ? "" : sanitizeJudgeText(file.change, 200),
  }));
  const dependencies = (input.dependencies ?? []).map((dependency) => sanitizeJudgeText(dependency, 256));
  const suspicious = containsInjectionInstruction(input.diff)
    || (input.tests !== undefined && containsInjectionInstruction(input.tests));

  const result = await systemOne({
    state: {
      request: input.request,
      diff,
      tests,
      files,
      dependencies,
    },
    questions: riskQuestions(),
    model: input.model,
  }, context);

  const flags = Object.fromEntries(RISK_FLAGS.map((flag) => [flag, asNoul(result.answers[flag]).noul])) as Record<string, number>;
  const severity = asScore(result.answers.severity);
  const incomplete = result.truncated || !result.coverage.complete;
  let policy: PolicyAction = riskAction({
    flags,
    severityScore: severity.score,
    severityConfidence: severity.confidence,
    severityProbabilities: severity.probabilities,
    autoAccept,
    reviewAt,
  });
  if (policy === "auto" && suspicious) policy = "review";
  const actionPolicy = requireCompleteContext(policy, incomplete);

  const reasons: RiskReason[] = [];
  if ((flags.authorization ?? 0) >= reviewAt) reasons.push("authorization_concern");
  if ((flags.input_validation ?? 0) >= reviewAt) reasons.push("validation_concern");
  if ((flags.secret_exposure ?? 0) >= reviewAt) reasons.push("secret_exposure");
  if ((flags.data_loss ?? 0) >= reviewAt) reasons.push("data_loss");
  if ((flags.concurrency ?? 0) >= reviewAt) reasons.push("concurrency_concern");
  if ((flags.dependency ?? 0) >= reviewAt) reasons.push("dependency_concern");
  if ((flags.external_effect ?? 0) >= reviewAt) reasons.push("external_effect");
  if (severity.score >= 1.5) reasons.push("severity_review");
  if (suspicious) reasons.push("injection_suspected");
  if (incomplete) reasons.push("incomplete_context");
  if (actionPolicy === "auto") {
    reasons.length = 0;
    reasons.push("accepted");
  } else if (reasons.length === 0) {
    reasons.push("review_required");
  }

  return riskOutputSchema.parse({
    model: result.model,
    usage: result.usage,
    truncated: result.truncated,
    coverage: result.coverage,
    action: actionPolicy,
    flags,
    severity: {
      score: severity.score,
      confidence: severity.confidence,
      probabilities: severity.probabilities,
      legend: severity.legend,
    },
    reason_codes: reasons,
    thresholds: { auto_accept: autoAccept, review_at: reviewAt },
  });
}
