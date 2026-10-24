import { join } from "node:path";
import { gateDiff } from "./check.js";
import { callerContextForDiff } from "./context.js";
import { fileFloors } from "./diff-chunks.js";
import { parseUnifiedDiff } from "./diff.js";
import { getConfig } from "./config.js";
import { JevConfigError, JevValidationError } from "./errors.js";
import { refChanges, showFile, type ChangedFile } from "./git.js";
import { worstAction, type PolicyAction } from "./policy.js";
import { VERSION } from "./version.js";
import { redactSecrets } from "./redact.js";
import { evaluatePolicy, parseRepoPolicy, POLICY_FILE_NAME, type RepoPolicy } from "./repo-policy.js";
import { containsInjectionInstruction } from "./untrusted.js";

/**
 * The pull-request gate. Everything about a pull request is attacker-controlled: its diff, title, body,
 * commit messages, branch and file names. So the policy is read from the base ref (a pull request cannot
 * loosen its own rules), no code from the pull request is executed, the text is passed as data, and the
 * result only ever says "hold" or "no objection". It is evidence for a human reviewer, never a merge approval.
 */

export const EXIT = { auto: 0, review: 10, escalate: 20, error: 2 } as const;

export type CiOptions = {
  cwd: string;
  base: string;
  head: string;
  title?: string;
  body?: string;
  /** CI log or test output supplied by the workflow; the only evidence for checked boxes. */
  tests?: string;
  /** Review (default) fails on review and escalate; escalate fails only on escalate. */
  failOn?: "review" | "escalate";
  /** Run only the checks that need no model (the mode for pull requests from forks, which get no secrets). */
  deterministicOnly?: boolean;
  /** Look up where changed symbols are used outside the diff. Off by default (`JEV_MCP_CALLER_CONTEXT=on` or `--callers` enables it): it names the callers a change affects, but on the benchmark it made Jev hold more correct fixes and caught nothing extra. */
  callers?: boolean;
  /** Treat a missing API key as an error instead of falling back to the deterministic checks. */
  requireJev?: boolean;
  deadline?: number;
};

export type PolicyFinding = { path: string; decision: "deny" | "review"; rule: string | null };

export type CiResult = {
  action: PolicyAction;
  mode: "jev" | "deterministic";
  reasons: string[];
  files: number;
  commits: boolean;
  policy: { source: "base" | "none"; findings: PolicyFinding[] };
  claims: string[];
  secrets_redacted: number;
  withheld: string[];
  /** Held parts of a large change (from the chunked review). */
  held: Array<{ files: string[]; action: PolicyAction }>;
  /** Caller lookup: symbols searched, uses shown to the judge, uses found, snippets withheld as instructions. */
  callers: { symbols: string[]; shown: number; total: number; withheld: number } | null;
  unsupported_claims: string[];
  fail_on: "review" | "escalate";
  exit_code: number;
  model_calls: number;
};

const MAX_FINDINGS = 50;
const MAX_CLAIMS = 5;

/** Checked boxes in a pull request description are the claims to verify. */
export function checklistClaims(body: string | undefined): string[] {
  if (!body) return [];
  const claims: string[] = [];
  for (const line of body.split(/\r?\n/)) {
    const match = /^\s*[-*]\s*\[[xX]\]\s*(.{4,300})$/.exec(line);
    if (match && !claims.includes(match[1]!.trim())) claims.push(match[1]!.trim());
    if (claims.length === MAX_CLAIMS) break;
  }
  return claims;
}

async function policyFromBase(cwd: string, base: string, root: string): Promise<{ policy: RepoPolicy | null; unreadable: boolean }> {
  const text = await showFile(cwd, base, POLICY_FILE_NAME);
  if (text === null) return { policy: null, unreadable: false };
  try {
    return { policy: parseRepoPolicy(text, join(root, POLICY_FILE_NAME)), unreadable: false };
  } catch {
    return { policy: null, unreadable: true };
  }
}

function policyFindings(policy: RepoPolicy, files: ChangedFile[]): PolicyFinding[] {
  const findings: PolicyFinding[] = [];
  for (const file of files) {
    for (const path of [file.path, ...(file.oldPath ? [file.oldPath] : [])]) {
      const verdict = evaluatePolicy(policy, { target: path });
      if (verdict.decision === "deny" || verdict.decision === "review") findings.push({ path, decision: verdict.decision, rule: verdict.rule });
      if (findings.length >= MAX_FINDINGS) return findings;
    }
  }
  return findings;
}

/** Opt-in: `JEV_MCP_CALLER_CONTEXT=on`. */
export function callerContextEnabled(): boolean {
  return ["on", "1", "true", "yes"].includes(process.env.JEV_MCP_CALLER_CONTEXT?.trim().toLowerCase() ?? "");
}

function haveCredentials(): boolean {
  const config = getConfig();
  return config.mock || Boolean(config.apiKey);
}

export async function runCi(options: CiOptions): Promise<CiResult> {
  const failOn = options.failOn ?? "review";
  const changes = await refChanges(options.cwd, options.base, options.head);
  if (!changes) throw new JevValidationError("Could not read the changes between the base and head refs. Check that both exist and that the checkout has enough history (fetch-depth: 0).");

  const reasons: string[] = [];
  const actions: PolicyAction[] = ["auto"];
  const floor = (action: PolicyAction, reason: string) => {
    actions.push(action);
    if (!reasons.includes(reason)) reasons.push(reason);
  };

  // The policy that governs a pull request is the one on its base; changing it is itself a reason to look.
  const { policy, unreadable } = await policyFromBase(options.cwd, options.base, changes.root);
  if (unreadable) floor("review", "policy_unreadable");
  const findings = policy ? policyFindings(policy, changes.files) : [];
  if (findings.some(finding => finding.decision === "deny")) floor("escalate", "policy_denied");
  if (findings.some(finding => finding.decision === "review")) floor("review", "policy_review");
  if (changes.files.some(file => file.path === POLICY_FILE_NAME || file.oldPath === POLICY_FILE_NAME)) floor("review", "policy_file_changed");

  if (changes.withheld.length) floor("review", "sensitive_file_changed");
  if (changes.truncated) floor("review", "diff_truncated");
  const text = [options.title ?? "", options.body ?? "", changes.commits].join("\n");
  if (containsInjectionInstruction(text)) floor("review", "injection_in_pr_text");
  if (redactSecrets(changes.diff).count > 0) floor("review", "secret_in_diff");

  const claims = checklistClaims(options.body);
  const useJev = !options.deterministicOnly && haveCredentials();
  if (!options.deterministicOnly && !useJev && options.requireJev) {
    throw new JevConfigError("No Jev credentials are available and --require-jev was given. Set TYPESAFE_API_KEY, or drop --require-jev to run the deterministic checks only.");
  }

  let held: CiResult["held"] = [];
  let unsupported: string[] = [];
  let secretsRedacted = redactSecrets(changes.diff).count;
  let modelCalls = 0;
  let usedClaims = claims;
  let callerReport: CiResult["callers"] = null;

  if (useJev && changes.diff.trim()) {
    const request = [options.title, options.body].filter(Boolean).join("\n\n").slice(0, 4_000) || "Review this pull request.";
    // Prose that talks to the reviewer is data, never instructions; the screen is one cheap call over all of it.
    const { runScreen } = await import("./tools/screen.js");
    const screened = await runScreen({ text: text.slice(0, 30_000), purpose: "A pull request description and commit messages to check against its diff" }, options.deadline === undefined ? undefined : { deadline: options.deadline });
    modelCalls += 1;
    if (screened.action === "escalate") floor("escalate", "pr_text_flagged");
    else if (screened.action === "review") floor("review", "pr_text_flagged");

    let repoContext: { callers: Array<{ path: string; line?: number; text: string; symbol?: string }>; total: number } | undefined;
    if (options.callers === true || (options.callers === undefined && callerContextEnabled())) {
      const found = await callerContextForDiff(options.cwd, changes.diff, { ref: options.head });
      callerReport = { symbols: found.symbols, shown: found.callers.length, total: found.total, withheld: found.withheld };
      if (found.withheld > 0) floor("review", "caller_context_injection");
      if (found.callers.length > 0) repoContext = { callers: found.callers, total: found.total };
    }
    const result = await gateDiff({
      diff: changes.diff,
      withheld: [],
      truncated: false,
      request,
      claims,
      evidence: options.tests || "No CI log was supplied for this check.",
      tests: options.tests,
      risk: true,
      deadline: options.deadline,
      repoContext,
    });
    modelCalls += result.model_calls;
    secretsRedacted = Math.max(secretsRedacted, result.secrets_redacted);
    usedClaims = result.claims;
    actions.push(result.action);
    for (const reason of result.reasons) if (!reasons.includes(reason)) reasons.push(reason);
    const gate = result.gate as {
      chunks?: Array<{ files: string[]; action: PolicyAction }>;
      verification?: { results?: Array<{ claim: string; verdict: string }> };
    } | null;
    held = (gate?.chunks ?? []).filter(chunk => chunk.action !== "auto").map(chunk => ({ files: chunk.files, action: chunk.action }));
    unsupported = (gate?.verification?.results ?? []).filter(item => item.verdict !== "verified").map(item => item.claim);
  } else {
    // Without a model the only structural signals available are the ones that need no judgment.
    const parsed = parseUnifiedDiff(changes.diff);
    if (parsed) {
      const structural = fileFloors(parsed.files);
      if (structural.includes("lockfile_changed")) floor("review", "lockfile_changed");
      if (structural.includes("binary_file_changed")) floor("review", "binary_file_changed");
    }
    reasons.push("jev_not_run");
  }

  const action = worstAction(actions);
  const exitCode = action === "escalate" ? EXIT.escalate : action === "review" && failOn === "review" ? EXIT.review : EXIT.auto;
  return {
    action,
    mode: useJev ? "jev" : "deterministic",
    reasons,
    files: changes.files.length,
    commits: changes.commits.length > 0,
    policy: { source: policy ? "base" : "none", findings },
    claims: usedClaims,
    secrets_redacted: secretsRedacted,
    withheld: changes.withheld,
    held,
    callers: callerReport,
    unsupported_claims: unsupported,
    fail_on: failOn,
    exit_code: exitCode,
    model_calls: modelCalls,
  };
}

// --- Output --------------------------------------------------------------------------------------------

/** GitHub workflow-command escaping for the message part. */
export function escapeCommandData(value: string): string {
  return value.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
}

/** ...and for a property such as `file=`. */
export function escapeCommandProperty(value: string): string {
  return escapeCommandData(value).replace(/:/g, "%3A").replace(/,/g, "%2C");
}

/** Text from a pull request, safe to place in markdown: no HTML, links, mentions, tables or code spans. */
export function markdownSafe(value: string, max = 200): string {
  return value
    .slice(0, max)
    .replace(/[\r\n\t]+/g, " ")
    .replace(/&/g, "&amp;")
    .replace(/[<>@|`[\]*_#!~]/g, character => `&#${character.charCodeAt(0)};`)
    .trim();
}

/** Reason codes come from fixed vocabularies; inside a code span only plain token characters are kept. */
function reasonToken(reason: string): string {
  return reason.replace(/[^A-Za-z0-9_:]/g, "").slice(0, 60);
}

function safePath(path: string): string | null {
  // A name containing a control character could break out of a workflow command; it is simply not annotated.
  return /[\u0000-\u001f\u007f]/.test(path) ? null : path;
}

const ANNOTATION_LIMIT = 10;

export function githubAnnotations(result: CiResult): string[] {
  const lines: string[] = [];
  const add = (level: "error" | "warning" | "notice", path: string | null, message: string) => {
    if (lines.length >= ANNOTATION_LIMIT) return;
    const file = path === null ? null : safePath(path);
    // A named file whose name is unsafe is skipped rather than reported without a location.
    if (path !== null && file === null) return;
    lines.push(`::${level}${file ? ` file=${escapeCommandProperty(file)}` : ""}::${escapeCommandData(message)}`);
  };
  for (const finding of result.policy.findings) {
    add(finding.decision === "deny" ? "error" : "warning", finding.path, `Protected by the repository policy${finding.rule ? ` (${finding.rule})` : ""}.`);
  }
  for (const part of result.held) {
    for (const file of part.files) add(part.action === "escalate" ? "error" : "warning", file, `Jev held this part of the change for review (${part.action}).`);
  }
  if (result.action !== "auto" && lines.length === 0) add(result.action === "escalate" ? "error" : "warning", null, `Jev ${result.action}: ${result.reasons.join(", ")}`);
  return lines;
}

export function renderMarkdown(result: CiResult): string {
  const verdict = result.action === "auto" ? "No objection" : result.action === "review" ? "Hold for review" : "Escalate";
  const lines = [
    `## Jev pull request check: ${verdict}`,
    "",
    `| | |`,
    `| --- | --- |`,
    `| Result | \`${result.action}\` (exit ${result.exit_code}, fail on \`${result.fail_on}\`) |`,
    `| Mode | ${result.mode === "jev" ? "Jev + deterministic checks" : "deterministic checks only (Jev did not run)"} |`,
    `| Files changed | ${result.files} |`,
    `| Reasons | ${result.reasons.length ? result.reasons.map(reason => `\`${reasonToken(reason)}\``).join(", ") : "none"} |`,
    "",
  ];
  if (result.mode === "deterministic") {
    lines.push("> Jev did not run: no credentials were available (for example a pull request from a fork), or the check was run with `--deterministic-only`. Only the policy, secret and structure checks above were applied; this is not a review of the change.", "");
  }
  if (result.policy.findings.length) {
    lines.push("### Repository policy", "", ...result.policy.findings.slice(0, 20).map(finding => `- \`${finding.decision}\` ${markdownSafe(finding.path)}${finding.rule ? ` (${markdownSafe(finding.rule, 80)})` : ""}`), "");
  }
  if (result.held.length) {
    lines.push("### Parts held", "", ...result.held.slice(0, 12).map(part => `- \`${part.action}\`: ${part.files.slice(0, 6).map(file => markdownSafe(file, 100)).join(", ")}${part.files.length > 6 ? ` and ${part.files.length - 6} more` : ""}`), "");
  }
  if (result.unsupported_claims.length) {
    lines.push("### Checked boxes the evidence does not support", "", ...result.unsupported_claims.map(claim => `- ${markdownSafe(claim, 200)}`), "");
  }
  if (result.secrets_redacted > 0) lines.push(`${result.secrets_redacted} secret-shaped string(s) were found and redacted before anything was sent to the provider.`, "");
  if (result.withheld.length) lines.push(`Sensitive files were named but never read: ${result.withheld.slice(0, 10).map(path => markdownSafe(path, 100)).join(", ")}.`, "");
  lines.push("_Jev's result is evidence for a reviewer, not a merge approval._", "");
  return lines.join("\n");
}

/** The machine-readable summary: no diff text, no pull-request prose. */
export function renderJson(result: CiResult): string {
  return `${JSON.stringify(result)}\n`;
}

// --- SARIF -----------------------------------------------------------------------------------------------

const SARIF_RESULT_LIMIT = 100;

type SarifResult = {
  ruleId: string;
  level: "error" | "warning" | "note";
  message: { text: string };
  locations?: Array<{ physicalLocation: { artifactLocation: { uri: string }; region: { startLine: number } } }>;
};

function sarifUri(path: string): string | null {
  if (safePath(path) === null || path.startsWith("/") || path.split("/").includes("..")) return null;
  return path.split("/").map(encodeURIComponent).join("/");
}

/**
 * SARIF 2.1.0 for GitHub code scanning (`github/codeql-action/upload-sarif`, which needs `security-events: write`).
 * Locations are file-level; messages come from fixed text, never from the pull request's prose or the diff.
 */
export function renderSarif(result: CiResult): string {
  const results: SarifResult[] = [];
  const add = (ruleId: string, level: SarifResult["level"], text: string, path?: string) => {
    if (results.length >= SARIF_RESULT_LIMIT) return;
    const uri = path === undefined ? null : sarifUri(path);
    if (path !== undefined && uri === null) return;
    results.push({ ruleId, level, message: { text }, ...(uri ? { locations: [{ physicalLocation: { artifactLocation: { uri }, region: { startLine: 1 } } }] } : {}) });
  };
  for (const finding of result.policy.findings) {
    add(finding.decision === "deny" ? "policy_denied" : "policy_review", finding.decision === "deny" ? "error" : "warning", `Protected by the repository policy${finding.rule ? ` (${reasonToken(finding.rule)})` : ""}.`, finding.path);
  }
  for (const part of result.held) {
    for (const file of part.files) add("jev_held_part", part.action === "escalate" ? "error" : "warning", `Jev held this part of the change for review (${part.action}).`, file);
  }
  for (const file of result.withheld) add("sensitive_file_changed", "warning", "A sensitive file changed; its content was not read.", file);
  if (result.action !== "auto") {
    add("jev_result", result.action === "escalate" ? "error" : "warning", `Jev ${result.action}: ${result.reasons.map(reasonToken).join(", ")}`);
  }
  const ruleIds = [...new Set(results.map(item => item.ruleId))];
  return `${JSON.stringify({
    $schema: "https://json.schemastore.org/sarif-2.1.0.json",
    version: "2.1.0",
    runs: [{
      tool: { driver: { name: "jev-mcp", version: VERSION, informationUri: "https://github.com/burnigtm/jev-mcp", rules: ruleIds.map(id => ({ id, shortDescription: { text: id.replace(/_/g, " ") } })) } },
      results,
    }],
  })}\n`;
}
