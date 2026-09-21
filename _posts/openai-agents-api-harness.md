---
title: "Treat OpenAI's Agents API as a managed harness—not autopilot"
category: Agents
readTime: 9
excerpt: "The Agents API public beta exposes the Codex harness: durable sessions, tools, and sandboxes. You still choose the environment and the approval boundary."
date: "2026-09-21"
status: published
---

A long-running agent usually needs the same machinery: session state, a tool loop, context compaction, recovery, and sometimes subagents. On 10 September 2026, OpenAI introduced the Agents API in public beta. It is the Codex harness, operated by OpenAI, callable from your application.

This lesson explains what the API is documented to provide, how it differs from nearby OpenAI surfaces, and how to adopt it while judgment stays with you. If the path is a fixed trigger and a fixed action, start with [Do you need an agent—or just automation?](/posts/agent-or-automation). Reach for the Agents API when you need a durable, tool-using worker and you are willing to own review.

## What OpenAI says it is

From the announcement and the Agents API overview:

- You create cloud agents by specifying **task, model, tools, and environment**.
- OpenAI **hosts and maintains the harness**: sessions, orchestration, context compaction, and recovery.
- You choose compute: an **OpenAI-hosted sandbox**, **your own infrastructure**, or a **sandbox partner**. The announcement lists Blaxel, Cloudflare, Daytona, DigitalOcean, E2B, Modal, Oracle, Runloop, and Vercel.
- In a sandbox, agents can run code, edit files, connect to **MCP** servers, and produce artifacts.
- The harness supports **tool search**, **programmatic tool calling**, **steering** while work runs, **subagents**, and **resuming** a session.
- The API is powered by the **open-source Codex harness**. OpenAI operates it. You can inspect the public codebase.
- **Pricing:** the announcement says there is no separate Agents API fee. The overview is more specific: model usage is billed at that model’s API rates, OpenAI tools use their standard rates, and OpenAI-hosted sandboxes use standard container rates. Confirm the live pricing page.
- **Data controls:** the overview says the Agents API currently supports **data residency only in the United States** and **does not support Zero Data Retention (ZDR)**. A self-hosted sandbox does not make the API ZDR-eligible.

Core concepts in the docs: an **agent** (model, instructions, tools, MCP), an **environment** (sandbox or computer; the quickstart also allows `none` when you do not need a sandbox), a **session** (a durable instance), and **events and items** (inputs and outputs).

## Which surface to open

OpenAI’s Agents guide draws this line:

- **Agents API** — the Codex harness managed by OpenAI, with durable cloud sessions.
- **Agents SDK** — the agent loop inside your app, with tools and handoffs you control.
- **Responses API** — direct model calls, or a loop you build yourself.

“We use agents” is not a stack decision. Decide who stores orchestration state and where code runs, then pick the surface.

## A first session, in documented steps

The hosted-sandbox path in the docs is:

1. Create a session (agent config plus environment).
2. Send input to start a turn.
3. Stream events, or use webhooks, to follow progress and to notice when the agent needs input.
4. Continue or steer the same session.

Raw HTTP requires the beta header `OpenAI-Beta: agents=v1`. Official SDKs add it. The quickstart also asks for API-key permissions `api.agents.read`, `api.agents.write`, and `api.responses.write`. Check that page before you mint a production key.

Shapes called out in OpenAI’s materials include `environment: { type: "openai_hosted" }` for a managed sandbox, and `self_hosted` with a workspace directory and capability directories. `multi_agent: { enabled: true, max_concurrent_subagents: N }` turns on parallel subagents. Tools in the examples include MCP servers, web search, and programmatic tool calling.

The quickstart’s tree-script example is the smallest hosted run: the agent writes a script, runs it, and streams events. A completed turn does not, by itself, prove every tool succeeded. The quickstart says to look for a completed turn and to treat failed or cancelled events as failures. Read that page for the event names rather than copying them from a secondary write-up.

Customer quotes on the announcement report latency, cost, and reliability gains in those customers’ migrations. They are vendor-published testimonials. Use them as leads for your own evaluation.

## Set the approval boundary first

These checks sit on top of the docs:

1. **Separate investigate from act.** An incident-style agent can draft findings and proposed mitigations. Require a person, or a strict allowlist, before restarts, rollbacks, or customer messages.
2. **Cap concurrency on purpose.** `max_concurrent_subagents` limits cost and blast radius as well as speed.
3. **Pin skills and instructions in version control.** If you mount capability directories, treat them as production config.
4. **Log session IDs and artifacts.** Durable sessions help recovery. They also linger. The overview says you can delete sessions and published artifacts when you are finished. The quickstart includes a delete step.
5. **Re-read residency and ZDR limits** before you put regulated workloads on the beta.
6. **Keep harness quality separate from task correctness.** Compaction and tool search help long runs. They do not check business facts.

## Exercise

Pick one internal task that already needs tools (summarise a failing CI job, draft a note from a repo README, or investigate a staging error with read-only logs).

1. Write a one-page design: instructions, tools (including MCP if any), environment (hosted, self-hosted, or none), and the human approval steps.
2. Mark which sub-tasks could be parallel subagents and which must stay serial.
3. List data you will not send (secrets, customer personal data) and how the environment enforces that.
4. If you have API access, run the [Agents API quickstart](https://developers.openai.com/api/docs/guides/agents-api/quickstart) in a throwaway directory. Map each event you see to “informational” or “needs a person.”
5. If you lack access, the paper design completes the lesson.

## Sources

- [Introducing the Agents API · OpenAI](https://openai.com/index/introducing-the-agents-api/) — public beta announcement, 10 September 2026
- [Agents API overview · OpenAI Docs](https://developers.openai.com/api/docs/guides/agents-api/overview) — concepts, harness capabilities, pricing, residency and ZDR
- [Agents API quickstart · OpenAI Docs](https://developers.openai.com/api/docs/guides/agents-api/quickstart) — session create, beta header, key permissions, hosted sandbox
- [Agents · OpenAI Docs](https://developers.openai.com/api/docs/guides/agents) — Agents API, Agents SDK, and Responses API

The approval checklist, and the advice to stay with automation when the path is fixed, are Brainchain editorial guidance. API behaviour, headers, environments, and data-control statements are summarised from OpenAI’s announcement and docs. Re-verify those pages before production use. The product is in public beta.
