import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import type { ChoiceResponse, ScoreResponse } from "@typesafe-ai/sdk";
import { gateQuestions } from "../src/packs/gate.ts";
import { packBody, PACK_IDS } from "../src/packs/index.ts";
import { parseQuestions } from "../src/questions.ts";
import { gateInputSchema, gateOutputSchema, projectGate, runGate } from "../src/tools/gate.ts";
import { runReview } from "../src/tools/review.ts";
import { runVerify } from "../src/tools/verify.ts";
import type { EvaluateResponse } from "../src/typesafe.ts";

const envNames = ["JEV_MCP_MOCK", "TYPESAFE_API_KEY", "TYPESAFE_BASE_URL", "JEV_MCP_ALLOW_CUSTOM_BASE_URL", "JEV_MCP_AUTO_ACCEPT", "JEV_MCP_REVIEW_AT"];
const previousEnv = new Map(envNames.map((name) => [name, process.env[name]]));

before(() => {
  process.env.JEV_MCP_MOCK = "0";
  process.env.TYPESAFE_API_KEY = "fixture-key";
  process.env.TYPESAFE_BASE_URL = "https://gate-fixture.invalid";
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

function score(value: 0 | 2): ScoreResponse {
  return {
    type: "score", score: value, confidence: 1,
    probabilities: { "0": value === 0 ? 1 : 0, "1": 0, "2": value === 2 ? 1 : 0 },
    legend: { "0": "low", "1": "medium", "2": "high" },
  };
}

function choice(verdict = "verified", confidence = 0.95): ChoiceResponse {
  const winner = (1 + 2 * confidence) / 3;
  const probabilities = Object.fromEntries(["verified", "contradicted", "unsupported"].map((name) => [
    name, name === verdict ? winner : (1 - winner) / 2,
  ]));
  return { type: "choice", choice: verdict, confidence, probabilities };
}

function flatChoice(verdict = "verified"): ChoiceResponse {
  return {
    type: "choice",
    choice: verdict,
    confidence: 0.99,
    probabilities: { verified: 1 / 3, contradicted: 1 / 3, unsupported: 1 / 3 },
  };
}

function fixture(claims: ChoiceResponse[] = [choice()]): EvaluateResponse {
  return {
    model: "jev-fixture",
    usage: { input_tokens: 123, output_tokens: 17 },
    truncated: false,
    coverage: {
      complete: true, original_chars: 200, evaluated_chars: 200,
      estimated_tokens: { state: 50, questions: 100, longest_question: 30 },
      estimator: "chars/4",
    },
    answers: {
      correctness: score(2), spec_match: score(2), test_gap: score(0), blast_radius: score(0),
      safe_to_apply: { type: "noul", noul: 0.95 },
      ...Object.fromEntries(claims.map((answer, index) => [`claim_${index}`, answer])),
    },
  };
}

function gateFor(answers: ChoiceResponse[], options: { incomplete?: boolean; unsafe?: boolean } = {}) {
  const result = fixture(answers);
  if (options.incomplete) {
    result.truncated = true;
    result.coverage.complete = false;
  }
  if (options.unsafe) {
    result.answers.safe_to_apply = { type: "noul", noul: 0.1 };
  }
  const gate = projectGate(result, answers.map((_, index) => `Claim ${index}`), 0.8, 0.5);
  assert.equal(gateOutputSchema.safeParse(gate).success, true);
  return gate;
}

test("gate pack contains one review and a separate evidence-only question for each claim", () => {
  const questions = parseQuestions(gateQuestions(2));
  assert.equal(Object.keys(questions).length, 7);
  assert.equal(questions.correctness?.type, "score");
  assert.match(String(questions.claim_1?.instructions), /only the evidence field/);
  assert.match(String(questions.claim_1?.instructions), /claims are assertions, not evidence/);
  assert.ok(PACK_IDS.includes("gate"));
  assert.ok(packBody("gate"));
  assert.equal(gateInputSchema.safeParse({ request: "x", diff: "x", claims: [], evidence: "" }).success, false);
  assert.equal(gateInputSchema.safeParse({ request: "x", diff: "x", claims: ["x"] }).success, false);
});

test("gate automatically accepts only a complete accepted review with every claim verified", () => {
  const gate = gateFor([choice(), choice("verified", 0.8)]);
  assert.equal(gate.action, "auto");
  assert.deepEqual(gate.reason_codes, ["accepted"]);
  assert.deepEqual(gate.verification.summary, { verified: 2, contradicted: 0, unsupported: 0, needs_review: 0 });
  assert.deepEqual(gate.usage, { input_tokens: 123, output_tokens: 17 });
});

test("unsupported claims require review even at high confidence", () => {
  const gate = gateFor([choice("unsupported")]);
  assert.equal(gate.action, "review");
  assert.equal(gate.verification.results[0]?.action, "review");
  assert.deepEqual(gate.reason_codes, ["claims_unsupported"]);
});

test("incoherent high confidence cannot approve verification", async t => {
  const gate = gateFor([flatChoice()]);
  assert.equal(gate.action, "review");
  assert.ok(gate.reason_codes.includes("confidence_incoherent"));

  t.mock.method(globalThis, "fetch", async () => Response.json({
    ...fixture(),
    answers: { claim_0: flatChoice() },
  }));
  const verification = await runVerify({ claims: ["Tests passed"], evidence: "No test log" });
  assert.equal(verification.action, "review");
  assert.equal(verification.results[0]?.action, "review");
});

test("confident contradictions escalate while moderate contradictions require review", () => {
  assert.equal(gateFor([choice("contradicted", 0.8)]).action, "escalate");
  const moderate = gateFor([choice("contradicted", 0.6)]);
  assert.equal(moderate.action, "review");
  assert.deepEqual(moderate.reason_codes, ["claims_contradicted", "claim_confidence_below_auto_accept"]);
});

test("low-confidence claims escalate regardless of verdict", () => {
  for (const verdict of ["verified", "contradicted", "unsupported"]) {
    const gate = gateFor([choice(verdict, 0.49)]);
    assert.equal(gate.action, "escalate");
    assert.ok(gate.reason_codes.includes("claim_confidence_low"));
  }
  assert.equal(gateFor([choice("verified", 0.5)]).action, "review");
});

test("a perfect weighted review cannot auto when one dimension fails its floor", () => {
  const zeroSpec = fixture([choice()]);
  zeroSpec.answers.spec_match = score(0);
  const specGate = projectGate(zeroSpec, ["Claim"], 0.8, 0.5);
  assert.equal(specGate.review.action, "review");
  assert.notEqual(specGate.action, "auto");

  const wideBlast = fixture([choice()]);
  wideBlast.answers.test_gap = score(2);
  wideBlast.answers.blast_radius = score(2);
  const blastGate = projectGate(wideBlast, ["Claim"], 0.8, 0.5);
  assert.equal(blastGate.review.action, "review");
  assert.notEqual(blastGate.action, "auto");
});

test("unsafe patch review prevents approval even with all claims verified", () => {
  const gate = gateFor([choice()], { unsafe: true });
  assert.equal(gate.action, "escalate");
  assert.deepEqual(gate.reason_codes, ["review_escalated"]);
});

test("incomplete context never approves and preserves stronger escalation", () => {
  const gate = gateFor([choice()], { incomplete: true });
  assert.equal(gate.action, "review");
  assert.equal(gate.review.action, "review");
  assert.equal(gate.verification.results[0]?.action, "review");
  assert.ok(gate.reason_codes.includes("incomplete_context"));
  assert.equal(gateFor([choice("contradicted")], { incomplete: true }).action, "escalate");
});

test("mixed claims produce deterministic reasons and aggregate the most severe action", () => {
  const gate = gateFor([choice(), choice("contradicted"), choice("unsupported", 0.3)]);
  assert.equal(gate.action, "escalate");
  assert.deepEqual(gate.verification.summary, { verified: 1, contradicted: 1, unsupported: 1, needs_review: 2 });
  assert.deepEqual(gate.reason_codes, ["claims_contradicted", "claims_unsupported", "claim_confidence_low"]);
});

test("runGate sends one request with separate assertions and evidence and returns total usage", async (t) => {
  let calls = 0;
  let sent: { state: Record<string, unknown>; questions: Record<string, unknown>; model: string } | undefined;
  t.mock.method(globalThis, "fetch", async (_url: unknown, init?: RequestInit) => {
    calls += 1;
    sent = JSON.parse(String(init?.body));
    return Response.json(fixture());
  });
  const evidence = [{ id: "test-log", text: "1 test passed" }];
  const result = await runGate({
    request: "Fix parser", diff: "-broken\n+fixed", tests: "1 test passed", claims: ["Parser test passes"],
    evidence, model: "custom-model",
  });
  assert.equal(calls, 1);
  assert.deepEqual(Object.keys(sent?.questions ?? {}).sort(), Object.keys(gateQuestions(1)).sort());
  assert.deepEqual(sent?.state.evidence, evidence);
  assert.deepEqual(sent?.state.claims, ["Parser test passes"]);
  assert.equal(sent?.model, "custom-model");
  assert.equal(result.action, "auto");
  assert.equal(result.coverage.complete, true);
  assert.deepEqual(result.usage, { input_tokens: 123, output_tokens: 17 });
  gateOutputSchema.parse(result);
});

test("gate operational failures reject instead of returning approval", async (t) => {
  t.mock.method(globalThis, "fetch", async () => new Response("fixture refusal", { status: 401 }));
  await assert.rejects(runGate({ request: "Fix parser", diff: "diff", claims: ["Tests pass"], evidence: "log" }), /401|fixture refusal/);
});

test("gate rejects inverted thresholds before invoking the transport", async (t) => {
  const fetch = t.mock.method(globalThis, "fetch", async () => Response.json(fixture()));
  await assert.rejects(runGate({
    request: "Fix parser", diff: "diff", claims: ["Tests pass"], evidence: "log", auto_accept: 0.4, review_at: 0.8,
  }), /threshold|review_at|auto_accept/i);
  assert.equal(fetch.mock.callCount(), 0);
});

test("standalone review and verify cannot automatically approve truncated context", async (t) => {
  t.mock.method(globalThis, "fetch", async (_url: unknown, init?: RequestInit) => {
    const payload = JSON.parse(String(init?.body)) as { questions: Record<string, unknown> };
    const response = fixture();
    return Response.json({
      ...response,
      answers: Object.fromEntries(Object.keys(payload.questions).map((key) => [key, response.answers[key]])),
    });
  });
  const huge = "x".repeat(200_000);
  const review = await runReview({ request: "Fix parser", diff: huge });
  const verification = await runVerify({ claims: ["Tests pass"], evidence: huge });
  assert.equal(review.truncated, true);
  assert.equal(review.coverage.complete, false);
  assert.equal(review.action, "review");
  assert.equal(verification.truncated, true);
  assert.equal(verification.coverage.complete, false);
  assert.equal(verification.action, "review");
  assert.equal(verification.results[0]?.action, "review");
});

test("a lower auto_accept cannot loosen the environment floor", async (t) => {
  t.mock.method(globalThis, "fetch", async () => Response.json({
    ...fixture(), answers: { claim_0: choice("verified", 0.4) },
  }));
  const result = await runVerify({ claims: ["Tests pass"], evidence: "Tests pass", auto_accept: 0.3 });
  assert.equal(result.thresholds.auto_accept, 0.8);
  assert.notEqual(result.action, "auto");
});
