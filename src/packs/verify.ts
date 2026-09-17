import type { Questions } from "@typesafe-ai/sdk";

export const VERIFY_CRITERIA = {
  verified: "The evidence clearly supports the claim",
  contradicted: "The evidence contradicts the claim",
  unsupported: "The evidence neither supports nor contradicts the claim",
} as const;

export function verifyQuestions(claimCount: number): Questions {
  const questions: Questions = {};
  for (let i = 0; i < claimCount; i += 1) {
    questions[`claim_${i}`] = {
      type: "choice",
      instructions: `Does the evidence support claims[${i}]? Judge only from the provided evidence, not world knowledge.`,
      criteria: { ...VERIFY_CRITERIA },
    };
  }
  return questions;
}
