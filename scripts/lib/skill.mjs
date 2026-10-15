import { readFile, readdir, lstat, mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname, relative, isAbsolute, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { parseDocument } from 'yaml';
import { zipSync, unzipSync } from 'fflate';

export const root = fileURLToPath(new URL('../../', import.meta.url));
export const skillRoot = resolve(root, 'skills/jev-mcp');
export const skillFiles = ['LICENSE', 'SKILL.md', 'references/evidence.md', 'references/setup.md', 'references/tools.md', 'references/typesafe.md', 'scripts/evidence.mjs'];
export const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
export async function treeDigest(directory) {
  const hash=createHash('sha256');
  async function visit(folder,prefix='') {
    for(const name of (await readdir(folder)).sort()) {
      const path=resolve(folder,name),stat=await lstat(path);
      if(stat.isSymbolicLink())throw new Error('Digest inputs must be regular entries');
      if(stat.isDirectory())await visit(path,`${prefix}${name}/`);
      else if(stat.isFile())hash.update(prefix+name).update(await readFile(path));
    }
  }
  await visit(directory);return hash.digest('hex');
}
export function inside(base, target) {
  const rel = relative(resolve(base), resolve(target));
  return rel !== '' && !isAbsolute(rel) && rel !== '..' && !rel.startsWith(`..${sep}`);
}
export function frontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(text);
  if (!match) throw new Error('Missing YAML frontmatter');
  const doc = parseDocument(match[1], { uniqueKeys: true });
  if (doc.errors.length) throw new Error('Invalid or duplicate YAML frontmatter');
  const data = doc.toJS();
  if (data?.name !== 'jev-mcp' || typeof data.description !== 'string' || !data.description.trim() || data.description.length > 1024) throw new Error('Invalid skill name/description');
  return data;
}
export function examples(text) {
  const entries = [];
  for (const section of text.split(/^## /m).slice(1)) {
    const name = /^`(jev_[a-z_]+)`/.exec(section)?.[1];
    if (!name) continue;
    for (const match of section.matchAll(/```json\s*\n([\s\S]*?)\n```/g)) entries.push({ name, arguments: JSON.parse(match[1]) });
  }
  return entries;
}
export async function inspectSkill(directory = skillRoot) {
  const entries = {};
  async function visit(folder, prefix = '') {
    for (const name of (await readdir(folder)).sort()) {
      const path = resolve(folder, name), rel = prefix + name, stat = await lstat(path);
      if (!inside(directory, path) || stat.isSymbolicLink()) throw new Error('Skill paths must be contained regular entries');
      if (stat.isDirectory()) await visit(path, `${rel}/`);
      else if (stat.isFile() && skillFiles.includes(rel)) entries[rel] = new Uint8Array(await readFile(path));
      else throw new Error(`Unexpected skill entry: ${rel}`);
    }
  }
  await visit(directory);
  for (const name of skillFiles) if (!entries[name]) throw new Error(`Missing skill file: ${name}`);
  frontmatter(Buffer.from(entries['SKILL.md']).toString('utf8'));
  for (const [name, bytes] of Object.entries(entries).filter(([name]) => name.endsWith('.md'))) {
    const text = Buffer.from(bytes).toString('utf8');
    for (const match of text.matchAll(/\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
      const link = match[1];
      if (/^https:\/\//.test(link) || link.startsWith('#')) continue;
      const target = resolve(dirname(resolve(directory, name)), decodeURIComponent(link.split('#')[0]));
      if (!inside(directory, target)) throw new Error(`Escaping skill reference in ${name}`);
      if (!(await lstat(target)).isFile()) throw new Error(`Missing skill reference in ${name}`);
    }
  }
  return entries;
}
export function archive(entries) {
  // ZIP stores local DOS wall-clock time. A local constructor keeps the encoded
  // timestamp identical across time zones (03:00 is simply a fixed convention).
  return zipSync(Object.fromEntries(Object.keys(entries).sort().map(name => [`jev-mcp/${name}`, [entries[name], { mtime: new Date(1980,0,1,3,0,0), os: 3, attrs: 0o100644 << 16 }]])), { level: 9 });
}
export function inspectArchive(bytes) {
  const entries = unzipSync(bytes);
  const expected = skillFiles.map(name => `jev-mcp/${name}`).sort();
  if (JSON.stringify(Object.keys(entries).sort()) !== JSON.stringify(expected)) throw new Error('Unexpected archive layout');
  return entries;
}
export async function buildSkill(output = resolve(root, 'artifacts')) {
  const { version } = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
  const entries = await inspectSkill();
  if (Buffer.compare(Buffer.from(entries.LICENSE), await readFile(resolve(root, 'LICENSE'))) !== 0) throw new Error('Skill license differs from repository license');
  const bytes = archive(entries);
  inspectArchive(bytes);
  await mkdir(output, { recursive: true });
  const name = `jev-mcp-skill-${version}.zip`, path = resolve(output, name), hash = sha256(bytes);
  await writeFile(path, bytes);
  await writeFile(`${path}.sha256`, `${hash}  ${name}\n`);
  return { path, sha256: hash, version, bytes: bytes.length };
}
