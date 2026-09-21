import { BlockList, isIP } from "node:net";
import { JevConfigError } from "./errors.js";

export const DEFAULT_BASE_URL = "https://api.typesafe.ai";

export type JevConfig = {
  apiKey: string;
  model: string;
  baseURL: string;
  mock: boolean;
  autoAccept: number;
  reviewAt: number;
  blockAt: number;
  timeoutMs: number;
};

const nonPublic = new BlockList();
nonPublic.addSubnet("0.0.0.0", 8, "ipv4");
nonPublic.addSubnet("10.0.0.0", 8, "ipv4");
nonPublic.addSubnet("100.64.0.0", 10, "ipv4");
nonPublic.addSubnet("127.0.0.0", 8, "ipv4");
nonPublic.addSubnet("169.254.0.0", 16, "ipv4");
nonPublic.addSubnet("172.16.0.0", 12, "ipv4");
nonPublic.addSubnet("192.0.0.0", 24, "ipv4");
nonPublic.addSubnet("192.0.2.0", 24, "ipv4");
nonPublic.addSubnet("192.168.0.0", 16, "ipv4");
nonPublic.addSubnet("198.18.0.0", 15, "ipv4");
nonPublic.addSubnet("198.51.100.0", 24, "ipv4");
nonPublic.addSubnet("203.0.113.0", 24, "ipv4");
nonPublic.addSubnet("224.0.0.0", 4, "ipv4");
nonPublic.addAddress("::1", "ipv6");
nonPublic.addSubnet("::ffff:0:0", 96, "ipv6");
nonPublic.addSubnet("fc00::", 7, "ipv6");
nonPublic.addSubnet("fe80::", 10, "ipv6");
nonPublic.addSubnet("2001:db8::", 32, "ipv6");
nonPublic.addSubnet("ff00::", 8, "ipv6");

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

function baseUrlEnv(): string {
  const raw = process.env.TYPESAFE_BASE_URL?.trim();
  if (!raw) return DEFAULT_BASE_URL;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new JevConfigError("TYPESAFE_BASE_URL must be an absolute HTTP(S) API root URL.");
  }
  if (url.username || url.password || url.search || url.hash || url.href.includes("@")) {
    throw new JevConfigError("TYPESAFE_BASE_URL must not include userinfo, a query, or a fragment.");
  }
  const hostname = url.hostname.toLowerCase();
  if (rawAuthorityHost(raw) !== hostname) {
    throw new JevConfigError("TYPESAFE_BASE_URL must not use an obfuscated host.");
  }
  if (!hostname || url.protocol === "https:" && hostname === "api.typesafe.ai") {
    if (!hostname) throw new JevConfigError("TYPESAFE_BASE_URL must be an absolute HTTP(S) API root URL.");
    return normalizedOrigin(url);
  }
  if (url.protocol === "http:") {
    if (!isLoopback(hostname)) {
      throw new JevConfigError("HTTP TYPESAFE_BASE_URL is only allowed for loopback.");
    }
    return normalizedOrigin(url);
  }
  if (url.protocol !== "https:") {
    throw new JevConfigError("TYPESAFE_BASE_URL must be an absolute HTTP(S) API root URL.");
  }
  if (!boolEnv("JEV_MCP_ALLOW_CUSTOM_BASE_URL")) {
    throw new JevConfigError("TYPESAFE_BASE_URL must be https://api.typesafe.ai unless JEV_MCP_ALLOW_CUSTOM_BASE_URL=1.");
  }
  if (!isPublicHostname(hostname)) {
    throw new JevConfigError("A custom TYPESAFE_BASE_URL must use a public host. Non-public, link-local, metadata, and obfuscated addresses are rejected.");
  }
  return normalizedOrigin(url);
}

function rawAuthorityHost(raw: string): string {
  const match = /^[a-z][a-z0-9+.-]*:\/\/([^/?#]*)/i.exec(raw.trim());
  const authority = match?.[1] ?? "";
  const hostport = authority.includes("@") ? authority.slice(authority.lastIndexOf("@") + 1) : authority;
  if (hostport.startsWith("[")) {
    const end = hostport.indexOf("]");
    return (end >= 0 ? hostport.slice(1, end) : hostport).toLowerCase();
  }
  return hostport.replace(/:\d+$/, "").toLowerCase();
}

function normalizedOrigin(url: URL): string {
  const path = url.pathname === "/" ? "" : url.pathname.replace(/\/+$/, "");
  return `${url.origin}${path}`;
}

function isLoopback(hostname: string): boolean {
  if (obfuscatedAddress(hostname)) return false;
  if (hostname === "localhost" || hostname === "::1") return true;
  return isIP(hostname) === 4 && hostname.startsWith("127.");
}

function isPublicHostname(hostname: string): boolean {
  if (obfuscatedAddress(hostname)) return false;
  const mapped = hostname.match(/^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i);
  if (mapped) return isPublicHostname(mapped[1] ?? "");
  const kind = isIP(hostname);
  if (kind === 4) return !nonPublic.check(hostname, "ipv4");
  if (kind === 6) return !nonPublic.check(hostname, "ipv6");
  return hostname !== "" && !hostname.endsWith(".local");
}

function obfuscatedAddress(hostname: string): boolean {
  if (/^\d+$/.test(hostname) || /0x/i.test(hostname)) return true;
  const labels = hostname.split(".");
  if (!labels.every(label => /^\d+$/.test(label))) return false;
  if (labels.length !== 4) return true;
  return labels.some(label => label.length > 1 && label.startsWith("0"));
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
