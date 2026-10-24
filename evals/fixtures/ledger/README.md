# Sample decision ledger

`ledger-2026-10.jsonl` is a real ledger written by `jev-mcp` (`JEV_MCP_LEDGER=1`) during a live benchmark run against `jev-1.14.0`, with each decision labelled from the benchmark case's ground truth through `jev_feedback`: 153 decisions, 153 labels (142 `correct`, 11 `false_alarm`, 0 `missed`). It is generated data, not a record of real work.

It contains no tool input or output text. Inputs appear only as HMACs keyed with a per-install secret that is **not** published, so the fingerprints cannot be matched to anything. It exists so the ledger readers planned for later (`calibrate`, a `jev://ledger` summary) can be developed and tested against real output rather than invented fixtures.

Regenerate with `npm run eval:bonus -- --set generated --per-tool 15 --extras 24 --ledger-dir <dir>`.
