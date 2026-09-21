# Changelog

## Unreleased

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
- Notify also writes a live dashboard (`docs/github-watch.md` on branch `cursor-watch` plus GitHub Actions job summary) and tells the Project coordinator to refresh the same file in the Cursor Project store and post a visible Project chat line, including manual `workflow_dispatch` pings.

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
- Existing tool errors expose structured error details. Gate failures instead set `isError` and return the error object as JSON text, without `structuredContent`, so MCP clients do not validate an error against the gate's success schema.
- No dependency versions or package version were changed. Mock mode remains suitable only for tests and demonstrations.

### Validation

The earlier completion-gate and reliability changes passed the local test suite with 77 passing tests and one live API test skipped because no API key was configured. Typechecking, the production build, and the separate packed-install smoke test passed. The smoke test uses the committed production dependency graph and cached integrity-checked artifacts, then runs the installed CLI from an isolated directory.

Regression coverage includes limits, ranking, gate decisions, HTTP failures and retries, deadlines, cancellation, response validation, CLI behavior, Windows installer failures, and real stdio MCP calls. Live provider judgment quality and routing cost savings have not been established by mock and fixture-based checks.
