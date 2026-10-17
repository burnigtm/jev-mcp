# Install the skill and connect its server

These are two separate steps. The ZIP contains instructions and references, not a server binary or credentials.

## Skill discovery

Extract the complete folder to `.agents/skills/jev-mcp/` in the project. Keep `SKILL.md`, `references/`, `scripts/`, and `LICENSE` together. Current Codex and Cursor discover this shared project location. Cursor also supports `.cursor/skills/`; install in only one location to avoid duplicate skills.

Sources: [Codex skills](https://learn.chatgpt.com/docs/build-skills), [Cursor skills](https://cursor.com/docs/skills).

## Server prerequisites

Install Node.js 20+ and a built jev-mcp checkout or npm artifact. For a checkout, run `npm ci` and `npm run build` there. Obtain your own TypeSafe key and supply `TYPESAFE_API_KEY` through the server process environment. The server does not automatically read `.env`. Never put a real key into a committed configuration, skill, or task prompt.

The source is [burnigtm/jev-mcp on GitHub](https://github.com/burnigtm/jev-mcp). Build a local checkout:

```text
git clone https://github.com/burnigtm/jev-mcp.git
cd jev-mcp
npm ci
npm run build
```

Run `node /absolute/path/to/jev-mcp/dist/index.js doctor --json` with the key in its environment. Require `ready: true` and `mock: false` for live use. Paths refer to the machine running the server.

## Codex

Register the built server with `codex mcp add jev -- node /absolute/path/to/jev-mcp/dist/index.js`. In the resulting `mcp_servers.jev` configuration entry, set `env_vars = ["TYPESAFE_API_KEY"]` to forward the shell key. Launch Codex from that environment and check `codex mcp list`.

```toml
[mcp_servers.jev]
command = "node"
args = ["/absolute/path/to/jev-mcp/dist/index.js"]
env_vars = ["TYPESAFE_API_KEY"]
```

## Cursor

Merge this entry into the project's `.cursor/mcp.json`, replacing the absolute path. The variable must be available to Cursor when it starts.

```json
{
  "mcpServers": {
    "jev": {
      "command": "node",
      "args": ["/absolute/path/to/jev-mcp/dist/index.js"],
      "env": { "TYPESAFE_API_KEY": "${env:TYPESAFE_API_KEY}" }
    }
  }
}
```

For Windows JSON paths, use forward slashes or doubled backslashes. Restart the connection and confirm `jev` is connected. The Cursor CLI's `agent mcp list-tools jev` is another readiness check when that CLI is installed.

## First use and failures

Ask the agent to inspect a coding task using the `jev-mcp` skill. A successful connection exposes twelve `jev_*` tools. Use `jev_step` to route a genuine next-step choice and inspect its typed result. Installing a skill does not grant tool access. Missing keys, timeouts, provider errors, incomplete coverage, and uncertain decisions are not approvals. Preserve the user's existing authorization while collecting missing evidence.
