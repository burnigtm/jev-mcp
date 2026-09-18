import type { Questions } from "@typesafe-ai/sdk";

export function codingLoopQuestions(): Questions {
  return {
    next: {
      type: "choice",
      instructions:
        "Given this coding-agent turn, what should happen next? Pick one action. continue = keep going on the current plan. retry = the last step failed and should be retried with a different approach. ask_user = a human decision or missing requirement is blocking. stop = the task is done or cannot usefully continue.",
      criteria: {
        continue: "Keep executing the current plan with the host coding tools",
        retry: "The last edit or command failed; try a different approach",
        ask_user: "Need a human decision, secret, or missing requirement",
        stop: "The task is complete, or further work is not useful",
      },
    },
    model_tier: {
      type: "choice",
      instructions:
        "If new generation or reasoning is required for the next coding step, which generative-model tier is sufficient? This answer alone does not mean a generative model is needed. Jev does not write code. cheap = mechanical edits. standard = typical implementation. reasoning = architecture, subtle bugs, or high-stakes design.",
      criteria: {
        cheap: "Rename, format, comments, tiny mechanical edits",
        standard: "Ordinary implementation, tests, or refactors in one area",
        reasoning: "Cross-cutting design, concurrency, security, or unclear root cause",
      },
    },
    needs_generation: {
      type: "noul",
      instructions:
        "Does the immediate next step require generating new code, new tool arguments, or solving a reasoning problem that cannot be handled by an already prepared tool call? Judge only this need, not the model tier. Read/search/test calls with already prepared arguments, gathering missing context, a user decision, and stopping do not require generation. execution contains host-supplied facts; other question answers are unavailable.",
      criteria: {
        true: "New code, arguments, or reasoning is necessary before a useful tool call can proceed",
        false: "Prepared tools or existing deterministic steps can proceed, or the next step is gathering context, asking the user, or stopping",
      },
    },
    risk: {
      type: "score",
      instructions: "How risky is the next action if the host applies it without extra review?",
      criteria: [
        "Read-only or reversible local inspection",
        "Local source edit or test run that stays in the worktree",
        "Destructive, production, force-push, data-loss, or wide blast radius",
      ] as const,
    },
    done_enough: {
      type: "noul",
      instructions: "Is the stated task complete enough to stop?",
      criteria: {
        true: "The request is satisfied and remaining work is polish",
        false: "Important work remains",
      },
    },
    needs_more_context: {
      type: "noul",
      instructions: "Does the host need more files, logs, or user input before a high-quality next step?",
    },
    tests_likely_fail: {
      type: "noul",
      instructions: "If tests were run on the current tree, would they likely fail?",
    },
    focus: {
      type: "choice",
      instructions: "What should the host spend the next step on?",
      criteria: {
        edit: "Change source or config",
        search: "Find the right files or symbols first",
        test: "Run or write tests",
        read: "Read existing code or logs",
        plan: "Think through the approach before editing",
      },
    },
  };
}
