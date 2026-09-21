#!/usr/bin/env python3
"""Publish docs/github-watch.md to the cursor-watch branch via the GitHub API. No tokens printed."""

from __future__ import annotations

import base64
import json
import os
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

REPO = "burnigtm/jev-mcp"
BRANCH = "cursor-watch"
DEFAULT_PATHS = ("docs/github-watch.md", "docs/github-watch.html")


def token() -> str:
    return (os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN") or "").strip()


def request(method: str, url: str, data: dict | None = None) -> tuple[int, dict | None, str]:
    auth = token()
    body = None if data is None else json.dumps(data).encode()
    req = urllib.request.Request(
        url,
        data=body,
        method=method,
        headers={
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {auth}",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "jev-mcp-watch-dashboard",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            raw = resp.read().decode("utf-8", "replace")
            parsed = json.loads(raw) if raw else None
            return resp.status, parsed, raw
    except urllib.error.HTTPError as err:
        raw = err.read().decode("utf-8", "replace")
        try:
            parsed = json.loads(raw) if raw else None
        except json.JSONDecodeError:
            parsed = None
        return err.code, parsed, raw


def default_branch_sha() -> str:
    """SHA of the checked-out default branch. Never GITHUB_SHA on PR events.

    pull_request and pull_request_review set GITHUB_SHA to the merge commit.
    The workflow checks out the default branch and passes that commit as
    WATCH_BASE_SHA. A local fallback reads HEAD of this checkout only.
    """
    explicit = (os.environ.get("WATCH_BASE_SHA") or "").strip()
    if explicit:
        return explicit
    try:
        return subprocess.check_output(["git", "rev-parse", "HEAD"], text=True, timeout=10, stderr=subprocess.DEVNULL).strip()
    except (OSError, subprocess.CalledProcessError):
        return ""


def publish_file(rel: str) -> int:
    markdown = Path(rel)
    if not markdown.is_file():
        print(f"{rel} missing; skip.", file=sys.stderr)
        return 0
    content = base64.b64encode(markdown.read_bytes()).decode("ascii")
    file_code, file_json, file_raw = request(
        "GET",
        f"https://api.github.com/repos/{REPO}/contents/{rel}?ref={BRANCH}",
    )
    blob_sha = None
    if file_code == 200 and isinstance(file_json, dict):
        blob_sha = file_json.get("sha")
    elif file_code not in (200, 404):
        print(f"Read file failed HTTP {file_code}: {file_raw[:300]}", file=sys.stderr)
        return 1

    payload: dict[str, object] = {
        "message": "Update Jev_MCP GitHub watch dashboard",
        "content": content,
        "branch": BRANCH,
    }
    if blob_sha:
        payload["sha"] = blob_sha
    put_code, put_json, put_raw = request(
        "PUT",
        f"https://api.github.com/repos/{REPO}/contents/{rel}",
        payload,
    )
    if put_code >= 300:
        print(f"Publish failed HTTP {put_code}: {put_raw[:300]}", file=sys.stderr)
        return 1
    html_url = ""
    if isinstance(put_json, dict):
        content_info = put_json.get("content") or {}
        if isinstance(content_info, dict):
            html_url = str(content_info.get("html_url") or "")
    print(f"Published {rel} ({put_code}) {html_url}".strip())
    return 0


def main() -> int:
    if not token():
        print("No GITHUB_TOKEN; skip dashboard publish.", file=sys.stderr)
        return 0
    paths = sys.argv[1:] or list(DEFAULT_PATHS)
    if "docs/github-watch.md" in paths and not Path("docs/github-watch.md").is_file():
        print("docs/github-watch.md missing; skip publish.", file=sys.stderr)
        return 0
    sha = default_branch_sha()
    code, _, raw = request("GET", f"https://api.github.com/repos/{REPO}/git/ref/heads/{BRANCH}")
    if code == 404:
        if not sha:
            print("No checked-out default-branch SHA to create cursor-watch.", file=sys.stderr)
            return 1
        create_code, _, create_raw = request(
            "POST",
            f"https://api.github.com/repos/{REPO}/git/refs",
            {"ref": f"refs/heads/{BRANCH}", "sha": sha},
        )
        if create_code >= 300:
            print(f"Create branch failed HTTP {create_code}: {create_raw[:300]}", file=sys.stderr)
            return 1
        print("Created branch cursor-watch")
    elif code >= 300:
        print(f"Read branch failed HTTP {code}: {raw[:300]}", file=sys.stderr)
        return 1

    failed = 0
    for rel in paths:
        if rel.endswith(".html") and not Path(rel).is_file():
            print(f"{rel} missing; skip.", file=sys.stderr)
            continue
        failed = max(failed, publish_file(rel))
    return failed


if __name__ == "__main__":
    raise SystemExit(main())
