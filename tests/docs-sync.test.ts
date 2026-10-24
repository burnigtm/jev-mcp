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

// --- The documented bars match the configured ones ---------------------------------------------------------------------

test("the documented default bar and profile table match the code", async () => {
  const { PROFILES } = await import("../src/profiles.ts");
  const { DEFAULT_AUTO_ACCEPT, CLAIM_AUTO_ACCEPT, REVIEW_AUTO_ACCEPT } = await import("../src/policy.ts");
  const configuration = readFileSync(fileURLToPath(new URL("../docs/configuration.md", import.meta.url)), "utf8");
  const envExample = readFileSync(fileURLToPath(new URL("../.env.example", import.meta.url)), "utf8");
  const bar = PROFILES.balanced.autoAccept;
  assert.equal(DEFAULT_AUTO_ACCEPT, bar, "the fallback default is the balanced bar");
  assert.ok(configuration.includes("| `JEV_MCP_AUTO_ACCEPT` | `" + bar + "` |"), "the environment table states the default");
  assert.ok(envExample.split(String.fromCharCode(10)).some(line => line.trim() === "# JEV_MCP_AUTO_ACCEPT=" + bar));
  assert.ok(reference.includes("May only raise the env floor (default `" + bar + "`"), "the tool reference states the default");
  // The profile table: one row per bar, balanced | conservative | strict.
  const cells = (label: string) => {
    const line = configuration.split(String.fromCharCode(10)).find(entry => entry.startsWith(label));
    assert.ok(line, label);
    return line.split("|").slice(2, 5).map(cell => Number(cell.trim()));
  };
  assert.deepEqual(cells("| `auto_accept` |"), [PROFILES.balanced.autoAccept, PROFILES.conservative.autoAccept, PROFILES.strict.autoAccept]);
  assert.deepEqual(cells("| `review_at` |"), [PROFILES.balanced.reviewAt, PROFILES.conservative.reviewAt, PROFILES.strict.reviewAt]);
  assert.deepEqual(cells("| `block_at` (screen) |"), [PROFILES.balanced.blockAt, PROFILES.conservative.blockAt, PROFILES.strict.blockAt]);
  for (const name of ["balanced", "conservative", "strict"]) assert.ok(configuration.includes("`" + name + "`"), name);
  assert.equal(CLAIM_AUTO_ACCEPT, 0.8);
  assert.equal(REVIEW_AUTO_ACCEPT, 0.8);
  assert.ok(configuration.includes("max(auto_accept, 0.8)"), "the claim and review bars are documented");
});
