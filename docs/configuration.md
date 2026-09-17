# Configuration

Copy [`.env.example`](../.env.example) for local CLI use. MCP hosts do **not** load `.env` unless you put the same keys in the server `env` block.

| Variable | Default | Meaning |
| --- | --- | --- |
| `TYPESAFE_API_KEY` | (none) | Bearer token for `https://api.typesafe.ai` |
| `JEV_MCP_MODEL` | `jev-latest` | TypeSafe model id |
| `TYPESAFE_BASE_URL` | SDK default | Override API root |
| `JEV_MCP_MOCK` | off | `1` / `true` / `yes` — local deterministic judge |
| `JEV_MCP_AUTO_ACCEPT` | `0.8` | Confidence floor for `auto` |
| `JEV_MCP_REVIEW_AT` | `0.5` | Below this, coding-loop / review / evaluate `escalate` |
| `JEV_MCP_BLOCK_AT` | `0.75` | Screen injection ≥ this → `block` |

Per-call overrides (win over env):

- `jev_coding_loop`, `jev_review`, `jev_evaluate` path: `auto_accept`, `review_at`
- `jev_verify`: `auto_accept`
- `jev_screen`: `block_at`, `review_at` (screen review default is `0.25`)
- All tools: `model`

No key and no mock: tools return an error string telling you to set one of them.

## Policy constants

Named numbers live in [`src/policy.ts`](../src/policy.ts). Tune there (or via env/args), not by rewriting Jev instructions into a chat prompt.

Screen `skip` uses substance/relevance below `0.35`.

## TypeSafe budgets (enforced)

- 64,000 tokens for all `state` + `questions`
- 32,000 tokens for `state` + the longest question
- Rank: 250 Choice options per call; candidate text 2,000 characters

Token estimate is `ceil(chars / 4)`.

## Tests

```bash
npm test              # mock only; live case skipped
npm run typecheck
TYPESAFE_API_KEY=ts_... npm test    # includes live e2e
```

Tests force sequential execution so env mutations in one file cannot race another.
