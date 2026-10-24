import { readFileSync } from "node:fs";
import { getConfig } from "./config.js";
import { findPolicyFile, loadRepoPolicy } from "./repo-policy.js";
import { errorDetails, JevConfigError, JevValidationError } from "./errors.js";
import { listModels, systemOne, withToolContext } from "./typesafe.js";
import { type QuestionInput } from "./questions.js";
import { VERSION } from "./version.js";
import { validatePolicyThresholds } from "./policy.js";
import { evaluateInputSchema, runEvaluate } from "./tools/evaluate.js";
import { feedbackInputSchema, runFeedback } from "./tools/feedback.js";

export async function runDoctor(options: { json?: boolean } = {}): Promise<void> {
  const report: Record<string, unknown> = { version: VERSION, node: process.version, ready: false };
  try {
    const config = getConfig();
    Object.assign(report, {
      model: config.model,
      profile: config.profile,
      policy_file: findPolicyFile(process.cwd()),
      mock: config.mock,
      api_key_set: Boolean(config.apiKey),
      base_url: safeBaseUrl(config.baseURL),
      timeout_ms: config.timeoutMs,
      thresholds: { auto_accept: config.autoAccept, review_at: config.reviewAt, block_at: config.blockAt, triage_recoverable_at: config.triageRecoverableAt ?? config.autoAccept },
    });
    validatePolicyThresholds(config.autoAccept, config.reviewAt);
    loadRepoPolicy(process.cwd()); // a broken policy file must fail the readiness check, not be discovered mid-session
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
  try {
    return new URL(baseURL).origin;
  } catch {
    return "<invalid>";
  }
}

export async function runEval(argv: string[]): Promise<void> {
  let parsed: EvalArgs;
  try {
    parsed = parseEvalArgs(argv);
  } catch (error) {
    if (error instanceof SyntaxError) throw new JevValidationError("Evaluation input must be valid JSON.");
    throw error;
  }
  const validated = evaluateInputSchema.safeParse(parsed);
  if (!validated.success) throw new JevValidationError("Evaluation requires state (text or JSON object/array) and a valid questions map.");
  const result = await runEvaluate(validated.data);
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
      if (value === undefined || value === "--stdin" || /^--(json|state|questions|model)(?:=|$)/.test(value)) {
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

/** `jev-mcp feedback <decision_id> <outcome> [--note TEXT]`: the command-line twin of the jev_feedback tool. */
export async function runFeedbackCommand(argv: string[]): Promise<void> {
  const positional: string[] = [];
  let note: string | undefined;
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i] ?? "";
    if (token === "--note" || token.startsWith("--note=")) {
      if (note !== undefined) throw new JevValidationError("Duplicate --note flag.");
      note = token === "--note" ? argv[i + 1] : token.slice("--note=".length);
      if (note === undefined || note.startsWith("--")) throw new JevValidationError("Missing value for --note.");
      if (token === "--note") i += 1;
    } else if (token.startsWith("--")) {
      throw new JevValidationError(`Unknown feedback option: ${token}`);
    } else {
      positional.push(token);
    }
  }
  if (positional.length !== 2) throw new JevValidationError("Usage: jev-mcp feedback <decision_id> <correct|false_alarm|missed> [--note TEXT]");
  const parsed = feedbackInputSchema.safeParse({ decision_id: positional[0], outcome: positional[1], ...(note === undefined ? {} : { note }) });
  if (!parsed.success) throw new JevValidationError("Feedback needs a decision_id returned by a Jev tool and an outcome of correct, false_alarm, or missed (note at most 500 characters).");
  const result = await runFeedback(parsed.data);
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  // A label that went nowhere is a failure the caller should see; a duplicate is not.
  if (!result.recorded && result.reason !== "duplicate") process.exitCode = 1;
}

// --- Guard: hooks and the generic check --------------------------------------------------------------

async function readStdin(): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) chunks.push(chunk as Buffer);
  return Buffer.concat(chunks).toString("utf8");
}

function exitAfterFlush(stdout: string, code: number): void {
  // Provider sockets must not keep a hook alive past its answer.
  process.stdout.write(stdout, () => process.exit(code));
}

/** `jev-mcp hook pre-tool-use|stop|install`. */
export async function runHookCommand(argv: string[]): Promise<void> {
  const [sub, ...rest] = argv;
  if (sub === "install") return runHookInstall(rest);
  if (sub !== "pre-tool-use" && sub !== "stop") throw new Error("Usage: jev-mcp hook <pre-tool-use|stop|install>");
  if (rest.includes("--shadow") && !process.env.JEV_MCP_HOOKS) process.env.JEV_MCP_HOOKS = "shadow";
  const { runHook } = await import("./hook.js");
  const run = await runHook(sub, await readStdin());
  if (run.stderr) process.stderr.write(run.stderr);
  exitAfterFlush(run.stdout, run.exitCode);
}

async function runHookInstall(argv: string[]): Promise<void> {
  const { parseArgs } = await import("node:util");
  const { values } = parseArgs({ args: argv, options: {
    stop: { type: "boolean", default: false },
    shadow: { type: "boolean", default: false },
    "block-on-failure": { type: "boolean", default: false },
    write: { type: "string" },
    entry: { type: "string" },
  } });
  const { buildSettings, mergeSettings, readSettingsFile } = await import("./hook-install.js");
  const settings = buildSettings({ stop: values.stop, shadow: values.shadow, blockOnFailure: values["block-on-failure"], entry: values.entry });
  if (!values.write) {
    process.stdout.write(`${JSON.stringify(settings, null, 2)}\n`);
    return;
  }
  const { writeFileSync } = await import("node:fs");
  const merged = mergeSettings(readSettingsFile(values.write), settings);
  writeFileSync(values.write, `${JSON.stringify(merged, null, 2)}
`);
  console.error(`Updated ${values.write}. Other settings and hooks were left as they were.`);
}

const CHECK_EXIT = { auto: 0, review: 10, escalate: 20 } as const;

/**
 * `jev-mcp check`: JSON on stdin, decision JSON on stdout. Exit 0 auto, 10 review, 20 escalate, 2 error.
 *   { "kind": "action", "task", "tool_name", "tool_input", "cwd" }
 *   { "kind": "changes", "request", "claims", "evidence", "tests", "base", "cwd" }
 */
export async function runCheckCommand(): Promise<void> {
  try {
    const input = JSON.parse((await readStdin()).replace(/^\uFEFF/, "")) as Record<string, unknown>;
    const cwd = typeof input.cwd === "string" && input.cwd ? input.cwd : process.cwd();
    const strings = (value: unknown) => Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.length > 0).slice(0, 20) : undefined;
    const { checkChanges, checkToolUse } = await import("./check.js");
    const deadline = Date.now() + 80_000;
    let result: { action: keyof typeof CHECK_EXIT };
    if (input.kind === "action") result = await checkToolUse({ ...input, cwd }, { deadline });
    else if (input.kind === "changes" && typeof input.request === "string") {
      result = await checkChanges({
        cwd,
        request: input.request,
        claims: strings(input.claims),
        evidence: typeof input.evidence === "string" ? input.evidence : undefined,
        tests: typeof input.tests === "string" ? input.tests : undefined,
        base: typeof input.base === "string" ? input.base : undefined,
        deadline,
      });
    } else throw new JevValidationError('check input needs "kind": "action" or "changes" (with a "request").');
    const { gate: _gate, ...summary } = result as Record<string, unknown>;
    exitAfterFlush(`${JSON.stringify(summary)}\n`, CHECK_EXIT[result.action]);
  } catch (err) {
    process.stderr.write(`${JSON.stringify({ error: errorDetails(err) })}\n`);
    process.exit(2);
  }
}
