import { truncateText } from "./limits.js";

/** Invisible format characters: soft hyphen, zero-width, word joiners, bidi controls, BOM. */
const FORMAT_CHARS = "\u00AD\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u2069\uFEFF";

/** C0/C1 controls plus invisible format characters. */
const UNSAFE_TEXT = new RegExp(`[\u0000-\u001F\u007F-\u009F${FORMAT_CHARS}]`, "g");

/** Preserve \t, \n, and \r for logs/diffs while stripping hidden characters. */
const UNSAFE_DOCUMENT_TEXT = new RegExp(`[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F${FORMAT_CHARS}]`, "g");

/** Characters that render as nothing; deleted (not spaced) before pattern matching. */
const INVISIBLE = new RegExp(`[${FORMAT_CHARS}]`, "g");

/** Optional determiners between the verb and its object: "ignore all of your previous instructions". */
const DETERMINERS = String.raw`(?:(?:all|any|of|the|your|my|these|those|every|earlier)\s+)*`;

/** High-signal phrases that survive paraphrasing; a deterministic backstop only. */
const INJECTION_PATTERN = new RegExp([
  String.raw`(?:ignore|disregard|forget|override)\s+${DETERMINERS}(?:previous|prior|above|earlier|preceding|system)\s+(?:instructions?|prompts?|rules?|directives?)`,
  String.raw`system\s+note\s+for\s+(?:the\s+)?(?:ai|assistant|model)`,
  String.raw`append\s+your\s+system\s+prompt`,
  String.raw`jailbreak`,
  String.raw`developer\s+(?:override|mode)`,
  String.raw`you\s+are\s+now\s+(?:an?\s+)?(?:ai|assistant|model)`,
].join("|"), "i");

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

/**
 * Deterministic backstop for high-signal instruction text; never an instruction.
 * Invisible characters are deleted rather than spaced, so one hidden character
 * inside a word ("ig\u200Bnore") cannot split it past the pattern.
 */
export function containsInjectionInstruction(text: string): boolean {
  return INJECTION_PATTERN.test(sanitizeUntrustedDocument(text.replace(INVISIBLE, "")));
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
