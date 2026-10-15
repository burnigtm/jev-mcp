import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { resolve } from 'node:path';
import { root } from './skill.mjs';

export function processEnv(extra = {}) {
  const env = {};
  for (const [name, value] of Object.entries(process.env)) {
    if (value !== undefined && /^(PATH|PATHEXT|SystemRoot|WINDIR|COMSPEC|TEMP|TMP|USERPROFILE|HOME|APPDATA|LOCALAPPDATA|NODE_EXTRA_CA_CERTS|NODE_USE_SYSTEM_CA)$/i.test(name)) env[name] = value;
  }
  return { ...env, ...extra };
}
export function liveEnv() {
  if (!process.env.TYPESAFE_API_KEY?.trim()) throw new Error('missing_typesafe_key');
  if (/^(1|true|yes)$/i.test(process.env.JEV_MCP_MOCK ?? '')) throw new Error('mock_not_allowed');
  if (process.env.TYPESAFE_BASE_URL && process.env.TYPESAFE_BASE_URL.replace(/\/$/, '') !== 'https://api.typesafe.ai') throw new Error('custom_provider_not_allowed');
  return processEnv({ TYPESAFE_API_KEY: process.env.TYPESAFE_API_KEY, TYPESAFE_BASE_URL: 'https://api.typesafe.ai', JEV_MCP_MOCK: '0', JEV_MCP_MODEL: process.env.JEV_MCP_MODEL || 'jev-latest', JEV_MCP_TIMEOUT_MS: '30000' });
}
export async function connectServer({ binary = resolve(root, 'dist/index.js'), args, cwd = root, env = processEnv({ JEV_MCP_MOCK: '1' }) } = {}) {
  const transport = new StdioClientTransport({ command: process.execPath, args: args ?? [binary], cwd, env, stderr: 'pipe' });
  const client = new Client({ name: 'jev-skill-evaluation', version: '1' });
  try { await client.connect(transport); }
  catch (error) { await transport.close().catch(() => {}); throw error; }
  transport.stderr?.resume();
  return { client, close: () => client.close(), call: async (name, arguments_) => {
    const result = await client.callTool({ name, arguments: arguments_ });
    if (result.isError) {
      let code = 'tool_error';
      try { code = JSON.parse(result.content?.find(part => part.type === 'text')?.text || '{}').error?.code || code; } catch {}
      throw new Error(/^[A-Z_]+$/.test(code) ? code : 'tool_error');
    }
    return result.structuredContent ?? JSON.parse(result.content.find(part => part.type === 'text').text);
  } };
}
