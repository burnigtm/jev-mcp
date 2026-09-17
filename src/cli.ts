import { readFileSync } from "node:fs";
import { getConfig } from "./config.js";
import { errorMessage } from "./errors.js";
import { listModels, systemOne } from "./typesafe.js";
import { parseQuestions, type QuestionInput } from "./questions.js";
import { VERSION } from "./version.js";

export async function runDoctor(): Promise<void> {
  const config = getConfig();
  const lines = [
    `jev-mcp ${VERSION}`,
    `node ${process.version}`,
    `model ${config.model}`,
    `mock ${config.mock ? "on" : "off"}`,
    `TYPESAFE_API_KEY ${config.apiKey ? "set" : "missing"}`,
    `TYPESAFE_BASE_URL ${config.baseURL ?? "(default)"}`,
    `auto_accept ${config.autoAccept}`,
    `review_at ${config.reviewAt}`,
    `block_at ${config.blockAt}`,
  ];
  console.error(lines.join("\n"));

  if (!config.mock && !config.apiKey) {
    console.error("Not ready: set TYPESAFE_API_KEY or JEV_MCP_MOCK=1.");
    process.exitCode = 1;
    return;
  }

  try {
    const models = await listModels();
    console.error(`models ${models.join(", ") || "(none)"}`);
    const ping = await systemOne({
      state: "Doctor ping.",
      questions: {
        ok: {
          type: "noul",
          instructions: "Is this a short status string?",
        },
      },
    });
    const ok = ping.answers.ok;
    const noul = ok && ok.type === "noul" ? ok.noul : NaN;
    console.error(`ping ok noul=${noul.toFixed(3)} tokens=${ping.usage.input_tokens}`);
    console.error("ready");
  } catch (err) {
    console.error(`live check failed: ${errorMessage(err)}`);
    process.exitCode = 1;
  }
}

export async function runEval(argv: string[]): Promise<void> {
  const parsed = parseEvalArgs(argv);
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
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i] ?? "";
    if (token === "--stdin") {
      flags.set("stdin", "1");
      continue;
    }
    if (token.startsWith("--")) {
      const key = token.slice(2);
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) {
        flags.set(key, "1");
      } else {
        flags.set(key, value);
        i += 1;
      }
    }
  }

  if (flags.has("json") || flags.has("stdin")) {
    const raw = flags.has("stdin") ? readFileSync(0, "utf8") : (flags.get("json") ?? "");
    const body = JSON.parse(raw) as EvalArgs;
    if (!body.questions) {
      throw new Error("JSON body must include questions");
    }
    return body;
  }

  const state = flags.get("state");
  const questionsRaw = flags.get("questions");
  if (!state || !questionsRaw) {
    throw new Error(
      "Usage: jev-mcp eval --state TEXT --questions JSON  |  jev-mcp eval --json JSON  |  jev-mcp eval --stdin",
    );
  }
  return {
    state,
    questions: JSON.parse(questionsRaw) as Record<string, QuestionInput>,
    model: flags.get("model"),
  };
}
