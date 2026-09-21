---
title: "Turn team know-how into Notion skills and export SKILL.md"
category: Notion
readTime: 8
excerpt: "Notion 3.7 stores reusable agent instructions in a skills library and can export them as SKILL.md. Version the skill; verify the output."
date: "2026-09-21"
status: published
---

Useful prompts often live in one person’s head, or vanish into a chat no one can find next quarter. Notion 3.7, in release notes dated 15 September 2026, introduces agent skills: reusable instructions that teach AI how your team works. They live in a workspace skills library, can be run from Notion Agent, and can be downloaded as `SKILL.md` plus approved supporting files for other agents.

This lesson is about skills and `SKILL.md`. Adjacent 3.7 items—Custom Agent sub-agents, post-meeting automation, the model picker, the Agent SDK—are real product features. They stay out of scope here unless they change how you govern skills.

Keep the earlier boundary in place: AI drafts are not approved records. See [Keep Notion AI drafts separate from approved records](/posts/keep-notion-ai-drafts-separate).

## What Notion documents

From the [Notion 3.7 release notes](https://www.notion.com/releases/2026-09-15):

- Skills are reusable instructions. Examples include generating a monthly business review in your team’s format, or critiquing a doc the way a specific reviewer would.
- A skills library is the workspace hub for shared skills.
- Related skills can live in a Notion database. You can share one skill or the whole database so people stay on the latest version.
- You can chat with Notion Agent to create a skill, or ask Notion to suggest skills from work you already do.
- In a Notion Agent chat, type `/` to choose a skill, add context and run it. Skills can also be set to run automatically.
- You can download a skill for Claude Code, Codex, Cursor, Gemini or Grok. Notion writes a `SKILL.md` file with approved supporting files. When the Notion skill changes, it is marked with a badge so you know to take the latest version.

Notion’s follow-up, [A skills library for every agent](https://www.notion.com/blog/a-skills-library-for-every-agent) (17 September 2026), adds a Skills API: endpoints for loading skills from Notion in spec-compliant file formats, including syncing into GitHub. The same post says Vercel’s `skills` CLI can install a Notion page marked as a skill, and that `npx skills add notion` installs plugins from the workspace. Confirm command details against Notion’s docs and the CLI before you automate installs.

## Documented feature and editorial suggestion

| Topic | Documented | Editorial suggestion |
| --- | --- | --- |
| Authoring | Create and update skills in Notion; Agent can help draft them | Write skills as procedures with inputs, outputs and “stop and ask” rules |
| Discovery | Skills library, databases and the `/` menu | Name skills after outcomes (“Exec brief from draft”), not after people |
| Portability | Export `SKILL.md` and supporting files to the listed agents; a badge marks changes | Treat Notion as the source of truth. Re-export or sync when the badge appears |
| Automation | Skills can run automatically | Auto-run only for reversible drafts. Do not auto-send, pay or delete without approval |
| Trust boundary | Same workspace as other Notion AI | Land output in a draft page first. Do not let a skill overwrite the only copy of an approved page |

A skill does not remove Notion’s general AI limitations. Notion’s own help says AI may be incorrect, outdated or biased. A polished skill can still produce a wrong brief. The skill standardises process. You still verify claims.

## A minimal skill outline

Notion’s export is the product path. You do not need a private format. When you author in Notion, aim for content that still makes sense after export:

1. **Purpose** — one sentence: when to invoke this skill.
2. **Inputs** — pages, databases or attachments the skill expects. @-mention sources you control.
3. **Steps** — ordered actions the agent should take.
4. **Output contract** — where the draft should land, required sections and tone.
5. **Verification** — what a human checks before anything becomes the system of record.
6. **Stop conditions** — ambiguous policy, missing owner, conflicting sources.

Put “facts must cite workspace pages X and Y” inside the skill. Put “publish to the wiki” outside the skill, as a human step.

## How this fits the rest of your Notion hygiene

- Skills belong in the library or skill databases, with an owner.
- Skill outputs belong in draft destinations unless a human promotes them.
- An exported `SKILL.md` in Cursor or Claude Code should stay traceable to the Notion skill (name, date or sync commit). Otherwise the copies diverge.

Notion 3.7 also describes Custom MCP connections such as GitHub and Amplitude. The release notes say confirmations stay on so nothing changes in a connected tool until you approve it, and that this connection path is in beta on Business and Enterprise plans. Leave those confirmations on for anything that writes outside a scratch space.

## Exercise

Pick one repetitive task your team already does with AI (a status update, a PRD from notes, an exec brief, a new-hire checklist).

1. Write the six-part outline above in a new Notion draft page, not on an approved SOP page.
2. Mark every factual dependency (a levelling framework, a device policy, a brand-voice page).
3. Add an explicit verification checklist for the human.
4. If your workspace has 3.7 skills, create the skill from that draft and run it once with `/` into a draft-only destination. If you also use a coding agent, download `SKILL.md` and confirm the exported steps still match the Notion version.
5. Note one automatic-run scenario you would refuse until an approval exists.

## Sources

- [September 15, 2026 – Notion 3.7: Agent skills for your whole team](https://www.notion.com/releases/2026-09-15) — skills library, `/` invocation, `SKILL.md` export targets
- [A skills library for every agent · Notion Blog](https://www.notion.com/blog/a-skills-library-for-every-agent) — Skills API, GitHub sync and the Vercel `skills` CLI
- [What is Notion AI? FAQs](https://www.notion.com/help/notion-ai-faqs) — incorrect, outdated or biased output

The skill outline, draft-versus-record separation and the auto-run caution are Brainchain editorial guidance. Product behaviour and export targets are summarised from Notion’s release notes and blog. Re-check those pages, and Notion’s Skills API docs, before you roll skills out across a company.
