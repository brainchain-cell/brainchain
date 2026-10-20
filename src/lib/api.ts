import { type Level, type Post } from "@/interfaces/post";
import fs from "node:fs";
import matter from "gray-matter";
import { join } from "node:path";
import {
  START_HERE_SLUG,
  getLearningPath,
  getLearningPaths,
  isLevel,
} from "@/lib/paths";

const directory = join(process.cwd(), "_posts");
const SLUG = /^[a-z0-9-]+$/;
const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Silent reading speed used for lesson labels.
 * Midpoint of the 200–230 words-per-minute range; partial minutes round up.
 */
const WORDS_PER_MINUTE = 220;

export function countWords(markdown: string) {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)]\([^)]*\)/g, " $1 ")
    .replace(/https?:\/\/\S+/g, " ");
  return text.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g)?.length ?? 0;
}

export function readingTimeMinutes(wordCount: number) {
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

export function getPostSlugs() {
  return fs.readdirSync(directory).filter((name) => /^[a-z0-9-]+\.md$/.test(name));
}

function fail(slug: string, message: string): never {
  throw new Error(`${slug}: ${message}`);
}

function isRealIsoDate(value: string): boolean {
  const match = ISO_DATE.exec(value);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function requiredString(data: Record<string, unknown>, key: string, slug: string): string {
  const value = data[key];
  if (typeof value !== "string" || value.trim() === "") fail(slug, `${key} must be a non-empty string`);
  return value;
}

function optionalDate(data: Record<string, unknown>, key: string, slug: string): string | undefined {
  const value = data[key];
  if (value === undefined) return undefined;
  if (typeof value !== "string" || !isRealIsoDate(value)) fail(slug, `${key} must be YYYY-MM-DD`);
  return value;
}

function readSlugList(value: unknown, slug: string, key: string): string[] {
  if (value === undefined) return [];
  if (!Array.isArray(value)) fail(slug, `${key} must be a list of lesson slugs`);
  const slugs: string[] = [];
  for (const item of value) {
    if (typeof item !== "string" || !SLUG.test(item)) fail(slug, `${key} must be a list of lesson slugs`);
    if (item === slug) fail(slug, `${key} cannot include the lesson itself`);
    if (slugs.includes(item)) fail(slug, `${key} lists ${item} more than once`);
    slugs.push(item);
  }
  return slugs;
}

function readPost(slug: string): Post | undefined {
  if (!SLUG.test(slug)) return;
  const path = join(directory, `${slug}.md`);
  if (!fs.existsSync(path)) return;
  const { data, content } = matter(fs.readFileSync(path, "utf8"));
  const fields = data as Record<string, unknown>;
  if (fields.status !== "published") return;

  const levelValue = fields.level;
  if (typeof levelValue !== "string" || !isLevel(levelValue)) {
    fail(slug, `level must be one of ${["foundations", "core", "advanced"].join(", ")}`);
  }
  const level: Level = levelValue;

  const pathId = fields.path;
  if (typeof pathId !== "string" || !getLearningPath(pathId)) {
    fail(slug, "path must be one of the ids in data/modules.json");
  }

  const order = fields.order;
  if (typeof order !== "number" || !Number.isInteger(order) || order < 1) {
    fail(slug, "order must be a positive integer");
  }

  const date = optionalDate(fields, "date", slug);
  const lastReviewed = optionalDate(fields, "lastReviewed", slug);
  if (date && lastReviewed && lastReviewed < date) {
    fail(slug, "lastReviewed cannot be earlier than date");
  }

  let next: string | undefined;
  if (fields.next !== undefined) {
    if (typeof fields.next !== "string" || !SLUG.test(fields.next)) fail(slug, "next must be a lesson slug");
    if (fields.next === slug) fail(slug, "next cannot be the lesson itself");
    next = fields.next;
  }

  // Always derived from the body. The old frontmatter numbers were several
  // times the word count, so they are not an override.
  const readTime = readingTimeMinutes(countWords(content));

  return {
    slug,
    title: requiredString(fields, "title", slug),
    excerpt: requiredString(fields, "excerpt", slug),
    category: requiredString(fields, "category", slug),
    date,
    lastReviewed,
    content,
    readTime,
    level,
    path: pathId,
    order,
    prerequisites: readSlugList(fields.prerequisites, slug, "prerequisites"),
    next,
  };
}

function pathSuccessor(post: Post, posts: Post[]): Post | undefined {
  return posts
    .filter((item) => item.path === post.path && item.order > post.order)
    .sort((a, b) => a.order - b.order)[0];
}

function assertCatalog(posts: Post[]) {
  const bySlug = new Map(posts.map((post) => [post.slug, post]));
  const orders = new Map<string, number>();
  for (const post of posts) {
    const key = `${post.path}:${post.order}`;
    const existing = orders.get(key);
    if (existing !== undefined) fail(post.slug, `order ${post.order} is already used on this path`);
    orders.set(key, post.order);

    for (const prerequisite of post.prerequisites) {
      if (!bySlug.has(prerequisite)) fail(post.slug, `prerequisite ${prerequisite} is not a published lesson`);
    }

    if (post.next) {
      const successor = pathSuccessor(post, posts);
      if (!successor || successor.slug !== post.next) {
        fail(post.slug, `next must be the following lesson on the same path${successor ? ` (${successor.slug})` : ""}`);
      }
    }
  }

  for (const path of getLearningPaths()) {
    if (!posts.some((post) => post.path === path.id)) fail(path.id, "path has no published lessons");
  }
}

/**
 * Beginner-facing order: paths by catalogOrder, then the Start here lesson, then path order.
 * Previous and next links do not use this. They follow `order` inside the path.
 */
export function compareCatalog(a: Post, b: Post): number {
  const aPath = getLearningPath(a.path);
  const bPath = getLearningPath(b.path);
  const pathDelta = (aPath?.catalogOrder ?? 0) - (bPath?.catalogOrder ?? 0);
  if (pathDelta !== 0) return pathDelta;
  const aStart = a.slug === START_HERE_SLUG ? 0 : 1;
  const bStart = b.slug === START_HERE_SLUG ? 0 : 1;
  if (aStart !== bStart) return aStart - bStart;
  return a.order - b.order;
}

let published: Post[] | undefined;

function loadPublishedPosts(): Post[] {
  const posts: Post[] = [];
  for (const file of getPostSlugs()) {
    const post = readPost(file.replace(/\.md$/, ""));
    if (post) posts.push(post);
  }
  assertCatalog(posts);
  return posts.sort(compareCatalog);
}

export function getAllPosts(): Post[] {
  if (!published) published = loadPublishedPosts();
  return published;
}

export function getPostBySlug(slug: string): Post | undefined {
  const name = slug.replace(/\.md$/, "");
  if (!SLUG.test(name)) return;
  return getAllPosts().find((post) => post.slug === name);
}

export function postsInPath(pathId: string): Post[] {
  return getAllPosts().filter((post) => post.path === pathId);
}

/** Published lessons on a path, in frontmatter `order`. Gaps stay gaps: nothing is renumbered. */
export function postsInPathOrder(pathId: string): Post[] {
  return postsInPath(pathId).sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}

export function firstLessonInPath(pathId: string): Post | undefined {
  return postsInPathOrder(pathId)[0];
}

/**
 * Newest published lessons.
 * Lessons from the same day stay in slug order so the short list does not shuffle between builds.
 */
export function recentPosts(limit: number): Post[] {
  return getAllPosts()
    .slice()
    .sort((a, b) => {
      const byDate = (b.date ?? "").localeCompare(a.date ?? "");
      if (byDate !== 0) return byDate;
      return a.slug.localeCompare(b.slug);
    })
    .slice(0, limit);
}

/** Previous and next published lessons on the same path, by `order`. */
export function pathNeighbors(post: Post): { previous?: Post; next?: Post } {
  const siblings = getAllPosts()
    .filter((item) => item.path === post.path)
    .sort((a, b) => a.order - b.order);
  const index = siblings.findIndex((item) => item.slug === post.slug);
  return {
    previous: index > 0 ? siblings[index - 1] : undefined,
    next: index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : undefined,
  };
}
