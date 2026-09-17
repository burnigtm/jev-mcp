import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { errorMessage } from "./errors.js";
import { PACK_IDS, packBody, packUri } from "./packs/index.js";
import { jsonError, jsonResult } from "./result.js";
import { runCodingLoop, codingLoopInputSchema } from "./tools/coding-loop.js";
import { runEvaluate, evaluateInputSchema } from "./tools/evaluate.js";
import { runRank, rankInputSchema } from "./tools/rank.js";
import { runReview, reviewInputSchema } from "./tools/review.js";
import { runScreen, screenInputSchema } from "./tools/screen.js";
import { runVerify, verifyInputSchema } from "./tools/verify.js";
import { SERVER_NAME, VERSION } from "./version.js";

export function createJevServer(): McpServer {
  const server = new McpServer(
    { name: SERVER_NAME, version: VERSION },
    { capabilities: { tools: {}, resources: {} } },
  );

  server.registerTool(
    "jev_evaluate",
    {
      title: "Evaluate with Jev",
      description:
        "Escape hatch: send shared state plus named noul/choice/score questions to TypeSafe Jev. Use when no other jev_* recipe fits. Jev does not write code or prose. Questions in one call run in parallel. Returns typed answers, probabilities, confidence, usage, and action auto|review|escalate.",
      inputSchema: evaluateInputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async (args) => {
      try {
        return jsonResult(await runEvaluate(args));
      } catch (err) {
        return jsonError(errorMessage(err));
      }
    },
  );

  server.registerTool(
    "jev_coding_loop",
    {
      title: "Jev coding-loop router",
      description:
        "Call before spending a frontier turn on retry/stop/model-tier. One Jev fan-out returns next (continue|retry|ask_user|stop), model_tier (cheap|standard|reasoning), risk, focus, and noul flags done_enough / needs_more_context / tests_likely_fail. Policy in code maps confidence to action auto|review|escalate. Does not edit files.",
      inputSchema: codingLoopInputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async (args) => {
      try {
        return jsonResult(await runCodingLoop(args));
      } catch (err) {
        return jsonError(errorMessage(err));
      }
    },
  );

  server.registerTool(
    "jev_review",
    {
      title: "Jev patch review",
      description:
        "Score a proposed diff against the request: correctness, spec-match, test-gap, blast-radius, plus noul safe_to_apply. Composite weights live in code. Call before declaring a fix done. Does not apply the patch.",
      inputSchema: reviewInputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async (args) => {
      try {
        return jsonResult(await runReview(args));
      } catch (err) {
        return jsonError(errorMessage(err));
      }
    },
  );

  server.registerTool(
    "jev_verify",
    {
      title: "Jev claim verifier",
      description:
        "Check each claim against provided evidence (PR description, agent brief, docs, diffs). Returns per claim: verified|contradicted|unsupported, probabilities, confidence, and auto vs review. Prefer this over asking a chat model to 'double-check'.",
      inputSchema: verifyInputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async (args) => {
      try {
        return jsonResult(await runVerify(args));
      } catch (err) {
        return jsonError(errorMessage(err));
      }
    },
  );

  server.registerTool(
    "jev_screen",
    {
      title: "Jev content screen",
      description:
        "Judge fetched or pasted text before the agent reads it: prompt-injection probability, substance, and optional relevance to purpose. Recommendation: pass|review|block|skip. Use on untrusted web pages, issues, and pastes. Not for first-party repo files.",
      inputSchema: screenInputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async (args) => {
      try {
        return jsonResult(await runScreen(args));
      } catch (err) {
        return jsonError(errorMessage(err));
      }
    },
  );

  server.registerTool(
    "jev_rank",
    {
      title: "Jev candidate ranker",
      description:
        "Rank files, symbols, errors, or skills against a plain-language query. No embeddings. One Choice over candidate ids plus a Noul that the top hit actually answers the query (so a forced winner cannot masquerade as a match). Max 250 candidates per Jev call; larger lists are chunked then re-ranked. Pass candidates in; this server does not index the repo.",
      inputSchema: rankInputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async (args) => {
      try {
        return jsonResult(await runRank(args));
      } catch (err) {
        return jsonError(errorMessage(err));
      }
    },
  );

  for (const id of PACK_IDS) {
    server.registerResource(
      `pack-${id}`,
      packUri(id),
      {
        title: `Jev pack ${id}`,
        description: `Exact question JSON used by the ${id} recipe. Tune thresholds in code, not by rewriting Jev into a chat prompt.`,
        mimeType: "application/json",
      },
      async (uri) => ({
        contents: [
          {
            uri: uri.href,
            mimeType: "application/json",
            text: JSON.stringify(packBody(id), null, 2),
          },
        ],
      }),
    );
  }

  return server;
}

export async function runStdio(): Promise<void> {
  const server = createJevServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
