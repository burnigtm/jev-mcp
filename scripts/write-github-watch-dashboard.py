#!/usr/bin/env python3
"""Render the Jev_MCP GitHub watch dashboard. No secrets printed.

The highest-numbered pull request is always the first thing on the page.
A failed GitHub read keeps the last saved snapshot instead of blanking the board.
"""

from __future__ import annotations

import argparse
import base64
import datetime as dt
import html
import json
import os
import re
import subprocess
import urllib.error
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any


REPO = "burnigtm/jev-mcp"
SNAPSHOT_RE = re.compile(r"<!-- jev-watch:snapshot ([A-Za-z0-9+/=]+) -->")
PULL_LIMIT = 15


def env(name: str, default: str = "") -> str:
    return os.environ.get(name) or default


def now_utc() -> dt.datetime:
    return dt.datetime.now(dt.timezone.utc).replace(microsecond=0)


def iso(moment: dt.datetime) -> str:
    return moment.astimezone(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def parse_time(value: str) -> dt.datetime | None:
    if not value:
        return None
    try:
        return dt.datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None


def relative_to(value: str, now: dt.datetime) -> str:
    parsed = parse_time(value)
    if parsed is None:
        return ""
    seconds = int((now - parsed).total_seconds())
    if seconds < 45:
        return "just now"
    minutes = seconds // 60
    if minutes < 60:
        return f"{minutes}m ago"
    hours = minutes // 60
    if hours < 48:
        return f"{hours}h ago"
    return f"{hours // 24}d ago"


def when(value: str, now: dt.datetime) -> str:
    if not value:
        return "n/a"
    rel = relative_to(value, now)
    return f"{value} · {rel}" if rel else value


def token() -> str:
    return (env("GITHUB_TOKEN") or env("GH_TOKEN")).strip()


def escape_cell(value: str, limit: int = 160) -> str:
    cleaned = "".join(" " if ord(ch) < 32 or ord(ch) == 127 else ch for ch in value)
    cleaned = cleaned.replace("\\", "\\\\").replace("|", "\\|")
    cleaned = " ".join(cleaned.split())
    if len(cleaned) > limit:
        cleaned = f"{cleaned[: limit - 1]}…"
    return cleaned


def md(value: object) -> str:
    text = "" if value is None else str(value)
    text = text.replace("\r", " ").replace("\n", " ")
    text = text.replace("|", "\\|").replace("<", "&lt;").replace(">", "&gt;")
    return text.strip()


def md_link_label(value: object) -> str:
    return md(value).replace("[", "\\[").replace("]", "\\]")


def blank_pull(number: int) -> dict[str, Any]:
    return {
        "number": number,
        "title": "",
        "state": "OPEN",
        "url": f"https://github.com/{REPO}/pull/{number}",
        "user": "",
        "head": "",
        "base": "main",
        "sha": "",
        "merge_commit_sha": "",
        "draft": False,
        "created_at": "",
        "updated_at": "",
        "merged_at": "",
        "closed_at": "",
        "additions": None,
        "deletions": None,
        "changed_files": None,
        "commits_count": None,
        "comments": None,
        "review_comments": None,
        "labels": [],
        "body": "",
        "review_decision": "",
        "reviews": [],
        "commits": [],
        "files": [],
        "checks": [],
    }


def state_of(raw_state: str, merged_at: str = "", merged_flag: object = None) -> str:
    if merged_at or merged_flag is True or str(merged_flag).lower() == "true":
        return "MERGED"
    state = (raw_state or "").upper()
    if state == "MERGED":
        return "MERGED"
    if state == "OPEN":
        return "OPEN"
    if state in {"CLOSED", "CLOSE"}:
        return "CLOSED"
    return "OPEN"


def clip(value: str, limit: int = 500) -> str:
    text = re.sub(r"\s+", " ", (value or "").replace("\r", " ")).strip()
    if len(text) <= limit:
        return text
    return text[: limit - 1].rstrip() + "…"


def from_api_item(item: dict[str, Any]) -> dict[str, Any]:
    user = item.get("user") or {}
    head = item.get("head") or {}
    base = item.get("base") or {}
    pull = blank_pull(int(item.get("number") or 0))
    pull.update(
        {
            "title": item.get("title") or "",
            "state": state_of(str(item.get("state") or ""), str(item.get("merged_at") or "")),
            "url": item.get("html_url") or pull["url"],
            "user": user.get("login") or "",
            "head": head.get("ref") or "",
            "base": base.get("ref") or "main",
            "sha": head.get("sha") or "",
            "draft": bool(item.get("draft")),
            "created_at": item.get("created_at") or "",
            "updated_at": item.get("updated_at") or "",
            "merged_at": item.get("merged_at") or "",
            "closed_at": item.get("closed_at") or "",
            "body": clip(item.get("body") or ""),
            "labels": [str((label or {}).get("name") or "") for label in item.get("labels") or [] if label],
        }
    )
    return pull


def apply_detail(pull: dict[str, Any], item: dict[str, Any]) -> None:
    richer = from_api_item(item)
    for key, value in richer.items():
        if value not in ("", None, [], {}):
            pull[key] = value
    pull["merge_commit_sha"] = item.get("merge_commit_sha") or pull.get("merge_commit_sha") or ""
    pull["additions"] = item.get("additions")
    pull["deletions"] = item.get("deletions")
    pull["changed_files"] = item.get("changed_files")
    pull["commits_count"] = item.get("commits")
    pull["comments"] = item.get("comments")
    pull["review_comments"] = item.get("review_comments")


def from_gh_item(item: dict[str, Any]) -> dict[str, Any]:
    author = item.get("author") or {}
    pull = blank_pull(int(item.get("number") or 0))
    commits = item.get("commits")
    commit_rows = []
    commits_count = None
    if isinstance(commits, list):
        commits_count = len(commits)
        for commit in commits[:8]:
            if not isinstance(commit, dict):
                continue
            message = commit.get("messageHeadline") or commit.get("message") or ""
            oid = commit.get("oid") or commit.get("sha") or ""
            commit_rows.append(
                {
                    "sha": oid,
                    "message": clip(str(message), 120),
                    "url": commit.get("url") or "",
                }
            )
    elif isinstance(commits, int):
        commits_count = commits
    pull.update(
        {
            "title": item.get("title") or "",
            "state": state_of(str(item.get("state") or ""), str(item.get("mergedAt") or "")),
            "url": item.get("url") or pull["url"],
            "user": author.get("login") or "",
            "head": item.get("headRefName") or "",
            "base": item.get("baseRefName") or "main",
            "draft": bool(item.get("isDraft")),
            "created_at": item.get("createdAt") or "",
            "updated_at": item.get("updatedAt") or "",
            "merged_at": item.get("mergedAt") or "",
            "closed_at": item.get("closedAt") or "",
            "additions": item.get("additions"),
            "deletions": item.get("deletions"),
            "changed_files": item.get("changedFiles"),
            "commits_count": commits_count,
            "commits": commit_rows,
            "body": clip(item.get("body") or ""),
            "review_decision": item.get("reviewDecision") or "",
        }
    )
    return pull


def event_pull() -> dict[str, Any] | None:
    raw_number = env("PR_NUMBER")
    if not raw_number.isdigit():
        return None
    number = int(raw_number)
    merged_flag = env("PR_MERGED").lower()
    action = env("EVENT_ACTION")
    if merged_flag == "true":
        state = "MERGED"
    elif action == "closed":
        state = "CLOSED"
    else:
        state = "OPEN"
    pull = blank_pull(number)
    pull.update(
        {
            "title": env("PR_TITLE") or f"Pull request {number}",
            "state": state,
            "url": env("PR_URL") or pull["url"],
            "user": env("PR_USER"),
            "head": env("PR_HEAD"),
            "sha": env("PR_SHA"),
            "updated_at": iso(now_utc()),
        }
    )
    if state == "MERGED":
        pull["merged_at"] = pull["updated_at"]
    return pull


def merge_event(pulls: list[dict[str, Any]], event: dict[str, Any] | None) -> list[dict[str, Any]]:
    if not event:
        return pulls
    for pull in pulls:
        if pull.get("number") == event["number"]:
            for key, value in event.items():
                if pull.get(key) in ("", None, [], {}):
                    pull[key] = value
            return pulls
    return [event, *pulls]


class FetchError(Exception):
    pass


def api_json(path: str, auth: str) -> Any:
    url = f"https://api.github.com{path}"
    request = urllib.request.Request(
        url,
        headers={
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {auth}",
            "User-Agent": "jev-mcp-watch-dashboard",
            "X-GitHub-Api-Version": "2022-11-28",
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            return json.loads(response.read().decode("utf-8", "replace") or "null")
    except urllib.error.HTTPError as err:
        err.read()
        raise FetchError(f"HTTP {err.code}") from None
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as err:
        raise FetchError(err.__class__.__name__) from None


def enrich_extra(pull: dict[str, Any], auth: str) -> None:
    number = pull["number"]
    sha = pull.get("sha") or ""
    try:
        commits = api_json(f"/repos/{REPO}/pulls/{number}/commits?per_page=8", auth)
        if isinstance(commits, list):
            pull["commits"] = [
                {
                    "sha": str(commit.get("sha") or ""),
                    "message": clip(str((commit.get("commit") or {}).get("message") or "").split("\n", 1)[0], 140),
                    "url": commit.get("html_url") or "",
                }
                for commit in commits[:8]
                if isinstance(commit, dict)
            ]
            if pull.get("commits_count") in (None, 0):
                pull["commits_count"] = len(commits)
    except FetchError:
        pass
    try:
        files = api_json(f"/repos/{REPO}/pulls/{number}/files?per_page=12", auth)
        if isinstance(files, list):
            pull["files"] = [
                {
                    "filename": str(item.get("filename") or ""),
                    "status": str(item.get("status") or ""),
                    "additions": item.get("additions"),
                    "deletions": item.get("deletions"),
                }
                for item in files[:12]
                if isinstance(item, dict)
            ]
    except FetchError:
        pass
    try:
        reviews = api_json(f"/repos/{REPO}/pulls/{number}/reviews?per_page=20", auth)
        latest: dict[str, str] = {}
        if isinstance(reviews, list):
            for review in reviews:
                if not isinstance(review, dict):
                    continue
                user = (review.get("user") or {}).get("login") or ""
                state = review.get("state") or ""
                if user and state and state != "PENDING":
                    latest[user] = str(state)
        pull["reviews"] = [{"user": user, "state": state} for user, state in latest.items()]
    except FetchError:
        pass
    checks: list[dict[str, str]] = []
    if sha:
        try:
            status = api_json(f"/repos/{REPO}/commits/{sha}/status", auth)
            if isinstance(status, dict):
                for row in (status.get("statuses") or [])[:12]:
                    if isinstance(row, dict):
                        checks.append(
                            {
                                "name": str(row.get("context") or "status"),
                                "state": str(row.get("state") or ""),
                                "url": str(row.get("target_url") or ""),
                            }
                        )
        except FetchError:
            pass
        try:
            runs = api_json(f"/repos/{REPO}/commits/{sha}/check-runs?per_page=12", auth)
            if isinstance(runs, dict):
                for row in (runs.get("check_runs") or [])[:12]:
                    if not isinstance(row, dict):
                        continue
                    conclusion = row.get("conclusion") or row.get("status") or ""
                    checks.append(
                        {
                            "name": str(row.get("name") or "check"),
                            "state": str(conclusion),
                            "url": str(row.get("html_url") or ""),
                        }
                    )
        except FetchError:
            pass
    unique: list[dict[str, str]] = []
    seen: set[str] = set()
    for item in checks:
        name = item.get("name") or "check"
        if name in seen:
            continue
        seen.add(name)
        unique.append(item)
    pull["checks"] = unique[:12]


def fetch_api(auth: str) -> list[dict[str, Any]]:
    raw = api_json(f"/repos/{REPO}/pulls?state=all&sort=updated&direction=desc&per_page={PULL_LIMIT}", auth)
    if not isinstance(raw, list):
        raise FetchError("pull list was not a list")
    pulls = [from_api_item(item) for item in raw if isinstance(item, dict) and item.get("number")]
    for pull in pulls:
        try:
            detail = api_json(f"/repos/{REPO}/pulls/{pull['number']}", auth)
            if isinstance(detail, dict):
                apply_detail(pull, detail)
        except FetchError:
            continue
    featured = {pull["number"] for pull in pulls if pull.get("state") == "OPEN"}
    if pulls:
        featured.add(max(pulls, key=lambda pull: int(pull["number"]))["number"])
    for pull in pulls:
        if pull["number"] in featured:
            enrich_extra(pull, auth)
    return pulls


def fetch_gh() -> list[dict[str, Any]]:
    raw = subprocess.check_output(
        [
            "gh",
            "pr",
            "list",
            "-R",
            REPO,
            "--state",
            "all",
            "--limit",
            str(PULL_LIMIT),
            "--json",
            "number,title,state,url,mergedAt,updatedAt,createdAt,closedAt,author,headRefName,baseRefName,additions,deletions,changedFiles,isDraft,body,commits,reviewDecision",
        ],
        text=True,
        timeout=25,
    )
    parsed = json.loads(raw)
    if not isinstance(parsed, list):
        raise FetchError("gh pr list was not a list")
    return [from_gh_item(item) for item in parsed if isinstance(item, dict) and item.get("number")]


def read_snapshot(path: Path | None) -> list[dict[str, Any]]:
    if path is None or not path.is_file():
        return []
    match = SNAPSHOT_RE.search(path.read_text(encoding="utf-8"))
    if not match:
        return []
    try:
        payload = json.loads(base64.b64decode(match.group(1)).decode("utf-8"))
    except (json.JSONDecodeError, ValueError):
        return []
    pulls = payload.get("pulls") if isinstance(payload, dict) else None
    if not isinstance(pulls, list):
        return []
    cleaned = []
    for item in pulls:
        if isinstance(item, dict) and item.get("number"):
            pull = blank_pull(int(item["number"]))
            pull.update(item)
            cleaned.append(pull)
    return cleaned


def load_fixture(path: Path) -> list[dict[str, Any]]:
    payload = json.loads(path.read_text(encoding="utf-8"))
    rows = payload.get("pulls") if isinstance(payload, dict) else payload
    if not isinstance(rows, list):
        raise SystemExit("fixture must be a list or an object with pulls")
    pulls = []
    for item in rows:
        if not isinstance(item, dict) or not item.get("number"):
            continue
        pull = blank_pull(int(item["number"]))
        pull.update(item)
        pulls.append(pull)
    return pulls


def load_pulls(fixture: Path | None, previous: Path | None) -> tuple[list[dict[str, Any]], str, str]:
    if fixture is not None:
        return load_fixture(fixture), "fixture", "fixture file"
    auth = token()
    if auth:
        try:
            return fetch_api(auth), "github-api", "GitHub API"
        except FetchError:
            pass
        try:
            return fetch_gh(), "gh", "GitHub CLI"
        except (OSError, subprocess.CalledProcessError, subprocess.TimeoutExpired, json.JSONDecodeError, FetchError):
            pass
    snapshot = read_snapshot(previous)
    if snapshot:
        return snapshot, "snapshot", "GitHub list unavailable; showing the last saved pull requests"
    return [], "event-only", "GitHub list unavailable"


def latest_pull(pulls: list[dict[str, Any]]) -> dict[str, Any] | None:
    if not pulls:
        return None
    return max(pulls, key=lambda pull: int(pull["number"]))


def diff_stat(pull: dict[str, Any]) -> str:
    additions = pull.get("additions")
    deletions = pull.get("deletions")
    files = pull.get("changed_files")
    if additions is None and deletions is None and files is None:
        return "diff n/a"
    add = "?" if additions is None else f"+{additions}"
    delete = "?" if deletions is None else f"−{deletions}"
    file_text = "files n/a" if files is None else f"{files} files"
    return f"{add} {delete} · {file_text}"


def check_summary(pull: dict[str, Any]) -> str:
    checks = pull.get("checks") or []
    if not checks:
        return "no checks reported"
    failed = [item for item in checks if str(item.get("state") or "").lower() in {"failure", "failed", "error", "cancelled", "timed_out"}]
    pending = [item for item in checks if str(item.get("state") or "").lower() in {"pending", "queued", "in_progress", "waiting", "requested"}]
    if failed:
        return f"{len(failed)} failing · {len(checks)} checks"
    if pending:
        return f"{len(pending)} still running · {len(checks)} checks"
    return f"passing · {len(checks)} checks"


def snapshot_comment(pulls: list[dict[str, Any]]) -> str:
    slim = []
    for pull in sorted(pulls, key=lambda item: int(item["number"]), reverse=True)[:PULL_LIMIT]:
        item = dict(pull)
        item["body"] = clip(str(item.get("body") or ""), 400)
        item["commits"] = (item.get("commits") or [])[:8]
        item["files"] = (item.get("files") or [])[:12]
        item["checks"] = (item.get("checks") or [])[:12]
        slim.append(item)
    payload = base64.b64encode(json.dumps({"pulls": slim}, ensure_ascii=True, separators=(",", ":")).encode("utf-8")).decode("ascii")
    return f"<!-- jev-watch:snapshot {payload} -->"


def render_markdown(model: dict[str, Any]) -> str:
    now = parse_time(model["refreshed_at"]) or now_utc()
    pulls = sorted(model["pulls"], key=lambda pull: int(pull["number"]), reverse=True)
    latest = latest_pull(pulls)
    counts = {state: sum(1 for pull in pulls if pull.get("state") == state) for state in ("OPEN", "MERGED", "CLOSED")}
    event = model["event"]
    event_label = f"`{md(event['name'])}`" + (f" `{md(event['action'])}`" if event.get("action") else "")
    sha = event.get("sha") or "unknown"
    sha_short = sha[:7] if sha != "unknown" else sha
    ref = event.get("ref") or "unknown"
    if latest:
        label = escape_cell(str(latest.get("title") or "Untitled"), 160).replace("]", "\\]").replace("<", "&lt;").replace(">", "&gt;")
        latest_line = (
            f"**Latest pull request:** [#{latest['number']} {label}]({latest['url']}) "
            f"— **{str(latest.get('state') or '').lower()}** {when(latest.get('merged_at') or latest.get('updated_at') or '', now)} "
            f"· {md(latest.get('user') or 'unknown author')} · `{md(latest.get('head') or 'n/a')}` → `{md(latest.get('base') or 'main')}` "
            f"· {md(diff_stat(latest))}."
        )
    else:
        latest_line = "**Latest pull request:** none yet. This refresh had no pull request in the event or the saved list."
    lines = [
        "# Jev_MCP GitHub watch",
        "",
        latest_line,
        "",
        f"Open **{counts['OPEN']}** · Merged **{counts['MERGED']}** · Closed **{counts['CLOSED']}** · [Interactive board](github-watch.html)",
        "",
        "This is the **Cursor Project dashboard** for [burnigtm/jev-mcp](https://github.com/burnigtm/jev-mcp). Open **Projects → Jev_MCP** (not the Agents list). The latest pull request stays at the top even when the list is long. GitHub Actions refreshes this file on branch `cursor-watch`.",
        "",
        "| | |",
        "| --- | --- |",
        f"| **Last refresh** | {md(model['refreshed_at'])} |",
        f"| **Data** | {escape_cell(str(model['source_note']))} |",
        f"| **Last GitHub event** | {event_label} |",
        f"| **Open PRs** | {summary_cell(pulls, 'OPEN', model['source'])} |",
        f"| **Merged (recent)** | {summary_cell(pulls, 'MERGED', model['source'])} |",
        (
            f"| **GitHub `{md(ref)}`** | [`{md(sha_short)}`](https://github.com/{REPO}/commit/{sha}) |"
            if sha != "unknown"
            else f"| **GitHub `{md(ref)}`** | unknown |"
        ),
        f"| **Cursor target** | `{md(model['agent'])}` |",
        "",
        "## Latest",
        "",
    ]
    if latest:
        lines.extend(pull_markdown(latest, now, open_block=True))
    else:
        lines.append("No pull request to show.")
        lines.append("")
    recently = None
    if pulls:
        recently = max(pulls, key=lambda pull: pull.get("updated_at") or "")
    if recently and latest and recently["number"] != latest["number"]:
        lines.append(
            f"Most recently updated is [#{recently['number']} {md_link_label(recently.get('title') or '')}]({recently['url']}) "
            f"({when(recently.get('updated_at') or '', now)}). Newest number remains #{latest['number']}."
        )
        lines.append("")
    for state, title in (("OPEN", "Open"), ("MERGED", "Merged"), ("CLOSED", "Closed")):
        lines.extend(["", f"## {title}", ""])
        group = [pull for pull in pulls if pull.get("state") == state and (not latest or pull["number"] != latest["number"])]
        if not group:
            if state == "OPEN":
                lines.append("No open pull requests.")
            elif latest and latest.get("state") == state:
                lines.append(f"The newest pull request, #{latest['number']}, is already shown above.")
            else:
                lines.append("None.")
            lines.append("")
            continue
        for pull in group:
            lines.extend(pull_markdown(pull, now, open_block=False))
    lines.extend(
        [
            "",
            "## Activity",
            "",
            activity_line(event),
            "",
            f"- Event: {event_label}",
            (
                f"- Ref: `{md(ref)}` SHA [`{md(sha_short)}`](https://github.com/{REPO}/commit/{sha})"
                if sha != "unknown"
                else f"- Ref: `{md(ref)}`"
            ),
        ]
    )
    if event.get("review_state"):
        lines.append(f"- Review `{md(event['review_state'])}`")
    lines.extend(
        [
            "",
            "Search, filters, checks, commits, and files are on the interactive board next to this file. Follow-ups land in the **Jev_MCP Project** chat.",
            "",
            "Live Actions: [Notify Jev_MCP](https://github.com/burnigtm/jev-mcp/actions/workflows/notify-jev-mcp.yml).",
            "",
            snapshot_comment(pulls),
            "",
        ]
    )
    return "\n".join(lines)


def summary_cell(pulls: list[dict[str, Any]], state: str, source: str) -> str:
    if source == "event-only" and not pulls:
        return "unavailable"
    matched = [pull for pull in pulls if pull.get("state") == state]
    if not matched:
        return "unavailable" if source == "event-only" else "none"
    parts = []
    for pull in matched[:5]:
        title = escape_cell(str(pull.get("title") or ""), 120).replace("<", "&lt;").replace(">", "&gt;")
        parts.append(f"[#{pull['number']}]({pull.get('url') or ''}) {title}".strip())
    return ", ".join(parts)


def activity_line(event: dict[str, str]) -> str:
    name = event.get("name") or "unknown"
    if event.get("number") and event.get("url"):
        return f"[PR #{md(event['number'])}]({event['url']}) {md(event.get('title') or '')}".strip()
    if name == "workflow_dispatch":
        return "Manual **Run workflow** delivery check (no PR payload)."
    if name == "push":
        return f"Push to `{md(event.get('ref') or 'unknown')}` `{md((event.get('sha') or '')[:7])}`."
    return f"GitHub `{md(name)}` on `{md(event.get('ref') or 'unknown')}`."


def pull_markdown(pull: dict[str, Any], now: dt.datetime, open_block: bool) -> list[str]:
    title = str(pull.get("title") or "Untitled")
    state = str(pull.get("state") or "")
    summary = f"#{pull['number']} {title} — {state}"
    rows = [
        ("State", state + (" draft" if pull.get("draft") else "")),
        ("Author", str(pull.get("user") or "n/a")),
        ("Branches", f"{pull.get('head') or 'n/a'} → {pull.get('base') or 'main'}"),
        ("Updated", when(str(pull.get("updated_at") or ""), now)),
        ("Merged", when(str(pull.get("merged_at") or ""), now) if pull.get("merged_at") else ("merged" if pull.get("state") == "MERGED" else "not merged")),
        ("Diff", diff_stat(pull)),
        ("Commits", str(pull.get("commits_count") if pull.get("commits_count") is not None else "n/a")),
        ("Checks", check_summary(pull)),
        ("Reviews", review_summary(pull)),
    ]
    if pull.get("labels"):
        rows.append(("Labels", ", ".join(str(label) for label in pull["labels"])))
    body = [
        f"<details{' open' if open_block else ''}>",
        f"<summary><a href=\"{html.escape(str(pull.get('url') or ''), quote=True)}\">{html.escape(summary)}</a></summary>",
        "<table>",
    ]
    for label, value in rows:
        body.append(f"<tr><td><strong>{html.escape(label)}</strong></td><td>{html.escape(value)}</td></tr>")
    if pull.get("sha"):
        short = str(pull["sha"])[:7]
        body.append(
            f"<tr><td><strong>Head</strong></td><td><a href=\"https://github.com/{REPO}/commit/{html.escape(str(pull['sha']))}\"><code>{html.escape(short)}</code></a></td></tr>"
        )
    if pull.get("merge_commit_sha"):
        short = str(pull["merge_commit_sha"])[:7]
        body.append(
            "<tr><td><strong>Merge commit</strong></td><td>"
            f"<a href=\"https://github.com/{REPO}/commit/{html.escape(str(pull['merge_commit_sha']))}\"><code>{html.escape(short)}</code></a>"
            "</td></tr>"
        )
    body.append("</table>")
    commits = pull.get("commits") or []
    if commits:
        body.append("<p><strong>Commits</strong></p><ul>")
        for commit in commits[:8]:
            short = str(commit.get("sha") or "")[:7]
            message = html.escape(str(commit.get("message") or ""))
            url = str(commit.get("url") or "")
            if url and short:
                body.append(f"<li><a href=\"{html.escape(url, quote=True)}\"><code>{html.escape(short)}</code></a> {message}</li>")
            else:
                body.append(f"<li><code>{html.escape(short or 'commit')}</code> {message}</li>")
        body.append("</ul>")
    files = pull.get("files") or []
    if files:
        body.append("<p><strong>Files</strong></p><ul>")
        for item in files[:12]:
            body.append(
                "<li><code>{}</code> {} +{} −{}</li>".format(
                    html.escape(str(item.get("filename") or "")),
                    html.escape(str(item.get("status") or "")),
                    html.escape(str(item.get("additions") if item.get("additions") is not None else "?")),
                    html.escape(str(item.get("deletions") if item.get("deletions") is not None else "?")),
                )
            )
        changed = pull.get("changed_files")
        if isinstance(changed, int) and changed > len(files):
            body.append(f"<li>{changed - len(files)} more files on the pull request</li>")
        body.append("</ul>")
    checks = pull.get("checks") or []
    if checks:
        body.append("<p><strong>Checks</strong></p><ul>")
        for item in checks[:12]:
            url = str(item.get("url") or "")
            label = html.escape(str(item.get("name") or "check"))
            check_state = html.escape(str(item.get("state") or ""))
            if url:
                body.append(f"<li><a href=\"{html.escape(url, quote=True)}\">{label}</a> <code>{check_state}</code></li>")
            else:
                body.append(f"<li>{label} <code>{check_state}</code></li>")
        body.append("</ul>")
    if pull.get("body"):
        body.append(f"<p><strong>Description</strong></p><p>{html.escape(str(pull['body']))}</p>")
    body.extend(["</details>", ""])
    return body


def review_summary(pull: dict[str, Any]) -> str:
    reviews = pull.get("reviews") or []
    decision = pull.get("review_decision") or ""
    if reviews:
        return ", ".join(f"{item.get('user')}: {item.get('state')}" for item in reviews)
    if decision:
        return str(decision)
    return "no reviews"


def render_html(model: dict[str, Any]) -> str:
    now = parse_time(model["refreshed_at"]) or now_utc()
    pulls = sorted(model["pulls"], key=lambda pull: int(pull["number"]), reverse=True)
    latest = latest_pull(pulls)
    cards = "\n".join(card_html(pull, now, pinned=bool(latest and pull["number"] == latest["number"])) for pull in pulls)
    if not cards:
        cards = '<p class="empty">No pull requests yet. The next open, sync, review, or merge will show up here.</p>'
    counts = {state: sum(1 for pull in pulls if pull.get("state") == state) for state in ("OPEN", "MERGED", "CLOSED")}
    data = json.dumps({"source": model["source"], "refreshedAt": model["refreshed_at"]}, ensure_ascii=True).replace("<", "\\u003c")
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Jev_MCP GitHub watch</title>
<style>
  :root {{ color-scheme: light; --bg:#f3efe6; --ink:#1c1915; --muted:#5e584e; --line:#ddd4c6; --card:#fffdf8; --open:#1d4e89; --merged:#1f6b45; --closed:#6d645b; --fail:#8d2f2f; }}
  * {{ box-sizing: border-box; }}
  body {{ margin:0; font:15px/1.45 "Segoe UI", system-ui, sans-serif; background:var(--bg); color:var(--ink); }}
  header, .toolbar, main {{ width:min(980px, calc(100% - 28px)); margin:0 auto; }}
  header {{ padding:28px 0 8px; }}
  .kicker {{ margin:0; color:var(--muted); letter-spacing:.04em; text-transform:uppercase; font-size:12px; }}
  h1 {{ margin:4px 0 8px; font-size:32px; line-height:1.1; }}
  .lede {{ margin:0; font-size:18px; }}
  .meta {{ color:var(--muted); }}
  .toolbar {{ display:flex; flex-wrap:wrap; gap:8px; align-items:center; padding:16px 0; position:sticky; top:0; background:rgba(243,239,230,.94); }}
  input {{ flex:1 1 220px; min-width:180px; border:1px solid var(--line); background:white; border-radius:999px; padding:10px 14px; font:inherit; }}
  button {{ border:1px solid var(--line); background:var(--card); border-radius:999px; padding:8px 12px; font:inherit; cursor:pointer; }}
  button[aria-pressed="true"] {{ background:var(--ink); color:white; border-color:var(--ink); }}
  main {{ padding-bottom:48px; }}
  article {{ background:var(--card); border:1px solid var(--line); border-radius:16px; padding:16px 18px; margin:0 0 12px; }}
  article[data-pinned="true"] {{ border-color:#1c1915; }}
  article h2 {{ margin:0 0 6px; font-size:20px; }}
  article h2 a {{ color:inherit; }}
  .row {{ display:flex; flex-wrap:wrap; gap:8px 14px; color:var(--muted); margin-bottom:8px; }}
  .badge {{ color:white; border-radius:999px; padding:2px 8px; font-size:12px; letter-spacing:.03em; }}
  .OPEN {{ background:var(--open); }} .MERGED {{ background:var(--merged); }} .CLOSED {{ background:var(--closed); }}
  table {{ width:100%; border-collapse:collapse; margin:8px 0 12px; }}
  td {{ border-top:1px solid var(--line); padding:6px 8px 6px 0; vertical-align:top; }}
  td:first-child {{ width:140px; color:var(--muted); }}
  ul {{ margin:6px 0 12px; padding-left:18px; }}
  .empty {{ color:var(--muted); }}
  a {{ color:#1d4e89; }}
  .fail {{ color:var(--fail); font-weight:600; }}
</style>
</head>
<body>
<header>
  <p class="kicker">burnigtm/jev-mcp · {html.escape(model["source_note"])}</p>
  <h1>GitHub watch</h1>
  <p class="lede" id="latest-line">{html.escape(hero_text(latest, now))}</p>
  <p class="meta">Refreshed {html.escape(model["refreshed_at"])}. Open {counts["OPEN"]} · Merged {counts["MERGED"]} · Closed {counts["CLOSED"]}. The newest pull request stays visible while you filter.</p>
</header>
<div class="toolbar">
  <input id="q" type="search" placeholder="Filter by number, title, author, or branch" aria-label="Filter pull requests">
  <button type="button" data-filter="all" aria-pressed="true">All <span>{len(pulls)}</span></button>
  <button type="button" data-filter="OPEN" aria-pressed="false">Open <span>{counts["OPEN"]}</span></button>
  <button type="button" data-filter="MERGED" aria-pressed="false">Merged <span>{counts["MERGED"]}</span></button>
  <button type="button" data-filter="CLOSED" aria-pressed="false">Closed <span>{counts["CLOSED"]}</span></button>
  <button type="button" id="refresh">Refresh</button>
</div>
<main id="list">
{cards}
</main>
<script id="watch-data" type="application/json">{data}</script>
<script>
const q = document.getElementById("q");
let filter = "all";
function apply() {{
  const query = q.value.trim().toLowerCase();
  document.querySelectorAll("article.card").forEach((card) => {{
    const pinned = card.dataset.pinned === "true";
    const stateOk = filter === "all" || card.dataset.state === filter;
    const textOk = !query || (card.dataset.search || "").includes(query);
    card.hidden = pinned ? false : !(stateOk && textOk);
  }});
}}
document.querySelectorAll("[data-filter]").forEach((button) => {{
  button.addEventListener("click", () => {{
    filter = button.dataset.filter || "all";
    document.querySelectorAll("[data-filter]").forEach((item) => item.setAttribute("aria-pressed", item === button ? "true" : "false"));
    apply();
  }});
}});
q.addEventListener("input", apply);
document.getElementById("refresh").addEventListener("click", async () => {{
  const button = document.getElementById("refresh");
  button.disabled = true;
  button.textContent = "Refreshing";
  try {{
    const response = await fetch("/api/refresh", {{ method: "POST" }});
    if (!response.ok) throw new Error(String(response.status));
    location.reload();
  }} catch (error) {{
    button.disabled = false;
    button.textContent = "Refresh needs the watch server";
  }}
}});
</script>
</body>
</html>
"""


def hero_text(latest: dict[str, Any] | None, now: dt.datetime) -> str:
    if not latest:
        return "No pull request yet."
    return (
        f"Latest is #{latest['number']} {latest.get('title') or 'Untitled'} "
        f"({str(latest.get('state') or '').lower()}, {when(latest.get('merged_at') or latest.get('updated_at') or '', now)})."
    )


def card_html(pull: dict[str, Any], now: dt.datetime, pinned: bool) -> str:
    state = str(pull.get("state") or "OPEN")
    search = " ".join(
        [
            str(pull.get("number") or ""),
            str(pull.get("title") or ""),
            str(pull.get("user") or ""),
            str(pull.get("head") or ""),
            str(pull.get("base") or ""),
            state,
        ]
    ).lower()
    rows = [
        ("Author", html.escape(str(pull.get("user") or "n/a"))),
        ("Branches", f"<code>{html.escape(str(pull.get('head') or 'n/a'))}</code> → <code>{html.escape(str(pull.get('base') or 'main'))}</code>"),
        ("Updated", html.escape(when(str(pull.get("updated_at") or ""), now))),
        ("Merged", html.escape(when(str(pull.get("merged_at") or ""), now) if pull.get("merged_at") else ("merged" if pull.get("state") == "MERGED" else "not merged"))),
        ("Diff", html.escape(diff_stat(pull))),
        ("Commits", html.escape(str(pull.get("commits_count") if pull.get("commits_count") is not None else "n/a"))),
        ("Checks", html.escape(check_summary(pull))),
        ("Reviews", html.escape(review_summary(pull))),
    ]
    if pull.get("sha"):
        short = html.escape(str(pull["sha"])[:7])
        rows.append(("Head", f'<a href="https://github.com/{REPO}/commit/{html.escape(str(pull["sha"]))}">{short}</a>'))
    if pull.get("merge_commit_sha"):
        short = html.escape(str(pull["merge_commit_sha"])[:7])
        rows.append(("Merge", f'<a href="https://github.com/{REPO}/commit/{html.escape(str(pull["merge_commit_sha"]))}">{short}</a>'))
    table = "".join(f"<tr><td>{label}</td><td>{value}</td></tr>" for label, value in rows)
    commits = ""
    if pull.get("commits"):
        items = []
        for commit in pull["commits"][:8]:
            short = html.escape(str(commit.get("sha") or "")[:7] or "commit")
            message = html.escape(str(commit.get("message") or ""))
            url = str(commit.get("url") or "")
            if url:
                items.append(f'<li><a href="{html.escape(url, quote=True)}"><code>{short}</code></a> {message}</li>')
            else:
                items.append(f"<li><code>{short}</code> {message}</li>")
        commits = "<h3>Commits</h3><ul>" + "".join(items) + "</ul>"
    files = ""
    if pull.get("files"):
        items = []
        for item in pull["files"][:12]:
            items.append(
                "<li><code>{}</code> {} +{} −{}</li>".format(
                    html.escape(str(item.get("filename") or "")),
                    html.escape(str(item.get("status") or "")),
                    html.escape(str(item.get("additions") if item.get("additions") is not None else "?")),
                    html.escape(str(item.get("deletions") if item.get("deletions") is not None else "?")),
                )
            )
        files = "<h3>Files</h3><ul>" + "".join(items) + "</ul>"
    checks = ""
    if pull.get("checks"):
        items = []
        for item in pull["checks"][:12]:
            name = html.escape(str(item.get("name") or "check"))
            state_text = html.escape(str(item.get("state") or ""))
            url = str(item.get("url") or "")
            klass = "fail" if state_text.lower() in {"failure", "failed", "error", "cancelled", "timed_out"} else ""
            label = f'<a href="{html.escape(url, quote=True)}">{name}</a>' if url else name
            items.append(f'<li class="{klass}">{label} <code>{state_text}</code></li>')
        checks = "<h3>Checks</h3><ul>" + "".join(items) + "</ul>"
    description = ""
    if pull.get("body"):
        description = f"<h3>Description</h3><p>{html.escape(str(pull['body']))}</p>"
    pin = "true" if pinned else "false"
    title = html.escape(str(pull.get("title") or "Untitled"))
    url = html.escape(str(pull.get("url") or ""), quote=True)
    return f"""<article class="card" data-pinned="{pin}" data-state="{html.escape(state)}" data-search="{html.escape(search, quote=True)}">
  <h2><a href="{url}">#{pull["number"]} {title}</a> <span class="badge {html.escape(state)}">{html.escape(state)}</span></h2>
  <div class="row"><span>{html.escape(str(pull.get("user") or "unknown author"))}</span><span>{html.escape(diff_stat(pull))}</span><span>{html.escape(check_summary(pull))}</span></div>
  <details {"open" if pinned else ""}>
    <summary>Details</summary>
    <table>{table}</table>
    {commits}{files}{checks}{description}
  </details>
</article>"""


def event_from_env() -> dict[str, str]:
    return {
        "name": env("EVENT_NAME") or "unknown",
        "action": env("EVENT_ACTION"),
        "ref": env("GITHUB_REF_NAME") or "unknown",
        "sha": env("PR_SHA") or env("GITHUB_SHA") or "unknown",
        "number": env("PR_NUMBER"),
        "url": env("PR_URL"),
        "title": env("PR_TITLE"),
        "review_state": env("REVIEW_STATE"),
    }


def build_model(fixture: Path | None, previous: Path | None) -> dict[str, Any]:
    pulls, source, note = load_pulls(fixture, previous)
    pulls = merge_event(pulls, event_pull())
    return {
        "refreshed_at": iso(now_utc()),
        "source": source,
        "source_note": note,
        "agent": env("AGENT_ID") or env("DEFAULT_AGENT_ID") or "bc-c78e565c-bc13-4d27-ada8-cc5e7e04eb9e",
        "event": event_from_env(),
        "pulls": pulls,
    }


def write_outputs(model: dict[str, Any], out: Path, html_path: Path | None) -> None:
    out.parent.mkdir(parents=True, exist_ok=True)
    text = render_markdown(model)
    out.write_text(text, encoding="utf-8")
    summary = env("GITHUB_STEP_SUMMARY")
    if summary:
        with open(summary, "a", encoding="utf-8") as handle:
            handle.write(text)
            if not text.endswith("\n"):
                handle.write("\n")
    if html_path is not None:
        html_path.parent.mkdir(parents=True, exist_ok=True)
        html_path.write_text(render_html(model), encoding="utf-8")
    print(f"Wrote dashboard {out} ({model['source']}, {len(model['pulls'])} pulls)")


def serve(host: str, port: int, out: Path, html_path: Path) -> None:
    dashboard = {"html": html_path.read_text(encoding="utf-8")}

    class Handler(BaseHTTPRequestHandler):
        def do_GET(self) -> None:
            if self.path.split("?", 1)[0] not in {"/", "/index.html", "/github-watch.html"}:
                self.send_error(404)
                return
            body = dashboard["html"].encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def do_POST(self) -> None:
            if self.path.split("?", 1)[0] != "/api/refresh":
                self.send_error(404)
                return
            model = build_model(None, out if out.is_file() else None)
            write_outputs(model, out, html_path)
            dashboard["html"] = html_path.read_text(encoding="utf-8")
            body = json.dumps({"ok": True, "pulls": len(model["pulls"]), "source": model["source"]}).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def log_message(self, fmt: str, *args: object) -> None:
            print(f"watch {self.address_string()} {fmt % args}")

    server = ThreadingHTTPServer((host, port), Handler)
    print(f"GitHub watch board http://127.0.0.1:{port}")
    server.serve_forever()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", required=True, help="Markdown output path")
    parser.add_argument("--html", help="Interactive HTML output path")
    parser.add_argument("--no-html", action="store_true")
    parser.add_argument("--fixture", help="JSON fixture instead of GitHub")
    parser.add_argument("--previous", help="Prior dashboard used when GitHub cannot be read")
    parser.add_argument("--serve", type=int, help="Serve the interactive board on this port")
    parser.add_argument("--host", default="0.0.0.0")
    args = parser.parse_args()
    out = Path(args.out)
    html_path = None if args.no_html else Path(args.html) if args.html else out.with_suffix(".html")
    previous = Path(args.previous) if args.previous else (out if out.is_file() else None)
    model = build_model(Path(args.fixture) if args.fixture else None, previous)
    write_outputs(model, out, html_path)
    if args.serve:
        if html_path is None:
            raise SystemExit("--serve needs an HTML file")
        serve(args.host, args.serve, out, html_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
