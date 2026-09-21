import assert from "node:assert/strict";
import { createServer, type ServerResponse } from "node:http";
import { test } from "node:test";
import type { Questions } from "@typesafe-ai/sdk";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { mock } from "node:test";
import { TypeSafeClient } from "@typesafe-ai/sdk";
import { createJevServer } from "../src/server.ts";
import { systemOne, withToolContext } from "../src/typesafe.ts";
import { mockSystemOne } from "../src/mock.ts";
import { errorDetails } from "../src/errors.ts";
import { MAX_TOTAL_TOKENS } from "../src/limits.ts";
import { runEvaluate } from "../src/tools/evaluate.ts";

type Payload = { state: unknown; questions: Questions; model: string };
type Handler = (payload: Payload, response: ServerResponse, attempt: number) => void;

async function withApi<T>(handler: Handler, operation: (calls: () => number) => Promise<T>, timeoutMs = 3_000): Promise<T> {
  let count = 0;
  const names = ["TYPESAFE_API_KEY", "TYPESAFE_BASE_URL", "JEV_MCP_MOCK", "JEV_MCP_TIMEOUT_MS"];
  const previous = new Map(names.map(name => [name, process.env[name]]));
  const server = createServer(async (request, response) => {
    const parts: Buffer[] = [];
    for await (const part of request) parts.push(Buffer.from(part));
    handler(JSON.parse(Buffer.concat(parts).toString()), response, ++count);
  });
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  process.env.TYPESAFE_API_KEY = "local-fixture-key";
  process.env.TYPESAFE_BASE_URL = `http://127.0.0.1:${address.port}`;
  process.env.JEV_MCP_MOCK = "0";
  process.env.JEV_MCP_TIMEOUT_MS = String(timeoutMs);
  try {
    return await operation(() => count);
  } finally {
    for (const [name, value] of previous) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
    server.closeAllConnections();
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
}

function errorChain(error: unknown): string {
  const parts: string[] = [];
  let current: unknown = error;
  for (let depth = 0; depth < 6 && current; depth += 1) {
    if (current instanceof Error) {
      parts.push(current.message);
      current = current.cause;
    } else {
      parts.push(String(current));
      break;
    }
  }
  return parts.join(" ");
}

const request = { state: "Test fixture", questions: { ok: { type: "noul" as const, instructions: "Is this a test?" } } };
function send(response: ServerResponse, body: unknown) {
  response.writeHead(200, { "content-type": "application/json" });
  response.end(JSON.stringify(body));
}

test("HTTP adapter validates all three primitives from an actual local server", async () => {
  await withApi((payload, response) => send(response, mockSystemOne(payload)), async calls => {
    const result = await systemOne({
      state: "A local fixture about production risk", questions: {
        ...request.questions,
        best: { type: "choice", instructions: "Which kind?", criteria: { local: "local", remote: "remote" } },
        risk: { type: "score", instructions: "How risky?", criteria: ["low", "high"] },
      },
    });
    assert.equal(result.answers.ok.type, "noul");
    assert.equal(result.answers.best.type, "choice");
    assert.equal(result.answers.risk.type, "score");
    assert.equal(result.coverage.complete, true);
    assert.equal(calls(), 1);
  });
});

test("429 and 503 retries stay within a single operation", async () => {
  await withApi((payload, response, attempt) => {
    if (attempt < 3) {
      response.writeHead(attempt === 1 ? 429 : 503, { "retry-after-ms": "0" });
      response.end("temporary fixture failure");
    } else send(response, mockSystemOne(payload));
  }, async calls => {
    const result = await systemOne(request);
    assert.equal(result.answers.ok.type, "noul");
    assert.equal(calls(), 3);
  });
});

test("malformed or incomplete provider answers never reach policy", async () => {
  const fixtures: unknown[] = [null,
    { model: "fixture", usage: { input_tokens: 1, output_tokens: 1 }, answers: {} },
    { model: "fixture", usage: { input_tokens: 1, output_tokens: 1 }, answers: { ok: { type: "noul", noul: 1.2 } } },
    { model: "fixture", usage: { input_tokens: -1, output_tokens: 1 }, answers: { ok: { type: "noul", noul: 0.9 } } },
  ];
  await withApi((_payload, response, attempt) => send(response, fixtures[attempt - 1]), async calls => {
    for (const _fixture of fixtures) await assert.rejects(systemOne(request), error => errorDetails(error).code === "INVALID_RESPONSE");
    assert.equal(calls(), fixtures.length);
  });
  await withApi((_payload, response) => { response.end("not JSON"); }, async () => {
    await assert.rejects(systemOne(request), error => errorDetails(error).code === "INVALID_RESPONSE");
  });
});

test("choice output must name supplied options and contain a valid distribution", async () => {
  const variants = [
    { choice: "other", probabilities: { a: 0.9, b: 0.1 } },
    { choice: "a", probabilities: { a: 1, b: 1 } },
    { choice: "a", probabilities: { a: 1 } },
    { choice: "a", probabilities: { a: 0, b: 1 } },
  ];
  await withApi((_payload, response, attempt) => send(response, {
    model: "fixture", usage: { input_tokens: 1, output_tokens: 1 },
    answers: { best: { type: "choice", confidence: 0.9, ...variants[attempt - 1] } },
  }), async () => {
    for (const _variant of variants) await assert.rejects(systemOne({ state: "x", questions: {
      best: { type: "choice", instructions: "Pick", criteria: { a: "A", b: "B" } },
    } }), error => errorDetails(error).code === "INVALID_RESPONSE");
  });
});

test("score output must agree with the expected value of its distribution", async () => {
  await withApi((_payload, response) => send(response, {
    model: "fixture", usage: { input_tokens: 1, output_tokens: 1 },
    answers: { risk: { type: "score", score: 0, confidence: 1, legend: { "0": "low", "1": "high" }, probabilities: { "0": 0, "1": 1 } } },
  }), async () => {
    await assert.rejects(systemOne({ state: "x", questions: { risk: { type: "score", instructions: "Risk?", criteria: ["low", "high"] } } }), error => errorDetails(error).code === "INVALID_RESPONSE");
  });
});

test("oversized question rejection happens before any network call", async () => {
  await withApi((payload, response) => send(response, mockSystemOne(payload)), async calls => {
    await assert.rejects(systemOne({ state: "x", questions: { ok: { type: "noul", instructions: "x".repeat(140_000) } } }),
      error => errorDetails(error).code === "INPUT_TOO_LARGE");
    assert.equal(calls(), 0);
  });
});

test("total deadline covers multiple upstream calls and aborts a stalled response", async () => {
  await withApi((payload, response, attempt) => {
    if (attempt === 1) send(response, mockSystemOne(payload));
    // Second response deliberately never ends.
  }, async calls => {
    const started = Date.now();
    await assert.rejects(withToolContext(undefined, async context => {
      await systemOne(request, context);
      await systemOne(request, context);
    }), error => errorDetails(error).code === "TIMEOUT");
    assert.equal(calls(), 2);
    assert.ok(Date.now() - started < 10_000);
  }, 2_000);
});

test("caller cancellation interrupts Retry-After without another retry", async () => {
  const controller = new AbortController();
  await withApi((_payload, response) => {
    response.writeHead(429, { "retry-after": "5" });
    response.end("try later");
    setTimeout(() => controller.abort(), 30);
  }, async calls => {
    await assert.rejects(systemOne(request, { signal: controller.signal }), error => errorDetails(error).code === "CANCELLED");
    assert.equal(calls(), 1);
  });
});

test("MCP cancellation reaches the active HTTP request", async () => {
  const controller = new AbortController();
  let closed!: () => void;
  const closedPromise = new Promise<void>(resolve => { closed = resolve; });
  await withApi((_payload, response) => {
    response.on("close", closed);
    controller.abort();
  }, async () => {
    const server = createJevServer();
    const client = new Client({ name: "cancel-test", version: "0" });
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
    try {
      await assert.rejects(client.callTool({ name: "jev_evaluate", arguments: request }, undefined, { signal: controller.signal }));
      let timer: ReturnType<typeof setTimeout>;
      try {
        await Promise.race([closedPromise, new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error("HTTP request was not cancelled")), 2_000); })]);
      } finally { clearTimeout(timer!); }
    } finally { await client.close(); await server.close(); }
  });
});

test("SDK attempt timeout is the remaining deadline and timeouts are not retried", async () => {
  const seen: number[] = [];
  let retryTimeout = true;
  mock.method(TypeSafeClient.prototype, "systemOne", async function (this: TypeSafeClient, request: Payload) {
    seen.push(this.timeout);
    retryTimeout = this.retry.apiTimeoutError;
    return mockSystemOne(request);
  });
  try {
    await withApi(() => undefined, async () => {
      await systemOne(request);
    }, 30_000);
  } finally {
    mock.restoreAll();
  }
  assert.equal(seen.length, 1);
  assert.ok(seen[0]! > 10_000 && seen[0]! <= 30_000);
  assert.equal(retryTimeout, false);
});

test("the client refuses redirects instead of following the API key", async () => {
  await withApi((_payload, response) => {
    response.writeHead(302, { location: "http://127.0.0.1:9/collect-key" });
    response.end();
  }, async calls => {
    await assert.rejects(systemOne(request), (error: unknown) => /redirect/i.test(errorChain(error)));
    assert.ok(calls() >= 1 && calls() <= 3);
  });
});

test("provider input_tokens above the budget keep evaluate from auto", async () => {
  await withApi((payload, response) => {
    const body = mockSystemOne(payload);
    body.usage.input_tokens = MAX_TOTAL_TOKENS + 1;
    send(response, body);
  }, async () => {
    const result = await runEvaluate({
      state: "Tests pass and the change is complete.",
      questions: { ok: { type: "noul", instructions: "Is this fine?" } },
    });
    assert.equal(result.coverage.complete, false);
    assert.equal(result.truncated, true);
    assert.notEqual(result.action, "auto");
  });
});

test("provider error bodies do not leak into structured MCP errors", async () => {
  await withApi((_payload, response) => {
    response.writeHead(401, { "content-type": "application/json" });
    response.end(JSON.stringify({ message: "secret fixture body and credentials" }));
  }, async () => {
    await assert.rejects(systemOne(request), error => {
      const details = errorDetails(error);
      assert.deepEqual(details, { code: "API_ERROR", message: "TypeSafe API request failed (HTTP 401).", retryable: false });
      return true;
    });
  });
});
