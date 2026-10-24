import assert from "node:assert/strict";
import { after, afterEach, before, mock, test } from "node:test";
import type { Questions } from "@typesafe-ai/sdk";
import { runEval } from "../src/cli.ts";
import { getConfig } from "../src/config.ts";
import { errorDetails, JevResponseError, JevValidationError } from "../src/errors.ts";
import { choiceCriteriaCount, parseQuestions, type QuestionInput } from "../src/questions.ts";
import { validateResponse } from "../src/responses.ts";
import { envScope } from "./helpers/fixture.ts";

/** Table-driven checks for every boundary that turns untrusted input into typed values. */

const restoreEnv = envScope([
  "JEV_MCP_MOCK", "TYPESAFE_API_KEY", "TYPESAFE_BASE_URL", "JEV_MCP_AUTO_ACCEPT", "JEV_MCP_REVIEW_AT", "JEV_MCP_BLOCK_AT",
  "JEV_MCP_TIMEOUT_MS", "JEV_MCP_CACHE_TTL_MS", "JEV_MCP_CACHE_MAX_ENTRIES", "JEV_MCP_TOKEN_BUDGET", "JEV_MCP_MODEL",
]);

before(() => {
  for (const name of ["TYPESAFE_BASE_URL", "JEV_MCP_AUTO_ACCEPT", "JEV_MCP_REVIEW_AT", "JEV_MCP_BLOCK_AT", "JEV_MCP_TIMEOUT_MS",
    "JEV_MCP_CACHE_TTL_MS", "JEV_MCP_CACHE_MAX_ENTRIES", "JEV_MCP_TOKEN_BUDGET", "JEV_MCP_MODEL"]) delete process.env[name];
  process.env.JEV_MCP_MOCK = "1";
});

afterEach(() => mock.restoreAll());
after(restoreEnv);

// --- Provider response boundary ---------------------------------------------

const QUESTIONS: Questions = {
  flag: { type: "noul", instructions: "flag?" },
  pick: { type: "choice", instructions: "pick?", criteria: { a: "A", b: "B", c: "C" } },
  level: { type: "score", instructions: "level?", criteria: ["low", "mid", "high"] },
};

function valid(): Record<string, any> {
  return {
    model: "jev",
    usage: { input_tokens: 10, output_tokens: 2 },
    answers: {
      flag: { type: "noul", noul: 0.9 },
      pick: { type: "choice", choice: "a", confidence: 0.85, probabilities: { a: 0.9, b: 0.05, c: 0.05 } },
      level: { type: "score", score: 0.2, confidence: 0.8, probabilities: { "0": 0.8, "1": 0.2, "2": 0 }, legend: { "0": "low", "1": "mid", "2": "high" } },
    },
  };
}

const MALFORMED: Array<[string, (r: Record<string, any>) => void]> = [
  ["not an object", (r) => { for (const key of Object.keys(r)) delete r[key]; }],
  ["empty model", (r) => { r.model = ""; }],
  ["negative tokens", (r) => { r.usage.input_tokens = -1; }],
  ["fractional tokens", (r) => { r.usage.output_tokens = 1.5; }],
  ["missing answer", (r) => { delete r.answers.flag; }],
  ["extra answer", (r) => { r.answers.extra = { type: "noul", noul: 0.5 }; }],
  ["wrong answer type", (r) => { r.answers.flag = { type: "score", score: 0, confidence: 1, probabilities: { "0": 1, "1": 0, "2": 0 }, legend: {} }; }],
  ["noul above 1", (r) => { r.answers.flag.noul = 1.01; }],
  ["noul NaN", (r) => { r.answers.flag.noul = Number.NaN; }],
  ["choice outside options", (r) => { r.answers.pick.choice = "z"; r.answers.pick.probabilities = { a: 0.9, b: 0.05, z: 0.05 }; }],
  ["choice is not the argmax", (r) => { r.answers.pick.choice = "b"; }],
  ["missing option probability", (r) => { delete r.answers.pick.probabilities.c; r.answers.pick.probabilities.b = 0.1; }],
  ["mass far from 1", (r) => { r.answers.pick.probabilities = { a: 0.6, b: 0.1, c: 0.1 }; }],
  ["confidence above 1", (r) => { r.answers.pick.confidence = 1.2; }],
  ["score above top level", (r) => { r.answers.level.score = 3; r.answers.level.probabilities = { "0": 0, "1": 0, "2": 1 }; }],
  ["score disagrees with its distribution", (r) => { r.answers.level.score = 1.8; }],
  ["score legend missing a level", (r) => { delete r.answers.level.legend["2"]; }],
  ["negative score", (r) => { r.answers.level.score = -0.1; }],
];

for (const [label, mutate] of MALFORMED) {
  test(`provider boundary rejects: ${label}`, () => {
    const response = valid();
    mutate(response);
    assert.throws(() => validateResponse(response, QUESTIONS), JevResponseError);
  });
}

test("provider boundary accepts the documented rounding drift and ties for the argmax", () => {
  const drift = valid();
  drift.answers.pick.probabilities = { a: 0.9, b: 0.05, c: 0.04 }; // sums to 0.99
  assert.doesNotThrow(() => validateResponse(drift, QUESTIONS));
  const tie = valid();
  tie.answers.pick = { type: "choice", choice: "b", confidence: 0.2, probabilities: { a: 0.45, b: 0.45, c: 0.1 } };
  assert.doesNotThrow(() => validateResponse(tie, QUESTIONS));
  for (const value of [null, undefined, 42, "text", []]) {
    assert.throws(() => validateResponse(value, QUESTIONS), JevResponseError);
  }
});

test("provider boundary ignores inherited keys named like questions", () => {
  const response = valid();
  const answers = Object.create({ flag: { type: "noul", noul: 0.5 } });
  Object.assign(answers, { pick: response.answers.pick, level: response.answers.level });
  response.answers = answers;
  assert.throws(() => validateResponse(response, QUESTIONS), JevResponseError);
});

// --- Question parsing -----------------------------------------------------------

const BAD_QUESTIONS: Array<[string, unknown]> = [
  ["array map", []],
  ["empty map", {}],
  ["non-object question", { q: "noul" }],
  ["instructions not text", { q: { type: "noul", instructions: 42 } }],
  ["unknown type", { q: { type: "rating", instructions: "?" } }],
  ["noul criteria array", { q: { type: "noul", instructions: "?", criteria: ["yes"] } }],
  ["noul criteria extra key", { q: { type: "noul", instructions: "?", criteria: { true: "y", maybe: "m" } } }],
  ["noul description not text", { q: { type: "noul", instructions: "?", criteria: { true: 1 } } }],
  ["choice criteria missing", { q: { type: "choice", instructions: "?" } }],
  ["choice criteria array", { q: { type: "choice", instructions: "?", criteria: ["a", "b"] } }],
  ["choice with one option", { q: { type: "choice", instructions: "?", criteria: { a: "A" } } }],
  ["choice with 251 options", { q: { type: "choice", instructions: "?", criteria: Object.fromEntries(Array.from({ length: 251 }, (_, i) => [`o${i}`, null])) } }],
  ["choice description not text", { q: { type: "choice", instructions: "?", criteria: { a: "A", b: 2 } } }],
  ["score criteria not an array", { q: { type: "score", instructions: "?", criteria: { a: "A" } } }],
  ["score with one level", { q: { type: "score", instructions: "?", criteria: ["only"] } }],
  ["score level not text", { q: { type: "score", instructions: "?", criteria: ["low", 2] } }],
];

for (const [label, raw] of BAD_QUESTIONS) {
  test(`question parser rejects: ${label}`, () => {
    assert.throws(() => parseQuestions(raw as Record<string, QuestionInput>), JevValidationError);
  });
}

test("question parser rejects __proto__ question IDs and choice options", () => {
  const ids = JSON.parse('{"__proto__": {"type": "noul", "instructions": "?"}}');
  assert.throws(() => parseQuestions(ids), /__proto__/);
  const options = JSON.parse('{"q": {"type": "choice", "instructions": "?", "criteria": {"__proto__": "x", "b": "y"}}}');
  assert.throws(() => parseQuestions(options), /__proto__/);
});

test("question parser accepts every valid primitive and normalizes null noul descriptions", () => {
  const parsed = parseQuestions({
    n: { type: "noul", instructions: "?", criteria: { true: "yes", false: null } },
    bare: { type: "noul", instructions: "?", criteria: null },
    c: { type: "choice", instructions: "?", criteria: Object.fromEntries(Array.from({ length: 250 }, (_, i) => [`o${i}`, i % 2 ? null : "d"])) },
    s: { type: "score", instructions: "?", criteria: ["low", "high"] },
  } as Record<string, QuestionInput>);
  assert.deepEqual(parsed.n, { type: "noul", instructions: "?", criteria: { true: "yes", false: undefined } });
  assert.equal("criteria" in parsed.bare!, false);
  assert.equal(choiceCriteriaCount(parsed.c!), 250);
  assert.equal(choiceCriteriaCount(parsed.s!), 0);
  assert.equal(Object.getPrototypeOf(parsed), null, "a null-prototype map cannot be polluted");
});

// --- CLI argument parsing (in-process) ------------------------------------------

const Q = '{"ok":{"type":"noul","instructions":"Is this a status line?"}}';

const BAD_ARGS: Array<[string, string[]]> = [
  ["positional argument", ["state"]],
  ["unknown option", ["--verbose"]],
  ["duplicate option", ["--state", "a", "--state", "b", "--questions", Q]],
  ["duplicate --stdin", ["--stdin", "--stdin"]],
  ["missing trailing value", ["--state"]],
  ["value is another flag", ["--state", "--questions", Q]],
  ["value is --stdin", ["--model", "--stdin"]],
  ["--stdin with other options", ["--stdin", "--model", "m"]],
  ["--json with --state", ["--json", `{"state":"x","questions":${Q}}`, "--state", "y"]],
  ["--state without --questions", ["--state", "x"]],
  ["invalid --questions JSON", ["--state", "x", "--questions", "{nope"]],
  ["invalid --json", ["--json", "{nope"]],
  ["--json body is an array", ["--json", "[]"]],
  ["--json body without questions", ["--json", '{"state":"x"}']],
  ["schema-invalid questions", ["--state", "x", "--questions", '{"q":{"type":"rating","instructions":"?"}}']],
];

for (const [label, argv] of BAD_ARGS) {
  test(`eval CLI rejects: ${label}`, async () => {
    const write = mock.method(process.stdout, "write", () => true);
    await assert.rejects(runEval(argv), (err: unknown) => errorDetails(err).code === "INVALID_INPUT");
    assert.equal(write.mock.callCount(), 0, "no partial result is printed");
  });
}

test("eval CLI accepts --key=value forms, dash-leading values, and a model override", async () => {
  const chunks: string[] = [];
  mock.method(process.stdout, "write", (chunk: string) => { chunks.push(String(chunk)); return true; });
  await runEval([`--questions=${Q}`, "--state=--looks-like-a-flag", "--model", "jev-custom"]);
  const body = JSON.parse(chunks.join(""));
  assert.equal(body.model, "jev-custom+mock");
  assert.ok(["auto", "review", "escalate"].includes(body.action));
  assert.ok(body.answers.ok);
});

// --- Environment configuration ----------------------------------------------

const BAD_ENV: Array<[string, string]> = [
  ["JEV_MCP_AUTO_ACCEPT", "1.5"],
  ["JEV_MCP_AUTO_ACCEPT", "high"],
  ["JEV_MCP_REVIEW_AT", "-0.1"],
  ["JEV_MCP_REVIEW_AT", "0.95"], // above the default auto_accept
  ["JEV_MCP_BLOCK_AT", "0.2"],
  ["JEV_MCP_TIMEOUT_MS", "0"],
  ["JEV_MCP_TIMEOUT_MS", "1.5"],
  ["JEV_MCP_TIMEOUT_MS", "2147483648"],
  ["JEV_MCP_CACHE_TTL_MS", "-5"],
  ["JEV_MCP_CACHE_MAX_ENTRIES", "0"],
  ["JEV_MCP_TOKEN_BUDGET", "0"],
  ["JEV_MCP_TOKEN_BUDGET", "1e400"],
];

for (const [name, value] of BAD_ENV) {
  test(`config rejects ${name}=${value}`, () => {
    process.env[name] = value;
    try {
      assert.throws(() => getConfig(), (err: unknown) => errorDetails(err).code === "CONFIG_ERROR");
    } finally {
      delete process.env[name];
    }
  });
}

test("config defaults, trimming, and boolean spellings", () => {
  const config = getConfig();
  assert.deepEqual(
    { model: config.model, auto: config.autoAccept, review: config.reviewAt, block: config.blockAt, timeout: config.timeoutMs, ttl: config.cacheTtlMs, max: config.cacheMaxEntries, budget: config.tokenBudget },
    { model: "jev-latest", auto: 0.7, review: 0.5, block: 0.75, timeout: 30_000, ttl: 0, max: 256, budget: undefined },
  );
  process.env.JEV_MCP_MODEL = "  ";
  process.env.JEV_MCP_TOKEN_BUDGET = "  1000 ";
  process.env.JEV_MCP_CACHE_TTL_MS = " 500 ";
  try {
    const trimmed = getConfig();
    assert.equal(trimmed.model, "jev-latest", "a blank model falls back");
    assert.equal(trimmed.tokenBudget, 1000);
    assert.equal(trimmed.cacheTtlMs, 500);
    for (const spelling of ["1", "true", "YES", " True "]) {
      process.env.JEV_MCP_MOCK = spelling;
      assert.equal(getConfig().mock, true, spelling);
    }
    for (const spelling of ["0", "false", "on", ""]) {
      process.env.JEV_MCP_MOCK = spelling;
      assert.equal(getConfig().mock, false, spelling);
    }
  } finally {
    delete process.env.JEV_MCP_MODEL;
    delete process.env.JEV_MCP_TOKEN_BUDGET;
    delete process.env.JEV_MCP_CACHE_TTL_MS;
    process.env.JEV_MCP_MOCK = "1";
  }
});
