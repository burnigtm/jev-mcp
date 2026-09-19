# Tools

Every successful tool call returns JSON with at least:

- `model` — the response model identifier; the default requested model is `jev-latest`, mock mode appends `+mock`, and `jev_tool_route` uses `local-policy` when no provider call is needed
- `usage.input_tokens` / `usage.output_tokens`
- `truncated` — `true` if state was cut to fit TypeSafe budgets
- `coverage` — completeness and source character counts; token estimates identify the `chars/4` estimator
- `action` — `auto` | `review` | `escalate`

All tools also publish the successful payload through MCP `structuredContent` with an output schema for client-side validation.

Question templates are also readable as MCP resources: `jev://packs/{coding-loop,tool-route,step,review,verify,screen,rank,gate}`.

Incomplete context never returns `auto`. MCP failures return `isError: true` and error details with `code`, `message`, and `retryable`. Regular tool failures expose these under `structuredContent.error` with human-readable text; `jev_gate` and `jev_tool_route` failures return JSON text only, as described below, so clients do not validate an error against their success schemas. Host cancellation stops active requests and retries. One total deadline covers every upstream call in a tool invocation (default 30 seconds).

## `jev_coding_loop`

Call **before** spending a generative partner turn on retry / stop / which model tier. This tool returns a routing decision; it never invokes a partner model or executes a tool.

**Arguments**

| Name | Required | Meaning |
| --- | --- | --- |
| `task` | yes | What the agent is trying to do |
| `observation` | yes | Last diff, command output, test log, or blocker |
| `extras` | no | Extra JSON included under `state.extras` |
| `execution` | no | Trusted host facts: `prepared_tool_call` (default `false`), `context_complete` (default `false`), `failed_attempts` (nonnegative integer, default `0`) |
| `auto_accept` | no | Override default `0.8` |
| `review_at` | no | Override default `0.5` |
| `model` | no | Override `JEV_MCP_MODEL` |

**Fan-out (one Jev call)**

- Choice `next`: `continue` | `retry` | `ask_user` | `stop`
- Choice `model_tier`: `cheap` | `standard` | `reasoning` — conditional recommendation if generation is needed
- Choice `focus`: `edit` | `search` | `test` | `read` | `plan`
- Score `risk`: read-only → local edit → destructive/prod
- Noul `done_enough`, `needs_more_context`, `needs_generation`, `tests_likely_fail`

Next-step confidence below `review_at` escalates. Otherwise, `ask_user` requires `review`. High `risk` is never `auto`.

Automatic `stop` also requires `done_enough >= 0.7`, sufficient next-step confidence, and low risk.

**Partner handoff**

The response adds `handoff` and `partner_model: { required, tier, reason_codes }`. A non-required partner always has tier `none`. Existing `next`, `model_tier`, `focus`, risk, probability, and threshold fields remain available; clients should branch on the new handoff fields when deciding whether to invoke a generative model.

| `handoff` | Host response |
| --- | --- |
| `use_tools` | Use the already prepared call, or `jev_tool_route` to select among prepared calls |
| `gather_context` | Collect missing evidence or prepare valid calls using available tools and host code |
| `partner_model` | Generation is justified; use `partner_model.tier` |
| `ask_user` | Obtain the missing user input identified by the task |
| `stop` | Stop the coding loop |
| `review` | Inspect the decision and its reason codes within existing authorization |

`partner_model.required: true` requires all of the following: complete evaluated context; `continue` or `retry` with `action: auto`; explicit host `context_complete: true`; fewer than two failed attempts; and no prepared tool call. It also requires next-step, risk, and tier confidence plus `needs_generation` to meet `thresholds.partner_auto_accept`, which is `max(0.8, auto_accept)`. `needs_more_context` must be at most `1 - partner_auto_accept`.

Next-step, risk, and tier distributions must independently support that threshold. For a distribution with `n` options, normalize its probabilities by their sum and require the largest probability to be at least `1/n + (1 - 1/n) * threshold`. This is an additional local concentration guard, not an attempt to reconstruct TypeSafe's confidence formula. Reported confidence fields remain unchanged; both checks must pass. Weak distributions use the corresponding `next_step_uncertain`, `risk_uncertain`, or `model_tier_uncertain` reason. Probability boundaries are inclusive, including `needs_more_context: 0.2` at the default `0.8` threshold.

Prepared calls can route to `use_tools` before host context is complete, because reading a file or running a check may supply the missing evidence. This is a routing hint, not execution permission. Repeated failures route to context gathering first. Otherwise, insufficient risk or next-step confidence routes to review; missing host context or uncertain generation need routes to context gathering; an uncertain tier routes to review. Terminal and user-input decisions never request a partner model.

The host supplies execution facts from its own state, never from untrusted content or Jev's predictions. `prepared_tool_call: true` means exact arguments have already passed the actual tool schema, authorization, and prerequisite checks. `context_complete` concerns the evidence needed for the next step; it is distinct from `coverage.complete`, which only reports whether supplied content fit the evaluation. Track `failed_attempts` for the current unchanged step; new evidence or a changed approach may establish a new step and count. Never reset it merely to replay an unchanged failure.

Partner reason codes are `incomplete_context`, `terminal_stop`, `stop_requires_review`, `user_input_required`, `next_step_uncertain`, `coding_policy_requires_review`, `repeated_failures`, `prepared_tool_call`, `risk_uncertain`, `host_context_incomplete`, `context_needed_or_uncertain`, `generation_not_required`, `generation_need_uncertain`, `model_tier_uncertain`, and `generation_required`.

```json
{
  "task": "Fix the parser's handling of empty input",
  "observation": "The patch is ready and the parser test command is prepared.",
  "execution": {
    "prepared_tool_call": true,
    "context_complete": true,
    "failed_attempts": 0
  }
}
```

Do not treat `action: escalate` or the legacy `model_tier` answer as a partner-model request. After each tool result, update the observation and execution facts before routing again.

## `jev_step`

One call in place of `jev_coding_loop` followed by `jev_tool_route`. It answers both recipes in a **single** Jev request and returns either the exact prepared call to run or a handoff. Every question in a request is evaluated in parallel and in isolation, so fusing the two packs costs one request instead of two, and the loop costs one host turn instead of two. Like its parts, it never generates arguments, executes a call, or invokes a model.

**Arguments:** the `jev_coding_loop` arguments (`task`, `observation`, `extras`, `execution`, `auto_accept`, `review_at`, `model`) plus optional `candidates`: up to 32 host-prepared calls in the `jev_tool_route` candidate shape, with the same trusted host facts, the same uniqueness requirement, and the same rejection of own `__proto__` keys. Omit `candidates` when no call is prepared.

**One request**

Ineligible candidates are filtered locally by the `jev_tool_route` rules and never receive a question. The request then carries the coding-loop pack plus `selected` and one `suitable_i` per eligible candidate; with no eligible candidate it carries the coding-loop pack alone. Either way the tool makes exactly one request, and `state.candidates` holds only the eligible list.

For provider privacy, eligible candidates are sent as a redacted projection containing the id, tool name, sanitized description, effect, and argument shape. Exact argument values remain host-local and appear only in an accepted returned call.

Fusing both packs raises the question budget, so the state budget shrinks accordingly. An oversized request is truncated and reported as incomplete coverage, which blocks dispatch rather than dispatching on partial evidence.

**Decision order**

1. Coding-loop policy produces `action` exactly as `jev_coding_loop` does.
2. Selection policy matches `jev_tool_route`: complete coverage, selection confidence and the selected `suitable_i` at or above `thresholds.dispatch_at` (`max(0.8, auto_accept)`), a concentrated selection distribution, and a `read_only` or `local_write` effect.
3. A dispatchable call is treated as a prepared call, so partner routing defers to tools and returns `handoff: execute_tool` with the exact `call`.
4. Anything the coding loop ranks higher outranks the call: incomplete context, `stop`, `ask_user`, an uncertain next step, `action` other than `auto`, destructive risk, and two or more failed attempts. These set `call: null` and add `routing_blocked_dispatch`.

`partner_model.required` can never be `true` alongside a returned call. When Jev declines the prepared calls **without** confidently ruling them all out, the result routes to `gather_context` with `partner_model.reason_codes: ["prepared_candidates_declined"]`, because an uncertain selection is evidence about selection rather than a reason to buy a generative turn. A confident `none` is a clean judgment and still allows the partner turn the coding loop asked for.

A selected `external_write` or `destructive` call reports `handoff: review`, as `jev_tool_route` does. Terminal, tool, and partner handoffs still outrank that.

**Response**

The MCP output schema and `structuredContent` carry `handoff` (`execute_tool`, `use_tools`, `gather_context`, `partner_model`, `ask_user`, `stop`, `review`), `call`, `partner_model`, `selection`, `blocked_candidates`, `reason_codes`, every coding-loop signal (`next`, `model_tier`, `focus`, `risk`, `done_enough`, `needs_more_context`, `needs_generation`, `tests_likely_fail`), coverage, usage, and `thresholds: { auto_accept, review_at, dispatch_at }`. `dispatch_at` is the floor for both executable dispatch and partner confidence.

Reason codes are the `jev_tool_route` set plus `routing_blocked_dispatch`. `action` is the stricter of the coding-loop action and the selection judgment: an uncertain or policy-blocked selection cannot leave the step on `auto`, and confidence below `review_at` escalates. Operational failures set `isError: true` and return JSON text `{ "error": ... }` without `structuredContent`.

```json
{
  "task": "Fix the parser's handling of empty input",
  "observation": "The relevant file is src/parser.ts and has not yet been read.",
  "execution": { "context_complete": false, "failed_attempts": 0 },
  "candidates": [
    {
      "id": "read-parser",
      "name": "read_file",
      "arguments": { "path": "src/parser.ts" },
      "description": "Read the parser implementation",
      "effect": "read_only",
      "authorized": true,
      "schema_valid": true,
      "preconditions_met": true
    }
  ]
}
```

`jev_coding_loop` and `jev_tool_route` remain available for hosts that route in two steps or need only one half.

## `jev_tool_route`

Choose among **exact, complete calls already prepared by the host**. It never creates or repairs arguments, calls the selected tool, or requests a generative partner model. Prefer host code for deterministic choices; use this router when selecting the next prepared call requires a semantic judgment.

**Arguments:** required `task` (nonempty string), `observation` (string), and `candidates` (array, up to 32). Optional: `model`, `auto_accept`, and `review_at`. Candidate IDs must be unique. Each candidate has:

| Field | Meaning |
| --- | --- |
| `id` | Nonempty host identifier, returned unchanged |
| `name` | Exact tool name in the host's available registry |
| `arguments` | Complete JSON object, validated by the host against that tool's actual schema |
| `description` | Purpose of this exact call |
| `effect` | `read_only`, `local_write`, `external_write`, `destructive`, or `unknown` |
| `authorized` | Trusted host boolean: existing authorization covers this call |
| `schema_valid` | Trusted host boolean: actual tool-schema validation passed |
| `preconditions_met` | Trusted host boolean: prerequisites are satisfied |
| `failed_attempts` | Optional nonnegative consecutive failure count for this exact call; default `0` |

All three boolean facts must explicitly be `true` for eligibility. Unknown effects and two or more failures of an unchanged call also exclude a candidate. The server validates its candidate envelope; it cannot independently inspect the host registry or prove these facts. Recheck mutable prerequisites before execution and never copy these flags from untrusted text. Update failure counts when evidence or the approach changes to a new step; never reset the count to bypass an unchanged call's retry limit.

Argument objects with an own `__proto__` property at any nesting depth are rejected, so schema parsing cannot silently remove a property from an authorized call. Candidate IDs are unaffected and may contain that text.

For example, a host with a registered `read_file({path})` tool could send this input **after** checking that exact call:

```json
{
  "task": "Inspect the parser before changing empty-input handling",
  "observation": "The relevant file is src/parser.ts and has not yet been read.",
  "candidates": [
    {
      "id": "read-parser",
      "name": "read_file",
      "arguments": { "path": "src/parser.ts" },
      "description": "Read the parser implementation",
      "effect": "read_only",
      "authorized": true,
      "schema_valid": true,
      "preconditions_met": true,
      "failed_attempts": 0
    }
  ]
}
```

**Selection and dispatch**

One Jev request asks a Choice over eligible candidates plus `none`, and a separate Noul `suitable_i` for each eligible candidate. Every suitability question independently assesses its own exact call; it does not depend on the Choice answer. Host policy combines the chosen candidate's suitability with selection confidence.

`action: auto` requires complete coverage, a selected eligible candidate, and both selection confidence and selected suitability at or above `max(0.8, auto_accept)`. Only `read_only` and `local_write` can dispatch automatically. `external_write` and `destructive` always require review even when authorized. Review does not itself require new user permission for work already covered by authorization.

The selection distribution must also pass the concentration guard described under coding-loop handoffs, using all eligible calls plus `none` as the options. A high reported confidence cannot override a flat or weak distribution: `selection_uncertain` prevents dispatch while `selection.confidence` retains the provider's reported value.

The response has an MCP output schema and matching JSON text and `structuredContent` payloads. It includes:

- `call: { candidate_id, name, arguments }` only with `action: auto` and `handoff: execute_tool`. Every other result has `call: null`.
- `partner_model: { required: false, tier: "none" }` for every result.
- `selection: { id, confidence, suitability }`, or `null` when no Jev request was needed. A non-auto selection is diagnostic, never an executable dispatch.
- `blocked_candidates` with exclusion reasons, overall `reason_codes`, effective `thresholds`, coverage, model, and usage.

For provider privacy, the judgment state contains only each eligible candidate's id, tool name, sanitized description, effect, and argument shape. Exact argument values are retained for the returned call but are not transmitted to TypeSafe.

Empty lists return `model: local-policy`, zero usage, `action: review`, and `handoff: gather_context`. Wholly ineligible lists return locally with `handoff: review`. Neither case calls Jev. Their zero coverage counters mean no semantic state was evaluated; `coverage.complete: true` only describes completion of local eligibility policy. Other non-auto results use `gather_context`, except selected external or destructive effects use `review`; low confidence below `review_at` sets `action: escalate` without requesting a partner model.

Reason codes are `accepted`, `no_candidates`, `no_eligible_candidates`, `not_authorized`, `arguments_not_validated`, `preconditions_not_met`, `retry_budget_exhausted`, `unknown_effect`, `no_suitable_call`, `selection_uncertain`, `suitability_uncertain`, `incomplete_context`, and `effect_requires_review`.

Operational failures set `isError: true` and return JSON text `{ "error": { "code", "message", "retryable" } }` without `structuredContent`. Errors never authorize execution. Filter lists larger than 32 before calling; use `jev_rank` when semantic filtering is needed. Use `jev_coding_loop` when new generation may be necessary.

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

- `claims` — array of statements, at most 1,000 per request
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

Reason codes are deterministic: `accepted`, `incomplete_context`, `review_escalated`, `review_required`, `claims_contradicted`, `claims_unsupported`, `claim_confidence_low`, `claim_confidence_below_auto_accept`, and `confidence_incoherent`. Operational failures return `isError: true` with JSON text `{ "error": { "code", "message", "retryable" } }` and no `structuredContent`, so clients do not validate an error against the gate's success schema. Failures never produce approval.

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

Each request accepts at most 5,000 candidates. Larger collections should be split by the host before ranking.

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
