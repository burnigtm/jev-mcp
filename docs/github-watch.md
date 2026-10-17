# Jev_MCP GitHub watch

**Latest pull request:** [#11 security: harden untrusted-data handling and helper boundaries](https://github.com/burnigtm/jev-mcp/pull/11) — **open** 2026-10-17T12:29:52Z · just now · burnigtm · `security/harden-untrusted-data` → `main` · +1101 −188 · 64 files.

Open **1** · Merged **9** · Closed **0** · [Interactive board](github-watch.html)

This is the **Cursor Project dashboard** for [burnigtm/jev-mcp](https://github.com/burnigtm/jev-mcp). Open **Projects → Jev_MCP** (not the Agents list). The latest pull request stays at the top even when the list is long. GitHub Actions refreshes this file on branch `cursor-watch`.

| | |
| --- | --- |
| **Last refresh** | 2026-10-17T12:30:04Z |
| **Data** | GitHub API |
| **Last GitHub event** | `pull_request_target` `synchronize` |
| **Open PRs** | [#11](https://github.com/burnigtm/jev-mcp/pull/11) security: harden untrusted-data handling and helper boundaries |
| **Merged (recent)** | [#10](https://github.com/burnigtm/jev-mcp/pull/10) Package portable Jev skill and add real-agent evaluations, [#8](https://github.com/burnigtm/jev-mcp/pull/8) Pin the newest pull request on the watch board, [#7](https://github.com/burnigtm/jev-mcp/pull/7) Fix jev-mcp audit findings, [#6](https://github.com/burnigtm/jev-mcp/pull/6) test: add MCP performance benchmark suite, [#5](https://github.com/burnigtm/jev-mcp/pull/5) Harden routing and expose typed MCP outputs |
| **GitHub `main`** | [`e0ff6e3`](https://github.com/burnigtm/jev-mcp/commit/e0ff6e38121cc817b419dba14ce0ecfc717612f5) |
| **Cursor target** | `bc-c78e565c-bc13-4d27-ada8-cc5e7e04eb9e` |

## Latest

<details open>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/11">#11 security: harden untrusted-data handling and helper boundaries — OPEN</a></summary>
<table>
<tr><td><strong>State</strong></td><td>OPEN</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>security/harden-untrusted-data → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-17T12:29:52Z · just now</td></tr>
<tr><td><strong>Merged</strong></td><td>not merged</td></tr>
<tr><td><strong>Diff</strong></td><td>+1101 −188 · 64 files</td></tr>
<tr><td><strong>Commits</strong></td><td>2</td></tr>
<tr><td><strong>Checks</strong></td><td>5 still running · 6 checks</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/e0ff6e38121cc817b419dba14ce0ecfc717612f5"><code>e0ff6e3</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/c05f376e2898f9b15923521690aade7b19ed16ba"><code>c05f376</code></a></td></tr>
</table>
<p><strong>Commits</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/ca42bb0c5723d1a374917f93ab7b6200590b1bdf"><code>ca42bb0</code></a> security: harden untrusted-data handling and helper boundaries</li>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/e0ff6e38121cc817b419dba14ce0ecfc717612f5"><code>e0ff6e3</code></a> fix: address review findings on isolation and metadata clipping</li>
</ul>
<p><strong>Files</strong></p><ul>
<li><code>.github/workflows/ci.yml</code> modified +2 −0</li>
<li><code>.github/workflows/notify-jev-mcp.yml</code> modified +14 −2</li>
<li><code>.github/workflows/performance.yml</code> modified +2 −0</li>
<li><code>.gitignore</code> modified +6 −0</li>
<li><code>README.md</code> modified +3 −3</li>
<li><code>docs/architecture.md</code> modified +5 −3</li>
<li><code>docs/changelog.md</code> modified +12 −1</li>
<li><code>docs/configuration.md</code> modified +10 −7</li>
<li><code>docs/install.md</code> modified +4 −2</li>
<li><code>evals/README.md</code> modified +3 −1</li>
<li><code>examples/codex.config.toml</code> modified +1 −2</li>
<li><code>examples/cursor.mcp.json</code> modified +1 −1</li>
<li>52 more files on the pull request</li>
</ul>
<p><strong>Checks</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/39032752377/job/117396382662">check (ubuntu-latest, 20)</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/39032752377/job/117396382618">check (windows-latest, 22)</a> <code>queued</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/39032752377/job/117396382600">check (ubuntu-latest, 22)</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/39032752377/job/117396382479">check (windows-latest, 20)</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/39032750816/job/117396378896">publish</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/39032750816/job/117396378860">notify</a> <code>success</code></li>
</ul>
<p><strong>Description</strong></p><p>## Summary This PR hardens the boundaries where `jev-mcp` handles third-party text, host-prepared tool metadata, provider credentials, and agent evaluation code. It also fixes several correctness defects found during the audit. The checkout already contained a pending remediation batch; this branch builds on it and turns the whole set into one reviewed change. No live provider calls or publishing were performed. ## Security findings addressed ### 1. Prompt injection against the screening and ve…</p>
</details>


## Open

No open pull requests.


## Merged

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/10">#10 Package portable Jev skill and add real-agent evaluations — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>codex/portable-skill-evals → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-15T16:51:22Z · 43h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-15T16:51:22Z · 43h ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-09-21T17:59:12Z · 25d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-21T17:59:12Z · 25d ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-09-21T17:37:31Z · 25d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-21T17:37:31Z · 25d ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-09-19T11:22:46Z · 28d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-19T11:22:44Z · 28d ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-09-19T09:13:36Z · 28d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-19T09:12:30Z · 28d ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-09-18T18:37:36Z · 28d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-18T18:37:36Z · 28d ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-09-18T17:19:27Z · 28d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-18T17:19:27Z · 28d ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-09-18T16:39:12Z · 28d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-18T16:39:12Z · 28d ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-09-18T03:51:39Z · 29d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-18T03:51:39Z · 29d ago</td></tr>
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

[PR #11](https://github.com/burnigtm/jev-mcp/pull/11) security: harden untrusted-data handling and helper boundaries

- Event: `pull_request_target` `synchronize`
- Ref: `main` SHA [`e0ff6e3`](https://github.com/burnigtm/jev-mcp/commit/e0ff6e38121cc817b419dba14ce0ecfc717612f5)

Search, filters, checks, commits, and files are on the interactive board next to this file. Follow-ups land in the **Jev_MCP Project** chat.

Live Actions: [Notify Jev_MCP](https://github.com/burnigtm/jev-mcp/actions/workflows/notify-jev-mcp.yml).

<!-- jev-watch:snapshot eyJwdWxscyI6W3sibnVtYmVyIjoxMSwidGl0bGUiOiJzZWN1cml0eTogaGFyZGVuIHVudHJ1c3RlZC1kYXRhIGhhbmRsaW5nIGFuZCBoZWxwZXIgYm91bmRhcmllcyIsInN0YXRlIjoiT1BFTiIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTEiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoic2VjdXJpdHkvaGFyZGVuLXVudHJ1c3RlZC1kYXRhIiwiYmFzZSI6Im1haW4iLCJzaGEiOiJlMGZmNmUzODEyMWNjODE3YjQxOWRiYTE0Y2UwZWNmYzcxNzYxMmY1IiwibWVyZ2VfY29tbWl0X3NoYSI6ImMwNWYzNzZlMjg5OGY5YjE1OTIzNTIxNjkwYWFkZTdiMTllZDE2YmEiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTE3VDEyOjE0OjM0WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTE3VDEyOjI5OjUyWiIsIm1lcmdlZF9hdCI6IiIsImNsb3NlZF9hdCI6IiIsImFkZGl0aW9ucyI6MTEwMSwiZGVsZXRpb25zIjoxODgsImNoYW5nZWRfZmlsZXMiOjY0LCJjb21taXRzX2NvdW50IjoyLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBUaGlzIFBSIGhhcmRlbnMgdGhlIGJvdW5kYXJpZXMgd2hlcmUgYGpldi1tY3BgIGhhbmRsZXMgdGhpcmQtcGFydHkgdGV4dCwgaG9zdC1wcmVwYXJlZCB0b29sIG1ldGFkYXRhLCBwcm92aWRlciBjcmVkZW50aWFscywgYW5kIGFnZW50IGV2YWx1YXRpb24gY29kZS4gSXQgYWxzbyBmaXhlcyBzZXZlcmFsIGNvcnJlY3RuZXNzIGRlZmVjdHMgZm91bmQgZHVyaW5nIHRoZSBhdWRpdC4gVGhlIGNoZWNrb3V0IGFscmVhZHkgY29udGFpbmVkIGEgcGVuZGluZyByZW1lZGlhdGlvbiBiYXRjaDsgdGhpcyBicmFuY2ggYnVpbGRzIG9uIGl0IGFuZCB0dXJucyB0aGUgd2hvbGUgc2V0IGludG8gb25lIHJldmlld2VkIGNoYW5nZS4gTm8gbGl2ZSBwcm92aWRlciBjYWxscyBvciBwdWJsaXNoaW5nXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOlt7InNoYSI6ImNhNDJiYjBjNTcyM2QxYTM3NDkxN2Y5M2FiN2I2MjAwNTkwYjFiZGYiLCJtZXNzYWdlIjoic2VjdXJpdHk6IGhhcmRlbiB1bnRydXN0ZWQtZGF0YSBoYW5kbGluZyBhbmQgaGVscGVyIGJvdW5kYXJpZXMiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9jb21taXQvY2E0MmJiMGM1NzIzZDFhMzc0OTE3ZjkzYWI3YjYyMDA1OTBiMWJkZiJ9LHsic2hhIjoiZTBmZjZlMzgxMjFjYzgxN2I0MTlkYmExNGNlMGVjZmM3MTc2MTJmNSIsIm1lc3NhZ2UiOiJmaXg6IGFkZHJlc3MgcmV2aWV3IGZpbmRpbmdzIG9uIGlzb2xhdGlvbiBhbmQgbWV0YWRhdGEgY2xpcHBpbmciLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9jb21taXQvZTBmZjZlMzgxMjFjYzgxN2I0MTlkYmExNGNlMGVjZmM3MTc2MTJmNSJ9XSwiZmlsZXMiOlt7ImZpbGVuYW1lIjoiLmdpdGh1Yi93b3JrZmxvd3MvY2kueW1sIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjIsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6Ii5naXRodWIvd29ya2Zsb3dzL25vdGlmeS1qZXYtbWNwLnltbCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxNCwiZGVsZXRpb25zIjoyfSx7ImZpbGVuYW1lIjoiLmdpdGh1Yi93b3JrZmxvd3MvcGVyZm9ybWFuY2UueW1sIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjIsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6Ii5naXRpZ25vcmUiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiUkVBRE1FLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjMsImRlbGV0aW9ucyI6M30seyJmaWxlbmFtZSI6ImRvY3MvYXJjaGl0ZWN0dXJlLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjUsImRlbGV0aW9ucyI6M30seyJmaWxlbmFtZSI6ImRvY3MvY2hhbmdlbG9nLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEyLCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJkb2NzL2NvbmZpZ3VyYXRpb24ubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTAsImRlbGV0aW9ucyI6N30seyJmaWxlbmFtZSI6ImRvY3MvaW5zdGFsbC5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo0LCJkZWxldGlvbnMiOjJ9LHsiZmlsZW5hbWUiOiJldmFscy9SRUFETUUubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MywiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoiZXhhbXBsZXMvY29kZXguY29uZmlnLnRvbWwiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MSwiZGVsZXRpb25zIjoyfSx7ImZpbGVuYW1lIjoiZXhhbXBsZXMvY3Vyc29yLm1jcC5qc29uIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEsImRlbGV0aW9ucyI6MX1dLCJjaGVja3MiOlt7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjApIiwic3RhdGUiOiJpbl9wcm9ncmVzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy8zOTAzMjc1MjM3Ny9qb2IvMTE3Mzk2MzgyNjYyIn0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6InF1ZXVlZCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy8zOTAzMjc1MjM3Ny9qb2IvMTE3Mzk2MzgyNjE4In0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIyKSIsInN0YXRlIjoiaW5fcHJvZ3Jlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvMzkwMzI3NTIzNzcvam9iLzExNzM5NjM4MjYwMCJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjApIiwic3RhdGUiOiJpbl9wcm9ncmVzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy8zOTAzMjc1MjM3Ny9qb2IvMTE3Mzk2MzgyNDc5In0seyJuYW1lIjoicHVibGlzaCIsInN0YXRlIjoiaW5fcHJvZ3Jlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvMzkwMzI3NTA4MTYvam9iLzExNzM5NjM3ODg5NiJ9LHsibmFtZSI6Im5vdGlmeSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy8zOTAzMjc1MDgxNi9qb2IvMTE3Mzk2Mzc4ODYwIn1dfSx7Im51bWJlciI6MTAsInRpdGxlIjoiUGFja2FnZSBwb3J0YWJsZSBKZXYgc2tpbGwgYW5kIGFkZCByZWFsLWFnZW50IGV2YWx1YXRpb25zIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzEwIiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImNvZGV4L3BvcnRhYmxlLXNraWxsLWV2YWxzIiwiYmFzZSI6Im1haW4iLCJzaGEiOiJmZDM0NzAxZTE1NWI2YzIzMGNiYWNlNDExZGY2MjM4ODA0MDViMTMxIiwibWVyZ2VfY29tbWl0X3NoYSI6IjU3MWY0NjQ1NjVhMTMxOWFiZTUyY2I5NTEyMGIzNzE3NGVlNTNhYmEiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTE1VDE2OjQ0OjQ2WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTE1VDE2OjUxOjIyWiIsIm1lcmdlZF9hdCI6IjIwMjYtMTAtMTVUMTY6NTE6MjJaIiwiY2xvc2VkX2F0IjoiMjAyNi0xMC0xNVQxNjo1MToyMloiLCJhZGRpdGlvbnMiOjU3NjUsImRlbGV0aW9ucyI6MzY4LCJjaGFuZ2VkX2ZpbGVzIjo1MCwiY29tbWl0c19jb3VudCI6MiwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFByb2JsZW0gYW5kIGJlaGF2aW9yIFRoZSBKZXYgY29tcGFuaW9uIHNraWxsIGRlcGVuZGVkIG9uIHJlcG9zaXRvcnkgZG9jdW1lbnRhdGlvbiBhbmQgaGFkIG5vIHJlcHJvZHVjaWJsZSBzdGFuZGFsb25lIHBhY2thZ2Ugb3IgcmVhbC1hZ2VudCBldmFsdWF0aW9uIHBhdGguIFRoaXMgY2hhbmdlIG1ha2VzIHRoZSBjb21wbGV0ZSBza2lsbCBpbmRlcGVuZGVudGx5IGluc3RhbGxhYmxlIGF0IGAuYWdlbnRzL3NraWxscy9qZXYtbWNwYCBhbmQgYWRkcyBib3VuZGVkIGV2YWx1YXRpb25zIG9mIHRoZSBjb21iaW5lZCBza2lsbCArIGxpdmUgTUNQIHdvcmtmbG93IGluIENvZGV4IGFuZCB0aGUgb2ZmaWNpYWwgQ3Vyc29yIENMSS4gIyMgQ2hhbmdlcyAtIE1vdmUgY2Fub25pY2FsIGNvbnRyYWN0cyBpblx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6OCwidGl0bGUiOiJQaW4gdGhlIG5ld2VzdCBwdWxsIHJlcXVlc3Qgb24gdGhlIHdhdGNoIGJvYXJkIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzgiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiY3Vyc29yL2ludGVyYWN0aXZlLXByLXdhdGNoLTUxOGUiLCJiYXNlIjoibWFpbiIsInNoYSI6IjQ4MzM2MzQ2Y2QzZmI1ZWI5NjU1NjEyNjVlMGJmM2QwNTllYzVmMGYiLCJtZXJnZV9jb21taXRfc2hhIjoiOTQ0OGY2MTIwMDE1ZjJmNmM2ZGFkNzEzN2M3ZjIzNDU0NTIwOTkxOCIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMDktMjFUMTc6NTk6MDZaIiwidXBkYXRlZF9hdCI6IjIwMjYtMDktMjFUMTc6NTk6MTJaIiwibWVyZ2VkX2F0IjoiMjAyNi0wOS0yMVQxNzo1OToxMloiLCJjbG9zZWRfYXQiOiIyMDI2LTA5LTIxVDE3OjU5OjEyWiIsImFkZGl0aW9ucyI6MTExOCwiZGVsZXRpb25zIjoxMzMsImNoYW5nZWRfZmlsZXMiOjYsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IC0gVGhlIEdpdEh1YiB3YXRjaCBib2FyZCBhbHdheXMgbGVhZHMgd2l0aCB0aGUgaGlnaGVzdC1udW1iZXJlZCBwdWxsIHJlcXVlc3QsIHNvIHRoZSBsYXRlc3Qgb25lIHN0YXlzIHZpc2libGUuIC0gRWFjaCBwdWxsIHJlcXVlc3Qgc2hvd3MgYXV0aG9yLCBicmFuY2hlcywgZGlmZiBzaXplLCBjaGVja3MsIHJldmlld3MsIGNvbW1pdHMsIGFuZCBmaWxlcy4gLSBBIGZhaWxlZCBHaXRIdWIgcmVhZCBrZWVwcyB0aGUgbGFzdCBzYXZlZCBsaXN0IGFuZCBzYXlzIHRoZSBsaXZlIGxpc3QgaXMgdW5hdmFpbGFibGUsIGluc3RlYWQgb2YgYmxhbmtpbmcgdGhlIHBhZ2Ugb3IgcHJldGVuZGluZyB0aGUgbGlzdCBpcyBlbXB0eS4gLSBgZG9jcy9naXRodWItd2F0Y2guaHRtbGAgYWRkcyBzZWFcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjcsInRpdGxlIjoiRml4IGpldi1tY3AgYXVkaXQgZmluZGluZ3MiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvNyIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJjdXJzb3IvamV2LWF1ZGl0LWZpeGVzLW9wcyIsImJhc2UiOiJtYWluIiwic2hhIjoiYjkyZjlhMDFmMjQxODAyODEyMzkxNjZjNTU1NDg0OTA1MWM4YWU3MSIsIm1lcmdlX2NvbW1pdF9zaGEiOiI3Y2FmYzQwMmNiZDc3NmNhZTU1OTAyNDE1ZDg0NDgyOTcxZGYxN2Q0IiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0wOS0yMVQxNzozNzoyNVoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0wOS0yMVQxNzozNzozMVoiLCJtZXJnZWRfYXQiOiIyMDI2LTA5LTIxVDE3OjM3OjMxWiIsImNsb3NlZF9hdCI6IjIwMjYtMDktMjFUMTc6Mzc6MzFaIiwiYWRkaXRpb25zIjo5NjksImRlbGV0aW9ucyI6MTUxLCJjaGFuZ2VkX2ZpbGVzIjozNSwiY29tbWl0c19jb3VudCI6NCwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgLSBHaXRIdWIgbm90aWZ5IG5vIGxvbmdlciBydW5zIHB1bGwtcmVxdWVzdCBoZWFkIGNvZGUsIGFuZCBpdCBwaW5zIHRoZSBBUEkgaG9zdC4gLSBgamV2X3N0ZXBgIGlnbm9yZXMgdGhlIGhvc3QgYHByZXBhcmVkX3Rvb2xfY2FsbGAgZmxhZywgYW5kIGVtcHR5IGNhbmRpZGF0ZSBsaXN0cyBhcmUgbm90IHRyZWF0ZWQgYXMgYXV0by4gLSBSZXZpZXcgYW5kIGdhdGUgcmVxdWlyZSBwZXItZGltZW5zaW9uIGZsb29ycy4gLSBSYW5rIGF1dG8gbmVlZHMgYSBmaW5hbC1yb3VuZCBleGlzdHMgcmVzdWx0IHBsdXMgYSBjb2hlcmVudCBiZXN0LiAtIFR5cGVTYWZlIHRpbWVvdXQgYW5kIGJhc2UgVVJMIGFyZSBib3VuZGVkLiAtIFBlci1jYWxsIGZsb29ycyBjYW4gb25seSB0aWdodGVuLiAtXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjo2LCJ0aXRsZSI6InRlc3Q6IGFkZCBNQ1AgcGVyZm9ybWFuY2UgYmVuY2htYXJrIHN1aXRlIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzYiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiY29kZXgvcHIyLXJvdXRpbmctZm9sbG93dXAiLCJiYXNlIjoibWFpbiIsInNoYSI6IjI2MTQ0YWI1MDM2MGY1NTA1MTQxNDFiNzMzZmNiYWRmMGFiNDdhMjYiLCJtZXJnZV9jb21taXRfc2hhIjoiNGY0YWUxMWE1ZTFlOWE1MDJjZGM0MzI1NTBkODc4ZjcyODg1MTgyMCIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMDktMTlUMTA6MzI6MzZaIiwidXBkYXRlZF9hdCI6IjIwMjYtMDktMTlUMTE6MjI6NDZaIiwibWVyZ2VkX2F0IjoiMjAyNi0wOS0xOVQxMToyMjo0NFoiLCJjbG9zZWRfYXQiOiIyMDI2LTA5LTE5VDExOjIyOjQ0WiIsImFkZGl0aW9ucyI6Mjk2LCJkZWxldGlvbnMiOjEsImNoYW5nZWRfZmlsZXMiOjcsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IC0gQWRkIGFuIG9wdC1pbiBiZW5jaG1hcmsgZm9yIHRoZSBjb21waWxlZCBNQ1Agc3RkaW8gdHJhbnNwb3J0LiAtIE1lYXN1cmUgYWxsIG5pbmUgdG9vbHMgd2l0aCBzZXF1ZW50aWFsLCBjb25jdXJyZW50LCBzdGFydHVwLCBsYXRlbmN5LCB0aHJvdWdocHV0LCBwYXlsb2FkLXNpemUsIGFuZCBjYW5kaWRhdGUtY291bnQgc2NlbmFyaW9zLiAtIEFkZCBkZXRlcm1pbmlzdGljIG1vY2stbW9kZSBDSSBzYW5pdHkgYnVkZ2V0cyBhbmQgSlNPTiBvdXRwdXQgZm9yIGF1dG9tYXRpb24uIC0gQWRkIGJlbmNobWFyayBoZWxwZXIgdGVzdHMsIGRvY3VtZW50YXRpb24sIGFuZCBhIHNjaGVkdWxlZC9tYW51YWwgR2l0SHViIEFjdGlvbnMgd29ya2Zsb3cgYWNyb3NzIFVidW50dS9XaW5kb3dzIGFcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjUsInRpdGxlIjoiSGFyZGVuIHJvdXRpbmcgYW5kIGV4cG9zZSB0eXBlZCBNQ1Agb3V0cHV0cyIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC81IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImNvZGV4L3ByMi1yb3V0aW5nLWZvbGxvd3VwIiwiYmFzZSI6Im1haW4iLCJzaGEiOiIxYmU2ZTc1MjlmZDlkZGZhYjE1Yzk4MjRmYjc4YjIxYzg3MWQ3NTJkIiwibWVyZ2VfY29tbWl0X3NoYSI6IjVkNWZiNmIzYjE0OTkwZDQ3MjE5YmRiODcwMDE3MmIzNDEwZTQ1OGEiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTA5LTE5VDA4OjU4OjIxWiIsInVwZGF0ZWRfYXQiOiIyMDI2LTA5LTE5VDA5OjEzOjM2WiIsIm1lcmdlZF9hdCI6IjIwMjYtMDktMTlUMDk6MTI6MzBaIiwiY2xvc2VkX2F0IjoiMjAyNi0wOS0xOVQwOToxMjozMFoiLCJhZGRpdGlvbnMiOjQ0OSwiZGVsZXRpb25zIjo3MCwiY2hhbmdlZF9maWxlcyI6MjYsImNvbW1pdHNfY291bnQiOjUsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IEhhcmRlbiBKZXYgcm91dGluZyBhbmQgTUNQIGludGVyb3BlcmFiaWxpdHkgd2hpbGUgcHJlc2VydmluZyB0aGUgR2l0SHViIGV2ZW50LWRlbGl2ZXJ5IHdvcmtmbG93LiAjIyBDaGFuZ2VzIC0gUmVxdWlyZSBwcm9iYWJpbGl0eSBkaXN0cmlidXRpb25zIHRvIHN1cHBvcnQgcmVwb3J0ZWQgY29uZmlkZW5jZSBiZWZvcmUgYW55IGF1dG9tYXRpYyBwb2xpY3kgZGVjaXNpb24uIC0gQXBwbHkgdGhlIGNvaGVyZW5jZSBndWFyZCB0byBldmFsdWF0ZSwgY29kaW5nLWxvb3AsIHJldmlldywgdmVyaWZ5LCBhbmQgZ2F0ZSBwYXRocy4gLSBBZGQgdHlwZWQgTUNQIG91dHB1dCBzY2hlbWFzIGFuZCBzdHJ1Y3R1cmVkQ29udGVudCBwYXJpdHkgZm9yIGFsbCBuaW5lIHRvb2xzLCBpbmNsdWRpbmdcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjQsInRpdGxlIjoiQWRkIGpldl9zdGVwOiBvbmUgcmVxdWVzdCBmb3IgdGhlIGNvZGluZy1sb29wIHR1cm4gYW5kIHRoZSBwcmVwYXJlZC1jYWxsIHNlbGVjdGlvbiIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC80IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImN1cnNvci9mdXNlZC1qZXYtc3RlcC1yb3V0ZXItYmRlOCIsImJhc2UiOiJtYWluIiwic2hhIjoiMDUzMjVhZTgyODViY2IzMmQyNzg2NGM0MTFhMzEzM2Y3ZDY1NjkwMiIsIm1lcmdlX2NvbW1pdF9zaGEiOiJkZDJlNjM5Zjc0ZGI5NDBjNmFlZTk5NGZlNmRiNWJkMjFkMWVjNmVlIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0wOS0xOFQxODozNDo0MFoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0wOS0xOFQxODozNzozNloiLCJtZXJnZWRfYXQiOiIyMDI2LTA5LTE4VDE4OjM3OjM2WiIsImNsb3NlZF9hdCI6IjIwMjYtMDktMThUMTg6Mzc6MzZaIiwiYWRkaXRpb25zIjo4NTgsImRlbGV0aW9ucyI6OTIsImNoYW5nZWRfZmlsZXMiOjE5LCJjb21taXRzX2NvdW50IjoyLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgV2hhdCBBZGRzIGBqZXZfc3RlcGAsIGEgbmludGggTUNQIHRvb2wgdGhhdCBhbnN3ZXJzIHRoZSBjb2RpbmctbG9vcCBhbmQgcHJlcGFyZWQtY2FsbCByZWNpcGVzIGluICoqb25lKiogSmV2IHJlcXVlc3QuIFRvZGF5IGEgbG9vcCBpdGVyYXRpb24gY29zdHMgdHdvIE1DUCByb3VuZC10cmlwczogYGpldl9jb2RpbmdfbG9vcGAgcmV0dXJucyBgaGFuZG9mZjogdXNlX3Rvb2xzYCwgdGhlbiB0aGUgaG9zdCBjYWxscyBgamV2X3Rvb2xfcm91dGVgIHRvIGxlYXJuICp3aGljaCogcHJlcGFyZWQgY2FsbCB0byBydW4uIEVhY2ggcm91bmQtdHJpcCBzcGVuZHMgYSBob3N0LW1vZGVsIHR1cm4gdG8gaXNzdWUgdGhlIGNhbGwgYW5kIGludGVycHJldCB0aGUgSlNPTi4gVHlwZVNhZmUgZXZhbHVhdGVzIGV2XHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjozLCJ0aXRsZSI6IkZpeCByb3V0aW5nIGNvbmZpZGVuY2UgZ2FwcyBhbmQgcHJvYmFiaWxpdHkgYm91bmRhcmllcyBmcm9tIFBSICMyIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzMiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiY29kZXgvcHIyLXJvdXRpbmctZm9sbG93dXAiLCJiYXNlIjoibWFpbiIsInNoYSI6IjMxYWE0OWE5ZTk5OTM0OWFkMDE1NzNkYzY1YTBmM2ExZDRjODRmMjAiLCJtZXJnZV9jb21taXRfc2hhIjoiNDcyZTUzMmE4NDc4ZWUzNjBmMGU5YWRjYWZkNjk1NmMyY2UxNDZiYyIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMDktMThUMTY6NDg6MjBaIiwidXBkYXRlZF9hdCI6IjIwMjYtMDktMThUMTc6MTk6MjdaIiwibWVyZ2VkX2F0IjoiMjAyNi0wOS0xOFQxNzoxOToyN1oiLCJjbG9zZWRfYXQiOiIyMDI2LTA5LTE4VDE3OjE5OjI3WiIsImFkZGl0aW9ucyI6MTI1LCJkZWxldGlvbnMiOjgsImNoYW5nZWRfZmlsZXMiOjgsImNvbW1pdHNfY291bnQiOjIsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiJQUiAjMiBpcyBtZXJnZWQgYW5kIGl0cyBleGlzdGluZyBjaGVja3MgcGFzc2VkLCBidXQgcmV2aWV3IHJlcHJvZHVjZWQgdHdvIHJvdXRpbmcgZ2FwczogLSBBIHByb3ZpZGVyIGNhbiByZXBvcnQgaGlnaCBjb25maWRlbmNlIGFsb25nc2lkZSBhIHRpZWQgb3Igd2VhayBwcm9iYWJpbGl0eSBkaXN0cmlidXRpb24uIFRoZSBwcmVwYXJlZC1jYWxsIHJvdXRlciBjb3VsZCBzdGlsbCByZXR1cm4gYGV4ZWN1dGVfdG9vbGAsIGFuZCB0aGUgY29kaW5nIGxvb3AgY291bGQgcmVxdWVzdCBhIHBhcnRuZXIuIEJvdGggbm93IHJlcXVpcmUgYW4gaW5kZXBlbmRlbnQgZGlzdHJpYnV0aW9uLWNvbmNlbnRyYXRpb24gY2hlY2sgaW4gYWRkaXRpb24gdG8gdGhlIGV4aXN0aW5nIGNvbmZpZGVuY2UgZmxvb3IuIFRoaXNcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjIsInRpdGxlIjoiSGFyZGVuIEpldiByZWxpYWJpbGl0eSBhbmQgY29tcGxldGlvbiBnYXRlcyIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8yIiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImNvZGV4L3JlbGlhYmlsaXR5LWFuZC1jb21wbGV0aW9uLWdhdGUiLCJiYXNlIjoibWFpbiIsInNoYSI6ImJhZjI5NDc5YWRmNDQxM2U5ZmM1MjdkNjhlYTAzNjA2NTdhMjliMmEiLCJtZXJnZV9jb21taXRfc2hhIjoiMmY5ZWRjZGIxNjRjN2FhYTk2OWQwM2JmNzdkMzNhYWUzNmJlMzBlOCIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMDktMThUMTY6MzY6NTZaIiwidXBkYXRlZF9hdCI6IjIwMjYtMDktMThUMTY6Mzk6MTJaIiwibWVyZ2VkX2F0IjoiMjAyNi0wOS0xOFQxNjozOToxMloiLCJjbG9zZWRfYXQiOiIyMDI2LTA5LTE4VDE2OjM5OjEyWiIsImFkZGl0aW9ucyI6MTEyOCwiZGVsZXRpb25zIjozNywiY2hhbmdlZF9maWxlcyI6MTcsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IC0gQWRkIHR5cGVkIHJvdXRpbmcsIHBvbGljeSwgbGltaXRzLCBzY3JlZW5pbmcsIHJhbmtpbmcsIHJldmlldywgdmVyaWZpY2F0aW9uLCBhbmQgY29kaW5nLWxvb3Agc2FmZWd1YXJkcyAtIEV4cGFuZCBwYWNrcywgbW9jayBzdXBwb3J0LCBjb25maWd1cmF0aW9uLCBDTEkgYmVoYXZpb3IsIGRvY3VtZW50YXRpb24sIGFuZCBDSSBjb3ZlcmFnZSAtIEFkZCBjb21wcmVoZW5zaXZlIHVuaXQsIGludGVncmF0aW9uLCBpbnN0YWxsZXIsIHRyYW5zcG9ydCwgYW5kIGxpdmUgZW5kLXRvLWVuZCB0ZXN0cyAjIyBUZXN0aW5nIC0gQ29tcHJlaGVuc2l2ZSB0ZXN0IHN1aXRlIGNvdmVyaW5nIENMSSwgcnVudGltZSwgTUNQIHRyYW5zcG9ydCwgcG9saWN5LCBsaW1pdHMsIHRvb2xzLCBwYWNrcyxcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjEsInRpdGxlIjoiSGFyZGVuIEpldiByZWxpYWJpbGl0eSBhbmQgYWRkIGEgY29tYmluZWQgY29tcGxldGlvbiBnYXRlIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzEiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiY29kZXgvcmVsaWFiaWxpdHktYW5kLWNvbXBsZXRpb24tZ2F0ZSIsImJhc2UiOiJtYWluIiwic2hhIjoiMjZmZGNkMjMxZDdjNTVjMjVkM2RlMGJjZWJiMTZhYzU4OTBiM2ViMSIsIm1lcmdlX2NvbW1pdF9zaGEiOiJjNjE5ZTEwMTI5NmFjMDg4NzVjNWY0Y2VmNzcyZTNkZDJjZDY2MzhmIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0wOS0xOFQwMzozNjo0MloiLCJ1cGRhdGVkX2F0IjoiMjAyNi0wOS0xOFQwMzo1MTozOVoiLCJtZXJnZWRfYXQiOiIyMDI2LTA5LTE4VDAzOjUxOjM5WiIsImNsb3NlZF9hdCI6IjIwMjYtMDktMThUMDM6NTE6MzlaIiwiYWRkaXRpb25zIjoyMDQ3LCJkZWxldGlvbnMiOjQ2MiwiY2hhbmdlZF9maWxlcyI6NDUsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IExhcmdlIG9yIHRydW5jYXRlZCBpbnB1dHMgY291bGQgcHJldmlvdXNseSBwcm9kdWNlIGF1dG9tYXRpYyBkZWNpc2lvbnMgd2l0aG91dCBjb21wbGV0ZSBjb250ZXh0LCByYW5raW5nIGNvdWxkIGxvc2UgY2FuZGlkYXRlIGlkZW50aXR5IG9yIGV4Y2VlZCByZXF1ZXN0IGxpbWl0cywgYW5kIHVwc3RyZWFtIGZhaWx1cmVzIHdlcmUgbm90IGNvbnNpc3RlbnRseSBib3VuZGVkIG9yIHZhbGlkYXRlZC4gVGhpcyBjaGFuZ2UgbWFrZXMgdGhvc2UgY2FzZXMgZXhwbGljaXQgYW5kIGFkZHMgYSBjb21iaW5lZCBjb21wbGV0aW9uIGdhdGUuIC0gQWRkIGBqZXZfZ2F0ZWAgYW5kIGl0cyBxdWVzdGlvbi1wYWNrIHJlc291cmNlIHRvIHJldmlldyBhIGRpZmYgYW5kIHZlcmlmeSBjb21wbGV0aW9cdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX1dfQ== -->
