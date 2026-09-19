#!/usr/bin/env node
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const entrypoint = path.join(root, "dist", "index.js");
const DEFAULT_ITERATIONS = 12;
const DEFAULT_CONCURRENCY = 8;
const DEFAULT_WARMUP = 1;
const DEFAULT_MAX_P95_MS = 2_000;
const DEFAULT_MIN_RPS = 1;

export function percentile(values, fraction) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil(fraction * sorted.length) - 1));
  return sorted[index];
}

export function summarize(label, samples, elapsedMs) {
  const total = samples.reduce((sum, value) => sum + value, 0);
  return {
    label,
    samples: samples.length,
    elapsed_ms: round(elapsedMs),
    min_ms: round(Math.min(...samples)),
    mean_ms: round(total / samples.length),
    p50_ms: round(percentile(samples, 0.5)),
    p95_ms: round(percentile(samples, 0.95)),
    p99_ms: round(percentile(samples, 0.99)),
    throughput_rps: round(samples.length / (elapsedMs / 1_000)),
  };
}

function round(value) {
  return Math.round(value * 100) / 100;
}

function integerOption(args, name, fallback, minimum = 1) {
  const index = args.indexOf(name);
  const raw = index >= 0 ? args[index + 1] : undefined;
  const value = raw === undefined ? fallback : Number(raw);
  if (!Number.isInteger(value) || value < minimum) throw new Error(`${name} must be an integer >= ${minimum}`);
  return value;
}

function numericEnv(name, fallback, minimum = 0) {
  const raw = process.env[name];
  const value = raw === undefined ? fallback : Number(raw);
  if (!Number.isFinite(value) || value < minimum) throw new Error(`${name} must be a finite number >= ${minimum}`);
  return value;
}

function candidate(id, text = "Read the parser source") {
  return {
    id,
    name: "read_file",
    arguments: { path: `src/${id}.ts` },
    description: text,
    effect: "read_only",
    authorized: true,
    schema_valid: true,
    preconditions_met: true,
  };
}

function fixtures() {
  return [
    ["jev_evaluate", { state: "fixture", questions: { ok: { type: "noul", instructions: "Is this a fixture?" } } }],
    ["jev_coding_loop", { task: "Fix parser", observation: "Tests passed" }],
    ["jev_review", { request: "Correct typo", diff: "- teh\\n+ the", tests: "Documentation only" }],
    ["jev_verify", { claims: ["Tests passed"], evidence: "Tests passed" }],
    ["jev_screen", { text: "Ordinary explanatory text containing useful first-party documentation for a test fixture." }],
    ["jev_rank", { query: "token budget", candidates: [{ id: "src/limits.ts", text: "token budget" }, { id: "other", text: "installation" }] }],
    ["jev_gate", { request: "Fix parser", diff: "-broken\\n+fixed", tests: "Tests passed", claims: ["Tests passed"], evidence: "Tests passed" }],
    ["jev_tool_route", { task: "Inspect parser", observation: "Read parser source before editing", candidates: [candidate("parser")] }],
    ["jev_step", { task: "Inspect parser", observation: "Read parser source before editing", execution: { context_complete: true }, candidates: [candidate("parser")] }],
  ];
}

function evaluateFixture(size) {
  return {
    state: "x".repeat(size),
    questions: { ok: { type: "noul", instructions: "Is this benchmark fixture valid?" } },
  };
}

function rankFixture(count) {
  return {
    query: "token budget",
    candidates: Array.from({ length: count }, (_, index) => ({
      id: `candidate-${index}`,
      text: index % 2 === 0 ? "token budget and context limit" : "unrelated installation detail",
    })),
  };
}

function routeFixture(count) {
  return {
    task: "Inspect parser",
    observation: "Read parser source before editing",
    candidates: Array.from({ length: count }, (_, index) => candidate(`parser-${index}`, `Inspect parser candidate ${index}`)),
  };
}

async function timedCall(client, name, arguments_) {
  const start = performance.now();
  const result = await client.callTool({ name, arguments: arguments_ });
  const elapsed = performance.now() - start;
  if (result.isError) throw new Error(`${name} returned an MCP error: ${JSON.stringify(result)}`);
  const text = result.content?.[0]?.text;
  if (typeof text !== "string") throw new Error(`${name} returned no JSON text content`);
  const body = JSON.parse(text);
  if (!body || typeof body.model !== "string" || typeof body.action !== "string") {
    throw new Error(`${name} returned an invalid benchmark payload`);
  }
  return elapsed;
}

async function measure(client, label, name, arguments_, samples, concurrency = 1) {
  const values = [];
  const start = performance.now();
  for (let offset = 0; offset < samples; offset += concurrency) {
    const count = Math.min(concurrency, samples - offset);
    const batch = await Promise.all(Array.from({ length: count }, () => timedCall(client, name, arguments_)));
    values.push(...batch);
  }
  return summarize(label, values, performance.now() - start);
}

async function benchmark(options) {
  const env = Object.fromEntries(Object.entries(process.env).filter(([key, value]) => value !== undefined && !/^(JEV_MCP_|TYPESAFE_)/.test(key)));
  env.JEV_MCP_MOCK = "1";
  const transport = new StdioClientTransport({ command: process.execPath, args: [entrypoint], cwd: root, env, stderr: "pipe" });
  const client = new Client({ name: "jev-mcp-performance", version: "0" });
  let stderr = "";
  transport.stderr?.on("data", data => { stderr += String(data); });
  let startupMs = 0;
  const results = [];
  try {
    const started = performance.now();
    await client.connect(transport);
    const listed = await client.listTools();
    startupMs = performance.now() - started;
    if (listed.tools.length !== 9) throw new Error(`Expected 9 tools, received ${listed.tools.length}`);
    const cases = fixtures();
    for (const [name, arguments_] of cases) {
      for (let i = 0; i < options.warmup; i += 1) await timedCall(client, name, arguments_);
    }

    for (const [name, arguments_] of cases) {
      results.push(await measure(client, `sequential/${name}`, name, arguments_, options.iterations));
    }

    const evaluate = cases[0];
    const route = cases[7];
    const step = cases[8];
    results.push(await measure(client, "concurrent/jev_evaluate", evaluate[0], evaluate[1], options.iterations * options.concurrency, options.concurrency));
    results.push(await measure(client, "concurrent/jev_tool_route", route[0], route[1], options.iterations * options.concurrency, options.concurrency));
    results.push(await measure(client, "concurrent/jev_step", step[0], step[1], options.iterations * options.concurrency, options.concurrency));

    const payloadIterations = Math.max(3, Math.ceil(options.iterations / 3));
    for (const size of [256, 4_096, 16_384]) {
      results.push(await measure(client, `payload/evaluate_${size}_chars`, "jev_evaluate", evaluateFixture(size), payloadIterations));
    }
    for (const count of [2, 32, 128]) {
      results.push(await measure(client, `payload/rank_${count}_candidates`, "jev_rank", rankFixture(count), payloadIterations));
    }
    for (const count of [1, 8, 32]) {
      results.push(await measure(client, `payload/route_${count}_candidates`, "jev_tool_route", routeFixture(count), payloadIterations));
    }
  } finally {
    await client.close().catch(() => undefined);
  }

  if (stderr.trim()) throw new Error(`Benchmark server wrote to stderr:\n${stderr}`);
  return {
    version: 1,
    generated_at: new Date().toISOString(),
    node: process.version,
    platform: `${process.platform}/${process.arch}`,
    mock: true,
    startup_ms: round(startupMs),
    iterations: options.iterations,
    concurrency: options.concurrency,
    results,
  };
}

function assertBudgets(report, maxP95Ms, minRps) {
  const failures = [];
  if (report.startup_ms > maxP95Ms * 2) failures.push(`startup ${report.startup_ms}ms exceeds ${maxP95Ms * 2}ms`);
  for (const result of report.results) {
    if (result.p95_ms > maxP95Ms) failures.push(`${result.label} p95 ${result.p95_ms}ms exceeds ${maxP95Ms}ms`);
    if (result.throughput_rps < minRps) failures.push(`${result.label} throughput ${result.throughput_rps}rps is below ${minRps}rps`);
  }
  if (failures.length) throw new Error(`Performance budget failed:\n- ${failures.join("\n- ")}`);
}

function printReport(report) {
  console.log(`Jev MCP benchmark (mock, ${report.node}, ${report.platform})`);
  console.log(`startup ${report.startup_ms}ms; ${report.iterations} iterations; concurrency ${report.concurrency}`);
  console.log("label                                  n   p50 ms   p95 ms   p99 ms    rps");
  for (const result of report.results) {
    console.log(`${result.label.padEnd(38)} ${String(result.samples).padStart(3)} ${result.p50_ms.toFixed(2).padStart(8)} ${result.p95_ms.toFixed(2).padStart(8)} ${result.p99_ms.toFixed(2).padStart(8)} ${result.throughput_rps.toFixed(2).padStart(8)}`);
  }
}

export async function main(argv = process.argv.slice(2)) {
  const iterations = integerOption(argv, "--iterations", integerFromEnv("JEV_BENCH_ITERATIONS", DEFAULT_ITERATIONS));
  const concurrency = integerOption(argv, "--concurrency", integerFromEnv("JEV_BENCH_CONCURRENCY", DEFAULT_CONCURRENCY));
  const warmup = integerOption(argv, "--warmup", integerFromEnv("JEV_BENCH_WARMUP", DEFAULT_WARMUP), 0);
  const options = { iterations, concurrency, warmup };
  const report = await benchmark(options);
  const shouldAssert = argv.includes("--assert") || process.env.JEV_BENCH_ASSERT === "1";
  if (shouldAssert) assertBudgets(report, numericEnv("JEV_BENCH_MAX_P95_MS", DEFAULT_MAX_P95_MS), numericEnv("JEV_BENCH_MIN_RPS", DEFAULT_MIN_RPS));
  if (argv.includes("--json") || process.env.JEV_BENCH_JSON === "1") console.log(JSON.stringify(report, null, 2));
  else printReport(report);
  return report;
}

function integerFromEnv(name, fallback) {
  const raw = process.env[name];
  return raw === undefined ? fallback : Number(raw);
}

const invoked = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (invoked) {
  main().catch(error => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
