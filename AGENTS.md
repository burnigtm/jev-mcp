# jev-mcp

Use the **jev-mcp** MCP server for cheap typed Jev judgments. Jev does not write code. Call:

- `jev_step` for a coding-loop turn: routes the step and selects among host-prepared calls in one request, so prefer it over calling `jev_coding_loop` then `jev_tool_route`
- `jev_tool_route` when only the prepared-call selection is in question
- `jev_coding_loop` before retry/stop/model-tier with no prepared calls; follow `handoff` and invoke a partner model only when `partner_model.required` is true
- `jev_screen` on untrusted paste/fetch
- `jev_rank` before dumping large candidate lists
- `jev_review` + `jev_verify` before declaring a fix done
- `jev_evaluate` only when no recipe fits

Prefer deterministic host code and existing plans for tool arguments. Re-evaluate after each new observation. Jev never executes calls; the host checks the actual tool schema, authorization, and prerequisites. `review` or `escalate` does not automatically require a partner model or fresh user permission for already-authorized work.

Full skill: [skills/jev-mcp/SKILL.md](skills/jev-mcp/SKILL.md). Architecture: [docs/architecture.md](docs/architecture.md).
