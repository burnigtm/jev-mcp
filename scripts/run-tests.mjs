import { readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const tests = readdirSync(new URL("../tests/", import.meta.url))
  .filter((name) => name.endsWith(".test.ts") && name !== "package.test.ts" && name !== "e2e.live.test.ts")
  .sort()
  .map((name) => `tests/${name}`);
const result = spawnSync(process.execPath, ["--import", "tsx", "--test", "--test-concurrency=1", ...tests], {
  cwd: root,
  // Tests must not pick up a .jev-policy.json from the checkout they run in; policy tests set their own.
  env: { ...process.env, JEV_POLICY_FILE: process.env.JEV_POLICY_FILE ?? "none" },
  stdio: "inherit",
});
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
