import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));

test("packed package installs offline and runs its shipped CLI", { timeout: 600_000 }, () => {
  const npmCli = process.env.npm_execpath;
  assert.ok(npmCli, "Run this smoke test with npm run test:package");
  const temporaryRoot = resolve(tmpdir());
  const directory = mkdtempSync(join(temporaryRoot, "jev-mcp-package-"));
  const npm = (args: string[], cwd = root) => {
    const result = spawnSync(process.execPath, [npmCli, ...args], {
      cwd,
      encoding: "utf8",
      timeout: 240_000,
      env: { ...process.env, npm_config_update_notifier: "false" },
    });
    assert.ifError(result.error && new Error(`${result.error.message}\n${result.stdout}\n${result.stderr}`));
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    return result.stdout;
  };
  try {
    const output = npm(["pack", "--json", "--pack-destination", directory]);
    const jsonStart = output.indexOf("[\n");
    assert.ok(jsonStart >= 0, output);
    const [packed] = JSON.parse(output.slice(jsonStart));
    const paths = new Set<string>(packed.files.map((file: { path: string }) => file.path));
    for (const path of [
      "dist/index.js", "docs/install.md", "docs/configuration.md", "docs/architecture.md",
      "docs/tools.md", "AGENTS.md", ".env.example", "scripts/checkout-d-drive.ps1",
      "skills/jev-mcp/SKILL.md", "examples/codex.config.toml", "examples/cursor.mcp.json",
    ]) assert.ok(paths.has(path), `Package must include ${path}`);

    const installation = join(directory, "installed");
    mkdirSync(installation);
    const sourceManifest = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
    const sourceLock = JSON.parse(readFileSync(join(root, "package-lock.json"), "utf8"));
    const dependencies = Object.fromEntries(Object.keys(sourceManifest.dependencies).map((name) => {
      const locked = sourceLock.packages[`node_modules/${name}`];
      assert.ok(locked?.version, `Missing locked production dependency: ${name}`);
      return [name, locked.version];
    }));
    const tarball = `file:../${packed.filename}`;
    const smokeManifest = {
      name: "jev-mcp-package-smoke",
      version: "0.0.0",
      private: true,
      dependencies: { ...dependencies, "jev-mcp": tarball },
    };
    // Reuse the committed dependency graph so an offline install never has to
    // re-resolve semver ranges against potentially stale cached metadata.
    const productionPackages = Object.fromEntries(Object.entries(sourceLock.packages)
      .filter(([path, entry]) => path !== "" && !(entry as { dev?: boolean }).dev));
    const smokeLock = {
      name: smokeManifest.name,
      version: smokeManifest.version,
      lockfileVersion: 3,
      requires: true,
      packages: {
        "": smokeManifest,
        ...productionPackages,
        "node_modules/jev-mcp": {
          version: packed.version,
          resolved: tarball,
          integrity: packed.integrity,
          dependencies: sourceManifest.dependencies,
          bin: sourceManifest.bin,
          engines: sourceManifest.engines,
          license: sourceManifest.license,
        },
      },
    };
    writeFileSync(join(installation, "package.json"), `${JSON.stringify(smokeManifest, null, 2)}\n`);
    writeFileSync(join(installation, "package-lock.json"), `${JSON.stringify(smokeLock, null, 2)}\n`);
    npm(["ci", "--prefix", installation, "--offline", "--ignore-scripts", "--no-audit", "--no-fund", "--omit=dev"], installation);
    const packageRoot = join(installation, "node_modules", "jev-mcp");
    const manifest = JSON.parse(readFileSync(join(packageRoot, "package.json"), "utf8"));
    const binary = resolve(packageRoot, manifest.bin["jev-mcp"]);
    assert.ok(existsSync(binary));
    const env = { ...process.env };
    for (const name of Object.keys(env)) {
      if (name.startsWith("JEV_MCP_") || name.startsWith("TYPESAFE_")) delete env[name];
    }
    const result = spawnSync(process.execPath, [binary, "doctor", "--json"], {
      cwd: installation,
      env: { ...env, JEV_MCP_MOCK: "1" },
      encoding: "utf8",
      timeout: 60_000,
    });
    assert.ifError(result.error);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stderr, "");
    const doctor = JSON.parse(result.stdout);
    assert.equal(doctor.ready, true);
    assert.equal(doctor.mock, true);
  } finally {
    const resolved = resolve(directory);
    const child = relative(temporaryRoot, resolved);
    assert.ok(child && !isAbsolute(child) && child !== ".." && !child.startsWith(`..${sep}`));
    assert.equal(dirname(resolved), temporaryRoot);
    rmSync(resolved, { recursive: true, force: true });
  }
});
