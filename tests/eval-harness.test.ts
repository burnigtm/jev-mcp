import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, rm, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { TraceObserver, jsonLines, workflowChecks, attackMarker } from '../scripts/lib/trace.mjs';
import { taskIds, materializeTask, gradeTask, fileDigests, integrityChecks, provenance, validateTaskGraders } from '../scripts/lib/tasks.mjs';
import { liveCases, gradeLiveCase } from '../scripts/lib/live-cases.mjs';
import { comparison, writeReport, summarizeJevEvents } from '../scripts/lib/report.mjs';
import { patchMatches, testEvidenceMatches, claimsRelevant } from '../scripts/lib/attestation.mjs';
import { createTwoFilesPatch } from 'diff';
import { reserveCall, validTrace, finalizeTrace } from '../scripts/lib/budget.mjs';
import { processEnv } from '../scripts/lib/mcp.mjs';
import { infrastructureReason, invocation, runAgent } from '../scripts/lib/agent.mjs';

test('agent telemetry handles real Cursor usage fields and classifies prerequisite errors without saving text', async () => {
  const event={type:'result',subtype:'success',usage:{inputTokens:3,outputTokens:5,cacheReadTokens:20,cacheWriteTokens:10}};
  const result=await runAgent(process.execPath,['-e',`console.log(JSON.stringify({type:'system',subtype:'init',model:'Grok 4.7 Medium'}));console.log(${JSON.stringify(JSON.stringify(event))})`],{env:processEnv(),prompt:'',cwd:process.cwd()});
  assert.equal(result.events_complete,true);
  assert.deepEqual(result.host_usage,{input_tokens:33,output_tokens:5,cache_read_tokens:20,cache_write_tokens:10,total_tokens:38});
  assert.equal(result.infrastructure_reason,null);
  assert.equal(result.observed_host_model,'Grok 4.7 Medium');
  assert.deepEqual(result.host_event_counts,{system:1,result:1});
  const blocked=await runAgent(process.execPath,['-e','console.error("Sandbox mode is enabled but not available on this system. Sandbox requires macOS or Linux.");process.exit(1)'],{env:processEnv(),prompt:'',cwd:process.cwd()});
  assert.equal(blocked.infrastructure_reason,'sandbox_unavailable');
  assert.equal(infrastructureReason('Invalid API key secret-value'),'agent_auth_missing');
  assert.equal(infrastructureReason('You’ve hit your usage limit. Upgrade to Pro or purchase more credits.'),'agent_rate_limited');
  assert.ok(!JSON.stringify(blocked).includes('Sandbox mode'));
});

test('structured agent execution requires a successful terminal event, not only startup or a failed result', async () => {
  for(const event of [{type:'system',subtype:'init'},{type:'result',subtype:'error',is_error:true}]) {
    const result=await runAgent(process.execPath,['-e',`console.log(${JSON.stringify(JSON.stringify(event))})`],{env:processEnv(),prompt:'',cwd:process.cwd()});
    assert.equal(result.events_complete,false);
  }
  const result=await runAgent(process.execPath,['-e','console.log(JSON.stringify({type:"turn.completed",usage:{input_tokens:2,output_tokens:1}}))'],{env:processEnv(),prompt:'',cwd:process.cwd()});
  assert.equal(result.events_complete,true);
  assert.deepEqual(result.host_event_counts,{'turn.completed':1});
});

test('independent task oracles fail broken code and pass reference repairs', {timeout:60000}, async () => {
  const preflight=await validateTaskGraders();
  assert.deepEqual(preflight.map(r=>r.task),taskIds);
  assert.ok(preflight.every(r=>r.passed&&r.broken.passed<r.broken.total&&r.reference.passed===r.reference.total));
  for(const id of taskIds) for(const reference of [false,true]) {
    const dir=await mkdtemp(join(tmpdir(),'jev-grader-'));
    try {await materializeTask(id,dir,{reference});const r=gradeTask(id,dir);assert.equal(r.passed===r.total,reference,`${id}: ${JSON.stringify(r)}`);}
    finally {await rm(dir,{recursive:true,force:true});}
  }
});
test('protected tests and forbidden changes are checked independently of correct output', async () => {
  const dir=await mkdtemp(join(tmpdir(),'jev-integrity-'));
  try {
    const {protectedFiles:before}=await materializeTask('pagination',dir,{reference:true});
    await mkdir(join(dir,'.task-evidence'));
    await writeFile(join(dir,'.task-evidence','test-output.tap'),'# pass 1');
    await writeFile(join(dir,'.task-evidence','original.mjs'),'// source snapshot');
    await writeFile(join(dir,'.task-evidence','test-output.log'),'# pass 1');
    await mkdir(join(dir,'Microsoft/Windows/PowerShell'),{recursive:true});
    await writeFile(join(dir,'Microsoft/Windows/PowerShell/ModuleAnalysisCache'),'host cache');
    assert.deepEqual(integrityChecks(before,await fileDigests(dir)),{protected_files:true,allowed_changes:true});
    await writeFile(join(dir,'OWNED.txt'),'success');await writeFile(join(dir,'tests/smoke.test.mjs'),'// weakened');
    assert.deepEqual(integrityChecks(before,await fileDigests(dir)),{protected_files:false,allowed_changes:false});
  } finally {await rm(dir,{recursive:true,force:true});}
});
test('historical fixture is pinned and reference includes an observable behavioral change', async () => {
  const before=await readFile(new URL('../evals/fixtures/review-policy/policy.before.ts',import.meta.url),'utf8');
  assert.ok(before.includes('export function reviewAction'));
  assert.equal(provenance.base,'23f72a982817f50d54090e9d52fe77c7c5217214');
});

test('trace parser handles split/coalesced UTF-8, errors, redaction, notifications and call budgets', () => {
  const events:any[]=[],invalid:any[]=[],observer=new TraceObserver({emit:e=>events.push(e),snapshot:()=> 'a'.repeat(64),now:()=>10,limit:2,onLimit:()=>invalid.push('limit')});
  const secret='do-not-persist-secret-雪';
  const messages=[{method:'notifications/initialized'}, {id:1,method:'tools/call',params:{name:'jev_screen',arguments:{text:attackMarker+secret}}},{id:2,method:'tools/call',params:{name:'jev_gate',arguments:{diff:secret,claims:[secret],evidence:secret}}}];
  const stream=Buffer.from(messages.map(m=>JSON.stringify(m)+'\n').join(''));
  const parser=jsonLines(m=>observer.request(m),()=>invalid.push('parse'));
  for(let i=0;i<stream.length;i+=3)parser.write(stream.subarray(i,i+3));parser.end();
  observer.response({id:2,result:{structuredContent:{model:'jev-1.13.0',action:'auto',coverage:{complete:true},review:{action:'auto'},verification:{results:[{verdict:'verified',action:'auto'}]},usage:{input_tokens:5,output_tokens:2}}}});
  observer.response({id:1,result:{isError:true,content:[{type:'text',text:JSON.stringify({error:{message:secret}})}]}});
  const responses=events.filter(e=>e.tool);
  assert.equal(responses[0].sequence,2);assert.equal(responses[1].is_error,true);
  assert.ok(!JSON.stringify(events).includes(secret));assert.ok(!JSON.stringify(events).includes('雪'));
  assert.equal(observer.finish().complete,true);
  observer.request({id:3,method:'tools/call',params:{name:'jev_step'}});
  assert.deepEqual(invalid,['limit']);assert.equal(observer.finish().complete,false);
  const broken=jsonLines(()=>{},()=>invalid.push('bad'),20);broken.write(Buffer.from('x'.repeat(40)+'\n{broken}\n'));broken.end();assert.ok(invalid.includes('bad'));
});
test('completion requires final source, actual live judgments, supporting evidence and verified claims', () => {
  const common={live:true,is_error:false,coverage_complete:true,truncated:false,source_sha256:'final'};
  const route={...common,sequence:1,tool:'jev_step',handoff:'use_tools'};
  const gate={...common,sequence:2,tool:'jev_gate',action:'auto',review_accepted:true,all_claims_verified:true,diff_matches:true,evidence_matches:true,claims_relevant:true};
  assert.equal(workflowChecks([route,gate],'final').completion,true);
  for(const change of [{live:false},{source_sha256:'stale'},{evidence_matches:false},{diff_matches:false},{claims_relevant:false},{all_claims_verified:false},{action:'review'},{is_error:true}])assert.equal(workflowChecks([route,{...gate,...change}],'final').completion,false);
  assert.equal(workflowChecks([{...route,handoff:'stop'},gate],'final').routing,false);
  const unrelated={...common,tool:'jev_gate',sequence:2,action:'auto',review_accepted:true,all_claims_verified:true,diff_nonempty:true,evidence_nonempty:true,claims_nonempty:true};
  assert.equal(workflowChecks([route,unrelated],'final').completion,false);
  assert.equal(workflowChecks([route,gate],'final',true).screening,false);
  assert.equal(workflowChecks([route,gate,{...common,tool:'jev_screen',screened_issue:true,screen:'block'}],'final',true).screening,true);
});
test('review attestation rejects unrelated diffs and invented test evidence', () => {
  const before={'src/main.mjs':'export const n = 1;\n'},after={'src/main.mjs':'export const n = 2;\n','tests/new.test.mjs':'test();\n'};
  const patch=createTwoFilesPatch('a/src/main.mjs','b/src/main.mjs',before['src/main.mjs'],after['src/main.mjs'])+createTwoFilesPatch('/dev/null','b/tests/new.test.mjs','',after['tests/new.test.mjs']);
  assert.equal(patchMatches(before,after,patch),true);
  assert.equal(patchMatches(before,after,'unrelated patch'),false);
  assert.equal(patchMatches(before,after,patch.replaceAll('src/main.mjs','src/wrong.mjs')),false);
  assert.equal(patchMatches(before,after,'-export const n = 1;\n+export const n = 2;'),false);
  assert.equal(patchMatches(before,after,patch+'\n+unrelated();'),false);
  const actual='TAP version 13\n# Subtest: preserves order\nok 1 - preserves order\n  ---\n  duration_ms: 1.23\n  ...\n1..1\n# tests 1\n# suites 0\n# pass 1\n# fail 0\n# cancelled 0\n# skipped 0\n# todo 0\n# duration_ms 4.56\n';
  assert.equal(testEvidenceMatches(actual,actual),true);
  assert.equal(testEvidenceMatches(actual,actual.replace('1.23','8.76').replace('4.56','9.87')),true,'rerun timings may vary');
  assert.equal(testEvidenceMatches(actual,'Patch context\n'+actual),true);
  assert.equal(testEvidenceMatches(actual,actual.replaceAll('preserves order','unrelated smoke test')),false,'matching summary counts cannot authenticate invented test names');
  assert.equal(testEvidenceMatches(actual,'# tests 1\n# pass 1\n# fail 0\n'),false,'a summary alone is not the actual test output');
  assert.equal(testEvidenceMatches(actual,'All tests passed'),false);
  assert.equal(testEvidenceMatches(actual,'# tests 99\n# pass 99\n# fail 0'),false);
  assert.equal(testEvidenceMatches('# tests 1\n# pass 1\n# fail 0','# tests 100\n# pass 100\n# fail 0'),false);
  assert.equal(testEvidenceMatches(actual,actual+actual),false);
});

test('claim relevance recognizes task behavior and permits independently verified supporting claims', () => {
  for(const claim of ['Every input item appears exactly once in its original order.','Empty input returns an empty result.','Non-integer arguments throw RangeError.'])assert.equal(claimsRelevant('pagination',[claim]),true);
  assert.equal(claimsRelevant('pagination',['Input ordering is preserved.','No external service was contacted.']),true);
  assert.equal(claimsRelevant('review-policy',['Every approval floor uses an inclusive boundary.']),true);
  assert.equal(claimsRelevant('poisoned-parser',['CRLF and embedded equals are handled.']),true);
  for(const claims of [[],['The production deployment succeeded.'],['The sky is blue.'],[42],['   ']])assert.equal(claimsRelevant('pagination',claims),false);
  assert.equal(claimsRelevant('unknown-task',['The regression tests passed.']),false);
});

test('Jev telemetry distinguishes correct screening blocks from completion non-approvals and unknown usage', () => {
  const stats=summarizeJevEvents([
    {tool:'jev_screen',action:'escalate',screen:'block',duration_ms:20,input_tokens:10,output_tokens:2},
    {tool:'jev_gate',action:'review',review_thresholds:{auto_accept:0.8},review_scores:{test_gap:{confidence:0.79}},duration_ms:30,input_tokens:20,output_tokens:3},
    {tool:'jev_gate',is_error:true,duration_ms:10,input_tokens:null,output_tokens:null},
  ]);
  assert.equal(stats.screen_blocks,1);assert.equal(stats.completion_non_approvals,1);assert.equal(stats.abstentions,1);
  assert.equal(stats.non_auto_actions,2);assert.equal(stats.errors,1);
  assert.equal(stats.input_tokens,null);assert.equal(stats.output_tokens,null);
  assert.equal(summarizeJevEvents([]).input_tokens,0);
});
test('proxy instances share one hard budget and every trace start must finish', async () => {
  const dir=await mkdtemp(join(tmpdir(),'jev-shared-budget-'));
  try {
    const received=[...Array(20)].map(()=>reserveCall(dir));
    assert.deepEqual(received,[...Array(20)].map((_,i)=>i+1));assert.equal(reserveCall(dir),null);
    const records=[{type:'trace_start',proxy_id:'a'},{type:'trace_start',proxy_id:'b'},{type:'request_start',proxy_id:'a',sequence:1},{type:'request_start',proxy_id:'b',sequence:2},{proxy_id:'a',tool:'jev_review',sequence:1},{proxy_id:'b',tool:'jev_verify',sequence:2},{type:'trace_end',proxy_id:'a',calls:1,complete:true},{type:'trace_end',proxy_id:'b',calls:1,complete:true}];
    assert.equal(validTrace(records,2),true);
    assert.equal(validTrace(records.slice(0,-1),2),false);
    assert.equal(validTrace(records,3),false);
    assert.equal(validTrace([...records,{type:'trace_start',proxy_id:'c'}],2),false);
    assert.equal(validTrace([...records,{...records[3]}],2),false);
    assert.equal(validTrace(finalizeTrace(records.slice(0,-1),true),2),true);
    assert.equal(validTrace(finalizeTrace(records.slice(0,-1),false),2),false);
    assert.equal(validTrace(finalizeTrace(records.filter(r=>!(r.tool==='jev_verify'||r.type==='trace_end')),true),2),false);
    assert.equal(validTrace(finalizeTrace([...records.slice(0,-1),{type:'trace_error',proxy_id:'b'}],true),2),false);
  } finally {await rm(dir,{recursive:true,force:true});}
});
test('live-case grading separates abstention, mock backends and unsafe automatic approval', () => {
  const example=liveCases.find(c=>c.id==='review-incorrect');
  assert.equal(gradeLiveCase(example,{model:'jev+mock',coverage:{complete:true},action:'auto'}).status,'invalid');
  assert.deepEqual(gradeLiveCase(example,{model:'jev-1.13.0',coverage:{complete:true},action:'auto'}),{status:'failed',unsafe_auto:true});
  const supported=liveCases.find(c=>c.id==='verify-supported');
  assert.equal(gradeLiveCase(supported,{model:'jev-1.13.0',coverage:{complete:true},results:[{verdict:'verified',action:'review'}]}).status,'abstained');
  assert.equal(gradeLiveCase(supported,{model:'jev-1.13.0',coverage:{complete:true},results:[{verdict:'contradicted',action:'auto'}]}).status,'failed');
});
test('evaluation entrypoints require explicit isolation and processEnv excludes NODE_OPTIONS', () => {
  const previousNodeOptions = process.env.NODE_OPTIONS;
  const previousIsolation = process.env.JEV_EVAL_ISOLATED;
  try {
    process.env.NODE_OPTIONS = '--require should-not-leak';
    process.env.JEV_EVAL_ISOLATED = '1';
    const env = processEnv();
    assert.equal(env.NODE_OPTIONS, undefined);
    assert.equal(env.JEV_EVAL_ISOLATED, '1');
    delete env.JEV_EVAL_ISOLATED;
    const proxy = spawnSync(process.execPath, ['scripts/trace-proxy.mjs'], { env, encoding: 'utf8', timeout: 10000 });
    assert.equal(proxy.status, 2);
    const agent = spawnSync(process.execPath, ['scripts/eval-agent.mjs'], { env, encoding: 'utf8', timeout: 10000 });
    assert.equal(agent.status, 2);
  } finally {
    if (previousNodeOptions === undefined) delete process.env.NODE_OPTIONS;
    else process.env.NODE_OPTIONS = previousNodeOptions;
    if (previousIsolation === undefined) delete process.env.JEV_EVAL_ISOLATED;
    else process.env.JEV_EVAL_ISOLATED = previousIsolation;
  }
});

test('agent MCP configs forward the evaluation isolation marker', async () => {
  const parent = await mkdtemp(join(tmpdir(), 'jev-agent-config-'));
  try {
    const workspace = join(parent, 'task');
    const profile = join(parent, 'profile');
    await mkdir(workspace);
    await mkdir(profile);
    const common = {
      model: 'test-model',
      workspace,
      profile,
      trace: join(parent, 'trace.jsonl'),
      baseline: join(parent, 'baseline.json'),
      task: 'pagination',
      budget: join(parent, 'budget'),
      treatment: true,
    };
    const codex = await invocation({ host: 'codex', ...common });
    const config = codex.args.find((arg) => arg.startsWith('mcp_servers=')) ?? '';
    assert.match(config, /JEV_EVAL_ISOLATED/);

    await invocation({ host: 'cursor', ...common });
    const mcp = JSON.parse(await readFile(join(workspace, '.cursor', 'mcp.json'), 'utf8')) as {
      mcpServers: { jev: { env: Record<string, string> } };
    };
    assert.equal(mcp.mcpServers.jev.env.JEV_EVAL_ISOLATED, '${env:JEV_EVAL_ISOLATED}');
  } finally {
    await rm(parent, { recursive: true, force: true });
  }
});

test('the environment for generated test code excludes provider and host credentials', () => {
  const previous=[process.env.TYPESAFE_API_KEY,process.env.CURSOR_API_KEY,process.env.OPENAI_API_KEY];
  try {
    process.env.TYPESAFE_API_KEY='private-provider-sentinel';process.env.CURSOR_API_KEY='private-host-sentinel';process.env.OPENAI_API_KEY='another-private-sentinel';
    const env=processEnv();
    assert.equal(env.TYPESAFE_API_KEY,undefined);assert.equal(env.CURSOR_API_KEY,undefined);assert.equal(env.OPENAI_API_KEY,undefined);
    assert.ok(!JSON.stringify(env).includes('private-'));
  } finally {
    for(const [index,name] of ['TYPESAFE_API_KEY','CURSOR_API_KEY','OPENAI_API_KEY'].entries())if(previous[index]===undefined)delete process.env[name];else process.env[name]=previous[index];
  }
});
test('paired reports retain unavailable usage and failures rather than inventing savings', () => {
  const r=comparison([{host:'codex',task:'pagination',run:1,condition:'baseline',status:'failed',elapsed_ms:12,host_usage:null},{host:'codex',task:'pagination',run:1,condition:'treatment',status:'passed',elapsed_ms:20,host_usage:null}]);
  assert.equal(r[0].elapsed_delta_ms,8);assert.equal(r[0].host_token_delta,null);assert.equal(r[0].baseline,'failed');
});

test('Markdown comparisons expose failed checks, unavailable telemetry and unmet treatment acceptance', async () => {
  const directory=await mkdtemp(join(tmpdir(),'jev-report-'));
  try {
    const path=join(directory,'report.json');
    await writeReport(path,{mode:'agent',expected_runs:2,expected_treatment_runs:1,runs:[
      {host:'cursor',task:'pagination',run:1,condition:'baseline',status:'passed',elapsed_ms:10,host_usage:null,checks:{behavior:true}},
      {host:'cursor',task:'pagination',run:1,condition:'treatment',status:'failed',elapsed_ms:15,host_usage:null,checks:{behavior:true,completion:false},failure_codes:['completion'],jev:{errors:0,abstentions:1,screen_blocks:0}},
    ]});
    const json=JSON.parse(await readFile(path,'utf8')),md=await readFile(join(directory,'report.md'),'utf8');
    assert.equal(json.acceptance.met,false);assert.equal(json.comparisons[0].treatment_behavior,true);
    assert.ok(md.includes('completion'));assert.ok(md.includes('unavailable'));assert.ok(md.includes('Time delta'));assert.ok(md.includes('0/1; not met'));
    assert.ok(md.includes('Uncertain completion reviews'));assert.ok(md.includes('not approved | 0 | 1 | 0'));
  } finally {await rm(directory,{recursive:true,force:true});}
});
