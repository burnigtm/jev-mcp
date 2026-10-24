import { APIConnectionError, APIError, APITimeoutError, APIUserAbortError, TypeSafeError } from "@typesafe-ai/sdk";

export class JevConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "JevConfigError";
  }
}

export class JevValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "JevValidationError";
  }
}

export class JevBudgetError extends JevValidationError {
  constructor(message: string) {
    super(message);
    this.name = "JevBudgetError";
  }
}

/**
 * The provider rejected a request as larger than its context window. The local size estimate is
 * approximate (dense code can tokenize at well over the estimated count), so this can happen below the
 * estimated limit. It is an `INPUT_TOO_LARGE` error, and the chunked review reacts to it by splitting finer.
 */
export class JevContextExceededError extends JevBudgetError {
  constructor() {
    super("TypeSafe rejected the request as larger than its context window; the local size estimate is approximate. Split the input into smaller requests.");
    this.name = "JevContextExceededError";
  }
}

export function isContextExceeded(err: unknown): boolean {
  return err instanceof APIError && err.status === 400 && JSON.stringify(err.body ?? "").includes("max_tokens_exceeded");
}

export class JevBudgetExhaustedError extends Error {
  constructor(budget: number) {
    super(`The process token budget (JEV_MCP_TOKEN_BUDGET=${budget}) is exhausted. No provider request was made.`);
    this.name = "JevBudgetExhaustedError";
  }
}

/**
 * Which rule rejected a provider response. A fixed vocabulary, never provider content, so it is safe to
 * log and to count in jev://stats; the tool result still carries only the generic message.
 */
export type ResponseFailureReason =
  | "not_json" | "shape" | "answer_count" | "answer_type" | "option_keys" | "probability_mass"
  | "choice_not_argmax" | "choice_unknown" | "score_range" | "score_legend" | "score_mismatch" | "models_list";

export class JevResponseError extends Error {
  readonly reason: ResponseFailureReason;

  constructor(reason: ResponseFailureReason = "shape") {
    super("TypeSafe returned an invalid response. No decision was accepted.");
    this.name = "JevResponseError";
    this.reason = reason;
  }
}

export class JevTimeoutError extends Error {
  constructor() {
    super("The tool deadline was exceeded. Reduce the request size or increase JEV_MCP_TIMEOUT_MS.");
    this.name = "JevTimeoutError";
  }
}

export class JevCancelledError extends Error {
  constructor() {
    super("The tool request was cancelled.");
    this.name = "JevCancelledError";
  }
}

export function errorDetails(err: unknown): { code: string; message: string; retryable: boolean } {
  if (err instanceof JevBudgetError) return { code: "INPUT_TOO_LARGE", message: err.message, retryable: false };
  if (err instanceof JevValidationError) return { code: "INVALID_INPUT", message: err.message, retryable: false };
  if (err instanceof JevBudgetExhaustedError) return { code: "BUDGET_EXHAUSTED", message: err.message, retryable: false };
  if (err instanceof JevConfigError) return { code: "CONFIG_ERROR", message: err.message, retryable: false };
  if (err instanceof JevResponseError) return { code: "INVALID_RESPONSE", message: err.message, retryable: false };
  if (err instanceof JevTimeoutError || err instanceof APITimeoutError) return { code: "TIMEOUT", message: "The tool request timed out. Reduce the request size or increase JEV_MCP_TIMEOUT_MS.", retryable: true };
  if (err instanceof JevCancelledError || err instanceof APIUserAbortError) return { code: "CANCELLED", message: "The tool request was cancelled.", retryable: false };
  // Provider errors can contain response bodies or request headers. Do not relay them.
  if (err instanceof APIError) return { code: "API_ERROR", message: `TypeSafe API request failed (HTTP ${err.status}).`, retryable: err.status === 408 || err.status === 429 || err.status >= 500 };
  if (err instanceof APIConnectionError) return { code: "API_ERROR", message: "Could not connect to TypeSafe.", retryable: true };
  if (err instanceof TypeSafeError) return { code: "API_ERROR", message: "TypeSafe could not complete the request.", retryable: false };
  // Unknown errors may contain paths, URLs, or request fragments. Keep the
  // response diagnostic-safe and never relay the raw message.
  return { code: "INTERNAL_ERROR", message: "An internal error occurred. No decision was accepted.", retryable: false };
}

export function errorMessage(err: unknown): string {
  return errorDetails(err).message;
}
