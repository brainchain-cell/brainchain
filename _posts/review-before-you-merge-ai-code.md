---
title: "Review AI code before you merge it"
category: Cursor
readTime: 7
excerpt: "Use diffs, checks and a short review checklist so agent-written changes do not become silent debt."
date: "2026-09-13"
status: published
---

An agent can produce a large diff quickly. Speed is not review. Merge only what you can explain.

Cursor’s agent tools include reading and editing files, running shell commands, searching the codebase and, where enabled, browser checks. Those tools help generate candidates. You still own the merge.

## Read the diff like a security reviewer

Ask:

- Did it touch secrets, auth, payments or permissions?
- Did it add dependencies you did not request?
- Did it weaken tests or delete failing ones?
- Are error paths and empty states handled, or only the happy path?

If you cannot summarise the change in two sentences, ask the agent for a summary—and verify it against the diff.

## Prefer reversible steps

Commit in small units. Keep a branch. Use Cursor checkpoints for mid-session rollback if needed, then commit to Git when the change is intentional. Checkpoints are not a substitute for Git.

## Run the checks you trust

At minimum: the project build, the tests that cover the changed area, and a manual click-path for anything user-facing. If the agent claims tests passed, confirm the command and the output.

## Review checklist (copy)

- [ ] Scope matches the brief
- [ ] No unexpected files or dependency changes
- [ ] Secrets and credentials untouched
- [ ] Build / relevant tests run locally
- [ ] Manual check of the user-facing path
- [ ] Disclosure/privacy text updated if behaviour changed for visitors
- [ ] Ready to revert with Git

## Exercise

Take the last agent-assisted change in any project. Fill the checklist from the final commit alone. If any box fails, write one sentence for what you will require next time before merge.

## Sources

- [Cursor Agent overview](https://cursor.com/docs/agent/overview)

Editorial checklist by Brainchain. Tool descriptions from Cursor documentation.
