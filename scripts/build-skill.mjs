import { buildSkill } from './lib/skill.mjs';
try { console.log(JSON.stringify(await buildSkill(), null, 2)); }
catch { console.error('Skill build failed; validate the skill files and references.'); process.exitCode = 1; }
