import { Post } from "@/interfaces/post";
import fs from "node:fs";
import matter from "gray-matter";
import { join } from "node:path";

const directory = join(process.cwd(), "_posts");

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

export function getPostBySlug(slug: string): Post | undefined {
  const name = slug.replace(/\.md$/, "");
  if (!/^[a-z0-9-]+$/.test(name)) return;
  const path = join(directory, `${name}.md`);
  if (!fs.existsSync(path)) return;
  const { data, content } = matter(fs.readFileSync(path, "utf8"));
  if (data.status !== "published") return;
  // Always derived from the body. The old frontmatter numbers were several
  // times the word count, so they are not an override.
  const readTime = readingTimeMinutes(countWords(content));
  return { ...data, slug: name, content, readTime } as Post;
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map(getPostBySlug)
    .filter((post): post is Post => !!post)
    .sort((a, b) => b.date.localeCompare(a.date));
}
