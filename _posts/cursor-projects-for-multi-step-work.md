---
title: "Use Cursor Projects for work that outlives one chat"
category: Cursor
readTime: 8
excerpt: "Direct a Cursor Project through its coordinator, then keep shared context and subscriptions behind a review gate."
date: "2026-09-21"
status: published
---

A single chat is enough for a small diff. It is a poor fit for a migration that spans many pull requests, a feature that needs research before code, or a job you want watched while your laptop is closed.

Cursor’s Projects feature is built for that longer horizon. The [Projects docs](https://cursor.com/docs/agent/projects) describe a Project as a persistent body of work—a feature, a migration, or a full app—that you direct by chatting with a coordinator agent. The coordinator plans and delegates. It does not write the code itself. Implementation, research and testing go to other agents, including many in parallel. Projects run on Cloud Agents, keep shared context across those agents, and can act from subscriptions without a fresh prompt each time.

Treat that as a documented capability. How you brief, constrain and review a Project is editorial guidance.

## What changes in the workflow

Three product pieces matter day to day:

1. **Coordinator over workers.** You talk to one coordinator. It creates and manages agents and brings finished work back for you to check. Because it delegates rather than executes, Cursor describes it as staying responsive to direction.
2. **Cloud by default, local when needed.** A Project runs on its own cloud computer, so closing your laptop does not stop it. Docs also note that cloud execution lets a Project run more agents in parallel than a laptop could support. When something must be tested on your machine, the coordinator can start a local agent there.
3. **Shared context that grows.** Each Project keeps files that sync across the cloud and local machines its agents use. Agents add research, artifacts and lessons (for example, how to test a service). Later agents are meant to reuse that context instead of being onboarded from zero.

**Subscriptions** are the optional listen layer. Ask the coordinator to watch a Slack channel, follow pull requests, react to CI, or run on a schedule. Once at least one subscription exists, docs describe a Listening pill that lists events such as channel messages, PR activity, CI on a branch, or a daily schedule.

## Limits to plan around

Cursor’s docs state several boundaries:

- Projects are rolling out, and the launch post describes them as in beta.
- Projects are not available on Enterprise plans.
- Projects are not available with Privacy Mode (Legacy), because Cloud Agents store code in the cloud while they run.
- You pick a workspace repository available to your cloud agents (a GitHub connection may be required) and a model for the coordinator.

The [launch post](https://cursor.com/blog/projects) also cites internal productivity numbers: new users merge 30% more PRs, and users who primarily use Projects merge six times as many. Those figures are Cursor measuring its own users. They are not an independent quality audit. Merge volume is not the same as fewer bugs, fewer reverts, or less review time.

## Patterns that fit—and patterns that do not

Cursor describes three internal patterns:

| Pattern | What the product is for | Editorial caution |
| --- | --- | --- |
| Feature work | Research, then a plan, then parallel implement and test, with an optional local try and later bug follow-up in the same Project | Approve the plan and file list before large edits. Keep Git as durable history. |
| Migrations | Agree a safe approach, then apply it incrementally across many PRs | Review early PRs closely. Loosen review only after the pattern holds up. |
| Gardening | Recurring quality work via subscriptions (PRs, Slack bugs, schedules) | Start with draft or notify only. Keep merges, deploys and customer-facing sends behind human approval. |

Do not put irreversible actions—force-push, production secrets, customer email, payment changes—on an unattended subscription until you have watched the Project on reversible tasks.

## Brief the coordinator like a program manager

Reuse the same discipline as a [single-agent brief](/posts/brief-a-coding-agent), then add Project-specific fields:

> Goal: [one concrete outcome that outlives a single chat]
>
> Workspace: [repo / area]
>
> In scope / out of scope: [paths, services, what not to touch]
>
> Parallelism: [what may run in parallel vs what must stay serial]
>
> Shared context to capture: [test commands, architecture notes, review preferences]
>
> Subscriptions (if any): [listen-only vs propose-only vs auto-PR]
>
> Verify by: [build, tests, manual path]
>
> Stop and ask if: [auth, payments, schema, public copy]

Ask for a plan and an agent breakdown before a wide blast of edits. When results return, review diffs the same way you would for any coding agent: scope, secrets, dependencies, tests and the user-facing path. See [Review AI code before you merge it](/posts/review-before-you-merge-ai-code).

## Exercise

Pick one real piece of work that already spans more than one PR or more than one sitting (a rename, a cleanup, or a feature with research, UI and tests).

1. Write the coordinator brief above without opening Projects.
2. Mark which steps are safe to parallelise and which must stay serial.
3. Decide the review gate for the first three PRs (you read every line) versus later ones (a checklist only if earlier PRs held up).
4. If you have Projects access, run only the planning turn. Compare the coordinator’s proposed split with your paper plan. Note any scope expansion.

You do not need the beta to finish the paper exercise. The point is to practise directing multi-step work before you scale agents.

## Sources

- [Introducing Projects · Cursor](https://cursor.com/blog/projects) — product announcement (10 September 2026), including Cursor’s own merge-rate figures
- [Projects · Cursor Docs](https://cursor.com/docs/agent/projects) — how Projects work, limits and subscriptions
- [Cursor Projects · Changelog](https://cursor.com/changelog/projects) — cloud agents, shared context and subscriptions

Coordinator briefing, review gates and the “no irreversible subscriptions first” rule are Brainchain editorial guidance. Availability, privacy limits and productivity figures are taken from Cursor’s own materials. Re-check the live docs before you rely on them in a team policy.
