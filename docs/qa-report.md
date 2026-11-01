# QA report — 1 November 2026

## Automated checks

- Next.js **16.3.4** production compilation, TypeScript checks and static generation passed.
- Existing tool-data validation passed for **29** entries.
- Export verification passed for **57 application HTML pages**, **56 preserved route checks**, `/subscribe`, and **1,192 internal page/fragment links**, with no errors. The separate embedded-form document is checked for its provider action, required email, required consent and removal of the unverified worksheet promise.
- App pages have a main skip target, one H1, a description and canonical metadata where appropriate. IDs are unique within each exported app document; checked internal fragments exist.
- Source bodies, lesson/path relationships and provider facts were preserved. This was not a fresh fact-check of all inherited tool prices or product capabilities.

## Browser checks on the production export

- Desktop Home, Learn, About, Subscribe and a direct writing-lesson route were inspected visually.
- Home tabs changed by pointer and keyboard; Right selected the meeting example and End selected automation. ARIA selection and visible panel changed together.
- Search “Notion” returned **2** lessons; a nonsense query returned the no-results state; reset restored **11**. Advanced level returned **5**. The Briefs & research path returned **2** on mobile.
- Completion changed to selected with Enter and remained selected after a full page reload. The notice explicitly limits persistence to this browser.
- Responsive inspection used same-origin iframe viewports: **390px frame** (375px layout area after the scrollbar) and **768px frame**. Home and Learn stacked correctly; the mobile menu opened with Enter and closed on navigation. The mobile Learn document width equalled its viewport width; desktop About also had no horizontal overflow.
- The final standalone newsletter form loaded inside its titled iframe. Its email label, required consent and submit action were present. **No subscription was submitted.** Delivery, confirmation-link completion, welcome automation and unsubscribe require a founder-owned test inbox.

## Contrast spot checks

Ratios calculated from the implemented sRGB tokens:

| Pair | Ratio |
| --- | --- |
| Ink on paper | 10.97:1 |
| Muted text on paper | 5.29:1 |
| Surface text on forest button | 9.49:1 |
| Newsletter secondary text on forest | 7.35:1 |
| Focus outline on paper | 5.24:1 |
| Lime on forest-dark | 9.07:1 |

Dark surfaces use an ochre focus outline. Selection is also expressed in text/ARIA, not only color. These checks are basic QA, not a full accessibility certification or a complete assistive-technology audit.

## Observed repairs and limits

The first development preview used a launcher with incompatible CLI flags; the final browser checks used the built static export. A nested-URL directory-listing issue in the original flat export was fixed by directory-index output (`trailingSlash: true`). All application checks refer to the final directory-index build.

The live-domain deployment, DNS, Search Console, actual production traffic and email backend were not modified. No Lighthouse score or conversion improvement is claimed. The old tool-maker inquiry requires its existing Cloudflare Pages Function and configuration; the separate static review uses the retained email fallback when that endpoint is unavailable.

The temporary responsive harness is removed before publication. The private review defaults to noindex; only the founder's public release should enable indexing.
