import assert from "node:assert/strict";
import { test } from "node:test";
import { percentile, summarize } from "../scripts/benchmark.mjs";

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
