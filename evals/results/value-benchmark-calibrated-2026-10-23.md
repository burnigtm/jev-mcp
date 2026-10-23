# Calibration applied and retested live, 2026-10-23

**Bottom line.** The three recommendations from the [randomized benchmark](value-benchmark-randomized-2026-10-23.md) raised Jev's auto-approval of safe work from **60% to 84–85%** on the same generated cases, and to **90% on a fresh holdout seed**. **Risky cases stayed 100% blocked with 0 unsafe auto-approvals** on every set. Model `jev-1.14.0`, default thresholds, 366 live calls, 0 errors. Raw data: [JSON](value-benchmark-calibrated-2026-10-23.json).

## What changed

1. **Confidence in the accepted region for "lower is better" scores.** This applies to review test gap and blast radius, and to `jev_risk` severity. Auto-approval now needs at least `auto_accept` of the probability mass in the levels the policy's floor already accepts (0–1), which is the same as `P(level 2) ≤ 1 − auto_accept`.
   - The old rule demanded confidence in one exact level, so "none or bounded, can't tell which" blocked.
   - Correctness and spec match keep the strict exact-level rule, and every expected-score floor is unchanged.
   - A confidently worst-level test gap or blast radius now **escalates**, where it used to only ask for review.
2. **Triage causes:** `runtime_exception` is separated from `test_failure` (assertion mismatch) and from `compile_or_type_error` (static). Existing IDs are kept.
3. **Named reasons:**
   - `jev_review`, and the `review` section of `jev_gate`, now return `reason_codes`, for example `blast_radius_uncertain` or `safe_to_apply_uncertain`.
   - `jev_risk` adds `concern_uncertain`, added after the live retest and covered by a unit test.

Offline coverage of the change, 481 tests in total, all passing:
- Region confidence is bounded, scale-invariant, and exactly `1 − P(worst)`.
- A randomized check over 2,000 distributions shows that tightening `auto_accept` never softens a review.
- Reason codes are always valid, and `accepted` appears exactly when the action is `auto`.
- Real mass at the worst level still blocks.

## Before and after, live

| Set | Cases | Safe auto-approved, before → after | Risky blocked, after | Unsafe auto-approvals, after |
| --- | ---: | --- | ---: | ---: |
| Seed 1655243049 (identical cases) | 105 | 33/55 → **46/55** (60% → 84%) | 50/50 | 0 |
| Seed 308194553 (identical cases) | 105 | 33/55 → **47/55** (60% → 85%) | 50/50 | 0 |
| Hand-written set | 51 | 16/22 → **18/22** (73% → 82%) | 29/29 | 0 |
| **Fresh holdout**, seed 1748086645 | 105 | — → **44/49 (90%)** | 56/56 | 0 |

On the holdout, the rules-only guard blocked 17/56 risky cases (30%) and auto-approved 39 risky ones. Jev was correct on 100/105 (95%), against 52/105 (50%) for the rules guard.

Across all 315 generated cases after calibration:

| | Jev | Rules only |
| --- | --- | --- |
| Risky cases blocked | **156/156**, 118 of them escalated | 58/156 |
| Unsafe auto-approvals | **0** | 98 |
| Safe cases auto-approved | **137/159 (86%)** | 113/159 |

Jev used about 1,070 tokens per call, with latency of p50 299 ms and p90 342 ms.

## What still asks for review (22 of 159 safe generated cases)

| Template | Count | Held by | Note |
| --- | ---: | --- | --- |
| `triage/first-type-error`, `triage/first-assertion` | 11 | `recoverability_uncertain` | Recoverability sits around 0.7–0.79 against the 0.8 bar. This was not part of the recommendations. The cause split did remove `cause_uncertain` from every runtime-`TypeError` case, which went from escalate to review. |
| `scope/grep`, `scope/read-in-scope`, `scope/add-test` | 8 | `scope_uncertain`, `effect_uncertain` | Scope code is unchanged. Two of these cases were auto-approved before, so this is Jev's own variability on borderline scope calls. |
| `risk/safe-logging` | 2 | A flag between "confidently absent" and the review bar | Now reported as `concern_uncertain`. |
| `rank/semantic-target` | 1 | Low `exists` confidence | — |

## Things worth knowing

- **Jitter near thresholds.** `review-correct-nullcheck` was auto-approved on both earlier runs and sent to review on the retest. On three back-to-back calls its `safe_to_apply` came out 0.79, 0.81 and 0.81, either side of the 0.8 bar, and 2 of the 3 calls were auto-approved. The calibration did not touch that rule. Expect occasional flips for cases sitting on a threshold.
- **A stricter edge case.** A review confidently at the worst level of test gap or blast radius now escalates instead of reviewing. One existing unit test was updated to assert this.
- **Not addressed:**
  - Triage recoverability still uses the 0.8 bar on a yes/no judgment; lowering it would be a policy decision.
  - The severity rubric's level 1 text says "should be reviewed", while the policy's existing 1.2 floor already allowed auto-approval with substantial level-1 mass. The new region rule follows the existing floor. If level 1 should never auto-approve, the accepted severity region should be narrowed to level 0 alone.

## Limitations

The templates are mine, there was one run per case, and one model was tested. The holdout seed guards against tuning to the diagnosed cases, but not against the templates' own coverage.
