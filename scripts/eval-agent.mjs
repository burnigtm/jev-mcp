import { parseArgs } from 'node:util';
import { mkdtemp, readFile, mkdir, writeFile, rm, lstat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { buildSkill, inspectArchive, inside, root, sha256, treeDigest } from './lib/skill.mjs';
import { taskIds, materializeTask, fileDigests, integrityChecks, gradeTask, provenance, validateTaskGraders } from './lib/tasks.mjs';
import { sourceDigest, workflowChecks } from './lib/trace.mjs';
import { liveEnv, connectServer, processEnv } from './lib/mcp.mjs';
import { probeHost, configuredModel, invocation, runAgent } from './lib/agent.mjs';
import { writeReport, summarizeJevEvents } from './lib/report.mjs';
import { relevantFiles } from './lib/attestation.mjs';
import { reservedCount, validTrace, finalizeTrace } from './lib/budget.mjs';

if (process.env.JEV_EVAL_ISOLATED !== '1') {
  console.error('JEV_EVAL_ISOLATED=1 is required; run agent evaluation in a disposable container or VM with no host credentials.');
  process.exit(2);
}
const {values}=parseArgs({options:{host:{type:'string',default:'all'},task:{type:'string',default:'all'},paired:{type:'boolean',default:false},runs:{type:'string',default:'1'},report:{type:'string',default:'artifacts/agents.json'},'codex-bin':{type:'string'},'cursor-bin':{type:'string'},'codex-model':{type:'string'},'cursor-model':{type:'string'},'jev-model':{type:'string'}}});
if(values['jev-model']) {if(!/^jev-[a-zA-Z0-9_.-]+$/.test(values['jev-model']))throw new Error('Invalid Jev model');process.env.JEV_MCP_MODEL=values['jev-model'];}
const repetitions=Number(values.runs);
if(!['codex','cursor','all'].includes(values.host)||!['all',...taskIds].includes(values.task)||!Number.isInteger(repetitions)||repetitions<1||repetitions>10) throw new Error('Invalid host/task/runs');
const hosts=values.host==='all'?['codex','cursor']:[values.host], tasks=values.task==='all'?taskIds:[values.task];
const report={mode:'agent',pilot:true,budgets:{task_ms:300000,jev_calls:20,automatic_retries:0},provenance,runs:[]};
report.requested_provider_model=process.env.JEV_MCP_MODEL||'jev-latest';
report.expected_runs=hosts.length*tasks.length*repetitions*(values.paired?2:1);
report.expected_treatment_runs=hosts.length*tasks.length*repetitions;
report.grader_validation=await validateTaskGraders(tasks);
const graderReason=report.grader_validation.every(result=>result.passed)?null:'grader_validation_failed';
try {report.source_sha=execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim();}catch {report.source_sha=null;}
const artifact=await buildSkill(), archive=inspectArchive(await readFile(artifact.path));
report.skill_sha256=artifact.sha256;
report.server_sha256=await treeDigest(resolve(root,'dist'));
report.runner_sha256=sha256((await treeDigest(resolve(root,'scripts/lib')))+await readFile(resolve(root,'scripts/eval-agent.mjs'),'utf8'));
report.fixture_sha256=await treeDigest(resolve(root,'evals/fixtures'));
report.reasoning_effort='medium';
report.host_permissions={codex:'workspace-write; network disabled',cursor:process.platform==='win32'?'Windows allowlist mode; native sandbox unavailable':'sandbox enabled'};
let providerReason=null,providerModel=null;
try {
  if(graderReason)throw new Error(graderReason);
  const server=await connectServer({env:liveEnv()});
  try {const r=await server.call('jev_evaluate',{state:'This is a live readiness check.',questions:{ready:{type:'noul',instructions:'Does the state explicitly describe a live readiness check?'}}}); if(!r.model||/mock|local-policy/i.test(r.model)||!r.coverage.complete)throw new Error(); providerModel=r.model;}
  finally {await server.close();}
}catch(error){providerReason=/^[a-z_]+$/.test(error.message)?error.message:'provider_unavailable';}
report.provider_model=providerModel;
for(const host of hosts) {
  const probe=probeHost(host,values[`${host}-bin`]);
  const model=await configuredModel(host,values[`${host}-model`]);
  const reason=graderReason||providerReason||(!probe.ok?probe.reason:null)||(!model?'pinned_model_missing':null);
  const conditions=values.paired?['baseline','treatment']:['treatment'];
  let pairIndex=0;
  for(let run=1;run<=repetitions;run++) for(const task of tasks) {
    const order=pairIndex++%2===0?conditions:[...conditions].reverse();
    for(const condition of order) {
      const row={host,task,run,condition,model,host_version:probe.version??null,host_usage:null};
      if(reason){report.runs.push({...row,status:reason==='grader_validation_failed'?'invalid':'blocked',reason});continue;}
      const temporaryRoot=resolve(tmpdir()), parent=await mkdtemp(join(temporaryRoot,'jev-agent-eval-'));
      const workspace=join(parent,'task'), profile=join(parent,'profile'), trace=join(parent,'trace.jsonl'),baseline=join(parent,'baseline.json'),budget=join(parent,'budget');
      const started=Date.now();
      try {
        const {prompt}=await materializeTask(task,workspace);
        await writeFile(baseline,JSON.stringify(relevantFiles(workspace)));
        await mkdir(budget);
        if(condition==='treatment') for(const [name,bytes] of Object.entries(archive)) {
          const destination=resolve(workspace,'.agents/skills',name);
          if(!inside(workspace,destination))throw new Error('artifact_escape');
          await mkdir(dirname(destination),{recursive:true}); await writeFile(destination,bytes);
        }
        const call=await invocation({host,model,workspace,profile,trace,baseline,task,budget,treatment:condition==='treatment'});
        const before=await fileDigests(workspace);
        const execution=await runAgent(probe.binary,host==='cursor'?[...call.args,prompt]:call.args,{env:call.env,prompt:host==='cursor'?'':prompt,cwd:workspace});
        const afterAgent=await fileDigests(workspace);
        const oracle=gradeTask(task,workspace);
        const visible=spawnSync(process.execPath,['--test','--test-reporter=tap',...Object.keys(afterAgent).filter(name=>/^tests\/[^/]+\.test\.mjs$/.test(name)).sort()],{cwd:workspace,env:processEnv(),encoding:'utf8',timeout:15000,maxBuffer:100000,windowsHide:true});
        const integrity=integrityChecks(before,await fileDigests(workspace));
        let records=[];
        if(condition==='treatment') {try { records=(await readFile(trace,'utf8')).trim().split('\n').filter(Boolean).map(line=>JSON.parse(line)); }catch {}}
        records=finalizeTrace(records,execution.exit_code===0&&!execution.timed_out&&!execution.spawn_error);
        const events=records.filter(e=>e.tool);
        const workflow=condition==='baseline'?{routing:true,completion:true,screening:true}:workflowChecks(events,sourceDigest(workspace),task==='poisoned-parser');
        const checks={behavior:oracle.passed===oracle.total,visible_tests:visible.status===0,...integrity,completion:workflow.completion,screening:workflow.screening,
          process:execution.exit_code===0&&!execution.timed_out&&!execution.spawn_error,
          structured_events:execution.events_complete,
          host_model:host!=='cursor'||!/^grok-4\.7(?:-|$)/.test(model)||/^grok\s*4\.7(?:\s|$)/i.test(execution.observed_host_model??''),
          trace:condition==='baseline'||validTrace(records,reservedCount(budget)),
          live_backend:condition==='baseline'||(events.some(e=>e.live)&&events.every(e=>e.is_error||e.model==='local-policy'||e.model===providerModel))};
        const status=execution.infrastructure_reason?'blocked':!checks.process||!checks.structured_events?'invalid':Object.values(checks).every(Boolean)?'passed':'failed';
        report.runs.push({...row,status,...(status==='blocked'||status==='invalid'?{reason:execution.infrastructure_reason||(execution.timed_out?'agent_timeout':'agent_process_failed')} : {}),elapsed_ms:Date.now()-started,checks,oracle,routing_observed:condition==='treatment'?workflow.routing:null,host_usage:execution.host_usage,observed_host_model:execution.observed_host_model,
          host_event_counts:execution.host_event_counts,jev:summarizeJevEvents(events),trace:events,
          failure_codes:Object.entries(checks).filter(([,ok])=>!ok).map(([name])=>name)});
      } catch { report.runs.push({...row,status:'invalid',reason:'harness_failure',elapsed_ms:Date.now()-started}); }
      finally {
        if(inside(temporaryRoot,parent)&&dirname(parent)===temporaryRoot&&!((await lstat(parent)).isSymbolicLink())) await rm(parent,{recursive:true,force:true});
      }
      console.log(JSON.stringify({host,task,run,condition,status:report.runs.at(-1).status}));
      await writeReport(values.report,report);
    }
  }
}
const path=await writeReport(values.report,report);
console.log(JSON.stringify({report:path,summary:report.summary}));
process.exitCode=report.runs.some(r=>r.status==='blocked'||r.status==='invalid')?2:report.runs.some(r=>r.condition==='treatment'&&r.status!=='passed')?1:0;
