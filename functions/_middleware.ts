/**
 * 301 www.brainchainlab.com and brainchain.pages.dev to https://brainchainlab.com.
 *
 * Cloudflare Pages `_redirects` matches paths only. Domain-level rules are
 * unsupported, so hostname canonicalisation lives in this Function, which
 * runs in front of static files. Branch previews (`*.brainchain.pages.dev`)
 * are left on their own host.
 *
 * HTTP to HTTPS is an edge setting (SSL/TLS → Edge Certificates → Always Use
 * HTTPS). The edge upgrades the scheme before this function runs.
 */

const CANONICAL_HOST = "brainchainlab.com";
const ALIAS_HOSTS = new Set(["www.brainchainlab.com", "brainchain.pages.dev"]);
/** Pages Function for the tools-directory inquiry. A redirect would turn POST into GET. */
const INQUIRY_PATH = "/api/feature-inquiry";

type MiddlewareContext = {
  request: Request;
  next: () => Promise<Response>;
};

export async function onRequest(context: MiddlewareContext): Promise<Response> {
  const url = new URL(context.request.url);
  if (url.pathname === INQUIRY_PATH) return context.next();
  if (!ALIAS_HOSTS.has(url.hostname)) return context.next();
  url.protocol = "https:";
  url.hostname = CANONICAL_HOST;
  return Response.redirect(url.toString(), 301);
}
