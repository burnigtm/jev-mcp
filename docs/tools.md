# Tools

Every successful tool call returns JSON with at least:

- `model` — the response model identifier; the default requested model is `jev-latest`, and mock mode appends `+mock`
- `usage.input_tokens` / `usage.output_tokens`
- `truncated` — `true` if state was cut to fit TypeSafe budgets
- `coverage` — completeness and source character counts; token estimates identify the `chars/4` estimator
- `action` — `auto` | `review` | `escalate`

Question templates are also readable as MCP resources: `jev://packs/{coding-loop,review,verify,screen,rank,gate}`.

Incomplete context never returns `auto`. MCP failures return `isError: true` and error details with `code`, `message`, and `retryable`. Existing tools expose these under `structuredContent.error` with human-readable text; `jev_gate` returns JSON text only, as described below. Host cancellation stops active requests and retries. One total deadline covers every upstream call in a tool invocation (default 30 seconds).

## `jev_coding_loop`

Call **before** spending a frontier turn on retry / stop / which model tier.

**Arguments**

| Name | Required | Meaning |
| --- | --- | --- |
| `task` | yes | What the agent is trying to do |
| `observation` | yes | Last diff, command output, test log, or blocker |
| `extras` | no | Extra JSON included under `state.extras` |
| `auto_accept` | no | Override default `0.8` |
| `review_at` | no | Override default `0.5` |
| `model` | no | Override `JEV_MCP_MODEL` |

**Fan-out (one Jev call)**

- Choice `next`: `continue` | `retry` | `ask_user` | `stop`
- Choice `model_tier`: `cheap` | `standard` | `reasoning`
- Choice `focus`: `edit` | `search` | `test` | `read` | `plan`
- Score `risk`: read-only → local edit → destructive/prod
- Noul `done_enough`, `needs_more_context`, `tests_likely_fail`

Next-step confidence below `review_at` escalates. Otherwise, `ask_user` requires `review`. High `risk` is never `auto`.

Automatic `stop` also requires `done_enough >= 0.7`, sufficient next-step confidence, and low risk.

## `jev_review`

Call on a proposed diff **before** you declare the task done. Does not apply the patch.

**Arguments:** `request`, `diff`, optional `tests`, optional thresholds.

**Scores (0–2 rubrics, combined in code)**

| Dimension | Weight | High score means |
| --- | --- | --- |
| `correctness` | 0.4 | Looks functionally right |
| `spec_match` | 0.3 | Matches the user’s request |
| `test_gap` | 0.15 | *Inverted* — 2 = likely untested |
| `blast_radius` | 0.15 | *Inverted* — 2 = wide / production |

Plus Noul `safe_to_apply`. Composite and min confidence decide `action`.

## `jev_verify`

Check factual claims against evidence you already have (PR text, docs, logs, diffs). Pattern: [citation check](https://docs.typesafe.ai/cookbooks/citation_check.md).

**Arguments**

- `claims` — array of statements
- `evidence` — a string, or `[{ "id", "text" }, …]`
- `auto_accept` — default `0.8`; per-claim confidence at or above this threshold permits `auto` when context is complete

Per claim: `verified` | `contradicted` | `unsupported`, full probabilities, confidence, and a per-item action. Confidence below `min(0.5, auto_accept)` produces a per-item `escalate`; confidence between that threshold and `auto_accept` produces `review`.

The response includes summary counts and an overall `action`. A contradiction with per-item `auto` escalates the overall result. Otherwise, any non-auto per-item action or contradiction makes the overall result `review`; remaining results permit `auto` only with complete context.

For standalone verification, a confident `unsupported` verdict can have `action: auto`: this accepts the classification, not the claim. Use `jev_gate` when you need an overall completion approval.

## `jev_gate`

Review a patch and verify its completion claims in **one upstream request**. The host supplies the artifacts; this tool does not run tests or apply changes.

Required inputs: `request`, `diff`, nonempty `claims`, and `evidence` (text or `[{id, text}, ...]`). Optional inputs: `tests`, `model`, `auto_accept` (default `0.8`), and `review_at` (default `0.5`).

```json
{
  "request": "Reject empty parser input",
  "diff": "+ if (!input) throw new Error('Empty input');",
  "tests": "parser rejects empty input: PASS",
  "claims": ["The empty-input parser test passed."],
  "evidence": [{"id": "test-output", "text": "parser rejects empty input: PASS"}]
}
```

The patch review reads `request`, `diff`, and `tests`. Claim verification uses only `evidence`; include relevant diff or test output there when it supports a claim. The request and claims are assertions, not proof of completion.

The response includes `review`, `verification` (per-claim results and counts), overall `action`, `reason_codes`, `coverage`, `model`, and total `usage`. It has an MCP output schema and identical JSON text and `structuredContent` payloads.

- `auto`: complete context, accepted review, and every claim verified at or above `auto_accept`.
- `review`: unsupported claims, moderate uncertainty or contradictions, or incomplete context, unless another check escalates.
- `escalate`: unsafe or uncertain review, a claim below `review_at`, or a contradiction at or above `auto_accept`.

Reason codes are deterministic: `accepted`, `incomplete_context`, `review_escalated`, `review_required`, `claims_contradicted`, `claims_unsupported`, `claim_confidence_low`, and `claim_confidence_below_auto_accept`. Operational failures return `isError: true` with JSON text `{ "error": { "code", "message", "retryable" } }` and no `structuredContent`, so clients do not validate an error against the gate's success schema. Failures never produce approval.

## `jev_screen`

Judge **untrusted** paste/fetch **before** the agent reads it. Skip first-party repo files. Pattern: [LLM guardrails](https://docs.typesafe.ai/cookbooks/llm_guardrails.md).

**Arguments:** `text`, optional `purpose`, optional `block_at` (default `0.75`), optional `review_at` (default `0.25`).

Noul `injection`, `substance`, and `relevance` (only if `purpose` is set).

**Recommendation** (separate from MCP `action`)

| Value | When |
| --- | --- |
| `pass` | Safe to read |
| `review` | Injection in `[review_at, block_at)` |
| `block` | Injection ≥ `block_at` → MCP `escalate` |
| `skip` | Low substance or low relevance |

If any text was omitted, a detected `block` is preserved; every other recommendation becomes `review`. Character coverage excludes the truncation marker. Screening only classifies the supplied content; it cannot guarantee freedom from prompt injection.

## `jev_rank`

Rank candidates you already listed (files, symbols, errors, skills). No embeddings and no repo index. Pattern: [semantic find](https://docs.typesafe.ai/cookbooks/semantic_find.md).

**Arguments:** `query`, `candidates: [{ id, text }]`, optional `top_k` (default 5). At least two candidates.

One Choice over ids plus a Noul `exists` so a forced winner cannot masquerade as a match.

- Original IDs are returned unchanged. Exact duplicate IDs are rejected. Private labels prevent path, Unicode, punctuation, or long-ID collisions.
- Each `text` is capped at 2,000 characters including its truncation marker, consistently in state and question criteria. Clipped text sets `truncated: true` and requires review.
- Batches fit both estimated context budgets and the 250-option cap. Further rounds reduce finalists until they fit; singleton batches advance without a Choice call. If retaining `top_k` prevents reduction, the tool asks you to lower `top_k` or shorten text with `INPUT_TOO_LARGE`.
- Response includes `chunked` and, when chunked, `chunks` for the initial round. Usage sums all rounds. Tournament ranking is approximate; final probabilities are relative to the finalists.
- Rank coverage has `candidate_fields` totals across all original candidates. `estimated_tokens_scope: "final_request"` identifies the request represented by its token estimates; these are not summed usage.
- `exists_verdict`: `answered` | `partial` | `absent`

## `jev_evaluate`

Escape hatch. Pass `state` (string or JSON) and a `questions` map:

```json
{
  "urgent": {
    "type": "noul",
    "instructions": "Is this urgent?",
    "criteria": { "true": "Time-sensitive", "false": "No hurry" }
  },
  "team": {
    "type": "choice",
    "instructions": "Which team owns this?",
    "criteria": { "billing": "Payments", "technical": "Bugs" }
  },
  "severity": {
    "type": "score",
    "instructions": "How bad is it?",
    "criteria": ["Low", "Medium", "High"]
  }
}
```

Rules for good questions: one judgment each, closed Choice options, arithmetic in code, small relevant state. See [how to build with System One](https://docs.typesafe.ai/concepts/how-to-build-with-system-one.md).
