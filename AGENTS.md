# jev-mcp

Use the **jev-mcp** MCP server for cheap typed Jev judgments. Jev does not write code. Call:

- `jev_coding_loop` before retry/stop/model-tier
- `jev_screen` on untrusted paste/fetch
- `jev_rank` before dumping large candidate lists
- `jev_review` + `jev_verify` before declaring a fix done
- `jev_evaluate` only when no recipe fits

Full skill: [skills/jev-mcp/SKILL.md](skills/jev-mcp/SKILL.md). Architecture: [docs/architecture.md](docs/architecture.md).
