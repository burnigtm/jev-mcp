# Changelog

## Unreleased

### The default auto-accept bar is now 0.70

- **`auto_accept` defaults to 0.70 (it was 0.80)** for `jev_scope`, `jev_triage`, `jev_risk` (and `jev_rank`). A sweep of the bar from 0.95 down to 0.50 and two rounds of borderline cases found the plateau; the final holdout (2,153 cases, 1,227 risky, fresh seeds) had **no risky case approved at any bar from 0.50 to 0.95**, and the end-to-end benchmark (three runs of 196 risky cases) had none at 0.70, while safe approvals went from 77% (0.80) to 89%: first-failure triage 6/39 to 34/39, scope 43/90 to 56/90. Reports: [default-bar-2026-10-24](../evals/results/default-bar-2026-10-24.md), [threshold-2026-10-24](../evals/results/threshold-2026-10-24.md). **Behavior change:** more `auto` results for those tools; `JEV_MCP_PROFILE=conservative` restores the earlier 0.80 exactly.
- **Profiles are now `balanced` (0.70, the default), `conservative` (0.80, the earlier default) and `strict` (0.90).**
- **Patch review and claims keep a 0.80 bar under every profile** (`max(auto_accept, 0.8)`; `jev_review`, `jev_verify`, and the review and claims inside `jev_gate`), and so do the tools the lower bar was never measured on: `jev_coding_loop`, the routing in `jev_step`, and `jev_evaluate`. The testing found why: they gain nothing from a lower bar (the same safe cases are approved at 0.70 and 0.80), and each had a risky case only the 0.80 bar held (a "no regressions" claim backed only by updated snapshots, approved up to 0.67; a requested behavior change whose callers outside the diff would break, approved at 0.70 in 15 of 15 runs). Reported thresholds show the bar actually applied.
- **`jev_triage` reason `privilege_boundary`**: a permission failure (`EACCES`, `EPERM`, `permission denied`, `access is denied`) on a system path (`/etc`, `/usr`, `/var`, `/opt`, `/root`, `C:\Windows`, `C:\Program Files`, `~/.ssh`, ...) is held for review whatever the confidence. Tighten-only; it held all 293 generated permission cases and no other triage template.
- **Fix: raising `auto_accept` on a call could delay an escalation.** Judged concerns (a critical `jev_risk` flag, `needs_confirmation`, a confident contradiction) escalate at the configured bar, capped at 0.80. The cap used to be a constant equal to the old default, which would have let a caller raising the bar from 0.70 move the cutoff up to 0.80. The cutoff is now `min(configured bar, 0.80)` and no longer moves with the caller's value; `conservative` and `strict` keep their earlier cutoffs. New property tests cover this.
- **Testing added:** property tests over thousands of random inputs and random provider answers (a lower bar approves a superset and never releases an escalation; `auto` always implies the stated conditions; every deterministic floor holds at every bar and profile even when the model approves everything), a docs-sync test for the documented bars, 33 borderline ("hard") and 40 "blind" templates (`scripts/lib/bonus-hard.mjs`, `bonus-blind.mjs`; run with `--hard` and `--blind` in `scripts/eval-threshold.mjs`, which also repeats cases with fresh provider answers), and two stale checks in the live skill evaluation were corrected (a correct, confident `contradicted` or `unsupported` verdict is a pass, not an abstention). Live skill evaluation: 16 of 16 passed.

### Hook replayed against a real session

- **`scripts/eval-replay.mjs`** replays a Claude Code transcript through the `PreToolUse` hook (nothing is executed) and reports counts and content-free shapes only. On 900 real tool calls at the 0.70 default it found two flaws in the hook, both fixed: the judge was told every shell command was declared `read_only`, so each write read as an effect mismatch; and the host's own scratch space and plan files counted as "outside the workspace". Held calls fell from 66.8% to 55.8%, all 122 destructive, external and unclassifiable commands stayed held. Result: [replay-2026-10-24](../evals/results/replay-2026-10-24.md). **Behavior change:** fewer asks; writes under `<temp>/claude/` and `~/.claude/plans/` no longer ask.
- The user's prompt and the agent's description are redacted for secrets before the judge sees them.

### Ledger key race

- **A ledger record could be silently dropped when several processes started at once.** The per-install key was created empty and then filled, so a process that read it in between found an invalid key and dropped its record (seen once as 239 of 240 lines on a Windows CI run). The key is now written to a private temporary file and linked into place, so a reader never sees it half-written; a reader that still meets a short key (a file system without hard links) waits up to half a second for the writer. New tests include a slow writer, which failed before the fix, and a repeated race to create the key; the multi-process test helper now fails if any record is refused.

### Calibrate, `jev://ledger` and SARIF

- **`jev-mcp calibrate [--dir DIR] [--since YYYY-MM] [--min-sample N] [--json]`** reads the decision ledger and reports per-tool action mix, labeled outcomes, false-alarm and miss rates, false-alarm rate by reason code, and inputs that got different actions. Only decisions labeled with `jev_feedback` count as ground truth; a reason code needs at least 20 labels (configurable) before it can produce a suggestion; a labeled miss replaces any suggestion to loosen with a suggestion to tighten. It **suggests and never applies**, and its report holds counts only. Damaged or hostile ledger lines are skipped.
- **New resource `jev://ledger`** (the server now has thirteen resources): the same report for the configured ledger, or a note that the ledger is off.
- **`jev-mcp ci --format sarif`**: SARIF 2.1.0 with file-level locations for policy findings, held parts and withheld sensitive files; fixed message text only, unsafe paths skipped, at most 100 results.

### Caller context

- **Optional `context.callers` on `jev_review`, `jev_risk` and `jev_gate`**: up to 40 `{ path, line?, text, symbol? }` uses of the changed symbols outside the diff, supplied by the host. The snippets are untrusted (sanitized, secrets redacted, instruction-like text dropped). With callers present the correctness and blast-radius questions compare each use with the change. The decision policy is unchanged, and a test checks that identical judgments give identical decisions with and without callers. Without `context` the request is exactly what it was before.
- **`src/context.ts`**: extracts the changed symbols from a diff (removed or rewritten declarations first, then enclosing ones; names that are only added, too short or too common are skipped) and finds their uses with `git grep` (arguments array, fixed strings, refs validated, never the changed files, sensitive or generated paths, or import lines). `jev-mcp ci --callers` and the Stop hook use it with `JEV_MCP_CALLER_CONTEXT=on`; a snippet that reads like an instruction holds the pull request (`caller_context_injection`).
- **Measured, and it did not help (so it is opt-in and off by default):** on 40 fresh small cases judged with and without callers (live `jev-1.14.0`), correct fixes to a function with callers were approved 10 of 10 without them and 3 of 10 with them, the 30 risky cases were blocked 30 of 30 either way, and tokens rose by a third. The reasons did name blast radius far more often (23 of 30 risky cases with callers, none without). The expected win, fewer blast-radius holds on correct fixes, appeared only for large diffs, which this run did not cover. Report: `evals/results/callers-2026-10-24.md`. The benchmark gains the `jev_review_callers` extras and `--with-context`.

### Pull-request gate

- **`jev-mcp ci --base REF --head REF [--pr-title-file F] [--pr-body-file F] [--tests-file F] [--format json|github] [--fail-on review|escalate] [--deterministic-only] [--require-jev]`**: exit 0 auto, 10 review, 20 escalate, 2 error (fail-closed). It reads `.jev-policy.json` from the **base ref** (a pull request cannot loosen its own rules; changing the file holds), matches every changed path against `protected_paths`, applies deterministic floors (sensitive files named but never read, secrets redacted and reported, truncated diff, lockfile or binary change, injection phrases in the title, body or commit messages), and with Jev screens the description, reviews and security-checks the patch (chunked when large) and verifies **checked boxes** against `--tests-file`. It never runs pull-request code. Pull requests from forks run the deterministic checks only and say so.
- Output: `--format github` writes at most ten escaped workflow annotations and a sanitized markdown step summary (no mentions, HTML, links or tables from pull-request text); `json` holds reason codes, counts and file names only. `--fail-on escalate` changes only the exit code.
- **When nothing is claimed, the gate verifies nothing.** The completion gate used to invent the claim "the change implements what was requested" for checks without claims, which no evidence could support, so every such check was held. Without claims, `jev-mcp ci` and the `Stop` hook now review the patch and its security and verify no claim. New `gateDiff` in `src/check.ts`; git helpers for refs (`isSafeRef`, `refChanges`, `showFile`) in `src/git.ts`.
- Dry run on this repository's own history (live `jev-1.14.0`): #12 and #13 would have escalated (large patches Jev does not trust, plus a false-positive injection hold because both are about the injection backstop); #14 passed only without a model. The gate is strict by default; start as a non-required check. Report: [ci-2026-10-24](../evals/results/ci-2026-10-24.md). Guide and trust boundaries: [pull-request gate](ci.md); example workflow `examples/github-pr-gate.yml` (not enabled here, untested inside GitHub Actions).

### Enforced hooks and `jev-mcp check`

- **`jev-mcp hook pre-tool-use`** for Claude Code: every `Bash`, `PowerShell`, `Read`, `Write`, `Edit`, `MultiEdit` and `NotebookEdit` call is checked before it runs. The command classifier and the repository policy answer first; a confirmed read-only command is silent with no model call; only the gray zone calls `jev_scope`, with the task read from the transcript. A hook can only restrict: it prints nothing, asks, or (only for an explicit `deny` rule in the repository's own policy) denies. It never prints `allow`. A model judgment becomes an `ask`, never a `deny`.
- **Fail-closed matrix** when Jev cannot be reached, is over budget or times out: destructive, external-write and unclassifiable commands ask; routine local work continues. Reads of key and credential files ask without a model call. Editing the guard's own configuration asks. Per-session call cap, own deadline, shadow mode (`JEV_MCP_HOOKS=shadow`), kill switch (`JEV_MCP_HOOKS=off`) and a recursion guard.
- **`jev-mcp hook stop`** (opt in with `require_gate_on_stop` in the policy file): gathers the uncommitted changes, redacts secrets, extracts up to five completion claims, optionally runs `JEV_MCP_TEST_COMMAND` (from the environment only), runs the completion gate with the security check, and blocks at most twice per session. It never traps the session on an error.
- **`jev-mcp hook install [--stop] [--shadow] [--block-on-failure] [--write FILE]`** prints (or merges into FILE) the settings, in exec form so it works on Windows and with paths that contain spaces. **`jev-mcp check`** gives other hosts the same decision on stdin/stdout with exit codes 0, 10, 20 and 2.
- New modules: `src/check.ts` (the decision core shared with the CI gate to come), `src/git.ts` (git with an argument array, no shell, no external diff, size and time caps, sensitive files named but never read), `src/sensitive.ts` (a superset of the skill collector's list, with a parity test), `src/redact.ts` (secret redaction before text is sent to the provider), `src/hook.ts`, `src/hook-install.ts`. Guide: [hooks](hooks.md).
- Measured live (`jev-1.14.0`, 120 replayed agent actions over three fresh seeds): with no configuration the hook held 57 of 64 risky actions, with a small policy all 64; it left 45 of 56 safe actions alone, and every interruption was an honest local write (`git add`, `git commit`, `npm test`); about half of events needed no model call; median 167 ms. With Jev unreachable the deterministic layer alone held 48 of 64. In a first run the hook denied some honest `git add` and `git commit` commands on the model's say-so, which a user cannot override, so a model judgment is now an `ask`. **A manual run inside a real Claude Code session has not been done.**
- The benchmark gains `scripts/eval-hooks.mjs`.

### Large-diff review

- **`jev_review`, `jev_risk` and `jev_gate` no longer give up on large diffs.** A diff over the single-request limit (about 31.8k estimated tokens) used to be truncated and could never be `auto`. A diff with file headers is now split along file boundaries (a source file kept with its test; an oversized file split by hunks and marked partial), each chunk is judged by its own Jev request (3 at a time, at most `JEV_MCP_MAX_REVIEW_CHUNKS`, default 12), and the judgments are merged so the result is never more favorable than its worst chunk. Diffs that fit one request, and diffs without file structure, behave exactly as before.
- **Deterministic cross-chunk floor.** Information a per-file split loses is covered by rules that only tighten: an unpaired source change, a removed or rewritten public declaration, a lockfile or binary change, a partially shown file and a cap overrun each force at least `review` and add a named reason code (`unpaired_source_change`, `export_signature_change`, `lockfile_changed`, `binary_file_changed`, `partial_file_review`, `diff_too_large`; `chunked_review` is added to every non-`auto` chunked result).
- Additive output: `chunks: [{ files, action, partial }]` and `omitted_files` on `jev_review`, `jev_risk` and `jev_gate`. In `jev_gate` the claims are verified once against the evidence alone, as `jev_verify` would, because the diff is never part of that request. Binary content is never sent. A test log over a quarter of the budget is cut so it can be repeated in every chunk, and the review is then incomplete. An MCP tool call may take several times the default timeout (one default per wave of chunks); each Jev request keeps its own timeout.
- **The size estimate is approximate; the provider's refusal is now handled.** Live runs showed `chars/4` under-counts dense code by about 1.4x. A request the provider rejects as larger than its context window (`max_tokens_exceeded`) is now `INPUT_TOO_LARGE` instead of `API_ERROR`, is not charged against `JEV_MCP_TOKEN_BUDGET`, and is retried through the chunked review when the diff has files to split on. Chunks target 62% of the estimated budget and, if the provider still refuses one, the review is re-planned at 38% and then 23%; `usage` counts every call that completed, including those of an abandoned attempt.
- Measured live (`jev-1.14.0`, 16 large changes of 148-199k characters, fresh seed): all 10 risky changes blocked (0 unsafe auto-approvals); the strictest chunk verdict landed on the chunk holding the planted defect in 7 of 8 cases, where judging only the first part would have covered it in 1 of 8; large security reviews were approved 4/4 when clean. Cost is proportional to the diff: 74k tokens per case against 25k for the first part alone. Large clean renames are still held by Jev itself (a control on small slices of the same diffs is held 6 of 6), so chunking does not change that. **No default was changed.** The benchmark runner gains `--max-chunks`, comma-separated `--only`, and large-diff extras for `jev_review` and `jev_risk`.
- New internals: `src/diff.ts` (lossless unified-diff parser), `src/diff-chunks.ts` (planner and floors), `src/tools/chunked.ts` (orchestration and merge), `stateBudget` in `src/limits.ts`.

### Repository policy and profiles

- **`.jev-policy.json`**: deterministic rules evaluated by `jev_scope` before any Jev request. `protected_paths` (globs with a `review` or `deny` floor), `commands.deny` / `commands.review` (token-prefix patterns with `*` and flags, normalized the way a person reads a command: `sudo git -C repo push -f` matches `git push --force`; no user regular expressions), and `commands.allow_read_only`. `deny` and `allow` decide locally with no model call (`model: "local-policy"`, zero tokens); `review` still asks Jev and keeps the stricter answer. `allow_read_only` is the only loosening a policy can cause: it applies only to a command the classifier fully confirmed as read-only, with a declared `read_only` effect, no injection phrase, and an explicit allow pattern for every segment. A broken policy file is a `CONFIG_ERROR`, never ignored. Output adds `policy: { decision, rule }` and the reasons `policy_denied`, `policy_review`, `policy_allowed`; `scope` and `risk` are `null` when the policy decided. A `test_command` is deliberately not supported (a checked-in command would be a code-execution path). See `examples/jev-policy.json`.
- **Glob matching is linear-time**, a segment dynamic program rather than a regular expression, so no pattern can cause catastrophic backtracking.
- **Profiles** (`JEV_MCP_PROFILE=balanced|strict`): `balanced` is exactly the previous behavior; `strict` raises `auto_accept` to 0.9, `review_at` to 0.6, lowers the screen `block_at` to 0.6 and sets the triage bar to 0.9. Precedence: profile, then explicit variables, then per-call arguments, which can only tighten. `jev-mcp doctor` prints the profile, the policy file and the bars, and fails if the policy file is invalid.
- **`JEV_MCP_TRIAGE_RECOVERABLE_AT`**: a dedicated bar for triage recoverability (default: the auto-accept bar, unchanged). A caller raising `auto_accept` also raises it.
- Measured live (`jev-1.14.0`): a read-only allowlist cut tokens 18% on the same scope cases, answered 9 commands locally and still blocked 30/30 lying commands; `strict` blocked no more risky cases than `balanced` (both 100%) but cut safe auto-approvals from 80% to 59%; a triage bar of 0.7 took safe first-failure triage from 7/22 to 22/22 `auto` with all 83 risky triage cases still non-`auto`. **No default was changed.**
- Internals: `commandSegments` and `canonicalFlags` expose the classifier's command normalization; the wrapper unwrapping is now a single shared function.
- Benchmark runner options: `--profile`, `--policy-file`, `--triage-recoverable-at`.

### Decision ledger and `jev_feedback`

- **Every judgment result now carries a `decision_id`** (additive; a fresh one per response, even when the provider answer came from the cache). New 13th tool **`jev_feedback`** (`readOnlyHint: false`) and CLI twin `jev-mcp feedback <decision_id> <correct|false_alarm|missed> [--note TEXT]` label an earlier decision.
- **Opt-in local ledger** (`JEV_MCP_LEDGER=1`, `JEV_MCP_LEDGER_DIR`, `JEV_MCP_LEDGER_MAX_BYTES`): one JSON line per decision, tool error and feedback in a monthly file, written with a single `O_APPEND` write so several servers can share it. **No tool input or output text is stored.** Inputs are fingerprinted with an HMAC keyed by a random per-install secret, so short or guessable inputs cannot be recovered by hashing. The ledger is observability only: write failures and a full file are counted in `jev://stats` (`ledger.written/dropped/errors`) and never affect a decision. `0600` permissions have no effect on Windows.
- Live (`jev-1.14.0`): 153 decisions and 153 labels written, every label linked to a decision, no case text in the file, about 0.4–0.6 ms per record, no change in decisions. A sample ledger is kept as a fixture in `evals/fixtures/ledger`.
- **Docs and tests:** a new docs-sync test requires every reason code a tool can return to be documented in the tool reference; the scope, triage and risk reason codes that were missing are now documented.
- The benchmark runner gains `--ledger-dir` (record and label from ground truth).

### Command effect classifier

- New deterministic classifier (`src/effects.ts`) for shell commands in bash, PowerShell and cmd syntax. `jev_scope`, `jev_tool_route` and `jev_step` now use the strictest of the host-declared effect and the effect the command text shows, so a mislabeled `read_only` command that deletes, force-pushes, publishes or pipes a download into a shell can no longer be `auto` when the judge approves it. The classifier only ever raises an effect; unrecognized programs add no information and anything unparseable is `unknown`. Parsed twice (POSIX and Windows rules) with the strictest result winning; wrappers, nested shells, script blocks, heredocs, substitutions and common obfuscations (`r""m`, `r\m`, `RM -RF`, `/bin/rm`) are handled.
- Additive output: `jev_scope` returns `effect: { declared, inferred, effective, matched }` and the reason `effect_upgraded`; `jev_tool_route` and `jev_step` return `effect_upgrades`. The judge's state is unchanged (it still sees the declared effect).
- Measured: on 720 generated lying commands, declared-only rules approved 720 and rules plus the classifier approved 0; on 480 honest commands neither raised any (0 false positives). Live Jev had already escalated all 30 lying commands in the live sample, so the classifier changed no live outcome there; it matters when the judge misses a lie or cannot run.

### Hardening

- **Loop detector no longer flags progress.** Failure counts that strictly shrink across attempts (9 → 5 → 2 failed) used to be reported as `same_failure` because every digit was masked. They are now recognized as progress (`loop.improving: true`, additive); changing counters with no failure count (`retry 3/5`) and stuck or growing counts are still loops. Offline, the previous detector flagged 240 of 240 generated shrinking trajectories and the new one flags 0, while still catching 240 of 240 counter loops.
- **`jev_triage` progress question** now tells Jev how to read counts and details: fewer failing tests or errors is `advancing`, more is `regressing`. Live (`jev-1.14.0`), shrinking-failure trajectories were explained as `progress_regressing` in 32 of 35 cases before and 0 of 60 after (36 on tuning seeds, 24 on never-tuned seeds); counter loops stay 60 of 60 not-`auto`.
- **Token budget reserves before it spends.** Each request reserves its estimated tokens, so concurrent calls can no longer all pass one check, and requests that reached the provider but returned no usage are charged at their reservation instead of being missed. `jev://stats` gains `budget.reserved`, `provider.failed_requests`, `provider.failed_estimated_tokens`. The request that crosses the budget may still overshoot by its own size.
- **Diagnosable response rejections.** `JevResponseError` carries a fixed `reason` (`not_json`, `probability_mass`, `choice_not_argmax`, …) counted in `jev://stats` as `provider.response_failures`. Tool results are unchanged and still carry only the generic message.
- **Gate state order** is now request, claims, evidence, then diff and tests (with `files`/`dependencies` before the diff in risk mode), so an oversized diff is truncated rather than the claims and evidence. This changes the response-cache key, so cached entries from before the upgrade are not reused. `jev_review`, `jev_gate` and `jev_screen` results are now validated against their output schemas like the other tools.
- **Benchmark:** `--extras N` adds opt-in templates with their own random stream (the recorded seeds are frozen and pinned by a hash test): shrinking-failure trajectories, scored as *diagnostic* cases on the explanation rather than the action, and counter loops. Reports include the server's final `provider` counters.

### Fixes

- `jev_verify` no longer softens a per-claim `escalate` to an overall `review`: the overall action is now the strictest per-claim action. Per-claim actions use the same verdict policy as `jev_gate`, so a confident contradiction escalates and is counted in `needs_review` instead of reporting `auto`. **Behavior change:** a confident `unsupported` verdict is now `review` per claim, not `auto`.
- `jev_screen` accepts a stricter per-call `block_at` below `0.25` by lowering `review_at` with it, instead of rejecting the call.
- A per-call `review_at` above the env `auto_accept` raises `auto_accept` with it instead of failing; an explicitly inverted caller pair is still rejected.
- `jev_tool_route` reports `thresholds.dispatch_at` like `jev_step`; `jev_coding_loop` rejects an empty `task`; mock mode validates each response once.
- Confidently contradicted claims in `jev_verify` and `jev_gate` escalate at `min(auto_accept, 0.8)`, like the v0.2 scope and risk concerns, so raising `auto_accept` never delays the escalation.
- Truncation below the marker length no longer emits a lone UTF-16 high surrogate.

### Value benchmark

- Added `npm run eval:bonus`: 51 labelled cases decided by no guard, a deterministic rules-only guard, and live Jev, plus measured cache and fused-gate experiments. The first live run (`jev-1.14.0`) is recorded in [evals/results](../evals/results/value-benchmark-2026-10-23.md): Jev blocked 29/29 risky cases against 7/29 for rules, with 0 unsafe auto-approvals and identical decisions across runs.
- Fixed defects the benchmark exposed. `jev_triage` gains a `first_attempt` progress option, so a first failure is no longer judged `repeating`; choosing it alongside supplied attempts or history adds `progress_inconsistent`. The `jev_risk` validation question no longer flags patches that add or tighten checks. Residual reviews now name their cause with `severity_uncertain` and `recoverability_uncertain` instead of `review_required`.

### Calibration from the randomized benchmark

- "Lower is better" scores (review test gap and blast radius, `jev_risk` severity) now need confidence in their accepted region (`P(level 2) ≤ 1 − auto_accept`) instead of confidence in one exact level. Correctness and spec match keep the exact-level rule; expected-score floors are unchanged. A confidently worst-level test gap or blast radius now escalates rather than asking for review.
- `jev_review` and the gate's `review` section gain `reason_codes`. `jev_risk` adds `concern_uncertain` for a flag that is neither a concern nor confidently absent.
- The default triage causes separate `runtime_exception` from `test_failure` (assertion mismatch) and `compile_or_type_error` (static). Existing IDs are kept.
- Live retest (`jev-1.14.0`): safe cases auto-approved rose from 60% to 84–85% on the same generated cases and from 73% to 82% on the hand-written set, and reached 90% on a fresh holdout seed. Risky cases stayed 100% blocked with 0 unsafe auto-approvals on every set. See [evals/results](../evals/results/value-benchmark-calibrated-2026-10-23.md).

### Test suite

- Added seeded property tests for every policy function (threshold monotonicity, never-auto conditions, distribution guards), a cross-tool invariant table (clean answers reach `auto`; truncation, flat distributions, injection text, malformed answers, and provider failures never do), and table-driven matrices for the provider boundary, question parsing, CLI arguments, configuration, reason codes, injection phrases, stats, cache, and limits. Branch coverage of `src/` rose from 87.8% to 94.7%.

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
- Moved the deterministic injection backstop into shared `untrusted.ts` and applied it to the new tools' untrusted state. Added document-safe sanitization that preserves newlines for logs/diffs. The shared backstop deletes invisible characters (zero-width, soft hyphen, bidi, word joiners, BOM) before matching, as the screen-local version did, so a hidden character inside a word cannot split a phrase; it also matches common determiners ("ignore your/any previous instructions").
- Policy hardening before release: every critical `jev_risk` flag and the severity score are checked for escalation before any review result, so a moderate concern cannot mask a confident one; judged concerns (scope `needs_confirmation`, critical risk flags) escalate at `min(auto_accept, 0.8)`, so raising `auto_accept` never delays an escalation; `jev_triage` decides every escalation before any review-band result; host cause IDs are sanitized before reaching the judge, and attempt/history actions and cause descriptions are screened for injection.
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
