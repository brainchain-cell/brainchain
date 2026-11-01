# IA and text wireframes

## Sitemap

| Route | Role | v1 action |
| --- | --- | --- |
| `/` | Explain the product and route a task | Full redesign |
| `/learn` | Search/browse the 11 lessons | Full redesign with filters |
| `/learn/briefs-and-research` | Ordered brief/research path | Preserve content/route; shared visual refresh |
| `/learn/meetings-and-ops` | Ordered records/operations path | Preserve content/route; shared visual refresh |
| `/learn/first-automation` | Ordered beginner path | Preserve content/route; shared visual refresh |
| `/learn/build-with-agents` | Advanced path | Preserve content/route; shared visual refresh |
| `/posts/{existing-slug}` | Canonical lesson | New reading template; all 11 slugs preserved |
| `/about` | Founder, purpose, standards, separation | Full rewrite/redesign |
| `/subscribe` | Sample, consent, subscription | New page |
| `/start` | Existing goal-based entry page | Retain; existing links remain valid |
| `/tools` and `/tools/{existing-slug}` | Supporting directory | Retain all 29 entries and data; restyle |
| `/updates` | Existing official-source links | Retain; secondary navigation |
| `/disclosure` | Commercial relationships and privacy | Retain; add local progress storage explanation |
| `/feature-your-tool` | Existing inquiry route | Retain; backend deployment caveat in README |
| `/for-ai`, `/llms.txt` | Agent-readable context | Retain |
| `/sitemap.xml`, `/robots.txt`, `404` | Discovery/errors | Continue static generation |

Primary navigation: **Learn · Tools · About · The newsletter**. Footer carries updates, standards/approach, disclosure/privacy, tool-maker inquiry and AI context. No empty future sections are published.

## Home wireframe

1. Header: brand at left; small primary navigation at right; outlined newsletter link. Mobile uses a labelled menu button.
2. Hero, two columns: short display headline, practical audience/task copy, primary Learn CTA, secondary founder CTA, compact editorial/free-reading note. Right: an interactive workbench with Brief / Meeting / Automation examples, showing input, AI assistance, human check and output.
3. Thin process strip: task → steps → check → adapt. This reinforces the learning method once.
4. Four path cards: task name, specific outcome, actual lesson count and path link.
5. Three featured lessons: real titles, computed reading time, short excerpts, level and a concept illustration.
6. Founder note: monogram, name/context, editorial principles and About link.
7. Newsletter invitation: promise and link to sample/signup, not a popup.
8. Footer: secondary routes and accountable authorship.

## Learn hub wireframe

1. Display introduction: the work in front of the reader is the organizing principle.
2. Beginner banner: direct route to the existing first-automation exercise.
3. Search field and level select; path filter chips beneath.
4. Result count and reversible clear action.
5. Three-column lesson grid on desktop, one column on mobile. Each card is a real published item; all links appear in initial HTML.
6. Empty state when filters match nothing, with an explicit reset.
7. Newsletter invitation and footer.

## Lesson wireframe

1. Breadcrumb: Learn → path → current title.
2. Task/path label, one H1 and outcome/excerpt.
3. Compact facts: published/reviewed dates where known, read time, level and path; do not manufacture freshness.
4. Prerequisite links and documentation-based provenance.
5. Two-column reading area: local contents rail at desktop; readable article at right. Mobile becomes a simple document. Existing Markdown body, exercises, sources and tables remain.
6. Practice checkpoint: reversible “Mark as complete,” stored in this browser with a plain explanation.
7. Existing affiliate CTA only when the original lesson already qualifies; source/disclosure link.
8. Previous/next lesson on the same path.
9. Newsletter invitation.

## About wireframe

1. Purpose-led introduction and the question behind the project.
2. Founder card: Krishna Ravishankar, founder, independent project. A monogram is used instead of an invented photograph.
3. Personal project explanation; source/practice/judgment standards.
4. Explicit employer/client separation.
5. Existing public correction inbox and disclosure link.
6. Newsletter invitation.

## Subscribe wireframe

1. Promise: new workflows, useful tasks and review steps; no unverified sending schedule.
2. Left: illustrative sample issue with short practice sequence, takeaway and link to the full free lesson.
3. Right: subscription context, existing MailerLite form, confirmation expectation, provider fallback and privacy link.
4. The sample is labelled as illustrative, not presented as an actual previous send or promised automated resource.

No account wall, paid upsell, countdown, invented testimonial or client logo appears in these flows.
