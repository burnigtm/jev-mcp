# Changelog

## Unreleased

### Combined completion gate

- Added `jev_gate` and the `jev://packs/gate` resource. One upstream request reviews a patch and verifies completion claims against supplied evidence.
- Gate results include the overall action, stable reason codes, separate review and verification reports, input coverage, token usage, and model name.
- Automatic approval requires complete context, an acceptable patch review, and confident verification of every claim. Unsupported claims require review; confidently contradicted claims escalate.

See [tool arguments and outputs](tools.md) for the gate contract and examples.

### Reliability fixes

- Truncation now reserves space for its marker and reports how much input was evaluated. Incomplete context cannot return `auto`; oversized question sets fail before an API call.
- Ranking preserves original candidate IDs across bounded reduction rounds, rejects duplicate IDs, handles singleton batches, and reports when the requested reduction cannot fit the budget. Candidate text limits apply consistently to state and criteria.
- Coding-loop stop decisions now account for risk and whether the task is sufficiently complete.
- MCP cancellation and `JEV_MCP_TIMEOUT_MS` enforce one total deadline across upstream calls, retries, and ranking rounds. The default is 30 seconds.
- Provider responses are checked for expected answer IDs, types, ranges, probability distributions, and consistency before policy decisions are calculated.
- Failures expose stable error codes and safe messages without returning provider response bodies or credentials.

### Diagnostics and distribution

- Added `doctor --json` for machine-readable readiness checks, with a nonzero exit status on failure. Unknown CLI commands and invalid evaluation input fail explicitly.
- The Windows checkout helper now stops on native-command failures and restores the caller's working directory and temporary environment settings.
- `npm pack` and `npm publish` build through `prepack`. Packages include linked documentation, examples, the agent skill, and installation scripts.
- Added Windows and Linux CI jobs for Node 20 and 22, covering tests, typechecking, builds, and an isolated offline install of the packed artifact.
- Updated installation, configuration, architecture, tool, and agent guidance. Environment files are not loaded automatically.
- Updated repository metadata and checkout instructions to use the GitHub repository.

### Compatibility notes

- Existing tools remain available; `jev_gate` is additive. Consumers must handle stricter review or escalation results when context is incomplete or a stop decision is risky.
- Token budgets use a character-based estimate, not an exact provider tokenizer. Inspect `coverage` and `truncated`; ranking identifies estimates that describe only its final upstream request.
- Existing tool errors expose structured error details. Gate failures instead set `isError` and return the error object as JSON text, without `structuredContent`, so MCP clients do not validate an error against the gate's success schema.
- No dependency versions or package version were changed. Mock mode remains suitable only for tests and demonstrations.

### Validation

The implementation passed the local test suite with 77 passing tests and one live API test skipped because no API key was configured. Typechecking, the production build, and the separate packed-install smoke test passed. The smoke test uses the committed production dependency graph and cached integrity-checked artifacts, then runs the installed CLI from an isolated directory.

Regression coverage includes limits, ranking, gate decisions, HTTP failures and retries, deadlines, cancellation, response validation, CLI behavior, Windows installer failures, and real stdio MCP calls. Live provider judgment quality has not been validated by these mock and fixture-based checks.
