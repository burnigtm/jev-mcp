import { z } from "zod";
import { getConfig } from "../config.js";
import { DECISION_ID_PATTERN, FEEDBACK_OUTCOMES, MAX_NOTE_CHARS, recordFeedback } from "../ledger.js";
import { sanitizeUntrustedDocument } from "../untrusted.js";

export const feedbackInputSchema = z.object({
  decision_id: z.string().regex(DECISION_ID_PATTERN, "decision_id must be the `decision_id` returned by a Jev tool").describe("The `decision_id` from the tool result being labelled"),
  outcome: z.enum(FEEDBACK_OUTCOMES).describe("`correct`: the decision was right; `false_alarm`: it blocked or reviewed something that was fine; `missed`: it approved something that was not"),
  note: z.string().max(MAX_NOTE_CHARS).optional().describe(`Optional short free-text reason, at most ${MAX_NOTE_CHARS} characters. Never include secrets or code; it is stored as written`),
});

export type FeedbackInput = z.infer<typeof feedbackInputSchema>;

export const feedbackOutputSchema = z.object({
  recorded: z.boolean(),
  decision_id: z.string(),
  outcome: z.enum(FEEDBACK_OUTCOMES),
  reason: z.enum(["ledger_disabled", "duplicate", "write_failed"]).optional(),
});

/**
 * Label an earlier decision. This only appends to the local ledger when it is enabled (JEV_MCP_LEDGER=1); it changes
 * no decision and makes no provider request. Repeating identical feedback in one server process is ignored.
 */
export async function runFeedback(input: FeedbackInput) {
  const config = getConfig();
  const note = input.note === undefined ? undefined : sanitizeUntrustedDocument(input.note).trim() || undefined;
  const result = recordFeedback(
    { enabled: config.ledger, dir: config.ledgerDir, maxBytes: config.ledgerMaxBytes },
    { decisionId: input.decision_id, outcome: input.outcome, ...(note === undefined ? {} : { note }) },
  );
  return feedbackOutputSchema.parse({ recorded: result.recorded, decision_id: input.decision_id, outcome: input.outcome, ...(result.reason ? { reason: result.reason } : {}) });
}
