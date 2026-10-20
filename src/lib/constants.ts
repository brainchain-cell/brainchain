/** Canonical production origin. Preview hosts are not redirected here. */
export const SITE_URL = "https://brainchainlab.com";

export const SITE_NAME = "Brainchain";

export const SITE_TITLE = "Brainchain — AI tools for useful work";

export const SITE_DESCRIPTION =
  "Practical AI workflows for professionals, from your first automation to building with agents.";

/** Default share image. Resolved against SITE_URL via metadataBase. */
export const OG_IMAGE_PATH = "/og.png";

/**
 * Make affiliate registration link (partner code `brainchain`).
 * The only place this URL is defined.
 */
export const MAKE_AFFILIATE_URL = "https://www.make.com/en/register?pc=brainchain";

/**
 * Guides that already cite Make's documentation and show one labelled affiliate CTA.
 * Verified against the lesson sources: each links to help.make.com.
 */
export const MAKE_AFFILIATE_SLUGS = [
  "choose-your-first-automation",
  "choose-ai-tools-by-task",
  "agent-or-automation",
] as const;

export function postShowsMakeAffiliate(slug: string): boolean {
  return (MAKE_AFFILIATE_SLUGS as readonly string[]).includes(slug);
}

/**
 * MailerLite embedded form already used on the homepage.
 * Account id must stay in sync with the universal script in src/app/layout.tsx.
 */
export const MAILERLITE_ACCOUNT_ID = "2632671";

export const MAILERLITE_FORM_ID = "QZNbil";
