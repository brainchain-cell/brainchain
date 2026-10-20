# Lesson template

Copy this when you add a lesson. Put the file in `_posts/<slug>.md`. The slug is the filename, and it becomes the URL `/posts/<slug>`. Do not change a slug after publication.

The loader in `src/lib/api.ts` rejects a published lesson that fails the checks below. Read time is computed from the body (about 220 words per minute, rounded up). Do not set `readTime` in frontmatter.

Do not invent a date. `date` is the first publication date. `lastReviewed` is the date a person last re-checked the lesson. Leave a date out when you do not have one. The 11 lessons published before this template omit `lastReviewed` for that reason.

## Frontmatter

```yaml
---
title: "Short lesson title"
category: Automation
excerpt: "One sentence on what the reader leaves able to do."
date: "YYYY-MM-DD"          # first published; omit if unknown
lastReviewed: "YYYY-MM-DD"  # omit until someone has actually reviewed it
level: foundations           # foundations | core | advanced
path: first-automation       # id from data/modules.json
order: 1                     # position on that path; gaps are allowed
prerequisites: []            # optional slugs of published lessons
next: some-other-slug        # optional; must be the next published lesson on the same path
status: published
---
```

| Field | Required | Rule |
|---|---|---|
| `title` | yes | Non-empty string. |
| `category` | yes | Short label shown with the lesson. Existing labels include Automation, Writing, Productivity, Notion, Cursor, and Agents. |
| `excerpt` | yes | One sentence. Used on cards and in the page description. |
| `date` | no | `YYYY-MM-DD`. First publication. Use the existing frontmatter date or the first git commit that added the file. Do not guess. |
| `lastReviewed` | no | `YYYY-MM-DD`. A person re-checked the lesson on this date. It cannot be earlier than `date`. This is not the date of a mechanical edit. |
| `level` | yes | `foundations` (first automation), `core` (briefs and research; meetings and operations), or `advanced` (build with agents). |
| `path` | yes | One of `first-automation`, `briefs-and-research`, `meetings-and-ops`, `build-with-agents`. These match the future path routes. Add a path in `data/modules.json` before you use a new id. |
| `order` | yes | Positive integer. Unique on that path. The unpublished flagship lessons leave a gap: Meetings & operations starts at 2. |
| `prerequisites` | no | List of published lesson slugs. Use `[]` or omit it when there are none. Do not list this lesson. |
| `next` | no | Slug of the next published lesson on the **same** path. Omit it on the last published lesson. The lesson page's Previous / Next links follow `order`, not a hand-written link in the body. |
| `status` | yes | `published`, or the file is ignored. |

`planOrder` in `data/modules.json` is the site plan's path number (1 Briefs & research, 2 Meetings & operations, 3 First automation, 4 Build with agents). `catalogOrder` is the order beginners see: First automation first, so `choose-your-first-automation` leads the lists.

## Section skeleton

The page already shows the breadcrumb back to `/learn`, the level, the path, the published date, the last-reviewed date when it exists, the prerequisites note, the computed read time, and Previous / Next. Write the body in this order. Skip a section only when it does not apply, and say why in the draft.

1. **Outcome preview.** What the reader leaves with, shown before the method.
2. **At a glance.** Who it is for, reading time and practice time as separate figures, prerequisites, tools, and evidence status: Observed, Documentation-based, or Illustrative. Observed only when a named person ran the workflow and the notes say who, when, on which plan, and in which region.
3. **The problem**, in one paragraph about the reader's situation.
4. **Core idea.** Up to three short sections. Each factual product statement links to a primary source.
5. **Worked example.** A fictional scenario, carried through, with the expected output shown.
6. **Build it**, when a tool is taught. Use the vendor's names for steps, and link the vendor doc for anything that is not obvious.
7. **Failure cases.** What goes wrong when the method is misapplied.
8. **What it costs to run.** Units times volume, with a source and an access date. If a price is not on the official page, write unknown. Do not estimate a price.
9. **India notes**, when the lesson teaches a paid tool. Billing currency, payment methods the vendor names, and tax or data notes. Source each note, or mark it for a check before publication.
10. **Exercise.** Copyable, with a "done when" check, plus one recall question. It must be possible on paper when the reader has no access to the tool.
11. **Documented vs our opinion.** Two short lists. Vendor figures stay attributed to the vendor.
12. **Next steps.** The other path and a related tool page. Previous and Next lessons are rendered from path order, so do not hard-code those URLs in a way that can drift.
13. **Sources.** Title, URL, and the date accessed. Primary sources first. Label secondary sources as a report or a community post.

An affiliate link stays out of the markdown. The site adds the labelled Make button, after the body, only for lessons already listed in `MAKE_AFFILIATE_SLUGS`. Do not add another Make URL, and do not edit the newsletter embed.

When a later edit changes a conclusion, add `lastReviewed` only if a person re-checked the facts, and add a one-line change note at the end: `Changed YYYY-MM-DD: what changed.`
