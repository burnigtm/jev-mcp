import { spawn, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { processEnv } from './mcp.mjs';
import { root } from './skill.mjs';
import { jsonLines } from './trace.mjs';

// The official native Windows Cursor distribution uses a PowerShell launcher.
// Pass arguments as an array, without cmd.exe command-string interpolation.
export function executableCommand(binary, args) {
  if (process.platform === 'win32' && /\.(cmd|ps1)$/i.test(binary)) {
    const script = binary.replace(/\.cmd$/i, '.ps1');
    if (!existsSync(script)) throw new Error('launcher_missing');
    return { binary: join(process.env.SystemRoot || 'C:/Windows', 'System32/WindowsPowerShell/v1.0/powershell.exe'), args: ['-NoProfile','-ExecutionPolicy','Bypass','-File',script,...args] };
  }
  return { binary, args };
}

export function resolveBinary(name) {
  const result=spawnSync(process.platform==='win32'?'where.exe':'which',[name],{encoding:'utf8',windowsHide:true});
  return result.status===0?result.stdout.trim().split(/\r?\n/)[0]:null;
}
export function probeHost(host, binary) {
  binary=binary||resolveBinary(host==='codex'?'codex':'cursor-agent')|| (host==='cursor'?resolveBinary('agent'):null);
  if(!binary) return {ok:false,reason:'cli_missing'};
  const run=args=>{try {const command=executableCommand(binary,args);return spawnSync(command.binary,command.args,{env:{...process.env,...(host==='cursor'&&process.env.NODE_USE_SYSTEM_CA==='1'?{NODE_OPTIONS:'--use-system-ca'}:{})},encoding:'utf8',windowsHide:true,timeout:10000,maxBuffer:200000});}catch{return {status:null};}};
  const version=run(['--version']), help=run(['--help']);
  const text=(version.stdout??'')+(help.stdout??'');
  if(version.status!==0||help.status!==0) return {ok:false,reason:'cli_probe_failed'};
  if(host==='cursor'&&(/grok/i.test(text)||!/cursor/i.test(text)||!text.includes('--output-format'))) return {ok:false,reason:'not_cursor_cli'};
  if(host==='codex'&&(!/codex/i.test(text)||!text.includes('exec'))) return {ok:false,reason:'not_codex_cli'};
  if(host==='codex'&&run(['login','status']).status!==0) return {ok:false,reason:'agent_auth_missing'};
  if(host==='cursor'&&!process.env.CURSOR_API_KEY) return {ok:false,reason:'cursor_api_key_missing'};
  return {ok:true,binary,version:version.stdout.trim().slice(0,100).replace(/[^a-zA-Z0-9_.+ ()-]/g,'')};
}
export async function configuredModel(host, explicit) {
  if(explicit) { if(!/^[a-zA-Z0-9_.:/-]{1,96}$/.test(explicit)) throw new Error('invalid_model'); return explicit; }
  if(host==='codex') {
    try { const file=await readFile(join(process.env.CODEX_HOME||join(process.env.USERPROFILE||process.env.HOME,'.codex'),'config.toml'),'utf8'); return /^model\s*=\s*"([a-zA-Z0-9_.:/-]+)"/m.exec(file)?.[1]??null; } catch {}
  }
  return null;
}
async function userSkillPaths() {
  const found=[];
  async function walk(path,depth=0) {
    if(depth>8||found.length>1000)return;
    try { for(const entry of await readdir(path,{withFileTypes:true})) {
      if(entry.isSymbolicLink()) continue;
      const p=join(path,entry.name);
      if(entry.isFile()&&entry.name==='SKILL.md')found.push(p);
      else if(entry.isDirectory())await walk(p,depth+1);
    }} catch {}
  }
  await walk(join(process.env.CODEX_HOME||join(process.env.USERPROFILE||process.env.HOME,'.codex'),'skills'));
  await walk(join(process.env.USERPROFILE||process.env.HOME,'.agents','skills'));
  return found;
}
export async function invocation({host,model,workspace,profile,trace,baseline,task,budget,treatment}) {
  await mkdir(profile,{recursive:true});
  const env=processEnv();
  // Preserve only Codex's existing authentication home; use empty user homes for skill discovery.
  env.CODEX_HOME=process.env.CODEX_HOME||join(process.env.USERPROFILE||process.env.HOME,'.codex');
  env.USERPROFILE=profile; env.HOME=profile; env.CURSOR_CONFIG_DIR=join(profile,'.cursor');
  if(process.platform==='win32') env.PSModuleAnalysisCachePath=join(profile,'ModuleAnalysisCache');
  if(treatment) { env.TYPESAFE_API_KEY=process.env.TYPESAFE_API_KEY; env.JEV_MCP_MOCK='0'; env.JEV_MCP_MODEL=process.env.JEV_MCP_MODEL||'jev-latest'; }
  // Cursor's native allowlist mode permits the shell adapter. Codex's shell
  // cannot start networked servers inside its network-disabled sandbox; it
  // uses its already-connected MCP tool with the collected argument object.
  // The per-server env allowlists must include the isolation marker, because
  // the MCP client does not inherit arbitrary parent variables.
  if(host==='codex') {
    const skills=(await userSkillPaths()).map(path=>`{path=${JSON.stringify(path.replaceAll('\\','/'))},enabled=false}`).join(',');
    const config=treatment?`{jev={command=${JSON.stringify(process.execPath.replaceAll('\\','/'))},args=${JSON.stringify([resolve(root,'scripts/trace-proxy.mjs'),workspace,trace,baseline,task,budget].map(p=>p.replaceAll('\\','/')))},env_vars=["TYPESAFE_API_KEY","JEV_MCP_MODEL","NODE_USE_SYSTEM_CA","NODE_EXTRA_CA_CERTS","JEV_EVAL_ISOLATED"]}}`:'{}';
    const args=[
      'exec','--json','--ephemeral','--ignore-user-config','--ignore-rules',
      '--skip-git-repo-check','--sandbox','workspace-write','-C',workspace,'-m',model,
      '-c','sandbox_mode="workspace-write"',
      ...(process.platform==='win32'?['-c','windows.sandbox="elevated"']:[]),
      '-c','sandbox_workspace_write.network_access=false',
      '-c','model_reasoning_effort="medium"','-c','approval_policy="never"',
      '-c','project_doc_max_bytes=0','-c','web_search="disabled"',
      '-c',`skills.config=[${skills}]`,'-c',`mcp_servers=${config}`,
      ...['apps','plugins','hooks','memories','browser_use'].flatMap(feature=>['--disable',feature]),'-',
    ];
    return {env,args};
  }
  env.CURSOR_API_KEY=process.env.CURSOR_API_KEY;
  if(process.env.NODE_USE_SYSTEM_CA==='1') env.NODE_OPTIONS='--use-system-ca';
  await mkdir(join(workspace,'.cursor'),{recursive:true});
  await writeFile(join(workspace,'.cursor','mcp.json'),JSON.stringify({mcpServers:treatment?{jev:{command:process.execPath,args:[resolve(root,'scripts/trace-proxy.mjs'),workspace,trace,baseline,task,budget],env:{TYPESAFE_API_KEY:'${env:TYPESAFE_API_KEY}',JEV_MCP_MODEL:'${env:JEV_MCP_MODEL}',NODE_USE_SYSTEM_CA:'${env:NODE_USE_SYSTEM_CA}',JEV_EVAL_ISOLATED:'${env:JEV_EVAL_ISOLATED}'}}}:{}}));
  await mkdir(env.CURSOR_CONFIG_DIR,{recursive:true});
  await writeFile(join(env.CURSOR_CONFIG_DIR,'cli-config.json'),JSON.stringify({version:1,permissions:{allow:['Shell(node)','Read(**)','Write(src/**)','Write(tests/*.test.mjs)',...(treatment?['Mcp(jev:*)']:[])],deny:['WebFetch(*)','Shell(git)','Shell(gh)','Shell(curl)','Shell(powershell)','Shell(pwsh)']}}));
  return {env,args:['--print','--force','--trust','--sandbox',process.platform==='win32'?'disabled':'enabled','--output-format','stream-json','--workspace',workspace,'--model',model,...(treatment?['--approve-mcps']:[])]};
}
export function stopTree(child) {
  if(!child.pid)return;
  if(process.platform==='win32') spawnSync('taskkill.exe',['/PID',String(child.pid),'/T','/F'],{stdio:'ignore',windowsHide:true});
  else {try {process.kill(-child.pid,'SIGKILL');}catch {child.kill('SIGKILL');}}
}
export function infrastructureReason(text) {
  if(/sandbox.*not available|sandbox requires/i.test(text))return 'sandbox_unavailable';
  if(/not logged in|authentication required|invalid api key|unauthenticated|unauthorized|\b401\b/i.test(text))return 'agent_auth_missing';
  if(/unable to verify.*certificate|certificate.*(expired|invalid)|CERT_/i.test(text))return 'agent_tls_failure';
  if(/rate.limit|usage.limit|purchase more credits|quota.exceed|insufficient.*credit|\b429\b/i.test(text))return 'agent_rate_limited';
  return null;
}
export async function runAgent(binary, args, {env,prompt,timeout=300000,cwd,onEvent=()=>{}}) {
  return await new Promise(resolveRun=>{
    let invalid=false,events=0,bytes=0,usage=null,timedOut=false,spawnError=false,infrastructure=null,diagnostic='',observedModel=null,terminalSuccess=false,terminalFailure=false;
    const eventCounts={},knownEvents=new Set(['system','assistant','user','tool_call','tool_result','result','thread.started','turn.started','turn.completed','turn.failed','item.started','item.updated','item.completed','error']);
    const parser=jsonLines(event=>{
      onEvent(event);
      events++;
      const type=knownEvents.has(event.type)?event.type:'other';eventCounts[type]=(eventCounts[type]??0)+1;
      if(event.type==='turn.completed'||event.type==='result'&&event.subtype==='success'&&!event.is_error)terminalSuccess=true;
      if(event.type==='turn.failed'||event.type==='result'&&(event.subtype!=='success'||event.is_error))terminalFailure=true;
      if(event.type==='system'&&event.subtype==='init'&&typeof event.model==='string'&&/^[a-zA-Z0-9_. +()[\]-]{1,96}$/.test(event.model))observedModel=event.model;
      const u=event.usage??event.result?.usage;
      if(u&&Number.isFinite(u.input_tokens)&&Number.isFinite(u.output_tokens)) usage={input_tokens:u.input_tokens,output_tokens:u.output_tokens,total_tokens:u.input_tokens+u.output_tokens};
      else if(u&&Number.isFinite(u.inputTokens)&&Number.isFinite(u.outputTokens)) {
        const cached=[u.cacheReadTokens,u.cacheWriteTokens].map(n=>Number.isFinite(n)?n:0);
        usage={input_tokens:u.inputTokens+cached[0]+cached[1],output_tokens:u.outputTokens,cache_read_tokens:cached[0],cache_write_tokens:cached[1],total_tokens:u.inputTokens+cached[0]+cached[1]+u.outputTokens};
      }
      if(event.type==='error'||event.is_error)infrastructure??=infrastructureReason(JSON.stringify(event));
    },()=>{invalid=true;});
    const command=executableCommand(binary,args);
    const child=spawn(command.binary,command.args,{env,cwd,windowsHide:true,detached:process.platform!=='win32',stdio:['pipe','pipe','pipe']});
    const timer=setTimeout(()=>{timedOut=true;stopTree(child);},timeout);
    child.stdout.on('data',chunk=>{bytes+=chunk.length;if(bytes>20_000_000){invalid=true;stopTree(child);}else parser.write(chunk);});
    child.stderr.on('data',chunk=>{diagnostic=(diagnostic+chunk.toString()).slice(-8192);infrastructure??=infrastructureReason(diagnostic);}); child.stdin.on('error',()=>{}); child.stdin.end(prompt);
    child.on('error',()=>{spawnError=true;});
    child.on('close',code=>{clearTimeout(timer);parser.end();resolveRun({exit_code:code,timed_out:timedOut,spawn_error:spawnError,events_complete:!invalid&&events>0&&terminalSuccess&&!terminalFailure,host_usage:usage,host_event_counts:eventCounts,observed_host_model:observedModel,infrastructure_reason:infrastructure});});
  });
}
