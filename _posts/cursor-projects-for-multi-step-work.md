---
title: "Use Cursor Projects for work that outlives one chat"
category: Cursor
readTime: 8
excerpt: "Direct a Cursor Project through its coordinator: shared context, cloud workers, and a review gate you still own."
date: "2026-09-21"
status: published
---

A single chat is enough for a small diff. It is a poor fit for a migration that spans many pull requests, a feature that needs research before code, or a job you want watched while your laptop is closed. Cursor’s Projects feature is built for that longer horizon.

Cursor’s docs describe a Project as a persistent body of work—a feature, a migration, or a full app—that you direct by chatting with a coordinator agent. The coordinator plans and delegates. It does not write the code itself. Implementation, research, and testing go to other agents, including many in parallel. Projects run on Cloud Agents, keep shared context across those agents, and can act from subscriptions (Slack, pull requests, CI, schedules) without a fresh prompt each time.

Treat that as a capability description. How you brief, constrain, and review a Project is editorial guidance, in the same spirit as [briefing one coding agent](/posts/brief-a-coding-agent) and [reviewing the diff before merge](/posts/review-before-you-merge-ai-code).

## What changes in the workflow

Three documented pieces matter day to day:

1. **Coordinator over workers.** You talk to one coordinator. It creates and manages agents that do the work, and brings finished work back for you to check. Cursor says that because it delegates rather than executes, it stays responsive to direction.
2. **Cloud by default, local when needed.** A Project runs on its own cloud computer, so closing your laptop does not stop it. When something must be tested on your machine, the coordinator can start a local agent there. Docs also note that cloud execution lets a Project run more agents in parallel than a laptop could support.
3. **Shared context that grows.** Each Project keeps files that sync across the cloud and local machines its agents use. Agents add research, artifacts, and lessons (for example, how to test a service). Later agents are meant to reuse that context instead of starting from zero.

**Subscriptions** are the optional listen layer. Ask the coordinator to watch a Slack channel, follow pull requests, react to CI, or run on a schedule. Once at least one subscription exists, Cursor documents a Listening pill that lists events such as a channel message, PR activity, CI on a branch, or a daily schedule.

Cursor’s launch post also says Projects can delegate to “thousands of subagents.” The docs are more modest: as many agents in parallel as the work needs. Plan from the docs, and treat the larger figure as marketing.

## Limits to plan around

Cursor’s Projects docs state several boundaries:

- Projects are **rolling out** and, on the launch post and changelog, are in **beta**.
- Projects are **not available on Enterprise plans**.
- Projects are **not available with Privacy Mode (Legacy)**, because Cloud Agents store code in the cloud while they run.
- You pick a **workspace repository** available to your cloud agents (a GitHub connection may be required) and a **model** for the coordinator.

The launch post also cites internal productivity numbers: new Projects users merge 30% more PRs, and people who primarily use Projects merge six times as many. Those figures are Cursor measuring its own users. Merge volume is a vendor productivity claim. Re-check the live post before you repeat it in a team policy, and keep a separate check for bugs, reverts, and review time.

## Patterns that fit

Cursor describes three internal patterns:

- **Feature work.** Research, a plan, parallel implement and test, an optional local try, then later bug follow-up in the same Project. Approve the plan and file list before large edits. Keep Git as durable history.
- **Migrations.** Agree a safe approach, then apply it across many pull requests. Review early pull requests closely. Widen the review only after the pattern holds up.
- **Gardening.** Recurring quality work via subscriptions (pull requests, Slack bugs, schedules). Start with draft or notify. Keep merges, deploys, and customer-facing sends behind a person.

Keep irreversible actions off an unattended subscription until you have watched the Project on reversible tasks. Force-push, production secrets, customer email, and payment changes belong in that held-back list.

## Brief the coordinator

Reuse a single-agent brief, then add Project fields:

> Goal: [one outcome that outlives a single chat]
>
> Workspace: [repo / area]
>
> In scope / out of scope: [paths, services, what not to touch]
>
> Parallelism: [what may run together vs what must stay serial]
>
> Shared context to capture: [test commands, architecture notes, review preferences]
>
> Subscriptions (if any): [listen-only vs propose-only vs opening a PR]
>
> Verify by: [build, tests, manual path]
>
> Stop and ask if: [auth, payments, schema, public copy]

Ask for a plan and an agent breakdown before a wide set of edits. When results return, review diffs the same way you would for any coding agent: scope, secrets, dependencies, tests, and the user-facing path.

## Exercise

Pick one real piece of work that already spans more than one pull request or more than one sitting (a rename, a styling cleanup, or a feature with research, UI, and tests).

1. Write the coordinator brief above before you open Projects.
2. Mark which steps are safe to run in parallel and which must stay serial.
3. Decide the review gate for the first three PRs (you read every line) and for later ones (a checklist, only if the early PRs held up).
4. If you have Projects access, run only the planning turn. Compare the coordinator’s proposed split with your paper plan, and note any scope expansion.

The paper exercise is enough if you do not have the beta. The point is to practice directing multi-step work before you add agents.

## Sources

- [Introducing Projects · Cursor](https://cursor.com/blog/projects) — launch post, 10 September 2026, including Cursor’s own PR-merge figures
- [Projects · Cursor Docs](https://cursor.com/docs/agent/projects) — coordinator, cloud and local agents, shared context, subscriptions, Enterprise and Privacy Mode limits
- [Cursor Projects · Changelog](https://cursor.com/changelog/projects) — beta rollout summary

Coordinator briefing, review gates, and the “reversible subscriptions first” rule are Brainchain editorial guidance. Availability, fleet size, and productivity statistics come from Cursor’s own materials. Re-check the live docs before you rely on them in a team policy.
