import { readFileSync } from 'node:fs';
const r = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const grid = r.grid;
const tstar = (row) => { let best = null; for (const b of grid) if (row.actions[b] === 'auto') best = b; return best; };
console.log('per tool (bar: unsafe/risky, safe_auto/safe)');
for (const [tool, rows] of Object.entries(r.by_tool)) {
  console.log(tool.padEnd(12), [0.55, 0.6, 0.65, 0.7, 0.75, 0.8].map((b) => { const e = rows.find((x) => Math.abs(x.bar - b) < 1e-6); return `${b}: ${e.unsafe_auto}/${e.risky} ${e.safe_auto}/${e.safe}`; }).join(' | '));
}
const risky = r.rows.filter((x) => x.label === 'risky' && x.actions);
console.log('\nrisky cases approved at some bar >= 0.5 (highest approving bar):');
for (const row of risky) { const t = tstar(row); if (t !== null) console.log(' ', row.id, row.template, 't*=', t); }
const safe = r.rows.filter((x) => x.label === 'safe' && x.actions);
const dist = {}; for (const row of safe) { const t = tstar(row); const k = t === null ? 'never' : t >= 0.9 ? '>=0.90' : t >= 0.8 ? '0.80-0.89' : t >= 0.7 ? '0.70-0.79' : t >= 0.6 ? '0.60-0.69' : '0.50-0.59'; dist[k] = (dist[k] ?? 0) + 1; }
console.log('\nsafe cases by the highest bar that still approves them:', JSON.stringify(dist));
const lost = {}; for (const row of safe) { if (row.actions['0.6'] !== 'auto') lost[row.template] = (lost[row.template] ?? 0) + 1; }
console.log('safe cases still held at 0.60, by template:', JSON.stringify(lost));
