---
title: "Run parallel Claude Code threads without losing the merge story"
category: Agents
readTime: 8
excerpt: "Anthropic’s redesigned Claude Code Projects run parallel cloud threads under one goal. You still own merge order, conflicts, and usage."
date: "2026-09-21"
status: published
---

Juggling several coding-agent sessions by hand means you divide the work, chase handoffs, and stitch results together. Anthropic’s redesigned Projects in Claude Code turn that into one conversation: you set a goal; Claude scopes the work, runs parallel threads, reviews outputs, and assembles a result you can still steer.

This lesson covers what Anthropic documents about that redesign, and how to use it while parallelism is still ordinary software work. If you also use Cursor, compare it with [Cursor Projects](/posts/cursor-projects-for-multi-step-work): both use a coordinator and long-lived context. The public materials differ on branches, conflicts, and listen-style subscriptions.

## What changed

Anthropic’s post *Projects redesigned: from folder to conversation* describes the new experience as available in **beta in Claude Code**. The older model was closer to a folder of files, instructions, and chats. The new model is a project chat with:

- a **coordinator** that directs work,
- **threads** that do the work,
- **shared memory** and a **library** of files and artifacts that build over time.

Anthropic states that each thread is a Claude Code cloud session on its own branch and copy of the repo. Threads can split work further with subagents, loops, and workflows. You can monitor progress in the main project chat or open a thread to steer details. Work can continue after you step away; Anthropic also notes you can steer from your phone.

The Verge’s 17 September 2026 report matches that framing: multiple agents under one project, shared memory and artifacts, coordinator-directed threads, and merge conflicts when threads overlap.

## What is documented

Anthropic’s post describes these behaviours:

- You describe a multi-part goal. Claude suggests work, delegates to threads, and checks in.
- With repositories connected, threads can open pull requests and run tests.
- A cross-repo example: migrate callers across API, web, and mobile repos in parallel, then surface which pull requests need to merge first.
- Shared memory examples include “the release moved to Friday” and who to check before touching billing.
- You can adjust check-in frequency, how often new threads start, and how detailed updates are.
- Project-specific usage is visible. You can select model and effort for the coordinator and for worker threads.

Three limits are easy to skip:

- Overlapping edits are resolved as a **merge conflict, like any other pull request**. Someone still owns conflict resolution and review.
- Threads run in the **cloud** today. Anthropic says running on your machine, with your local tools and behind your network, is “coming very soon.”
- **Each thread is a full Claude Code session**, so a project can **reach usage limits faster**. Parallel threads are a usage cost, not a discount.

## Access, as of the announcement

Anthropic’s post, and The Verge’s summary of it, describe a phased beta:

- Starting availability: **select Claude Pro and Max** subscribers who use **cloud sessions** in Claude Code and **do not already have** existing projects on web or desktop.
- Then more Claude Code users on those plans, and later updated projects across Claude more broadly, including Team and Enterprise. Existing projects keep working in the meantime. A waitlist exists if you lack access.

Re-check Anthropic’s live post or your account before you promise a team rollout. Beta eligibility changes.

## A parallel-work playbook

When you do have access:

1. **Write the goal as outcomes and constraints.** Anthropic’s own examples are specific: reduce checkout p75 latency, or retire a deprecated v1 endpoint across repos, with tests and pull requests stated up front.
2. **Name the serial steps.** Schema migrations, auth changes, and shared package bumps rarely belong in three unconstrained threads.
3. **Assign merge order.** Ask the coordinator which pull requests must land first, then check that order yourself.
4. **Keep irreversible actions behind approval.** Opening a draft pull request is a different action from merging, and merging is a different action from deploying.
5. **Budget usage.** Start with two threads on disposable branches. Read project-specific usage before you scale to one thread per service.
6. **Put decisions in the project library.** Prefer durable artifacts (decision notes, test commands) over hoping memory alone survives a busy week.

Cursor’s materials emphasise a cloud coordinator, synced context files, and subscriptions. Claude Code’s materials emphasise per-thread branches and pull-request conflict handling. Choose from repo hosting, plan access, and whether you need listen-style automations.

## Exercise

Choose a multi-part task you already understand (update copy in three packages, or add the same logging helper in two services).

1. On paper, split the work into at most three threads and one serial gate.
2. Write the merge-order rule you would accept.
3. List two places where parallel edits would create a real conflict.
4. If you have Claude Code Projects access, run planning plus one thread. Compare your conflict predictions with what appears. If you do not have access, the paper plan completes the lesson.

## Sources

- [Projects redesigned: from folder to conversation · Claude by Anthropic](https://claude.com/blog/projects-redesigned) — product description, access, usage warning, local execution note
- [Claude Code relaunches Projects · The Verge](https://www.theverge.com/ai-artificial-intelligence/997134/anthropic-claude-code-projects) — 17 September 2026 report quoting Anthropic’s thread and branch model

The playbook and the “merge order is yours” rule are Brainchain editorial guidance. Feature, access, and usage details are summarised from Anthropic’s announcement and that report. Re-verify the live pages before you set a team policy.
