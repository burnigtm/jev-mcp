import { spawn } from 'node:child_process';
import { appendFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';
import { root } from './lib/skill.mjs';
import { TraceObserver, jsonLines, sourceDigest } from './lib/trace.mjs';
import { liveEnv } from './lib/mcp.mjs';
import { attest } from './lib/attestation.mjs';
import { reserveCall } from './lib/budget.mjs';

if (process.env.JEV_EVAL_ISOLATED !== '1') {
  console.error('JEV_EVAL_ISOLATED=1 is required; run agent evaluation in a disposable container or VM.');
  process.exit(2);
}
const [workspace, traceFile, baselineFile, task, budget] = process.argv.slice(2);
if (!workspace || !traceFile || !baselineFile || !task || !budget) process.exit(2);
let child,closing=false;
const proxy_id=randomUUID();
function record(value) { appendFileSync(traceFile, `${JSON.stringify({...value,proxy_id})}\n`, { mode: 0o600 }); }
record({type:'trace_start'});
const observer = new TraceObserver({ emit: record, snapshot: () => sourceDigest(workspace), reserve:()=>reserveCall(budget), attest: args => attest(workspace,baselineFile,task,args), onLimit: () => child?.kill() });
let errorRecorded=false;
const invalid = () => { observer.complete = false;if(!errorRecorded){record({type:'trace_error'});errorRecorded=true;} };
const responses = jsonLines(message => observer.response(message), invalid);
try { child = spawn(process.execPath, [resolve(root, 'dist/index.js')], { env: liveEnv(), stdio: ['pipe','pipe','pipe'], windowsHide: true }); }
catch { record({ type: 'trace_end', complete: false, calls: 0 }); process.exit(2); }
// Buffer one complete request frame so budget checks happen BEFORE any complete
// tools/call reaches the server. Preserve the original bytes, including CRLF.
let pending=Buffer.alloc(0),stopped=false;
process.stdin.on('data', chunk => {
  if(stopped)return;
  pending=Buffer.concat([pending,chunk]);
  let newline;
  while((newline=pending.indexOf(10))>=0) {
    const line=pending.subarray(0,newline+1);pending=pending.subarray(newline+1);
    try {
      if(line.length>2_000_000)throw new Error();
      if(!observer.request(JSON.parse(line.toString('utf8')))){invalid();stopped=true;child.kill();return;}
      if(!observer.complete)invalid();
      if(!child.stdin.write(line)){process.stdin.pause();child.stdin.once('drain',()=>process.stdin.resume());}
    }catch {invalid();stopped=true;child.kill();return;}
  }
  if(pending.length>2_000_000){invalid();stopped=true;child.kill();}
});
process.stdin.on('end',()=>{closing=true;if(pending.length)invalid();child.stdin.end();});
child.stdout.on('data', chunk => responses.write(chunk));
child.stdout.pipe(process.stdout);
child.stderr.resume();
child.stdin.on('error', invalid);
child.on('error', () => { invalid(); });
child.on('close', code => { responses.end(); if ((!closing&&code)||pending.length) invalid(); record(observer.finish()); process.exitCode = closing?0:(code||0); process.stdin.destroy(); });
for (const signal of ['SIGTERM','SIGINT']) process.on(signal, () => {closing=true;child.kill();});
