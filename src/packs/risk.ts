import type { Questions } from "@typesafe-ai/sdk";
import { withUntrustedDataClause } from "./safety.js";

export const RISK_FLAGS = [
  "authorization",
  "input_validation",
  "secret_exposure",
  "data_loss",
  "concurrency",
  "dependency",
  "external_effect",
] as const;

export type RiskFlag = (typeof RISK_FLAGS)[number];

export function riskQuestions(): Questions {
  return withUntrustedDataClause({
    authorization: {
      type: "noul",
      instructions:
        "Does `diff` change authentication or authorization behavior without an explicit requirement in `request`? Consider new bypasses, missing checks, role changes, and trust decisions.",
      criteria: {
        true: "A concrete authorization or authentication concern is evident in the supplied diff",
        false: "No authorization or authentication concern is evident from the supplied evidence",
      },
    },
    input_validation: {
      type: "noul",
      instructions:
        "Does `diff` add, remove, or weaken validation or parsing at a boundary that accepts untrusted input? Consider injection, traversal, malformed JSON, and unchecked external data.",
      criteria: {
        true: "A concrete validation or parsing concern is evident in the supplied diff",
        false: "No validation or parsing concern is evident from the supplied evidence",
      },
    },
    secret_exposure: {
      type: "noul",
      instructions:
        "Could `diff` expose credentials, tokens, keys, session data, or other sensitive values? Consider logs, errors, responses, commits, and new files.",
      criteria: {
        true: "A concrete secret-exposure path is evident in the supplied diff",
        false: "No secret-exposure path is evident from the supplied evidence",
      },
    },
    data_loss: {
      type: "noul",
      instructions:
        "Could `diff` cause irreversible data loss, an unsafe migration, or destructive cleanup? Consider deletes, overwrites, schema changes, and missing backups.",
      criteria: {
        true: "A concrete data-loss or migration concern is evident in the supplied diff",
        false: "No data-loss concern is evident from the supplied evidence",
      },
    },
    concurrency: {
      type: "noul",
      instructions:
        "Could `diff` introduce a race, deadlock, lost update, or ordering bug? Judge only concrete mechanisms shown in the diff and tests.",
      criteria: {
        true: "A concrete concurrency or ordering concern is evident in the supplied diff",
        false: "No concurrency or ordering concern is evident from the supplied evidence",
      },
    },
    dependency: {
      type: "noul",
      instructions:
        "Does `diff` add or change an external dependency, plugin, build step, or supply-chain surface without an explicit requirement?",
      criteria: {
        true: "A concrete dependency or supply-chain concern is evident in the supplied diff",
        false: "No dependency or supply-chain concern is evident from the supplied evidence",
      },
    },
    external_effect: {
      type: "noul",
      instructions:
        "Does `diff` introduce an external write, deployment, network mutation, or production-facing side effect that is not clearly required by `request`?",
      criteria: {
        true: "A concrete external or production-facing effect is evident in the supplied diff",
        false: "No external or production-facing effect is evident from the supplied evidence",
      },
    },
    severity: {
      type: "score",
      instructions:
        "What is the worst plausible security impact of `diff` if it is applied without further security review?",
      criteria: [
        "No plausible security impact; effects are contained and reversible",
        "A plausible but bounded security impact that should be reviewed",
        "A serious or irreversible impact such as secret exposure, authorization bypass, or data loss",
      ] as const,
    },
  });
}
