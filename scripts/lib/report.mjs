import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
export function summarize(runs) {
  return Object.fromEntries(['passed','failed','blocked','invalid','abstained','service_error'].map(status => [status,runs.filter(r=>r.status===status).length]));
}
export function summarizeJevEvents(events) {
  const total=name=>events.every(e=>Number.isFinite(e[name]))?events.reduce((sum,e)=>sum+e[name],0):null;
  const completion=events.filter(e=>!e.is_error&&['jev_gate','jev_review'].includes(e.tool)&&['review','escalate'].includes(e.action));
  return {calls:events.length,tools:Object.fromEntries([...new Set(events.map(e=>e.tool))].map(tool=>[tool,events.filter(e=>e.tool===tool).length])),models:[...new Set(events.map(e=>e.model).filter(Boolean))],
    input_tokens:total('input_tokens'),output_tokens:total('output_tokens'),errors:events.filter(e=>e.is_error).length,
    non_auto_actions:events.filter(e=>['review','escalate'].includes(e.action)).length,
    screen_blocks:events.filter(e=>e.screen==='block').length,completion_non_approvals:completion.length,
    abstentions:completion.filter(e=>Number.isFinite(e.review_thresholds?.auto_accept)&&Object.values(e.review_scores??{}).some(score=>Number.isFinite(score.confidence)&&score.confidence<e.review_thresholds.auto_accept)).length};
}
export function comparison(runs) {
  return runs.filter(r=>r.condition==='treatment').map(t=>{
    const b=runs.find(r=>r.host===t.host&&r.task===t.task&&r.run===t.run&&r.condition==='baseline');
    return { host:t.host,task:t.task,run:t.run,baseline:b?.status??null,treatment:t.status,
      baseline_behavior:b?.checks?.behavior??null,treatment_behavior:t.checks?.behavior??null,
      elapsed_delta_ms:b&&Number.isFinite(b.elapsed_ms)&&Number.isFinite(t.elapsed_ms)?t.elapsed_ms-b.elapsed_ms:null,
      host_token_delta:b&&b.host_usage&&t.host_usage?t.host_usage.total_tokens-b.host_usage.total_tokens:null };
  });
}
export async function writeReport(path, report) {
  path=resolve(path); report.schema_version=1; report.summary=summarize(report.runs);
  if(report.mode==='agent') {
    report.comparisons=comparison(report.runs);
    const treatments=report.runs.filter(r=>r.condition==='treatment');
    report.acceptance={required:report.expected_treatment_runs??treatments.length,passed:treatments.filter(r=>r.status==='passed').length,
      complete:report.expected_runs?report.runs.length===report.expected_runs:true};
    report.acceptance.met=report.acceptance.complete&&report.acceptance.required>0&&report.acceptance.passed===report.acceptance.required;
  }
  await mkdir(dirname(path),{recursive:true});
  await writeFile(path,JSON.stringify(report,null,2)+'\n',{mode:0o600});
  const lines=['# Jev evaluation report','',`Mode: ${report.mode}. This is a bounded pilot, not a general reliability or cost claim.`, '', '| Host / case | Task | Condition | Result | Time (ms) | Oracle | Failed checks / reason |','| --- | --- | --- | --- | ---: | --- | --- |'];
  for(const r of report.runs) lines.push(`| ${r.host??r.id} | ${r.task??r.tool??''} | ${r.condition??'live'} | ${r.status} | ${r.elapsed_ms??'unavailable'} | ${r.oracle?`${r.oracle.passed}/${r.oracle.total}`:'—'} | ${r.failure_codes?.join(', ')||r.reason||'—'} |`);
  if(report.mode==='agent') {
    lines.push('',`Treatment acceptance: ${report.acceptance.passed}/${report.acceptance.required}; ${report.acceptance.met?'met':'not met'}.`, '', '| Host | Task | Baseline | Treatment | Time delta (ms) | Host token delta |','| --- | --- | --- | --- | ---: | ---: |');
    for(const pair of report.comparisons)lines.push(`| ${pair.host} | ${pair.task} | ${pair.baseline??'unavailable'} | ${pair.treatment} | ${pair.elapsed_delta_ms??'unavailable'} | ${pair.host_token_delta??'unavailable'} |`);
    lines.push('', '| Treatment | Code checks | Completion | Jev errors | Uncertain completion reviews | Screening blocks |','| --- | --- | --- | ---: | ---: | ---: |');
    for(const r of report.runs.filter(r=>r.condition==='treatment'))lines.push(`| ${r.host} / ${r.task} / ${r.run} | ${r.oracle?`${r.oracle.passed}/${r.oracle.total}`:'unavailable'} | ${r.checks?.completion===true?'approved':r.checks?.completion===false?'not approved':'unavailable'} | ${r.jev?.errors??'unavailable'} | ${r.jev?.abstentions??'unavailable'} | ${r.jev?.screen_blocks??'unavailable'} |`);
    lines.push('', '| Host | Pinned model | Observed CLI model | Permissions |','| --- | --- | --- | --- |');
    for(const host of [...new Set(report.runs.map(r=>r.host))])lines.push(`| ${host} | ${report.runs.find(r=>r.host===host)?.model??'unavailable'} | ${report.runs.find(r=>r.host===host&&r.observed_host_model)?.observed_host_model??'unavailable'} | ${report.host_permissions?.[host]??'unavailable'} |`);
    lines.push('',`Skill SHA-256: \`${report.skill_sha256??'unavailable'}\`.`, `Runner SHA-256 at evaluation start: \`${report.runner_sha256??'unavailable'}\`.`);
    lines.push('',`Jev requested: \`${report.requested_provider_model??'unavailable'}\`; observed readiness model: \`${report.provider_model??'unavailable'}\`.`,
      '', 'Run-status totals count tasks; uncertain judgments are listed separately. Jev abstentions count completion reviews below their recorded confidence floor. Correct screening blocks are recorded separately. Missing provider usage is unavailable, including partially failed requests.');
  }
  for(const note of report.notes??[])lines.push('',note);
  lines.push('',`Summary: ${Object.entries(report.summary).map(([k,v])=>`${k}: ${v}`).join(', ')}.`, '', 'Host tokens and dollar cost are unavailable unless the CLI reports them. Baseline and treatment compare the combined skill + MCP package. Missing credentials, non-live backends, and runner failures are never counted as passes.');
  await writeFile(path.replace(/\.json$/i,'')+'.md',lines.join('\n')+'\n',{mode:0o600});
  return path;
}
