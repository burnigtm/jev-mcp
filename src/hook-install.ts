import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

/**
 * The Claude Code settings that wire the guard in. Printed by default; writing a settings file needs an
 * explicit `--write`. The command is exec form (`node` plus an absolute entry path) so it works on
 * Windows, where a `.cmd` shim cannot be spawned directly and a path may contain spaces.
 */

export type InstallOptions = {
  entry?: string;
  stop?: boolean;
  shadow?: boolean;
  /** Ask Claude Code to block the tool when the hook itself fails (crash or timeout). */
  blockOnFailure?: boolean;
};

export const PRE_TOOL_MATCHER = "Bash|PowerShell|Read|Write|Edit|MultiEdit|NotebookEdit";

export function entryPath(): string {
  return fileURLToPath(new URL("./index.js", import.meta.url));
}

type HookEntry = { type: "command"; command: string; args: string[]; timeout: number; onFailure?: "block" };

function entry(options: InstallOptions, kind: "pre-tool-use" | "stop", timeout: number): HookEntry {
  return {
    type: "command",
    command: "node",
    args: [options.entry ?? entryPath(), "hook", kind, ...(options.shadow ? ["--shadow"] : [])],
    timeout,
    ...(options.blockOnFailure && kind === "pre-tool-use" ? { onFailure: "block" as const } : {}),
  };
}

export function buildSettings(options: InstallOptions = {}) {
  return {
    hooks: {
      PreToolUse: [{ matcher: PRE_TOOL_MATCHER, hooks: [entry(options, "pre-tool-use", 30)] }],
      ...(options.stop ? { Stop: [{ hooks: [entry(options, "stop", 120)] }] } : {}),
    },
  };
}

type Group = { matcher?: string; hooks?: Array<{ args?: unknown }> };

function isOurs(group: Group): boolean {
  return (group.hooks ?? []).some(hook => Array.isArray(hook.args) && hook.args.includes("hook") && hook.args.some(arg => typeof arg === "string" && /jev|index\.js/i.test(arg)));
}

/** Merge into an existing settings object without disturbing other keys or other hooks; our own entries are replaced, not duplicated. */
export function mergeSettings(existing: Record<string, unknown>, additions: ReturnType<typeof buildSettings>): Record<string, unknown> {
  const hooks = { ...((existing.hooks as Record<string, Group[]> | undefined) ?? {}) };
  for (const [event, groups] of Object.entries(additions.hooks)) {
    hooks[event] = [...(hooks[event] ?? []).filter(group => !isOurs(group)), ...groups];
  }
  return { ...existing, hooks };
}

export function readSettingsFile(path: string): Record<string, unknown> {
  try {
    const parsed = JSON.parse(readFileSync(path, "utf8").replace(/^\uFEFF/, ""));
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) throw new Error("not an object");
    return parsed as Record<string, unknown>;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return {};
    throw new Error(`Cannot update ${path}: it is not a JSON object. Fix or remove it first.`);
  }
}
