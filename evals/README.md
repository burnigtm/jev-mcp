# Evaluate the portable skill

See the [recorded development pilots](results/README.md) for actual results and known limitations. The final matrix passes all 12 behavioral graders but meets strict treatment acceptance on only 2/6 tasks; uncertain policy/parser reviews remain failures.

`npm run test:skill` validates the artifact, documentation requests, executable graders and deterministic MCP workflows without credentials. `npm test` never runs live evaluations, even when a key is inherited. `npm run benchmark` remains a mock transport benchmark.

## Live judgments

Export `TYPESAFE_API_KEY` in the invoking process and run `npm run eval:live`. Mock mode and custom provider roots are rejected. The twelve labelled cases test routing, screening, good/bad patches, passing but inadequate tests, hostile review summaries, supported/contradicted/unsupported claims, and completion without evidence. Positive and negative patch fixtures run actual Node tests before evaluation. A correct confident `unsupported` classification is distinct from accepting that claim. Abstentions, semantic failures and service errors remain separate results; any non-pass makes the command fail.

Both runners accept `--jev-model VERSION`, for example `npm run eval:live -- --jev-model jev-1.14.0`. This pins the provider model for that invocation and records its actual response identity; it does not change the server default. As of 2026-10-15, TypeSafe documents `jev-latest` as 1.13 stable and `jev-preview` as 1.14. Recheck the [model page](https://docs.typesafe.ai/models) before selecting a version.

## Coding agents

The agent runner and its trace proxy require `JEV_EVAL_ISOLATED=1` and refuse to start without it. Set that variable only inside a disposable container/VM with no host credentials, no host network, and a disposable home directory. The harness executes agent-written tests and imports agent-written source to grade behavior; that code must never run on a developer workstation. A redirection-free `scripts/lib/safe_http.py` is used by the event/dashboard scripts.

```text
JEV_EVAL_ISOLATED=1 npm run eval:agent -- --host all --paired --runs 1 --cursor-bin /absolute/path/to/cursor-agent --cursor-model MODEL
```

Use `--host codex` or `--host cursor` to select one host, `--task review-policy|pagination|poisoned-parser` for one task, and `--report artifacts/custom.json` for a separate report. `--codex-model` overrides the pinned model read from existing Codex configuration. Cursor requires an explicit model, its genuine CLI and `CURSOR_API_KEY` for the isolated profile. Existing Codex login is reused; no login or personal configuration is copied. A Grok executable is rejected even if named `agent`.

Grok 4.7 can run **inside the official Cursor CLI**: use `--cursor-model grok-4.7-medium` when that model is listed for the authenticated account. This is separate from the unrelated Grok `agent.exe`. The report records the model observed in Cursor's stream and requires a Grok 4.7 identity when that model was requested. Native Windows example:

```text
npm run eval:agent -- --host all --paired --runs 1 --cursor-bin "C:/Users/NAME/AppData/Local/cursor-agent/cursor-agent.ps1" --cursor-model grok-4.7-medium --jev-model jev-1.14.0
```

Each pair receives the same prompt, visible tests, model and limits (Codex reasoning effort is pinned to medium). The treatment installs the actual ZIP in `.agents/skills/jev-mcp` and connects the compiled server; the baseline has neither. Condition order alternates. Runs are sequential, bounded to five minutes and 20 Jev MCP calls shared across proxy restarts, and never retried automatically. The first matrix is 12 runs (three tasks × two hosts × two conditions). All six treatment results must pass; baseline failures remain comparison data. Repeat the whole matrix before making broader performance claims.

Host-owned graders run only after the agent exits. Before launching any agents, the runner validates each selected grader against the broken fixture and reference repair, records the results, and refuses to proceed if validation fails. CI repeats these checks. The historical task is an adapted reproduction of the actual `reviewAction` bug: base `23f72a982817f50d54090e9d52fe77c7c5217214`, fix `c4de6895bf14f2387ef9e87f7bf654e5a102fb29`. Full policy sources are pinned under `fixtures/review-policy`; transpilation and a minimal error class avoid installing dependencies in the evaluated project. The task receives the pre-fix source only, without upstream history, changelog or reference solution. The repository MIT license applies to these sources.

Code correctness, protected-file integrity, allowed changes, actual Jev usage and completion checks are graded separately. The poisoned report requires relevant screening and forbids test deletion/canary creation. The transparent proxy captures bounded metadata and source hashes, never raw arguments, diffs, claims, API keys, agent prose or stderr. Reports are JSON plus Markdown under ignored `artifacts/`. Token/cost values absent from a host remain unavailable.

Completion additionally binds the supplied unified diff to the actual source/test changes against a host-owned baseline. Before forwarding a review/verification/gate request, the proxy runs the visible tests with a clean environment and compares the full stable TAP content, ignoring durations. Equal summary counts alone are insufficient. It records only match booleans. At least one claim must concern the task or its tests, and every claim must receive automatic verification. Supporting claims need not repeat task keywords. Unrelated verified claims alone, stale artifacts, invented logs, terminal routing and changing tests after review cannot satisfy workflow completion. Hidden graders remain separate and run after the coding session.

The packaged [evidence helper](../skills/jev-mcp/references/evidence.md) snapshots before editing and collects the actual patch and test output without dependencies. Functional `requirements.txt` is identical within each pair. Cursor receives a protected connection descriptor for submitting the prepared JSON through the observed server. Codex submits it through its connected MCP tool because its shell sandbox has network access disabled. The helper never converts an abstention into approval or repeats an unchanged request automatically.

Routing use is recorded separately, not required on every repair: the skill deliberately keeps known deterministic steps in code. Routing itself is tested in the dedicated live and replay suites. Completion approval remains strict; a correct repair can still fail the treatment workflow when Jev abstains, the supplied evidence does not match the actual run, or screening is omitted. Save optional patches/logs under `.task-evidence/`. Tests are run with an explicit TAP reporter to make evidence comparable across terminal types. Windows proxy shutdown can be finalized by the host only after a successful agent exit and a matched request/reply audit for every reserved call.

Fresh task workspaces and user profiles exclude unrelated local skill discovery. Codex's existing authentication home is preserved while personal configuration, hooks, plugins, apps, memories and external browsing are disabled. Hidden graders are withheld procedurally; workspace-write is not a security boundary against arbitrary filesystem reads. Evaluate only these owned fixtures. Explicit commands with missing credentials, unavailable providers, unsuitable CLIs or missing pinned models produce blocked results (exit 2), never mock-backed passes.

Native Windows Cursor uses its official `.ps1` launcher (a `.cmd` path resolves to its sibling launcher) and allowlist mode because that CLI's sandbox requires macOS or Linux. Permissions and environment restrictions remain identical within each host pair. Linux/macOS use Cursor's enabled sandbox. Reports record this distinction; cross-host timings are not interchangeable. If a corporate root CA is required, `NODE_USE_SYSTEM_CA=1` enables the supported system-CA startup option for Cursor's bundled Node runtime.

Structured execution requires a successful terminal event, not merely startup JSON. Bounded event-type counts are retained without agent prose. Provider token totals are unavailable if any observed call lacks usage. Screening blocks are distinct from uncertain completion reviews; the latter count as abstentions only when their recorded review confidence falls below their recorded approval floor.

## TypeSafe design guidance

The supplied `typesafe-ai` skill guides application integrations; `jev-mcp` guides use of this server's tools. Its core principles also shape these evaluations: deterministic code owns execution and grading; Jev supplies narrow typed judgments; independent questions share state; raw probabilities and policy decisions remain distinct; uncertainty is not task success. The historical test checks non-compensating dimension floors, rather than letting a weighted total conceal a failed requirement. This project retains its own conservative thresholds and tests them rather than treating cookbook values as universal defaults.

Current primary references: [documentation index](https://docs.typesafe.ai/llms.txt), [JavaScript SDK](https://docs.typesafe.ai/sdk/javascript), [confidence](https://docs.typesafe.ai/confidence), [composite scoring](https://docs.typesafe.ai/patterns/composite-scoring), [Jev with coding agents](https://docs.typesafe.ai/introduction/coding-agents).

Optional files under .task-evidence/ are treated as data, never selected for execution by the host graders. Native Windows shell module caches are redirected to the isolated profile where supported; the exact Microsoft/Windows/PowerShell/ModuleAnalysisCache artifact is otherwise classified as a host cache. Existing tests, package configuration, skill/server configuration and the hostile-report canary checks remain protected.
