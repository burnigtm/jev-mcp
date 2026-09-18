import type { ChoiceResponse, NoulResponse, ScoreResponse, SystemOneResult } from "@typesafe-ai/sdk";
import type { PolicyAction } from "./policy.js";
import { errorDetails } from "./errors.js";

export type JsonRecord = Record<string, unknown>;

export function jsonResult(payload: unknown): {
  content: Array<{ type: "text"; text: string }>;
} {
  return {
    content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
  };
}

export function jsonError(err: unknown, structured = true): {
  isError: true;
  content: Array<{ type: "text"; text: string }>;
  structuredContent?: { error: ReturnType<typeof errorDetails> };
} {
  const error = errorDetails(err);
  // Clients may validate structuredContent against a tool's success schema
  // even when isError is true. Such tools return typed errors as JSON text.
  if (!structured) return { isError: true, content: [{ type: "text", text: JSON.stringify({ error }) }] };
  return {
    isError: true,
    content: [{ type: "text", text: error.message }],
    structuredContent: { error },
  };
}

export function asNoul(answer: unknown): NoulResponse {
  return answer as NoulResponse;
}

export function asChoice(answer: unknown): ChoiceResponse {
  return answer as ChoiceResponse;
}

export function asScore(answer: unknown): ScoreResponse {
  return answer as ScoreResponse;
}

export function usageOf(result: SystemOneResult<Record<string, never>> | { usage: { input_tokens: number; output_tokens: number } }): {
  input_tokens: number;
  output_tokens: number;
} {
  return result.usage;
}

export type ToolEnvelope = {
  model: string;
  usage: { input_tokens: number; output_tokens: number };
  truncated: boolean;
  action: PolicyAction;
};
