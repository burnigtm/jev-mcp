# Pull-request gate (`jev-mcp ci`)

A check that runs on a pull request and says: no objection, hold for review, or escalate. It is evidence for a human reviewer, never a merge approval, and it never runs the pull request's code.

```bash
jev-mcp ci --base "$BASE_SHA" --head "$HEAD_SHA" \
  --pr-title-file title.txt --pr-body-file body.txt --tests-file ci.log \
  --format github --fail-on review
```

| Option | Meaning |
| --- | --- |
| `--base`, `--head` | Refs (or SHAs) to compare; the diff is `base...head`, the changes the head introduced since it diverged. Refs that look like options or ranges are refused before git runs |
| `--pr-title-file`, `--pr-body-file` | The pull request's title and description, **as files** (see below) |
| `--tests-file` | A CI or test log. It is the only evidence for the description's checked boxes |
| `--format json\|github` | `json` (default) prints a summary with no diff text and no pull-request prose. `github` prints workflow annotations, and appends a markdown summary to `$GITHUB_STEP_SUMMARY` (or stdout when unset) |
| `--fail-on review\|escalate` | `review` (default): exit 10 on `review`, 20 on `escalate`. `escalate`: exit 20 on `escalate` only; a `review` verdict is still reported, but the exit code is 0 |
| `--deterministic-only` | Skip every model call (the mode for pull requests from forks) |
| `--callers` | Look up where changed symbols are used outside the diff and show the uses to the judge (also `JEV_MCP_CALLER_CONTEXT=on`). Off by default, because on the benchmark it made Jev hold more correct fixes and caught nothing extra |
| `--require-jev` | Treat a missing API key as an error (exit 2) instead of falling back to the deterministic checks |

Exit codes: **0** auto, **10** review, **20** escalate, **2** error. An error is fail-closed: a bad ref, an unreadable repository, or a provider failure never looks like a pass.

## What it checks

1. **The repository policy from the base ref.** `.jev-policy.json` is read with `git show BASE:.jev-policy.json`, so a pull request cannot loosen the rules that govern it. Every changed path (and a rename's old path) is matched against `protected_paths`: `deny` escalates, `review` holds. Changing `.jev-policy.json` itself holds (`policy_file_changed`); a policy that does not parse holds (`policy_unreadable`). `JEV_POLICY_FILE` is ignored here.
2. **Deterministic floors:** a sensitive file in the change (named, never read), a secret-shaped string in the diff (redacted before anything is sent), a truncated diff, a lockfile or binary change, and prompt-injection phrases in the title, body or commit messages (`injection_in_pr_text`). A repository that writes about prompt injection will trip the last one on its own pull requests; it holds for review and says why.
3. **With Jev:** the description and commit messages are screened as untrusted text; the patch is reviewed and security-checked, in parts when the diff is large ([chunked review](tools.md#jev_review)); and every **checked box** (`- [x] ...`, at most five) is verified against the log in `--tests-file`. With no checked boxes nothing is claimed, so nothing is verified.

Without credentials (a fork's pull request, `--deterministic-only`) only 1 and 2 run, and the output says `jev_not_run` and "this is not a review of the change".

## Trust boundaries

Everything about a pull request is attacker-controlled: the diff, title, body, commit messages, branch name and file names.

- **Pass text as files.** Write the title and body to files from `env:` values and give the paths to `--pr-title-file` and `--pr-body-file`. Never put `${{ github.event.pull_request.body }}` or a branch name inside a `run:` script: that is shell injection.
- **`pull_request`, not `pull_request_target`.** The job must not run with secrets on code it did not review.
- **Never execute pull-request code.** The gate reads the diff and the log; it runs nothing from the checkout. Install the checker from a pinned release into the runner's temp directory with `--ignore-scripts`, so a `.npmrc` or `package.json` in the pull request cannot change what is installed.
- **Forks get no secrets.** The example runs the deterministic checks only for them and says so, instead of failing noisily.
- **Output is sanitized.** Annotations escape `%`, CR, LF, `:` and `,`; a file name containing a control character is skipped; markdown summaries neutralize mentions, HTML, links, tables and code spans; at most ten annotations.
- **No content leaves.** The JSON summary and the step summary hold reason codes, counts and file names, not diff text or the pull request's prose.

[`examples/github-pr-gate.yml`](../examples/github-pr-gate.yml) is a workflow that follows all of this. It is an example and is **not enabled** in this repository; replace the placeholder version with a pinned release before use. A test checks that it uses `pull_request`, keeps pull-request expressions out of scripts, and disables credential persistence.

## Rolling it out

The gate is strict. A dry run on this repository's own large pull requests escalated two of three ([measurements](../evals/results/ci-2026-10-24.md)). Start as a non-required check, or with `--fail-on escalate`, read what it holds for a few weeks, and only then make it required. `JEV_MCP_CI_DEADLINE_MS` (default 600000) bounds the whole run.
