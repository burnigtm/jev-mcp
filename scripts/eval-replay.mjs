// What would the PreToolUse hook have done to a real Claude Code session?
//
//   npm run build && TYPESAFE_API_KEY=... node scripts/eval-replay.mjs --transcript PATH [--limit N] [--report FILE]
//
// Reads a Claude Code transcript (JSONL), takes every Bash, PowerShell, Read, Write, Edit, MultiEdit and NotebookEdit call the
// agent made, pairs it with the user prompt in force at that moment, and asks the hook for its decision. Nothing is executed: the
// calls are replayed as data. The report keeps counts and content-free shapes (tool, effect class, decision source, reason
// codes), never a command, a path, a prompt or an output. `--show-asks` prints the held calls to the terminal for reading.
//
// There are no labels in a real session, so this measures how often the hook would have interrupted the work and lets a person
// judge each interruption. The agent's calls were made in a session that ran with a human present, so the ones the user
// accepted are normal work by construction.
import { parseArgs } from 'node:util';
import { createReadStream } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { createInterface } from 'node:readline';
import { dirname, resolve } from 'node:path';
import { root } from './lib/skill.mjs';

const { values } = parseArgs({ options: {
  transcript: { type: 'string', multiple: true },
  limit: { type: 'string' },
  cwd: { type: 'string' },
  concurrency: { type: 'string', default: '4' },
  mock: { type: 'boolean', default: false },
  'show-asks': { type: 'boolean', default: false },
  'policy-file': { type: 'string' },
  report: { type: 'string', default: 'artifacts/replay.json' },
} });
if (!values.transcript?.length) throw new Error('--transcript PATH is required');

process.env.JEV_MCP_MOCK = values.mock ? '1' : '0';
process.env.JEV_POLICY_FILE = values['policy-file'] ? resolve(root, values['policy-file']) : 'none';
// Measure the model's decisions, not the per-session call cap; the cap is reported separately.
process.env.JEV_MCP_HOOK_MAX_CALLS = '1000000';
const { runHook } = await import(new URL('../dist/hook.js', import.meta.url));
const { statsSnapshot } = await import(new URL('../dist/stats.js', import.meta.url));
const { actionFromTool, isCheckedTool } = await import(new URL('../dist/check.js', import.meta.url));
const { effectiveEffect } = await import(new URL('../dist/effects.js', import.meta.url));

function humanText(entry) {
  if (entry.type !== 'user' || entry.isSidechain === true || entry.isMeta === true) return null;
  const content = entry.message?.content;
  const parts = typeof content === 'string' ? [content] : Array.isArray(content) ? content.flatMap((block) => (block?.type === 'text' && typeof block.text === 'string' ? [block.text] : [])) : [];
  const prompt = parts.join('\n').trim();
  if (!prompt || /^<(system-reminder|command-|local-command|user-prompt-submit-hook)/.test(prompt)) return null;
  return prompt.slice(0, 4000);
}

const events = [];
for (const path of values.transcript) {
  let task = null;
  let session = path;
  const lines = createInterface({ input: createReadStream(path), crlfDelay: Infinity });
  for await (const line of lines) {
    if (!line.trim()) continue;
    let entry;
    try { entry = JSON.parse(line); } catch { continue; }
    if (typeof entry.sessionId === 'string') session = entry.sessionId;
    const prompt = humanText(entry);
    if (prompt) { task = prompt; continue; }
    if (entry.type !== 'assistant' || entry.isSidechain === true || !Array.isArray(entry.message?.content)) continue;
    for (const block of entry.message.content) {
      if (block?.type !== 'tool_use' || !isCheckedTool(block.name)) continue;
      events.push({ session, tool_name: block.name, tool_input: block.input ?? {}, task, cwd: values.cwd ?? entry.cwd ?? process.cwd() });
    }
  }
}
const selected = values.limit ? events.slice(0, Number(values.limit)) : events;
console.error(`replaying ${selected.length} of ${events.length} tool calls`);

const rows = [];
const shown = [];
let next = 0;
async function worker() {
  for (;;) {
    const index = next++;
    if (index >= selected.length) return;
    const event = selected[index];
    const mapped = actionFromTool(event);
    const effect = mapped?.command ? effectiveEffect(mapped.effect, mapped.command) : null;
    const before = statsSnapshot(undefined, 0).provider.requests;
    const started = performance.now();
    const run = await runHook('pre-tool-use', JSON.stringify({ session_id: `replay-${index}`, hook_event_name: 'PreToolUse', ...event }), process.env);
    const ms = Math.round(performance.now() - started);
    const decision = run.stdout ? JSON.parse(run.stdout).hookSpecificOutput : null;
    // Stats are process-wide and the workers overlap, so model use is counted from the decision source below.
    const reason = decision?.permissionDecisionReason ?? '';
    rows[index] = {
      tool: event.tool_name,
      effect: effect?.effective ?? (mapped?.effect ?? null),
      inferred: effect?.inferred ?? null,
      decision: decision ? decision.permissionDecision : 'silent',
      reasons: (reason.match(/\(([^)]*)\)/)?.[1] ?? '').split(', ').filter(Boolean),
      ms,
    };
    if (values['show-asks'] && decision) shown.push({ index, tool: event.tool_name, command: (event.tool_input.command ?? event.tool_input.file_path ?? '').slice(0, 160), why: reason.slice(0, 160) });
    if (index % 50 === 0) process.stderr.write('.');
    void before;
  }
}
await Promise.all(Array.from({ length: Math.max(1, Number(values.concurrency) || 1) }, worker));
process.stderr.write('\n');

const count = (items, key) => items.reduce((acc, item) => { const k = key(item); acc[k] = (acc[k] ?? 0) + 1; return acc; }, {});
const stats = statsSnapshot(undefined, 0).provider;
const held = rows.filter((row) => row.decision !== 'silent');
const latencies = rows.map((row) => row.ms).sort((a, b) => a - b);
const summary = {
  mode: values.mock ? 'mock (not a measurement)' : 'live',
  events: rows.length,
  silent: rows.length - held.length,
  held: held.length,
  held_rate: rows.length ? held.length / rows.length : 0,
  by_tool: count(rows, (row) => row.tool),
  held_by_tool: count(held, (row) => row.tool),
  by_effect: count(rows, (row) => row.effect ?? 'none'),
  held_by_effect: count(held, (row) => row.effect ?? 'none'),
  decisions: count(rows, (row) => row.decision),
  reasons: count(held.flatMap((row) => row.reasons.map((reason) => ({ reason }))), (item) => item.reason),
  model_calls: stats.requests,
  tokens: stats.input_tokens + stats.output_tokens,
  latency_ms: { p50: latencies[Math.floor(latencies.length * 0.5)] ?? 0, p95: latencies[Math.floor(latencies.length * 0.95)] ?? 0, max: latencies.at(-1) ?? 0 },
};
await mkdir(dirname(resolve(root, values.report)), { recursive: true });
await writeFile(resolve(root, values.report), `${JSON.stringify({ summary, rows }, null, 1)}\n`);
console.log(JSON.stringify(summary, null, 2));
if (values['show-asks']) for (const item of shown.sort((a, b) => a.index - b.index)) console.log(`#${item.index} ${item.tool} | ${item.command.replace(/\s+/g, ' ')} | ${item.why}`);
