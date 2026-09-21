import { readFileSync } from "node:fs";
import { getConfig } from "./config.js";
import { errorDetails, JevConfigError, JevValidationError } from "./errors.js";
import { listModels, systemOne, withToolContext } from "./typesafe.js";
import { parseQuestions, type QuestionInput } from "./questions.js";
import { VERSION } from "./version.js";
import { validatePolicyThresholds } from "./policy.js";
import { evaluateInputSchema } from "./tools/evaluate.js";

export async function runDoctor(options: { json?: boolean } = {}): Promise<void> {
  const report: Record<string, unknown> = { version: VERSION, node: process.version, ready: false };
  try {
    const config = getConfig();
    Object.assign(report, {
      model: config.model,
      mock: config.mock,
      api_key_set: Boolean(config.apiKey),
      base_url: safeBaseUrl(config.baseURL),
      timeout_ms: config.timeoutMs,
      thresholds: { auto_accept: config.autoAccept, review_at: config.reviewAt, block_at: config.blockAt },
    });
    validatePolicyThresholds(config.autoAccept, config.reviewAt);
    if (!config.mock && !config.apiKey) {
      throw new JevConfigError("Not ready: set TYPESAFE_API_KEY or JEV_MCP_MOCK=1.");
    }
    await withToolContext(undefined, async context => {
      report.models = await listModels(context);
      const ping = await systemOne({
        state: "Doctor ping.",
        questions: {
          ok: { type: "noul", instructions: "Is this a short status string?" },
        },
      }, context);
      report.ping = { noul: ping.answers.ok.noul, input_tokens: ping.usage.input_tokens };
    });
    report.ready = true;
  } catch (err) {
    report.error = errorDetails(err);
    process.exitCode = 1;
  }
  if (options.json) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else {
    console.error(`jev-mcp ${VERSION}\nnode ${process.version}`);
    for (const [key, value] of Object.entries(report)) {
      if (key !== "version" && key !== "node" && key !== "ready") console.error(`${key} ${typeof value === "object" ? JSON.stringify(value) : String(value)}`);
    }
    console.error(report.ready ? "ready" : "not ready");
  }
}

function safeBaseUrl(baseURL: string): string {
  return baseURL;
}

export async function runEval(argv: string[]): Promise<void> {
  let parsed: EvalArgs;
  try {
    parsed = parseEvalArgs(argv);
  } catch (error) {
    if (error instanceof SyntaxError) throw new JevValidationError("Evaluation input must be valid JSON.");
    throw error;
  }
  if (!evaluateInputSchema.safeParse(parsed).success) throw new JevValidationError("Evaluation requires state (text or JSON object/array) and a valid questions map.");
  const questions = parseQuestions(parsed.questions);
  const result = await systemOne({
    state: parsed.state,
    questions,
    model: parsed.model,
  });
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

type EvalArgs = {
  state: unknown;
  questions: Record<string, QuestionInput>;
  model?: string;
};

function parseEvalArgs(argv: string[]): EvalArgs {
  const flags = new Map<string, string>();
  const valuedFlags = new Set(["json", "state", "questions", "model"]);
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i] ?? "";
    if (token === "--stdin") {
      if (flags.has("stdin")) throw new JevValidationError("Duplicate --stdin flag.");
      flags.set("stdin", "1");
      continue;
    }
    if (!token.startsWith("--")) {
      throw new JevValidationError(`Unexpected argument: ${token}`);
    }
    const separator = token.indexOf("=");
    const key = separator >= 0 ? token.slice(2, separator) : token.slice(2);
    if (!valuedFlags.has(key)) throw new JevValidationError(`Unknown eval option: --${key}`);
    if (flags.has(key)) throw new JevValidationError(`Duplicate --${key} flag.`);
    let value: string | undefined;
    if (separator >= 0) {
      value = token.slice(separator + 1);
    } else {
      value = argv[i + 1];
      if (value === undefined || value.startsWith("--")) {
        throw new JevValidationError(`Missing value for --${key}.`);
      }
      i += 1;
    }
    flags.set(key, value);
  }

  if (flags.has("json") || flags.has("stdin")) {
    if (flags.has("stdin") && flags.size !== 1) throw new JevValidationError("--stdin cannot be combined with other eval options.");
    if (flags.has("json") && (flags.has("state") || flags.has("questions") || flags.has("model"))) {
      throw new JevValidationError("--json cannot be combined with --state, --questions, or --model.");
    }
    const raw = flags.has("stdin") ? readFileSync(0, "utf8") : (flags.get("json") ?? "");
    const body = JSON.parse(raw) as unknown;
    if (!body || typeof body !== "object" || Array.isArray(body) || !("questions" in body)) {
      throw new JevValidationError("JSON body must be an object containing questions.");
    }
    return body as EvalArgs;
  }

  const state = flags.get("state");
  const questionsRaw = flags.get("questions");
  if (state === undefined || questionsRaw === undefined) {
    throw new JevValidationError(
      "Usage: jev-mcp eval --state TEXT --questions JSON  |  jev-mcp eval --json JSON  |  jev-mcp eval --stdin",
    );
  }
  return {
    state,
    questions: JSON.parse(questionsRaw) as Record<string, QuestionInput>,
    model: flags.get("model"),
  };
}
