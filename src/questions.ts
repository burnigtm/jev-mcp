import type { ChoiceQuestion, NoulQuestion, Question, Questions, ScoreQuestion } from "@typesafe-ai/sdk";
import { JevValidationError } from "./errors.js";

export type QuestionInput = {
  type: "noul" | "choice" | "score";
  instructions: string;
  criteria?: unknown;
};

export function parseQuestions(raw: Record<string, QuestionInput>): Questions {
  const questions: Questions = {};
  const ids = Object.keys(raw);
  if (ids.length === 0) {
    throw new JevValidationError("questions must contain at least one entry");
  }
  for (const [id, value] of Object.entries(raw)) {
    questions[id] = parseQuestion(id, value);
  }
  return questions;
}

export function parseQuestion(id: string, value: QuestionInput): Question {
  if (!value || typeof value !== "object") {
    throw new JevValidationError(`Question ${id} must be an object`);
  }
  if (value.type === "noul") {
    const question: NoulQuestion = {
      type: "noul",
      instructions: value.instructions,
    };
    if (value.criteria && typeof value.criteria === "object" && !Array.isArray(value.criteria)) {
      const criteria = value.criteria as { true?: string; false?: string };
      question.criteria = {
        true: criteria.true,
        false: criteria.false,
      };
    }
    return question;
  }
  if (value.type === "choice") {
    if (!value.criteria || typeof value.criteria !== "object" || Array.isArray(value.criteria)) {
      throw new JevValidationError(`Question ${id}: choice criteria must be a map of option to description`);
    }
    const criteria = value.criteria as Record<string, string | null>;
    const keys = Object.keys(criteria);
    if (keys.length < 2) {
      throw new JevValidationError(`Question ${id}: choice needs at least two options`);
    }
    const question: ChoiceQuestion = {
      type: "choice",
      instructions: value.instructions,
      criteria,
    };
    return question;
  }
  if (value.type === "score") {
    if (!Array.isArray(value.criteria) || value.criteria.length < 2) {
      throw new JevValidationError(`Question ${id}: score criteria must be an array of at least two level descriptions`);
    }
    const criteria = value.criteria as [string, string, ...string[]];
    const question: ScoreQuestion = {
      type: "score",
      instructions: value.instructions,
      criteria,
    };
    return question;
  }
  throw new JevValidationError(`Question ${id}: type must be noul, choice, or score`);
}

export function choiceCriteriaCount(question: Question): number {
  if (question.type !== "choice") {
    return 0;
  }
  return Object.keys(question.criteria).length;
}
