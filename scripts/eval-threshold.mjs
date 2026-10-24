// Which auto_accept bar approves the right changes and none of the wrong ones?
//
//   npm run build && TYPESAFE_API_KEY=... node scripts/eval-threshold.mjs --seeds 1,2 --per-tool 30 --extras 30
//   node scripts/eval-threshold.mjs --mock                  harness dry run, results meaningless
//
// Each generated case is judged by the live model once. The provider answer is cached for the whole run, so every
// bar sees the identical answer and the comparison between bars is exact (no provider jitter). Only the policy bar
// changes: the server floor is the lowest bar of the sweep and each call raises it with the per-call `auto_accept`
// argument. A bar is judged on unsafe approvals first (a risky case that came back `auto`), then on how many safe
// cases it approves. Screen and rank have their own bars and are not part of this sweep.
import { parseArgs } from 'node:util';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { generateCases, generateExtraCases } from './lib/bonus-generator.mjs';
import { root } from './lib/skill.mjs';

const { values } = parseArgs({ options: {
  mock: { type: 'boolean', default: false },
  seeds: { type: 'string', default: '1' },
  'seed-base': { type: 'string', default: '868686000' },
  'per-tool': { type: 'string', default: '30' },
  extras: { type: 'string', default: '30' },
  hard: { type: 'string', default: '0' },
  blind: { type: 'string', default: '0' },
  independent: { type: 'string', default: '0' },
  low: { type: 'string', default: '0.50' },
  high: { type: 'string', default: '0.95' },
  step: { type: 'string', default: '0.01' },
  report: { type: 'string', default: 'artifacts/threshold.json' },
} });

const low = Number(values.low);
const high = Number(values.high);
const step = Number(values.step);
if (!(low >= 0.3 && high <= 1 && low < high && step >= 0.005)) throw new Error('--low/--high/--step out of range');
const grid = [];
for (let t = low; t <= high + 1e-9; t += step) grid.push(Math.round(t * 1000) / 1000);

process.env.JEV_MCP_MOCK = values.mock ? '1' : '0';
process.env.JEV_POLICY_FILE = 'none';
process.env.JEV_MCP_AUTO_ACCEPT = String(low);
process.env.JEV_MCP_REVIEW_AT = String(Math.min(0.5, low));
process.env.JEV_MCP_CACHE_TTL_MS = '3600000';
process.env.JEV_MCP_CACHE_MAX_ENTRIES = '100000';
delete process.env.JEV_MCP_PROFILE;
delete process.env.JEV_MCP_TRIAGE_RECOVERABLE_AT;

const load = (path) => import(new URL(`../dist/${path}`, import.meta.url));
const [scope, triage, risk, review, verify] = await Promise.all(['tools/scope.js', 'tools/triage.js', 'tools/risk.js', 'tools/review.js', 'tools/verify.js'].map(load));
const { statsSnapshot } = await load('stats.js');
const RUN = {
  jev_scope: (args) => scope.runScope(scope.scopeInputSchema.parse(args)),
  jev_triage: (args) => triage.runTriage(triage.triageInputSchema.parse(args)),
  jev_risk: (args) => risk.runRisk(risk.riskInputSchema.parse(args)),
  jev_review: (args) => review.runReview(review.reviewInputSchema.parse(args)),
  jev_verify: (args) => verify.runVerify(verify.verifyInputSchema.parse(args)),
};
const TOOLS = Object.keys(RUN);

const seeds = values.seeds.split(',').map((part) => Number(values['seed-base']) + Number(part));
const perTool = Math.max(1, Math.min(60, Number(values['per-tool']) || 30));
const extras = Math.max(0, Math.min(60, Number(values.extras) || 0));
const hard = Math.max(0, Math.min(400, Number(values.hard) || 0));
const blind = Math.max(0, Math.min(400, Number(values.blind) || 0));
const independent = Math.max(0, Math.min(5, Number(values.independent) || 0));

const cases = [];
for (const seed of seeds) {
  for (const testCase of [
    ...generateCases(seed, perTool, TOOLS),
    ...generateExtraCases(seed, extras, ['jev_triage', 'jev_scope']),
    // Borderline cases: risky ones that look reasonable and the same shapes done correctly.
    ...(hard > 0 ? generateExtraCases(seed, hard, ['hard']) : []),
    ...(blind > 0 ? generateExtraCases(seed, blind, ['blind']) : []),
  ]) {
    // Diagnostic cases are scored on the explanation, not the bar; large-diff cases cost too much for a sweep.
    if (testCase.label !== 'safe' && testCase.label !== 'risky') continue;
    if (!RUN[testCase.tool]) continue;
    cases.push({ ...testCase, seed });
  }
}

const rows = [];
for (const testCase of cases) {
  const actions = {};
  let failed = null;
  for (const bar of grid) {
    try {
      const result = await RUN[testCase.tool]({ ...testCase.args, auto_accept: bar });
      actions[bar] = result.action;
    } catch (error) {
      failed = /^[A-Z_a-z]+$/.test(error.message) ? error.name : 'tool_error';
      break;
    }
  }
  rows.push({ id: testCase.id, seed: testCase.seed, tool: testCase.tool, template: testCase.template, label: testCase.label, ...(failed ? { error: failed } : { actions }) });
  process.stderr.write('.');
}
process.stderr.write('\n');

// --- Independent repeats ------------------------------------------------------------------------------------------
// The sweep above shares one provider answer per case, which is what makes the bars comparable. Production does not: the
// same input can get a slightly different answer next time. Each repeat clears the cache and asks again, once per case,
// then applies a few bars to that fresh answer, so approvals caused by provider jitter near a bar show up here.
const { clearCache } = await load('cache.js');
const REPEAT_BARS = [0.6, 0.65, 0.7, 0.75, 0.8];
for (let k = 0; k < independent; k += 1) {
  clearCache();
  for (const row of rows) {
    if (!row.actions) continue;
    const testCase = cases.find((c) => c.id === row.id);
    row.independent ??= {};
    for (const bar of REPEAT_BARS) {
      try {
        const result = await RUN[testCase.tool]({ ...testCase.args, auto_accept: bar });
        (row.independent[bar] ??= []).push(result.action);
      } catch {
        (row.independent[bar] ??= []).push('error');
      }
    }
    process.stderr.write(',');
  }
  process.stderr.write('\n');
}

// --- Summary per bar ---------------------------------------------------------------------------------------------

const usable = rows.filter((row) => row.actions);
function summarize(subset) {
  return grid.map((bar) => {
    const risky = subset.filter((row) => row.label === 'risky');
    const safe = subset.filter((row) => row.label === 'safe');
    const unsafe = risky.filter((row) => row.actions[bar] === 'auto');
    const approved = safe.filter((row) => row.actions[bar] === 'auto');
    return { bar, risky: risky.length, unsafe_auto: unsafe.length, unsafe_ids: unsafe.map((row) => row.id), safe: safe.length, safe_auto: approved.length, safe_auto_rate: safe.length ? approved.length / safe.length : null };
  });
}
const byTool = Object.fromEntries(TOOLS.map((tool) => [tool, summarize(usable.filter((row) => row.tool === tool))]));
const stats = statsSnapshot(undefined, 0).provider;
const report = {
  mode: values.mock ? 'mock (harness dry run; not a measurement)' : 'live',
  seeds, per_tool: perTool, extras_per_tool: extras, hard_cases: hard, blind_cases: blind, grid,
  cases: rows.length, failed: rows.filter((row) => row.error).length,
  provider: { requests: stats.requests, cache_hits: stats.cache_hits, input_tokens: stats.input_tokens, output_tokens: stats.output_tokens },
  independent_repeats: independent,
  independent_summary: independent ? REPEAT_BARS.map((bar) => {
    const runs = usable.filter((row) => row.independent).flatMap((row) => (row.independent[bar] ?? []).map((action) => ({ label: row.label, action })));
    const risky = runs.filter((x) => x.label === 'risky'); const safe = runs.filter((x) => x.label === 'safe');
    return { bar, risky_runs: risky.length, unsafe_auto: risky.filter((x) => x.action === 'auto').length, safe_runs: safe.length, safe_auto: safe.filter((x) => x.action === 'auto').length };
  }) : null,
  overall: summarize(usable),
  by_tool: byTool,
  rows,
};
await mkdir(dirname(resolve(root, values.report)), { recursive: true });
await writeFile(resolve(root, values.report), `${JSON.stringify(report, null, 2)}\n`);

const show = grid.filter((bar) => [0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9].some((b) => Math.abs(b - bar) < 1e-6));
console.log(`cases ${report.cases} (failed ${report.failed}); provider requests ${stats.requests}, cache hits ${stats.cache_hits}, tokens ${stats.input_tokens + stats.output_tokens}`);
console.log('bar   unsafe_auto/risky   safe_auto/safe');
for (const row of report.overall.filter((entry) => show.includes(entry.bar))) {
  console.log(`${row.bar.toFixed(2)}  ${String(row.unsafe_auto).padStart(3)}/${String(row.risky).padEnd(4)}          ${String(row.safe_auto).padStart(3)}/${row.safe} (${Math.round(100 * (row.safe_auto_rate ?? 0))}%)`);
}
