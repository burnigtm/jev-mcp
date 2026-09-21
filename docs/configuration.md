# Configuration

Neither the CLI nor MCP loads `.env` automatically. Set variables in your shell (`export TYPESAFE_API_KEY=ts_...` in Bash or `$env:TYPESAFE_API_KEY = 'ts_...'` in PowerShell), or pass them in the MCP server's `env` block.

For local CLI use on Node 20.6+, copy [`.env.example`](../.env.example) to `.env`, edit it, and opt in explicitly: `node --env-file=.env dist/index.js doctor`. Keep `.env` untracked.

| Variable | Default | Meaning |
| --- | --- | --- |
| `TYPESAFE_API_KEY` | (none) | Bearer token for `https://api.typesafe.ai` |
| `JEV_MCP_MODEL` | `jev-latest` | TypeSafe model id |
| `TYPESAFE_BASE_URL` | `https://api.typesafe.ai` | API root. Other public HTTPS hosts need `JEV_MCP_ALLOW_CUSTOM_BASE_URL=1`. HTTP is loopback only |
| `JEV_MCP_ALLOW_CUSTOM_BASE_URL` | off | `1` / `true` / `yes` — allow a public HTTPS host other than `api.typesafe.ai` |
| `JEV_MCP_MOCK` | off | `1` / `true` / `yes` — local deterministic judge |
| `JEV_MCP_TIMEOUT_MS` | `30000` | Total deadline in milliseconds for one tool call, including retries and every ranking round. Each SDK attempt uses the time remaining and does not retry its own timeout |
| `JEV_MCP_AUTO_ACCEPT` | `0.8` | Confidence floor for `auto` |
| `JEV_MCP_REVIEW_AT` | `0.5` | Below this, coding-loop / review / evaluate `escalate` |
| `JEV_MCP_BLOCK_AT` | `0.75` | Screen injection ≥ this → `block` |

Per-call overrides can only tighten the environment floors:

- `auto_accept` becomes `max(caller, env)`. `review_at` becomes `max(caller, env)` and must still be `<= auto_accept`. A caller pair with `review_at > auto_accept` is still rejected.
- `jev_coding_loop`, `jev_review`, `jev_gate`: `auto_accept`, `review_at`
- `jev_step`, `jev_tool_route`: `auto_accept`, `review_at` (executable dispatch keeps its `max(0.8, auto_accept)` floor)
- `jev_verify`: `auto_accept`
- `jev_screen`: `block_at` becomes `min(caller, env)`, so `block_at: 1` cannot loosen `0.75`. `review_at` still defaults to `0.25` and cannot exceed `block_at`
- All tools: `model`

`jev_evaluate` uses the environment confidence thresholds. Configurable confidence bands must satisfy `0 <= review_at <= auto_accept <= 1`; invalid environment values are configuration errors rather than silent fallbacks. `TYPESAFE_BASE_URL` is normalized to origin plus path. Userinfo, query strings, fragments, obfuscated numeric hosts, and non-public addresses (private, link-local, and metadata) are rejected. Standalone verification caps its internal review cutoff at the requested acceptance threshold. The screen review threshold cannot exceed its block threshold, and `JEV_MCP_BLOCK_AT` must be at least the default screen review threshold of `0.25`.

Review and gate `auto` also requires each raw score to clear a floor on the 0–2 scale: correctness and spec match at least 1, test gap and blast radius at most 1. The weighted composite alone is not enough.

No key and no mock: tools return `CONFIG_ERROR`. The timeout must be a positive integer no greater than `2147483647`; invalid values are configuration errors.

## Diagnostics and errors

`node dist/index.js doctor` prints a human-readable status on stderr. Add `--json` for a JSON object on stdout: `version`, `node`, `model`, `mock`, `api_key_set`, sanitized `base_url`, `timeout_ms`, `thresholds`, and `ready`; successful checks add `models` and `ping`, and failures add `error`. A failed check exits with status 1. The model listing and ping share one deadline.

The server does not log request state, diffs, claims, or API keys. The diagnostic base URL omits credentials, query parameters, and fragments.

MCP failures use `isError: true` and an error with `code`, `message`, and `retryable`. Existing tools expose it in `structuredContent.error`; `jev_gate` puts `{ "error": ... }` in JSON text and omits structured content to avoid client validation against its success schema. Codes include `CONFIG_ERROR`, `INVALID_INPUT`, `INPUT_TOO_LARGE`, `INVALID_RESPONSE`, `TIMEOUT`, `CANCELLED`, and `API_ERROR`. Timeouts are retryable; cancelled calls are not. The server does not manufacture a successful verdict after a transport or validation failure.

## Policy constants

Named numbers live in [`src/policy.ts`](../src/policy.ts). Tune there (or via env/args), not by rewriting Jev instructions into a chat prompt.

Screen `skip` uses substance/relevance below `0.35`.

## Estimated request budgets

- 64,000 tokens for all `state` + `questions`
- 32,000 tokens for `state` + the longest question
- Rank: 250 Choice options per call; candidate text 2,000 characters
- Rank accepts at most 5,000 candidates per request; verification and the completion gate accept at most 1,000 claims per request

ASCII text is still estimated as `ceil(chars / 4)`. Non-ASCII characters cost at least one token each. The server enforces these estimated budgets. If the provider reports `usage.input_tokens` above the 64,000-token total budget, coverage is incomplete and tools cannot return `auto`.

Oversized question sets are rejected before sending a request. Shortened state or candidate text is reported as incomplete coverage, and no tool returns `auto` on incomplete context. Screening preserves a detected `block`; otherwise incomplete screening requires `review`.

## Tests

```bash
npm test              # mock only; live case skipped
npm run typecheck
npm run build
npm run test:package   # offline packed-install smoke; npm ci seeds the dependency cache
npm run benchmark      # compiled MCP stdio benchmark in deterministic mock mode
npm run benchmark:ci   # same benchmark with broad sanity budgets
TYPESAFE_API_KEY=ts_... npm test    # includes live e2e
```

The test runner explicitly enumerates files for consistent behavior on Node 20/22 and Windows/Linux. The live test uses the same normalized mock setting as the application, so `true` and `yes` also skip it. It checks that the returned model is not a mock.

Package tests run separately from `npm test`: they invoke the `prepack` build, inspect shipped files, and install the tarball in a temporary application with `npm ci --offline --ignore-scripts`. The temporary lockfile reuses the committed production dependency graph and exact integrities, so stale cached version lists cannot change resolution. The test then runs the installed mock CLI. It needs an npm dependency cache populated by `npm ci`; it never fetches packages or publishes. CI runs tests, type checking, build, and package smoke on Windows and Linux with Node 20 and 22.

The performance benchmark is deliberately opt-in because timing thresholds are runner-dependent. It starts the compiled MCP server over stdio with `JEV_MCP_MOCK=1`, warms each tool, then reports startup time, p50/p95/p99 latency, and throughput for sequential calls, concurrent calls, larger evaluate payloads, and larger rank/tool-route candidate sets. `benchmark:ci` applies broad hang/regression budgets rather than claiming production Jev latency or quality; use live-provider measurements separately when network and provider cost are part of the question. `JEV_BENCH_JSON=1` emits a machine-readable report.
