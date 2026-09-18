import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer, type IncomingMessage, type Server } from "node:http";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const script = fileURLToPath(new URL("../scripts/notify-jev-mcp-event.py", import.meta.url));
const fixtureKey = "crsr_" + "a".repeat(64);

function runNotify(env: Record<string, string>, extra: { timeoutMs?: number } = {}) {
  return new Promise<{ status: number | null; stdout: string; stderr: string }>((resolve, reject) => {
    const child = spawn("python3", [script], {
      cwd: root,
      env: { ...process.env, ...env },
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", chunk => {
      stdout += String(chunk);
    });
    child.stderr.on("data", chunk => {
      stderr += String(chunk);
    });
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error(`notify script timed out\n${stdout}\n${stderr}`));
    }, extra.timeoutMs ?? 10_000);
    child.on("error", error => {
      clearTimeout(timer);
      reject(error);
    });
    child.on("close", status => {
      clearTimeout(timer);
      resolve({ status, stdout, stderr });
    });
  });
}

async function withServer(
  handler: (req: IncomingMessage, body: string) => { status: number; body?: string },
  fn: (base: string, requests: Array<{ auth: string | undefined; body: string }>) => Promise<void>,
) {
  const requests: Array<{ auth: string | undefined; body: string }> = [];
  const server: Server = createServer((req, res) => {
    const chunks: Buffer[] = [];
    req.on("data", chunk => chunks.push(chunk as Buffer));
    req.on("end", () => {
      const body = Buffer.concat(chunks).toString("utf8");
      requests.push({ auth: req.headers.authorization, body });
      const reply = handler(req, body);
      res.writeHead(reply.status, { "Content-Type": "application/json" });
      res.end(reply.body ?? "{}");
    });
  });
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address === "object");
  try {
    await fn(`http://127.0.0.1:${address.port}`, requests);
  } finally {
    await new Promise<void>(resolve => server.close(() => resolve()));
  }
}

test("notify script skips when CURSOR_API_KEY is empty", async () => {
  const result = await runNotify({
    CURSOR_API_KEY: "",
    DEFAULT_AGENT_ID: "bc-test",
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /secret is not set/);
});

test("notify script rejects a masked dashboard table value before HTTP", async () => {
  const result = await runNotify({
    CURSOR_API_KEY: "crsr_…c413",
    DEFAULT_AGENT_ID: "bc-test",
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /masked or truncated/);
  assert.doesNotMatch(`${result.stdout}${result.stderr}`, /crsr_…c413/);
});

test("notify script sends Basic auth on the first POST and strips quotes/whitespace", async () => {
  await withServer(
    () => ({ status: 201, body: JSON.stringify({ run: { id: "run-1" } }) }),
    async (base, requests) => {
      const result = await runNotify({
        CURSOR_API_KEY: `  "${fixtureKey}" \n`,
        DEFAULT_AGENT_ID: "bc-test-agent",
        CURSOR_API_BASE: base,
      });
      assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
      assert.equal(requests.length, 1);
      const expected = Buffer.from(`${fixtureKey}:`, "utf8").toString("base64");
      assert.equal(requests[0]?.auth, `Basic ${expected}`);
      assert.match(requests[0]?.body ?? "", /GitHub webhook/);
      assert.match(result.stdout, /HTTP 201/);
      assert.doesNotMatch(`${result.stdout}${result.stderr}`, new RegExp(fixtureKey));
    },
  );
});

test("notify script explains HTTP 401 without printing the key", async () => {
  await withServer(
    () => ({ status: 401, body: JSON.stringify({ code: "error", message: "Invalid User API Key" }) }),
    async (base, requests) => {
      const result = await runNotify({
        CURSOR_API_KEY: fixtureKey,
        DEFAULT_AGENT_ID: "bc-test-agent",
        CURSOR_API_BASE: base,
      });
      assert.equal(result.status, 1);
      assert.equal(requests.length, 1);
      assert.match(result.stdout, /Invalid User API Key/);
      assert.match(result.stderr, /cursor\.com\/dashboard\/api/);
      assert.doesNotMatch(`${result.stdout}${result.stderr}`, new RegExp(fixtureKey));
    },
  );
});
