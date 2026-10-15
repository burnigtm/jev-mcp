import { writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
export function reserveCall(directory, limit=20) {
  for(let slot=1;slot<=limit;slot++) {
    try {writeFileSync(join(directory,String(slot)),'reserved\n',{flag:'wx',mode:0o600});return slot;}
    catch(error){if(error.code!=='EEXIST')throw error;}
  }
  return null;
}
export function validTrace(records, reserved) {
  const starts=records.filter(r=>r.type==='trace_start'),ends=records.filter(r=>r.type==='trace_end'),events=records.filter(r=>r.tool),requests=records.filter(r=>r.type==='request_start');
  if(records.some(r=>r.type==='trace_error')||requests.length!==reserved)return false;
  if(!starts.length||starts.length!==ends.length||reserved<1||reserved>20||events.length!==reserved)return false;
  const ids=new Set(starts.map(r=>r.proxy_id));
  if(ids.size!==starts.length||ends.some(e=>!ids.has(e.proxy_id)||!e.complete))return false;
  if([...ids].some(id=>ends.filter(e=>e.proxy_id===id).length!==1))return false;
  if(events.some(e=>!ids.has(e.proxy_id))||new Set(events.map(e=>e.sequence)).size!==events.length)return false;
  if(requests.some(request=>events.filter(e=>e.proxy_id===request.proxy_id&&e.sequence===request.sequence).length!==1))return false;
  if(ends.reduce((sum,e)=>sum+e.calls,0)!==events.length)return false;
  return events.every(e=>Number.isInteger(e.sequence)&&e.sequence>=1&&e.sequence<=reserved);
}
export function reservedCount(directory) { return readdirSync(directory).filter(name=>/^\d+$/.test(name)).length; }
export function finalizeTrace(records, successfulExit) {
  // On Windows, CLI teardown may terminate its stdio children without running
  // JavaScript signal handlers. The host may close an otherwise fully accounted
  // instance only after the agent exits successfully, never with missing replies.
  const result=[...records];
  for(const start of records.filter(r=>r.type==='trace_start')) {
    if(records.some(r=>r.type==='trace_end'&&r.proxy_id===start.proxy_id))continue;
    const own=records.filter(r=>r.proxy_id===start.proxy_id),requests=own.filter(r=>r.type==='request_start'),events=own.filter(r=>r.tool);
    const complete=successfulExit&&!own.some(r=>r.type==='trace_error')&&requests.length===events.length&&requests.every(request=>events.filter(e=>e.sequence===request.sequence).length===1);
    result.push({type:'trace_end',proxy_id:start.proxy_id,complete,calls:requests.length,host_finalized:true});
  }
  return result;
}
