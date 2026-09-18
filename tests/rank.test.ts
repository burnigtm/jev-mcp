import assert from "node:assert/strict";
import { after, afterEach, before, beforeEach, mock, test } from "node:test";
import { TypeSafeClient, type Questions } from "@typesafe-ai/sdk";
import { JevTimeoutError, JevValidationError } from "../src/errors.ts";
import { MAX_CANDIDATE_CHARS, MAX_CHOICE_OPTIONS, fitState } from "../src/limits.ts";
import { mockSystemOne } from "../src/mock.ts";
import { runRank } from "../src/tools/rank.ts";

type Request = {
  state: { query: string; candidates: Array<{ id: string; original_id: string; text: string }> };
  questions: Questions;
  model: string;
};

const previousMock = process.env.JEV_MCP_MOCK;
const previousKey = process.env.TYPESAFE_API_KEY;
const previousTimeout = process.env.JEV_MCP_TIMEOUT_MS;
let requests: Request[] = [];

before(() => {
  // Exercise the live request path with a fully local deterministic transport.
  process.env.JEV_MCP_MOCK = "0";
  process.env.TYPESAFE_API_KEY = "rank-test-local-only";
  process.env.JEV_MCP_TIMEOUT_MS = "120000";
});

beforeEach(() => {
  requests = [];
  mock.method(TypeSafeClient.prototype, "systemOne", async (request: Request) => {
    requests.push(request);
    return mockSystemOne(request);
  });
});

afterEach(() => mock.restoreAll());

after(() => {
  if (previousMock === undefined) delete process.env.JEV_MCP_MOCK;
  else process.env.JEV_MCP_MOCK = previousMock;
  if (previousKey === undefined) delete process.env.TYPESAFE_API_KEY;
  else process.env.TYPESAFE_API_KEY = previousKey;
  if (previousTimeout === undefined) delete process.env.JEV_MCP_TIMEOUT_MS;
  else process.env.JEV_MCP_TIMEOUT_MS = previousTimeout;
});

function assertRequestsFit() {
  for (const request of requests) {
    const best = request.questions.best;
    assert.equal(best?.type, "choice");
    if (best?.type !== "choice") throw new Error("Missing best Choice");
    const count = Object.keys(best.criteria).length;
    assert.ok(count >= 2 && count <= MAX_CHOICE_OPTIONS, `Choice has ${count} candidates`);
    assert.equal(fitState(request.state, request.questions).truncated, false);
    for (const candidate of request.state.candidates) {
      assert.equal(typeof candidate.original_id, "string");
      assert.ok(candidate.original_id.length > 0);
      assert.equal(best.criteria[candidate.id], candidate.text);
      assert.ok(candidate.text.length <= MAX_CANDIDATE_CHARS);
    }
  }
}

test("rank preserves every original ID, including collision-prone and special IDs", async () => {
  const ids = [
    "src/auth.ts", "src_auth.ts", "__proto__", "constructor", "ключі/用户.ts",
    `${"a".repeat(90)}x`, `${"a".repeat(90)}y`,
  ];
  const result = await runRank({
    query: "rotate API keys",
    candidates: ids.map((id) => ({ id, text: id === "src_auth.ts" ? "rotate API keys" : "unrelated invoices" })),
    top_k: ids.length,
  });
  assert.equal(result.winner, "src_auth.ts");
  assert.deepEqual(new Set(result.top.map((hit) => hit.id)), new Set(ids));
  assert.equal(result.exists_verdict, "answered");
  assert.deepEqual(new Set(requests[0]!.state.candidates.map(candidate => candidate.original_id)), new Set(ids));
  assertRequestsFit();
});

test("rank uses filenames and symbols in original IDs even when texts do not match", async () => {
  const result = await runRank({
    query: "auth key rotation",
    candidates: [
      { id: "src/billing/invoices.ts", text: "export function handle() {}" },
      { id: "src/auth/key-rotation.ts", text: "export function handle() {}" },
      { id: "src/support/contact.ts", text: "export function handle() {}" },
    ],
    top_k: 1,
  });
  assert.equal(result.winner, "src/auth/key-rotation.ts");
  assert.equal(result.exists_verdict, "answered");
  assertRequestsFit();
});

test("rank rejects actual duplicate IDs before making a request", async () => {
  await assert.rejects(
    runRank({ query: "keys", candidates: [{ id: "a", text: "one" }, { id: "a", text: "two" }] }),
    (error: unknown) => error instanceof JevValidationError && /unique ID/.test(error.message),
  );
  assert.equal(requests.length, 0);
});

for (const count of [250, 251]) {
  test(`rank handles ${count} candidates without one-option or oversized Choices`, async () => {
    const result = await runRank({
      query: "rotate API keys",
      candidates: Array.from({ length: count }, (_, index) => ({
        id: `path/${index}`,
        text: index === count - 1 ? "rotate API keys" : "unrelated invoices",
      })),
      top_k: 3,
    });
    assert.equal(result.winner, `path/${count - 1}`);
    assert.equal(result.top.length, 3);
    assert.equal(result.chunked, count > 250);
    assert.equal(new Set(requests.flatMap(request => request.state.candidates.map(candidate => candidate.original_id))).size, count);
    assertRequestsFit();
    if (count === 251) {
      assert.deepEqual(requests.map((request) => request.state.candidates.length), [250, 4]);
    }
  });
}

test("rank uses further tournament rounds when finalists exceed 250", async () => {
  const result = await runRank({
    query: "rotate API keys",
    candidates: Array.from({ length: 1500 }, (_, index) => ({ id: `c${index}`, text: "rotate API keys" })),
    top_k: 50,
  });
  assert.equal(result.top.length, 50);
  assert.equal(result.chunked, true);
  assert.equal(new Set(result.top.map((hit) => hit.id)).size, 50);
  assert.deepEqual(requests.map((request) => request.state.candidates.length), [250, 250, 250, 250, 250, 250, 250, 50, 100]);
  assertRequestsFit();
});

test("rank batches by context and reports consistently capped candidate text", async () => {
  const result = await runRank({
    query: "rotate API keys",
    candidates: Array.from({ length: 120 }, (_, index) => ({
      id: `c${index}`,
      text: `rotate API keys ${"documentation ".repeat(300)}`,
    })),
    top_k: 5,
  });
  assert.equal(result.chunked, true);
  assert.equal(result.top.length, 5);
  assert.equal(result.truncated, true);
  assert.equal(result.action, "review");
  assert.equal(result.coverage.complete, false);
  assert.equal(result.coverage.candidate_fields.candidates_considered, 120);
  assert.ok(result.coverage.candidate_fields.evaluated_chars < result.coverage.candidate_fields.original_chars);
  assert.ok(requests.length > 1);
  assertRequestsFit();
});

test("rank fails actionably rather than looping or discarding requested top hits", async () => {
  await assert.rejects(
    runRank({
      query: "rotate API keys",
      candidates: Array.from({ length: 100 }, (_, index) => ({ id: `c${index}`, text: "x".repeat(2000) })),
      top_k: 50,
    }),
    (error: unknown) => error instanceof JevValidationError && /Lower top_k or shorten/.test(error.message),
  );
  assert.equal(requests.length, 0);
});

test("rank rejects a query too large to fit even one candidate", async () => {
  await assert.rejects(
    runRank({ query: "q".repeat(140000), candidates: [{ id: "a", text: "one" }, { id: "b", text: "two" }] }),
    (error: unknown) => error instanceof JevValidationError && /Shorten the query/.test(error.message),
  );
  assert.equal(requests.length, 0);
});

test("rank keeps the same deadline across batches and the final round", async () => {
  let now = Date.now();
  const deadline = now + 10000;
  mock.method(Date, "now", () => now);
  mock.method(TypeSafeClient.prototype, "systemOne", async (request: Request) => {
    requests.push(request);
    now += 6000;
    return mockSystemOne(request);
  });
  await assert.rejects(
    runRank({
      query: "rotate API keys",
      candidates: Array.from({ length: 260 }, (_, index) => ({ id: `c${index}`, text: "rotate API keys" })),
      top_k: 3,
    }, { deadline }),
    JevTimeoutError,
  );
  assert.equal(requests.length, 2, "the final round must not receive a fresh timeout budget");
});
