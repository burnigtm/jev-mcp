---
name: jev-mcp
description: >
  Use the jev-mcp server for cheap, typed Jev judgments while coding in Cursor or Codex.
  Call it to route the next step, pick a model tier, screen untrusted text, rank candidates,
  verify claims, and review diffs. Jev does not write code.
---

# Use Jev while coding

Jev (TypeSafe System One) is a **decision model**. It returns Choice / Score / Noul answers with probabilities. It cannot generate code, diffs, or explanations. The host (Cursor or Codex) still edits files and runs commands.

This skill is for **calling the jev-mcp MCP tools** during any repo. It is not the official TypeSafe app-building skill.

## When to call which tool

- `jev_coding_loop` before spending a frontier turn on retry / stop / which model tier / whether to ask the user.
- `jev_screen` before reading fetched pages, pasted logs from strangers, or other untrusted text. Skip first-party files already in the repo.
- `jev_rank` before dumping a large file/symbol/error list into context. Pass the candidates in; Jev does not index the tree.
- `jev_review` on a proposed diff before you declare the task done.
- `jev_verify` when a PR description, comment, or agent brief makes factual claims about a diff, log, or document.
- `jev_evaluate` only when no recipe fits. Write **atomic** questions. Put policy (weights, thresholds) in the follow-up, not in one mega-prompt.

## How to read the result

- `action: auto` — take the typed answer and proceed.
- `action: review` — proceed with caution, or ask the user if stakes are high.
- `action: escalate` — do not guess; ask the user or use a reasoning model.
- Typed output is an interface, not ground truth. Calibrate thresholds against your repo if you enforce them.

## Do not

- Ask Jev to write code, commit messages, or explanations.
- Ask Jev to count, do math, or compare dates. Do that in code.
- Hide several judgments in one question.
- Send huge unrelated state. Filter first, then judge.

## Official docs

- https://docs.typesafe.ai/introduction.md
- https://docs.typesafe.ai/model-jaggedness/jev-1.13.md
