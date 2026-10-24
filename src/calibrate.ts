import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * What the local decision ledger says about how the guard has been behaving. Only decisions that someone labeled
 * with `jev_feedback` count as ground truth: a decision nobody questioned is not evidence that it was right. The
 * report suggests, with the evidence and its sample size, and never changes a setting.
 */

export const DEFAULT_MIN_SAMPLE = 20;
const SAFE_NAME = /^[A-Za-z0-9_:.\-]{1,80}$/;
const ACTIONS = ["auto", "review", "escalate"] as const;
type Action = (typeof ACTIONS)[number];
type Outcome = "correct" | "false_alarm" | "missed";

export type ToolStats = {
  decisions: number;
  actions: Record<Action, number>;
  review_rate: number;
  escalate_rate: number;
  labeled: number;
  outcomes: Record<Outcome, number>;
  /** False alarms among labeled review/escalate decisions; null when none were labeled. */
  false_alarm_rate: number | null;
  /** Misses among labeled auto decisions; null when none were labeled. */
  miss_rate: number | null;
};

export type ReasonStats = {
  tool: string;
  reason: string;
  decisions: number;
  labeled: number;
  false_alarm: number;
  false_alarm_rate: number | null;
  /** True once there are enough labels to say anything about this reason. */
  enough: boolean;
};

export type Suggestion = {
  kind: "tighten" | "consider_policy" | "investigate";
  tool: string;
  reason?: string;
  evidence: Record<string, number>;
  text: string;
};

export type CalibrationReport = {
  generated_at: string;
  min_sample: number;
  ledger: { files: number; decisions: number; errors: number; feedback: number; labeled: number; unlabeled: number; malformed_lines: number };
  by_tool: Record<string, ToolStats>;
  by_reason: ReasonStats[];
  unstable_inputs: { groups: number; decisions: number; by_tool: Record<string, number> };
  suggestions: Suggestion[];
  notes: string[];
};

type Decision = { id: string; tool: string; action: Action; reasons: string[]; hmac: string | undefined };

const rate = (part: number, whole: number) => (whole > 0 ? Math.round((part / whole) * 1000) / 1000 : null);

function ledgerFiles(dir: string, since?: string): string[] {
  try {
    return readdirSync(dir)
      .filter(name => /^ledger-\d{4}-\d{2}\.jsonl$/.test(name))
      .filter(name => !since || name.slice(7, 14) >= since)
      .sort()
      .map(name => join(dir, name))
      .filter(path => statSync(path).isFile());
  } catch {
    return [];
  }
}

export function calibrate(options: { dir: string; since?: string; minSample?: number; now?: Date }): CalibrationReport {
  const minSample = Math.max(1, options.minSample ?? DEFAULT_MIN_SAMPLE);
  const files = ledgerFiles(options.dir, options.since);
  const decisions = new Map<string, Decision>();
  const outcomes = new Map<string, Outcome>();
  let errors = 0;
  let feedback = 0;
  let malformed = 0;

  for (const file of files) {
    let text: string;
    try {
      text = readFileSync(file, "utf8");
    } catch {
      continue;
    }
    for (const line of text.split("\n")) {
      if (!line.trim()) continue;
      let record: Record<string, unknown>;
      try {
        record = JSON.parse(line) as Record<string, unknown>;
      } catch {
        malformed += 1;
        continue;
      }
      if (record.kind === "decision" && typeof record.decision_id === "string" && typeof record.tool === "string" && SAFE_NAME.test(record.tool) && ACTIONS.includes(record.action as Action)) {
        const reasons = Array.isArray(record.reason_codes) ? record.reason_codes.filter((code): code is string => typeof code === "string" && SAFE_NAME.test(code)) : [];
        decisions.set(record.decision_id, { id: record.decision_id, tool: record.tool, action: record.action as Action, reasons, hmac: typeof record.input_hmac === "string" ? record.input_hmac : undefined });
      } else if (record.kind === "feedback" && typeof record.decision_id === "string" && ["correct", "false_alarm", "missed"].includes(record.outcome as string)) {
        feedback += 1;
        outcomes.set(record.decision_id, record.outcome as Outcome); // the last label wins
      } else if (record.kind === "error") {
        errors += 1;
      }
    }
  }

  const byTool: Record<string, ToolStats> = {};
  const reasonMap = new Map<string, ReasonStats>();
  let labeled = 0;
  for (const decision of decisions.values()) {
    const stats = (byTool[decision.tool] ??= { decisions: 0, actions: { auto: 0, review: 0, escalate: 0 }, review_rate: 0, escalate_rate: 0, labeled: 0, outcomes: { correct: 0, false_alarm: 0, missed: 0 }, false_alarm_rate: null, miss_rate: null });
    stats.decisions += 1;
    stats.actions[decision.action] += 1;
    const outcome = outcomes.get(decision.id);
    if (outcome) {
      stats.labeled += 1;
      stats.outcomes[outcome] += 1;
      labeled += 1;
    }
    if (decision.action !== "auto") {
      for (const reason of decision.reasons) {
        const entry = reasonMap.get(`${decision.tool}\u0000${reason}`) ?? { tool: decision.tool, reason, decisions: 0, labeled: 0, false_alarm: 0, false_alarm_rate: null, enough: false };
        entry.decisions += 1;
        if (outcome) {
          entry.labeled += 1;
          if (outcome === "false_alarm") entry.false_alarm += 1;
        }
        reasonMap.set(`${decision.tool}\u0000${reason}`, entry);
      }
    }
  }
  for (const [tool, stats] of Object.entries(byTool)) {
    stats.review_rate = rate(stats.actions.review, stats.decisions) ?? 0;
    stats.escalate_rate = rate(stats.actions.escalate, stats.decisions) ?? 0;
    // Labels apply to a decision's action: a false alarm is a hold that was not needed, a miss an approval that was.
    const heldLabeled = [...decisions.values()].filter(d => d.tool === tool && d.action !== "auto" && outcomes.has(d.id)).length;
    const autoLabeled = [...decisions.values()].filter(d => d.tool === tool && d.action === "auto" && outcomes.has(d.id)).length;
    stats.false_alarm_rate = rate(stats.outcomes.false_alarm, heldLabeled);
    stats.miss_rate = rate(stats.outcomes.missed, autoLabeled);
  }
  const byReason = [...reasonMap.values()].map(entry => ({ ...entry, false_alarm_rate: rate(entry.false_alarm, entry.labeled), enough: entry.labeled >= minSample })).sort((a, b) => b.decisions - a.decisions || a.reason.localeCompare(b.reason));

  // The same input getting different actions means the guard is not deterministic for that input.
  const groups = new Map<string, Decision[]>();
  for (const decision of decisions.values()) {
    if (!decision.hmac) continue;
    const key = `${decision.tool}\u0000${decision.hmac}`;
    groups.set(key, [...(groups.get(key) ?? []), decision]);
  }
  const unstable = { groups: 0, decisions: 0, by_tool: {} as Record<string, number> };
  for (const members of groups.values()) {
    if (members.length > 1 && new Set(members.map(member => member.action)).size > 1) {
      unstable.groups += 1;
      unstable.decisions += members.length;
      unstable.by_tool[members[0]!.tool] = (unstable.by_tool[members[0]!.tool] ?? 0) + 1;
    }
  }

  const suggestions: Suggestion[] = [];
  for (const [tool, stats] of Object.entries(byTool)) {
    if (stats.outcomes.missed > 0) {
      suggestions.push({
        kind: "tighten", tool,
        evidence: { missed: stats.outcomes.missed, labeled: stats.labeled },
        text: `${stats.outcomes.missed} approval(s) from ${tool} were labeled missed. Do not loosen anything for this tool; consider JEV_MCP_PROFILE=strict, or stricter per-call thresholds where it is used.`,
      });
    }
    const unstableCount = unstable.by_tool[tool] ?? 0;
    if (unstableCount >= 3 && unstableCount / stats.decisions >= 0.05) {
      suggestions.push({
        kind: "investigate", tool,
        evidence: { unstable_inputs: unstableCount, decisions: stats.decisions },
        text: `The same input to ${tool} got different actions ${unstableCount} time(s). Repeated calls are not consistent for these inputs; JEV_MCP_CACHE_TTL_MS makes identical requests return the same answer within a session.`,
      });
    }
  }
  for (const entry of byReason) {
    const missed = byTool[entry.tool]?.outcomes.missed ?? 0;
    if (entry.enough && missed === 0 && (entry.false_alarm_rate ?? 0) >= 0.5) {
      suggestions.push({
        kind: "consider_policy", tool: entry.tool, reason: entry.reason,
        evidence: { labeled: entry.labeled, false_alarm: entry.false_alarm },
        text: `${entry.tool} held ${entry.labeled} labeled decision(s) for ${entry.reason} and ${Math.round((entry.false_alarm_rate ?? 0) * 100)}% were false alarms, with no approvals labeled missed. If that holds with more data it is a candidate for a deterministic rule in .jev-policy.json (commands.allow_read_only is the only loosening a policy offers) rather than a lower threshold. Nothing was changed.`,
      });
    }
  }

  const notes = [
    "Only decisions labeled with jev_feedback count as ground truth. A decision nobody labeled is not evidence that it was right.",
    `A reason code needs at least ${minSample} labeled decisions before it can produce a suggestion.`,
    "This report suggests and never applies: no setting, threshold or policy file is changed.",
  ];
  if (decisions.size > 0 && labeled / decisions.size < 0.1) notes.push(`Only ${labeled} of ${decisions.size} decisions are labeled, so the rates above rest on a small share of the ledger.`);

  return {
    generated_at: (options.now ?? new Date()).toISOString(),
    min_sample: minSample,
    ledger: { files: files.length, decisions: decisions.size, errors, feedback, labeled, unlabeled: decisions.size - labeled, malformed_lines: malformed },
    by_tool: Object.fromEntries(Object.entries(byTool).sort(([a], [b]) => a.localeCompare(b))),
    by_reason: byReason,
    unstable_inputs: unstable,
    suggestions,
    notes,
  };
}

/** A short text rendering of a report for the terminal. */
export function renderCalibration(report: CalibrationReport): string {
  const pct = (value: number | null) => (value === null ? "n/a" : `${Math.round(value * 100)}%`);
  const lines = [
    `Ledger: ${report.ledger.decisions} decisions in ${report.ledger.files} file(s), ${report.ledger.labeled} labeled, ${report.ledger.errors} tool errors, ${report.ledger.malformed_lines} unreadable line(s).`,
    "",
    "Tool                 decisions  review  escalate  labeled  false alarms  misses",
    ...Object.entries(report.by_tool).map(([tool, stats]) => `${tool.padEnd(20)} ${String(stats.decisions).padStart(9)}  ${pct(stats.review_rate).padStart(6)}  ${pct(stats.escalate_rate).padStart(8)}  ${String(stats.labeled).padStart(7)}  ${pct(stats.false_alarm_rate).padStart(12)}  ${pct(stats.miss_rate).padStart(6)}`),
    "",
    `Inputs that got different actions: ${report.unstable_inputs.groups}.`,
    "",
  ];
  if (report.suggestions.length === 0) lines.push("Suggestions: none (not enough labeled evidence, or nothing stands out).");
  else lines.push("Suggestions (nothing was changed):", ...report.suggestions.map(suggestion => `- [${suggestion.kind}] ${suggestion.text}`));
  lines.push("", ...report.notes.map(note => `Note: ${note}`), "");
  return lines.join("\n");
}
