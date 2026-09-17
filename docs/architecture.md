# Architecture

jev-mcp is a local **stdio MCP server**. Cursor, Codex, Claude Code, Amp, and any other MCP host spawn it as a child process. The host still owns files, the terminal, and code generation. This process only calls [TypeSafe Jev](https://docs.typesafe.ai/introduction.md) and applies **policy in TypeScript**.

```text
Cursor / Codex agent
        |  MCP stdio (JSON-RPC)
        v
   jev-mcp (Node 20+)
        |  named question packs + thresholds
        v
   TypeSafe POST /v1/systemone   or   local mock judge
        |
        v
   typed answers + probabilities + confidence
        |
        v
   action: auto | review | escalate
```

## Why Jev sits beside the coder, not instead of it

Jev is a System One **evaluation** model (`jev-latest`). It does not generate tokens of prose or code. You send shared `state` plus a map of questions. Each question is one of:

| Primitive | Meaning | Returns |
| --- | --- | --- |
| **Noul** | Is this true? | Probability in `[0, 1]` |
| **Choice** | Pick one closed option | Winner, full distribution, confidence |
| **Score** | Grade on an ordered rubric | Expected score, distribution, confidence |

All questions in one HTTP request run **in parallel and in isolation**. Adding questions barely changes latency. That is the cheap swarm: many atomic judgments, then code combines them. A swarm of chat models would be slower, costlier, and would still need parsing.

Official API: `POST https://api.typesafe.ai/v1/systemone` with `Authorization: Bearer $TYPESAFE_API_KEY`. This repo talks to it through [`@typesafe-ai/sdk`](https://docs.typesafe.ai/sdk/javascript.md).

## Source map

| Path | Role |
| --- | --- |
| [`src/index.ts`](../src/index.ts) | CLI: default stdio, `doctor`, `eval` |
| [`src/server.ts`](../src/server.ts) | MCP tools + `jev://packs/*` resources |
| [`src/typesafe.ts`](../src/typesafe.ts) | Live client or mock; truncates oversized state |
| [`src/mock.ts`](../src/mock.ts) | Deterministic judge for tests and demos |
| [`src/policy.ts`](../src/policy.ts) | `auto` / `review` / `escalate` (and screen pass/block/skip) |
| [`src/packs/`](../src/packs) | Frozen question JSON for each recipe |
| [`src/tools/`](../src/tools) | One file per MCP tool |
| [`src/limits.ts`](../src/limits.ts) | Token budgets, 250-candidate chunks, 2k char caps |
| [`skills/jev-mcp/SKILL.md`](../skills/jev-mcp/SKILL.md) | Tells the host **when** to call tools |

## Request path

1. The host calls a tool with JSON arguments.
2. The tool builds a TypeSafe `questions` map (or accepts one for `jev_evaluate`).
3. [`fitState`](../src/limits.ts) enforces TypeSafe budgets: 64k tokens for state+questions, 32k for state + the longest question. Oversized state is truncated and `truncated: true` is returned.
4. If `JEV_MCP_MOCK=1`, [`mockSystemOne`](../src/mock.ts) answers locally. Else a missing `TYPESAFE_API_KEY` becomes a clear error (the host does not hang).
5. Live calls use the SDK retry policy (429 / 5xx). Logs go to **stderr** so stdout stays MCP JSON-RPC.
6. Policy reads confidence, noul values, and scores, then sets `action`.
7. The MCP result is JSON text the host model can branch on.

## Confidence vs probability

Choice and Score answers include both a full `probabilities` map and a derived `confidence` (how peaked the distribution is). Noul is only a yes-probability; this server treats “how sure” as `abs(noul - 0.5) * 2` when it needs a single number.

High confidence does **not** mean the answer is true. It means Jev is not torn between the options you defined. Keep policy, weights, and thresholds in code so a human can review them in one file: [`src/policy.ts`](../src/policy.ts).

Default bands (overridable per call or with env vars):

- **auto** — confidence ≥ `0.8` and risk is low
- **review** — medium confidence, or high-stakes even when confident
- **escalate** — confidence < `0.5`, or a hard fail (contradicted claim, injection block, unsafe patch)

Destructive coding-loop risk (`risk` score ≥ 1.5) never returns `auto`.

## Limits we encode, not guess

From TypeSafe’s own docs, including [Jev 1.13 jaggedness](https://docs.typesafe.ai/model-jaggedness/jev-1.13.md):

- Do not ask Jev to write code, count, do math, or compare dates. Do that in TypeScript.
- Do not hide several judgments in one question. Split, then combine.
- Filter state first. Unrelated bulk context hurts accuracy.
- Choice options are a closed set. Jev cannot invent a new id.
- `jev_rank` caps a Choice at 250 options. Larger lists are chunked, then winners are re-ranked.

## Mock mode

`JEV_MCP_MOCK=1` never calls the network. It is for unit tests, `doctor`, and demos without a key. It is **not** calibrated like Jev. Do not use mock verdicts in production routing.

## What we deliberately omit

- File and shell tools (the host already has them)
- Repo indexing (you pass candidates into `jev_rank`)
- Remote HTTP MCP / OAuth (stdio is what Cursor and Codex spawn locally)
- Vercel AI Gateway as a second backend (official TypeSafe API only)
