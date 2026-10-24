# Jev_MCP GitHub watch

**Latest pull request:** [#25 feat: 0.70 default auto_accept (with 0.80 floors for review, claims and unmeasured tools) from a threshold sweep](https://github.com/burnigtm/jev-mcp/pull/25) — **open** 2026-10-24T11:18:54Z · just now · burnigtm · `feat/threshold-sweep` → `main` · +54708 −78 · 39 files.

Open **1** · Merged **14** · Closed **0** · [Interactive board](github-watch.html)

This is the **Cursor Project dashboard** for [burnigtm/jev-mcp](https://github.com/burnigtm/jev-mcp). Open **Projects → Jev_MCP** (not the Agents list). The latest pull request stays at the top even when the list is long. GitHub Actions refreshes this file on branch `cursor-watch`.

| | |
| --- | --- |
| **Last refresh** | 2026-10-24T11:19:07Z |
| **Data** | GitHub API |
| **Last GitHub event** | `pull_request_target` `synchronize` |
| **Open PRs** | [#25](https://github.com/burnigtm/jev-mcp/pull/25) feat: 0.70 default auto_accept (with 0.80 floors for review, claims and unmeasured tools) from a threshold sweep |
| **Merged (recent)** | [#24](https://github.com/burnigtm/jev-mcp/pull/24) fix: publish the ledger key atomically so racing processes keep their records, [#23](https://github.com/burnigtm/jev-mcp/pull/23) feat: calibrate, jev://ledger resource and SARIF output, [#22](https://github.com/burnigtm/jev-mcp/pull/22) feat: optional caller context for the review tools (opt-in), [#21](https://github.com/burnigtm/jev-mcp/pull/21) feat: pull-request gate (jev-mcp ci), [#20](https://github.com/burnigtm/jev-mcp/pull/20) feat: enforced Claude Code hooks and jev-mcp check |
| **GitHub `main`** | [`0af1a38`](https://github.com/burnigtm/jev-mcp/commit/0af1a384124d032c814f5699fced8bfa2355a5b3) |
| **Cursor target** | `bc-c78e565c-bc13-4d27-ada8-cc5e7e04eb9e` |

## Latest

<details open>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/25">#25 feat: 0.70 default auto_accept (with 0.80 floors for review, claims and unmeasured tools) from a threshold sweep — OPEN</a></summary>
<table>
<tr><td><strong>State</strong></td><td>OPEN</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/threshold-sweep → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T11:18:54Z · just now</td></tr>
<tr><td><strong>Merged</strong></td><td>not merged</td></tr>
<tr><td><strong>Diff</strong></td><td>+54708 −78 · 39 files</td></tr>
<tr><td><strong>Commits</strong></td><td>5</td></tr>
<tr><td><strong>Checks</strong></td><td>5 still running · 6 checks</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/0af1a384124d032c814f5699fced8bfa2355a5b3"><code>0af1a38</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/4f5cf1cdf6cbe046c43ea6a29ef106fcb4c4988d"><code>4f5cf1c</code></a></td></tr>
</table>
<p><strong>Commits</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/ce0294a6a519e6f50b031084bfe13d486646aafd"><code>ce0294a</code></a> feat: fast profile (auto_accept 0.70) from a threshold sweep, and a privilege-boundary floor</li>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/1d87ef0748a2cecf49da27f1dc4e717723821232"><code>1d87ef0</code></a> chore: remove a scratch analysis script</li>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/cae2d69904c0dd2c98077a5b32726f7648912ec0"><code>cae2d69</code></a> Merge main into feat/threshold-sweep</li>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/67d87461e894eadde8ad776b3aee367eea526adc"><code>67d8746</code></a> docs: blank line between changelog sections</li>
<li><a href="https://github.com/burnigtm/jev-mcp/commit/0af1a384124d032c814f5699fced8bfa2355a5b3"><code>0af1a38</code></a> feat: make 0.70 the default auto_accept for the measured tools, with floors found by testing</li>
</ul>
<p><strong>Files</strong></p><ul>
<li><code>.env.example</code> modified +3 −3</li>
<li><code>docs/architecture.md</code> modified +1 −1</li>
<li><code>docs/changelog.md</code> modified +9 −0</li>
<li><code>docs/configuration.md</code> modified +14 −10</li>
<li><code>evals/results/default-bar-2026-10-24.json</code> added +45545 −0</li>
<li><code>evals/results/default-bar-2026-10-24.md</code> added +67 −0</li>
<li><code>evals/results/threshold-2026-10-24.json</code> added +7604 −0</li>
<li><code>evals/results/threshold-2026-10-24.md</code> added +51 −0</li>
<li><code>scripts/eval-bonus.mjs</code> modified +2 −2</li>
<li><code>scripts/eval-threshold.mjs</code> added +163 −0</li>
<li><code>scripts/lib/bonus-blind.mjs</code> added +147 −0</li>
<li><code>scripts/lib/bonus-generator.mjs</code> modified +19 −1</li>
<li>27 more files on the pull request</li>
</ul>
<p><strong>Checks</strong></p><ul>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40089404018/job/120858821832">check (ubuntu-latest, 22)</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40089404018/job/120858821731">check (windows-latest, 22)</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40089404018/job/120858821700">check (ubuntu-latest, 20)</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40089404018/job/120858821591">check (windows-latest, 20)</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40089403268/job/120858820291">notify</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40089403268/job/120858820190">publish</a> <code>in_progress</code></li>
</ul>
<p><strong>Description</strong></p><p>## Summary You asked to make 0.70 the default and to test far more before trusting it. This PR does that, and the testing changed the design: **0.70 is the default for `jev_scope`, `jev_triage`, `jev_risk` (and `jev_rank`); patch review, claims and three unmeasured tools keep 0.80.** ## Evidence (live `jev-1.14.0`, details in `evals/results/default-bar-2026-10-24.md`) - **Final holdout, fresh seeds: 2,153 cases (1,227 risky). No risky case approved at any bar from 0.50 to 0.95.** Safe approvals…</p>
</details>


## Open

No open pull requests.


## Merged

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/24">#24 fix: publish the ledger key atomically so racing processes keep their records — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>fix/ledger-key-race → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T10:00:27Z · 1h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-24T10:00:27Z · 1h ago</td></tr>
<tr><td><strong>Diff</strong></td><td>+95 −12 · 4 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>no checks reported</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/018ebe5dd15285066ebb5cd4e3b0481c88b2a1ff"><code>018ebe5</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/e1bbaf938879d7665578fd1076549703296ed361"><code>e1bbaf9</code></a></td></tr>
</table>
<p><strong>Description</strong></p><p>The flaky Windows CI failure `several processes appending at once never produce a partial or corrupt line` (239 of 240 lines) was a real race, not test flakiness: the ledger key was created empty and then filled, so a process reading it in between found an invalid key and dropped its record. **Fix:** write the key to a private temporary file and link it into place (exactly one racing process wins; readers never see a partial key); a reader that still meets a short key (a file system without har…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/23">#23 feat: calibrate, jev://ledger resource and SARIF output — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/calibrate-sarif → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:37:15Z · 1h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-24T09:37:15Z · 1h ago</td></tr>
<tr><td><strong>Diff</strong></td><td>+670 −8 · 12 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>no checks reported</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/7afd08325ea0a6f566771fafd265e6000c688984"><code>7afd083</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/55af907b360d8f69dcebd26f2ef2a0d70a240868"><code>55af907</code></a></td></tr>
</table>
<p><strong>Description</strong></p><p>## Summary PR 9 (the last) of the roadmap, **stacked on #22**. - **`jev-mcp calibrate [--dir] [--since YYYY-MM] [--min-sample N] [--json]`**: per-tool action mix and review/escalate rates, labeled outcomes from `jev_feedback`, false-alarm rate (among labeled holds) and miss rate (among labeled approvals), false-alarm rate by reason code, and inputs that got different actions. **Only labeled decisions count as ground truth** (silence is not evidence). A reason code needs `--min-sample` labels (d…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/22">#22 feat: optional caller context for the review tools (opt-in) — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/caller-context → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:30:30Z · 1h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-24T09:30:30Z · 1h ago</td></tr>
<tr><td><strong>Diff</strong></td><td>+1674 −29 · 24 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>no checks reported</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/813e4f4aabc4e8d5d2dc28f58067907e0e0cbcc7"><code>813e4f4</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/bb292a5b8285fd97d69cf9eefc68739f0cb6bc5d"><code>bb292a5</code></a></td></tr>
</table>
<p><strong>Description</strong></p><p>## Summary PR 8 of the roadmap, **stacked on #21**. Optional evidence about where changed code is used, for the review tools. **A negative result, shipped opt-in and off by default.** - `jev_review`, `jev_risk`, `jev_gate` accept `context.callers` (up to 40 `{ path, line?, text, symbol? }`). The server never searches the repo itself; the host supplies the list. Snippets are untrusted: sanitized, secrets redacted, instruction-like text dropped. With callers present the correctness and blast-radi…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/21">#21 feat: pull-request gate (jev-mcp ci) — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/ci-gate → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:30:22Z · 1h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-24T09:30:22Z · 1h ago</td></tr>
<tr><td><strong>Diff</strong></td><td>+1288 −12 · 14 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>no checks reported</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/a1d34026cf3b73d0c4e007b12814a99cbcc7233c"><code>a1d3402</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/423206d8069ca994451fa54afe949003fb751efa"><code>423206d</code></a></td></tr>
</table>
<p><strong>Description</strong></p><p>## Summary PR 7 of the roadmap, **stacked on #20**. `jev-mcp ci` is the pull-request gate: it answers `auto`, `review` or `escalate` (exit 0, 10, 20; 2 on any error, fail-closed) and never runs the pull request&#x27;s code. - **Policy from the base ref.** `.jev-policy.json` is read with `git show BASE:...`, so a pull request cannot loosen its own rules; changing the file holds, a broken one holds. Every changed path (and a rename&#x27;s old path) is matched against `protected_paths`. - **Deterministic fl…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/20">#20 feat: enforced Claude Code hooks and jev-mcp check — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/check-and-hooks → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:30:15Z · 1h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-24T09:30:15Z · 1h ago</td></tr>
<tr><td><strong>Diff</strong></td><td>+7181 −0 · 19 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>no checks reported</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/3c3f87e72bb317867ff8d592432efc8fad068b10"><code>3c3f87e</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/2fee7e83c2122ba37f87df6571011b095db3ae62"><code>2fee7e8</code></a></td></tr>
</table>
<p><strong>Description</strong></p><p>## Summary PR 6 of the roadmap, **stacked on #19**. Makes the guard run on every tool call in Claude Code instead of being advisory. - **`jev-mcp hook pre-tool-use`**: classifier and repository policy first; a confirmed read-only command is silent with no model call; reads of key/credential files and edits to the guard&#x27;s own config ask without a model; only the gray zone calls `jev_scope`. A hook only restricts: silent, `ask`, or `deny` for an explicit policy `deny` rule. A model judgment is an…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/19">#19 feat: chunked review for diffs too large for one request — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/large-diff-review → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:30:08Z · 1h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-24T09:30:07Z · 1h ago</td></tr>
<tr><td><strong>Diff</strong></td><td>+3831 −74 · 24 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>no checks reported</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/f4f3a928290f2b20bec1d2a1fcc50815c1b6d145"><code>f4f3a92</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/84e23d810887ef55cb6ea81ed3ca3031ea204fa3"><code>84e23d8</code></a></td></tr>
</table>
<p><strong>Description</strong></p><p>## Summary PR 5 of the roadmap. **Stacked on #18** (base is that branch; GitHub retargets it as the stack merges). Until now a diff past about 31.8k estimated tokens was cut off at the tail and could never be `auto`, so a large change was unreviewable and a defect past the cut was invisible. `jev_review`, `jev_risk` and `jev_gate` now review it in parts. - **Split along file boundaries.** A lossless unified-diff parser (`src/diff.ts`; handles renames, deletions, binary, `\ No newline`, CRLF, qu…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/18">#18 Repository policy file, profiles, and a dedicated triage recoverability bar — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/repo-policy-profiles → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:30:00Z · 1h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-24T09:29:59Z · 1h ago</td></tr>
<tr><td><strong>Diff</strong></td><td>+26124 −43 · 24 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>no checks reported</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/99ae156299d4be9ce3a66325d88d590b9027df84"><code>99ae156</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/e7574703ff30f1e0de72292365e33c4a4ed60fe1"><code>e757470</code></a></td></tr>
</table>
<p><strong>Description</strong></p><p>## Summary PR 4 of the roadmap. **Stacked on #17** (base is that branch; GitHub retargets it as the stack merges). Adds the deterministic layer the hooks and CI will use, and settles the open &quot;triage bar&quot; and &quot;strict profile&quot; questions with measurements instead of argument. - **`.jev-policy.json`**, evaluated by `jev_scope` before any Jev request: - `protected_paths`: globs with a `review` or `deny` floor, tested against the action&#x27;s `target` and every path-like argument of the command. - `comm…</p>
</details>

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/17">#17 Decision ledger: decision_id on every result and jev_feedback — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/decision-ledger → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:29:52Z · 1h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-24T09:29:52Z · 1h ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:29:45Z · 1h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-24T09:29:44Z · 1h ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:29:09Z · 1h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-24T09:29:09Z · 1h ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-10-23T19:48:52Z · 15h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-23T19:48:51Z · 15h ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-10-23T18:58:30Z · 16h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-23T18:58:30Z · 16h ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-10-23T18:50:25Z · 16h ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-23T18:50:24Z · 16h ago</td></tr>
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


## Closed

None.


## Activity

[PR #25](https://github.com/burnigtm/jev-mcp/pull/25) feat: 0.70 default auto_accept (with 0.80 floors for review, claims and unmeasured tools) from a threshold sweep

- Event: `pull_request_target` `synchronize`
- Ref: `main` SHA [`0af1a38`](https://github.com/burnigtm/jev-mcp/commit/0af1a384124d032c814f5699fced8bfa2355a5b3)

Search, filters, checks, commits, and files are on the interactive board next to this file. Follow-ups land in the **Jev_MCP Project** chat.

Live Actions: [Notify Jev_MCP](https://github.com/burnigtm/jev-mcp/actions/workflows/notify-jev-mcp.yml).

<!-- jev-watch:snapshot eyJwdWxscyI6W3sibnVtYmVyIjoyNSwidGl0bGUiOiJmZWF0OiAwLjcwIGRlZmF1bHQgYXV0b19hY2NlcHQgKHdpdGggMC44MCBmbG9vcnMgZm9yIHJldmlldywgY2xhaW1zIGFuZCB1bm1lYXN1cmVkIHRvb2xzKSBmcm9tIGEgdGhyZXNob2xkIHN3ZWVwIiwic3RhdGUiOiJPUEVOIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8yNSIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L3RocmVzaG9sZC1zd2VlcCIsImJhc2UiOiJtYWluIiwic2hhIjoiMGFmMWEzODQxMjRkMDMyYzgxNGY1Njk5ZmNlZDhiZmEyMzU1YTViMyIsIm1lcmdlX2NvbW1pdF9zaGEiOiI0ZjVjZjFjZGY2Y2JlMDQ2YzQzZWE2YTI5ZWYxMDZmY2I0YzQ5ODhkIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yNFQxMDowMDoxNFoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yNFQxMToxODo1NFoiLCJtZXJnZWRfYXQiOiIiLCJjbG9zZWRfYXQiOiIiLCJhZGRpdGlvbnMiOjU0NzA4LCJkZWxldGlvbnMiOjc4LCJjaGFuZ2VkX2ZpbGVzIjozOSwiY29tbWl0c19jb3VudCI6NSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgWW91IGFza2VkIHRvIG1ha2UgMC43MCB0aGUgZGVmYXVsdCBhbmQgdG8gdGVzdCBmYXIgbW9yZSBiZWZvcmUgdHJ1c3RpbmcgaXQuIFRoaXMgUFIgZG9lcyB0aGF0LCBhbmQgdGhlIHRlc3RpbmcgY2hhbmdlZCB0aGUgZGVzaWduOiAqKjAuNzAgaXMgdGhlIGRlZmF1bHQgZm9yIGBqZXZfc2NvcGVgLCBgamV2X3RyaWFnZWAsIGBqZXZfcmlza2AgKGFuZCBgamV2X3JhbmtgKTsgcGF0Y2ggcmV2aWV3LCBjbGFpbXMgYW5kIHRocmVlIHVubWVhc3VyZWQgdG9vbHMga2VlcCAwLjgwLioqICMjIEV2aWRlbmNlIChsaXZlIGBqZXYtMS4xNC4wYCwgZGV0YWlscyBpbiBgZXZhbHMvcmVzdWx0cy9kZWZhdWx0LWJhci0yMDI2LTEwLTI0Lm1kYCkgLSAqKkZpbmFsIGhvbGRvdXQsIGZyZXNoIHNlZVx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbeyJzaGEiOiJjZTAyOTRhNmE1MTllNmY1MGIwMzEwODRiZmUxM2Q0ODY2NDZhYWZkIiwibWVzc2FnZSI6ImZlYXQ6IGZhc3QgcHJvZmlsZSAoYXV0b19hY2NlcHQgMC43MCkgZnJvbSBhIHRocmVzaG9sZCBzd2VlcCwgYW5kIGEgcHJpdmlsZWdlLWJvdW5kYXJ5IGZsb29yIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvY29tbWl0L2NlMDI5NGE2YTUxOWU2ZjUwYjAzMTA4NGJmZTEzZDQ4NjY0NmFhZmQifSx7InNoYSI6IjFkODdlZjA3NDhhMmNlY2Y0OWRhMjdmMWRjNGU3MTc3MjM4MjEyMzIiLCJtZXNzYWdlIjoiY2hvcmU6IHJlbW92ZSBhIHNjcmF0Y2ggYW5hbHlzaXMgc2NyaXB0IiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvY29tbWl0LzFkODdlZjA3NDhhMmNlY2Y0OWRhMjdmMWRjNGU3MTc3MjM4MjEyMzIifSx7InNoYSI6ImNhZTJkNjk5MDRjMGRkMmM5ODA3N2E1YjMyNzI2Zjc2NDg5MTJlYzAiLCJtZXNzYWdlIjoiTWVyZ2UgbWFpbiBpbnRvIGZlYXQvdGhyZXNob2xkLXN3ZWVwIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvY29tbWl0L2NhZTJkNjk5MDRjMGRkMmM5ODA3N2E1YjMyNzI2Zjc2NDg5MTJlYzAifSx7InNoYSI6IjY3ZDg3NDYxZTg5NGVhZGRlOGFkNzc2YjNhZWUzNjdlZWE1MjZhZGMiLCJtZXNzYWdlIjoiZG9jczogYmxhbmsgbGluZSBiZXR3ZWVuIGNoYW5nZWxvZyBzZWN0aW9ucyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2NvbW1pdC82N2Q4NzQ2MWU4OTRlYWRkZThhZDc3NmIzYWVlMzY3ZWVhNTI2YWRjIn0seyJzaGEiOiIwYWYxYTM4NDEyNGQwMzJjODE0ZjU2OTlmY2VkOGJmYTIzNTVhNWIzIiwibWVzc2FnZSI6ImZlYXQ6IG1ha2UgMC43MCB0aGUgZGVmYXVsdCBhdXRvX2FjY2VwdCBmb3IgdGhlIG1lYXN1cmVkIHRvb2xzLCB3aXRoIGZsb29ycyBmb3VuZCBieSB0ZXN0aW5nIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvY29tbWl0LzBhZjFhMzg0MTI0ZDAzMmM4MTRmNTY5OWZjZWQ4YmZhMjM1NWE1YjMifV0sImZpbGVzIjpbeyJmaWxlbmFtZSI6Ii5lbnYuZXhhbXBsZSIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjozLCJkZWxldGlvbnMiOjN9LHsiZmlsZW5hbWUiOiJkb2NzL2FyY2hpdGVjdHVyZS5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxLCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJkb2NzL2NoYW5nZWxvZy5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo5LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NvbmZpZ3VyYXRpb24ubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTQsImRlbGV0aW9ucyI6MTB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL2RlZmF1bHQtYmFyLTIwMjYtMTAtMjQuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo0NTU0NSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9kZWZhdWx0LWJhci0yMDI2LTEwLTI0Lm1kIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjY3LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL3RocmVzaG9sZC0yMDI2LTEwLTI0Lmpzb24iLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NzYwNCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy90aHJlc2hvbGQtMjAyNi0xMC0yNC5tZCIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo1MSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic2NyaXB0cy9ldmFsLWJvbnVzLm1qcyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoyLCJkZWxldGlvbnMiOjJ9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2V2YWwtdGhyZXNob2xkLm1qcyIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoxNjMsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNjcmlwdHMvbGliL2JvbnVzLWJsaW5kLm1qcyIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoxNDcsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNjcmlwdHMvbGliL2JvbnVzLWdlbmVyYXRvci5tanMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTksImRlbGV0aW9ucyI6MX1dLCJjaGVja3MiOlt7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjIpIiwic3RhdGUiOiJpbl9wcm9ncmVzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4OTQwNDAxOC9qb2IvMTIwODU4ODIxODMyIn0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMikiLCJzdGF0ZSI6ImluX3Byb2dyZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDg5NDA0MDE4L2pvYi8xMjA4NTg4MjE3MzEifSx7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjApIiwic3RhdGUiOiJpbl9wcm9ncmVzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4OTQwNDAxOC9qb2IvMTIwODU4ODIxNzAwIn0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6ImluX3Byb2dyZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDg5NDA0MDE4L2pvYi8xMjA4NTg4MjE1OTEifSx7Im5hbWUiOiJub3RpZnkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwODk0MDMyNjgvam9iLzEyMDg1ODgyMDI5MSJ9LHsibmFtZSI6InB1Ymxpc2giLCJzdGF0ZSI6ImluX3Byb2dyZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDg5NDAzMjY4L2pvYi8xMjA4NTg4MjAxOTAifV19LHsibnVtYmVyIjoyNCwidGl0bGUiOiJmaXg6IHB1Ymxpc2ggdGhlIGxlZGdlciBrZXkgYXRvbWljYWxseSBzbyByYWNpbmcgcHJvY2Vzc2VzIGtlZXAgdGhlaXIgcmVjb3JkcyIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8yNCIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmaXgvbGVkZ2VyLWtleS1yYWNlIiwiYmFzZSI6Im1haW4iLCJzaGEiOiIwMThlYmU1ZGQxNTI4NTA2NmViYjVjZDRlM2IwNDgxYzg4YjJhMWZmIiwibWVyZ2VfY29tbWl0X3NoYSI6ImUxYmJhZjkzODg3OWQ3NjY1NTc4ZmQxMDc2NTQ5NzAzMjk2ZWQzNjEiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjQ4OjU2WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTI0VDEwOjAwOjI3WiIsIm1lcmdlZF9hdCI6IjIwMjYtMTAtMjRUMTA6MDA6MjdaIiwiY2xvc2VkX2F0IjoiMjAyNi0xMC0yNFQxMDowMDoyN1oiLCJhZGRpdGlvbnMiOjk1LCJkZWxldGlvbnMiOjEyLCJjaGFuZ2VkX2ZpbGVzIjo0LCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiVGhlIGZsYWt5IFdpbmRvd3MgQ0kgZmFpbHVyZSBgc2V2ZXJhbCBwcm9jZXNzZXMgYXBwZW5kaW5nIGF0IG9uY2UgbmV2ZXIgcHJvZHVjZSBhIHBhcnRpYWwgb3IgY29ycnVwdCBsaW5lYCAoMjM5IG9mIDI0MCBsaW5lcykgd2FzIGEgcmVhbCByYWNlLCBub3QgdGVzdCBmbGFraW5lc3M6IHRoZSBsZWRnZXIga2V5IHdhcyBjcmVhdGVkIGVtcHR5IGFuZCB0aGVuIGZpbGxlZCwgc28gYSBwcm9jZXNzIHJlYWRpbmcgaXQgaW4gYmV0d2VlbiBmb3VuZCBhbiBpbnZhbGlkIGtleSBhbmQgZHJvcHBlZCBpdHMgcmVjb3JkLiAqKkZpeDoqKiB3cml0ZSB0aGUga2V5IHRvIGEgcHJpdmF0ZSB0ZW1wb3JhcnkgZmlsZSBhbmQgbGluayBpdCBpbnRvIHBsYWNlIChleGFjdGx5IG9uZSByYWNpbmcgcHJvY2VzcyB3aW5zXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoyMywidGl0bGUiOiJmZWF0OiBjYWxpYnJhdGUsIGpldjovL2xlZGdlciByZXNvdXJjZSBhbmQgU0FSSUYgb3V0cHV0Iiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzIzIiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvY2FsaWJyYXRlLXNhcmlmIiwiYmFzZSI6Im1haW4iLCJzaGEiOiI3YWZkMDgzMjVlYTBhNmY1NjY3NzFmYWZkMjY1ZTYwMDBjNjg4OTg0IiwibWVyZ2VfY29tbWl0X3NoYSI6IjU1YWY5MDdiMzYwZDhmNjlkY2ViZDI2ZjJlZjJhMGQ3MGEyNDA4NjgiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjIzOjMwWiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjM3OjE1WiIsIm1lcmdlZF9hdCI6IjIwMjYtMTAtMjRUMDk6Mzc6MTVaIiwiY2xvc2VkX2F0IjoiMjAyNi0xMC0yNFQwOTozNzoxNVoiLCJhZGRpdGlvbnMiOjY3MCwiZGVsZXRpb25zIjo4LCJjaGFuZ2VkX2ZpbGVzIjoxMiwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgUFIgOSAodGhlIGxhc3QpIG9mIHRoZSByb2FkbWFwLCAqKnN0YWNrZWQgb24gIzIyKiouIC0gKipgamV2LW1jcCBjYWxpYnJhdGUgWy0tZGlyXSBbLS1zaW5jZSBZWVlZLU1NXSBbLS1taW4tc2FtcGxlIE5dIFstLWpzb25dYCoqOiBwZXItdG9vbCBhY3Rpb24gbWl4IGFuZCByZXZpZXcvZXNjYWxhdGUgcmF0ZXMsIGxhYmVsZWQgb3V0Y29tZXMgZnJvbSBgamV2X2ZlZWRiYWNrYCwgZmFsc2UtYWxhcm0gcmF0ZSAoYW1vbmcgbGFiZWxlZCBob2xkcykgYW5kIG1pc3MgcmF0ZSAoYW1vbmcgbGFiZWxlZCBhcHByb3ZhbHMpLCBmYWxzZS1hbGFybSByYXRlIGJ5IHJlYXNvbiBjb2RlLCBhbmQgaW5wdXRzIHRoYXQgZ290IGRpZmZlcmVudCBhY3Rpb25zLiAqKk9ubHkgbGFiZWxlZCBkZWNpc1x1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MjIsInRpdGxlIjoiZmVhdDogb3B0aW9uYWwgY2FsbGVyIGNvbnRleHQgZm9yIHRoZSByZXZpZXcgdG9vbHMgKG9wdC1pbikiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMjIiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC9jYWxsZXItY29udGV4dCIsImJhc2UiOiJtYWluIiwic2hhIjoiODEzZTRmNGFhYmM0ZThkNWQyZGMyOGY1ODA2NzkwN2UwZTBjYmNjNyIsIm1lcmdlX2NvbW1pdF9zaGEiOiJiYjI5MmE1YjgyODVmZDk3ZDY5Y2Y5ZWVmYzY4NzM5ZjBjYjZiYzVkIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yNFQwOToxODowMloiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yNFQwOTozMDozMFoiLCJtZXJnZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjMwOjMwWiIsImNsb3NlZF9hdCI6IjIwMjYtMTAtMjRUMDk6MzA6MzBaIiwiYWRkaXRpb25zIjoxNjc0LCJkZWxldGlvbnMiOjI5LCJjaGFuZ2VkX2ZpbGVzIjoyNCwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgUFIgOCBvZiB0aGUgcm9hZG1hcCwgKipzdGFja2VkIG9uICMyMSoqLiBPcHRpb25hbCBldmlkZW5jZSBhYm91dCB3aGVyZSBjaGFuZ2VkIGNvZGUgaXMgdXNlZCwgZm9yIHRoZSByZXZpZXcgdG9vbHMuICoqQSBuZWdhdGl2ZSByZXN1bHQsIHNoaXBwZWQgb3B0LWluIGFuZCBvZmYgYnkgZGVmYXVsdC4qKiAtIGBqZXZfcmV2aWV3YCwgYGpldl9yaXNrYCwgYGpldl9nYXRlYCBhY2NlcHQgYGNvbnRleHQuY2FsbGVyc2AgKHVwIHRvIDQwIGB7IHBhdGgsIGxpbmU/LCB0ZXh0LCBzeW1ib2w/IH1gKS4gVGhlIHNlcnZlciBuZXZlciBzZWFyY2hlcyB0aGUgcmVwbyBpdHNlbGY7IHRoZSBob3N0IHN1cHBsaWVzIHRoZSBsaXN0LiBTbmlwcGV0cyBhcmUgdW50cnVzdGVkOiBzYW5pdGl6ZWQsXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoyMSwidGl0bGUiOiJmZWF0OiBwdWxsLXJlcXVlc3QgZ2F0ZSAoamV2LW1jcCBjaSkiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMjEiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC9jaS1nYXRlIiwiYmFzZSI6Im1haW4iLCJzaGEiOiJhMWQzNDAyNmNmM2I3M2QwYzRlMDA3YjEyODE0YTk5Y2JjYzcyMzNjIiwibWVyZ2VfY29tbWl0X3NoYSI6IjQyMzIwNmQ4MDY5Y2E5OTQ0NTFmYTU0YWZlOTQ5MDAzZmI3NTFlZmEiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjA1OjE3WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjMwOjIyWiIsIm1lcmdlZF9hdCI6IjIwMjYtMTAtMjRUMDk6MzA6MjJaIiwiY2xvc2VkX2F0IjoiMjAyNi0xMC0yNFQwOTozMDoyMloiLCJhZGRpdGlvbnMiOjEyODgsImRlbGV0aW9ucyI6MTIsImNoYW5nZWRfZmlsZXMiOjE0LCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBQUiA3IG9mIHRoZSByb2FkbWFwLCAqKnN0YWNrZWQgb24gIzIwKiouIGBqZXYtbWNwIGNpYCBpcyB0aGUgcHVsbC1yZXF1ZXN0IGdhdGU6IGl0IGFuc3dlcnMgYGF1dG9gLCBgcmV2aWV3YCBvciBgZXNjYWxhdGVgIChleGl0IDAsIDEwLCAyMDsgMiBvbiBhbnkgZXJyb3IsIGZhaWwtY2xvc2VkKSBhbmQgbmV2ZXIgcnVucyB0aGUgcHVsbCByZXF1ZXN0J3MgY29kZS4gLSAqKlBvbGljeSBmcm9tIHRoZSBiYXNlIHJlZi4qKiBgLmpldi1wb2xpY3kuanNvbmAgaXMgcmVhZCB3aXRoIGBnaXQgc2hvdyBCQVNFOi4uLmAsIHNvIGEgcHVsbCByZXF1ZXN0IGNhbm5vdCBsb29zZW4gaXRzIG93biBydWxlczsgY2hhbmdpbmcgdGhlIGZpbGUgaG9sZHMsIGEgYnJva2VuIG9uZSBob2xkcy4gRXZlXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoyMCwidGl0bGUiOiJmZWF0OiBlbmZvcmNlZCBDbGF1ZGUgQ29kZSBob29rcyBhbmQgamV2LW1jcCBjaGVjayIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8yMCIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L2NoZWNrLWFuZC1ob29rcyIsImJhc2UiOiJtYWluIiwic2hhIjoiM2MzZjg3ZTcyYmIzMTc4NjdmZjhkNTkyNDMyZWZjOGZhZDA2OGIxMCIsIm1lcmdlX2NvbW1pdF9zaGEiOiIyZmVlN2U4M2MyMTIyYmEzN2Y4N2RmNjU3MTAxMWIwOTVkYjNhZTYyIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yNFQwODowMjo1OVoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yNFQwOTozMDoxNVoiLCJtZXJnZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjMwOjE1WiIsImNsb3NlZF9hdCI6IjIwMjYtMTAtMjRUMDk6MzA6MTVaIiwiYWRkaXRpb25zIjo3MTgxLCJkZWxldGlvbnMiOjAsImNoYW5nZWRfZmlsZXMiOjE5LCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBQUiA2IG9mIHRoZSByb2FkbWFwLCAqKnN0YWNrZWQgb24gIzE5KiouIE1ha2VzIHRoZSBndWFyZCBydW4gb24gZXZlcnkgdG9vbCBjYWxsIGluIENsYXVkZSBDb2RlIGluc3RlYWQgb2YgYmVpbmcgYWR2aXNvcnkuIC0gKipgamV2LW1jcCBob29rIHByZS10b29sLXVzZWAqKjogY2xhc3NpZmllciBhbmQgcmVwb3NpdG9yeSBwb2xpY3kgZmlyc3Q7IGEgY29uZmlybWVkIHJlYWQtb25seSBjb21tYW5kIGlzIHNpbGVudCB3aXRoIG5vIG1vZGVsIGNhbGw7IHJlYWRzIG9mIGtleS9jcmVkZW50aWFsIGZpbGVzIGFuZCBlZGl0cyB0byB0aGUgZ3VhcmQncyBvd24gY29uZmlnIGFzayB3aXRob3V0IGEgbW9kZWw7IG9ubHkgdGhlIGdyYXkgem9uZSBjYWxscyBgamV2X3Njb3BlYC4gQSBob29rXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoxOSwidGl0bGUiOiJmZWF0OiBjaHVua2VkIHJldmlldyBmb3IgZGlmZnMgdG9vIGxhcmdlIGZvciBvbmUgcmVxdWVzdCIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xOSIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L2xhcmdlLWRpZmYtcmV2aWV3IiwiYmFzZSI6Im1haW4iLCJzaGEiOiJmNGYzYTkyODI5MGYyYjIwYmVjMWQyYTFmY2M1MDgxNWMxYjZkMTQ1IiwibWVyZ2VfY29tbWl0X3NoYSI6Ijg0ZTIzZDgxMDg4N2VmNTVjYjZlYTgxZWQzY2EzMDMxZWEyMDRmYTMiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA3OjQzOjQ0WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjMwOjA4WiIsIm1lcmdlZF9hdCI6IjIwMjYtMTAtMjRUMDk6MzA6MDdaIiwiY2xvc2VkX2F0IjoiMjAyNi0xMC0yNFQwOTozMDowN1oiLCJhZGRpdGlvbnMiOjM4MzEsImRlbGV0aW9ucyI6NzQsImNoYW5nZWRfZmlsZXMiOjI0LCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBQUiA1IG9mIHRoZSByb2FkbWFwLiAqKlN0YWNrZWQgb24gIzE4KiogKGJhc2UgaXMgdGhhdCBicmFuY2g7IEdpdEh1YiByZXRhcmdldHMgaXQgYXMgdGhlIHN0YWNrIG1lcmdlcykuIFVudGlsIG5vdyBhIGRpZmYgcGFzdCBhYm91dCAzMS44ayBlc3RpbWF0ZWQgdG9rZW5zIHdhcyBjdXQgb2ZmIGF0IHRoZSB0YWlsIGFuZCBjb3VsZCBuZXZlciBiZSBgYXV0b2AsIHNvIGEgbGFyZ2UgY2hhbmdlIHdhcyB1bnJldmlld2FibGUgYW5kIGEgZGVmZWN0IHBhc3QgdGhlIGN1dCB3YXMgaW52aXNpYmxlLiBgamV2X3Jldmlld2AsIGBqZXZfcmlza2AgYW5kIGBqZXZfZ2F0ZWAgbm93IHJldmlldyBpdCBpbiBwYXJ0cy4gLSAqKlNwbGl0IGFsb25nIGZpbGUgYm91bmRhcmllcy4qKiBBIGxvc3NsXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoxOCwidGl0bGUiOiJSZXBvc2l0b3J5IHBvbGljeSBmaWxlLCBwcm9maWxlcywgYW5kIGEgZGVkaWNhdGVkIHRyaWFnZSByZWNvdmVyYWJpbGl0eSBiYXIiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTgiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC9yZXBvLXBvbGljeS1wcm9maWxlcyIsImJhc2UiOiJtYWluIiwic2hhIjoiOTlhZTE1NjI5OWQ0YmU5Y2UzYTY2MzI1ZDg4ZDU5MGI5MDI3ZGY4NCIsIm1lcmdlX2NvbW1pdF9zaGEiOiJlNzU3NDcwM2ZmMzBmMWUwZGU3MjI5MjM2NWUzM2M0YTRlZDYwZmUxIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yNFQwNzowOToyMVoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yNFQwOTozMDowMFoiLCJtZXJnZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjI5OjU5WiIsImNsb3NlZF9hdCI6IjIwMjYtMTAtMjRUMDk6MzA6MDBaIiwiYWRkaXRpb25zIjoyNjEyNCwiZGVsZXRpb25zIjo0MywiY2hhbmdlZF9maWxlcyI6MjQsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFBSIDQgb2YgdGhlIHJvYWRtYXAuICoqU3RhY2tlZCBvbiAjMTcqKiAoYmFzZSBpcyB0aGF0IGJyYW5jaDsgR2l0SHViIHJldGFyZ2V0cyBpdCBhcyB0aGUgc3RhY2sgbWVyZ2VzKS4gQWRkcyB0aGUgZGV0ZXJtaW5pc3RpYyBsYXllciB0aGUgaG9va3MgYW5kIENJIHdpbGwgdXNlLCBhbmQgc2V0dGxlcyB0aGUgb3BlbiBcInRyaWFnZSBiYXJcIiBhbmQgXCJzdHJpY3QgcHJvZmlsZVwiIHF1ZXN0aW9ucyB3aXRoIG1lYXN1cmVtZW50cyBpbnN0ZWFkIG9mIGFyZ3VtZW50LiAtICoqYC5qZXYtcG9saWN5Lmpzb25gKiosIGV2YWx1YXRlZCBieSBgamV2X3Njb3BlYCBiZWZvcmUgYW55IEpldiByZXF1ZXN0OiAtIGBwcm90ZWN0ZWRfcGF0aHNgOiBnbG9icyB3aXRoIGEgYHJldmlld2Agb3IgYGRlXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoxNywidGl0bGUiOiJEZWNpc2lvbiBsZWRnZXI6IGRlY2lzaW9uX2lkIG9uIGV2ZXJ5IHJlc3VsdCBhbmQgamV2X2ZlZWRiYWNrIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzE3IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvZGVjaXNpb24tbGVkZ2VyIiwiYmFzZSI6Im1haW4iLCJzaGEiOiI1MDZmNzM4MDBlNmI0NDk1N2Y2MGU2ZTBjNTJkNTMwMGQ4ZDIyZDM3IiwibWVyZ2VfY29tbWl0X3NoYSI6ImEyY2Y2YTY4OWJmNmYyZjI2MmU3Yjg3NWJhMjAyZjRmMzlmYjIwM2MiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA2OjQ5OjA3WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjI5OjUyWiIsIm1lcmdlZF9hdCI6IjIwMjYtMTAtMjRUMDk6Mjk6NTJaIiwiY2xvc2VkX2F0IjoiMjAyNi0xMC0yNFQwOToyOTo1MloiLCJhZGRpdGlvbnMiOjc3NTksImRlbGV0aW9ucyI6MTMsImNoYW5nZWRfZmlsZXMiOjMyLCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBQUiAzIG9mIHRoZSByb2FkbWFwLiAqKlN0YWNrZWQgb24gIzE2KiogKGJhc2UgaXMgdGhhdCBicmFuY2g7IEdpdEh1YiByZXRhcmdldHMgaXQgYXMgdGhlIHN0YWNrIG1lcmdlcykuIE5vdGhpbmcgcmVjb3JkcyBKZXYncyBkZWNpc2lvbnMgb3Igd2hldGhlciB0aGV5IHdlcmUgcmlnaHQsIHNvIHJlYWwtbGlmZSBmYWxzZS1hbGFybSByYXRlcyBhcmUgdW5rbm93biBhbmQgZXZlcnkgdGhyZXNob2xkIHF1ZXN0aW9uIChzdWNoIGFzIHRoZSB0cmlhZ2UgYmFyKSBjYW4gb25seSBiZSBhcmd1ZWQgZnJvbSBzeW50aGV0aWMgYmVuY2htYXJrcy4gVGhpcyBhZGRzIHRoZSBtZWFzdXJlbWVudCBsYXllciB0aGUgbGF0ZXIgUFJzIChob29rcywgQ0kpIHdpbGwgbG9nIGludG8uIC0gKipgZGVjXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoxNiwidGl0bGUiOiJDb21tYW5kIGVmZmVjdCBjbGFzc2lmaWVyOiB0aGUgY29tbWFuZCB0ZXh0IGNhbiByYWlzZSBhIGRlY2xhcmVkIGVmZmVjdCIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xNiIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L2NvbW1hbmQtZWZmZWN0LWNsYXNzaWZpZXIiLCJiYXNlIjoibWFpbiIsInNoYSI6IjAwZGE3NGU5NjdmZTg4YzdjOGVkYTJiNDMzY2RiMTVmYmRlYmFmNDciLCJtZXJnZV9jb21taXRfc2hhIjoiZWY2OTBhMjdkZDdiNTkyNWEyOTYwMzNlMmI2ZmFhMjBhOWQ1M2Q1MyIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDY6Mzg6MjNaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDk6Mjk6NDVaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0yNFQwOToyOTo0NFoiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjI5OjQ0WiIsImFkZGl0aW9ucyI6ODE3MCwiZGVsZXRpb25zIjo5LCJjaGFuZ2VkX2ZpbGVzIjoxNiwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgUFIgMiBvZiB0aGUgcm9hZG1hcC4gKipTdGFja2VkIG9uICMxNSoqIChiYXNlIGlzIHRoYXQgYnJhbmNoOyBHaXRIdWIgd2lsbCByZXRhcmdldCB0aGlzIHRvIGBtYWluYCBvbmNlICMxNSBtZXJnZXMpLiBgamV2X3Njb3BlYCB0cnVzdGVkIHRoZSBob3N0LWRlY2xhcmVkIGBlZmZlY3RgOiBgcmVhZF9vbmx5YCArIGBybSAtcmYgYnVpbGQgJiYgZ2l0IHB1c2ggLS1mb3JjZWAgcmV0dXJuZWQgYGF1dG9gIHdoZW5ldmVyIHRoZSBqdWRnZSdzIGFuc3dlcnMgd2VyZSBjbGVhbi4gVGhpcyBhZGRzIGEgZGV0ZXJtaW5pc3RpYyBjbGFzc2lmaWVyIHNvIHRoZSBjb21tYW5kIHRleHQgY2FuIHJhaXNlIHRoZSBlZmZlY3QsIGFuZCBuZXZlciBsb3dlciBpdC4gLSAqKmBzcmMvZWZmZWN0cy50c1x1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MTUsInRpdGxlIjoiSGFyZGVuaW5nOiBsb29wIGRldGVjdG9yIHByb2dyZXNzLCByZXNlcnZlZCB0b2tlbiBidWRnZXQsIGdhdGUgb3JkZXIsIHRyaWFnZSBwcm9ncmVzcyB3b3JkaW5nIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzE1IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvaGFyZGVuaW5nLWxvb3AtYnVkZ2V0LWdhdGUiLCJiYXNlIjoibWFpbiIsInNoYSI6ImE5ZjRkZGFhZTIwMTc1NGUyMzdkZmI2YzJiM2FmM2ZlNjM2ZDE4NDEiLCJtZXJnZV9jb21taXRfc2hhIjoiOTIxODYzMzBiYjU1NTgzOThjZWEyZTQwMjc1YzI4ZTI2Yzg3ZjZhMyIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDY6MjI6MzRaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDk6Mjk6MDlaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0yNFQwOToyOTowOVoiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjI5OjA5WiIsImFkZGl0aW9ucyI6ODU0MywiZGVsZXRpb25zIjo0OSwiY2hhbmdlZF9maWxlcyI6MjIsImNvbW1pdHNfY291bnQiOjIsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFBSIDEgb2YgYSA5LXN0YWdlIHJvYWRtYXAgKHJldmlld2VkIGNvZGUgZnJvbSAjMTJcdTIwMTMjMTQsIHRoZW4gcGxhbm5lZCBmaXhlcyBhbmQgZW5oYW5jZW1lbnRzKS4gSGFyZGVuaW5nIG9ubHk6IGl0IGZpeGVzIGRlZmVjdHMgZm91bmQgYnkgcmVhZGluZyBhbmQgcnVubmluZyB0aGUgbWVyZ2VkIGNvZGUsIGFuZCBvbmUgbW9kZWwgbWlzanVkZ21lbnQgZm91bmQgYnkgdGhlIGxpdmUgYmVuY2htYXJrLiAtICoqTG9vcCBkZXRlY3RvciBubyBsb25nZXIgZmxhZ3MgcHJvZ3Jlc3MuKiogRmFpbHVyZSBjb3VudHMgdGhhdCBzdHJpY3RseSBzaHJpbmsgYWNyb3NzIGF0dGVtcHRzICg5IFx1MjE5MiA1IFx1MjE5MiAyIGZhaWxlZCkgd2VyZSByZXBvcnRlZCBhcyBgc2FtZV9mYWlsdXJlYCBiZWNhdXNlIGV2ZXJcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjE0LCJ0aXRsZSI6IkxpdmUgSmV2IHZhbHVlIGJlbmNobWFyayB3aXRoIHJhbmRvbWl6ZWQgY2FzZXMsIHBsdXMgdGhlIGZpeGVzIGFuZCBjYWxpYnJhdGlvbiBpdCBmb3VuZCIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xNCIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L2pldi12YWx1ZS1iZW5jaG1hcmsiLCJiYXNlIjoibWFpbiIsInNoYSI6IjRlYTFiODE2ZTFkMDI5NmUzZWY5MzQzYjE4ZTBiOGM3MTliZWMzMTEiLCJtZXJnZV9jb21taXRfc2hhIjoiN2QyNzM3YmMyMjNjNjc0NmVhMmJjZDhiOWM2YjI4ZGUyNTY5MmMwNiIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjNUMTk6NDU6NTlaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjNUMTk6NDg6NTJaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0yM1QxOTo0ODo1MVoiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTIzVDE5OjQ4OjUxWiIsImFkZGl0aW9ucyI6MjY2OTYsImRlbGV0aW9ucyI6MzAsImNoYW5nZWRfZmlsZXMiOjI5LCJjb21taXRzX2NvdW50IjozLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBUaGlzIFBSIG1lYXN1cmVzIHdoYXQgbGl2ZSBKZXYgYWRkcyBvdmVyIGNoZWFwIGxvY2FsIHJ1bGVzLCBmaXhlcyB0aGUgamV2LW1jcCBkZWZlY3RzIHRoYXQgbWVhc3VyZW1lbnQgZXhwb3NlZCwgYW5kIHJlY2FsaWJyYXRlcyB0aHJlZSBcImxvd2VyIGlzIGJldHRlclwiIHNjb3JlcyBiYXNlZCBvbiB0aGUgZGF0YS4gLSAqKkJlbmNobWFyazoqKiBgbnBtIHJ1biBldmFsOmJvbnVzYC4gTGFiZWxsZWQgcmlza3kvc2FmZSBjYXNlcyBhcmUgZGVjaWRlZCB0aHJlZSB3YXlzOiBieSAqKm5vIGd1YXJkKiosIGJ5IGEgKipydWxlcy1vbmx5IGd1YXJkKiogd2l0aCBubyBtb2RlbCBjYWxsLCBhbmQgYnkgKipsaXZlIEpldioqLiBUaGUgNTEgaGFuZC13cml0dGVuIGNhc2VzIGFyZSBqb2luZWRcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjEzLCJ0aXRsZSI6Ikd1YXJkcmFpbCBoYXJkZW5pbmc6IHBvbGljeSBmaXhlcywgY2FjaGUvYnVkZ2V0L3N0YXRzLCByaXNrLWF3YXJlIGdhdGUsIGxvb3AgZGV0ZWN0b3IiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTMiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC92MC4zLWd1YXJkcmFpbC1oYXJkZW5pbmciLCJiYXNlIjoibWFpbiIsInNoYSI6IjFhNTg1MDAxMmIwODI3NjE5OWYwZjEzYjg0OGEyMjc4NzI2ZGQ5M2QiLCJtZXJnZV9jb21taXRfc2hhIjoiOTdlMWNkMTZmNWFkNjI2Y2ZkNGVkZTc3NjJiNTEzODk3YzQ0NGMzOSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjNUMTg6NDI6MjJaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjNUMTg6NTg6MzBaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0yM1QxODo1ODozMFoiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTIzVDE4OjU4OjMwWiIsImFkZGl0aW9ucyI6MjIzNywiZGVsZXRpb25zIjozNDYsImNoYW5nZWRfZmlsZXMiOjM0LCJjb21taXRzX2NvdW50IjozLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiRm9sbG93cyAjMTIgKHYwLjIgc2NvcGUvdHJpYWdlL3Jpc2sgdG9vbHMpLiBUaGUgcG9saWN5IGZpeGVzIGZvciBkZWZlY3RzIHRoYXQgIzEyIGl0c2VsZiBpbnRyb2R1Y2VkIHdlcmUgbW92ZWQgb250byAjMTIgYmVmb3JlIGl0IG1lcmdlZDogdGhlIHJpc2stZmxhZyBtYXNraW5nLCB0aGUgZXNjYWxhdGlvbiBjdXRvZmYgZm9yIHNjb3BlIGFuZCByaXNrLCB0cmlhZ2UgZXNjYWxhdGlvbiBvcmRlciwgdGhlIGluamVjdGlvbi1iYWNrc3RvcCByZWdyZXNzaW9uIGFuZCB0cmlhZ2UgY2F1c2UtSUQgc2FuaXRpemF0aW9uLiBUaGlzIGJyYW5jaCBhbHJlYWR5IGluY2x1ZGVzIHRoYXQgd29yayB0aHJvdWdoIGEgbWVyZ2UgY29tbWl0LiBXaGF0IHJlbWFpbnMgaGVyZSBpcyB0aGUgaGFyZGVuaW5nIG9mIHByXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoxMiwidGl0bGUiOiJmZWF0OiBhZGQgc2NvcGUsIHRyaWFnZSwgYW5kIHNlY3VyaXR5IHJpc2sgdG9vbHMiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTIiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC92MC4yLWFnZW50LWd1YXJkcmFpbHMiLCJiYXNlIjoibWFpbiIsInNoYSI6ImIwZWFjYjA0M2Q5N2M5YmQzNDE0MGM4MDdlOWU4OGZlYzYxOTQzMGEiLCJtZXJnZV9jb21taXRfc2hhIjoiOGJjYjkyYWQ2Yjg3Yjc3NTlhNmFiOTdjNDg0Zjg3NGRjZDE2ZDM4NSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMTdUMTM6MDQ6MDFaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjNUMTg6NTA6MjVaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0yM1QxODo1MDoyNFoiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTIzVDE4OjUwOjI0WiIsImFkZGl0aW9ucyI6MTU2MiwiZGVsZXRpb25zIjozOCwiY2hhbmdlZF9maWxlcyI6MzMsImNvbW1pdHNfY291bnQiOjIsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFRoaXMgUFIgZXh0ZW5kcyBgamV2LW1jcGAgZnJvbSB0aGUgY29yZSBjb2RpbmcgbG9vcCBpbnRvIHRocmVlIGFkamFjZW50IGRlY2lzaW9uIGJvdW5kYXJpZXM6IDEuICoqYGpldl9zY29wZWAqKiAtIHNlbWFudGljIHByZWZsaWdodCBmb3IgYSBob3N0LXByZXBhcmVkIGFjdGlvbi4gMi4gKipgamV2X3RyaWFnZWAqKiAtIGZhaWx1cmUgY2F1c2UsIGxvb3AgcHJvZ3Jlc3MsIGFuZCByZWNvdmVyeSBzdHJhdGVneS4gMy4gKipgamV2X3Jpc2tgKiogLSBzZWN1cml0eS1mb2N1c2VkIHBhdGNoIHJpc2sgdHJpYWdlLiBUaGUgZXhpc3RpbmcgbmluZSB0b29scyBhbmQgdGhlaXIgcG9saWNpZXMgYXJlIHVuY2hhbmdlZC4gVGhlIHNlcnZlciBub3cgZXhwb3NlcyAqKjEyIHRvb2xzLCAxMVx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MTEsInRpdGxlIjoic2VjdXJpdHk6IGhhcmRlbiB1bnRydXN0ZWQtZGF0YSBoYW5kbGluZyBhbmQgaGVscGVyIGJvdW5kYXJpZXMiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTEiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoic2VjdXJpdHkvaGFyZGVuLXVudHJ1c3RlZC1kYXRhIiwiYmFzZSI6Im1haW4iLCJzaGEiOiJlMGZmNmUzODEyMWNjODE3YjQxOWRiYTE0Y2UwZWNmYzcxNzYxMmY1IiwibWVyZ2VfY29tbWl0X3NoYSI6IjZlY2NiNTIzNDgyM2E5ZjU4ZDlhN2NhYjk1YmY3MWIwNGRmMDBjOTEiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTE3VDEyOjE0OjM0WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTE3VDEyOjM2OjE1WiIsIm1lcmdlZF9hdCI6IjIwMjYtMTAtMTdUMTI6MzY6MTVaIiwiY2xvc2VkX2F0IjoiMjAyNi0xMC0xN1QxMjozNjoxNVoiLCJhZGRpdGlvbnMiOjExMDEsImRlbGV0aW9ucyI6MTg4LCJjaGFuZ2VkX2ZpbGVzIjo2NCwiY29tbWl0c19jb3VudCI6MiwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgVGhpcyBQUiBoYXJkZW5zIHRoZSBib3VuZGFyaWVzIHdoZXJlIGBqZXYtbWNwYCBoYW5kbGVzIHRoaXJkLXBhcnR5IHRleHQsIGhvc3QtcHJlcGFyZWQgdG9vbCBtZXRhZGF0YSwgcHJvdmlkZXIgY3JlZGVudGlhbHMsIGFuZCBhZ2VudCBldmFsdWF0aW9uIGNvZGUuIEl0IGFsc28gZml4ZXMgc2V2ZXJhbCBjb3JyZWN0bmVzcyBkZWZlY3RzIGZvdW5kIGR1cmluZyB0aGUgYXVkaXQuIFRoZSBjaGVja291dCBhbHJlYWR5IGNvbnRhaW5lZCBhIHBlbmRpbmcgcmVtZWRpYXRpb24gYmF0Y2g7IHRoaXMgYnJhbmNoIGJ1aWxkcyBvbiBpdCBhbmQgdHVybnMgdGhlIHdob2xlIHNldCBpbnRvIG9uZSByZXZpZXdlZCBjaGFuZ2UuIE5vIGxpdmUgcHJvdmlkZXIgY2FsbHMgb3IgcHVibGlzaGluZ1x1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfV19 -->
