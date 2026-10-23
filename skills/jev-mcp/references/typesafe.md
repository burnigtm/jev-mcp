# TypeSafe documentation for Jev integrations

Checked against the live documentation on 2026-10-15. Start at the [documentation index](https://docs.typesafe.ai/llms.txt) when an API or model detail may have changed. This is a focused reference for this MCP server, not a copy of the upstream documentation. The server's [tool contracts](tools.md) remain authoritative for its twelve MCP tools.

## Execution and questions

Jev returns typed judgments; code performs edits, arithmetic, validation and execution. Keep each question small enough to answer from the supplied evidence. Split independent dimensions and combine their answers deterministically. [Introduction](https://docs.typesafe.ai/introduction), [coding agents](https://docs.typesafe.ai/introduction/coding-agents).

Use named JSON fields for relevant state and refer to those exact fields in instructions. Question IDs identify returned answers but are not shown to the model, so the instruction must contain the entire question. All questions in one call see the same state independently. An answer cannot feed another question in that same call; use a second request only when the first answer changes the required state or question. [State](https://docs.typesafe.ai/concepts/state), [questions](https://docs.typesafe.ai/primitives), [fan-out](https://docs.typesafe.ai/patterns/fan-out).

| Primitive | Use | Read |
| --- | --- | --- |
| Choice | Select one known option; include none/other when appropriate | `choice`, full `probabilities`, `confidence` |
| Score | Judge one ordered, descriptive dimension | Probability-weighted `score`, `legend`, `probabilities`, `confidence` |
| Noul | Judge one explicit yes/no condition | `noul`, the probability of yes; there is no separate confidence |

Sources: [Choice](https://docs.typesafe.ai/primitives/choice), [Score](https://docs.typesafe.ai/primitives/score), [Noul](https://docs.typesafe.ai/primitives/noul).

## Confidence and policy

Confidence is derived from the answer's distribution, not a probability that the decision is correct. Choice uses `(max(p) - 1/n) / (1 - 1/n)`. Score also accounts for distance between ordered levels; it does not use the Choice formula. Noul near 0.5 is uncertainty, not medium intensity. Keep provider values visible and distinguish them from application acceptance rules. [Confidence](https://docs.typesafe.ai/confidence).

Confidence thresholds depend on the action and must be tested on representative data. Decompose broad judgments into dimensions, combine scores in code and retain hard requirements that a weighted total must not compensate for. This server keeps its existing confidence, safety and per-dimension approval floors; a positive-looking score alone never overrides them. [Confidence routing](https://docs.typesafe.ai/patterns/confidence-routing), [composite scoring](https://docs.typesafe.ai/patterns/composite-scoring).

## API, models and runtime

The text API is `POST https://api.typesafe.ai/v1/systemone`, authenticated with a bearer key. Requests contain `model`, `state` and `questions`; responses identify the actual model and return `answers` plus token usage. Use UTF-8 JSON and finite numbers. The HTTP body cap is 32 MiB and nesting is limited to 64 levels. The MCP server applies tighter local limits and validates the response before policy uses it. [API reference](https://docs.typesafe.ai/api).

The model page currently lists `jev-1.13.0` and `jev-1.14.0`. `jev-latest` points to 1.13; `jev-preview` points to 1.14. Pin a version when comparing runs. Default context limits are 64k tokens for state plus all questions, and 32k for state plus any one question. Long-context mode requires an explicit experimental header; this server does not enable it. [Models](https://docs.typesafe.ai/models).

Upstream currently documents up to 255 Choice options and 10 Score levels. This server intentionally caps Choice at 250, routes at most 32 prepared calls, and applies its own text/state budgets. Box and experimental image APIs are not exposed by the server's three-primitive interface. [Choice](https://docs.typesafe.ai/primitives/choice), [API](https://docs.typesafe.ai/api), [SDK](https://docs.typesafe.ai/sdk/javascript).

For new app integrations, follow the current JavaScript SDK guide, which recommends Node 22+. This repository retains its pinned SDK, Node 20+ contract and Node 20/22 CI coverage. SDK retry and compression defaults are separate from this server's deadline and no-automatic-retry evaluation policy; inspect actual installed behavior rather than assuming defaults. [JavaScript SDK](https://docs.typesafe.ai/sdk/javascript), [client API](https://docs.typesafe.ai/sdk/javascript/api/classes/TypeSafeClient).

Handle failures explicitly: `401` means invalid/missing credentials; `400`/`422` mean request problems; `413`/`415` mean size/encoding problems. Upstream advises backoff for `429`/`529`. This server bounds SDK retries with its total deadline and returns an MCP error, never approval. Fix invalid input or prerequisites before another call. [API errors](https://docs.typesafe.ai/api#errors).

## Recipes relevant to the tools

| Tools | Closest upstream material | Apply here |
| --- | --- | --- |
| `jev_step`, `jev_coding_loop` | [Coding agents](https://docs.typesafe.ai/introduction/coding-agents), [confidence routing](https://docs.typesafe.ai/patterns/confidence-routing) | Keep execution and partner invocation in host code |
| `jev_tool_route` | [Function calling](https://docs.typesafe.ai/cookbooks/function_calling) | Select among host-prepared calls; do not infer withheld argument values |
| `jev_screen` | [LLM guardrails](https://docs.typesafe.ai/cookbooks/llm_guardrails) | Classify untrusted input before use; reject embedded instructions |
| `jev_rank` | [Semantic find](https://docs.typesafe.ai/cookbooks/semantic_find), [skill suggestion](https://docs.typesafe.ai/cookbooks/skill_suggestion) | Supply candidates and an explicit no-match path |
| `jev_review`, `jev_gate` | [Composite scoring](https://docs.typesafe.ai/patterns/composite-scoring) | Review scoped behavior against actual patches and tests |
| `jev_verify` | [Citation checking](https://docs.typesafe.ai/cookbooks/citation_check) | Compare each atomic claim with supplied evidence |
| `jev_evaluate` | [Primitives](https://docs.typesafe.ai/primitives) | Use independent, literal questions when no recipe fits |

Jev 1.13 has documented weaknesses with literal phrasing, indirection, irrelevant context, adversarial state and numeric precision. Keep exact conditions in the instructions, align criteria with them, filter state, and test adversarial cases. A reviewer must not invent missing evidence, and repeated unchanged requests are not a repair. [Known limitations](https://docs.typesafe.ai/model-jaggedness/jev-1.13).
