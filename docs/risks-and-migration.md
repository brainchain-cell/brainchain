# Risks, migration and release boundaries

## Commercial trust

The build retains the pre-existing Make referral URL and its local disclosure. It does not establish whether the program remains active or whether a new applicant has been approved. The founder should verify the account and destination before the public release. MailerLite and n8n are prospective monetization possibilities from the brief; no affiliate links or approval claims for them have been added. Cursor, OpenAI, Anthropic and Notion remain editorial coverage.

Keep paid relationships labelled beside their link, and keep `rel="sponsored"` on paid links. Separate sponsorship placement from editorial judgment. Do not describe a paid feature as a ranking or invent testimonials. This is an editorial/implementation risk note, not a substitute for jurisdiction-specific legal review.

## Brand separation

About explicitly states that Brainchain Lab is Krishna's personal education project, not an employer or client property. No Deloitte branding, client work product, government seal, employer endorsement or confidential example is used. The founder text derives from the supplied project context. The illustrated sample issue uses an existing fictional exercise.

## Content provenance and freshness

All 11 lesson bodies and 29 tool entries were retained. Product-specific facts and prices in those inherited items were not freshly validated as part of this redesign. Existing dates remain as-is; the build does not set “reviewed today.” The new design describes documentation-based editorial as such. Original hands-on evidence belongs in the next three flagship proof packs, not in invented “tested” badges.

## Newsletter and local progress

The public form configuration returned `double_optin: true`. The front-end reuses the provider-generated HTML action, script and consent fields in a titled local iframe. The inherited unverified worksheet promise and overly broad success claim were replaced with accurate learning-email and confirmation copy. No submission was made during QA. A delivery/welcome test requires a founder-owned inbox: submit, follow the confirmation, inspect the exact welcome message/resource and check unsubscribe. This is the only remaining acceptance step for the email journey, not a credential requirement for running the front-end.

Provider changes, blocking extensions and frame restrictions can affect embedded forms; the same standalone local form is available as a new-tab fallback. The parent page does not store an email. Completion uses LocalStorage for lesson slugs only, offers an undo and explains browser storage failure. Privacy copy includes that behavior.

## SEO and URL inventory

Keep `/posts/{slug}`, all four `/learn/{path}` routes, the directory and supporting URLs. The code adds only `/subscribe` to the public content IA. The original `/#newsletter` anchor still exists as a clear route to signup. Avoid adding `/lessons/{slug}` duplicates.

`trailingSlash: true` changes the exported file layout to directory indexes. It does not rename any slug. Ensure the hosting edge resolves both old slashless requests and their directory equivalent and canonicalizes consistently. The metadata continues to point at the existing canonical origin, https://brainchainlab.com, with its existing slashless canonical paths. Do not point production canonicals at the private review host.

The export generates an updated sitemap from all current static/content routes. Compare every original sitemap path to the new output before release. If a later change genuinely moves a URL, create one-to-one permanent redirects at the host, avoid chains and homepage catch-all redirects, and keep them for at least a year. See [Google's migration guide](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

Private review builds default to `noindex`. **Only the public production build** should set `NEXT_PUBLIC_SITE_INDEXABLE=true`. Noindex is not access control: the private review host's owner-only access supplies that protection. Verify canonical/robots metadata and Search Console ownership after production release. Keep the previous Cloudflare deployment available for rollback.

## Backend portability

Next.js exports the front-end to `out/`; it does not compile `functions/` into server routes. The existing feature-inquiry endpoint remains a Cloudflare Pages Function and requires its original account/bindings to run. The retained UI offers its existing email fallback when the endpoint is unavailable. The new private static review does not provision that backend. Vercel deployments need an equivalent server endpoint or should use the public email contact; do not claim Cloudflare Functions execute on Vercel.

## Exact human steps for the live-domain release

1. Review this private v1, then move the reviewed source into a branch of `brainchain-cell/blog-starter-kit` using the founder's normal GitHub account. No changes were pushed to that repository by this task.
2. In the existing Cloudflare Pages project, retain its current DNS/alias rules and inquiry secrets/bindings. Set `NEXT_PUBLIC_SITE_INDEXABLE=true` in production only; leave previews noindex. Retain the analytics token only if desired.
3. Build with `npm ci` and `npm run build`; publish `out/`. Confirm that the existing `functions/` directory is part of the connected source build if retaining inquiry email handling.
4. Use a founder-controlled address for the MailerLite confirmation/welcome/unsubscribe acceptance test. Change provider-side text only if its actual welcome automation supports the promise.
5. Verify Home, Learn, a direct lesson URL, a tool URL, Subscribe, 404, sitemap, canonicals and redirects on the custom domain. Compare search data to its pre-release baseline. Roll back to the previous deployment if routing or signup regresses.

No production credentials, DNS change or domain transfer is needed to inspect or run this delivered v1.
