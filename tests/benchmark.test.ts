import assert from "node:assert/strict";
import { test } from "node:test";
import { childEnv, percentile, summarize } from "../scripts/benchmark.mjs";

test("benchmark child env allowlists process variables and forces mock mode", () => {
  const env = childEnv({
    PATH: "/usr/bin",
    NODE_OPTIONS: "--enable-source-maps",
    SystemRoot: "C:\\Windows",
    GITHUB_TOKEN: "ghs_secret",
    TYPESAFE_API_KEY: "ts_secret",
    HOME: "/home/runner",
  });
  assert.equal(env.JEV_MCP_MOCK, "1");
  assert.equal(env.PATH, "/usr/bin");
  assert.equal(env.NODE_OPTIONS, "--enable-source-maps");
  assert.equal(env.SystemRoot, "C:\\Windows");
  assert.equal("GITHUB_TOKEN" in env, false);
  assert.equal("TYPESAFE_API_KEY" in env, false);
  assert.equal("HOME" in env, false);
});

test("benchmark percentiles use nearest-rank values without mutating samples", () => {
  const samples = [30, 10, 20];
  assert.equal(percentile(samples, 0.5), 20);
  assert.equal(percentile(samples, 0.95), 30);
  assert.deepEqual(samples, [30, 10, 20]);
});

test("benchmark summary reports latency and wall-clock throughput", () => {
  const result = summarize("fixture", [10, 20, 30], 100);
  assert.deepEqual(result, {
    label: "fixture",
    samples: 3,
    elapsed_ms: 100,
    min_ms: 10,
    mean_ms: 20,
    p50_ms: 20,
    p95_ms: 30,
    p99_ms: 30,
    throughput_rps: 30,
  });
});
