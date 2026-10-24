# Jev_MCP GitHub watch

**Latest pull request:** [#22 feat: optional caller context for the review tools (opt-in)](https://github.com/burnigtm/jev-mcp/pull/22) — **open** 2026-10-24T09:18:02Z · just now · burnigtm · `feat/caller-context` → `feat/ci-gate` · +1674 −29 · 24 files.

Open **8** · Merged **7** · Closed **0** · [Interactive board](github-watch.html)

This is the **Cursor Project dashboard** for [burnigtm/jev-mcp](https://github.com/burnigtm/jev-mcp). Open **Projects → Jev_MCP** (not the Agents list). The latest pull request stays at the top even when the list is long. GitHub Actions refreshes this file on branch `cursor-watch`.

| | |
| --- | --- |
| **Last refresh** | 2026-10-24T09:18:35Z |
| **Data** | GitHub API |
| **Last GitHub event** | `pull_request_target` `opened` |
| **Open PRs** | [#22](https://github.com/burnigtm/jev-mcp/pull/22) feat: optional caller context for the review tools (opt-in), [#21](https://github.com/burnigtm/jev-mcp/pull/21) feat: pull-request gate (jev-mcp ci), [#20](https://github.com/burnigtm/jev-mcp/pull/20) feat: enforced Claude Code hooks and jev-mcp check, [#19](https://github.com/burnigtm/jev-mcp/pull/19) feat: chunked review for diffs too large for one request, [#18](https://github.com/burnigtm/jev-mcp/pull/18) Repository policy file, profiles, and a dedicated triage recoverability bar |
| **Merged (recent)** | [#14](https://github.com/burnigtm/jev-mcp/pull/14) Live Jev value benchmark with randomized cases, plus the fixes and calibration it found, [#13](https://github.com/burnigtm/jev-mcp/pull/13) Guardrail hardening: policy fixes, cache/budget/stats, risk-aware gate, loop detector, [#12](https://github.com/burnigtm/jev-mcp/pull/12) feat: add scope, triage, and security risk tools, [#11](https://github.com/burnigtm/jev-mcp/pull/11) security: harden untrusted-data handling and helper boundaries, [#10](https://github.com/burnigtm/jev-mcp/pull/10) Package portable Jev skill and add real-agent evaluations |
| **GitHub `main`** | [`813e4f4`](https://github.com/burnigtm/jev-mcp/commit/813e4f4aabc4e8d5d2dc28f58067907e0e0cbcc7) |
| **Cursor target** | `bc-c78e565c-bc13-4d27-ada8-cc5e7e04eb9e` |

## Latest

<details open>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/22">#22 feat: optional caller context for the review tools (opt-in) — OPEN</a></summary>
<table>
<tr><td><strong>State</strong></td><td>OPEN</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/caller-context → feat/ci-gate</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:18:02Z · just now</td></tr>
<tr><td><strong>Merged</strong></td><td>not merged</td></tr>
<tr><td><strong>Diff</strong></td><td>+1674 −29 · 24 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>5 still running · 6 checks</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/813e4f4aabc4e8d5d2dc28f58067907e0e0cbcc7"><code>813e4f4</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/0dec6322904f51c50b890cc20ce43f5a265943e3"><code>0dec632</code></a></td></tr>
</table>
<p><strong>Commits</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/813e4f4aabc4e8d5d2dc28f58067907e0e0cbcc7"><code>813e4f4</code></a> feat: optional caller context for the review tools (opt-in)</li>
</ul>
<p><strong>Files</strong></p><ul>
<li><code>.env.example</code> modified +2 −0</li>
<li><code>docs/changelog.md</code> modified +6 −0</li>
<li><code>docs/ci.md</code> modified +1 −0</li>
<li><code>docs/configuration.md</code> modified +1 −0</li>
<li><code>evals/results/callers-2026-10-24.json</code> added +901 −0</li>
<li><code>evals/results/callers-2026-10-24.md</code> added +26 −0</li>
<li><code>scripts/eval-bonus.mjs</code> modified +5 −2</li>
<li><code>scripts/lib/bonus-callers.mjs</code> added +73 −0</li>
<li><code>scripts/lib/bonus-generator.mjs</code> modified +4 −1</li>
<li><code>skills/jev-mcp/references/tools.md</code> modified +5 −1</li>
<li><code>src/check.ts</code> modified +10 −2</li>
<li><code>src/ci.ts</code> modified +20 −0</li>
<li>12 more files on the pull request</li>
</ul>
<p><strong>Checks</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081403058/job/120835556869">publish</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081403058/job/120835556567">notify</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081403042/job/120835555869">check (windows-latest, 20)</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081403042/job/120835555817">check (ubuntu-latest, 22)</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081403042/job/120835555809">check (windows-latest, 22)</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081403042/job/120835555695">check (ubuntu-latest, 20)</a> <code>in_progress</code></li>
</ul>
<p><strong>Description</strong></p><p>## Summary PR 8 of the roadmap, **stacked on #21**. Optional evidence about where changed code is used, for the review tools. **A negative result, shipped opt-in and off by default.** - `jev_review`, `jev_risk`, `jev_gate` accept `context.callers` (up to 40 `{ path, line?, text, symbol? }`). The server never searches the repo itself; the host supplies the list. Snippets are untrusted: sanitized, secrets redacted, instruction-like text dropped. With callers present the correctness and blast-radi…</p>
</details>


## Open

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/21">#21 feat: pull-request gate (jev-mcp ci) — OPEN</a></summary>
<table>
<tr><td><strong>State</strong></td><td>OPEN</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/ci-gate → feat/check-and-hooks</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:05:17Z · 13m ago</td></tr>
<tr><td><strong>Merged</strong></td><td>not merged</td></tr>
<tr><td><strong>Diff</strong></td><td>+1288 −12 · 14 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>passing · 6 checks</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/a1d34026cf3b73d0c4e007b12814a99cbcc7233c"><code>a1d3402</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/d3c10b715b60f5cb416512358bf6d2a0ffbb5dd7"><code>d3c10b7</code></a></td></tr>
</table>
<p><strong>Commits</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/a1d34026cf3b73d0c4e007b12814a99cbcc7233c"><code>a1d3402</code></a> feat: pull-request gate (jev-mcp ci)</li>
</ul>
<p><strong>Files</strong></p><ul>
<li><code>.env.example</code> modified +2 −0</li>
<li><code>README.md</code> modified +1 −0</li>
<li><code>docs/changelog.md</code> modified +7 −0</li>
<li><code>docs/ci.md</code> added +46 −0</li>
<li><code>docs/configuration.md</code> modified +1 −0</li>
<li><code>evals/results/ci-2026-10-24.json</code> added +290 −0</li>
<li><code>evals/results/ci-2026-10-24.md</code> added +26 −0</li>
<li><code>examples/github-pr-gate.yml</code> added +59 −0</li>
<li><code>src/check.ts</code> modified +53 −12</li>
<li><code>src/ci.ts</code> added +288 −0</li>
<li><code>src/cli.ts</code> modified +66 −0</li>
<li><code>src/git.ts</code> modified +74 −0</li>
<li>2 more files on the pull request</li>
</ul>
<p><strong>Checks</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40080569912/job/120833058523">publish</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40080569912/job/120833058458">notify</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40080569597/job/120833056722">check (windows-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40080569597/job/120833056699">check (windows-latest, 20)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40080569597/job/120833056681">check (ubuntu-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40080569597/job/120833056525">check (ubuntu-latest, 20)</a> <code>success</code></li>
</ul>
<p><strong>Description</strong></p><p>## Summary PR 7 of the roadmap, **stacked on #20**. `jev-mcp ci` is the pull-request gate: it answers `auto`, `review` or `escalate` (exit 0, 10, 20; 2 on any error, fail-closed) and never runs the pull request&#x27;s code. - **Policy from the base ref.** `.jev-policy.json` is read with `git show BASE:...`, so a pull request cannot loosen its own rules; changing the file holds, a broken one holds. Every changed path (and a rename&#x27;s old path) is matched against `protected_paths`. - **Deterministic fl…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/20">#20 feat: enforced Claude Code hooks and jev-mcp check — OPEN</a></summary>
<table>
<tr><td><strong>State</strong></td><td>OPEN</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/check-and-hooks → feat/large-diff-review</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T08:02:59Z · 1h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>not merged</td></tr>
<tr><td><strong>Diff</strong></td><td>+7181 −0 · 19 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>passing · 6 checks</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/3c3f87e72bb317867ff8d592432efc8fad068b10"><code>3c3f87e</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/2386f6423496ed297fef501a2ffaa0c2c219dc3b"><code>2386f64</code></a></td></tr>
</table>
<p><strong>Commits</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/3c3f87e72bb317867ff8d592432efc8fad068b10"><code>3c3f87e</code></a> feat: enforced Claude Code hooks and jev-mcp check</li>
</ul>
<p><strong>Files</strong></p><ul>
<li><code>.env.example</code> modified +6 −0</li>
<li><code>README.md</code> modified +1 −0</li>
<li><code>docs/changelog.md</code> modified +10 −0</li>
<li><code>docs/configuration.md</code> modified +6 −0</li>
<li><code>docs/hooks.md</code> added +77 −0</li>
<li><code>evals/fixtures/policy/hook-policy.json</code> added +14 −0</li>
<li><code>evals/results/hooks-2026-10-24.json</code> added +5261 −0</li>
<li><code>evals/results/hooks-2026-10-24.md</code> added +41 −0</li>
<li><code>examples/claude-code.settings.json</code> added +37 −0</li>
<li><code>scripts/eval-hooks.mjs</code> added +143 −0</li>
<li><code>src/check.ts</code> added +335 −0</li>
<li><code>src/cli.ts</code> modified +82 −0</li>
<li>7 more files on the pull request</li>
</ul>
<p><strong>Checks</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40076517031/job/120820903454">notify</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40076517031/job/120820903201">publish</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40076516920/job/120820902291">check (windows-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40076516920/job/120820902150">check (windows-latest, 20)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40076516920/job/120820902094">check (ubuntu-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40076516920/job/120820901956">check (ubuntu-latest, 20)</a> <code>success</code></li>
</ul>
<p><strong>Description</strong></p><p>## Summary PR 6 of the roadmap, **stacked on #19**. Makes the guard run on every tool call in Claude Code instead of being advisory. - **`jev-mcp hook pre-tool-use`**: classifier and repository policy first; a confirmed read-only command is silent with no model call; reads of key/credential files and edits to the guard&#x27;s own config ask without a model; only the gray zone calls `jev_scope`. A hook only restricts: silent, `ask`, or `deny` for an explicit policy `deny` rule. A model judgment is an…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/19">#19 feat: chunked review for diffs too large for one request — OPEN</a></summary>
<table>
<tr><td><strong>State</strong></td><td>OPEN</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/large-diff-review → feat/repo-policy-profiles</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T07:43:44Z · 1h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>not merged</td></tr>
<tr><td><strong>Diff</strong></td><td>+3831 −74 · 24 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>passing · 6 checks</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/f4f3a928290f2b20bec1d2a1fcc50815c1b6d145"><code>f4f3a92</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/81a8d13deef42543e267204bddcb01be760f6bca"><code>81a8d13</code></a></td></tr>
</table>
<p><strong>Commits</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/f4f3a928290f2b20bec1d2a1fcc50815c1b6d145"><code>f4f3a92</code></a> feat: chunked review for diffs too large for one request</li>
</ul>
<p><strong>Files</strong></p><ul>
<li><code>.env.example</code> modified +2 −0</li>
<li><code>docs/changelog.md</code> modified +9 −0</li>
<li><code>docs/configuration.md</code> modified +3 −0</li>
<li><code>evals/results/large-diff-2026-10-24.json</code> added +1874 −0</li>
<li><code>evals/results/large-diff-2026-10-24.md</code> added +48 −0</li>
<li><code>scripts/eval-bonus.mjs</code> modified +8 −2</li>
<li><code>scripts/lib/bonus-generator.mjs</code> modified +6 −1</li>
<li><code>scripts/lib/bonus-large.mjs</code> added +151 −0</li>
<li><code>skills/jev-mcp/references/tools.md</code> modified +12 −3</li>
<li><code>src/config.ts</code> modified +3 −0</li>
<li><code>src/diff-chunks.ts</code> added +261 −0</li>
<li><code>src/diff.ts</code> added +135 −0</li>
<li>12 more files on the pull request</li>
</ul>
<p><strong>Checks</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40075282272/job/120817187217">notify</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40075282272/job/120817187160">publish</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40075282196/job/120817185910">check (ubuntu-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40075282196/job/120817185897">check (windows-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40075282196/job/120817185852">check (windows-latest, 20)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40075282196/job/120817185703">check (ubuntu-latest, 20)</a> <code>success</code></li>
</ul>
<p><strong>Description</strong></p><p>## Summary PR 5 of the roadmap. **Stacked on #18** (base is that branch; GitHub retargets it as the stack merges). Until now a diff past about 31.8k estimated tokens was cut off at the tail and could never be `auto`, so a large change was unreviewable and a defect past the cut was invisible. `jev_review`, `jev_risk` and `jev_gate` now review it in parts. - **Split along file boundaries.** A lossless unified-diff parser (`src/diff.ts`; handles renames, deletions, binary, `\ No newline`, CRLF, qu…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/18">#18 Repository policy file, profiles, and a dedicated triage recoverability bar — OPEN</a></summary>
<table>
<tr><td><strong>State</strong></td><td>OPEN</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/repo-policy-profiles → feat/decision-ledger</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T07:09:21Z · 2h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>not merged</td></tr>
<tr><td><strong>Diff</strong></td><td>+26124 −43 · 24 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>passing · 6 checks</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/99ae156299d4be9ce3a66325d88d590b9027df84"><code>99ae156</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/d113f28a7fd84c6db49e5321ce47f8a4e68fa6eb"><code>d113f28</code></a></td></tr>
</table>
<p><strong>Commits</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/99ae156299d4be9ce3a66325d88d590b9027df84"><code>99ae156</code></a> feat: repository policy file and confidence profiles</li>
</ul>
<p><strong>Files</strong></p><ul>
<li><code>.env.example</code> modified +3 −0</li>
<li><code>docs/changelog.md</code> modified +10 −0</li>
<li><code>docs/configuration.md</code> modified +38 −0</li>
<li><code>evals/fixtures/policy/bench-policy.json</code> added +6 −0</li>
<li><code>evals/results/README.md</code> modified +2 −0</li>
<li><code>evals/results/policy-2026-10-24.json</code> added +2086 −0</li>
<li><code>evals/results/policy-2026-10-24.md</code> added +33 −0</li>
<li><code>evals/results/profiles-2026-10-24.json</code> added +22807 −0</li>
<li><code>evals/results/profiles-2026-10-24.md</code> added +55 −0</li>
<li><code>examples/jev-policy.json</code> added +17 −0</li>
<li><code>scripts/eval-bonus.mjs</code> modified +11 −3</li>
<li><code>scripts/run-tests.mjs</code> modified +2 −1</li>
<li>12 more files on the pull request</li>
</ul>
<p><strong>Checks</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40073021104/job/120810358121">publish</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40073021104/job/120810358014">notify</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40073021095/job/120810357367">check (windows-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40073021095/job/120810357366">check (ubuntu-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40073021095/job/120810357343">check (ubuntu-latest, 20)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40073021095/job/120810357056">check (windows-latest, 20)</a> <code>success</code></li>
</ul>
<p><strong>Description</strong></p><p>## Summary PR 4 of the roadmap. **Stacked on #17** (base is that branch; GitHub retargets it as the stack merges). Adds the deterministic layer the hooks and CI will use, and settles the open &quot;triage bar&quot; and &quot;strict profile&quot; questions with measurements instead of argument. - **`.jev-policy.json`**, evaluated by `jev_scope` before any Jev request: - `protected_paths`: globs with a `review` or `deny` floor, tested against the action&#x27;s `target` and every path-like argument of the command. - `comm…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/17">#17 Decision ledger: decision_id on every result and jev_feedback — OPEN</a></summary>
<table>
<tr><td><strong>State</strong></td><td>OPEN</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/decision-ledger → feat/command-effect-classifier</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T06:49:07Z · 2h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>not merged</td></tr>
<tr><td><strong>Diff</strong></td><td>+7759 −13 · 32 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>passing · 6 checks</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/506f73800e6b44957f60e6e0c52d5300d8d22d37"><code>506f738</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/8413094ce38ca3267b755f5b508e2d952d98fd35"><code>8413094</code></a></td></tr>
</table>
<p><strong>Commits</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/506f73800e6b44957f60e6e0c52d5300d8d22d37"><code>506f738</code></a> feat: decision ledger, decision_id on every result, and jev_feedback</li>
</ul>
<p><strong>Files</strong></p><ul>
<li><code>.env.example</code> modified +3 −0</li>
<li><code>AGENTS.md</code> modified +1 −0</li>
<li><code>docs/changelog.md</code> modified +8 −0</li>
<li><code>docs/configuration.md</code> modified +10 −1</li>
<li><code>docs/tools.md</code> modified +3 −0</li>
<li><code>evals/fixtures/ledger/README.md</code> added +7 −0</li>
<li><code>evals/fixtures/ledger/ledger-2026-10.jsonl</code> added +306 −0</li>
<li><code>evals/results/README.md</code> modified +1 −0</li>
<li><code>evals/results/ledger-2026-10-24.json</code> added +6609 −0</li>
<li><code>evals/results/ledger-2026-10-24.md</code> added +45 −0</li>
<li><code>scripts/benchmark.mjs</code> modified +1 −1</li>
<li><code>scripts/eval-bonus.mjs</code> modified +19 −1</li>
<li>20 more files on the pull request</li>
</ul>
<p><strong>Checks</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40071701232/job/120806339012">notify</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40071701232/job/120806338847">publish</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40071700921/job/120806337105">check (windows-latest, 20)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40071700921/job/120806337088">check (ubuntu-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40071700921/job/120806337087">check (ubuntu-latest, 20)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40071700921/job/120806336891">check (windows-latest, 22)</a> <code>success</code></li>
</ul>
<p><strong>Description</strong></p><p>## Summary PR 3 of the roadmap. **Stacked on #16** (base is that branch; GitHub retargets it as the stack merges). Nothing records Jev&#x27;s decisions or whether they were right, so real-life false-alarm rates are unknown and every threshold question (such as the triage bar) can only be argued from synthetic benchmarks. This adds the measurement layer the later PRs (hooks, CI) will log into. - **`decision_id` on every judgment result** (additive; a fresh id per response, even when the provider answ…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/16">#16 Command effect classifier: the command text can raise a declared effect — OPEN</a></summary>
<table>
<tr><td><strong>State</strong></td><td>OPEN</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/command-effect-classifier → feat/hardening-loop-budget-gate</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T06:38:23Z · 2h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>not merged</td></tr>
<tr><td><strong>Diff</strong></td><td>+8170 −9 · 16 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>passing · 6 checks</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/00da74e967fe88c7c8eda2b433cdb15fbdebaf47"><code>00da74e</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/6503989e65269e66847ea35f02f30ef172cadcb3"><code>6503989</code></a></td></tr>
</table>
<p><strong>Commits</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/00da74e967fe88c7c8eda2b433cdb15fbdebaf47"><code>00da74e</code></a> feat: deterministic command effect classifier for scope, route and step</li>
</ul>
<p><strong>Files</strong></p><ul>
<li><code>docs/changelog.md</code> modified +6 −0</li>
<li><code>evals/results/README.md</code> modified +1 −0</li>
<li><code>evals/results/classifier-2026-10-24.json</code> added +6718 −0</li>
<li><code>evals/results/classifier-2026-10-24.md</code> added +42 −0</li>
<li><code>scripts/eval-bonus.mjs</code> modified +3 −1</li>
<li><code>scripts/lib/bonus-generator.mjs</code> modified +67 −1</li>
<li><code>scripts/lib/bonus.mjs</code> modified +11 −1</li>
<li><code>skills/jev-mcp/references/tools.md</code> modified +3 −0</li>
<li><code>src/effects.ts</code> added +899 −0</li>
<li><code>src/tools/output-schemas.ts</code> modified +19 −0</li>
<li><code>src/tools/scope.ts</code> modified +8 −2</li>
<li><code>src/tools/step.ts</code> modified +6 −1</li>
<li>4 more files on the pull request</li>
</ul>
<p><strong>Checks</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40070997482/job/120804194292">publish</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40070997482/job/120804194183">notify</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40070997420/job/120804193531">check (windows-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40070997420/job/120804193512">check (ubuntu-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40070997420/job/120804193508">check (windows-latest, 20)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40070997420/job/120804193429">check (ubuntu-latest, 20)</a> <code>success</code></li>
</ul>
<p><strong>Description</strong></p><p>## Summary PR 2 of the roadmap. **Stacked on #15** (base is that branch; GitHub will retarget this to `main` once #15 merges). `jev_scope` trusted the host-declared `effect`: `read_only` + `rm -rf build &amp;&amp; git push --force` returned `auto` whenever the judge&#x27;s answers were clean. This adds a deterministic classifier so the command text can raise the effect, and never lower it. - **`src/effects.ts`**: `classifyCommand`, `effectiveEffect`, `strictestEffect`. Classifies bash, PowerShell and cmd co…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/15">#15 Hardening: loop detector progress, reserved token budget, gate order, triage progress wording — OPEN</a></summary>
<table>
<tr><td><strong>State</strong></td><td>OPEN</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/hardening-loop-budget-gate → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T06:22:34Z · 2h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>not merged</td></tr>
<tr><td><strong>Diff</strong></td><td>+8543 −49 · 22 files</td></tr>
<tr><td><strong>Commits</strong></td><td>2</td></tr>
<tr><td><strong>Checks</strong></td><td>passing · 6 checks</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/a9f4ddaae201754e237dfb6c2b3af3fe636d1841"><code>a9f4dda</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/9d113143e60c70e138112bffa3f04352f2ad126b"><code>9d11314</code></a></td></tr>
</table>
<p><strong>Commits</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/066815383808bc51eff62333184383bca660f732"><code>0668153</code></a> fix: loop detector progress, reserved token budget, gate order, triage progress wording</li>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/a9f4ddaae201754e237dfb6c2b3af3fe636d1841"><code>a9f4dda</code></a> test: write invisible characters as escapes in the benchmark sources</li>
</ul>
<p><strong>Files</strong></p><ul>
<li><code>docs/changelog.md</code> modified +9 −0</li>
<li><code>docs/configuration.md</code> modified +2 −2</li>
<li><code>evals/results/README.md</code> modified +1 −0</li>
<li><code>evals/results/hardening-2026-10-24.json</code> added +7888 −0</li>
<li><code>evals/results/hardening-2026-10-24.md</code> added +40 −0</li>
<li><code>scripts/eval-bonus.mjs</code> modified +10 −1</li>
<li><code>scripts/lib/bonus-generator.mjs</code> modified +73 −1</li>
<li><code>scripts/lib/bonus.mjs</code> modified +23 −9</li>
<li><code>skills/jev-mcp/references/tools.md</code> modified +1 −1</li>
<li><code>src/errors.ts</code> modified +12 −1</li>
<li><code>src/packs/triage.ts</code> modified +4 −4</li>
<li><code>src/responses.ts</code> modified +10 −7</li>
<li>10 more files on the pull request</li>
</ul>
<p><strong>Checks</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40069960083/job/120801061512">check (windows-latest, 20)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40069960083/job/120801061450">check (ubuntu-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40069960083/job/120801061420">check (ubuntu-latest, 20)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40069960083/job/120801061316">check (windows-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40069959407/job/120801060213">notify</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40069959407/job/120801060159">publish</a> <code>success</code></li>
</ul>
<p><strong>Description</strong></p><p>## Summary PR 1 of a 9-stage roadmap (reviewed code from #12–#14, then planned fixes and enhancements). Hardening only: it fixes defects found by reading and running the merged code, and one model misjudgment found by the live benchmark. - **Loop detector no longer flags progress.** Failure counts that strictly shrink across attempts (9 → 5 → 2 failed) were reported as `same_failure` because every digit was masked. They are now progress (`loop.improving`, additive). A changing counter (`retry 3…</p>
</details>


## Merged

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/14">#14 Live Jev value benchmark with randomized cases, plus the fixes and calibration it found — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/jev-value-benchmark → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-23T19:48:52Z · 13h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-23T19:48:51Z · 13h ago</td></tr>
<tr><td><strong>Diff</strong></td><td>+26696 −30 · 29 files</td></tr>
<tr><td><strong>Commits</strong></td><td>3</td></tr>
<tr><td><strong>Checks</strong></td><td>no checks reported</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/4ea1b816e1d0296e3ef9343b18e0b8c719bec311"><code>4ea1b81</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/7d2737bc223c6746ea2bcd8b9c6b28de25692c06"><code>7d2737b</code></a></td></tr>
</table>
<p><strong>Description</strong></p><p>## Summary This PR measures what live Jev adds over cheap local rules, fixes the jev-mcp defects that measurement exposed, and recalibrates three &quot;lower is better&quot; scores based on the data. - **Benchmark:** `npm run eval:bonus`. Labelled risky/safe cases are decided three ways: by **no guard**, by a **rules-only guard** with no model call, and by **live Jev**. The 51 hand-written cases are joined by a **seeded random generator** with 58 templates. Every run records its seed, and a seed replays…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/13">#13 Guardrail hardening: policy fixes, cache/budget/stats, risk-aware gate, loop detector — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/v0.3-guardrail-hardening → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-23T18:58:30Z · 14h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-23T18:58:30Z · 14h ago</td></tr>
<tr><td><strong>Diff</strong></td><td>+2237 −346 · 34 files</td></tr>
<tr><td><strong>Commits</strong></td><td>3</td></tr>
<tr><td><strong>Checks</strong></td><td>no checks reported</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/1a5850012b08276199f0f13b848a2278726dd93d"><code>1a58500</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/97e1cd16f5ad626cfd4ede7762b513897c444c39"><code>97e1cd1</code></a></td></tr>
</table>
<p><strong>Description</strong></p><p>Follows #12 (v0.2 scope/triage/risk tools). The policy fixes for defects that #12 itself introduced were moved onto #12 before it merged: the risk-flag masking, the escalation cutoff for scope and risk, triage escalation order, the injection-backstop regression and triage cause-ID sanitization. This branch already includes that work through a merge commit. What remains here is the hardening of pre-existing code, the new features, and the test suite. ## Summary - **Policy fixes:** several cases…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/12">#12 feat: add scope, triage, and security risk tools — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/v0.2-agent-guardrails → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-23T18:50:25Z · 14h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-23T18:50:24Z · 14h ago</td></tr>
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


## Closed

None.


## Activity

[PR #22](https://github.com/burnigtm/jev-mcp/pull/22) feat: optional caller context for the review tools (opt-in)

- Event: `pull_request_target` `opened`
- Ref: `main` SHA [`813e4f4`](https://github.com/burnigtm/jev-mcp/commit/813e4f4aabc4e8d5d2dc28f58067907e0e0cbcc7)

Search, filters, checks, commits, and files are on the interactive board next to this file. Follow-ups land in the **Jev_MCP Project** chat.

Live Actions: [Notify Jev_MCP](https://github.com/burnigtm/jev-mcp/actions/workflows/notify-jev-mcp.yml).

<!-- jev-watch:snapshot eyJwdWxscyI6W3sibnVtYmVyIjoyMiwidGl0bGUiOiJmZWF0OiBvcHRpb25hbCBjYWxsZXIgY29udGV4dCBmb3IgdGhlIHJldmlldyB0b29scyAob3B0LWluKSIsInN0YXRlIjoiT1BFTiIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMjIiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC9jYWxsZXItY29udGV4dCIsImJhc2UiOiJmZWF0L2NpLWdhdGUiLCJzaGEiOiI4MTNlNGY0YWFiYzRlOGQ1ZDJkYzI4ZjU4MDY3OTA3ZTBlMGNiY2M3IiwibWVyZ2VfY29tbWl0X3NoYSI6IjBkZWM2MzIyOTA0ZjUxYzUwYjg5MGNjMjBjZTQzZjVhMjY1OTQzZTMiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjE4OjAyWiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjE4OjAyWiIsIm1lcmdlZF9hdCI6IiIsImNsb3NlZF9hdCI6IiIsImFkZGl0aW9ucyI6MTY3NCwiZGVsZXRpb25zIjoyOSwiY2hhbmdlZF9maWxlcyI6MjQsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFBSIDggb2YgdGhlIHJvYWRtYXAsICoqc3RhY2tlZCBvbiAjMjEqKi4gT3B0aW9uYWwgZXZpZGVuY2UgYWJvdXQgd2hlcmUgY2hhbmdlZCBjb2RlIGlzIHVzZWQsIGZvciB0aGUgcmV2aWV3IHRvb2xzLiAqKkEgbmVnYXRpdmUgcmVzdWx0LCBzaGlwcGVkIG9wdC1pbiBhbmQgb2ZmIGJ5IGRlZmF1bHQuKiogLSBgamV2X3Jldmlld2AsIGBqZXZfcmlza2AsIGBqZXZfZ2F0ZWAgYWNjZXB0IGBjb250ZXh0LmNhbGxlcnNgICh1cCB0byA0MCBgeyBwYXRoLCBsaW5lPywgdGV4dCwgc3ltYm9sPyB9YCkuIFRoZSBzZXJ2ZXIgbmV2ZXIgc2VhcmNoZXMgdGhlIHJlcG8gaXRzZWxmOyB0aGUgaG9zdCBzdXBwbGllcyB0aGUgbGlzdC4gU25pcHBldHMgYXJlIHVudHJ1c3RlZDogc2FuaXRpemVkLFx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbeyJzaGEiOiI4MTNlNGY0YWFiYzRlOGQ1ZDJkYzI4ZjU4MDY3OTA3ZTBlMGNiY2M3IiwibWVzc2FnZSI6ImZlYXQ6IG9wdGlvbmFsIGNhbGxlciBjb250ZXh0IGZvciB0aGUgcmV2aWV3IHRvb2xzIChvcHQtaW4pIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvY29tbWl0LzgxM2U0ZjRhYWJjNGU4ZDVkMmRjMjhmNTgwNjc5MDdlMGUwY2JjYzcifV0sImZpbGVzIjpbeyJmaWxlbmFtZSI6Ii5lbnYuZXhhbXBsZSIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoyLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NoYW5nZWxvZy5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo2LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NpLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImRvY3MvY29uZmlndXJhdGlvbi5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL2NhbGxlcnMtMjAyNi0xMC0yNC5qc29uIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjkwMSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9jYWxsZXJzLTIwMjYtMTAtMjQubWQiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MjYsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNjcmlwdHMvZXZhbC1ib251cy5tanMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NSwiZGVsZXRpb25zIjoyfSx7ImZpbGVuYW1lIjoic2NyaXB0cy9saWIvYm9udXMtY2FsbGVycy5tanMiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NzMsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNjcmlwdHMvbGliL2JvbnVzLWdlbmVyYXRvci5tanMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NCwiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoic2tpbGxzL2pldi1tY3AvcmVmZXJlbmNlcy90b29scy5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo1LCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJzcmMvY2hlY2sudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTAsImRlbGV0aW9ucyI6Mn0seyJmaWxlbmFtZSI6InNyYy9jaS50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoyMCwiZGVsZXRpb25zIjowfV0sImNoZWNrcyI6W3sibmFtZSI6InB1Ymxpc2giLCJzdGF0ZSI6ImluX3Byb2dyZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgxNDAzMDU4L2pvYi8xMjA4MzU1NTY4NjkifSx7Im5hbWUiOiJub3RpZnkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwODE0MDMwNTgvam9iLzEyMDgzNTU1NjU2NyJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjApIiwic3RhdGUiOiJpbl9wcm9ncmVzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MTQwMzA0Mi9qb2IvMTIwODM1NTU1ODY5In0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIyKSIsInN0YXRlIjoiaW5fcHJvZ3Jlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwODE0MDMwNDIvam9iLzEyMDgzNTU1NTgxNyJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjIpIiwic3RhdGUiOiJpbl9wcm9ncmVzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MTQwMzA0Mi9qb2IvMTIwODM1NTU1ODA5In0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIwKSIsInN0YXRlIjoiaW5fcHJvZ3Jlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwODE0MDMwNDIvam9iLzEyMDgzNTU1NTY5NSJ9XX0seyJudW1iZXIiOjIxLCJ0aXRsZSI6ImZlYXQ6IHB1bGwtcmVxdWVzdCBnYXRlIChqZXYtbWNwIGNpKSIsInN0YXRlIjoiT1BFTiIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMjEiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC9jaS1nYXRlIiwiYmFzZSI6ImZlYXQvY2hlY2stYW5kLWhvb2tzIiwic2hhIjoiYTFkMzQwMjZjZjNiNzNkMGM0ZTAwN2IxMjgxNGE5OWNiY2M3MjMzYyIsIm1lcmdlX2NvbW1pdF9zaGEiOiJkM2MxMGI3MTViNjBmNWNiNDE2NTEyMzU4YmY2ZDJhMGZmYmI1ZGQ3IiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yNFQwOTowNToxN1oiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yNFQwOTowNToxN1oiLCJtZXJnZWRfYXQiOiIiLCJjbG9zZWRfYXQiOiIiLCJhZGRpdGlvbnMiOjEyODgsImRlbGV0aW9ucyI6MTIsImNoYW5nZWRfZmlsZXMiOjE0LCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBQUiA3IG9mIHRoZSByb2FkbWFwLCAqKnN0YWNrZWQgb24gIzIwKiouIGBqZXYtbWNwIGNpYCBpcyB0aGUgcHVsbC1yZXF1ZXN0IGdhdGU6IGl0IGFuc3dlcnMgYGF1dG9gLCBgcmV2aWV3YCBvciBgZXNjYWxhdGVgIChleGl0IDAsIDEwLCAyMDsgMiBvbiBhbnkgZXJyb3IsIGZhaWwtY2xvc2VkKSBhbmQgbmV2ZXIgcnVucyB0aGUgcHVsbCByZXF1ZXN0J3MgY29kZS4gLSAqKlBvbGljeSBmcm9tIHRoZSBiYXNlIHJlZi4qKiBgLmpldi1wb2xpY3kuanNvbmAgaXMgcmVhZCB3aXRoIGBnaXQgc2hvdyBCQVNFOi4uLmAsIHNvIGEgcHVsbCByZXF1ZXN0IGNhbm5vdCBsb29zZW4gaXRzIG93biBydWxlczsgY2hhbmdpbmcgdGhlIGZpbGUgaG9sZHMsIGEgYnJva2VuIG9uZSBob2xkcy4gRXZlXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOlt7InNoYSI6ImExZDM0MDI2Y2YzYjczZDBjNGUwMDdiMTI4MTRhOTljYmNjNzIzM2MiLCJtZXNzYWdlIjoiZmVhdDogcHVsbC1yZXF1ZXN0IGdhdGUgKGpldi1tY3AgY2kpIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvY29tbWl0L2ExZDM0MDI2Y2YzYjczZDBjNGUwMDdiMTI4MTRhOTljYmNjNzIzM2MifV0sImZpbGVzIjpbeyJmaWxlbmFtZSI6Ii5lbnYuZXhhbXBsZSIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoyLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJSRUFETUUubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jaGFuZ2Vsb2cubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jaS5tZCIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo0NiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jb25maWd1cmF0aW9uLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvY2ktMjAyNi0xMC0yNC5qc29uIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjI5MCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9jaS0yMDI2LTEwLTI0Lm1kIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjI2LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJleGFtcGxlcy9naXRodWItcHItZ2F0ZS55bWwiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NTksImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNyYy9jaGVjay50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo1MywiZGVsZXRpb25zIjoxMn0seyJmaWxlbmFtZSI6InNyYy9jaS50cyIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoyODgsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNyYy9jbGkudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NjYsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNyYy9naXQudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NzQsImRlbGV0aW9ucyI6MH1dLCJjaGVja3MiOlt7Im5hbWUiOiJwdWJsaXNoIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgwNTY5OTEyL2pvYi8xMjA4MzMwNTg1MjMifSx7Im5hbWUiOiJub3RpZnkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwODA1Njk5MTIvam9iLzEyMDgzMzA1ODQ1OCJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjIpIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgwNTY5NTk3L2pvYi8xMjA4MzMwNTY3MjIifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MDU2OTU5Ny9qb2IvMTIwODMzMDU2Njk5In0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MDU2OTU5Ny9qb2IvMTIwODMzMDU2NjgxIn0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MDU2OTU5Ny9qb2IvMTIwODMzMDU2NTI1In1dfSx7Im51bWJlciI6MjAsInRpdGxlIjoiZmVhdDogZW5mb3JjZWQgQ2xhdWRlIENvZGUgaG9va3MgYW5kIGpldi1tY3AgY2hlY2siLCJzdGF0ZSI6Ik9QRU4iLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzIwIiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvY2hlY2stYW5kLWhvb2tzIiwiYmFzZSI6ImZlYXQvbGFyZ2UtZGlmZi1yZXZpZXciLCJzaGEiOiIzYzNmODdlNzJiYjMxNzg2N2ZmOGQ1OTI0MzJlZmM4ZmFkMDY4YjEwIiwibWVyZ2VfY29tbWl0X3NoYSI6IjIzODZmNjQyMzQ5NmVkMjk3ZmVmNTAxYTJmZmFhMGMyYzIxOWRjM2IiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA4OjAyOjU5WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA4OjAyOjU5WiIsIm1lcmdlZF9hdCI6IiIsImNsb3NlZF9hdCI6IiIsImFkZGl0aW9ucyI6NzE4MSwiZGVsZXRpb25zIjowLCJjaGFuZ2VkX2ZpbGVzIjoxOSwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgUFIgNiBvZiB0aGUgcm9hZG1hcCwgKipzdGFja2VkIG9uICMxOSoqLiBNYWtlcyB0aGUgZ3VhcmQgcnVuIG9uIGV2ZXJ5IHRvb2wgY2FsbCBpbiBDbGF1ZGUgQ29kZSBpbnN0ZWFkIG9mIGJlaW5nIGFkdmlzb3J5LiAtICoqYGpldi1tY3AgaG9vayBwcmUtdG9vbC11c2VgKio6IGNsYXNzaWZpZXIgYW5kIHJlcG9zaXRvcnkgcG9saWN5IGZpcnN0OyBhIGNvbmZpcm1lZCByZWFkLW9ubHkgY29tbWFuZCBpcyBzaWxlbnQgd2l0aCBubyBtb2RlbCBjYWxsOyByZWFkcyBvZiBrZXkvY3JlZGVudGlhbCBmaWxlcyBhbmQgZWRpdHMgdG8gdGhlIGd1YXJkJ3Mgb3duIGNvbmZpZyBhc2sgd2l0aG91dCBhIG1vZGVsOyBvbmx5IHRoZSBncmF5IHpvbmUgY2FsbHMgYGpldl9zY29wZWAuIEEgaG9va1x1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbeyJzaGEiOiIzYzNmODdlNzJiYjMxNzg2N2ZmOGQ1OTI0MzJlZmM4ZmFkMDY4YjEwIiwibWVzc2FnZSI6ImZlYXQ6IGVuZm9yY2VkIENsYXVkZSBDb2RlIGhvb2tzIGFuZCBqZXYtbWNwIGNoZWNrIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvY29tbWl0LzNjM2Y4N2U3MmJiMzE3ODY3ZmY4ZDU5MjQzMmVmYzhmYWQwNjhiMTAifV0sImZpbGVzIjpbeyJmaWxlbmFtZSI6Ii5lbnYuZXhhbXBsZSIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo2LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJSRUFETUUubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jaGFuZ2Vsb2cubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTAsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImRvY3MvY29uZmlndXJhdGlvbi5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo2LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2hvb2tzLm1kIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjc3LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9maXh0dXJlcy9wb2xpY3kvaG9vay1wb2xpY3kuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoxNCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9ob29rcy0yMDI2LTEwLTI0Lmpzb24iLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NTI2MSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9ob29rcy0yMDI2LTEwLTI0Lm1kIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjQxLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJleGFtcGxlcy9jbGF1ZGUtY29kZS5zZXR0aW5ncy5qc29uIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjM3LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2V2YWwtaG9va3MubWpzIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjE0MywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic3JjL2NoZWNrLnRzIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjMzNSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic3JjL2NsaS50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo4MiwiZGVsZXRpb25zIjowfV0sImNoZWNrcyI6W3sibmFtZSI6Im5vdGlmeSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3NjUxNzAzMS9qb2IvMTIwODIwOTAzNDU0In0seyJuYW1lIjoicHVibGlzaCIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3NjUxNzAzMS9qb2IvMTIwODIwOTAzMjAxIn0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzY1MTY5MjAvam9iLzEyMDgyMDkwMjI5MSJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjApIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDc2NTE2OTIwL2pvYi8xMjA4MjA5MDIxNTAifSx7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjIpIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDc2NTE2OTIwL2pvYi8xMjA4MjA5MDIwOTQifSx7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjApIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDc2NTE2OTIwL2pvYi8xMjA4MjA5MDE5NTYifV19LHsibnVtYmVyIjoxOSwidGl0bGUiOiJmZWF0OiBjaHVua2VkIHJldmlldyBmb3IgZGlmZnMgdG9vIGxhcmdlIGZvciBvbmUgcmVxdWVzdCIsInN0YXRlIjoiT1BFTiIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTkiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC9sYXJnZS1kaWZmLXJldmlldyIsImJhc2UiOiJmZWF0L3JlcG8tcG9saWN5LXByb2ZpbGVzIiwic2hhIjoiZjRmM2E5MjgyOTBmMmIyMGJlYzFkMmExZmNjNTA4MTVjMWI2ZDE0NSIsIm1lcmdlX2NvbW1pdF9zaGEiOiI4MWE4ZDEzZGVlZjQyNTQzZTI2NzIwNGJkZGNiMDFiZTc2MGY2YmNhIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yNFQwNzo0Mzo0NFoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yNFQwNzo0Mzo0NFoiLCJtZXJnZWRfYXQiOiIiLCJjbG9zZWRfYXQiOiIiLCJhZGRpdGlvbnMiOjM4MzEsImRlbGV0aW9ucyI6NzQsImNoYW5nZWRfZmlsZXMiOjI0LCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBQUiA1IG9mIHRoZSByb2FkbWFwLiAqKlN0YWNrZWQgb24gIzE4KiogKGJhc2UgaXMgdGhhdCBicmFuY2g7IEdpdEh1YiByZXRhcmdldHMgaXQgYXMgdGhlIHN0YWNrIG1lcmdlcykuIFVudGlsIG5vdyBhIGRpZmYgcGFzdCBhYm91dCAzMS44ayBlc3RpbWF0ZWQgdG9rZW5zIHdhcyBjdXQgb2ZmIGF0IHRoZSB0YWlsIGFuZCBjb3VsZCBuZXZlciBiZSBgYXV0b2AsIHNvIGEgbGFyZ2UgY2hhbmdlIHdhcyB1bnJldmlld2FibGUgYW5kIGEgZGVmZWN0IHBhc3QgdGhlIGN1dCB3YXMgaW52aXNpYmxlLiBgamV2X3Jldmlld2AsIGBqZXZfcmlza2AgYW5kIGBqZXZfZ2F0ZWAgbm93IHJldmlldyBpdCBpbiBwYXJ0cy4gLSAqKlNwbGl0IGFsb25nIGZpbGUgYm91bmRhcmllcy4qKiBBIGxvc3NsXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOlt7InNoYSI6ImY0ZjNhOTI4MjkwZjJiMjBiZWMxZDJhMWZjYzUwODE1YzFiNmQxNDUiLCJtZXNzYWdlIjoiZmVhdDogY2h1bmtlZCByZXZpZXcgZm9yIGRpZmZzIHRvbyBsYXJnZSBmb3Igb25lIHJlcXVlc3QiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9jb21taXQvZjRmM2E5MjgyOTBmMmIyMGJlYzFkMmExZmNjNTA4MTVjMWI2ZDE0NSJ9XSwiZmlsZXMiOlt7ImZpbGVuYW1lIjoiLmVudi5leGFtcGxlIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjIsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImRvY3MvY2hhbmdlbG9nLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjksImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImRvY3MvY29uZmlndXJhdGlvbi5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjozLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL2xhcmdlLWRpZmYtMjAyNi0xMC0yNC5qc29uIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjE4NzQsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvbGFyZ2UtZGlmZi0yMDI2LTEwLTI0Lm1kIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjQ4LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2V2YWwtYm9udXMubWpzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjgsImRlbGV0aW9ucyI6Mn0seyJmaWxlbmFtZSI6InNjcmlwdHMvbGliL2JvbnVzLWdlbmVyYXRvci5tanMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NiwiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoic2NyaXB0cy9saWIvYm9udXMtbGFyZ2UubWpzIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjE1MSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic2tpbGxzL2pldi1tY3AvcmVmZXJlbmNlcy90b29scy5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxMiwiZGVsZXRpb25zIjozfSx7ImZpbGVuYW1lIjoic3JjL2NvbmZpZy50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjozLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzcmMvZGlmZi1jaHVua3MudHMiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MjYxLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzcmMvZGlmZi50cyIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoxMzUsImRlbGV0aW9ucyI6MH1dLCJjaGVja3MiOlt7Im5hbWUiOiJub3RpZnkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzUyODIyNzIvam9iLzEyMDgxNzE4NzIxNyJ9LHsibmFtZSI6InB1Ymxpc2giLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzUyODIyNzIvam9iLzEyMDgxNzE4NzE2MCJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzUyODIxOTYvam9iLzEyMDgxNzE4NTkxMCJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjIpIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDc1MjgyMTk2L2pvYi8xMjA4MTcxODU4OTcifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3NTI4MjE5Ni9qb2IvMTIwODE3MTg1ODUyIn0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3NTI4MjE5Ni9qb2IvMTIwODE3MTg1NzAzIn1dfSx7Im51bWJlciI6MTgsInRpdGxlIjoiUmVwb3NpdG9yeSBwb2xpY3kgZmlsZSwgcHJvZmlsZXMsIGFuZCBhIGRlZGljYXRlZCB0cmlhZ2UgcmVjb3ZlcmFiaWxpdHkgYmFyIiwic3RhdGUiOiJPUEVOIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xOCIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L3JlcG8tcG9saWN5LXByb2ZpbGVzIiwiYmFzZSI6ImZlYXQvZGVjaXNpb24tbGVkZ2VyIiwic2hhIjoiOTlhZTE1NjI5OWQ0YmU5Y2UzYTY2MzI1ZDg4ZDU5MGI5MDI3ZGY4NCIsIm1lcmdlX2NvbW1pdF9zaGEiOiJkMTEzZjI4YTdmZDg0YzZkYjQ5ZTUzMjFjZTQ3ZjhhNGU2OGZhNmViIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yNFQwNzowOToyMVoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yNFQwNzowOToyMVoiLCJtZXJnZWRfYXQiOiIiLCJjbG9zZWRfYXQiOiIiLCJhZGRpdGlvbnMiOjI2MTI0LCJkZWxldGlvbnMiOjQzLCJjaGFuZ2VkX2ZpbGVzIjoyNCwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgUFIgNCBvZiB0aGUgcm9hZG1hcC4gKipTdGFja2VkIG9uICMxNyoqIChiYXNlIGlzIHRoYXQgYnJhbmNoOyBHaXRIdWIgcmV0YXJnZXRzIGl0IGFzIHRoZSBzdGFjayBtZXJnZXMpLiBBZGRzIHRoZSBkZXRlcm1pbmlzdGljIGxheWVyIHRoZSBob29rcyBhbmQgQ0kgd2lsbCB1c2UsIGFuZCBzZXR0bGVzIHRoZSBvcGVuIFwidHJpYWdlIGJhclwiIGFuZCBcInN0cmljdCBwcm9maWxlXCIgcXVlc3Rpb25zIHdpdGggbWVhc3VyZW1lbnRzIGluc3RlYWQgb2YgYXJndW1lbnQuIC0gKipgLmpldi1wb2xpY3kuanNvbmAqKiwgZXZhbHVhdGVkIGJ5IGBqZXZfc2NvcGVgIGJlZm9yZSBhbnkgSmV2IHJlcXVlc3Q6IC0gYHByb3RlY3RlZF9wYXRoc2A6IGdsb2JzIHdpdGggYSBgcmV2aWV3YCBvciBgZGVcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W3sic2hhIjoiOTlhZTE1NjI5OWQ0YmU5Y2UzYTY2MzI1ZDg4ZDU5MGI5MDI3ZGY4NCIsIm1lc3NhZ2UiOiJmZWF0OiByZXBvc2l0b3J5IHBvbGljeSBmaWxlIGFuZCBjb25maWRlbmNlIHByb2ZpbGVzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvY29tbWl0Lzk5YWUxNTYyOTlkNGJlOWNlM2E2NjMyNWQ4OGQ1OTBiOTAyN2RmODQifV0sImZpbGVzIjpbeyJmaWxlbmFtZSI6Ii5lbnYuZXhhbXBsZSIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjozLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NoYW5nZWxvZy5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxMCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jb25maWd1cmF0aW9uLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjM4LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9maXh0dXJlcy9wb2xpY3kvYmVuY2gtcG9saWN5Lmpzb24iLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9SRUFETUUubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9wb2xpY3ktMjAyNi0xMC0yNC5qc29uIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjIwODYsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvcG9saWN5LTIwMjYtMTAtMjQubWQiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MzMsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvcHJvZmlsZXMtMjAyNi0xMC0yNC5qc29uIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjIyODA3LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL3Byb2ZpbGVzLTIwMjYtMTAtMjQubWQiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NTUsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV4YW1wbGVzL2pldi1wb2xpY3kuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoxNywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic2NyaXB0cy9ldmFsLWJvbnVzLm1qcyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxMSwiZGVsZXRpb25zIjozfSx7ImZpbGVuYW1lIjoic2NyaXB0cy9ydW4tdGVzdHMubWpzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjIsImRlbGV0aW9ucyI6MX1dLCJjaGVja3MiOlt7Im5hbWUiOiJwdWJsaXNoIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDczMDIxMTA0L2pvYi8xMjA4MTAzNTgxMjEifSx7Im5hbWUiOiJub3RpZnkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzMwMjExMDQvam9iLzEyMDgxMDM1ODAxNCJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjIpIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDczMDIxMDk1L2pvYi8xMjA4MTAzNTczNjcifSx7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjIpIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDczMDIxMDk1L2pvYi8xMjA4MTAzNTczNjYifSx7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjApIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDczMDIxMDk1L2pvYi8xMjA4MTAzNTczNDMifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MzAyMTA5NS9qb2IvMTIwODEwMzU3MDU2In1dfSx7Im51bWJlciI6MTcsInRpdGxlIjoiRGVjaXNpb24gbGVkZ2VyOiBkZWNpc2lvbl9pZCBvbiBldmVyeSByZXN1bHQgYW5kIGpldl9mZWVkYmFjayIsInN0YXRlIjoiT1BFTiIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTciLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC9kZWNpc2lvbi1sZWRnZXIiLCJiYXNlIjoiZmVhdC9jb21tYW5kLWVmZmVjdC1jbGFzc2lmaWVyIiwic2hhIjoiNTA2ZjczODAwZTZiNDQ5NTdmNjBlNmUwYzUyZDUzMDBkOGQyMmQzNyIsIm1lcmdlX2NvbW1pdF9zaGEiOiI4NDEzMDk0Y2UzOGNhMzI2N2I3NTVmNWI1MDhlMmQ5NTJkOThmZDM1IiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yNFQwNjo0OTowN1oiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yNFQwNjo0OTowN1oiLCJtZXJnZWRfYXQiOiIiLCJjbG9zZWRfYXQiOiIiLCJhZGRpdGlvbnMiOjc3NTksImRlbGV0aW9ucyI6MTMsImNoYW5nZWRfZmlsZXMiOjMyLCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBQUiAzIG9mIHRoZSByb2FkbWFwLiAqKlN0YWNrZWQgb24gIzE2KiogKGJhc2UgaXMgdGhhdCBicmFuY2g7IEdpdEh1YiByZXRhcmdldHMgaXQgYXMgdGhlIHN0YWNrIG1lcmdlcykuIE5vdGhpbmcgcmVjb3JkcyBKZXYncyBkZWNpc2lvbnMgb3Igd2hldGhlciB0aGV5IHdlcmUgcmlnaHQsIHNvIHJlYWwtbGlmZSBmYWxzZS1hbGFybSByYXRlcyBhcmUgdW5rbm93biBhbmQgZXZlcnkgdGhyZXNob2xkIHF1ZXN0aW9uIChzdWNoIGFzIHRoZSB0cmlhZ2UgYmFyKSBjYW4gb25seSBiZSBhcmd1ZWQgZnJvbSBzeW50aGV0aWMgYmVuY2htYXJrcy4gVGhpcyBhZGRzIHRoZSBtZWFzdXJlbWVudCBsYXllciB0aGUgbGF0ZXIgUFJzIChob29rcywgQ0kpIHdpbGwgbG9nIGludG8uIC0gKipgZGVjXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOlt7InNoYSI6IjUwNmY3MzgwMGU2YjQ0OTU3ZjYwZTZlMGM1MmQ1MzAwZDhkMjJkMzciLCJtZXNzYWdlIjoiZmVhdDogZGVjaXNpb24gbGVkZ2VyLCBkZWNpc2lvbl9pZCBvbiBldmVyeSByZXN1bHQsIGFuZCBqZXZfZmVlZGJhY2siLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9jb21taXQvNTA2ZjczODAwZTZiNDQ5NTdmNjBlNmUwYzUyZDUzMDBkOGQyMmQzNyJ9XSwiZmlsZXMiOlt7ImZpbGVuYW1lIjoiLmVudi5leGFtcGxlIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjMsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6IkFHRU5UUy5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NoYW5nZWxvZy5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo4LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NvbmZpZ3VyYXRpb24ubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTAsImRlbGV0aW9ucyI6MX0seyJmaWxlbmFtZSI6ImRvY3MvdG9vbHMubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvZml4dHVyZXMvbGVkZ2VyL1JFQURNRS5tZCIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo3LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9maXh0dXJlcy9sZWRnZXIvbGVkZ2VyLTIwMjYtMTAuanNvbmwiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MzA2LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL1JFQURNRS5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL2xlZGdlci0yMDI2LTEwLTI0Lmpzb24iLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NjYwOSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9sZWRnZXItMjAyNi0xMC0yNC5tZCIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo0NSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic2NyaXB0cy9iZW5jaG1hcmsubWpzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEsImRlbGV0aW9ucyI6MX0seyJmaWxlbmFtZSI6InNjcmlwdHMvZXZhbC1ib251cy5tanMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTksImRlbGV0aW9ucyI6MX1dLCJjaGVja3MiOlt7Im5hbWUiOiJub3RpZnkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzE3MDEyMzIvam9iLzEyMDgwNjMzOTAxMiJ9LHsibmFtZSI6InB1Ymxpc2giLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzE3MDEyMzIvam9iLzEyMDgwNjMzODg0NyJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjApIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDcxNzAwOTIxL2pvYi8xMjA4MDYzMzcxMDUifSx7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjIpIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDcxNzAwOTIxL2pvYi8xMjA4MDYzMzcwODgifSx7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjApIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDcxNzAwOTIxL2pvYi8xMjA4MDYzMzcwODcifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MTcwMDkyMS9qb2IvMTIwODA2MzM2ODkxIn1dfSx7Im51bWJlciI6MTYsInRpdGxlIjoiQ29tbWFuZCBlZmZlY3QgY2xhc3NpZmllcjogdGhlIGNvbW1hbmQgdGV4dCBjYW4gcmFpc2UgYSBkZWNsYXJlZCBlZmZlY3QiLCJzdGF0ZSI6Ik9QRU4iLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzE2IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvY29tbWFuZC1lZmZlY3QtY2xhc3NpZmllciIsImJhc2UiOiJmZWF0L2hhcmRlbmluZy1sb29wLWJ1ZGdldC1nYXRlIiwic2hhIjoiMDBkYTc0ZTk2N2ZlODhjN2M4ZWRhMmI0MzNjZGIxNWZiZGViYWY0NyIsIm1lcmdlX2NvbW1pdF9zaGEiOiI2NTAzOTg5ZTY1MjY5ZTY2ODQ3ZWEzNWYwMmYzMGVmMTcyY2FkY2IzIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yNFQwNjozODoyM1oiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yNFQwNjozODoyM1oiLCJtZXJnZWRfYXQiOiIiLCJjbG9zZWRfYXQiOiIiLCJhZGRpdGlvbnMiOjgxNzAsImRlbGV0aW9ucyI6OSwiY2hhbmdlZF9maWxlcyI6MTYsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFBSIDIgb2YgdGhlIHJvYWRtYXAuICoqU3RhY2tlZCBvbiAjMTUqKiAoYmFzZSBpcyB0aGF0IGJyYW5jaDsgR2l0SHViIHdpbGwgcmV0YXJnZXQgdGhpcyB0byBgbWFpbmAgb25jZSAjMTUgbWVyZ2VzKS4gYGpldl9zY29wZWAgdHJ1c3RlZCB0aGUgaG9zdC1kZWNsYXJlZCBgZWZmZWN0YDogYHJlYWRfb25seWAgKyBgcm0gLXJmIGJ1aWxkICYmIGdpdCBwdXNoIC0tZm9yY2VgIHJldHVybmVkIGBhdXRvYCB3aGVuZXZlciB0aGUganVkZ2UncyBhbnN3ZXJzIHdlcmUgY2xlYW4uIFRoaXMgYWRkcyBhIGRldGVybWluaXN0aWMgY2xhc3NpZmllciBzbyB0aGUgY29tbWFuZCB0ZXh0IGNhbiByYWlzZSB0aGUgZWZmZWN0LCBhbmQgbmV2ZXIgbG93ZXIgaXQuIC0gKipgc3JjL2VmZmVjdHMudHNcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W3sic2hhIjoiMDBkYTc0ZTk2N2ZlODhjN2M4ZWRhMmI0MzNjZGIxNWZiZGViYWY0NyIsIm1lc3NhZ2UiOiJmZWF0OiBkZXRlcm1pbmlzdGljIGNvbW1hbmQgZWZmZWN0IGNsYXNzaWZpZXIgZm9yIHNjb3BlLCByb3V0ZSBhbmQgc3RlcCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2NvbW1pdC8wMGRhNzRlOTY3ZmU4OGM3YzhlZGEyYjQzM2NkYjE1ZmJkZWJhZjQ3In1dLCJmaWxlcyI6W3siZmlsZW5hbWUiOiJkb2NzL2NoYW5nZWxvZy5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo2LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL1JFQURNRS5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL2NsYXNzaWZpZXItMjAyNi0xMC0yNC5qc29uIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjY3MTgsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvY2xhc3NpZmllci0yMDI2LTEwLTI0Lm1kIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjQyLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2V2YWwtYm9udXMubWpzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjMsImRlbGV0aW9ucyI6MX0seyJmaWxlbmFtZSI6InNjcmlwdHMvbGliL2JvbnVzLWdlbmVyYXRvci5tanMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NjcsImRlbGV0aW9ucyI6MX0seyJmaWxlbmFtZSI6InNjcmlwdHMvbGliL2JvbnVzLm1qcyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxMSwiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoic2tpbGxzL2pldi1tY3AvcmVmZXJlbmNlcy90b29scy5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjozLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzcmMvZWZmZWN0cy50cyIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo4OTksImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNyYy90b29scy9vdXRwdXQtc2NoZW1hcy50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxOSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic3JjL3Rvb2xzL3Njb3BlLnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjgsImRlbGV0aW9ucyI6Mn0seyJmaWxlbmFtZSI6InNyYy90b29scy9zdGVwLnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjYsImRlbGV0aW9ucyI6MX1dLCJjaGVja3MiOlt7Im5hbWUiOiJwdWJsaXNoIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDcwOTk3NDgyL2pvYi8xMjA4MDQxOTQyOTIifSx7Im5hbWUiOiJub3RpZnkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzA5OTc0ODIvam9iLzEyMDgwNDE5NDE4MyJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjIpIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDcwOTk3NDIwL2pvYi8xMjA4MDQxOTM1MzEifSx7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjIpIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDcwOTk3NDIwL2pvYi8xMjA4MDQxOTM1MTIifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MDk5NzQyMC9qb2IvMTIwODA0MTkzNTA4In0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MDk5NzQyMC9qb2IvMTIwODA0MTkzNDI5In1dfSx7Im51bWJlciI6MTUsInRpdGxlIjoiSGFyZGVuaW5nOiBsb29wIGRldGVjdG9yIHByb2dyZXNzLCByZXNlcnZlZCB0b2tlbiBidWRnZXQsIGdhdGUgb3JkZXIsIHRyaWFnZSBwcm9ncmVzcyB3b3JkaW5nIiwic3RhdGUiOiJPUEVOIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xNSIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L2hhcmRlbmluZy1sb29wLWJ1ZGdldC1nYXRlIiwiYmFzZSI6Im1haW4iLCJzaGEiOiJhOWY0ZGRhYWUyMDE3NTRlMjM3ZGZiNmMyYjNhZjNmZTYzNmQxODQxIiwibWVyZ2VfY29tbWl0X3NoYSI6IjlkMTEzMTQzZTYwYzcwZTEzODExMmJmZmEzZjA0MzUyZjJhZDEyNmIiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA2OjIyOjM0WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA2OjIyOjM0WiIsIm1lcmdlZF9hdCI6IiIsImNsb3NlZF9hdCI6IiIsImFkZGl0aW9ucyI6ODU0MywiZGVsZXRpb25zIjo0OSwiY2hhbmdlZF9maWxlcyI6MjIsImNvbW1pdHNfY291bnQiOjIsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFBSIDEgb2YgYSA5LXN0YWdlIHJvYWRtYXAgKHJldmlld2VkIGNvZGUgZnJvbSAjMTJcdTIwMTMjMTQsIHRoZW4gcGxhbm5lZCBmaXhlcyBhbmQgZW5oYW5jZW1lbnRzKS4gSGFyZGVuaW5nIG9ubHk6IGl0IGZpeGVzIGRlZmVjdHMgZm91bmQgYnkgcmVhZGluZyBhbmQgcnVubmluZyB0aGUgbWVyZ2VkIGNvZGUsIGFuZCBvbmUgbW9kZWwgbWlzanVkZ21lbnQgZm91bmQgYnkgdGhlIGxpdmUgYmVuY2htYXJrLiAtICoqTG9vcCBkZXRlY3RvciBubyBsb25nZXIgZmxhZ3MgcHJvZ3Jlc3MuKiogRmFpbHVyZSBjb3VudHMgdGhhdCBzdHJpY3RseSBzaHJpbmsgYWNyb3NzIGF0dGVtcHRzICg5IFx1MjE5MiA1IFx1MjE5MiAyIGZhaWxlZCkgd2VyZSByZXBvcnRlZCBhcyBgc2FtZV9mYWlsdXJlYCBiZWNhdXNlIGV2ZXJcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W3sic2hhIjoiMDY2ODE1MzgzODA4YmM1MWVmZjYyMzMzMTg0MzgzYmNhNjYwZjczMiIsIm1lc3NhZ2UiOiJmaXg6IGxvb3AgZGV0ZWN0b3IgcHJvZ3Jlc3MsIHJlc2VydmVkIHRva2VuIGJ1ZGdldCwgZ2F0ZSBvcmRlciwgdHJpYWdlIHByb2dyZXNzIHdvcmRpbmciLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9jb21taXQvMDY2ODE1MzgzODA4YmM1MWVmZjYyMzMzMTg0MzgzYmNhNjYwZjczMiJ9LHsic2hhIjoiYTlmNGRkYWFlMjAxNzU0ZTIzN2RmYjZjMmIzYWYzZmU2MzZkMTg0MSIsIm1lc3NhZ2UiOiJ0ZXN0OiB3cml0ZSBpbnZpc2libGUgY2hhcmFjdGVycyBhcyBlc2NhcGVzIGluIHRoZSBiZW5jaG1hcmsgc291cmNlcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2NvbW1pdC9hOWY0ZGRhYWUyMDE3NTRlMjM3ZGZiNmMyYjNhZjNmZTYzNmQxODQxIn1dLCJmaWxlcyI6W3siZmlsZW5hbWUiOiJkb2NzL2NoYW5nZWxvZy5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo5LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NvbmZpZ3VyYXRpb24ubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MiwiZGVsZXRpb25zIjoyfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9SRUFETUUubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9oYXJkZW5pbmctMjAyNi0xMC0yNC5qc29uIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjc4ODgsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvaGFyZGVuaW5nLTIwMjYtMTAtMjQubWQiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NDAsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNjcmlwdHMvZXZhbC1ib251cy5tanMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTAsImRlbGV0aW9ucyI6MX0seyJmaWxlbmFtZSI6InNjcmlwdHMvbGliL2JvbnVzLWdlbmVyYXRvci5tanMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NzMsImRlbGV0aW9ucyI6MX0seyJmaWxlbmFtZSI6InNjcmlwdHMvbGliL2JvbnVzLm1qcyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoyMywiZGVsZXRpb25zIjo5fSx7ImZpbGVuYW1lIjoic2tpbGxzL2pldi1tY3AvcmVmZXJlbmNlcy90b29scy5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxLCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJzcmMvZXJyb3JzLnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEyLCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJzcmMvcGFja3MvdHJpYWdlLnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjQsImRlbGV0aW9ucyI6NH0seyJmaWxlbmFtZSI6InNyYy9yZXNwb25zZXMudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTAsImRlbGV0aW9ucyI6N31dLCJjaGVja3MiOlt7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA2OTk2MDA4My9qb2IvMTIwODAxMDYxNTEyIn0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA2OTk2MDA4My9qb2IvMTIwODAxMDYxNDUwIn0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA2OTk2MDA4My9qb2IvMTIwODAxMDYxNDIwIn0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNjk5NjAwODMvam9iLzEyMDgwMTA2MTMxNiJ9LHsibmFtZSI6Im5vdGlmeSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA2OTk1OTQwNy9qb2IvMTIwODAxMDYwMjEzIn0seyJuYW1lIjoicHVibGlzaCIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA2OTk1OTQwNy9qb2IvMTIwODAxMDYwMTU5In1dfSx7Im51bWJlciI6MTQsInRpdGxlIjoiTGl2ZSBKZXYgdmFsdWUgYmVuY2htYXJrIHdpdGggcmFuZG9taXplZCBjYXNlcywgcGx1cyB0aGUgZml4ZXMgYW5kIGNhbGlicmF0aW9uIGl0IGZvdW5kIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzE0IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvamV2LXZhbHVlLWJlbmNobWFyayIsImJhc2UiOiJtYWluIiwic2hhIjoiNGVhMWI4MTZlMWQwMjk2ZTNlZjkzNDNiMThlMGI4YzcxOWJlYzMxMSIsIm1lcmdlX2NvbW1pdF9zaGEiOiI3ZDI3MzdiYzIyM2M2NzQ2ZWEyYmNkOGI5YzZiMjhkZTI1NjkyYzA2IiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yM1QxOTo0NTo1OVoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yM1QxOTo0ODo1MloiLCJtZXJnZWRfYXQiOiIyMDI2LTEwLTIzVDE5OjQ4OjUxWiIsImNsb3NlZF9hdCI6IjIwMjYtMTAtMjNUMTk6NDg6NTFaIiwiYWRkaXRpb25zIjoyNjY5NiwiZGVsZXRpb25zIjozMCwiY2hhbmdlZF9maWxlcyI6MjksImNvbW1pdHNfY291bnQiOjMsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFRoaXMgUFIgbWVhc3VyZXMgd2hhdCBsaXZlIEpldiBhZGRzIG92ZXIgY2hlYXAgbG9jYWwgcnVsZXMsIGZpeGVzIHRoZSBqZXYtbWNwIGRlZmVjdHMgdGhhdCBtZWFzdXJlbWVudCBleHBvc2VkLCBhbmQgcmVjYWxpYnJhdGVzIHRocmVlIFwibG93ZXIgaXMgYmV0dGVyXCIgc2NvcmVzIGJhc2VkIG9uIHRoZSBkYXRhLiAtICoqQmVuY2htYXJrOioqIGBucG0gcnVuIGV2YWw6Ym9udXNgLiBMYWJlbGxlZCByaXNreS9zYWZlIGNhc2VzIGFyZSBkZWNpZGVkIHRocmVlIHdheXM6IGJ5ICoqbm8gZ3VhcmQqKiwgYnkgYSAqKnJ1bGVzLW9ubHkgZ3VhcmQqKiB3aXRoIG5vIG1vZGVsIGNhbGwsIGFuZCBieSAqKmxpdmUgSmV2KiouIFRoZSA1MSBoYW5kLXdyaXR0ZW4gY2FzZXMgYXJlIGpvaW5lZFx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MTMsInRpdGxlIjoiR3VhcmRyYWlsIGhhcmRlbmluZzogcG9saWN5IGZpeGVzLCBjYWNoZS9idWRnZXQvc3RhdHMsIHJpc2stYXdhcmUgZ2F0ZSwgbG9vcCBkZXRlY3RvciIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xMyIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L3YwLjMtZ3VhcmRyYWlsLWhhcmRlbmluZyIsImJhc2UiOiJtYWluIiwic2hhIjoiMWE1ODUwMDEyYjA4Mjc2MTk5ZjBmMTNiODQ4YTIyNzg3MjZkZDkzZCIsIm1lcmdlX2NvbW1pdF9zaGEiOiI5N2UxY2QxNmY1YWQ2MjZjZmQ0ZWRlNzc2MmI1MTM4OTdjNDQ0YzM5IiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yM1QxODo0MjoyMloiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yM1QxODo1ODozMFoiLCJtZXJnZWRfYXQiOiIyMDI2LTEwLTIzVDE4OjU4OjMwWiIsImNsb3NlZF9hdCI6IjIwMjYtMTAtMjNUMTg6NTg6MzBaIiwiYWRkaXRpb25zIjoyMjM3LCJkZWxldGlvbnMiOjM0NiwiY2hhbmdlZF9maWxlcyI6MzQsImNvbW1pdHNfY291bnQiOjMsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiJGb2xsb3dzICMxMiAodjAuMiBzY29wZS90cmlhZ2UvcmlzayB0b29scykuIFRoZSBwb2xpY3kgZml4ZXMgZm9yIGRlZmVjdHMgdGhhdCAjMTIgaXRzZWxmIGludHJvZHVjZWQgd2VyZSBtb3ZlZCBvbnRvICMxMiBiZWZvcmUgaXQgbWVyZ2VkOiB0aGUgcmlzay1mbGFnIG1hc2tpbmcsIHRoZSBlc2NhbGF0aW9uIGN1dG9mZiBmb3Igc2NvcGUgYW5kIHJpc2ssIHRyaWFnZSBlc2NhbGF0aW9uIG9yZGVyLCB0aGUgaW5qZWN0aW9uLWJhY2tzdG9wIHJlZ3Jlc3Npb24gYW5kIHRyaWFnZSBjYXVzZS1JRCBzYW5pdGl6YXRpb24uIFRoaXMgYnJhbmNoIGFscmVhZHkgaW5jbHVkZXMgdGhhdCB3b3JrIHRocm91Z2ggYSBtZXJnZSBjb21taXQuIFdoYXQgcmVtYWlucyBoZXJlIGlzIHRoZSBoYXJkZW5pbmcgb2YgcHJcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjEyLCJ0aXRsZSI6ImZlYXQ6IGFkZCBzY29wZSwgdHJpYWdlLCBhbmQgc2VjdXJpdHkgcmlzayB0b29scyIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xMiIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L3YwLjItYWdlbnQtZ3VhcmRyYWlscyIsImJhc2UiOiJtYWluIiwic2hhIjoiYjBlYWNiMDQzZDk3YzliZDM0MTQwYzgwN2U5ZTg4ZmVjNjE5NDMwYSIsIm1lcmdlX2NvbW1pdF9zaGEiOiI4YmNiOTJhZDZiODdiNzc1OWE2YWI5N2M0ODRmODc0ZGNkMTZkMzg1IiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0xN1QxMzowNDowMVoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yM1QxODo1MDoyNVoiLCJtZXJnZWRfYXQiOiIyMDI2LTEwLTIzVDE4OjUwOjI0WiIsImNsb3NlZF9hdCI6IjIwMjYtMTAtMjNUMTg6NTA6MjRaIiwiYWRkaXRpb25zIjoxNTYyLCJkZWxldGlvbnMiOjM4LCJjaGFuZ2VkX2ZpbGVzIjozMywiY29tbWl0c19jb3VudCI6MiwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgVGhpcyBQUiBleHRlbmRzIGBqZXYtbWNwYCBmcm9tIHRoZSBjb3JlIGNvZGluZyBsb29wIGludG8gdGhyZWUgYWRqYWNlbnQgZGVjaXNpb24gYm91bmRhcmllczogMS4gKipgamV2X3Njb3BlYCoqIC0gc2VtYW50aWMgcHJlZmxpZ2h0IGZvciBhIGhvc3QtcHJlcGFyZWQgYWN0aW9uLiAyLiAqKmBqZXZfdHJpYWdlYCoqIC0gZmFpbHVyZSBjYXVzZSwgbG9vcCBwcm9ncmVzcywgYW5kIHJlY292ZXJ5IHN0cmF0ZWd5LiAzLiAqKmBqZXZfcmlza2AqKiAtIHNlY3VyaXR5LWZvY3VzZWQgcGF0Y2ggcmlzayB0cmlhZ2UuIFRoZSBleGlzdGluZyBuaW5lIHRvb2xzIGFuZCB0aGVpciBwb2xpY2llcyBhcmUgdW5jaGFuZ2VkLiBUaGUgc2VydmVyIG5vdyBleHBvc2VzICoqMTIgdG9vbHMsIDExXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoxMSwidGl0bGUiOiJzZWN1cml0eTogaGFyZGVuIHVudHJ1c3RlZC1kYXRhIGhhbmRsaW5nIGFuZCBoZWxwZXIgYm91bmRhcmllcyIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xMSIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJzZWN1cml0eS9oYXJkZW4tdW50cnVzdGVkLWRhdGEiLCJiYXNlIjoibWFpbiIsInNoYSI6ImUwZmY2ZTM4MTIxY2M4MTdiNDE5ZGJhMTRjZTBlY2ZjNzE3NjEyZjUiLCJtZXJnZV9jb21taXRfc2hhIjoiNmVjY2I1MjM0ODIzYTlmNThkOWE3Y2FiOTViZjcxYjA0ZGYwMGM5MSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMTdUMTI6MTQ6MzRaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMTdUMTI6MzY6MTVaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0xN1QxMjozNjoxNVoiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTE3VDEyOjM2OjE1WiIsImFkZGl0aW9ucyI6MTEwMSwiZGVsZXRpb25zIjoxODgsImNoYW5nZWRfZmlsZXMiOjY0LCJjb21taXRzX2NvdW50IjoyLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBUaGlzIFBSIGhhcmRlbnMgdGhlIGJvdW5kYXJpZXMgd2hlcmUgYGpldi1tY3BgIGhhbmRsZXMgdGhpcmQtcGFydHkgdGV4dCwgaG9zdC1wcmVwYXJlZCB0b29sIG1ldGFkYXRhLCBwcm92aWRlciBjcmVkZW50aWFscywgYW5kIGFnZW50IGV2YWx1YXRpb24gY29kZS4gSXQgYWxzbyBmaXhlcyBzZXZlcmFsIGNvcnJlY3RuZXNzIGRlZmVjdHMgZm91bmQgZHVyaW5nIHRoZSBhdWRpdC4gVGhlIGNoZWNrb3V0IGFscmVhZHkgY29udGFpbmVkIGEgcGVuZGluZyByZW1lZGlhdGlvbiBiYXRjaDsgdGhpcyBicmFuY2ggYnVpbGRzIG9uIGl0IGFuZCB0dXJucyB0aGUgd2hvbGUgc2V0IGludG8gb25lIHJldmlld2VkIGNoYW5nZS4gTm8gbGl2ZSBwcm92aWRlciBjYWxscyBvciBwdWJsaXNoaW5nXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoxMCwidGl0bGUiOiJQYWNrYWdlIHBvcnRhYmxlIEpldiBza2lsbCBhbmQgYWRkIHJlYWwtYWdlbnQgZXZhbHVhdGlvbnMiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTAiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiY29kZXgvcG9ydGFibGUtc2tpbGwtZXZhbHMiLCJiYXNlIjoibWFpbiIsInNoYSI6ImZkMzQ3MDFlMTU1YjZjMjMwY2JhY2U0MTFkZjYyMzg4MDQwNWIxMzEiLCJtZXJnZV9jb21taXRfc2hhIjoiNTcxZjQ2NDU2NWExMzE5YWJlNTJjYjk1MTIwYjM3MTc0ZWU1M2FiYSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMTVUMTY6NDQ6NDZaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMTVUMTY6NTE6MjJaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0xNVQxNjo1MToyMloiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTE1VDE2OjUxOjIyWiIsImFkZGl0aW9ucyI6NTc2NSwiZGVsZXRpb25zIjozNjgsImNoYW5nZWRfZmlsZXMiOjUwLCJjb21taXRzX2NvdW50IjoyLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgUHJvYmxlbSBhbmQgYmVoYXZpb3IgVGhlIEpldiBjb21wYW5pb24gc2tpbGwgZGVwZW5kZWQgb24gcmVwb3NpdG9yeSBkb2N1bWVudGF0aW9uIGFuZCBoYWQgbm8gcmVwcm9kdWNpYmxlIHN0YW5kYWxvbmUgcGFja2FnZSBvciByZWFsLWFnZW50IGV2YWx1YXRpb24gcGF0aC4gVGhpcyBjaGFuZ2UgbWFrZXMgdGhlIGNvbXBsZXRlIHNraWxsIGluZGVwZW5kZW50bHkgaW5zdGFsbGFibGUgYXQgYC5hZ2VudHMvc2tpbGxzL2pldi1tY3BgIGFuZCBhZGRzIGJvdW5kZWQgZXZhbHVhdGlvbnMgb2YgdGhlIGNvbWJpbmVkIHNraWxsICsgbGl2ZSBNQ1Agd29ya2Zsb3cgaW4gQ29kZXggYW5kIHRoZSBvZmZpY2lhbCBDdXJzb3IgQ0xJLiAjIyBDaGFuZ2VzIC0gTW92ZSBjYW5vbmljYWwgY29udHJhY3RzIGluXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjo4LCJ0aXRsZSI6IlBpbiB0aGUgbmV3ZXN0IHB1bGwgcmVxdWVzdCBvbiB0aGUgd2F0Y2ggYm9hcmQiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvOCIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJjdXJzb3IvaW50ZXJhY3RpdmUtcHItd2F0Y2gtNTE4ZSIsImJhc2UiOiJtYWluIiwic2hhIjoiNDgzMzYzNDZjZDNmYjVlYjk2NTU2MTI2NWUwYmYzZDA1OWVjNWYwZiIsIm1lcmdlX2NvbW1pdF9zaGEiOiI5NDQ4ZjYxMjAwMTVmMmY2YzZkYWQ3MTM3YzdmMjM0NTQ1MjA5OTE4IiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0wOS0yMVQxNzo1OTowNloiLCJ1cGRhdGVkX2F0IjoiMjAyNi0wOS0yMVQxNzo1OToxMloiLCJtZXJnZWRfYXQiOiIyMDI2LTA5LTIxVDE3OjU5OjEyWiIsImNsb3NlZF9hdCI6IjIwMjYtMDktMjFUMTc6NTk6MTJaIiwiYWRkaXRpb25zIjoxMTE4LCJkZWxldGlvbnMiOjEzMywiY2hhbmdlZF9maWxlcyI6NiwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgLSBUaGUgR2l0SHViIHdhdGNoIGJvYXJkIGFsd2F5cyBsZWFkcyB3aXRoIHRoZSBoaWdoZXN0LW51bWJlcmVkIHB1bGwgcmVxdWVzdCwgc28gdGhlIGxhdGVzdCBvbmUgc3RheXMgdmlzaWJsZS4gLSBFYWNoIHB1bGwgcmVxdWVzdCBzaG93cyBhdXRob3IsIGJyYW5jaGVzLCBkaWZmIHNpemUsIGNoZWNrcywgcmV2aWV3cywgY29tbWl0cywgYW5kIGZpbGVzLiAtIEEgZmFpbGVkIEdpdEh1YiByZWFkIGtlZXBzIHRoZSBsYXN0IHNhdmVkIGxpc3QgYW5kIHNheXMgdGhlIGxpdmUgbGlzdCBpcyB1bmF2YWlsYWJsZSwgaW5zdGVhZCBvZiBibGFua2luZyB0aGUgcGFnZSBvciBwcmV0ZW5kaW5nIHRoZSBsaXN0IGlzIGVtcHR5LiAtIGBkb2NzL2dpdGh1Yi13YXRjaC5odG1sYCBhZGRzIHNlYVx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6NywidGl0bGUiOiJGaXggamV2LW1jcCBhdWRpdCBmaW5kaW5ncyIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC83IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImN1cnNvci9qZXYtYXVkaXQtZml4ZXMtb3BzIiwiYmFzZSI6Im1haW4iLCJzaGEiOiJiOTJmOWEwMWYyNDE4MDI4MTIzOTE2NmM1NTU0ODQ5MDUxYzhhZTcxIiwibWVyZ2VfY29tbWl0X3NoYSI6IjdjYWZjNDAyY2JkNzc2Y2FlNTU5MDI0MTVkODQ0ODI5NzFkZjE3ZDQiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTA5LTIxVDE3OjM3OjI1WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTA5LTIxVDE3OjM3OjMxWiIsIm1lcmdlZF9hdCI6IjIwMjYtMDktMjFUMTc6Mzc6MzFaIiwiY2xvc2VkX2F0IjoiMjAyNi0wOS0yMVQxNzozNzozMVoiLCJhZGRpdGlvbnMiOjk2OSwiZGVsZXRpb25zIjoxNTEsImNoYW5nZWRfZmlsZXMiOjM1LCJjb21taXRzX2NvdW50Ijo0LCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSAtIEdpdEh1YiBub3RpZnkgbm8gbG9uZ2VyIHJ1bnMgcHVsbC1yZXF1ZXN0IGhlYWQgY29kZSwgYW5kIGl0IHBpbnMgdGhlIEFQSSBob3N0LiAtIGBqZXZfc3RlcGAgaWdub3JlcyB0aGUgaG9zdCBgcHJlcGFyZWRfdG9vbF9jYWxsYCBmbGFnLCBhbmQgZW1wdHkgY2FuZGlkYXRlIGxpc3RzIGFyZSBub3QgdHJlYXRlZCBhcyBhdXRvLiAtIFJldmlldyBhbmQgZ2F0ZSByZXF1aXJlIHBlci1kaW1lbnNpb24gZmxvb3JzLiAtIFJhbmsgYXV0byBuZWVkcyBhIGZpbmFsLXJvdW5kIGV4aXN0cyByZXN1bHQgcGx1cyBhIGNvaGVyZW50IGJlc3QuIC0gVHlwZVNhZmUgdGltZW91dCBhbmQgYmFzZSBVUkwgYXJlIGJvdW5kZWQuIC0gUGVyLWNhbGwgZmxvb3JzIGNhbiBvbmx5IHRpZ2h0ZW4uIC1cdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX1dfQ== -->
