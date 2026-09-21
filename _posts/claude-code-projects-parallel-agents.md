---
title: "Run parallel Claude Code threads without losing the merge story"
category: Agents
readTime: 8
excerpt: "Claude Code Projects can run parallel cloud threads under one goal. Plan for merge conflicts, usage limits and beta access."
date: "2026-09-21"
status: published
---

Juggling several coding-agent sessions by hand is exhausting: you divide the work, chase handoffs and stitch results together. Anthropic’s redesigned Projects in Claude Code turn that into one conversation. You set a goal; Claude scopes the work, runs parallel threads, reviews outputs and assembles a result you can still steer.

This lesson covers what Anthropic documents about that redesign, and how to use it without treating parallelism as free progress. If the path is a fixed trigger and a fixed action, start with ordinary automation instead. See [Do you need an agent—or just automation?](/posts/agent-or-automation).

## What changed

Anthropic’s post [Projects redesigned: from folder to conversation](https://claude.com/blog/projects-redesigned) describes the new experience as available in beta in Claude Code. The older model was closer to a folder of files, instructions and chats. The new model is a project chat with:

- a coordinator that directs work,
- threads that do the work,
- shared memory and a library of files and artifacts that build over time.

Anthropic states that each thread is a Claude Code cloud session working on its own branch and copy of the repo. Threads can split work further with subagents, loops and workflows. You can monitor progress in the main project chat or open a thread to steer details. Work can continue after you step away; Anthropic also notes you can steer from your phone.

[The Verge’s 17 September 2026 report](https://www.theverge.com/ai-artificial-intelligence/997134/anthropic-claude-code-projects) matches that framing, including shared memory and merge conflicts when threads overlap. Use Anthropic’s post for access rules. The report is a secondary summary, not a product spec.

## Documented capabilities and hopeful assumptions

Documented in Anthropic’s post:

- Describe a multi-part goal. Claude suggests work, delegates to threads and checks in.
- With repositories connected, threads can open pull requests and run tests.
- Cross-repo example: migrate callers across API, web and mobile repos in parallel, then surface merge order.
- Shared memory examples: the release moved to Friday; who to check before touching billing.
- You can adjust check-in frequency, how often new threads start, and how detailed updates are.
- Project-specific usage is visible. You can select model and effort for the coordinator and for worker threads.

Do not assume:

- That overlapping edits are reconciled into a clean, correct merge. Anthropic is explicit: overlap is resolved as a merge conflict like any other pull request. Someone still owns conflict resolution and review.
- That cloud threads see your local-only tools and private network today. Threads run in the cloud now. Local execution alongside your machine and network is described as “coming very soon.”
- That parallel threads are cheaper. Each thread is a full Claude Code session, so projects can reach usage limits faster.

## Access and rollout

Anthropic’s post describes a phased beta:

- Starting availability: select Claude Pro and Max subscribers who use cloud sessions in Claude Code and do not already have existing projects on web or desktop.
- Expansion: more Claude Code users on those plans over the following period; later, updated projects across Claude more broadly, including Team and Enterprise. Existing projects keep working meanwhile. There is a waitlist if you lack access.

Re-check the live post or your account before promising a team rollout. Beta eligibility changes.

## A practical parallel-work playbook

When you do have access:

1. Write the goal as outcomes and constraints, not “improve the checkout.” Anthropic’s own examples are specific: reduce checkout p75 latency, or retire a deprecated v1 endpoint across repos, with tests and pull requests stated up front.
2. Name serial choke points. Schema migrations, auth changes and shared package bumps rarely belong in three unconstrained threads.
3. Assign ownership of merge order. Ask the coordinator which pull requests must land first, then verify that order yourself.
4. Keep irreversible actions behind approval. Opening a draft pull request is different from merging. Merging is different from deploying.
5. Budget usage. Start with two threads on disposable branches. Watch project-specific usage before you scale to one thread per service.
6. Capture decisions in the project library. Prefer durable artifacts (decision notes, test commands) over hoping memory alone survives a busy week.

Cursor Projects use a similar coordinator-and-workers shape, with shared context files and subscriptions. Claude Code’s public materials stress per-thread branches and pull-request conflict handling. Pick from repo hosting, plan access and whether you need listen-style automations.

## Exercise

Choose a multi-part task you already understand (update copy in three packages, or add the same logging helper in two services).

1. On paper, split the work into threads (maximum three) and one serial gate.
2. Write the merge-order rule you would accept.
3. List two places where parallel edits would create a real conflict.
4. If you have Claude Code Projects access, run only planning plus one thread. Compare your conflict predictions with what appears. If you do not have access, stop after the paper plan.

## Sources

- [Projects redesigned: from folder to conversation · Claude by Anthropic](https://claude.com/blog/projects-redesigned) — product description, access, usage warning and the local-execution note
- [Claude Code relaunches Projects · The Verge](https://www.theverge.com/ai-artificial-intelligence/997134/anthropic-claude-code-projects) — 17 September 2026 summary of the thread and branch model

The parallel-work steps and the “merge order is yours” rule are Brainchain editorial guidance. Feature, access and usage details are summarised from Anthropic’s announcement, with The Verge used only as a contemporary report. Re-verify the live pages before you set team policy.
