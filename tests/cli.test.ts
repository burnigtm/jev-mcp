import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { getConfig } from "../src/config.ts";

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
    TYPESAFE_BASE_URL: "https://example.com/api/",
    JEV_MCP_ALLOW_CUSTOM_BASE_URL: "1",
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, "");
  const body = JSON.parse(result.stdout);
  assert.equal(body.ready, true);
  assert.equal(body.mock, true);
  assert.equal(body.api_key_set, true);
  assert.equal(body.base_url, "https://example.com");
  assert.equal(body.timeout_ms, 30_000);
  assert.ok(body.ping.input_tokens > 0);
  assert.doesNotMatch(result.stdout, /ts_do_not_print_this_key/);
});

test("doctor sanitizes a secret-bearing base URL path", () => {
  const result = cli(["doctor", "--json"], {
    TYPESAFE_API_KEY: secret,
    TYPESAFE_BASE_URL: "https://gateway.example.com/ts_do_not_print_this_key/v1",
    JEV_MCP_ALLOW_CUSTOM_BASE_URL: "1",
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
  const body = JSON.parse(result.stdout);
  assert.equal(body.base_url, "https://gateway.example.com");
  assert.doesNotMatch(`${result.stdout}${result.stderr}`, /ts_do_not_print_this_key/);
});

test("doctor rejects credential-bearing base URLs without printing them", () => {
  const result = cli(["doctor", "--json"], {
    TYPESAFE_API_KEY: secret,
    TYPESAFE_BASE_URL: "https://username:password@example.com/api?token=private#secret",
    JEV_MCP_ALLOW_CUSTOM_BASE_URL: "1",
  });
  assert.equal(result.status, 1);
  assert.equal(result.stderr, "");
  const body = JSON.parse(result.stdout);
  assert.equal(body.ready, false);
  assert.equal(body.error.code, "CONFIG_ERROR");
  assert.doesNotMatch(`${result.stdout}${result.stderr}`, /ts_do_not_print_this_key|username|password|token=private|#secret/);
});

test("base URL defaults to the TypeSafe API and rejects non-public hosts", () => {
  const names = ["TYPESAFE_BASE_URL", "JEV_MCP_ALLOW_CUSTOM_BASE_URL", "JEV_MCP_MOCK", "TYPESAFE_API_KEY"];
  const previous = new Map(names.map(name => [name, process.env[name]]));
  const restore = () => {
    for (const [name, value] of previous) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  };
  try {
    for (const name of names) delete process.env[name];
    assert.equal(getConfig().baseURL, "https://api.typesafe.ai");
    process.env.TYPESAFE_BASE_URL = "https://api.typesafe.ai/v1/";
    assert.equal(getConfig().baseURL, "https://api.typesafe.ai/v1");
    process.env.TYPESAFE_BASE_URL = "http://127.0.0.1:9/jev";
    assert.equal(getConfig().baseURL, "http://127.0.0.1:9/jev");
    process.env.TYPESAFE_BASE_URL = "http://[::1]:9/jev/";
    assert.equal(getConfig().baseURL, "http://[::1]:9/jev");
    process.env.TYPESAFE_BASE_URL = "https://example.com";
    assert.throws(() => getConfig(), /JEV_MCP_ALLOW_CUSTOM_BASE_URL/);
    process.env.JEV_MCP_ALLOW_CUSTOM_BASE_URL = "1";
    assert.equal(getConfig().baseURL, "https://example.com");
    process.env.TYPESAFE_BASE_URL = "https://[2606:4700:4700::1111]/v1/";
    assert.equal(getConfig().baseURL, "https://[2606:4700:4700::1111]/v1");
    process.env.TYPESAFE_BASE_URL = "https://[fd00::1]";
    assert.throws(() => getConfig(), /public host/);
    process.env.TYPESAFE_BASE_URL = "https://[::1]";
    assert.throws(() => getConfig(), /public host/);
    for (const blocked of [
      "http://169.254.169.254",
      "http://2130706433",
      "http://0x7f000001",
      "https://10.0.0.1",
      "https://192.168.1.1",
      "https://[fd00::1]",
      "https://[fe80::1]",
      "https://[::]",
      "http://127.0.0.1/path?x=1",
      "https://api.typesafe.ai:8443",
      "https://localhost",
      "https://localhost.",
      "https://127.0.0.1.",
      "https://foo.localhost",
      "https://metadata.google.internal",
      "https://255.255.255.255",
      "https://240.0.0.1",
      "https://[64:ff9b::7f00:1]",
      "https://[2002:7f00:1::]",
    ]) {
      process.env.TYPESAFE_BASE_URL = blocked;
      assert.throws(() => getConfig(), /TYPESAFE_BASE_URL/, blocked);
    }
  } finally {
    restore();
  }
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
  assert.ok(["auto", "review", "escalate"].includes(body.action));
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

test("eval preserves an explicitly empty state and accepts state starting with dashes", () => {
  const result = cli(["eval", "--state", "", "--questions", JSON.stringify({ q: { type: "noul", instructions: "Is this okay?" } })]);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).coverage.original_chars, 0);

  const diffState = "--- a/src/index.ts\n+++ b/src/index.ts\n@@ -1 +1 @@\n-old\n+new";
  const diffResult = cli(["eval", "--state", diffState, "--questions", JSON.stringify({ q: { type: "noul", instructions: "Is this a patch?" } })]);
  assert.equal(diffResult.status, 0, diffResult.stderr);
  const diffBody = JSON.parse(diffResult.stdout);
  assert.equal(diffBody.coverage.original_chars, diffState.length);
  assert.ok(["auto", "review", "escalate"].includes(diffBody.action));
});

test("eval rejects null JSON bodies as input errors", () => {
  const result = cli(["eval", "--json", "null"]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /JSON body must be an object/);
});
