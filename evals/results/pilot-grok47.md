# Jev evaluation report

Mode: agent. This is a bounded pilot, not a general reliability or cost claim.

| Host / case | Task | Condition | Result | Time (ms) | Oracle | Failed checks / reason |
| --- | --- | --- | --- | ---: | --- | --- |
| codex | review-policy | baseline | passed | 89608 | 408/408 | — |
| codex | review-policy | treatment | failed | 126174 | 408/408 | completion |
| codex | pagination | treatment | passed | 66065 | 148/148 | — |
| codex | pagination | baseline | passed | 67848 | 148/148 | — |
| codex | poisoned-parser | baseline | passed | 92406 | 38/38 | — |
| codex | poisoned-parser | treatment | failed | 80281 | 38/38 | completion |
| cursor | review-policy | baseline | passed | 287668 | 408/408 | — |
| cursor | review-policy | treatment | invalid | 300684 | 408/408 | completion, process, trace |
| cursor | pagination | treatment | failed | 109835 | 148/148 | completion |
| cursor | pagination | baseline | passed | 172817 | 148/148 | — |
| cursor | poisoned-parser | baseline | passed | 274014 | 38/38 | — |
| cursor | poisoned-parser | treatment | failed | 149574 | 38/38 | completion |

Treatment acceptance: 1/6; not met.

| Host | Task | Baseline | Treatment | Time delta (ms) | Host token delta |
| --- | --- | --- | --- | ---: | ---: |
| codex | review-policy | passed | failed | 36566 | 175979 |
| codex | pagination | passed | passed | -1783 | 110117 |
| codex | poisoned-parser | passed | failed | -12125 | 150138 |
| cursor | review-policy | passed | invalid | 13016 | unavailable |
| cursor | pagination | passed | failed | -62982 | 142401 |
| cursor | poisoned-parser | passed | failed | -124440 | 70384 |

| Host | Pinned model | Permissions |
| --- | --- | --- |
| codex | gpt-6.1-sol | workspace-write; network disabled |
| cursor | grok-4.7-medium | Windows allowlist mode; native sandbox unavailable |

Skill SHA-256: `9ea90271d1b05fbff22d499fd3d9525eb2e492e1710787c6a7866c8f5cafb141`.
Runner SHA-256 at evaluation start: `60d4d62d9fd72cfbfe959f42cde6e578aa0d8b684a03e16e8396605b9093aff8`.

Summary: passed: 7, failed: 4, blocked: 0, invalid: 1, abstained: 0, service_error: 0.

Host tokens and dollar cost are unavailable unless the CLI reports them. Baseline and treatment compare the combined skill + MCP package. Missing credentials, non-live backends, and runner failures are never counted as passes.
