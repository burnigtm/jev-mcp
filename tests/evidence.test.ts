import assert from 'node:assert/strict';
import {test} from 'node:test';
import {mkdtemp,rm,writeFile,readFile,mkdir,stat,symlink} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
import {applyPatch} from 'diff';
import {main,unifiedPatch,callPrepared,cleanEnv} from '../skills/jev-mcp/scripts/evidence.mjs';
import {materializeTask,taskSource,gradeTask} from '../scripts/lib/tasks.mjs';
import {relevantFiles,patchMatches,attest} from '../scripts/lib/attestation.mjs';
import {processEnv} from '../scripts/lib/mcp.mjs';
import {root,buildSkill,inspectArchive} from '../scripts/lib/skill.mjs';

// npm test runs before the production build in a clean checkout. Resolve the
// loader absolutely: the extracted helper starts its server from another cwd.
const require=createRequire(import.meta.url);
const serverArgs=['--import',pathToFileURL(require.resolve('tsx')).href,join(root,'src/index.ts')];

test('extracted dependency-free helper produces attested evidence and calls the real MCP protocol', {timeout:30000}, async()=>{
  const parent=await mkdtemp(join(tmpdir(),'jev evidence with spaces ')),workspace=join(parent,'task');
  try {
    await materializeTask('pagination',workspace);
    const artifact=await buildSkill(join(parent,'archive')),entries=inspectArchive(await readFile(artifact.path));
    for(const [name,bytes]of Object.entries(entries)){const path=join(workspace,'.agents/skills',name);await mkdir(resolve(path,'..'),{recursive:true});await writeFile(path,bytes as Uint8Array);}
    const helper=join(workspace,'.agents/skills/jev-mcp/scripts/evidence.mjs');
    const run=(args:string[],extra={})=>spawnSync(process.execPath,[helper,...args],{cwd:workspace,env:processEnv(extra),encoding:'utf8',timeout:15000});
    const before=relevantFiles(workspace),baseline=join(parent,'baseline.json');await writeFile(baseline,JSON.stringify(before));
    assert.equal(run(['snapshot']).status,0);
    await writeFile(join(workspace,'src/main.mjs'),await taskSource('pagination',true));
    await writeFile(join(workspace,'tests/regression.test.mjs'),`import assert from 'node:assert/strict';import {test} from 'node:test';import {paginate} from '../src/main.mjs';test('empty, exact multiples, boundaries, ordering and invalid sizes',()=>{assert.equal(process.env.TYPESAFE_API_KEY,undefined);assert.equal(process.env.CURSOR_API_KEY,undefined);for(const n of [0,1,2,3,4,5,6,7]){const a=Array.from({length:n},(_,i)=>i),p=paginate(a,3);assert.deepEqual(p.flat(),a);assert.equal(p.length,Math.ceil(n/3));assert.ok(p.every(x=>x.length>0));}for(const size of [0,-1,1.5,NaN,Infinity,'2',null])assert.throws(()=>paginate([1],size),RangeError);});\n`);
    const collected=run(['collect','--request-file','requirements.txt','--',process.execPath,'--test','--test-reporter=tap'],{TYPESAFE_API_KEY:'private-test-sentinel',CURSOR_API_KEY:'private-host-sentinel'});
    assert.equal(collected.status,0,collected.stderr);
    const args=JSON.parse(await readFile(join(workspace,'.task-evidence/gate.json'),'utf8'));
    assert.equal(patchMatches(before,relevantFiles(workspace),args.diff),true);
    assert.deepEqual(attest(workspace,baseline,'pagination',args),{diff_matches:true,evidence_matches:true,claims_relevant:true});
    assert.equal(gradeTask('pagination',workspace).passed,148);
    assert.equal(run(['snapshot']).status,1,'the original snapshot cannot be replaced after editing');
    const connection=join(parent,'host-connection.json');
    await writeFile(connection,JSON.stringify({command:process.execPath,args:serverArgs}));
    const judged=run(['judge','--connection',connection],{JEV_MCP_MOCK:'1'});
    assert.equal(judged.status,0,judged.stderr);assert.match(JSON.parse(judged.stdout).model,/mock/);
    assert.ok(!JSON.stringify(args).includes('private-test-sentinel'));
    assert.equal(await readFile(join(workspace,'.task-evidence/.gitignore'),'utf8'),'*\n');
    if(process.platform!=='win32') {
      assert.equal((await stat(join(workspace,'.task-evidence/gate.json'))).mode & 0o777,0o600);
      const secret=join(parent,'secret.txt');
      await writeFile(secret,'do-not-send-this-secret');
      await symlink(secret,join(workspace,'external-issue.txt'));
      const screened=run(['screen','--connection',connection,'--text-file','external-issue.txt'],{JEV_MCP_MOCK:'1'});
      assert.equal(screened.status,1);
      assert.ok(!screened.stdout.includes('do-not-send-this-secret'));
    }
    await writeFile(join(workspace,'.jev-connection.json'),JSON.stringify({command:process.execPath,args:serverArgs}));
    const refused=run(['judge','--connection','.jev-connection.json'],{JEV_MCP_MOCK:'1'});
    assert.equal(refused.status,1);
    assert.match(refused.stderr,/untrusted_connection/);
    const trusted=run(['judge','--connection','.jev-connection.json','--trust-connection'],{JEV_MCP_MOCK:'1'});
    assert.equal(trusted.status,0,trusted.stderr);
    await writeFile(join(workspace,'tests/failing.test.mjs'),`throw new Error('deliberate test failure');\n`);
    assert.equal(run(['collect','--request-file','requirements.txt','--',process.execPath,'--test','--test-reporter=tap']).status,1);
    assert.match(JSON.parse(await readFile(join(workspace,'.task-evidence/gate.json'),'utf8')).tests,/# fail 1/);
  } finally {await rm(parent,{recursive:true,force:true});}
});

test('generated patches apply exactly for additions, deletions, line endings, multi-hunk edits and configurable context',()=>{
  for(const [a,b]of [['one\ntwo\nthree\n','one\nchanged\nthree\n'],['one\r\ntwo\r\n','one\r\nthree\r\n'],['one','two'],['one\n','one'],['one','one\n'],['','added\n'],['gone\n','']]) {
    const patch=unifiedPatch({'src/main.mjs':a},{'src/main.mjs':b});
    assert.equal(applyPatch(a.replaceAll('\r\n','\n'),patch),b.replaceAll('\r\n','\n'));
  }
  assert.equal(patchMatches({}, {'tests/new.test.mjs':'test();\n'},unifiedPatch({}, {'tests/new.test.mjs':'test();\n'})),true);
  assert.equal(patchMatches({'tests/old.test.mjs':'old();\n'}, {},unifiedPatch({'tests/old.test.mjs':'old();\n'},{})),true);

  const lines=Array.from({length:40},(_,i)=>`const line_${i} = ${i};`);
  const beforeText=lines.join('\n')+'\n';
  const modified=[...lines];
  modified[2]='const line_2 = "first edit";';
  modified[35]='const line_35 = "second edit";';
  const afterText=modified.join('\n')+'\n';
  const multiHunk=unifiedPatch({'src/main.mjs':beforeText},{'src/main.mjs':afterText},3);
  assert.equal((multiHunk.match(/^@@ /gm)??[]).length,2,'distant edits emit separate hunks when context is small');
  assert.equal(patchMatches({'src/main.mjs':beforeText},{'src/main.mjs':afterText},multiHunk),true);
  const wideContext=unifiedPatch({'src/main.mjs':beforeText},{'src/main.mjs':afterText},20);
  assert.equal((wideContext.match(/^@@ /gm)??[]).length,1,'wider context merges nearby hunks so enclosing functions stay visible');
  assert.equal(patchMatches({'src/main.mjs':beforeText},{'src/main.mjs':afterText},wideContext),true);
});

test('the helper refuses bad schemas and missing servers without hanging or leaking diagnostics', {timeout:15000},async()=>{
  const old=process.env.JEV_MCP_MOCK;process.env.JEV_MCP_MOCK='1';
  try {await assert.rejects(callPrepared({command:process.execPath,args:serverArgs},'jev_gate',{request:'x',diff:'x',claims:[],evidence:'x'}),/schema_mismatch/);}
  finally {if(old===undefined)delete process.env.JEV_MCP_MOCK;else process.env.JEV_MCP_MOCK=old;}
  await assert.rejects(callPrepared({command:'jev-nonexistent-server-command',args:[]},'jev_gate',{}),/mcp_connection_failed/);
  assert.equal(cleanEnv().TYPESAFE_API_KEY,undefined);
});
