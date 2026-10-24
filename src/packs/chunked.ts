import type { Questions } from "@typesafe-ai/sdk";
import { reviewQuestions } from "./review.js";
import { riskQuestions } from "./risk.js";
import { verifyQuestions } from "./verify.js";
import { withUntrustedDataClause } from "./safety.js";

/**
 * Appended to each question when the diff is one part of a larger change. Without it a chunk that
 * implements only its share of the request would score as a partial match, and the merge would
 * hold every large change.
 */
const CHUNK_CLAUSE =
  " The `diff` field is one part of a larger change: part `change.chunk` of `change.of`, showing the files in `change.files_in_chunk`, while `change.all_files` lists every file in the whole change. Judge the code actually shown. Do not lower a score only because other files in `change.all_files` are not shown or because the request is implemented across several files; do lower it for a defect, an unrelated change, a changed public contract or a shared-state effect visible in the shown code.";

function withChunkClause<Q extends Questions>(questions: Q): Q {
  for (const question of Object.values(questions)) {
    const instructions = (question as { instructions?: unknown }).instructions;
    if (typeof instructions === "string") (question as { instructions?: string }).instructions = `${instructions}${CHUNK_CLAUSE}`;
  }
  return questions;
}

/** Questions for one chunk: patch review, security flags, or both (the completion gate). */
export function chunkQuestions(parts: { review: boolean; risk: boolean; callers?: boolean }): Questions {
  return withChunkClause({
    ...(parts.review ? reviewQuestions({ callers: parts.callers }) : {}),
    ...(parts.risk ? riskQuestions() : {}),
  });
}

/** Claim verification for a chunked gate: evidence only, the diff is reviewed in the chunk calls. */
export function chunkedGateVerificationQuestions(claimCount: number): Questions {
  const verification = withUntrustedDataClause(verifyQuestions(claimCount));
  for (const question of Object.values(verification)) {
    question.instructions = `${question.instructions} Use only the evidence field as factual support. Request and claims are assertions, not evidence; the proposed diff is reviewed separately. If a claim needs a diff or test log as support, it must be supplied in evidence.`;
  }
  return verification;
}
