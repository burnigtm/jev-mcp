import { truncateText } from "./limits.js";

/** C0/C1 controls, zero-width characters, and Unicode bidi overrides. */
const UNSAFE_TEXT = /[\u0000-\u001F\u007F-\u009F\u200B-\u200F\u202A-\u202E\u2066-\u2069]/g;

/** Preserve \t, \n, and \r for logs/diffs while stripping hidden characters. */
const UNSAFE_DOCUMENT_TEXT = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u200B-\u200F\u202A-\u202E\u2066-\u2069]/g;

/** High-signal phrases that survive paraphrasing; a deterministic backstop only. */
const INJECTION_PATTERN = /(?:ignore|disregard|forget)\s+(?:all\s+)?(?:the\s+)?(?:previous|prior|above)\s+(?:instructions?|prompts?|rules?)|system\s+note\s+for\s+(?:the\s+)?(?:ai|assistant|model)|append\s+your\s+system\s+prompt|jailbreak|developer\s+(?:override|mode)|you\s+are\s+now\s+(?:an?\s+)?(?:ai|assistant|model)/i;

export const MAX_JUDGE_ID_CHARS = 256;
export const MAX_JUDGE_NAME_CHARS = 128;
export const MAX_JUDGE_KEY_CHARS = 64;

/** Remove invisible/adversarial characters without truncating. */
export function stripUnsafeText(value: string): string {
  return value.replace(UNSAFE_TEXT, " ");
}

/** Strip invisible characters while preserving newlines for logs and diffs. */
export function sanitizeUntrustedDocument(value: string): string {
  return value.replace(UNSAFE_DOCUMENT_TEXT, " ");
}

/** Canonical text used for both the judge projection and clipping checks. */
export function normalizedJudgeText(value: string): string {
  return stripUnsafeText(value).replace(/\s+/g, " ").trim();
}

/** Deterministic backstop for high-signal instruction text; never an instruction. */
export function containsInjectionInstruction(text: string): boolean {
  return INJECTION_PATTERN.test(sanitizeUntrustedDocument(text));
}

/** True when the canonical text exceeds the provider cap. */
export function judgeTextClipped(value: string, maxChars: number): boolean {
  return normalizedJudgeText(value).length > maxChars;
}

/**
 * Project untrusted metadata into the judge's state without allowing invisible
 * controls or unbounded text to carry instructions. Returned/executed values
 * keep their original form; only the provider projection is normalized.
 */
export function sanitizeJudgeText(value: string, maxChars: number): string {
  return truncateText(normalizedJudgeText(value), maxChars);
}
