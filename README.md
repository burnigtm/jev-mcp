# jev-mcp

MCP server that puts [TypeSafe Jev](https://docs.typesafe.ai/introduction.md) on the coding loop in **Cursor**, **Codex**, and any other MCP client.

Jev is not a chatbot. It is a System One evaluation model: you send `state` plus typed **Choice / Score / Noul** questions, and it returns probabilities and confidence in a few hundred milliseconds. It cannot write code. Cursor and Codex still generate and edit; this server is the cheap decision layer you can call on every turn.

Questions in one request run in parallel. That is the cheap swarm: many atomic judgments, then policy in code.

## Tools

| Tool | Use when |
| --- | --- |
| `jev_coding_loop` | Before a frontier retry/stop/model-tier decision |
| `jev_review` | Before declaring a patch done |
| `jev_verify` | Claims vs evidence (PR text, diffs, docs) |
| `jev_screen` | Untrusted paste/fetch, before the agent reads it |
| `jev_rank` | Rank files, symbols, errors, or skills (you pass candidates) |
| `jev_evaluate` | Escape hatch: raw System One questions |

Every tool returns typed answers, token `usage`, and `action`: `auto` | `review` | `escalate`. Thresholds are named constants in code, overridable per call.

Question packs are also MCP resources at `jev://packs/{coding-loop,review,verify,screen,rank}`.

## Install

Node 20+. Build this repo:

```bash
npm install
npm run build
```

Get a TypeSafe key from [console.typesafe.ai/settings/keys](https://console.typesafe.ai/settings/keys). Without a key, set `JEV_MCP_MOCK=1` for a deterministic local judge (tests and demos only).

### Cursor

Copy [examples/cursor.mcp.json](examples/cursor.mcp.json) into `.cursor/mcp.json` and point `args` at this repo’s `dist/index.js` (absolute path). Pass the key in `env`; some hosts drop inherited environment variables.

```json
{
  "mcpServers": {
    "jev": {
      "command": "node",
      "args": ["/absolute/path/to/jev-mcp/dist/index.js"],
      "env": {
        "TYPESAFE_API_KEY": "ts_..."
      }
    }
  }
}
```

Copy [skills/jev-mcp/SKILL.md](skills/jev-mcp/SKILL.md) into the project so the agent actually calls the tools.

### Codex

```bash
npm run build
codex mcp add jev --env TYPESAFE_API_KEY=ts_... -- node /absolute/path/to/jev-mcp/dist/index.js
```

See [examples/codex.config.toml](examples/codex.config.toml). The same binary works with Claude Code, Amp, and other stdio MCP clients.

## CLI

```bash
# stdio MCP (default)
node dist/index.js

# env / key / tiny ping
node dist/index.js doctor

# one-shot evaluate
JEV_MCP_MOCK=1 node dist/index.js eval --json '{
  "state": "Help, payouts have been failing for 3 days. ASAP.",
  "questions": {
    "urgent": { "type": "noul", "instructions": "Is this urgent?" }
  }
}'
```

## Environment

| Variable | Role |
| --- | --- |
| `TYPESAFE_API_KEY` | Live TypeSafe API |
| `JEV_MCP_MODEL` | Default `jev-latest` |
| `TYPESAFE_BASE_URL` | Optional API root |
| `JEV_MCP_MOCK` | `1` = local deterministic judge |
| `JEV_MCP_AUTO_ACCEPT` | Default `0.8` |
| `JEV_MCP_REVIEW_AT` | Default `0.5` |
| `JEV_MCP_BLOCK_AT` | Default `0.75` (screen) |

No key and no mock: tools return a clear error. They do not hang.

## Limits (from TypeSafe, enforced here)

- 64k tokens for all `state` + `questions`; 32k for `state` + the longest question. Oversized state is truncated.
- Rank: 250 candidates per Jev call (texts capped at 2,000 characters). Larger lists are chunked, then winners are re-ranked.
- Arithmetic, counts, and date math stay in TypeScript. Jev is not a calculator and does not generate text.

## Develop

```bash
npm test          # mock tests; live e2e skipped without TYPESAFE_API_KEY
npm run typecheck
```

Live API tests:

```bash
TYPESAFE_API_KEY=ts_... npm test
```

## What this is not

- Not a filesystem or shell MCP (the host already has those)
- Not a swarm of chat models
- Not a repo indexer (`jev_rank` only ranks candidates you pass in)
