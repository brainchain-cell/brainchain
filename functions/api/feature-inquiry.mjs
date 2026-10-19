/**
 * Cloudflare Pages Function for the /feature-your-tool form.
 *
 * Static export cannot run this code. Cloudflare Pages compiles /functions
 * separately from the Next.js `out` directory.
 *
 * Delivery, in order, with no paid service required:
 * - If the INQUIRIES KV binding exists, the submission is stored there.
 * - If INQUIRY_WEBHOOK_URL is set, the same JSON is POSTed to that URL.
 * - If neither is set, the function returns 503 and the page falls back to
 *   mailto using data/site.json (see src/lib/site.ts). Do not put a personal
 *   inbox in this file.
 *
 * Setup is described in CONTRIBUTING-tools.md.
 */

const INTERESTS = new Set(["featured-listing", "newsletter-mention", "both"]);

function clean(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function validate(fields) {
  const name = clean(fields.name);
  const email = clean(fields.email);
  const toolName = clean(fields.toolName);
  const website = clean(fields.website);
  const interest = clean(fields.interest);
  const message = String(fields.message ?? "").trim();
  if (name.length < 1 || name.length > 120) return "name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return "email";
  if (toolName.length < 1 || toolName.length > 160) return "tool";
  if (website && (!/^https:\/\/\S+$/.test(website) || website.length > 300)) return "website";
  if (!INTERESTS.has(interest)) return "interest";
  if (message.length < 1 || message.length > 4000) return "message";
  return "";
}

function page(title, body) {
  const html = `<!doctype html><html lang="en"><meta charset="utf-8"><title>${title}</title><body style="font-family:Arial,sans-serif;max-width:640px;margin:48px auto;padding:0 20px;color:#142826"><h1>${title}</h1><p>${body}</p><p><a href="/feature-your-tool">Back to the form</a> · <a href="/tools">Tools</a></p></body></html>`;
  return new Response(html, {headers: {"content-type": "text/html; charset=utf-8"}});
}

function respond({wantsJson, url, status, body, query}) {
  if (wantsJson) {
    return Response.json(body, {status});
  }
  if (status === 200) {
    return page("Inquiry received", "Thank you. Brainchain has the note and will reply if the listing is a fit. There is no payment on this form.");
  }
  if (status === 503) {
    return page("Inquiry form is not connected yet", "Storage is not configured on this site. Set a Cloudflare KV binding named INQUIRIES or an INQUIRY_WEBHOOK_URL, or replace the placeholder inbox in data/site.json so the page can open a mail draft. Nothing was stored.");
  }
  return Response.redirect(`${url.origin}/feature-your-tool?${query}`, 303);
}

export async function handleInquiry({request, env}) {
  const url = new URL(request.url);
  const contentType = request.headers.get("content-type") || "";
  const wantsJson = contentType.includes("application/json") || (request.headers.get("accept") || "").includes("application/json");
  const length = Number(request.headers.get("content-length") || "0");
  if (length > 20000) {
    return respond({wantsJson, url, status: 400, body: {ok: false, error: "too-large"}, query: "status=invalid"});
  }

  let fields;
  try {
    if (contentType.includes("application/json")) fields = await request.json();
    else fields = Object.fromEntries((await request.formData()).entries());
  } catch {
    return respond({wantsJson, url, status: 400, body: {ok: false, error: "invalid"}, query: "status=invalid"});
  }

  if (clean(fields.company_website)) {
    return respond({wantsJson, url, status: 200, body: {ok: true}, query: "sent=1"});
  }

  const error = validate(fields);
  if (error) {
    return respond({wantsJson, url, status: 400, body: {ok: false, error}, query: "status=invalid"});
  }

  const configured = Boolean(env && (env.INQUIRIES || env.INQUIRY_WEBHOOK_URL));
  if (!configured) {
    return respond({wantsJson, url, status: 503, body: {ok: false, fallback: "mailto"}, query: "status=unconfigured"});
  }

  const record = {
    receivedAt: new Date().toISOString(),
    name: clean(fields.name),
    email: clean(fields.email),
    toolName: clean(fields.toolName),
    website: clean(fields.website),
    interest: clean(fields.interest),
    message: String(fields.message ?? "").trim(),
  };

  try {
    if (env.INQUIRIES) {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      await env.INQUIRIES.put(`inquiry:${id}`, JSON.stringify(record));
    }
    if (env.INQUIRY_WEBHOOK_URL) {
      const forwarded = await globalThis.fetch(env.INQUIRY_WEBHOOK_URL, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(record),
      });
      if (!forwarded.ok) {
        return respond({wantsJson, url, status: 502, body: {ok: false, error: "forward-failed"}, query: "status=error"});
      }
    }
  } catch {
    return respond({wantsJson, url, status: 502, body: {ok: false, error: "store-failed"}, query: "status=error"});
  }

  return respond({wantsJson, url, status: 200, body: {ok: true}, query: "sent=1"});
}

export async function onRequestPost(context) {
  return handleInquiry({request: context.request, env: context.env});
}
