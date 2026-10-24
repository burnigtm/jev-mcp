# Jev_MCP GitHub watch

**Latest pull request:** [#23 feat: calibrate, jev://ledger resource and SARIF output](https://github.com/burnigtm/jev-mcp/pull/23) — **merged** 2026-10-24T09:37:15Z · just now · burnigtm · `feat/calibrate-sarif` → `main` · +670 −8 · 12 files.

Open **0** · Merged **15** · Closed **0** · [Interactive board](github-watch.html)

This is the **Cursor Project dashboard** for [burnigtm/jev-mcp](https://github.com/burnigtm/jev-mcp). Open **Projects → Jev_MCP** (not the Agents list). The latest pull request stays at the top even when the list is long. GitHub Actions refreshes this file on branch `cursor-watch`.

| | |
| --- | --- |
| **Last refresh** | 2026-10-24T09:37:28Z |
| **Data** | GitHub API |
| **Last GitHub event** | `push` |
| **Open PRs** | none |
| **Merged (recent)** | [#23](https://github.com/burnigtm/jev-mcp/pull/23) feat: calibrate, jev://ledger resource and SARIF output, [#22](https://github.com/burnigtm/jev-mcp/pull/22) feat: optional caller context for the review tools (opt-in), [#21](https://github.com/burnigtm/jev-mcp/pull/21) feat: pull-request gate (jev-mcp ci), [#20](https://github.com/burnigtm/jev-mcp/pull/20) feat: enforced Claude Code hooks and jev-mcp check, [#19](https://github.com/burnigtm/jev-mcp/pull/19) feat: chunked review for diffs too large for one request |
| **GitHub `main`** | [`55af907`](https://github.com/burnigtm/jev-mcp/commit/55af907b360d8f69dcebd26f2ef2a0d70a240868) |
| **Cursor target** | `bc-c78e565c-bc13-4d27-ada8-cc5e7e04eb9e` |

## Latest

<details open>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/23">#23 feat: calibrate, jev://ledger resource and SARIF output — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/calibrate-sarif → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:37:15Z · just now</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-24T09:37:15Z · just now</td></tr>
<tr><td><strong>Diff</strong></td><td>+670 −8 · 12 files</td></tr>
<tr><td><strong>Commits</strong></td><td>1</td></tr>
<tr><td><strong>Checks</strong></td><td>1 still running · 6 checks</td></tr>
<tr><td><strong>Reviews</strong></td><td>no reviews</td></tr>
<tr><td><strong>Head</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/7afd08325ea0a6f566771fafd265e6000c688984"><code>7afd083</code></a></td></tr>
<tr><td><strong>Merge commit</strong></td><td><a href="https://github.com/burnigtm/jev-mcp/commit/55af907b360d8f69dcebd26f2ef2a0d70a240868"><code>55af907</code></a></td></tr>
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
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40082676654/job/120839273784">publish</a> <code>in_progress</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40082676654/job/120839273567">notify</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081763108/job/120838041405">check (windows-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081763108/job/120838022017">check (ubuntu-latest, 22)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081763108/job/120838021464">check (ubuntu-latest, 20)</a> <code>success</code></li>
<li><a href="https://github.com/burnigtm/jev-mcp/actions/runs/40081763108/job/120838020878">check (windows-latest, 20)</a> <code>success</code></li>
</ul>
<p><strong>Description</strong></p><p>## Summary PR 9 (the last) of the roadmap, **stacked on #22**. - **`jev-mcp calibrate [--dir] [--since YYYY-MM] [--min-sample N] [--json]`**: per-tool action mix and review/escalate rates, labeled outcomes from `jev_feedback`, false-alarm rate (among labeled holds) and miss rate (among labeled approvals), false-alarm rate by reason code, and inputs that got different actions. **Only labeled decisions count as ground truth** (silence is not evidence). A reason code needs `--min-sample` labels (d…</p>
</details>


## Open

No open pull requests.


## Merged

<details>
<summary><a href="https://github.com/burnigtm/jev-mcp/pull/22">#22 feat: optional caller context for the review tools (opt-in) — MERGED</a></summary>
<table>
<tr><td><strong>State</strong></td><td>MERGED</td></tr>
<tr><td><strong>Author</strong></td><td>burnigtm</td></tr>
<tr><td><strong>Branches</strong></td><td>feat/caller-context → main</td></tr>
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:30:30Z · 6m ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-24T09:30:30Z · 6m ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:30:22Z · 7m ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-24T09:30:22Z · 7m ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:30:15Z · 7m ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-24T09:30:15Z · 7m ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:30:08Z · 7m ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-24T09:30:07Z · 7m ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:30:00Z · 7m ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-24T09:29:59Z · 7m ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:29:52Z · 7m ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-24T09:29:52Z · 7m ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:29:45Z · 7m ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-24T09:29:44Z · 7m ago</td></tr>
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
<tr><td><strong>Updated</strong></td><td>2026-10-24T09:29:09Z · 8m ago</td></tr>
<tr><td><strong>Merged</strong></td><td>2026-10-24T09:29:09Z · 8m ago</td></tr>
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

Push to `main` `55af907`.

- Event: `push`
- Ref: `main` SHA [`55af907`](https://github.com/burnigtm/jev-mcp/commit/55af907b360d8f69dcebd26f2ef2a0d70a240868)

Search, filters, checks, commits, and files are on the interactive board next to this file. Follow-ups land in the **Jev_MCP Project** chat.

Live Actions: [Notify Jev_MCP](https://github.com/burnigtm/jev-mcp/actions/workflows/notify-jev-mcp.yml).

<!-- jev-watch:snapshot eyJwdWxscyI6W3sibnVtYmVyIjoyMywidGl0bGUiOiJmZWF0OiBjYWxpYnJhdGUsIGpldjovL2xlZGdlciByZXNvdXJjZSBhbmQgU0FSSUYgb3V0cHV0Iiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzIzIiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvY2FsaWJyYXRlLXNhcmlmIiwiYmFzZSI6Im1haW4iLCJzaGEiOiI3YWZkMDgzMjVlYTBhNmY1NjY3NzFmYWZkMjY1ZTYwMDBjNjg4OTg0IiwibWVyZ2VfY29tbWl0X3NoYSI6IjU1YWY5MDdiMzYwZDhmNjlkY2ViZDI2ZjJlZjJhMGQ3MGEyNDA4NjgiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjIzOjMwWiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjM3OjE1WiIsIm1lcmdlZF9hdCI6IjIwMjYtMTAtMjRUMDk6Mzc6MTVaIiwiY2xvc2VkX2F0IjoiMjAyNi0xMC0yNFQwOTozNzoxNVoiLCJhZGRpdGlvbnMiOjY3MCwiZGVsZXRpb25zIjo4LCJjaGFuZ2VkX2ZpbGVzIjoxMiwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgUFIgOSAodGhlIGxhc3QpIG9mIHRoZSByb2FkbWFwLCAqKnN0YWNrZWQgb24gIzIyKiouIC0gKipgamV2LW1jcCBjYWxpYnJhdGUgWy0tZGlyXSBbLS1zaW5jZSBZWVlZLU1NXSBbLS1taW4tc2FtcGxlIE5dIFstLWpzb25dYCoqOiBwZXItdG9vbCBhY3Rpb24gbWl4IGFuZCByZXZpZXcvZXNjYWxhdGUgcmF0ZXMsIGxhYmVsZWQgb3V0Y29tZXMgZnJvbSBgamV2X2ZlZWRiYWNrYCwgZmFsc2UtYWxhcm0gcmF0ZSAoYW1vbmcgbGFiZWxlZCBob2xkcykgYW5kIG1pc3MgcmF0ZSAoYW1vbmcgbGFiZWxlZCBhcHByb3ZhbHMpLCBmYWxzZS1hbGFybSByYXRlIGJ5IHJlYXNvbiBjb2RlLCBhbmQgaW5wdXRzIHRoYXQgZ290IGRpZmZlcmVudCBhY3Rpb25zLiAqKk9ubHkgbGFiZWxlZCBkZWNpc1x1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbeyJzaGEiOiI3YWZkMDgzMjVlYTBhNmY1NjY3NzFmYWZkMjY1ZTYwMDBjNjg4OTg0IiwibWVzc2FnZSI6ImZlYXQ6IGNhbGlicmF0ZSwgamV2Oi8vbGVkZ2VyIHJlc291cmNlIGFuZCBTQVJJRiBvdXRwdXQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9jb21taXQvN2FmZDA4MzI1ZWEwYTZmNTY2NzcxZmFmZDI2NWU2MDAwYzY4ODk4NCJ9XSwiZmlsZXMiOlt7ImZpbGVuYW1lIjoiZG9jcy9jaGFuZ2Vsb2cubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6NiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoiZG9jcy9jaS5tZCIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo1LCJkZWxldGlvbnMiOjF9LHsiZmlsZW5hbWUiOiJkb2NzL2NvbmZpZ3VyYXRpb24ubWQiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MywiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoic3JjL2NhbGlicmF0ZS50cyIsInN0YXR1cyI6ImFkZGVkIiwiYWRkaXRpb25zIjoyMjksImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InNyYy9jaS50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjo1MCwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoic3JjL2NsaS50cyIsInN0YXR1cyI6Im1vZGlmaWVkIiwiYWRkaXRpb25zIjozMCwiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoic3JjL2luZGV4LnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjgsImRlbGV0aW9ucyI6MX0seyJmaWxlbmFtZSI6InNyYy9zZXJ2ZXIudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MTksImRlbGV0aW9ucyI6MH0seyJmaWxlbmFtZSI6InRlc3RzL2NhbGlicmF0ZS50ZXN0LnRzIiwic3RhdHVzIjoiYWRkZWQiLCJhZGRpdGlvbnMiOjMxNiwiZGVsZXRpb25zIjowfSx7ImZpbGVuYW1lIjoidGVzdHMvbWNwLnRlc3QudHMiLCJzdGF0dXMiOiJtb2RpZmllZCIsImFkZGl0aW9ucyI6MSwiZGVsZXRpb25zIjoxfSx7ImZpbGVuYW1lIjoidGVzdHMvcGFja2FnZS50ZXN0LnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjEsImRlbGV0aW9ucyI6MX0seyJmaWxlbmFtZSI6InRlc3RzL3RyYW5zcG9ydC50ZXN0LnRzIiwic3RhdHVzIjoibW9kaWZpZWQiLCJhZGRpdGlvbnMiOjIsImRlbGV0aW9ucyI6Mn1dLCJjaGVja3MiOlt7Im5hbWUiOiJwdWJsaXNoIiwic3RhdGUiOiJpbl9wcm9ncmVzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MjY3NjY1NC9qb2IvMTIwODM5MjczNzg0In0seyJuYW1lIjoibm90aWZ5Iiwic3RhdGUiOiJzdWNjZXNzIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvYWN0aW9ucy9ydW5zLzQwMDgyNjc2NjU0L2pvYi8xMjA4MzkyNzM1NjcifSx7Im5hbWUiOiJjaGVjayAod2luZG93cy1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MTc2MzEwOC9qb2IvMTIwODM4MDQxNDA1In0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIyKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MTc2MzEwOC9qb2IvMTIwODM4MDIyMDE3In0seyJuYW1lIjoiY2hlY2sgKHVidW50dS1sYXRlc3QsIDIwKSIsInN0YXRlIjoic3VjY2VzcyIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL2FjdGlvbnMvcnVucy80MDA4MTc2MzEwOC9qb2IvMTIwODM4MDIxNDY0In0seyJuYW1lIjoiY2hlY2sgKHdpbmRvd3MtbGF0ZXN0LCAyMCkiLCJzdGF0ZSI6InN1Y2Nlc3MiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9hY3Rpb25zL3J1bnMvNDAwODE3NjMxMDgvam9iLzEyMDgzODAyMDg3OCJ9XX0seyJudW1iZXIiOjIyLCJ0aXRsZSI6ImZlYXQ6IG9wdGlvbmFsIGNhbGxlciBjb250ZXh0IGZvciB0aGUgcmV2aWV3IHRvb2xzIChvcHQtaW4pIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzIyIiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvY2FsbGVyLWNvbnRleHQiLCJiYXNlIjoibWFpbiIsInNoYSI6IjgxM2U0ZjRhYWJjNGU4ZDVkMmRjMjhmNTgwNjc5MDdlMGUwY2JjYzciLCJtZXJnZV9jb21taXRfc2hhIjoiYmIyOTJhNWI4Mjg1ZmQ5N2Q2OWNmOWVlZmM2ODczOWYwY2I2YmM1ZCIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDk6MTg6MDJaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDk6MzA6MzBaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0yNFQwOTozMDozMFoiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjMwOjMwWiIsImFkZGl0aW9ucyI6MTY3NCwiZGVsZXRpb25zIjoyOSwiY2hhbmdlZF9maWxlcyI6MjQsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFBSIDggb2YgdGhlIHJvYWRtYXAsICoqc3RhY2tlZCBvbiAjMjEqKi4gT3B0aW9uYWwgZXZpZGVuY2UgYWJvdXQgd2hlcmUgY2hhbmdlZCBjb2RlIGlzIHVzZWQsIGZvciB0aGUgcmV2aWV3IHRvb2xzLiAqKkEgbmVnYXRpdmUgcmVzdWx0LCBzaGlwcGVkIG9wdC1pbiBhbmQgb2ZmIGJ5IGRlZmF1bHQuKiogLSBgamV2X3Jldmlld2AsIGBqZXZfcmlza2AsIGBqZXZfZ2F0ZWAgYWNjZXB0IGBjb250ZXh0LmNhbGxlcnNgICh1cCB0byA0MCBgeyBwYXRoLCBsaW5lPywgdGV4dCwgc3ltYm9sPyB9YCkuIFRoZSBzZXJ2ZXIgbmV2ZXIgc2VhcmNoZXMgdGhlIHJlcG8gaXRzZWxmOyB0aGUgaG9zdCBzdXBwbGllcyB0aGUgbGlzdC4gU25pcHBldHMgYXJlIHVudHJ1c3RlZDogc2FuaXRpemVkLFx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MjEsInRpdGxlIjoiZmVhdDogcHVsbC1yZXF1ZXN0IGdhdGUgKGpldi1tY3AgY2kpIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzIxIiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvY2ktZ2F0ZSIsImJhc2UiOiJtYWluIiwic2hhIjoiYTFkMzQwMjZjZjNiNzNkMGM0ZTAwN2IxMjgxNGE5OWNiY2M3MjMzYyIsIm1lcmdlX2NvbW1pdF9zaGEiOiI0MjMyMDZkODA2OWNhOTk0NDUxZmE1NGFmZTk0OTAwM2ZiNzUxZWZhIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yNFQwOTowNToxN1oiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yNFQwOTozMDoyMloiLCJtZXJnZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjMwOjIyWiIsImNsb3NlZF9hdCI6IjIwMjYtMTAtMjRUMDk6MzA6MjJaIiwiYWRkaXRpb25zIjoxMjg4LCJkZWxldGlvbnMiOjEyLCJjaGFuZ2VkX2ZpbGVzIjoxNCwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgUFIgNyBvZiB0aGUgcm9hZG1hcCwgKipzdGFja2VkIG9uICMyMCoqLiBgamV2LW1jcCBjaWAgaXMgdGhlIHB1bGwtcmVxdWVzdCBnYXRlOiBpdCBhbnN3ZXJzIGBhdXRvYCwgYHJldmlld2Agb3IgYGVzY2FsYXRlYCAoZXhpdCAwLCAxMCwgMjA7IDIgb24gYW55IGVycm9yLCBmYWlsLWNsb3NlZCkgYW5kIG5ldmVyIHJ1bnMgdGhlIHB1bGwgcmVxdWVzdCdzIGNvZGUuIC0gKipQb2xpY3kgZnJvbSB0aGUgYmFzZSByZWYuKiogYC5qZXYtcG9saWN5Lmpzb25gIGlzIHJlYWQgd2l0aCBgZ2l0IHNob3cgQkFTRTouLi5gLCBzbyBhIHB1bGwgcmVxdWVzdCBjYW5ub3QgbG9vc2VuIGl0cyBvd24gcnVsZXM7IGNoYW5naW5nIHRoZSBmaWxlIGhvbGRzLCBhIGJyb2tlbiBvbmUgaG9sZHMuIEV2ZVx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MjAsInRpdGxlIjoiZmVhdDogZW5mb3JjZWQgQ2xhdWRlIENvZGUgaG9va3MgYW5kIGpldi1tY3AgY2hlY2siLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMjAiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC9jaGVjay1hbmQtaG9va3MiLCJiYXNlIjoibWFpbiIsInNoYSI6IjNjM2Y4N2U3MmJiMzE3ODY3ZmY4ZDU5MjQzMmVmYzhmYWQwNjhiMTAiLCJtZXJnZV9jb21taXRfc2hhIjoiMmZlZTdlODNjMjEyMmJhMzdmODdkZjY1NzEwMTFiMDk1ZGIzYWU2MiIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDg6MDI6NTlaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDk6MzA6MTVaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0yNFQwOTozMDoxNVoiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjMwOjE1WiIsImFkZGl0aW9ucyI6NzE4MSwiZGVsZXRpb25zIjowLCJjaGFuZ2VkX2ZpbGVzIjoxOSwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgUFIgNiBvZiB0aGUgcm9hZG1hcCwgKipzdGFja2VkIG9uICMxOSoqLiBNYWtlcyB0aGUgZ3VhcmQgcnVuIG9uIGV2ZXJ5IHRvb2wgY2FsbCBpbiBDbGF1ZGUgQ29kZSBpbnN0ZWFkIG9mIGJlaW5nIGFkdmlzb3J5LiAtICoqYGpldi1tY3AgaG9vayBwcmUtdG9vbC11c2VgKio6IGNsYXNzaWZpZXIgYW5kIHJlcG9zaXRvcnkgcG9saWN5IGZpcnN0OyBhIGNvbmZpcm1lZCByZWFkLW9ubHkgY29tbWFuZCBpcyBzaWxlbnQgd2l0aCBubyBtb2RlbCBjYWxsOyByZWFkcyBvZiBrZXkvY3JlZGVudGlhbCBmaWxlcyBhbmQgZWRpdHMgdG8gdGhlIGd1YXJkJ3Mgb3duIGNvbmZpZyBhc2sgd2l0aG91dCBhIG1vZGVsOyBvbmx5IHRoZSBncmF5IHpvbmUgY2FsbHMgYGpldl9zY29wZWAuIEEgaG9va1x1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MTksInRpdGxlIjoiZmVhdDogY2h1bmtlZCByZXZpZXcgZm9yIGRpZmZzIHRvbyBsYXJnZSBmb3Igb25lIHJlcXVlc3QiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTkiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC9sYXJnZS1kaWZmLXJldmlldyIsImJhc2UiOiJtYWluIiwic2hhIjoiZjRmM2E5MjgyOTBmMmIyMGJlYzFkMmExZmNjNTA4MTVjMWI2ZDE0NSIsIm1lcmdlX2NvbW1pdF9zaGEiOiI4NGUyM2Q4MTA4ODdlZjU1Y2I2ZWE4MWVkM2NhMzAzMWVhMjA0ZmEzIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yNFQwNzo0Mzo0NFoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yNFQwOTozMDowOFoiLCJtZXJnZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjMwOjA3WiIsImNsb3NlZF9hdCI6IjIwMjYtMTAtMjRUMDk6MzA6MDdaIiwiYWRkaXRpb25zIjozODMxLCJkZWxldGlvbnMiOjc0LCJjaGFuZ2VkX2ZpbGVzIjoyNCwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgUFIgNSBvZiB0aGUgcm9hZG1hcC4gKipTdGFja2VkIG9uICMxOCoqIChiYXNlIGlzIHRoYXQgYnJhbmNoOyBHaXRIdWIgcmV0YXJnZXRzIGl0IGFzIHRoZSBzdGFjayBtZXJnZXMpLiBVbnRpbCBub3cgYSBkaWZmIHBhc3QgYWJvdXQgMzEuOGsgZXN0aW1hdGVkIHRva2VucyB3YXMgY3V0IG9mZiBhdCB0aGUgdGFpbCBhbmQgY291bGQgbmV2ZXIgYmUgYGF1dG9gLCBzbyBhIGxhcmdlIGNoYW5nZSB3YXMgdW5yZXZpZXdhYmxlIGFuZCBhIGRlZmVjdCBwYXN0IHRoZSBjdXQgd2FzIGludmlzaWJsZS4gYGpldl9yZXZpZXdgLCBgamV2X3Jpc2tgIGFuZCBgamV2X2dhdGVgIG5vdyByZXZpZXcgaXQgaW4gcGFydHMuIC0gKipTcGxpdCBhbG9uZyBmaWxlIGJvdW5kYXJpZXMuKiogQSBsb3NzbFx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MTgsInRpdGxlIjoiUmVwb3NpdG9yeSBwb2xpY3kgZmlsZSwgcHJvZmlsZXMsIGFuZCBhIGRlZGljYXRlZCB0cmlhZ2UgcmVjb3ZlcmFiaWxpdHkgYmFyIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzE4IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvcmVwby1wb2xpY3ktcHJvZmlsZXMiLCJiYXNlIjoibWFpbiIsInNoYSI6Ijk5YWUxNTYyOTlkNGJlOWNlM2E2NjMyNWQ4OGQ1OTBiOTAyN2RmODQiLCJtZXJnZV9jb21taXRfc2hhIjoiZTc1NzQ3MDNmZjMwZjFlMGRlNzIyOTIzNjVlMzNjNGE0ZWQ2MGZlMSIsImRyYWZ0IjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDc6MDk6MjFaIiwidXBkYXRlZF9hdCI6IjIwMjYtMTAtMjRUMDk6MzA6MDBaIiwibWVyZ2VkX2F0IjoiMjAyNi0xMC0yNFQwOToyOTo1OVoiLCJjbG9zZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjMwOjAwWiIsImFkZGl0aW9ucyI6MjYxMjQsImRlbGV0aW9ucyI6NDMsImNoYW5nZWRfZmlsZXMiOjI0LCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBQUiA0IG9mIHRoZSByb2FkbWFwLiAqKlN0YWNrZWQgb24gIzE3KiogKGJhc2UgaXMgdGhhdCBicmFuY2g7IEdpdEh1YiByZXRhcmdldHMgaXQgYXMgdGhlIHN0YWNrIG1lcmdlcykuIEFkZHMgdGhlIGRldGVybWluaXN0aWMgbGF5ZXIgdGhlIGhvb2tzIGFuZCBDSSB3aWxsIHVzZSwgYW5kIHNldHRsZXMgdGhlIG9wZW4gXCJ0cmlhZ2UgYmFyXCIgYW5kIFwic3RyaWN0IHByb2ZpbGVcIiBxdWVzdGlvbnMgd2l0aCBtZWFzdXJlbWVudHMgaW5zdGVhZCBvZiBhcmd1bWVudC4gLSAqKmAuamV2LXBvbGljeS5qc29uYCoqLCBldmFsdWF0ZWQgYnkgYGpldl9zY29wZWAgYmVmb3JlIGFueSBKZXYgcmVxdWVzdDogLSBgcHJvdGVjdGVkX3BhdGhzYDogZ2xvYnMgd2l0aCBhIGByZXZpZXdgIG9yIGBkZVx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MTcsInRpdGxlIjoiRGVjaXNpb24gbGVkZ2VyOiBkZWNpc2lvbl9pZCBvbiBldmVyeSByZXN1bHQgYW5kIGpldl9mZWVkYmFjayIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xNyIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L2RlY2lzaW9uLWxlZGdlciIsImJhc2UiOiJtYWluIiwic2hhIjoiNTA2ZjczODAwZTZiNDQ5NTdmNjBlNmUwYzUyZDUzMDBkOGQyMmQzNyIsIm1lcmdlX2NvbW1pdF9zaGEiOiJhMmNmNmE2ODliZjZmMmYyNjJlN2I4NzViYTIwMmY0ZjM5ZmIyMDNjIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0yNFQwNjo0OTowN1oiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0yNFQwOToyOTo1MloiLCJtZXJnZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjI5OjUyWiIsImNsb3NlZF9hdCI6IjIwMjYtMTAtMjRUMDk6Mjk6NTJaIiwiYWRkaXRpb25zIjo3NzU5LCJkZWxldGlvbnMiOjEzLCJjaGFuZ2VkX2ZpbGVzIjozMiwiY29tbWl0c19jb3VudCI6MSwiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgUFIgMyBvZiB0aGUgcm9hZG1hcC4gKipTdGFja2VkIG9uICMxNioqIChiYXNlIGlzIHRoYXQgYnJhbmNoOyBHaXRIdWIgcmV0YXJnZXRzIGl0IGFzIHRoZSBzdGFjayBtZXJnZXMpLiBOb3RoaW5nIHJlY29yZHMgSmV2J3MgZGVjaXNpb25zIG9yIHdoZXRoZXIgdGhleSB3ZXJlIHJpZ2h0LCBzbyByZWFsLWxpZmUgZmFsc2UtYWxhcm0gcmF0ZXMgYXJlIHVua25vd24gYW5kIGV2ZXJ5IHRocmVzaG9sZCBxdWVzdGlvbiAoc3VjaCBhcyB0aGUgdHJpYWdlIGJhcikgY2FuIG9ubHkgYmUgYXJndWVkIGZyb20gc3ludGhldGljIGJlbmNobWFya3MuIFRoaXMgYWRkcyB0aGUgbWVhc3VyZW1lbnQgbGF5ZXIgdGhlIGxhdGVyIFBScyAoaG9va3MsIENJKSB3aWxsIGxvZyBpbnRvLiAtICoqYGRlY1x1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MTYsInRpdGxlIjoiQ29tbWFuZCBlZmZlY3QgY2xhc3NpZmllcjogdGhlIGNvbW1hbmQgdGV4dCBjYW4gcmFpc2UgYSBkZWNsYXJlZCBlZmZlY3QiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTYiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC9jb21tYW5kLWVmZmVjdC1jbGFzc2lmaWVyIiwiYmFzZSI6Im1haW4iLCJzaGEiOiIwMGRhNzRlOTY3ZmU4OGM3YzhlZGEyYjQzM2NkYjE1ZmJkZWJhZjQ3IiwibWVyZ2VfY29tbWl0X3NoYSI6ImVmNjkwYTI3ZGQ3YjU5MjVhMjk2MDMzZTJiNmZhYTIwYTlkNTNkNTMiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA2OjM4OjIzWiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjI5OjQ1WiIsIm1lcmdlZF9hdCI6IjIwMjYtMTAtMjRUMDk6Mjk6NDRaIiwiY2xvc2VkX2F0IjoiMjAyNi0xMC0yNFQwOToyOTo0NFoiLCJhZGRpdGlvbnMiOjgxNzAsImRlbGV0aW9ucyI6OSwiY2hhbmdlZF9maWxlcyI6MTYsImNvbW1pdHNfY291bnQiOjEsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFBSIDIgb2YgdGhlIHJvYWRtYXAuICoqU3RhY2tlZCBvbiAjMTUqKiAoYmFzZSBpcyB0aGF0IGJyYW5jaDsgR2l0SHViIHdpbGwgcmV0YXJnZXQgdGhpcyB0byBgbWFpbmAgb25jZSAjMTUgbWVyZ2VzKS4gYGpldl9zY29wZWAgdHJ1c3RlZCB0aGUgaG9zdC1kZWNsYXJlZCBgZWZmZWN0YDogYHJlYWRfb25seWAgKyBgcm0gLXJmIGJ1aWxkICYmIGdpdCBwdXNoIC0tZm9yY2VgIHJldHVybmVkIGBhdXRvYCB3aGVuZXZlciB0aGUganVkZ2UncyBhbnN3ZXJzIHdlcmUgY2xlYW4uIFRoaXMgYWRkcyBhIGRldGVybWluaXN0aWMgY2xhc3NpZmllciBzbyB0aGUgY29tbWFuZCB0ZXh0IGNhbiByYWlzZSB0aGUgZWZmZWN0LCBhbmQgbmV2ZXIgbG93ZXIgaXQuIC0gKipgc3JjL2VmZmVjdHMudHNcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjE1LCJ0aXRsZSI6IkhhcmRlbmluZzogbG9vcCBkZXRlY3RvciBwcm9ncmVzcywgcmVzZXJ2ZWQgdG9rZW4gYnVkZ2V0LCBnYXRlIG9yZGVyLCB0cmlhZ2UgcHJvZ3Jlc3Mgd29yZGluZyIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xNSIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJmZWF0L2hhcmRlbmluZy1sb29wLWJ1ZGdldC1nYXRlIiwiYmFzZSI6Im1haW4iLCJzaGEiOiJhOWY0ZGRhYWUyMDE3NTRlMjM3ZGZiNmMyYjNhZjNmZTYzNmQxODQxIiwibWVyZ2VfY29tbWl0X3NoYSI6IjkyMTg2MzMwYmI1NTU4Mzk4Y2VhMmU0MDI3NWMyOGUyNmM4N2Y2YTMiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA2OjIyOjM0WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTI0VDA5OjI5OjA5WiIsIm1lcmdlZF9hdCI6IjIwMjYtMTAtMjRUMDk6Mjk6MDlaIiwiY2xvc2VkX2F0IjoiMjAyNi0xMC0yNFQwOToyOTowOVoiLCJhZGRpdGlvbnMiOjg1NDMsImRlbGV0aW9ucyI6NDksImNoYW5nZWRfZmlsZXMiOjIyLCJjb21taXRzX2NvdW50IjoyLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBQUiAxIG9mIGEgOS1zdGFnZSByb2FkbWFwIChyZXZpZXdlZCBjb2RlIGZyb20gIzEyXHUyMDEzIzE0LCB0aGVuIHBsYW5uZWQgZml4ZXMgYW5kIGVuaGFuY2VtZW50cykuIEhhcmRlbmluZyBvbmx5OiBpdCBmaXhlcyBkZWZlY3RzIGZvdW5kIGJ5IHJlYWRpbmcgYW5kIHJ1bm5pbmcgdGhlIG1lcmdlZCBjb2RlLCBhbmQgb25lIG1vZGVsIG1pc2p1ZGdtZW50IGZvdW5kIGJ5IHRoZSBsaXZlIGJlbmNobWFyay4gLSAqKkxvb3AgZGV0ZWN0b3Igbm8gbG9uZ2VyIGZsYWdzIHByb2dyZXNzLioqIEZhaWx1cmUgY291bnRzIHRoYXQgc3RyaWN0bHkgc2hyaW5rIGFjcm9zcyBhdHRlbXB0cyAoOSBcdTIxOTIgNSBcdTIxOTIgMiBmYWlsZWQpIHdlcmUgcmVwb3J0ZWQgYXMgYHNhbWVfZmFpbHVyZWAgYmVjYXVzZSBldmVyXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoxNCwidGl0bGUiOiJMaXZlIEpldiB2YWx1ZSBiZW5jaG1hcmsgd2l0aCByYW5kb21pemVkIGNhc2VzLCBwbHVzIHRoZSBmaXhlcyBhbmQgY2FsaWJyYXRpb24gaXQgZm91bmQiLCJzdGF0ZSI6Ik1FUkdFRCIsInVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9idXJuaWd0bS9qZXYtbWNwL3B1bGwvMTQiLCJ1c2VyIjoiYnVybmlndG0iLCJoZWFkIjoiZmVhdC9qZXYtdmFsdWUtYmVuY2htYXJrIiwiYmFzZSI6Im1haW4iLCJzaGEiOiI0ZWExYjgxNmUxZDAyOTZlM2VmOTM0M2IxOGUwYjhjNzE5YmVjMzExIiwibWVyZ2VfY29tbWl0X3NoYSI6IjdkMjczN2JjMjIzYzY3NDZlYTJiY2Q4YjljNmIyOGRlMjU2OTJjMDYiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTIzVDE5OjQ1OjU5WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTIzVDE5OjQ4OjUyWiIsIm1lcmdlZF9hdCI6IjIwMjYtMTAtMjNUMTk6NDg6NTFaIiwiY2xvc2VkX2F0IjoiMjAyNi0xMC0yM1QxOTo0ODo1MVoiLCJhZGRpdGlvbnMiOjI2Njk2LCJkZWxldGlvbnMiOjMwLCJjaGFuZ2VkX2ZpbGVzIjoyOSwiY29tbWl0c19jb3VudCI6MywiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IiMjIFN1bW1hcnkgVGhpcyBQUiBtZWFzdXJlcyB3aGF0IGxpdmUgSmV2IGFkZHMgb3ZlciBjaGVhcCBsb2NhbCBydWxlcywgZml4ZXMgdGhlIGpldi1tY3AgZGVmZWN0cyB0aGF0IG1lYXN1cmVtZW50IGV4cG9zZWQsIGFuZCByZWNhbGlicmF0ZXMgdGhyZWUgXCJsb3dlciBpcyBiZXR0ZXJcIiBzY29yZXMgYmFzZWQgb24gdGhlIGRhdGEuIC0gKipCZW5jaG1hcms6KiogYG5wbSBydW4gZXZhbDpib251c2AuIExhYmVsbGVkIHJpc2t5L3NhZmUgY2FzZXMgYXJlIGRlY2lkZWQgdGhyZWUgd2F5czogYnkgKipubyBndWFyZCoqLCBieSBhICoqcnVsZXMtb25seSBndWFyZCoqIHdpdGggbm8gbW9kZWwgY2FsbCwgYW5kIGJ5ICoqbGl2ZSBKZXYqKi4gVGhlIDUxIGhhbmQtd3JpdHRlbiBjYXNlcyBhcmUgam9pbmVkXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119LHsibnVtYmVyIjoxMywidGl0bGUiOiJHdWFyZHJhaWwgaGFyZGVuaW5nOiBwb2xpY3kgZml4ZXMsIGNhY2hlL2J1ZGdldC9zdGF0cywgcmlzay1hd2FyZSBnYXRlLCBsb29wIGRldGVjdG9yIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzEzIiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvdjAuMy1ndWFyZHJhaWwtaGFyZGVuaW5nIiwiYmFzZSI6Im1haW4iLCJzaGEiOiIxYTU4NTAwMTJiMDgyNzYxOTlmMGYxM2I4NDhhMjI3ODcyNmRkOTNkIiwibWVyZ2VfY29tbWl0X3NoYSI6Ijk3ZTFjZDE2ZjVhZDYyNmNmZDRlZGU3NzYyYjUxMzg5N2M0NDRjMzkiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTIzVDE4OjQyOjIyWiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTIzVDE4OjU4OjMwWiIsIm1lcmdlZF9hdCI6IjIwMjYtMTAtMjNUMTg6NTg6MzBaIiwiY2xvc2VkX2F0IjoiMjAyNi0xMC0yM1QxODo1ODozMFoiLCJhZGRpdGlvbnMiOjIyMzcsImRlbGV0aW9ucyI6MzQ2LCJjaGFuZ2VkX2ZpbGVzIjozNCwiY29tbWl0c19jb3VudCI6MywiY29tbWVudHMiOjAsInJldmlld19jb21tZW50cyI6MCwibGFiZWxzIjpbXSwiYm9keSI6IkZvbGxvd3MgIzEyICh2MC4yIHNjb3BlL3RyaWFnZS9yaXNrIHRvb2xzKS4gVGhlIHBvbGljeSBmaXhlcyBmb3IgZGVmZWN0cyB0aGF0ICMxMiBpdHNlbGYgaW50cm9kdWNlZCB3ZXJlIG1vdmVkIG9udG8gIzEyIGJlZm9yZSBpdCBtZXJnZWQ6IHRoZSByaXNrLWZsYWcgbWFza2luZywgdGhlIGVzY2FsYXRpb24gY3V0b2ZmIGZvciBzY29wZSBhbmQgcmlzaywgdHJpYWdlIGVzY2FsYXRpb24gb3JkZXIsIHRoZSBpbmplY3Rpb24tYmFja3N0b3AgcmVncmVzc2lvbiBhbmQgdHJpYWdlIGNhdXNlLUlEIHNhbml0aXphdGlvbi4gVGhpcyBicmFuY2ggYWxyZWFkeSBpbmNsdWRlcyB0aGF0IHdvcmsgdGhyb3VnaCBhIG1lcmdlIGNvbW1pdC4gV2hhdCByZW1haW5zIGhlcmUgaXMgdGhlIGhhcmRlbmluZyBvZiBwclx1MjAyNiIsInJldmlld19kZWNpc2lvbiI6IiIsInJldmlld3MiOltdLCJjb21taXRzIjpbXSwiZmlsZXMiOltdLCJjaGVja3MiOltdfSx7Im51bWJlciI6MTIsInRpdGxlIjoiZmVhdDogYWRkIHNjb3BlLCB0cmlhZ2UsIGFuZCBzZWN1cml0eSByaXNrIHRvb2xzIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzEyIiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImZlYXQvdjAuMi1hZ2VudC1ndWFyZHJhaWxzIiwiYmFzZSI6Im1haW4iLCJzaGEiOiJiMGVhY2IwNDNkOTdjOWJkMzQxNDBjODA3ZTllODhmZWM2MTk0MzBhIiwibWVyZ2VfY29tbWl0X3NoYSI6IjhiY2I5MmFkNmI4N2I3NzU5YTZhYjk3YzQ4NGY4NzRkY2QxNmQzODUiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTEwLTE3VDEzOjA0OjAxWiIsInVwZGF0ZWRfYXQiOiIyMDI2LTEwLTIzVDE4OjUwOjI1WiIsIm1lcmdlZF9hdCI6IjIwMjYtMTAtMjNUMTg6NTA6MjRaIiwiY2xvc2VkX2F0IjoiMjAyNi0xMC0yM1QxODo1MDoyNFoiLCJhZGRpdGlvbnMiOjE1NjIsImRlbGV0aW9ucyI6MzgsImNoYW5nZWRfZmlsZXMiOjMzLCJjb21taXRzX2NvdW50IjoyLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSBUaGlzIFBSIGV4dGVuZHMgYGpldi1tY3BgIGZyb20gdGhlIGNvcmUgY29kaW5nIGxvb3AgaW50byB0aHJlZSBhZGphY2VudCBkZWNpc2lvbiBib3VuZGFyaWVzOiAxLiAqKmBqZXZfc2NvcGVgKiogLSBzZW1hbnRpYyBwcmVmbGlnaHQgZm9yIGEgaG9zdC1wcmVwYXJlZCBhY3Rpb24uIDIuICoqYGpldl90cmlhZ2VgKiogLSBmYWlsdXJlIGNhdXNlLCBsb29wIHByb2dyZXNzLCBhbmQgcmVjb3Zlcnkgc3RyYXRlZ3kuIDMuICoqYGpldl9yaXNrYCoqIC0gc2VjdXJpdHktZm9jdXNlZCBwYXRjaCByaXNrIHRyaWFnZS4gVGhlIGV4aXN0aW5nIG5pbmUgdG9vbHMgYW5kIHRoZWlyIHBvbGljaWVzIGFyZSB1bmNoYW5nZWQuIFRoZSBzZXJ2ZXIgbm93IGV4cG9zZXMgKioxMiB0b29scywgMTFcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjExLCJ0aXRsZSI6InNlY3VyaXR5OiBoYXJkZW4gdW50cnVzdGVkLWRhdGEgaGFuZGxpbmcgYW5kIGhlbHBlciBib3VuZGFyaWVzIiwic3RhdGUiOiJNRVJHRUQiLCJ1cmwiOiJodHRwczovL2dpdGh1Yi5jb20vYnVybmlndG0vamV2LW1jcC9wdWxsLzExIiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6InNlY3VyaXR5L2hhcmRlbi11bnRydXN0ZWQtZGF0YSIsImJhc2UiOiJtYWluIiwic2hhIjoiZTBmZjZlMzgxMjFjYzgxN2I0MTlkYmExNGNlMGVjZmM3MTc2MTJmNSIsIm1lcmdlX2NvbW1pdF9zaGEiOiI2ZWNjYjUyMzQ4MjNhOWY1OGQ5YTdjYWI5NWJmNzFiMDRkZjAwYzkxIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0xN1QxMjoxNDozNFoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0xN1QxMjozNjoxNVoiLCJtZXJnZWRfYXQiOiIyMDI2LTEwLTE3VDEyOjM2OjE1WiIsImNsb3NlZF9hdCI6IjIwMjYtMTAtMTdUMTI6MzY6MTVaIiwiYWRkaXRpb25zIjoxMTAxLCJkZWxldGlvbnMiOjE4OCwiY2hhbmdlZF9maWxlcyI6NjQsImNvbW1pdHNfY291bnQiOjIsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBTdW1tYXJ5IFRoaXMgUFIgaGFyZGVucyB0aGUgYm91bmRhcmllcyB3aGVyZSBgamV2LW1jcGAgaGFuZGxlcyB0aGlyZC1wYXJ0eSB0ZXh0LCBob3N0LXByZXBhcmVkIHRvb2wgbWV0YWRhdGEsIHByb3ZpZGVyIGNyZWRlbnRpYWxzLCBhbmQgYWdlbnQgZXZhbHVhdGlvbiBjb2RlLiBJdCBhbHNvIGZpeGVzIHNldmVyYWwgY29ycmVjdG5lc3MgZGVmZWN0cyBmb3VuZCBkdXJpbmcgdGhlIGF1ZGl0LiBUaGUgY2hlY2tvdXQgYWxyZWFkeSBjb250YWluZWQgYSBwZW5kaW5nIHJlbWVkaWF0aW9uIGJhdGNoOyB0aGlzIGJyYW5jaCBidWlsZHMgb24gaXQgYW5kIHR1cm5zIHRoZSB3aG9sZSBzZXQgaW50byBvbmUgcmV2aWV3ZWQgY2hhbmdlLiBObyBsaXZlIHByb3ZpZGVyIGNhbGxzIG9yIHB1Ymxpc2hpbmdcdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjEwLCJ0aXRsZSI6IlBhY2thZ2UgcG9ydGFibGUgSmV2IHNraWxsIGFuZCBhZGQgcmVhbC1hZ2VudCBldmFsdWF0aW9ucyIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC8xMCIsInVzZXIiOiJidXJuaWd0bSIsImhlYWQiOiJjb2RleC9wb3J0YWJsZS1za2lsbC1ldmFscyIsImJhc2UiOiJtYWluIiwic2hhIjoiZmQzNDcwMWUxNTViNmMyMzBjYmFjZTQxMWRmNjIzODgwNDA1YjEzMSIsIm1lcmdlX2NvbW1pdF9zaGEiOiI1NzFmNDY0NTY1YTEzMTlhYmU1MmNiOTUxMjBiMzcxNzRlZTUzYWJhIiwiZHJhZnQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyNi0xMC0xNVQxNjo0NDo0NloiLCJ1cGRhdGVkX2F0IjoiMjAyNi0xMC0xNVQxNjo1MToyMloiLCJtZXJnZWRfYXQiOiIyMDI2LTEwLTE1VDE2OjUxOjIyWiIsImNsb3NlZF9hdCI6IjIwMjYtMTAtMTVUMTY6NTE6MjJaIiwiYWRkaXRpb25zIjo1NzY1LCJkZWxldGlvbnMiOjM2OCwiY2hhbmdlZF9maWxlcyI6NTAsImNvbW1pdHNfY291bnQiOjIsImNvbW1lbnRzIjowLCJyZXZpZXdfY29tbWVudHMiOjAsImxhYmVscyI6W10sImJvZHkiOiIjIyBQcm9ibGVtIGFuZCBiZWhhdmlvciBUaGUgSmV2IGNvbXBhbmlvbiBza2lsbCBkZXBlbmRlZCBvbiByZXBvc2l0b3J5IGRvY3VtZW50YXRpb24gYW5kIGhhZCBubyByZXByb2R1Y2libGUgc3RhbmRhbG9uZSBwYWNrYWdlIG9yIHJlYWwtYWdlbnQgZXZhbHVhdGlvbiBwYXRoLiBUaGlzIGNoYW5nZSBtYWtlcyB0aGUgY29tcGxldGUgc2tpbGwgaW5kZXBlbmRlbnRseSBpbnN0YWxsYWJsZSBhdCBgLmFnZW50cy9za2lsbHMvamV2LW1jcGAgYW5kIGFkZHMgYm91bmRlZCBldmFsdWF0aW9ucyBvZiB0aGUgY29tYmluZWQgc2tpbGwgKyBsaXZlIE1DUCB3b3JrZmxvdyBpbiBDb2RleCBhbmQgdGhlIG9mZmljaWFsIEN1cnNvciBDTEkuICMjIENoYW5nZXMgLSBNb3ZlIGNhbm9uaWNhbCBjb250cmFjdHMgaW5cdTIwMjYiLCJyZXZpZXdfZGVjaXNpb24iOiIiLCJyZXZpZXdzIjpbXSwiY29tbWl0cyI6W10sImZpbGVzIjpbXSwiY2hlY2tzIjpbXX0seyJudW1iZXIiOjgsInRpdGxlIjoiUGluIHRoZSBuZXdlc3QgcHVsbCByZXF1ZXN0IG9uIHRoZSB3YXRjaCBib2FyZCIsInN0YXRlIjoiTUVSR0VEIiwidXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL2J1cm5pZ3RtL2pldi1tY3AvcHVsbC84IiwidXNlciI6ImJ1cm5pZ3RtIiwiaGVhZCI6ImN1cnNvci9pbnRlcmFjdGl2ZS1wci13YXRjaC01MThlIiwiYmFzZSI6Im1haW4iLCJzaGEiOiI0ODMzNjM0NmNkM2ZiNWViOTY1NTYxMjY1ZTBiZjNkMDU5ZWM1ZjBmIiwibWVyZ2VfY29tbWl0X3NoYSI6Ijk0NDhmNjEyMDAxNWYyZjZjNmRhZDcxMzdjN2YyMzQ1NDUyMDk5MTgiLCJkcmFmdCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDI2LTA5LTIxVDE3OjU5OjA2WiIsInVwZGF0ZWRfYXQiOiIyMDI2LTA5LTIxVDE3OjU5OjEyWiIsIm1lcmdlZF9hdCI6IjIwMjYtMDktMjFUMTc6NTk6MTJaIiwiY2xvc2VkX2F0IjoiMjAyNi0wOS0yMVQxNzo1OToxMloiLCJhZGRpdGlvbnMiOjExMTgsImRlbGV0aW9ucyI6MTMzLCJjaGFuZ2VkX2ZpbGVzIjo2LCJjb21taXRzX2NvdW50IjoxLCJjb21tZW50cyI6MCwicmV2aWV3X2NvbW1lbnRzIjowLCJsYWJlbHMiOltdLCJib2R5IjoiIyMgU3VtbWFyeSAtIFRoZSBHaXRIdWIgd2F0Y2ggYm9hcmQgYWx3YXlzIGxlYWRzIHdpdGggdGhlIGhpZ2hlc3QtbnVtYmVyZWQgcHVsbCByZXF1ZXN0LCBzbyB0aGUgbGF0ZXN0IG9uZSBzdGF5cyB2aXNpYmxlLiAtIEVhY2ggcHVsbCByZXF1ZXN0IHNob3dzIGF1dGhvciwgYnJhbmNoZXMsIGRpZmYgc2l6ZSwgY2hlY2tzLCByZXZpZXdzLCBjb21taXRzLCBhbmQgZmlsZXMuIC0gQSBmYWlsZWQgR2l0SHViIHJlYWQga2VlcHMgdGhlIGxhc3Qgc2F2ZWQgbGlzdCBhbmQgc2F5cyB0aGUgbGl2ZSBsaXN0IGlzIHVuYXZhaWxhYmxlLCBpbnN0ZWFkIG9mIGJsYW5raW5nIHRoZSBwYWdlIG9yIHByZXRlbmRpbmcgdGhlIGxpc3QgaXMgZW1wdHkuIC0gYGRvY3MvZ2l0aHViLXdhdGNoLmh0bWxgIGFkZHMgc2VhXHUyMDI2IiwicmV2aWV3X2RlY2lzaW9uIjoiIiwicmV2aWV3cyI6W10sImNvbW1pdHMiOltdLCJmaWxlcyI6W10sImNoZWNrcyI6W119XX0= -->
