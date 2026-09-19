import { z } from "zod";
import { JevBudgetError, JevValidationError } from "../errors.js";
import { MAX_CANDIDATE_CHARS, MAX_CHOICE_OPTIONS, MAX_RANK_CANDIDATES, TRUNCATION_MARKER, fitState, truncateText } from "../limits.js";
import { existsVerdict, rankQuestions, type RankCandidate } from "../packs/rank.js";
import { asChoice, asNoul } from "../result.js";
import { systemOne, withToolContext, type ToolContext } from "../typesafe.js";

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
    .max(MAX_RANK_CANDIDATES)
    .describe(`Candidates with unique IDs. Large lists are ranked in batches that fit the context budget; at most ${MAX_RANK_CANDIDATES} candidates are accepted per request.`),
  top_k: z.number().int().min(1).max(50).optional().describe("How many ranked candidates to return. Default 5."),
  model: z.string().optional(),
});

export type RankInput = z.infer<typeof rankInputSchema>;

type RankedHit = { id: string; probability: number };
type InternalCandidate = RankCandidate & { original_id: string };

export async function runRank(input: RankInput, context?: ToolContext) {
  if (input.candidates.length > MAX_RANK_CANDIDATES) {
    throw new JevBudgetError(`Rank accepts at most ${MAX_RANK_CANDIDATES} candidates per request. Split the list before ranking.`);
  }
  return withToolContext(context, async (context) => {
    const originalIds = new Map<string, string>();
    const seen = new Set<string>();
    let truncated = false;
    let originalChars = 0;
    let evaluatedChars = 0;
    let candidates = input.candidates.map((candidate, index) => {
      if (seen.has(candidate.id)) {
        throw new JevValidationError(`Duplicate rank candidate ID: ${candidate.id}. Give every candidate a unique ID.`);
      }
      seen.add(candidate.id);
      const id = `candidate_${index}`;
      originalIds.set(id, candidate.id);
      const text = truncateText(candidate.text, MAX_CANDIDATE_CHARS);
      originalChars += candidate.text.length;
      evaluatedChars += text === candidate.text ? text.length : Math.max(0, text.length - TRUNCATION_MARKER.length);
      truncated = truncated || text !== candidate.text;
      return { id, original_id: candidate.id, text };
    });
    const topK = Math.min(input.top_k ?? 5, candidates.length);
    let existsMax = 0;
    let inputTokens = 0;
    let outputTokens = 0;
    let firstRoundChunks = 0;

    while (true) {
      const groups = batchesThatFit(input.query, candidates);
      if (firstRoundChunks === 0) {
        firstRoundChunks = groups.length;
      }
      context.signal?.throwIfAborted();
      // Keep the requested number of finalists per batch. A round must shrink.
      if (groups.length > 1 && groups.reduce((sum, group) => sum + Math.min(topK, group.length), 0) >= candidates.length) {
        throw new JevBudgetError(
          `Cannot rank top_k=${topK} within the context budget without discarding potential results. Lower top_k or shorten the query, candidate IDs, or candidate texts.`,
        );
      }

      const winners: InternalCandidate[] = [];
      for (const group of groups) {
        if (group.length === 1 && groups.length > 1) {
          winners.push(group[0]!);
          continue;
        }
        const partial = await rankOne(input.query, group, topK, input.model, context);
        truncated = truncated || partial.truncated;
        inputTokens += partial.usage.input_tokens;
        outputTokens += partial.usage.output_tokens;
        existsMax = Math.max(existsMax, partial.exists);

        if (groups.length === 1) {
          return {
            ...partial,
            action: truncated ? ("review" as const) : partial.action,
            exists: existsMax,
            exists_verdict: existsVerdict(existsMax),
            winner: originalIds.get(partial.winner)!,
            top: partial.top.map((hit) => ({ ...hit, id: originalIds.get(hit.id)! })),
            usage: { input_tokens: inputTokens, output_tokens: outputTokens },
            truncated,
            coverage: {
              complete: !truncated,
              estimator: "chars/4" as const,
              estimated_tokens: partial.coverage.estimated_tokens,
              estimated_tokens_scope: "final_request" as const,
              candidate_fields: { complete: !truncated, candidates_considered: input.candidates.length, original_chars: originalChars, evaluated_chars: evaluatedChars },
            },
            chunked: firstRoundChunks > 1,
            ...(firstRoundChunks > 1 ? { chunks: firstRoundChunks } : {}),
          };
        }

        const byId = new Map(group.map((candidate) => [candidate.id, candidate]));
        for (const hit of partial.top) {
          winners.push(byId.get(hit.id)!);
        }
      }
      candidates = winners;
    }
  });
}

function batchesThatFit(query: string, candidates: InternalCandidate[]): InternalCandidate[][] {
  const batches: InternalCandidate[][] = [];
  for (let offset = 0; offset < candidates.length;) {
    // Serialized size grows monotonically. Binary search avoids repeatedly
    // serializing every growing prefix of each 250-candidate batch.
    let low = 0;
    let high = Math.min(MAX_CHOICE_OPTIONS, candidates.length - offset);
    while (low < high) {
      const middle = Math.ceil((low + high) / 2);
      if (fits(query, candidates.slice(offset, offset + middle))) low = middle;
      else high = middle - 1;
    }
    if (low === 0) {
      throw new JevBudgetError("The rank query and a candidate exceed the context budget. Shorten the query, candidate IDs, or candidate text.");
    }
    batches.push(candidates.slice(offset, offset + low));
    offset += low;
  }
  return batches;
}

function fits(query: string, candidates: InternalCandidate[]): boolean {
  try {
    return !fitState({ query, candidates }, rankQuestions(query, candidates)).truncated;
  } catch (error) {
    if (error instanceof JevValidationError) {
      return false;
    }
    throw error;
  }
}

async function rankOne(query: string, candidates: InternalCandidate[], topK: number, model: string | undefined, context: ToolContext) {
  const result = await systemOne({
    state: { query, candidates },
    questions: rankQuestions(query, candidates),
    model,
  }, context);
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
    coverage: result.coverage,
    action: exists >= 0.4 ? ("auto" as const) : ("review" as const),
    exists,
    exists_verdict: existsVerdict(exists),
    winner: best.choice,
    winner_confidence: best.confidence,
    top,
  };
}
