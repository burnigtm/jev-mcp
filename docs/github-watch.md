# Jev_MCP GitHub watch

**Latest pull request:** [#23 feat: calibrate, jev://ledger resource and SARIF output](https://github.com/burnigtm/jev-mcp/pull/23) — **open** 2026-10-24T09:23:30Z · just now · burnigtm · `feat/calibrate-sarif` → `feat/caller-context` · +670 −8 · 12 files.

Open **9** · Merged **6** · Closed **0** · [Interactive board](github-watch.html)

This is the **Cursor Project dashboard** for [burnigtm/jev-mcp](https://github.com/burnigtm/jev-mcp). Open **Projects → Jev_MCP** (not the Agents list). The latest pull request stays at the top even when the list is long. GitHub Actions refreshes this file on branch `cursor-watch`.

| | |
| --- | --- |
| **Last refresh** | 2026-10-24T09:24:00Z |
| **Data** | GitHub API |
| **Last GitHub event** | `pull_request_target` `opened` |
| **Open PRs** | [#23](https://github.com/burnigtm/jev-mcp/pull/23) feat: calibrate, jev://ledger resource and SARIF output, [#22](https://github.com/burnigtm/jev-mcp/pull/22) feat: optional caller context for the review tools (opt-in), [#21](https://github.com/burnigtm/jev-mcp/pull/21) feat: pull-request gate (jev-mcp ci), [#20](https://github.com/burnigtm/jev-mcp/pull/20) feat: enforced Claude Code hooks and jev-mcp check, [#19](https://github.com/burnigtm/jev-mcp/pull/19) feat: chunked review for diffs too large for one request |
| **Merged (recent)** | [#14](https://github.com/burnigtm/jev-mcp/pull/14) Live Jev value benchmark with randomized cases, plus the fixes and calibration it found, [#13](https://github.com/burnigtm/jev-mcp/pull/13) Guardrail hardening: policy fixes, cache/budget/stats, risk-aware gate, loop detector, [#12](https://github.com/burnigtm/jev-mcp/pull/12) feat: add scope, triage, and security risk tools, [#11](https://github.com/burnigtm/jev-mcp/pull/11) security: harden untrusted-data handling and helper boundaries, [#10](https://github.com/burnigtm/jev-mcp/pull/10) Package portable Jev skill and add real-agent evaluations |
| **GitHub `main`** | [`7afd083`](https://github.com/burnigtm/jev-mcp/commit/7afd08325ea0a6f566771fafd265e6000c688984) |
| **Cursor target** | `bc-c78e565c-bc13-4d27-ada8-cc5e7e04eb9e` |

## Latest

<details open>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/23">#23 feat: calibrate, jev://ledger resource and SARIF output — OPEN</a></summary>
<table>
<tr><td><strong>State</strong></td><td>OPEN</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/calibrate-sarif → feat/caller-context</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:23:30Z · just now</td></tr>
<tr><td><strong>Merged</strong></td><td>not merged</td></tr>
<tr><td><strong>Diff</strong></td><td>+670 −8 · 12 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>5 still running · 6 checks</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/7afd08325ea0a6f566771fafd265e6000c688984"><code>7afd083</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/c86887624d992de70e0abbda18304a43053b7706"><code>c868876</code></a></td></tr>
</table>
<p><strong>Commits</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/7afd08325ea0a6f566771fafd265e6000c688984"><code>7afd083</code></a> feat: calibrate, jev://ledger resource and SARIF output</li>
</ul>
<p><strong>Files</strong></p><ul>
<li><code>docs/changelog.md</code> modified +6 −0</li>
<li><code>docs/ci.md</code> modified +5 −1</li>
<li><code>docs/configuration.md</code> modified +3 −1</li>
<li><code>src/calibrate.ts</code> added +229 −0</li>
<li><code>src/ci.ts</code> modified +50 −0</li>
<li><code>src/cli.ts</code> modified +30 −1</li>
<li><code>src/index.ts</code> modified +8 −1</li>
<li><code>src/server.ts</code> modified +19 −0</li>
<li><code>tests/calibrate.test.ts</code> added +316 −0</li>
<li><code>tests/mcp.test.ts</code> modified +1 −1</li>
<li><code>tests/package.test.ts</code> modified +1 −1</li>
<li><code>tests/transport.test.ts</code> modified +2 −2</li>
</ul>
<p><strong>Checks</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081766820/job/120836612271">publish</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081766820/job/120836612129">notify</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081766726/job/120836611450">check (windows-latest, 22)</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081766726/job/120836611239">check (windows-latest, 20)</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081766726/job/120836611233">check (ubuntu-latest, 22)</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081766726/job/120836611143">check (ubuntu-latest, 20)</a> <code>in_progress</code></li>
</ul>
<p><strong>Description</strong></p><p>## Summary PR 9 (the last) of the roadmap, **stacked on #22**. - **`jev-mcp calibrate [--dir] [--since YYYY-MM] [--min-sample N] [--json]`**: per-tool action mix and review/escalate rates, labeled outcomes from `jev_feedback`, false-alarm rate (among labeled holds) and miss rate (among labeled approvals), false-alarm rate by reason code, and inputs that got different actions. **Only labeled decisions count as ground truth** (silence is not evidence). A reason code needs `--min-sample` labels (d…</p>
</details>


## Open

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/22">#22 feat: optional caller context for the review tools (opt-in) — OPEN</a></summary>
<table>
<tr><td><strong>State</strong></td><td>OPEN</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/caller-context → feat/ci-gate</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:18:02Z · 5m ago</td></tr>
<tr><td><strong>Merged</strong></td><td>not merged</td></tr>
<tr><td><strong>Diff</strong></td><td>+1674 −29 · 24 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>passing · 6 checks</td></tr>
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
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081403058/job/120835556869">publish</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081403058/job/120835556567">notify</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081403042/job/120835555869">check (windows-latest, 20)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081403042/job/120835555817">check (ubuntu-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081403042/job/120835555809">check (windows-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081403042/job/120835555695">check (ubuntu-latest, 20)</a> <code>success</code></li>
</ul>
<p><strong>Description</strong></p><p>## Summary PR 8 of the roadmap, **stacked on #21**. Optional evidence about where changed code is used, for the review tools. **A negative result, shipped opt-in and off by default.** - `jev_review`, `jev_risk`, `jev_gate` accept `context.callers` (up to 40 `{ path, line?, text, symbol? }`). The server never searches the repo itself; the host supplies the list. Snippets are untrusted: sanitized, secrets redacted, instruction-like text dropped. With callers present the correctness and blast-radi…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/21">#21 feat: pull-request gate (jev-mcp ci) — OPEN</a></summary>
<table>
<tr><td><strong>State</strong></td><td>OPEN</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/ci-gate → feat/check-and-hooks</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:05:17Z · 18m ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-10-24T06:22:34Z · 3h ago</td></tr>
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


## Closed

None.


## Activity

[PR #23](https://github.com/burnigtm/jev-mcp/pull/23) feat: calibrate, jev://ledger resource and SARIF output

- Event: `pull_request_target` `opened`
- Ref: `main` SHA [`7afd083`](https://github.com/burnigtm/jev-mcp/commit/7afd08325ea0a6f566771fafd265e6000c688984)

Search, filters, checks, commits, and files are on the interactive board next to this file. Follow-ups land in the **Jev_MCP Project** chat.

Live Actions: [Notify Jev_MCP](https://github.com/burnigtm/jev-mcp/actions/workflows/notify-jev-mcp.yml).

<!-- jev-watch:snapshot eyJwdWxscyI6W3sibnVtYmVyIjoyMywidGl0bGUiOiJmZWF0OiBjYWxpYnJhdGUsIGpldjovL2xlZGdlciByZXNvdXJjZSBhbmQgU0FSSUYgb3V0cHV0Iiwic3RhdGUiOiJPUEVOIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8yMyIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L2NhbGlicmF0ZS1zYXJpZiIsImJhc2UiOiJmZWF0L2NhbGxlci1jb250ZXh0Iiwic2hhIjoiN2FmZDA4MzI1ZWEwYTZmNTY2NzcxZmFmZDI2NWU2MDAwYzY4ODk4NCIsIm1lcmdlX2NvbW1pdF9zaGEiOiJjODY4ODc2MjRkOTkyZGU3MGUwYWJiZGExODMwNGE0MzA1M2I3NzA2IiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yNFQwOToyMzozMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yNFQwOToyMzozMFoiLCJtZXJnZWRfYXQiOiIiLCJjbG9zZWRfYXQiOiIiLCJhZGRpdGlvbnMiOjY3MCwiZGVsZXRpb25zIjo4LCJjaGFuZ2VkX2ZpbGVzIjoxMiwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgUFIgOSAodGhlIGxhc3QpIG9mIHRoZSByb2FkbWFwLCAqKnN0YWNrZWQgb24gIzIyKiouIC0gKipgamV2LW1jcCBjYWxpYnJhdGUgWy0tZGlyXSBbLS1zaW5jZSBZWVlZLU1NXSBbLS1taW4tc2FtcGxlIE5dIFstLWpzb25dYCoqOiBwZXItdG9vbCBhY3Rpb24gbWl4IGFuZCByZXZpZXcvZXNjYWxhdGUgcmF0ZXMsIGxhYmVsZWQgb3V0Y29tZXMgZnJvbSBgamV2X2ZlZWRiYWNrYCwgZmFsc2UtYWxhcm0gcmF0ZSAoYW1vbmcgbGFiZWxlZCBob2xkcykgYW5kIG1pc3MgcmF0ZSAoYW1vbmcgbGFiZWxlZCBhcHByb3ZhbHMpLCBmYWxzZS1hbGFybSByYXRlIGJ5IHJlYXNvbiBjb2RlLCBhbmQgaW5wdXRzIHRoYXQgZ290IGRpZmZlcmVudCBhY3Rpb25zLiAqKk9ubHkgbGFiZWxlZCBkZWNpc1x1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbeyJzaGEiOiI3YWZkMDgzMjVlYTBhNmY1NjY3NzFmYWZkMjY1ZTYwMDBjNjg4OTg0IiwibWVzc2FnZSI6ImZlYXQ6IGNhbGlicmF0ZSwgamV2Oi8vbGVkZ2VyIHJlc291cmNlIGFuZCBTQVJJRiBvdXRwdXQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9jb21taXQvN2FmZDA4MzI1ZWEwYTZmNTY2NzcxZmFmZDI2NWU2MDAwYzY4ODk4NCJ9XSwiZmlsZXMiOlt7ImZpbGVuYW1lIjoiZG9jcy9jaGFuZ2Vsb2cubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jaS5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo1LCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJkb2NzL2NvbmZpZ3VyYXRpb24ubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MywiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoic3JjL2NhbGlicmF0ZS50cyIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoyMjksImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNyYy9jaS50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo1MCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic3JjL2NsaS50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjozMCwiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoic3JjL2luZGV4LnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjgsImRlbGV0aW9ucyI6MX0seyJmaWxlbmFtZSI6InNyYy9zZXJ2ZXIudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTksImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InRlc3RzL2NhbGlicmF0ZS50ZXN0LnRzIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjMxNiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoidGVzdHMvbWNwLnRlc3QudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MSwiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoidGVzdHMvcGFja2FnZS50ZXN0LnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEsImRlbGV0aW9ucyI6MX0seyJmaWxlbmFtZSI6InRlc3RzL3RyYW5zcG9ydC50ZXN0LnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjIsImRlbGV0aW9ucyI6Mn1dLCJjaGVja3MiOlt7Im5hbWUiOiJwdWJsaXNoIiwic3RhdGUiOiJpbl9wcm9ncmVzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MTc2NjgyMC9qb2IvMTIwODM2NjEyMjcxIn0seyJuYW1lIjoibm90aWZ5Iiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgxNzY2ODIwL2pvYi8xMjA4MzY2MTIxMjkifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIyKSIsInN0YXRlIjoiaW5fcHJvZ3Jlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwODE3NjY3MjYvam9iLzEyMDgzNjYxMTQ1MCJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjApIiwic3RhdGUiOiJpbl9wcm9ncmVzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MTc2NjcyNi9qb2IvMTIwODM2NjExMjM5In0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIyKSIsInN0YXRlIjoiaW5fcHJvZ3Jlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwODE3NjY3MjYvam9iLzEyMDgzNjYxMTIzMyJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6ImluX3Byb2dyZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgxNzY2NzI2L2pvYi8xMjA4MzY2MTExNDMifV19LHsibnVtYmVyIjoyMiwidGl0bGUiOiJmZWF0OiBvcHRpb25hbCBjYWxsZXIgY29udGV4dCBmb3IgdGhlIHJldmlldyB0b29scyAob3B0LWluKSIsInN0YXRlIjoiT1BFTiIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMjIiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC9jYWxsZXItY29udGV4dCIsImJhc2UiOiJmZWF0L2NpLWdhdGUiLCJzaGEiOiI4MTNlNGY0YWFiYzRlOGQ1ZDJkYzI4ZjU4MDY3OTA3ZTBlMGNiY2M3IiwibWVyZ2VfY29tbWl0X3NoYSI6IjBkZWM2MzIyOTA0ZjUxYzUwYjg5MGNjMjBjZTQzZjVhMjY1OTQzZTMiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjE4OjAyWiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjE4OjAyWiIsIm1lcmdlZF9hdCI6IiIsImNsb3NlZF9hdCI6IiIsImFkZGl0aW9ucyI6MTY3NCwiZGVsZXRpb25zIjoyOSwiY2hhbmdlZF9maWxlcyI6MjQsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFBSIDggb2YgdGhlIHJvYWRtYXAsICoqc3RhY2tlZCBvbiAjMjEqKi4gT3B0aW9uYWwgZXZpZGVuY2UgYWJvdXQgd2hlcmUgY2hhbmdlZCBjb2RlIGlzIHVzZWQsIGZvciB0aGUgcmV2aWV3IHRvb2xzLiAqKkEgbmVnYXRpdmUgcmVzdWx0LCBzaGlwcGVkIG9wdC1pbiBhbmQgb2ZmIGJ5IGRlZmF1bHQuKiogLSBgamV2X3Jldmlld2AsIGBqZXZfcmlza2AsIGBqZXZfZ2F0ZWAgYWNjZXB0IGBjb250ZXh0LmNhbGxlcnNgICh1cCB0byA0MCBgeyBwYXRoLCBsaW5lPywgdGV4dCwgc3ltYm9sPyB9YCkuIFRoZSBzZXJ2ZXIgbmV2ZXIgc2VhcmNoZXMgdGhlIHJlcG8gaXRzZWxmOyB0aGUgaG9zdCBzdXBwbGllcyB0aGUgbGlzdC4gU25pcHBldHMgYXJlIHVudHJ1c3RlZDogc2FuaXRpemVkLFx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbeyJzaGEiOiI4MTNlNGY0YWFiYzRlOGQ1ZDJkYzI4ZjU4MDY3OTA3ZTBlMGNiY2M3IiwibWVzc2FnZSI6ImZlYXQ6IG9wdGlvbmFsIGNhbGxlciBjb250ZXh0IGZvciB0aGUgcmV2aWV3IHRvb2xzIChvcHQtaW4pIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvY29tbWl0LzgxM2U0ZjRhYWJjNGU4ZDVkMmRjMjhmNTgwNjc5MDdlMGUwY2JjYzcifV0sImZpbGVzIjpbeyJmaWxlbmFtZSI6Ii5lbnYuZXhhbXBsZSIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoyLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NoYW5nZWxvZy5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo2LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NpLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImRvY3MvY29uZmlndXJhdGlvbi5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL2NhbGxlcnMtMjAyNi0xMC0yNC5qc29uIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjkwMSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9jYWxsZXJzLTIwMjYtMTAtMjQubWQiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MjYsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNjcmlwdHMvZXZhbC1ib251cy5tanMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NSwiZGVsZXRpb25zIjoyfSx7ImZpbGVuYW1lIjoic2NyaXB0cy9saWIvYm9udXMtY2FsbGVycy5tanMiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NzMsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNjcmlwdHMvbGliL2JvbnVzLWdlbmVyYXRvci5tanMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NCwiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoic2tpbGxzL2pldi1tY3AvcmVmZXJlbmNlcy90b29scy5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo1LCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJzcmMvY2hlY2sudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTAsImRlbGV0aW9ucyI6Mn0seyJmaWxlbmFtZSI6InNyYy9jaS50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoyMCwiZGVsZXRpb25zIjowfV0sImNoZWNrcyI6W3sibmFtZSI6InB1Ymxpc2giLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwODE0MDMwNTgvam9iLzEyMDgzNTU1Njg2OSJ9LHsibmFtZSI6Im5vdGlmeSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MTQwMzA1OC9qb2IvMTIwODM1NTU2NTY3In0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwODE0MDMwNDIvam9iLzEyMDgzNTU1NTg2OSJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwODE0MDMwNDIvam9iLzEyMDgzNTU1NTgxNyJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjIpIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgxNDAzMDQyL2pvYi8xMjA4MzU1NTU4MDkifSx7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjApIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgxNDAzMDQyL2pvYi8xMjA4MzU1NTU2OTUifV19LHsibnVtYmVyIjoyMSwidGl0bGUiOiJmZWF0OiBwdWxsLXJlcXVlc3QgZ2F0ZSAoamV2LW1jcCBjaSkiLCJzdGF0ZSI6Ik9QRU4iLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzIxIiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvY2ktZ2F0ZSIsImJhc2UiOiJmZWF0L2NoZWNrLWFuZC1ob29rcyIsInNoYSI6ImExZDM0MDI2Y2YzYjczZDBjNGUwMDdiMTI4MTRhOTljYmNjNzIzM2MiLCJtZXJnZV9jb21taXRfc2hhIjoiZDNjMTBiNzE1YjYwZjVjYjQxNjUxMjM1OGJmNmQyYTBmZmJiNWRkNyIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDk6MDU6MTdaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDk6MDU6MTdaIiwibWVyZ2VkX2F0IjoiIiwiY2xvc2VkX2F0IjoiIiwiYWRkaXRpb25zIjoxMjg4LCJkZWxldGlvbnMiOjEyLCJjaGFuZ2VkX2ZpbGVzIjoxNCwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgUFIgNyBvZiB0aGUgcm9hZG1hcCwgKipzdGFja2VkIG9uICMyMCoqLiBgamV2LW1jcCBjaWAgaXMgdGhlIHB1bGwtcmVxdWVzdCBnYXRlOiBpdCBhbnN3ZXJzIGBhdXRvYCwgYHJldmlld2Agb3IgYGVzY2FsYXRlYCAoZXhpdCAwLCAxMCwgMjA7IDIgb24gYW55IGVycm9yLCBmYWlsLWNsb3NlZCkgYW5kIG5ldmVyIHJ1bnMgdGhlIHB1bGwgcmVxdWVzdCdzIGNvZGUuIC0gKipQb2xpY3kgZnJvbSB0aGUgYmFzZSByZWYuKiogYC5qZXYtcG9saWN5Lmpzb25gIGlzIHJlYWQgd2l0aCBgZ2l0IHNob3cgQkFTRTouLi5gLCBzbyBhIHB1bGwgcmVxdWVzdCBjYW5ub3QgbG9vc2VuIGl0cyBvd24gcnVsZXM7IGNoYW5naW5nIHRoZSBmaWxlIGhvbGRzLCBhIGJyb2tlbiBvbmUgaG9sZHMuIEV2ZVx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbeyJzaGEiOiJhMWQzNDAyNmNmM2I3M2QwYzRlMDA3YjEyODE0YTk5Y2JjYzcyMzNjIiwibWVzc2FnZSI6ImZlYXQ6IHB1bGwtcmVxdWVzdCBnYXRlIChqZXYtbWNwIGNpKSIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2NvbW1pdC9hMWQzNDAyNmNmM2I3M2QwYzRlMDA3YjEyODE0YTk5Y2JjYzcyMzNjIn1dLCJmaWxlcyI6W3siZmlsZW5hbWUiOiIuZW52LmV4YW1wbGUiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiUkVBRE1FLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImRvY3MvY2hhbmdlbG9nLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjcsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImRvY3MvY2kubWQiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NDYsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImRvY3MvY29uZmlndXJhdGlvbi5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL2NpLTIwMjYtMTAtMjQuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoyOTAsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvY2ktMjAyNi0xMC0yNC5tZCIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoyNiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXhhbXBsZXMvZ2l0aHViLXByLWdhdGUueW1sIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjU5LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzcmMvY2hlY2sudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NTMsImRlbGV0aW9ucyI6MTJ9LHsiZmlsZW5hbWUiOiJzcmMvY2kudHMiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6Mjg4LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzcmMvY2xpLnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjY2LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzcmMvZ2l0LnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjc0LCJkZWxldGlvbnMiOjB9XSwiY2hlY2tzIjpbeyJuYW1lIjoicHVibGlzaCIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MDU2OTkxMi9qb2IvMTIwODMzMDU4NTIzIn0seyJuYW1lIjoibm90aWZ5Iiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgwNTY5OTEyL2pvYi8xMjA4MzMwNTg0NTgifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MDU2OTU5Ny9qb2IvMTIwODMzMDU2NzIyIn0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwODA1Njk1OTcvam9iLzEyMDgzMzA1NjY5OSJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwODA1Njk1OTcvam9iLzEyMDgzMzA1NjY4MSJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwODA1Njk1OTcvam9iLzEyMDgzMzA1NjUyNSJ9XX0seyJudW1iZXIiOjIwLCJ0aXRsZSI6ImZlYXQ6IGVuZm9yY2VkIENsYXVkZSBDb2RlIGhvb2tzIGFuZCBqZXYtbWNwIGNoZWNrIiwic3RhdGUiOiJPUEVOIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8yMCIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L2NoZWNrLWFuZC1ob29rcyIsImJhc2UiOiJmZWF0L2xhcmdlLWRpZmYtcmV2aWV3Iiwic2hhIjoiM2MzZjg3ZTcyYmIzMTc4NjdmZjhkNTkyNDMyZWZjOGZhZDA2OGIxMCIsIm1lcmdlX2NvbW1pdF9zaGEiOiIyMzg2ZjY0MjM0OTZlZDI5N2ZlZjUwMWEyZmZhYTBjMmMyMTlkYzNiIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yNFQwODowMjo1OVoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yNFQwODowMjo1OVoiLCJtZXJnZWRfYXQiOiIiLCJjbG9zZWRfYXQiOiIiLCJhZGRpdGlvbnMiOjcxODEsImRlbGV0aW9ucyI6MCwiY2hhbmdlZF9maWxlcyI6MTksImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFBSIDYgb2YgdGhlIHJvYWRtYXAsICoqc3RhY2tlZCBvbiAjMTkqKi4gTWFrZXMgdGhlIGd1YXJkIHJ1biBvbiBldmVyeSB0b29sIGNhbGwgaW4gQ2xhdWRlIENvZGUgaW5zdGVhZCBvZiBiZWluZyBhZHZpc29yeS4gLSAqKmBqZXYtbWNwIGhvb2sgcHJlLXRvb2wtdXNlYCoqOiBjbGFzc2lmaWVyIGFuZCByZXBvc2l0b3J5IHBvbGljeSBmaXJzdDsgYSBjb25maXJtZWQgcmVhZC1vbmx5IGNvbW1hbmQgaXMgc2lsZW50IHdpdGggbm8gbW9kZWwgY2FsbDsgcmVhZHMgb2Yga2V5L2NyZWRlbnRpYWwgZmlsZXMgYW5kIGVkaXRzIHRvIHRoZSBndWFyZCdzIG93biBjb25maWcgYXNrIHdpdGhvdXQgYSBtb2RlbDsgb25seSB0aGUgZ3JheSB6b25lIGNhbGxzIGBqZXZfc2NvcGVgLiBBIGhvb2tcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W3sic2hhIjoiM2MzZjg3ZTcyYmIzMTc4NjdmZjhkNTkyNDMyZWZjOGZhZDA2OGIxMCIsIm1lc3NhZ2UiOiJmZWF0OiBlbmZvcmNlZCBDbGF1ZGUgQ29kZSBob29rcyBhbmQgamV2LW1jcCBjaGVjayIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2NvbW1pdC8zYzNmODdlNzJiYjMxNzg2N2ZmOGQ1OTI0MzJlZmM4ZmFkMDY4YjEwIn1dLCJmaWxlcyI6W3siZmlsZW5hbWUiOiIuZW52LmV4YW1wbGUiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiUkVBRE1FLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImRvY3MvY2hhbmdlbG9nLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEwLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NvbmZpZ3VyYXRpb24ubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9ob29rcy5tZCIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo3NywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvZml4dHVyZXMvcG9saWN5L2hvb2stcG9saWN5Lmpzb24iLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MTQsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvaG9va3MtMjAyNi0xMC0yNC5qc29uIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjUyNjEsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvaG9va3MtMjAyNi0xMC0yNC5tZCIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo0MSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXhhbXBsZXMvY2xhdWRlLWNvZGUuc2V0dGluZ3MuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjozNywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic2NyaXB0cy9ldmFsLWhvb2tzLm1qcyIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoxNDMsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNyYy9jaGVjay50cyIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjozMzUsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNyYy9jbGkudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6ODIsImRlbGV0aW9ucyI6MH1dLCJjaGVja3MiOlt7Im5hbWUiOiJub3RpZnkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzY1MTcwMzEvam9iLzEyMDgyMDkwMzQ1NCJ9LHsibmFtZSI6InB1Ymxpc2giLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzY1MTcwMzEvam9iLzEyMDgyMDkwMzIwMSJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjIpIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDc2NTE2OTIwL2pvYi8xMjA4MjA5MDIyOTEifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3NjUxNjkyMC9qb2IvMTIwODIwOTAyMTUwIn0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3NjUxNjkyMC9qb2IvMTIwODIwOTAyMDk0In0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3NjUxNjkyMC9qb2IvMTIwODIwOTAxOTU2In1dfSx7Im51bWJlciI6MTksInRpdGxlIjoiZmVhdDogY2h1bmtlZCByZXZpZXcgZm9yIGRpZmZzIHRvbyBsYXJnZSBmb3Igb25lIHJlcXVlc3QiLCJzdGF0ZSI6Ik9QRU4iLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzE5IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvbGFyZ2UtZGlmZi1yZXZpZXciLCJiYXNlIjoiZmVhdC9yZXBvLXBvbGljeS1wcm9maWxlcyIsInNoYSI6ImY0ZjNhOTI4MjkwZjJiMjBiZWMxZDJhMWZjYzUwODE1YzFiNmQxNDUiLCJtZXJnZV9jb21taXRfc2hhIjoiODFhOGQxM2RlZWY0MjU0M2UyNjcyMDRiZGRjYjAxYmU3NjBmNmJjYSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDc6NDM6NDRaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDc6NDM6NDRaIiwibWVyZ2VkX2F0IjoiIiwiY2xvc2VkX2F0IjoiIiwiYWRkaXRpb25zIjozODMxLCJkZWxldGlvbnMiOjc0LCJjaGFuZ2VkX2ZpbGVzIjoyNCwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgUFIgNSBvZiB0aGUgcm9hZG1hcC4gKipTdGFja2VkIG9uICMxOCoqIChiYXNlIGlzIHRoYXQgYnJhbmNoOyBHaXRIdWIgcmV0YXJnZXRzIGl0IGFzIHRoZSBzdGFjayBtZXJnZXMpLiBVbnRpbCBub3cgYSBkaWZmIHBhc3QgYWJvdXQgMzEuOGsgZXN0aW1hdGVkIHRva2VucyB3YXMgY3V0IG9mZiBhdCB0aGUgdGFpbCBhbmQgY291bGQgbmV2ZXIgYmUgYGF1dG9gLCBzbyBhIGxhcmdlIGNoYW5nZSB3YXMgdW5yZXZpZXdhYmxlIGFuZCBhIGRlZmVjdCBwYXN0IHRoZSBjdXQgd2FzIGludmlzaWJsZS4gYGpldl9yZXZpZXdgLCBgamV2X3Jpc2tgIGFuZCBgamV2X2dhdGVgIG5vdyByZXZpZXcgaXQgaW4gcGFydHMuIC0gKipTcGxpdCBhbG9uZyBmaWxlIGJvdW5kYXJpZXMuKiogQSBsb3NzbFx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbeyJzaGEiOiJmNGYzYTkyODI5MGYyYjIwYmVjMWQyYTFmY2M1MDgxNWMxYjZkMTQ1IiwibWVzc2FnZSI6ImZlYXQ6IGNodW5rZWQgcmV2aWV3IGZvciBkaWZmcyB0b28gbGFyZ2UgZm9yIG9uZSByZXF1ZXN0IiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvY29tbWl0L2Y0ZjNhOTI4MjkwZjJiMjBiZWMxZDJhMWZjYzUwODE1YzFiNmQxNDUifV0sImZpbGVzIjpbeyJmaWxlbmFtZSI6Ii5lbnYuZXhhbXBsZSIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoyLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NoYW5nZWxvZy5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo5LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NvbmZpZ3VyYXRpb24ubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9sYXJnZS1kaWZmLTIwMjYtMTAtMjQuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoxODc0LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL2xhcmdlLWRpZmYtMjAyNi0xMC0yNC5tZCIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo0OCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic2NyaXB0cy9ldmFsLWJvbnVzLm1qcyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo4LCJkZWxldGlvbnMiOjJ9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2xpYi9ib251cy1nZW5lcmF0b3IubWpzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjYsImRlbGV0aW9ucyI6MX0seyJmaWxlbmFtZSI6InNjcmlwdHMvbGliL2JvbnVzLWxhcmdlLm1qcyIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoxNTEsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNraWxscy9qZXYtbWNwL3JlZmVyZW5jZXMvdG9vbHMubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTIsImRlbGV0aW9ucyI6M30seyJmaWxlbmFtZSI6InNyYy9jb25maWcudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic3JjL2RpZmYtY2h1bmtzLnRzIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjI2MSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic3JjL2RpZmYudHMiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MTM1LCJkZWxldGlvbnMiOjB9XSwiY2hlY2tzIjpbeyJuYW1lIjoibm90aWZ5Iiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDc1MjgyMjcyL2pvYi8xMjA4MTcxODcyMTcifSx7Im5hbWUiOiJwdWJsaXNoIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDc1MjgyMjcyL2pvYi8xMjA4MTcxODcxNjAifSx7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjIpIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDc1MjgyMTk2L2pvYi8xMjA4MTcxODU5MTAifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3NTI4MjE5Ni9qb2IvMTIwODE3MTg1ODk3In0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzUyODIxOTYvam9iLzEyMDgxNzE4NTg1MiJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzUyODIxOTYvam9iLzEyMDgxNzE4NTcwMyJ9XX0seyJudW1iZXIiOjE4LCJ0aXRsZSI6IlJlcG9zaXRvcnkgcG9saWN5IGZpbGUsIHByb2ZpbGVzLCBhbmQgYSBkZWRpY2F0ZWQgdHJpYWdlIHJlY292ZXJhYmlsaXR5IGJhciIsInN0YXRlIjoiT1BFTiIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTgiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC9yZXBvLXBvbGljeS1wcm9maWxlcyIsImJhc2UiOiJmZWF0L2RlY2lzaW9uLWxlZGdlciIsInNoYSI6Ijk5YWUxNTYyOTlkNGJlOWNlM2E2NjMyNWQ4OGQ1OTBiOTAyN2RmODQiLCJtZXJnZV9jb21taXRfc2hhIjoiZDExM2YyOGE3ZmQ4NGM2ZGI0OWU1MzIxY2U0N2Y4YTRlNjhmYTZlYiIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDc6MDk6MjFaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDc6MDk6MjFaIiwibWVyZ2VkX2F0IjoiIiwiY2xvc2VkX2F0IjoiIiwiYWRkaXRpb25zIjoyNjEyNCwiZGVsZXRpb25zIjo0MywiY2hhbmdlZF9maWxlcyI6MjQsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFBSIDQgb2YgdGhlIHJvYWRtYXAuICoqU3RhY2tlZCBvbiAjMTcqKiAoYmFzZSBpcyB0aGF0IGJyYW5jaDsgR2l0SHViIHJldGFyZ2V0cyBpdCBhcyB0aGUgc3RhY2sgbWVyZ2VzKS4gQWRkcyB0aGUgZGV0ZXJtaW5pc3RpYyBsYXllciB0aGUgaG9va3MgYW5kIENJIHdpbGwgdXNlLCBhbmQgc2V0dGxlcyB0aGUgb3BlbiBcInRyaWFnZSBiYXJcIiBhbmQgXCJzdHJpY3QgcHJvZmlsZVwiIHF1ZXN0aW9ucyB3aXRoIG1lYXN1cmVtZW50cyBpbnN0ZWFkIG9mIGFyZ3VtZW50LiAtICoqYC5qZXYtcG9saWN5Lmpzb25gKiosIGV2YWx1YXRlZCBieSBgamV2X3Njb3BlYCBiZWZvcmUgYW55IEpldiByZXF1ZXN0OiAtIGBwcm90ZWN0ZWRfcGF0aHNgOiBnbG9icyB3aXRoIGEgYHJldmlld2Agb3IgYGRlXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOlt7InNoYSI6Ijk5YWUxNTYyOTlkNGJlOWNlM2E2NjMyNWQ4OGQ1OTBiOTAyN2RmODQiLCJtZXNzYWdlIjoiZmVhdDogcmVwb3NpdG9yeSBwb2xpY3kgZmlsZSBhbmQgY29uZmlkZW5jZSBwcm9maWxlcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2NvbW1pdC85OWFlMTU2Mjk5ZDRiZTljZTNhNjYzMjVkODhkNTkwYjkwMjdkZjg0In1dLCJmaWxlcyI6W3siZmlsZW5hbWUiOiIuZW52LmV4YW1wbGUiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jaGFuZ2Vsb2cubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTAsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImRvY3MvY29uZmlndXJhdGlvbi5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjozOCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvZml4dHVyZXMvcG9saWN5L2JlbmNoLXBvbGljeS5qc29uIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjYsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvUkVBRE1FLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjIsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvcG9saWN5LTIwMjYtMTAtMjQuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoyMDg2LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL3BvbGljeS0yMDI2LTEwLTI0Lm1kIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjMzLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL3Byb2ZpbGVzLTIwMjYtMTAtMjQuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoyMjgwNywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9wcm9maWxlcy0yMDI2LTEwLTI0Lm1kIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjU1LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJleGFtcGxlcy9qZXYtcG9saWN5Lmpzb24iLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MTcsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNjcmlwdHMvZXZhbC1ib251cy5tanMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTEsImRlbGV0aW9ucyI6M30seyJmaWxlbmFtZSI6InNjcmlwdHMvcnVuLXRlc3RzLm1qcyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoyLCJkZWxldGlvbnMiOjF9XSwiY2hlY2tzIjpbeyJuYW1lIjoicHVibGlzaCIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MzAyMTEwNC9qb2IvMTIwODEwMzU4MTIxIn0seyJuYW1lIjoibm90aWZ5Iiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDczMDIxMTA0L2pvYi8xMjA4MTAzNTgwMTQifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MzAyMTA5NS9qb2IvMTIwODEwMzU3MzY3In0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MzAyMTA5NS9qb2IvMTIwODEwMzU3MzY2In0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MzAyMTA5NS9qb2IvMTIwODEwMzU3MzQzIn0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzMwMjEwOTUvam9iLzEyMDgxMDM1NzA1NiJ9XX0seyJudW1iZXIiOjE3LCJ0aXRsZSI6IkRlY2lzaW9uIGxlZGdlcjogZGVjaXNpb25faWQgb24gZXZlcnkgcmVzdWx0IGFuZCBqZXZfZmVlZGJhY2siLCJzdGF0ZSI6Ik9QRU4iLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzE3IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvZGVjaXNpb24tbGVkZ2VyIiwiYmFzZSI6ImZlYXQvY29tbWFuZC1lZmZlY3QtY2xhc3NpZmllciIsInNoYSI6IjUwNmY3MzgwMGU2YjQ0OTU3ZjYwZTZlMGM1MmQ1MzAwZDhkMjJkMzciLCJtZXJnZV9jb21taXRfc2hhIjoiODQxMzA5NGNlMzhjYTMyNjdiNzU1ZjViNTA4ZTJkOTUyZDk4ZmQzNSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDY6NDk6MDdaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDY6NDk6MDdaIiwibWVyZ2VkX2F0IjoiIiwiY2xvc2VkX2F0IjoiIiwiYWRkaXRpb25zIjo3NzU5LCJkZWxldGlvbnMiOjEzLCJjaGFuZ2VkX2ZpbGVzIjozMiwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgUFIgMyBvZiB0aGUgcm9hZG1hcC4gKipTdGFja2VkIG9uICMxNioqIChiYXNlIGlzIHRoYXQgYnJhbmNoOyBHaXRIdWIgcmV0YXJnZXRzIGl0IGFzIHRoZSBzdGFjayBtZXJnZXMpLiBOb3RoaW5nIHJlY29yZHMgSmV2J3MgZGVjaXNpb25zIG9yIHdoZXRoZXIgdGhleSB3ZXJlIHJpZ2h0LCBzbyByZWFsLWxpZmUgZmFsc2UtYWxhcm0gcmF0ZXMgYXJlIHVua25vd24gYW5kIGV2ZXJ5IHRocmVzaG9sZCBxdWVzdGlvbiAoc3VjaCBhcyB0aGUgdHJpYWdlIGJhcikgY2FuIG9ubHkgYmUgYXJndWVkIGZyb20gc3ludGhldGljIGJlbmNobWFya3MuIFRoaXMgYWRkcyB0aGUgbWVhc3VyZW1lbnQgbGF5ZXIgdGhlIGxhdGVyIFBScyAoaG9va3MsIENJKSB3aWxsIGxvZyBpbnRvLiAtICoqYGRlY1x1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbeyJzaGEiOiI1MDZmNzM4MDBlNmI0NDk1N2Y2MGU2ZTBjNTJkNTMwMGQ4ZDIyZDM3IiwibWVzc2FnZSI6ImZlYXQ6IGRlY2lzaW9uIGxlZGdlciwgZGVjaXNpb25faWQgb24gZXZlcnkgcmVzdWx0LCBhbmQgamV2X2ZlZWRiYWNrIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvY29tbWl0LzUwNmY3MzgwMGU2YjQ0OTU3ZjYwZTZlMGM1MmQ1MzAwZDhkMjJkMzcifV0sImZpbGVzIjpbeyJmaWxlbmFtZSI6Ii5lbnYuZXhhbXBsZSIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjozLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJBR0VOVFMubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jaGFuZ2Vsb2cubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6OCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jb25maWd1cmF0aW9uLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEwLCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJkb2NzL3Rvb2xzLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjMsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL2ZpeHR1cmVzL2xlZGdlci9SRUFETUUubWQiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvZml4dHVyZXMvbGVkZ2VyL2xlZGdlci0yMDI2LTEwLmpzb25sIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjMwNiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9SRUFETUUubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9sZWRnZXItMjAyNi0xMC0yNC5qc29uIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjY2MDksImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvbGVkZ2VyLTIwMjYtMTAtMjQubWQiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NDUsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNjcmlwdHMvYmVuY2htYXJrLm1qcyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxLCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2V2YWwtYm9udXMubWpzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjE5LCJkZWxldGlvbnMiOjF9XSwiY2hlY2tzIjpbeyJuYW1lIjoibm90aWZ5Iiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDcxNzAxMjMyL2pvYi8xMjA4MDYzMzkwMTIifSx7Im5hbWUiOiJwdWJsaXNoIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDcxNzAxMjMyL2pvYi8xMjA4MDYzMzg4NDcifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MTcwMDkyMS9qb2IvMTIwODA2MzM3MTA1In0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MTcwMDkyMS9qb2IvMTIwODA2MzM3MDg4In0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MTcwMDkyMS9qb2IvMTIwODA2MzM3MDg3In0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzE3MDA5MjEvam9iLzEyMDgwNjMzNjg5MSJ9XX0seyJudW1iZXIiOjE2LCJ0aXRsZSI6IkNvbW1hbmQgZWZmZWN0IGNsYXNzaWZpZXI6IHRoZSBjb21tYW5kIHRleHQgY2FuIHJhaXNlIGEgZGVjbGFyZWQgZWZmZWN0Iiwic3RhdGUiOiJPUEVOIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xNiIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L2NvbW1hbmQtZWZmZWN0LWNsYXNzaWZpZXIiLCJiYXNlIjoiZmVhdC9oYXJkZW5pbmctbG9vcC1idWRnZXQtZ2F0ZSIsInNoYSI6IjAwZGE3NGU5NjdmZTg4YzdjOGVkYTJiNDMzY2RiMTVmYmRlYmFmNDciLCJtZXJnZV9jb21taXRfc2hhIjoiNjUwMzk4OWU2NTI2OWU2Njg0N2VhMzVmMDJmMzBlZjE3MmNhZGNiMyIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDY6Mzg6MjNaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDY6Mzg6MjNaIiwibWVyZ2VkX2F0IjoiIiwiY2xvc2VkX2F0IjoiIiwiYWRkaXRpb25zIjo4MTcwLCJkZWxldGlvbnMiOjksImNoYW5nZWRfZmlsZXMiOjE2LCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBQUiAyIG9mIHRoZSByb2FkbWFwLiAqKlN0YWNrZWQgb24gIzE1KiogKGJhc2UgaXMgdGhhdCBicmFuY2g7IEdpdEh1YiB3aWxsIHJldGFyZ2V0IHRoaXMgdG8gYG1haW5gIG9uY2UgIzE1IG1lcmdlcykuIGBqZXZfc2NvcGVgIHRydXN0ZWQgdGhlIGhvc3QtZGVjbGFyZWQgYGVmZmVjdGA6IGByZWFkX29ubHlgICsgYHJtIC1yZiBidWlsZCAmJiBnaXQgcHVzaCAtLWZvcmNlYCByZXR1cm5lZCBgYXV0b2Agd2hlbmV2ZXIgdGhlIGp1ZGdlJ3MgYW5zd2VycyB3ZXJlIGNsZWFuLiBUaGlzIGFkZHMgYSBkZXRlcm1pbmlzdGljIGNsYXNzaWZpZXIgc28gdGhlIGNvbW1hbmQgdGV4dCBjYW4gcmFpc2UgdGhlIGVmZmVjdCwgYW5kIG5ldmVyIGxvd2VyIGl0LiAtICoqYHNyYy9lZmZlY3RzLnRzXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOlt7InNoYSI6IjAwZGE3NGU5NjdmZTg4YzdjOGVkYTJiNDMzY2RiMTVmYmRlYmFmNDciLCJtZXNzYWdlIjoiZmVhdDogZGV0ZXJtaW5pc3RpYyBjb21tYW5kIGVmZmVjdCBjbGFzc2lmaWVyIGZvciBzY29wZSwgcm91dGUgYW5kIHN0ZXAiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9jb21taXQvMDBkYTc0ZTk2N2ZlODhjN2M4ZWRhMmI0MzNjZGIxNWZiZGViYWY0NyJ9XSwiZmlsZXMiOlt7ImZpbGVuYW1lIjoiZG9jcy9jaGFuZ2Vsb2cubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9SRUFETUUubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9jbGFzc2lmaWVyLTIwMjYtMTAtMjQuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo2NzE4LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL2NsYXNzaWZpZXItMjAyNi0xMC0yNC5tZCIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo0MiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic2NyaXB0cy9ldmFsLWJvbnVzLm1qcyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjozLCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2xpYi9ib251cy1nZW5lcmF0b3IubWpzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjY3LCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2xpYi9ib251cy5tanMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTEsImRlbGV0aW9ucyI6MX0seyJmaWxlbmFtZSI6InNraWxscy9qZXYtbWNwL3JlZmVyZW5jZXMvdG9vbHMubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic3JjL2VmZmVjdHMudHMiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6ODk5LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzcmMvdG9vbHMvb3V0cHV0LXNjaGVtYXMudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTksImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNyYy90b29scy9zY29wZS50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo4LCJkZWxldGlvbnMiOjJ9LHsiZmlsZW5hbWUiOiJzcmMvdG9vbHMvc3RlcC50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo2LCJkZWxldGlvbnMiOjF9XSwiY2hlY2tzIjpbeyJuYW1lIjoicHVibGlzaCIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MDk5NzQ4Mi9qb2IvMTIwODA0MTk0MjkyIn0seyJuYW1lIjoibm90aWZ5Iiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDcwOTk3NDgyL2pvYi8xMjA4MDQxOTQxODMifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MDk5NzQyMC9qb2IvMTIwODA0MTkzNTMxIn0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MDk5NzQyMC9qb2IvMTIwODA0MTkzNTEyIn0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzA5OTc0MjAvam9iLzEyMDgwNDE5MzUwOCJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzA5OTc0MjAvam9iLzEyMDgwNDE5MzQyOSJ9XX0seyJudW1iZXIiOjE1LCJ0aXRsZSI6IkhhcmRlbmluZzogbG9vcCBkZXRlY3RvciBwcm9ncmVzcywgcmVzZXJ2ZWQgdG9rZW4gYnVkZ2V0LCBnYXRlIG9yZGVyLCB0cmlhZ2UgcHJvZ3Jlc3Mgd29yZGluZyIsInN0YXRlIjoiT1BFTiIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTUiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC9oYXJkZW5pbmctbG9vcC1idWRnZXQtZ2F0ZSIsImJhc2UiOiJtYWluIiwic2hhIjoiYTlmNGRkYWFlMjAxNzU0ZTIzN2RmYjZjMmIzYWYzZmU2MzZkMTg0MSIsIm1lcmdlX2NvbW1pdF9zaGEiOiI5ZDExMzE0M2U2MGM3MGUxMzgxMTJiZmZhM2YwNDM1MmYyYWQxMjZiIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yNFQwNjoyMjozNFoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yNFQwNjoyMjozNFoiLCJtZXJnZWRfYXQiOiIiLCJjbG9zZWRfYXQiOiIiLCJhZGRpdGlvbnMiOjg1NDMsImRlbGV0aW9ucyI6NDksImNoYW5nZWRfZmlsZXMiOjIyLCJjb21taXRzX2NvdW50IjoyLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBQUiAxIG9mIGEgOS1zdGFnZSByb2FkbWFwIChyZXZpZXdlZCBjb2RlIGZyb20gIzEyXHUyMDEzIzE0LCB0aGVuIHBsYW5uZWQgZml4ZXMgYW5kIGVuaGFuY2VtZW50cykuIEhhcmRlbmluZyBvbmx5OiBpdCBmaXhlcyBkZWZlY3RzIGZvdW5kIGJ5IHJlYWRpbmcgYW5kIHJ1bm5pbmcgdGhlIG1lcmdlZCBjb2RlLCBhbmQgb25lIG1vZGVsIG1pc2p1ZGdtZW50IGZvdW5kIGJ5IHRoZSBsaXZlIGJlbmNobWFyay4gLSAqKkxvb3AgZGV0ZWN0b3Igbm8gbG9uZ2VyIGZsYWdzIHByb2dyZXNzLioqIEZhaWx1cmUgY291bnRzIHRoYXQgc3RyaWN0bHkgc2hyaW5rIGFjcm9zcyBhdHRlbXB0cyAoOSBcdTIxOTIgNSBcdTIxOTIgMiBmYWlsZWQpIHdlcmUgcmVwb3J0ZWQgYXMgYHNhbWVfZmFpbHVyZWAgYmVjYXVzZSBldmVyXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOlt7InNoYSI6IjA2NjgxNTM4MzgwOGJjNTFlZmY2MjMzMzE4NDM4M2JjYTY2MGY3MzIiLCJtZXNzYWdlIjoiZml4OiBsb29wIGRldGVjdG9yIHByb2dyZXNzLCByZXNlcnZlZCB0b2tlbiBidWRnZXQsIGdhdGUgb3JkZXIsIHRyaWFnZSBwcm9ncmVzcyB3b3JkaW5nIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvY29tbWl0LzA2NjgxNTM4MzgwOGJjNTFlZmY2MjMzMzE4NDM4M2JjYTY2MGY3MzIifSx7InNoYSI6ImE5ZjRkZGFhZTIwMTc1NGUyMzdkZmI2YzJiM2FmM2ZlNjM2ZDE4NDEiLCJtZXNzYWdlIjoidGVzdDogd3JpdGUgaW52aXNpYmxlIGNoYXJhY3RlcnMgYXMgZXNjYXBlcyBpbiB0aGUgYmVuY2htYXJrIHNvdXJjZXMiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9jb21taXQvYTlmNGRkYWFlMjAxNzU0ZTIzN2RmYjZjMmIzYWYzZmU2MzZkMTg0MSJ9XSwiZmlsZXMiOlt7ImZpbGVuYW1lIjoiZG9jcy9jaGFuZ2Vsb2cubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6OSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jb25maWd1cmF0aW9uLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjIsImRlbGV0aW9ucyI6Mn0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvUkVBRE1FLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvaGFyZGVuaW5nLTIwMjYtMTAtMjQuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo3ODg4LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL2hhcmRlbmluZy0yMDI2LTEwLTI0Lm1kIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjQwLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2V2YWwtYm9udXMubWpzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEwLCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2xpYi9ib251cy1nZW5lcmF0b3IubWpzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjczLCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2xpYi9ib251cy5tanMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MjMsImRlbGV0aW9ucyI6OX0seyJmaWxlbmFtZSI6InNraWxscy9qZXYtbWNwL3JlZmVyZW5jZXMvdG9vbHMubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MSwiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoic3JjL2Vycm9ycy50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxMiwiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoic3JjL3BhY2tzL3RyaWFnZS50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo0LCJkZWxldGlvbnMiOjR9LHsiZmlsZW5hbWUiOiJzcmMvcmVzcG9uc2VzLnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEwLCJkZWxldGlvbnMiOjd9XSwiY2hlY2tzIjpbeyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNjk5NjAwODMvam9iLzEyMDgwMTA2MTUxMiJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNjk5NjAwODMvam9iLzEyMDgwMTA2MTQ1MCJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNjk5NjAwODMvam9iLzEyMDgwMTA2MTQyMCJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjIpIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDY5OTYwMDgzL2pvYi8xMjA4MDEwNjEzMTYifSx7Im5hbWUiOiJub3RpZnkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNjk5NTk0MDcvam9iLzEyMDgwMTA2MDIxMyJ9LHsibmFtZSI6InB1Ymxpc2giLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNjk5NTk0MDcvam9iLzEyMDgwMTA2MDE1OSJ9XX0seyJudW1iZXIiOjE0LCJ0aXRsZSI6IkxpdmUgSmV2IHZhbHVlIGJlbmNobWFyayB3aXRoIHJhbmRvbWl6ZWQgY2FzZXMsIHBsdXMgdGhlIGZpeGVzIGFuZCBjYWxpYnJhdGlvbiBpdCBmb3VuZCIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xNCIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L2pldi12YWx1ZS1iZW5jaG1hcmsiLCJiYXNlIjoibWFpbiIsInNoYSI6IjRlYTFiODE2ZTFkMDI5NmUzZWY5MzQzYjE4ZTBiOGM3MTliZWMzMTEiLCJtZXJnZV9jb21taXRfc2hhIjoiN2QyNzM3YmMyMjNjNjc0NmVhMmJjZDhiOWM2YjI4ZGUyNTY5MmMwNiIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjNUMTk6NDU6NTlaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjNUMTk6NDg6NTJaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0yM1QxOTo0ODo1MVoiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTIzVDE5OjQ4OjUxWiIsImFkZGl0aW9ucyI6MjY2OTYsImRlbGV0aW9ucyI6MzAsImNoYW5nZWRfZmlsZXMiOjI5LCJjb21taXRzX2NvdW50IjozLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBUaGlzIFBSIG1lYXN1cmVzIHdoYXQgbGl2ZSBKZXYgYWRkcyBvdmVyIGNoZWFwIGxvY2FsIHJ1bGVzLCBmaXhlcyB0aGUgamV2LW1jcCBkZWZlY3RzIHRoYXQgbWVhc3VyZW1lbnQgZXhwb3NlZCwgYW5kIHJlY2FsaWJyYXRlcyB0aHJlZSBcImxvd2VyIGlzIGJldHRlclwiIHNjb3JlcyBiYXNlZCBvbiB0aGUgZGF0YS4gLSAqKkJlbmNobWFyazoqKiBgbnBtIHJ1biBldmFsOmJvbnVzYC4gTGFiZWxsZWQgcmlza3kvc2FmZSBjYXNlcyBhcmUgZGVjaWRlZCB0aHJlZSB3YXlzOiBieSAqKm5vIGd1YXJkKiosIGJ5IGEgKipydWxlcy1vbmx5IGd1YXJkKiogd2l0aCBubyBtb2RlbCBjYWxsLCBhbmQgYnkgKipsaXZlIEpldioqLiBUaGUgNTEgaGFuZC13cml0dGVuIGNhc2VzIGFyZSBqb2luZWRcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjEzLCJ0aXRsZSI6Ikd1YXJkcmFpbCBoYXJkZW5pbmc6IHBvbGljeSBmaXhlcywgY2FjaGUvYnVkZ2V0L3N0YXRzLCByaXNrLWF3YXJlIGdhdGUsIGxvb3AgZGV0ZWN0b3IiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTMiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC92MC4zLWd1YXJkcmFpbC1oYXJkZW5pbmciLCJiYXNlIjoibWFpbiIsInNoYSI6IjFhNTg1MDAxMmIwODI3NjE5OWYwZjEzYjg0OGEyMjc4NzI2ZGQ5M2QiLCJtZXJnZV9jb21taXRfc2hhIjoiOTdlMWNkMTZmNWFkNjI2Y2ZkNGVkZTc3NjJiNTEzODk3YzQ0NGMzOSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjNUMTg6NDI6MjJaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjNUMTg6NTg6MzBaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0yM1QxODo1ODozMFoiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTIzVDE4OjU4OjMwWiIsImFkZGl0aW9ucyI6MjIzNywiZGVsZXRpb25zIjozNDYsImNoYW5nZWRfZmlsZXMiOjM0LCJjb21taXRzX2NvdW50IjozLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiRm9sbG93cyAjMTIgKHYwLjIgc2NvcGUvdHJpYWdlL3Jpc2sgdG9vbHMpLiBUaGUgcG9saWN5IGZpeGVzIGZvciBkZWZlY3RzIHRoYXQgIzEyIGl0c2VsZiBpbnRyb2R1Y2VkIHdlcmUgbW92ZWQgb250byAjMTIgYmVmb3JlIGl0IG1lcmdlZDogdGhlIHJpc2stZmxhZyBtYXNraW5nLCB0aGUgZXNjYWxhdGlvbiBjdXRvZmYgZm9yIHNjb3BlIGFuZCByaXNrLCB0cmlhZ2UgZXNjYWxhdGlvbiBvcmRlciwgdGhlIGluamVjdGlvbi1iYWNrc3RvcCByZWdyZXNzaW9uIGFuZCB0cmlhZ2UgY2F1c2UtSUQgc2FuaXRpemF0aW9uLiBUaGlzIGJyYW5jaCBhbHJlYWR5IGluY2x1ZGVzIHRoYXQgd29yayB0aHJvdWdoIGEgbWVyZ2UgY29tbWl0LiBXaGF0IHJlbWFpbnMgaGVyZSBpcyB0aGUgaGFyZGVuaW5nIG9mIHByXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoxMiwidGl0bGUiOiJmZWF0OiBhZGQgc2NvcGUsIHRyaWFnZSwgYW5kIHNlY3VyaXR5IHJpc2sgdG9vbHMiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTIiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC92MC4yLWFnZW50LWd1YXJkcmFpbHMiLCJiYXNlIjoibWFpbiIsInNoYSI6ImIwZWFjYjA0M2Q5N2M5YmQzNDE0MGM4MDdlOWU4OGZlYzYxOTQzMGEiLCJtZXJnZV9jb21taXRfc2hhIjoiOGJjYjkyYWQ2Yjg3Yjc3NTlhNmFiOTdjNDg0Zjg3NGRjZDE2ZDM4NSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMTdUMTM6MDQ6MDFaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjNUMTg6NTA6MjVaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0yM1QxODo1MDoyNFoiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTIzVDE4OjUwOjI0WiIsImFkZGl0aW9ucyI6MTU2MiwiZGVsZXRpb25zIjozOCwiY2hhbmdlZF9maWxlcyI6MzMsImNvbW1pdHNfY291bnQiOjIsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFRoaXMgUFIgZXh0ZW5kcyBgamV2LW1jcGAgZnJvbSB0aGUgY29yZSBjb2RpbmcgbG9vcCBpbnRvIHRocmVlIGFkamFjZW50IGRlY2lzaW9uIGJvdW5kYXJpZXM6IDEuICoqYGpldl9zY29wZWAqKiAtIHNlbWFudGljIHByZWZsaWdodCBmb3IgYSBob3N0LXByZXBhcmVkIGFjdGlvbi4gMi4gKipgamV2X3RyaWFnZWAqKiAtIGZhaWx1cmUgY2F1c2UsIGxvb3AgcHJvZ3Jlc3MsIGFuZCByZWNvdmVyeSBzdHJhdGVneS4gMy4gKipgamV2X3Jpc2tgKiogLSBzZWN1cml0eS1mb2N1c2VkIHBhdGNoIHJpc2sgdHJpYWdlLiBUaGUgZXhpc3RpbmcgbmluZSB0b29scyBhbmQgdGhlaXIgcG9saWNpZXMgYXJlIHVuY2hhbmdlZC4gVGhlIHNlcnZlciBub3cgZXhwb3NlcyAqKjEyIHRvb2xzLCAxMVx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MTEsInRpdGxlIjoic2VjdXJpdHk6IGhhcmRlbiB1bnRydXN0ZWQtZGF0YSBoYW5kbGluZyBhbmQgaGVscGVyIGJvdW5kYXJpZXMiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTEiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoic2VjdXJpdHkvaGFyZGVuLXVudHJ1c3RlZC1kYXRhIiwiYmFzZSI6Im1haW4iLCJzaGEiOiJlMGZmNmUzODEyMWNjODE3YjQxOWRiYTE0Y2UwZWNmYzcxNzYxMmY1IiwibWVyZ2VfY29tbWl0X3NoYSI6IjZlY2NiNTIzNDgyM2E5ZjU4ZDlhN2NhYjk1YmY3MWIwNGRmMDBjOTEiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTE3VDEyOjE0OjM0WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTE3VDEyOjM2OjE1WiIsIm1lcmdlZF9hdCI6IjIwMjYtMTAtMTdUMTI6MzY6MTVaIiwiY2xvc2VkX2F0IjoiMjAyNi0xMC0xN1QxMjozNjoxNVoiLCJhZGRpdGlvbnMiOjExMDEsImRlbGV0aW9ucyI6MTg4LCJjaGFuZ2VkX2ZpbGVzIjo2NCwiY29tbWl0c19jb3VudCI6MiwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgVGhpcyBQUiBoYXJkZW5zIHRoZSBib3VuZGFyaWVzIHdoZXJlIGBqZXYtbWNwYCBoYW5kbGVzIHRoaXJkLXBhcnR5IHRleHQsIGhvc3QtcHJlcGFyZWQgdG9vbCBtZXRhZGF0YSwgcHJvdmlkZXIgY3JlZGVudGlhbHMsIGFuZCBhZ2VudCBldmFsdWF0aW9uIGNvZGUuIEl0IGFsc28gZml4ZXMgc2V2ZXJhbCBjb3JyZWN0bmVzcyBkZWZlY3RzIGZvdW5kIGR1cmluZyB0aGUgYXVkaXQuIFRoZSBjaGVja291dCBhbHJlYWR5IGNvbnRhaW5lZCBhIHBlbmRpbmcgcmVtZWRpYXRpb24gYmF0Y2g7IHRoaXMgYnJhbmNoIGJ1aWxkcyBvbiBpdCBhbmQgdHVybnMgdGhlIHdob2xlIHNldCBpbnRvIG9uZSByZXZpZXdlZCBjaGFuZ2UuIE5vIGxpdmUgcHJvdmlkZXIgY2FsbHMgb3IgcHVibGlzaGluZ1x1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MTAsInRpdGxlIjoiUGFja2FnZSBwb3J0YWJsZSBKZXYgc2tpbGwgYW5kIGFkZCByZWFsLWFnZW50IGV2YWx1YXRpb25zIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzEwIiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImNvZGV4L3BvcnRhYmxlLXNraWxsLWV2YWxzIiwiYmFzZSI6Im1haW4iLCJzaGEiOiJmZDM0NzAxZTE1NWI2YzIzMGNiYWNlNDExZGY2MjM4ODA0MDViMTMxIiwibWVyZ2VfY29tbWl0X3NoYSI6IjU3MWY0NjQ1NjVhMTMxOWFiZTUyY2I5NTEyMGIzNzE3NGVlNTNhYmEiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTE1VDE2OjQ0OjQ2WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTE1VDE2OjUxOjIyWiIsIm1lcmdlZF9hdCI6IjIwMjYtMTAtMTVUMTY6NTE6MjJaIiwiY2xvc2VkX2F0IjoiMjAyNi0xMC0xNVQxNjo1MToyMloiLCJhZGRpdGlvbnMiOjU3NjUsImRlbGV0aW9ucyI6MzY4LCJjaGFuZ2VkX2ZpbGVzIjo1MCwiY29tbWl0c19jb3VudCI6MiwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFByb2JsZW0gYW5kIGJlaGF2aW9yIFRoZSBKZXYgY29tcGFuaW9uIHNraWxsIGRlcGVuZGVkIG9uIHJlcG9zaXRvcnkgZG9jdW1lbnRhdGlvbiBhbmQgaGFkIG5vIHJlcHJvZHVjaWJsZSBzdGFuZGFsb25lIHBhY2thZ2Ugb3IgcmVhbC1hZ2VudCBldmFsdWF0aW9uIHBhdGguIFRoaXMgY2hhbmdlIG1ha2VzIHRoZSBjb21wbGV0ZSBza2lsbCBpbmRlcGVuZGVudGx5IGluc3RhbGxhYmxlIGF0IGAuYWdlbnRzL3NraWxscy9qZXYtbWNwYCBhbmQgYWRkcyBib3VuZGVkIGV2YWx1YXRpb25zIG9mIHRoZSBjb21iaW5lZCBza2lsbCArIGxpdmUgTUNQIHdvcmtmbG93IGluIENvZGV4IGFuZCB0aGUgb2ZmaWNpYWwgQ3Vyc29yIENMSS4gIyMgQ2hhbmdlcyAtIE1vdmUgY2Fub25pY2FsIGNvbnRyYWN0cyBpblx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6OCwidGl0bGUiOiJQaW4gdGhlIG5ld2VzdCBwdWxsIHJlcXVlc3Qgb24gdGhlIHdhdGNoIGJvYXJkIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzgiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiY3Vyc29yL2ludGVyYWN0aXZlLXByLXdhdGNoLTUxOGUiLCJiYXNlIjoibWFpbiIsInNoYSI6IjQ4MzM2MzQ2Y2QzZmI1ZWI5NjU1NjEyNjVlMGJmM2QwNTllYzVmMGYiLCJtZXJnZV9jb21taXRfc2hhIjoiOTQ0OGY2MTIwMDE1ZjJmNmM2ZGFkNzEzN2M3ZjIzNDU0NTIwOTkxOCIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMDktMjFUMTc6NTk6MDZaIiwidXBkYXRlZF9hdCI6IjIwMjYtMDktMjFUMTc6NTk6MTJaIiwibWVyZ2VkX2F0IjoiMjAyNi0wOS0yMVQxNzo1OToxMloiLCJjbG9zZWRfYXQiOiIyMDI2LTA5LTIxVDE3OjU5OjEyWiIsImFkZGl0aW9ucyI6MTExOCwiZGVsZXRpb25zIjoxMzMsImNoYW5nZWRfZmlsZXMiOjYsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IC0gVGhlIEdpdEh1YiB3YXRjaCBib2FyZCBhbHdheXMgbGVhZHMgd2l0aCB0aGUgaGlnaGVzdC1udW1iZXJlZCBwdWxsIHJlcXVlc3QsIHNvIHRoZSBsYXRlc3Qgb25lIHN0YXlzIHZpc2libGUuIC0gRWFjaCBwdWxsIHJlcXVlc3Qgc2hvd3MgYXV0aG9yLCBicmFuY2hlcywgZGlmZiBzaXplLCBjaGVja3MsIHJldmlld3MsIGNvbW1pdHMsIGFuZCBmaWxlcy4gLSBBIGZhaWxlZCBHaXRIdWIgcmVhZCBrZWVwcyB0aGUgbGFzdCBzYXZlZCBsaXN0IGFuZCBzYXlzIHRoZSBsaXZlIGxpc3QgaXMgdW5hdmFpbGFibGUsIGluc3RlYWQgb2YgYmxhbmtpbmcgdGhlIHBhZ2Ugb3IgcHJldGVuZGluZyB0aGUgbGlzdCBpcyBlbXB0eS4gLSBgZG9jcy9naXRodWItd2F0Y2guaHRtbGAgYWRkcyBzZWFcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX1dfQ== -->
