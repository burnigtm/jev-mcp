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
| `JEV_MCP_PROFILE` | `balanced` | `balanced` or `strict`: a named bundle of the bars below. Explicit variables override it; per-call arguments can only tighten. See [profiles](#profiles) |
| `JEV_MCP_TRIAGE_RECOVERABLE_AT` | the auto-accept bar | Bar for `jev_triage` recoverability (can the host make progress from here). Must not be below `JEV_MCP_REVIEW_AT`. A caller raising `auto_accept` also raises it |
| `JEV_POLICY_FILE` | search upward from the working directory | Absolute path of the repository policy file, or `none` to disable it. See [repository policy](#repository-policy) |
| `JEV_MCP_BLOCK_AT` | `0.75` | Screen injection ≥ this → `block` |
| `JEV_MCP_LEDGER` | off | `1` / `true` / `yes` — append a content-free record of every decision to a local JSONL ledger so `jev_feedback` labels can be collected. See [the ledger](#decision-ledger) |
| `JEV_MCP_LEDGER_DIR` | `~/.jev-mcp` | Absolute directory for `ledger-YYYY-MM.jsonl` and the per-install `ledger.key` |
| `JEV_MCP_LEDGER_MAX_BYTES` | `50000000` | Per-file size cap (at least 1024). Once reached, further records are dropped and counted, never written |
| `JEV_MCP_CACHE_TTL_MS` | `0` (off) | Cache validated provider results for this many milliseconds. Identical requests (same endpoint, model, evaluated state, and questions) are served with zero usage; tool policy still runs on every call |
| `JEV_MCP_CACHE_MAX_ENTRIES` | `256` | Least-recently-used entries kept when the cache is on |
| `JEV_MCP_HOOKS` | `enforce` | Behavior of `jev-mcp hook`: `enforce` prints decisions, `shadow` records and reports them but prints nothing, `off` is the kill switch. See [hooks](hooks.md) |
| `JEV_MCP_HOOK_DEADLINE_MS` | `20000` | The `PreToolUse` hook's own deadline for the model call (install sets the host timeout to 30 s) |
| `JEV_MCP_HOOK_MAX_CALLS` | `200` | Model calls the `PreToolUse` hook may make per session; past it the fail-closed rules apply |
| `JEV_MCP_STOP_DEADLINE_MS` | `80000` | The `Stop` hook's deadline for the completion gate |
| `JEV_MCP_TEST_COMMAND` | unset | A command run by the `Stop` hook for test evidence. Read from the environment only, never from a repository file |
| `JEV_MCP_TEST_TIMEOUT_MS` | `120000` | Timeout for that command |
| `JEV_MCP_CI_DEADLINE_MS` | `600000` | Deadline for one whole `jev-mcp ci` run. See [the pull-request gate](ci.md) |
| `JEV_MCP_MAX_REVIEW_CHUNKS` | `12` | Most chunks a single `jev_review`, `jev_risk` or `jev_gate` call sends when a diff is too large for one request. Each chunk is one Jev request of up to the full context, so this also bounds the cost of one review; beyond it the first chunks are reviewed, `omitted_files` names the rest and the result is never `auto` |
| `JEV_MCP_TOKEN_BUDGET` | unlimited | Provider tokens (input + output) this server process may spend. Each request reserves its estimated tokens (state, questions, and a per-question output allowance) before it is sent, so concurrent calls cannot all pass the same check. Once spent plus reserved tokens reach the budget, calls fail with `BUDGET_EXHAUSTED` before any provider request, and the request that crosses the line may overshoot by its own size. A request that reached the provider but returned no usage (timeout, abort, API error, invalid response) is charged at its reservation. Cache hits are still served |

Per-call overrides can only tighten the environment floors:

- `auto_accept` becomes `max(caller, env)`. `review_at` becomes `max(caller, env)`. When only `review_at` is supplied and it exceeds the env `auto_accept`, `auto_accept` rises to match. A caller pair with `review_at > auto_accept` is still rejected.
- `jev_coding_loop`, `jev_review`, `jev_verify`, `jev_gate`: `auto_accept`, `review_at`
- `jev_scope`, `jev_triage`, `jev_risk`: `auto_accept`, `review_at`
- `jev_step`, `jev_tool_route`: `auto_accept`, `review_at` (executable dispatch keeps its `max(0.8, auto_accept)` floor)
- `jev_screen`: `block_at` becomes `min(caller, env)` and `review_at` becomes `min(caller, 0.25)`, so a call can only tighten screen thresholds (`block_at: 1` cannot loosen `0.75`, and `review_at: 0.7` cannot loosen `0.25`). A `block_at` below `0.25` lowers `review_at` with it
- All tools: `model`

Judged *concerns* (scope `needs_confirmation`, critical `jev_risk` flags, confidently contradicted claims) escalate at `min(auto_accept, 0.8)`. Raising `auto_accept` above the default therefore never delays an escalation: tightening a call only makes it stricter.

`jev_evaluate` uses the environment confidence thresholds. Configurable confidence bands must satisfy `0 <= review_at <= auto_accept <= 1`; invalid environment values are configuration errors rather than silent fallbacks. `TYPESAFE_BASE_URL` is normalized to origin plus path. Userinfo, query strings, fragments, obfuscated numeric hosts, and non-public IPv4/IPv6 addresses (private, link-local, loopback on HTTPS, metadata, reserved, NAT64/6to4, and Teredo) are rejected. For custom HTTPS, `localhost`/`.localhost`, `.local`, `.internal`, `.home.arpa`, `.localdomain`, single-label names, trailing-dot forms, and zone identifiers are also rejected; `api.typesafe.ai` must use its default port. HTTP is allowed for IPv4/IPv6 loopback (`127.0.0.0/8`, `::1`, `localhost`). Hostnames are not resolved locally, so a custom endpoint remains operator-trusted and DNS rebinding is a documented residual risk. The screen review threshold cannot exceed its block threshold, and `JEV_MCP_BLOCK_AT` must be at least the default screen review threshold of `0.25`.

## Profiles

`JEV_MCP_PROFILE` selects a bundle of the confidence bars. Precedence, lowest to highest: the profile, explicit environment variables, per-call arguments (which can only tighten).

| | `balanced` (default) | `strict` |
| --- | --- | --- |
| `auto_accept` | 0.8 | 0.9 |
| `review_at` | 0.5 | 0.6 |
| `block_at` (screen) | 0.75 | 0.6 |
| triage recoverability bar | the `auto_accept` bar | 0.9 |

`balanced` reproduces the bars the server has always used. `strict` asks for more confidence before anything is `auto` and blocks suspicious text earlier, at the cost of more reviews of ordinary work; the measured trade-off is in [evals/results](../evals/results/profiles-2026-10-24.md). `jev-mcp doctor` prints the active profile and bars.

## Repository policy

A `.jev-policy.json` in the repository (found by searching upward from the working directory to the repository root, or set with `JEV_POLICY_FILE`) holds deterministic rules that run before any Jev request, cost no tokens, and are easy to audit. See [`examples/jev-policy.json`](../examples/jev-policy.json).

```json
{
  "version": 1,
  "protected_paths": [{ "glob": ".github/workflows/**", "floor": "review" }, { "glob": ".env*", "floor": "deny" }],
  "commands": {
    "deny": ["git push --force"],
    "review": ["git push", "npm publish"],
    "allow_read_only": ["git status", "git log", "rg"]
  }
}
```

- **`protected_paths`**: globs with a floor of `review` or `deny`. `**` crosses directories, `*` and `?` do not, matching is case-insensitive, a pattern without `/` matches at any depth, and a pattern naming a directory covers everything inside it. A rule is tested against the action's `target` and against every path-like argument of the command. Globs may not be absolute or contain `..`.
- **`commands`**: patterns are a program, optional further words (`*` stands for any one word) and optional flags. Words match as a prefix and flags in any order, after the command is normalized the way a person reads it: `sudo git -C repo push -f origin main` is `git push origin main` with `--force`, so it matches `git push --force`. There are no regular expressions in a policy, so a rule cannot cause catastrophic backtracking.
- **Precedence:** `deny` beats `review`, and `review` beats `allow_read_only`. The `allow_read_only` list is the one place a policy loosens anything: it lets a command skip the model only when the classifier has confirmed it as read-only, the declared effect is `read_only`, and **every** segment of the command matches an allow pattern.
- **Trust:** the file is trusted input from whoever owns the checkout. A pull request must not be able to loosen its own policy, so CI (a later change) reads it from the base ref. A file that cannot be read or fails validation (unknown keys are rejected) is an error, not an ignored file.
- `require_gate_on_stop` is read now and consumed by the Claude Code Stop hook in a later change. A repo-supplied `test_command` is deliberately not supported: a command in a checked-in file would be a code-execution path.

## Decision ledger

With `JEV_MCP_LEDGER=1`, every successful judgment appends one line to `ledger-YYYY-MM.jsonl` in `JEV_MCP_LEDGER_DIR`, and a tool error appends a line with its error code. Each line has a version, time, `decision_id`, tool, model, action, reason codes, thresholds, usage, latency, a truncation flag and a keyed HMAC of the input. The HMAC key is random per install (`ledger.key`, created on first use); equal inputs get equal fingerprints on that install only. **No input or output text is stored.** `jev_feedback` and `jev-mcp feedback` add `feedback` lines with an outcome and an optional note (the one place free text exists).

The ledger is observability, never a guard: a failed write is counted (`ledger.errors` in `jev://stats`) and ignored, and a full file drops records (`ledger.dropped`) instead of failing a call. Writes use a single `O_APPEND` write per line so several servers can share a file. `0600` file permissions have no effect on Windows; rely on the user profile directory's ACL, and delete the directory to erase the ledger.

## Usage stats

The `jev://stats` MCP resource reports in-process counters: calls, action mix, error codes, and p50/max latency per tool, plus ledger writes, drops and errors, provider requests, cache hits and misses, tokens spent, tokens currently reserved by in-flight requests, failed requests (`failed_requests`, charged at their reservation), why provider responses were rejected (`response_failures`, counted by a fixed reason name such as `probability_mass` or `not_json`, never provider content), and the remaining `JEV_MCP_TOKEN_BUDGET`. It never contains tool inputs or outputs, and it resets when the server restarts.

Review and gate `auto` also requires each raw score to clear a floor on the 0–2 scale: correctness and spec match at least 1, test gap and blast radius at most 1. The weighted composite alone is not enough. Correctness and spec match need confidence in their exact level; test gap, blast radius, and `jev_risk` severity need at least `auto_accept` of their probability mass inside the levels their floor accepts (0–1), i.e. `P(level 2) ≤ 1 − auto_accept`.

`jev_scope` never returns `auto` for `external_write`, `destructive`, or `unknown` effects. `jev_triage` never returns `auto` for repeating/regressing progress, an exhausted retry budget, `ask_user`, or low recoverability. `jev_risk` escalates a critical flag at or above `auto_accept` and reviews any concern in the uncertainty band; `auto` requires every flag to be confidently absent. These tools are advisory and never execute actions or grant authorization.

No key and no mock: tools return `CONFIG_ERROR`. The timeout must be a positive integer no greater than `2147483647`; invalid values are configuration errors.

## Diagnostics and errors

`node dist/index.js doctor` prints a human-readable status on stderr. Add `--json` for a JSON object on stdout: `version`, `node`, `model`, `mock`, `api_key_set`, sanitized `base_url`, `timeout_ms`, `thresholds`, and `ready`; successful checks add `models` and `ping`, and failures add `error`. A failed check exits with status 1. The model listing and ping share one deadline.

The server does not log request state, diffs, claims, or API keys. The diagnostic `base_url` is only the URL origin: credentials, paths, query parameters, and fragments are omitted.

MCP failures use `isError: true` and an error with `code`, `message`, and `retryable`. All twelve tools return `{ "error": ... }` in JSON text and omit `structuredContent` on errors so MCP clients do not validate error payloads against tool success schemas. Codes include `CONFIG_ERROR`, `INVALID_INPUT`, `INPUT_TOO_LARGE`, `INVALID_RESPONSE`, `TIMEOUT`, `CANCELLED`, and `API_ERROR`. Timeouts are retryable; cancelled calls are not. The server does not manufacture a successful verdict after a transport or validation failure.

## Policy constants

Named numbers live in [`src/policy.ts`](../src/policy.ts). Tune there (or via env/args), not by rewriting Jev instructions into a chat prompt.

Screen `skip` uses substance/relevance below `0.35`.

## Estimated request budgets

- 64,000 tokens for all `state` + `questions`
- 32,000 tokens for `state` + the longest question
- Rank: 250 Choice options per call; candidate text 2,000 characters
- Rank accepts at most 5,000 candidates per request; verification and the completion gate accept at most 1,000 claims per request

ASCII text is still estimated as `ceil(chars / 4)`. Non-ASCII characters cost at least one token each. The server enforces these estimated budgets. If the provider reports `usage.input_tokens` above the 64,000-token total budget, coverage is incomplete and tools cannot return `auto`.

The estimate is approximate and under-counts dense code (digits and punctuation measured at about 1.4 times the estimate), so a request the estimate says fits can still be refused by the provider. That refusal is reported as `INPUT_TOO_LARGE` (not `API_ERROR`), is not charged against `JEV_MCP_TOKEN_BUDGET`, and for `jev_review`, `jev_risk` and `jev_gate` on a diff with file headers it is retried automatically through the chunked review, which targets a fraction of the estimated budget and splits finer if the provider still refuses.

Oversized question sets are rejected before sending a request. Shortened state, candidate text, or a clipped candidate description is reported as incomplete coverage and `truncated: true`; no tool returns `auto` on incomplete context. Screening preserves a detected `block`; otherwise incomplete screening requires `review`.

## Prompt-injection boundary

Questions that receive third-party text carry a shared instruction that supplied content is data, not instructions. `jev_rank` keeps the query in state instead of interpolating it into instructions, and candidate IDs, tool names, argument key names, and rank original IDs are stripped of control/bidi characters and length-capped before they reach the provider. `jev_screen` also has a deterministic high-signal phrase backstop. These are defense-in-depth measures; they do not make the model a sanitizer. Treat `jev_screen` as advisory, never as permission to follow external text.

## Tests

```bash
npm test              # deterministic only; never invokes live evaluations
npm run typecheck
npm run build
npm run test:package   # offline packed-install smoke; npm ci seeds the dependency cache
npm run benchmark      # compiled MCP stdio benchmark in deterministic mock mode
npm run benchmark:ci   # same benchmark with broad sanity budgets
TYPESAFE_API_KEY=ts_... npm run eval:live  # explicit live semantic evaluation
```

The test runner explicitly enumerates deterministic files for consistent behavior on Node 20/22 and Windows/Linux. Live evaluation is opt-in through `npm run eval:live` or `npm run eval:agent`; neither is discovered by `npm test`. Explicit live commands reject mock mode and custom provider endpoints and report missing prerequisites as blocked. See [evaluation guidance](../evals/README.md).

Package tests run separately from `npm test`: they invoke the `prepack` build, inspect shipped files, and install the tarball in a temporary application with `npm ci --offline --ignore-scripts`. The temporary lockfile reuses the committed production dependency graph and exact integrities, so stale cached version lists cannot change resolution. The test then runs the installed mock CLI. It needs an npm dependency cache populated by `npm ci`; it never fetches packages or publishes. CI runs tests, type checking, build, and package smoke on Windows and Linux with Node 20 and 22.

The performance benchmark is deliberately opt-in because timing thresholds are runner-dependent. It starts the compiled MCP server over stdio with `JEV_MCP_MOCK=1`. The child receives only `PATH`, `NODE_*`, and `SystemRoot`, never `GITHUB_TOKEN` or the TypeSafe key. Server stderr is reported by size only. It warms each tool, then reports startup time, p50/p95/p99 latency, and throughput for sequential calls, concurrent calls, larger evaluate payloads, and larger rank/tool-route candidate sets. `benchmark:ci` applies broad hang/regression budgets rather than claiming production Jev latency or quality; use live-provider measurements separately when network and provider cost are part of the question. `JEV_BENCH_JSON=1` emits a machine-readable report.
