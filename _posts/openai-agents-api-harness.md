---
title: "Treat OpenAI’s Agents API as a managed harness, not autopilot"
category: Agents
readTime: 9
excerpt: "The Agents API runs a managed Codex harness with durable sessions, tools and a sandbox you choose. You still own approvals and the environment."
date: "2026-09-21"
status: published
---

A long-running agent usually needs the same machinery: session state, a tool loop, context compaction, recovery and sometimes subagents. OpenAI’s Agents API exposes that machinery as a managed Codex harness your application calls. The official clients use a beta namespace, and raw HTTP requests send the header `OpenAI-Beta: agents=v1`.

This lesson explains what the docs say the API provides, how it differs from adjacent OpenAI surfaces, and how to adopt it without outsourcing judgment. Launch timing and any customer stories belong on [OpenAI’s announcement](https://openai.com/index/introducing-the-agents-api/). This guide follows the API docs, which are the pages to re-check before production use.

If the task is a fixed trigger and a fixed action, stay with ordinary automation. See [Do you need an agent—or just automation?](/posts/agent-or-automation).

## What the docs say the API is

From the [Agents API overview](https://developers.openai.com/api/docs/guides/agents-api/overview) and the [agents guide](https://developers.openai.com/api/docs/guides/agents):

- You create a cloud agent by specifying the task, model, tools and environment.
- OpenAI hosts the harness: sessions, orchestration, context compaction and recovery.
- You choose compute: an OpenAI-hosted sandbox, a self-hosted sandbox, or no sandbox when the agent should not run commands or edit local files.
- In a sandbox, agents can run code, edit files, connect to MCP servers and produce artifacts.
- The harness supports programmatic tool calling, steering while work runs, subagents and resuming a session.
- The overview’s session example includes `multi_agent` with `max_concurrent_subagents` when you want parallel subagents.

Self-hosted sandbox docs name partner setups you can follow: Modal, Cloudflare, Vercel, Daytona, Blaxel, E2B, Runloop, DigitalOcean and Oracle Cloud Infrastructure. Those are integration guides, not a requirement to use a partner.

**Pricing, as documented:** model usage is billed at the selected model’s API rates, OpenAI tools at their standard rates, and OpenAI-hosted sandboxes at standard container rates. Confirm the live pricing page before you budget a workflow.

**Data controls, as documented:** the Agents API currently supports data residency only in the United States and does not support Zero Data Retention (ZDR). Choosing a self-hosted sandbox does not make the API ZDR-eligible.

Core concepts in the docs: an **agent** (model, instructions, tools, MCP), an **environment** (sandbox or computer), a **session** (a durable instance) and **events and items** (inputs and outputs). You can delete sessions and published artifacts when you are finished.

## Agents API, Agents SDK, or Responses API

OpenAI’s agents guide draws this line:

| You want… | Start here |
| --- | --- |
| Codex harness managed by OpenAI, with durable cloud sessions | Agents API |
| The agent loop inside your app, with tools and handoffs you control | Agents SDK |
| Direct model calls, or a loop you build yourself | Responses API |

“We use agents” is not a stack decision. Decide who owns orchestration state and where code runs, then pick the surface.

## A first session, in product terms

The [quickstart](https://developers.openai.com/api/docs/guides/agents-api/quickstart) walks through an OpenAI-hosted sandbox that writes and runs a small script:

1. Create a session with the agent config and an environment (`openai_hosted`, `self_hosted`, or `none`).
2. Send input to start a turn.
3. Stream events, or use webhooks, to follow progress and to see when the agent needs input.
4. Continue or steer the same session. Save the session id if you want a follow-up turn.

The quickstart also says a completed turn does not guarantee every tool succeeded. Look for a completed turn, and treat failed or cancelled turn events as failures. SDKs add the beta header for you. The documented application-key permissions for that quickstart are agents read, agents write and responses write. Check the live page before you mint a production key, and keep that key outside the sandbox.

## Design the approval boundary before you enable subagents

1. **Separate investigate from act.** An incident-style agent can draft findings and proposed mitigations. Require a person, or a strict allowlist, before restarts, rollbacks or customer messages.
2. **Cap concurrency on purpose.** `max_concurrent_subagents` is a cost and blast-radius control, not only a speed dial.
3. **Pin instructions and skills in version control.** If you mount capability directories, treat them like production config.
4. **Log session ids and artifacts.** Durable sessions help recovery. They also linger. Know how you delete sessions and published artifacts when the work is done.
5. **Re-read residency and ZDR limits** before you put regulated workloads on the beta API.
6. **Do not confuse harness quality with task correctness.** Compaction and delegation help long runs. They do not verify business facts.

## Exercise

Pick one internal task that already needs tools (summarise a failing CI log, draft a note from a repo README, or investigate a staging error with read-only logs).

1. Write a one-page design: instructions, tools (including MCP if any), environment choice (hosted, self-hosted, or none) and the human approval steps.
2. Mark which sub-tasks could be parallel subagents and which must stay serial.
3. List data you are not allowed to send (secrets, customer data) and how the environment is supposed to enforce that.
4. If you have API access, run the quickstart in a throwaway directory. Map each event you actually see to “informational” or “needs a human.” The docs’ example is a script that prints a directory tree. Do not point it at production credentials.
5. If you lack access, stop after the paper design.

## Sources

- [Introducing the Agents API · OpenAI](https://openai.com/index/introducing-the-agents-api/) — announcement; use it for launch context, then confirm behaviour in the docs
- [Agents API overview · OpenAI Docs](https://developers.openai.com/api/docs/guides/agents-api/overview) — concepts, harness capabilities, pricing and the residency/ZDR note
- [Agents API quickstart · OpenAI Docs](https://developers.openai.com/api/docs/guides/agents-api/quickstart) — session create, beta header, hosted-sandbox example, cleanup
- [Agents · OpenAI Docs](https://developers.openai.com/api/docs/guides/agents) — Agents API versus SDK versus Responses API
- [Self-hosted sandboxes · OpenAI Docs](https://developers.openai.com/api/docs/guides/agents-api/environments/self-hosted) — partner environment guides
- [OpenAI-hosted sandboxes · OpenAI Docs](https://developers.openai.com/api/docs/guides/agents-api/environments/openai-hosted) — hosted environment type and network access

The approval checklist and “use automation when the path is fixed” are Brainchain editorial guidance. API behaviour, headers, environments and data-control statements are summarised from OpenAI’s docs. Re-verify those pages before production use. The API is exposed as a beta surface.
