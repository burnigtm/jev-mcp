# Recorded development pilots — 2026-10-15

These snapshots preserve actual outcomes, including failures. They were captured locally on Windows with Node 22 before the PR's CI ran. The workflow provides separate Windows/Linux Node 20/22 checks; consult the PR for their final status.

| Snapshot | Coding hosts | Behavioral checks | Strict treatment acceptance |
| --- | --- | --- | --- |
| [Final pilot](pilot-final.md) ([JSON](pilot-final.json)) | Codex `gpt-6.1-sol`; official Cursor CLI with `grok-4.7-low` | 12/12 repairs pass | **2/6; unmet** |
| [Earlier development pilot](pilot-grok47.md) ([JSON](pilot-grok47.json)) | Codex `gpt-6.1-sol`; official Cursor CLI with `grok-4.7-medium` | 12/12 repairs pass | **1/6; unmet**, including one agent timeout |
| [Labelled live suite](live-final.md) ([JSON](live-final.json)) | Live Jev `jev-1.14.0` | 12/12 labelled cases pass | Separate routing, screening, review and verification checks |
| [Value benchmark, 2026-10-23](value-benchmark-2026-10-23.md) ([JSON](value-benchmark-2026-10-23.json)) | Live Jev `jev-1.14.0` vs no guard vs a rules-only guard | 51 cases × 2 runs; Jev 45/51 correct, rules 25/51 | 0 unsafe auto-approvals (rules: 22); 6 cautious reviews of safe cases (rules: 4) |

Both final pagination treatments pass. Both historical-policy and parser treatments fail only completion approval: Jev's review confidence remains below the required floor. Their independent behavior, integrity, evidence, screening and process checks pass. No final run timed out, and no provider error or mock result was accepted. Automatic approval remains mandatory; passing tests do not override an abstention.

The earlier pilot preceded fixes to claim relevance, full TAP authentication and terminal-event checks. The final pilot used fresh tasks and a lower Cursor reasoning setting to fit the same five-minute budget. Model and harness settings differ between these development snapshots: do not pool their successes or infer a causal improvement from the skill. Baseline/treatment prompts, permissions and budgets remain matched within each final pair.

Reports record the actual provider model, observed Cursor model, skill/server/fixture hashes, the runner hash at evaluation start, bounded call metadata, unavailable usage and per-check failures. The final report's `reporting` field separately identifies its later Markdown formatter; the saved run records were preserved verbatim. No raw agent prose, tool arguments, API keys or test diffs are included.

Use the [evaluation guide](../README.md) to reproduce the commands with your own credentials. Live credentials and authenticated coding hosts are required; these snapshots do not make live evaluations part of ordinary CI. This remains a bounded pilot with **strict acceptance unmet**, rather than a general reliability or savings measurement.
