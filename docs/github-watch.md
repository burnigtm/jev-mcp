# Jev_MCP GitHub watch

**Latest pull request:** [#20 feat: enforced Claude Code hooks and jev-mcp check](https://github.com/burnigtm/jev-mcp/pull/20) — **open** 2026-10-24T08:02:59Z · just now · burnigtm · `feat/check-and-hooks` → `feat/large-diff-review` · +7181 −0 · 19 files.

Open **6** · Merged **9** · Closed **0** · [Interactive board](github-watch.html)

This is the **Cursor Project dashboard** for [burnigtm/jev-mcp](https://github.com/burnigtm/jev-mcp). Open **Projects → Jev_MCP** (not the Agents list). The latest pull request stays at the top even when the list is long. GitHub Actions refreshes this file on branch `cursor-watch`.

| | |
| --- | --- |
| **Last refresh** | 2026-10-24T08:03:19Z |
| **Data** | GitHub API |
| **Last GitHub event** | `pull_request_target` `opened` |
| **Open PRs** | [#20](https://github.com/burnigtm/jev-mcp/pull/20) feat: enforced Claude Code hooks and jev-mcp check, [#19](https://github.com/burnigtm/jev-mcp/pull/19) feat: chunked review for diffs too large for one request, [#18](https://github.com/burnigtm/jev-mcp/pull/18) Repository policy file, profiles, and a dedicated triage recoverability bar, [#17](https://github.com/burnigtm/jev-mcp/pull/17) Decision ledger: decision_id on every result and jev_feedback, [#16](https://github.com/burnigtm/jev-mcp/pull/16) Command effect classifier: the command text can raise a declared effect |
| **Merged (recent)** | [#14](https://github.com/burnigtm/jev-mcp/pull/14) Live Jev value benchmark with randomized cases, plus the fixes and calibration it found, [#13](https://github.com/burnigtm/jev-mcp/pull/13) Guardrail hardening: policy fixes, cache/budget/stats, risk-aware gate, loop detector, [#12](https://github.com/burnigtm/jev-mcp/pull/12) feat: add scope, triage, and security risk tools, [#11](https://github.com/burnigtm/jev-mcp/pull/11) security: harden untrusted-data handling and helper boundaries, [#10](https://github.com/burnigtm/jev-mcp/pull/10) Package portable Jev skill and add real-agent evaluations |
| **GitHub `main`** | [`3c3f87e`](https://github.com/burnigtm/jev-mcp/commit/3c3f87e72bb317867ff8d592432efc8fad068b10) |
| **Cursor target** | `bc-c78e565c-bc13-4d27-ada8-cc5e7e04eb9e` |

## Latest

<details open>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/20">#20 feat: enforced Claude Code hooks and jev-mcp check — OPEN</a></summary>
<table>
<tr><td><strong>State</strong></td><td>OPEN</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/check-and-hooks → feat/large-diff-review</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T08:02:59Z · just now</td></tr>
<tr><td><strong>Merged</strong></td><td>not merged</td></tr>
<tr><td><strong>Diff</strong></td><td>+7181 −0 · 19 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>5 still running · 6 checks</td></tr>
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
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40076517031/job/120820903201">publish</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40076516920/job/120820902291">check (windows-latest, 22)</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40076516920/job/120820902150">check (windows-latest, 20)</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40076516920/job/120820902094">check (ubuntu-latest, 22)</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40076516920/job/120820901956">check (ubuntu-latest, 20)</a> <code>in_progress</code></li>
</ul>
<p><strong>Description</strong></p><p>## Summary PR 6 of the roadmap, **stacked on #19**. Makes the guard run on every tool call in Claude Code instead of being advisory. - **`jev-mcp hook pre-tool-use`**: classifier and repository policy first; a confirmed read-only command is silent with no model call; reads of key/credential files and edits to the guard&#x27;s own config ask without a model; only the gray zone calls `jev_scope`. A hook only restricts: silent, `ask`, or `deny` for an explicit policy `deny` rule. A model judgment is an…</p>
</details>


## Open

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/19">#19 feat: chunked review for diffs too large for one request — OPEN</a></summary>
<table>
<tr><td><strong>State</strong></td><td>OPEN</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/large-diff-review → feat/repo-policy-profiles</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T07:43:44Z · 19m ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-10-24T07:09:21Z · 53m ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-10-24T06:49:07Z · 1h ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-10-24T06:38:23Z · 1h ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-10-24T06:22:34Z · 1h ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-10-23T19:48:52Z · 12h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-23T19:48:51Z · 12h ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-10-23T18:58:30Z · 13h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-23T18:58:30Z · 13h ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-10-23T18:50:25Z · 13h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-23T18:50:24Z · 13h ago</td></tr>
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


## Closed

None.


## Activity

[PR #20](https://github.com/burnigtm/jev-mcp/pull/20) feat: enforced Claude Code hooks and jev-mcp check

- Event: `pull_request_target` `opened`
- Ref: `main` SHA [`3c3f87e`](https://github.com/burnigtm/jev-mcp/commit/3c3f87e72bb317867ff8d592432efc8fad068b10)

Search, filters, checks, commits, and files are on the interactive board next to this file. Follow-ups land in the **Jev_MCP Project** chat.

Live Actions: [Notify Jev_MCP](https://github.com/burnigtm/jev-mcp/actions/workflows/notify-jev-mcp.yml).

<!-- jev-watch:snapshot eyJwdWxscyI6W3sibnVtYmVyIjoyMCwidGl0bGUiOiJmZWF0OiBlbmZvcmNlZCBDbGF1ZGUgQ29kZSBob29rcyBhbmQgamV2LW1jcCBjaGVjayIsInN0YXRlIjoiT1BFTiIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMjAiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC9jaGVjay1hbmQtaG9va3MiLCJiYXNlIjoiZmVhdC9sYXJnZS1kaWZmLXJldmlldyIsInNoYSI6IjNjM2Y4N2U3MmJiMzE3ODY3ZmY4ZDU5MjQzMmVmYzhmYWQwNjhiMTAiLCJtZXJnZV9jb21taXRfc2hhIjoiMjM4NmY2NDIzNDk2ZWQyOTdmZWY1MDFhMmZmYWEwYzJjMjE5ZGMzYiIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDg6MDI6NTlaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDg6MDI6NTlaIiwibWVyZ2VkX2F0IjoiIiwiY2xvc2VkX2F0IjoiIiwiYWRkaXRpb25zIjo3MTgxLCJkZWxldGlvbnMiOjAsImNoYW5nZWRfZmlsZXMiOjE5LCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBQUiA2IG9mIHRoZSByb2FkbWFwLCAqKnN0YWNrZWQgb24gIzE5KiouIE1ha2VzIHRoZSBndWFyZCBydW4gb24gZXZlcnkgdG9vbCBjYWxsIGluIENsYXVkZSBDb2RlIGluc3RlYWQgb2YgYmVpbmcgYWR2aXNvcnkuIC0gKipgamV2LW1jcCBob29rIHByZS10b29sLXVzZWAqKjogY2xhc3NpZmllciBhbmQgcmVwb3NpdG9yeSBwb2xpY3kgZmlyc3Q7IGEgY29uZmlybWVkIHJlYWQtb25seSBjb21tYW5kIGlzIHNpbGVudCB3aXRoIG5vIG1vZGVsIGNhbGw7IHJlYWRzIG9mIGtleS9jcmVkZW50aWFsIGZpbGVzIGFuZCBlZGl0cyB0byB0aGUgZ3VhcmQncyBvd24gY29uZmlnIGFzayB3aXRob3V0IGEgbW9kZWw7IG9ubHkgdGhlIGdyYXkgem9uZSBjYWxscyBgamV2X3Njb3BlYC4gQSBob29rXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOlt7InNoYSI6IjNjM2Y4N2U3MmJiMzE3ODY3ZmY4ZDU5MjQzMmVmYzhmYWQwNjhiMTAiLCJtZXNzYWdlIjoiZmVhdDogZW5mb3JjZWQgQ2xhdWRlIENvZGUgaG9va3MgYW5kIGpldi1tY3AgY2hlY2siLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9jb21taXQvM2MzZjg3ZTcyYmIzMTc4NjdmZjhkNTkyNDMyZWZjOGZhZDA2OGIxMCJ9XSwiZmlsZXMiOlt7ImZpbGVuYW1lIjoiLmVudi5leGFtcGxlIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjYsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6IlJFQURNRS5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NoYW5nZWxvZy5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxMCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jb25maWd1cmF0aW9uLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjYsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImRvY3MvaG9va3MubWQiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NzcsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL2ZpeHR1cmVzL3BvbGljeS9ob29rLXBvbGljeS5qc29uIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjE0LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL2hvb2tzLTIwMjYtMTAtMjQuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo1MjYxLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL2hvb2tzLTIwMjYtMTAtMjQubWQiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NDEsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV4YW1wbGVzL2NsYXVkZS1jb2RlLnNldHRpbmdzLmpzb24iLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MzcsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNjcmlwdHMvZXZhbC1ob29rcy5tanMiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MTQzLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzcmMvY2hlY2sudHMiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MzM1LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzcmMvY2xpLnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjgyLCJkZWxldGlvbnMiOjB9XSwiY2hlY2tzIjpbeyJuYW1lIjoibm90aWZ5Iiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDc2NTE3MDMxL2pvYi8xMjA4MjA5MDM0NTQifSx7Im5hbWUiOiJwdWJsaXNoIiwic3RhdGUiOiJpbl9wcm9ncmVzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3NjUxNzAzMS9qb2IvMTIwODIwOTAzMjAxIn0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6ImluX3Byb2dyZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDc2NTE2OTIwL2pvYi8xMjA4MjA5MDIyOTEifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIwKSIsInN0YXRlIjoiaW5fcHJvZ3Jlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzY1MTY5MjAvam9iLzEyMDgyMDkwMjE1MCJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6ImluX3Byb2dyZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDc2NTE2OTIwL2pvYi8xMjA4MjA5MDIwOTQifSx7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjApIiwic3RhdGUiOiJpbl9wcm9ncmVzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3NjUxNjkyMC9qb2IvMTIwODIwOTAxOTU2In1dfSx7Im51bWJlciI6MTksInRpdGxlIjoiZmVhdDogY2h1bmtlZCByZXZpZXcgZm9yIGRpZmZzIHRvbyBsYXJnZSBmb3Igb25lIHJlcXVlc3QiLCJzdGF0ZSI6Ik9QRU4iLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzE5IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvbGFyZ2UtZGlmZi1yZXZpZXciLCJiYXNlIjoiZmVhdC9yZXBvLXBvbGljeS1wcm9maWxlcyIsInNoYSI6ImY0ZjNhOTI4MjkwZjJiMjBiZWMxZDJhMWZjYzUwODE1YzFiNmQxNDUiLCJtZXJnZV9jb21taXRfc2hhIjoiODFhOGQxM2RlZWY0MjU0M2UyNjcyMDRiZGRjYjAxYmU3NjBmNmJjYSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDc6NDM6NDRaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDc6NDM6NDRaIiwibWVyZ2VkX2F0IjoiIiwiY2xvc2VkX2F0IjoiIiwiYWRkaXRpb25zIjozODMxLCJkZWxldGlvbnMiOjc0LCJjaGFuZ2VkX2ZpbGVzIjoyNCwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgUFIgNSBvZiB0aGUgcm9hZG1hcC4gKipTdGFja2VkIG9uICMxOCoqIChiYXNlIGlzIHRoYXQgYnJhbmNoOyBHaXRIdWIgcmV0YXJnZXRzIGl0IGFzIHRoZSBzdGFjayBtZXJnZXMpLiBVbnRpbCBub3cgYSBkaWZmIHBhc3QgYWJvdXQgMzEuOGsgZXN0aW1hdGVkIHRva2VucyB3YXMgY3V0IG9mZiBhdCB0aGUgdGFpbCBhbmQgY291bGQgbmV2ZXIgYmUgYGF1dG9gLCBzbyBhIGxhcmdlIGNoYW5nZSB3YXMgdW5yZXZpZXdhYmxlIGFuZCBhIGRlZmVjdCBwYXN0IHRoZSBjdXQgd2FzIGludmlzaWJsZS4gYGpldl9yZXZpZXdgLCBgamV2X3Jpc2tgIGFuZCBgamV2X2dhdGVgIG5vdyByZXZpZXcgaXQgaW4gcGFydHMuIC0gKipTcGxpdCBhbG9uZyBmaWxlIGJvdW5kYXJpZXMuKiogQSBsb3NzbFx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbeyJzaGEiOiJmNGYzYTkyODI5MGYyYjIwYmVjMWQyYTFmY2M1MDgxNWMxYjZkMTQ1IiwibWVzc2FnZSI6ImZlYXQ6IGNodW5rZWQgcmV2aWV3IGZvciBkaWZmcyB0b28gbGFyZ2UgZm9yIG9uZSByZXF1ZXN0IiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvY29tbWl0L2Y0ZjNhOTI4MjkwZjJiMjBiZWMxZDJhMWZjYzUwODE1YzFiNmQxNDUifV0sImZpbGVzIjpbeyJmaWxlbmFtZSI6Ii5lbnYuZXhhbXBsZSIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoyLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NoYW5nZWxvZy5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo5LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NvbmZpZ3VyYXRpb24ubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9sYXJnZS1kaWZmLTIwMjYtMTAtMjQuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoxODc0LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL2xhcmdlLWRpZmYtMjAyNi0xMC0yNC5tZCIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo0OCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic2NyaXB0cy9ldmFsLWJvbnVzLm1qcyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo4LCJkZWxldGlvbnMiOjJ9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2xpYi9ib251cy1nZW5lcmF0b3IubWpzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjYsImRlbGV0aW9ucyI6MX0seyJmaWxlbmFtZSI6InNjcmlwdHMvbGliL2JvbnVzLWxhcmdlLm1qcyIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoxNTEsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNraWxscy9qZXYtbWNwL3JlZmVyZW5jZXMvdG9vbHMubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTIsImRlbGV0aW9ucyI6M30seyJmaWxlbmFtZSI6InNyYy9jb25maWcudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic3JjL2RpZmYtY2h1bmtzLnRzIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjI2MSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic3JjL2RpZmYudHMiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MTM1LCJkZWxldGlvbnMiOjB9XSwiY2hlY2tzIjpbeyJuYW1lIjoibm90aWZ5Iiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDc1MjgyMjcyL2pvYi8xMjA4MTcxODcyMTcifSx7Im5hbWUiOiJwdWJsaXNoIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDc1MjgyMjcyL2pvYi8xMjA4MTcxODcxNjAifSx7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjIpIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDc1MjgyMTk2L2pvYi8xMjA4MTcxODU5MTAifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3NTI4MjE5Ni9qb2IvMTIwODE3MTg1ODk3In0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzUyODIxOTYvam9iLzEyMDgxNzE4NTg1MiJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzUyODIxOTYvam9iLzEyMDgxNzE4NTcwMyJ9XX0seyJudW1iZXIiOjE4LCJ0aXRsZSI6IlJlcG9zaXRvcnkgcG9saWN5IGZpbGUsIHByb2ZpbGVzLCBhbmQgYSBkZWRpY2F0ZWQgdHJpYWdlIHJlY292ZXJhYmlsaXR5IGJhciIsInN0YXRlIjoiT1BFTiIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTgiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC9yZXBvLXBvbGljeS1wcm9maWxlcyIsImJhc2UiOiJmZWF0L2RlY2lzaW9uLWxlZGdlciIsInNoYSI6Ijk5YWUxNTYyOTlkNGJlOWNlM2E2NjMyNWQ4OGQ1OTBiOTAyN2RmODQiLCJtZXJnZV9jb21taXRfc2hhIjoiZDExM2YyOGE3ZmQ4NGM2ZGI0OWU1MzIxY2U0N2Y4YTRlNjhmYTZlYiIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDc6MDk6MjFaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDc6MDk6MjFaIiwibWVyZ2VkX2F0IjoiIiwiY2xvc2VkX2F0IjoiIiwiYWRkaXRpb25zIjoyNjEyNCwiZGVsZXRpb25zIjo0MywiY2hhbmdlZF9maWxlcyI6MjQsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFBSIDQgb2YgdGhlIHJvYWRtYXAuICoqU3RhY2tlZCBvbiAjMTcqKiAoYmFzZSBpcyB0aGF0IGJyYW5jaDsgR2l0SHViIHJldGFyZ2V0cyBpdCBhcyB0aGUgc3RhY2sgbWVyZ2VzKS4gQWRkcyB0aGUgZGV0ZXJtaW5pc3RpYyBsYXllciB0aGUgaG9va3MgYW5kIENJIHdpbGwgdXNlLCBhbmQgc2V0dGxlcyB0aGUgb3BlbiBcInRyaWFnZSBiYXJcIiBhbmQgXCJzdHJpY3QgcHJvZmlsZVwiIHF1ZXN0aW9ucyB3aXRoIG1lYXN1cmVtZW50cyBpbnN0ZWFkIG9mIGFyZ3VtZW50LiAtICoqYC5qZXYtcG9saWN5Lmpzb25gKiosIGV2YWx1YXRlZCBieSBgamV2X3Njb3BlYCBiZWZvcmUgYW55IEpldiByZXF1ZXN0OiAtIGBwcm90ZWN0ZWRfcGF0aHNgOiBnbG9icyB3aXRoIGEgYHJldmlld2Agb3IgYGRlXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOlt7InNoYSI6Ijk5YWUxNTYyOTlkNGJlOWNlM2E2NjMyNWQ4OGQ1OTBiOTAyN2RmODQiLCJtZXNzYWdlIjoiZmVhdDogcmVwb3NpdG9yeSBwb2xpY3kgZmlsZSBhbmQgY29uZmlkZW5jZSBwcm9maWxlcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2NvbW1pdC85OWFlMTU2Mjk5ZDRiZTljZTNhNjYzMjVkODhkNTkwYjkwMjdkZjg0In1dLCJmaWxlcyI6W3siZmlsZW5hbWUiOiIuZW52LmV4YW1wbGUiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jaGFuZ2Vsb2cubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTAsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImRvY3MvY29uZmlndXJhdGlvbi5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjozOCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvZml4dHVyZXMvcG9saWN5L2JlbmNoLXBvbGljeS5qc29uIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjYsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvUkVBRE1FLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjIsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvcG9saWN5LTIwMjYtMTAtMjQuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoyMDg2LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL3BvbGljeS0yMDI2LTEwLTI0Lm1kIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjMzLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL3Byb2ZpbGVzLTIwMjYtMTAtMjQuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoyMjgwNywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9wcm9maWxlcy0yMDI2LTEwLTI0Lm1kIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjU1LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJleGFtcGxlcy9qZXYtcG9saWN5Lmpzb24iLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6MTcsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNjcmlwdHMvZXZhbC1ib251cy5tanMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTEsImRlbGV0aW9ucyI6M30seyJmaWxlbmFtZSI6InNjcmlwdHMvcnVuLXRlc3RzLm1qcyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoyLCJkZWxldGlvbnMiOjF9XSwiY2hlY2tzIjpbeyJuYW1lIjoicHVibGlzaCIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MzAyMTEwNC9qb2IvMTIwODEwMzU4MTIxIn0seyJuYW1lIjoibm90aWZ5Iiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDczMDIxMTA0L2pvYi8xMjA4MTAzNTgwMTQifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MzAyMTA5NS9qb2IvMTIwODEwMzU3MzY3In0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MzAyMTA5NS9qb2IvMTIwODEwMzU3MzY2In0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MzAyMTA5NS9qb2IvMTIwODEwMzU3MzQzIn0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzMwMjEwOTUvam9iLzEyMDgxMDM1NzA1NiJ9XX0seyJudW1iZXIiOjE3LCJ0aXRsZSI6IkRlY2lzaW9uIGxlZGdlcjogZGVjaXNpb25faWQgb24gZXZlcnkgcmVzdWx0IGFuZCBqZXZfZmVlZGJhY2siLCJzdGF0ZSI6Ik9QRU4iLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzE3IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvZGVjaXNpb24tbGVkZ2VyIiwiYmFzZSI6ImZlYXQvY29tbWFuZC1lZmZlY3QtY2xhc3NpZmllciIsInNoYSI6IjUwNmY3MzgwMGU2YjQ0OTU3ZjYwZTZlMGM1MmQ1MzAwZDhkMjJkMzciLCJtZXJnZV9jb21taXRfc2hhIjoiODQxMzA5NGNlMzhjYTMyNjdiNzU1ZjViNTA4ZTJkOTUyZDk4ZmQzNSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDY6NDk6MDdaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDY6NDk6MDdaIiwibWVyZ2VkX2F0IjoiIiwiY2xvc2VkX2F0IjoiIiwiYWRkaXRpb25zIjo3NzU5LCJkZWxldGlvbnMiOjEzLCJjaGFuZ2VkX2ZpbGVzIjozMiwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgUFIgMyBvZiB0aGUgcm9hZG1hcC4gKipTdGFja2VkIG9uICMxNioqIChiYXNlIGlzIHRoYXQgYnJhbmNoOyBHaXRIdWIgcmV0YXJnZXRzIGl0IGFzIHRoZSBzdGFjayBtZXJnZXMpLiBOb3RoaW5nIHJlY29yZHMgSmV2J3MgZGVjaXNpb25zIG9yIHdoZXRoZXIgdGhleSB3ZXJlIHJpZ2h0LCBzbyByZWFsLWxpZmUgZmFsc2UtYWxhcm0gcmF0ZXMgYXJlIHVua25vd24gYW5kIGV2ZXJ5IHRocmVzaG9sZCBxdWVzdGlvbiAoc3VjaCBhcyB0aGUgdHJpYWdlIGJhcikgY2FuIG9ubHkgYmUgYXJndWVkIGZyb20gc3ludGhldGljIGJlbmNobWFya3MuIFRoaXMgYWRkcyB0aGUgbWVhc3VyZW1lbnQgbGF5ZXIgdGhlIGxhdGVyIFBScyAoaG9va3MsIENJKSB3aWxsIGxvZyBpbnRvLiAtICoqYGRlY1x1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbeyJzaGEiOiI1MDZmNzM4MDBlNmI0NDk1N2Y2MGU2ZTBjNTJkNTMwMGQ4ZDIyZDM3IiwibWVzc2FnZSI6ImZlYXQ6IGRlY2lzaW9uIGxlZGdlciwgZGVjaXNpb25faWQgb24gZXZlcnkgcmVzdWx0LCBhbmQgamV2X2ZlZWRiYWNrIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvY29tbWl0LzUwNmY3MzgwMGU2YjQ0OTU3ZjYwZTZlMGM1MmQ1MzAwZDhkMjJkMzcifV0sImZpbGVzIjpbeyJmaWxlbmFtZSI6Ii5lbnYuZXhhbXBsZSIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjozLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJBR0VOVFMubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jaGFuZ2Vsb2cubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6OCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jb25maWd1cmF0aW9uLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEwLCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJkb2NzL3Rvb2xzLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjMsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL2ZpeHR1cmVzL2xlZGdlci9SRUFETUUubWQiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvZml4dHVyZXMvbGVkZ2VyL2xlZGdlci0yMDI2LTEwLmpzb25sIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjMwNiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9SRUFETUUubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9sZWRnZXItMjAyNi0xMC0yNC5qc29uIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjY2MDksImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvbGVkZ2VyLTIwMjYtMTAtMjQubWQiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NDUsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNjcmlwdHMvYmVuY2htYXJrLm1qcyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxLCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2V2YWwtYm9udXMubWpzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjE5LCJkZWxldGlvbnMiOjF9XSwiY2hlY2tzIjpbeyJuYW1lIjoibm90aWZ5Iiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDcxNzAxMjMyL2pvYi8xMjA4MDYzMzkwMTIifSx7Im5hbWUiOiJwdWJsaXNoIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDcxNzAxMjMyL2pvYi8xMjA4MDYzMzg4NDcifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MTcwMDkyMS9qb2IvMTIwODA2MzM3MTA1In0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MTcwMDkyMS9qb2IvMTIwODA2MzM3MDg4In0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MTcwMDkyMS9qb2IvMTIwODA2MzM3MDg3In0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzE3MDA5MjEvam9iLzEyMDgwNjMzNjg5MSJ9XX0seyJudW1iZXIiOjE2LCJ0aXRsZSI6IkNvbW1hbmQgZWZmZWN0IGNsYXNzaWZpZXI6IHRoZSBjb21tYW5kIHRleHQgY2FuIHJhaXNlIGEgZGVjbGFyZWQgZWZmZWN0Iiwic3RhdGUiOiJPUEVOIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xNiIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L2NvbW1hbmQtZWZmZWN0LWNsYXNzaWZpZXIiLCJiYXNlIjoiZmVhdC9oYXJkZW5pbmctbG9vcC1idWRnZXQtZ2F0ZSIsInNoYSI6IjAwZGE3NGU5NjdmZTg4YzdjOGVkYTJiNDMzY2RiMTVmYmRlYmFmNDciLCJtZXJnZV9jb21taXRfc2hhIjoiNjUwMzk4OWU2NTI2OWU2Njg0N2VhMzVmMDJmMzBlZjE3MmNhZGNiMyIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDY6Mzg6MjNaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDY6Mzg6MjNaIiwibWVyZ2VkX2F0IjoiIiwiY2xvc2VkX2F0IjoiIiwiYWRkaXRpb25zIjo4MTcwLCJkZWxldGlvbnMiOjksImNoYW5nZWRfZmlsZXMiOjE2LCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBQUiAyIG9mIHRoZSByb2FkbWFwLiAqKlN0YWNrZWQgb24gIzE1KiogKGJhc2UgaXMgdGhhdCBicmFuY2g7IEdpdEh1YiB3aWxsIHJldGFyZ2V0IHRoaXMgdG8gYG1haW5gIG9uY2UgIzE1IG1lcmdlcykuIGBqZXZfc2NvcGVgIHRydXN0ZWQgdGhlIGhvc3QtZGVjbGFyZWQgYGVmZmVjdGA6IGByZWFkX29ubHlgICsgYHJtIC1yZiBidWlsZCAmJiBnaXQgcHVzaCAtLWZvcmNlYCByZXR1cm5lZCBgYXV0b2Agd2hlbmV2ZXIgdGhlIGp1ZGdlJ3MgYW5zd2VycyB3ZXJlIGNsZWFuLiBUaGlzIGFkZHMgYSBkZXRlcm1pbmlzdGljIGNsYXNzaWZpZXIgc28gdGhlIGNvbW1hbmQgdGV4dCBjYW4gcmFpc2UgdGhlIGVmZmVjdCwgYW5kIG5ldmVyIGxvd2VyIGl0LiAtICoqYHNyYy9lZmZlY3RzLnRzXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOlt7InNoYSI6IjAwZGE3NGU5NjdmZTg4YzdjOGVkYTJiNDMzY2RiMTVmYmRlYmFmNDciLCJtZXNzYWdlIjoiZmVhdDogZGV0ZXJtaW5pc3RpYyBjb21tYW5kIGVmZmVjdCBjbGFzc2lmaWVyIGZvciBzY29wZSwgcm91dGUgYW5kIHN0ZXAiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9jb21taXQvMDBkYTc0ZTk2N2ZlODhjN2M4ZWRhMmI0MzNjZGIxNWZiZGViYWY0NyJ9XSwiZmlsZXMiOlt7ImZpbGVuYW1lIjoiZG9jcy9jaGFuZ2Vsb2cubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9SRUFETUUubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9jbGFzc2lmaWVyLTIwMjYtMTAtMjQuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo2NzE4LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL2NsYXNzaWZpZXItMjAyNi0xMC0yNC5tZCIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo0MiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic2NyaXB0cy9ldmFsLWJvbnVzLm1qcyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjozLCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2xpYi9ib251cy1nZW5lcmF0b3IubWpzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjY3LCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2xpYi9ib251cy5tanMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTEsImRlbGV0aW9ucyI6MX0seyJmaWxlbmFtZSI6InNraWxscy9qZXYtbWNwL3JlZmVyZW5jZXMvdG9vbHMubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MywiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic3JjL2VmZmVjdHMudHMiLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6ODk5LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzcmMvdG9vbHMvb3V0cHV0LXNjaGVtYXMudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTksImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNyYy90b29scy9zY29wZS50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo4LCJkZWxldGlvbnMiOjJ9LHsiZmlsZW5hbWUiOiJzcmMvdG9vbHMvc3RlcC50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo2LCJkZWxldGlvbnMiOjF9XSwiY2hlY2tzIjpbeyJuYW1lIjoicHVibGlzaCIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MDk5NzQ4Mi9qb2IvMTIwODA0MTk0MjkyIn0seyJuYW1lIjoibm90aWZ5Iiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDcwOTk3NDgyL2pvYi8xMjA4MDQxOTQxODMifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MDk5NzQyMC9qb2IvMTIwODA0MTkzNTMxIn0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA3MDk5NzQyMC9qb2IvMTIwODA0MTkzNTEyIn0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzA5OTc0MjAvam9iLzEyMDgwNDE5MzUwOCJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNzA5OTc0MjAvam9iLzEyMDgwNDE5MzQyOSJ9XX0seyJudW1iZXIiOjE1LCJ0aXRsZSI6IkhhcmRlbmluZzogbG9vcCBkZXRlY3RvciBwcm9ncmVzcywgcmVzZXJ2ZWQgdG9rZW4gYnVkZ2V0LCBnYXRlIG9yZGVyLCB0cmlhZ2UgcHJvZ3Jlc3Mgd29yZGluZyIsInN0YXRlIjoiT1BFTiIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTUiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC9oYXJkZW5pbmctbG9vcC1idWRnZXQtZ2F0ZSIsImJhc2UiOiJtYWluIiwic2hhIjoiYTlmNGRkYWFlMjAxNzU0ZTIzN2RmYjZjMmIzYWYzZmU2MzZkMTg0MSIsIm1lcmdlX2NvbW1pdF9zaGEiOiI5ZDExMzE0M2U2MGM3MGUxMzgxMTJiZmZhM2YwNDM1MmYyYWQxMjZiIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yNFQwNjoyMjozNFoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yNFQwNjoyMjozNFoiLCJtZXJnZWRfYXQiOiIiLCJjbG9zZWRfYXQiOiIiLCJhZGRpdGlvbnMiOjg1NDMsImRlbGV0aW9ucyI6NDksImNoYW5nZWRfZmlsZXMiOjIyLCJjb21taXRzX2NvdW50IjoyLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBQUiAxIG9mIGEgOS1zdGFnZSByb2FkbWFwIChyZXZpZXdlZCBjb2RlIGZyb20gIzEyXHUyMDEzIzE0LCB0aGVuIHBsYW5uZWQgZml4ZXMgYW5kIGVuaGFuY2VtZW50cykuIEhhcmRlbmluZyBvbmx5OiBpdCBmaXhlcyBkZWZlY3RzIGZvdW5kIGJ5IHJlYWRpbmcgYW5kIHJ1bm5pbmcgdGhlIG1lcmdlZCBjb2RlLCBhbmQgb25lIG1vZGVsIG1pc2p1ZGdtZW50IGZvdW5kIGJ5IHRoZSBsaXZlIGJlbmNobWFyay4gLSAqKkxvb3AgZGV0ZWN0b3Igbm8gbG9uZ2VyIGZsYWdzIHByb2dyZXNzLioqIEZhaWx1cmUgY291bnRzIHRoYXQgc3RyaWN0bHkgc2hyaW5rIGFjcm9zcyBhdHRlbXB0cyAoOSBcdTIxOTIgNSBcdTIxOTIgMiBmYWlsZWQpIHdlcmUgcmVwb3J0ZWQgYXMgYHNhbWVfZmFpbHVyZWAgYmVjYXVzZSBldmVyXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOlt7InNoYSI6IjA2NjgxNTM4MzgwOGJjNTFlZmY2MjMzMzE4NDM4M2JjYTY2MGY3MzIiLCJtZXNzYWdlIjoiZml4OiBsb29wIGRldGVjdG9yIHByb2dyZXNzLCByZXNlcnZlZCB0b2tlbiBidWRnZXQsIGdhdGUgb3JkZXIsIHRyaWFnZSBwcm9ncmVzcyB3b3JkaW5nIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvY29tbWl0LzA2NjgxNTM4MzgwOGJjNTFlZmY2MjMzMzE4NDM4M2JjYTY2MGY3MzIifSx7InNoYSI6ImE5ZjRkZGFhZTIwMTc1NGUyMzdkZmI2YzJiM2FmM2ZlNjM2ZDE4NDEiLCJtZXNzYWdlIjoidGVzdDogd3JpdGUgaW52aXNpYmxlIGNoYXJhY3RlcnMgYXMgZXNjYXBlcyBpbiB0aGUgYmVuY2htYXJrIHNvdXJjZXMiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9jb21taXQvYTlmNGRkYWFlMjAxNzU0ZTIzN2RmYjZjMmIzYWYzZmU2MzZkMTg0MSJ9XSwiZmlsZXMiOlt7ImZpbGVuYW1lIjoiZG9jcy9jaGFuZ2Vsb2cubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6OSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jb25maWd1cmF0aW9uLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjIsImRlbGV0aW9ucyI6Mn0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvUkVBRE1FLm1kIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6ImV2YWxzL3Jlc3VsdHMvaGFyZGVuaW5nLTIwMjYtMTAtMjQuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo3ODg4LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL2hhcmRlbmluZy0yMDI2LTEwLTI0Lm1kIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjQwLCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2V2YWwtYm9udXMubWpzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEwLCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2xpYi9ib251cy1nZW5lcmF0b3IubWpzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjczLCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2xpYi9ib251cy5tanMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MjMsImRlbGV0aW9ucyI6OX0seyJmaWxlbmFtZSI6InNraWxscy9qZXYtbWNwL3JlZmVyZW5jZXMvdG9vbHMubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MSwiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoic3JjL2Vycm9ycy50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxMiwiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoic3JjL3BhY2tzL3RyaWFnZS50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo0LCJkZWxldGlvbnMiOjR9LHsiZmlsZW5hbWUiOiJzcmMvcmVzcG9uc2VzLnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEwLCJkZWxldGlvbnMiOjd9XSwiY2hlY2tzIjpbeyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNjk5NjAwODMvam9iLzEyMDgwMTA2MTUxMiJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNjk5NjAwODMvam9iLzEyMDgwMTA2MTQ1MCJ9LHsibmFtZSI6ImNoZWNrICh1YnVudHUtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNjk5NjAwODMvam9iLzEyMDgwMTA2MTQyMCJ9LHsibmFtZSI6ImNoZWNrICh3aW5kb3dzLWxhdGVzdCwgMjIpIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDY5OTYwMDgzL2pvYi8xMjA4MDEwNjEzMTYifSx7Im5hbWUiOiJub3RpZnkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNjk5NTk0MDcvam9iLzEyMDgwMTA2MDIxMyJ9LHsibmFtZSI6InB1Ymxpc2giLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwNjk5NTk0MDcvam9iLzEyMDgwMTA2MDE1OSJ9XX0seyJudW1iZXIiOjE0LCJ0aXRsZSI6IkxpdmUgSmV2IHZhbHVlIGJlbmNobWFyayB3aXRoIHJhbmRvbWl6ZWQgY2FzZXMsIHBsdXMgdGhlIGZpeGVzIGFuZCBjYWxpYnJhdGlvbiBpdCBmb3VuZCIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xNCIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L2pldi12YWx1ZS1iZW5jaG1hcmsiLCJiYXNlIjoibWFpbiIsInNoYSI6IjRlYTFiODE2ZTFkMDI5NmUzZWY5MzQzYjE4ZTBiOGM3MTliZWMzMTEiLCJtZXJnZV9jb21taXRfc2hhIjoiN2QyNzM3YmMyMjNjNjc0NmVhMmJjZDhiOWM2YjI4ZGUyNTY5MmMwNiIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjNUMTk6NDU6NTlaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjNUMTk6NDg6NTJaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0yM1QxOTo0ODo1MVoiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTIzVDE5OjQ4OjUxWiIsImFkZGl0aW9ucyI6MjY2OTYsImRlbGV0aW9ucyI6MzAsImNoYW5nZWRfZmlsZXMiOjI5LCJjb21taXRzX2NvdW50IjozLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBUaGlzIFBSIG1lYXN1cmVzIHdoYXQgbGl2ZSBKZXYgYWRkcyBvdmVyIGNoZWFwIGxvY2FsIHJ1bGVzLCBmaXhlcyB0aGUgamV2LW1jcCBkZWZlY3RzIHRoYXQgbWVhc3VyZW1lbnQgZXhwb3NlZCwgYW5kIHJlY2FsaWJyYXRlcyB0aHJlZSBcImxvd2VyIGlzIGJldHRlclwiIHNjb3JlcyBiYXNlZCBvbiB0aGUgZGF0YS4gLSAqKkJlbmNobWFyazoqKiBgbnBtIHJ1biBldmFsOmJvbnVzYC4gTGFiZWxsZWQgcmlza3kvc2FmZSBjYXNlcyBhcmUgZGVjaWRlZCB0aHJlZSB3YXlzOiBieSAqKm5vIGd1YXJkKiosIGJ5IGEgKipydWxlcy1vbmx5IGd1YXJkKiogd2l0aCBubyBtb2RlbCBjYWxsLCBhbmQgYnkgKipsaXZlIEpldioqLiBUaGUgNTEgaGFuZC13cml0dGVuIGNhc2VzIGFyZSBqb2luZWRcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjEzLCJ0aXRsZSI6Ikd1YXJkcmFpbCBoYXJkZW5pbmc6IHBvbGljeSBmaXhlcywgY2FjaGUvYnVkZ2V0L3N0YXRzLCByaXNrLWF3YXJlIGdhdGUsIGxvb3AgZGV0ZWN0b3IiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTMiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC92MC4zLWd1YXJkcmFpbC1oYXJkZW5pbmciLCJiYXNlIjoibWFpbiIsInNoYSI6IjFhNTg1MDAxMmIwODI3NjE5OWYwZjEzYjg0OGEyMjc4NzI2ZGQ5M2QiLCJtZXJnZV9jb21taXRfc2hhIjoiOTdlMWNkMTZmNWFkNjI2Y2ZkNGVkZTc3NjJiNTEzODk3YzQ0NGMzOSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjNUMTg6NDI6MjJaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjNUMTg6NTg6MzBaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0yM1QxODo1ODozMFoiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTIzVDE4OjU4OjMwWiIsImFkZGl0aW9ucyI6MjIzNywiZGVsZXRpb25zIjozNDYsImNoYW5nZWRfZmlsZXMiOjM0LCJjb21taXRzX2NvdW50IjozLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiRm9sbG93cyAjMTIgKHYwLjIgc2NvcGUvdHJpYWdlL3Jpc2sgdG9vbHMpLiBUaGUgcG9saWN5IGZpeGVzIGZvciBkZWZlY3RzIHRoYXQgIzEyIGl0c2VsZiBpbnRyb2R1Y2VkIHdlcmUgbW92ZWQgb250byAjMTIgYmVmb3JlIGl0IG1lcmdlZDogdGhlIHJpc2stZmxhZyBtYXNraW5nLCB0aGUgZXNjYWxhdGlvbiBjdXRvZmYgZm9yIHNjb3BlIGFuZCByaXNrLCB0cmlhZ2UgZXNjYWxhdGlvbiBvcmRlciwgdGhlIGluamVjdGlvbi1iYWNrc3RvcCByZWdyZXNzaW9uIGFuZCB0cmlhZ2UgY2F1c2UtSUQgc2FuaXRpemF0aW9uLiBUaGlzIGJyYW5jaCBhbHJlYWR5IGluY2x1ZGVzIHRoYXQgd29yayB0aHJvdWdoIGEgbWVyZ2UgY29tbWl0LiBXaGF0IHJlbWFpbnMgaGVyZSBpcyB0aGUgaGFyZGVuaW5nIG9mIHByXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoxMiwidGl0bGUiOiJmZWF0OiBhZGQgc2NvcGUsIHRyaWFnZSwgYW5kIHNlY3VyaXR5IHJpc2sgdG9vbHMiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTIiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC92MC4yLWFnZW50LWd1YXJkcmFpbHMiLCJiYXNlIjoibWFpbiIsInNoYSI6ImIwZWFjYjA0M2Q5N2M5YmQzNDE0MGM4MDdlOWU4OGZlYzYxOTQzMGEiLCJtZXJnZV9jb21taXRfc2hhIjoiOGJjYjkyYWQ2Yjg3Yjc3NTlhNmFiOTdjNDg0Zjg3NGRjZDE2ZDM4NSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMTdUMTM6MDQ6MDFaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjNUMTg6NTA6MjVaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0yM1QxODo1MDoyNFoiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTIzVDE4OjUwOjI0WiIsImFkZGl0aW9ucyI6MTU2MiwiZGVsZXRpb25zIjozOCwiY2hhbmdlZF9maWxlcyI6MzMsImNvbW1pdHNfY291bnQiOjIsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFRoaXMgUFIgZXh0ZW5kcyBgamV2LW1jcGAgZnJvbSB0aGUgY29yZSBjb2RpbmcgbG9vcCBpbnRvIHRocmVlIGFkamFjZW50IGRlY2lzaW9uIGJvdW5kYXJpZXM6IDEuICoqYGpldl9zY29wZWAqKiAtIHNlbWFudGljIHByZWZsaWdodCBmb3IgYSBob3N0LXByZXBhcmVkIGFjdGlvbi4gMi4gKipgamV2X3RyaWFnZWAqKiAtIGZhaWx1cmUgY2F1c2UsIGxvb3AgcHJvZ3Jlc3MsIGFuZCByZWNvdmVyeSBzdHJhdGVneS4gMy4gKipgamV2X3Jpc2tgKiogLSBzZWN1cml0eS1mb2N1c2VkIHBhdGNoIHJpc2sgdHJpYWdlLiBUaGUgZXhpc3RpbmcgbmluZSB0b29scyBhbmQgdGhlaXIgcG9saWNpZXMgYXJlIHVuY2hhbmdlZC4gVGhlIHNlcnZlciBub3cgZXhwb3NlcyAqKjEyIHRvb2xzLCAxMVx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MTEsInRpdGxlIjoic2VjdXJpdHk6IGhhcmRlbiB1bnRydXN0ZWQtZGF0YSBoYW5kbGluZyBhbmQgaGVscGVyIGJvdW5kYXJpZXMiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTEiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoic2VjdXJpdHkvaGFyZGVuLXVudHJ1c3RlZC1kYXRhIiwiYmFzZSI6Im1haW4iLCJzaGEiOiJlMGZmNmUzODEyMWNjODE3YjQxOWRiYTE0Y2UwZWNmYzcxNzYxMmY1IiwibWVyZ2VfY29tbWl0X3NoYSI6IjZlY2NiNTIzNDgyM2E5ZjU4ZDlhN2NhYjk1YmY3MWIwNGRmMDBjOTEiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTE3VDEyOjE0OjM0WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTE3VDEyOjM2OjE1WiIsIm1lcmdlZF9hdCI6IjIwMjYtMTAtMTdUMTI6MzY6MTVaIiwiY2xvc2VkX2F0IjoiMjAyNi0xMC0xN1QxMjozNjoxNVoiLCJhZGRpdGlvbnMiOjExMDEsImRlbGV0aW9ucyI6MTg4LCJjaGFuZ2VkX2ZpbGVzIjo2NCwiY29tbWl0c19jb3VudCI6MiwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgVGhpcyBQUiBoYXJkZW5zIHRoZSBib3VuZGFyaWVzIHdoZXJlIGBqZXYtbWNwYCBoYW5kbGVzIHRoaXJkLXBhcnR5IHRleHQsIGhvc3QtcHJlcGFyZWQgdG9vbCBtZXRhZGF0YSwgcHJvdmlkZXIgY3JlZGVudGlhbHMsIGFuZCBhZ2VudCBldmFsdWF0aW9uIGNvZGUuIEl0IGFsc28gZml4ZXMgc2V2ZXJhbCBjb3JyZWN0bmVzcyBkZWZlY3RzIGZvdW5kIGR1cmluZyB0aGUgYXVkaXQuIFRoZSBjaGVja291dCBhbHJlYWR5IGNvbnRhaW5lZCBhIHBlbmRpbmcgcmVtZWRpYXRpb24gYmF0Y2g7IHRoaXMgYnJhbmNoIGJ1aWxkcyBvbiBpdCBhbmQgdHVybnMgdGhlIHdob2xlIHNldCBpbnRvIG9uZSByZXZpZXdlZCBjaGFuZ2UuIE5vIGxpdmUgcHJvdmlkZXIgY2FsbHMgb3IgcHVibGlzaGluZ1x1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MTAsInRpdGxlIjoiUGFja2FnZSBwb3J0YWJsZSBKZXYgc2tpbGwgYW5kIGFkZCByZWFsLWFnZW50IGV2YWx1YXRpb25zIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzEwIiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImNvZGV4L3BvcnRhYmxlLXNraWxsLWV2YWxzIiwiYmFzZSI6Im1haW4iLCJzaGEiOiJmZDM0NzAxZTE1NWI2YzIzMGNiYWNlNDExZGY2MjM4ODA0MDViMTMxIiwibWVyZ2VfY29tbWl0X3NoYSI6IjU3MWY0NjQ1NjVhMTMxOWFiZTUyY2I5NTEyMGIzNzE3NGVlNTNhYmEiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTE1VDE2OjQ0OjQ2WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTE1VDE2OjUxOjIyWiIsIm1lcmdlZF9hdCI6IjIwMjYtMTAtMTVUMTY6NTE6MjJaIiwiY2xvc2VkX2F0IjoiMjAyNi0xMC0xNVQxNjo1MToyMloiLCJhZGRpdGlvbnMiOjU3NjUsImRlbGV0aW9ucyI6MzY4LCJjaGFuZ2VkX2ZpbGVzIjo1MCwiY29tbWl0c19jb3VudCI6MiwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFByb2JsZW0gYW5kIGJlaGF2aW9yIFRoZSBKZXYgY29tcGFuaW9uIHNraWxsIGRlcGVuZGVkIG9uIHJlcG9zaXRvcnkgZG9jdW1lbnRhdGlvbiBhbmQgaGFkIG5vIHJlcHJvZHVjaWJsZSBzdGFuZGFsb25lIHBhY2thZ2Ugb3IgcmVhbC1hZ2VudCBldmFsdWF0aW9uIHBhdGguIFRoaXMgY2hhbmdlIG1ha2VzIHRoZSBjb21wbGV0ZSBza2lsbCBpbmRlcGVuZGVudGx5IGluc3RhbGxhYmxlIGF0IGAuYWdlbnRzL3NraWxscy9qZXYtbWNwYCBhbmQgYWRkcyBib3VuZGVkIGV2YWx1YXRpb25zIG9mIHRoZSBjb21iaW5lZCBza2lsbCArIGxpdmUgTUNQIHdvcmtmbG93IGluIENvZGV4IGFuZCB0aGUgb2ZmaWNpYWwgQ3Vyc29yIENMSS4gIyMgQ2hhbmdlcyAtIE1vdmUgY2Fub25pY2FsIGNvbnRyYWN0cyBpblx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6OCwidGl0bGUiOiJQaW4gdGhlIG5ld2VzdCBwdWxsIHJlcXVlc3Qgb24gdGhlIHdhdGNoIGJvYXJkIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzgiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiY3Vyc29yL2ludGVyYWN0aXZlLXByLXdhdGNoLTUxOGUiLCJiYXNlIjoibWFpbiIsInNoYSI6IjQ4MzM2MzQ2Y2QzZmI1ZWI5NjU1NjEyNjVlMGJmM2QwNTllYzVmMGYiLCJtZXJnZV9jb21taXRfc2hhIjoiOTQ0OGY2MTIwMDE1ZjJmNmM2ZGFkNzEzN2M3ZjIzNDU0NTIwOTkxOCIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMDktMjFUMTc6NTk6MDZaIiwidXBkYXRlZF9hdCI6IjIwMjYtMDktMjFUMTc6NTk6MTJaIiwibWVyZ2VkX2F0IjoiMjAyNi0wOS0yMVQxNzo1OToxMloiLCJjbG9zZWRfYXQiOiIyMDI2LTA5LTIxVDE3OjU5OjEyWiIsImFkZGl0aW9ucyI6MTExOCwiZGVsZXRpb25zIjoxMzMsImNoYW5nZWRfZmlsZXMiOjYsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IC0gVGhlIEdpdEh1YiB3YXRjaCBib2FyZCBhbHdheXMgbGVhZHMgd2l0aCB0aGUgaGlnaGVzdC1udW1iZXJlZCBwdWxsIHJlcXVlc3QsIHNvIHRoZSBsYXRlc3Qgb25lIHN0YXlzIHZpc2libGUuIC0gRWFjaCBwdWxsIHJlcXVlc3Qgc2hvd3MgYXV0aG9yLCBicmFuY2hlcywgZGlmZiBzaXplLCBjaGVja3MsIHJldmlld3MsIGNvbW1pdHMsIGFuZCBmaWxlcy4gLSBBIGZhaWxlZCBHaXRIdWIgcmVhZCBrZWVwcyB0aGUgbGFzdCBzYXZlZCBsaXN0IGFuZCBzYXlzIHRoZSBsaXZlIGxpc3QgaXMgdW5hdmFpbGFibGUsIGluc3RlYWQgb2YgYmxhbmtpbmcgdGhlIHBhZ2Ugb3IgcHJldGVuZGluZyB0aGUgbGlzdCBpcyBlbXB0eS4gLSBgZG9jcy9naXRodWItd2F0Y2guaHRtbGAgYWRkcyBzZWFcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjcsInRpdGxlIjoiRml4IGpldi1tY3AgYXVkaXQgZmluZGluZ3MiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvNyIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJjdXJzb3IvamV2LWF1ZGl0LWZpeGVzLW9wcyIsImJhc2UiOiJtYWluIiwic2hhIjoiYjkyZjlhMDFmMjQxODAyODEyMzkxNjZjNTU1NDg0OTA1MWM4YWU3MSIsIm1lcmdlX2NvbW1pdF9zaGEiOiI3Y2FmYzQwMmNiZDc3NmNhZTU1OTAyNDE1ZDg0NDgyOTcxZGYxN2Q0IiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0wOS0yMVQxNzozNzoyNVoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0wOS0yMVQxNzozNzozMVoiLCJtZXJnZWRfYXQiOiIyMDI2LTA5LTIxVDE3OjM3OjMxWiIsImNsb3NlZF9hdCI6IjIwMjYtMDktMjFUMTc6Mzc6MzFaIiwiYWRkaXRpb25zIjo5NjksImRlbGV0aW9ucyI6MTUxLCJjaGFuZ2VkX2ZpbGVzIjozNSwiY29tbWl0c19jb3VudCI6NCwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgLSBHaXRIdWIgbm90aWZ5IG5vIGxvbmdlciBydW5zIHB1bGwtcmVxdWVzdCBoZWFkIGNvZGUsIGFuZCBpdCBwaW5zIHRoZSBBUEkgaG9zdC4gLSBgamV2X3N0ZXBgIGlnbm9yZXMgdGhlIGhvc3QgYHByZXBhcmVkX3Rvb2xfY2FsbGAgZmxhZywgYW5kIGVtcHR5IGNhbmRpZGF0ZSBsaXN0cyBhcmUgbm90IHRyZWF0ZWQgYXMgYXV0by4gLSBSZXZpZXcgYW5kIGdhdGUgcmVxdWlyZSBwZXItZGltZW5zaW9uIGZsb29ycy4gLSBSYW5rIGF1dG8gbmVlZHMgYSBmaW5hbC1yb3VuZCBleGlzdHMgcmVzdWx0IHBsdXMgYSBjb2hlcmVudCBiZXN0LiAtIFR5cGVTYWZlIHRpbWVvdXQgYW5kIGJhc2UgVVJMIGFyZSBib3VuZGVkLiAtIFBlci1jYWxsIGZsb29ycyBjYW4gb25seSB0aWdodGVuLiAtXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjo2LCJ0aXRsZSI6InRlc3Q6IGFkZCBNQ1AgcGVyZm9ybWFuY2UgYmVuY2htYXJrIHN1aXRlIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzYiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiY29kZXgvcHIyLXJvdXRpbmctZm9sbG93dXAiLCJiYXNlIjoibWFpbiIsInNoYSI6IjI2MTQ0YWI1MDM2MGY1NTA1MTQxNDFiNzMzZmNiYWRmMGFiNDdhMjYiLCJtZXJnZV9jb21taXRfc2hhIjoiNGY0YWUxMWE1ZTFlOWE1MDJjZGM0MzI1NTBkODc4ZjcyODg1MTgyMCIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMDktMTlUMTA6MzI6MzZaIiwidXBkYXRlZF9hdCI6IjIwMjYtMDktMTlUMTE6MjI6NDZaIiwibWVyZ2VkX2F0IjoiMjAyNi0wOS0xOVQxMToyMjo0NFoiLCJjbG9zZWRfYXQiOiIyMDI2LTA5LTE5VDExOjIyOjQ0WiIsImFkZGl0aW9ucyI6Mjk2LCJkZWxldGlvbnMiOjEsImNoYW5nZWRfZmlsZXMiOjcsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IC0gQWRkIGFuIG9wdC1pbiBiZW5jaG1hcmsgZm9yIHRoZSBjb21waWxlZCBNQ1Agc3RkaW8gdHJhbnNwb3J0LiAtIE1lYXN1cmUgYWxsIG5pbmUgdG9vbHMgd2l0aCBzZXF1ZW50aWFsLCBjb25jdXJyZW50LCBzdGFydHVwLCBsYXRlbmN5LCB0aHJvdWdocHV0LCBwYXlsb2FkLXNpemUsIGFuZCBjYW5kaWRhdGUtY291bnQgc2NlbmFyaW9zLiAtIEFkZCBkZXRlcm1pbmlzdGljIG1vY2stbW9kZSBDSSBzYW5pdHkgYnVkZ2V0cyBhbmQgSlNPTiBvdXRwdXQgZm9yIGF1dG9tYXRpb24uIC0gQWRkIGJlbmNobWFyayBoZWxwZXIgdGVzdHMsIGRvY3VtZW50YXRpb24sIGFuZCBhIHNjaGVkdWxlZC9tYW51YWwgR2l0SHViIEFjdGlvbnMgd29ya2Zsb3cgYWNyb3NzIFVidW50dS9XaW5kb3dzIGFcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjUsInRpdGxlIjoiSGFyZGVuIHJvdXRpbmcgYW5kIGV4cG9zZSB0eXBlZCBNQ1Agb3V0cHV0cyIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC81IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImNvZGV4L3ByMi1yb3V0aW5nLWZvbGxvd3VwIiwiYmFzZSI6Im1haW4iLCJzaGEiOiIxYmU2ZTc1MjlmZDlkZGZhYjE1Yzk4MjRmYjc4YjIxYzg3MWQ3NTJkIiwibWVyZ2VfY29tbWl0X3NoYSI6IjVkNWZiNmIzYjE0OTkwZDQ3MjE5YmRiODcwMDE3MmIzNDEwZTQ1OGEiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTA5LTE5VDA4OjU4OjIxWiIsInVwZGF0ZWRfYXQiOiIyMDI2LTA5LTE5VDA5OjEzOjM2WiIsIm1lcmdlZF9hdCI6IjIwMjYtMDktMTlUMDk6MTI6MzBaIiwiY2xvc2VkX2F0IjoiMjAyNi0wOS0xOVQwOToxMjozMFoiLCJhZGRpdGlvbnMiOjQ0OSwiZGVsZXRpb25zIjo3MCwiY2hhbmdlZF9maWxlcyI6MjYsImNvbW1pdHNfY291bnQiOjUsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IEhhcmRlbiBKZXYgcm91dGluZyBhbmQgTUNQIGludGVyb3BlcmFiaWxpdHkgd2hpbGUgcHJlc2VydmluZyB0aGUgR2l0SHViIGV2ZW50LWRlbGl2ZXJ5IHdvcmtmbG93LiAjIyBDaGFuZ2VzIC0gUmVxdWlyZSBwcm9iYWJpbGl0eSBkaXN0cmlidXRpb25zIHRvIHN1cHBvcnQgcmVwb3J0ZWQgY29uZmlkZW5jZSBiZWZvcmUgYW55IGF1dG9tYXRpYyBwb2xpY3kgZGVjaXNpb24uIC0gQXBwbHkgdGhlIGNvaGVyZW5jZSBndWFyZCB0byBldmFsdWF0ZSwgY29kaW5nLWxvb3AsIHJldmlldywgdmVyaWZ5LCBhbmQgZ2F0ZSBwYXRocy4gLSBBZGQgdHlwZWQgTUNQIG91dHB1dCBzY2hlbWFzIGFuZCBzdHJ1Y3R1cmVkQ29udGVudCBwYXJpdHkgZm9yIGFsbCBuaW5lIHRvb2xzLCBpbmNsdWRpbmdcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX1dfQ== -->
