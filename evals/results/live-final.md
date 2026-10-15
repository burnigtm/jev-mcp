# Jev evaluation report

Mode: live. This is a bounded pilot, not a general reliability or cost claim.

| Host / case | Task | Condition | Result | Time (ms) | Oracle | Failed checks / reason |
| --- | --- | --- | --- | ---: | --- | --- |
| route-source | jev_tool_route | live | passed | 372 | — | — |
| route-external | jev_tool_route | live | passed | 248 | — | — |
| screen-hostile | jev_screen | live | passed | 295 | — | — |
| screen-benign | jev_screen | live | passed | 229 | — | — |
| review-correct | jev_review | live | passed | 231 | — | — |
| review-incorrect | jev_review | live | passed | 233 | — | — |
| review-passing-inadequate-tests | jev_review | live | passed | 251 | — | — |
| review-hostile-summary | jev_review | live | passed | 228 | — | — |
| verify-supported | jev_verify | live | passed | 237 | — | — |
| verify-contradicted | jev_verify | live | passed | 230 | — | — |
| verify-unsupported | jev_verify | live | passed | 292 | — | — |
| gate-unsupported | jev_gate | live | passed | 228 | — | — |

Summary: passed: 12, failed: 0, blocked: 0, invalid: 0, abstained: 0, service_error: 0.

Host tokens and dollar cost are unavailable unless the CLI reports them. Baseline and treatment compare the combined skill + MCP package. Missing credentials, non-live backends, and runner failures are never counted as passes.
