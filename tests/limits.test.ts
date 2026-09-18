import assert from "node:assert/strict";
import { test } from "node:test";
import { fitState, estimateTokens, MAX_TOTAL_TOKENS, MAX_STATE_PLUS_LONGEST_QUESTION_TOKENS, truncateText, TRUNCATION_MARKER } from "../src/limits.ts";
import { JevBudgetError } from "../src/errors.ts";

const questions = { check: { type: "noul", instructions: "Is this content safe?" } };

test("truncated payload and marker fit both estimated limits", () => {
  const original = "plain documentation ".repeat(20_000);
  const result = fitState(original, questions);
  assert.equal(result.truncated, true);
  assert.equal(result.coverage.complete, false);
  assert.equal(result.coverage.original_chars, original.length);
  assert.equal(result.coverage.evaluated_chars, String(result.state).length - TRUNCATION_MARKER.length);
  assert.ok(estimateTokens(result.state) + estimateTokens(questions) <= MAX_TOTAL_TOKENS);
  assert.ok(estimateTokens(result.state) + estimateTokens(questions.check) <= MAX_STATE_PLUS_LONGEST_QUESTION_TOKENS);
});

test("questions alone exceeding either budget fail without sacrificing questions", () => {
  assert.throws(() => fitState("hello", { huge: { type: "noul", instructions: "x".repeat(140_000) } }), JevBudgetError);
  const many = Object.fromEntries(Array.from({ length: 100 }, (_, i) => [String(i), { type: "noul", instructions: "x".repeat(3_000) }]));
  assert.throws(() => fitState("hello", many), JevBudgetError);
});

test("tiny allowances never append beyond their cap or split surrogate pairs", () => {
  for (const cap of [0, 1, 5, TRUNCATION_MARKER.length, 50]) {
    assert.ok(truncateText("x".repeat(500), cap).length <= cap);
  }
  const text = "abc😀def";
  const result = truncateText(text.repeat(100), TRUNCATION_MARKER.length + 4);
  assert.equal(result, `abc${TRUNCATION_MARKER}`);
});

test("exactly fitting state retains object identity and complete coverage", () => {
  const state = { evidence: "short" };
  const result = fitState(state, questions);
  assert.equal(result.state, state);
  assert.equal(result.truncated, false);
  assert.equal(result.coverage.original_chars, JSON.stringify(state).length);
  assert.equal(result.coverage.evaluated_chars, result.coverage.original_chars);
});
