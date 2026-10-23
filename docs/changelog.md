# Changelog

## Unreleased

### Fixes

- `jev_verify` no longer softens a per-claim `escalate` to an overall `review`: the overall action is now the strictest per-claim action. Per-claim actions use the same verdict policy as `jev_gate`, so a confident contradiction escalates and is counted in `needs_review` instead of reporting `auto`. **Behavior change:** a confident `unsupported` verdict is now `review` per claim, not `auto`.
- `jev_screen` accepts a stricter per-call `block_at` below `0.25` by lowering `review_at` with it, instead of rejecting the call.
- A per-call `review_at` above the env `auto_accept` raises `auto_accept` with it instead of failing; an explicitly inverted caller pair is still rejected.
- `jev_triage` sanitizes host cause IDs before they reach the judge and runs the injection backstop over attempt/history actions and cause descriptions.
- `jev_tool_route` reports `thresholds.dispatch_at` like `jev_step`; `jev_coding_loop` rejects an empty `task`; mock mode validates each response once.
- `jev_risk` (and the risk-aware gate) no longer lets a moderate concern on one flag mask a confident concern on another, or mask an escalating severity score: every critical flag and severity are checked for escalation before any review result.
- Raising `auto_accept` can no longer delay escalation of a judged concern. Scope `needs_confirmation`, critical risk flags, and confidently contradicted claims escalate at `min(auto_accept, 0.8)`, so tightening a call only ever makes it stricter. Behavior at or below the default `0.8` is unchanged.
- `jev_triage` decides every escalation (low cause/strategy confidence, a recommended `escalate`, low recoverability) before any review-band result, so tighter thresholds cannot soften an escalation, and a recommended escalation is no longer reduced to `review` by moderate cause confidence.
- The deterministic injection backstop deletes invisible characters before matching, so a zero-width, soft-hyphen, or bidi character inside a word cannot hide a phrase. It also matches common determiners ("ignore your/any/all of the previous instructions"). The soft hyphen, word joiners, and BOM are now stripped from judge projections.
- Truncation below the marker length no longer emits a lone UTF-16 high surrogate.

### Test suite

- Added seeded property tests for every policy function (threshold monotonicity, never-auto conditions, distribution guards), a cross-tool invariant table (clean answers reach `auto`; truncation, flat distributions, injection text, malformed answers, and provider failures never do), and table-driven matrices for the provider boundary, question parsing, CLI arguments, configuration, reason codes, injection phrases, stats, cache, and limits. Branch coverage of `src/` rose from 87.8% to about 94%.

### Response cache, stats, and token budget

- Opt-in cache of validated provider results (`JEV_MCP_CACHE_TTL_MS`, `JEV_MCP_CACHE_MAX_ENTRIES`). Hits report zero usage; every tool still applies its policy, thresholds, and coverage checks to cached answers. Cancelled requests are never cached.
- `JEV_MCP_TOKEN_BUDGET` caps provider tokens per process and fails closed with the new `BUDGET_EXHAUSTED` error code before any request.
- New `jev://stats` resource with per-tool calls, actions, error codes, latency, and tokens, plus provider requests, cache hits, and remaining budget. It never records tool inputs or outputs. The server now exposes 12 tools, 12 resources, and 6 prompts.
- All tools register through one helper that shares the deadline scope, error envelope, and stats recording.

### Security-aware gate

- `jev_gate` accepts `risk: true` with optional `files` and `dependencies`: patch review, claim verification, and the `jev_risk` security flags run in one Jev request. The response adds a `security` report and the `security_review` / `security_escalated` reason codes. Without `risk`, requests and responses are unchanged.

### Deterministic loop detection

- `jev_triage` fingerprints failed attempts and history after masking timestamps, durations, hex IDs, temp paths, and numbers. Repeated fingerprints, or the same failure across two or more failed attempts, add `loop: { detected, repeats, kind }` and `loop_detected` and block `auto` even when Jev reports `advancing`.

## 0.2.0

### Scope, failure triage, and security risk tools

- Added `jev_scope`, `jev_triage`, and `jev_risk` with `scope`, `triage`, and `risk` question packs. The server now exposes **12 tools, 11 packs, and 6 prompts**.
- `jev_scope` checks semantic scope, declared-effect consistency, fresh-confirmation need, and risk; external/destructive/unknown effects can never be `auto`. `auto` is not authorization.
- `jev_triage` selects a failure cause, loop progress, recoverability, and recovery strategy. Repeating/regressing progress, exhausted retries, `ask_user`, and low recoverability cannot be `auto`; the host still executes any recovery call.
- `jev_risk` judges authorization, validation, secret-exposure, data-loss, concurrency, dependency, and external-effect concerns plus severity. Critical/uncertain flags cannot be `auto`; it is never merge permission.
- Moved the deterministic injection backstop into shared `untrusted.ts` and applied it to the new tools' untrusted state. Added document-safe sanitization that preserves newlines for logs/diffs.
- Added `jev-scope-check`, `jev-debug-loop`, and `jev-pr-risk` MCP prompts, mock regression tests, skill contracts, and a benchmark/evals update.

### Security hardening for untrusted data, helper connections, and evaluation

- Every state-bearing question pack now carries a shared data-boundary clause; `jev_rank` keeps its query in state, strips bidi/control characters from projected IDs, names, and argument keys, and never lets a partial `exists` verdict coexist with `action: auto`. `jev_screen` adds a deterministic high-signal injection-pattern backstop. Prompt injection remains a residual model risk; screening is advisory.
- Custom base URLs now reject localhost/`.local`/`.internal`/single-label/trailing-dot names, zone identifiers, and the missing reserved/NAT64/6to4 ranges; the official host must use its default port. `doctor` prints only the URL origin. Unknown internal errors no longer relay raw messages.
- The bundled evidence helper rejects symlink escapes, caps reads, isolates its test subprocess home, writes owner-only evidence with a self-ignoring `.task-evidence/.gitignore`, and refuses a workspace-local connection unless `--trust-connection` is explicit.
- Agent evaluation entrypoints require `JEV_EVAL_ISOLATED=1`, and `processEnv` no longer forwards `NODE_OPTIONS`. Python webhook/dashboard calls reject redirects so credentials cannot be replayed to another origin. CI checkouts no longer persist credentials; the notify workflow only runs for trusted PR authors; examples forward keys through the environment and generated evidence/connection files are ignored.
- `runToolRoute`/`runStep` report `truncated: true` for clipped candidate descriptions; `jev_verify` adds `all_claims_verified`; noul criteria and `__proto__` question/option IDs are rejected explicitly; tiny budgets keep a true state prefix instead of fabricated marker text; rank validates `top_k` for direct callers.

### Portable skill and real-task evaluations

- The standalone skill ZIP contains its own tool contracts, setup and TypeSafe references, dependency-free evidence helper and MIT license. All nine request examples are checked against actual schemas and executable MCP calls; archive bytes and checksums are reproducible.
- Added MCP prompts (`jev-step-loop`, `jev-completion-gate`, `jev-screen-untrusted`) alongside the nine tools and eight pack resources.
- Upgraded `evidence.mjs` diff collection to produce multi-hunk unified patches with configurable surrounding context (`--context 12` by default) so enclosing function signatures and invariants remain visible to Jev review, and to forward all `TYPESAFE_*` and `JEV_MCP_*` configuration variables when invoking `judge` or `screen`.
- Fixed IPv6 URL parsing and non-public address checks in `src/config.ts`, `jev_step` omitted-candidate coding-loop handoffs, `jev_screen` per-call `review_at` tightening, `jev_verify` `review_at` threshold wiring, CLI `eval` policy `action` output and dash-prefixed `--state` values, PowerShell checkout path normalization, and GitHub watch snapshot event merging.
- Added independent historical-policy, pagination and hostile-report parser tasks, bounded Codex/Cursor paired evaluation runners, redacted stdio observation and JSON/Markdown reports. Hidden behavioral graders and protected-file checks are independent of agent claims.
- Live semantic evaluations are explicit commands. Ordinary tests never spend an inherited API key; mock transport performance remains a separate benchmark. CI validates the skill and uploads its archive and checksum.
- Prepared-call routing judges the information the server actually receives, rather than trying to validate deliberately withheld argument values. Review questions refer directly to request, diff and tests and distinguish code scope from separate delivery steps. Confidence and approval floors remain unchanged.

### Benchmark and dashboard output

- The performance benchmark starts the MCP server with an allowlisted environment (`PATH`, `NODE_*`, `SystemRoot`) and `JEV_MCP_MOCK=1`. It does not pass `GITHUB_TOKEN`, and it does not print raw server stderr.
- The GitHub watch dashboard writes `unavailable` when `gh pr list` fails or no token is present. A successful empty list stays `none`. Pull request titles are escaped and length-capped before they enter a markdown table. The publish job already requests `pull-requests: read`.
- Notify exits 1 when the Cursor key is missing or the POST never succeeds. The dashboard job still runs with `if: always()`.

### Client bounds for URL, deadline, and token estimates

- The default API root is `https://api.typesafe.ai`. Another public HTTPS host requires `JEV_MCP_ALLOW_CUSTOM_BASE_URL=1`. HTTP is loopback only. Userinfo, queries, fragments, and non-public or obfuscated addresses are rejected, and the value is stored as origin plus path.
- Each TypeSafe attempt uses the time remaining on the tool deadline, does not retry its own timeout, and does not follow redirects. 429 and 5xx retries stay on the same cancellation signal.
- Per-call `auto_accept` and `review_at` can only rise relative to the environment. Screen `block_at` can only fall, so a call cannot loosen the block floor.
- Token estimates charge at least one token per non-ASCII character. Provider `input_tokens` above the total budget force incomplete coverage, so evaluate cannot auto.

### Selection, review, and rank cannot auto past a failed check

- `jev_step` passes only a locally dispatchable call into partner routing. A host `prepared_tool_call` flag no longer skips uncertain selection, external or destructive effects, or a confident `none`. Empty and wholly ineligible lists are not `auto` and do not open a partner turn.
- `ask_user` requires the same distribution check as continue and retry. A flat distribution stays in review.
- Review and gate `auto` now requires each dimension to clear a floor: correctness and spec at least 1, test gap and blast radius at most 1, on the 0–2 score scale. A weighted sum of 0.7 is not enough.
- `jev_rank` returns `auto` only when final-round `exists` meets `auto_accept` and the `best` choice distribution supports that confidence. `partial` stays `review`. Tournament `exists` comes from the final round only.
- A candidate description clipped at 2,000 characters is incomplete coverage and cannot be dispatched. Argument values stay on the host.

### GitHub notify no longer runs pull-request code

- Notify triggers are `pull_request_target`, `pull_request_review`, pushes to `main`, and `workflow_dispatch` from `refs/heads/main` only. Both jobs check out the repository default branch with `persist-credentials: false` and never check out the PR head or `github.sha`.
- `CURSOR_API_KEY` stays on the notify job (`contents: read`). The publish job has `contents: write` and `pull-requests: read` and does not receive the key. `cursor-watch` is created from the checked-out default-branch SHA.
- The notify script posts only to `https://api.cursor.com` (`http://127.0.0.1` and `http://localhost` are allowed for tests). Other hosts, userinfo, queries, and fragments are rejected. Event fields travel as a separate JSON blob with control characters removed and a length cap. The agent must confirm a merge through the GitHub API before any push. A missing key or a POST that never succeeds exits 1. Logs say only that a key is present.
- Required reviewers on a GitHub Environment are a repository setting the owner should turn on. The workflow does not declare an environment, because a missing one would fail notify.

### Interoperability and policy hardening

- Added MCP output schemas and structured success payloads for all nine tools.
- Added an opt-in compiled MCP performance benchmark covering stdio startup, sequential and concurrent calls, payload scaling, and candidate scaling in deterministic mock mode.
- Tool-route and fused-step judgments now receive redacted candidate projections rather than raw argument objects; selected calls still return the original host-prepared arguments after local validation.
- Invalid numeric configuration values and malformed base URLs now fail diagnostics instead of silently falling back. Empty CLI state is preserved, and invalid evaluation bodies are rejected explicitly.
- Added bounded inputs for ranking and claim verification, plus a local coherence guard that prevents overstated provider confidence from authorizing automatic decisions.

### Fused step router

- Added `jev_step` as the ninth MCP tool and `jev://packs/step` as the eighth question pack. One Jev request answers the coding-loop and prepared-call recipes together, so a loop iteration costs one MCP round-trip, and therefore one host-model turn, instead of two.
- Selection reuses the `jev_tool_route` eligibility filter and dispatch floors; routing reuses the `jev_coding_loop` partner policy unchanged. Incomplete context, `stop`, `ask_user`, an uncertain next step, destructive risk, a non-auto action, and two failed attempts all outrank a dispatchable call, and a returned call never accompanies a partner request.
- Ineligible candidates are filtered locally and receive no question; with no eligible candidate the request carries the coding-loop pack alone. Fusing the packs lowers the state budget by the added question size, and an oversized request truncates into incomplete coverage rather than dispatching.
- Prepared candidates that Jev declines without confidence route to context gathering with `prepared_candidates_declined` instead of buying a generative turn. A confident `none` still allows the partner turn the coding loop asked for.
- `jev_coding_loop` and `jev_tool_route` are unchanged and still available.

### Cloud Agent GitHub event delivery

- Added `.github/workflows/notify-jev-mcp.yml` so GitHub PR/merge events POST into the Jev_MCP Cloud Agent instead of a polling timer. Requires repository secret `CURSOR_API_KEY`.
- Notify sends HTTP Basic auth on the first request (same as `curl -u KEY:`), strips whitespace/quotes, and rejects masked dashboard table values that Cursor reports as `Invalid User API Key`.
- Notify also writes a live dashboard (`docs/github-watch.md` and an interactive `docs/github-watch.html` on branch `cursor-watch`, plus the GitHub Actions job summary) and tells the Project coordinator to copy both files into the Cursor Project store and post a visible Project chat line, including manual `workflow_dispatch` pings.
- The watch board always leads with the highest-numbered pull request and keeps the last saved list when GitHub cannot be read. Each pull request shows author, branches, diff size, checks, reviews, commits, and files. The HTML board adds search and open/merged/closed filters without hiding that newest pull request.

### Routing follow-up to PR #2

- Automatic tool dispatch and partner generation now require independently concentrated probability distributions as well as the reported confidence threshold. Flat or weak selection, next-step, risk, or tier distributions cannot pass on overstated confidence alone. The additional local guard preserves reported provider fields and normalizes permitted probability rounding error.
- Fixed floating-point boundary comparisons in coding-loop routing: context uncertainty exactly at `0.2` passes the default `0.8` threshold, and generation probability exactly at `0.2` receives `generation_not_required`.
- Added regression coverage for inconsistent confidence, strict and inclusive thresholds, candidate counts up to 32, and probability-mass rounding.

### Coding and prepared tool-call routing

- Added `jev_tool_route` as the eighth MCP tool and `jev://packs/tool-route` as the seventh question pack. It selects among at most 32 exact host-prepared calls, with an independent suitability judgment for each eligible candidate.
- Local policy requires explicit trusted host authorization, actual schema validation, and satisfied prerequisites. Unknown effects and two or more failures of an unchanged call block a candidate. Empty or wholly ineligible lists return with zero usage and no Jev request.
- Argument objects containing an own `__proto__` property at any depth are rejected to prevent schema parsing from silently changing an authorized call; candidate IDs remain unchanged.
- Only complete, suitable read-only or local-write selections meeting the fixed minimum `0.8` dispatch threshold expose an executable call. External or destructive writes require review. The server neither generates arguments nor executes calls; all tool-route results decline a partner-model handoff.
- Coding-loop results now include `needs_generation`, `handoff`, and `partner_model`. Optional `execution` facts describe a prepared tool call, complete host context, and failed attempts. Generative handoffs require a safe, confident generation decision after context and prepared-call checks, with a fixed minimum `0.8` threshold for generation need, next-step, risk, and tier confidence.
- Host guidance now favors deterministic code and reusable plans for tool sequences. Each new observation updates routing; uncertainty, escalation, and legacy tier answers alone do not request another generative model.

### Combined completion gate

- Added `jev_gate` and the `jev://packs/gate` resource. One upstream request reviews a patch and verifies completion claims against supplied evidence.
- Gate results include the overall action, stable reason codes, separate review and verification reports, input coverage, token usage, and model name.
- Automatic approval requires complete context, an acceptable patch review, and confident verification of every claim. Unsupported claims require review; confidently contradicted claims escalate.

See [tool arguments and outputs](tools.md) for the gate contract and examples.

### Reliability fixes

- Truncation now reserves space for its marker and reports how much input was evaluated. Incomplete context cannot return `auto`; oversized question sets fail before an API call.
- Ranking preserves original candidate IDs across bounded reduction rounds, rejects duplicate IDs, handles singleton batches, and reports when the requested reduction cannot fit the budget. Candidate text limits apply consistently to state and criteria.
- Coding-loop stop decisions now account for risk and whether the task is sufficiently complete.
- MCP cancellation and `JEV_MCP_TIMEOUT_MS` enforce one total deadline across upstream calls, retries, and ranking rounds. The default is 30 seconds.
- Provider responses are checked for expected answer IDs, types, ranges, probability distributions, and consistency before policy decisions are calculated.
- Failures expose stable error codes and safe messages without returning provider response bodies or credentials.

### Diagnostics and distribution

- Added `doctor --json` for machine-readable readiness checks, with a nonzero exit status on failure. Unknown CLI commands and invalid evaluation input fail explicitly.
- The Windows checkout helper now stops on native-command failures and restores the caller's working directory and temporary environment settings.
- `npm pack` and `npm publish` build through `prepack`. Packages include linked documentation, examples, the agent skill, and installation scripts.
- Added Windows and Linux CI jobs for Node 20 and 22, covering tests, typechecking, builds, and an isolated offline install of the packed artifact.
- Updated installation, configuration, architecture, tool, and agent guidance. Environment files are not loaded automatically.
- Updated repository metadata and checkout instructions to use the GitHub repository.

### Compatibility notes

- Existing tools remain available; `jev_gate` and `jev_tool_route` are additive. Coding-loop `model_tier` remains a conditional recommendation; clients deciding whether to invoke a generative partner should use `partner_model.required` and `handoff`. Omitting `execution.context_complete` prevents an automatic partner request.
- Consumers must handle stricter review or escalation results when context is incomplete or a stop decision is risky. Tool-route eligibility flags are host assertions, not server-side checks of a tool registry; the host remains responsible for actual validation and execution.
- Token budgets use a character-based estimate, not an exact provider tokenizer. Inspect `coverage` and `truncated`; ranking identifies estimates that describe only its final upstream request.
- All nine tool errors set `isError` and return the typed error object as JSON text without `structuredContent`, so MCP clients do not validate an error against the tool's success schema.
- No dependency versions or package version were changed. Mock mode remains suitable only for tests and demonstrations.

### Validation

The earlier completion-gate and reliability changes passed the local test suite with 77 passing tests and one live API test skipped because no API key was configured. Typechecking, the production build, and the separate packed-install smoke test passed. The smoke test uses the committed production dependency graph and cached integrity-checked artifacts, then runs the installed CLI from an isolated directory.

Regression coverage includes limits, ranking, gate decisions, HTTP failures and retries, deadlines, cancellation, response validation, CLI behavior, Windows installer failures, and real stdio MCP calls. Live provider judgment quality and routing cost savings have not been established by mock and fixture-based checks.
