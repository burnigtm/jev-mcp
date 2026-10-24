# Jev_MCP GitHub watch

**Latest pull request:** [#25 feat: 0.70 default auto_accept (with 0.80 floors for review, claims and unmeasured tools) from a threshold sweep](https://github.com/burnigtm/jev-mcp/pull/25) — **merged** 2026-10-24T11:23:16Z · just now · burnigtm · `feat/threshold-sweep` → `main` · +54708 −78 · 39 files.

Open **0** · Merged **15** · Closed **0** · [Interactive board](github-watch.html)

This is the **Cursor Project dashboard** for [burnigtm/jev-mcp](https://github.com/burnigtm/jev-mcp). Open **Projects → Jev_MCP** (not the Agents list). The latest pull request stays at the top even when the list is long. GitHub Actions refreshes this file on branch `cursor-watch`.

| | |
| --- | --- |
| **Last refresh** | 2026-10-24T11:23:34Z |
| **Data** | GitHub API |
| **Last GitHub event** | `push` |
| **Open PRs** | none |
| **Merged (recent)** | [#25](https://github.com/burnigtm/jev-mcp/pull/25) feat: 0.70 default auto_accept (with 0.80 floors for review, claims and unmeasured tools) from a threshold sweep, [#24](https://github.com/burnigtm/jev-mcp/pull/24) fix: publish the ledger key atomically so racing processes keep their records, [#23](https://github.com/burnigtm/jev-mcp/pull/23) feat: calibrate, jev://ledger resource and SARIF output, [#22](https://github.com/burnigtm/jev-mcp/pull/22) feat: optional caller context for the review tools (opt-in), [#21](https://github.com/burnigtm/jev-mcp/pull/21) feat: pull-request gate (jev-mcp ci) |
| **GitHub `main`** | [`5465949`](https://github.com/burnigtm/jev-mcp/commit/5465949e33137e74f08bba1c6174cad549e0c7f7) |
| **Cursor target** | `bc-c78e565c-bc13-4d27-ada8-cc5e7e04eb9e` |

## Latest

<details open>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/25">#25 feat: 0.70 default auto_accept (with 0.80 floors for review, claims and unmeasured tools) from a threshold sweep — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/threshold-sweep → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T11:23:16Z · just now</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-24T11:23:16Z · just now</td></tr>
<tr><td><strong>Diff</strong></td><td>+54708 −78 · 39 files</td></tr>
<tr><td><strong>Commits</strong></td><td>5</td></tr>
<tr><td><strong>Checks</strong></td><td>1 still running · 6 checks</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/0af1a384124d032c814f5699fced8bfa2355a5b3"><code>0af1a38</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/5465949e33137e74f08bba1c6174cad549e0c7f7"><code>5465949</code></a></td></tr>
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
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40089702103/job/120859697225">publish</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40089702103/job/120859697107">notify</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40089404018/job/120858821832">check (ubuntu-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40089404018/job/120858821731">check (windows-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40089404018/job/120858821700">check (ubuntu-latest, 20)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40089404018/job/120858821591">check (windows-latest, 20)</a> <code>success</code></li>
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

Push to `main` `5465949`.

- Event: `push`
- Ref: `main` SHA [`5465949`](https://github.com/burnigtm/jev-mcp/commit/5465949e33137e74f08bba1c6174cad549e0c7f7)

Search, filters, checks, commits, and files are on the interactive board next to this file. Follow-ups land in the **Jev_MCP Project** chat.

Live Actions: [Notify Jev_MCP](https://github.com/burnigtm/jev-mcp/actions/workflows/notify-jev-mcp.yml).

<!-- jev-watch:snapshot eyJwdWxscyI6W3sibnVtYmVyIjoyNSwidGl0bGUiOiJmZWF0OiAwLjcwIGRlZmF1bHQgYXV0b19hY2NlcHQgKHdpdGggMC44MCBmbG9vcnMgZm9yIHJldmlldywgY2xhaW1zIGFuZCB1bm1lYXN1cmVkIHRvb2xzKSBmcm9tIGEgdGhyZXNob2xkIHN3ZWVwIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzI1IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvdGhyZXNob2xkLXN3ZWVwIiwiYmFzZSI6Im1haW4iLCJzaGEiOiIwYWYxYTM4NDEyNGQwMzJjODE0ZjU2OTlmY2VkOGJmYTIzNTVhNWIzIiwibWVyZ2VfY29tbWl0X3NoYSI6IjU0NjU5NDllMzMxMzdlNzRmMDhiYmExYzYxNzRjYWQ1NDllMGM3ZjciLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTI0VDEwOjAwOjE0WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTI0VDExOjIzOjE2WiIsIm1lcmdlZF9hdCI6IjIwMjYtMTAtMjRUMTE6MjM6MTZaIiwiY2xvc2VkX2F0IjoiMjAyNi0xMC0yNFQxMToyMzoxNloiLCJhZGRpdGlvbnMiOjU0NzA4LCJkZWxldGlvbnMiOjc4LCJjaGFuZ2VkX2ZpbGVzIjozOSwiY29tbWl0c19jb3VudCI6NSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgWW91IGFza2VkIHRvIG1ha2UgMC43MCB0aGUgZGVmYXVsdCBhbmQgdG8gdGVzdCBmYXIgbW9yZSBiZWZvcmUgdHJ1c3RpbmcgaXQuIFRoaXMgUFIgZG9lcyB0aGF0LCBhbmQgdGhlIHRlc3RpbmcgY2hhbmdlZCB0aGUgZGVzaWduOiAqKjAuNzAgaXMgdGhlIGRlZmF1bHQgZm9yIGBqZXZfc2NvcGVgLCBgamV2X3RyaWFnZWAsIGBqZXZfcmlza2AgKGFuZCBgamV2X3JhbmtgKTsgcGF0Y2ggcmV2aWV3LCBjbGFpbXMgYW5kIHRocmVlIHVubWVhc3VyZWQgdG9vbHMga2VlcCAwLjgwLioqICMjIEV2aWRlbmNlIChsaXZlIGBqZXYtMS4xNC4wYCwgZGV0YWlscyBpbiBgZXZhbHMvcmVzdWx0cy9kZWZhdWx0LWJhci0yMDI2LTEwLTI0Lm1kYCkgLSAqKkZpbmFsIGhvbGRvdXQsIGZyZXNoIHNlZVx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbeyJzaGEiOiJjZTAyOTRhNmE1MTllNmY1MGIwMzEwODRiZmUxM2Q0ODY2NDZhYWZkIiwibWVzc2FnZSI6ImZlYXQ6IGZhc3QgcHJvZmlsZSAoYXV0b19hY2NlcHQgMC43MCkgZnJvbSBhIHRocmVzaG9sZCBzd2VlcCwgYW5kIGEgcHJpdmlsZWdlLWJvdW5kYXJ5IGZsb29yIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvY29tbWl0L2NlMDI5NGE2YTUxOWU2ZjUwYjAzMTA4NGJmZTEzZDQ4NjY0NmFhZmQifSx7InNoYSI6IjFkODdlZjA3NDhhMmNlY2Y0OWRhMjdmMWRjNGU3MTc3MjM4MjEyMzIiLCJtZXNzYWdlIjoiY2hvcmU6IHJlbW92ZSBhIHNjcmF0Y2ggYW5hbHlzaXMgc2NyaXB0IiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvY29tbWl0LzFkODdlZjA3NDhhMmNlY2Y0OWRhMjdmMWRjNGU3MTc3MjM4MjEyMzIifSx7InNoYSI6ImNhZTJkNjk5MDRjMGRkMmM5ODA3N2E1YjMyNzI2Zjc2NDg5MTJlYzAiLCJtZXNzYWdlIjoiTWVyZ2UgbWFpbiBpbnRvIGZlYXQvdGhyZXNob2xkLXN3ZWVwIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvY29tbWl0L2NhZTJkNjk5MDRjMGRkMmM5ODA3N2E1YjMyNzI2Zjc2NDg5MTJlYzAifSx7InNoYSI6IjY3ZDg3NDYxZTg5NGVhZGRlOGFkNzc2YjNhZWUzNjdlZWE1MjZhZGMiLCJtZXNzYWdlIjoiZG9jczogYmxhbmsgbGluZSBiZXR3ZWVuIGNoYW5nZWxvZyBzZWN0aW9ucyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2NvbW1pdC82N2Q4NzQ2MWU4OTRlYWRkZThhZDc3NmIzYWVlMzY3ZWVhNTI2YWRjIn0seyJzaGEiOiIwYWYxYTM4NDEyNGQwMzJjODE0ZjU2OTlmY2VkOGJmYTIzNTVhNWIzIiwibWVzc2FnZSI6ImZlYXQ6IG1ha2UgMC43MCB0aGUgZGVmYXVsdCBhdXRvX2FjY2VwdCBmb3IgdGhlIG1lYXN1cmVkIHRvb2xzLCB3aXRoIGZsb29ycyBmb3VuZCBieSB0ZXN0aW5nIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvY29tbWl0LzBhZjFhMzg0MTI0ZDAzMmM4MTRmNTY5OWZjZWQ4YmZhMjM1NWE1YjMifV0sImZpbGVzIjpbeyJmaWxlbmFtZSI6Ii5lbnYuZXhhbXBsZSIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjozLCJkZWxldGlvbnMiOjN9LHsiZmlsZW5hbWUiOiJkb2NzL2FyY2hpdGVjdHVyZS5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoxLCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJkb2NzL2NoYW5nZWxvZy5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo5LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJkb2NzL2NvbmZpZ3VyYXRpb24ubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTQsImRlbGV0aW9ucyI6MTB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL2RlZmF1bHQtYmFyLTIwMjYtMTAtMjQuanNvbiIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo0NTU0NSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy9kZWZhdWx0LWJhci0yMDI2LTEwLTI0Lm1kIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjY3LCJkZWxldGlvbnMiOjB9LHsiZmlsZW5hbWUiOiJldmFscy9yZXN1bHRzL3RocmVzaG9sZC0yMDI2LTEwLTI0Lmpzb24iLCJzdGF0dXMiOiJhZGRlZCIsImFkZGl0aW9ucyI6NzYwNCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZXZhbHMvcmVzdWx0cy90aHJlc2hvbGQtMjAyNi0xMC0yNC5tZCIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjo1MSwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic2NyaXB0cy9ldmFsLWJvbnVzLm1qcyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjoyLCJkZWxldGlvbnMiOjJ9LHsiZmlsZW5hbWUiOiJzY3JpcHRzL2V2YWwtdGhyZXNob2xkLm1qcyIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoxNjMsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNjcmlwdHMvbGliL2JvbnVzLWJsaW5kLm1qcyIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoxNDcsImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNjcmlwdHMvbGliL2JvbnVzLWdlbmVyYXRvci5tanMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTksImRlbGV0aW9ucyI6MX1dLCJjaGVja3MiOlt7Im5hbWUiOiJwdWJsaXNoIiwic3RhdGUiOiJpbl9wcm9ncmVzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4OTcwMjEwMy9qb2IvMTIwODU5Njk3MjI1In0seyJuYW1lIjoibm90aWZ5Iiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDg5NzAyMTAzL2pvYi8xMjA4NTk2OTcxMDcifSx7Im5hbWUiOiJjaGVjayAodWJ1bnR1LWxhdGVzdCwgMjIpIiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDg5NDA0MDE4L2pvYi8xMjA4NTg4MjE4MzIifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4OTQwNDAxOC9qb2IvMTIwODU4ODIxNzMxIn0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4OTQwNDAxOC9qb2IvMTIwODU4ODIxNzAwIn0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwODk0MDQwMTgvam9iLzEyMDg1ODgyMTU5MSJ9XX0seyJudW1iZXIiOjI0LCJ0aXRsZSI6ImZpeDogcHVibGlzaCB0aGUgbGVkZ2VyIGtleSBhdG9taWNhbGx5IHNvIHJhY2luZyBwcm9jZXNzZXMga2VlcCB0aGVpciByZWNvcmRzIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzI0IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZpeC9sZWRnZXIta2V5LXJhY2UiLCJiYXNlIjoibWFpbiIsInNoYSI6IjAxOGViZTVkZDE1Mjg1MDY2ZWJiNWNkNGUzYjA0ODFjODhiMmExZmYiLCJtZXJnZV9jb21taXRfc2hhIjoiZTFiYmFmOTM4ODc5ZDc2NjU1NzhmZDEwNzY1NDk3MDMyOTZlZDM2MSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDk6NDg6NTZaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMTA6MDA6MjdaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0yNFQxMDowMDoyN1oiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTI0VDEwOjAwOjI3WiIsImFkZGl0aW9ucyI6OTUsImRlbGV0aW9ucyI6MTIsImNoYW5nZWRfZmlsZXMiOjQsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiJUaGUgZmxha3kgV2luZG93cyBDSSBmYWlsdXJlIGBzZXZlcmFsIHByb2Nlc3NlcyBhcHBlbmRpbmcgYXQgb25jZSBuZXZlciBwcm9kdWNlIGEgcGFydGlhbCBvciBjb3JydXB0IGxpbmVgICgyMzkgb2YgMjQwIGxpbmVzKSB3YXMgYSByZWFsIHJhY2UsIG5vdCB0ZXN0IGZsYWtpbmVzczogdGhlIGxlZGdlciBrZXkgd2FzIGNyZWF0ZWQgZW1wdHkgYW5kIHRoZW4gZmlsbGVkLCBzbyBhIHByb2Nlc3MgcmVhZGluZyBpdCBpbiBiZXR3ZWVuIGZvdW5kIGFuIGludmFsaWQga2V5IGFuZCBkcm9wcGVkIGl0cyByZWNvcmQuICoqRml4OioqIHdyaXRlIHRoZSBrZXkgdG8gYSBwcml2YXRlIHRlbXBvcmFyeSBmaWxlIGFuZCBsaW5rIGl0IGludG8gcGxhY2UgKGV4YWN0bHkgb25lIHJhY2luZyBwcm9jZXNzIHdpbnNcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjIzLCJ0aXRsZSI6ImZlYXQ6IGNhbGlicmF0ZSwgamV2Oi8vbGVkZ2VyIHJlc291cmNlIGFuZCBTQVJJRiBvdXRwdXQiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMjMiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC9jYWxpYnJhdGUtc2FyaWYiLCJiYXNlIjoibWFpbiIsInNoYSI6IjdhZmQwODMyNWVhMGE2ZjU2Njc3MWZhZmQyNjVlNjAwMGM2ODg5ODQiLCJtZXJnZV9jb21taXRfc2hhIjoiNTVhZjkwN2IzNjBkOGY2OWRjZWJkMjZmMmVmMmEwZDcwYTI0MDg2OCIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDk6MjM6MzBaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDk6Mzc6MTVaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0yNFQwOTozNzoxNVoiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjM3OjE1WiIsImFkZGl0aW9ucyI6NjcwLCJkZWxldGlvbnMiOjgsImNoYW5nZWRfZmlsZXMiOjEyLCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBQUiA5ICh0aGUgbGFzdCkgb2YgdGhlIHJvYWRtYXAsICoqc3RhY2tlZCBvbiAjMjIqKi4gLSAqKmBqZXYtbWNwIGNhbGlicmF0ZSBbLS1kaXJdIFstLXNpbmNlIFlZWVktTU1dIFstLW1pbi1zYW1wbGUgTl0gWy0tanNvbl1gKio6IHBlci10b29sIGFjdGlvbiBtaXggYW5kIHJldmlldy9lc2NhbGF0ZSByYXRlcywgbGFiZWxlZCBvdXRjb21lcyBmcm9tIGBqZXZfZmVlZGJhY2tgLCBmYWxzZS1hbGFybSByYXRlIChhbW9uZyBsYWJlbGVkIGhvbGRzKSBhbmQgbWlzcyByYXRlIChhbW9uZyBsYWJlbGVkIGFwcHJvdmFscyksIGZhbHNlLWFsYXJtIHJhdGUgYnkgcmVhc29uIGNvZGUsIGFuZCBpbnB1dHMgdGhhdCBnb3QgZGlmZmVyZW50IGFjdGlvbnMuICoqT25seSBsYWJlbGVkIGRlY2lzXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoyMiwidGl0bGUiOiJmZWF0OiBvcHRpb25hbCBjYWxsZXIgY29udGV4dCBmb3IgdGhlIHJldmlldyB0b29scyAob3B0LWluKSIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8yMiIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L2NhbGxlci1jb250ZXh0IiwiYmFzZSI6Im1haW4iLCJzaGEiOiI4MTNlNGY0YWFiYzRlOGQ1ZDJkYzI4ZjU4MDY3OTA3ZTBlMGNiY2M3IiwibWVyZ2VfY29tbWl0X3NoYSI6ImJiMjkyYTViODI4NWZkOTdkNjljZjllZWZjNjg3MzlmMGNiNmJjNWQiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjE4OjAyWiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjMwOjMwWiIsIm1lcmdlZF9hdCI6IjIwMjYtMTAtMjRUMDk6MzA6MzBaIiwiY2xvc2VkX2F0IjoiMjAyNi0xMC0yNFQwOTozMDozMFoiLCJhZGRpdGlvbnMiOjE2NzQsImRlbGV0aW9ucyI6MjksImNoYW5nZWRfZmlsZXMiOjI0LCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBQUiA4IG9mIHRoZSByb2FkbWFwLCAqKnN0YWNrZWQgb24gIzIxKiouIE9wdGlvbmFsIGV2aWRlbmNlIGFib3V0IHdoZXJlIGNoYW5nZWQgY29kZSBpcyB1c2VkLCBmb3IgdGhlIHJldmlldyB0b29scy4gKipBIG5lZ2F0aXZlIHJlc3VsdCwgc2hpcHBlZCBvcHQtaW4gYW5kIG9mZiBieSBkZWZhdWx0LioqIC0gYGpldl9yZXZpZXdgLCBgamV2X3Jpc2tgLCBgamV2X2dhdGVgIGFjY2VwdCBgY29udGV4dC5jYWxsZXJzYCAodXAgdG8gNDAgYHsgcGF0aCwgbGluZT8sIHRleHQsIHN5bWJvbD8gfWApLiBUaGUgc2VydmVyIG5ldmVyIHNlYXJjaGVzIHRoZSByZXBvIGl0c2VsZjsgdGhlIGhvc3Qgc3VwcGxpZXMgdGhlIGxpc3QuIFNuaXBwZXRzIGFyZSB1bnRydXN0ZWQ6IHNhbml0aXplZCxcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjIxLCJ0aXRsZSI6ImZlYXQ6IHB1bGwtcmVxdWVzdCBnYXRlIChqZXYtbWNwIGNpKSIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8yMSIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L2NpLWdhdGUiLCJiYXNlIjoibWFpbiIsInNoYSI6ImExZDM0MDI2Y2YzYjczZDBjNGUwMDdiMTI4MTRhOTljYmNjNzIzM2MiLCJtZXJnZV9jb21taXRfc2hhIjoiNDIzMjA2ZDgwNjljYTk5NDQ1MWZhNTRhZmU5NDkwMDNmYjc1MWVmYSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDk6MDU6MTdaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDk6MzA6MjJaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0yNFQwOTozMDoyMloiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjMwOjIyWiIsImFkZGl0aW9ucyI6MTI4OCwiZGVsZXRpb25zIjoxMiwiY2hhbmdlZF9maWxlcyI6MTQsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFBSIDcgb2YgdGhlIHJvYWRtYXAsICoqc3RhY2tlZCBvbiAjMjAqKi4gYGpldi1tY3AgY2lgIGlzIHRoZSBwdWxsLXJlcXVlc3QgZ2F0ZTogaXQgYW5zd2VycyBgYXV0b2AsIGByZXZpZXdgIG9yIGBlc2NhbGF0ZWAgKGV4aXQgMCwgMTAsIDIwOyAyIG9uIGFueSBlcnJvciwgZmFpbC1jbG9zZWQpIGFuZCBuZXZlciBydW5zIHRoZSBwdWxsIHJlcXVlc3QncyBjb2RlLiAtICoqUG9saWN5IGZyb20gdGhlIGJhc2UgcmVmLioqIGAuamV2LXBvbGljeS5qc29uYCBpcyByZWFkIHdpdGggYGdpdCBzaG93IEJBU0U6Li4uYCwgc28gYSBwdWxsIHJlcXVlc3QgY2Fubm90IGxvb3NlbiBpdHMgb3duIHJ1bGVzOyBjaGFuZ2luZyB0aGUgZmlsZSBob2xkcywgYSBicm9rZW4gb25lIGhvbGRzLiBFdmVcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjIwLCJ0aXRsZSI6ImZlYXQ6IGVuZm9yY2VkIENsYXVkZSBDb2RlIGhvb2tzIGFuZCBqZXYtbWNwIGNoZWNrIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzIwIiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvY2hlY2stYW5kLWhvb2tzIiwiYmFzZSI6Im1haW4iLCJzaGEiOiIzYzNmODdlNzJiYjMxNzg2N2ZmOGQ1OTI0MzJlZmM4ZmFkMDY4YjEwIiwibWVyZ2VfY29tbWl0X3NoYSI6IjJmZWU3ZTgzYzIxMjJiYTM3Zjg3ZGY2NTcxMDExYjA5NWRiM2FlNjIiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA4OjAyOjU5WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjMwOjE1WiIsIm1lcmdlZF9hdCI6IjIwMjYtMTAtMjRUMDk6MzA6MTVaIiwiY2xvc2VkX2F0IjoiMjAyNi0xMC0yNFQwOTozMDoxNVoiLCJhZGRpdGlvbnMiOjcxODEsImRlbGV0aW9ucyI6MCwiY2hhbmdlZF9maWxlcyI6MTksImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFBSIDYgb2YgdGhlIHJvYWRtYXAsICoqc3RhY2tlZCBvbiAjMTkqKi4gTWFrZXMgdGhlIGd1YXJkIHJ1biBvbiBldmVyeSB0b29sIGNhbGwgaW4gQ2xhdWRlIENvZGUgaW5zdGVhZCBvZiBiZWluZyBhZHZpc29yeS4gLSAqKmBqZXYtbWNwIGhvb2sgcHJlLXRvb2wtdXNlYCoqOiBjbGFzc2lmaWVyIGFuZCByZXBvc2l0b3J5IHBvbGljeSBmaXJzdDsgYSBjb25maXJtZWQgcmVhZC1vbmx5IGNvbW1hbmQgaXMgc2lsZW50IHdpdGggbm8gbW9kZWwgY2FsbDsgcmVhZHMgb2Yga2V5L2NyZWRlbnRpYWwgZmlsZXMgYW5kIGVkaXRzIHRvIHRoZSBndWFyZCdzIG93biBjb25maWcgYXNrIHdpdGhvdXQgYSBtb2RlbDsgb25seSB0aGUgZ3JheSB6b25lIGNhbGxzIGBqZXZfc2NvcGVgLiBBIGhvb2tcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjE5LCJ0aXRsZSI6ImZlYXQ6IGNodW5rZWQgcmV2aWV3IGZvciBkaWZmcyB0b28gbGFyZ2UgZm9yIG9uZSByZXF1ZXN0Iiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzE5IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvbGFyZ2UtZGlmZi1yZXZpZXciLCJiYXNlIjoibWFpbiIsInNoYSI6ImY0ZjNhOTI4MjkwZjJiMjBiZWMxZDJhMWZjYzUwODE1YzFiNmQxNDUiLCJtZXJnZV9jb21taXRfc2hhIjoiODRlMjNkODEwODg3ZWY1NWNiNmVhODFlZDNjYTMwMzFlYTIwNGZhMyIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDc6NDM6NDRaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDk6MzA6MDhaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0yNFQwOTozMDowN1oiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjMwOjA3WiIsImFkZGl0aW9ucyI6MzgzMSwiZGVsZXRpb25zIjo3NCwiY2hhbmdlZF9maWxlcyI6MjQsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFBSIDUgb2YgdGhlIHJvYWRtYXAuICoqU3RhY2tlZCBvbiAjMTgqKiAoYmFzZSBpcyB0aGF0IGJyYW5jaDsgR2l0SHViIHJldGFyZ2V0cyBpdCBhcyB0aGUgc3RhY2sgbWVyZ2VzKS4gVW50aWwgbm93IGEgZGlmZiBwYXN0IGFib3V0IDMxLjhrIGVzdGltYXRlZCB0b2tlbnMgd2FzIGN1dCBvZmYgYXQgdGhlIHRhaWwgYW5kIGNvdWxkIG5ldmVyIGJlIGBhdXRvYCwgc28gYSBsYXJnZSBjaGFuZ2Ugd2FzIHVucmV2aWV3YWJsZSBhbmQgYSBkZWZlY3QgcGFzdCB0aGUgY3V0IHdhcyBpbnZpc2libGUuIGBqZXZfcmV2aWV3YCwgYGpldl9yaXNrYCBhbmQgYGpldl9nYXRlYCBub3cgcmV2aWV3IGl0IGluIHBhcnRzLiAtICoqU3BsaXQgYWxvbmcgZmlsZSBib3VuZGFyaWVzLioqIEEgbG9zc2xcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjE4LCJ0aXRsZSI6IlJlcG9zaXRvcnkgcG9saWN5IGZpbGUsIHByb2ZpbGVzLCBhbmQgYSBkZWRpY2F0ZWQgdHJpYWdlIHJlY292ZXJhYmlsaXR5IGJhciIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xOCIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L3JlcG8tcG9saWN5LXByb2ZpbGVzIiwiYmFzZSI6Im1haW4iLCJzaGEiOiI5OWFlMTU2Mjk5ZDRiZTljZTNhNjYzMjVkODhkNTkwYjkwMjdkZjg0IiwibWVyZ2VfY29tbWl0X3NoYSI6ImU3NTc0NzAzZmYzMGYxZTBkZTcyMjkyMzY1ZTMzYzRhNGVkNjBmZTEiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA3OjA5OjIxWiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjMwOjAwWiIsIm1lcmdlZF9hdCI6IjIwMjYtMTAtMjRUMDk6Mjk6NTlaIiwiY2xvc2VkX2F0IjoiMjAyNi0xMC0yNFQwOTozMDowMFoiLCJhZGRpdGlvbnMiOjI2MTI0LCJkZWxldGlvbnMiOjQzLCJjaGFuZ2VkX2ZpbGVzIjoyNCwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgUFIgNCBvZiB0aGUgcm9hZG1hcC4gKipTdGFja2VkIG9uICMxNyoqIChiYXNlIGlzIHRoYXQgYnJhbmNoOyBHaXRIdWIgcmV0YXJnZXRzIGl0IGFzIHRoZSBzdGFjayBtZXJnZXMpLiBBZGRzIHRoZSBkZXRlcm1pbmlzdGljIGxheWVyIHRoZSBob29rcyBhbmQgQ0kgd2lsbCB1c2UsIGFuZCBzZXR0bGVzIHRoZSBvcGVuIFwidHJpYWdlIGJhclwiIGFuZCBcInN0cmljdCBwcm9maWxlXCIgcXVlc3Rpb25zIHdpdGggbWVhc3VyZW1lbnRzIGluc3RlYWQgb2YgYXJndW1lbnQuIC0gKipgLmpldi1wb2xpY3kuanNvbmAqKiwgZXZhbHVhdGVkIGJ5IGBqZXZfc2NvcGVgIGJlZm9yZSBhbnkgSmV2IHJlcXVlc3Q6IC0gYHByb3RlY3RlZF9wYXRoc2A6IGdsb2JzIHdpdGggYSBgcmV2aWV3YCBvciBgZGVcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjE3LCJ0aXRsZSI6IkRlY2lzaW9uIGxlZGdlcjogZGVjaXNpb25faWQgb24gZXZlcnkgcmVzdWx0IGFuZCBqZXZfZmVlZGJhY2siLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTciLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC9kZWNpc2lvbi1sZWRnZXIiLCJiYXNlIjoibWFpbiIsInNoYSI6IjUwNmY3MzgwMGU2YjQ0OTU3ZjYwZTZlMGM1MmQ1MzAwZDhkMjJkMzciLCJtZXJnZV9jb21taXRfc2hhIjoiYTJjZjZhNjg5YmY2ZjJmMjYyZTdiODc1YmEyMDJmNGYzOWZiMjAzYyIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDY6NDk6MDdaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDk6Mjk6NTJaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0yNFQwOToyOTo1MloiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjI5OjUyWiIsImFkZGl0aW9ucyI6Nzc1OSwiZGVsZXRpb25zIjoxMywiY2hhbmdlZF9maWxlcyI6MzIsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFBSIDMgb2YgdGhlIHJvYWRtYXAuICoqU3RhY2tlZCBvbiAjMTYqKiAoYmFzZSBpcyB0aGF0IGJyYW5jaDsgR2l0SHViIHJldGFyZ2V0cyBpdCBhcyB0aGUgc3RhY2sgbWVyZ2VzKS4gTm90aGluZyByZWNvcmRzIEpldidzIGRlY2lzaW9ucyBvciB3aGV0aGVyIHRoZXkgd2VyZSByaWdodCwgc28gcmVhbC1saWZlIGZhbHNlLWFsYXJtIHJhdGVzIGFyZSB1bmtub3duIGFuZCBldmVyeSB0aHJlc2hvbGQgcXVlc3Rpb24gKHN1Y2ggYXMgdGhlIHRyaWFnZSBiYXIpIGNhbiBvbmx5IGJlIGFyZ3VlZCBmcm9tIHN5bnRoZXRpYyBiZW5jaG1hcmtzLiBUaGlzIGFkZHMgdGhlIG1lYXN1cmVtZW50IGxheWVyIHRoZSBsYXRlciBQUnMgKGhvb2tzLCBDSSkgd2lsbCBsb2cgaW50by4gLSAqKmBkZWNcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjE2LCJ0aXRsZSI6IkNvbW1hbmQgZWZmZWN0IGNsYXNzaWZpZXI6IHRoZSBjb21tYW5kIHRleHQgY2FuIHJhaXNlIGEgZGVjbGFyZWQgZWZmZWN0Iiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzE2IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvY29tbWFuZC1lZmZlY3QtY2xhc3NpZmllciIsImJhc2UiOiJtYWluIiwic2hhIjoiMDBkYTc0ZTk2N2ZlODhjN2M4ZWRhMmI0MzNjZGIxNWZiZGViYWY0NyIsIm1lcmdlX2NvbW1pdF9zaGEiOiJlZjY5MGEyN2RkN2I1OTI1YTI5NjAzM2UyYjZmYWEyMGE5ZDUzZDUzIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yNFQwNjozODoyM1oiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yNFQwOToyOTo0NVoiLCJtZXJnZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjI5OjQ0WiIsImNsb3NlZF9hdCI6IjIwMjYtMTAtMjRUMDk6Mjk6NDRaIiwiYWRkaXRpb25zIjo4MTcwLCJkZWxldGlvbnMiOjksImNoYW5nZWRfZmlsZXMiOjE2LCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBQUiAyIG9mIHRoZSByb2FkbWFwLiAqKlN0YWNrZWQgb24gIzE1KiogKGJhc2UgaXMgdGhhdCBicmFuY2g7IEdpdEh1YiB3aWxsIHJldGFyZ2V0IHRoaXMgdG8gYG1haW5gIG9uY2UgIzE1IG1lcmdlcykuIGBqZXZfc2NvcGVgIHRydXN0ZWQgdGhlIGhvc3QtZGVjbGFyZWQgYGVmZmVjdGA6IGByZWFkX29ubHlgICsgYHJtIC1yZiBidWlsZCAmJiBnaXQgcHVzaCAtLWZvcmNlYCByZXR1cm5lZCBgYXV0b2Agd2hlbmV2ZXIgdGhlIGp1ZGdlJ3MgYW5zd2VycyB3ZXJlIGNsZWFuLiBUaGlzIGFkZHMgYSBkZXRlcm1pbmlzdGljIGNsYXNzaWZpZXIgc28gdGhlIGNvbW1hbmQgdGV4dCBjYW4gcmFpc2UgdGhlIGVmZmVjdCwgYW5kIG5ldmVyIGxvd2VyIGl0LiAtICoqYHNyYy9lZmZlY3RzLnRzXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoxNSwidGl0bGUiOiJIYXJkZW5pbmc6IGxvb3AgZGV0ZWN0b3IgcHJvZ3Jlc3MsIHJlc2VydmVkIHRva2VuIGJ1ZGdldCwgZ2F0ZSBvcmRlciwgdHJpYWdlIHByb2dyZXNzIHdvcmRpbmciLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTUiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC9oYXJkZW5pbmctbG9vcC1idWRnZXQtZ2F0ZSIsImJhc2UiOiJtYWluIiwic2hhIjoiYTlmNGRkYWFlMjAxNzU0ZTIzN2RmYjZjMmIzYWYzZmU2MzZkMTg0MSIsIm1lcmdlX2NvbW1pdF9zaGEiOiI5MjE4NjMzMGJiNTU1ODM5OGNlYTJlNDAyNzVjMjhlMjZjODdmNmEzIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yNFQwNjoyMjozNFoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yNFQwOToyOTowOVoiLCJtZXJnZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjI5OjA5WiIsImNsb3NlZF9hdCI6IjIwMjYtMTAtMjRUMDk6Mjk6MDlaIiwiYWRkaXRpb25zIjo4NTQzLCJkZWxldGlvbnMiOjQ5LCJjaGFuZ2VkX2ZpbGVzIjoyMiwiY29tbWl0c19jb3VudCI6MiwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgUFIgMSBvZiBhIDktc3RhZ2Ugcm9hZG1hcCAocmV2aWV3ZWQgY29kZSBmcm9tICMxMlx1MjAxMyMxNCwgdGhlbiBwbGFubmVkIGZpeGVzIGFuZCBlbmhhbmNlbWVudHMpLiBIYXJkZW5pbmcgb25seTogaXQgZml4ZXMgZGVmZWN0cyBmb3VuZCBieSByZWFkaW5nIGFuZCBydW5uaW5nIHRoZSBtZXJnZWQgY29kZSwgYW5kIG9uZSBtb2RlbCBtaXNqdWRnbWVudCBmb3VuZCBieSB0aGUgbGl2ZSBiZW5jaG1hcmsuIC0gKipMb29wIGRldGVjdG9yIG5vIGxvbmdlciBmbGFncyBwcm9ncmVzcy4qKiBGYWlsdXJlIGNvdW50cyB0aGF0IHN0cmljdGx5IHNocmluayBhY3Jvc3MgYXR0ZW1wdHMgKDkgXHUyMTkyIDUgXHUyMTkyIDIgZmFpbGVkKSB3ZXJlIHJlcG9ydGVkIGFzIGBzYW1lX2ZhaWx1cmVgIGJlY2F1c2UgZXZlclx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MTQsInRpdGxlIjoiTGl2ZSBKZXYgdmFsdWUgYmVuY2htYXJrIHdpdGggcmFuZG9taXplZCBjYXNlcywgcGx1cyB0aGUgZml4ZXMgYW5kIGNhbGlicmF0aW9uIGl0IGZvdW5kIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzE0IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvamV2LXZhbHVlLWJlbmNobWFyayIsImJhc2UiOiJtYWluIiwic2hhIjoiNGVhMWI4MTZlMWQwMjk2ZTNlZjkzNDNiMThlMGI4YzcxOWJlYzMxMSIsIm1lcmdlX2NvbW1pdF9zaGEiOiI3ZDI3MzdiYzIyM2M2NzQ2ZWEyYmNkOGI5YzZiMjhkZTI1NjkyYzA2IiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yM1QxOTo0NTo1OVoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yM1QxOTo0ODo1MloiLCJtZXJnZWRfYXQiOiIyMDI2LTEwLTIzVDE5OjQ4OjUxWiIsImNsb3NlZF9hdCI6IjIwMjYtMTAtMjNUMTk6NDg6NTFaIiwiYWRkaXRpb25zIjoyNjY5NiwiZGVsZXRpb25zIjozMCwiY2hhbmdlZF9maWxlcyI6MjksImNvbW1pdHNfY291bnQiOjMsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFRoaXMgUFIgbWVhc3VyZXMgd2hhdCBsaXZlIEpldiBhZGRzIG92ZXIgY2hlYXAgbG9jYWwgcnVsZXMsIGZpeGVzIHRoZSBqZXYtbWNwIGRlZmVjdHMgdGhhdCBtZWFzdXJlbWVudCBleHBvc2VkLCBhbmQgcmVjYWxpYnJhdGVzIHRocmVlIFwibG93ZXIgaXMgYmV0dGVyXCIgc2NvcmVzIGJhc2VkIG9uIHRoZSBkYXRhLiAtICoqQmVuY2htYXJrOioqIGBucG0gcnVuIGV2YWw6Ym9udXNgLiBMYWJlbGxlZCByaXNreS9zYWZlIGNhc2VzIGFyZSBkZWNpZGVkIHRocmVlIHdheXM6IGJ5ICoqbm8gZ3VhcmQqKiwgYnkgYSAqKnJ1bGVzLW9ubHkgZ3VhcmQqKiB3aXRoIG5vIG1vZGVsIGNhbGwsIGFuZCBieSAqKmxpdmUgSmV2KiouIFRoZSA1MSBoYW5kLXdyaXR0ZW4gY2FzZXMgYXJlIGpvaW5lZFx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MTMsInRpdGxlIjoiR3VhcmRyYWlsIGhhcmRlbmluZzogcG9saWN5IGZpeGVzLCBjYWNoZS9idWRnZXQvc3RhdHMsIHJpc2stYXdhcmUgZ2F0ZSwgbG9vcCBkZXRlY3RvciIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xMyIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L3YwLjMtZ3VhcmRyYWlsLWhhcmRlbmluZyIsImJhc2UiOiJtYWluIiwic2hhIjoiMWE1ODUwMDEyYjA4Mjc2MTk5ZjBmMTNiODQ4YTIyNzg3MjZkZDkzZCIsIm1lcmdlX2NvbW1pdF9zaGEiOiI5N2UxY2QxNmY1YWQ2MjZjZmQ0ZWRlNzc2MmI1MTM4OTdjNDQ0YzM5IiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yM1QxODo0MjoyMloiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yM1QxODo1ODozMFoiLCJtZXJnZWRfYXQiOiIyMDI2LTEwLTIzVDE4OjU4OjMwWiIsImNsb3NlZF9hdCI6IjIwMjYtMTAtMjNUMTg6NTg6MzBaIiwiYWRkaXRpb25zIjoyMjM3LCJkZWxldGlvbnMiOjM0NiwiY2hhbmdlZF9maWxlcyI6MzQsImNvbW1pdHNfY291bnQiOjMsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiJGb2xsb3dzICMxMiAodjAuMiBzY29wZS90cmlhZ2UvcmlzayB0b29scykuIFRoZSBwb2xpY3kgZml4ZXMgZm9yIGRlZmVjdHMgdGhhdCAjMTIgaXRzZWxmIGludHJvZHVjZWQgd2VyZSBtb3ZlZCBvbnRvICMxMiBiZWZvcmUgaXQgbWVyZ2VkOiB0aGUgcmlzay1mbGFnIG1hc2tpbmcsIHRoZSBlc2NhbGF0aW9uIGN1dG9mZiBmb3Igc2NvcGUgYW5kIHJpc2ssIHRyaWFnZSBlc2NhbGF0aW9uIG9yZGVyLCB0aGUgaW5qZWN0aW9uLWJhY2tzdG9wIHJlZ3Jlc3Npb24gYW5kIHRyaWFnZSBjYXVzZS1JRCBzYW5pdGl6YXRpb24uIFRoaXMgYnJhbmNoIGFscmVhZHkgaW5jbHVkZXMgdGhhdCB3b3JrIHRocm91Z2ggYSBtZXJnZSBjb21taXQuIFdoYXQgcmVtYWlucyBoZXJlIGlzIHRoZSBoYXJkZW5pbmcgb2YgcHJcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjEyLCJ0aXRsZSI6ImZlYXQ6IGFkZCBzY29wZSwgdHJpYWdlLCBhbmQgc2VjdXJpdHkgcmlzayB0b29scyIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xMiIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L3YwLjItYWdlbnQtZ3VhcmRyYWlscyIsImJhc2UiOiJtYWluIiwic2hhIjoiYjBlYWNiMDQzZDk3YzliZDM0MTQwYzgwN2U5ZTg4ZmVjNjE5NDMwYSIsIm1lcmdlX2NvbW1pdF9zaGEiOiI4YmNiOTJhZDZiODdiNzc1OWE2YWI5N2M0ODRmODc0ZGNkMTZkMzg1IiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0xN1QxMzowNDowMVoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yM1QxODo1MDoyNVoiLCJtZXJnZWRfYXQiOiIyMDI2LTEwLTIzVDE4OjUwOjI0WiIsImNsb3NlZF9hdCI6IjIwMjYtMTAtMjNUMTg6NTA6MjRaIiwiYWRkaXRpb25zIjoxNTYyLCJkZWxldGlvbnMiOjM4LCJjaGFuZ2VkX2ZpbGVzIjozMywiY29tbWl0c19jb3VudCI6MiwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgVGhpcyBQUiBleHRlbmRzIGBqZXYtbWNwYCBmcm9tIHRoZSBjb3JlIGNvZGluZyBsb29wIGludG8gdGhyZWUgYWRqYWNlbnQgZGVjaXNpb24gYm91bmRhcmllczogMS4gKipgamV2X3Njb3BlYCoqIC0gc2VtYW50aWMgcHJlZmxpZ2h0IGZvciBhIGhvc3QtcHJlcGFyZWQgYWN0aW9uLiAyLiAqKmBqZXZfdHJpYWdlYCoqIC0gZmFpbHVyZSBjYXVzZSwgbG9vcCBwcm9ncmVzcywgYW5kIHJlY292ZXJ5IHN0cmF0ZWd5LiAzLiAqKmBqZXZfcmlza2AqKiAtIHNlY3VyaXR5LWZvY3VzZWQgcGF0Y2ggcmlzayB0cmlhZ2UuIFRoZSBleGlzdGluZyBuaW5lIHRvb2xzIGFuZCB0aGVpciBwb2xpY2llcyBhcmUgdW5jaGFuZ2VkLiBUaGUgc2VydmVyIG5vdyBleHBvc2VzICoqMTIgdG9vbHMsIDExXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoxMSwidGl0bGUiOiJzZWN1cml0eTogaGFyZGVuIHVudHJ1c3RlZC1kYXRhIGhhbmRsaW5nIGFuZCBoZWxwZXIgYm91bmRhcmllcyIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xMSIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJzZWN1cml0eS9oYXJkZW4tdW50cnVzdGVkLWRhdGEiLCJiYXNlIjoibWFpbiIsInNoYSI6ImUwZmY2ZTM4MTIxY2M4MTdiNDE5ZGJhMTRjZTBlY2ZjNzE3NjEyZjUiLCJtZXJnZV9jb21taXRfc2hhIjoiNmVjY2I1MjM0ODIzYTlmNThkOWE3Y2FiOTViZjcxYjA0ZGYwMGM5MSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMTdUMTI6MTQ6MzRaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMTdUMTI6MzY6MTVaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0xN1QxMjozNjoxNVoiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTE3VDEyOjM2OjE1WiIsImFkZGl0aW9ucyI6MTEwMSwiZGVsZXRpb25zIjoxODgsImNoYW5nZWRfZmlsZXMiOjY0LCJjb21taXRzX2NvdW50IjoyLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBUaGlzIFBSIGhhcmRlbnMgdGhlIGJvdW5kYXJpZXMgd2hlcmUgYGpldi1tY3BgIGhhbmRsZXMgdGhpcmQtcGFydHkgdGV4dCwgaG9zdC1wcmVwYXJlZCB0b29sIG1ldGFkYXRhLCBwcm92aWRlciBjcmVkZW50aWFscywgYW5kIGFnZW50IGV2YWx1YXRpb24gY29kZS4gSXQgYWxzbyBmaXhlcyBzZXZlcmFsIGNvcnJlY3RuZXNzIGRlZmVjdHMgZm91bmQgZHVyaW5nIHRoZSBhdWRpdC4gVGhlIGNoZWNrb3V0IGFscmVhZHkgY29udGFpbmVkIGEgcGVuZGluZyByZW1lZGlhdGlvbiBiYXRjaDsgdGhpcyBicmFuY2ggYnVpbGRzIG9uIGl0IGFuZCB0dXJucyB0aGUgd2hvbGUgc2V0IGludG8gb25lIHJldmlld2VkIGNoYW5nZS4gTm8gbGl2ZSBwcm92aWRlciBjYWxscyBvciBwdWJsaXNoaW5nXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119XX0= -->
