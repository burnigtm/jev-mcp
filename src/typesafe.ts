import {
  TypeSafeClient,
  type Questions,
  type SystemOneRequest,
  type SystemOneResult,
} from "@typesafe-ai/sdk";
import { getConfig, type JevConfig } from "./config.js";
import { cacheGet, cacheKey, cacheSet } from "./cache.js";
import { JevBudgetExhaustedError, JevCancelledError, JevConfigError, JevResponseError, JevTimeoutError } from "./errors.js";
import { estimateTokens, fitState, MAX_TOTAL_TOKENS, type Coverage, type FitResult } from "./limits.js";
import { mockSystemOne } from "./mock.js";
import { validateResponse } from "./responses.js";
import { OUTPUT_TOKENS_PER_QUESTION, recordBudgetRejection, recordCacheHit, recordFailedRequest, recordProviderRequest, recordResponseFailure, releaseTokens, tryReserveTokens } from "./stats.js";

function attemptTimeoutMs(context: ToolContext, timeoutMs: number): number {
  const deadline = context.deadline ?? Date.now() + timeoutMs;
  return Math.max(1, Math.min(timeoutMs, deadline - Date.now()));
}

function createClient(config: JevConfig, context: ToolContext, model: string): TypeSafeClient {
  return new TypeSafeClient({
    apiKey: config.apiKey,
    baseURL: config.baseURL,
    defaultModel: model,
    logLevel: "off",
    logger: stderrLogger,
    timeout: attemptTimeoutMs(context, config.timeoutMs),
    retry: { apiTimeoutError: false },
    fetch: (input, init) => fetch(input, { ...init, redirect: "error" }),
  });
}

function applyProviderBudget(fitted: FitResult, inputTokens: number): { truncated: boolean; coverage: Coverage } {
  const overBudget = inputTokens > MAX_TOTAL_TOKENS;
  return {
    truncated: fitted.truncated || overBudget,
    coverage: overBudget ? { ...fitted.coverage, complete: false } : fitted.coverage,
  };
}

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

  const key = config.cacheTtlMs > 0
    ? cacheKey({ baseURL: config.baseURL, model, mock: config.mock, state: payload.state, questions: payload.questions })
    : undefined;
  const cached = key ? cacheGet<SystemOneResult<Q>>(key) : undefined;
  if (cached) {
    recordCacheHit();
    // No provider tokens were spent; coverage still reflects this request.
    return { ...cached, usage: { input_tokens: 0, output_tokens: 0 }, ...applyProviderBudget(fitted, cached.usage.input_tokens) };
  }

  const estimate = estimateTokens({ state: payload.state, questions: payload.questions })
    + Object.keys(request.questions).length * OUTPUT_TOKENS_PER_QUESTION;
  const reservation = tryReserveTokens(estimate, config.tokenBudget);
  if (reservation === undefined) {
    recordBudgetRejection();
    throw new JevBudgetExhaustedError(config.tokenBudget!);
  }

  let dispatched = false;
  let validated: SystemOneResult<Q>;
  try {
    validated = await requestProvider(config, payload, request.questions, context, () => { dispatched = true; });
  } catch (err) {
    // Once a request is on the wire the provider may have processed it even if we never saw usage.
    if (dispatched) recordFailedRequest(reservation);
    if (err instanceof JevResponseError) recordResponseFailure(err.reason);
    throw err;
  } finally {
    releaseTokens(reservation);
  }
  recordProviderRequest(validated.usage);
  // Never cache a result the caller can no longer use.
  if (key && !context.signal?.aborted) cacheSet(key, validated, config.cacheTtlMs, config.cacheMaxEntries);
  return { ...validated, ...applyProviderBudget(fitted, validated.usage.input_tokens) };
}

async function requestProvider<Q extends Questions>(
  config: JevConfig,
  payload: SystemOneRequest<Q>,
  questions: Q,
  context: ToolContext,
  onDispatch: () => void,
): Promise<SystemOneResult<Q>> {
  if (config.mock) {
    return validateResponse(mockSystemOne({ ...payload, model: payload.model ?? config.model }), questions);
  }

  if (!config.apiKey) {
    throw new JevConfigError(
      "Missing TYPESAFE_API_KEY. Set it in the MCP env, or set JEV_MCP_MOCK=1 for a local deterministic judge.",
    );
  }

  const client = createClient(config, context, payload.model ?? config.model);
  try {
    onDispatch();
    const result = await client.systemOne(payload, { signal: context.signal });
    return validateResponse(result, questions);
  } catch (err) {
    if (err instanceof SyntaxError) throw new JevResponseError("not_json");
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
  const client = createClient(config, context, config.model);
  const models = await client.models.list({ signal: context.signal });
  if (!models.every(model => typeof model?.name === "string" && model.name.length > 0)) throw new JevResponseError("models_list");
  return models.map((model) => model.name);
}
