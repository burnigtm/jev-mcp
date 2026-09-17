import { z } from "zod";
import { MAX_CHOICE_OPTIONS, chunk } from "../limits.js";
import { existsVerdict, rankQuestions, type RankCandidate } from "../packs/rank.js";
import { asChoice, asNoul } from "../result.js";
import { systemOne } from "../typesafe.js";

export const rankInputSchema = z.object({
  query: z.string().describe("What you are looking for, in natural language"),
  candidates: z
    .array(
      z.object({
        id: z.string().min(1),
        text: z.string(),
      }),
    )
    .min(2)
    .describe("Candidates to rank. More than 250 are chunked, then the winners are re-ranked."),
  top_k: z.number().int().min(1).max(50).optional().describe("How many ranked candidates to return. Default 5."),
  model: z.string().optional(),
});

export type RankInput = z.infer<typeof rankInputSchema>;

type RankedHit = { id: string; probability: number };

export async function runRank(input: RankInput) {
  const unique = uniquify(input.candidates);
  const topK = input.top_k ?? 5;
  if (unique.length <= MAX_CHOICE_OPTIONS) {
    return rankOne(input.query, unique, topK, input.model);
  }

  const groups = chunk(unique, MAX_CHOICE_OPTIONS);
  const winners: RankCandidate[] = [];
  let existsMax = 0;
  let inputTokens = 0;
  let outputTokens = 0;
  let truncated = false;

  for (const group of groups) {
    const partial = await rankOne(input.query, group, Math.min(topK, group.length), input.model);
    truncated = truncated || partial.truncated;
    inputTokens += partial.usage.input_tokens;
    outputTokens += partial.usage.output_tokens;
    existsMax = Math.max(existsMax, partial.exists);
    const byId = new Map(group.map((candidate) => [candidate.id, candidate]));
    for (const hit of partial.top) {
      const candidate = byId.get(hit.id);
      if (candidate) {
        winners.push(candidate);
      }
    }
  }

  const finalists = uniquify(winners);
  const final = await rankOne(input.query, finalists, topK, input.model);
  return {
    ...final,
    exists: Math.max(existsMax, final.exists),
    exists_verdict: existsVerdict(Math.max(existsMax, final.exists)),
    usage: {
      input_tokens: inputTokens + final.usage.input_tokens,
      output_tokens: outputTokens + final.usage.output_tokens,
    },
    truncated: truncated || final.truncated,
    chunked: true,
    chunks: groups.length,
  };
}

async function rankOne(query: string, candidates: RankCandidate[], topK: number, model?: string) {
  const result = await systemOne({
    state: { query, candidates },
    questions: rankQuestions(query, candidates),
    model,
  });
  const best = asChoice(result.answers.best);
  const exists = asNoul(result.answers.exists).noul;
  const ranked: RankedHit[] = Object.entries(best.probabilities)
    .map(([id, probability]) => ({ id, probability }))
    .sort((a, b) => b.probability - a.probability);
  const top = ranked.slice(0, Math.min(topK, ranked.length));
  return {
    model: result.model,
    usage: result.usage,
    truncated: result.truncated,
    action: exists >= 0.4 ? ("auto" as const) : ("review" as const),
    exists,
    exists_verdict: existsVerdict(exists),
    winner: best.choice,
    winner_confidence: best.confidence,
    top,
    chunked: false,
  };
}

function uniquify(candidates: RankCandidate[]): RankCandidate[] {
  const seen = new Map<string, RankCandidate>();
  for (const candidate of candidates) {
    const id = sanitizeId(candidate.id, seen.size);
    if (!seen.has(id)) {
      seen.set(id, { id, text: candidate.text });
    }
  }
  return [...seen.values()];
}

function sanitizeId(id: string, index: number): string {
  const cleaned = id.replace(/[^\w.-]+/g, "_").slice(0, 80);
  return cleaned || `candidate_${index}`;
}
