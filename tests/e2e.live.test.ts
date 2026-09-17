import assert from "node:assert/strict";
import { test } from "node:test";
import { runEvaluate } from "../src/tools/evaluate.ts";

const live = Boolean(process.env.TYPESAFE_API_KEY) && process.env.JEV_MCP_MOCK !== "1";

test("live TypeSafe evaluate", { skip: !live }, async () => {
  const result = await runEvaluate({
    state: "The support agent issued a full refund to the customer.",
    questions: {
      refunded: {
        type: "noul",
        instructions: "Was a refund issued?",
      },
    },
  });
  assert.equal(result.answers.refunded?.type, "noul");
  assert.ok((result.answers.refunded as { noul: number }).noul > 0.5);
});
