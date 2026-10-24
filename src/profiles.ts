import { JevConfigError } from "./errors.js";

/**
 * Named bundles of the confidence bars. Precedence, lowest to highest: profile, then explicit environment variables
 * (`JEV_MCP_AUTO_ACCEPT` and the rest), then per-call arguments, which can only tighten.
 *
 * `balanced` is the default. Its auto-accept bar of 0.70 comes from a sweep from 0.95 down to 0.50 over thousands of
 * generated cases on live Jev: no risky case was approved at a bar of 0.65 or above, while ordinary work is approved far
 * more often than at 0.80. `conservative` is the bar the server used before that (0.80) and reproduces its earlier behavior
 * exactly. `strict` asks for more confidence before anything is `auto` and blocks suspicious text earlier, at the cost of
 * more reviews of ordinary work.
 */
export type ProfileName = "balanced" | "conservative" | "strict";

export type Profile = {
  autoAccept: number;
  reviewAt: number;
  blockAt: number;
  /** Bar for "can the host make progress from here" in jev_triage; undefined means the same as autoAccept. */
  triageRecoverableAt: number | undefined;
};

export const PROFILES: Record<ProfileName, Profile> = {
  balanced: { autoAccept: 0.7, reviewAt: 0.5, blockAt: 0.75, triageRecoverableAt: undefined },
  conservative: { autoAccept: 0.8, reviewAt: 0.5, blockAt: 0.75, triageRecoverableAt: undefined },
  strict: { autoAccept: 0.9, reviewAt: 0.6, blockAt: 0.6, triageRecoverableAt: 0.9 },
};

export function parseProfile(raw: string | undefined): ProfileName {
  const value = raw?.trim().toLowerCase();
  if (!value) return "balanced";
  if (value === "balanced" || value === "conservative" || value === "strict") return value;
  throw new JevConfigError("JEV_MCP_PROFILE must be `balanced`, `conservative` or `strict`.");
}
