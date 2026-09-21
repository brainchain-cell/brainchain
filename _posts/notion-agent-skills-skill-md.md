---
title: "Turn team know-how into Notion skills—and export SKILL.md"
category: Notion
readTime: 8
excerpt: "Notion 3.7 collects reusable agent instructions in a skills library and can export them as SKILL.md. Version the skill, and keep trusted pages protected."
date: "2026-09-21"
status: published
---

Useful prompts often live in one person’s head, or vanish into a chat no one can find next quarter. Notion 3.7, in release notes dated 15 September 2026, introduces agent skills: reusable instructions that teach AI how your team works. They live in a workspace skills library, can be run from Notion Agent, and can be downloaded as `SKILL.md` plus approved supporting files for other agents.

This lesson is about skills and `SKILL.md`. The same release also covers Custom Agent sub-agents, post-meeting automation, a model picker, and an Agent SDK. Those are real features. Leave them out of the skill workflow unless they change how you govern a skill.

If your team already separates drafts from approved pages, keep that split. Skills make it sharper. See [Keep Notion AI drafts separate from approved records](/posts/keep-notion-ai-drafts-separate).

## What Notion documents

From the [Notion 3.7 release notes](https://www.notion.com/releases/2026-09-15):

- Skills are **reusable instructions**. Notion’s examples include a monthly business review in the team’s format, or a critique in the style of a specific reviewer.
- A **skills library** is the workspace hub for shared skills.
- Related skills can live in a **Notion database**. You can share one skill or the whole database so people stay on the latest version.
- You can **chat with Notion Agent to create a skill**, or ask Notion to **suggest skills** from work you already do.
- In a Notion Agent chat, type **`/`** to choose a skill, add context, and run it. Notion also says skills can be set to **run automatically**.
- You can **download** a skill for **Claude Code, Codex, Cursor, Gemini, or Grok**. Notion writes a **`SKILL.md`** file with **approved supporting files**. When the Notion skill changes, it is **marked with a badge** so you know to take the latest version.

Notion’s 17 September 2026 post *A skills library for every agent* adds a **Skills API**: endpoints for loading skills from Notion in spec-compliant file formats, including a path to sync them into GitHub. The same post says Vercel’s `skills` CLI can install a Notion page marked as a skill, and that `npx skills add notion` installs plugins from your workspace interactively, using that API. Confirm CLI flags and the API reference in Notion’s docs before you automate installs. The blog is a product announcement, and the exact command surface can move.

## Documented behaviour and a safer default

- **Authoring.** Notion documents creating and updating skills in the workspace, with Agent help for drafts. Write a procedure: inputs, outputs, and when to stop and ask.
- **Discovery.** The skills library, databases, and the `/` menu are the documented ways to find a skill. Name skills after outcomes (“Exec brief from draft”).
- **Portability.** Export is documented as `SKILL.md` plus supporting files for the listed agents, with a badge when the Notion copy changes. Keep Notion as the source, and re-export or sync when the badge appears.
- **Automation.** Notion says skills can run automatically. Limit that to reversible drafts.
- **Connected tools.** Custom MCP connections—GitHub and Amplitude are named—can require confirmation before a change. Notion says this connector path is in beta on Business and Enterprise. Leave confirmations on for anything that writes outside a scratch space.

The 3.7 notes do not spell out a separate plan gate for the skills library. Other Notion AI features are limited to Business and Enterprise, with a small complimentary allowance on Free and Plus. Check your workspace before you promise a team that the workflow will stay available.

A skill also inherits Notion AI’s documented limits. Notion’s guide *Using Notion AI to extend your impact* says Notion AI may output incorrect information, harmful content, outdated results, and biased responses. A polished skill standardises the process. You still check the claims.

## What should survive export

Notion’s download is the product path. You do not need a private file format. When you author in Notion, aim for content that still makes sense as `SKILL.md`:

1. **Purpose** — one sentence: when to invoke this skill.
2. **Inputs** — pages, databases, or files the skill expects. @-mention sources you control.
3. **Steps** — ordered actions.
4. **Output contract** — where the draft should land, which sections are required, and the tone.
5. **Verification** — what a person checks before anything becomes the system of record.
6. **Stop conditions** — ambiguous policy, a missing owner, or conflicting sources.

Put “facts must cite workspace pages X and Y” inside the skill. Put “publish to the wiki” outside the skill, as a human step.

## Where skills sit in the workspace

- Skills belong in the library or a skill database, with an owner.
- Skill outputs belong in a **draft** destination unless a person promotes them.
- An exported `SKILL.md` in Cursor or Claude Code should stay traceable to the Notion skill (name, date, or sync commit). Otherwise the copies diverge.

## Exercise

Pick one repetitive task your team already does with AI (a status update, a PRD from notes, an exec brief, or a new-hire checklist).

1. Write the six-part outline above on a **new** draft page, not on an approved SOP.
2. Mark every factual dependency (a levelling framework, a device policy, a brand-voice page).
3. Add a verification checklist for the person who will accept the result.
4. If your workspace has 3.7 skills, create the skill from that draft and run it once with `/` into a draft-only destination. If you also use a coding agent, download `SKILL.md` and confirm the exported steps still match the Notion version.
5. Name one automatic-run case you will refuse until an approval step exists.

## Sources

- [September 15, 2026 – Notion 3.7: Agent skills for your whole team](https://www.notion.com/releases/2026-09-15) — skills library, `/` invocation, `SKILL.md` export targets
- [A skills library for every agent · Notion](https://www.notion.com/blog/a-skills-library-for-every-agent) — Skills API, GitHub sync, Vercel `skills` CLI
- [Using Notion AI to extend your impact](https://www.notion.com/help/guides/using-notion-ai) — incorrect, outdated, and biased output
- [What is Notion AI? FAQs](https://www.notion.com/help/notion-ai-faqs) — plan availability and usage allowance

The six-part outline, the draft-versus-record split, and the auto-run caution are Brainchain editorial guidance. Product behaviour and export targets are summarised from Notion’s release notes and blog. Re-check those pages, and the Skills API docs, before you roll skills out across a company.
