#!/usr/bin/env python3
"""Render the GitHub watch dashboard markdown from Actions env. No secrets printed."""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import subprocess
from pathlib import Path


def env(name: str, default: str = "") -> str:
    return os.environ.get(name) or default


def now_utc() -> str:
    return dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def escape_cell(value: str, limit: int = 160) -> str:
    cleaned = "".join(" " if ord(ch) < 32 or ord(ch) == 127 else ch for ch in value)
    cleaned = cleaned.replace("\\", "\\\\").replace("|", "\\|")
    cleaned = " ".join(cleaned.split())
    if len(cleaned) > limit:
        cleaned = f"{cleaned[: limit - 1]}…"
    return cleaned


def pr_lines() -> tuple[str, str]:
    token = env("GITHUB_TOKEN") or env("GH_TOKEN")
    if not token:
        return "unavailable", "unavailable"
    try:
        raw = subprocess.check_output(
            [
                "gh",
                "pr",
                "list",
                "-R",
                "burnigtm/jev-mcp",
                "--state",
                "all",
                "--limit",
                "8",
                "--json",
                "number,title,state,url,mergedAt",
            ],
            text=True,
            timeout=20,
        )
    except (OSError, subprocess.CalledProcessError, subprocess.TimeoutExpired):
        return "unavailable", "unavailable"
    try:
        items = json.loads(raw)
    except json.JSONDecodeError:
        return "unavailable", "unavailable"
    if not isinstance(items, list):
        return "unavailable", "unavailable"
    open_prs = []
    merged = []
    for item in items:
        if not isinstance(item, dict):
            continue
        title = escape_cell(str(item.get("title") or ""), 120)
        link = f"[#{item.get('number')}]({item.get('url') or ''}) {title}".strip()
        if item.get("state") == "OPEN":
            open_prs.append(link)
        elif item.get("state") == "MERGED":
            merged.append(link)
    return (", ".join(open_prs) if open_prs else "none", ", ".join(merged[:5]) if merged else "none")


def render() -> str:
    event = env("EVENT_NAME") or "unknown"
    action = env("EVENT_ACTION")
    event_label = f"`{event}`" + (f" `{action}`" if action else "")
    sha = env("PR_SHA") or env("GITHUB_SHA") or "unknown"
    sha_short = sha[:7] if sha != "unknown" else sha
    ref = env("GITHUB_REF_NAME") or "unknown"
    pr_number = env("PR_NUMBER")
    pr_url = env("PR_URL")
    pr_title = env("PR_TITLE")
    pr_merged = env("PR_MERGED")
    pr_user = env("PR_USER")
    pr_head = env("PR_HEAD")
    review_state = env("REVIEW_STATE")
    open_line, merged_line = pr_lines()
    if pr_number and pr_url:
        headline = f"[PR #{pr_number}]({pr_url}) {escape_cell(pr_title)}".strip()
    elif event == "workflow_dispatch":
        headline = "Manual **Run workflow** delivery check (no PR payload)."
    elif event == "push":
        headline = f"Push to `{ref}` `{sha_short}`."
    else:
        headline = f"GitHub `{event}` on `{ref}`."
    target = env("AGENT_ID") or env("DEFAULT_AGENT_ID") or "bc-c78e565c-bc13-4d27-ada8-cc5e7e04eb9e"
    details = [
        f"- Event: {event_label}",
        f"- Ref: `{ref}` SHA [`{sha_short}`](https://github.com/burnigtm/jev-mcp/commit/{sha})" if sha != "unknown" else f"- Ref: `{ref}`",
    ]
    if pr_number:
        details.append(f"- PR user `{pr_user or 'n/a'}` head `{pr_head or 'n/a'}` merged `{pr_merged or 'n/a'}`")
    if review_state:
        details.append(f"- Review `{review_state}`")
    return "\n".join(
        [
            "# Jev_MCP GitHub watch",
            "",
            "This is the **Cursor Project dashboard** for [burnigtm/jev-mcp](https://github.com/burnigtm/jev-mcp). Open **Projects → Jev_MCP** (not the Agents list). GitHub Actions Notify refreshes this file on branch `cursor-watch` and asks the Project coordinator to copy it into the Project store.",
            "",
            "| | |",
            "| --- | --- |",
            f"| **Last refresh** | {now_utc()} |",
            f"| **Last GitHub event** | {event_label} |",
            f"| **GitHub `{ref}`** | [`{sha_short}`](https://github.com/burnigtm/jev-mcp/commit/{sha}) |" if sha != "unknown" else f"| **GitHub `{ref}`** | unknown |",
            f"| **Open PRs** | {open_line} |",
            f"| **Merged (recent)** | {merged_line} |",
            f"| **Cursor target** | `{target}` |",
            "",
            "## Latest event",
            "",
            headline,
            "",
            *details,
            "",
            "Follow-ups land in the **Jev_MCP Project** chat, not as an OS/Agents toast.",
            "",
            "Live Actions: [Notify Jev_MCP](https://github.com/burnigtm/jev-mcp/actions/workflows/notify-jev-mcp.yml).",
            "",
        ]
    )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", required=True, help="Markdown output path")
    args = parser.parse_args()
    text = render()
    path = Path(args.out)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")
    summary = env("GITHUB_STEP_SUMMARY")
    if summary:
        with open(summary, "a", encoding="utf-8") as handle:
            handle.write(text)
            if not text.endswith("\n"):
                handle.write("\n")
    print(f"Wrote dashboard {path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
