import { JevConfigError } from "./errors.js";

/**
 * Named bundles of the confidence bars. Precedence, lowest to highest: profile, then explicit environment variables
 * (`JEV_MCP_AUTO_ACCEPT` and the rest), then per-call arguments, which can only tighten.
 *
 * `balanced` is the default and reproduces the bars the server has always used. `strict` asks for more confidence before
 * anything is `auto` and blocks suspicious text earlier, at the cost of more reviews of ordinary work. `fast` lowers only the
 * auto-accept bar, to the value a threshold sweep found: no risky case in 520 was approved at 0.65 or above, and ordinary work is
 * approved far more often. Everything else, including the review bar and the screen bar, is `balanced`.
 */
export type ProfileName = "balanced" | "fast" | "strict";

export type Profile = {
  autoAccept: number;
  reviewAt: number;
  blockAt: number;
  /** Bar for "can the host make progress from here" in jev_triage; undefined means the same as autoAccept. */
  triageRecoverableAt: number | undefined;
};

export const PROFILES: Record<ProfileName, Profile> = {
  balanced: { autoAccept: 0.8, reviewAt: 0.5, blockAt: 0.75, triageRecoverableAt: undefined },
  fast: { autoAccept: 0.7, reviewAt: 0.5, blockAt: 0.75, triageRecoverableAt: undefined },
  strict: { autoAccept: 0.9, reviewAt: 0.6, blockAt: 0.6, triageRecoverableAt: 0.9 },
};

export function parseProfile(raw: string | undefined): ProfileName {
  const value = raw?.trim().toLowerCase();
  if (!value) return "balanced";
  if (value === "balanced" || value === "fast" || value === "strict") return value;
  throw new JevConfigError("JEV_MCP_PROFILE must be `balanced`, `fast` or `strict`.");
}
