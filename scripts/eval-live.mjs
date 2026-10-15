import { parseArgs } from 'node:util';
import { liveEnv, connectServer } from './lib/mcp.mjs';
import { prepareLiveCases, gradeLiveCase, liveDiagnostics } from './lib/live-cases.mjs';
import { writeReport } from './lib/report.mjs';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { root, sha256 } from './lib/skill.mjs';
const {values}=parseArgs({options:{report:{type:'string',default:'artifacts/live.json'},'jev-model':{type:'string'}}});
if(values['jev-model']){if(!/^jev-[a-zA-Z0-9_.-]+$/.test(values['jev-model']))throw new Error('Invalid Jev model');process.env.JEV_MCP_MODEL=values['jev-model'];}
const cases=await prepareLiveCases();
const report={mode:'live',requested_provider_model:process.env.JEV_MCP_MODEL||'jev-latest',oracle_validation:'broken fixture fails; reference passes',runs:[]}; let server;
try { server=await connectServer({env:liveEnv()}); }
catch(error) { report.runs.push({id:'preflight',status:'blocked',reason:/^[a-z_]+$/.test(error.message)?error.message:'provider_unavailable'}); }
if(server) {
  try {
    for(const test of cases) {
      const started=Date.now();
      try {
        const r=await server.call(test.tool,test.args),outcome=gradeLiveCase(test,r);
        let host_execution=null;
        if(test.id==='route-source'&&outcome.status==='passed') {
          const expected=test.args.candidates[0];
          if(r.action!=='auto'||r.call.name!==expected.name||JSON.stringify(r.call.arguments)!==JSON.stringify(expected.arguments)) {
            outcome.status='failed';outcome.unsafe_auto=true;outcome.reason='returned_call_mismatch';
          } else {
            // Execute only the exact read whose schema, authorization and local
            // prerequisite the host validated before preparing the candidate.
            const bytes=await readFile(resolve(root,r.call.arguments.path));
            host_execution={tool:'read_file',executed:true,bytes:bytes.length,sha256:sha256(bytes)};
            if(!bytes.length){outcome.status='invalid';outcome.reason='empty_routing_fixture';}
          }
        }
        report.runs.push({id:test.id,tool:test.tool,...outcome,host_execution,elapsed_ms:Date.now()-started,model:r.model,usage:r.usage,action:r.action,diagnostics:liveDiagnostics(r)});
      }
      catch { report.runs.push({id:test.id,tool:test.tool,status:'service_error',elapsed_ms:Date.now()-started}); }
    }
  } finally { await server.close(); }
}
const path=await writeReport(values.report,report);
console.log(JSON.stringify({report:path,summary:report.summary}));
process.exitCode=report.runs.some(r=>r.status==='blocked')?2:report.runs.some(r=>r.status!=='passed')?1:0;
