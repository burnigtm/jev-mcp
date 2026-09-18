import {
  TypeSafeClient,
  type Questions,
  type SystemOneRequest,
  type SystemOneResult,
} from "@typesafe-ai/sdk";
import { getConfig } from "./config.js";
import { JevCancelledError, JevConfigError, JevResponseError, JevTimeoutError } from "./errors.js";
import { fitState, type Coverage } from "./limits.js";
import { mockSystemOne } from "./mock.js";
import { validateResponse } from "./responses.js";

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
  coverage: Coverage;
};

export type ToolContext = { signal?: AbortSignal; deadline?: number };

/** Share one deadline across every upstream call made by a tool invocation. */
export async function withToolContext<T>(
  context: ToolContext | undefined,
  operation: (context: ToolContext) => Promise<T>,
): Promise<T> {
  const deadline = Math.min(context?.deadline ?? Infinity, Date.now() + getConfig().timeoutMs);
  const controller = new AbortController();
  const onCancel = () => controller.abort(context?.signal?.reason instanceof JevTimeoutError ? context.signal.reason : new JevCancelledError());
  if (context?.signal?.aborted) onCancel();
  else context?.signal?.addEventListener("abort", onCancel, { once: true });
  if (deadline <= Date.now()) controller.abort(new JevTimeoutError());
  const timer = setTimeout(() => controller.abort(new JevTimeoutError()), Math.max(1, deadline - Date.now()));
  let rejectAborted: (() => void) | undefined;
  try {
    controller.signal.throwIfAborted();
    const aborted = new Promise<never>((_, reject) => {
      rejectAborted = () => reject(controller.signal.reason);
      controller.signal.addEventListener("abort", rejectAborted, { once: true });
    });
    const result = await Promise.race([operation({ signal: controller.signal, deadline }), aborted]);
    // Synchronous parsing or mock work can finish before timers get a turn.
    if (Date.now() >= deadline) throw new JevTimeoutError();
    controller.signal.throwIfAborted();
    return result;
  } catch (err) {
    if (controller.signal.aborted) throw controller.signal.reason;
    throw err;
  } finally {
    clearTimeout(timer);
    context?.signal?.removeEventListener("abort", onCancel);
    if (rejectAborted) controller.signal.removeEventListener("abort", rejectAborted);
  }
}

export async function systemOne<Q extends Questions>(
  request: EvaluateRequest<Q>,
  context?: ToolContext,
): Promise<EvaluateResponse<Q>> {
  return withToolContext(context, scoped => evaluate(request, scoped));
}

async function evaluate<Q extends Questions>(request: EvaluateRequest<Q>, context: ToolContext): Promise<EvaluateResponse<Q>> {
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
    return { ...validateResponse(result, request.questions), truncated: fitted.truncated, coverage: fitted.coverage };
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
  try {
    const result = await client.systemOne(payload, { signal: context.signal });
    return { ...validateResponse(result, request.questions), truncated: fitted.truncated, coverage: fitted.coverage };
  } catch (err) {
    if (err instanceof SyntaxError) throw new JevResponseError();
    throw err;
  }
}

export async function listModels(context?: ToolContext): Promise<string[]> {
  return withToolContext(context, listModelsWithinDeadline);
}

async function listModelsWithinDeadline(context: ToolContext): Promise<string[]> {
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
  const models = await client.models.list({ signal: context.signal });
  if (!models.every(model => typeof model?.name === "string" && model.name.length > 0)) throw new JevResponseError();
  return models.map((model) => model.name);
}
