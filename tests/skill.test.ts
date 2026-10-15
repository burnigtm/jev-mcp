import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join, dirname } from 'node:path';
import { archive, buildSkill, examples, frontmatter, inspectArchive, inspectSkill, root, sha256, skillFiles } from '../scripts/lib/skill.mjs';
import { connectServer, processEnv } from '../scripts/lib/mcp.mjs';
import { evaluateInputSchema } from '../src/tools/evaluate.ts';
import { codingLoopInputSchema } from '../src/tools/coding-loop.ts';
import { toolRouteInputSchema } from '../src/tools/tool-route.ts';
import { stepInputSchema } from '../src/tools/step.ts';
import { reviewInputSchema } from '../src/tools/review.ts';
import { verifyInputSchema } from '../src/tools/verify.ts';
import { gateInputSchema } from '../src/tools/gate.ts';
import { screenInputSchema } from '../src/tools/screen.ts';
import { rankInputSchema } from '../src/tools/rank.ts';
import { spawnSync } from 'node:child_process';

test('standalone ZIP is reproducible, licensed and valid after isolated extraction', async () => {
  const directory=await mkdtemp(join(tmpdir(),'jev skill with spaces '));
  try {
    const first=await buildSkill(join(directory,'first')),second=await buildSkill(join(directory,'second'));
    assert.equal(first.sha256,second.sha256);
    const entries=inspectArchive(await readFile(first.path));
    assert.equal(sha256(await readFile(first.path)),first.sha256);
    assert.equal(await readFile(first.path+'.sha256','utf8'),`${first.sha256}  jev-mcp-skill-${first.version}.zip\n`);
    for(const [name,bytes] of Object.entries(entries)) {const path=resolve(directory,'extracted',name);await mkdir(dirname(path),{recursive:true});await writeFile(path,bytes as Uint8Array);}
    const copied=await inspectSkill(join(directory,'extracted/jev-mcp'));
    assert.equal(Buffer.from(copied.LICENSE).toString(),await readFile(join(root,'LICENSE'),'utf8'));
    assert.equal(Object.keys(copied).length,skillFiles.length);
    assert.throws(()=>inspectArchive(archive({'../../escape':new Uint8Array()})));
    assert.throws(()=>frontmatter('---\nname: jev-mcp\nname: other\ndescription: ok\n---\n'));
    assert.throws(()=>frontmatter('---\nname: jev-mcp\ndescription: ""\n---\n'));
    await writeFile(join(directory,'extracted/jev-mcp/SKILL.md'),'---\nname: jev-mcp\ndescription: test\n---\n[escape](../../outside.md)\n');
    await assert.rejects(inspectSkill(join(directory,'extracted/jev-mcp')),/Escaping/);
    await writeFile(join(directory,'extracted/jev-mcp/.env'),'SECRET=never ship');
    await assert.rejects(inspectSkill(join(directory,'extracted/jev-mcp')),/Unexpected/);
  } finally {await rm(directory,{recursive:true,force:true});}
});

test('archive metadata is independent of the build machine time zone', () => {
  const module=new URL('../scripts/lib/skill.mjs',import.meta.url).href;
  const script=`import {archive,sha256} from ${JSON.stringify(module)}; console.log(sha256(archive({'SKILL.md':new Uint8Array([1,2,3])})));`;
  const hashes=['UTC','America/Los_Angeles','Asia/Tokyo'].map(TZ=>{
    const run=spawnSync(process.execPath,['--input-type=module','-e',script],{env:processEnv({TZ}),encoding:'utf8',timeout:10000});
    assert.equal(run.status,0);return run.stdout.trim();
  });
  assert.equal(new Set(hashes).size,1);
});

test('every documented request validates and executes against actual MCP schemas', {timeout:60000}, async () => {
  const schemas={jev_evaluate:evaluateInputSchema,jev_coding_loop:codingLoopInputSchema,jev_tool_route:toolRouteInputSchema,jev_step:stepInputSchema,jev_review:reviewInputSchema,jev_verify:verifyInputSchema,jev_gate:gateInputSchema,jev_screen:screenInputSchema,jev_rank:rankInputSchema};
  const requests=examples(await readFile(join(root,'skills/jev-mcp/references/tools.md'),'utf8'));
  assert.deepEqual([...new Set(requests.map(r=>r.name))].sort(),Object.keys(schemas).sort());
  const server=await connectServer({args:['--import','tsx','src/index.ts'],env:processEnv({JEV_MCP_MOCK:'1'})});
  try {
    for(const request of requests) {
      schemas[request.name as keyof typeof schemas].parse(request.arguments);
      const result=await server.call(request.name,request.arguments);
      assert.match(result.model,/\+mock$/);
      assert.equal(result.coverage.complete,true);
    }
  } finally {await server.close();}
});
