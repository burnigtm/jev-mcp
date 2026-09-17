/** TypeSafe Jev context: all state + questions. */
export const MAX_TOTAL_TOKENS = 64_000;
/** TypeSafe Jev context: state + the longest question. */
export const MAX_STATE_PLUS_LONGEST_QUESTION_TOKENS = 32_000;
/** Choice option cap used by the semantic-find cookbook / jev-mcp community servers. */
export const MAX_CHOICE_OPTIONS = 250;
export const MAX_CANDIDATE_CHARS = 2_000;

export function estimateTokens(value: unknown): number {
  const text = typeof value === "string" ? value : JSON.stringify(value);
  return Math.ceil(text.length / 4);
}

export function truncateText(text: string, maxChars: number): string {
  if (text.length <= maxChars) {
    return text;
  }
  return `${text.slice(0, maxChars)}\n…[truncated ${text.length - maxChars} chars]`;
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

export type FitResult = {
  state: unknown;
  truncated: boolean;
};

export function fitState(
  state: unknown,
  questions: unknown,
): FitResult {
  const questionsTokens = estimateTokens(questions);
  const budget = Math.min(
    MAX_TOTAL_TOKENS - questionsTokens,
    MAX_STATE_PLUS_LONGEST_QUESTION_TOKENS - longestQuestionTokens(questions),
  );
  const safeBudget = Math.max(256, budget);
  const raw = stringifyState(state);
  const tokens = estimateTokens(raw);
  if (tokens <= safeBudget) {
    return { state, truncated: false };
  }
  const maxChars = safeBudget * 4;
  return { state: truncateText(raw, maxChars), truncated: true };
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
