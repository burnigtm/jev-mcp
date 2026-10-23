import { createHash } from "node:crypto";

/**
 * Opt-in LRU cache of validated provider results. Only the provider's typed
 * answers are cached; every tool still applies its policy to the cached answers,
 * so threshold, eligibility, and coverage changes are never served stale.
 */
type Entry = { value: unknown; expiresAt: number };

const entries = new Map<string, Entry>();

export function cacheKey(parts: { baseURL: string; model: string; mock: boolean; state: unknown; questions: unknown }): string {
  return createHash("sha256").update(JSON.stringify(parts)).digest("hex");
}

export function cacheGet<T>(key: string, now = Date.now()): T | undefined {
  const entry = entries.get(key);
  if (!entry) return undefined;
  if (entry.expiresAt <= now) {
    entries.delete(key);
    return undefined;
  }
  // Refresh recency: Map iteration order is insertion order.
  entries.delete(key);
  entries.set(key, entry);
  return structuredClone(entry.value) as T;
}

export function cacheSet(key: string, value: unknown, ttlMs: number, maxEntries: number, now = Date.now()): void {
  if (ttlMs <= 0 || maxEntries <= 0) return;
  entries.delete(key);
  entries.set(key, { value: structuredClone(value), expiresAt: now + ttlMs });
  while (entries.size > maxEntries) {
    const oldest = entries.keys().next().value;
    if (oldest === undefined) break;
    entries.delete(oldest);
  }
}

export function cacheSize(): number {
  return entries.size;
}

export function clearCache(): void {
  entries.clear();
}
