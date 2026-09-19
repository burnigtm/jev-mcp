# jev-mcp

A local stdio MCP server that gives Cursor, Codex, and other MCP clients typed [TypeSafe Jev](https://docs.typesafe.ai/introduction.md) judgments. Jev returns Choice, Score, and Noul answers; the host agent still edits files and runs commands.

## Tools

| Tool | Purpose |
| --- | --- |
| `jev_coding_loop` | Route the next step and decide whether a partner model is needed |
| `jev_tool_route` | Select an exact host-prepared tool call without generating arguments |
| `jev_review` | Assess a proposed patch |
| `jev_verify` | Check claims against supplied evidence |
| `jev_gate` | Combine patch review and claim verification in one upstream call |
| `jev_screen` | Screen untrusted content before the host reads it |
| `jev_rank` | Rank candidates supplied by the host |
| `jev_evaluate` | Ask custom, atomic typed questions |

Results include typed answers, token usage, and an `action`: `auto`, `review`, or `escalate`. Confidence measures model certainty, not factual truth. Incomplete context never permits `auto`; reduce the input and submit it again for a complete judgment.

Question packs are MCP resources at `jev://packs/{coding-loop,tool-route,review,verify,screen,rank,gate}`.

## Coding with fewer partner-model turns

Let host code execute known steps and prepare exact tool calls from an existing plan. When a semantic choice is needed, pass those calls to `jev_tool_route`; it returns an executable `call` only for a confident, suitable selection with complete context and validated host facts. The host executes that call and routes again using the new observation. Jev never invents arguments or executes tools.

When a new plan or code may be needed, use `jev_coding_loop` with trusted `execution` facts. Its `handoff` distinguishes tool use, context gathering, review, user input, stopping, and a partner model. Invoke a generative partner only when `partner_model.required` is `true`; the legacy `model_tier` answer alone does not request a model turn. Uncertainty and escalation do not automatically spend a partner turn.

The prepared-call router accepts at most 32 candidates. Empty or wholly ineligible lists return locally with zero Jev usage. Other routing calls use Jev; this reduces unnecessary generative handoffs by policy, but live quality and cost savings have not been measured. See [the tool contracts](docs/tools.md) and [host workflow](skills/jev-mcp/SKILL.md).

## Quick start

Install Node 20+ and run from a checkout:

```bash
npm ci
npm run build
```

Set a [TypeSafe API key](https://console.typesafe.ai/settings/keys) in your shell, then run diagnostics:

```bash
export TYPESAFE_API_KEY=ts_...
node dist/index.js doctor
node dist/index.js doctor --json
```

PowerShell:

```powershell
$env:TYPESAFE_API_KEY = 'ts_...'
node dist/index.js doctor --json
```

For a deterministic local demo, set `JEV_MCP_MOCK=1` instead. Mock mode is for tests and demos, not production decisions. Neither the CLI nor MCP automatically reads `.env`; see [configuration](docs/configuration.md) for explicit environment-file use.

**Cursor:** copy [the MCP example](examples/cursor.mcp.json) into `.cursor/mcp.json`, replace its argument with the absolute path to this checkout's `dist/index.js`, and set the key in `env`.

**Codex:** register the absolute path:

```bash
codex mcp add jev --env TYPESAFE_API_KEY=ts_... -- node /absolute/path/to/jev-mcp/dist/index.js
```

Copy [the agent skill](skills/jev-mcp/SKILL.md) into the project so the host knows when to call these tools. Detailed setup and the Windows checkout helper are in [installation](docs/install.md).

## CLI

```bash
node dist/index.js                       # stdio MCP
node dist/index.js doctor                # human-readable diagnostics on stderr
node dist/index.js doctor --json         # structured diagnostics on stdout
node dist/index.js eval --stdin < request.json
```

An evaluation request contains `state` and a `questions` map:

```json
{
  "state": "Production payouts are failing. Urgent.",
  "questions": {
    "urgent": { "type": "noul", "instructions": "Is this urgent?" }
  }
}
```

Diagnostics do not log request content or API keys. Calls have a 30-second total deadline by default, configurable with `JEV_MCP_TIMEOUT_MS`. API failures and invalid responses return typed errors rather than fabricated judgments.

## Limits and policy

State plus questions must fit the estimated 64,000-token total budget and the 32,000-token state-plus-longest-question budget. State may be shortened; results expose incomplete coverage and cannot automatically accept a judgment based on omitted context. Questions alone that exceed the budget are rejected.

Rank accepts unique candidate IDs and at most 5,000 supplied candidates, with at most 250 options per upstream call. Larger lists use repeated reduction rounds; each candidate text is capped at 2,000 characters. Verify and gate accept at most 1,000 claims. It ranks supplied candidates and does not index your repository. Arithmetic and date calculations belong in host code.

All eight tools expose an MCP output schema and return the same successful payload through both `structuredContent` and the JSON text content. Tool-route judgments receive sanitized candidate descriptions and argument shapes; raw host arguments are retained only for the selected, locally validated call.

## Development

```bash
npm test
npm run typecheck
npm run build
npm run test:package
```

The regular suite runs without a key; the live test is skipped unless a key is present and mock mode is disabled. Package smoke testing builds and packs the project, installs the tarball into an isolated directory with `npm --offline`, then runs its shipped CLI. Run `npm ci` first to populate the dependency cache. No test publishes the package.

`npm pack` and `npm publish` build automatically through `prepack`. CI checks Node 20 and 22 on Windows and Linux, including the offline packed-install smoke test.

## Documentation

| Document | Contents |
| --- | --- |
| [Changelog](docs/changelog.md) | Unreleased changes, compatibility notes, and validation |
| [Architecture](docs/architecture.md) | Request path, policy, limits, and errors |
| [Tools](docs/tools.md) | Arguments and outputs for all eight tools |
| [Install](docs/install.md) | Host configuration and Windows checkout |
| [Configuration](docs/configuration.md) | Environment, thresholds, diagnostics, tests |
| [Agent skill](skills/jev-mcp/SKILL.md) | Calling guidance for the host |
| [AGENTS.md](AGENTS.md) | Short project guidance |
