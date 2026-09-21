import assert from "node:assert/strict";
import { after, before, test, type TestContext } from "node:test";
import type { ChoiceResponse, Questions } from "@typesafe-ai/sdk";
import { codingLoopQuestions } from "../src/packs/coding-loop.ts";
import { codingLoopInputSchema, runCodingLoop } from "../src/tools/coding-loop.ts";
import { errorDetails } from "../src/errors.ts";

const envNames = ["JEV_MCP_MOCK", "TYPESAFE_API_KEY", "TYPESAFE_BASE_URL", "JEV_MCP_ALLOW_CUSTOM_BASE_URL", "JEV_MCP_AUTO_ACCEPT", "JEV_MCP_REVIEW_AT"];
const previousEnv = new Map(envNames.map(name => [name, process.env[name]]));

before(() => {
  process.env.JEV_MCP_MOCK = "0";
  process.env.TYPESAFE_API_KEY = "fixture-key";
  process.env.TYPESAFE_BASE_URL = "https://coding-loop-fixture.invalid";
  process.env.JEV_MCP_ALLOW_CUSTOM_BASE_URL = "1";
  process.env.JEV_MCP_AUTO_ACCEPT = "0.8";
  process.env.JEV_MCP_REVIEW_AT = "0.5";
});

after(() => {
  for (const [name, value] of previousEnv) {
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
});

type FixtureOptions = {
  next?: "continue" | "retry" | "ask_user" | "stop";
  nextConfidence?: number;
  tier?: "cheap" | "standard" | "reasoning";
  tierConfidence?: number;
  generation?: number;
  moreContext?: number;
  done?: number;
  risk?: 0 | 1 | 2;
  riskUncertain?: boolean;
};

function choice(question: Questions[string], winner: string, confidence = 0.95): ChoiceResponse {
  assert.equal(question.type, "choice");
  const keys = Object.keys(question.criteria!);
  const winnerProbability = (1 + (keys.length - 1) * confidence) / keys.length;
  return {
    type: "choice", choice: winner, confidence,
    probabilities: Object.fromEntries(keys.map(key => [key, key === winner ? winnerProbability : (1 - winnerProbability) / (keys.length - 1)])),
  };
}

function fixture(options: FixtureOptions = {}) {
  const questions = codingLoopQuestions();
  const risk = options.risk ?? 0;
  return {
    model: "jev-fixture", usage: { input_tokens: 123, output_tokens: 17 },
    answers: {
      next: choice(questions.next!, options.next ?? "continue", options.nextConfidence),
      model_tier: choice(questions.model_tier!, options.tier ?? "standard", options.tierConfidence),
      focus: choice(questions.focus!, "edit"),
      risk: { type: "score", score: options.riskUncertain ? 1 : risk, confidence: options.riskUncertain ? 0 : 1, probabilities: options.riskUncertain ? { "0": 1 / 3, "1": 1 / 3, "2": 1 / 3 } : { "0": risk === 0 ? 1 : 0, "1": risk === 1 ? 1 : 0, "2": risk === 2 ? 1 : 0 }, legend: { "0": "low", "1": "local", "2": "destructive" } },
      done_enough: { type: "noul", noul: options.done ?? 0.1 },
      needs_more_context: { type: "noul", noul: options.moreContext ?? 0.05 },
      needs_generation: { type: "noul", noul: options.generation ?? 0.95 },
      tests_likely_fail: { type: "noul", noul: 0.1 },
    },
  };
}

const input = { task: "Add parser validation", observation: "Implementation requirements and relevant source have been inspected.", execution: { context_complete: true } };

function reply(t: TestContext, options: FixtureOptions = {}) {
  return t.mock.method(globalThis, "fetch", async () => Response.json(fixture(options)));
}

test("execution facts have safe defaults and reject malformed failure counts", () => {
  const parsed = codingLoopInputSchema.parse({ task: "x", observation: "x", execution: {} });
  assert.deepEqual(parsed.execution, { prepared_tool_call: false, context_complete: false, failed_attempts: 0 });
  for (const failed_attempts of [-1, 1.5, Infinity]) {
    assert.equal(codingLoopInputSchema.safeParse({ task: "x", observation: "x", execution: { failed_attempts } }).success, false);
  }
  const pack = codingLoopQuestions();
  assert.equal(pack.needs_generation?.type, "noul");
  assert.deepEqual(Object.keys(pack.model_tier!.criteria!), ["cheap", "standard", "reasoning"]);
});

test("a prepared tool call avoids generation even when Jev requests a reasoning tier", async t => {
  const fetch = reply(t, { tier: "reasoning" });
  const result = await runCodingLoop({ ...input, execution: { context_complete: true, prepared_tool_call: true } });
  assert.equal(result.handoff, "use_tools");
  assert.deepEqual(result.partner_model, { required: false, tier: "none", reason_codes: ["prepared_tool_call"] });
  assert.equal(result.model_tier.choice, "reasoning");
  assert.equal(result.action, "auto");
  assert.equal(fetch.mock.callCount(), 1);
});

test("generation is requested only when the next step and tier are confident and context is ready", async t => {
  let sent: { state: { execution: unknown }; questions: Questions } | undefined;
  t.mock.method(globalThis, "fetch", async (_url: unknown, init?: RequestInit) => {
    sent = JSON.parse(String(init?.body));
    return Response.json(fixture({ next: "retry", tier: "cheap" }));
  });
  const result = await runCodingLoop({ ...input, execution: { context_complete: true, failed_attempts: 1 } });
  assert.equal(result.handoff, "partner_model");
  assert.deepEqual(result.partner_model, { required: true, tier: "cheap", reason_codes: ["generation_required"] });
  assert.equal(result.needs_generation, 0.95);
  assert.equal(result.model_tier.choice, "cheap");
  assert.deepEqual(sent?.state.execution, { prepared_tool_call: false, context_complete: true, failed_attempts: 1 });
  assert.equal(sent?.questions.needs_generation?.type, "noul");
  assert.deepEqual(result.usage, { input_tokens: 123, output_tokens: 17 });
});

test("omitting host context facts never buys a partner turn", async t => {
  reply(t);
  const result = await runCodingLoop({ task: input.task, observation: input.observation });
  assert.equal(result.handoff, "gather_context");
  assert.equal(result.partner_model.required, false);
  assert.deepEqual(result.partner_model.reason_codes, ["host_context_incomplete"]);
  assert.equal(result.model_tier.choice, "standard");
});

test("missing or uncertain context prevents partner spend", async t => {
  for (const moreContext of [0.3, 0.95]) {
    const fetch = reply(t, { moreContext, tier: "reasoning" });
    const result = await runCodingLoop(input);
    assert.equal(result.handoff, "gather_context");
    assert.deepEqual(result.partner_model.reason_codes, ["context_needed_or_uncertain"]);
    assert.equal(result.partner_model.required, false);
    fetch.mock.restore();
  }
});

test("prepared tools can gather missing context without a partner turn", async t => {
  reply(t, { moreContext: 0.95 });
  const result = await runCodingLoop({ ...input, execution: { context_complete: false, prepared_tool_call: true } });
  assert.equal(result.handoff, "use_tools");
  assert.equal(result.partner_model.required, false);
});

test("unneeded or uncertain generation does not call a partner", async t => {
  for (const generation of [0.05, 0.5, 0.7]) {
    const fetch = reply(t, { generation });
    const result = await runCodingLoop(input);
    assert.equal(result.handoff, "gather_context");
    assert.equal(result.partner_model.tier, "none");
    assert.equal(result.partner_model.required, false);
    fetch.mock.restore();
  }
});

test("uncertain next-step or model-tier judgments require review instead of reasoning spend", async t => {
  for (const options of [{ nextConfidence: 0.3 }, { tierConfidence: 0.55 }]) {
    const fetch = reply(t, { ...options, tier: "reasoning" });
    const result = await runCodingLoop(input);
    assert.equal(result.handoff, "review");
    assert.equal(result.partner_model.required, false);
    fetch.mock.restore();
  }
});

test("two or more failed attempts gather context without repeating tools or escalating model spend", async t => {
  reply(t, { next: "retry", tier: "reasoning" });
  for (const prepared_tool_call of [false, true]) {
    const result = await runCodingLoop({ ...input, execution: { context_complete: true, prepared_tool_call, failed_attempts: 2 } });
    assert.equal(result.handoff, "gather_context");
    assert.deepEqual(result.partner_model.reason_codes, ["repeated_failures"]);
    assert.equal(result.partner_model.required, false);
  }
});

test("a flat ask_user distribution does not hand off to the user", async t => {
  t.mock.method(globalThis, "fetch", async () => {
    const response = fixture({ next: "ask_user", nextConfidence: 0.99 });
    const keys = Object.keys(response.answers.next.probabilities);
    const flat = 1 / keys.length;
    response.answers.next.probabilities = Object.fromEntries(keys.map(key => [key, flat]));
    response.answers.next.confidence = 0.99;
    return Response.json(response);
  });
  const result = await runCodingLoop(input);
  assert.equal(result.handoff, "review");
  assert.notEqual(result.handoff, "ask_user");
  assert.equal(result.partner_model.required, false);
  assert.deepEqual(result.partner_model.reason_codes, ["next_step_uncertain"]);
});

test("terminal stop and user input never invoke a partner", async t => {
  for (const next of ["stop", "ask_user"] as const) {
    const fetch = reply(t, { next, done: 0.95, tier: "reasoning" });
    const result = await runCodingLoop(input);
    assert.equal(result.handoff, next);
    assert.equal(result.partner_model.required, false);
    fetch.mock.restore();
  }
});

test("unsafe work and unsupported stopping stay under review", async t => {
  for (const options of [{ risk: 2 as const }, { next: "stop" as const, done: 0.1 }]) {
    const fetch = reply(t, options);
    const result = await runCodingLoop(input);
    assert.equal(result.action, "review");
    assert.equal(result.handoff, "review");
    assert.equal(result.partner_model.required, false);
    fetch.mock.restore();
  }
});

test("uncertain risk cannot authorize partner spend even when legacy policy accepts its expected score", async t => {
  reply(t, { riskUncertain: true });
  const result = await runCodingLoop(input);
  assert.equal(result.action, "review");
  assert.equal(result.handoff, "review");
  assert.deepEqual(result.partner_model.reason_codes, ["coding_policy_requires_review"]);
  assert.equal(result.partner_model.required, false);
});

test("truncated context cannot authorize either tools or a partner", async t => {
  reply(t);
  const result = await runCodingLoop({ ...input, observation: "x".repeat(200_000), execution: { context_complete: true, prepared_tool_call: true } });
  assert.equal(result.coverage.complete, false);
  assert.equal(result.truncated, true);
  assert.equal(result.action, "review");
  assert.equal(result.handoff, "gather_context");
  assert.deepEqual(result.partner_model.reason_codes, ["incomplete_context"]);
  assert.equal(result.partner_model.required, false);
});

test("permissive thresholds cannot lower the confidence floor for paid generation", async t => {
  for (const options of [{ generation: 0.51 }, { nextConfidence: 0.51 }, { tierConfidence: 0.51 }, { moreContext: 0.49 }]) {
    const fetch = reply(t, options);
    const result = await runCodingLoop({ ...input, auto_accept: 0, review_at: 0 });
    assert.equal(result.partner_model.required, false);
    assert.equal(result.thresholds.partner_auto_accept, 0.8);
    fetch.mock.restore();
  }
});

test("overstated confidence cannot buy a partner turn with a weak distribution", async t => {
  for (const field of ["next", "model_tier", "risk"] as const) {
    for (const confidence of [0, 0.79]) {
      const fetch = t.mock.method(globalThis, "fetch", async () => {
        const response = fixture({ nextConfidence: field === "next" ? confidence : undefined, tierConfidence: field === "model_tier" ? confidence : undefined });
        if (field === "risk") {
          const peak = (1 + 2 * confidence) / 3;
          const rest = (1 - peak) / 2;
          response.answers.risk.probabilities = { "0": peak, "1": rest, "2": rest };
          response.answers.risk.score = 3 * rest;
        }
        response.answers[field].confidence = 0.99;
        return Response.json(response);
      });
      const result = await runCodingLoop({ ...input, auto_accept: 0, review_at: 0 });
      assert.equal(result.handoff, "review");
      assert.equal(result.partner_model.required, false);
      fetch.mock.restore();
    }
  }
});

test("partner routing accepts the exact context uncertainty boundary", async t => {
  for (const [auto_accept, moreContext] of [[0.8, 0.2], [0.9, 0.1], [1, 0]]) {
    const fetch = reply(t, { nextConfidence: 1, tierConfidence: 1, generation: 1, moreContext });
    const result = await runCodingLoop({ ...input, auto_accept });
    assert.equal(result.handoff, "partner_model");
    assert.equal(result.partner_model.required, true);
    fetch.mock.restore();
  }
});

test("context uncertainty above the boundary still prevents a partner turn", async t => {
  reply(t, { moreContext: 0.200001 });
  const result = await runCodingLoop(input);
  assert.equal(result.handoff, "gather_context");
  assert.deepEqual(result.partner_model.reason_codes, ["context_needed_or_uncertain"]);
});

test("partner routing retains inclusive confidence and negative-generation boundaries", async t => {
  const atFloor = reply(t, { nextConfidence: 0.8, tierConfidence: 0.8, generation: 0.8, moreContext: 0.2 });
  assert.equal((await runCodingLoop(input)).partner_model.required, true);
  atFloor.mock.restore();
  reply(t, { generation: 0.2 });
  const result = await runCodingLoop(input);
  assert.equal(result.handoff, "gather_context");
  assert.deepEqual(result.partner_model.reason_codes, ["generation_not_required"]);
});

test("missing API keys and malformed provider answers fail instead of routing", async t => {
  const fetch = reply(t);
  const key = process.env.TYPESAFE_API_KEY;
  delete process.env.TYPESAFE_API_KEY;
  try {
    await assert.rejects(runCodingLoop(input), error => errorDetails(error).code === "CONFIG_ERROR");
    assert.equal(fetch.mock.callCount(), 0);
  } finally {
    process.env.TYPESAFE_API_KEY = key;
  }
  fetch.mock.restore();
  t.mock.method(globalThis, "fetch", async () => {
    const response = fixture();
    const { needs_generation: _removed, ...answers } = response.answers;
    return Response.json({ ...response, answers });
  });
  await assert.rejects(runCodingLoop(input), error => errorDetails(error).code === "INVALID_RESPONSE");
});

test("mock mode reports uncertainty instead of asserting generation is necessary", async () => {
  process.env.JEV_MCP_MOCK = "1";
  try {
    const result = await runCodingLoop({ ...input, observation: "Implement new code and solve a complex architecture problem." });
    assert.equal(result.needs_generation, 0.5);
    assert.equal(result.partner_model.required, false);
  } finally {
    process.env.JEV_MCP_MOCK = "0";
  }
});

test("mock execution metadata is not evidence that an unfinished task completed or failed", async () => {
  process.env.JEV_MCP_MOCK = "1";
  try {
    const result = await runCodingLoop({ task: "Add parser validation", observation: "Inspect parser exports before starting implementation." });
    assert.notEqual(result.next.choice, "stop");
    assert.ok(result.done_enough < 0.5);
    assert.ok(result.tests_likely_fail < 0.5);
  } finally {
    process.env.JEV_MCP_MOCK = "0";
  }
});
