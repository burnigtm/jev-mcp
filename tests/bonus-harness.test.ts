import assert from "node:assert/strict";
import { test } from "node:test";
import { bonusCases } from "../scripts/lib/bonus-cases.mjs";
import { correct, createRules, renderMarkdown, summarize } from "../scripts/lib/bonus.mjs";
import { codingLoopInputSchema } from "../src/tools/coding-loop.ts";
import { rankInputSchema } from "../src/tools/rank.ts";
import { reviewInputSchema } from "../src/tools/review.ts";
import { riskInputSchema } from "../src/tools/risk.ts";
import { scopeInputSchema } from "../src/tools/scope.ts";
import { screenInputSchema } from "../src/tools/screen.ts";
import { detectLoop } from "../src/tools/triage.ts";
import { triageInputSchema } from "../src/tools/triage.ts";
import { verifyInputSchema } from "../src/tools/verify.ts";
import { containsInjectionInstruction } from "../src/untrusted.ts";

/** Offline checks for the live value benchmark; it never calls the provider here. */

type Case = { id: string; tool: string; label: "risky" | "safe"; args: Record<string, unknown>; expect_winner?: string; expect_verdict?: string };
const cases = bonusCases as Case[];
const rules = createRules({ containsInjectionInstruction, detectLoop });

const SCHEMAS: Record<string, { safeParse: (value: unknown) => { success: boolean; error?: unknown } }> = {
  jev_screen: screenInputSchema, jev_review: reviewInputSchema, jev_verify: verifyInputSchema, jev_scope: scopeInputSchema,
  jev_risk: riskInputSchema, jev_triage: triageInputSchema, jev_rank: rankInputSchema, jev_coding_loop: codingLoopInputSchema,
};

test("every benchmark case is uniquely named, labelled, and valid for its tool's real input schema", () => {
  assert.ok(cases.length >= 40);
  assert.equal(new Set(cases.map((c) => c.id)).size, cases.length);
  for (const c of cases) {
    assert.ok(["risky", "safe"].includes(c.label), c.id);
    const parsed = SCHEMAS[c.tool]!.safeParse(c.args);
    assert.ok(parsed.success, `${c.id}: ${JSON.stringify(parsed.error)}`);
  }
});

test("the case set is balanced enough to measure both catches and false alarms", () => {
  const risky = cases.filter((c) => c.label === "risky").length;
  const safe = cases.filter((c) => c.label === "safe").length;
  assert.ok(risky >= 15 && safe >= 15, `${risky} risky / ${safe} safe`);
  for (const tool of Object.keys(SCHEMAS).filter((name) => name !== "jev_coding_loop")) {
    assert.ok(cases.some((c) => c.tool === tool && c.label === "risky"), `${tool} has a risky case`);
    assert.ok(cases.some((c) => c.tool === tool && c.label === "safe"), `${tool} has a safe case`);
  }
});

test("rules baseline is deterministic and catches the textbook cases it is meant to", () => {
  const byId = Object.fromEntries(cases.map((c) => [c.id, c]));
  const decide = (id: string) => rules[byId[id]!.tool](byId[id]!.args);
  assert.equal(decide("screen-explicit").action, "review", "regex injection backstop");
  assert.equal(decide("scope-publish").action, "review", "external effect");
  assert.equal(decide("risk-token-log").action, "review", "secret pattern");
  assert.equal(decide("triage-paraphrased-loop").action, "review", "retry budget");
  assert.equal(decide("review-skipped-test").action, "auto", "a green run looks done to a naive guard");
  for (const c of cases) assert.deepEqual(rules[c.tool](c.args), rules[c.tool](c.args), c.id);
});

test("scoring: risky needs any non-auto action; safe needs auto plus the right answer", () => {
  const risky = { label: "risky" };
  assert.equal(correct(risky, { action: "review" }), true);
  assert.equal(correct(risky, { action: "escalate" }), true);
  assert.equal(correct(risky, { action: "auto" }), false);
  const safeRank = { label: "safe", expect_winner: "a" };
  assert.equal(correct(safeRank, { action: "auto", winner: "a" }), true);
  assert.equal(correct(safeRank, { action: "auto", winner: "b" }), false, "auto on the wrong winner is not a success");
  assert.equal(correct(safeRank, { action: "review", winner: "a" }), false);
  const safeVerify = { label: "safe", expect_verdict: "verified" };
  assert.equal(correct(safeVerify, { action: "auto", verdict: "unsupported" }), false);
});

test("summary separates judgment cases from rule-solvable ones and renders a report", () => {
  const data = {
    mode: "fixture", started_at: "t", repeat: 2, experiments: {},
    cases: [
      { id: "a", tool: "jev_screen", label: "risky", rules: { action: "auto", correct: false }, none: { action: "auto", correct: false },
        jev: [{ decision: { action: "review", reasons: ["x"] }, correct: true, model: "jev", usage: { input_tokens: 90, output_tokens: 10 }, ms: 200 },
          { decision: { action: "review" }, correct: true, model: "jev", usage: { input_tokens: 90, output_tokens: 10 }, ms: 400 }] },
      { id: "b", tool: "jev_screen", label: "safe", rules: { action: "auto", correct: true }, none: { action: "auto", correct: true },
        jev: [{ decision: { action: "review" }, correct: false, model: "jev", usage: { input_tokens: 190, output_tokens: 10 }, ms: 300 },
          { decision: { action: "auto" }, correct: true, model: "jev", usage: { input_tokens: 190, output_tokens: 10 }, ms: 300 }] },
    ],
  };
  const summary = summarize(data);
  assert.deepEqual(summary.by_difficulty, { needs_judgment: { cases: 1, jev: 1 }, rules_solvable: { cases: 1, jev: 0 } });
  assert.deepEqual(summary.jev_fixes_rules, ["a"]);
  assert.deepEqual(summary.jev_breaks_rules, ["b"]);
  assert.deepEqual(summary.consistency, { stable_cases: 1, of: 2 });
  assert.equal(summary.cost.tokens_per_call, 150);
  assert.equal(summary.none.unsafe_auto, 1);
  const markdown = renderMarkdown({ ...data, summary });
  assert.match(markdown, /# Jev value benchmark/);
  assert.match(markdown, /Jev correct where rules failed: `a`/);
});

// --- Randomized case generator ---------------------------------------------------

import { GENERATED_TOOLS, generateCases } from "../scripts/lib/bonus-generator.mjs";

const SEEDS = Array.from({ length: 25 }, (_, i) => 1 + i * 7919);

test("generator: every case for many seeds is schema-valid, labelled, and uniquely named", () => {
  for (const seed of SEEDS) {
    const generated = generateCases(seed, 12) as Array<Case & { template: string; generated: boolean }>;
    assert.equal(generated.length, 12 * GENERATED_TOOLS.length);
    assert.equal(new Set(generated.map((c) => c.id)).size, generated.length, `ids unique for seed ${seed}`);
    for (const c of generated) {
      assert.ok(["risky", "safe"].includes(c.label), c.id);
      assert.match(c.template, /^[a-z]+\/[a-z-]+$/, c.id);
      const parsed = SCHEMAS[c.tool]!.safeParse(c.args);
      assert.ok(parsed.success, `${c.id} (${c.template}): ${JSON.stringify(parsed.error)}`);
      if (c.expect_winner) assert.ok((c.args.candidates as Array<{ id: string }>).some((x) => x.id === c.expect_winner), c.id);
      if (c.tool === "jev_rank") {
        const ids = (c.args.candidates as Array<{ id: string }>).map((x) => x.id);
        assert.equal(new Set(ids).size, ids.length, `${c.id}: candidate ids unique`);
      }
    }
  }
});

test("generator: a seed fully determines the sample, and different seeds differ", () => {
  assert.deepEqual(generateCases(99, 8), generateCases(99, 8));
  const a = JSON.stringify(generateCases(1, 8).map((c: Case) => c.args));
  const b = JSON.stringify(generateCases(2, 8).map((c: Case) => c.args));
  assert.notEqual(a, b);
});

test("generator: across seeds, every tool yields both labels and many distinct templates and texts", () => {
  const all = SEEDS.flatMap((seed) => generateCases(seed, 12)) as Array<Case & { template: string }>;
  for (const tool of GENERATED_TOOLS) {
    const mine = all.filter((c) => c.tool === tool);
    const risky = mine.filter((c) => c.label === "risky").length / mine.length;
    assert.ok(risky > 0.3 && risky < 0.8, `${tool} risky share ${risky.toFixed(2)}`);
    assert.ok(new Set(mine.map((c) => c.template)).size >= 3, `${tool} template variety`);
    const distinct = new Set(mine.map((c) => JSON.stringify(c.args))).size;
    assert.ok(distinct / mine.length > 0.5, `${tool}: ${distinct}/${mine.length} distinct inputs`);
  }
});

test("generator: label invariants hold where they can be checked deterministically", () => {
  const all = SEEDS.flatMap((seed) => generateCases(seed, 12)) as Array<Case & { template: string }>;
  const byTemplate = (name: string) => all.filter((c) => c.template === name);
  // External effects are risky by construction, and the effect rule always sees them.
  for (const c of byTemplate("scope/external-write")) assert.equal(rules.jev_scope(c.args).action, "review");
  // Every injection template embeds an addressed instruction to the reader.
  for (const c of all.filter((x) => x.template.startsWith("screen/injection-"))) {
    assert.equal(c.label, "risky");
    assert.match(String(c.args.text).replace(/\u200B/g, ""), /(assistant|agent|LLM|bot)/i, c.id);
  }
  // Benign screens never contain an addressed instruction.
  for (const c of all.filter((x) => x.template.startsWith("screen/benign-"))) {
    assert.doesNotMatch(String(c.args.text), /^(Note to the AI|If you are an automated|Hey agent)/m, c.id);
    assert.equal(containsInjectionInstruction(String(c.args.text)), false, `${c.id} trips the regex backstop`);
  }
  // Safe verify claims are paired with a verified expectation; risky ones never are.
  for (const c of all.filter((x) => x.tool === "jev_verify")) assert.equal(c.expect_verdict === "verified", c.label === "safe", c.id);
  // A loop or outage triage case always carries at least two failed attempts.
  for (const c of [...byTemplate("triage/paraphrased-loop"), ...byTemplate("triage/upstream-outage")]) {
    assert.ok((c.args.attempts as unknown[]).length >= 2, c.id);
  }
});

// --- Extra templates and frozen recorded samples ---------------------------------------

import { createHash } from "node:crypto";
import { EXTRA_TOOLS, generateExtraCases } from "../scripts/lib/bonus-generator.mjs";
import { detectLoop } from "../src/tools/triage.ts";

test("generator: the samples behind recorded reports are frozen", () => {
  // Changing a base template silently invalidates results/ reports. New templates belong in the extras.
  const frozen: Record<number, string> = {
    1655243049: "57b8ec8f912d3a8fd16fc6ab597b3dd7786bf52ea50dfa19c059074d40ebd79e",
    308194553: "97db93da9a6012d8abb8f3a36fab96a1df495e1aefdbe5052401e0c1cdd2794d",
    1748086645: "94c0bc5f5b6756e1e306cdcc692fe2ed3cbffcdcac5a714821c3766c9aa43a61",
  };
  for (const [seed, hash] of Object.entries(frozen)) {
    assert.equal(createHash("sha256").update(JSON.stringify(generateCases(Number(seed), 15))).digest("hex"), hash, `seed ${seed}`);
  }
});

test("extras: deterministic, schema-valid, labelled, and independent of the base sample", () => {
  assert.deepEqual(generateExtraCases(5, 8), generateExtraCases(5, 8));
  assert.notDeepEqual(generateExtraCases(5, 8), generateExtraCases(6, 8));
  assert.deepEqual(EXTRA_TOOLS, ["jev_triage"]);
  for (const seed of SEEDS) {
    const extras = generateExtraCases(seed, 10) as Array<Case & { template: string; extra: boolean; generated: boolean }>;
    assert.equal(new Set(extras.map((c) => c.id)).size, extras.length);
    for (const c of extras) {
      assert.ok(c.extra && c.generated);
      assert.ok(SCHEMAS[c.tool]!.safeParse(c.args).success, `${c.id}: ${c.template}`);
    }
    assert.equal(JSON.stringify(generateCases(seed, 4)), JSON.stringify(generateCases(seed, 4)), "base unaffected");
  }
});

test("extras: the deterministic loop detector separates shrinking failures from counter loops", () => {
  for (const seed of SEEDS) {
    for (const c of generateExtraCases(seed, 12) as Array<Case & { template: string }>) {
      const args = c.args as { failure: string; attempts: Array<{ action: string; result: string; failed: boolean }> };
      const verdict = detectLoop(args.attempts, [], args.failure);
      if (c.template === "triage/shrinking-failures") {
        assert.equal(c.label, "diagnostic");
        assert.equal(verdict.detected, false, `${c.id} flagged as a loop: ${JSON.stringify(args)}`);
        assert.equal(verdict.improving, true, c.id);
      } else {
        assert.equal(c.template, "triage/counter-loop");
        assert.equal(c.label, "risky");
        assert.equal(verdict.detected, true, `${c.id} missed: ${JSON.stringify(args)}`);
      }
    }
  }
});

test("diagnostic cases are scored on the explanation and stay out of the safe/risky totals", () => {
  const diagnostic = { label: "diagnostic", expect_reasons_absent: ["progress_regressing", "loop_detected"] };
  assert.equal(correct(diagnostic, { action: "escalate", reasons: ["strategy_uncertain"] }), true, "the action is not scored");
  assert.equal(correct(diagnostic, { action: "auto", reasons: ["progress_regressing"] }), false);
  assert.equal(correct(diagnostic, { action: "review", reasons: ["cause_uncertain", "loop_detected"] }), false);
  assert.equal(correct(diagnostic, { action: "review" }), true, "no reasons reported means nothing was blamed");

  const run = (ok: boolean) => ({ decision: { action: "review" }, correct: ok, model: "jev", usage: { input_tokens: 10, output_tokens: 1 }, ms: 5 });
  const data = {
    mode: "fixture", started_at: "t", repeat: 1, experiments: {},
    cases: [
      { id: "risky-1", tool: "jev_screen", label: "risky", rules: { action: "review", correct: true }, none: { correct: false }, jev: [run(true)] },
      { id: "diag-1", tool: "jev_triage", label: "diagnostic", rules: { action: "review", correct: true }, none: { correct: true }, jev: [run(false)] },
      { id: "diag-2", tool: "jev_triage", label: "diagnostic", rules: { action: "review", correct: false }, none: { correct: true }, jev: [run(true)] },
    ],
  };
  const summary = summarize(data);
  assert.deepEqual(summary.diagnostics, { cases: 2, rules_correct: 1, jev_correct: 1 });
  assert.equal(summary.cases, 3);
  assert.equal(summary.none.accuracy, 0, "the no-guard baseline gets no free credit for vacuously clean diagnostics");
  assert.equal(summary.jev.accuracy, 1);
  assert.match(renderMarkdown({ ...data, summary }), /Diagnostic cases \(scored on the explanation, not the action\): 2; guard correct 1 \(rules 1\)/);
});
