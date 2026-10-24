/**
 * Remove secret-shaped strings before text is sent to the provider. The placeholder keeps the kind
 * (`[REDACTED:github_token]`) so a reviewer can still see that a credential was added. Redaction is a
 * safety net for what the host sends, not a detector the policy relies on to approve anything; a hit
 * in added code is itself reported (`secrets_redacted`) and holds the decision for review.
 */

type Rule = { kind: string; pattern: RegExp };

const RULES: Rule[] = [
  { kind: "private_key", pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?(?:-----END [A-Z ]*PRIVATE KEY-----|$)/g },
  { kind: "aws_access_key", pattern: /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/g },
  { kind: "github_token", pattern: /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})\b/g },
  { kind: "slack_token", pattern: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g },
  { kind: "stripe_key", pattern: /\b(?:sk|rk|pk)_(?:live|test)_[A-Za-z0-9]{16,}\b/g },
  { kind: "api_key", pattern: /\bapikey_[A-Za-z0-9_-]{16,}\b/g },
  { kind: "openai_key", pattern: /\bsk-(?:proj-|ant-)?[A-Za-z0-9_-]{24,}\b/g },
  { kind: "google_key", pattern: /\bAIza[0-9A-Za-z_-]{35}\b/g },
  { kind: "jwt", pattern: /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g },
  { kind: "url_credentials", pattern: /\b([a-z][a-z0-9+.-]*:\/\/)[^\s/:@]+:[^\s/@]+@/gi },
  { kind: "assigned_secret", pattern: /\b((?:password|passwd|secret|token|api[_-]?key|access[_-]?key|private[_-]?key|client[_-]?secret)["']?\s*[:=]\s*["'])(?!\[REDACTED)[^"'\s]{8,}(["'])/gi },
];

export type Redaction = { text: string; count: number; kinds: string[] };

export function redactSecrets(text: string): Redaction {
  let count = 0;
  const kinds = new Set<string>();
  let out = text;
  for (const { kind, pattern } of RULES) {
    out = out.replace(pattern, (_match, first, second) => {
      count += 1;
      kinds.add(kind);
      if (kind === "url_credentials") return `${first as string}[REDACTED:${kind}]@`;
      if (kind === "assigned_secret") return `${first as string}[REDACTED:${kind}]${second as string}`;
      return `[REDACTED:${kind}]`;
    });
  }
  return { text: out, count, kinds: [...kinds] };
}
