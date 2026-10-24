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

const CI_FILE_CAP = 200_000;

function readCapped(path: string | undefined): string | undefined {
  if (!path) return undefined;
  return readFileSync(path, "utf8").slice(0, CI_FILE_CAP);
}

/**
 * `jev-mcp ci --base REF --head REF [--pr-title-file F] [--pr-body-file F] [--tests-file F]
 *   [--format json|github] [--fail-on review|escalate] [--deterministic-only] [--require-jev]`.
 * Exit 0 auto, 10 review, 20 escalate, 2 error (fail closed). The title, body and log arrive as files so a
 * workflow never interpolates pull-request text into a shell command.
 */
export async function runCiCommand(argv: string[]): Promise<void> {
  try {
    const { parseArgs } = await import("node:util");
    const parsed = (() => {
      try {
        return parseArgs({ args: argv, options: {
      base: { type: "string" },
      head: { type: "string" },
      "pr-title-file": { type: "string" },
      "pr-body-file": { type: "string" },
      "tests-file": { type: "string" },
      format: { type: "string", default: "json" },
      "fail-on": { type: "string", default: "review" },
      "deterministic-only": { type: "boolean", default: false },
      "require-jev": { type: "boolean", default: false },
      callers: { type: "boolean", default: false },
        } });
      } catch (err) {
        throw new JevValidationError(err instanceof Error ? err.message : "Invalid options.");
      }
    })();
    const values = parsed.values;
    if (!values.base || !values.head) throw new JevValidationError("Usage: jev-mcp ci --base REF --head REF [--pr-title-file F] [--pr-body-file F] [--tests-file F] [--format json|github] [--fail-on review|escalate]");
    if (values.format !== "json" && values.format !== "github" && values.format !== "sarif") throw new JevValidationError("--format must be json, github or sarif.");
    if (values["fail-on"] !== "review" && values["fail-on"] !== "escalate") throw new JevValidationError("--fail-on must be review or escalate.");
    const ci = await import("./ci.js");
    const result = await ci.runCi({
      cwd: process.cwd(),
      base: values.base,
      head: values.head,
      title: readCapped(values["pr-title-file"])?.trim(),
      body: readCapped(values["pr-body-file"]),
      tests: readCapped(values["tests-file"]),
      failOn: values["fail-on"],
      deterministicOnly: values["deterministic-only"],
      requireJev: values["require-jev"],
      callers: values.callers ? true : undefined,
      deadline: Date.now() + (Number(process.env.JEV_MCP_CI_DEADLINE_MS) > 0 ? Number(process.env.JEV_MCP_CI_DEADLINE_MS) : 600_000),
    });
    let stdout: string;
    if (values.format === "github") {
      const markdown = ci.renderMarkdown(result);
      const summaryFile = process.env.GITHUB_STEP_SUMMARY;
      if (summaryFile) (await import("node:fs")).appendFileSync(summaryFile, `${markdown}\n`);
      stdout = `${ci.githubAnnotations(result).join("\n")}${result.action === "auto" ? "" : "\n"}jev: ${result.action} (${result.mode}) ${result.reasons.join(",")}\n${summaryFile ? "" : markdown}`;
    } else if (values.format === "sarif") {
      stdout = ci.renderSarif(result);
    } else {
      stdout = ci.renderJson(result);
    }
    exitAfterFlush(stdout, result.exit_code);
  } catch (err) {
    process.stderr.write(`${JSON.stringify({ error: errorDetails(err) })}\n`);
    process.exit(2);
  }
}

/** `jev-mcp calibrate [--dir DIR] [--since YYYY-MM] [--min-sample N] [--json]`: what the local ledger says; suggests, never applies. */
export async function runCalibrateCommand(argv: string[]): Promise<void> {
  try {
    const { parseArgs } = await import("node:util");
    let values;
    try {
      values = parseArgs({ args: argv, options: {
        dir: { type: "string" },
        since: { type: "string" },
        "min-sample": { type: "string" },
        json: { type: "boolean", default: false },
      } }).values;
    } catch (err) {
      throw new JevValidationError(err instanceof Error ? err.message : "Invalid options.");
    }
    if (values.since !== undefined && !/^\d{4}-\d{2}$/.test(values.since)) throw new JevValidationError("--since must look like 2026-10.");
    const minSample = values["min-sample"] === undefined ? undefined : Number(values["min-sample"]);
    if (minSample !== undefined && (!Number.isSafeInteger(minSample) || minSample < 1)) throw new JevValidationError("--min-sample must be a positive integer.");
    const { calibrate, renderCalibration } = await import("./calibrate.js");
    const report = calibrate({ dir: values.dir ?? getConfig().ledgerDir, since: values.since, minSample });
    process.stdout.write(values.json ? `${JSON.stringify(report, null, 2)}\n` : renderCalibration(report));
  } catch (err) {
    process.stderr.write(`${JSON.stringify({ error: errorDetails(err) })}\n`);
    process.exitCode = 2;
  }
}
