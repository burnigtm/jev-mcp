import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { PACK_IDS, packBody, packUri } from "./packs/index.js";
import { jsonError, jsonResult } from "./result.js";
import { runCodingLoop, codingLoopInputSchema } from "./tools/coding-loop.js";
import { runEvaluate, evaluateInputSchema } from "./tools/evaluate.js";
import { runGate, gateInputSchema, gateOutputSchema } from "./tools/gate.js";
import { runRank, rankInputSchema } from "./tools/rank.js";
import { runReview, reviewInputSchema } from "./tools/review.js";
import { runScreen, screenInputSchema } from "./tools/screen.js";
import { runVerify, verifyInputSchema } from "./tools/verify.js";
import { runStep, stepInputSchema, stepOutputSchema } from "./tools/step.js";
import { runToolRoute, toolRouteInputSchema, toolRouteOutputSchema } from "./tools/tool-route.js";
import {
  codingLoopOutputSchema,
  evaluateOutputSchema,
  rankOutputSchema,
  reviewOutputSchema,
  screenOutputSchema,
  verifyOutputSchema,
} from "./tools/output-schemas.js";
import { SERVER_NAME, VERSION } from "./version.js";
import { withToolContext } from "./typesafe.js";

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
      outputSchema: evaluateOutputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async (args, extra) => {
      try {
        const payload = await withToolContext({ signal: extra.signal }, context => runEvaluate(args, context));
        return { ...jsonResult(payload), structuredContent: payload };
      } catch (err) {
        return jsonError(err, false);
      }
    },
  );

  server.registerTool(
    "jev_coding_loop",
    {
      title: "Jev coding-loop router",
      description:
        "Call before retry/stop/model-tier decisions. One Jev fan-out returns next, risk, focus, and explicit handoff / partner_model fields. Prefer prepared tools or gathering context; request a partner generative model only when needed and confidently supported. Legacy model_tier is conditional, not an instruction to invoke a model. Does not edit files.",
      inputSchema: codingLoopInputSchema,
      outputSchema: codingLoopOutputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async (args, extra) => {
      try {
        const payload = await withToolContext({ signal: extra.signal }, context => runCodingLoop(args, context));
        return { ...jsonResult(payload), structuredContent: payload };
      } catch (err) {
        return jsonError(err, false);
      }
    },
  );

  server.registerTool(
    "jev_step",
    {
      title: "Jev fused step router",
      description: "One call instead of jev_coding_loop then jev_tool_route: route the coding step and select among up to 32 host-prepared calls in a single Jev request. Returns the exact call with handoff execute_tool, or handoff use_tools|gather_context|partner_model|ask_user|stop|review with call null. Same dispatch floors. Never generates arguments, executes calls, or invokes a model.",
      inputSchema: stepInputSchema,
      outputSchema: stepOutputSchema,
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async (args, extra) => {
      try {
        const payload = await runStep(args, { signal: extra.signal });
        return { ...jsonResult(payload), structuredContent: payload };
      } catch (err) {
        return jsonError(err, false);
      }
    },
  );

  server.registerTool(
    "jev_tool_route",
    {
      title: "Jev prepared tool-call router",
      description: "Choose among up to 32 exact host-prepared tool calls without generating arguments or invoking a partner model. Host supplies trusted authorization, schema validation, prerequisites, effect and retry counts. Only confident, suitable, complete, low-risk selections expose a call; otherwise call is null. Empty/ineligible lists return locally without Jev. This server never executes the selected call. Use jev_coding_loop if new generation may be necessary.",
      inputSchema: toolRouteInputSchema,
      outputSchema: toolRouteOutputSchema,
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async (args, extra) => {
      try {
        const payload = await runToolRoute(args, { signal: extra.signal });
        return { ...jsonResult(payload), structuredContent: payload };
      } catch (err) {
        return jsonError(err, false);
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
      outputSchema: reviewOutputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async (args, extra) => {
      try {
        const payload = await withToolContext({ signal: extra.signal }, context => runReview(args, context));
        return { ...jsonResult(payload), structuredContent: payload };
      } catch (err) {
        return jsonError(err, false);
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
      outputSchema: verifyOutputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async (args, extra) => {
      try {
        const payload = await withToolContext({ signal: extra.signal }, context => runVerify(args, context));
        return { ...jsonResult(payload), structuredContent: payload };
      } catch (err) {
        return jsonError(err, false);
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
      outputSchema: screenOutputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async (args, extra) => {
      try {
        const payload = await withToolContext({ signal: extra.signal }, context => runScreen(args, context));
        return { ...jsonResult(payload), structuredContent: payload };
      } catch (err) {
        return jsonError(err, false);
      }
    },
  );

  server.registerTool(
    "jev_rank",
    {
      title: "Jev candidate ranker",
      description:
        "Rank files, symbols, errors, or skills against a plain-language query. No embeddings. One Choice over candidate ids plus a Noul that the top hit actually answers the query (so a forced winner cannot masquerade as a match). Accepts up to 5,000 supplied candidates; each Jev call uses at most 250 options and larger lists are chunked then re-ranked. Pass candidates in; this server does not index the repo.",
      inputSchema: rankInputSchema,
      outputSchema: rankOutputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async (args, extra) => {
      try {
        const payload = await withToolContext({ signal: extra.signal }, context => runRank(args, context));
        return { ...jsonResult(payload), structuredContent: payload };
      } catch (err) {
        return jsonError(err, false);
      }
    },
  );

  server.registerTool(
    "jev_gate",
    {
      title: "Jev combined review gate",
      description: "Review a proposed patch and verify completion claims against supplied evidence in one Jev request. Returns review and verification reports, coverage, deterministic reason codes, and one overall auto|review|escalate action. Does not apply changes or execute tests.",
      inputSchema: gateInputSchema,
      outputSchema: gateOutputSchema,
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async (args, extra) => {
      try {
        const payload = await withToolContext({ signal: extra.signal }, context => runGate(args, context));
        return { ...jsonResult(payload), structuredContent: payload };
      } catch (err) {
        return jsonError(err, false);
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
