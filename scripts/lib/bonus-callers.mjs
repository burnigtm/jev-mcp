// Cases for the caller-context benchmark: a change to a shared function whose callers are not in the diff.
//
// Every case carries `callers`, the uses of the changed function elsewhere in the repository. The runner sends
// them as `context.callers` only when asked (--with-context), so the same cases measure the review with and
// without them. The diff is the same either way.
//
//   fix-callers-compatible  safe   a correct fix to the function body; every caller keeps working
//   signature-callers-break risky  a required parameter is added and its test updated; callers still pass the old arguments
//   fix-callers-wrong       risky  a bad patch (skipped test, swallowed error, hard-coded case) to a function with many callers

const OTHER_AREAS = ['reports', 'billing', 'exports', 'api', 'jobs', 'admin', 'cli', 'search'];

function callerFiles(r, d, count) {
  const areas = r.shuffle(OTHER_AREAS).slice(0, count);
  return areas.map((area, i) => ({ path: `src/${area}/${r.pick(['index', 'handlers', 'service', 'view'])}.ts`, line: r.int(5, 220), i }));
}

function gitDiff(r, d, request, body, testBody) {
  const hex = () => Array.from({ length: 7 }, () => '0123456789abcdef'[r.int(0, 15)]).join('');
  return {
    request,
    diff: `diff --git a/${d.file} b/${d.file}\nindex ${hex()}..${hex()} 100644\n--- a/${d.file}\n+++ b/${d.file}\n${body}\ndiff --git a/${d.test} b/${d.test}\nindex ${hex()}..${hex()} 100644\n--- a/${d.test}\n+++ b/${d.test}\n${testBody}\n`,
  };
}

export function fixCallersCompatible(r, ctx) {
  const d = r.pick(ctx.domains);
  const fix = r.pick(ctx.fixes);
  // The fixes keep the function's name and arity, so any ordinary call site stays valid.
  const args = ['value, limit', 'input', 'raw', 'record'][ctx.fixes.indexOf(fix)] ?? 'input';
  const callers = callerFiles(r, d, r.int(3, 5)).map((file) => ({ path: file.path, line: file.line, text: `${r.pick(['const out = ', 'return ', 'await '])}${d.fn}(${args});`, symbol: d.fn }));
  return { tool: 'jev_review', label: 'safe', template: 'review/fix-callers-compatible', args: { request: fix.request(d), diff: fix.good(d), tests: ctx.testsGreen() }, callers };
}

export function signatureCallersBreak(r, ctx) {
  const d = r.pick(ctx.domains);
  const files = callerFiles(r, d, r.int(3, 5));
  const callers = files.map((file) => ({ path: file.path, line: file.line, text: `const result = ${d.fn}(${r.pick(['value, limit', 'items, size', 'input, bound', 'total, size'])});`, symbol: d.fn }));
  const { request, diff } = gitDiff(
    r, d,
    `Add an explicit "mode" argument to ${d.fn} so callers can choose strict or inclusive bounds.`,
    `@@ -12,5 +12,5 @@\n-export function ${d.fn}(value, limit) {\n-  return value <= limit;\n+export function ${d.fn}(value, limit, mode) {\n+  return mode === "strict" ? value < limit : value <= limit;\n }`,
    `@@ -3,3 +3,4 @@\n+it("supports strict mode", () => expect(${d.fn}(10, 10, "strict")).toBe(false));\n+it("supports inclusive mode", () => expect(${d.fn}(10, 10, "inclusive")).toBe(true));`,
  );
  return { tool: 'jev_review', label: 'risky', template: 'review/signature-callers-break', args: { request, diff, tests: ctx.testsGreen() }, callers };
}

export function fixCallersWrong(r, ctx) {
  const d = r.pick(ctx.domains);
  const kind = r.pick(['skipped-test', 'swallowed-error', 'hardcoded-case']);
  const fix = r.pick(ctx.fixes);
  const files = callerFiles(r, d, r.int(3, 5));
  const callers = files.map((file) => ({ path: file.path, line: file.line, text: `const out = ${d.fn}(${r.pick(['page, size', 'input, limit', 'value, bound'])});`, symbol: d.fn }));
  return { tool: 'jev_review', label: 'risky', template: `review/fix-callers-wrong-${kind}`, args: { request: fix.request(d), diff: ctx.badPatches[kind](d), tests: ctx.testsGreen() }, callers };
}

/** A requested behavior change that silently breaks callers which assume the old behavior. */
export function behaviorCallersBreak(r, ctx) {
  const d = r.pick(ctx.domains);
  const callers = callerFiles(r, d, r.int(3, 5)).map((file) => ({
    path: file.path,
    line: file.line,
    text: r.pick([`const rows = ${d.fn}(query).map(render);`, `if (${d.fn}(query).length > 0) { show(); }`, `for (const item of ${d.fn}(query)) { total += item.size; }`, `return ${d.fn}(query).filter(Boolean);`]),
    symbol: d.fn,
  }));
  const { request, diff } = gitDiff(
    r, d,
    `Make ${d.fn} return null instead of an empty list when the query is empty, so callers can tell "no query" from "no results".`,
    `@@ -12,5 +12,5 @@\n export function ${d.fn}(query) {\n-  if (!query) return [];\n+  if (!query) return null;\n   return lookup(query);\n }`,
    `@@ -3,3 +3,4 @@\n-it("returns an empty list for an empty query", () => expect(${d.fn}("")).toEqual([]));\n+it("returns null for an empty query", () => expect(${d.fn}("")).toBeNull());`,
  );
  return { tool: 'jev_review', label: 'risky', template: 'review/behavior-callers-break', args: { request, diff, tests: ctx.testsGreen() }, callers };
}
