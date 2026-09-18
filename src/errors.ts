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

export class JevResponseError extends Error {
  constructor() {
    super("TypeSafe returned an invalid response. No decision was accepted.");
    this.name = "JevResponseError";
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
  if (err instanceof JevConfigError) return { code: "CONFIG_ERROR", message: err.message, retryable: false };
  if (err instanceof JevResponseError) return { code: "INVALID_RESPONSE", message: err.message, retryable: false };
  if (err instanceof JevTimeoutError || err instanceof APITimeoutError) return { code: "TIMEOUT", message: "The tool request timed out. Reduce the request size or increase JEV_MCP_TIMEOUT_MS.", retryable: true };
  if (err instanceof JevCancelledError || err instanceof APIUserAbortError) return { code: "CANCELLED", message: "The tool request was cancelled.", retryable: false };
  // Provider errors can contain response bodies or request headers. Do not relay them.
  if (err instanceof APIError) return { code: "API_ERROR", message: `TypeSafe API request failed (HTTP ${err.status}).`, retryable: err.status === 408 || err.status === 429 || err.status >= 500 };
  if (err instanceof APIConnectionError) return { code: "API_ERROR", message: "Could not connect to TypeSafe.", retryable: true };
  if (err instanceof TypeSafeError) return { code: "API_ERROR", message: "TypeSafe could not complete the request.", retryable: false };
  return { code: "INTERNAL_ERROR", message: err instanceof Error ? err.message : String(err), retryable: false };
}

export function errorMessage(err: unknown): string {
  return errorDetails(err).message;
}
