import assert from "node:assert/strict";
import { createServer, type ServerResponse } from "node:http";
import { test } from "node:test";
import type { Questions } from "@typesafe-ai/sdk";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { errorDetails } from "../src/errors.ts";
import { packBody, PACK_IDS } from "../src/packs/index.ts";
import { toolRouteQuestions } from "../src/packs/tool-route.ts";
import { parseQuestions } from "../src/questions.ts";
import { createJevServer } from "../src/server.ts";
import { runToolRoute, toolRouteInputSchema, toolRouteOutputSchema, type ToolRouteInput } from "../src/tools/tool-route.ts";

type Payload = { state: unknown; questions: Questions; model: string };
type Handler = (payload: Payload, response: ServerResponse, attempt: number) => void;

async function withApi<T>(handler: Handler, operation: (calls: () => number) => Promise<T>): Promise<T> {
  let count = 0;
  const names = ["TYPESAFE_API_KEY", "TYPESAFE_BASE_URL", "JEV_MCP_MOCK", "JEV_MCP_TIMEOUT_MS", "JEV_MCP_AUTO_ACCEPT", "JEV_MCP_REVIEW_AT"];
  const previous = new Map(names.map(name => [name, process.env[name]]));
  const server = createServer(async (request, response) => {
    const parts: Buffer[] = [];
    for await (const part of request) parts.push(Buffer.from(part));
    handler(JSON.parse(Buffer.concat(parts).toString()), response, ++count);
  });
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  process.env.TYPESAFE_API_KEY = "local-route-fixture-key";
  process.env.TYPESAFE_BASE_URL = `http://127.0.0.1:${address.port}`;
  process.env.JEV_MCP_MOCK = "0";
  process.env.JEV_MCP_TIMEOUT_MS = "3000";
  process.env.JEV_MCP_AUTO_ACCEPT = "0.8";
  process.env.JEV_MCP_REVIEW_AT = "0.5";
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

function send(response: ServerResponse, body: unknown) {
  response.writeHead(200, { "content-type": "application/json" });
  response.end(JSON.stringify(body));
}

// Deliberately authored provider judgments, not heuristic mock decisions.
function judgment(payload: Payload, selected = "call_0", confidence = 0.98, suitability: number[] = []) {
  const selection = payload.questions.selected;
  assert.equal(selection.type, "choice");
  const options = Object.keys(selection.criteria);
  const winner = (1 + (options.length - 1) * confidence) / options.length;
  return {
    model: "jev-local-fixture",
    usage: { input_tokens: 123, output_tokens: 7 },
    answers: {
      selected: {
        type: "choice", choice: selected, confidence,
        probabilities: Object.fromEntries(options.map(id => [id, id === selected ? winner : (1 - winner) / (options.length - 1)])),
      },
      ...Object.fromEntries(Object.keys(payload.questions).filter(id => id.startsWith("suitable_")).map(id => [id, {
        type: "noul", noul: suitability[Number(id.slice("suitable_".length))] ?? 0.99,
      }])),
    },
  };
}

function candidate(overrides: Partial<ToolRouteInput["candidates"][number]> = {}): ToolRouteInput["candidates"][number] {
  return {
    id: "read-files", name: "mcp.files.read", arguments: { path: "src/parser.ts" },
    description: "Read the parser before editing", effect: "read_only",
    authorized: true, schema_valid: true, preconditions_met: true,
    ...overrides,
  };
}

function input(candidates = [candidate()], overrides: Partial<ToolRouteInput> = {}): ToolRouteInput {
  return { task: "Fix the parser", observation: "The parser fails on an empty string", candidates, ...overrides };
}

test("tool-route pack has valid choices and independent per-call suitability judgments", () => {
  for (const count of [1, 2, 32]) {
    const questions = parseQuestions(toolRouteQuestions(count));
    assert.equal(Object.keys(questions).length, count + 1);
    assert.equal(questions.selected.type, "choice");
    assert.deepEqual(Object.keys(questions.selected.criteria), ["none", ...Array.from({ length: count }, (_, i) => `call_${i}`)]);
    for (let index = 0; index < count; index += 1) {
      assert.equal(questions[`suitable_${index}`].type, "noul");
      assert.match(questions[`suitable_${index}`].instructions, new RegExp(`state\\.candidates\\[${index}\\]`));
      assert.match(questions[`suitable_${index}`].instructions, /independent/i);
    }
  }
  assert.ok(PACK_IDS.includes("tool-route"));
  assert.doesNotThrow(() => parseQuestions((packBody("tool-route") as { example: Questions }).example));
});

test("accepted calls preserve arbitrary candidate IDs, exact names and nested JSON arguments in one request", async () => {
  const candidates = [
    candidate({ id: "none" }),
    candidate({
      id: "__proto__", name: " mcp__workspace__apply_patch ", effect: "local_write",
      arguments: {
        patch: "@@\n-old\n+new", options: { dryRun: false, version: null }, paths: ["a.ts", 2, true],
        constructor: { prototype: { preserve: true } }, prototype: "ordinary JSON key",
      },
    }),
    candidate({ id: "call_1" }),
  ];
  let sent: Payload | undefined;
  await withApi((payload, response) => {
    sent = payload;
    send(response, judgment(payload, "call_1", 0.98, [0.01, 0.99, 0.01]));
  }, async calls => {
    const result = await runToolRoute(input(candidates, { model: "fixture-request-model" }));
    assert.equal(calls(), 1);
    assert.equal(result.action, "auto");
    assert.equal(result.handoff, "execute_tool");
    assert.deepEqual(result.call, { candidate_id: candidates[1].id, name: candidates[1].name, arguments: candidates[1].arguments });
    assert.deepEqual(result.selection, { id: "__proto__", confidence: 0.98, suitability: 0.99 });
    assert.deepEqual(result.partner_model, { required: false, tier: "none" });
    assert.deepEqual(result.reason_codes, ["accepted"]);
    assert.deepEqual(result.usage, { input_tokens: 123, output_tokens: 7 });
    assert.deepEqual((sent?.state as { candidates: unknown }).candidates, candidates);
    assert.equal(sent?.model, "fixture-request-model");
    assert.equal(toolRouteOutputSchema.safeParse(result).success, true);
  });
});

test("only candidates with all trusted eligibility facts reach the provider", async () => {
  const candidates = [
    candidate({ id: "unauthorized", authorized: false }),
    candidate({ id: "unvalidated", schema_valid: false }),
    candidate({ id: "unready", preconditions_met: false }),
    candidate({ id: "unknown", effect: "unknown" }),
    candidate({ id: "failed", failed_attempts: 2 }),
    candidate({ id: "eligible", failed_attempts: 1 }),
  ];
  let sent: Payload | undefined;
  await withApi((payload, response) => { sent = payload; send(response, judgment(payload)); }, async calls => {
    const result = await runToolRoute(input(candidates));
    assert.equal(calls(), 1);
    assert.equal(result.call?.candidate_id, "eligible");
    assert.equal(result.action, "auto");
    assert.deepEqual((sent?.state as { candidates: unknown }).candidates, [candidates[5]]);
    assert.deepEqual(result.blocked_candidates, [
      { id: "unauthorized", reason_codes: ["not_authorized"] },
      { id: "unvalidated", reason_codes: ["arguments_not_validated"] },
      { id: "unready", reason_codes: ["preconditions_not_met"] },
      { id: "unknown", reason_codes: ["unknown_effect"] },
      { id: "failed", reason_codes: ["retry_budget_exhausted"] },
    ]);
  });
});

test("empty lists, missing eligibility facts and exhausted retries never call a provider or partner", async () => {
  await withApi((payload, response) => send(response, judgment(payload)), async calls => {
    const empty = await runToolRoute(input([]));
    assert.deepEqual(empty.reason_codes, ["no_candidates"]);
    assert.equal(empty.handoff, "gather_context");
    const missing = await runToolRoute(input([candidate({ authorized: undefined, schema_valid: undefined, preconditions_met: undefined })]));
    assert.deepEqual(missing.blocked_candidates[0].reason_codes, ["not_authorized", "arguments_not_validated", "preconditions_not_met"]);
    const failed = await runToolRoute(input([candidate({ failed_attempts: 2 })]));
    assert.deepEqual(failed.blocked_candidates[0].reason_codes, ["retry_budget_exhausted"]);
    for (const result of [empty, missing, failed]) {
      assert.equal(result.action, "review");
      assert.equal(result.call, null);
      assert.equal(result.selection, null);
      assert.equal(result.model, "local-policy");
      assert.deepEqual(result.partner_model, { required: false, tier: "none" });
      assert.deepEqual(result.usage, { input_tokens: 0, output_tokens: 0 });
      assert.equal(result.coverage.original_chars, 0);
      assert.equal(result.coverage.evaluated_chars, 0);
      assert.deepEqual(result.coverage.estimated_tokens, { state: 0, questions: 0, longest_question: 0 });
      toolRouteOutputSchema.parse(result);
    }
    assert.equal(calls(), 0);
  });
});

test("dispatch confidence and suitability each retain a 0.8 floor despite permissive thresholds", async () => {
  const fixtures = [
    { confidence: 0.79, suitability: 0.99, action: "review", reason: "selection_uncertain" },
    { confidence: 0.99, suitability: 0.79, action: "review", reason: "suitability_uncertain" },
    { confidence: 0.8, suitability: 0.8, action: "auto", reason: "accepted" },
  ];
  await withApi((payload, response, attempt) => {
    const fixture = fixtures[attempt - 1];
    send(response, judgment(payload, "call_0", fixture.confidence, [fixture.suitability]));
  }, async calls => {
    for (const fixture of fixtures) {
      const result = await runToolRoute(input(undefined, { auto_accept: 0.2, review_at: 0.1 }));
      assert.equal(result.action, fixture.action);
      assert.equal(result.thresholds.auto_accept, 0.8);
      assert.ok(result.reason_codes.includes(fixture.reason as typeof result.reason_codes[number]));
      assert.equal(result.call !== null, fixture.action === "auto");
    }
    assert.equal(calls(), fixtures.length);
  });
});

test("stricter dispatch thresholds and low confidence never expose an executable call", async () => {
  const fixtures = [{ confidence: 0.85, suitability: 0.99 }, { confidence: 0.49, suitability: 0.99 }, { confidence: 0.99, suitability: 0.49 }];
  await withApi((payload, response, attempt) => {
    const fixture = fixtures[attempt - 1];
    send(response, judgment(payload, "call_0", fixture.confidence, [fixture.suitability]));
  }, async calls => {
    for (let index = 0; index < fixtures.length; index += 1) {
      const result = await runToolRoute(input(undefined, { auto_accept: 0.9 }));
      assert.equal(result.call, null);
      assert.equal(result.action, index === 0 ? "review" : "escalate");
      assert.equal(result.partner_model.required, false);
      assert.equal(result.handoff, "gather_context");
    }
    assert.equal(calls(), fixtures.length);
  });
});

test("reported confidence cannot dispatch a flat or weak selection distribution", async () => {
  await withApi((payload, response, attempt) => {
    const body = judgment(payload, "call_0", attempt === 1 ? 0 : 0.79);
    body.answers.selected.confidence = 0.99;
    send(response, body);
  }, async calls => {
    for (const _ of [0, 1]) {
      const result = await runToolRoute(input(undefined, { auto_accept: 0, review_at: 0 }));
      assert.equal(result.call, null);
      assert.notEqual(result.action, "auto");
      assert.ok(result.reason_codes.includes("selection_uncertain"));
    }
    assert.equal(calls(), 2);
  });
});

test("distribution guard honors inclusive and stricter thresholds across candidate counts", async () => {
  const fixtures = [1, 32].flatMap(count => [0.8, 0.9, 1].flatMap(threshold => [true, false].map(accepted => ({ count, threshold, accepted }))));
  await withApi((payload, response, attempt) => {
    const { threshold, accepted } = fixtures[attempt - 1];
    const body = judgment(payload, "call_0", accepted ? threshold : threshold - 0.01, [1]);
    body.answers.selected.confidence = 1;
    // Valid responses may have rounding error in the total probability mass.
    for (const key of Object.keys(body.answers.selected.probabilities)) body.answers.selected.probabilities[key] *= 0.995;
    send(response, body);
  }, async calls => {
    for (const { count, threshold, accepted } of fixtures) {
      const candidates = Array.from({ length: count }, (_, index) => candidate({ id: `candidate-${index}` }));
      const result = await runToolRoute(input(candidates, { auto_accept: threshold }));
      assert.equal(result.handoff, accepted ? "execute_tool" : "gather_context");
      assert.equal(result.call !== null, accepted);
    }
    assert.equal(calls(), fixtures.length);
  });
});

test("none and an unsuitable selected call cannot be rescued by another suitable candidate", async () => {
  await withApi((payload, response, attempt) => send(response, judgment(payload, attempt === 1 ? "none" : "call_0", 0.99, [0.05, 0.99])), async calls => {
    const request = input([candidate(), candidate({ id: "other" })]);
    const none = await runToolRoute(request);
    assert.equal(none.call, null);
    assert.equal(none.selection?.id, null);
    assert.equal(none.selection?.suitability, null);
    assert.ok(none.reason_codes.includes("no_suitable_call"));
    const unsuitable = await runToolRoute(request);
    assert.equal(unsuitable.call, null);
    assert.equal(unsuitable.selection?.id, "read-files");
    assert.equal(unsuitable.selection?.suitability, 0.05);
    assert.ok(unsuitable.reason_codes.includes("suitability_uncertain"));
    assert.equal(calls(), 2);
  });
});

test("truncated evidence cannot dispatch even an otherwise confidently suitable call", async () => {
  await withApi((payload, response) => send(response, judgment(payload)), async calls => {
    const result = await runToolRoute(input(undefined, { observation: "x".repeat(200_000) }));
    assert.equal(result.truncated, true);
    assert.equal(result.coverage.complete, false);
    assert.equal(result.call, null);
    assert.equal(result.action, "review");
    assert.ok(result.reason_codes.includes("incomplete_context"));
    assert.equal(calls(), 1);
  });
});

test("external writes and destructive calls require review even with explicit authorization", async () => {
  await withApi((payload, response) => send(response, judgment(payload)), async calls => {
    for (const effect of ["external_write", "destructive"] as const) {
      const result = await runToolRoute(input([candidate({ effect })]));
      assert.equal(result.action, "review");
      assert.equal(result.handoff, "review");
      assert.equal(result.call, null);
      assert.deepEqual(result.reason_codes, ["effect_requires_review"]);
      assert.deepEqual(result.partner_model, { required: false, tier: "none" });
    }
    assert.equal(calls(), 2);
  });
});

test("invalid IDs, candidate counts, argument JSON and thresholds fail before any provider request", async () => {
  const invalid: unknown[] = [
    input([candidate(), candidate()]),
    input(Array.from({ length: 33 }, (_, index) => candidate({ id: String(index) }))),
    input([candidate({ arguments: { bad: undefined } } as never)]),
    input([candidate({ arguments: { bad: Number.POSITIVE_INFINITY } })]),
    input([candidate({ arguments: [] } as never)]),
    input([candidate({ name: "   " })]),
    input(undefined, { auto_accept: 0.4, review_at: 0.5 }),
  ];
  assert.equal(toolRouteInputSchema.safeParse(input(Array.from({ length: 32 }, (_, index) => candidate({ id: String(index) })))).success, true);
  await withApi((payload, response) => send(response, judgment(payload)), async calls => {
    for (const request of invalid) {
      await assert.rejects(runToolRoute(request as ToolRouteInput), error => errorDetails(error).code === "INVALID_INPUT");
    }
    assert.equal(calls(), 0);
  });
});

test("proto argument keys at every nesting level reject before normalization or provider calls", async () => {
  const fixtures = [
    '{"__proto__":{"path":"critical"},"path":"src/parser.ts"}',
    '{"options":{"__proto__":{"flag":true}},"path":"src/parser.ts"}',
    '{"options":[{"__proto__":"preserve-me"}],"path":"src/parser.ts"}',
  ];
  await withApi((payload, response) => send(response, judgment(payload)), async calls => {
    const server = createJevServer();
    const client = new Client({ name: "tool-route-proto-test", version: "0" });
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
    try {
      for (const serialized of fixtures) {
        // JSON.parse creates an own property, unlike a JavaScript __proto__ literal.
        const request = input([candidate({ arguments: JSON.parse(serialized) })]);
        const parsed = toolRouteInputSchema.safeParse(request);
        assert.equal(parsed.success, false);
        if (!parsed.success) assert.match(parsed.error.message, /__proto__/);
        await assert.rejects(runToolRoute(request), error => errorDetails(error).code === "INVALID_INPUT");
        const result = await client.callTool({ name: "jev_tool_route", arguments: request });
        assert.equal(result.isError, true);
        assert.equal(result.structuredContent, undefined);
        const text = result.content.find(item => item.type === "text");
        assert.ok(text && text.type === "text");
        assert.match(text.text, /Input validation error/);
        assert.match(text.text, /__proto__/);
        assert.equal(JSON.stringify(request.candidates[0].arguments), serialized);
        assert.equal(calls(), 0);
      }
    } finally {
      await client.close();
      await server.close();
    }
  });
});

test("invalid provider choices and absent independent suitability answers fail closed", async () => {
  await withApi((payload, response, attempt) => {
    const body = judgment(payload);
    if (attempt === 1) body.answers.selected.choice = "invented-tool-id";
    else delete (body.answers as Record<string, unknown>).suitable_0;
    send(response, body);
  }, async calls => {
    for (let index = 0; index < 2; index += 1) {
      await assert.rejects(runToolRoute(input()), error => errorDetails(error).code === "INVALID_RESPONSE");
    }
    assert.equal(calls(), 2);
  });
});

test("cancelled or expired contexts also prevent the local no-candidate branch", async () => {
  await withApi((payload, response) => send(response, judgment(payload)), async calls => {
    const controller = new AbortController();
    controller.abort();
    await assert.rejects(runToolRoute(input([]), { signal: controller.signal }), error => errorDetails(error).code === "CANCELLED");
    await assert.rejects(runToolRoute(input([]), { deadline: Date.now() - 1 }), error => errorDetails(error).code === "TIMEOUT");
    assert.equal(calls(), 0);
  });
});

test("MCP exposes structured route successes and typed error text without invalid success content", async () => {
  await withApi((payload, response, attempt) => {
    const body = judgment(payload);
    if (attempt === 2) body.answers.selected.choice = "not-an-option";
    send(response, body);
  }, async calls => {
    const server = createJevServer();
    const client = new Client({ name: "tool-route-test", version: "0" });
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
    try {
      const listed = await client.listTools();
      const route = listed.tools.find(tool => tool.name === "jev_tool_route");
      assert.ok(route?.outputSchema);
      const result = await client.callTool({ name: "jev_tool_route", arguments: input() });
      assert.notEqual(result.isError, true);
      const payload = toolRouteOutputSchema.parse(result.structuredContent);
      assert.equal(payload.action, "auto");
      assert.equal(payload.call?.name, "mcp.files.read");
      const text = result.content.find(item => item.type === "text");
      assert.ok(text && text.type === "text");
      assert.deepEqual(JSON.parse(text.text), result.structuredContent);
      const error = await client.callTool({ name: "jev_tool_route", arguments: input() });
      assert.equal(error.isError, true);
      assert.equal(error.structuredContent, undefined);
      const errorText = error.content.find(item => item.type === "text");
      assert.ok(errorText && errorText.type === "text");
      assert.equal(JSON.parse(errorText.text).error.code, "INVALID_RESPONSE");
      assert.equal(calls(), 2);
    } finally {
      await client.close();
      await server.close();
    }
  });
});
