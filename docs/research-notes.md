# Research notes — Brainchain Lab redesign

Reviewed on **1 November 2026**. Observations and recommendations are separate: a visible pattern is evidence of a site's design, not evidence of its conversion rate. No competitor analytics or private funnels were available.

## 1. Current site and source audit

The live homepage was retrieved directly and inspected in a browser. The live Learn page and `/llms.txt` were retrieved with curl. The public repository [brainchain-cell/blog-starter-kit](https://github.com/brainchain-cell/blog-starter-kit), at source commit `37ac206b4e2b390c68e2a167dc0720643b463d32`, supplied the remaining implementation and content audit. The workspace originally contained no project checkout.

The search service could not open brainchainlab.com. Some direct Python requests also returned 403; those failures are not evidence that the site is down. Current live observations below are grounded in the successful homepage/browser and Learn retrievals. Other route observations are source inspections. The earlier 20 October strategy report informed the questions, but its audit claims were not treated as current facts.

### Current IA

- Home: long descriptive hero; task entry points; first automation; recent lessons; MailerLite signup region; approach/disclosure links.
- `/start`: three task groups leading to four learning paths.
- `/learn` and `/learn/{path}`: ordered lessons across briefs/research, meetings/operations, first automation and building with agents.
- `/posts/{slug}`: 11 Markdown lessons; prerequisites, source-based editorial notice, dates, computed read time, adjacent lessons and a newsletter CTA.
- `/tools` and `/tools/{slug}`: 29 tools, grouped by task/category; provider claims and pricing notes; one existing Make affiliate integration.
- About, disclosure/privacy, tool-maker inquiry, official-source updates, `/for-ai`, `/llms.txt`, sitemap and robots routes.

### Strengths to preserve

The current content already frames tasks rather than only tool names. It uses primary-source links, avoids fabricated tests, computes reading time, validates lesson relationships, and keeps the Make disclosure near its CTA. Static export gives crawlable HTML and a small hosting footprint. This redesign builds on those improvements; it is not a response to an imagined generic AI directory.

### Weaknesses and resulting decisions

| Current observation | Why it matters | v1 response |
| --- | --- | --- |
| Narrow column, similar headings, lists and rules dominate the live home | Visitors must read substantial prose to understand the product | Wide editorial hero, visual workflow sequence and differentiated section layouts |
| The hero spans first automation through advanced agents in one long sentence | An occasional AI user has to decode the full scope before choosing | Short outcome-led headline; task context in the supporting copy |
| No work artifact or worked sequence above the fold | The promise remains abstract | Three switchable examples showing input → AI assistance → human check → output |
| Learn offers structure but no search or filters | Readers with a specific task must scan the whole catalog | Client-side search, path and level filters; clear count, empty state and reset |
| Source dates and prerequisites exist but visually compete in dense metadata | Trust cues can become reading friction | Distinct outcome summary, compact factual metadata and contents navigation |
| About describes standards without a clear founder presence | Independence has no obvious accountable person | Named founder, project purpose, correction contact and brand separation |
| Newsletter is primarily a homepage region | Readers have little context for what arrives | Dedicated `/subscribe`, labelled sample issue, existing provider form and fallback link |
| Multiple CSS layers override earlier home styles | Continued redesign work is hard to reason about | Replace the stylesheet with documented variables and one responsive system |

The homepage signup region was present in the browser, but this audit did not submit it. Its absence of visible fields in that inspection is not a universal claim that the form fails. The returned MailerLite configuration does show `double_optin: true`.

## 2. Eight reference sites

“Adopt” and “avoid” are recommendations for Brainchain's stage and audience, not blanket judgments about the reference businesses. Public content for the first five references was opened directly; the final three rely on official search-indexed content where direct retrieval was blocked. Their visual systems were not independently verified in this run.

| Reference and reviewed page | Concrete pattern observed | Adopt for Brainchain | Avoid for this v1 |
| --- | --- | --- | --- |
| [Josh W. Comeau — interactive Flexbox guide](https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/) | Contents navigation, visible update date, explanations next to controllable examples, and code associated with those examples | Let the reader inspect one mechanism at a time; add a contents list; use demos to explain the work | Elaborate custom simulations in every lesson, or a mobile experience that depends on desktop-sized controls |
| [The Joy of React](https://www.joyofreact.com/) | Named instructor, detailed curriculum, exercises and project-based learning described before purchase; clearly defined starting pain | Show the teacher, requirements, lesson order and end product; let the curriculum carry the offer | A long purchase page, large-company logo wall or borrowed testimonials for a free early-stage library |
| [Learn UI Design](https://www.learnui.design/) | Explicit skill outcomes, curriculum, exercises, cheatsheets and demonstrations of actual design work | Package each lesson with a concrete exercise and eventually a resource; make the finished result visible | Copying enrollment urgency, scale claims or a community/mentor promise the founder cannot support |
| [Refactoring UI](https://refactoringui.com/) | Specific design tactics, a free chapter sample, visible examples, clear contents and an identifiable author story | Lead with a specific problem and show enough substance before asking for a commitment; create a constrained type/space/color system | Its full paid bundle and extensive social proof at Brainchain's present stage |
| [OpenAI Academy](https://academy.openai.com/) | Distinct routes for knowledge workers, builders, leaders and education; work-oriented skills and prompting/review habits | Provide separate starting points and keep ordinary workplace learning accessible without API expertise | A broad institution-sized catalog, events operation or implication of OpenAI affiliation |
| [DeepLearning.AI — AI for Everyone](https://www.deeplearning.ai/courses/ai-for-everyone) | Official course material states audience, objectives and prerequisites; catalog distinguishes beginner/intermediate and course types | Explain who a lesson is for, what it needs, and what the learner should leave with | Turning Brainchain into a technical AI academy or issuing unsupported credentials |
| [Ben's Bites catalog](https://catalog.bensbites.com/) and [ChatGPT course](https://catalog.bensbites.com/course/learn-how-to-use-chatgpt) | Searchable tutorials/courses, task-oriented summaries, roles and categories; explicit course sequencing | Short task descriptions, useful catalog filters and approachable entry lessons | Expanding categories or adding a paywall before the small core library has distinctive evidence |
| [Anthropic — AI Fluency](https://www.anthropic.com/ai-fluency) | Framework-based learning with practice using a model; competencies extend beyond prompt wording | Teach delegation and review as habits, and pair conceptual advice with practice | Reproducing its curriculum, borrowing its institutional authority or implying a vendor partnership |

### Typography and layout implications

The reference pages demonstrate a useful separation: a concise learning promise, evidence of what is taught, and details for a reader who wants to go deeper. Refactoring UI explicitly discusses hierarchy, type scales, line length and spacing; Josh's guide pairs long-form reading with local demonstrations and navigation. Neither pattern requires a dashboard aesthetic.

Brainchain's own visual recommendation is an editorial field notebook: Georgia headlines, system sans-serif reading/UI text, restrained monospace labels, ivory surfaces and forest ink. These are new design choices, not a claim to reproduce any reference site's exact fonts. The green workbench is a teaching surface; the illustrated cards describe actual lesson concepts. No decorative AI orb, robot portrait or stock office image is needed.

## 3. Patterns selected for v1

### Home: promise → example → choice → lesson → person → invitation

The primary decision is which task to start. A short hero earns attention; a visible sequence makes the product concrete; four paths remove ambiguity; three real lessons provide substance; a named founder explains accountability. The newsletter invitation appears after useful teaching is visible.

An interactive example is a format preview, not a claim that a product has been empirically tested. The interface shows no invented speedup, money saved, students taught or success rate. The three lesson cards are sourced from the real catalog, and their reading times remain computed from text.

### Learn: minimum useful filtering

Search matches titles, summaries and path names. Path and level filters combine, and a clear reset reverses them. All lesson links are rendered into the initial HTML, so the library still has a usable no-JavaScript fallback. Accounts and cross-device progress would add maintenance without evidence that they solve the first reader's problem.

The lesson itself has one visible outcome summary, source dates, prerequisites, documentation-based provenance, linked contents, the unchanged body, a practice/completion checkpoint and adjacent lessons. Local completion is a reader convenience, not a certification or proof that an exercise was completed.

### Newsletter: inspect before consenting

The sample is explicitly illustrative; it is not presented as an archived sent issue. Copy promises new learning emails and occasional resource updates, matching the current form's scope. No unverified weekly cadence, automated gift or download is promised. The current MailerLite-hosted form handles consent and confirmation; there is no fake on-site “you are subscribed” toast.

MailerLite documents embedded forms, HTML installation and share URLs in [its installation guide](https://www.mailerlite.com/help/how-to-add-a-form-to-your-website). This build uses MailerLite’s documented HTML-embed method. It retains the generated form action, provider script, IDs and consent fields, while replacing the inherited unverified worksheet promise with accurate local copy. The standalone form is isolated in a titled iframe and linked as a fallback. Its success state is shown only by the provider callback, and asks the reader to confirm their email. Delivery, sender authentication and the actual welcome automation require an owner-inbox acceptance test.

## 4. Technical decisions grounded in primary documentation

- **Keep Next.js.** It is the actual existing stack, not a preference inferred from the brief. The installed package is 16.3.4 with React 19.3.0. Its bundled current agent documentation was read before implementation. A framework switch would add migration work without a product benefit.
- **Continue static export.** Next documents [per-route HTML generation, build-time Server Components and client interactivity](https://nextjs.org/docs/app/guides/static-exports). Search/progress/tabs are small client islands; lesson and tool data remain build-time work. There is no new database or API key.
- **Export directory indexes.** `trailingSlash: true` emits `route/index.html`, avoiding the observed collision between a route's RSC data directory and its sibling `.html` file on a basic static server. The route slugs remain the same.
- **Preserve canonical URLs and publication dates.** Google advises planning URL maps and permanent redirects for actual moves, and avoiding simultaneous unnecessary changes. See [Google's migration guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes). A visual redesign does not require moving `/posts` to `/lessons`.
- **Keep labelled commercial links.** Google prefers `rel="sponsored"` on paid placements; the existing Make CTA already uses it. See [outbound-link guidance](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links). This is a markup recommendation, not legal advice or proof of program approval.
- **Accessibility targets.** [WCAG 2.2](https://www.w3.org/TR/WCAG22/) calls for sufficient contrast and visible, unobscured focus. This system uses high-contrast text, explicit focus outlines, native controls, responsive stacking and reduced-motion handling. Browser inspection and color checks are basic QA, not an independent conformance certification.

## 5. Evidence still needed

The strongest strategic recommendation remains a hypothesis until target readers try it. Ask five consultants/analysts/operators to choose a task, complete the exercise and explain what they checked. Record task success and confusion points, not flattering reactions. Use that evidence to pick the next lesson.

No conversion uplift, search ranking, affiliate acceptance, subscriber growth, client endorsement or product performance was established by this research. Existing product-specific lesson bodies and tool prices were preserved, not re-fact-checked as part of this visual build. Their next review should be dated and source-based.
