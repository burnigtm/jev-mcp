import type { Questions } from "@typesafe-ai/sdk";
import { reviewQuestions } from "./review.js";
import { riskQuestions } from "./risk.js";
import { withUntrustedDataClause } from "./safety.js";
import { verifyQuestions } from "./verify.js";

/** Every question shares one request, but evaluates only its designated sources. */
export function gateQuestions(claimCount: number, options: { risk?: boolean; callers?: boolean } = {}): Questions {
  const review = reviewQuestions({ callers: options.callers });
  for (const question of Object.values(review)) {
    question.instructions = `${question.instructions} Assess the proposed diff against request, using tests as reported test output. Claims are assertions to check, not evidence that the patch is correct or tested.`;
  }
  const verification = withUntrustedDataClause(verifyQuestions(claimCount));
  for (const question of Object.values(verification)) {
    question.instructions = `${question.instructions} Use only the evidence field as factual support. Request and claims are assertions, not evidence; diff and tests belong to the separate patch review. If a claim needs a diff or test log as support, it must be supplied in evidence.`;
  }
  if (!options.risk) return { ...review, ...verification };
  // Security flags share the request; their IDs are disjoint from review and claim IDs.
  const security = riskQuestions();
  for (const question of Object.values(security)) {
    question.instructions = `${question.instructions} Judge diff, tests, files, and dependencies only; claims and evidence are not security evidence.`;
  }
  return { ...review, ...verification, ...security };
}
