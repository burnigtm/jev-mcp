# Enforced hooks and `jev-mcp check`

The MCP tools are advisory: the host has to call them. The hooks make the guard run on every tool call in Claude Code, and `jev-mcp check` gives any other host the same decision from a command line.

A hook can only **restrict**. It prints nothing (the normal permission flow continues), or it asks the user to confirm, or, only for an explicit `deny` rule in your own policy file, it blocks. It never prints `allow`, and `auto` from Jev never grants permission.

## Install

```bash
jev-mcp hook install                 # print the settings JSON
jev-mcp hook install --stop --shadow # also a Stop hook; log decisions without enforcing
jev-mcp hook install --write .claude/settings.local.json
```

`--write` merges into the file: other settings and other hooks are left alone, and a previous entry of ours is replaced rather than duplicated. A file that is not a JSON object is left untouched. The printed settings use exec form (`"command": "node"` with an absolute path to `dist/index.js` in `args`), which works on Windows, where a `.cmd` shim cannot be spawned directly, and with paths that contain spaces. [`examples/claude-code.settings.json`](../examples/claude-code.settings.json) shows the output.

**Roll out in shadow mode first.** `JEV_MCP_HOOKS=shadow` (or `--shadow` on install) computes every decision, records it in the [ledger](configuration.md#decision-ledger) when `JEV_MCP_LEDGER=1`, prints a one-line summary on stderr, and changes nothing. Switch to enforcing once you have seen how often it would have interrupted. `JEV_MCP_HOOKS=off` is the kill switch.

## What `PreToolUse` checks

Matched tools: `Bash`, `PowerShell`, `Read`, `Write`, `Edit`, `MultiEdit`, `NotebookEdit`. Anything else is ignored.

| Action | Decided by | Model call |
| --- | --- | --- |
| A command the classifier confirms read-only, touching no sensitive path | silent | no |
| A read-only command or a `Read` of a key or credential file (`~/.ssh/id_rsa`, `.env`, `.aws/credentials`, ...) | ask | no |
| A file edit: inside the workspace, not sensitive, not protected | silent | no |
| A file edit that is outside the workspace, sensitive, protected by the policy, or one of the guard's own files (`.jev-policy.json`, `.claude/settings*.json`, `.claude/hooks/`) | ask (deny if the policy says `deny`) | no |
| A command matching the policy's `deny` rules | **deny** | no |
| Anything else with an effect (a write, an external action, an unclassifiable command) | `jev_scope` on the task and the command | yes |

The hook declares nothing about a command; it classifies the text itself (bash, PowerShell and cmd), so an agent cannot talk its way past it by describing a destructive command as harmless. The approved task is the last human prompt in the transcript (`transcript_path`), read defensively from the tail of the file; tool results, subagent prompts and harness text are skipped. With no task visible, a command with an effect asks.

Model answers become `ask`, never `deny`: a `deny` cannot be overridden at the prompt, and a model's judgment is not a rule. Honest local writes are the known weak spot (see the measurements), which is one more reason to start in shadow mode.

### When Jev cannot be reached

The model is only asked about the gray zone, and a failure there (no network, timeout, budget, or the per-session call cap) falls back to the effect the classifier found:

| Effective effect | Result |
| --- | --- |
| destructive, external write, unclassifiable | ask |
| local write, read-only | silent |

The hook has its own deadline (`JEV_MCP_HOOK_DEADLINE_MS`, default 20 s, below the 30 s the install sets), so a stalled provider cannot hit the host's timeout. Honest limit: printing nothing is the normal permission flow, which is also what a host does when a hook times out or crashes. If you want a failing hook to block, install with `--block-on-failure` (it sets `onFailure: "block"` on the `PreToolUse` hook only; a failing Stop hook never blocks). That also blocks tools whenever the hook cannot run at all, so use it for destructive matchers only.

### Costs and caps

The classifier and policy answer first, so roughly half of events never reach the model (see the measurements). `JEV_MCP_HOOK_MAX_CALLS` (default 200) caps model calls per session; past it, the fail-closed table above applies. `JEV_MCP_TOKEN_BUDGET` caps the process as usual. Lazy loading keeps the deterministic path from loading the provider SDK.

## The `Stop` hook

Opt in with `"require_gate_on_stop": true` in `.jev-policy.json` and install with `--stop`. When the agent tries to finish, the hook gathers the uncommitted changes (`git diff` against `HEAD` plus new files; sensitive files are named but never read), redacts secret-shaped strings, extracts up to five completion claims from the closing message, optionally runs your test command, and runs the completion gate with the security check. If the gate is not `auto` it blocks once with a short reason, naming the claims the evidence does not support.

- At most **two** blocks per session; after that it lets the session finish. A stop already continued by the hook (`stop_hook_active`) is never blocked again.
- `JEV_MCP_TEST_COMMAND` is a command from **your environment**, never from a repository file (a checked-in command would be a code-execution path). It runs with a timeout (`JEV_MCP_TEST_TIMEOUT_MS`, default 120 s) and its output is evidence for the claims.
- A secret found in the diff, a sensitive file in the change, or a truncated diff holds the stop (`secret_in_diff`, `sensitive_file_changed`, `diff_truncated`) on top of what the gate decides. Secrets are replaced with `[REDACTED:kind]` before anything is sent to the provider.
- Any failure (no repository, no task, provider error) lets the session finish. It never traps the user.

## `jev-mcp check`

For hosts without hooks (Codex, Cursor, scripts). JSON on stdin, decision JSON on stdout; exit code 0 `auto`, 10 `review`, 20 `escalate`, 2 error.

```bash
echo '{"kind":"action","task":"Fix the pager","tool_name":"Bash","tool_input":{"command":"git push --force"}}' | jev-mcp check
echo '{"kind":"changes","request":"Fix the pager","claims":["All tests pass"],"evidence":"12 passed"}' | jev-mcp check
```

`action` runs the same decision as the `PreToolUse` hook (pass `task` instead of a transcript). `changes` gates the working tree against the request and the claims. No hook API of Codex or Cursor is claimed here; wire the command into whatever pre-action mechanism the host offers.

## Windows and process notes

Read all of stdin, accept a byte-order mark and CRLF, print a single JSON line to stdout, send diagnostics to stderr, and exit explicitly after the answer so a provider socket cannot keep the process alive. A hook started by a process the guard itself started (the test command) sees `JEV_MCP_HOOK_ACTIVE=1` and stays silent, so it cannot recurse.

## Measured

[evals/results/hooks-2026-10-24.md](../evals/results/hooks-2026-10-24.md): 120 replayed actions on live `jev-1.14.0`, 57/64 risky actions held with no configuration and 64/64 with a small policy, at the price of interrupting about half of honest local writes; 167 ms median.
