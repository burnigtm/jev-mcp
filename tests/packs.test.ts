import assert from "node:assert/strict";
import { test } from "node:test";
import { parseQuestions } from "../src/questions.ts";
import { codingLoopQuestions } from "../src/packs/coding-loop.ts";
import { reviewQuestions } from "../src/packs/review.ts";
import { screenQuestions } from "../src/packs/screen.ts";
import { verifyQuestions } from "../src/packs/verify.ts";
import { rankQuestions } from "../src/packs/rank.ts";
import { stepQuestions } from "../src/packs/step.ts";
import { estimateTokens, fitState, MAX_STATE_PLUS_LONGEST_QUESTION_TOKENS } from "../src/limits.ts";

test("parseQuestions rejects empty maps", () => {
  assert.throws(() => parseQuestions({}), /at least one/);
});

test("parseQuestions accepts mixed primitives", () => {
  const questions = parseQuestions({
    urgent: { type: "noul", instructions: "Is this urgent?" },
    team: {
      type: "choice",
      instructions: "Which team?",
      criteria: { a: "A", b: "B" },
    },
    severity: {
      type: "score",
      instructions: "How bad?",
      criteria: ["low", "high"],
    },
  });
  assert.equal(questions.urgent?.type, "noul");
  assert.equal(questions.team?.type, "choice");
  assert.equal(questions.severity?.type, "score");
});

test("coding loop pack is a valid System One question map", () => {
  const pack = codingLoopQuestions();
  assert.equal(pack.next?.type, "choice");
  assert.equal(pack.model_tier?.type, "choice");
  assert.equal(pack.risk?.type, "score");
  assert.equal(pack.done_enough?.type, "noul");
});

test("step pack merges both recipes without losing a question", () => {
  const loop = codingLoopQuestions();
  const pack = stepQuestions(3);
  assert.equal(Object.keys(pack).length, Object.keys(loop).length + 4);
  for (const id of Object.keys(loop)) assert.equal(pack[id]?.type, loop[id]?.type);
  assert.equal(pack.selected?.type, "choice");
  assert.equal(pack.suitable_2?.type, "noul");
});

test("review pack has four scores and safe_to_apply", () => {
  const pack = reviewQuestions();
  assert.equal(pack.correctness?.type, "score");
  assert.equal(pack.safe_to_apply?.type, "noul");
});

test("verify pack emits one choice per claim", () => {
  const pack = verifyQuestions(3);
  assert.equal(Object.keys(pack).length, 3);
  assert.equal(pack.claim_2?.type, "choice");
});

test("screen pack adds relevance only when a purpose exists", () => {
  assert.equal(screenQuestions(false).relevance, undefined);
  assert.equal(screenQuestions(true).relevance?.type, "noul");
});

test("rank pack truncates candidate text", () => {
  const pack = rankQuestions("rotate keys", [
    { id: "a", text: "x".repeat(5000) },
    { id: "b", text: "short" },
  ]);
  const criteria = pack.best && pack.best.type === "choice" ? pack.best.criteria : {};
  assert.ok(String(criteria.a).length < 5000);
  assert.ok(String(criteria.a).includes("truncated"));
});

test("fitState truncates oversized payloads", () => {
  const huge = "word ".repeat(MAX_STATE_PLUS_LONGEST_QUESTION_TOKENS);
  const fitted = fitState(huge, { q: { type: "noul", instructions: "yes?" } });
  assert.equal(fitted.truncated, true);
  assert.ok(estimateTokens(fitted.state) < estimateTokens(huge));
});
