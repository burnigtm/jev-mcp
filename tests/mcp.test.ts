import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createJevServer } from "../src/server.ts";

const previousMock = process.env.JEV_MCP_MOCK;

before(() => {
  process.env.JEV_MCP_MOCK = "1";
});

after(() => {
  if (previousMock === undefined) {
    delete process.env.JEV_MCP_MOCK;
  } else {
    process.env.JEV_MCP_MOCK = previousMock;
  }
});

test("MCP lists six tools and five packs", async () => {
  const server = createJevServer();
  const client = new Client({ name: "test", version: "0.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  try {
    const tools = await client.listTools();
    const names = tools.tools.map((tool) => tool.name).sort();
    assert.deepEqual(names, [
      "jev_coding_loop",
      "jev_evaluate",
      "jev_rank",
      "jev_review",
      "jev_screen",
      "jev_verify",
    ]);
    const resources = await client.listResources();
    assert.equal(resources.resources.length, 5);
    const pack = await client.readResource({ uri: "jev://packs/coding-loop" });
    assert.ok(pack.contents[0] && "text" in pack.contents[0]);
    const called = await client.callTool({
      name: "jev_evaluate",
      arguments: {
        state: "ASAP please fix the failing payouts.",
        questions: {
          urgent: { type: "noul", instructions: "Is this urgent?" },
        },
      },
    });
    assert.equal(called.isError, undefined);
    const text = (called.content as Array<{ type: string; text?: string }>)[0]?.text ?? "";
    const body = JSON.parse(text) as { answers: { urgent: { type: string } } };
    assert.equal(body.answers.urgent.type, "noul");
  } finally {
    await client.close();
    await server.close();
  }
});
