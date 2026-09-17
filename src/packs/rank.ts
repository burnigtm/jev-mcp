import type { Questions } from "@typesafe-ai/sdk";
import { MAX_CANDIDATE_CHARS, truncateText } from "../limits.js";

export type RankCandidate = {
  id: string;
  text: string;
};

export function rankQuestions(query: string, candidates: RankCandidate[]): Questions {
  const criteria: Record<string, string> = {};
  for (const candidate of candidates) {
    criteria[candidate.id] = truncateText(candidate.text, MAX_CANDIDATE_CHARS);
  }
  return {
    best: {
      type: "choice",
      instructions: `Which candidate best answers this query: ${query}`,
      criteria,
    },
    exists: {
      type: "noul",
      instructions:
        "Does any candidate actually address the query, or is the top hit a forced winner among poor options?",
      criteria: {
        true: "At least one candidate answers the query",
        false: "None of the candidates address the query",
      },
    },
  };
}

export function existsVerdict(exists: number): "answered" | "partial" | "absent" {
  if (exists >= 0.75) {
    return "answered";
  }
  if (exists >= 0.4) {
    return "partial";
  }
  return "absent";
}
