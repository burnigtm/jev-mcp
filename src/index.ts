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
  if (cmd === "feedback") {
    const { runFeedbackCommand } = await import("./cli.js");
    await runFeedbackCommand(argv.slice(1));
    return;
  }
  if (cmd === "hook") {
    const { runHookCommand } = await import("./cli.js");
    await runHookCommand(argv.slice(1));
    return;
  }
  if (cmd === "check") {
    const { runCheckCommand } = await import("./cli.js");
    await runCheckCommand();
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
  jev-mcp feedback <decision_id> <correct|false_alarm|missed> [--note TEXT]
                          Label an earlier decision in the local ledger (needs JEV_MCP_LEDGER=1)
  jev-mcp hook pre-tool-use|stop
                          Claude Code hook: reads the event on stdin, prints a permission decision or nothing
  jev-mcp hook install [--stop] [--shadow] [--block-on-failure] [--write FILE]
                          Print (or merge into FILE) the Claude Code settings that wire the hooks in
  jev-mcp check           JSON on stdin ({"kind":"action"|"changes",...}); exit 0 auto, 10 review, 20 escalate, 2 error
`);
}

main().catch(async (err) => {
  const { errorMessage } = await import("./errors.js");
  console.error(errorMessage(err));
  process.exit(1);
});
