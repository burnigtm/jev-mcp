import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

test("Windows installer stops on each native failure and restores caller state", { skip: process.platform !== "win32" }, () => {
  const temporaryRoot = resolve(tmpdir());
  const directory = mkdtempSync(join(temporaryRoot, "jev-installer-test-"));
  const target = join(directory, "checkout");
  mkdirSync(join(target, ".git"), { recursive: true });
  const harness = join(directory, "harness.ps1");
  const script = fileURLToPath(new URL("../scripts/checkout-d-drive.ps1", import.meta.url));
  // Stub commands only inside the child shell; no clone, pull, or install occurs.
  writeFileSync(harness, String.raw`
param([string] $ScriptPath, [string] $Target)
$env:JEV_MCP_MOCK = 'previous-value'
$startLocation = (Get-Location).Path
$cases = @('git fetch origin', 'git checkout main', 'git pull --ff-only origin main', 'npm ci', 'npm run build', 'node dist/index.js doctor', 'none')
$results = @()
function global:Invoke-Fixture([string] $Command, [object[]] $CommandArgs) {
  $line = $Command + ' ' + ($CommandArgs -join ' ')
  $global:trace.Add($line)
  $global:LASTEXITCODE = if ($line -eq $global:failure) { 7 } else { 0 }
  if ($line -eq 'node -v') { 'v22.0.0' }
}
function global:git { Invoke-Fixture 'git' $args }
function global:npm { Invoke-Fixture 'npm' $args }
function global:node { Invoke-Fixture 'node' $args }
foreach ($case in $cases) {
  $global:failure = $case
  $global:trace = [System.Collections.Generic.List[string]]::new()
  $failed = $false
  $failureMessage = ''
  try { & $ScriptPath -RepoUrl 'fixture-only' -Target $Target -Mock | Out-Null } catch { $failed = $true; $failureMessage = $_.Exception.Message }
  $results += [pscustomobject]@{ case=$case; failed=$failed; error=$failureMessage; calls=@($global:trace); location=(Get-Location).Path; mock=$env:JEV_MCP_MOCK; original=$startLocation }
}
'RESULT_JSON:' + (ConvertTo-Json -InputObject @($results) -Compress -Depth 4)
`);
  try {
    const child = spawnSync("powershell.exe", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", harness, "-ScriptPath", script, "-Target", target], { encoding: "utf8", timeout: 180_000 });
    assert.ifError(child.error && new Error(`${child.error.message}\n${child.stdout}\n${child.stderr}`));
    assert.equal(child.status, 0, child.stderr);
    const json = child.stdout.split(/\r?\n/).find(line => line.startsWith("RESULT_JSON:"));
    assert.ok(json, child.stdout);
    const cases = JSON.parse(json.slice("RESULT_JSON:".length));
    for (const item of cases) {
      assert.equal(item.failed, item.case !== "none", item.case);
      if (item.failed) assert.equal(item.calls.at(-1), item.case, `no later command may run after failure: ${JSON.stringify(item)}`);
      assert.equal(item.location, item.original);
      assert.equal(item.mock, "previous-value");
    }
    assert.equal((child.stdout.match(/Checkout ready:/g) ?? []).length, 1);
  } finally {
    const path = resolve(directory);
    const child = relative(temporaryRoot, path);
    assert.ok(child && !isAbsolute(child) && child !== ".." && !child.startsWith(`..${sep}`));
    rmSync(path, { recursive: true, force: true });
  }
});
