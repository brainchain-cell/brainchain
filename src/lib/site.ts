import site from "../../data/site.json";

export const SITE_URL = "https://brainchainlab.com";

/** Public inbox used only for the mailto fallback. Replace the placeholder in data/site.json. */
export const INQUIRY_EMAIL = site.inquiryEmail;

/** True when the address is safe to open in a mail client. The placeholder is not. */
export function inquiryEmailIsConfigured(email: string): boolean {
  const value = email.trim().toLowerCase();
  if (!value.includes("@") || value.startsWith("@") || value.endsWith("@")) return false;
  if (value.includes("replace_with")) return false;
  if (value.endsWith("@example.com") || value.endsWith("@example.org")) return false;
  return true;
}
