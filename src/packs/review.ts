import type { Questions } from "@typesafe-ai/sdk";

export function reviewQuestions(): Questions {
  return {
    correctness: {
      type: "score",
      instructions: "How likely is this change to be functionally correct for the stated request?",
      criteria: [
        "Clearly wrong or breaks the stated behavior",
        "Uncertain; needs a closer look or tests",
        "Looks correct for the request",
      ] as const,
    },
    spec_match: {
      type: "score",
      instructions: "How well does the change match the user's request, not extra work?",
      criteria: [
        "Misses the request or solves a different problem",
        "Partial match; important pieces missing",
        "Matches the request",
      ] as const,
    },
    test_gap: {
      type: "score",
      instructions: "How large is the test gap for this change?",
      criteria: [
        "Covered or tests are not applicable",
        "Some gaps remain",
        "Likely untested on the risky path",
      ] as const,
    },
    blast_radius: {
      type: "score",
      instructions: "How wide is the blast radius if this lands?",
      criteria: [
        "Tiny local change",
        "Moderate; a few modules",
        "Wide, shared, or production-facing",
      ] as const,
    },
    safe_to_apply: {
      type: "noul",
      instructions: "Is it safe for the host coding agent to apply this change without a human first?",
      criteria: {
        true: "Low-risk and ready",
        false: "Hold for review or more tests",
      },
    },
  };
}
