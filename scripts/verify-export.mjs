import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import matter from "gray-matter";

const root = path.resolve("out");
function walk(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
    );
}
const htmlFiles = walk(root).filter(
  (f) => f.endsWith(".html") && !f.endsWith("newsletter-form.html"),
);
const contents = new Map(htmlFiles.map((f) => [f, fs.readFileSync(f, "utf8")]));
const errors = [];
const idsByFile = new Map();
let linkCount = 0;
const decode = (s) =>
  s
    .replaceAll("&amp;", "&")
    .replaceAll("&#x26;", "&")
    .replaceAll("&#39;", "'")
    .replaceAll("&quot;", '"');
function resolveRoute(route) {
  const name = decodeURIComponent(route).replace(/^\//, "");
  const candidates = [
    path.join(root, name),
    path.join(root, name, "index.html"),
    path.join(root, `${name}.html`),
  ];
  return candidates.find((f) => fs.existsSync(f) && fs.statSync(f).isFile());
}
for (const [file, html] of contents) {
  const rel = path.relative(root, file);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => decode(m[1]));
  idsByFile.set(file, new Set(ids));
  if (ids.length !== new Set(ids).size)
    errors.push(`${rel}: duplicate HTML IDs`);
  if ((html.match(/<h1(?:\s|>)/g) || []).length !== 1)
    errors.push(`${rel}: expected one H1`);
  if (!html.includes('id="main"'))
    errors.push(`${rel}: missing main skip target`);
  if (!/<meta name="description" content="[^"]+"/.test(html))
    errors.push(`${rel}: missing description`);
  if (!/404|_not-found/.test(rel) && !html.includes('rel="canonical"'))
    errors.push(`${rel}: missing canonical`);
}
for (const [file, html] of contents) {
  for (const m of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const href = decode(m[1]);
    if (!href.startsWith("/") && !href.startsWith("#")) continue;
    if (href.startsWith("//") || href.startsWith("/api/")) continue;
    linkCount++;
    const url = new URL(
      href,
      "https://brainchainlab.com" +
        ("/" + path.relative(root, file).replace(/index\.html$/, "")),
    );
    const target = href.startsWith("#") ? file : resolveRoute(url.pathname);
    if (!target) {
      errors.push(
        `${path.relative(root, file)}: missing internal destination ${href}`,
      );
      continue;
    }
    if (
      url.hash &&
      idsByFile.has(target) &&
      !idsByFile.get(target).has(decodeURIComponent(url.hash.slice(1)))
    )
      errors.push(`${path.relative(root, file)}: missing fragment ${href}`);
  }
}
const legacy = [
  "/",
  "/start",
  "/learn",
  "/about",
  "/tools",
  "/updates",
  "/disclosure",
  "/feature-your-tool",
  "/for-ai",
  "/llms.txt",
  "/robots.txt",
  "/sitemap.xml",
];
for (const f of fs.readdirSync("_posts").filter((f) => f.endsWith(".md"))) {
  const p = matter(fs.readFileSync(path.join("_posts", f), "utf8"));
  if (p.data.status === "published") legacy.push(`/posts/${f.slice(0, -3)}`);
}
for (const p of JSON.parse(fs.readFileSync("data/modules.json", "utf8")))
  legacy.push(`/learn/${p.id}`);
const toolData = JSON.parse(fs.readFileSync("data/tools.json", "utf8"));
for (const tool of toolData.tools) legacy.push(`/tools/${tool.slug}`);
for (const route of [...legacy, "/subscribe"])
  if (!resolveRoute(route)) errors.push(`Missing exported route: ${route}`);
// The standalone embedded form is a document fragment, not an application page.
// Check its request/consent boundary separately; never submit during verification.
const form = fs.readFileSync(path.join(root, "newsletter-form.html"), "utf8");
if (
  !form.includes(
    'action="https://assets.mailerlite.com/jsonp/2632671/forms/198498694424692477/subscribe"',
  )
)
  errors.push("Newsletter form: provider action changed");
if (
  !/<input[^>]*required[^>]*type="email"|<input[^>]*type="email"[^>]*required/.test(
    form,
  )
)
  errors.push("Newsletter form: required email missing");
if (
  !/<input[^>]*type="checkbox"[^>]*required|<input[^>]*required[^>]*type="checkbox"/.test(
    form,
  )
)
  errors.push("Newsletter form: required consent missing");
if (form.includes("first-automation worksheet"))
  errors.push("Newsletter form: unverified resource promise");
const result = {
  htmlPages: htmlFiles.length,
  internalLinksChecked: linkCount,
  preservedRouteChecks: legacy.length,
  newRoute: "/subscribe",
  errors: [...new Set(errors)],
};
console.log(JSON.stringify(result, null, 2));
assert.equal(result.errors.length, 0, "Export verification failed");
