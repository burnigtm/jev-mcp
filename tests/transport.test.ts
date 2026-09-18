import assert from "node:assert/strict";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

test("all eight tools and seven resources work through subprocess stdio", { timeout: 90_000 }, async () => {
  const env = Object.fromEntries(Object.entries(process.env).filter((entry): entry is [string, string] => entry[1] !== undefined && !/^(JEV_MCP_|TYPESAFE_)/.test(entry[0])));
  env.JEV_MCP_MOCK = "1";
  const transport = new StdioClientTransport({ command: process.execPath, args: ["--import", "tsx", "src/index.ts"], cwd: fileURLToPath(new URL("../", import.meta.url)), env, stderr: "pipe" });
  const client = new Client({ name: "stdio-regression", version: "0" });
  const fixtures: Array<[string, Record<string, unknown>]> = [
    ["jev_evaluate", { state: "fixture", questions: { ok: { type: "noul", instructions: "Is this a fixture?" } } }],
    ["jev_coding_loop", { task: "Fix parser", observation: "Tests passed" }],
    ["jev_review", { request: "Correct typo", diff: "- teh\n+ the", tests: "Documentation only" }],
    ["jev_verify", { claims: ["Tests passed"], evidence: "Tests passed" }],
    ["jev_screen", { text: "Ordinary explanatory text containing useful first-party documentation for a test fixture." }],
    ["jev_rank", { query: "token budget", candidates: [{ id: "src/limits.ts", text: "token budget" }, { id: "other", text: "installation" }] }],
    ["jev_gate", { request: "Fix parser", diff: "-broken\n+fixed", tests: "Tests passed", claims: ["Tests passed"], evidence: "Tests passed" }],
    ["jev_tool_route", { task: "Inspect parser", observation: "Read parser source before editing", candidates: [{ id: "parser", name: "read_file", arguments: { path: "src/parser.ts" }, description: "Inspect parser source", effect: "read_only", authorized: true, schema_valid: true, preconditions_met: true }] }],
  ];
  try {
    await client.connect(transport);
    let stderr = "";
    transport.stderr?.on("data", data => { stderr += String(data); });
    const listed = await client.listTools();
    assert.equal(listed.tools.length, 8);
    assert.ok(listed.tools.find(tool => tool.name === "jev_gate")?.outputSchema);
    for (const [name, args] of fixtures) {
      const result = await client.callTool({ name, arguments: args });
      assert.notEqual(result.isError, true, JSON.stringify(result));
      const body = JSON.parse((result.content as Array<{ text: string }>)[0]!.text);
      assert.match(body.model, /\+mock$/);
      assert.ok(["auto", "review", "escalate"].includes(body.action));
      assert.equal(body.coverage.complete, true);
      if (name === "jev_gate" || name === "jev_tool_route") assert.deepEqual(result.structuredContent, body);
    }
    const resources = await client.listResources();
    assert.equal(resources.resources.length, 7);
    for (const resource of resources.resources) assert.equal((await client.readResource({ uri: resource.uri })).contents.length, 1);
    const invalid = await client.callTool({ name: "jev_evaluate", arguments: { state: "fixture", questions: {} } });
    assert.equal(invalid.isError, true);
    assert.equal((invalid.structuredContent as { error: { code: string } }).error.code, "INVALID_INPUT");
    const oversized = await client.callTool({ name: "jev_gate", arguments: { ...fixtures[6]![1], claims: Array.from({ length: 1_000 }, () => "Tests passed") } });
    assert.equal(oversized.isError, true);
    assert.equal(oversized.structuredContent, undefined);
    assert.equal(JSON.parse((oversized.content as Array<{ text: string }>)[0]!.text).error.code, "INPUT_TOO_LARGE");
    assert.equal(stderr, "");
  } finally { await client.close(); }
});
