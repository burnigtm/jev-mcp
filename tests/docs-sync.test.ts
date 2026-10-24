import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { gateReasonCodeSchema } from "../src/tools/gate.ts";
import { reviewReasonSchema, riskReasonSchema, scopeReasonSchema, triageReasonSchema } from "../src/tools/output-schemas.ts";
import { reasonSchema as routeReasonSchema } from "../src/tools/tool-route.ts";

/**
 * The tool reference is the contract hosts code against. Every reason code a tool can return must be named there, so a new
 * code cannot ship undocumented. (A code is "documented" when it appears in backticks in the reference.)
 */

const reference = readFileSync(fileURLToPath(new URL("../skills/jev-mcp/references/tools.md", import.meta.url)), "utf8");

const ENUMS: Record<string, readonly string[]> = {
  review: reviewReasonSchema.options,
  scope: scopeReasonSchema.options,
  triage: triageReasonSchema.options,
  risk: riskReasonSchema.options,
  gate: gateReasonCodeSchema.options,
  "tool_route / step": routeReasonSchema.options,
};

for (const [tool, codes] of Object.entries(ENUMS)) {
  test(`every ${tool} reason code is documented in the tool reference`, () => {
    const missing = codes.filter((code) => !reference.includes(`\`${code}\``));
    assert.deepEqual(missing, [], `undocumented ${tool} reason codes: ${missing.join(", ")}`);
  });
}

test("every registered tool has a section in the reference and in the docs index", () => {
  const index = readFileSync(fileURLToPath(new URL("../docs/tools.md", import.meta.url)), "utf8");
  for (const tool of ["jev_evaluate", "jev_coding_loop", "jev_step", "jev_tool_route", "jev_review", "jev_verify", "jev_gate", "jev_screen", "jev_rank", "jev_scope", "jev_triage", "jev_risk", "jev_feedback"]) {
    assert.match(reference, new RegExp(`^## \`${tool}\``, "m"), `${tool} section in the reference`);
    assert.match(index, new RegExp(`^## \`${tool}\``, "m"), `${tool} entry in docs/tools.md`);
  }
});
