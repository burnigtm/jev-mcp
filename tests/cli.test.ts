import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const secret = "ts_do_not_print_this_key";

function cli(args: string[], extraEnv: Record<string, string> = {}, input?: string) {
  const env = { ...process.env };
  for (const name of Object.keys(env)) {
    if (name.startsWith("JEV_MCP_") || name.startsWith("TYPESAFE_")) delete env[name];
  }
  return spawnSync(process.execPath, ["--import", "tsx", "src/index.ts", ...args], {
    cwd: root,
    encoding: "utf8",
    timeout: 60_000,
    env: { ...env, JEV_MCP_MOCK: "1", ...extraEnv },
    input,
  });
}

test("doctor --json reports readiness without exposing configured secrets", () => {
  const result = cli(["doctor", "--json"], {
    TYPESAFE_API_KEY: secret,
    TYPESAFE_BASE_URL: "https://username:password@example.com/api?token=private#secret",
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, "");
  const body = JSON.parse(result.stdout);
  assert.equal(body.ready, true);
  assert.equal(body.mock, true);
  assert.equal(body.api_key_set, true);
  assert.equal(body.base_url, "https://example.com/api");
  assert.equal(body.timeout_ms, 30_000);
  assert.ok(body.ping.input_tokens > 0);
  assert.doesNotMatch(result.stdout, /ts_do_not_print_this_key|username|password|token=private|#secret/);
});

test("doctor --json returns structured failure and nonzero status without credentials", () => {
  const result = cli(["doctor", "--json"], { JEV_MCP_MOCK: "0" });
  assert.ifError(result.error);
  assert.equal(result.status, 1);
  assert.equal(result.stderr, "");
  const body = JSON.parse(result.stdout);
  assert.equal(body.ready, false);
  assert.equal(body.api_key_set, false);
  assert.equal(body.error.code, "CONFIG_ERROR");
});

test("human-readable doctor keeps stdout clean", () => {
  const result = cli(["doctor"]);
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout, "");
  assert.match(result.stderr, /ready/);
});

test("eval accepts stdin JSON and prints only its JSON result", () => {
  const result = cli(["eval", "--stdin"], {}, JSON.stringify({
    state: "Urgent: a production test failed.",
    questions: { urgent: { type: "noul", instructions: "Is this urgent?" } },
  }));
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, "");
  const body = JSON.parse(result.stdout);
  assert.equal(body.answers.urgent.type, "noul");
  assert.match(body.model, /mock/);
});

test("eval rejects malformed JSON with no result on stdout", () => {
  const result = cli(["eval", "--stdin"], {}, "{invalid}");
  assert.ifError(result.error);
  assert.equal(result.status, 1);
  assert.equal(result.stdout, "");
  assert.ok(result.stderr.trim().length > 0);
});

test("unknown CLI command fails promptly", () => {
  const result = cli(["unknown-command"]);
  assert.ifError(result.error);
  assert.equal(result.status, 1);
  assert.equal(result.stdout, "");
  assert.match(result.stderr, /Unknown command/);
});

test("doctor fails closed on invalid threshold configuration", () => {
  const result = cli(["doctor", "--json"], { JEV_MCP_AUTO_ACCEPT: "not-a-number" });
  assert.equal(result.status, 1);
  const body = JSON.parse(result.stdout);
  assert.equal(body.ready, false);
  assert.equal(body.error.code, "CONFIG_ERROR");
});

test("eval preserves an explicitly empty state", () => {
  const result = cli(["eval", "--state", "", "--questions", JSON.stringify({ q: { type: "noul", instructions: "Is this okay?" } })]);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).coverage.original_chars, 0);
});

test("eval rejects null JSON bodies as input errors", () => {
  const result = cli(["eval", "--json", "null"]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /JSON body must be an object/);
});
