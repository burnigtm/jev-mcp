import {
  TypeSafeClient,
  type Questions,
  type SystemOneRequest,
  type SystemOneResult,
} from "@typesafe-ai/sdk";
import { getConfig } from "./config.js";
import { JevConfigError } from "./errors.js";
import { fitState } from "./limits.js";
import { mockSystemOne } from "./mock.js";

const stderrLogger = {
  debug(message: string, ...args: unknown[]) {
    console.error(message, ...args);
  },
  info(message: string, ...args: unknown[]) {
    console.error(message, ...args);
  },
  warn(message: string, ...args: unknown[]) {
    console.error(message, ...args);
  },
  error(message: string, ...args: unknown[]) {
    console.error(message, ...args);
  },
};

export type EvaluateRequest<Q extends Questions = Questions> = {
  state: unknown;
  questions: Q;
  model?: string;
};

export type EvaluateResponse<Q extends Questions = Questions> = SystemOneResult<Q> & {
  truncated: boolean;
};

export async function systemOne<Q extends Questions>(
  request: EvaluateRequest<Q>,
): Promise<EvaluateResponse<Q>> {
  const config = getConfig();
  const fitted = fitState(request.state, request.questions);
  const model = request.model?.trim() || config.model;
  const payload: SystemOneRequest<Q> = {
    state: fitted.state as SystemOneRequest<Q>["state"],
    questions: request.questions,
    model,
  };

  if (config.mock) {
    const result = mockSystemOne({ ...payload, model });
    return { ...result, truncated: fitted.truncated };
  }

  if (!config.apiKey) {
    throw new JevConfigError(
      "Missing TYPESAFE_API_KEY. Set it in the MCP env, or set JEV_MCP_MOCK=1 for a local deterministic judge.",
    );
  }

  const client = new TypeSafeClient({
    apiKey: config.apiKey,
    baseURL: config.baseURL,
    defaultModel: model,
    logLevel: "off",
    logger: stderrLogger,
  });
  const result = await client.systemOne(payload);
  return { ...result, truncated: fitted.truncated };
}

export async function listModels(): Promise<string[]> {
  const config = getConfig();
  if (config.mock) {
    return [`${config.model}+mock`];
  }
  if (!config.apiKey) {
    throw new JevConfigError(
      "Missing TYPESAFE_API_KEY. Set it in the MCP env, or set JEV_MCP_MOCK=1.",
    );
  }
  const client = new TypeSafeClient({
    apiKey: config.apiKey,
    baseURL: config.baseURL,
    defaultModel: config.model,
    logLevel: "off",
    logger: stderrLogger,
  });
  const models = await client.models.list();
  return models.map((model) => model.name);
}
