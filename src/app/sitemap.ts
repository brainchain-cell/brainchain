import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/api";
import { SITE_URL } from "@/lib/constants";
import { getTools } from "@/lib/tools";

export const dynamic = "force-static";

const APP_DIR = path.join(process.cwd(), "src", "app");
const PAGE_FILES = new Set(["page.tsx", "page.ts", "page.jsx", "page.js"]);

/**
 * Static App Router pages, including routes added later (for example `/tools`).
 * Dynamic segments such as `posts/[slug]` are skipped here and filled from content.
 */
function staticRoutes(dir = APP_DIR, segments: string[] = []): string[] {
  const routes: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith("_") || entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith("(") && entry.name.endsWith(")")) {
        routes.push(...staticRoutes(full, segments));
        continue;
      }
      if (entry.name.startsWith("[") || entry.name.startsWith("@")) continue;
      routes.push(...staticRoutes(full, [...segments, entry.name]));
      continue;
    }
    if (PAGE_FILES.has(entry.name)) {
      routes.push(segments.length === 0 ? "/" : `/${segments.join("/")}`);
    }
  }
  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = staticRoutes().map((route) => ({
    url: route === "/" ? SITE_URL : `${SITE_URL}${route}`,
  }));
  const posts = getAllPosts().map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}`,
    ...(post.date ? { lastModified: post.lastReviewed ?? post.date } : {}),
  }));
  const tools = getTools().map((tool) => ({
    url: `${SITE_URL}/tools/${tool.slug}`,
  }));
  const seen = new Set<string>();
  return [...pages, ...posts, ...tools]
    .filter((item) => {
      if (seen.has(item.url)) return false;
      seen.add(item.url);
      return true;
    })
    .sort((a, b) => a.url.localeCompare(b.url));
}
