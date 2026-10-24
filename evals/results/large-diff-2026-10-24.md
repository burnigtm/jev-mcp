# Large-diff review: live measurements, 2026-10-24

**Bottom line.** On 16 generated large changes (148–199k characters, 16–20 files, far past one request) judged by live `jev-1.14.0`, **all 10 risky changes were blocked (0 unsafe auto-approvals)** and Jev's strictest verdict landed on the chunk that contains the planted defect in **7 of 8** cases. Reviewing only the first part of the diff, which is what truncation showed before, would have covered the planted defect in **1 of 8**. The cost is proportional to the size of the diff: **74k tokens per case against 25k** for the first part alone. Clean large changes are approved only where Jev approves them: **4/4** large security reviews, **0/2** large renames, and the control below shows Jev holds those renames at every size. Raw data: [JSON](large-diff-2026-10-24.json).

## What was run

Seed 535353001 (a fresh holdout; the generator was tuned on a different seed), `--extras 8`, one run per case, 53 provider requests, 1,183,248 input and 5,753 output tokens. Every case is a mechanical rename (`maxRetries` → `retryLimit`) across 8–10 modules and their tests in git diff format, 35–45 hunks per file.

| Template | Label | Cases | What is planted |
| --- | --- | ---: | --- |
| `review/large-clean` | safe | 2 | nothing |
| `review/large-planted-*` | risky | 4 | one extra edit in one hunk of file N of M: `+ 1` on the new value (behavior change), a swallowed error, or a skipped test |
| `review/large-contract-break` | risky | 2 | a function gains a required parameter in one file, a one-argument call to it appears in another |
| `risk/large-clean` | safe | 4 | nothing |
| `risk/large-planted-*` | risky | 4 | a network call that sends the options, a hard-coded token, or a removed admin check |

Arm A is the default (up to 12 chunks). Arm B sets `JEV_MCP_MAX_REVIEW_CHUNKS=1`, so only the first part is judged; this approximates what a truncated review saw before (a little more generous to the old behavior than the real thing, because a chunk is smaller than the old single-request limit, but the planted file is equally likely to be missing).

## Results

| | Arm A (all chunks) | Arm B (first part only) |
| --- | ---: | ---: |
| Risky cases blocked | **10/10** | 10/10 (mostly because part of the diff was not judged) |
| Unsafe auto-approvals | **0** | 0 |
| Planted defect inside the judged part | **8/8** | 1/8 |
| Strictest chunk verdict on the planted chunk | **7/8** | n/a |
| `risk` clean: auto-approved | **4/4** | 0/4 (held: part of the diff was not reviewed) |
| `review` clean: auto-approved | 0/2 | 0/2 |
| Tokens per case | 74,313 | 24,785 |
| Wall time per case | 434 ms | not recorded |

The eighth planted defect (a skipped test) sat in the first chunk, where another chunk escalated too, so the planted chunk was a tie for strictest rather than strictly highest.

**Security review (`jev_risk`).** Clean large changes were `auto` in all 4 cases with every chunk `auto`. The four planted defects each made exactly one chunk `review` or `escalate` (secret exposure and an authorization bypass escalated; the two network calls were `review`) while the other chunks stayed `auto`, so the verdict names where to look. The first part alone would have returned `auto` for the first chunk in all four and held the review only because the rest was not judged.

**Patch review (`jev_review`).** Every risky change was blocked, and the contract-break cases carry the deterministic reason `export_signature_change`. Honest limits: in these renames Jev already escalated every chunk of the contract-break cases, so the floor was not what blocked them; it matters when each chunk looks fine on its own. The two clean renames were held, which is **not an effect of chunking**: as a control, single-request slices of the same two clean cases (2, 4 and 6 files, 19–54k characters, small enough for one request) were escalated 6 of 6 times with `safe_to_apply_uncertain`, `correctness_uncertain` and `spec_match_uncertain`. Jev cannot confirm "behavior must not change" for a rename from the diff alone, at any size. A rename is therefore a poor *approval* benchmark and a good *detection* benchmark; I did not tune the template to make it pass.

## What the old behavior did instead

Before this change, a diff over about 31.8k estimated tokens was cut off at the tail and could never be `auto`: no large change, clean or not, could be approved (the best result was `review` with `incomplete_context`), and a defect past the cut was invisible. Arm B shows the same shape with a smaller window. Now each file is judged, a defect is reported against the part that holds it, and a clean change that Jev is willing to approve (the security review above) can be approved.

## A finding about the size estimate

The first live runs failed with `max_tokens_exceeded` at an *estimated* 28k tokens: for dense code the real count is about **1.4 times** the `chars/4` estimate. Chunks therefore target 62% of the estimated budget, and a chunk the provider still rejects as too large makes the review re-plan at 38%, then 23%. The same rejection is now `INPUT_TOO_LARGE` instead of `API_ERROR`, is not charged against the token budget, and sends a single request that the estimate said would fit through the chunked path. Smaller chunks did not help judgment: in a probe on the tuning seed, chunks of 2 to 4 files made Jev *less* confident than chunks of 6, because it saw less of the change.

## Limits

One model, one run per case, templates written by me, eight review and eight security cases (a small sample; read 7/8 and 10/10 as signals). Only mechanical renames were generated for review, so the approval side of the review is not measured here. Nothing was changed in the defaults, and no setting was tuned on this seed.
