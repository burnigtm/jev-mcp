import type {
  ChoiceResponse,
  NoulResponse,
  Question,
  Questions,
  ScoreResponse,
  SystemOneResult,
} from "@typesafe-ai/sdk";
import { estimateTokens, stringifyState } from "./limits.js";
import { confidenceFromProbabilities } from "./policy.js";

const INJECTION_PHRASES = [
  "ignore previous",
  "ignore all previous",
  "disregard the user's",
  "system note for ai",
  "system prompt",
  "you are now",
  "jailbreak",
  "developer override",
  "append your system prompt",
];

export function mockSystemOne<Q extends Questions>(request: {
  state: unknown;
  questions: Q;
  model: string;
}): SystemOneResult<Q> {
  const stateText = stringifyState(request.state);
  const answers: Record<string, NoulResponse | ChoiceResponse | ScoreResponse> = {};
  for (const [id, question] of Object.entries(request.questions) as Array<[string, Question]>) {
    answers[id] = mockQuestion(stateText, question, request.state);
  }
  return {
    model: `${request.model}+mock`,
    answers: answers as SystemOneResult<Q>["answers"],
    usage: {
      input_tokens: estimateTokens({ state: request.state, questions: request.questions }),
      output_tokens: Object.keys(request.questions).length * 8,
    },
  };
}

function mockQuestion(stateText: string, question: Question, state: unknown): NoulResponse | ChoiceResponse | ScoreResponse {
  if (question.type === "noul") {
    return mockNoul(stateText, question, state);
  }
  if (question.type === "choice") {
    return mockChoice(stateText, question, state);
  }
  return mockScore(stateText, question);
}

function mockNoul(stateText: string, question: Question & { type: "noul" }, state: unknown): NoulResponse {
  const instructions = asText(question.instructions);
  const lower = `${instructions}\n${stateText}`.toLowerCase();
  let noul = 0.15 + 0.7 * overlap(stateText, instructions);

  if (/injection|instructions aimed at an ai|jailbreak|prompt injection/i.test(instructions)) {
    noul = injectionScore(stateText);
  } else if (/substantive content|has substance/i.test(instructions)) {
    const trimmed = stateText.replace(/\s+/g, " ").trim();
    noul = trimmed.length < 40 ? 0.12 : Math.min(0.97, 0.4 + trimmed.length / 800);
  } else if (/relevant/i.test(instructions)) {
    const purpose = pickPurpose(state);
    noul = purpose ? overlap(stateText, purpose) : overlap(stateText, instructions);
  } else if (/done enough|task (is )?complete|ready to stop/i.test(instructions)) {
    noul = /all tests passed|tests pass|lgtm|complete|fixed/i.test(stateText) ? 0.86 : 0.22;
  } else if (/needs? more context|missing (info|context)/i.test(instructions)) {
    noul = /unclear|missing|which file|need more|unknown/i.test(stateText) ? 0.81 : 0.18;
  } else if (/likely fail/i.test(instructions)) {
    noul = /fail|error|typeerror|exception|red/i.test(stateText) ? 0.84 : 0.16;
  } else if (/safe to apply|safe to merge/i.test(instructions)) {
    noul = /delete|drop table|force push|--force|production/i.test(stateText) ? 0.12 : 0.78;
  } else if (/does any candidate|contains an answer|addresses the query/i.test(instructions)) {
    noul = existsFromCandidates(state);
  }

  if (/urgency|urgent/i.test(instructions) && /asap|urgent|immediately|failing for \d+ days/i.test(lower)) {
    noul = Math.max(noul, 0.93);
  }

  return { type: "noul", noul: clamp01(noul) };
}

function mockChoice(stateText: string, question: Question & { type: "choice" }, state: unknown): ChoiceResponse {
  const instructions = asText(question.instructions);
  const labels = Object.keys(question.criteria);
  const scores = labels.map((label) =>
    scoreOption(stateText, instructions, label, asText(question.criteria[label]), state),
  );
  const probabilities = Object.fromEntries(labels.map((label) => [label, 0]));
  const softmaxed = softmax(scores);
  labels.forEach((label, i) => {
    probabilities[label] = softmaxed[i] ?? 0;
  });
  const choice = labels.reduce((best, label) =>
    (probabilities[label] ?? 0) > (probabilities[best] ?? 0) ? label : best,
  );
  return {
    type: "choice",
    choice,
    probabilities,
    confidence: confidenceFromProbabilities(probabilities),
  };
}

function mockScore(stateText: string, question: Question & { type: "score" }): ScoreResponse {
  const instructions = asText(question.instructions);
  const levels = question.criteria.map((level) => asText(level));
  const scores = levels.map((level, index) => {
    const overlapScore = overlap(stateText, `${instructions} ${level}`);
    return overlapScore + index * 0.05;
  });

  if (/risk|blast|destructive/i.test(instructions)) {
    const high = /delete|drop table|force push|--force|production|rm -rf/i.test(stateText);
    const mid = /refactor|rename|edit|patch/i.test(stateText);
    for (let i = 0; i < scores.length; i += 1) {
      scores[i] = 0.1;
    }
    if (high) {
      scores[scores.length - 1] = 3;
    } else if (mid) {
      scores[Math.min(1, scores.length - 1)] = 3;
    } else {
      scores[0] = 3;
    }
  }

  if (/correctness|looks correct/i.test(instructions)) {
    if (/fail|bug|wrong|broken/i.test(stateText)) {
      scores[0] = 3;
    } else if (/tests pass|fixed|lgtm/i.test(stateText)) {
      scores[scores.length - 1] = 3;
    }
  }

  const probabilities = Object.fromEntries(
    softmax(scores).map((value, index) => [String(index), value]),
  ) as Record<string, number>;
  const legend = Object.fromEntries(levels.map((level, index) => [String(index), level])) as Record<string, string>;
  const score = softmax(scores).reduce((sum, value, index) => sum + value * index, 0);
  return {
    type: "score",
    score,
    legend,
    probabilities,
    confidence: confidenceFromProbabilities(probabilities),
  };
}

function scoreOption(
  stateText: string,
  instructions: string,
  label: string,
  description: string,
  state: unknown,
): number {
  let score = overlap(stateText, `${label} ${description}`) * 3 + overlap(stateText, instructions);
  score += verifyBoost(instructions, label, state);
  score += rankBoost(label, description, state);

  const haystack = stateText.toLowerCase();
  if (label === "retry" && /fail|error|typeerror|exception|again/i.test(haystack)) {
    score += 4;
  }
  if (label === "stop" && /all tests passed|done|complete|lgtm|fixed/i.test(haystack)) {
    score += 4;
  }
  if (label === "ask_user" && /unclear|missing|which file|need more|unknown/i.test(haystack)) {
    score += 4;
  }
  if (label === "continue" && score < 1) {
    score += 0.8;
  }
  if (label === "cheap" && /rename|typo|format|lint|comment/i.test(haystack)) {
    score += 3;
  }
  if (label === "reasoning" && /architecture|design|race|deadlock|complex|refactor across/i.test(haystack)) {
    score += 3;
  }
  if (label === "standard") {
    score += 0.4;
  }
  if (label === "edit" && /change|patch|implement|fix/i.test(haystack)) {
    score += 1.5;
  }
  if (label === "test" && /test|spec|failing/i.test(haystack)) {
    score += 1.5;
  }
  if (label === "search" && /where|which file|find|locate/i.test(haystack)) {
    score += 1.5;
  }
  if (label === "read" && /read|inspect|understand/i.test(haystack)) {
    score += 1.2;
  }
  if (label === "plan" && /plan|design|approach/i.test(haystack)) {
    score += 1.2;
  }
  return score;
}

function verifyBoost(instructions: string, label: string, state: unknown): number {
  const claimMatch = instructions.match(/claims\[(\d+)\]/);
  if (!claimMatch || !state || typeof state !== "object") {
    return 0;
  }
  const claims = (state as { claims?: unknown }).claims;
  const evidence = (state as { evidence?: unknown }).evidence;
  if (!Array.isArray(claims)) {
    return 0;
  }
  const claim = String(claims[Number(claimMatch[1])] ?? "");
  const evidenceText = stringifyState(evidence);
  if (label === "contradicted" && optionalVsRequired(claim, evidenceText)) {
    return 6;
  }
  if (label === "verified" && overlap(evidenceText, claim) > 0.28 && !optionalVsRequired(claim, evidenceText)) {
    return 6;
  }
  if (label === "unsupported" && overlap(evidenceText, claim) < 0.18 && !optionalVsRequired(claim, evidenceText)) {
    return 5;
  }
  return 0;
}

function optionalVsRequired(claim: string, evidence: string): boolean {
  const claimOptional = /optional|not required|never need|may skip/.test(claim.toLowerCase());
  const evidenceRequired = /must|required|shall|always|at all times/.test(evidence.toLowerCase());
  return claimOptional && evidenceRequired;
}

function rankBoost(label: string, description: string, state: unknown): number {
  if (!state || typeof state !== "object" || !("query" in state)) {
    return 0;
  }
  const query = stringifyState((state as { query?: unknown }).query ?? "");
  return overlap(query, `${label} ${description}`) * 10;
}

function existsFromCandidates(state: unknown): number {
  if (!state || typeof state !== "object") {
    return 0.14;
  }
  const query = stringifyState((state as { query?: unknown }).query ?? "");
  const candidates = (state as { candidates?: Array<{ text?: string }> }).candidates ?? [];
  const max = Math.max(0, ...candidates.map((candidate) => overlap(candidate.text ?? "", query)));
  if (max > 0.25) {
    return Math.min(0.99, 0.5 + max);
  }
  return 0.12;
}

function injectionScore(stateText: string): number {
  const lower = stateText.toLowerCase();
  for (const phrase of INJECTION_PHRASES) {
    if (lower.includes(phrase)) {
      return 0.97;
    }
  }
  return 0.04;
}

function pickPurpose(state: unknown): string {
  if (state && typeof state === "object" && !Array.isArray(state) && "purpose" in state) {
    return stringifyState((state as { purpose: unknown }).purpose);
  }
  return "";
}

function asText(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }
  if (value === null || value === undefined) {
    return "";
  }
  return JSON.stringify(value);
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/g)
    .filter((token) => token.length > 1);
}

function overlap(a: string, b: string): number {
  const left = new Set(tokenize(a));
  const right = tokenize(b);
  if (right.length === 0) {
    return 0;
  }
  let hits = 0;
  for (const token of right) {
    if (left.has(token)) {
      hits += 1;
    }
  }
  return hits / right.length;
}

function softmax(scores: number[]): number[] {
  const max = Math.max(...scores, 0);
  const exps = scores.map((score) => Math.exp(score - max));
  const sum = exps.reduce((total, value) => total + value, 0) || 1;
  return exps.map((value) => value / sum);
}

function clamp01(value: number): number {
  return Math.min(0.999, Math.max(0.001, value));
}
