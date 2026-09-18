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
    return fallback;
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

export function getConfig(): JevConfig {
  return {
    apiKey: process.env.TYPESAFE_API_KEY?.trim() ?? "",
    model: process.env.JEV_MCP_MODEL?.trim() || "jev-latest",
    baseURL: process.env.TYPESAFE_BASE_URL?.trim() || undefined,
    mock: boolEnv("JEV_MCP_MOCK"),
    autoAccept: numEnv("JEV_MCP_AUTO_ACCEPT", 0.8),
    reviewAt: numEnv("JEV_MCP_REVIEW_AT", 0.5),
    blockAt: numEnv("JEV_MCP_BLOCK_AT", 0.75),
    timeoutMs: timeoutEnv(),
  };
}
