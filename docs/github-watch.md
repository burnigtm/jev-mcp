# Jev_MCP GitHub watch

**Latest pull request:** [#13 Guardrail hardening: policy fixes, cache/budget/stats, risk-aware gate, loop detector](https://github.com/burnigtm/jev-mcp/pull/13) — **open** 2026-10-23T18:55:03Z · just now · burnigtm · `feat/v0.3-guardrail-hardening` → `main` · +2237 −346 · 34 files.

Open **1** · Merged **11** · Closed **0** · [Interactive board](github-watch.html)

This is the **Cursor Project dashboard** for [burnigtm/jev-mcp](https://github.com/burnigtm/jev-mcp). Open **Projects → Jev_MCP** (not the Agents list). The latest pull request stays at the top even when the list is long. GitHub Actions refreshes this file on branch `cursor-watch`.

| | |
| --- | --- |
| **Last refresh** | 2026-10-23T18:55:20Z |
| **Data** | GitHub API |
| **Last GitHub event** | `pull_request_target` `synchronize` |
| **Open PRs** | [#13](https://github.com/burnigtm/jev-mcp/pull/13) Guardrail hardening: policy fixes, cache/budget/stats, risk-aware gate, loop detector |
| **Merged (recent)** | [#12](https://github.com/burnigtm/jev-mcp/pull/12) feat: add scope, triage, and security risk tools, [#11](https://github.com/burnigtm/jev-mcp/pull/11) security: harden untrusted-data handling and helper boundaries, [#10](https://github.com/burnigtm/jev-mcp/pull/10) Package portable Jev skill and add real-agent evaluations, [#8](https://github.com/burnigtm/jev-mcp/pull/8) Pin the newest pull request on the watch board, [#7](https://github.com/burnigtm/jev-mcp/pull/7) Fix jev-mcp audit findings |
| **GitHub `main`** | [`1a58500`](https://github.com/burnigtm/jev-mcp/commit/1a5850012b08276199f0f13b848a2278726dd93d) |
| **Cursor target** | `bc-c78e565c-bc13-4d27-ada8-cc5e7e04eb9e` |

## Latest

<details open>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/13">#13 Guardrail hardening: policy fixes, cache/budget/stats, risk-aware gate, loop detector — OPEN</a></summary>
<table>
<tr><td><strong>State</strong></td><td>OPEN</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/v0.3-guardrail-hardening → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-23T18:55:03Z · just now</td></tr>
<tr><td><strong>Merged</strong></td><td>not merged</td></tr>
<tr><td><strong>Diff</strong></td><td>+2237 −346 · 34 files</td></tr>
<tr><td><strong>Commits</strong></td><td>3</td></tr>
<tr><td><strong>Checks</strong></td><td>5 still running · 6 checks</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/1a5850012b08276199f0f13b848a2278726dd93d"><code>1a58500</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/9c5255a5d7a10e9c952c9dfdaeb992da735cffad"><code>9c5255a</code></a></td></tr>
</table>
<p><strong>Commits</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/75e9a5fb29cafbc25ab4a59b0e40fd98f96f71ae"><code>75e9a5f</code></a> feat: guardrail hardening, cache/budget/stats, risk-aware gate, loop detector</li>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/813ac523467a69d9eb484a2364a84f2bc06712ab"><code>813ac52</code></a> Merge feat/v0.2-agent-guardrails into feat/v0.3-guardrail-hardening</li>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/1a5850012b08276199f0f13b848a2278726dd93d"><code>1a58500</code></a> test: allow 30s for the notify script&#x27;s cold python3 start</li>
</ul>
<p><strong>Files</strong></p><ul>
<li><code>.env.example</code> modified +3 −0</li>
<li><code>README.md</code> modified +2 −0</li>
<li><code>docs/changelog.md</code> modified +30 −0</li>
<li><code>docs/configuration.md</code> modified +11 −2</li>
<li><code>skills/jev-mcp/references/tools.md</code> modified +16 −10</li>
<li><code>src/cache.ts</code> added +46 −0</li>
<li><code>src/config.ts</code> modified +23 −0</li>
<li><code>src/errors.ts</code> modified +8 −0</li>
<li><code>src/limits.ts</code> modified +7 −5</li>
<li><code>src/packs/gate.ts</code> modified +9 −2</li>
<li><code>src/packs/index.ts</code> modified +2 −0</li>
<li><code>src/policy.ts</code> modified +8 −2</li>
<li>22 more files on the pull request</li>
</ul>
<p><strong>Checks</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40007229849/job/120598115675">notify</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40007229849/job/120598115313">publish</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40007229655/job/120598112824">check (ubuntu-latest, 20)</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40007229655/job/120598112689">check (ubuntu-latest, 22)</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40007229655/job/120598112661">check (windows-latest, 20)</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40007229655/job/120598112342">check (windows-latest, 22)</a> <code>in_progress</code></li>
</ul>
<p><strong>Description</strong></p><p>Follows #12 (v0.2 scope/triage/risk tools). The policy fixes for defects that #12 itself introduced were moved onto #12 before it merged: the risk-flag masking, the escalation cutoff for scope and risk, triage escalation order, the injection-backstop regression and triage cause-ID sanitization. This branch already includes that work through a merge commit. What remains here is the hardening of pre-existing code, the new features, and the test suite. ## Summary - **Policy fixes:** several cases…</p>
</details>


## Open

No open pull requests.


## Merged

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/12">#12 feat: add scope, triage, and security risk tools — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/v0.2-agent-guardrails → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-23T18:50:25Z · 4m ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-23T18:50:24Z · 4m ago</td></tr>
<tr><td><strong>Diff</strong></td><td>+1562 −38 · 33 files</td></tr>
<tr><td><strong>Commits</strong></td><td>2</td></tr>
<tr><td><strong>Checks</strong></td><td>no checks reported</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/b0eacb043d97c9bd34140c807e9e88fec619430a"><code>b0eacb0</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/8bcb92ad6b87b7759a6ab97c484f874dcd16d385"><code>8bcb92a</code></a></td></tr>
</table>
<p><strong>Description</strong></p><p>## Summary This PR extends `jev-mcp` from the core coding loop into three adjacent decision boundaries: 1. **`jev_scope`** - semantic preflight for a host-prepared action. 2. **`jev_triage`** - failure cause, loop progress, and recovery strategy. 3. **`jev_risk`** - security-focused patch risk triage. The existing nine tools and their policies are unchanged. The server now exposes **12 tools, 11 question packs, and 6 MCP prompts**, and the package version is **0.2.0**. The design stays within t…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/11">#11 security: harden untrusted-data handling and helper boundaries — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>security/harden-untrusted-data → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-17T12:36:15Z · 6d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-17T12:36:15Z · 6d ago</td></tr>
<tr><td><strong>Diff</strong></td><td>+1101 −188 · 64 files</td></tr>
<tr><td><strong>Commits</strong></td><td>2</td></tr>
<tr><td><strong>Checks</strong></td><td>no checks reported</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/e0ff6e38121cc817b419dba14ce0ecfc717612f5"><code>e0ff6e3</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/6eccb5234823a9f58d9a7cab95bf71b04df00c91"><code>6eccb52</code></a></td></tr>
</table>
<p><strong>Description</strong></p><p>## Summary This PR hardens the boundaries where `jev-mcp` handles third-party text, host-prepared tool metadata, provider credentials, and agent evaluation code. It also fixes several correctness defects found during the audit. The checkout already contained a pending remediation batch; this branch builds on it and turns the whole set into one reviewed change. No live provider calls or publishing were performed. ## Security findings addressed ### 1. Prompt injection against the screening and ve…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/10">#10 Package portable Jev skill and add real-agent evaluations — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>codex/portable-skill-evals → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-15T16:51:22Z · 8d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-15T16:51:22Z · 8d ago</td></tr>
<tr><td><strong>Diff</strong></td><td>+5765 −368 · 50 files</td></tr>
<tr><td><strong>Commits</strong></td><td>2</td></tr>
<tr><td><strong>Checks</strong></td><td>no checks reported</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/fd34701e155b6c230cbace411df623880405b131"><code>fd34701</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/571f464565a1319abe52cb95120b37174ee53aba"><code>571f464</code></a></td></tr>
</table>
<p><strong>Description</strong></p><p>## Problem and behavior The Jev companion skill depended on repository documentation and had no reproducible standalone package or real-agent evaluation path. This change makes the complete skill independently installable at `.agents/skills/jev-mcp` and adds bounded evaluations of the combined skill + live MCP workflow in Codex and the official Cursor CLI. ## Changes - Move canonical contracts into the skill&#x27;s contained references, preserve the previous documentation URL, and provide schema-che…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/8">#8 Pin the newest pull request on the watch board — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>cursor/interactive-pr-watch-518e → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-09-21T17:59:12Z · 32d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-21T17:59:12Z · 32d ago</td></tr>
<tr><td><strong>Diff</strong></td><td>+1118 −133 · 6 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>no checks reported</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/48336346cd3fb5eb965561265e0bf3d059ec5f0f"><code>4833634</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/9448f6120015f2f6c6dad7137c7f234545209918"><code>9448f61</code></a></td></tr>
</table>
<p><strong>Description</strong></p><p>## Summary - The GitHub watch board always leads with the highest-numbered pull request, so the latest one stays visible. - Each pull request shows author, branches, diff size, checks, reviews, commits, and files. - A failed GitHub read keeps the last saved list and says the live list is unavailable, instead of blanking the page or pretending the list is empty. - `docs/github-watch.html` adds search and open/merged/closed filters. Filtering does not hide the newest pull request. - Notify asks t…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/7">#7 Fix jev-mcp audit findings — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>cursor/jev-audit-fixes-ops → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-09-21T17:37:31Z · 32d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-21T17:37:31Z · 32d ago</td></tr>
<tr><td><strong>Diff</strong></td><td>+969 −151 · 35 files</td></tr>
<tr><td><strong>Commits</strong></td><td>4</td></tr>
<tr><td><strong>Checks</strong></td><td>no checks reported</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/b92f9a01f24180281239166c5554849051c8ae71"><code>b92f9a0</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/7cafc402cbd776cae55902415d84482971df17d4"><code>7cafc40</code></a></td></tr>
</table>
<p><strong>Description</strong></p><p>## Summary - GitHub notify no longer runs pull-request head code, and it pins the API host. - `jev_step` ignores the host `prepared_tool_call` flag, and empty candidate lists are not treated as auto. - Review and gate require per-dimension floors. - Rank auto needs a final-round exists result plus a coherent best. - TypeSafe timeout and base URL are bounded. - Per-call floors can only tighten. - The benchmark does not inherit `GITHUB_TOKEN`. - Dashboard titles are escaped. Mock tests passed (15…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/6">#6 test: add MCP performance benchmark suite — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>codex/pr2-routing-followup → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-09-19T11:22:46Z · 34d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-19T11:22:44Z · 34d ago</td></tr>
<tr><td><strong>Diff</strong></td><td>+296 −1 · 7 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>no checks reported</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/26144ab50360f550514141b733fcbadf0ab47a26"><code>26144ab</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/4f4ae11a5e1e9a502cdc432550d878f728851820"><code>4f4ae11</code></a></td></tr>
</table>
<p><strong>Description</strong></p><p>## Summary - Add an opt-in benchmark for the compiled MCP stdio transport. - Measure all nine tools with sequential, concurrent, startup, latency, throughput, payload-size, and candidate-count scenarios. - Add deterministic mock-mode CI sanity budgets and JSON output for automation. - Add benchmark helper tests, documentation, and a scheduled/manual GitHub Actions workflow across Ubuntu/Windows and Node 20/22. ## Validation - npm run typecheck - npm run benchmark:ci - Direct ESM assertions for…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/5">#5 Harden routing and expose typed MCP outputs — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>codex/pr2-routing-followup → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-09-19T09:13:36Z · 34d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-19T09:12:30Z · 34d ago</td></tr>
<tr><td><strong>Diff</strong></td><td>+449 −70 · 26 files</td></tr>
<tr><td><strong>Commits</strong></td><td>5</td></tr>
<tr><td><strong>Checks</strong></td><td>no checks reported</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/1be6e7529fd9ddfab15c9824fb78b21c871d752d"><code>1be6e75</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/5d5fb6b3b14990d47219bdb8700172b3410e458a"><code>5d5fb6b</code></a></td></tr>
</table>
<p><strong>Description</strong></p><p>## Summary Harden Jev routing and MCP interoperability while preserving the GitHub event-delivery workflow. ## Changes - Require probability distributions to support reported confidence before any automatic policy decision. - Apply the coherence guard to evaluate, coding-loop, review, verify, and gate paths. - Add typed MCP output schemas and structuredContent parity for all nine tools, including the fused step router. - Redact tool-route argument values from upstream judgment state while prese…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/4">#4 Add jev_step: one request for the coding-loop turn and the prepared-call selection — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>cursor/fused-jev-step-router-bde8 → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-09-18T18:37:36Z · 35d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-18T18:37:36Z · 35d ago</td></tr>
<tr><td><strong>Diff</strong></td><td>+858 −92 · 19 files</td></tr>
<tr><td><strong>Commits</strong></td><td>2</td></tr>
<tr><td><strong>Checks</strong></td><td>no checks reported</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/05325ae8285bcb32d27864c411a3133f7d656902"><code>05325ae</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/dd2e639f74db940c6aee994fe6db5bd21d1ec6ee"><code>dd2e639</code></a></td></tr>
</table>
<p><strong>Description</strong></p><p>## What Adds `jev_step`, a ninth MCP tool that answers the coding-loop and prepared-call recipes in **one** Jev request. Today a loop iteration costs two MCP round-trips: `jev_coding_loop` returns `handoff: use_tools`, then the host calls `jev_tool_route` to learn *which* prepared call to run. Each round-trip spends a host-model turn to issue the call and interpret the JSON. TypeSafe evaluates every question in a request in parallel and in isolation, so both answers can come from a single reque…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/3">#3 Fix routing confidence gaps and probability boundaries from PR #2 — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>codex/pr2-routing-followup → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-09-18T17:19:27Z · 35d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-18T17:19:27Z · 35d ago</td></tr>
<tr><td><strong>Diff</strong></td><td>+125 −8 · 8 files</td></tr>
<tr><td><strong>Commits</strong></td><td>2</td></tr>
<tr><td><strong>Checks</strong></td><td>no checks reported</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/31aa49a9e999349ad01573dc65a0f3a1d4c84f20"><code>31aa49a</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/472e532a8478ee360f0e9adcafd6956c2ce146bc"><code>472e532</code></a></td></tr>
</table>
<p><strong>Description</strong></p><p>PR #2 is merged and its existing checks passed, but review reproduced two routing gaps: - A provider can report high confidence alongside a tied or weak probability distribution. The prepared-call router could still return `execute_tool`, and the coding loop could request a partner. Both now require an independent distribution-concentration check in addition to the existing confidence floor. This is a conservative local policy guard; reported provider fields remain unchanged. It may send more b…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/2">#2 Harden Jev reliability and completion gates — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>codex/reliability-and-completion-gate → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-09-18T16:39:12Z · 35d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-18T16:39:12Z · 35d ago</td></tr>
<tr><td><strong>Diff</strong></td><td>+1128 −37 · 17 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>no checks reported</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/baf29479adf4413e9fc527d68ea0360657a29b2a"><code>baf2947</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/2f9edcdb164c7aaa969d03bf77d33aae36be30e8"><code>2f9edcd</code></a></td></tr>
</table>
<p><strong>Description</strong></p><p>## Summary - Add typed routing, policy, limits, screening, ranking, review, verification, and coding-loop safeguards - Expand packs, mock support, configuration, CLI behavior, documentation, and CI coverage - Add comprehensive unit, integration, installer, transport, and live end-to-end tests ## Testing - Comprehensive test suite covering CLI, runtime, MCP transport, policy, limits, tools, packs, and installation - CI workflow and live end-to-end validation configured</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/1">#1 Harden Jev reliability and add a combined completion gate — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>codex/reliability-and-completion-gate → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-09-18T03:51:39Z · 35d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-18T03:51:39Z · 35d ago</td></tr>
<tr><td><strong>Diff</strong></td><td>+2047 −462 · 45 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>no checks reported</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/26fdcd231d7c55c25d3de0bcebb16ac5890b3eb1"><code>26fdcd2</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/c619e101296ac08875c5f4cef772e3dd2cd6638f"><code>c619e10</code></a></td></tr>
</table>
<p><strong>Description</strong></p><p>## Summary Large or truncated inputs could previously produce automatic decisions without complete context, ranking could lose candidate identity or exceed request limits, and upstream failures were not consistently bounded or validated. This change makes those cases explicit and adds a combined completion gate. - Add `jev_gate` and its question-pack resource to review a diff and verify completion claims in one upstream request. Approval requires complete context, accepted review, and confident…</p>
</details>


## Closed

None.


## Activity

[PR #13](https://github.com/burnigtm/jev-mcp/pull/13) Guardrail hardening: policy fixes, cache/budget/stats, risk-aware gate, loop detector

- Event: `pull_request_target` `synchronize`
- Ref: `main` SHA [`1a58500`](https://github.com/burnigtm/jev-mcp/commit/1a5850012b08276199f0f13b848a2278726dd93d)

Search, filters, checks, commits, and files are on the interactive board next to this file. Follow-ups land in the **Jev_MCP Project** chat.

Live Actions: [Notify Jev_MCP](https://github.com/burnigtm/jev-mcp/actions/workflows/notify-jev-mcp.yml).

<!-- jev-watch:snapshot eyJwdWxscyI6W3sibnVtYmVyIjoxMywidGl0bGUiOiJHdWFyZHJhaWwgaGFyZGVuaW5nOiBwb2xpY3kgZml4ZXMsIGNhY2hlL2J1ZGdldC9zdGF0cywgcmlzay1hd2FyZSBnYXRlLCBsb29wIGRldGVjdG9yIiwic3RhdGUiOiJPUEVOIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xMyIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L3YwLjMtZ3VhcmRyYWlsLWhhcmRlbmluZyIsImJhc2UiOiJtYWluIiwic2hhIjoiMWE1ODUwMDEyYjA4Mjc2MTk5ZjBmMTNiODQ4YTIyNzg3MjZkZDkzZCIsIm1lcmdlX2NvbW1pdF9zaGEiOiI5YzUyNTVhNWQ3YTEwZTljOTUyYzlkZmRhZWI5OTJkYTczNWNmZmFkIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yM1QxODo0MjoyMloiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yM1QxODo1NTowM1oiLCJtZXJnZWRfYXQiOiIiLCJjbG9zZWRfYXQiOiIiLCJhZGRpdGlvbnMiOjIyMzcsImRlbGV0aW9ucyI6MzQ2LCJjaGFuZ2VkX2ZpbGVzIjozNCwiY29tbWl0c19jb3VudCI6MywiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IkZvbGxvd3MgIzEyICh2MC4yIHNjb3BlL3RyaWFnZS9yaXNrIHRvb2xzKS4gVGhlIHBvbGljeSBmaXhlcyBmb3IgZGVmZWN0cyB0aGF0ICMxMiBpdHNlbGYgaW50cm9kdWNlZCB3ZXJlIG1vdmVkIG9udG8gIzEyIGJlZm9yZSBpdCBtZXJnZWQ6IHRoZSByaXNrLWZsYWcgbWFza2luZywgdGhlIGVzY2FsYXRpb24gY3V0b2ZmIGZvciBzY29wZSBhbmQgcmlzaywgdHJpYWdlIGVzY2FsYXRpb24gb3JkZXIsIHRoZSBpbmplY3Rpb24tYmFja3N0b3AgcmVncmVzc2lvbiBhbmQgdHJpYWdlIGNhdXNlLUlEIHNhbml0aXphdGlvbi4gVGhpcyBicmFuY2ggYWxyZWFkeSBpbmNsdWRlcyB0aGF0IHdvcmsgdGhyb3VnaCBhIG1lcmdlIGNvbW1pdC4gV2hhdCByZW1haW5zIGhlcmUgaXMgdGhlIGhhcmRlbmluZyBvZiBwclx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbeyJzaGEiOiI3NWU5YTVmYjI5Y2FmYmMyNWFiNGE1OWIwZTQwZmQ5OGY5NmY3MWFlIiwibWVzc2FnZSI6ImZlYXQ6IGd1YXJkcmFpbCBoYXJkZW5pbmcsIGNhY2hlL2J1ZGdldC9zdGF0cywgcmlzay1hd2FyZSBnYXRlLCBsb29wIGRldGVjdG9yIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvY29tbWl0Lzc1ZTlhNWZiMjljYWZiYzI1YWI0YTU5YjBlNDBmZDk4Zjk2ZjcxYWUifSx7InNoYSI6IjgxM2FjNTIzNDY3YTY5ZDllYjQ4NGEyMzY0YTg0ZjJiYzA2NzEyYWIiLCJtZXNzYWdlIjoiTWVyZ2UgZmVhdC92MC4yLWFnZW50LWd1YXJkcmFpbHMgaW50byBmZWF0L3YwLjMtZ3VhcmRyYWlsLWhhcmRlbmluZyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2NvbW1pdC84MTNhYzUyMzQ2N2E2OWQ5ZWI0ODRhMjM2NGE4NGYyYmMwNjcxMmFiIn0seyJzaGEiOiIxYTU4NTAwMTJiMDgyNzYxOTlmMGYxM2I4NDhhMjI3ODcyNmRkOTNkIiwibWVzc2FnZSI6InRlc3Q6IGFsbG93IDMwcyBmb3IgdGhlIG5vdGlmeSBzY3JpcHQncyBjb2xkIHB5dGhvbjMgc3RhcnQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9jb21taXQvMWE1ODUwMDEyYjA4Mjc2MTk5ZjBmMTNiODQ4YTIyNzg3MjZkZDkzZCJ9XSwiZmlsZXMiOlt7ImZpbGVuYW1lIjoiLmVudi5leGFtcGxlIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjMsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6IlJFQURNRS5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoyLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NoYW5nZWxvZy5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjozMCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jb25maWd1cmF0aW9uLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjExLCJkZWxldGlvbnMiOjJ9LHsiZmlsZW5hbWUiOiJza2lsbHMvamV2LW1jcC9yZWZlcmVuY2VzL3Rvb2xzLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjE2LCJkZWxldGlvbnMiOjEwfSx7ImZpbGVuYW1lIjoic3JjL2NhY2hlLnRzIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjQ2LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzcmMvY29uZmlnLnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjIzLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzcmMvZXJyb3JzLnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjgsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNyYy9saW1pdHMudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NywiZGVsZXRpb25zIjo1fSx7ImZpbGVuYW1lIjoic3JjL3BhY2tzL2dhdGUudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6OSwiZGVsZXRpb25zIjoyfSx7ImZpbGVuYW1lIjoic3JjL3BhY2tzL2luZGV4LnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjIsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNyYy9wb2xpY3kudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6OCwiZGVsZXRpb25zIjoyfV0sImNoZWNrcyI6W3sibmFtZSI6Im5vdGlmeSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDAwNzIyOTg0OS9qb2IvMTIwNTk4MTE1Njc1In0seyJuYW1lIjoicHVibGlzaCIsInN0YXRlIjoiaW5fcHJvZ3Jlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwMDcyMjk4NDkvam9iLzEyMDU5ODExNTMxMyJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6ImluX3Byb2dyZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDA3MjI5NjU1L2pvYi8xMjA1OTgxMTI4MjQifSx7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjIpIiwic3RhdGUiOiJpbl9wcm9ncmVzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDAwNzIyOTY1NS9qb2IvMTIwNTk4MTEyNjg5In0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6ImluX3Byb2dyZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDA3MjI5NjU1L2pvYi8xMjA1OTgxMTI2NjEifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIyKSIsInN0YXRlIjoiaW5fcHJvZ3Jlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwMDcyMjk2NTUvam9iLzEyMDU5ODExMjM0MiJ9XX0seyJudW1iZXIiOjEyLCJ0aXRsZSI6ImZlYXQ6IGFkZCBzY29wZSwgdHJpYWdlLCBhbmQgc2VjdXJpdHkgcmlzayB0b29scyIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xMiIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L3YwLjItYWdlbnQtZ3VhcmRyYWlscyIsImJhc2UiOiJtYWluIiwic2hhIjoiYjBlYWNiMDQzZDk3YzliZDM0MTQwYzgwN2U5ZTg4ZmVjNjE5NDMwYSIsIm1lcmdlX2NvbW1pdF9zaGEiOiI4YmNiOTJhZDZiODdiNzc1OWE2YWI5N2M0ODRmODc0ZGNkMTZkMzg1IiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0xN1QxMzowNDowMVoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yM1QxODo1MDoyNVoiLCJtZXJnZWRfYXQiOiIyMDI2LTEwLTIzVDE4OjUwOjI0WiIsImNsb3NlZF9hdCI6IjIwMjYtMTAtMjNUMTg6NTA6MjRaIiwiYWRkaXRpb25zIjoxNTYyLCJkZWxldGlvbnMiOjM4LCJjaGFuZ2VkX2ZpbGVzIjozMywiY29tbWl0c19jb3VudCI6MiwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgVGhpcyBQUiBleHRlbmRzIGBqZXYtbWNwYCBmcm9tIHRoZSBjb3JlIGNvZGluZyBsb29wIGludG8gdGhyZWUgYWRqYWNlbnQgZGVjaXNpb24gYm91bmRhcmllczogMS4gKipgamV2X3Njb3BlYCoqIC0gc2VtYW50aWMgcHJlZmxpZ2h0IGZvciBhIGhvc3QtcHJlcGFyZWQgYWN0aW9uLiAyLiAqKmBqZXZfdHJpYWdlYCoqIC0gZmFpbHVyZSBjYXVzZSwgbG9vcCBwcm9ncmVzcywgYW5kIHJlY292ZXJ5IHN0cmF0ZWd5LiAzLiAqKmBqZXZfcmlza2AqKiAtIHNlY3VyaXR5LWZvY3VzZWQgcGF0Y2ggcmlzayB0cmlhZ2UuIFRoZSBleGlzdGluZyBuaW5lIHRvb2xzIGFuZCB0aGVpciBwb2xpY2llcyBhcmUgdW5jaGFuZ2VkLiBUaGUgc2VydmVyIG5vdyBleHBvc2VzICoqMTIgdG9vbHMsIDExXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoxMSwidGl0bGUiOiJzZWN1cml0eTogaGFyZGVuIHVudHJ1c3RlZC1kYXRhIGhhbmRsaW5nIGFuZCBoZWxwZXIgYm91bmRhcmllcyIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xMSIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJzZWN1cml0eS9oYXJkZW4tdW50cnVzdGVkLWRhdGEiLCJiYXNlIjoibWFpbiIsInNoYSI6ImUwZmY2ZTM4MTIxY2M4MTdiNDE5ZGJhMTRjZTBlY2ZjNzE3NjEyZjUiLCJtZXJnZV9jb21taXRfc2hhIjoiNmVjY2I1MjM0ODIzYTlmNThkOWE3Y2FiOTViZjcxYjA0ZGYwMGM5MSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMTdUMTI6MTQ6MzRaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMTdUMTI6MzY6MTVaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0xN1QxMjozNjoxNVoiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTE3VDEyOjM2OjE1WiIsImFkZGl0aW9ucyI6MTEwMSwiZGVsZXRpb25zIjoxODgsImNoYW5nZWRfZmlsZXMiOjY0LCJjb21taXRzX2NvdW50IjoyLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBUaGlzIFBSIGhhcmRlbnMgdGhlIGJvdW5kYXJpZXMgd2hlcmUgYGpldi1tY3BgIGhhbmRsZXMgdGhpcmQtcGFydHkgdGV4dCwgaG9zdC1wcmVwYXJlZCB0b29sIG1ldGFkYXRhLCBwcm92aWRlciBjcmVkZW50aWFscywgYW5kIGFnZW50IGV2YWx1YXRpb24gY29kZS4gSXQgYWxzbyBmaXhlcyBzZXZlcmFsIGNvcnJlY3RuZXNzIGRlZmVjdHMgZm91bmQgZHVyaW5nIHRoZSBhdWRpdC4gVGhlIGNoZWNrb3V0IGFscmVhZHkgY29udGFpbmVkIGEgcGVuZGluZyByZW1lZGlhdGlvbiBiYXRjaDsgdGhpcyBicmFuY2ggYnVpbGRzIG9uIGl0IGFuZCB0dXJucyB0aGUgd2hvbGUgc2V0IGludG8gb25lIHJldmlld2VkIGNoYW5nZS4gTm8gbGl2ZSBwcm92aWRlciBjYWxscyBvciBwdWJsaXNoaW5nXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoxMCwidGl0bGUiOiJQYWNrYWdlIHBvcnRhYmxlIEpldiBza2lsbCBhbmQgYWRkIHJlYWwtYWdlbnQgZXZhbHVhdGlvbnMiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTAiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiY29kZXgvcG9ydGFibGUtc2tpbGwtZXZhbHMiLCJiYXNlIjoibWFpbiIsInNoYSI6ImZkMzQ3MDFlMTU1YjZjMjMwY2JhY2U0MTFkZjYyMzg4MDQwNWIxMzEiLCJtZXJnZV9jb21taXRfc2hhIjoiNTcxZjQ2NDU2NWExMzE5YWJlNTJjYjk1MTIwYjM3MTc0ZWU1M2FiYSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMTVUMTY6NDQ6NDZaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMTVUMTY6NTE6MjJaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0xNVQxNjo1MToyMloiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTE1VDE2OjUxOjIyWiIsImFkZGl0aW9ucyI6NTc2NSwiZGVsZXRpb25zIjozNjgsImNoYW5nZWRfZmlsZXMiOjUwLCJjb21taXRzX2NvdW50IjoyLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgUHJvYmxlbSBhbmQgYmVoYXZpb3IgVGhlIEpldiBjb21wYW5pb24gc2tpbGwgZGVwZW5kZWQgb24gcmVwb3NpdG9yeSBkb2N1bWVudGF0aW9uIGFuZCBoYWQgbm8gcmVwcm9kdWNpYmxlIHN0YW5kYWxvbmUgcGFja2FnZSBvciByZWFsLWFnZW50IGV2YWx1YXRpb24gcGF0aC4gVGhpcyBjaGFuZ2UgbWFrZXMgdGhlIGNvbXBsZXRlIHNraWxsIGluZGVwZW5kZW50bHkgaW5zdGFsbGFibGUgYXQgYC5hZ2VudHMvc2tpbGxzL2pldi1tY3BgIGFuZCBhZGRzIGJvdW5kZWQgZXZhbHVhdGlvbnMgb2YgdGhlIGNvbWJpbmVkIHNraWxsICsgbGl2ZSBNQ1Agd29ya2Zsb3cgaW4gQ29kZXggYW5kIHRoZSBvZmZpY2lhbCBDdXJzb3IgQ0xJLiAjIyBDaGFuZ2VzIC0gTW92ZSBjYW5vbmljYWwgY29udHJhY3RzIGluXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjo4LCJ0aXRsZSI6IlBpbiB0aGUgbmV3ZXN0IHB1bGwgcmVxdWVzdCBvbiB0aGUgd2F0Y2ggYm9hcmQiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvOCIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJjdXJzb3IvaW50ZXJhY3RpdmUtcHItd2F0Y2gtNTE4ZSIsImJhc2UiOiJtYWluIiwic2hhIjoiNDgzMzYzNDZjZDNmYjVlYjk2NTU2MTI2NWUwYmYzZDA1OWVjNWYwZiIsIm1lcmdlX2NvbW1pdF9zaGEiOiI5NDQ4ZjYxMjAwMTVmMmY2YzZkYWQ3MTM3YzdmMjM0NTQ1MjA5OTE4IiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0wOS0yMVQxNzo1OTowNloiLCJ1cGRhdGVkX2F0IjoiMjAyNi0wOS0yMVQxNzo1OToxMloiLCJtZXJnZWRfYXQiOiIyMDI2LTA5LTIxVDE3OjU5OjEyWiIsImNsb3NlZF9hdCI6IjIwMjYtMDktMjFUMTc6NTk6MTJaIiwiYWRkaXRpb25zIjoxMTE4LCJkZWxldGlvbnMiOjEzMywiY2hhbmdlZF9maWxlcyI6NiwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgLSBUaGUgR2l0SHViIHdhdGNoIGJvYXJkIGFsd2F5cyBsZWFkcyB3aXRoIHRoZSBoaWdoZXN0LW51bWJlcmVkIHB1bGwgcmVxdWVzdCwgc28gdGhlIGxhdGVzdCBvbmUgc3RheXMgdmlzaWJsZS4gLSBFYWNoIHB1bGwgcmVxdWVzdCBzaG93cyBhdXRob3IsIGJyYW5jaGVzLCBkaWZmIHNpemUsIGNoZWNrcywgcmV2aWV3cywgY29tbWl0cywgYW5kIGZpbGVzLiAtIEEgZmFpbGVkIEdpdEh1YiByZWFkIGtlZXBzIHRoZSBsYXN0IHNhdmVkIGxpc3QgYW5kIHNheXMgdGhlIGxpdmUgbGlzdCBpcyB1bmF2YWlsYWJsZSwgaW5zdGVhZCBvZiBibGFua2luZyB0aGUgcGFnZSBvciBwcmV0ZW5kaW5nIHRoZSBsaXN0IGlzIGVtcHR5LiAtIGBkb2NzL2dpdGh1Yi13YXRjaC5odG1sYCBhZGRzIHNlYVx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6NywidGl0bGUiOiJGaXggamV2LW1jcCBhdWRpdCBmaW5kaW5ncyIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC83IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImN1cnNvci9qZXYtYXVkaXQtZml4ZXMtb3BzIiwiYmFzZSI6Im1haW4iLCJzaGEiOiJiOTJmOWEwMWYyNDE4MDI4MTIzOTE2NmM1NTU0ODQ5MDUxYzhhZTcxIiwibWVyZ2VfY29tbWl0X3NoYSI6IjdjYWZjNDAyY2JkNzc2Y2FlNTU5MDI0MTVkODQ0ODI5NzFkZjE3ZDQiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTA5LTIxVDE3OjM3OjI1WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTA5LTIxVDE3OjM3OjMxWiIsIm1lcmdlZF9hdCI6IjIwMjYtMDktMjFUMTc6Mzc6MzFaIiwiY2xvc2VkX2F0IjoiMjAyNi0wOS0yMVQxNzozNzozMVoiLCJhZGRpdGlvbnMiOjk2OSwiZGVsZXRpb25zIjoxNTEsImNoYW5nZWRfZmlsZXMiOjM1LCJjb21taXRzX2NvdW50Ijo0LCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSAtIEdpdEh1YiBub3RpZnkgbm8gbG9uZ2VyIHJ1bnMgcHVsbC1yZXF1ZXN0IGhlYWQgY29kZSwgYW5kIGl0IHBpbnMgdGhlIEFQSSBob3N0LiAtIGBqZXZfc3RlcGAgaWdub3JlcyB0aGUgaG9zdCBgcHJlcGFyZWRfdG9vbF9jYWxsYCBmbGFnLCBhbmQgZW1wdHkgY2FuZGlkYXRlIGxpc3RzIGFyZSBub3QgdHJlYXRlZCBhcyBhdXRvLiAtIFJldmlldyBhbmQgZ2F0ZSByZXF1aXJlIHBlci1kaW1lbnNpb24gZmxvb3JzLiAtIFJhbmsgYXV0byBuZWVkcyBhIGZpbmFsLXJvdW5kIGV4aXN0cyByZXN1bHQgcGx1cyBhIGNvaGVyZW50IGJlc3QuIC0gVHlwZVNhZmUgdGltZW91dCBhbmQgYmFzZSBVUkwgYXJlIGJvdW5kZWQuIC0gUGVyLWNhbGwgZmxvb3JzIGNhbiBvbmx5IHRpZ2h0ZW4uIC1cdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjYsInRpdGxlIjoidGVzdDogYWRkIE1DUCBwZXJmb3JtYW5jZSBiZW5jaG1hcmsgc3VpdGUiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvNiIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJjb2RleC9wcjItcm91dGluZy1mb2xsb3d1cCIsImJhc2UiOiJtYWluIiwic2hhIjoiMjYxNDRhYjUwMzYwZjU1MDUxNDE0MWI3MzNmY2JhZGYwYWI0N2EyNiIsIm1lcmdlX2NvbW1pdF9zaGEiOiI0ZjRhZTExYTVlMWU5YTUwMmNkYzQzMjU1MGQ4NzhmNzI4ODUxODIwIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0wOS0xOVQxMDozMjozNloiLCJ1cGRhdGVkX2F0IjoiMjAyNi0wOS0xOVQxMToyMjo0NloiLCJtZXJnZWRfYXQiOiIyMDI2LTA5LTE5VDExOjIyOjQ0WiIsImNsb3NlZF9hdCI6IjIwMjYtMDktMTlUMTE6MjI6NDRaIiwiYWRkaXRpb25zIjoyOTYsImRlbGV0aW9ucyI6MSwiY2hhbmdlZF9maWxlcyI6NywiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgLSBBZGQgYW4gb3B0LWluIGJlbmNobWFyayBmb3IgdGhlIGNvbXBpbGVkIE1DUCBzdGRpbyB0cmFuc3BvcnQuIC0gTWVhc3VyZSBhbGwgbmluZSB0b29scyB3aXRoIHNlcXVlbnRpYWwsIGNvbmN1cnJlbnQsIHN0YXJ0dXAsIGxhdGVuY3ksIHRocm91Z2hwdXQsIHBheWxvYWQtc2l6ZSwgYW5kIGNhbmRpZGF0ZS1jb3VudCBzY2VuYXJpb3MuIC0gQWRkIGRldGVybWluaXN0aWMgbW9jay1tb2RlIENJIHNhbml0eSBidWRnZXRzIGFuZCBKU09OIG91dHB1dCBmb3IgYXV0b21hdGlvbi4gLSBBZGQgYmVuY2htYXJrIGhlbHBlciB0ZXN0cywgZG9jdW1lbnRhdGlvbiwgYW5kIGEgc2NoZWR1bGVkL21hbnVhbCBHaXRIdWIgQWN0aW9ucyB3b3JrZmxvdyBhY3Jvc3MgVWJ1bnR1L1dpbmRvd3MgYVx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6NSwidGl0bGUiOiJIYXJkZW4gcm91dGluZyBhbmQgZXhwb3NlIHR5cGVkIE1DUCBvdXRwdXRzIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzUiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiY29kZXgvcHIyLXJvdXRpbmctZm9sbG93dXAiLCJiYXNlIjoibWFpbiIsInNoYSI6IjFiZTZlNzUyOWZkOWRkZmFiMTVjOTgyNGZiNzhiMjFjODcxZDc1MmQiLCJtZXJnZV9jb21taXRfc2hhIjoiNWQ1ZmI2YjNiMTQ5OTBkNDcyMTliZGI4NzAwMTcyYjM0MTBlNDU4YSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMDktMTlUMDg6NTg6MjFaIiwidXBkYXRlZF9hdCI6IjIwMjYtMDktMTlUMDk6MTM6MzZaIiwibWVyZ2VkX2F0IjoiMjAyNi0wOS0xOVQwOToxMjozMFoiLCJjbG9zZWRfYXQiOiIyMDI2LTA5LTE5VDA5OjEyOjMwWiIsImFkZGl0aW9ucyI6NDQ5LCJkZWxldGlvbnMiOjcwLCJjaGFuZ2VkX2ZpbGVzIjoyNiwiY29tbWl0c19jb3VudCI6NSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgSGFyZGVuIEpldiByb3V0aW5nIGFuZCBNQ1AgaW50ZXJvcGVyYWJpbGl0eSB3aGlsZSBwcmVzZXJ2aW5nIHRoZSBHaXRIdWIgZXZlbnQtZGVsaXZlcnkgd29ya2Zsb3cuICMjIENoYW5nZXMgLSBSZXF1aXJlIHByb2JhYmlsaXR5IGRpc3RyaWJ1dGlvbnMgdG8gc3VwcG9ydCByZXBvcnRlZCBjb25maWRlbmNlIGJlZm9yZSBhbnkgYXV0b21hdGljIHBvbGljeSBkZWNpc2lvbi4gLSBBcHBseSB0aGUgY29oZXJlbmNlIGd1YXJkIHRvIGV2YWx1YXRlLCBjb2RpbmctbG9vcCwgcmV2aWV3LCB2ZXJpZnksIGFuZCBnYXRlIHBhdGhzLiAtIEFkZCB0eXBlZCBNQ1Agb3V0cHV0IHNjaGVtYXMgYW5kIHN0cnVjdHVyZWRDb250ZW50IHBhcml0eSBmb3IgYWxsIG5pbmUgdG9vbHMsIGluY2x1ZGluZ1x1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6NCwidGl0bGUiOiJBZGQgamV2X3N0ZXA6IG9uZSByZXF1ZXN0IGZvciB0aGUgY29kaW5nLWxvb3AgdHVybiBhbmQgdGhlIHByZXBhcmVkLWNhbGwgc2VsZWN0aW9uIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzQiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiY3Vyc29yL2Z1c2VkLWpldi1zdGVwLXJvdXRlci1iZGU4IiwiYmFzZSI6Im1haW4iLCJzaGEiOiIwNTMyNWFlODI4NWJjYjMyZDI3ODY0YzQxMWEzMTMzZjdkNjU2OTAyIiwibWVyZ2VfY29tbWl0X3NoYSI6ImRkMmU2MzlmNzRkYjk0MGM2YWVlOTk0ZmU2ZGI1YmQyMWQxZWM2ZWUiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTA5LTE4VDE4OjM0OjQwWiIsInVwZGF0ZWRfYXQiOiIyMDI2LTA5LTE4VDE4OjM3OjM2WiIsIm1lcmdlZF9hdCI6IjIwMjYtMDktMThUMTg6Mzc6MzZaIiwiY2xvc2VkX2F0IjoiMjAyNi0wOS0xOFQxODozNzozNloiLCJhZGRpdGlvbnMiOjg1OCwiZGVsZXRpb25zIjo5MiwiY2hhbmdlZF9maWxlcyI6MTksImNvbW1pdHNfY291bnQiOjIsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBXaGF0IEFkZHMgYGpldl9zdGVwYCwgYSBuaW50aCBNQ1AgdG9vbCB0aGF0IGFuc3dlcnMgdGhlIGNvZGluZy1sb29wIGFuZCBwcmVwYXJlZC1jYWxsIHJlY2lwZXMgaW4gKipvbmUqKiBKZXYgcmVxdWVzdC4gVG9kYXkgYSBsb29wIGl0ZXJhdGlvbiBjb3N0cyB0d28gTUNQIHJvdW5kLXRyaXBzOiBgamV2X2NvZGluZ19sb29wYCByZXR1cm5zIGBoYW5kb2ZmOiB1c2VfdG9vbHNgLCB0aGVuIHRoZSBob3N0IGNhbGxzIGBqZXZfdG9vbF9yb3V0ZWAgdG8gbGVhcm4gKndoaWNoKiBwcmVwYXJlZCBjYWxsIHRvIHJ1bi4gRWFjaCByb3VuZC10cmlwIHNwZW5kcyBhIGhvc3QtbW9kZWwgdHVybiB0byBpc3N1ZSB0aGUgY2FsbCBhbmQgaW50ZXJwcmV0IHRoZSBKU09OLiBUeXBlU2FmZSBldmFsdWF0ZXMgZXZcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjMsInRpdGxlIjoiRml4IHJvdXRpbmcgY29uZmlkZW5jZSBnYXBzIGFuZCBwcm9iYWJpbGl0eSBib3VuZGFyaWVzIGZyb20gUFIgIzIiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMyIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJjb2RleC9wcjItcm91dGluZy1mb2xsb3d1cCIsImJhc2UiOiJtYWluIiwic2hhIjoiMzFhYTQ5YTllOTk5MzQ5YWQwMTU3M2RjNjVhMGYzYTFkNGM4NGYyMCIsIm1lcmdlX2NvbW1pdF9zaGEiOiI0NzJlNTMyYTg0NzhlZTM2MGYwZTlhZGNhZmQ2OTU2YzJjZTE0NmJjIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0wOS0xOFQxNjo0ODoyMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0wOS0xOFQxNzoxOToyN1oiLCJtZXJnZWRfYXQiOiIyMDI2LTA5LTE4VDE3OjE5OjI3WiIsImNsb3NlZF9hdCI6IjIwMjYtMDktMThUMTc6MTk6MjdaIiwiYWRkaXRpb25zIjoxMjUsImRlbGV0aW9ucyI6OCwiY2hhbmdlZF9maWxlcyI6OCwiY29tbWl0c19jb3VudCI6MiwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IlBSICMyIGlzIG1lcmdlZCBhbmQgaXRzIGV4aXN0aW5nIGNoZWNrcyBwYXNzZWQsIGJ1dCByZXZpZXcgcmVwcm9kdWNlZCB0d28gcm91dGluZyBnYXBzOiAtIEEgcHJvdmlkZXIgY2FuIHJlcG9ydCBoaWdoIGNvbmZpZGVuY2UgYWxvbmdzaWRlIGEgdGllZCBvciB3ZWFrIHByb2JhYmlsaXR5IGRpc3RyaWJ1dGlvbi4gVGhlIHByZXBhcmVkLWNhbGwgcm91dGVyIGNvdWxkIHN0aWxsIHJldHVybiBgZXhlY3V0ZV90b29sYCwgYW5kIHRoZSBjb2RpbmcgbG9vcCBjb3VsZCByZXF1ZXN0IGEgcGFydG5lci4gQm90aCBub3cgcmVxdWlyZSBhbiBpbmRlcGVuZGVudCBkaXN0cmlidXRpb24tY29uY2VudHJhdGlvbiBjaGVjayBpbiBhZGRpdGlvbiB0byB0aGUgZXhpc3RpbmcgY29uZmlkZW5jZSBmbG9vci4gVGhpc1x1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MiwidGl0bGUiOiJIYXJkZW4gSmV2IHJlbGlhYmlsaXR5IGFuZCBjb21wbGV0aW9uIGdhdGVzIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzIiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiY29kZXgvcmVsaWFiaWxpdHktYW5kLWNvbXBsZXRpb24tZ2F0ZSIsImJhc2UiOiJtYWluIiwic2hhIjoiYmFmMjk0NzlhZGY0NDEzZTlmYzUyN2Q2OGVhMDM2MDY1N2EyOWIyYSIsIm1lcmdlX2NvbW1pdF9zaGEiOiIyZjllZGNkYjE2NGM3YWFhOTY5ZDAzYmY3N2QzM2FhZTM2YmUzMGU4IiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0wOS0xOFQxNjozNjo1NloiLCJ1cGRhdGVkX2F0IjoiMjAyNi0wOS0xOFQxNjozOToxMloiLCJtZXJnZWRfYXQiOiIyMDI2LTA5LTE4VDE2OjM5OjEyWiIsImNsb3NlZF9hdCI6IjIwMjYtMDktMThUMTY6Mzk6MTJaIiwiYWRkaXRpb25zIjoxMTI4LCJkZWxldGlvbnMiOjM3LCJjaGFuZ2VkX2ZpbGVzIjoxNywiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgLSBBZGQgdHlwZWQgcm91dGluZywgcG9saWN5LCBsaW1pdHMsIHNjcmVlbmluZywgcmFua2luZywgcmV2aWV3LCB2ZXJpZmljYXRpb24sIGFuZCBjb2RpbmctbG9vcCBzYWZlZ3VhcmRzIC0gRXhwYW5kIHBhY2tzLCBtb2NrIHN1cHBvcnQsIGNvbmZpZ3VyYXRpb24sIENMSSBiZWhhdmlvciwgZG9jdW1lbnRhdGlvbiwgYW5kIENJIGNvdmVyYWdlIC0gQWRkIGNvbXByZWhlbnNpdmUgdW5pdCwgaW50ZWdyYXRpb24sIGluc3RhbGxlciwgdHJhbnNwb3J0LCBhbmQgbGl2ZSBlbmQtdG8tZW5kIHRlc3RzICMjIFRlc3RpbmcgLSBDb21wcmVoZW5zaXZlIHRlc3Qgc3VpdGUgY292ZXJpbmcgQ0xJLCBydW50aW1lLCBNQ1AgdHJhbnNwb3J0LCBwb2xpY3ksIGxpbWl0cywgdG9vbHMsIHBhY2tzLFx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MSwidGl0bGUiOiJIYXJkZW4gSmV2IHJlbGlhYmlsaXR5IGFuZCBhZGQgYSBjb21iaW5lZCBjb21wbGV0aW9uIGdhdGUiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMSIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJjb2RleC9yZWxpYWJpbGl0eS1hbmQtY29tcGxldGlvbi1nYXRlIiwiYmFzZSI6Im1haW4iLCJzaGEiOiIyNmZkY2QyMzFkN2M1NWMyNWQzZGUwYmNlYmIxNmFjNTg5MGIzZWIxIiwibWVyZ2VfY29tbWl0X3NoYSI6ImM2MTllMTAxMjk2YWMwODg3NWM1ZjRjZWY3NzJlM2RkMmNkNjYzOGYiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTA5LTE4VDAzOjM2OjQyWiIsInVwZGF0ZWRfYXQiOiIyMDI2LTA5LTE4VDAzOjUxOjM5WiIsIm1lcmdlZF9hdCI6IjIwMjYtMDktMThUMDM6NTE6MzlaIiwiY2xvc2VkX2F0IjoiMjAyNi0wOS0xOFQwMzo1MTozOVoiLCJhZGRpdGlvbnMiOjIwNDcsImRlbGV0aW9ucyI6NDYyLCJjaGFuZ2VkX2ZpbGVzIjo0NSwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgTGFyZ2Ugb3IgdHJ1bmNhdGVkIGlucHV0cyBjb3VsZCBwcmV2aW91c2x5IHByb2R1Y2UgYXV0b21hdGljIGRlY2lzaW9ucyB3aXRob3V0IGNvbXBsZXRlIGNvbnRleHQsIHJhbmtpbmcgY291bGQgbG9zZSBjYW5kaWRhdGUgaWRlbnRpdHkgb3IgZXhjZWVkIHJlcXVlc3QgbGltaXRzLCBhbmQgdXBzdHJlYW0gZmFpbHVyZXMgd2VyZSBub3QgY29uc2lzdGVudGx5IGJvdW5kZWQgb3IgdmFsaWRhdGVkLiBUaGlzIGNoYW5nZSBtYWtlcyB0aG9zZSBjYXNlcyBleHBsaWNpdCBhbmQgYWRkcyBhIGNvbWJpbmVkIGNvbXBsZXRpb24gZ2F0ZS4gLSBBZGQgYGpldl9nYXRlYCBhbmQgaXRzIHF1ZXN0aW9uLXBhY2sgcmVzb3VyY2UgdG8gcmV2aWV3IGEgZGlmZiBhbmQgdmVyaWZ5IGNvbXBsZXRpb1x1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfV19 -->
