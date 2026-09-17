# Tools

Every tool returns JSON with at least:

- `model` — `jev-latest` on the live API, `jev-latest+mock` in mock mode
- `usage.input_tokens` / `usage.output_tokens`
- `truncated` — `true` if state was cut to fit TypeSafe budgets
- `action` — `auto` | `review` | `escalate`

Question templates are also readable as MCP resources: `jev://packs/{coding-loop,review,verify,screen,rank}`.

## `jev_coding_loop`

Call **before** spending a frontier turn on retry / stop / which model tier.

**Arguments**

| Name | Required | Meaning |
| --- | --- | --- |
| `task` | yes | What the agent is trying to do |
| `observation` | yes | Last diff, command output, test log, or blocker |
| `extras` | no | Extra JSON merged into Jev state |
| `auto_accept` | no | Override default `0.8` |
| `review_at` | no | Override default `0.5` |
| `model` | no | Override `JEV_MCP_MODEL` |

**Fan-out (one Jev call)**

- Choice `next`: `continue` | `retry` | `ask_user` | `stop`
- Choice `model_tier`: `cheap` | `standard` | `reasoning`
- Choice `focus`: `edit` | `search` | `test` | `read` | `plan`
- Score `risk`: read-only → local edit → destructive/prod
- Noul `done_enough`, `needs_more_context`, `tests_likely_fail`

`ask_user` is always `review`. High `risk` is never `auto`.

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
- `auto_accept` — default `0.8`; below that a verdict is `review`

Per claim: `verified` | `contradicted` | `unsupported`, full probabilities, confidence, and a per-item action. Summary counts plus an overall `action`. Auto-contradictions escalate.

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

## `jev_rank`

Rank candidates you already listed (files, symbols, errors, skills). No embeddings and no repo index. Pattern: [semantic find](https://docs.typesafe.ai/cookbooks/semantic_find.md).

**Arguments:** `query`, `candidates: [{ id, text }]`, optional `top_k` (default 5). At least two candidates.

One Choice over ids plus a Noul `exists` so a forced winner cannot masquerade as a match.

- Each `text` is truncated to 2,000 characters.
- More than 250 candidates: chunk, take top hits, re-rank winners. Response includes `chunked` and `chunks`.
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
