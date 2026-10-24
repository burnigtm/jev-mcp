/**
 * In-process counters for the jev://stats resource. Only counts, timings and
 * codes are kept; tool inputs and outputs are never recorded.
 */
type ToolStats = {
  calls: number;
  errors: Record<string, number>;
  actions: { auto: number; review: number; escalate: number };
  input_tokens: number;
  output_tokens: number;
  latencies: number[];
  max_ms: number;
};

const LATENCY_SAMPLES = 200;
const startedAt = new Date().toISOString();
const tools = new Map<string, ToolStats>();
const provider = {
  requests: 0, cache_hits: 0, cache_misses: 0, input_tokens: 0, output_tokens: 0, budget_rejections: 0,
  // Requests that reached the provider but produced no usable usage figures (timeout, abort, API
  // error, invalid response). Their cost is unknown, so the budget charges the reservation.
  failed_requests: 0, failed_estimated_tokens: 0,
};
/** Ledger writes by outcome; the ledger is observability, so failures are counted rather than raised. */
const ledgerEvents = { written: 0, dropped: 0, errors: 0 };
/** Why provider responses were rejected, by fixed reason name (never provider content). */
const responseFailures: Record<string, number> = {};
/** Estimated tokens of requests currently in flight; released when each request settles. */
let reserved = 0;

function toolStats(name: string): ToolStats {
  let stats = tools.get(name);
  if (!stats) {
    stats = { calls: 0, errors: {}, actions: { auto: 0, review: 0, escalate: 0 }, input_tokens: 0, output_tokens: 0, latencies: [], max_ms: 0 };
    tools.set(name, stats);
  }
  return stats;
}

export function recordToolCall(name: string, outcome: {
  durationMs: number;
  action?: unknown;
  usage?: unknown;
  errorCode?: string;
}): void {
  const stats = toolStats(name);
  stats.calls += 1;
  const duration = Math.max(0, outcome.durationMs);
  stats.latencies.push(duration);
  if (stats.latencies.length > LATENCY_SAMPLES) stats.latencies.shift();
  stats.max_ms = Math.max(stats.max_ms, duration);
  if (outcome.errorCode) stats.errors[outcome.errorCode] = (stats.errors[outcome.errorCode] ?? 0) + 1;
  if (outcome.action === "auto" || outcome.action === "review" || outcome.action === "escalate") stats.actions[outcome.action] += 1;
  const usage = outcome.usage as { input_tokens?: unknown; output_tokens?: unknown } | undefined;
  if (typeof usage?.input_tokens === "number") stats.input_tokens += usage.input_tokens;
  if (typeof usage?.output_tokens === "number") stats.output_tokens += usage.output_tokens;
}

export function recordProviderRequest(usage: { input_tokens: number; output_tokens: number }): void {
  provider.requests += 1;
  provider.cache_misses += 1;
  provider.input_tokens += usage.input_tokens;
  provider.output_tokens += usage.output_tokens;
}

export function recordCacheHit(): void {
  provider.cache_hits += 1;
}

export function recordBudgetRejection(): void {
  provider.budget_rejections += 1;
}

/** Provider tokens spent by this process, the quantity JEV_MCP_TOKEN_BUDGET bounds. */
export function tokensSpent(): number {
  return provider.input_tokens + provider.output_tokens + provider.failed_estimated_tokens;
}

/** Per-question output allowance used when reserving budget for a request. */
export const OUTPUT_TOKENS_PER_QUESTION = 16;

/**
 * Check the budget and reserve `estimate` tokens in one synchronous step, so concurrent calls cannot
 * all pass the same check. A request is refused once spent plus in-flight reservations already reach
 * the budget; like before, the request that crosses the line may overshoot it by its own size.
 * Returns the reservation to hand back to `releaseTokens`, or undefined when refused.
 */
export function tryReserveTokens(estimate: number, budget: number | undefined): number | undefined {
  if (budget !== undefined && tokensSpent() + reserved >= budget) return undefined;
  reserved += estimate;
  return estimate;
}

export function releaseTokens(reservation: number): void {
  reserved = Math.max(0, reserved - reservation);
}

export function recordLedgerEvent(kind: "written" | "dropped" | "error"): void {
  if (kind === "error") ledgerEvents.errors += 1;
  else ledgerEvents[kind] += 1;
}

export function recordResponseFailure(reason: string): void {
  responseFailures[reason] = (responseFailures[reason] ?? 0) + 1;
}

/** A dispatched request failed without usage figures: charge its reservation to the budget. */
export function recordFailedRequest(estimate: number): void {
  provider.failed_requests += 1;
  provider.failed_estimated_tokens += estimate;
}

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle]! : (sorted[middle - 1]! + sorted[middle]!) / 2;
}

export function statsSnapshot(tokenBudget: number | undefined, cacheEntries: number) {
  const spent = tokensSpent();
  return {
    started_at: startedAt,
    provider: { ...provider, response_failures: { ...responseFailures }, cache_entries: cacheEntries },
    ledger: { ...ledgerEvents },
    budget: {
      limit: tokenBudget ?? null,
      spent,
      reserved,
      remaining: tokenBudget === undefined ? null : Math.max(0, tokenBudget - spent - reserved),
    },
    tools: Object.fromEntries([...tools.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([name, stats]) => [name, {
      calls: stats.calls,
      errors: { ...stats.errors },
      actions: { ...stats.actions },
      input_tokens: stats.input_tokens,
      output_tokens: stats.output_tokens,
      latency_ms: { p50: Math.round(median(stats.latencies)), max: Math.round(stats.max_ms) },
    }])),
  };
}

export function resetStats(): void {
  tools.clear();
  reserved = 0;
  for (const key of Object.keys(responseFailures)) delete responseFailures[key];
  ledgerEvents.written = 0;
  ledgerEvents.dropped = 0;
  ledgerEvents.errors = 0;
  for (const key of Object.keys(provider) as Array<keyof typeof provider>) provider[key] = 0;
}
