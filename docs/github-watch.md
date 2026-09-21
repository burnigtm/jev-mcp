# Jev_MCP GitHub watch

**Latest pull request:** [#7 Fix jev-mcp audit findings](https://github.com/burnigtm/jev-mcp/pull/7) — **merged** 2026-09-21T17:37:31Z · 11m ago · burnigtm · `cursor/jev-audit-fixes-ops` → `main` · +969 −151 · 35 files.

Open **0** · Merged **7** · Closed **0** · [Interactive board](github-watch.html)

This is the **Cursor Project dashboard** for [burnigtm/jev-mcp](https://github.com/burnigtm/jev-mcp). Open **Projects → Jev_MCP** (not the Agents list). The latest pull request stays at the top even when the list is long. GitHub Actions refreshes this file on branch `cursor-watch`.

| | |
| --- | --- |
| **Last refresh** | 2026-09-21T17:48:44Z |
| **Data** | GitHub API |
| **Last GitHub event** | `push` |
| **Open PRs** | none |
| **Merged (recent)** | [#7](https://github.com/burnigtm/jev-mcp/pull/7) Fix jev-mcp audit findings, [#6](https://github.com/burnigtm/jev-mcp/pull/6) test: add MCP performance benchmark suite, [#5](https://github.com/burnigtm/jev-mcp/pull/5) Harden routing and expose typed MCP outputs, [#4](https://github.com/burnigtm/jev-mcp/pull/4) Add jev_step: one request for the coding-loop turn and the prepared-call selection, [#3](https://github.com/burnigtm/jev-mcp/pull/3) Fix routing confidence gaps and probability boundaries from PR #2 |
| **GitHub `main`** | [`b92f9a0`](https://github.com/burnigtm/jev-mcp/commit/b92f9a01f24180281239166c5554849051c8ae71) |
| **Cursor target** | `bc-c78e565c-bc13-4d27-ada8-cc5e7e04eb9e` |

## Latest

<details open>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/7">#7 Fix jev-mcp audit findings — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>cursor/jev-audit-fixes-ops → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-09-21T17:37:31Z · 11m ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-21T17:37:31Z · 11m ago</td></tr>
<tr><td><strong>Diff</strong></td><td>+969 −151 · 35 files</td></tr>
<tr><td><strong>Commits</strong></td><td>4</td></tr>
<tr><td><strong>Checks</strong></td><td>3 failing · 6 checks</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/b92f9a01f24180281239166c5554849051c8ae71"><code>b92f9a0</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/7cafc402cbd776cae55902415d84482971df17d4"><code>7cafc40</code></a></td></tr>
</table>
<p><strong>Commits</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/23f72a982817f50d54090e9d52fe77c7c5217214"><code>23f72a9</code></a> fix: detach GitHub notify from pull-request code</li>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/c4de6895bf14f2387ef9e87f7bf654e5a102fb29"><code>c4de689</code></a> fix: stop policy auto from skipping failed checks</li>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/110bd97f564dcd60b619014903a495f3ce7d21f9"><code>110bd97</code></a> fix: bound the TypeSafe client and per-call floors</li>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/b92f9a01f24180281239166c5554849051c8ae71"><code>b92f9a0</code></a> fix: keep benchmark env and dashboard output bounded</li>
</ul>
<p><strong>Files</strong></p><ul>
<li><code>.env.example</code> modified +1 −0</li>
<li><code>.github/workflows/notify-jev-mcp.yml</code> modified +40 −3</li>
<li><code>docs/changelog.md</code> modified +28 −0</li>
<li><code>docs/configuration.md</code> modified +12 −9</li>
<li><code>docs/tools.md</code> modified +3 −3</li>
<li><code>scripts/benchmark.mjs</code> modified +12 −3</li>
<li><code>scripts/notify-jev-mcp-event.py</code> modified +88 −31</li>
<li><code>scripts/publish-github-watch-dashboard.py</code> modified +19 −2</li>
<li><code>scripts/write-github-watch-dashboard.py</code> modified +23 −11</li>
<li><code>skills/jev-mcp/SKILL.md</code> modified +1 −1</li>
<li><code>src/cli.ts</code> modified +2 −8</li>
<li><code>src/config.ts</code> modified +96 −6</li>
<li>23 more files on the pull request</li>
</ul>
<p><strong>Checks</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/35633204704/job/106444176339">notify</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/35633204704/job/106444176110">publish</a> <code>failure</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/35633196352/job/106444146800">check (ubuntu-latest, 20)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/35633196352/job/106444146781">check (windows-latest, 20)</a> <code>failure</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/35633196352/job/106444146660">check (ubuntu-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/35633196352/job/106444146287">check (windows-latest, 22)</a> <code>failure</code></li>
</ul>
<p><strong>Description</strong></p><p>## Summary - GitHub notify no longer runs pull-request head code, and it pins the API host. - `jev_step` ignores the host `prepared_tool_call` flag, and empty candidate lists are not treated as auto. - Review and gate require per-dimension floors. - Rank auto needs a final-round exists result plus a coherent best. - TypeSafe timeout and base URL are bounded. - Per-call floors can only tighten. - The benchmark does not inherit `GITHUB_TOKEN`. - Dashboard titles are escaped. Mock tests passed (15…</p>
</details>


## Open

No open pull requests.


## Merged

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/6">#6 test: add MCP performance benchmark suite — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>codex/pr2-routing-followup → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-09-19T11:22:46Z · 2d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-19T11:22:44Z · 2d ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-09-19T09:13:36Z · 2d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-19T09:12:30Z · 2d ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-09-18T18:37:36Z · 2d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-18T18:37:36Z · 2d ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-09-18T17:19:27Z · 3d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-18T17:19:27Z · 3d ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-09-18T16:39:12Z · 3d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-18T16:39:12Z · 3d ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-09-18T03:51:39Z · 3d ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-09-18T03:51:39Z · 3d ago</td></tr>
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

[PR #7](https://github.com/burnigtm/jev-mcp/pull/7) Fix jev-mcp audit findings

- Event: `push`
- Ref: `main` SHA [`b92f9a0`](https://github.com/burnigtm/jev-mcp/commit/b92f9a01f24180281239166c5554849051c8ae71)

Search, filters, checks, commits, and files are on the interactive board next to this file. Follow-ups land in the **Jev_MCP Project** chat.

Live Actions: [Notify Jev_MCP](https://github.com/burnigtm/jev-mcp/actions/workflows/notify-jev-mcp.yml).

<!-- jev-watch:snapshot eyJwdWxscyI6W3sibnVtYmVyIjo3LCJ0aXRsZSI6IkZpeCBqZXYtbWNwIGF1ZGl0IGZpbmRpbmdzIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzciLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiY3Vyc29yL2pldi1hdWRpdC1maXhlcy1vcHMiLCJiYXNlIjoibWFpbiIsInNoYSI6ImI5MmY5YTAxZjI0MTgwMjgxMjM5MTY2YzU1NTQ4NDkwNTFjOGFlNzEiLCJtZXJnZV9jb21taXRfc2hhIjoiN2NhZmM0MDJjYmQ3NzZjYWU1NTkwMjQxNWQ4NDQ4Mjk3MWRmMTdkNCIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMDktMjFUMTc6Mzc6MjVaIiwidXBkYXRlZF9hdCI6IjIwMjYtMDktMjFUMTc6Mzc6MzFaIiwibWVyZ2VkX2F0IjoiMjAyNi0wOS0yMVQxNzozNzozMVoiLCJjbG9zZWRfYXQiOiIyMDI2LTA5LTIxVDE3OjM3OjMxWiIsImFkZGl0aW9ucyI6OTY5LCJkZWxldGlvbnMiOjE1MSwiY2hhbmdlZF9maWxlcyI6MzUsImNvbW1pdHNfY291bnQiOjQsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IC0gR2l0SHViIG5vdGlmeSBubyBsb25nZXIgcnVucyBwdWxsLXJlcXVlc3QgaGVhZCBjb2RlLCBhbmQgaXQgcGlucyB0aGUgQVBJIGhvc3QuIC0gYGpldl9zdGVwYCBpZ25vcmVzIHRoZSBob3N0IGBwcmVwYXJlZF90b29sX2NhbGxgIGZsYWcsIGFuZCBlbXB0eSBjYW5kaWRhdGUgbGlzdHMgYXJlIG5vdCB0cmVhdGVkIGFzIGF1dG8uIC0gUmV2aWV3IGFuZCBnYXRlIHJlcXVpcmUgcGVyLWRpbWVuc2lvbiBmbG9vcnMuIC0gUmFuayBhdXRvIG5lZWRzIGEgZmluYWwtcm91bmQgZXhpc3RzIHJlc3VsdCBwbHVzIGEgY29oZXJlbnQgYmVzdC4gLSBUeXBlU2FmZSB0aW1lb3V0IGFuZCBiYXNlIFVSTCBhcmUgYm91bmRlZC4gLSBQZXItY2FsbCBmbG9vcnMgY2FuIG9ubHkgdGlnaHRlbi4gLVx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbeyJzaGEiOiIyM2Y3MmE5ODI4MTdmNTBkNTQwOTBlOWQ1MmZlNzdjN2M1MjE3MjE0IiwibWVzc2FnZSI6ImZpeDogZGV0YWNoIEdpdEh1YiBub3RpZnkgZnJvbSBwdWxsLXJlcXVlc3QgY29kZSIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2NvbW1pdC8yM2Y3MmE5ODI4MTdmNTBkNTQwOTBlOWQ1MmZlNzdjN2M1MjE3MjE0In0seyJzaGEiOiJjNGRlNjg5NWJmMTRmMjM4N2VmOWU4N2Y3YmY2NTRlNWExMDJmYjI5IiwibWVzc2FnZSI6ImZpeDogc3RvcCBwb2xpY3kgYXV0byBmcm9tIHNraXBwaW5nIGZhaWxlZCBjaGVja3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9jb21taXQvYzRkZTY4OTViZjE0ZjIzODdlZjllODdmN2JmNjU0ZTVhMTAyZmIyOSJ9LHsic2hhIjoiMTEwYmQ5N2Y1NjRkY2Q2MGI2MTkwMTQ5MDNhNDk1ZjNjZTdkMjFmOSIsIm1lc3NhZ2UiOiJmaXg6IGJvdW5kIHRoZSBUeXBlU2FmZSBjbGllbnQgYW5kIHBlci1jYWxsIGZsb29ycyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2NvbW1pdC8xMTBiZDk3ZjU2NGRjZDYwYjYxOTAxNDkwM2E0OTVmM2NlN2QyMWY5In0seyJzaGEiOiJiOTJmOWEwMWYyNDE4MDI4MTIzOTE2NmM1NTU0ODQ5MDUxYzhhZTcxIiwibWVzc2FnZSI6ImZpeDoga2VlcCBiZW5jaG1hcmsgZW52IGFuZCBkYXNoYm9hcmQgb3V0cHV0IGJvdW5kZWQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9jb21taXQvYjkyZjlhMDFmMjQxODAyODEyMzkxNjZjNTU1NDg0OTA1MWM4YWU3MSJ9XSwiZmlsZXMiOlt7ImZpbGVuYW1lIjoiLmVudi5leGFtcGxlIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6Ii5naXRodWIvd29ya2Zsb3dzL25vdGlmeS1qZXYtbWNwLnltbCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo0MCwiZGVsZXRpb25zIjozfSx7ImZpbGVuYW1lIjoiZG9jcy9jaGFuZ2Vsb2cubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MjgsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImRvY3MvY29uZmlndXJhdGlvbi5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxMiwiZGVsZXRpb25zIjo5fSx7ImZpbGVuYW1lIjoiZG9jcy90b29scy5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjozLCJkZWxldGlvbnMiOjN9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2JlbmNobWFyay5tanMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTIsImRlbGV0aW9ucyI6M30seyJmaWxlbmFtZSI6InNjcmlwdHMvbm90aWZ5LWpldi1tY3AtZXZlbnQucHkiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6ODgsImRlbGV0aW9ucyI6MzF9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL3B1Ymxpc2gtZ2l0aHViLXdhdGNoLWRhc2hib2FyZC5weSIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxOSwiZGVsZXRpb25zIjoyfSx7ImZpbGVuYW1lIjoic2NyaXB0cy93cml0ZS1naXRodWItd2F0Y2gtZGFzaGJvYXJkLnB5Iiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjIzLCJkZWxldGlvbnMiOjExfSx7ImZpbGVuYW1lIjoic2tpbGxzL2pldi1tY3AvU0tJTEwubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MSwiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoic3JjL2NsaS50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoyLCJkZWxldGlvbnMiOjh9LHsiZmlsZW5hbWUiOiJzcmMvY29uZmlnLnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjk2LCJkZWxldGlvbnMiOjZ9XSwiY2hlY2tzIjpbeyJuYW1lIjoibm90aWZ5Iiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzM1NjMzMjA0NzA0L2pvYi8xMDY0NDQxNzYzMzkifSx7Im5hbWUiOiJwdWJsaXNoIiwic3RhdGUiOiJmYWlsdXJlIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzM1NjMzMjA0NzA0L2pvYi8xMDY0NDQxNzYxMTAifSx7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjApIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzM1NjMzMTk2MzUyL2pvYi8xMDY0NDQxNDY4MDAifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIwKSIsInN0YXRlIjoiZmFpbHVyZSIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy8zNTYzMzE5NjM1Mi9qb2IvMTA2NDQ0MTQ2NzgxIn0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy8zNTYzMzE5NjM1Mi9qb2IvMTA2NDQ0MTQ2NjYwIn0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6ImZhaWx1cmUiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvMzU2MzMxOTYzNTIvam9iLzEwNjQ0NDE0NjI4NyJ9XX0seyJudW1iZXIiOjYsInRpdGxlIjoidGVzdDogYWRkIE1DUCBwZXJmb3JtYW5jZSBiZW5jaG1hcmsgc3VpdGUiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvNiIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJjb2RleC9wcjItcm91dGluZy1mb2xsb3d1cCIsImJhc2UiOiJtYWluIiwic2hhIjoiMjYxNDRhYjUwMzYwZjU1MDUxNDE0MWI3MzNmY2JhZGYwYWI0N2EyNiIsIm1lcmdlX2NvbW1pdF9zaGEiOiI0ZjRhZTExYTVlMWU5YTUwMmNkYzQzMjU1MGQ4NzhmNzI4ODUxODIwIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0wOS0xOVQxMDozMjozNloiLCJ1cGRhdGVkX2F0IjoiMjAyNi0wOS0xOVQxMToyMjo0NloiLCJtZXJnZWRfYXQiOiIyMDI2LTA5LTE5VDExOjIyOjQ0WiIsImNsb3NlZF9hdCI6IjIwMjYtMDktMTlUMTE6MjI6NDRaIiwiYWRkaXRpb25zIjoyOTYsImRlbGV0aW9ucyI6MSwiY2hhbmdlZF9maWxlcyI6NywiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgLSBBZGQgYW4gb3B0LWluIGJlbmNobWFyayBmb3IgdGhlIGNvbXBpbGVkIE1DUCBzdGRpbyB0cmFuc3BvcnQuIC0gTWVhc3VyZSBhbGwgbmluZSB0b29scyB3aXRoIHNlcXVlbnRpYWwsIGNvbmN1cnJlbnQsIHN0YXJ0dXAsIGxhdGVuY3ksIHRocm91Z2hwdXQsIHBheWxvYWQtc2l6ZSwgYW5kIGNhbmRpZGF0ZS1jb3VudCBzY2VuYXJpb3MuIC0gQWRkIGRldGVybWluaXN0aWMgbW9jay1tb2RlIENJIHNhbml0eSBidWRnZXRzIGFuZCBKU09OIG91dHB1dCBmb3IgYXV0b21hdGlvbi4gLSBBZGQgYmVuY2htYXJrIGhlbHBlciB0ZXN0cywgZG9jdW1lbnRhdGlvbiwgYW5kIGEgc2NoZWR1bGVkL21hbnVhbCBHaXRIdWIgQWN0aW9ucyB3b3JrZmxvdyBhY3Jvc3MgVWJ1bnR1L1dpbmRvd3MgYVx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6NSwidGl0bGUiOiJIYXJkZW4gcm91dGluZyBhbmQgZXhwb3NlIHR5cGVkIE1DUCBvdXRwdXRzIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzUiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiY29kZXgvcHIyLXJvdXRpbmctZm9sbG93dXAiLCJiYXNlIjoibWFpbiIsInNoYSI6IjFiZTZlNzUyOWZkOWRkZmFiMTVjOTgyNGZiNzhiMjFjODcxZDc1MmQiLCJtZXJnZV9jb21taXRfc2hhIjoiNWQ1ZmI2YjNiMTQ5OTBkNDcyMTliZGI4NzAwMTcyYjM0MTBlNDU4YSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMDktMTlUMDg6NTg6MjFaIiwidXBkYXRlZF9hdCI6IjIwMjYtMDktMTlUMDk6MTM6MzZaIiwibWVyZ2VkX2F0IjoiMjAyNi0wOS0xOVQwOToxMjozMFoiLCJjbG9zZWRfYXQiOiIyMDI2LTA5LTE5VDA5OjEyOjMwWiIsImFkZGl0aW9ucyI6NDQ5LCJkZWxldGlvbnMiOjcwLCJjaGFuZ2VkX2ZpbGVzIjoyNiwiY29tbWl0c19jb3VudCI6NSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgSGFyZGVuIEpldiByb3V0aW5nIGFuZCBNQ1AgaW50ZXJvcGVyYWJpbGl0eSB3aGlsZSBwcmVzZXJ2aW5nIHRoZSBHaXRIdWIgZXZlbnQtZGVsaXZlcnkgd29ya2Zsb3cuICMjIENoYW5nZXMgLSBSZXF1aXJlIHByb2JhYmlsaXR5IGRpc3RyaWJ1dGlvbnMgdG8gc3VwcG9ydCByZXBvcnRlZCBjb25maWRlbmNlIGJlZm9yZSBhbnkgYXV0b21hdGljIHBvbGljeSBkZWNpc2lvbi4gLSBBcHBseSB0aGUgY29oZXJlbmNlIGd1YXJkIHRvIGV2YWx1YXRlLCBjb2RpbmctbG9vcCwgcmV2aWV3LCB2ZXJpZnksIGFuZCBnYXRlIHBhdGhzLiAtIEFkZCB0eXBlZCBNQ1Agb3V0cHV0IHNjaGVtYXMgYW5kIHN0cnVjdHVyZWRDb250ZW50IHBhcml0eSBmb3IgYWxsIG5pbmUgdG9vbHMsIGluY2x1ZGluZ1x1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6NCwidGl0bGUiOiJBZGQgamV2X3N0ZXA6IG9uZSByZXF1ZXN0IGZvciB0aGUgY29kaW5nLWxvb3AgdHVybiBhbmQgdGhlIHByZXBhcmVkLWNhbGwgc2VsZWN0aW9uIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzQiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiY3Vyc29yL2Z1c2VkLWpldi1zdGVwLXJvdXRlci1iZGU4IiwiYmFzZSI6Im1haW4iLCJzaGEiOiIwNTMyNWFlODI4NWJjYjMyZDI3ODY0YzQxMWEzMTMzZjdkNjU2OTAyIiwibWVyZ2VfY29tbWl0X3NoYSI6ImRkMmU2MzlmNzRkYjk0MGM2YWVlOTk0ZmU2ZGI1YmQyMWQxZWM2ZWUiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTA5LTE4VDE4OjM0OjQwWiIsInVwZGF0ZWRfYXQiOiIyMDI2LTA5LTE4VDE4OjM3OjM2WiIsIm1lcmdlZF9hdCI6IjIwMjYtMDktMThUMTg6Mzc6MzZaIiwiY2xvc2VkX2F0IjoiMjAyNi0wOS0xOFQxODozNzozNloiLCJhZGRpdGlvbnMiOjg1OCwiZGVsZXRpb25zIjo5MiwiY2hhbmdlZF9maWxlcyI6MTksImNvbW1pdHNfY291bnQiOjIsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBXaGF0IEFkZHMgYGpldl9zdGVwYCwgYSBuaW50aCBNQ1AgdG9vbCB0aGF0IGFuc3dlcnMgdGhlIGNvZGluZy1sb29wIGFuZCBwcmVwYXJlZC1jYWxsIHJlY2lwZXMgaW4gKipvbmUqKiBKZXYgcmVxdWVzdC4gVG9kYXkgYSBsb29wIGl0ZXJhdGlvbiBjb3N0cyB0d28gTUNQIHJvdW5kLXRyaXBzOiBgamV2X2NvZGluZ19sb29wYCByZXR1cm5zIGBoYW5kb2ZmOiB1c2VfdG9vbHNgLCB0aGVuIHRoZSBob3N0IGNhbGxzIGBqZXZfdG9vbF9yb3V0ZWAgdG8gbGVhcm4gKndoaWNoKiBwcmVwYXJlZCBjYWxsIHRvIHJ1bi4gRWFjaCByb3VuZC10cmlwIHNwZW5kcyBhIGhvc3QtbW9kZWwgdHVybiB0byBpc3N1ZSB0aGUgY2FsbCBhbmQgaW50ZXJwcmV0IHRoZSBKU09OLiBUeXBlU2FmZSBldmFsdWF0ZXMgZXZcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjMsInRpdGxlIjoiRml4IHJvdXRpbmcgY29uZmlkZW5jZSBnYXBzIGFuZCBwcm9iYWJpbGl0eSBib3VuZGFyaWVzIGZyb20gUFIgIzIiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMyIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJjb2RleC9wcjItcm91dGluZy1mb2xsb3d1cCIsImJhc2UiOiJtYWluIiwic2hhIjoiMzFhYTQ5YTllOTk5MzQ5YWQwMTU3M2RjNjVhMGYzYTFkNGM4NGYyMCIsIm1lcmdlX2NvbW1pdF9zaGEiOiI0NzJlNTMyYTg0NzhlZTM2MGYwZTlhZGNhZmQ2OTU2YzJjZTE0NmJjIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0wOS0xOFQxNjo0ODoyMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0wOS0xOFQxNzoxOToyN1oiLCJtZXJnZWRfYXQiOiIyMDI2LTA5LTE4VDE3OjE5OjI3WiIsImNsb3NlZF9hdCI6IjIwMjYtMDktMThUMTc6MTk6MjdaIiwiYWRkaXRpb25zIjoxMjUsImRlbGV0aW9ucyI6OCwiY2hhbmdlZF9maWxlcyI6OCwiY29tbWl0c19jb3VudCI6MiwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IlBSICMyIGlzIG1lcmdlZCBhbmQgaXRzIGV4aXN0aW5nIGNoZWNrcyBwYXNzZWQsIGJ1dCByZXZpZXcgcmVwcm9kdWNlZCB0d28gcm91dGluZyBnYXBzOiAtIEEgcHJvdmlkZXIgY2FuIHJlcG9ydCBoaWdoIGNvbmZpZGVuY2UgYWxvbmdzaWRlIGEgdGllZCBvciB3ZWFrIHByb2JhYmlsaXR5IGRpc3RyaWJ1dGlvbi4gVGhlIHByZXBhcmVkLWNhbGwgcm91dGVyIGNvdWxkIHN0aWxsIHJldHVybiBgZXhlY3V0ZV90b29sYCwgYW5kIHRoZSBjb2RpbmcgbG9vcCBjb3VsZCByZXF1ZXN0IGEgcGFydG5lci4gQm90aCBub3cgcmVxdWlyZSBhbiBpbmRlcGVuZGVudCBkaXN0cmlidXRpb24tY29uY2VudHJhdGlvbiBjaGVjayBpbiBhZGRpdGlvbiB0byB0aGUgZXhpc3RpbmcgY29uZmlkZW5jZSBmbG9vci4gVGhpc1x1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MiwidGl0bGUiOiJIYXJkZW4gSmV2IHJlbGlhYmlsaXR5IGFuZCBjb21wbGV0aW9uIGdhdGVzIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzIiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiY29kZXgvcmVsaWFiaWxpdHktYW5kLWNvbXBsZXRpb24tZ2F0ZSIsImJhc2UiOiJtYWluIiwic2hhIjoiYmFmMjk0NzlhZGY0NDEzZTlmYzUyN2Q2OGVhMDM2MDY1N2EyOWIyYSIsIm1lcmdlX2NvbW1pdF9zaGEiOiIyZjllZGNkYjE2NGM3YWFhOTY5ZDAzYmY3N2QzM2FhZTM2YmUzMGU4IiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0wOS0xOFQxNjozNjo1NloiLCJ1cGRhdGVkX2F0IjoiMjAyNi0wOS0xOFQxNjozOToxMloiLCJtZXJnZWRfYXQiOiIyMDI2LTA5LTE4VDE2OjM5OjEyWiIsImNsb3NlZF9hdCI6IjIwMjYtMDktMThUMTY6Mzk6MTJaIiwiYWRkaXRpb25zIjoxMTI4LCJkZWxldGlvbnMiOjM3LCJjaGFuZ2VkX2ZpbGVzIjoxNywiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgLSBBZGQgdHlwZWQgcm91dGluZywgcG9saWN5LCBsaW1pdHMsIHNjcmVlbmluZywgcmFua2luZywgcmV2aWV3LCB2ZXJpZmljYXRpb24sIGFuZCBjb2RpbmctbG9vcCBzYWZlZ3VhcmRzIC0gRXhwYW5kIHBhY2tzLCBtb2NrIHN1cHBvcnQsIGNvbmZpZ3VyYXRpb24sIENMSSBiZWhhdmlvciwgZG9jdW1lbnRhdGlvbiwgYW5kIENJIGNvdmVyYWdlIC0gQWRkIGNvbXByZWhlbnNpdmUgdW5pdCwgaW50ZWdyYXRpb24sIGluc3RhbGxlciwgdHJhbnNwb3J0LCBhbmQgbGl2ZSBlbmQtdG8tZW5kIHRlc3RzICMjIFRlc3RpbmcgLSBDb21wcmVoZW5zaXZlIHRlc3Qgc3VpdGUgY292ZXJpbmcgQ0xJLCBydW50aW1lLCBNQ1AgdHJhbnNwb3J0LCBwb2xpY3ksIGxpbWl0cywgdG9vbHMsIHBhY2tzLFx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MSwidGl0bGUiOiJIYXJkZW4gSmV2IHJlbGlhYmlsaXR5IGFuZCBhZGQgYSBjb21iaW5lZCBjb21wbGV0aW9uIGdhdGUiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMSIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJjb2RleC9yZWxpYWJpbGl0eS1hbmQtY29tcGxldGlvbi1nYXRlIiwiYmFzZSI6Im1haW4iLCJzaGEiOiIyNmZkY2QyMzFkN2M1NWMyNWQzZGUwYmNlYmIxNmFjNTg5MGIzZWIxIiwibWVyZ2VfY29tbWl0X3NoYSI6ImM2MTllMTAxMjk2YWMwODg3NWM1ZjRjZWY3NzJlM2RkMmNkNjYzOGYiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTA5LTE4VDAzOjM2OjQyWiIsInVwZGF0ZWRfYXQiOiIyMDI2LTA5LTE4VDAzOjUxOjM5WiIsIm1lcmdlZF9hdCI6IjIwMjYtMDktMThUMDM6NTE6MzlaIiwiY2xvc2VkX2F0IjoiMjAyNi0wOS0xOFQwMzo1MTozOVoiLCJhZGRpdGlvbnMiOjIwNDcsImRlbGV0aW9ucyI6NDYyLCJjaGFuZ2VkX2ZpbGVzIjo0NSwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgTGFyZ2Ugb3IgdHJ1bmNhdGVkIGlucHV0cyBjb3VsZCBwcmV2aW91c2x5IHByb2R1Y2UgYXV0b21hdGljIGRlY2lzaW9ucyB3aXRob3V0IGNvbXBsZXRlIGNvbnRleHQsIHJhbmtpbmcgY291bGQgbG9zZSBjYW5kaWRhdGUgaWRlbnRpdHkgb3IgZXhjZWVkIHJlcXVlc3QgbGltaXRzLCBhbmQgdXBzdHJlYW0gZmFpbHVyZXMgd2VyZSBub3QgY29uc2lzdGVudGx5IGJvdW5kZWQgb3IgdmFsaWRhdGVkLiBUaGlzIGNoYW5nZSBtYWtlcyB0aG9zZSBjYXNlcyBleHBsaWNpdCBhbmQgYWRkcyBhIGNvbWJpbmVkIGNvbXBsZXRpb24gZ2F0ZS4gLSBBZGQgYGpldl9nYXRlYCBhbmQgaXRzIHF1ZXN0aW9uLXBhY2sgcmVzb3VyY2UgdG8gcmV2aWV3IGEgZGlmZiBhbmQgdmVyaWZ5IGNvbXBsZXRpb1x1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfV19 -->
