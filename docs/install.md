# Install: Cursor, Codex, GitHub, Windows D:

Node 20+ on the machine that **runs the MCP process** (your PC for Cursor/Codex).

```bash
git clone <this-repo-url> jev-mcp
cd jev-mcp
npm install
npm run build
node dist/index.js doctor
```

`doctor` prints mock/live status. It must print `ready` before you attach the server.

Get a TypeSafe key: [console.typesafe.ai/settings/keys](https://console.typesafe.ai/settings/keys). Without a key, set `JEV_MCP_MOCK=1` (demos only).

Always pass `TYPESAFE_API_KEY` in the MCP `env` block. Some hosts strip inherited environment variables and the server then looks “broken.”

## Cursor

1. Copy [`examples/cursor.mcp.json`](../examples/cursor.mcp.json) to `.cursor/mcp.json` in the project (or Cursor’s user MCP settings).
2. Set `args` to the **absolute** path of `dist/index.js` on this machine.
3. Set `env.TYPESAFE_API_KEY`.
4. Copy [`skills/jev-mcp/SKILL.md`](../skills/jev-mcp/SKILL.md) into the project (Cursor skills / `AGENTS.md` pointer) so the agent actually calls the tools.
5. Restart MCP. Settings → MCP should show `jev` as connected.
6. Ask: “Call `jev_coding_loop` on this task and last test output.”

Windows example:

```json
{
  "mcpServers": {
    "jev": {
      "command": "node",
      "args": ["D:\\jev-mcp\\dist\\index.js"],
      "env": {
        "TYPESAFE_API_KEY": "ts_..."
      }
    }
  }
}
```

## Codex

```bash
codex mcp add jev --env TYPESAFE_API_KEY=ts_... -- node D:\jev-mcp\dist\index.js
```

Or merge [`examples/codex.config.toml`](../examples/codex.config.toml) into `~/.codex/config.toml` (or a trusted project `.codex/config.toml`). Then `codex mcp list`.

The same binary works with Claude Code, Amp, and other stdio MCP clients.

## Publish to GitHub

This project currently lives on Cursor’s git remote until you add GitHub.

On a machine where `gh` is logged in:

```bash
cd jev-mcp
gh repo create jev-mcp --public --source=. --remote=github --push
```

Private instead: `--private`. If the repo already exists:

```bash
git remote add github git@github.com:<you>/jev-mcp.git
git push -u github main
```

## Check out on Windows D:

PowerShell (run as yourself, Git and Node 20+ installed):

```powershell
# default path D:\jev-mcp — change the URL after you create the GitHub repo
powershell -ExecutionPolicy Bypass -File scripts\checkout-d-drive.ps1 -RepoUrl git@github.com:<you>/jev-mcp.git
```

Manual:

```powershell
New-Item -ItemType Directory -Force -Path D:\jev-mcp | Out-Null
git clone git@github.com:<you>/jev-mcp.git D:\jev-mcp
Set-Location D:\jev-mcp
npm install
npm run build
$env:JEV_MCP_MOCK = "1"
node dist\index.js doctor
```

Then point Cursor/Codex at `D:\jev-mcp\dist\index.js` as above.

## CLI (debugging without an IDE)

```bash
node dist/index.js                  # stdio MCP
node dist/index.js doctor
node dist/index.js eval --json "{...}"
node dist/index.js eval --state "..." --questions "{...}"
node dist/index.js eval --stdin < request.json
```

`eval` writes JSON to stdout. `doctor` writes to stderr. Never log Jev traffic on stdout while MCP is running.
