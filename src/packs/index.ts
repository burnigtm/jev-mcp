import { codingLoopQuestions } from "./coding-loop.js";
import { gateQuestions } from "./gate.js";
import { rankQuestions } from "./rank.js";
import { reviewQuestions } from "./review.js";
import { screenQuestions } from "./screen.js";
import { VERIFY_CRITERIA, verifyQuestions } from "./verify.js";
import { toolRouteQuestions } from "./tool-route.js";
import { stepQuestions } from "./step.js";

export const PACK_IDS = ["coding-loop", "review", "verify", "screen", "rank", "gate", "tool-route", "step"] as const;
export type PackId = (typeof PACK_IDS)[number];

export function packBody(id: PackId): unknown {
  switch (id) {
    case "coding-loop":
      return codingLoopQuestions();
    case "tool-route":
      return {
        note: "One Choice over private call labels plus none, and an independent suitability Noul per prepared call. Arguments are host-supplied and never generated. Host eligibility, complete context, confidence and effect gates must all pass before returning an executable call.",
        example: toolRouteQuestions(2),
      };
    case "step":
      return {
        note: "One request combines the coding-loop questions with prepared-call selection. Ineligible candidates are filtered locally and never reach Jev; with no eligible candidate the map is the coding-loop pack alone. Dispatch still requires the fixed 0.8 floor, a concentrated selection distribution, and a read-only or local-write effect.",
        example: stepQuestions(2),
      };
    case "review":
      return reviewQuestions();
    case "verify":
      return {
        note: "One Choice per claim. IDs are claim_0, claim_1, …",
        criteria: VERIFY_CRITERIA,
        example: verifyQuestions(1),
      };
    case "gate":
      return {
        note: "One request combines patch review and one Choice per claim. Only the evidence field supports claims; request and claims are assertions. Automatic approval requires complete context, an accepted review, and every claim verified confidently.",
        example: gateQuestions(1),
      };
    case "screen":
      return screenQuestions(true);
    case "rank":
      return {
        note: "Choice over candidate ids (max 250 per call) plus an exists Noul. Candidate texts are truncated to 2000 characters.",
        example: rankQuestions("how do I rotate API keys", [
          { id: "auth", text: "To rotate an API key: create a new key, switch the app, revoke the old key." },
          { id: "billing", text: "Invoices are issued monthly." },
        ]),
      };
    default: {
      const _never: never = id;
      return _never;
    }
  }
}

export function packUri(id: PackId): string {
  return `jev://packs/${id}`;
}
