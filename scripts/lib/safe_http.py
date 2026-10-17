"""urllib helpers that never replay credentials across a redirect."""

from __future__ import annotations

import urllib.error
import urllib.request


class _NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):  # type: ignore[no-untyped-def]
        return None


def open_no_redirect(request: urllib.request.Request, timeout: float):
    """Open a request and turn any 3xx into an HTTPError instead of following it."""
    opener = urllib.request.build_opener(_NoRedirect)
    return opener.open(request, timeout=timeout)


def http_error_body(err: urllib.error.HTTPError) -> str:
    try:
        return err.read().decode("utf-8", "replace")
    except Exception:
        return ""
