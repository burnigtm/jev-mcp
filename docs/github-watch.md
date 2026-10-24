# Jev_MCP GitHub watch

**Latest pull request:** [#23 feat: calibrate, jev://ledger resource and SARIF output](https://github.com/burnigtm/jev-mcp/pull/23) — **open** 2026-10-24T09:23:30Z · 6m ago · burnigtm · `feat/calibrate-sarif` → `feat/caller-context` · +670 −8 · 12 files.

Open **8** · Merged **7** · Closed **0** · [Interactive board](github-watch.html)

This is the **Cursor Project dashboard** for [burnigtm/jev-mcp](https://github.com/burnigtm/jev-mcp). Open **Projects → Jev_MCP** (not the Agents list). The latest pull request stays at the top even when the list is long. GitHub Actions refreshes this file on branch `cursor-watch`.

| | |
| --- | --- |
| **Last refresh** | 2026-10-24T09:29:33Z |
| **Data** | GitHub API |
| **Last GitHub event** | `push` |
| **Open PRs** | [#23](https://github.com/burnigtm/jev-mcp/pull/23) feat: calibrate, jev://ledger resource and SARIF output, [#22](https://github.com/burnigtm/jev-mcp/pull/22) feat: optional caller context for the review tools (opt-in), [#21](https://github.com/burnigtm/jev-mcp/pull/21) feat: pull-request gate (jev-mcp ci), [#20](https://github.com/burnigtm/jev-mcp/pull/20) feat: enforced Claude Code hooks and jev-mcp check, [#19](https://github.com/burnigtm/jev-mcp/pull/19) feat: chunked review for diffs too large for one request |
| **Merged (recent)** | [#15](https://github.com/burnigtm/jev-mcp/pull/15) Hardening: loop detector progress, reserved token budget, gate order, triage progress wording, [#14](https://github.com/burnigtm/jev-mcp/pull/14) Live Jev value benchmark with randomized cases, plus the fixes and calibration it found, [#13](https://github.com/burnigtm/jev-mcp/pull/13) Guardrail hardening: policy fixes, cache/budget/stats, risk-aware gate, loop detector, [#12](https://github.com/burnigtm/jev-mcp/pull/12) feat: add scope, triage, and security risk tools, [#11](https://github.com/burnigtm/jev-mcp/pull/11) security: harden untrusted-data handling and helper boundaries |
| **GitHub `main`** | [`9218633`](https://github.com/burnigtm/jev-mcp/commit/92186330bb5558398cea2e40275c28e26c87f6a3) |
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

Most recently updated is [#16 Command effect classifier: the command text can raise a declared effect](https://github.com/burnigtm/jev-mcp/pull/16) (2026-10-24T09:29:12Z · just now). Newest number remains #23.


## Open

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/22">#22 feat: optional caller context for the review tools (opt-in) — OPEN</a></summary>
<table>
<tr><td><strong>State</strong></td><td>OPEN</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/caller-context → feat/ci-gate</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:18:02Z · 11m ago</td></tr>
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
<tr><td><strong>Branches</strong></td><td>feat/command-effect-classifier → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:29:12Z · just now</td></tr>
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


## Merged

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/15">#15 Hardening: loop detector progress, reserved token budget, gate order, triage progress wording — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/hardening-loop-budget-gate → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:29:09Z · just now</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-24T09:29:09Z · just now</td></tr>
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

Push to `main` `9218633`.

- Event: `push`
- Ref: `main` SHA [`9218633`](https://github.com/burnigtm/jev-mcp/commit/92186330bb5558398cea2e40275c28e26c87f6a3)

Search, filters, checks, commits, and files are on the interactive board next to this file. Follow-ups land in the **Jev_MCP Project** chat.

Live Actions: [Notify Jev_MCP](https://github.com/burnigtm/jev-mcp/actions/workflows/notify-jev-mcp.yml).

<!-- jev-watch:snapshot eyJwdWxscyI6W3sibnVtYmVyIjoyMywidGl0bGUiOiJmZWF0OiBjYWxpYnJhdGUsIGpldjovL2xlZGdlciByZXNvdXJjZSBhbmQgU0FSSUYgb3V0cHV0Iiwic3RhdGUiOiJPUEVOIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8yMyIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L2NhbGlicmF0ZS1zYXJpZiIsImJhc2UiOiJmZWF0L2NhbGxlci1jb250ZXh0Iiwic2hhIjoiN2FmZDA4MzI1ZWEwYTZmNTY2NzcxZmFmZDI2NWU2MDAwYzY4ODk4NCIsIm1lcmdlX2NvbW1pdF9zaGEiOiJjODY4ODc2MjRkOTkyZGU3MGUwYWJiZGExODMwNGE0MzA1M2I3NzA2IiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yNFQwOToyMzozMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yNFQwOToyMzozMFoiLCJtZXJnZWRfYXQiOiIiLCJjbG9zZWRfYXQiOiIiLCJhZGRpdGlvbnMiOjY3MCwiZGVsZXRpb25zIjo4LCJjaGFuZ2VkX2ZpbGVzIjoxMiwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgUFIgOSAodGhlIGxhc3QpIG9mIHRoZSByb2FkbWFwLCAqKnN0YWNrZWQgb24gIzIyKiouIC0gKipgamV2LW1jcCBjYWxpYnJhdGUgWy0tZGlyXSBbLS1zaW5jZSBZWVlZLU1NXSBbLS1taW4tc2FtcGxlIE5dIFstLWpzb25dYCoqOiBwZXItdG9vbCBhY3Rpb24gbWl4IGFuZCByZXZpZXcvZXNjYWxhdGUgcmF0ZXMsIGxhYmVsZWQgb3V0Y29tZXMgZnJvbSBgamV2X2ZlZWRiYWNrYCwgZmFsc2UtYWxhcm0gcmF0ZSAoYW1vbmcgbGFiZWxlZCBob2xkcykgYW5kIG1pc3MgcmF0ZSAoYW1vbmcgbGFiZWxlZCBhcHByb3ZhbHMpLCBmYWxzZS1hbGFybSByYXRlIGJ5IHJlYXNvbiBjb2RlLCBhbmQgaW5wdXRzIHRoYXQgZ290IGRpZmZlcmVudCBhY3Rpb25zLiAqKk9ubHkgbGFiZWxlZCBkZWNpc1x1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbeyJzaGEiOiI3YWZkMDgzMjVlYTBhNmY1NjY3NzFmYWZkMjY1ZTYwMDBjNjg4OTg0IiwibWVzc2FnZSI6ImZlYXQ6IGNhbGlicmF0ZSwgamV2Oi8vbGVkZ2VyIHJlc291cmNlIGFuZCBTQVJJRiBvdXRwdXQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9jb21taXQvN2FmZDA4MzI1ZWEwYTZmNTY2NzcxZmFmZDI2NWU2MDAwYzY4ODk4NCJ9XSwiZmlsZXMiOlt7ImZpbGVuYW1lIjoiZG9jcy9jaGFuZ2Vsb2cubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jaS5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo1LCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJkb2NzL2NvbmZpZ3VyYXRpb24ubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MywiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoic3JjL2NhbGlicmF0ZS50cyIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoyMjksImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNyYy9jaS50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo1MCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic3JjL2NsaS50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjozMCwiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoic3JjL2luZGV4LnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjgsImRlbGV0aW9ucyI6MX0seyJmaWxlbmFtZSI6InNyYy9zZXJ2ZXIudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTksImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InRlc3RzL2NhbGlicmF0ZS50ZXN0LnRzIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjMxNiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoidGVzdHMvbWNwLnRlc3QudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MSwiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoidGVzdHMvcGFja2FnZS50ZXN0LnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEsImRlbGV0aW9ucyI6MX0seyJmaWxlbmFtZSI6InRlc3RzL3RyYW5zcG9ydC50ZXN0LnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjIsImRlbGV0aW9ucyI6Mn1dLCJjaGVja3MiOlt7Im5hbWUiOiJwdWJsaXNoIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgxNzY2ODIwL2pvYi8xMjA4MzY2MTIyNzEifSx7Im5hbWUiOiJub3RpZnkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwODE3NjY4MjAvam9iLzEyMDgzNjYxMjEyOSJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjIpIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgxNzY2NzI2L2pvYi8xMjA4MzY2MTE0NTAifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MTc2NjcyNi9qb2IvMTIwODM2NjExMjM5In0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MTc2NjcyNi9qb2IvMTIwODM2NjExMjMzIn0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MTc2NjcyNi9qb2IvMTIwODM2NjExMTQzIn1dfSx7Im51bWJlciI6MjIsInRpdGxlIjoiZmVhdDogb3B0aW9uYWwgY2FsbGVyIGNvbnRleHQgZm9yIHRoZSByZXZpZXcgdG9vbHMgKG9wdC1pbikiLCJzdGF0ZSI6Ik9QRU4iLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzIyIiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvY2FsbGVyLWNvbnRleHQiLCJiYXNlIjoiZmVhdC9jaS1nYXRlIiwic2hhIjoiODEzZTRmNGFhYmM0ZThkNWQyZGMyOGY1ODA2NzkwN2UwZTBjYmNjNyIsIm1lcmdlX2NvbW1pdF9zaGEiOiIwZGVjNjMyMjkwNGY1MWM1MGI4OTBjYzIwY2U0M2Y1YTI2NTk0M2UzIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yNFQwOToxODowMloiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yNFQwOToxODowMloiLCJtZXJnZWRfYXQiOiIiLCJjbG9zZWRfYXQiOiIiLCJhZGRpdGlvbnMiOjE2NzQsImRlbGV0aW9ucyI6MjksImNoYW5nZWRfZmlsZXMiOjI0LCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBQUiA4IG9mIHRoZSByb2FkbWFwLCAqKnN0YWNrZWQgb24gIzIxKiouIE9wdGlvbmFsIGV2aWRlbmNlIGFib3V0IHdoZXJlIGNoYW5nZWQgY29kZSBpcyB1c2VkLCBmb3IgdGhlIHJldmlldyB0b29scy4gKipBIG5lZ2F0aXZlIHJlc3VsdCwgc2hpcHBlZCBvcHQtaW4gYW5kIG9mZiBieSBkZWZhdWx0LioqIC0gYGpldl9yZXZpZXdgLCBgamV2X3Jpc2tgLCBgamV2X2dhdGVgIGFjY2VwdCBgY29udGV4dC5jYWxsZXJzYCAodXAgdG8gNDAgYHsgcGF0aCwgbGluZT8sIHRleHQsIHN5bWJvbD8gfWApLiBUaGUgc2VydmVyIG5ldmVyIHNlYXJjaGVzIHRoZSByZXBvIGl0c2VsZjsgdGhlIGhvc3Qgc3VwcGxpZXMgdGhlIGxpc3QuIFNuaXBwZXRzIGFyZSB1bnRydXN0ZWQ6IHNhbml0aXplZCxcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W3sic2hhIjoiODEzZTRmNGFhYmM0ZThkNWQyZGMyOGY1ODA2NzkwN2UwZTBjYmNjNyIsIm1lc3NhZ2UiOiJmZWF0OiBvcHRpb25hbCBjYWxsZXIgY29udGV4dCBmb3IgdGhlIHJldmlldyB0b29scyAob3B0LWluKSIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2NvbW1pdC84MTNlNGY0YWFiYzRlOGQ1ZDJkYzI4ZjU4MDY3OTA3ZTBlMGNiY2M3In1dLCJmaWxlcyI6W3siZmlsZW5hbWUiOiIuZW52LmV4YW1wbGUiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jaGFuZ2Vsb2cubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jaS5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NvbmZpZ3VyYXRpb24ubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9jYWxsZXJzLTIwMjYtMTAtMjQuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo5MDEsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvY2FsbGVycy0yMDI2LTEwLTI0Lm1kIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjI2LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2V2YWwtYm9udXMubWpzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjUsImRlbGV0aW9ucyI6Mn0seyJmaWxlbmFtZSI6InNjcmlwdHMvbGliL2JvbnVzLWNhbGxlcnMubWpzIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjczLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2xpYi9ib251cy1nZW5lcmF0b3IubWpzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjQsImRlbGV0aW9ucyI6MX0seyJmaWxlbmFtZSI6InNraWxscy9qZXYtbWNwL3JlZmVyZW5jZXMvdG9vbHMubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NSwiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoic3JjL2NoZWNrLnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEwLCJkZWxldGlvbnMiOjJ9LHsiZmlsZW5hbWUiOiJzcmMvY2kudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MjAsImRlbGV0aW9ucyI6MH1dLCJjaGVja3MiOlt7Im5hbWUiOiJwdWJsaXNoIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgxNDAzMDU4L2pvYi8xMjA4MzU1NTY4NjkifSx7Im5hbWUiOiJub3RpZnkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwODE0MDMwNTgvam9iLzEyMDgzNTU1NjU2NyJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjApIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgxNDAzMDQyL2pvYi8xMjA4MzU1NTU4NjkifSx7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjIpIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgxNDAzMDQyL2pvYi8xMjA4MzU1NTU4MTcifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MTQwMzA0Mi9qb2IvMTIwODM1NTU1ODA5In0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MTQwMzA0Mi9qb2IvMTIwODM1NTU1Njk1In1dfSx7Im51bWJlciI6MjEsInRpdGxlIjoiZmVhdDogcHVsbC1yZXF1ZXN0IGdhdGUgKGpldi1tY3AgY2kpIiwic3RhdGUiOiJPUEVOIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8yMSIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L2NpLWdhdGUiLCJiYXNlIjoiZmVhdC9jaGVjay1hbmQtaG9va3MiLCJzaGEiOiJhMWQzNDAyNmNmM2I3M2QwYzRlMDA3YjEyODE0YTk5Y2JjYzcyMzNjIiwibWVyZ2VfY29tbWl0X3NoYSI6ImQzYzEwYjcxNWI2MGY1Y2I0MTY1MTIzNThiZjZkMmEwZmZiYjVkZDciLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjA1OjE3WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjA1OjE3WiIsIm1lcmdlZF9hdCI6IiIsImNsb3NlZF9hdCI6IiIsImFkZGl0aW9ucyI6MTI4OCwiZGVsZXRpb25zIjoxMiwiY2hhbmdlZF9maWxlcyI6MTQsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFBSIDcgb2YgdGhlIHJvYWRtYXAsICoqc3RhY2tlZCBvbiAjMjAqKi4gYGpldi1tY3AgY2lgIGlzIHRoZSBwdWxsLXJlcXVlc3QgZ2F0ZTogaXQgYW5zd2VycyBgYXV0b2AsIGByZXZpZXdgIG9yIGBlc2NhbGF0ZWAgKGV4aXQgMCwgMTAsIDIwOyAyIG9uIGFueSBlcnJvciwgZmFpbC1jbG9zZWQpIGFuZCBuZXZlciBydW5zIHRoZSBwdWxsIHJlcXVlc3QncyBjb2RlLiAtICoqUG9saWN5IGZyb20gdGhlIGJhc2UgcmVmLioqIGAuamV2LXBvbGljeS5qc29uYCBpcyByZWFkIHdpdGggYGdpdCBzaG93IEJBU0U6Li4uYCwgc28gYSBwdWxsIHJlcXVlc3QgY2Fubm90IGxvb3NlbiBpdHMgb3duIHJ1bGVzOyBjaGFuZ2luZyB0aGUgZmlsZSBob2xkcywgYSBicm9rZW4gb25lIGhvbGRzLiBFdmVcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W3sic2hhIjoiYTFkMzQwMjZjZjNiNzNkMGM0ZTAwN2IxMjgxNGE5OWNiY2M3MjMzYyIsIm1lc3NhZ2UiOiJmZWF0OiBwdWxsLXJlcXVlc3QgZ2F0ZSAoamV2LW1jcCBjaSkiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9jb21taXQvYTFkMzQwMjZjZjNiNzNkMGM0ZTAwN2IxMjgxNGE5OWNiY2M3MjMzYyJ9XSwiZmlsZXMiOlt7ImZpbGVuYW1lIjoiLmVudi5leGFtcGxlIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjIsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6IlJFQURNRS5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NoYW5nZWxvZy5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo3LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NpLm1kIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjQ2LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NvbmZpZ3VyYXRpb24ubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9jaS0yMDI2LTEwLTI0Lmpzb24iLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MjkwLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL2NpLTIwMjYtMTAtMjQubWQiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MjYsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV4YW1wbGVzL2dpdGh1Yi1wci1nYXRlLnltbCIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo1OSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic3JjL2NoZWNrLnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjUzLCJkZWxldGlvbnMiOjEyfSx7ImZpbGVuYW1lIjoic3JjL2NpLnRzIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjI4OCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic3JjL2NsaS50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo2NiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic3JjL2dpdC50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo3NCwiZGVsZXRpb25zIjowfV0sImNoZWNrcyI6W3sibmFtZSI6InB1Ymxpc2giLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwODA1Njk5MTIvam9iLzEyMDgzMzA1ODUyMyJ9LHsibmFtZSI6Im5vdGlmeSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MDU2OTkxMi9qb2IvMTIwODMzMDU4NDU4In0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwODA1Njk1OTcvam9iLzEyMDgzMzA1NjcyMiJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjApIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgwNTY5NTk3L2pvYi8xMjA4MzMwNTY2OTkifSx7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjIpIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgwNTY5NTk3L2pvYi8xMjA4MzMwNTY2ODEifSx7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjApIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgwNTY5NTk3L2pvYi8xMjA4MzMwNTY1MjUifV19LHsibnVtYmVyIjoyMCwidGl0bGUiOiJmZWF0OiBlbmZvcmNlZCBDbGF1ZGUgQ29kZSBob29rcyBhbmQgamV2LW1jcCBjaGVjayIsInN0YXRlIjoiT1BFTiIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMjAiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC9jaGVjay1hbmQtaG9va3MiLCJiYXNlIjoiZmVhdC9sYXJnZS1kaWZmLXJldmlldyIsInNoYSI6IjNjM2Y4N2U3MmJiMzE3ODY3ZmY4ZDU5MjQzMmVmYzhmYWQwNjhiMTAiLCJtZXJnZV9jb21taXRfc2hhIjoiMjM4NmY2NDIzNDk2ZWQyOTdmZWY1MDFhMmZmYWEwYzJjMjE5ZGMzYiIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDg6MDI6NTlaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDg6MDI6NTlaIiwibWVyZ2VkX2F0IjoiIiwiY2xvc2VkX2F0IjoiIiwiYWRkaXRpb25zIjo3MTgxLCJkZWxldGlvbnMiOjAsImNoYW5nZWRfZmlsZXMiOjE5LCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBQUiA2IG9mIHRoZSByb2FkbWFwLCAqKnN0YWNrZWQgb24gIzE5KiouIE1ha2VzIHRoZSBndWFyZCBydW4gb24gZXZlcnkgdG9vbCBjYWxsIGluIENsYXVkZSBDb2RlIGluc3RlYWQgb2YgYmVpbmcgYWR2aXNvcnkuIC0gKipgamV2LW1jcCBob29rIHByZS10b29sLXVzZWAqKjogY2xhc3NpZmllciBhbmQgcmVwb3NpdG9yeSBwb2xpY3kgZmlyc3Q7IGEgY29uZmlybWVkIHJlYWQtb25seSBjb21tYW5kIGlzIHNpbGVudCB3aXRoIG5vIG1vZGVsIGNhbGw7IHJlYWRzIG9mIGtleS9jcmVkZW50aWFsIGZpbGVzIGFuZCBlZGl0cyB0byB0aGUgZ3VhcmQncyBvd24gY29uZmlnIGFzayB3aXRob3V0IGEgbW9kZWw7IG9ubHkgdGhlIGdyYXkgem9uZSBjYWxscyBgamV2X3Njb3BlYC4gQSBob29rXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOlt7InNoYSI6IjNjM2Y4N2U3MmJiMzE3ODY3ZmY4ZDU5MjQzMmVmYzhmYWQwNjhiMTAiLCJtZXNzYWdlIjoiZmVhdDogZW5mb3JjZWQgQ2xhdWRlIENvZGUgaG9va3MgYW5kIGpldi1tY3AgY2hlY2siLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9jb21taXQvM2MzZjg3ZTcyYmIzMTc4NjdmZjhkNTkyNDMyZWZjOGZhZDA2OGIxMCJ9XSwiZmlsZXMiOlt7ImZpbGVuYW1lIjoiLmVudi5leGFtcGxlIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjYsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6IlJFQURNRS5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NoYW5nZWxvZy5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxMCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jb25maWd1cmF0aW9uLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjYsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImRvY3MvaG9va3MubWQiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NzcsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL2ZpeHR1cmVzL3BvbGljeS9ob29rLXBvbGljeS5qc29uIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjE0LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL2hvb2tzLTIwMjYtMTAtMjQuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo1MjYxLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL2hvb2tzLTIwMjYtMTAtMjQubWQiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NDEsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV4YW1wbGVzL2NsYXVkZS1jb2RlLnNldHRpbmdzLmpzb24iLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MzcsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNjcmlwdHMvZXZhbC1ob29rcy5tanMiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MTQzLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzcmMvY2hlY2sudHMiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MzM1LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzcmMvY2xpLnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjgyLCJkZWxldGlvbnMiOjB9XSwiY2hlY2tzIjpbeyJuYW1lIjoibm90aWZ5Iiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDc2NTE3MDMxL2pvYi8xMjA4MjA5MDM0NTQifSx7Im5hbWUiOiJwdWJsaXNoIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDc2NTE3MDMxL2pvYi8xMjA4MjA5MDMyMDEifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3NjUxNjkyMC9qb2IvMTIwODIwOTAyMjkxIn0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzY1MTY5MjAvam9iLzEyMDgyMDkwMjE1MCJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzY1MTY5MjAvam9iLzEyMDgyMDkwMjA5NCJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzY1MTY5MjAvam9iLzEyMDgyMDkwMTk1NiJ9XX0seyJudW1iZXIiOjE5LCJ0aXRsZSI6ImZlYXQ6IGNodW5rZWQgcmV2aWV3IGZvciBkaWZmcyB0b28gbGFyZ2UgZm9yIG9uZSByZXF1ZXN0Iiwic3RhdGUiOiJPUEVOIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xOSIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L2xhcmdlLWRpZmYtcmV2aWV3IiwiYmFzZSI6ImZlYXQvcmVwby1wb2xpY3ktcHJvZmlsZXMiLCJzaGEiOiJmNGYzYTkyODI5MGYyYjIwYmVjMWQyYTFmY2M1MDgxNWMxYjZkMTQ1IiwibWVyZ2VfY29tbWl0X3NoYSI6IjgxYThkMTNkZWVmNDI1NDNlMjY3MjA0YmRkY2IwMWJlNzYwZjZiY2EiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA3OjQzOjQ0WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA3OjQzOjQ0WiIsIm1lcmdlZF9hdCI6IiIsImNsb3NlZF9hdCI6IiIsImFkZGl0aW9ucyI6MzgzMSwiZGVsZXRpb25zIjo3NCwiY2hhbmdlZF9maWxlcyI6MjQsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFBSIDUgb2YgdGhlIHJvYWRtYXAuICoqU3RhY2tlZCBvbiAjMTgqKiAoYmFzZSBpcyB0aGF0IGJyYW5jaDsgR2l0SHViIHJldGFyZ2V0cyBpdCBhcyB0aGUgc3RhY2sgbWVyZ2VzKS4gVW50aWwgbm93IGEgZGlmZiBwYXN0IGFib3V0IDMxLjhrIGVzdGltYXRlZCB0b2tlbnMgd2FzIGN1dCBvZmYgYXQgdGhlIHRhaWwgYW5kIGNvdWxkIG5ldmVyIGJlIGBhdXRvYCwgc28gYSBsYXJnZSBjaGFuZ2Ugd2FzIHVucmV2aWV3YWJsZSBhbmQgYSBkZWZlY3QgcGFzdCB0aGUgY3V0IHdhcyBpbnZpc2libGUuIGBqZXZfcmV2aWV3YCwgYGpldl9yaXNrYCBhbmQgYGpldl9nYXRlYCBub3cgcmV2aWV3IGl0IGluIHBhcnRzLiAtICoqU3BsaXQgYWxvbmcgZmlsZSBib3VuZGFyaWVzLioqIEEgbG9zc2xcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W3sic2hhIjoiZjRmM2E5MjgyOTBmMmIyMGJlYzFkMmExZmNjNTA4MTVjMWI2ZDE0NSIsIm1lc3NhZ2UiOiJmZWF0OiBjaHVua2VkIHJldmlldyBmb3IgZGlmZnMgdG9vIGxhcmdlIGZvciBvbmUgcmVxdWVzdCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2NvbW1pdC9mNGYzYTkyODI5MGYyYjIwYmVjMWQyYTFmY2M1MDgxNWMxYjZkMTQ1In1dLCJmaWxlcyI6W3siZmlsZW5hbWUiOiIuZW52LmV4YW1wbGUiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jaGFuZ2Vsb2cubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6OSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jb25maWd1cmF0aW9uLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjMsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvbGFyZ2UtZGlmZi0yMDI2LTEwLTI0Lmpzb24iLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MTg3NCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9sYXJnZS1kaWZmLTIwMjYtMTAtMjQubWQiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NDgsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNjcmlwdHMvZXZhbC1ib251cy5tanMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6OCwiZGVsZXRpb25zIjoyfSx7ImZpbGVuYW1lIjoic2NyaXB0cy9saWIvYm9udXMtZ2VuZXJhdG9yLm1qcyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo2LCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2xpYi9ib251cy1sYXJnZS5tanMiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MTUxLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJza2lsbHMvamV2LW1jcC9yZWZlcmVuY2VzL3Rvb2xzLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEyLCJkZWxldGlvbnMiOjN9LHsiZmlsZW5hbWUiOiJzcmMvY29uZmlnLnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjMsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNyYy9kaWZmLWNodW5rcy50cyIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoyNjEsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNyYy9kaWZmLnRzIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjEzNSwiZGVsZXRpb25zIjowfV0sImNoZWNrcyI6W3sibmFtZSI6Im5vdGlmeSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3NTI4MjI3Mi9qb2IvMTIwODE3MTg3MjE3In0seyJuYW1lIjoicHVibGlzaCIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3NTI4MjI3Mi9qb2IvMTIwODE3MTg3MTYwIn0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3NTI4MjE5Ni9qb2IvMTIwODE3MTg1OTEwIn0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzUyODIxOTYvam9iLzEyMDgxNzE4NTg5NyJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjApIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDc1MjgyMTk2L2pvYi8xMjA4MTcxODU4NTIifSx7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjApIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDc1MjgyMTk2L2pvYi8xMjA4MTcxODU3MDMifV19LHsibnVtYmVyIjoxOCwidGl0bGUiOiJSZXBvc2l0b3J5IHBvbGljeSBmaWxlLCBwcm9maWxlcywgYW5kIGEgZGVkaWNhdGVkIHRyaWFnZSByZWNvdmVyYWJpbGl0eSBiYXIiLCJzdGF0ZSI6Ik9QRU4iLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzE4IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvcmVwby1wb2xpY3ktcHJvZmlsZXMiLCJiYXNlIjoiZmVhdC9kZWNpc2lvbi1sZWRnZXIiLCJzaGEiOiI5OWFlMTU2Mjk5ZDRiZTljZTNhNjYzMjVkODhkNTkwYjkwMjdkZjg0IiwibWVyZ2VfY29tbWl0X3NoYSI6ImQxMTNmMjhhN2ZkODRjNmRiNDllNTMyMWNlNDdmOGE0ZTY4ZmE2ZWIiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA3OjA5OjIxWiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA3OjA5OjIxWiIsIm1lcmdlZF9hdCI6IiIsImNsb3NlZF9hdCI6IiIsImFkZGl0aW9ucyI6MjYxMjQsImRlbGV0aW9ucyI6NDMsImNoYW5nZWRfZmlsZXMiOjI0LCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBQUiA0IG9mIHRoZSByb2FkbWFwLiAqKlN0YWNrZWQgb24gIzE3KiogKGJhc2UgaXMgdGhhdCBicmFuY2g7IEdpdEh1YiByZXRhcmdldHMgaXQgYXMgdGhlIHN0YWNrIG1lcmdlcykuIEFkZHMgdGhlIGRldGVybWluaXN0aWMgbGF5ZXIgdGhlIGhvb2tzIGFuZCBDSSB3aWxsIHVzZSwgYW5kIHNldHRsZXMgdGhlIG9wZW4gXCJ0cmlhZ2UgYmFyXCIgYW5kIFwic3RyaWN0IHByb2ZpbGVcIiBxdWVzdGlvbnMgd2l0aCBtZWFzdXJlbWVudHMgaW5zdGVhZCBvZiBhcmd1bWVudC4gLSAqKmAuamV2LXBvbGljeS5qc29uYCoqLCBldmFsdWF0ZWQgYnkgYGpldl9zY29wZWAgYmVmb3JlIGFueSBKZXYgcmVxdWVzdDogLSBgcHJvdGVjdGVkX3BhdGhzYDogZ2xvYnMgd2l0aCBhIGByZXZpZXdgIG9yIGBkZVx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbeyJzaGEiOiI5OWFlMTU2Mjk5ZDRiZTljZTNhNjYzMjVkODhkNTkwYjkwMjdkZjg0IiwibWVzc2FnZSI6ImZlYXQ6IHJlcG9zaXRvcnkgcG9saWN5IGZpbGUgYW5kIGNvbmZpZGVuY2UgcHJvZmlsZXMiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9jb21taXQvOTlhZTE1NjI5OWQ0YmU5Y2UzYTY2MzI1ZDg4ZDU5MGI5MDI3ZGY4NCJ9XSwiZmlsZXMiOlt7ImZpbGVuYW1lIjoiLmVudi5leGFtcGxlIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjMsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImRvY3MvY2hhbmdlbG9nLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEwLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NvbmZpZ3VyYXRpb24ubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MzgsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL2ZpeHR1cmVzL3BvbGljeS9iZW5jaC1wb2xpY3kuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo2LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL1JFQURNRS5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoyLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL3BvbGljeS0yMDI2LTEwLTI0Lmpzb24iLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MjA4NiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9wb2xpY3ktMjAyNi0xMC0yNC5tZCIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjozMywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9wcm9maWxlcy0yMDI2LTEwLTI0Lmpzb24iLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MjI4MDcsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvcHJvZmlsZXMtMjAyNi0xMC0yNC5tZCIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo1NSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXhhbXBsZXMvamV2LXBvbGljeS5qc29uIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjE3LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2V2YWwtYm9udXMubWpzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjExLCJkZWxldGlvbnMiOjN9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL3J1bi10ZXN0cy5tanMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MiwiZGVsZXRpb25zIjoxfV0sImNoZWNrcyI6W3sibmFtZSI6InB1Ymxpc2giLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzMwMjExMDQvam9iLzEyMDgxMDM1ODEyMSJ9LHsibmFtZSI6Im5vdGlmeSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MzAyMTEwNC9qb2IvMTIwODEwMzU4MDE0In0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzMwMjEwOTUvam9iLzEyMDgxMDM1NzM2NyJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzMwMjEwOTUvam9iLzEyMDgxMDM1NzM2NiJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzMwMjEwOTUvam9iLzEyMDgxMDM1NzM0MyJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjApIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDczMDIxMDk1L2pvYi8xMjA4MTAzNTcwNTYifV19LHsibnVtYmVyIjoxNywidGl0bGUiOiJEZWNpc2lvbiBsZWRnZXI6IGRlY2lzaW9uX2lkIG9uIGV2ZXJ5IHJlc3VsdCBhbmQgamV2X2ZlZWRiYWNrIiwic3RhdGUiOiJPUEVOIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xNyIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L2RlY2lzaW9uLWxlZGdlciIsImJhc2UiOiJmZWF0L2NvbW1hbmQtZWZmZWN0LWNsYXNzaWZpZXIiLCJzaGEiOiI1MDZmNzM4MDBlNmI0NDk1N2Y2MGU2ZTBjNTJkNTMwMGQ4ZDIyZDM3IiwibWVyZ2VfY29tbWl0X3NoYSI6Ijg0MTMwOTRjZTM4Y2EzMjY3Yjc1NWY1YjUwOGUyZDk1MmQ5OGZkMzUiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA2OjQ5OjA3WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA2OjQ5OjA3WiIsIm1lcmdlZF9hdCI6IiIsImNsb3NlZF9hdCI6IiIsImFkZGl0aW9ucyI6Nzc1OSwiZGVsZXRpb25zIjoxMywiY2hhbmdlZF9maWxlcyI6MzIsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFBSIDMgb2YgdGhlIHJvYWRtYXAuICoqU3RhY2tlZCBvbiAjMTYqKiAoYmFzZSBpcyB0aGF0IGJyYW5jaDsgR2l0SHViIHJldGFyZ2V0cyBpdCBhcyB0aGUgc3RhY2sgbWVyZ2VzKS4gTm90aGluZyByZWNvcmRzIEpldidzIGRlY2lzaW9ucyBvciB3aGV0aGVyIHRoZXkgd2VyZSByaWdodCwgc28gcmVhbC1saWZlIGZhbHNlLWFsYXJtIHJhdGVzIGFyZSB1bmtub3duIGFuZCBldmVyeSB0aHJlc2hvbGQgcXVlc3Rpb24gKHN1Y2ggYXMgdGhlIHRyaWFnZSBiYXIpIGNhbiBvbmx5IGJlIGFyZ3VlZCBmcm9tIHN5bnRoZXRpYyBiZW5jaG1hcmtzLiBUaGlzIGFkZHMgdGhlIG1lYXN1cmVtZW50IGxheWVyIHRoZSBsYXRlciBQUnMgKGhvb2tzLCBDSSkgd2lsbCBsb2cgaW50by4gLSAqKmBkZWNcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W3sic2hhIjoiNTA2ZjczODAwZTZiNDQ5NTdmNjBlNmUwYzUyZDUzMDBkOGQyMmQzNyIsIm1lc3NhZ2UiOiJmZWF0OiBkZWNpc2lvbiBsZWRnZXIsIGRlY2lzaW9uX2lkIG9uIGV2ZXJ5IHJlc3VsdCwgYW5kIGpldl9mZWVkYmFjayIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2NvbW1pdC81MDZmNzM4MDBlNmI0NDk1N2Y2MGU2ZTBjNTJkNTMwMGQ4ZDIyZDM3In1dLCJmaWxlcyI6W3siZmlsZW5hbWUiOiIuZW52LmV4YW1wbGUiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiQUdFTlRTLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImRvY3MvY2hhbmdlbG9nLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjgsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImRvY3MvY29uZmlndXJhdGlvbi5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxMCwiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoiZG9jcy90b29scy5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjozLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9maXh0dXJlcy9sZWRnZXIvUkVBRE1FLm1kIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjcsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL2ZpeHR1cmVzL2xlZGdlci9sZWRnZXItMjAyNi0xMC5qc29ubCIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjozMDYsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvUkVBRE1FLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvbGVkZ2VyLTIwMjYtMTAtMjQuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo2NjA5LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL2xlZGdlci0yMDI2LTEwLTI0Lm1kIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjQ1LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2JlbmNobWFyay5tanMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MSwiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoic2NyaXB0cy9ldmFsLWJvbnVzLm1qcyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxOSwiZGVsZXRpb25zIjoxfV0sImNoZWNrcyI6W3sibmFtZSI6Im5vdGlmeSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MTcwMTIzMi9qb2IvMTIwODA2MzM5MDEyIn0seyJuYW1lIjoicHVibGlzaCIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MTcwMTIzMi9qb2IvMTIwODA2MzM4ODQ3In0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzE3MDA5MjEvam9iLzEyMDgwNjMzNzEwNSJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzE3MDA5MjEvam9iLzEyMDgwNjMzNzA4OCJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzE3MDA5MjEvam9iLzEyMDgwNjMzNzA4NyJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjIpIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDcxNzAwOTIxL2pvYi8xMjA4MDYzMzY4OTEifV19LHsibnVtYmVyIjoxNiwidGl0bGUiOiJDb21tYW5kIGVmZmVjdCBjbGFzc2lmaWVyOiB0aGUgY29tbWFuZCB0ZXh0IGNhbiByYWlzZSBhIGRlY2xhcmVkIGVmZmVjdCIsInN0YXRlIjoiT1BFTiIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTYiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC9jb21tYW5kLWVmZmVjdC1jbGFzc2lmaWVyIiwiYmFzZSI6Im1haW4iLCJzaGEiOiIwMGRhNzRlOTY3ZmU4OGM3YzhlZGEyYjQzM2NkYjE1ZmJkZWJhZjQ3IiwibWVyZ2VfY29tbWl0X3NoYSI6IjY1MDM5ODllNjUyNjllNjY4NDdlYTM1ZjAyZjMwZWYxNzJjYWRjYjMiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA2OjM4OjIzWiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjI5OjEyWiIsIm1lcmdlZF9hdCI6IiIsImNsb3NlZF9hdCI6IiIsImFkZGl0aW9ucyI6ODE3MCwiZGVsZXRpb25zIjo5LCJjaGFuZ2VkX2ZpbGVzIjoxNiwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgUFIgMiBvZiB0aGUgcm9hZG1hcC4gKipTdGFja2VkIG9uICMxNSoqIChiYXNlIGlzIHRoYXQgYnJhbmNoOyBHaXRIdWIgd2lsbCByZXRhcmdldCB0aGlzIHRvIGBtYWluYCBvbmNlICMxNSBtZXJnZXMpLiBgamV2X3Njb3BlYCB0cnVzdGVkIHRoZSBob3N0LWRlY2xhcmVkIGBlZmZlY3RgOiBgcmVhZF9vbmx5YCArIGBybSAtcmYgYnVpbGQgJiYgZ2l0IHB1c2ggLS1mb3JjZWAgcmV0dXJuZWQgYGF1dG9gIHdoZW5ldmVyIHRoZSBqdWRnZSdzIGFuc3dlcnMgd2VyZSBjbGVhbi4gVGhpcyBhZGRzIGEgZGV0ZXJtaW5pc3RpYyBjbGFzc2lmaWVyIHNvIHRoZSBjb21tYW5kIHRleHQgY2FuIHJhaXNlIHRoZSBlZmZlY3QsIGFuZCBuZXZlciBsb3dlciBpdC4gLSAqKmBzcmMvZWZmZWN0cy50c1x1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbeyJzaGEiOiIwMGRhNzRlOTY3ZmU4OGM3YzhlZGEyYjQzM2NkYjE1ZmJkZWJhZjQ3IiwibWVzc2FnZSI6ImZlYXQ6IGRldGVybWluaXN0aWMgY29tbWFuZCBlZmZlY3QgY2xhc3NpZmllciBmb3Igc2NvcGUsIHJvdXRlIGFuZCBzdGVwIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvY29tbWl0LzAwZGE3NGU5NjdmZTg4YzdjOGVkYTJiNDMzY2RiMTVmYmRlYmFmNDcifV0sImZpbGVzIjpbeyJmaWxlbmFtZSI6ImRvY3MvY2hhbmdlbG9nLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjYsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvUkVBRE1FLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvY2xhc3NpZmllci0yMDI2LTEwLTI0Lmpzb24iLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NjcxOCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9jbGFzc2lmaWVyLTIwMjYtMTAtMjQubWQiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NDIsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNjcmlwdHMvZXZhbC1ib251cy5tanMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MywiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoic2NyaXB0cy9saWIvYm9udXMtZ2VuZXJhdG9yLm1qcyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo2NywiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoic2NyaXB0cy9saWIvYm9udXMubWpzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjExLCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJza2lsbHMvamV2LW1jcC9yZWZlcmVuY2VzL3Rvb2xzLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjMsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNyYy9lZmZlY3RzLnRzIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjg5OSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic3JjL3Rvb2xzL291dHB1dC1zY2hlbWFzLnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjE5LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzcmMvdG9vbHMvc2NvcGUudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6OCwiZGVsZXRpb25zIjoyfSx7ImZpbGVuYW1lIjoic3JjL3Rvb2xzL3N0ZXAudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NiwiZGVsZXRpb25zIjoxfV0sImNoZWNrcyI6W3sibmFtZSI6InB1Ymxpc2giLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzA5OTc0ODIvam9iLzEyMDgwNDE5NDI5MiJ9LHsibmFtZSI6Im5vdGlmeSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MDk5NzQ4Mi9qb2IvMTIwODA0MTk0MTgzIn0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzA5OTc0MjAvam9iLzEyMDgwNDE5MzUzMSJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzA5OTc0MjAvam9iLzEyMDgwNDE5MzUxMiJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjApIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDcwOTk3NDIwL2pvYi8xMjA4MDQxOTM1MDgifSx7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjApIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDcwOTk3NDIwL2pvYi8xMjA4MDQxOTM0MjkifV19LHsibnVtYmVyIjoxNSwidGl0bGUiOiJIYXJkZW5pbmc6IGxvb3AgZGV0ZWN0b3IgcHJvZ3Jlc3MsIHJlc2VydmVkIHRva2VuIGJ1ZGdldCwgZ2F0ZSBvcmRlciwgdHJpYWdlIHByb2dyZXNzIHdvcmRpbmciLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTUiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC9oYXJkZW5pbmctbG9vcC1idWRnZXQtZ2F0ZSIsImJhc2UiOiJtYWluIiwic2hhIjoiYTlmNGRkYWFlMjAxNzU0ZTIzN2RmYjZjMmIzYWYzZmU2MzZkMTg0MSIsIm1lcmdlX2NvbW1pdF9zaGEiOiI5MjE4NjMzMGJiNTU1ODM5OGNlYTJlNDAyNzVjMjhlMjZjODdmNmEzIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yNFQwNjoyMjozNFoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yNFQwOToyOTowOVoiLCJtZXJnZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjI5OjA5WiIsImNsb3NlZF9hdCI6IjIwMjYtMTAtMjRUMDk6Mjk6MDlaIiwiYWRkaXRpb25zIjo4NTQzLCJkZWxldGlvbnMiOjQ5LCJjaGFuZ2VkX2ZpbGVzIjoyMiwiY29tbWl0c19jb3VudCI6MiwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgUFIgMSBvZiBhIDktc3RhZ2Ugcm9hZG1hcCAocmV2aWV3ZWQgY29kZSBmcm9tICMxMlx1MjAxMyMxNCwgdGhlbiBwbGFubmVkIGZpeGVzIGFuZCBlbmhhbmNlbWVudHMpLiBIYXJkZW5pbmcgb25seTogaXQgZml4ZXMgZGVmZWN0cyBmb3VuZCBieSByZWFkaW5nIGFuZCBydW5uaW5nIHRoZSBtZXJnZWQgY29kZSwgYW5kIG9uZSBtb2RlbCBtaXNqdWRnbWVudCBmb3VuZCBieSB0aGUgbGl2ZSBiZW5jaG1hcmsuIC0gKipMb29wIGRldGVjdG9yIG5vIGxvbmdlciBmbGFncyBwcm9ncmVzcy4qKiBGYWlsdXJlIGNvdW50cyB0aGF0IHN0cmljdGx5IHNocmluayBhY3Jvc3MgYXR0ZW1wdHMgKDkgXHUyMTkyIDUgXHUyMTkyIDIgZmFpbGVkKSB3ZXJlIHJlcG9ydGVkIGFzIGBzYW1lX2ZhaWx1cmVgIGJlY2F1c2UgZXZlclx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MTQsInRpdGxlIjoiTGl2ZSBKZXYgdmFsdWUgYmVuY2htYXJrIHdpdGggcmFuZG9taXplZCBjYXNlcywgcGx1cyB0aGUgZml4ZXMgYW5kIGNhbGlicmF0aW9uIGl0IGZvdW5kIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzE0IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvamV2LXZhbHVlLWJlbmNobWFyayIsImJhc2UiOiJtYWluIiwic2hhIjoiNGVhMWI4MTZlMWQwMjk2ZTNlZjkzNDNiMThlMGI4YzcxOWJlYzMxMSIsIm1lcmdlX2NvbW1pdF9zaGEiOiI3ZDI3MzdiYzIyM2M2NzQ2ZWEyYmNkOGI5YzZiMjhkZTI1NjkyYzA2IiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yM1QxOTo0NTo1OVoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yM1QxOTo0ODo1MloiLCJtZXJnZWRfYXQiOiIyMDI2LTEwLTIzVDE5OjQ4OjUxWiIsImNsb3NlZF9hdCI6IjIwMjYtMTAtMjNUMTk6NDg6NTFaIiwiYWRkaXRpb25zIjoyNjY5NiwiZGVsZXRpb25zIjozMCwiY2hhbmdlZF9maWxlcyI6MjksImNvbW1pdHNfY291bnQiOjMsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFRoaXMgUFIgbWVhc3VyZXMgd2hhdCBsaXZlIEpldiBhZGRzIG92ZXIgY2hlYXAgbG9jYWwgcnVsZXMsIGZpeGVzIHRoZSBqZXYtbWNwIGRlZmVjdHMgdGhhdCBtZWFzdXJlbWVudCBleHBvc2VkLCBhbmQgcmVjYWxpYnJhdGVzIHRocmVlIFwibG93ZXIgaXMgYmV0dGVyXCIgc2NvcmVzIGJhc2VkIG9uIHRoZSBkYXRhLiAtICoqQmVuY2htYXJrOioqIGBucG0gcnVuIGV2YWw6Ym9udXNgLiBMYWJlbGxlZCByaXNreS9zYWZlIGNhc2VzIGFyZSBkZWNpZGVkIHRocmVlIHdheXM6IGJ5ICoqbm8gZ3VhcmQqKiwgYnkgYSAqKnJ1bGVzLW9ubHkgZ3VhcmQqKiB3aXRoIG5vIG1vZGVsIGNhbGwsIGFuZCBieSAqKmxpdmUgSmV2KiouIFRoZSA1MSBoYW5kLXdyaXR0ZW4gY2FzZXMgYXJlIGpvaW5lZFx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MTMsInRpdGxlIjoiR3VhcmRyYWlsIGhhcmRlbmluZzogcG9saWN5IGZpeGVzLCBjYWNoZS9idWRnZXQvc3RhdHMsIHJpc2stYXdhcmUgZ2F0ZSwgbG9vcCBkZXRlY3RvciIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xMyIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L3YwLjMtZ3VhcmRyYWlsLWhhcmRlbmluZyIsImJhc2UiOiJtYWluIiwic2hhIjoiMWE1ODUwMDEyYjA4Mjc2MTk5ZjBmMTNiODQ4YTIyNzg3MjZkZDkzZCIsIm1lcmdlX2NvbW1pdF9zaGEiOiI5N2UxY2QxNmY1YWQ2MjZjZmQ0ZWRlNzc2MmI1MTM4OTdjNDQ0YzM5IiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yM1QxODo0MjoyMloiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yM1QxODo1ODozMFoiLCJtZXJnZWRfYXQiOiIyMDI2LTEwLTIzVDE4OjU4OjMwWiIsImNsb3NlZF9hdCI6IjIwMjYtMTAtMjNUMTg6NTg6MzBaIiwiYWRkaXRpb25zIjoyMjM3LCJkZWxldGlvbnMiOjM0NiwiY2hhbmdlZF9maWxlcyI6MzQsImNvbW1pdHNfY291bnQiOjMsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiJGb2xsb3dzICMxMiAodjAuMiBzY29wZS90cmlhZ2UvcmlzayB0b29scykuIFRoZSBwb2xpY3kgZml4ZXMgZm9yIGRlZmVjdHMgdGhhdCAjMTIgaXRzZWxmIGludHJvZHVjZWQgd2VyZSBtb3ZlZCBvbnRvICMxMiBiZWZvcmUgaXQgbWVyZ2VkOiB0aGUgcmlzay1mbGFnIG1hc2tpbmcsIHRoZSBlc2NhbGF0aW9uIGN1dG9mZiBmb3Igc2NvcGUgYW5kIHJpc2ssIHRyaWFnZSBlc2NhbGF0aW9uIG9yZGVyLCB0aGUgaW5qZWN0aW9uLWJhY2tzdG9wIHJlZ3Jlc3Npb24gYW5kIHRyaWFnZSBjYXVzZS1JRCBzYW5pdGl6YXRpb24uIFRoaXMgYnJhbmNoIGFscmVhZHkgaW5jbHVkZXMgdGhhdCB3b3JrIHRocm91Z2ggYSBtZXJnZSBjb21taXQuIFdoYXQgcmVtYWlucyBoZXJlIGlzIHRoZSBoYXJkZW5pbmcgb2YgcHJcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjEyLCJ0aXRsZSI6ImZlYXQ6IGFkZCBzY29wZSwgdHJpYWdlLCBhbmQgc2VjdXJpdHkgcmlzayB0b29scyIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xMiIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L3YwLjItYWdlbnQtZ3VhcmRyYWlscyIsImJhc2UiOiJtYWluIiwic2hhIjoiYjBlYWNiMDQzZDk3YzliZDM0MTQwYzgwN2U5ZTg4ZmVjNjE5NDMwYSIsIm1lcmdlX2NvbW1pdF9zaGEiOiI4YmNiOTJhZDZiODdiNzc1OWE2YWI5N2M0ODRmODc0ZGNkMTZkMzg1IiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0xN1QxMzowNDowMVoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yM1QxODo1MDoyNVoiLCJtZXJnZWRfYXQiOiIyMDI2LTEwLTIzVDE4OjUwOjI0WiIsImNsb3NlZF9hdCI6IjIwMjYtMTAtMjNUMTg6NTA6MjRaIiwiYWRkaXRpb25zIjoxNTYyLCJkZWxldGlvbnMiOjM4LCJjaGFuZ2VkX2ZpbGVzIjozMywiY29tbWl0c19jb3VudCI6MiwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgVGhpcyBQUiBleHRlbmRzIGBqZXYtbWNwYCBmcm9tIHRoZSBjb3JlIGNvZGluZyBsb29wIGludG8gdGhyZWUgYWRqYWNlbnQgZGVjaXNpb24gYm91bmRhcmllczogMS4gKipgamV2X3Njb3BlYCoqIC0gc2VtYW50aWMgcHJlZmxpZ2h0IGZvciBhIGhvc3QtcHJlcGFyZWQgYWN0aW9uLiAyLiAqKmBqZXZfdHJpYWdlYCoqIC0gZmFpbHVyZSBjYXVzZSwgbG9vcCBwcm9ncmVzcywgYW5kIHJlY292ZXJ5IHN0cmF0ZWd5LiAzLiAqKmBqZXZfcmlza2AqKiAtIHNlY3VyaXR5LWZvY3VzZWQgcGF0Y2ggcmlzayB0cmlhZ2UuIFRoZSBleGlzdGluZyBuaW5lIHRvb2xzIGFuZCB0aGVpciBwb2xpY2llcyBhcmUgdW5jaGFuZ2VkLiBUaGUgc2VydmVyIG5vdyBleHBvc2VzICoqMTIgdG9vbHMsIDExXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoxMSwidGl0bGUiOiJzZWN1cml0eTogaGFyZGVuIHVudHJ1c3RlZC1kYXRhIGhhbmRsaW5nIGFuZCBoZWxwZXIgYm91bmRhcmllcyIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xMSIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJzZWN1cml0eS9oYXJkZW4tdW50cnVzdGVkLWRhdGEiLCJiYXNlIjoibWFpbiIsInNoYSI6ImUwZmY2ZTM4MTIxY2M4MTdiNDE5ZGJhMTRjZTBlY2ZjNzE3NjEyZjUiLCJtZXJnZV9jb21taXRfc2hhIjoiNmVjY2I1MjM0ODIzYTlmNThkOWE3Y2FiOTViZjcxYjA0ZGYwMGM5MSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMTdUMTI6MTQ6MzRaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMTdUMTI6MzY6MTVaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0xN1QxMjozNjoxNVoiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTE3VDEyOjM2OjE1WiIsImFkZGl0aW9ucyI6MTEwMSwiZGVsZXRpb25zIjoxODgsImNoYW5nZWRfZmlsZXMiOjY0LCJjb21taXRzX2NvdW50IjoyLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBUaGlzIFBSIGhhcmRlbnMgdGhlIGJvdW5kYXJpZXMgd2hlcmUgYGpldi1tY3BgIGhhbmRsZXMgdGhpcmQtcGFydHkgdGV4dCwgaG9zdC1wcmVwYXJlZCB0b29sIG1ldGFkYXRhLCBwcm92aWRlciBjcmVkZW50aWFscywgYW5kIGFnZW50IGV2YWx1YXRpb24gY29kZS4gSXQgYWxzbyBmaXhlcyBzZXZlcmFsIGNvcnJlY3RuZXNzIGRlZmVjdHMgZm91bmQgZHVyaW5nIHRoZSBhdWRpdC4gVGhlIGNoZWNrb3V0IGFscmVhZHkgY29udGFpbmVkIGEgcGVuZGluZyByZW1lZGlhdGlvbiBiYXRjaDsgdGhpcyBicmFuY2ggYnVpbGRzIG9uIGl0IGFuZCB0dXJucyB0aGUgd2hvbGUgc2V0IGludG8gb25lIHJldmlld2VkIGNoYW5nZS4gTm8gbGl2ZSBwcm92aWRlciBjYWxscyBvciBwdWJsaXNoaW5nXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoxMCwidGl0bGUiOiJQYWNrYWdlIHBvcnRhYmxlIEpldiBza2lsbCBhbmQgYWRkIHJlYWwtYWdlbnQgZXZhbHVhdGlvbnMiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTAiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiY29kZXgvcG9ydGFibGUtc2tpbGwtZXZhbHMiLCJiYXNlIjoibWFpbiIsInNoYSI6ImZkMzQ3MDFlMTU1YjZjMjMwY2JhY2U0MTFkZjYyMzg4MDQwNWIxMzEiLCJtZXJnZV9jb21taXRfc2hhIjoiNTcxZjQ2NDU2NWExMzE5YWJlNTJjYjk1MTIwYjM3MTc0ZWU1M2FiYSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMTVUMTY6NDQ6NDZaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMTVUMTY6NTE6MjJaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0xNVQxNjo1MToyMloiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTE1VDE2OjUxOjIyWiIsImFkZGl0aW9ucyI6NTc2NSwiZGVsZXRpb25zIjozNjgsImNoYW5nZWRfZmlsZXMiOjUwLCJjb21taXRzX2NvdW50IjoyLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgUHJvYmxlbSBhbmQgYmVoYXZpb3IgVGhlIEpldiBjb21wYW5pb24gc2tpbGwgZGVwZW5kZWQgb24gcmVwb3NpdG9yeSBkb2N1bWVudGF0aW9uIGFuZCBoYWQgbm8gcmVwcm9kdWNpYmxlIHN0YW5kYWxvbmUgcGFja2FnZSBvciByZWFsLWFnZW50IGV2YWx1YXRpb24gcGF0aC4gVGhpcyBjaGFuZ2UgbWFrZXMgdGhlIGNvbXBsZXRlIHNraWxsIGluZGVwZW5kZW50bHkgaW5zdGFsbGFibGUgYXQgYC5hZ2VudHMvc2tpbGxzL2pldi1tY3BgIGFuZCBhZGRzIGJvdW5kZWQgZXZhbHVhdGlvbnMgb2YgdGhlIGNvbWJpbmVkIHNraWxsICsgbGl2ZSBNQ1Agd29ya2Zsb3cgaW4gQ29kZXggYW5kIHRoZSBvZmZpY2lhbCBDdXJzb3IgQ0xJLiAjIyBDaGFuZ2VzIC0gTW92ZSBjYW5vbmljYWwgY29udHJhY3RzIGluXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjo4LCJ0aXRsZSI6IlBpbiB0aGUgbmV3ZXN0IHB1bGwgcmVxdWVzdCBvbiB0aGUgd2F0Y2ggYm9hcmQiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvOCIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJjdXJzb3IvaW50ZXJhY3RpdmUtcHItd2F0Y2gtNTE4ZSIsImJhc2UiOiJtYWluIiwic2hhIjoiNDgzMzYzNDZjZDNmYjVlYjk2NTU2MTI2NWUwYmYzZDA1OWVjNWYwZiIsIm1lcmdlX2NvbW1pdF9zaGEiOiI5NDQ4ZjYxMjAwMTVmMmY2YzZkYWQ3MTM3YzdmMjM0NTQ1MjA5OTE4IiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0wOS0yMVQxNzo1OTowNloiLCJ1cGRhdGVkX2F0IjoiMjAyNi0wOS0yMVQxNzo1OToxMloiLCJtZXJnZWRfYXQiOiIyMDI2LTA5LTIxVDE3OjU5OjEyWiIsImNsb3NlZF9hdCI6IjIwMjYtMDktMjFUMTc6NTk6MTJaIiwiYWRkaXRpb25zIjoxMTE4LCJkZWxldGlvbnMiOjEzMywiY2hhbmdlZF9maWxlcyI6NiwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgLSBUaGUgR2l0SHViIHdhdGNoIGJvYXJkIGFsd2F5cyBsZWFkcyB3aXRoIHRoZSBoaWdoZXN0LW51bWJlcmVkIHB1bGwgcmVxdWVzdCwgc28gdGhlIGxhdGVzdCBvbmUgc3RheXMgdmlzaWJsZS4gLSBFYWNoIHB1bGwgcmVxdWVzdCBzaG93cyBhdXRob3IsIGJyYW5jaGVzLCBkaWZmIHNpemUsIGNoZWNrcywgcmV2aWV3cywgY29tbWl0cywgYW5kIGZpbGVzLiAtIEEgZmFpbGVkIEdpdEh1YiByZWFkIGtlZXBzIHRoZSBsYXN0IHNhdmVkIGxpc3QgYW5kIHNheXMgdGhlIGxpdmUgbGlzdCBpcyB1bmF2YWlsYWJsZSwgaW5zdGVhZCBvZiBibGFua2luZyB0aGUgcGFnZSBvciBwcmV0ZW5kaW5nIHRoZSBsaXN0IGlzIGVtcHR5LiAtIGBkb2NzL2dpdGh1Yi13YXRjaC5odG1sYCBhZGRzIHNlYVx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfV19 -->
