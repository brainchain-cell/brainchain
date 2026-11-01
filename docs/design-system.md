# Design system — Fieldnotes

The visual idea is a working notebook with a considered editorial voice: warm paper, dark green ink, an occasional annotation, and a workbench that explains the work. The distinctive elements are typographic scale, generous spacing, an interlocking mark and task diagrams rendered in HTML/CSS. They do not require an image CDN, font service or animation framework.

## Tokens

The implementation is `src/app/globals.css`; its `:root` variables are authoritative.

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#f7f5ed` | Page background |
| `--surface` | `#fffef9` | Cards and reading examples |
| `--ink` | `#203c32` | Main text |
| `--muted` | `#5b6960` | Secondary text |
| `--forest` | `#214d3c` | Primary buttons, links, brand |
| `--forest-dark` | `#183b2e` | Workbench, hover state |
| `--mint` | `#dce8cd` | Practice/checkpoint surfaces |
| `--lime` | `#d3e59b` | Result highlight on dark green |
| `--ochre` | `#e6c780` | Decorative underline/annotation |
| `--rose` | `#e7c5b5` | Founder monogram background |
| `--line` | `#d7dbcf` | Non-interactive rules/card dividers |
| `--focus` | `#a84a25` | Keyboard outline on light surfaces |
| `--radius` / `--radius-lg` | `8px` / `16px` | Cards / workbench |
| `--content` / `--reading` | `1200px` / `690px` | Overall content / prose measure |

Green, ink and muted text are used on paper/surface. Light-green fills carry dark text; the dark workbench uses light text. Ochre is decorative, not small body text. Color never carries completion or selection alone: text labels and ARIA state convey it too.

Spacing scale: **4, 8, 12, 16, 24, 32, 48, 64, 96px**. Use one step for internal gaps and a larger step for separating sections. Desktop hero and section spacing are intentionally generous; mobile reduces the outer rhythm, not the reading line height.

## Typography

| Role | Face | Desktop range | Mobile / behavior |
| --- | --- | --- | --- |
| Display hero | Georgia / Times New Roman | 60–94px, line-height ≈1.02 | 58–78px fluid |
| Page H1 | Georgia | 44–70px, line-height 1.08 | 44px; lesson H1 39px |
| Section H2 | Georgia | 34–43px | 28–36px |
| Lesson/card title | Georgia | 24–28px | 27–28px |
| Lesson body | Arial / Helvetica | 17px, line-height 1.85 | 16px, same generous leading |
| Supporting copy | Arial / Helvetica | 13–19px | 13–17px |
| Controls / metadata | Arial / Helvetica | 9–14px by hierarchy | 10–14px; primary controls remain distinct |
| Step numbers / small annotations | Courier New | 10–12px | Same; decorative numbers are not instructions |

The CSS also exposes a compact utility scale from `--text-xs` (12px) through `--text-3xl` (40px). Named component styles handle the fluid display sizes. There is no remote font request, reducing loading work and keeping the exported build portable. Serif italics highlight a small portion of a headline, not entire paragraphs.

## Components and states

| Component | Composition | States / constraints |
| --- | --- | --- |
| Brand | Interlocking SVG mark + brainchain + LAB | Text alternative on home link; decorative SVG hidden |
| SiteNav | Learn, Tools, About, newsletter | Active route via `aria-current`; collapsible mobile menu; no-JS navigation remains visible |
| Button | Solid forest or paper-on-green | Minimum 50px height; hover background; explicit 3px focus outline; disabled state |
| WorkflowPreview | Three tabs + ordered process + output | Click and arrow/Home/End selection; one selected tab; all panels have stable IDs and hidden state |
| Path card | Number, task name, outcome, real lesson count | Entire card is one link; counts come from the existing catalog |
| LessonCard | Optional concept illustration, metadata, title, excerpt, level | Title and labelled arrow link to the lesson; no fake score or completion rate |
| LessonCatalog | Search, native level select, path chips | Filters combine; live result count; clear/reset; honest no-results state; initial HTML includes all lessons |
| Lesson reading | Outcome, provenance, prerequisites, contents, prose | Contents links get stable local IDs; tables/code scroll inside their containers |
| LessonProgress | Practice reminder + toggle | LocalStorage only; reversible; explains unavailable storage; no certificate or cross-device promise |
| NewsletterSignup | Dark editorial invitation | Real `/subscribe` link; no collection on the homepage |
| Subscribe | Illustrative issue + provider form | Titled lazy iframe; existing MailerLite consent; new-tab fallback; no fixed cadence |
| Notices | Source/affiliate/privacy details | Clear label and contextual placement; no urgency treatment |

## Layout and accessibility

The primary layout changes at 1100, 850 and 650px. The hero becomes one column; paths become two columns; lessons become one column; About and Subscribe stack. Horizontal page padding falls from 48px per side to 20px. The lesson contents rail is removed at small widths because the article remains a linear document with headings and in-page navigation is secondary.

The homepage does not need a bitmap hero. Lesson illustrations are code-native, decorative representations of a real concept, and hidden from assistive technology. Information is also written in the card title and description.

Use one H1 per page and sequential headings within a section. Provide a skip link, native buttons/selects, explicit form labels, keyboard focus and meaningful link names. `prefers-reduced-motion` disables transitions and smooth scrolling. Tables preserve their columns in a scroll area. Print styling prioritizes lesson content and sources.

The MailerLite integration uses its supported HTML embed in a titled local iframe. Labels and colors follow this system, while submission/validation use the provider script and existing form settings. Required native email and consent controls are present. Test the actual confirmation/welcome journey independently; the parent page does not establish deliverability.
