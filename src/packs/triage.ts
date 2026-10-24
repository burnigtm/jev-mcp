import type { Questions } from "@typesafe-ai/sdk";
import { withUntrustedDataClause } from "./safety.js";

export type FailureCause = {
  id: string;
  description: string;
};

/** Used when the host does not supply a domain-specific cause map. */
export const DEFAULT_FAILURE_CAUSES: readonly FailureCause[] = [
  { id: "test_failure", description: "A test assertion compared an actual value with a different expected value" },
  { id: "runtime_exception", description: "Code under change threw at runtime (TypeError, ReferenceError, RangeError, or similar)" },
  { id: "compile_or_type_error", description: "The tree does not build: the compiler or static type checker reports an error" },
  { id: "dependency_or_environment", description: "A dependency, tool, or environment prerequisite is missing or incompatible" },
  { id: "flaky_or_nondeterministic", description: "The failure is intermittent, timing-dependent, or order-dependent" },
  { id: "config_or_data", description: "Configuration, fixtures, or input data do not match what the code expects" },
] as const;

export function triageQuestions(causes: readonly FailureCause[]): Questions {
  const criteria: Record<string, string> = {
    unknown: "No supplied cause explains the observed failure",
  };
  causes.forEach((cause, index) => {
    criteria[`cause_${index}`] = cause.description;
  });
  return withUntrustedDataClause({
    cause: {
      type: "choice",
      instructions:
        "Which supplied cause best explains the observed `failure`, `attempts`, and `history`? Choose `unknown` if none fits; do not invent a cause outside the offered labels.",
      criteria,
    },
    progress: {
      type: "choice",
      instructions:
        "What is the trajectory of this debugging loop? Compare the current `failure` with the results of earlier `attempts` and with `history`, using the number of failing tests or errors and the error details. `first_attempt` = no previous attempts or history are supplied, so there is no trajectory yet; `advancing` = fewer tests or errors fail than before, or the error changed to a narrower problem, or each attempt added information; `repeating` = the same count and the same error recur without new information; `regressing` = MORE tests or errors fail than before, or tests that passed now fail; `complete` = the task is resolved. A shrinking failure count is advancing, never regressing.",
      criteria: {
        first_attempt: "No previous attempts or history are supplied; this is the first observed failure",
        advancing: "Fewer tests or errors fail than in earlier attempts, the error narrowed, or the history shows new information",
        repeating: "The same failure count and the same error recur without new information",
        regressing: "More tests or errors fail than in earlier attempts, or previously passing tests now fail",
        complete: "The failure is resolved and no further recovery is needed",
      },
    },
    recoverable: {
      type: "noul",
      instructions:
        "Can the host make useful progress from the supplied evidence without a new requirement, secret, or external change? Do not count repeating the same failed action as progress.",
      criteria: {
        true: "A concrete next probe or approach is available from the supplied facts",
        false: "Progress is blocked on missing information, authorization, or an external dependency",
      },
    },
    strategy: {
      type: "choice",
      instructions:
        "What should the host do next? `retry` = repeat with a materially different approach; `change_approach` = revise the plan or design; `gather_context` = collect a specific missing fact; `ask_user` = need a human decision, secret, or requirement; `stop` = the task is complete or no useful progress is possible; `escalate` = hand the decision to a stronger reviewer.",
      criteria: {
        retry: "A materially different retry is justified by the evidence",
        change_approach: "The current plan or design should be revised before another attempt",
        gather_context: "Collect a specific missing fact before acting",
        ask_user: "A human decision, secret, or requirement is missing",
        stop: "The task is complete or further work is not useful",
        escalate: "The decision needs a stronger reviewer or a different authority",
      },
    },
  });
}
