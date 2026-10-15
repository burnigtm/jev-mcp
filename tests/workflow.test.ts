import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createServer } from 'node:http';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { connectServer, processEnv } from '../scripts/lib/mcp.mjs';
import { materializeTask, taskSource, gradeTask } from '../scripts/lib/tasks.mjs';

function judgment(request:any) {
  const answers:any={};
  for(const [id,q] of Object.entries(request.questions) as any) {
    if(q.type==='noul'){answers[id]={type:'noul',noul:['needs_more_context','needs_generation','tests_likely_fail','injection'].includes(id)?0.01:0.99};continue;}
    const keys=Object.keys(q.criteria);
    if(q.type==='choice') {
      const winner=id==='selected'?'call_0':id==='next'?'continue':id==='model_tier'?'cheap':id==='focus'?'read':id.startsWith('claim_')?'verified':keys[0];
      answers[id]={type:'choice',choice:winner,confidence:1,probabilities:Object.fromEntries(keys.map(k=>[k,k===winner?1:0]))};
    } else {
      const value=['correctness','spec_match'].includes(id)?2:0;
      answers[id]={type:'score',score:value,confidence:1,probabilities:Object.fromEntries(keys.map(k=>[k,Number(k)===value?1:0])),legend:Object.fromEntries(keys.map(k=>[k,q.criteria[k]]))};
    }
  }
  return {model:'fixture-replay',usage:{input_tokens:100,output_tokens:10},answers};
}
test('deterministic replay executes a real repair through stdio and loopback HTTP', {timeout:60000}, async () => {
  const requests:any[]=[],api=createServer(async(req,res)=>{const parts:Buffer[]=[];for await(const part of req)parts.push(Buffer.from(part));const payload=JSON.parse(Buffer.concat(parts).toString());requests.push(payload);res.setHeader('Content-Type','application/json');res.end(JSON.stringify(judgment(payload)));});
  await new Promise<void>(resolve=>api.listen(0,'127.0.0.1',resolve));
  const address=api.address();assert.ok(address&&typeof address!=='string');
  const dir=await mkdtemp(join(tmpdir(),'jev replay '));
  const server=await connectServer({args:['--import','tsx','src/index.ts'],env:processEnv({TYPESAFE_API_KEY:'fixture-only',TYPESAFE_BASE_URL:`http://127.0.0.1:${address.port}`,JEV_MCP_MOCK:'0'})});
  try {
    await materializeTask('pagination',dir);
    const args={path:'src/main.mjs'};
    const candidate={id:'read',name:'read_file',arguments:args,description:'Read the pagination function',effect:'read_only',authorized:true,schema_valid:true,preconditions_met:true};
    const result=await server.call('jev_step',{task:'Repair pagination',observation:'Read the source before changing it',execution:{context_complete:true},candidates:[candidate]});
    assert.equal(result.handoff,'execute_tool');assert.deepEqual(result.call.arguments,args);
    const source=await readFile(join(dir,result.call.arguments.path),'utf8');
    assert.equal(source,await taskSource('pagination'));
    assert.ok(!JSON.stringify(requests[0].state).includes('src/main.mjs'),'argument values stay outside provider state');
    const fixed=await taskSource('pagination',true);await writeFile(join(dir,'src/main.mjs'),fixed);
    const oracle=gradeTask('pagination',dir);assert.equal(oracle.passed,oracle.total);
    const log=`Independent executable tests: ${oracle.passed} passed, 0 failed.`;
    const gate=await server.call('jev_gate',{request:'Fix pagination',diff:`-${source}\n+${fixed}`,claims:['Independent executable tests passed.'],evidence:log,tests:log});
    assert.equal(gate.action,'auto');assert.equal(gate.verification.results[0].verdict,'verified');
    const failed=await server.call('jev_step',{task:'Repair pagination',observation:'The unchanged call failed twice',execution:{context_complete:true,failed_attempts:2},candidates:[candidate]});
    assert.equal(failed.call,null);assert.equal(failed.partner_model.required,false);
    const blocked=await server.call('jev_tool_route',{task:'Publish',observation:'External write',candidates:[{...candidate,effect:'external_write'}]});
    assert.equal(blocked.call,null);assert.notEqual(blocked.action,'auto');
  } finally {await server.close();api.closeAllConnections();await new Promise<void>(resolve=>api.close(()=>resolve()));await rm(dir,{recursive:true,force:true});}
});
