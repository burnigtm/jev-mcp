import { JevBudgetError } from "./errors.js";

/** Estimated TypeSafe Jev context: all state + questions. */
export const MAX_TOTAL_TOKENS = 64_000;
/** TypeSafe Jev context: state + the longest question. */
export const MAX_STATE_PLUS_LONGEST_QUESTION_TOKENS = 32_000;
/** Choice option cap used by the semantic-find cookbook / jev-mcp community servers. */
export const MAX_CHOICE_OPTIONS = 250;
export const MAX_CANDIDATE_CHARS = 2_000;
export const TRUNCATION_MARKER = "\n…[truncated]";

export function estimateTokens(value: unknown): number {
  const text = stringifyState(value);
  return Math.ceil(text.length / 4);
}

export function truncateText(text: string, maxChars: number): string {
  if (text.length <= maxChars) {
    return text;
  }
  const limit = Math.max(0, Math.floor(maxChars));
  // Reserve marker space before slicing: the returned text must fit the cap.
  const marker = TRUNCATION_MARKER;
  if (limit < marker.length) {
    return marker.slice(0, limit);
  }
  let end = limit - marker.length;
  // Never split a UTF-16 surrogate pair at the truncation boundary.
  if (end > 0 && /[\uD800-\uDBFF]/.test(text[end - 1] ?? "")) end -= 1;
  return `${text.slice(0, end)}${marker}`;
}

export function stringifyState(state: unknown): string {
  if (typeof state === "string") {
    return state;
  }
  if (state === null || state === undefined) {
    return "";
  }
  return JSON.stringify(state);
}

export type Coverage = {
  complete: boolean;
  original_chars: number;
  evaluated_chars: number;
  estimated_tokens: { state: number; questions: number; longest_question: number };
  estimator: "chars/4";
};

export type FitResult = {
  state: unknown;
  truncated: boolean;
  coverage: Coverage;
};

export function fitState(
  state: unknown,
  questions: unknown,
): FitResult {
  const questionsTokens = estimateTokens(questions);
  const longest = longestQuestionTokens(questions);
  const budget = Math.min(
    MAX_TOTAL_TOKENS - questionsTokens,
    MAX_STATE_PLUS_LONGEST_QUESTION_TOKENS - longest,
  );
  if (budget < 0) {
    throw new JevBudgetError("Questions exceed the estimated context budget. Shorten question instructions or criteria, or split the request.");
  }
  const raw = stringifyState(state);
  const tokens = estimateTokens(raw);
  const truncated = tokens > budget;
  const fitted = truncated ? truncateText(raw, budget * 4) : raw;
  return {
    state: truncated ? fitted : state,
    truncated,
    coverage: {
      complete: !truncated,
      original_chars: raw.length,
      evaluated_chars: truncated ? Math.max(0, fitted.length - TRUNCATION_MARKER.length) : raw.length,
      estimated_tokens: { state: estimateTokens(fitted), questions: questionsTokens, longest_question: longest },
      estimator: "chars/4",
    },
  };
}

function longestQuestionTokens(questions: unknown): number {
  if (!questions || typeof questions !== "object") {
    return 0;
  }
  let longest = 0;
  for (const value of Object.values(questions as Record<string, unknown>)) {
    longest = Math.max(longest, estimateTokens(value));
  }
  return longest;
}

export function chunk<T>(items: T[], size: number): T[][] {
  if (size <= 0) {
    return [items];
  }
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}
