# Adding a tool to the directory

The directory is one file: `data/tools.json`. A daily job can add a tool by appending an object to the `tools` array. Do not invent a price, a plan name, or an India detail. If the official page does not state it, set the field to `unknown`.

`npm run build` reads this file and fails if an entry is incomplete, a slug is duplicated, a category id is unknown, or a lesson slug does not match a published guide.

## Entry

```json
{
  "slug": "example-tool",
  "name": "Example Tool",
  "category": "writing",
  "summary": "Two plain sentences from the official product page.",
  "whoItsFor": "Who the official page says it is for.",
  "freeTier": "Yes. What the free plan includes.",
  "paidFrom": "unknown",
  "pricingModel": "Plan names and figures copied from the pricing page, including what was not shown.",
  "pricingLastChecked": "2026-10-19",
  "pricingSource": "https://example.com/pricing",
  "indiaNotes": "unknown",
  "website": "https://example.com/",
  "lessons": [],
  "featured": false
}
```

`category` must be one of: `automation`, `writing`, `research`, `voice-audio`, `coding`, `image-video`, `productivity`.

`slug` is lowercase letters, numbers, and single hyphens. It becomes `/tools/<slug>`.

`lessons` is an array of guide slugs from `_posts/`, or `[]`. Only link a lesson that actually teaches the tool.

`featured` is `false` unless the tool has a paid featured placement. `true` fills the Sponsored slot on `/tools` and inside that tool's category. Leave it `false` for an ordinary listing.

`affiliateUrl` is optional. Omit it for a normal listing. The only affiliate URL in the directory today is Make's: `https://www.make.com/en/register?pc=brainchain`. When the field is set, the tool page button uses it, `rel="sponsored noopener"`, and an “(affiliate link)” label.

`offer` is optional and only for a single figure you can point at on the pricing page. It is copied into JSON-LD. Skip it when the page did not show a clear number.

```json
"offer": {"price": "10", "priceCurrency": "USD", "description": "What that number is, and the date."}
```

`indiaNotes` is for INR prices, UPI, or Indian cards, and only when an official page says so. Otherwise `unknown`.

Set `pricingLastChecked` to the day you opened the pricing page (`YYYY-MM-DD`). `pricingSource` and `website` must be `https://` URLs.

## Check

Open the pricing page and the product page. Copy figures you can see. Write `unknown` for the rest. Then:

```bash
npm run build
```

Confirm `/tools`, `/tools/<slug>`, and `/llms.txt`. `/llms.txt` is generated from this file and the lessons, so you do not edit it by hand.

## Inquiry form

`/feature-your-tool` posts to `/api/feature-inquiry`, a Cloudflare Pages Function in `functions/api/feature-inquiry.mjs`. The Next.js build stays a static export. Pages compiles `functions/` on its own. The project’s output directory remains `out`.

To store submissions, add a KV namespace binding named `INQUIRIES` on the Pages project. To forward them, set `INQUIRY_WEBHOOK_URL` to an https endpoint you control. Either one is enough. Neither needs a paid plan.

If neither is set, the function returns “not connected” and the page opens a `mailto:` draft only when `inquiryEmail` in `data/site.json` is a real inbox. The committed value is `REPLACE_WITH_INBOX@example.com`. Replace that placeholder. Do not commit a personal address if this file is public and you would rather keep the inbox in the Cloudflare dashboard only. With the placeholder left as-is, an unconfigured form tells the visitor that nothing was sent.
