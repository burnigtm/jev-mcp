import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, utimesSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, afterEach, test } from "node:test";
import { errorDetails } from "../src/errors.ts";
import { clearPolicyCache, compileGlob, evaluatePolicy, findPolicyFile, loadRepoPolicy, normalizeRepoPath, parseCommandPattern, parseRepoPolicy, POLICY_FILE_NAME, segmentMatches, type RepoPolicy } from "../src/repo-policy.ts";
import { commandSegments } from "../src/effects.ts";
import { seeded } from "./helpers/fixture.ts";

const dirs: string[] = [];
const tempDir = () => {
  const dir = mkdtempSync(join(tmpdir(), "jev-policy-test-"));
  dirs.push(dir);
  return dir;
};
afterEach(() => clearPolicyCache());
after(() => {
  for (const dir of dirs) rmSync(dir, { recursive: true, force: true });
});

const policy = (rules: Record<string, unknown>, file = join(tmpdir(), POLICY_FILE_NAME)): RepoPolicy => parseRepoPolicy(JSON.stringify({ version: 1, ...rules }), file);

// --- Globs ---------------------------------------------------------------------------------------------------

const GLOBS: Array<[string, string, boolean]> = [
  [".env*", ".env", true], [".env*", ".env.local", true], [".env*", "config/.env.production", true], [".env*", "env", false], [".env*", "src/environment.ts", false],
  ["*.pem", "key.pem", true], ["*.pem", "a/b/key.pem", true], ["*.pem", "key.pem.bak", false],
  [".github/workflows/**", ".github/workflows/ci.yml", true], [".github/workflows/**", ".github/workflows", true], [".github/workflows/**", ".github/workflows/a/b.yml", true],
  [".github/workflows/**", ".github/other/ci.yml", false], [".github/workflows/**", "x/.github/workflows/ci.yml", false],
  ["src/auth", "src/auth/login.ts", true], ["src/auth", "src/auth", true], ["src/auth", "src/authz/x.ts", false], ["src/auth", "lib/src/auth/x.ts", false],
  ["**/secrets/*.json", "a/b/secrets/k.json", true], ["**/secrets/*.json", "secrets/k.json", true], ["**/secrets/*.json", "secrets/sub/k.json", false],
  ["package-lock.json", "package-lock.json", true], ["package-lock.json", "web/package-lock.json", true], ["package-lock.json", "package-lock.json5", false],
  ["src/?.ts", "src/a.ts", true], ["src/?.ts", "src/ab.ts", false], ["src/?.ts", "src/a/b.ts", false],
  ["SRC/AUTH", "src/auth/x.ts", true], ["src/auth", "SRC/Auth/X.ts", true],
  ["build/", "build/out.js", true], ["build/", "build", true],
  ["src/**/test/*.ts", "src/a/b/test/x.ts", true], ["src/**/test/*.ts", "src/test/x.ts", true], ["src/**/test/*.ts", "src/test/x/y.ts", false],
  ["a*b", "a-anything-b", true], ["a*b", "ab", true], ["a*b", "a/b", false], ["**", "anything/at/all", true], ["docs/**", "docs", true],
];

for (const [glob, path, expected] of GLOBS) {
  test(`glob ${JSON.stringify(glob)} ${expected ? "matches" : "does not match"} ${JSON.stringify(path)}`, () => {
    assert.equal(compileGlob(glob).test(path), expected);
  });
}

test("invalid globs are refused", () => {
  for (const bad of ["", "/etc/passwd", "C:\\x", "C:/x", "../x", "a/../b", "a\\b", "{a,b}", "[abc]", "a;b", "a\u0000b", "x".repeat(0)]) {
    assert.throws(() => compileGlob(bad), (error: unknown) => errorDetails(error).code === "CONFIG_ERROR", JSON.stringify(bad));
  }
});

test("glob matching is linear: pathological patterns on long paths finish immediately", () => {
  const patterns = ["a*a*a*a*a*a*a*a*b", "**/**/**/**/**/**/**/x", "*a*a*a*a*a*a*a*a*a*a*b*", "a**a**a**a**a**a**b", "?*?*?*?*?*?*?*?*z"];
  const paths = ["a".repeat(1_000), `${"a/".repeat(500)}c`, "ab".repeat(500), `${"a".repeat(400)}/${"b".repeat(400)}`];
  const started = performance.now();
  for (const pattern of patterns) {
    const glob = compileGlob(pattern);
    for (const path of paths) glob.test(path);
  }
  assert.ok(performance.now() - started < 1_500, `took ${Math.round(performance.now() - started)} ms`);
});

test("paths are normalized to the repository and refused when they leave it", () => {
  const root = "C:/work/repo";
  assert.equal(normalizeRepoPath("src\\auth\\login.ts"), "src/auth/login.ts");
  assert.equal(normalizeRepoPath("./src//auth/"), "src/auth");
  assert.equal(normalizeRepoPath("src/../src/auth/x.ts"), "src/auth/x.ts");
  assert.equal(normalizeRepoPath("C:\\work\\repo\\src\\x.ts", root), "src/x.ts");
  assert.equal(normalizeRepoPath("c:/WORK/repo/src/x.ts", root), "src/x.ts", "case-insensitive on the root");
  assert.equal(normalizeRepoPath("C:/elsewhere/x.ts", root), null);
  assert.equal(normalizeRepoPath("C:/work/repo-other/x.ts", root), null, "a sibling that shares a prefix is outside");
  assert.equal(normalizeRepoPath("/etc/passwd", root), null);
  assert.equal(normalizeRepoPath("../outside", root), null);
  assert.equal(normalizeRepoPath("a/../../outside"), null);
  assert.equal(normalizeRepoPath(""), null);
  assert.equal(normalizeRepoPath("."), null);
  assert.equal(normalizeRepoPath("x".repeat(5_000)), null);
});

// --- Policy file schema -------------------------------------------------------------------------------------------------

test("a valid policy parses; unknown keys, wrong versions, and bad rules are refused with a clear error", () => {
  const ok = policy({ protected_paths: [{ glob: ".env*", floor: "deny" }], commands: { deny: ["git push --force"], review: ["npm publish"], allow_read_only: ["git status"] }, require_gate_on_stop: true });
  assert.equal(ok.requireGateOnStop, true);
  assert.equal(ok.protectedPaths.length, 1);
  assert.deepEqual([ok.commands.deny.length, ok.commands.review.length, ok.commands.allowReadOnly.length], [1, 1, 1]);
  const bad: Array<[string, string]> = [
    ["{", "not valid JSON"],
    [JSON.stringify({ version: 2 }), "version"],
    [JSON.stringify({ version: 1, unknown: true }), "unknown"],
    [JSON.stringify({ version: 1, test_command: "rm -rf /" }), "test_command"],
    [JSON.stringify({ version: 1, protected_paths: [{ glob: "x", floor: "allow" }] }), "floor"],
    [JSON.stringify({ version: 1, protected_paths: [{ glob: "/abs", floor: "deny" }] }), "glob"],
    [JSON.stringify({ version: 1, commands: { deny: ["x".repeat(201)] } }), "commands.deny"],
    [JSON.stringify({ version: 1, commands: { deny: ["--force"] } }), "program name"],
    [JSON.stringify({ version: 1, commands: { deny: ["git (push|pull)"] } }), "command pattern"],
    [JSON.stringify({ version: 1, commands: { allow: ["git status"] } }), "allow"],
    [JSON.stringify({ version: 1, commands: { deny: Array.from({ length: 201 }, () => "git push") } }), "commands.deny"],
  ];
  for (const [text, fragment] of bad) {
    assert.throws(() => parseRepoPolicy(text, "C:/repo/.jev-policy.json"), (error: unknown) => {
      assert.equal(errorDetails(error).code, "CONFIG_ERROR");
      assert.match((error as Error).message, new RegExp(fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
      return true;
    }, fragment);
  }
});

// --- Command patterns ------------------------------------------------------------------------------------------------------

const matches = (pattern: string, command: string) => commandSegments(command).some((segment) => segmentMatches(parseCommandPattern(pattern), segment));

const PATTERNS: Array<[string, string, boolean]> = [
  ["git push --force", "git push --force", true], ["git push --force", "git push -f origin main", true], ["git push --force", "git -C repo -c core.pager=cat push -f", true],
  ["git push --force", "sudo git push origin HEAD:main --force", true], ["git push --force", "bash -c 'git push -f'", true], ["git push --force", "echo ok && git push --force", true],
  ["git push --force", "git push origin main", false], ["git push --force", "git pull --force", false], ["git push --force", "git status", false],
  ["git push", "git push origin main", true], ["git push", "git pull", false], ["git", "git status", true],
  ["rm --recursive", "rm -rf build", true], ["rm --recursive", "rm -R build", true], ["rm --recursive", "rm --recursive build", true], ["rm --recursive", "rm build", false],
  ["rm -rf", "rm -fr build", true], ["rm -rf", "rm -r build", false],
  ["npm publish", "npm publish --access public", true], ["npm publish", "NPM PUBLISH", true], ["npm publish", "npm run publish", false],
  ["docker * prune", "docker system prune -af", true], ["docker * prune", "docker prune", false], ["docker * prune", "docker image prune", true],
  ["kubectl apply", "kubectl apply -f x.yaml", true], ["kubectl apply", "kubectl get pods", false],
  ["curl --request", "curl --request=POST https://x.example", true], ["rg", "rg foo src", true], ["rg", "rgrep foo", false],
  ["remove-item -recurse", "Remove-Item -Recurse build", true], ["remove-item -recurse", "Remove-Item build", false],
  ["git push", "echo git push", false], ["git push", "git status # git push", false],
];

for (const [pattern, command, expected] of PATTERNS) {
  test(`pattern ${JSON.stringify(pattern)} ${expected ? "matches" : "does not match"} ${JSON.stringify(command)}`, () => {
    assert.equal(matches(pattern, command), expected);
  });
}

test("a variable or substitution never matches a literal word, so it cannot satisfy a rule by accident", () => {
  assert.equal(matches("git push", "$VCS push"), false);
  assert.equal(matches("* push", "$VCS push"), true, "only an explicit wildcard accepts an unknown word");
});

// --- Evaluation -----------------------------------------------------------------------------------------------------------------

const full = policy({
  protected_paths: [{ glob: ".env*", floor: "deny" }, { glob: ".github/workflows/**", floor: "review" }, { glob: "src/auth/**", floor: "review" }],
  commands: { deny: ["git push --force", "terraform destroy"], review: ["npm publish", "git push"], allow_read_only: ["git status", "git log", "git diff", "rg", "ls", "cat"] },
}, join(tmpdir(), "repo", POLICY_FILE_NAME));

const decide = (command?: string, target?: string, allowEligible = true) => evaluatePolicy(full, { command, target, allowEligible }).decision;

test("deny beats review beats allow, for commands and for paths", () => {
  assert.equal(decide("git push -f origin main"), "deny");
  assert.equal(decide("git push origin main"), "review", "the broader review rule applies to a normal push");
  assert.equal(decide("git status"), "allow");
  assert.equal(decide("cat .env.production"), "deny", "an allowed program cannot read a denied path");
  assert.equal(decide("cat src/auth/session.ts"), "review", "or a review path");
  assert.equal(decide("ls src"), "allow");
  assert.equal(decide(undefined, ".github/workflows/ci.yml"), "review", "a target alone is enough");
  assert.equal(decide("echo hi", ".env"), "deny");
  assert.equal(decide("git status && git push --force"), "deny", "one denied segment denies the command");
  assert.equal(decide("node scripts/build.js"), "none");
  assert.equal(decide(undefined, undefined), "none");
});

test("allow needs an eligible read-only command and an explicit pattern for every segment", () => {
  assert.equal(decide("git status", undefined, false), "none", "not confirmed read-only, so no allow");
  assert.equal(decide("git status | git log"), "allow");
  assert.equal(decide("git status && npm test"), "none", "one unmatched segment withholds the allow");
  assert.equal(decide("git status; ls; cat README.md"), "allow");
  assert.equal(decide("git commit -m x"), "none");
  assert.equal(evaluatePolicy(full, { command: "git status", allowEligible: true }).rule, "command:git status");
  const empty = policy({});
  assert.equal(evaluatePolicy(empty, { command: "git status", allowEligible: true }).decision, "none");
});

test("absolute targets inside the policy's root are matched; outside it they are ignored", () => {
  const rooted = policy({ protected_paths: [{ glob: ".env*", floor: "deny" }] }, "C:/work/repo/.jev-policy.json");
  assert.equal(evaluatePolicy(rooted, { target: "C:\\work\\repo\\.env.local" }).decision, "deny");
  assert.equal(evaluatePolicy(rooted, { target: "C:/other/.env" }).decision, "none");
  assert.equal(evaluatePolicy(rooted, { target: "../.env" }).decision, "none");
});

test("adding rules can only tighten: deny/review never get weaker, and only allow rules can loosen", () => {
  const random = seeded(31);
  const programs = ["git push", "git status", "npm publish", "rm -rf build", "ls", "cat .env", "kubectl apply -f x", "git push --force", "docker push img", "terraform destroy"];
  const rank = { allow: -1, none: 0, review: 1, deny: 2 } as const;
  const pick = <T,>(items: T[]) => items[Math.floor(random() * items.length)]!;
  const patterns = ["git push", "git push --force", "npm publish", "rm --recursive", "kubectl apply", "docker push", "terraform destroy", "ls", "git status", "cat"];
  for (let i = 0; i < 400; i += 1) {
    const base = { commands: { deny: [pick(patterns)], review: [pick(patterns)], allow_read_only: [pick(patterns)] } };
    const command = `${pick(programs)}${random() < 0.5 ? ` && ${pick(programs)}` : ""}`;
    const before = evaluatePolicy(policy(base), { command, allowEligible: true }).decision;
    const withDeny = evaluatePolicy(policy({ commands: { ...base.commands, deny: [...base.commands.deny, pick(patterns)] } }), { command, allowEligible: true }).decision;
    const withReview = evaluatePolicy(policy({ commands: { ...base.commands, review: [...base.commands.review, pick(patterns)] } }), { command, allowEligible: true }).decision;
    assert.ok(rank[withDeny] >= rank[before], `${command}: ${before} -> ${withDeny} after adding a deny`);
    assert.ok(rank[withReview] >= rank[before], `${command}: ${before} -> ${withReview} after adding a review`);
    const withPath = evaluatePolicy(policy({ ...base, protected_paths: [{ glob: "build", floor: "review" }] }), { command, allowEligible: true }).decision;
    assert.ok(rank[withPath] >= rank[before], `${command}: a protected path loosened ${before} -> ${withPath}`);
  }
});

// --- Discovery and loading ---------------------------------------------------------------------------------------------------------------

test("the nearest policy up to the repository root is used, and the search stops at the root", () => {
  const outer = tempDir();
  writeFileSync(join(outer, POLICY_FILE_NAME), JSON.stringify({ version: 1 }));
  const repo = join(outer, "repo");
  mkdirSync(join(repo, ".git"), { recursive: true });
  mkdirSync(join(repo, "packages", "app"), { recursive: true });
  assert.equal(findPolicyFile(join(repo, "packages", "app"), {}), null, "a policy above the repository root does not govern it");
  writeFileSync(join(repo, POLICY_FILE_NAME), JSON.stringify({ version: 1 }));
  assert.equal(findPolicyFile(join(repo, "packages", "app"), {}), join(repo, POLICY_FILE_NAME));
  writeFileSync(join(repo, "packages", POLICY_FILE_NAME), JSON.stringify({ version: 1 }));
  assert.equal(findPolicyFile(join(repo, "packages", "app"), {}), join(repo, "packages", POLICY_FILE_NAME), "nearest wins");
});

test("JEV_POLICY_FILE overrides discovery, none disables it, and a bad path is an error", () => {
  const dir = tempDir();
  const file = join(dir, "custom-policy.json");
  writeFileSync(file, JSON.stringify({ version: 1 }));
  writeFileSync(join(dir, POLICY_FILE_NAME), JSON.stringify({ version: 1 }));
  assert.equal(findPolicyFile(dir, { JEV_POLICY_FILE: file }), file);
  assert.equal(findPolicyFile(dir, { JEV_POLICY_FILE: "none" }), null);
  assert.equal(findPolicyFile(dir, { JEV_POLICY_FILE: "NONE" }), null);
  assert.throws(() => findPolicyFile(dir, { JEV_POLICY_FILE: "relative.json" }), (error: unknown) => errorDetails(error).code === "CONFIG_ERROR");
  assert.throws(() => findPolicyFile(dir, { JEV_POLICY_FILE: join(dir, "missing.json") }), (error: unknown) => errorDetails(error).code === "CONFIG_ERROR");
});

test("loading is cached by mtime and size, reloads on change, and a broken file fails closed", () => {
  const dir = tempDir();
  mkdirSync(join(dir, ".git"));
  const file = join(dir, POLICY_FILE_NAME);
  writeFileSync(file, JSON.stringify({ version: 1, commands: { deny: ["terraform destroy"] } }));
  const first = loadRepoPolicy(dir, {})!;
  assert.equal(loadRepoPolicy(dir, {}), first, "an unchanged file is served from the cache");
  writeFileSync(file, JSON.stringify({ version: 1, commands: { deny: ["terraform destroy", "git push --force"] } }));
  utimesSync(file, new Date(), new Date(Date.now() + 5_000));
  const second = loadRepoPolicy(dir, {})!;
  assert.notEqual(second, first);
  assert.equal(second.commands.deny.length, 2);
  writeFileSync(file, "{ not json");
  utimesSync(file, new Date(), new Date(Date.now() + 10_000));
  assert.throws(() => loadRepoPolicy(dir, {}), (error: unknown) => errorDetails(error).code === "CONFIG_ERROR");
  writeFileSync(file, JSON.stringify({ version: 1, padding: "x".repeat(70_000) }));
  utimesSync(file, new Date(), new Date(Date.now() + 15_000));
  assert.throws(() => loadRepoPolicy(dir, {}), /at most 65536 bytes/);
  rmSync(file);
  assert.equal(loadRepoPolicy(dir, {}), null, "no file, no policy");
});

test("the example policy file in the repository is valid", async () => {
  const { readFileSync } = await import("node:fs");
  const example = parseRepoPolicy(readFileSync(new URL("../examples/jev-policy.json", import.meta.url), "utf8"), "C:/repo/.jev-policy.json");
  assert.ok(example.protectedPaths.length > 0 && example.commands.deny.length > 0 && example.commands.allowReadOnly.length > 0);
  const check = (command: string, target?: string) => evaluatePolicy(example, { command, target, allowEligible: true }).decision;
  assert.equal(check("git push --force origin main"), "deny");
  assert.equal(check("git push origin main"), "review");
  assert.equal(check("git log --oneline -5"), "allow");
  assert.equal(check("cat .env"), "deny");
  assert.equal(check("git branch feature"), "allow", "pattern match alone; the caller must also have confirmed the command read-only");
});
