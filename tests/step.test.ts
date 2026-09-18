import assert from "node:assert/strict";
import { createServer, type ServerResponse } from "node:http";
import { test } from "node:test";
import type { Questions } from "@typesafe-ai/sdk";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { errorDetails } from "../src/errors.ts";
import { packBody, PACK_IDS } from "../src/packs/index.ts";
import { stepQuestions } from "../src/packs/step.ts";
import { parseQuestions } from "../src/questions.ts";
import { createJevServer } from "../src/server.ts";
import { runStep, stepOutputSchema, type StepInput } from "../src/tools/step.ts";
import type { ToolCandidate } from "../src/tools/tool-route.ts";

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
  process.env.TYPESAFE_API_KEY = "local-step-fixture-key";
  process.env.TYPESAFE_BASE_URL = `http://127.0.0.1:${address.port}`;
  process.env.JEV_MCP_MOCK = "0";
  process.env.JEV_MCP_TIMEOUT_MS = "10000";
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

type Knobs = {
  next?: "continue" | "retry" | "ask_user" | "stop";
  nextConfidence?: number;
  tier?: "cheap" | "standard" | "reasoning";
  tierConfidence?: number;
  risk?: 0 | 1 | 2;
  done?: number;
  moreContext?: number;
  generation?: number;
  testsFail?: number;
  selected?: string;
  selectionConfidence?: number;
  flatSelection?: boolean;
  suitability?: number[];
};

function choiceAnswer(question: Questions[string], winner: string, confidence: number) {
  assert.equal(question.type, "choice");
  const options = Object.keys(question.criteria!);
  const peak = (1 + (options.length - 1) * confidence) / options.length;
  return {
    type: "choice" as const, choice: winner, confidence,
    probabilities: Object.fromEntries(options.map(id => [id, id === winner ? peak : (1 - peak) / (options.length - 1)])),
  };
}

function scoreAnswer(question: Questions[string], level: number) {
  assert.equal(question.type, "score");
  const levels = question.criteria as readonly string[];
  return {
    type: "score" as const, score: level, confidence: 1,
    probabilities: Object.fromEntries(levels.map((_text, index) => [String(index), index === level ? 1 : 0])),
    legend: Object.fromEntries(levels.map((text, index) => [String(index), text])),
  };
}

// Deliberately authored provider judgments, not heuristic mock decisions.
function judgment(payload: Payload, knobs: Knobs = {}) {
  const questions = payload.questions;
  const selectionConfidence = knobs.selectionConfidence ?? 0.98;
  const answers: Record<string, unknown> = {
    next: choiceAnswer(questions.next!, knobs.next ?? "continue", knobs.nextConfidence ?? 0.98),
    model_tier: choiceAnswer(questions.model_tier!, knobs.tier ?? "standard", knobs.tierConfidence ?? 0.98),
    focus: choiceAnswer(questions.focus!, "edit", 0.98),
    risk: scoreAnswer(questions.risk!, knobs.risk ?? 0),
    done_enough: { type: "noul", noul: knobs.done ?? 0.1 },
    needs_more_context: { type: "noul", noul: knobs.moreContext ?? 0.05 },
    needs_generation: { type: "noul", noul: knobs.generation ?? 0.95 },
    tests_likely_fail: { type: "noul", noul: knobs.testsFail ?? 0.2 },
  };
  if (questions.selected) {
    const selected = choiceAnswer(questions.selected, knobs.selected ?? "call_0", selectionConfidence);
    if (knobs.flatSelection) {
      const options = Object.keys(questions.selected.criteria!);
      selected.probabilities = Object.fromEntries(options.map(id => [id, 1 / options.length]));
    }
    answers.selected = selected;
    for (const id of Object.keys(questions).filter(name => name.startsWith("suitable_"))) {
      answers[id] = { type: "noul", noul: knobs.suitability?.[Number(id.slice("suitable_".length))] ?? 0.99 };
    }
  }
  return { model: "jev-local-fixture", usage: { input_tokens: 321, output_tokens: 19 }, answers };
}

function candidate(overrides: Partial<ToolCandidate> = {}): ToolCandidate {
  return {
    id: "read-parser", name: "mcp.files.read", arguments: { path: "src/parser.ts" },
    description: "Read the parser before editing", effect: "read_only",
    authorized: true, schema_valid: true, preconditions_met: true,
    ...overrides,
  };
}

function input(overrides: Partial<StepInput> = {}): StepInput {
  return {
    task: "Fix the parser",
    observation: "The parser fails on an empty string",
    candidates: [candidate()],
    execution: { prepared_tool_call: false, context_complete: true, failed_attempts: 0 },
    ...overrides,
  };
}

test("step pack fuses both recipes and keeps the coding-loop map when nothing is eligible", () => {
  const alone = parseQuestions(stepQuestions(0));
  assert.deepEqual(Object.keys(alone).sort(), [
    "done_enough", "focus", "model_tier", "needs_generation", "needs_more_context", "next", "risk", "tests_likely_fail",
  ]);
  const fused = parseQuestions(stepQuestions(2));
  assert.equal(Object.keys(fused).length, Object.keys(alone).length + 3);
  assert.equal(fused.selected.type, "choice");
  assert.deepEqual(Object.keys(fused.selected.criteria), ["none", "call_0", "call_1"]);
  assert.equal(fused.suitable_1.type, "noul");
  assert.ok(PACK_IDS.includes("step"));
  assert.doesNotThrow(() => parseQuestions((packBody("step") as { example: Questions }).example));
});

test("one request answers both recipes and returns the exact prepared call", async () => {
  const nested = {
    patch: "@@\n-old\n+new", options: { dryRun: false, version: null }, paths: ["a.ts", 2, true],
    constructor: { prototype: { preserve: true } }, prototype: "ordinary JSON key",
  };
  let sent: Payload | undefined;
  await withApi((payload, response) => {
    sent = payload;
    send(response, judgment(payload, { selected: "call_1", suitability: [0.02, 0.99] }));
  }, async calls => {
    const result = await runStep(input({
      candidates: [
        candidate({ id: "none" }),
        candidate({ id: "__proto__ is a legal id", name: " mcp__workspace__apply_patch ", effect: "local_write", arguments: nested }),
      ],
    }));
    assert.equal(calls(), 1, "the fused router must not make a second request");
    assert.ok(sent);
    // Both packs travel in one question map.
    for (const id of ["next", "model_tier", "risk", "needs_generation", "selected", "suitable_0", "suitable_1"]) {
      assert.ok(Object.hasOwn(sent.questions, id), `missing question ${id}`);
    }
    assert.equal(result.handoff, "execute_tool");
    assert.deepEqual(result.call, {
      candidate_id: "__proto__ is a legal id", name: " mcp__workspace__apply_patch ", arguments: nested,
    });
    assert.equal(result.action, "auto");
    assert.deepEqual(result.reason_codes, ["accepted"]);
    assert.equal(result.partner_model.required, false);
    assert.equal(result.selection?.id, "__proto__ is a legal id");
    assert.equal(result.next.choice, "continue");
    assert.equal(result.thresholds.dispatch_at, 0.8);
    assert.doesNotThrow(() => stepOutputSchema.parse(result));
  });
});

test("terminal and user-input decisions outrank a dispatchable call", async () => {
  for (const [next, done] of [["stop", 0.9], ["ask_user", 0.1]] as const) {
    await withApi((payload, response) => {
      send(response, judgment(payload, { next, done }));
    }, async calls => {
      const result = await runStep(input());
      assert.equal(calls(), 1);
      assert.equal(result.call, null);
      assert.equal(result.handoff, next);
      assert.ok(result.reason_codes.includes("routing_blocked_dispatch"));
      assert.equal(result.partner_model.required, false);
    });
  }
});

test("repeated failures and destructive risk block dispatch without a partner turn", async () => {
  await withApi((payload, response) => send(response, judgment(payload)), async () => {
    const result = await runStep(input({ execution: { prepared_tool_call: false, context_complete: true, failed_attempts: 2 } }));
    assert.equal(result.handoff, "gather_context");
    assert.equal(result.call, null);
    assert.ok(result.reason_codes.includes("routing_blocked_dispatch"));
    assert.deepEqual(result.partner_model.reason_codes, ["repeated_failures"]);
  });
  await withApi((payload, response) => send(response, judgment(payload, { risk: 2 })), async () => {
    const result = await runStep(input());
    assert.equal(result.handoff, "review");
    assert.equal(result.call, null);
    assert.equal(result.action, "review");
    assert.equal(result.partner_model.required, false);
  });
});

test("absent and wholly ineligible candidates ask no selection question", async () => {
  await withApi((payload, response) => send(response, judgment(payload)), async calls => {
    const result = await runStep(input({ candidates: undefined }));
    assert.equal(calls(), 1);
    assert.ok(result.reason_codes.includes("no_candidates"));
    assert.equal(result.selection, null);
    assert.deepEqual(result.blocked_candidates, []);
  });

  let sent: Payload | undefined;
  await withApi((payload, response) => {
    sent = payload;
    send(response, judgment(payload));
  }, async calls => {
    const result = await runStep(input({
      candidates: [candidate({ id: "unapproved", authorized: false }), candidate({ id: "guessy", schema_valid: false, effect: "unknown" })],
    }));
    assert.equal(calls(), 1);
    assert.ok(sent);
    assert.equal(Object.hasOwn(sent.questions, "selected"), false);
    assert.equal(Object.keys(sent.questions).some(id => id.startsWith("suitable_")), false);
    assert.deepEqual((sent.state as { candidates: unknown[] }).candidates, []);
    assert.ok(result.reason_codes.includes("no_eligible_candidates"));
    assert.deepEqual(result.blocked_candidates, [
      { id: "unapproved", reason_codes: ["not_authorized"] },
      { id: "guessy", reason_codes: ["arguments_not_validated", "unknown_effect"] },
    ]);
    assert.equal(result.call, null);
  });
});

test("incomplete coverage never dispatches, including a full 32-candidate map", async () => {
  const candidates = Array.from({ length: 32 }, (_value, index) => candidate({ id: `call-${index}` }));
  await withApi((payload, response) => send(response, judgment(payload)), async calls => {
    const result = await runStep(input({ candidates, observation: "context ".repeat(25_000) }));
    assert.equal(calls(), 1);
    assert.equal(result.truncated, true);
    assert.equal(result.coverage.complete, false);
    assert.equal(result.call, null);
    assert.ok(result.reason_codes.includes("incomplete_context"));
    assert.equal(result.handoff, "gather_context");
    assert.equal(result.partner_model.required, false);
    assert.notEqual(result.action, "auto");
  });
});

test("external writes and destructive effects require review instead of dispatch", async () => {
  for (const effect of ["external_write", "destructive"] as const) {
    for (const contextComplete of [true, false]) {
      await withApi((payload, response) => send(response, judgment(payload)), async () => {
        const result = await runStep(input({
          candidates: [candidate({ effect })],
          execution: { prepared_tool_call: false, context_complete: contextComplete, failed_attempts: 0 },
        }));
        assert.equal(result.call, null);
        assert.equal(result.handoff, "review");
        assert.equal(result.action, "review");
        assert.ok(result.reason_codes.includes("effect_requires_review"));
        assert.equal(result.partner_model.required, false);
      });
    }
  }
});

test("a terminal decision still outranks a selected call that would need review", async () => {
  await withApi((payload, response) => send(response, judgment(payload, { next: "stop", done: 0.9 })), async () => {
    const result = await runStep(input({ candidates: [candidate({ effect: "destructive" })] }));
    assert.equal(result.handoff, "stop");
    assert.equal(result.call, null);
  });
});

test("permissive thresholds and flat distributions cannot dispatch", async () => {
  await withApi((payload, response) => send(response, judgment(payload, { selectionConfidence: 0.79 })), async () => {
    const result = await runStep(input({ auto_accept: 0, review_at: 0 }));
    assert.equal(result.call, null);
    assert.equal(result.thresholds.dispatch_at, 0.8);
    assert.ok(result.reason_codes.includes("selection_uncertain"));
  });
  await withApi((payload, response) => send(response, judgment(payload, { flatSelection: true })), async () => {
    const result = await runStep(input());
    assert.equal(result.call, null);
    assert.ok(result.reason_codes.includes("selection_uncertain"));
  });
  await withApi((payload, response) => send(response, judgment(payload, { suitability: [0.5] })), async () => {
    const result = await runStep(input());
    assert.equal(result.call, null);
    assert.ok(result.reason_codes.includes("suitability_uncertain"));
  });
});

test("prepared candidates Jev declines do not buy a generative turn", async () => {
  await withApi((payload, response) => send(response, judgment(payload, { selectionConfidence: 0.6 })), async () => {
    const result = await runStep(input());
    assert.equal(result.handoff, "gather_context");
    assert.equal(result.partner_model.required, false);
    assert.deepEqual(result.partner_model.reason_codes, ["prepared_candidates_declined"]);
    assert.equal(result.action, "review");
  });
});

test("a confident none still allows the partner turn the coding loop asked for", async () => {
  await withApi((payload, response) => send(response, judgment(payload, { selected: "none" })), async () => {
    const result = await runStep(input());
    assert.equal(result.call, null);
    assert.deepEqual(result.reason_codes, ["no_suitable_call"]);
    assert.equal(result.handoff, "partner_model");
    assert.equal(result.partner_model.required, true);
    assert.equal(result.partner_model.tier, "standard");
    assert.equal(result.action, "auto");
  });
});

test("MCP exposes structured step results and typed errors without invalid success content", async () => {
  await withApi((payload, response) => send(response, judgment(payload)), async calls => {
    const server = createJevServer();
    const client = new Client({ name: "step-test", version: "0.0.0" });
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
    try {
      const ok = await client.callTool({ name: "jev_step", arguments: input() as Record<string, unknown> });
      assert.equal(ok.isError, undefined);
      assert.equal((ok.structuredContent as { handoff: string }).handoff, "execute_tool");
      assert.equal(calls(), 1);

      // The fused router inherits the shared candidate schema, including its
      // rejection of own __proto__ keys that JSON.parse creates.
      const polluted = input({
        candidates: [candidate({ arguments: JSON.parse('{"options":{"__proto__":{"flag":true}},"path":"src/parser.ts"}') })],
      });
      await assert.rejects(runStep(polluted), error => errorDetails(error).code === "INVALID_INPUT");
      const rejected = await client.callTool({ name: "jev_step", arguments: polluted as Record<string, unknown> });
      assert.equal(rejected.isError, true);
      assert.equal(rejected.structuredContent, undefined);
      assert.match((rejected.content as Array<{ text?: string }>)[0]?.text ?? "", /__proto__/);

      // Inverted thresholds pass the schema and fail inside the tool, so the
      // typed error arrives as JSON text rather than structured content.
      const inverted = await client.callTool({
        name: "jev_step",
        arguments: input({ auto_accept: 0.3, review_at: 0.9 }) as Record<string, unknown>,
      });
      assert.equal(inverted.isError, true);
      assert.equal(inverted.structuredContent, undefined);
      const text = (inverted.content as Array<{ text?: string }>)[0]?.text ?? "";
      assert.equal(JSON.parse(text).error.code, "INVALID_INPUT");
      assert.equal(calls(), 1, "rejected input must not reach the provider");
    } finally {
      await client.close();
      await server.close();
    }
  });
});
