// Spawned by tests/ledger.test.ts: several processes append to one ledger at once.
import { newDecisionId, recordDecision } from "../../src/ledger.ts";

const [dir, count, label] = process.argv.slice(2);
let dropped = 0;
for (let i = 0; i < Number(count); i += 1) {
  const written = recordDecision(
    { enabled: true, dir: dir!, maxBytes: 50_000_000 },
    { decisionId: newDecisionId(), tool: "jev_review", args: { label, i }, payload: { model: "jev", action: "auto", reason_codes: ["accepted"], usage: { input_tokens: 1, output_tokens: 1 }, truncated: false }, durationMs: 1 },
  );
  if (!written) dropped += 1;
}
// A record the ledger refused to write is a failure of this process, so the parent test sees which one lost data.
if (dropped > 0) process.exitCode = 1;
