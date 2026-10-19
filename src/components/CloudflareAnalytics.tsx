/**
 * Cookieless Cloudflare Web Analytics.
 * Renders nothing until NEXT_PUBLIC_CF_BEACON_TOKEN is present at build time.
 *
 * The beacon reads `data-cf-beacon` from its own script tag. A plain script
 * element keeps that attribute in the static HTML. `spa` counts client-side
 * navigations between exported pages.
 */
export function CloudflareAnalytics() {
  const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN?.trim();
  if (!token) return null;
  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token, spa: true })}
    />
  );
}
