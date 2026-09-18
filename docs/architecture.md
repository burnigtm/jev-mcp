# Architecture

jev-mcp is a local **stdio MCP server**. Cursor, Codex, Claude Code, Amp, and any other MCP host spawn it as a child process. The host still owns files, the terminal, and code generation. This process calls [TypeSafe Jev](https://docs.typesafe.ai/introduction.md) when a typed judgment is needed and applies **policy in TypeScript**. It never executes a selected tool or invokes a generative partner model.

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
   action + handoff + typed decision
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
| [`src/responses.ts`](../src/responses.ts) | Validates provider answer types, ranges, options, and distributions before policy |
| [`src/mock.ts`](../src/mock.ts) | Deterministic judge for tests and demos |
| [`src/policy.ts`](../src/policy.ts) | `auto` / `review` / `escalate` (and screen pass/block/skip) |
| [`src/packs/`](../src/packs) | Frozen question JSON for each recipe; `step` composes two of them |
| [`src/tools/`](../src/tools) | One file per MCP tool |
| [`src/limits.ts`](../src/limits.ts) | Token budgets, 250-candidate chunks, 2k char caps |
| [`skills/jev-mcp/SKILL.md`](../skills/jev-mcp/SKILL.md) | Tells the host **when** to call tools |

## Request path

1. The host calls a tool with JSON arguments.
2. The tool builds a TypeSafe `questions` map (or accepts one for `jev_evaluate`). `jev_tool_route` first excludes ineligible candidates; empty or wholly ineligible lists return local policy results with zero usage and no provider call.
3. [`fitState`](../src/limits.ts) enforces estimated budgets: 64k tokens for state+questions, 32k for state + the longest question. Oversized questions are rejected. State truncation includes its marker within the allowance and reports incomplete coverage. Counts use `ceil(chars / 4)`, not a provider tokenizer.
4. If `JEV_MCP_MOCK=1`, [`mockSystemOne`](../src/mock.ts) answers locally. Else a missing `TYPESAFE_API_KEY` becomes a clear error (the host does not hang).
5. Live calls use the SDK retry policy (429 / 5xx), bounded by a shared total tool deadline (default 30 seconds). MCP cancellation aborts active calls and pending retries. Request content is not logged; stdout stays MCP JSON-RPC.
6. Provider results are validated before policy reads confidence, noul values, and scores. Policy sets `action`; incomplete coverage cannot produce `auto`.
7. The MCP result is JSON text the host model can branch on.

## Tool execution without a generative turn

The host should perform deterministic work directly: maintain a plan, resolve known paths, validate schemas, track authorization and failures, and prepare complete argument objects. `jev_tool_route` adds semantic selection over at most 32 prepared calls. It asks one Choice, including `none`, and an independent suitability Noul for every eligible candidate. Questions cannot use one another's answers, so TypeScript combines selection with the corresponding suitability only after the response arrives.

Eligibility is decided locally from trusted host facts. Authorization, schema validation, and prerequisites must all explicitly pass; an unknown effect or two failures of an unchanged call blocks it. Jev cannot grant authorization or validate an unavailable host-tool schema. Candidate metadata and observations are evidence, never instructions to change routing policy.

Only complete, confident selections of suitable `read_only` or `local_write` calls can return `handoff: execute_tool` and the exact original arguments. Dispatch has a fixed minimum threshold of `0.8`, even if callers lower their judgment thresholds. External writes and destructive effects require review. Every other outcome has `call: null`. Every tool-route result has `partner_model: { required: false, tier: "none" }`.

Automatic tool dispatch and partner handoffs also check distribution concentration independently of reported confidence. After normalizing probability mass, the peak must reach `1/n + (1 - 1/n) * threshold` for `n` options. This conservative local guard prevents overstated confidence from passing a flat or weak distribution; it does not redefine the provider's confidence statistic or change the reported fields.

Host code can execute the returned call after checking current prerequisites, incorporate its observation, and repeat with the next prepared candidates. A plan can therefore support multiple tool steps without another generative turn. This server supplies the decision interface; it does not implement an autonomous executor or claim measured live cost savings.

## One round-trip per loop iteration

Routing the step and selecting the call are two questions about the same turn, and every question in a request is evaluated in parallel and in isolation. `jev_step` therefore sends the coding-loop pack and the tool-route pack as one question map ([`src/packs/step.ts`](../src/packs/step.ts)) and applies both policies in TypeScript, so a host spends one MCP round-trip where `jev_coding_loop` followed by `jev_tool_route` spends two. Each saved round-trip is a saved host-model turn, which is the expensive part of the loop.

The fused tool adds no new policy. It reuses the tool-route eligibility filter and dispatch floors for selection, and the coding-loop partner routing unchanged for the handoff, so terminal, risky, uncertain, and repeatedly failing steps still outrank a dispatchable call, and a returned call still excludes a partner request. Fusing the packs raises the question budget and lowers the state budget by the same amount; an oversized request truncates into incomplete coverage, which blocks dispatch. `jev_coding_loop` and `jev_tool_route` remain for hosts that route in two steps or need only one half.

When exact next-step arguments or a new implementation must be generated, `jev_coding_loop` decides whether a partner turn is justified. It adds an independent `needs_generation` judgment to the existing next-step, context, risk, and model-tier questions. TypeScript emits `handoff` and `partner_model` after combining these answers with the host's `execution` facts. A partner request requires an automatic continue/retry decision, explicit complete host context, confident generation need, next step, risk and tier, low context uncertainty, no prepared call, and fewer than two failed attempts. Partner confidence has the same fixed minimum `0.8` floor as prepared-call dispatch.

Prepared calls route to tools when the rest of the coding policy permits, including calls that gather missing context. Repeated failures route to context gathering; the host tracks failures of the unchanged step and updates the count only when evidence or the approach establishes a new step. Without a prepared call, missing evidence routes to context gathering. Terminal decisions, uncertain tiers or risk, incomplete coverage, and review decisions do not request a partner. The legacy `model_tier` stays available as a conditional recommendation. `review` and `escalate` are decision states, not instructions to spend a generative turn or repeat a permission request already covered by user authorization.

## Confidence vs probability

Choice and Score answers include both a full `probabilities` map and a derived `confidence` (how peaked the distribution is). Noul is only a yes-probability; this server treats “how sure” as `abs(noul - 0.5) * 2` when it needs a single number.

High confidence does **not** mean the answer is true. It means Jev is not torn between the options you defined. Keep policy, weights, and thresholds in code so a human can review them in one file: [`src/policy.ts`](../src/policy.ts).

Default judgment bands (overridable per call or with env vars; prepared-call dispatch retains its `0.8` minimum):

- **auto** — confidence ≥ `0.8` and risk is low
- **review** — medium confidence, or high-stakes even when confident
- **escalate** — confidence < `0.5`, or a hard fail (contradicted claim, injection block, unsafe patch)

Destructive coding-loop risk (`risk` score ≥ 1.5) never returns `auto`.

Automatic stopping also requires `done_enough >= 0.7`. The combined `jev_gate` packs patch review and evidence-only claim verification into one request. It accepts completion only when the review and every claim pass with complete coverage; deterministic reason codes identify failures without asking Jev to generate prose.

## Limits we encode, not guess

From TypeSafe’s own docs, including [Jev 1.13 jaggedness](https://docs.typesafe.ai/model-jaggedness/jev-1.13.md):

- Do not ask Jev to write code, count, do math, or compare dates. Do that in TypeScript.
- Do not hide several judgments in one question. Split, then combine.
- Filter state first. Unrelated bulk context hurts accuracy.
- Choice options are a closed set. Jev cannot invent a new id.
- `jev_rank` caps a Choice at 250 options and fits batches to estimated context budgets. It preserves original IDs through private labels, carries singleton batches forward, and repeats reduction rounds until finalists fit. A non-reducing tournament returns a budget error rather than looping.

## Mock mode

`JEV_MCP_MOCK=1` never calls the network. It is for unit tests, `doctor`, and demos without a key. It is **not** calibrated like Jev. Do not use mock verdicts in production routing.

## What we deliberately omit

- File and shell tools (the host already has them)
- Repo indexing (you pass candidates into `jev_rank`)
- Remote HTTP MCP / OAuth (stdio is what Cursor and Codex spawn locally)
- Vercel AI Gateway as a second backend (official TypeSafe API only)
