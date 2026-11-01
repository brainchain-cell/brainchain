# Brainchain Lab — Fieldnotes v1

Ivory and forest-green redesign of the Brainchain Lab Next.js static site. Practical AI workflows for work you have to get right. Existing lessons, paths, tool entries, inquiry inbox, Make affiliate disclosure, and the Cloudflare Pages project are retained.

## Run locally

Use Node **22 LTS or newer** and npm. From this project directory:

```bash
npm ci
npm run dev
```

Open the localhost URL printed by Next.js (normally http://localhost:3000).

```bash
npm run build
npm run verify:export
```

The build checks the existing tool data, type-checks and exports the site to `out/`. It includes Home, Learn, four paths, all 11 lessons, About, Subscribe, all 29 tool pages and supporting routes. The export verifier checks route preservation, internal page/fragment links, one H1 per page, metadata and duplicate IDs. `npm run typecheck` can be used independently.

For a quick static preview, after building:

```bash
python3 -m http.server 8080 --directory out
```

Directory indexes make direct `/learn/`, `/subscribe/` and lesson URLs work on a basic static host. Do not use `next start` for a static export.

## What changed

- New ivory/forest editorial system, serif headlines and interlocking brand mark.
- Homepage with keyboard-operable workflow tabs, four task paths, three real lesson cards and a founder note.
- Search + level/path filters, result count, empty state and reset on Learn.
- Lesson contents links, readable source-based template and reversible browser-local completion.
- Named founder and explicit separation from employer/client work.
- `/subscribe` with a labelled illustrative issue and the existing MailerLite provider form. No invented subscriber count or sending schedule.
- Existing lesson/path/tool slugs and publication dates retained. Make is the sole inherited affiliate link.

## Files

```text
src/app/                 Next App Router pages, metadata, styles
  page.tsx               Home
  learn/page.tsx         Learn hub
  learn/[path]/page.tsx  Retained path pages
  posts/[slug]/page.tsx  Lesson template
  about/page.tsx         Founder and standards
  subscribe/page.tsx     Sample issue and existing provider form
  tools/                Retained directory and detail pages
src/components/          Brand, SiteNav, WorkflowPreview, LessonCard,
                         LessonCatalog, LessonProgress, NewsletterSignup
src/lib/                 Existing catalog, source parsing and metadata
_posts/                  11 original Markdown lessons
data/                    Paths, 29 tools, source updates, public contact
public/                  Brand icon and share image
functions/               Existing Cloudflare Pages inquiry/alias functions
scripts/verify-export.mjs Export and migration checks
docs/                    Executive brief, research, system, IA, backlog,
                         risk/migration notes and QA report
```

## Configure

No secret is required for the front-end. `.env.example` explains the two build-time variables:

- `NEXT_PUBLIC_SITE_INDEXABLE` controls the robots meta tag. `.env.production` sets it to `true` so `next build` (including the Cloudflare Pages build of this repo) stays indexable, matching the public site. A host environment variable overrides the file. Set `NEXT_PUBLIC_SITE_INDEXABLE=false` only for a private noindex build. `next dev` does not load `.env.production`, so local development stays noindex.
- `NEXT_PUBLIC_CF_BEACON_TOKEN` enables the retained optional Cloudflare analytics component. Leave it unset in the repo. Set it in Cloudflare Pages → Settings → Environment variables, then redeploy. Unset means no analytics script from that component.

The MailerLite form is the existing public form for account `2632671`, slug `QZNbil` (generated form ID `198498694424692477`). `public/newsletter-form.html` retains its generated submission action, provider script, fields and callback. Local presentation removes an unverified resource promise and asks for email confirmation after the provider callback. Subscription goes directly to MailerLite, and the provider owns consent/confirmation. A standalone local form link is visible if the iframe fails. No newsletter API key is in the bundle. Actual email delivery/welcome automation was not tested; use a founder-owned inbox before promoting signup.

Progress stores lesson slugs under `brainchain:completed:v1`. It stays in the current browser, is reversible and can be removed by clearing site data. Search and filters use React state only.

## Deploy to Cloudflare Pages (recommended: retain the existing host)

Connect the reviewed branch through the founder's existing account. Build command: `npm run build`. Output directory: `out`. Node: 22 or newer. Set the production indexing variable explicitly. Keep existing custom domain/alias configuration and inquiry bindings. Next.js static export requires no Next-on-Workers adapter.

The existing `functions/` directory is outside the exported assets and is deployed by Cloudflare's connected Pages workflow. Static-only hosting of `out/` does **not** provide `/api/feature-inquiry`; the retained inquiry UI has its existing email fallback. Do not assume a static upload provisions email handling.

## Deploy to Vercel

Import the reviewed repo with the Next.js preset, run `npm run build` and use its static export. Set the same production-only indexing variable. The core learning/subscribe front-end needs no server function. Cloudflare's `functions/` will not execute there: keep the contact fallback or port the inquiry handler separately before promising that service. Configure hostname redirects at the Vercel/domain level if moving hosting.

`.openai/hosting.json` keeps this repository’s existing project id. It does not control the Cloudflare Pages project, and a review-site id must not replace it. No DNS is changed by the source itself.

## Editorial workflow

Edit `_posts/*.md`; retain real publication/review dates, `status`, path, order and prerequisite relationships. Read time is computed, not a marketing completion-time promise. Use `docs/lesson-template.md`. Do not mark inherited guides as hands-on tested: they remain documentation-based editorial until actual test evidence is added.

See [executive brief](docs/executive-brief.md), [research](docs/research-notes.md), [design system](docs/design-system.md), [IA/wireframes](docs/ia-and-wireframes.md), [ranked backlog](docs/backlog.md) and [risks/release](docs/risks-and-migration.md). The QA report records checks and limits.
