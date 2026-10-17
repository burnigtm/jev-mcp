import { truncateText } from "./limits.js";

/** C0/C1 controls, zero-width characters, and Unicode bidi overrides. */
const UNSAFE_TEXT = /[\u0000-\u001F\u007F-\u009F\u200B-\u200F\u202A-\u202E\u2066-\u2069]/g;

export const MAX_JUDGE_ID_CHARS = 256;
export const MAX_JUDGE_NAME_CHARS = 128;
export const MAX_JUDGE_KEY_CHARS = 64;

/**
 * Project untrusted metadata into the judge's state without allowing invisible
 * controls or unbounded text to carry instructions. Returned/executed values
 * keep their original form; only the provider projection is normalized.
 */
export function sanitizeJudgeText(value: string, maxChars: number): string {
  const normalized = value.replace(UNSAFE_TEXT, " ").replace(/\s+/g, " ").trim();
  return truncateText(normalized, maxChars);
}
