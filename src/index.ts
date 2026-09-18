#!/usr/bin/env node
import { VERSION } from "./version.js";

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const cmd = argv[0];
  if (cmd === "doctor") {
    if (argv.slice(1).some(arg => arg !== "--json")) throw new Error("Usage: jev-mcp doctor [--json]");
    const { runDoctor } = await import("./cli.js");
    await runDoctor({ json: argv.includes("--json") });
    return;
  }
  if (cmd === "eval") {
    const { runEval } = await import("./cli.js");
    await runEval(argv.slice(1));
    return;
  }
  if (cmd === "help" || cmd === "--help" || cmd === "-h") {
    printHelp();
    return;
  }
  if (cmd) {
    console.error(`Unknown command: ${cmd}`);
    printHelp();
    process.exitCode = 1;
    return;
  }
  const { runStdio } = await import("./server.js");
  await runStdio();
}

function printHelp(): void {
  console.error(`jev-mcp ${VERSION} — TypeSafe Jev MCP server

Usage:
  jev-mcp                 Start stdio MCP (Cursor, Codex, any MCP client)
  jev-mcp doctor [--json] Check env, API key, and a tiny live/mock ping
  jev-mcp eval --json '{ "state": "...", "questions": { ... } }'
  jev-mcp eval --state TEXT --questions JSON
  jev-mcp eval --stdin
`);
}

main().catch(async (err) => {
  const { errorMessage } = await import("./errors.js");
  console.error(errorMessage(err));
  process.exit(1);
});
