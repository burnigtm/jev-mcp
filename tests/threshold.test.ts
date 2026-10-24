import assert from "node:assert/strict";
import { after, afterEach, before, mock, test } from "node:test";
import { clearCache } from "../src/cache.ts";
import { getConfig } from "../src/config.ts";
import { errorDetails } from "../src/errors.ts";
import { parseProfile, PROFILES } from "../src/profiles.ts";
import { resetStats } from "../src/stats.ts";
import { privilegeBoundary, runTriage } from "../src/tools/triage.ts";
import { runScope } from "../src/tools/scope.ts";
import { envScope, responds } from "./helpers/fixture.ts";

/** The auto-accept bar: the `fast` profile and the privilege-boundary floor that makes a lower bar safer. */

const restoreEnv = envScope(["JEV_MCP_MOCK", "TYPESAFE_API_KEY", "JEV_POLICY_FILE", "JEV_MCP_PROFILE", "JEV_MCP_AUTO_ACCEPT", "JEV_MCP_REVIEW_AT", "JEV_MCP_CACHE_TTL_MS", "JEV_MCP_TRIAGE_RECOVERABLE_AT"]);

before(() => {
  process.env.JEV_MCP_MOCK = "0";
  process.env.TYPESAFE_API_KEY = "fixture-key";
  process.env.JEV_POLICY_FILE = "none";
  for (const name of ["JEV_MCP_PROFILE", "JEV_MCP_AUTO_ACCEPT", "JEV_MCP_REVIEW_AT", "JEV_MCP_CACHE_TTL_MS", "JEV_MCP_TRIAGE_RECOVERABLE_AT"]) delete process.env[name];
});
afterEach(() => {
  mock.restoreAll();
  clearCache();
  resetStats();
  for (const name of ["JEV_MCP_PROFILE", "JEV_MCP_AUTO_ACCEPT", "JEV_MCP_REVIEW_AT", "JEV_MCP_TRIAGE_RECOVERABLE_AT"]) delete process.env[name];
});
after(restoreEnv);

// --- The 0.70 default and the conservative profile -----------------------------------------------------------------

test("balanced is the default at 0.70 and conservative restores 0.80; nothing else differs", () => {
  assert.equal(parseProfile(undefined), "balanced");
  assert.equal(parseProfile(" CONSERVATIVE "), "conservative");
  assert.deepEqual(PROFILES.conservative, { ...PROFILES.balanced, autoAccept: 0.8 });
  assert.ok(PROFILES.balanced.autoAccept > PROFILES.balanced.reviewAt);
  assert.deepEqual([getConfig().profile, getConfig().autoAccept], ["balanced", 0.7]);
  process.env.JEV_MCP_PROFILE = "conservative";
  assert.deepEqual([getConfig().profile, getConfig().autoAccept, getConfig().reviewAt, getConfig().blockAt], ["conservative", 0.8, 0.5, 0.75]);
  process.env.JEV_MCP_AUTO_ACCEPT = "0.75";
  assert.equal(getConfig().autoAccept, 0.75, "an explicit variable still overrides the profile");
});

test("an unknown profile names all three; the unreleased name `fast` is not accepted", () => {
  assert.throws(() => parseProfile("reckless"), /balanced.*conservative.*strict/);
  assert.throws(() => parseProfile("fast"), /balanced.*conservative.*strict/);
  process.env.JEV_MCP_PROFILE = "reckless";
  assert.throws(() => getConfig(), (error: unknown) => errorDetails(error).code === "CONFIG_ERROR");
});

test("the default approves what the conservative bar holds, and per-call arguments still tighten it", async () => {
  // A triage answer whose confidence sits between the two bars.
  responds(() => ({ cause: "cause_0", "cause.confidence": 0.75, progress: "first_attempt", "progress.confidence": 0.75, recoverable: 0.75, strategy: "gather_context", "strategy.confidence": 0.75 }));
  const input = { task: "Fix the failing test", failure: "AssertionError: expected 2 to equal 3" };
  assert.equal((await runTriage(input)).action, "auto", "0.75 clears the default 0.70");
  clearCache();
  process.env.JEV_MCP_PROFILE = "conservative";
  assert.notEqual((await runTriage(input)).action, "auto", "and not the earlier 0.80");
  clearCache();
  delete process.env.JEV_MCP_PROFILE;
  assert.notEqual((await runTriage({ ...input, auto_accept: 0.8 })).action, "auto", "a caller can still raise the bar");
});

test("lowering the bar never delays an escalation of a judged concern: it escalates at the bar, capped at 0.8", async () => {
  // needs_confirmation 0.75 sits between the two bars.
  responds(() => ({ in_scope: 0.95, effect_match: 0.95, needs_confirmation: 0.75, risk: 0 }));
  const input = { task: "Fix the pager", action: { name: "run_command", description: "Run the tests", effect: "local_write" as const, command: "npm test" } };
  const rank = { auto: 0, review: 1, escalate: 2 } as const;
  const balanced = await runScope(input);
  clearCache();
  process.env.JEV_MCP_PROFILE = "conservative";
  const conservative = await runScope(input);
  assert.equal(balanced.action, "escalate");
  assert.ok(rank[balanced.action] >= rank[conservative.action], `${balanced.action} must not be looser than ${conservative.action}`);
});

// --- The privilege boundary -------------------------------------------------------------------------------------

test("privilegeBoundary: a permission failure on a system path", () => {
  for (const failure of [
    "Error: EACCES: permission denied, open '/usr/local/lib/node_modules/.staging'",
    "Error: EACCES: permission denied, open '/etc/hosts'",
    "PermissionError: [Errno 13] Permission denied: '/var/lib/app/state.db'",
    "EPERM: operation not permitted, unlink 'C:\\Windows\\System32\\drivers\\etc\\hosts'",
    "Access is denied. (C:\\Program Files\\App\\app.dll)",
    "access is denied: c:\\windows\\temp\\x",
    "Permission denied (publickey) while reading /root/.ssh/id_rsa",
    "sudo: a password is required; permission denied writing /opt/tool/bin",
  ]) assert.equal(privilegeBoundary(failure), true, failure);
});

test("privilegeBoundary: ordinary failures and project-local permission problems are not held", () => {
  for (const failure of [
    "Error: EACCES: permission denied, open './build/output.js'",
    "EACCES: permission denied, mkdir 'node_modules/.cache'",
    "Error: ENOENT: no such file or directory, open '/etc/app.conf'",
    "AssertionError: expected '/etc/hosts' to equal '/tmp/hosts'",
    "TypeError: Cannot read properties of undefined (reading 'total')",
    "permission denied",
    "",
  ]) assert.equal(privilegeBoundary(failure), false, failure);
});

test("triage: a permission failure on a system path is held whatever the confidence", async () => {
  responds(() => ({ cause: "cause_0", "cause.confidence": 0.99, progress: "first_attempt", "progress.confidence": 0.99, recoverable: 0.99, strategy: "gather_context", "strategy.confidence": 0.99 }));
  const held = await runTriage({ task: "Install the tool", failure: "Error: EACCES: permission denied, open '/usr/local/lib/node_modules/.staging'" });
  assert.equal(held.action, "review");
  assert.ok(held.reason_codes.includes("privilege_boundary"));
  clearCache();
  const free = await runTriage({ task: "Install the tool", failure: "Error: EACCES: permission denied, open './build/out.js'" });
  assert.equal(free.action, "auto");
  assert.ok(!free.reason_codes.includes("privilege_boundary"));
  process.env.JEV_MCP_PROFILE = "conservative";
  clearCache();
  assert.equal((await runTriage({ task: "Install the tool", failure: "Error: EACCES: permission denied, open '/etc/hosts'" })).action, "review", "the floor holds under every profile");
});
