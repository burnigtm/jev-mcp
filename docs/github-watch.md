# Jev_MCP GitHub watch

**Latest pull request:** [#23 feat: calibrate, jev://ledger resource and SARIF output](https://github.com/burnigtm/jev-mcp/pull/23) — **open** 2026-10-24T09:23:30Z · 6m ago · burnigtm · `feat/calibrate-sarif` → `feat/caller-context` · +670 −8 · 12 files.

Open **6** · Merged **9** · Closed **0** · [Interactive board](github-watch.html)

This is the **Cursor Project dashboard** for [burnigtm/jev-mcp](https://github.com/burnigtm/jev-mcp). Open **Projects → Jev_MCP** (not the Agents list). The latest pull request stays at the top even when the list is long. GitHub Actions refreshes this file on branch `cursor-watch`.

| | |
| --- | --- |
| **Last refresh** | 2026-10-24T09:30:10Z |
| **Data** | GitHub API |
| **Last GitHub event** | `pull_request_target` `closed` |
| **Open PRs** | [#23](https://github.com/burnigtm/jev-mcp/pull/23) feat: calibrate, jev://ledger resource and SARIF output, [#22](https://github.com/burnigtm/jev-mcp/pull/22) feat: optional caller context for the review tools (opt-in), [#21](https://github.com/burnigtm/jev-mcp/pull/21) feat: pull-request gate (jev-mcp ci), [#20](https://github.com/burnigtm/jev-mcp/pull/20) feat: enforced Claude Code hooks and jev-mcp check, [#19](https://github.com/burnigtm/jev-mcp/pull/19) feat: chunked review for diffs too large for one request |
| **Merged (recent)** | [#17](https://github.com/burnigtm/jev-mcp/pull/17) Decision ledger: decision_id on every result and jev_feedback, [#16](https://github.com/burnigtm/jev-mcp/pull/16) Command effect classifier: the command text can raise a declared effect, [#15](https://github.com/burnigtm/jev-mcp/pull/15) Hardening: loop detector progress, reserved token budget, gate order, triage progress wording, [#14](https://github.com/burnigtm/jev-mcp/pull/14) Live Jev value benchmark with randomized cases, plus the fixes and calibration it found, [#13](https://github.com/burnigtm/jev-mcp/pull/13) Guardrail hardening: policy fixes, cache/budget/stats, risk-aware gate, loop detector |
| **GitHub `main`** | [`00da74e`](https://github.com/burnigtm/jev-mcp/commit/00da74e967fe88c7c8eda2b433cdb15fbdebaf47) |
| **Cursor target** | `bc-c78e565c-bc13-4d27-ada8-cc5e7e04eb9e` |

## Latest

<details open>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/23">#23 feat: calibrate, jev://ledger resource and SARIF output — OPEN</a></summary>
<table>
<tr><td><strong>State</strong></td><td>OPEN</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/calibrate-sarif → feat/caller-context</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:23:30Z · 6m ago</td></tr>
<tr><td><strong>Merged</strong></td><td>not merged</td></tr>
<tr><td><strong>Diff</strong></td><td>+670 −8 · 12 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>passing · 6 checks</td></tr>
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
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081766820/job/120836612271">publish</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081766820/job/120836612129">notify</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081766726/job/120836611450">check (windows-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081766726/job/120836611239">check (windows-latest, 20)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081766726/job/120836611233">check (ubuntu-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081766726/job/120836611143">check (ubuntu-latest, 20)</a> <code>success</code></li>
</ul>
<p><strong>Description</strong></p><p>## Summary PR 9 (the last) of the roadmap, **stacked on #22**. - **`jev-mcp calibrate [--dir] [--since YYYY-MM] [--min-sample N] [--json]`**: per-tool action mix and review/escalate rates, labeled outcomes from `jev_feedback`, false-alarm rate (among labeled holds) and miss rate (among labeled approvals), false-alarm rate by reason code, and inputs that got different actions. **Only labeled decisions count as ground truth** (silence is not evidence). A reason code needs `--min-sample` labels (d…</p>
</details>

Most recently updated is [#16 Command effect classifier: the command text can raise a declared effect](https://github.com/burnigtm/jev-mcp/pull/16) (2026-10-24T09:30:10Z · just now). Newest number remains #23.


## Open

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/22">#22 feat: optional caller context for the review tools (opt-in) — OPEN</a></summary>
<table>
<tr><td><strong>State</strong></td><td>OPEN</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/caller-context → feat/ci-gate</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:18:02Z · 12m ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:05:17Z · 24m ago</td></tr>
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
<tr><td><strong>Branches</strong></td><td>feat/repo-policy-profiles → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:29:55Z · just now</td></tr>
<tr><td><strong>Merged</strong></td><td>not merged</td></tr>
<tr><td><strong>Diff</strong></td><td>+26124 −43 · 24 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>2 still running · 6 checks</td></tr>
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
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40082188144/job/120837844055">notify</a> <code>queued</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40082188144/job/120837843889">publish</a> <code>queued</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40073021095/job/120810357367">check (windows-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40073021095/job/120810357366">check (ubuntu-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40073021095/job/120810357343">check (ubuntu-latest, 20)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40073021095/job/120810357056">check (windows-latest, 20)</a> <code>success</code></li>
</ul>
<p><strong>Description</strong></p><p>## Summary PR 4 of the roadmap. **Stacked on #17** (base is that branch; GitHub retargets it as the stack merges). Adds the deterministic layer the hooks and CI will use, and settles the open &quot;triage bar&quot; and &quot;strict profile&quot; questions with measurements instead of argument. - **`.jev-policy.json`**, evaluated by `jev_scope` before any Jev request: - `protected_paths`: globs with a `review` or `deny` floor, tested against the action&#x27;s `target` and every path-like argument of the command. - `comm…</p>
</details>


## Merged

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/17">#17 Decision ledger: decision_id on every result and jev_feedback — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/decision-ledger → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:29:52Z · just now</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-24T09:29:52Z · just now</td></tr>
<tr><td><strong>Diff</strong></td><td>+7759 −13 · 32 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>no checks reported</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/506f73800e6b44957f60e6e0c52d5300d8d22d37"><code>506f738</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/a2cf6a689bf6f2f262e7b875ba202f4f39fb203c"><code>a2cf6a6</code></a></td></tr>
</table>
<p><strong>Description</strong></p><p>## Summary PR 3 of the roadmap. **Stacked on #16** (base is that branch; GitHub retargets it as the stack merges). Nothing records Jev&#x27;s decisions or whether they were right, so real-life false-alarm rates are unknown and every threshold question (such as the triage bar) can only be argued from synthetic benchmarks. This adds the measurement layer the later PRs (hooks, CI) will log into. - **`decision_id` on every judgment result** (additive; a fresh id per response, even when the provider answ…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/16">#16 Command effect classifier: the command text can raise a declared effect — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/command-effect-classifier → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:30:10Z · just now</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-24T09:30:10Z · just now</td></tr>
<tr><td><strong>Diff</strong></td><td>+8170 −9 · 16 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>no checks reported</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/00da74e967fe88c7c8eda2b433cdb15fbdebaf47"><code>00da74e</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/ef690a27dd7b5925a296033e2b6faa20a9d53d53"><code>ef690a2</code></a></td></tr>
</table>
<p><strong>Description</strong></p><p>## Summary PR 2 of the roadmap. **Stacked on #15** (base is that branch; GitHub will retarget this to `main` once #15 merges). `jev_scope` trusted the host-declared `effect`: `read_only` + `rm -rf build &amp;&amp; git push --force` returned `auto` whenever the judge&#x27;s answers were clean. This adds a deterministic classifier so the command text can raise the effect, and never lower it. - **`src/effects.ts`**: `classifyCommand`, `effectiveEffect`, `strictestEffect`. Classifies bash, PowerShell and cmd co…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/15">#15 Hardening: loop detector progress, reserved token budget, gate order, triage progress wording — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/hardening-loop-budget-gate → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:29:09Z · 1m ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-24T09:29:09Z · 1m ago</td></tr>
<tr><td><strong>Diff</strong></td><td>+8543 −49 · 22 files</td></tr>
<tr><td><strong>Commits</strong></td><td>2</td></tr>
<tr><td><strong>Checks</strong></td><td>no checks reported</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/a9f4ddaae201754e237dfb6c2b3af3fe636d1841"><code>a9f4dda</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/92186330bb5558398cea2e40275c28e26c87f6a3"><code>9218633</code></a></td></tr>
</table>
<p><strong>Description</strong></p><p>## Summary PR 1 of a 9-stage roadmap (reviewed code from #12–#14, then planned fixes and enhancements). Hardening only: it fixes defects found by reading and running the merged code, and one model misjudgment found by the live benchmark. - **Loop detector no longer flags progress.** Failure counts that strictly shrink across attempts (9 → 5 → 2 failed) were reported as `same_failure` because every digit was masked. They are now progress (`loop.improving`, additive). A changing counter (`retry 3…</p>
</details>

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

[PR #16](https://github.com/burnigtm/jev-mcp/pull/16) Command effect classifier: the command text can raise a declared effect

- Event: `pull_request_target` `closed`
- Ref: `main` SHA [`00da74e`](https://github.com/burnigtm/jev-mcp/commit/00da74e967fe88c7c8eda2b433cdb15fbdebaf47)

Search, filters, checks, commits, and files are on the interactive board next to this file. Follow-ups land in the **Jev_MCP Project** chat.

Live Actions: [Notify Jev_MCP](https://github.com/burnigtm/jev-mcp/actions/workflows/notify-jev-mcp.yml).

<!-- jev-watch:snapshot eyJwdWxscyI6W3sibnVtYmVyIjoyMywidGl0bGUiOiJmZWF0OiBjYWxpYnJhdGUsIGpldjovL2xlZGdlciByZXNvdXJjZSBhbmQgU0FSSUYgb3V0cHV0Iiwic3RhdGUiOiJPUEVOIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8yMyIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L2NhbGlicmF0ZS1zYXJpZiIsImJhc2UiOiJmZWF0L2NhbGxlci1jb250ZXh0Iiwic2hhIjoiN2FmZDA4MzI1ZWEwYTZmNTY2NzcxZmFmZDI2NWU2MDAwYzY4ODk4NCIsIm1lcmdlX2NvbW1pdF9zaGEiOiJjODY4ODc2MjRkOTkyZGU3MGUwYWJiZGExODMwNGE0MzA1M2I3NzA2IiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yNFQwOToyMzozMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yNFQwOToyMzozMFoiLCJtZXJnZWRfYXQiOiIiLCJjbG9zZWRfYXQiOiIiLCJhZGRpdGlvbnMiOjY3MCwiZGVsZXRpb25zIjo4LCJjaGFuZ2VkX2ZpbGVzIjoxMiwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgUFIgOSAodGhlIGxhc3QpIG9mIHRoZSByb2FkbWFwLCAqKnN0YWNrZWQgb24gIzIyKiouIC0gKipgamV2LW1jcCBjYWxpYnJhdGUgWy0tZGlyXSBbLS1zaW5jZSBZWVlZLU1NXSBbLS1taW4tc2FtcGxlIE5dIFstLWpzb25dYCoqOiBwZXItdG9vbCBhY3Rpb24gbWl4IGFuZCByZXZpZXcvZXNjYWxhdGUgcmF0ZXMsIGxhYmVsZWQgb3V0Y29tZXMgZnJvbSBgamV2X2ZlZWRiYWNrYCwgZmFsc2UtYWxhcm0gcmF0ZSAoYW1vbmcgbGFiZWxlZCBob2xkcykgYW5kIG1pc3MgcmF0ZSAoYW1vbmcgbGFiZWxlZCBhcHByb3ZhbHMpLCBmYWxzZS1hbGFybSByYXRlIGJ5IHJlYXNvbiBjb2RlLCBhbmQgaW5wdXRzIHRoYXQgZ290IGRpZmZlcmVudCBhY3Rpb25zLiAqKk9ubHkgbGFiZWxlZCBkZWNpc1x1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbeyJzaGEiOiI3YWZkMDgzMjVlYTBhNmY1NjY3NzFmYWZkMjY1ZTYwMDBjNjg4OTg0IiwibWVzc2FnZSI6ImZlYXQ6IGNhbGlicmF0ZSwgamV2Oi8vbGVkZ2VyIHJlc291cmNlIGFuZCBTQVJJRiBvdXRwdXQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9jb21taXQvN2FmZDA4MzI1ZWEwYTZmNTY2NzcxZmFmZDI2NWU2MDAwYzY4ODk4NCJ9XSwiZmlsZXMiOlt7ImZpbGVuYW1lIjoiZG9jcy9jaGFuZ2Vsb2cubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jaS5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo1LCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJkb2NzL2NvbmZpZ3VyYXRpb24ubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MywiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoic3JjL2NhbGlicmF0ZS50cyIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoyMjksImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNyYy9jaS50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo1MCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic3JjL2NsaS50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjozMCwiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoic3JjL2luZGV4LnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjgsImRlbGV0aW9ucyI6MX0seyJmaWxlbmFtZSI6InNyYy9zZXJ2ZXIudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTksImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InRlc3RzL2NhbGlicmF0ZS50ZXN0LnRzIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjMxNiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoidGVzdHMvbWNwLnRlc3QudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MSwiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoidGVzdHMvcGFja2FnZS50ZXN0LnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEsImRlbGV0aW9ucyI6MX0seyJmaWxlbmFtZSI6InRlc3RzL3RyYW5zcG9ydC50ZXN0LnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjIsImRlbGV0aW9ucyI6Mn1dLCJjaGVja3MiOlt7Im5hbWUiOiJwdWJsaXNoIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgxNzY2ODIwL2pvYi8xMjA4MzY2MTIyNzEifSx7Im5hbWUiOiJub3RpZnkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwODE3NjY4MjAvam9iLzEyMDgzNjYxMjEyOSJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjIpIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgxNzY2NzI2L2pvYi8xMjA4MzY2MTE0NTAifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MTc2NjcyNi9qb2IvMTIwODM2NjExMjM5In0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MTc2NjcyNi9qb2IvMTIwODM2NjExMjMzIn0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MTc2NjcyNi9qb2IvMTIwODM2NjExMTQzIn1dfSx7Im51bWJlciI6MjIsInRpdGxlIjoiZmVhdDogb3B0aW9uYWwgY2FsbGVyIGNvbnRleHQgZm9yIHRoZSByZXZpZXcgdG9vbHMgKG9wdC1pbikiLCJzdGF0ZSI6Ik9QRU4iLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzIyIiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvY2FsbGVyLWNvbnRleHQiLCJiYXNlIjoiZmVhdC9jaS1nYXRlIiwic2hhIjoiODEzZTRmNGFhYmM0ZThkNWQyZGMyOGY1ODA2NzkwN2UwZTBjYmNjNyIsIm1lcmdlX2NvbW1pdF9zaGEiOiIwZGVjNjMyMjkwNGY1MWM1MGI4OTBjYzIwY2U0M2Y1YTI2NTk0M2UzIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yNFQwOToxODowMloiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yNFQwOToxODowMloiLCJtZXJnZWRfYXQiOiIiLCJjbG9zZWRfYXQiOiIiLCJhZGRpdGlvbnMiOjE2NzQsImRlbGV0aW9ucyI6MjksImNoYW5nZWRfZmlsZXMiOjI0LCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBQUiA4IG9mIHRoZSByb2FkbWFwLCAqKnN0YWNrZWQgb24gIzIxKiouIE9wdGlvbmFsIGV2aWRlbmNlIGFib3V0IHdoZXJlIGNoYW5nZWQgY29kZSBpcyB1c2VkLCBmb3IgdGhlIHJldmlldyB0b29scy4gKipBIG5lZ2F0aXZlIHJlc3VsdCwgc2hpcHBlZCBvcHQtaW4gYW5kIG9mZiBieSBkZWZhdWx0LioqIC0gYGpldl9yZXZpZXdgLCBgamV2X3Jpc2tgLCBgamV2X2dhdGVgIGFjY2VwdCBgY29udGV4dC5jYWxsZXJzYCAodXAgdG8gNDAgYHsgcGF0aCwgbGluZT8sIHRleHQsIHN5bWJvbD8gfWApLiBUaGUgc2VydmVyIG5ldmVyIHNlYXJjaGVzIHRoZSByZXBvIGl0c2VsZjsgdGhlIGhvc3Qgc3VwcGxpZXMgdGhlIGxpc3QuIFNuaXBwZXRzIGFyZSB1bnRydXN0ZWQ6IHNhbml0aXplZCxcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W3sic2hhIjoiODEzZTRmNGFhYmM0ZThkNWQyZGMyOGY1ODA2NzkwN2UwZTBjYmNjNyIsIm1lc3NhZ2UiOiJmZWF0OiBvcHRpb25hbCBjYWxsZXIgY29udGV4dCBmb3IgdGhlIHJldmlldyB0b29scyAob3B0LWluKSIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2NvbW1pdC84MTNlNGY0YWFiYzRlOGQ1ZDJkYzI4ZjU4MDY3OTA3ZTBlMGNiY2M3In1dLCJmaWxlcyI6W3siZmlsZW5hbWUiOiIuZW52LmV4YW1wbGUiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jaGFuZ2Vsb2cubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jaS5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NvbmZpZ3VyYXRpb24ubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9jYWxsZXJzLTIwMjYtMTAtMjQuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo5MDEsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvY2FsbGVycy0yMDI2LTEwLTI0Lm1kIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjI2LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2V2YWwtYm9udXMubWpzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjUsImRlbGV0aW9ucyI6Mn0seyJmaWxlbmFtZSI6InNjcmlwdHMvbGliL2JvbnVzLWNhbGxlcnMubWpzIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjczLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2xpYi9ib251cy1nZW5lcmF0b3IubWpzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjQsImRlbGV0aW9ucyI6MX0seyJmaWxlbmFtZSI6InNraWxscy9qZXYtbWNwL3JlZmVyZW5jZXMvdG9vbHMubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NSwiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoic3JjL2NoZWNrLnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEwLCJkZWxldGlvbnMiOjJ9LHsiZmlsZW5hbWUiOiJzcmMvY2kudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MjAsImRlbGV0aW9ucyI6MH1dLCJjaGVja3MiOlt7Im5hbWUiOiJwdWJsaXNoIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgxNDAzMDU4L2pvYi8xMjA4MzU1NTY4NjkifSx7Im5hbWUiOiJub3RpZnkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwODE0MDMwNTgvam9iLzEyMDgzNTU1NjU2NyJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjApIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgxNDAzMDQyL2pvYi8xMjA4MzU1NTU4NjkifSx7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjIpIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgxNDAzMDQyL2pvYi8xMjA4MzU1NTU4MTcifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MTQwMzA0Mi9qb2IvMTIwODM1NTU1ODA5In0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MTQwMzA0Mi9qb2IvMTIwODM1NTU1Njk1In1dfSx7Im51bWJlciI6MjEsInRpdGxlIjoiZmVhdDogcHVsbC1yZXF1ZXN0IGdhdGUgKGpldi1tY3AgY2kpIiwic3RhdGUiOiJPUEVOIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8yMSIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L2NpLWdhdGUiLCJiYXNlIjoiZmVhdC9jaGVjay1hbmQtaG9va3MiLCJzaGEiOiJhMWQzNDAyNmNmM2I3M2QwYzRlMDA3YjEyODE0YTk5Y2JjYzcyMzNjIiwibWVyZ2VfY29tbWl0X3NoYSI6ImQzYzEwYjcxNWI2MGY1Y2I0MTY1MTIzNThiZjZkMmEwZmZiYjVkZDciLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjA1OjE3WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjA1OjE3WiIsIm1lcmdlZF9hdCI6IiIsImNsb3NlZF9hdCI6IiIsImFkZGl0aW9ucyI6MTI4OCwiZGVsZXRpb25zIjoxMiwiY2hhbmdlZF9maWxlcyI6MTQsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFBSIDcgb2YgdGhlIHJvYWRtYXAsICoqc3RhY2tlZCBvbiAjMjAqKi4gYGpldi1tY3AgY2lgIGlzIHRoZSBwdWxsLXJlcXVlc3QgZ2F0ZTogaXQgYW5zd2VycyBgYXV0b2AsIGByZXZpZXdgIG9yIGBlc2NhbGF0ZWAgKGV4aXQgMCwgMTAsIDIwOyAyIG9uIGFueSBlcnJvciwgZmFpbC1jbG9zZWQpIGFuZCBuZXZlciBydW5zIHRoZSBwdWxsIHJlcXVlc3QncyBjb2RlLiAtICoqUG9saWN5IGZyb20gdGhlIGJhc2UgcmVmLioqIGAuamV2LXBvbGljeS5qc29uYCBpcyByZWFkIHdpdGggYGdpdCBzaG93IEJBU0U6Li4uYCwgc28gYSBwdWxsIHJlcXVlc3QgY2Fubm90IGxvb3NlbiBpdHMgb3duIHJ1bGVzOyBjaGFuZ2luZyB0aGUgZmlsZSBob2xkcywgYSBicm9rZW4gb25lIGhvbGRzLiBFdmVcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W3sic2hhIjoiYTFkMzQwMjZjZjNiNzNkMGM0ZTAwN2IxMjgxNGE5OWNiY2M3MjMzYyIsIm1lc3NhZ2UiOiJmZWF0OiBwdWxsLXJlcXVlc3QgZ2F0ZSAoamV2LW1jcCBjaSkiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9jb21taXQvYTFkMzQwMjZjZjNiNzNkMGM0ZTAwN2IxMjgxNGE5OWNiY2M3MjMzYyJ9XSwiZmlsZXMiOlt7ImZpbGVuYW1lIjoiLmVudi5leGFtcGxlIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjIsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6IlJFQURNRS5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NoYW5nZWxvZy5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo3LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NpLm1kIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjQ2LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NvbmZpZ3VyYXRpb24ubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9jaS0yMDI2LTEwLTI0Lmpzb24iLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MjkwLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL2NpLTIwMjYtMTAtMjQubWQiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MjYsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV4YW1wbGVzL2dpdGh1Yi1wci1nYXRlLnltbCIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo1OSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic3JjL2NoZWNrLnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjUzLCJkZWxldGlvbnMiOjEyfSx7ImZpbGVuYW1lIjoic3JjL2NpLnRzIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjI4OCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic3JjL2NsaS50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo2NiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic3JjL2dpdC50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo3NCwiZGVsZXRpb25zIjowfV0sImNoZWNrcyI6W3sibmFtZSI6InB1Ymxpc2giLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwODA1Njk5MTIvam9iLzEyMDgzMzA1ODUyMyJ9LHsibmFtZSI6Im5vdGlmeSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MDU2OTkxMi9qb2IvMTIwODMzMDU4NDU4In0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwODA1Njk1OTcvam9iLzEyMDgzMzA1NjcyMiJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjApIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgwNTY5NTk3L2pvYi8xMjA4MzMwNTY2OTkifSx7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjIpIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgwNTY5NTk3L2pvYi8xMjA4MzMwNTY2ODEifSx7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjApIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgwNTY5NTk3L2pvYi8xMjA4MzMwNTY1MjUifV19LHsibnVtYmVyIjoyMCwidGl0bGUiOiJmZWF0OiBlbmZvcmNlZCBDbGF1ZGUgQ29kZSBob29rcyBhbmQgamV2LW1jcCBjaGVjayIsInN0YXRlIjoiT1BFTiIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMjAiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC9jaGVjay1hbmQtaG9va3MiLCJiYXNlIjoiZmVhdC9sYXJnZS1kaWZmLXJldmlldyIsInNoYSI6IjNjM2Y4N2U3MmJiMzE3ODY3ZmY4ZDU5MjQzMmVmYzhmYWQwNjhiMTAiLCJtZXJnZV9jb21taXRfc2hhIjoiMjM4NmY2NDIzNDk2ZWQyOTdmZWY1MDFhMmZmYWEwYzJjMjE5ZGMzYiIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDg6MDI6NTlaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDg6MDI6NTlaIiwibWVyZ2VkX2F0IjoiIiwiY2xvc2VkX2F0IjoiIiwiYWRkaXRpb25zIjo3MTgxLCJkZWxldGlvbnMiOjAsImNoYW5nZWRfZmlsZXMiOjE5LCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBQUiA2IG9mIHRoZSByb2FkbWFwLCAqKnN0YWNrZWQgb24gIzE5KiouIE1ha2VzIHRoZSBndWFyZCBydW4gb24gZXZlcnkgdG9vbCBjYWxsIGluIENsYXVkZSBDb2RlIGluc3RlYWQgb2YgYmVpbmcgYWR2aXNvcnkuIC0gKipgamV2LW1jcCBob29rIHByZS10b29sLXVzZWAqKjogY2xhc3NpZmllciBhbmQgcmVwb3NpdG9yeSBwb2xpY3kgZmlyc3Q7IGEgY29uZmlybWVkIHJlYWQtb25seSBjb21tYW5kIGlzIHNpbGVudCB3aXRoIG5vIG1vZGVsIGNhbGw7IHJlYWRzIG9mIGtleS9jcmVkZW50aWFsIGZpbGVzIGFuZCBlZGl0cyB0byB0aGUgZ3VhcmQncyBvd24gY29uZmlnIGFzayB3aXRob3V0IGEgbW9kZWw7IG9ubHkgdGhlIGdyYXkgem9uZSBjYWxscyBgamV2X3Njb3BlYC4gQSBob29rXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOlt7InNoYSI6IjNjM2Y4N2U3MmJiMzE3ODY3ZmY4ZDU5MjQzMmVmYzhmYWQwNjhiMTAiLCJtZXNzYWdlIjoiZmVhdDogZW5mb3JjZWQgQ2xhdWRlIENvZGUgaG9va3MgYW5kIGpldi1tY3AgY2hlY2siLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9jb21taXQvM2MzZjg3ZTcyYmIzMTc4NjdmZjhkNTkyNDMyZWZjOGZhZDA2OGIxMCJ9XSwiZmlsZXMiOlt7ImZpbGVuYW1lIjoiLmVudi5leGFtcGxlIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjYsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6IlJFQURNRS5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NoYW5nZWxvZy5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxMCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jb25maWd1cmF0aW9uLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjYsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImRvY3MvaG9va3MubWQiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NzcsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL2ZpeHR1cmVzL3BvbGljeS9ob29rLXBvbGljeS5qc29uIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjE0LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL2hvb2tzLTIwMjYtMTAtMjQuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo1MjYxLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL2hvb2tzLTIwMjYtMTAtMjQubWQiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NDEsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV4YW1wbGVzL2NsYXVkZS1jb2RlLnNldHRpbmdzLmpzb24iLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MzcsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNjcmlwdHMvZXZhbC1ob29rcy5tanMiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MTQzLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzcmMvY2hlY2sudHMiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MzM1LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzcmMvY2xpLnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjgyLCJkZWxldGlvbnMiOjB9XSwiY2hlY2tzIjpbeyJuYW1lIjoibm90aWZ5Iiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDc2NTE3MDMxL2pvYi8xMjA4MjA5MDM0NTQifSx7Im5hbWUiOiJwdWJsaXNoIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDc2NTE3MDMxL2pvYi8xMjA4MjA5MDMyMDEifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3NjUxNjkyMC9qb2IvMTIwODIwOTAyMjkxIn0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzY1MTY5MjAvam9iLzEyMDgyMDkwMjE1MCJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzY1MTY5MjAvam9iLzEyMDgyMDkwMjA5NCJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzY1MTY5MjAvam9iLzEyMDgyMDkwMTk1NiJ9XX0seyJudW1iZXIiOjE5LCJ0aXRsZSI6ImZlYXQ6IGNodW5rZWQgcmV2aWV3IGZvciBkaWZmcyB0b28gbGFyZ2UgZm9yIG9uZSByZXF1ZXN0Iiwic3RhdGUiOiJPUEVOIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xOSIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L2xhcmdlLWRpZmYtcmV2aWV3IiwiYmFzZSI6ImZlYXQvcmVwby1wb2xpY3ktcHJvZmlsZXMiLCJzaGEiOiJmNGYzYTkyODI5MGYyYjIwYmVjMWQyYTFmY2M1MDgxNWMxYjZkMTQ1IiwibWVyZ2VfY29tbWl0X3NoYSI6IjgxYThkMTNkZWVmNDI1NDNlMjY3MjA0YmRkY2IwMWJlNzYwZjZiY2EiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA3OjQzOjQ0WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA3OjQzOjQ0WiIsIm1lcmdlZF9hdCI6IiIsImNsb3NlZF9hdCI6IiIsImFkZGl0aW9ucyI6MzgzMSwiZGVsZXRpb25zIjo3NCwiY2hhbmdlZF9maWxlcyI6MjQsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFBSIDUgb2YgdGhlIHJvYWRtYXAuICoqU3RhY2tlZCBvbiAjMTgqKiAoYmFzZSBpcyB0aGF0IGJyYW5jaDsgR2l0SHViIHJldGFyZ2V0cyBpdCBhcyB0aGUgc3RhY2sgbWVyZ2VzKS4gVW50aWwgbm93IGEgZGlmZiBwYXN0IGFib3V0IDMxLjhrIGVzdGltYXRlZCB0b2tlbnMgd2FzIGN1dCBvZmYgYXQgdGhlIHRhaWwgYW5kIGNvdWxkIG5ldmVyIGJlIGBhdXRvYCwgc28gYSBsYXJnZSBjaGFuZ2Ugd2FzIHVucmV2aWV3YWJsZSBhbmQgYSBkZWZlY3QgcGFzdCB0aGUgY3V0IHdhcyBpbnZpc2libGUuIGBqZXZfcmV2aWV3YCwgYGpldl9yaXNrYCBhbmQgYGpldl9nYXRlYCBub3cgcmV2aWV3IGl0IGluIHBhcnRzLiAtICoqU3BsaXQgYWxvbmcgZmlsZSBib3VuZGFyaWVzLioqIEEgbG9zc2xcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W3sic2hhIjoiZjRmM2E5MjgyOTBmMmIyMGJlYzFkMmExZmNjNTA4MTVjMWI2ZDE0NSIsIm1lc3NhZ2UiOiJmZWF0OiBjaHVua2VkIHJldmlldyBmb3IgZGlmZnMgdG9vIGxhcmdlIGZvciBvbmUgcmVxdWVzdCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2NvbW1pdC9mNGYzYTkyODI5MGYyYjIwYmVjMWQyYTFmY2M1MDgxNWMxYjZkMTQ1In1dLCJmaWxlcyI6W3siZmlsZW5hbWUiOiIuZW52LmV4YW1wbGUiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jaGFuZ2Vsb2cubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6OSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jb25maWd1cmF0aW9uLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjMsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvbGFyZ2UtZGlmZi0yMDI2LTEwLTI0Lmpzb24iLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MTg3NCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9sYXJnZS1kaWZmLTIwMjYtMTAtMjQubWQiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NDgsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNjcmlwdHMvZXZhbC1ib251cy5tanMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6OCwiZGVsZXRpb25zIjoyfSx7ImZpbGVuYW1lIjoic2NyaXB0cy9saWIvYm9udXMtZ2VuZXJhdG9yLm1qcyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo2LCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2xpYi9ib251cy1sYXJnZS5tanMiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MTUxLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJza2lsbHMvamV2LW1jcC9yZWZlcmVuY2VzL3Rvb2xzLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEyLCJkZWxldGlvbnMiOjN9LHsiZmlsZW5hbWUiOiJzcmMvY29uZmlnLnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjMsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNyYy9kaWZmLWNodW5rcy50cyIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoyNjEsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNyYy9kaWZmLnRzIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjEzNSwiZGVsZXRpb25zIjowfV0sImNoZWNrcyI6W3sibmFtZSI6Im5vdGlmeSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3NTI4MjI3Mi9qb2IvMTIwODE3MTg3MjE3In0seyJuYW1lIjoicHVibGlzaCIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3NTI4MjI3Mi9qb2IvMTIwODE3MTg3MTYwIn0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3NTI4MjE5Ni9qb2IvMTIwODE3MTg1OTEwIn0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzUyODIxOTYvam9iLzEyMDgxNzE4NTg5NyJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjApIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDc1MjgyMTk2L2pvYi8xMjA4MTcxODU4NTIifSx7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjApIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDc1MjgyMTk2L2pvYi8xMjA4MTcxODU3MDMifV19LHsibnVtYmVyIjoxOCwidGl0bGUiOiJSZXBvc2l0b3J5IHBvbGljeSBmaWxlLCBwcm9maWxlcywgYW5kIGEgZGVkaWNhdGVkIHRyaWFnZSByZWNvdmVyYWJpbGl0eSBiYXIiLCJzdGF0ZSI6Ik9QRU4iLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzE4IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvcmVwby1wb2xpY3ktcHJvZmlsZXMiLCJiYXNlIjoibWFpbiIsInNoYSI6Ijk5YWUxNTYyOTlkNGJlOWNlM2E2NjMyNWQ4OGQ1OTBiOTAyN2RmODQiLCJtZXJnZV9jb21taXRfc2hhIjoiZDExM2YyOGE3ZmQ4NGM2ZGI0OWU1MzIxY2U0N2Y4YTRlNjhmYTZlYiIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDc6MDk6MjFaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDk6Mjk6NTVaIiwibWVyZ2VkX2F0IjoiIiwiY2xvc2VkX2F0IjoiIiwiYWRkaXRpb25zIjoyNjEyNCwiZGVsZXRpb25zIjo0MywiY2hhbmdlZF9maWxlcyI6MjQsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFBSIDQgb2YgdGhlIHJvYWRtYXAuICoqU3RhY2tlZCBvbiAjMTcqKiAoYmFzZSBpcyB0aGF0IGJyYW5jaDsgR2l0SHViIHJldGFyZ2V0cyBpdCBhcyB0aGUgc3RhY2sgbWVyZ2VzKS4gQWRkcyB0aGUgZGV0ZXJtaW5pc3RpYyBsYXllciB0aGUgaG9va3MgYW5kIENJIHdpbGwgdXNlLCBhbmQgc2V0dGxlcyB0aGUgb3BlbiBcInRyaWFnZSBiYXJcIiBhbmQgXCJzdHJpY3QgcHJvZmlsZVwiIHF1ZXN0aW9ucyB3aXRoIG1lYXN1cmVtZW50cyBpbnN0ZWFkIG9mIGFyZ3VtZW50LiAtICoqYC5qZXYtcG9saWN5Lmpzb25gKiosIGV2YWx1YXRlZCBieSBgamV2X3Njb3BlYCBiZWZvcmUgYW55IEpldiByZXF1ZXN0OiAtIGBwcm90ZWN0ZWRfcGF0aHNgOiBnbG9icyB3aXRoIGEgYHJldmlld2Agb3IgYGRlXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOlt7InNoYSI6Ijk5YWUxNTYyOTlkNGJlOWNlM2E2NjMyNWQ4OGQ1OTBiOTAyN2RmODQiLCJtZXNzYWdlIjoiZmVhdDogcmVwb3NpdG9yeSBwb2xpY3kgZmlsZSBhbmQgY29uZmlkZW5jZSBwcm9maWxlcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2NvbW1pdC85OWFlMTU2Mjk5ZDRiZTljZTNhNjYzMjVkODhkNTkwYjkwMjdkZjg0In1dLCJmaWxlcyI6W3siZmlsZW5hbWUiOiIuZW52LmV4YW1wbGUiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jaGFuZ2Vsb2cubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTAsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImRvY3MvY29uZmlndXJhdGlvbi5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjozOCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvZml4dHVyZXMvcG9saWN5L2JlbmNoLXBvbGljeS5qc29uIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjYsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvUkVBRE1FLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjIsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvcG9saWN5LTIwMjYtMTAtMjQuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoyMDg2LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL3BvbGljeS0yMDI2LTEwLTI0Lm1kIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjMzLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL3Byb2ZpbGVzLTIwMjYtMTAtMjQuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoyMjgwNywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9wcm9maWxlcy0yMDI2LTEwLTI0Lm1kIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjU1LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJleGFtcGxlcy9qZXYtcG9saWN5Lmpzb24iLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MTcsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNjcmlwdHMvZXZhbC1ib251cy5tanMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTEsImRlbGV0aW9ucyI6M30seyJmaWxlbmFtZSI6InNjcmlwdHMvcnVuLXRlc3RzLm1qcyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoyLCJkZWxldGlvbnMiOjF9XSwiY2hlY2tzIjpbeyJuYW1lIjoibm90aWZ5Iiwic3RhdGUiOiJxdWV1ZWQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwODIxODgxNDQvam9iLzEyMDgzNzg0NDA1NSJ9LHsibmFtZSI6InB1Ymxpc2giLCJzdGF0ZSI6InF1ZXVlZCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MjE4ODE0NC9qb2IvMTIwODM3ODQzODg5In0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzMwMjEwOTUvam9iLzEyMDgxMDM1NzM2NyJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzMwMjEwOTUvam9iLzEyMDgxMDM1NzM2NiJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzMwMjEwOTUvam9iLzEyMDgxMDM1NzM0MyJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjApIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDczMDIxMDk1L2pvYi8xMjA4MTAzNTcwNTYifV19LHsibnVtYmVyIjoxNywidGl0bGUiOiJEZWNpc2lvbiBsZWRnZXI6IGRlY2lzaW9uX2lkIG9uIGV2ZXJ5IHJlc3VsdCBhbmQgamV2X2ZlZWRiYWNrIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzE3IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvZGVjaXNpb24tbGVkZ2VyIiwiYmFzZSI6Im1haW4iLCJzaGEiOiI1MDZmNzM4MDBlNmI0NDk1N2Y2MGU2ZTBjNTJkNTMwMGQ4ZDIyZDM3IiwibWVyZ2VfY29tbWl0X3NoYSI6ImEyY2Y2YTY4OWJmNmYyZjI2MmU3Yjg3NWJhMjAyZjRmMzlmYjIwM2MiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA2OjQ5OjA3WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjI5OjUyWiIsIm1lcmdlZF9hdCI6IjIwMjYtMTAtMjRUMDk6Mjk6NTJaIiwiY2xvc2VkX2F0IjoiMjAyNi0xMC0yNFQwOToyOTo1MloiLCJhZGRpdGlvbnMiOjc3NTksImRlbGV0aW9ucyI6MTMsImNoYW5nZWRfZmlsZXMiOjMyLCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBQUiAzIG9mIHRoZSByb2FkbWFwLiAqKlN0YWNrZWQgb24gIzE2KiogKGJhc2UgaXMgdGhhdCBicmFuY2g7IEdpdEh1YiByZXRhcmdldHMgaXQgYXMgdGhlIHN0YWNrIG1lcmdlcykuIE5vdGhpbmcgcmVjb3JkcyBKZXYncyBkZWNpc2lvbnMgb3Igd2hldGhlciB0aGV5IHdlcmUgcmlnaHQsIHNvIHJlYWwtbGlmZSBmYWxzZS1hbGFybSByYXRlcyBhcmUgdW5rbm93biBhbmQgZXZlcnkgdGhyZXNob2xkIHF1ZXN0aW9uIChzdWNoIGFzIHRoZSB0cmlhZ2UgYmFyKSBjYW4gb25seSBiZSBhcmd1ZWQgZnJvbSBzeW50aGV0aWMgYmVuY2htYXJrcy4gVGhpcyBhZGRzIHRoZSBtZWFzdXJlbWVudCBsYXllciB0aGUgbGF0ZXIgUFJzIChob29rcywgQ0kpIHdpbGwgbG9nIGludG8uIC0gKipgZGVjXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoxNiwidGl0bGUiOiJDb21tYW5kIGVmZmVjdCBjbGFzc2lmaWVyOiB0aGUgY29tbWFuZCB0ZXh0IGNhbiByYWlzZSBhIGRlY2xhcmVkIGVmZmVjdCIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xNiIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L2NvbW1hbmQtZWZmZWN0LWNsYXNzaWZpZXIiLCJiYXNlIjoibWFpbiIsInNoYSI6IjAwZGE3NGU5NjdmZTg4YzdjOGVkYTJiNDMzY2RiMTVmYmRlYmFmNDciLCJtZXJnZV9jb21taXRfc2hhIjoiZWY2OTBhMjdkZDdiNTkyNWEyOTYwMzNlMmI2ZmFhMjBhOWQ1M2Q1MyIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDY6Mzg6MjNaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDk6MzA6MTBaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0yNFQwOTozMDoxMFoiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjI5OjQ0WiIsImFkZGl0aW9ucyI6ODE3MCwiZGVsZXRpb25zIjo5LCJjaGFuZ2VkX2ZpbGVzIjoxNiwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgUFIgMiBvZiB0aGUgcm9hZG1hcC4gKipTdGFja2VkIG9uICMxNSoqIChiYXNlIGlzIHRoYXQgYnJhbmNoOyBHaXRIdWIgd2lsbCByZXRhcmdldCB0aGlzIHRvIGBtYWluYCBvbmNlICMxNSBtZXJnZXMpLiBgamV2X3Njb3BlYCB0cnVzdGVkIHRoZSBob3N0LWRlY2xhcmVkIGBlZmZlY3RgOiBgcmVhZF9vbmx5YCArIGBybSAtcmYgYnVpbGQgJiYgZ2l0IHB1c2ggLS1mb3JjZWAgcmV0dXJuZWQgYGF1dG9gIHdoZW5ldmVyIHRoZSBqdWRnZSdzIGFuc3dlcnMgd2VyZSBjbGVhbi4gVGhpcyBhZGRzIGEgZGV0ZXJtaW5pc3RpYyBjbGFzc2lmaWVyIHNvIHRoZSBjb21tYW5kIHRleHQgY2FuIHJhaXNlIHRoZSBlZmZlY3QsIGFuZCBuZXZlciBsb3dlciBpdC4gLSAqKmBzcmMvZWZmZWN0cy50c1x1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MTUsInRpdGxlIjoiSGFyZGVuaW5nOiBsb29wIGRldGVjdG9yIHByb2dyZXNzLCByZXNlcnZlZCB0b2tlbiBidWRnZXQsIGdhdGUgb3JkZXIsIHRyaWFnZSBwcm9ncmVzcyB3b3JkaW5nIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzE1IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvaGFyZGVuaW5nLWxvb3AtYnVkZ2V0LWdhdGUiLCJiYXNlIjoibWFpbiIsInNoYSI6ImE5ZjRkZGFhZTIwMTc1NGUyMzdkZmI2YzJiM2FmM2ZlNjM2ZDE4NDEiLCJtZXJnZV9jb21taXRfc2hhIjoiOTIxODYzMzBiYjU1NTgzOThjZWEyZTQwMjc1YzI4ZTI2Yzg3ZjZhMyIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDY6MjI6MzRaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDk6Mjk6MDlaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0yNFQwOToyOTowOVoiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjI5OjA5WiIsImFkZGl0aW9ucyI6ODU0MywiZGVsZXRpb25zIjo0OSwiY2hhbmdlZF9maWxlcyI6MjIsImNvbW1pdHNfY291bnQiOjIsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFBSIDEgb2YgYSA5LXN0YWdlIHJvYWRtYXAgKHJldmlld2VkIGNvZGUgZnJvbSAjMTJcdTIwMTMjMTQsIHRoZW4gcGxhbm5lZCBmaXhlcyBhbmQgZW5oYW5jZW1lbnRzKS4gSGFyZGVuaW5nIG9ubHk6IGl0IGZpeGVzIGRlZmVjdHMgZm91bmQgYnkgcmVhZGluZyBhbmQgcnVubmluZyB0aGUgbWVyZ2VkIGNvZGUsIGFuZCBvbmUgbW9kZWwgbWlzanVkZ21lbnQgZm91bmQgYnkgdGhlIGxpdmUgYmVuY2htYXJrLiAtICoqTG9vcCBkZXRlY3RvciBubyBsb25nZXIgZmxhZ3MgcHJvZ3Jlc3MuKiogRmFpbHVyZSBjb3VudHMgdGhhdCBzdHJpY3RseSBzaHJpbmsgYWNyb3NzIGF0dGVtcHRzICg5IFx1MjE5MiA1IFx1MjE5MiAyIGZhaWxlZCkgd2VyZSByZXBvcnRlZCBhcyBgc2FtZV9mYWlsdXJlYCBiZWNhdXNlIGV2ZXJcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjE0LCJ0aXRsZSI6IkxpdmUgSmV2IHZhbHVlIGJlbmNobWFyayB3aXRoIHJhbmRvbWl6ZWQgY2FzZXMsIHBsdXMgdGhlIGZpeGVzIGFuZCBjYWxpYnJhdGlvbiBpdCBmb3VuZCIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xNCIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L2pldi12YWx1ZS1iZW5jaG1hcmsiLCJiYXNlIjoibWFpbiIsInNoYSI6IjRlYTFiODE2ZTFkMDI5NmUzZWY5MzQzYjE4ZTBiOGM3MTliZWMzMTEiLCJtZXJnZV9jb21taXRfc2hhIjoiN2QyNzM3YmMyMjNjNjc0NmVhMmJjZDhiOWM2YjI4ZGUyNTY5MmMwNiIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjNUMTk6NDU6NTlaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjNUMTk6NDg6NTJaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0yM1QxOTo0ODo1MVoiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTIzVDE5OjQ4OjUxWiIsImFkZGl0aW9ucyI6MjY2OTYsImRlbGV0aW9ucyI6MzAsImNoYW5nZWRfZmlsZXMiOjI5LCJjb21taXRzX2NvdW50IjozLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBUaGlzIFBSIG1lYXN1cmVzIHdoYXQgbGl2ZSBKZXYgYWRkcyBvdmVyIGNoZWFwIGxvY2FsIHJ1bGVzLCBmaXhlcyB0aGUgamV2LW1jcCBkZWZlY3RzIHRoYXQgbWVhc3VyZW1lbnQgZXhwb3NlZCwgYW5kIHJlY2FsaWJyYXRlcyB0aHJlZSBcImxvd2VyIGlzIGJldHRlclwiIHNjb3JlcyBiYXNlZCBvbiB0aGUgZGF0YS4gLSAqKkJlbmNobWFyazoqKiBgbnBtIHJ1biBldmFsOmJvbnVzYC4gTGFiZWxsZWQgcmlza3kvc2FmZSBjYXNlcyBhcmUgZGVjaWRlZCB0aHJlZSB3YXlzOiBieSAqKm5vIGd1YXJkKiosIGJ5IGEgKipydWxlcy1vbmx5IGd1YXJkKiogd2l0aCBubyBtb2RlbCBjYWxsLCBhbmQgYnkgKipsaXZlIEpldioqLiBUaGUgNTEgaGFuZC13cml0dGVuIGNhc2VzIGFyZSBqb2luZWRcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjEzLCJ0aXRsZSI6Ikd1YXJkcmFpbCBoYXJkZW5pbmc6IHBvbGljeSBmaXhlcywgY2FjaGUvYnVkZ2V0L3N0YXRzLCByaXNrLWF3YXJlIGdhdGUsIGxvb3AgZGV0ZWN0b3IiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTMiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC92MC4zLWd1YXJkcmFpbC1oYXJkZW5pbmciLCJiYXNlIjoibWFpbiIsInNoYSI6IjFhNTg1MDAxMmIwODI3NjE5OWYwZjEzYjg0OGEyMjc4NzI2ZGQ5M2QiLCJtZXJnZV9jb21taXRfc2hhIjoiOTdlMWNkMTZmNWFkNjI2Y2ZkNGVkZTc3NjJiNTEzODk3YzQ0NGMzOSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjNUMTg6NDI6MjJaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjNUMTg6NTg6MzBaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0yM1QxODo1ODozMFoiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTIzVDE4OjU4OjMwWiIsImFkZGl0aW9ucyI6MjIzNywiZGVsZXRpb25zIjozNDYsImNoYW5nZWRfZmlsZXMiOjM0LCJjb21taXRzX2NvdW50IjozLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiRm9sbG93cyAjMTIgKHYwLjIgc2NvcGUvdHJpYWdlL3Jpc2sgdG9vbHMpLiBUaGUgcG9saWN5IGZpeGVzIGZvciBkZWZlY3RzIHRoYXQgIzEyIGl0c2VsZiBpbnRyb2R1Y2VkIHdlcmUgbW92ZWQgb250byAjMTIgYmVmb3JlIGl0IG1lcmdlZDogdGhlIHJpc2stZmxhZyBtYXNraW5nLCB0aGUgZXNjYWxhdGlvbiBjdXRvZmYgZm9yIHNjb3BlIGFuZCByaXNrLCB0cmlhZ2UgZXNjYWxhdGlvbiBvcmRlciwgdGhlIGluamVjdGlvbi1iYWNrc3RvcCByZWdyZXNzaW9uIGFuZCB0cmlhZ2UgY2F1c2UtSUQgc2FuaXRpemF0aW9uLiBUaGlzIGJyYW5jaCBhbHJlYWR5IGluY2x1ZGVzIHRoYXQgd29yayB0aHJvdWdoIGEgbWVyZ2UgY29tbWl0LiBXaGF0IHJlbWFpbnMgaGVyZSBpcyB0aGUgaGFyZGVuaW5nIG9mIHByXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoxMiwidGl0bGUiOiJmZWF0OiBhZGQgc2NvcGUsIHRyaWFnZSwgYW5kIHNlY3VyaXR5IHJpc2sgdG9vbHMiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTIiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC92MC4yLWFnZW50LWd1YXJkcmFpbHMiLCJiYXNlIjoibWFpbiIsInNoYSI6ImIwZWFjYjA0M2Q5N2M5YmQzNDE0MGM4MDdlOWU4OGZlYzYxOTQzMGEiLCJtZXJnZV9jb21taXRfc2hhIjoiOGJjYjkyYWQ2Yjg3Yjc3NTlhNmFiOTdjNDg0Zjg3NGRjZDE2ZDM4NSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMTdUMTM6MDQ6MDFaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjNUMTg6NTA6MjVaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0yM1QxODo1MDoyNFoiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTIzVDE4OjUwOjI0WiIsImFkZGl0aW9ucyI6MTU2MiwiZGVsZXRpb25zIjozOCwiY2hhbmdlZF9maWxlcyI6MzMsImNvbW1pdHNfY291bnQiOjIsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFRoaXMgUFIgZXh0ZW5kcyBgamV2LW1jcGAgZnJvbSB0aGUgY29yZSBjb2RpbmcgbG9vcCBpbnRvIHRocmVlIGFkamFjZW50IGRlY2lzaW9uIGJvdW5kYXJpZXM6IDEuICoqYGpldl9zY29wZWAqKiAtIHNlbWFudGljIHByZWZsaWdodCBmb3IgYSBob3N0LXByZXBhcmVkIGFjdGlvbi4gMi4gKipgamV2X3RyaWFnZWAqKiAtIGZhaWx1cmUgY2F1c2UsIGxvb3AgcHJvZ3Jlc3MsIGFuZCByZWNvdmVyeSBzdHJhdGVneS4gMy4gKipgamV2X3Jpc2tgKiogLSBzZWN1cml0eS1mb2N1c2VkIHBhdGNoIHJpc2sgdHJpYWdlLiBUaGUgZXhpc3RpbmcgbmluZSB0b29scyBhbmQgdGhlaXIgcG9saWNpZXMgYXJlIHVuY2hhbmdlZC4gVGhlIHNlcnZlciBub3cgZXhwb3NlcyAqKjEyIHRvb2xzLCAxMVx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MTEsInRpdGxlIjoic2VjdXJpdHk6IGhhcmRlbiB1bnRydXN0ZWQtZGF0YSBoYW5kbGluZyBhbmQgaGVscGVyIGJvdW5kYXJpZXMiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTEiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoic2VjdXJpdHkvaGFyZGVuLXVudHJ1c3RlZC1kYXRhIiwiYmFzZSI6Im1haW4iLCJzaGEiOiJlMGZmNmUzODEyMWNjODE3YjQxOWRiYTE0Y2UwZWNmYzcxNzYxMmY1IiwibWVyZ2VfY29tbWl0X3NoYSI6IjZlY2NiNTIzNDgyM2E5ZjU4ZDlhN2NhYjk1YmY3MWIwNGRmMDBjOTEiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTE3VDEyOjE0OjM0WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTE3VDEyOjM2OjE1WiIsIm1lcmdlZF9hdCI6IjIwMjYtMTAtMTdUMTI6MzY6MTVaIiwiY2xvc2VkX2F0IjoiMjAyNi0xMC0xN1QxMjozNjoxNVoiLCJhZGRpdGlvbnMiOjExMDEsImRlbGV0aW9ucyI6MTg4LCJjaGFuZ2VkX2ZpbGVzIjo2NCwiY29tbWl0c19jb3VudCI6MiwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgVGhpcyBQUiBoYXJkZW5zIHRoZSBib3VuZGFyaWVzIHdoZXJlIGBqZXYtbWNwYCBoYW5kbGVzIHRoaXJkLXBhcnR5IHRleHQsIGhvc3QtcHJlcGFyZWQgdG9vbCBtZXRhZGF0YSwgcHJvdmlkZXIgY3JlZGVudGlhbHMsIGFuZCBhZ2VudCBldmFsdWF0aW9uIGNvZGUuIEl0IGFsc28gZml4ZXMgc2V2ZXJhbCBjb3JyZWN0bmVzcyBkZWZlY3RzIGZvdW5kIGR1cmluZyB0aGUgYXVkaXQuIFRoZSBjaGVja291dCBhbHJlYWR5IGNvbnRhaW5lZCBhIHBlbmRpbmcgcmVtZWRpYXRpb24gYmF0Y2g7IHRoaXMgYnJhbmNoIGJ1aWxkcyBvbiBpdCBhbmQgdHVybnMgdGhlIHdob2xlIHNldCBpbnRvIG9uZSByZXZpZXdlZCBjaGFuZ2UuIE5vIGxpdmUgcHJvdmlkZXIgY2FsbHMgb3IgcHVibGlzaGluZ1x1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MTAsInRpdGxlIjoiUGFja2FnZSBwb3J0YWJsZSBKZXYgc2tpbGwgYW5kIGFkZCByZWFsLWFnZW50IGV2YWx1YXRpb25zIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzEwIiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImNvZGV4L3BvcnRhYmxlLXNraWxsLWV2YWxzIiwiYmFzZSI6Im1haW4iLCJzaGEiOiJmZDM0NzAxZTE1NWI2YzIzMGNiYWNlNDExZGY2MjM4ODA0MDViMTMxIiwibWVyZ2VfY29tbWl0X3NoYSI6IjU3MWY0NjQ1NjVhMTMxOWFiZTUyY2I5NTEyMGIzNzE3NGVlNTNhYmEiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTE1VDE2OjQ0OjQ2WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTE1VDE2OjUxOjIyWiIsIm1lcmdlZF9hdCI6IjIwMjYtMTAtMTVUMTY6NTE6MjJaIiwiY2xvc2VkX2F0IjoiMjAyNi0xMC0xNVQxNjo1MToyMloiLCJhZGRpdGlvbnMiOjU3NjUsImRlbGV0aW9ucyI6MzY4LCJjaGFuZ2VkX2ZpbGVzIjo1MCwiY29tbWl0c19jb3VudCI6MiwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFByb2JsZW0gYW5kIGJlaGF2aW9yIFRoZSBKZXYgY29tcGFuaW9uIHNraWxsIGRlcGVuZGVkIG9uIHJlcG9zaXRvcnkgZG9jdW1lbnRhdGlvbiBhbmQgaGFkIG5vIHJlcHJvZHVjaWJsZSBzdGFuZGFsb25lIHBhY2thZ2Ugb3IgcmVhbC1hZ2VudCBldmFsdWF0aW9uIHBhdGguIFRoaXMgY2hhbmdlIG1ha2VzIHRoZSBjb21wbGV0ZSBza2lsbCBpbmRlcGVuZGVudGx5IGluc3RhbGxhYmxlIGF0IGAuYWdlbnRzL3NraWxscy9qZXYtbWNwYCBhbmQgYWRkcyBib3VuZGVkIGV2YWx1YXRpb25zIG9mIHRoZSBjb21iaW5lZCBza2lsbCArIGxpdmUgTUNQIHdvcmtmbG93IGluIENvZGV4IGFuZCB0aGUgb2ZmaWNpYWwgQ3Vyc29yIENMSS4gIyMgQ2hhbmdlcyAtIE1vdmUgY2Fub25pY2FsIGNvbnRyYWN0cyBpblx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6OCwidGl0bGUiOiJQaW4gdGhlIG5ld2VzdCBwdWxsIHJlcXVlc3Qgb24gdGhlIHdhdGNoIGJvYXJkIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzgiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiY3Vyc29yL2ludGVyYWN0aXZlLXByLXdhdGNoLTUxOGUiLCJiYXNlIjoibWFpbiIsInNoYSI6IjQ4MzM2MzQ2Y2QzZmI1ZWI5NjU1NjEyNjVlMGJmM2QwNTllYzVmMGYiLCJtZXJnZV9jb21taXRfc2hhIjoiOTQ0OGY2MTIwMDE1ZjJmNmM2ZGFkNzEzN2M3ZjIzNDU0NTIwOTkxOCIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMDktMjFUMTc6NTk6MDZaIiwidXBkYXRlZF9hdCI6IjIwMjYtMDktMjFUMTc6NTk6MTJaIiwibWVyZ2VkX2F0IjoiMjAyNi0wOS0yMVQxNzo1OToxMloiLCJjbG9zZWRfYXQiOiIyMDI2LTA5LTIxVDE3OjU5OjEyWiIsImFkZGl0aW9ucyI6MTExOCwiZGVsZXRpb25zIjoxMzMsImNoYW5nZWRfZmlsZXMiOjYsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IC0gVGhlIEdpdEh1YiB3YXRjaCBib2FyZCBhbHdheXMgbGVhZHMgd2l0aCB0aGUgaGlnaGVzdC1udW1iZXJlZCBwdWxsIHJlcXVlc3QsIHNvIHRoZSBsYXRlc3Qgb25lIHN0YXlzIHZpc2libGUuIC0gRWFjaCBwdWxsIHJlcXVlc3Qgc2hvd3MgYXV0aG9yLCBicmFuY2hlcywgZGlmZiBzaXplLCBjaGVja3MsIHJldmlld3MsIGNvbW1pdHMsIGFuZCBmaWxlcy4gLSBBIGZhaWxlZCBHaXRIdWIgcmVhZCBrZWVwcyB0aGUgbGFzdCBzYXZlZCBsaXN0IGFuZCBzYXlzIHRoZSBsaXZlIGxpc3QgaXMgdW5hdmFpbGFibGUsIGluc3RlYWQgb2YgYmxhbmtpbmcgdGhlIHBhZ2Ugb3IgcHJldGVuZGluZyB0aGUgbGlzdCBpcyBlbXB0eS4gLSBgZG9jcy9naXRodWItd2F0Y2guaHRtbGAgYWRkcyBzZWFcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX1dfQ== -->
