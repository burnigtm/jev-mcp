import { JevConfigError } from "./errors.js";

export type JevConfig = {
  apiKey: string;
  model: string;
  baseURL: string | undefined;
  mock: boolean;
  autoAccept: number;
  reviewAt: number;
  blockAt: number;
  timeoutMs: number;
};

function numEnv(name: string, fallback: number): number {
  const raw = process.env[name]?.trim();
  if (!raw) {
    return fallback;
  }
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 0 || value > 1) {
    throw new JevConfigError(`${name} must be a number between 0 and 1.`);
  }
  return value;
}

function boolEnv(name: string): boolean {
  const raw = process.env[name]?.trim().toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes";
}

function timeoutEnv(): number {
  const raw = process.env.JEV_MCP_TIMEOUT_MS?.trim();
  if (!raw) return 30_000;
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value <= 0 || value > 2_147_483_647) {
    throw new JevConfigError("JEV_MCP_TIMEOUT_MS must be a positive integer no greater than 2147483647.");
  }
  return value;
}

function baseUrlEnv(): string | undefined {
  const raw = process.env.TYPESAFE_BASE_URL?.trim();
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    if (!url.hostname || (url.protocol !== "http:" && url.protocol !== "https:")) throw new Error("unsupported protocol");
  } catch {
    throw new JevConfigError("TYPESAFE_BASE_URL must be an absolute HTTP(S) API root URL.");
  }
  return raw;
}

export function getConfig(): JevConfig {
  const config = {
    apiKey: process.env.TYPESAFE_API_KEY?.trim() ?? "",
    model: process.env.JEV_MCP_MODEL?.trim() || "jev-latest",
    baseURL: baseUrlEnv(),
    mock: boolEnv("JEV_MCP_MOCK"),
    autoAccept: numEnv("JEV_MCP_AUTO_ACCEPT", 0.8),
    reviewAt: numEnv("JEV_MCP_REVIEW_AT", 0.5),
    blockAt: numEnv("JEV_MCP_BLOCK_AT", 0.75),
    timeoutMs: timeoutEnv(),
  };
  if (config.reviewAt > config.autoAccept) {
    throw new JevConfigError("JEV_MCP_REVIEW_AT must not exceed JEV_MCP_AUTO_ACCEPT.");
  }
  // Screen uses a 0.25 default review cutoff when no per-call override exists.
  if (config.blockAt < 0.25) {
    throw new JevConfigError("JEV_MCP_BLOCK_AT must be at least 0.25 because screen review defaults to 0.25.");
  }
  return config;
}
