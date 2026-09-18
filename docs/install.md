# Install: Cursor, Codex, GitHub, Windows D:

Node 20+ on the machine that **runs the MCP process** (your PC for Cursor/Codex).

```bash
git clone https://github.com/burnigtm/jev-mcp.git jev-mcp
cd jev-mcp
npm ci
npm run build
node dist/index.js doctor
```

Set `TYPESAFE_API_KEY` in the shell before `doctor` (`export TYPESAFE_API_KEY=ts_...` in Bash or `$env:TYPESAFE_API_KEY = 'ts_...'` in PowerShell). For a demo, set `JEV_MCP_MOCK=1` instead. The CLI does not automatically load `.env`.

`doctor` prints mock/live status. It must print `ready` before you attach the server. `doctor --json` emits structured status on stdout and exits nonzero when the check fails.

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

```powershell
codex mcp add jev --env TYPESAFE_API_KEY=ts_... -- node 'D:\jev-mcp\dist\index.js'
```

Or merge [`examples/codex.config.toml`](../examples/codex.config.toml) into `~/.codex/config.toml` (or a trusted project `.codex/config.toml`). Then `codex mcp list`.

The same binary works with Claude Code, Amp, and other stdio MCP clients.

## Contribute on GitHub

The repository is [burnigtm/jev-mcp](https://github.com/burnigtm/jev-mcp). Push a feature branch and open a pull request against `main`. Contributors without push access can use a fork.

```bash
git switch -c my-change
# Make changes and run the checks listed in README.md.
git add <changed-files>
git commit -m "Describe the change"
git push -u origin my-change
gh pr create --base main
```

## Check out on Windows D:

PowerShell (run as yourself, Git and Node 20+ installed):

```powershell
# Default checkout path: D:\jev-mcp
powershell -ExecutionPolicy Bypass -File scripts\checkout-d-drive.ps1 -RepoUrl https://github.com/burnigtm/jev-mcp.git -Mock
```

Manual:

```powershell
New-Item -ItemType Directory -Force -Path D:\jev-mcp | Out-Null
git clone https://github.com/burnigtm/jev-mcp.git D:\jev-mcp
Set-Location D:\jev-mcp
npm ci
npm run build
$env:JEV_MCP_MOCK = "1"
node dist\index.js doctor
```

Then point Cursor/Codex at `D:\jev-mcp\dist\index.js` as above.

Omit `-Mock` when you have exported a real key. The helper checks every Git, npm, and doctor exit code, stops at the first failure, and prints readiness only after doctor succeeds. It restores the original working directory and mock environment setting on success or failure.

## Package distribution

`npm pack` runs the build automatically. The package includes the compiled CLI, examples, skills, documentation, `AGENTS.md`, and checkout script. Run `npm run test:package` after `npm ci` to verify an offline install of the tarball and its mock diagnostics before publishing.

## CLI (debugging without an IDE)

```bash
node dist/index.js                  # stdio MCP
node dist/index.js doctor
node dist/index.js doctor --json
node dist/index.js eval --json "{...}"
node dist/index.js eval --state "..." --questions "{...}"
node dist/index.js eval --stdin < request.json
```

`eval` and `doctor --json` write JSON to stdout. Human-readable `doctor` writes to stderr. MCP reserves stdout for JSON-RPC. Request content and API keys are not logged.
