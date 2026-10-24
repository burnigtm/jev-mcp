import type { Questions } from "@typesafe-ai/sdk";
import { getConfig } from "../config.js";
import { parseUnifiedDiff } from "../diff.js";
import { fileIndex, planChunks, type ChunkPlan, type FloorReason } from "../diff-chunks.js";
import { JevBudgetError, JevContextExceededError } from "../errors.js";
import { estimateTokens, fitState, stateBudget, truncateToTokenBudget } from "../limits.js";
import { requireCompleteContext, reviewComposite, worstAction, type PolicyAction } from "../policy.js";
import { systemOne, type EvaluateResponse, type ToolContext } from "../typesafe.js";
import type { projectReview } from "./review.js";
import type { projectRisk } from "./risk.js";

/**
 * Review of a diff too large for one Jev request: split it along file boundaries, judge each part,
 * and merge the judgments so that the result is never more favorable than its worst part.
 */

/** Chunks in flight at once. */
export const CHUNK_CONCURRENCY = 3;
/** Files listed in each chunk's index of the whole change. */
const INDEX_FILES = 200;
/** Share of the state budget a test log may use in every chunk. */
const TESTS_SHARE = 0.25;
/** Slack for the estimator's rounding; a chunk is re-checked against the real limit afterwards. */
const BUDGET_MARGIN_TOKENS = 64;
/**
 * The estimate is chars/4, which under-counts dense code (digits and punctuation measured at about 1.4x),
 * so chunks use a fraction of the estimated budget. If the provider still rejects a chunk as too large the
 * review is re-planned at the next, smaller fraction.
 */
const CHUNK_SCALES = [0.62, 0.38, 0.23] as const;

/** The server allows the tool one default timeout per wave of chunks, plus the verification call. */
export function chunkedTimeoutFactor(): number {
  return 2 + Math.ceil(getConfig().maxReviewChunks / CHUNK_CONCURRENCY);
}

export type ChunkSummary = { files: string[]; action: PolicyAction; partial: boolean };

export type ChunkedPlan = {
  plan: ChunkPlan;
  states: Array<Record<string, unknown>>;
  testsTruncated: boolean;
  originalChars: number;
  evaluatedChars: number;
  /** The same change split finer, or undefined when it cannot be split any finer. */
  replan: () => ChunkedPlan | undefined;
};

export type PrepareArgs = {
  diff: string;
  tests: string;
  /** What a single request would send, to decide whether chunking is needed at all. */
  whole: { state: unknown; questions: Questions };
  /** Fields every chunk repeats, for example the request. */
  base: Record<string, unknown>;
  questions: Questions;
  /** Chunk even though the estimate says one request fits (the provider said otherwise). */
  force?: boolean;
};

/**
 * Plan a chunked review, or return undefined when the whole state fits one request or the diff has no
 * file structure to split on. Then the caller keeps the single-request path and its truncation rules.
 */
export function prepareChunks(args: PrepareArgs): ChunkedPlan | undefined {
  if (!args.force && !fitState(args.whole.state, args.whole.questions).truncated) return undefined;
  const parsed = parseUnifiedDiff(args.diff);
  if (!parsed) return undefined;

  const budget = stateBudget(args.questions);
  const testsCap = Math.floor(budget * TESTS_SHARE);
  const testsTruncated = estimateTokens(args.tests) > testsCap;
  const tests = testsTruncated ? truncateToTokenBudget(args.tests, testsCap) : args.tests;

  const config = getConfig();
  const index = fileIndex(parsed);
  const listed = index.slice(0, INDEX_FILES);
  const more = index.length - listed.length;
  const meta = (position: number, of: number, files: string[]) => ({
    chunk: position + 1,
    of,
    files_in_chunk: files,
    all_files: listed,
    ...(more > 0 ? { more_files: more } : {}),
  });
  // Both lists are bounded by the index, so counting it twice covers any chunk's metadata.
  const overhead = estimateTokens({ ...args.base, change: meta(0, 99, listed.map(entry => entry.path)), diff: "", tests });
  const room = budget - overhead - BUDGET_MARGIN_TOKENS;
  if (room < 200) {
    throw new JevBudgetError("The request, test output and file list leave no room for the diff in one chunk. Shorten the request or test output, or review fewer files at a time.");
  }

  const planAt = (scaleIndex: number): ChunkedPlan | undefined => {
    const scale = CHUNK_SCALES[scaleIndex];
    if (scale === undefined) return undefined;
    let diffBudget = Math.floor(room * scale);
    for (let attempt = 0; attempt < 4; attempt++) {
      const plan = planChunks(parsed, { budgetTokens: diffBudget, maxChunks: config.maxReviewChunks });
      const states = plan.chunks.map((chunk, position) => ({
        ...args.base,
        change: meta(position, plan.chunks.length, chunk.files),
        diff: chunk.diff,
        tests,
      }));
      if (states.every(state => !fitState(state, args.questions).truncated)) {
        const reviewed = plan.chunks.reduce((sum, chunk) => sum + chunk.diff.length, 0);
        const originalChars = args.diff.length - parsed.preamble.length + args.tests.length;
        return {
          plan,
          states,
          testsTruncated,
          originalChars,
          evaluatedChars: Math.min(originalChars, reviewed + tests.length),
          replan: () => planAt(scaleIndex + 1),
        };
      }
      diffBudget = Math.floor(diffBudget * 0.85);
    }
    throw new JevBudgetError("The diff could not be split into chunks that fit the context budget. Split the change into smaller reviews.");
  };
  return planAt(0);
}

/**
 * Run `single` when the whole state fits one request, else the chunked path. A request the provider
 * rejects as too large despite the estimate is retried chunked, when the diff has files to split on.
 */
export async function singleOrChunked<T>(
  args: PrepareArgs,
  single: () => Promise<T>,
  chunked: (planned: ChunkedPlan) => Promise<T>,
): Promise<T> {
  const planned = prepareChunks(args);
  if (planned) return chunked(planned);
  try {
    return await single();
  } catch (error) {
    if (!(error instanceof JevContextExceededError)) throw error;
    const forced = prepareChunks({ ...args, force: true });
    if (!forced) throw error;
    return chunked(forced);
  }
}

/** Run the work with at most `limit` in flight. After the first failure no new work starts; the call waits for work in flight, then rethrows. */
export async function mapPool<T, R>(items: T[], limit: number, work: (item: T, index: number) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  let failed = false;
  const worker = async () => {
    while (!failed) {
      const index = next++;
      if (index >= items.length) return;
      try {
        results[index] = await work(items[index]!, index);
      } catch (error) {
        failed = true;
        throw error;
      }
    }
  };
  const settled = await Promise.allSettled(Array.from({ length: Math.min(limit, items.length) }, worker));
  const failure = settled.find((outcome): outcome is PromiseRejectedResult => outcome.status === "rejected");
  if (failure) throw failure.reason;
  return results;
}

type Usage = { input_tokens: number; output_tokens: number };

/**
 * Judge every chunk. If the provider rejects a chunk as too large, the whole change is split finer and
 * run again; `usage` counts every call that completed, including those of an abandoned attempt.
 */
export async function runChunks(
  planned: ChunkedPlan,
  questions: Questions,
  model: string | undefined,
  context?: ToolContext,
): Promise<{ planned: ChunkedPlan; results: EvaluateResponse[]; usage: Usage }> {
  const usage: Usage = { input_tokens: 0, output_tokens: 0 };
  for (let current: ChunkedPlan | undefined = planned; current;) {
    try {
      const results = await mapPool(current.states, CHUNK_CONCURRENCY, async state => {
        const result = await systemOne({ state, questions, model }, context);
        usage.input_tokens += result.usage.input_tokens;
        usage.output_tokens += result.usage.output_tokens;
        return result;
      });
      return { planned: current, results, usage };
    } catch (error) {
      if (!(error instanceof JevContextExceededError)) throw error;
      current = current.replan();
      if (!current) throw error;
    }
  }
  throw new JevContextExceededError();
}

/** True when part of the change was not looked at, or only a test-log prefix was. */
export function chunkedIncomplete(planned: ChunkedPlan, results: EvaluateResponse[]): boolean {
  return planned.plan.omitted.length > 0
    || planned.testsTruncated
    || results.some(result => result.truncated || !result.coverage.complete);
}

export function chunkedCoverage(planned: ChunkedPlan, results: EvaluateResponse[]) {
  const incomplete = chunkedIncomplete(planned, results);
  const first = results[0]!;
  return {
    complete: !incomplete,
    original_chars: planned.originalChars,
    evaluated_chars: incomplete ? planned.evaluatedChars : planned.originalChars,
    estimated_tokens: {
      state: results.reduce((sum, result) => sum + result.coverage.estimated_tokens.state, 0),
      questions: first.coverage.estimated_tokens.questions,
      longest_question: first.coverage.estimated_tokens.longest_question,
    },
    estimator: "chars/4" as const,
  };
}

export function addUsage(a: Usage, b: Usage): Usage {
  return { input_tokens: a.input_tokens + b.input_tokens, output_tokens: a.output_tokens + b.output_tokens };
}

const REVIEW_FLOORS: ReadonlySet<FloorReason> = new Set([
  "unpaired_source_change", "export_signature_change", "lockfile_changed", "binary_file_changed", "partial_file_review", "diff_too_large",
]);
const RISK_FLOORS: ReadonlySet<FloorReason> = new Set(["lockfile_changed", "binary_file_changed", "partial_file_review", "diff_too_large"]);

export const reviewFloors = (floors: FloorReason[]) => floors.filter(floor => REVIEW_FLOORS.has(floor));
export const riskFloors = (floors: FloorReason[]) => floors.filter(floor => RISK_FLOORS.has(floor));

function unique<T>(values: T[]): T[] {
  return [...new Set(values)];
}

type ReviewPart = ReturnType<typeof projectReview>;
type RiskPart = ReturnType<typeof projectRisk>;

const min = (values: number[]) => Math.min(...values);
const max = (values: number[]) => Math.max(...values);

/**
 * Never more favorable than the worst chunk: correctness and spec match take their lowest score and
 * confidence, test gap and blast radius their highest score and lowest confidence. Auto needs every
 * chunk auto, no floor, a complete review, and a merged composite that still clears the bar.
 */
export function mergeReviews(parts: ReviewPart[], options: { floors: FloorReason[]; incomplete: boolean }): ReviewPart {
  const first = parts[0]!;
  const pick = (name: keyof ReviewPart["scores"], choose: (values: number[]) => number) => ({
    score: choose(parts.map(part => part.scores[name]!.score)),
    confidence: min(parts.map(part => part.scores[name]!.confidence)),
  });
  const scores = {
    correctness: pick("correctness", min),
    spec_match: pick("spec_match", min),
    test_gap: pick("test_gap", max),
    blast_radius: pick("blast_radius", max),
  };
  const composite = reviewComposite({
    correctness: scores.correctness.score,
    specMatch: scores.spec_match.score,
    testGap: scores.test_gap.score,
    blastRadius: scores.blast_radius.score,
  });
  let action = worstAction(parts.map(part => part.action));
  if (action === "auto" && (options.floors.length > 0 || composite < 0.7)) action = "review";
  action = requireCompleteContext(action, options.incomplete);

  let reasons: ReviewPart["reason_codes"];
  if (action === "auto") {
    reasons = ["accepted"];
  } else {
    reasons = unique(parts.flatMap(part => part.reason_codes).filter(code => code !== "accepted" && code !== "review_required"));
    if (composite < 0.7 && !reasons.includes("composite_low")) reasons.push("composite_low");
    if (options.incomplete && !reasons.includes("incomplete_context")) reasons.push("incomplete_context");
    for (const floor of options.floors) if (!reasons.includes(floor)) reasons.push(floor);
    reasons.push("chunked_review");
  }
  return {
    action,
    reason_codes: reasons,
    composite,
    safe_to_apply: min(parts.map(part => part.safe_to_apply)),
    scores,
    weights: first.weights,
    thresholds: first.thresholds,
  };
}

/** Flags take their highest probability and severity its highest score, so one bad chunk decides. */
export function mergeRisks(parts: RiskPart[], options: { floors: FloorReason[]; incomplete: boolean }): RiskPart {
  const first = parts[0]!;
  const flags = Object.fromEntries(Object.keys(first.flags).map(flag => [flag, max(parts.map(part => part.flags[flag] ?? 0))]));
  const worst = parts.reduce((best, part) => (part.severity.score > best.severity.score ? part : best), first);
  const severity = { ...worst.severity, confidence: min(parts.map(part => part.severity.confidence)) };
  let action = worstAction(parts.map(part => part.action));
  if (action === "auto" && options.floors.length > 0) action = "review";
  action = requireCompleteContext(action, options.incomplete);

  let reasons: RiskPart["reason_codes"];
  if (action === "auto") {
    reasons = ["accepted"];
  } else {
    reasons = unique(parts.flatMap(part => part.reason_codes).filter(code => code !== "accepted" && code !== "review_required"));
    if (options.incomplete && !reasons.includes("incomplete_context")) reasons.push("incomplete_context");
    for (const floor of options.floors) if (!reasons.includes(floor as never)) reasons.push(floor as never);
    reasons.push("chunked_review");
  }
  return { action, flags, severity, reason_codes: reasons, thresholds: first.thresholds };
}

export function chunkSummaries(planned: ChunkedPlan, actions: PolicyAction[]): ChunkSummary[] {
  return planned.plan.chunks.map((chunk, i) => ({ files: chunk.files, action: actions[i]!, partial: chunk.partial }));
}

export function omittedFiles(planned: ChunkedPlan): string[] | undefined {
  return planned.plan.omitted.length > 0 ? planned.plan.omitted.slice(0, 100) : undefined;
}
