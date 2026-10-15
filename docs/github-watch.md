# Jev_MCP GitHub watch

**Latest pull request:** [#10 Package portable Jev skill and add real-agent evaluations](https://github.com/burnigtm/jev-mcp/pull/10) — **merged** 2026-10-15T16:51:22Z · just now · burnigtm · `codex/portable-skill-evals` → `main` · +5765 −368 · 50 files.

Open **0** · Merged **9** · Closed **0** · [Interactive board](github-watch.html)

This is the **Cursor Project dashboard** for [burnigtm/jev-mcp](https://github.com/burnigtm/jev-mcp). Open **Projects → Jev_MCP** (not the Agents list). The latest pull request stays at the top even when the list is long. GitHub Actions refreshes this file on branch `cursor-watch`.

| | |
| --- | --- |
| **Last refresh** | 2026-10-15T16:51:37Z |
| **Data** | GitHub API |
| **Last GitHub event** | `push` |
| **Open PRs** | none |
| **Merged (recent)** | [#10](https://github.com/burnigtm/jev-mcp/pull/10) Package portable Jev skill and add real-agent evaluations, [#8](https://github.com/burnigtm/jev-mcp/pull/8) Pin the newest pull request on the watch board, [#7](https://github.com/burnigtm/jev-mcp/pull/7) Fix jev-mcp audit findings, [#6](https://github.com/burnigtm/jev-mcp/pull/6) test: add MCP performance benchmark suite, [#5](https://github.com/burnigtm/jev-mcp/pull/5) Harden routing and expose typed MCP outputs |
| **GitHub `main`** | [`571f464`](https://github.com/burnigtm/jev-mcp/commit/571f464565a1319abe52cb95120b37174ee53aba) |
| **Cursor target** | `bc-c78e565c-bc13-4d27-ada8-cc5e7e04eb9e` |

## Latest

<details open>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/10">#10 Package portable Jev skill and add real-agent evaluations — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>codex/portable-skill-evals → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-15T16:51:22Z · just now</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-15T16:51:22Z · just now</td></tr>
<tr><td><strong>Diff</strong></td><td>+5765 −368 · 50 files</td></tr>
<tr><td><strong>Commits</strong></td><td>2</td></tr>
<tr><td><strong>Checks</strong></td><td>2 still running · 6 checks</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/fd34701e155b6c230cbace411df623880405b131"><code>fd34701</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/571f464565a1319abe52cb95120b37174ee53aba"><code>571f464</code></a></td></tr>
</table>
<p><strong>Commits</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/0628c5d080d9dcf59be387baac5bbef6f0593fae"><code>0628c5d</code></a> feat: package portable Jev skill with real-agent evaluations</li>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/fd34701e155b6c230cbace411df623880405b131"><code>fd34701</code></a> test: run evidence protocol checks before production build</li>
</ul>
<p><strong>Files</strong></p><ul>
<li><code>.github/workflows/ci.yml</code> modified +8 −0</li>
<li><code>.gitignore</code> modified +1 −0</li>
<li><code>README.md</code> modified +6 −2</li>
<li><code>docs/changelog.md</code> modified +7 −0</li>
<li><code>docs/configuration.md</code> modified +3 −3</li>
<li><code>docs/install.md</code> modified +3 −1</li>
<li><code>docs/tools.md</code> modified +10 −301</li>
<li><code>evals/README.md</code> added +51 −0</li>
<li><code>evals/fixtures/review-policy/policy.before.ts</code> added +193 −0</li>
<li><code>evals/fixtures/review-policy/policy.reference.ts</code> added +207 −0</li>
<li><code>evals/results/README.md</code> added +17 −0</li>
<li><code>evals/results/live-final.json</code> added +480 −0</li>
<li>38 more files on the pull request</li>
</ul>
<p><strong>Checks</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/38772463213/job/116551542267">publish</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/38772463213/job/116551541642">notify</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/38771987633/job/116549889818">check (windows-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/38771987633/job/116549889556">check (windows-latest, 20)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/38771987633/job/116549889410">check (ubuntu-latest, 20)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/38771987633/job/116549889104">check (ubuntu-latest, 22)</a> <code>success</code></li>
</ul>
<p><strong>Description</strong></p><p>## Problem and behavior The Jev companion skill depended on repository documentation and had no reproducible standalone package or real-agent evaluation path. This change makes the complete skill independently installable at `.agents/skills/jev-mcp` and adds bounded evaluations of the combined skill + live MCP workflow in Codex and the official Cursor CLI. ## Changes - Move canonical contracts into the skill&#x27;s contained references, preserve the previous documentation URL, and provide schema-che…</p>
</details>


## Open

No open pull requests.


## Merged

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/8">#8 Pin the newest pull request on the watch board — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>cursor/interactive-pr-watch-518e → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-09-21T17:59:12Z · 23d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-21T17:59:12Z · 23d ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-09-21T17:37:31Z · 23d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-21T17:37:31Z · 23d ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-09-19T11:22:46Z · 26d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-19T11:22:44Z · 26d ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-09-19T09:13:36Z · 26d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-19T09:12:30Z · 26d ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-09-18T18:37:36Z · 26d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-18T18:37:36Z · 26d ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-09-18T17:19:27Z · 26d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-18T17:19:27Z · 26d ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-09-18T16:39:12Z · 27d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-18T16:39:12Z · 27d ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-09-18T03:51:39Z · 27d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-18T03:51:39Z · 27d ago</td></tr>
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

Push to `main` `571f464`.

- Event: `push`
- Ref: `main` SHA [`571f464`](https://github.com/burnigtm/jev-mcp/commit/571f464565a1319abe52cb95120b37174ee53aba)

Search, filters, checks, commits, and files are on the interactive board next to this file. Follow-ups land in the **Jev_MCP Project** chat.

Live Actions: [Notify Jev_MCP](https://github.com/burnigtm/jev-mcp/actions/workflows/notify-jev-mcp.yml).

<!-- jev-watch:snapshot eyJwdWxscyI6W3sibnVtYmVyIjoxMCwidGl0bGUiOiJQYWNrYWdlIHBvcnRhYmxlIEpldiBza2lsbCBhbmQgYWRkIHJlYWwtYWdlbnQgZXZhbHVhdGlvbnMiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTAiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiY29kZXgvcG9ydGFibGUtc2tpbGwtZXZhbHMiLCJiYXNlIjoibWFpbiIsInNoYSI6ImZkMzQ3MDFlMTU1YjZjMjMwY2JhY2U0MTFkZjYyMzg4MDQwNWIxMzEiLCJtZXJnZV9jb21taXRfc2hhIjoiNTcxZjQ2NDU2NWExMzE5YWJlNTJjYjk1MTIwYjM3MTc0ZWU1M2FiYSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMTVUMTY6NDQ6NDZaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMTVUMTY6NTE6MjJaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0xNVQxNjo1MToyMloiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTE1VDE2OjUxOjIyWiIsImFkZGl0aW9ucyI6NTc2NSwiZGVsZXRpb25zIjozNjgsImNoYW5nZWRfZmlsZXMiOjUwLCJjb21taXRzX2NvdW50IjoyLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgUHJvYmxlbSBhbmQgYmVoYXZpb3IgVGhlIEpldiBjb21wYW5pb24gc2tpbGwgZGVwZW5kZWQgb24gcmVwb3NpdG9yeSBkb2N1bWVudGF0aW9uIGFuZCBoYWQgbm8gcmVwcm9kdWNpYmxlIHN0YW5kYWxvbmUgcGFja2FnZSBvciByZWFsLWFnZW50IGV2YWx1YXRpb24gcGF0aC4gVGhpcyBjaGFuZ2UgbWFrZXMgdGhlIGNvbXBsZXRlIHNraWxsIGluZGVwZW5kZW50bHkgaW5zdGFsbGFibGUgYXQgYC5hZ2VudHMvc2tpbGxzL2pldi1tY3BgIGFuZCBhZGRzIGJvdW5kZWQgZXZhbHVhdGlvbnMgb2YgdGhlIGNvbWJpbmVkIHNraWxsICsgbGl2ZSBNQ1Agd29ya2Zsb3cgaW4gQ29kZXggYW5kIHRoZSBvZmZpY2lhbCBDdXJzb3IgQ0xJLiAjIyBDaGFuZ2VzIC0gTW92ZSBjYW5vbmljYWwgY29udHJhY3RzIGluXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOlt7InNoYSI6IjA2MjhjNWQwODBkOWRjZjU5YmUzODdiYWFjNWJiZWY2ZjA1OTNmYWUiLCJtZXNzYWdlIjoiZmVhdDogcGFja2FnZSBwb3J0YWJsZSBKZXYgc2tpbGwgd2l0aCByZWFsLWFnZW50IGV2YWx1YXRpb25zIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvY29tbWl0LzA2MjhjNWQwODBkOWRjZjU5YmUzODdiYWFjNWJiZWY2ZjA1OTNmYWUifSx7InNoYSI6ImZkMzQ3MDFlMTU1YjZjMjMwY2JhY2U0MTFkZjYyMzg4MDQwNWIxMzEiLCJtZXNzYWdlIjoidGVzdDogcnVuIGV2aWRlbmNlIHByb3RvY29sIGNoZWNrcyBiZWZvcmUgcHJvZHVjdGlvbiBidWlsZCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2NvbW1pdC9mZDM0NzAxZTE1NWI2YzIzMGNiYWNlNDExZGY2MjM4ODA0MDViMTMxIn1dLCJmaWxlcyI6W3siZmlsZW5hbWUiOiIuZ2l0aHViL3dvcmtmbG93cy9jaS55bWwiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6OCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiLmdpdGlnbm9yZSIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJSRUFETUUubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NiwiZGVsZXRpb25zIjoyfSx7ImZpbGVuYW1lIjoiZG9jcy9jaGFuZ2Vsb2cubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jb25maWd1cmF0aW9uLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjMsImRlbGV0aW9ucyI6M30seyJmaWxlbmFtZSI6ImRvY3MvaW5zdGFsbC5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjozLCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJkb2NzL3Rvb2xzLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEwLCJkZWxldGlvbnMiOjMwMX0seyJmaWxlbmFtZSI6ImV2YWxzL1JFQURNRS5tZCIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo1MSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvZml4dHVyZXMvcmV2aWV3LXBvbGljeS9wb2xpY3kuYmVmb3JlLnRzIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjE5MywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvZml4dHVyZXMvcmV2aWV3LXBvbGljeS9wb2xpY3kucmVmZXJlbmNlLnRzIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjIwNywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9SRUFETUUubWQiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MTcsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvbGl2ZS1maW5hbC5qc29uIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjQ4MCwiZGVsZXRpb25zIjowfV0sImNoZWNrcyI6W3sibmFtZSI6InB1Ymxpc2giLCJzdGF0ZSI6ImluX3Byb2dyZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzM4NzcyNDYzMjEzL2pvYi8xMTY1NTE1NDIyNjcifSx7Im5hbWUiOiJub3RpZnkiLCJzdGF0ZSI6ImluX3Byb2dyZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzM4NzcyNDYzMjEzL2pvYi8xMTY1NTE1NDE2NDIifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy8zODc3MTk4NzYzMy9qb2IvMTE2NTQ5ODg5ODE4In0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvMzg3NzE5ODc2MzMvam9iLzExNjU0OTg4OTU1NiJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvMzg3NzE5ODc2MzMvam9iLzExNjU0OTg4OTQxMCJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvMzg3NzE5ODc2MzMvam9iLzExNjU0OTg4OTEwNCJ9XX0seyJudW1iZXIiOjgsInRpdGxlIjoiUGluIHRoZSBuZXdlc3QgcHVsbCByZXF1ZXN0IG9uIHRoZSB3YXRjaCBib2FyZCIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC84IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImN1cnNvci9pbnRlcmFjdGl2ZS1wci13YXRjaC01MThlIiwiYmFzZSI6Im1haW4iLCJzaGEiOiI0ODMzNjM0NmNkM2ZiNWViOTY1NTYxMjY1ZTBiZjNkMDU5ZWM1ZjBmIiwibWVyZ2VfY29tbWl0X3NoYSI6Ijk0NDhmNjEyMDAxNWYyZjZjNmRhZDcxMzdjN2YyMzQ1NDUyMDk5MTgiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTA5LTIxVDE3OjU5OjA2WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTA5LTIxVDE3OjU5OjEyWiIsIm1lcmdlZF9hdCI6IjIwMjYtMDktMjFUMTc6NTk6MTJaIiwiY2xvc2VkX2F0IjoiMjAyNi0wOS0yMVQxNzo1OToxMloiLCJhZGRpdGlvbnMiOjExMTgsImRlbGV0aW9ucyI6MTMzLCJjaGFuZ2VkX2ZpbGVzIjo2LCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSAtIFRoZSBHaXRIdWIgd2F0Y2ggYm9hcmQgYWx3YXlzIGxlYWRzIHdpdGggdGhlIGhpZ2hlc3QtbnVtYmVyZWQgcHVsbCByZXF1ZXN0LCBzbyB0aGUgbGF0ZXN0IG9uZSBzdGF5cyB2aXNpYmxlLiAtIEVhY2ggcHVsbCByZXF1ZXN0IHNob3dzIGF1dGhvciwgYnJhbmNoZXMsIGRpZmYgc2l6ZSwgY2hlY2tzLCByZXZpZXdzLCBjb21taXRzLCBhbmQgZmlsZXMuIC0gQSBmYWlsZWQgR2l0SHViIHJlYWQga2VlcHMgdGhlIGxhc3Qgc2F2ZWQgbGlzdCBhbmQgc2F5cyB0aGUgbGl2ZSBsaXN0IGlzIHVuYXZhaWxhYmxlLCBpbnN0ZWFkIG9mIGJsYW5raW5nIHRoZSBwYWdlIG9yIHByZXRlbmRpbmcgdGhlIGxpc3QgaXMgZW1wdHkuIC0gYGRvY3MvZ2l0aHViLXdhdGNoLmh0bWxgIGFkZHMgc2VhXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjo3LCJ0aXRsZSI6IkZpeCBqZXYtbWNwIGF1ZGl0IGZpbmRpbmdzIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzciLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiY3Vyc29yL2pldi1hdWRpdC1maXhlcy1vcHMiLCJiYXNlIjoibWFpbiIsInNoYSI6ImI5MmY5YTAxZjI0MTgwMjgxMjM5MTY2YzU1NTQ4NDkwNTFjOGFlNzEiLCJtZXJnZV9jb21taXRfc2hhIjoiN2NhZmM0MDJjYmQ3NzZjYWU1NTkwMjQxNWQ4NDQ4Mjk3MWRmMTdkNCIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMDktMjFUMTc6Mzc6MjVaIiwidXBkYXRlZF9hdCI6IjIwMjYtMDktMjFUMTc6Mzc6MzFaIiwibWVyZ2VkX2F0IjoiMjAyNi0wOS0yMVQxNzozNzozMVoiLCJjbG9zZWRfYXQiOiIyMDI2LTA5LTIxVDE3OjM3OjMxWiIsImFkZGl0aW9ucyI6OTY5LCJkZWxldGlvbnMiOjE1MSwiY2hhbmdlZF9maWxlcyI6MzUsImNvbW1pdHNfY291bnQiOjQsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IC0gR2l0SHViIG5vdGlmeSBubyBsb25nZXIgcnVucyBwdWxsLXJlcXVlc3QgaGVhZCBjb2RlLCBhbmQgaXQgcGlucyB0aGUgQVBJIGhvc3QuIC0gYGpldl9zdGVwYCBpZ25vcmVzIHRoZSBob3N0IGBwcmVwYXJlZF90b29sX2NhbGxgIGZsYWcsIGFuZCBlbXB0eSBjYW5kaWRhdGUgbGlzdHMgYXJlIG5vdCB0cmVhdGVkIGFzIGF1dG8uIC0gUmV2aWV3IGFuZCBnYXRlIHJlcXVpcmUgcGVyLWRpbWVuc2lvbiBmbG9vcnMuIC0gUmFuayBhdXRvIG5lZWRzIGEgZmluYWwtcm91bmQgZXhpc3RzIHJlc3VsdCBwbHVzIGEgY29oZXJlbnQgYmVzdC4gLSBUeXBlU2FmZSB0aW1lb3V0IGFuZCBiYXNlIFVSTCBhcmUgYm91bmRlZC4gLSBQZXItY2FsbCBmbG9vcnMgY2FuIG9ubHkgdGlnaHRlbi4gLVx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6NiwidGl0bGUiOiJ0ZXN0OiBhZGQgTUNQIHBlcmZvcm1hbmNlIGJlbmNobWFyayBzdWl0ZSIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC82IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImNvZGV4L3ByMi1yb3V0aW5nLWZvbGxvd3VwIiwiYmFzZSI6Im1haW4iLCJzaGEiOiIyNjE0NGFiNTAzNjBmNTUwNTE0MTQxYjczM2ZjYmFkZjBhYjQ3YTI2IiwibWVyZ2VfY29tbWl0X3NoYSI6IjRmNGFlMTFhNWUxZTlhNTAyY2RjNDMyNTUwZDg3OGY3Mjg4NTE4MjAiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTA5LTE5VDEwOjMyOjM2WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTA5LTE5VDExOjIyOjQ2WiIsIm1lcmdlZF9hdCI6IjIwMjYtMDktMTlUMTE6MjI6NDRaIiwiY2xvc2VkX2F0IjoiMjAyNi0wOS0xOVQxMToyMjo0NFoiLCJhZGRpdGlvbnMiOjI5NiwiZGVsZXRpb25zIjoxLCJjaGFuZ2VkX2ZpbGVzIjo3LCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSAtIEFkZCBhbiBvcHQtaW4gYmVuY2htYXJrIGZvciB0aGUgY29tcGlsZWQgTUNQIHN0ZGlvIHRyYW5zcG9ydC4gLSBNZWFzdXJlIGFsbCBuaW5lIHRvb2xzIHdpdGggc2VxdWVudGlhbCwgY29uY3VycmVudCwgc3RhcnR1cCwgbGF0ZW5jeSwgdGhyb3VnaHB1dCwgcGF5bG9hZC1zaXplLCBhbmQgY2FuZGlkYXRlLWNvdW50IHNjZW5hcmlvcy4gLSBBZGQgZGV0ZXJtaW5pc3RpYyBtb2NrLW1vZGUgQ0kgc2FuaXR5IGJ1ZGdldHMgYW5kIEpTT04gb3V0cHV0IGZvciBhdXRvbWF0aW9uLiAtIEFkZCBiZW5jaG1hcmsgaGVscGVyIHRlc3RzLCBkb2N1bWVudGF0aW9uLCBhbmQgYSBzY2hlZHVsZWQvbWFudWFsIEdpdEh1YiBBY3Rpb25zIHdvcmtmbG93IGFjcm9zcyBVYnVudHUvV2luZG93cyBhXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjo1LCJ0aXRsZSI6IkhhcmRlbiByb3V0aW5nIGFuZCBleHBvc2UgdHlwZWQgTUNQIG91dHB1dHMiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvNSIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJjb2RleC9wcjItcm91dGluZy1mb2xsb3d1cCIsImJhc2UiOiJtYWluIiwic2hhIjoiMWJlNmU3NTI5ZmQ5ZGRmYWIxNWM5ODI0ZmI3OGIyMWM4NzFkNzUyZCIsIm1lcmdlX2NvbW1pdF9zaGEiOiI1ZDVmYjZiM2IxNDk5MGQ0NzIxOWJkYjg3MDAxNzJiMzQxMGU0NThhIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0wOS0xOVQwODo1ODoyMVoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0wOS0xOVQwOToxMzozNloiLCJtZXJnZWRfYXQiOiIyMDI2LTA5LTE5VDA5OjEyOjMwWiIsImNsb3NlZF9hdCI6IjIwMjYtMDktMTlUMDk6MTI6MzBaIiwiYWRkaXRpb25zIjo0NDksImRlbGV0aW9ucyI6NzAsImNoYW5nZWRfZmlsZXMiOjI2LCJjb21taXRzX2NvdW50Ijo1LCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBIYXJkZW4gSmV2IHJvdXRpbmcgYW5kIE1DUCBpbnRlcm9wZXJhYmlsaXR5IHdoaWxlIHByZXNlcnZpbmcgdGhlIEdpdEh1YiBldmVudC1kZWxpdmVyeSB3b3JrZmxvdy4gIyMgQ2hhbmdlcyAtIFJlcXVpcmUgcHJvYmFiaWxpdHkgZGlzdHJpYnV0aW9ucyB0byBzdXBwb3J0IHJlcG9ydGVkIGNvbmZpZGVuY2UgYmVmb3JlIGFueSBhdXRvbWF0aWMgcG9saWN5IGRlY2lzaW9uLiAtIEFwcGx5IHRoZSBjb2hlcmVuY2UgZ3VhcmQgdG8gZXZhbHVhdGUsIGNvZGluZy1sb29wLCByZXZpZXcsIHZlcmlmeSwgYW5kIGdhdGUgcGF0aHMuIC0gQWRkIHR5cGVkIE1DUCBvdXRwdXQgc2NoZW1hcyBhbmQgc3RydWN0dXJlZENvbnRlbnQgcGFyaXR5IGZvciBhbGwgbmluZSB0b29scywgaW5jbHVkaW5nXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjo0LCJ0aXRsZSI6IkFkZCBqZXZfc3RlcDogb25lIHJlcXVlc3QgZm9yIHRoZSBjb2RpbmctbG9vcCB0dXJuIGFuZCB0aGUgcHJlcGFyZWQtY2FsbCBzZWxlY3Rpb24iLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvNCIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJjdXJzb3IvZnVzZWQtamV2LXN0ZXAtcm91dGVyLWJkZTgiLCJiYXNlIjoibWFpbiIsInNoYSI6IjA1MzI1YWU4Mjg1YmNiMzJkMjc4NjRjNDExYTMxMzNmN2Q2NTY5MDIiLCJtZXJnZV9jb21taXRfc2hhIjoiZGQyZTYzOWY3NGRiOTQwYzZhZWU5OTRmZTZkYjViZDIxZDFlYzZlZSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMDktMThUMTg6MzQ6NDBaIiwidXBkYXRlZF9hdCI6IjIwMjYtMDktMThUMTg6Mzc6MzZaIiwibWVyZ2VkX2F0IjoiMjAyNi0wOS0xOFQxODozNzozNloiLCJjbG9zZWRfYXQiOiIyMDI2LTA5LTE4VDE4OjM3OjM2WiIsImFkZGl0aW9ucyI6ODU4LCJkZWxldGlvbnMiOjkyLCJjaGFuZ2VkX2ZpbGVzIjoxOSwiY29tbWl0c19jb3VudCI6MiwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFdoYXQgQWRkcyBgamV2X3N0ZXBgLCBhIG5pbnRoIE1DUCB0b29sIHRoYXQgYW5zd2VycyB0aGUgY29kaW5nLWxvb3AgYW5kIHByZXBhcmVkLWNhbGwgcmVjaXBlcyBpbiAqKm9uZSoqIEpldiByZXF1ZXN0LiBUb2RheSBhIGxvb3AgaXRlcmF0aW9uIGNvc3RzIHR3byBNQ1Agcm91bmQtdHJpcHM6IGBqZXZfY29kaW5nX2xvb3BgIHJldHVybnMgYGhhbmRvZmY6IHVzZV90b29sc2AsIHRoZW4gdGhlIGhvc3QgY2FsbHMgYGpldl90b29sX3JvdXRlYCB0byBsZWFybiAqd2hpY2gqIHByZXBhcmVkIGNhbGwgdG8gcnVuLiBFYWNoIHJvdW5kLXRyaXAgc3BlbmRzIGEgaG9zdC1tb2RlbCB0dXJuIHRvIGlzc3VlIHRoZSBjYWxsIGFuZCBpbnRlcnByZXQgdGhlIEpTT04uIFR5cGVTYWZlIGV2YWx1YXRlcyBldlx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MywidGl0bGUiOiJGaXggcm91dGluZyBjb25maWRlbmNlIGdhcHMgYW5kIHByb2JhYmlsaXR5IGJvdW5kYXJpZXMgZnJvbSBQUiAjMiIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8zIiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImNvZGV4L3ByMi1yb3V0aW5nLWZvbGxvd3VwIiwiYmFzZSI6Im1haW4iLCJzaGEiOiIzMWFhNDlhOWU5OTkzNDlhZDAxNTczZGM2NWEwZjNhMWQ0Yzg0ZjIwIiwibWVyZ2VfY29tbWl0X3NoYSI6IjQ3MmU1MzJhODQ3OGVlMzYwZjBlOWFkY2FmZDY5NTZjMmNlMTQ2YmMiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTA5LTE4VDE2OjQ4OjIwWiIsInVwZGF0ZWRfYXQiOiIyMDI2LTA5LTE4VDE3OjE5OjI3WiIsIm1lcmdlZF9hdCI6IjIwMjYtMDktMThUMTc6MTk6MjdaIiwiY2xvc2VkX2F0IjoiMjAyNi0wOS0xOFQxNzoxOToyN1oiLCJhZGRpdGlvbnMiOjEyNSwiZGVsZXRpb25zIjo4LCJjaGFuZ2VkX2ZpbGVzIjo4LCJjb21taXRzX2NvdW50IjoyLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiUFIgIzIgaXMgbWVyZ2VkIGFuZCBpdHMgZXhpc3RpbmcgY2hlY2tzIHBhc3NlZCwgYnV0IHJldmlldyByZXByb2R1Y2VkIHR3byByb3V0aW5nIGdhcHM6IC0gQSBwcm92aWRlciBjYW4gcmVwb3J0IGhpZ2ggY29uZmlkZW5jZSBhbG9uZ3NpZGUgYSB0aWVkIG9yIHdlYWsgcHJvYmFiaWxpdHkgZGlzdHJpYnV0aW9uLiBUaGUgcHJlcGFyZWQtY2FsbCByb3V0ZXIgY291bGQgc3RpbGwgcmV0dXJuIGBleGVjdXRlX3Rvb2xgLCBhbmQgdGhlIGNvZGluZyBsb29wIGNvdWxkIHJlcXVlc3QgYSBwYXJ0bmVyLiBCb3RoIG5vdyByZXF1aXJlIGFuIGluZGVwZW5kZW50IGRpc3RyaWJ1dGlvbi1jb25jZW50cmF0aW9uIGNoZWNrIGluIGFkZGl0aW9uIHRvIHRoZSBleGlzdGluZyBjb25maWRlbmNlIGZsb29yLiBUaGlzXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoyLCJ0aXRsZSI6IkhhcmRlbiBKZXYgcmVsaWFiaWxpdHkgYW5kIGNvbXBsZXRpb24gZ2F0ZXMiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMiIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJjb2RleC9yZWxpYWJpbGl0eS1hbmQtY29tcGxldGlvbi1nYXRlIiwiYmFzZSI6Im1haW4iLCJzaGEiOiJiYWYyOTQ3OWFkZjQ0MTNlOWZjNTI3ZDY4ZWEwMzYwNjU3YTI5YjJhIiwibWVyZ2VfY29tbWl0X3NoYSI6IjJmOWVkY2RiMTY0YzdhYWE5NjlkMDNiZjc3ZDMzYWFlMzZiZTMwZTgiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTA5LTE4VDE2OjM2OjU2WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTA5LTE4VDE2OjM5OjEyWiIsIm1lcmdlZF9hdCI6IjIwMjYtMDktMThUMTY6Mzk6MTJaIiwiY2xvc2VkX2F0IjoiMjAyNi0wOS0xOFQxNjozOToxMloiLCJhZGRpdGlvbnMiOjExMjgsImRlbGV0aW9ucyI6MzcsImNoYW5nZWRfZmlsZXMiOjE3LCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSAtIEFkZCB0eXBlZCByb3V0aW5nLCBwb2xpY3ksIGxpbWl0cywgc2NyZWVuaW5nLCByYW5raW5nLCByZXZpZXcsIHZlcmlmaWNhdGlvbiwgYW5kIGNvZGluZy1sb29wIHNhZmVndWFyZHMgLSBFeHBhbmQgcGFja3MsIG1vY2sgc3VwcG9ydCwgY29uZmlndXJhdGlvbiwgQ0xJIGJlaGF2aW9yLCBkb2N1bWVudGF0aW9uLCBhbmQgQ0kgY292ZXJhZ2UgLSBBZGQgY29tcHJlaGVuc2l2ZSB1bml0LCBpbnRlZ3JhdGlvbiwgaW5zdGFsbGVyLCB0cmFuc3BvcnQsIGFuZCBsaXZlIGVuZC10by1lbmQgdGVzdHMgIyMgVGVzdGluZyAtIENvbXByZWhlbnNpdmUgdGVzdCBzdWl0ZSBjb3ZlcmluZyBDTEksIHJ1bnRpbWUsIE1DUCB0cmFuc3BvcnQsIHBvbGljeSwgbGltaXRzLCB0b29scywgcGFja3MsXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoxLCJ0aXRsZSI6IkhhcmRlbiBKZXYgcmVsaWFiaWxpdHkgYW5kIGFkZCBhIGNvbWJpbmVkIGNvbXBsZXRpb24gZ2F0ZSIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xIiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImNvZGV4L3JlbGlhYmlsaXR5LWFuZC1jb21wbGV0aW9uLWdhdGUiLCJiYXNlIjoibWFpbiIsInNoYSI6IjI2ZmRjZDIzMWQ3YzU1YzI1ZDNkZTBiY2ViYjE2YWM1ODkwYjNlYjEiLCJtZXJnZV9jb21taXRfc2hhIjoiYzYxOWUxMDEyOTZhYzA4ODc1YzVmNGNlZjc3MmUzZGQyY2Q2NjM4ZiIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMDktMThUMDM6MzY6NDJaIiwidXBkYXRlZF9hdCI6IjIwMjYtMDktMThUMDM6NTE6MzlaIiwibWVyZ2VkX2F0IjoiMjAyNi0wOS0xOFQwMzo1MTozOVoiLCJjbG9zZWRfYXQiOiIyMDI2LTA5LTE4VDAzOjUxOjM5WiIsImFkZGl0aW9ucyI6MjA0NywiZGVsZXRpb25zIjo0NjIsImNoYW5nZWRfZmlsZXMiOjQ1LCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBMYXJnZSBvciB0cnVuY2F0ZWQgaW5wdXRzIGNvdWxkIHByZXZpb3VzbHkgcHJvZHVjZSBhdXRvbWF0aWMgZGVjaXNpb25zIHdpdGhvdXQgY29tcGxldGUgY29udGV4dCwgcmFua2luZyBjb3VsZCBsb3NlIGNhbmRpZGF0ZSBpZGVudGl0eSBvciBleGNlZWQgcmVxdWVzdCBsaW1pdHMsIGFuZCB1cHN0cmVhbSBmYWlsdXJlcyB3ZXJlIG5vdCBjb25zaXN0ZW50bHkgYm91bmRlZCBvciB2YWxpZGF0ZWQuIFRoaXMgY2hhbmdlIG1ha2VzIHRob3NlIGNhc2VzIGV4cGxpY2l0IGFuZCBhZGRzIGEgY29tYmluZWQgY29tcGxldGlvbiBnYXRlLiAtIEFkZCBgamV2X2dhdGVgIGFuZCBpdHMgcXVlc3Rpb24tcGFjayByZXNvdXJjZSB0byByZXZpZXcgYSBkaWZmIGFuZCB2ZXJpZnkgY29tcGxldGlvXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119XX0= -->
