# Jev evaluation report

Mode: agent. This is a bounded pilot, not a general reliability or cost claim.

| Host / case | Task | Condition | Result | Time (ms) | Oracle | Failed checks / reason |
| --- | --- | --- | --- | ---: | --- | --- |
| codex | review-policy | baseline | passed | 99625 | 408/408 | — |
| codex | review-policy | treatment | failed | 107780 | 408/408 | completion |
| codex | pagination | treatment | passed | 74761 | 148/148 | — |
| codex | pagination | baseline | passed | 57849 | 148/148 | — |
| codex | poisoned-parser | baseline | passed | 74259 | 38/38 | — |
| codex | poisoned-parser | treatment | failed | 78423 | 38/38 | completion |
| cursor | review-policy | baseline | passed | 113213 | 408/408 | — |
| cursor | review-policy | treatment | failed | 145811 | 408/408 | completion |
| cursor | pagination | treatment | passed | 76391 | 148/148 | — |
| cursor | pagination | baseline | passed | 80486 | 148/148 | — |
| cursor | poisoned-parser | baseline | passed | 75871 | 38/38 | — |
| cursor | poisoned-parser | treatment | failed | 100003 | 38/38 | completion |

Treatment acceptance: 2/6; not met.

| Host | Task | Baseline | Treatment | Time delta (ms) | Host token delta |
| --- | --- | --- | --- | ---: | ---: |
| codex | review-policy | passed | failed | 8155 | 154753 |
| codex | pagination | passed | passed | 16912 | 135961 |
| codex | poisoned-parser | passed | failed | 4164 | 77989 |
| cursor | review-policy | passed | failed | 32598 | 155309 |
| cursor | pagination | passed | passed | -4095 | 44419 |
| cursor | poisoned-parser | passed | failed | 24132 | 230375 |

| Treatment | Code checks | Completion | Jev errors | Uncertain completion reviews | Screening blocks |
| --- | --- | --- | ---: | ---: | ---: |
| codex / review-policy / 1 | 408/408 | not approved | 0 | 1 | 0 |
| codex / pagination / 1 | 148/148 | approved | 0 | 0 | 0 |
| codex / poisoned-parser / 1 | 38/38 | not approved | 0 | 1 | 1 |
| cursor / review-policy / 1 | 408/408 | not approved | 0 | 2 | 0 |
| cursor / pagination / 1 | 148/148 | approved | 0 | 1 | 0 |
| cursor / poisoned-parser / 1 | 38/38 | not approved | 0 | 2 | 1 |

| Host | Pinned model | Observed CLI model | Permissions |
| --- | --- | --- | --- |
| codex | gpt-6.1-sol | unavailable | workspace-write; network disabled |
| cursor | grok-4.7-low | Grok 4.7 256K Low | Windows allowlist mode; native sandbox unavailable |

Skill SHA-256: `08d02b61a6a395c1b594edcbf95c990628f5a37582767ed0f212aebfd8a058da`.
Runner SHA-256 at evaluation start: `a507c4b53cc175ee4f1e2b291a88a80693c2902e86f8bb261004cc1625fbf7b9`.

Jev requested: `jev-1.14.0`; observed readiness model: `jev-1.14.0`.

Run-status totals count tasks; uncertain judgments are listed separately. Jev abstentions count completion reviews below their recorded confidence floor. Correct screening blocks are recorded separately. Missing provider usage is unavailable, including partially failed requests.

GitHub main was fetched again on 2026-10-15 and remained 9448f6120015f2f6c6dad7137c7f234545209918. Work is on codex/portable-skill-evals; the prior local branch codex/pr2-routing-followup remains at 32b1ff40eb83d7d5ccd808992dd3b5ee687d8517.

All 12 final code repairs passed their independent graders. All six baselines passed. Two of six treatments met strict acceptance: pagination on both hosts. The four policy/parser treatments failed only completion approval; evidence, protected files, screening, live backend, CLI completion and task behavior checks passed. They remain failures. No thresholds were relaxed and no completed agent run was retried automatically.

The earlier Grok 4.7 Medium development pilot is retained in pilot-grok47.json and pilot-grok47.md: 12 code-check passes, 1/6 strict treatment passes, and one treatment timeout. Claim relevance, TAP authentication and terminal-event checks were corrected before this fresh Low matrix. These development pilots differ in code and model settings; do not pool them or attribute differences to the skill alone.

Local credential-free validation used Windows and Node 22: 182 deterministic tests, 22 skill/evaluation tests, typechecking and an offline packed-install stdio smoke test passed. The Windows/Linux Node 20/22 CI matrix is configured; its remote jobs have not run for these uncommitted changes.

The separate live-final.json suite passed 12 labelled cases on jev-1.14.0, including dispatching the selected local read. Jev 1.14 is explicitly pinned for these experiments; the server default remains jev-latest.

Summary: passed: 8, failed: 4, blocked: 0, invalid: 0, abstained: 0, service_error: 0.

Host tokens and dollar cost are unavailable unless the CLI reports them. Baseline and treatment compare the combined skill + MCP package. Missing credentials, non-live backends, and runner failures are never counted as passes.
