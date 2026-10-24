// Spawned by tests/ledger.test.ts: several processes append to one ledger at once.
import { newDecisionId, recordDecision } from "../../src/ledger.ts";

const [dir, count, label] = process.argv.slice(2);
for (let i = 0; i < Number(count); i += 1) {
  recordDecision(
    { enabled: true, dir: dir!, maxBytes: 50_000_000 },
    { decisionId: newDecisionId(), tool: "jev_review", args: { label, i }, payload: { model: "jev", action: "auto", reason_codes: ["accepted"], usage: { input_tokens: 1, output_tokens: 1 }, truncated: false }, durationMs: 1 },
  );
}
