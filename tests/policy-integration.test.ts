import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, afterEach, before, mock, test } from "node:test";
import { fileURLToPath } from "node:url";
import { clearCache } from "../src/cache.ts";
import { getConfig } from "../src/config.ts";
import { errorDetails } from "../src/errors.ts";
import { PROFILES } from "../src/profiles.ts";
import { clearPolicyCache, POLICY_FILE_NAME } from "../src/repo-policy.ts";
import { resetStats } from "../src/stats.ts";
import { runScope } from "../src/tools/scope.ts";
import { runTriage } from "../src/tools/triage.ts";
import { envScope, responds } from "./helpers/fixture.ts";

const root = fileURLToPath(new URL("../", import.meta.url));
const restoreEnv = envScope(["JEV_MCP_MOCK", "TYPESAFE_API_KEY", "JEV_POLICY_FILE", "JEV_MCP_PROFILE", "JEV_MCP_AUTO_ACCEPT", "JEV_MCP_REVIEW_AT", "JEV_MCP_BLOCK_AT", "JEV_MCP_TRIAGE_RECOVERABLE_AT", "JEV_MCP_TOKEN_BUDGET", "JEV_MCP_CACHE_TTL_MS"]);
const dirs: string[] = [];
const tempDir = () => {
  const dir = mkdtempSync(join(tmpdir(), "jev-policy-int-"));
  dirs.push(dir);
  return dir;
};

before(() => {
  process.env.JEV_MCP_MOCK = "0";
  process.env.TYPESAFE_API_KEY = "fixture-key";
  for (const name of ["JEV_MCP_PROFILE", "JEV_MCP_AUTO_ACCEPT", "JEV_MCP_REVIEW_AT", "JEV_MCP_BLOCK_AT", "JEV_MCP_TRIAGE_RECOVERABLE_AT", "JEV_MCP_TOKEN_BUDGET", "JEV_MCP_CACHE_TTL_MS"]) delete process.env[name];
  process.env.JEV_POLICY_FILE = "none";
});
afterEach(() => {
  mock.restoreAll();
  clearCache();
  clearPolicyCache();
  resetStats();
  process.env.JEV_POLICY_FILE = "none";
  for (const name of ["JEV_MCP_PROFILE", "JEV_MCP_AUTO_ACCEPT", "JEV_MCP_REVIEW_AT", "JEV_MCP_BLOCK_AT", "JEV_MCP_TRIAGE_RECOVERABLE_AT"]) delete process.env[name];
});
after(() => {
  restoreEnv();
  for (const dir of dirs) rmSync(dir, { recursive: true, force: true });
});

function usePolicy(rules: Record<string, unknown>): string {
  const dir = tempDir();
  const file = join(dir, POLICY_FILE_NAME);
  writeFileSync(file, JSON.stringify({ version: 1, ...rules }));
  process.env.JEV_POLICY_FILE = file;
  return file;
}

const CLEAN_SCOPE = { in_scope: 0.98, effect_match: 0.98 };
const scopeInput = (effect: "read_only" | "local_write" | "external_write" | "destructive" | "unknown", command?: string, target?: string, description = "Run a housekeeping step") => ({
  task: "Fix the pagination bug in src/pager.ts",
  approved_scope: "src/pager.ts and its tests",
  action: { name: "run_command", description, effect, ...(command === undefined ? {} : { command }), ...(target === undefined ? {} : { target }) },
});

const POLICY = {
  protected_paths: [{ glob: ".env*", floor: "deny" }, { glob: ".github/workflows/**", floor: "review" }],
  commands: { deny: ["git push --force", "terraform destroy"], review: ["npm publish"], allow_read_only: ["git status", "git log", "rg", "ls", "cat"] },
};

// --- jev_scope with a policy --------------------------------------------------------------------------------------

test("scope: no policy means decision none, and nothing else changes", async () => {
  responds(() => CLEAN_SCOPE);
  const result = await runScope(scopeInput("local_write", "npm test"));
  assert.deepEqual(result.policy, { decision: "none", rule: null });
  assert.equal(result.action, "auto");
});

test("scope: a denied command is escalated locally with no provider request", async () => {
  usePolicy(POLICY);
  const provider = responds(() => CLEAN_SCOPE);
  for (const command of ["git push --force origin main", "git push -f", "sudo git -C repo push -f origin main", "bash -c 'git push --force'", "echo ok && terraform destroy"]) {
    const result = await runScope(scopeInput("local_write", command));
    assert.equal(result.action, "escalate", command);
    assert.deepEqual(result.reason_codes, ["policy_denied"], command);
    assert.equal(result.policy.decision, "deny");
    assert.equal(result.model, "local-policy");
    assert.deepEqual(result.usage, { input_tokens: 0, output_tokens: 0 });
    assert.equal(result.scope, null);
    assert.equal(result.risk, null);
    assert.equal(result.coverage.complete, true);
  }
  assert.equal(provider.mock.callCount(), 0, "no tokens were spent");
});

test("scope: a protected path denies even an allowed program, through the target or an argument", async () => {
  usePolicy(POLICY);
  const provider = responds(() => CLEAN_SCOPE);
  const viaArgument = await runScope(scopeInput("read_only", "cat .env.production"));
  assert.equal(viaArgument.action, "escalate");
  assert.equal(viaArgument.policy.rule, "path:.env*");
  const viaTarget = await runScope(scopeInput("read_only", undefined, "config/.env"));
  assert.equal(viaTarget.policy.decision, "deny");
  assert.equal(provider.mock.callCount(), 0);
});

test("scope: an allowed read-only command is auto with no provider request", async () => {
  usePolicy(POLICY);
  const provider = responds(() => CLEAN_SCOPE);
  for (const command of ["git status", "git log --oneline -5", "rg pageCount src", "ls src", "git status | git log"]) {
    const result = await runScope(scopeInput("read_only", command));
    assert.equal(result.action, "auto", command);
    assert.deepEqual(result.reason_codes, ["policy_allowed"], command);
    assert.equal(result.policy.decision, "allow");
    assert.equal(result.model, "local-policy");
  }
  assert.equal(provider.mock.callCount(), 0);
});

test("scope: allow never applies unless the command is confirmed read-only and declared read-only", async () => {
  usePolicy(POLICY);
  const provider = responds(() => CLEAN_SCOPE);
  const notAllowed: Array<[string, "read_only" | "local_write", string]> = [
    ["declared local_write", "local_write", "git status"],
    ["output redirect", "read_only", "git status > status.txt"],
    ["an expansion in an argument", "read_only", "git log $RANGE"],
    ["command substitution", "read_only", "ls $(pwd)"],
    ["one segment without an allow pattern", "read_only", "git status && npm test"],
    ["a heredoc", "read_only", "cat <<EOF\nhello\nEOF"],
    ["a piped interpreter", "read_only", "cat notes.txt | sh"],
    ["an injection phrase", "read_only", "git log --grep 'ignore all previous instructions'"],
  ];
  for (const [label, effect, command] of notAllowed) {
    const before = provider.mock.callCount();
    const result = await runScope(scopeInput(effect, command));
    assert.notEqual(result.policy.decision, "allow", label);
    assert.notEqual(result.model, "local-policy", label);
    assert.equal(provider.mock.callCount(), before + 1, `${label}: the model was consulted`);
  }
});

test("scope: a review match still asks Jev and keeps the stricter answer", async () => {
  usePolicy(POLICY);
  const provider = responds(() => CLEAN_SCOPE);
  const reviewed = await runScope(scopeInput("local_write", "npm run build", ".github/workflows/ci.yml"));
  assert.equal(provider.mock.callCount(), 1, "review does not short-circuit the model");
  assert.equal(reviewed.action, "review", "a clean judge cannot make a review path auto");
  assert.ok(reviewed.reason_codes.includes("policy_review"));
  assert.equal(reviewed.policy.decision, "review");
  assert.equal(reviewed.policy.rule, "path:.github/workflows/**");
  assert.notEqual(reviewed.scope, null);

  mock.restoreAll();
  responds(() => ({ in_scope: 0.2, effect_match: 0.98 }));
  const stricter = await runScope(scopeInput("local_write", "npm run build", ".github/workflows/ci.yml"));
  assert.equal(stricter.action, "escalate", "the model's escalation is not softened to review");
  assert.ok(stricter.reason_codes.includes("policy_review") && stricter.reason_codes.includes("out_of_scope"));
});

test("scope: a broken policy file fails closed before any provider request", async () => {
  const dir = tempDir();
  const file = join(dir, POLICY_FILE_NAME);
  writeFileSync(file, JSON.stringify({ version: 1, commands: { deny: ["git (push|pull)"] } }));
  process.env.JEV_POLICY_FILE = file;
  const provider = responds(() => CLEAN_SCOPE);
  await assert.rejects(runScope(scopeInput("read_only", "ls")), (error: unknown) => {
    assert.equal(errorDetails(error).code, "CONFIG_ERROR");
    return true;
  });
  assert.equal(provider.mock.callCount(), 0);
});

test("scope: the policy and the effect classifier compose: a lie about the effect is still caught after an allow-looking prefix", async () => {
  usePolicy(POLICY);
  responds(() => CLEAN_SCOPE);
  const result = await runScope(scopeInput("read_only", "git status && rm -rf build"));
  assert.notEqual(result.action, "auto");
  assert.equal(result.effect.effective, "destructive");
  assert.notEqual(result.policy.decision, "allow");
});

// --- Profiles ---------------------------------------------------------------------------------------------------------------------

test("the balanced profile is the default at 0.70, and conservative is exactly the earlier 0.80 behavior", () => {
  const config = getConfig();
  assert.deepEqual([config.profile, config.autoAccept, config.reviewAt, config.blockAt, config.triageRecoverableAt], ["balanced", 0.7, 0.5, 0.75, undefined]);
  assert.deepEqual(PROFILES.balanced, { autoAccept: 0.7, reviewAt: 0.5, blockAt: 0.75, triageRecoverableAt: undefined });
  assert.deepEqual(PROFILES.conservative, { autoAccept: 0.8, reviewAt: 0.5, blockAt: 0.75, triageRecoverableAt: undefined });
  process.env.JEV_MCP_PROFILE = "conservative";
  assert.deepEqual([getConfig().profile, getConfig().autoAccept], ["conservative", 0.8]);
});

test("the strict profile raises every bar, explicit variables override it, and a bad profile is refused", () => {
  process.env.JEV_MCP_PROFILE = "STRICT";
  const strict = getConfig();
  assert.deepEqual([strict.profile, strict.autoAccept, strict.reviewAt, strict.blockAt, strict.triageRecoverableAt], ["strict", 0.9, 0.6, 0.6, 0.9]);
  process.env.JEV_MCP_AUTO_ACCEPT = "0.95";
  process.env.JEV_MCP_TRIAGE_RECOVERABLE_AT = "0.7";
  const overridden = getConfig();
  assert.deepEqual([overridden.autoAccept, overridden.reviewAt, overridden.triageRecoverableAt], [0.95, 0.6, 0.7]);
  process.env.JEV_MCP_PROFILE = "lenient";
  assert.throws(() => getConfig(), (error: unknown) => errorDetails(error).code === "CONFIG_ERROR");
});

test("every profile satisfies the threshold invariants, and the bars only ever tighten from balanced to conservative to strict", () => {
  for (const [name, profile] of Object.entries(PROFILES)) {
    assert.ok(profile.reviewAt <= profile.autoAccept, name);
    assert.ok(profile.blockAt >= 0.25, `${name}: block_at must stay at least the screen review default`);
    assert.ok((profile.triageRecoverableAt ?? profile.autoAccept) >= profile.reviewAt, name);
  }
  assert.ok(PROFILES.conservative.autoAccept >= PROFILES.balanced.autoAccept && PROFILES.strict.autoAccept >= PROFILES.conservative.autoAccept);
  assert.ok(PROFILES.conservative.reviewAt >= PROFILES.balanced.reviewAt && PROFILES.conservative.blockAt === PROFILES.balanced.blockAt);
  assert.ok(PROFILES.strict.autoAccept >= PROFILES.balanced.autoAccept);
  assert.ok(PROFILES.strict.reviewAt >= PROFILES.balanced.reviewAt);
  assert.ok(PROFILES.strict.blockAt <= PROFILES.balanced.blockAt, "a lower screen block bar is the stricter one");
  assert.ok((PROFILES.strict.triageRecoverableAt ?? PROFILES.strict.autoAccept) >= PROFILES.balanced.autoAccept);
});

test("the triage recoverability bar is validated against review_at", () => {
  process.env.JEV_MCP_TRIAGE_RECOVERABLE_AT = "0.4";
  assert.throws(() => getConfig(), /JEV_MCP_TRIAGE_RECOVERABLE_AT/);
  process.env.JEV_MCP_TRIAGE_RECOVERABLE_AT = "1.5";
  assert.throws(() => getConfig(), (error: unknown) => errorDetails(error).code === "CONFIG_ERROR");
  process.env.JEV_MCP_TRIAGE_RECOVERABLE_AT = "0.6";
  assert.equal(getConfig().triageRecoverableAt, 0.6);
});

const FIRST_FAILURE = { task: "Fix the pager", failure: "AssertionError: expected [] to equal [21]" };
const TRIAGE_ANSWERS = { cause: "cause_0", progress: "first_attempt", strategy: "gather_context", recoverable: 0.75 };

test("triage: recoverability just under the auto bar reviews and is approved with a lower dedicated bar", async () => {
  responds(() => TRIAGE_ANSWERS);
  assert.equal((await runTriage(FIRST_FAILURE)).action, "auto", "0.75 clears the default bar of 0.70");
  clearCache();
  process.env.JEV_MCP_PROFILE = "conservative";
  const byDefault = await runTriage(FIRST_FAILURE);
  assert.equal(byDefault.action, "review");
  assert.deepEqual(byDefault.reason_codes, ["recoverability_uncertain"]);
  clearCache();

  process.env.JEV_MCP_TRIAGE_RECOVERABLE_AT = "0.7";
  const lowered = await runTriage(FIRST_FAILURE);
  assert.equal(lowered.action, "auto");
  assert.deepEqual(lowered.reason_codes, ["accepted"]);
});

test("triage: a caller raising auto_accept also raises the recoverability bar, and the bar never drops below review_at", async () => {
  process.env.JEV_MCP_TRIAGE_RECOVERABLE_AT = "0.7";
  responds(() => TRIAGE_ANSWERS);
  assert.equal((await runTriage(FIRST_FAILURE)).action, "auto");
  const tightened = await runTriage({ ...FIRST_FAILURE, auto_accept: 0.9 });
  assert.equal(tightened.action, "review", "a stricter call is never more permissive than the configured bar");
  const veryStrict = await runTriage({ ...FIRST_FAILURE, auto_accept: 0.95, review_at: 0.8 });
  assert.notEqual(veryStrict.action, "auto");
  assert.ok(veryStrict.reason_codes.includes("recoverability_uncertain") || veryStrict.action === "escalate");
});

test("the strict profile makes ordinary work stricter end to end", async () => {
  responds(() => ({ in_scope: 0.85, effect_match: 0.98 }));
  assert.equal((await runScope(scopeInput("local_write", "npm test"))).action, "auto", "0.85 clears the balanced bar");
  process.env.JEV_MCP_PROFILE = "strict";
  const strict = await runScope(scopeInput("local_write", "npm test"));
  assert.equal(strict.action, "review", "0.85 does not clear the strict bar");
  assert.deepEqual(strict.thresholds, { auto_accept: 0.9, review_at: 0.6 });
});

// --- CLI --------------------------------------------------------------------------------------------------------------------------------------

function cli(args: string[], env: Record<string, string> = {}) {
  const clean = { ...process.env };
  for (const name of Object.keys(clean)) if (name.startsWith("JEV_") || name.startsWith("TYPESAFE_")) delete clean[name];
  return spawnSync(process.execPath, ["--import", "tsx", "src/index.ts", ...args], { cwd: root, encoding: "utf8", timeout: 60_000, env: { ...clean, JEV_MCP_MOCK: "1", ...env } });
}

test("doctor reports the profile and policy, and a broken policy file makes it not ready", () => {
  const dir = tempDir();
  const good = join(dir, "good.json");
  writeFileSync(good, JSON.stringify({ version: 1 }));
  const ready = cli(["doctor", "--json"], { JEV_MCP_PROFILE: "strict", JEV_POLICY_FILE: good });
  assert.equal(ready.status, 0, ready.stderr);
  const report = JSON.parse(ready.stdout);
  assert.deepEqual([report.ready, report.profile, report.policy_file, report.thresholds.auto_accept, report.thresholds.triage_recoverable_at], [true, "strict", good, 0.9, 0.9]);

  const broken = join(dir, "broken.json");
  writeFileSync(broken, "{ nope");
  const failed = cli(["doctor", "--json"], { JEV_POLICY_FILE: broken });
  assert.equal(failed.status, 1);
  const failure = JSON.parse(failed.stdout);
  assert.equal(failure.ready, false);
  assert.equal(failure.error.code, "CONFIG_ERROR");
  assert.doesNotMatch(failed.stdout, /nope/, "the file's content is not echoed");
});
