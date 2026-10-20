export const LEVELS = ["foundations", "core", "advanced"] as const;

export type Level = (typeof LEVELS)[number];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** First publication date (YYYY-MM-DD). Omitted only when it is not known. */
  date?: string;
  /** Date a person last reviewed the lesson (YYYY-MM-DD). Omitted when unknown. */
  lastReviewed?: string;
  content: string;
  /** Minutes, computed from the body. Not read from frontmatter. */
  readTime: number;
  level: Level;
  /** Id in data/modules.json. */
  path: string;
  /** Position within the path. Gaps are allowed when a lesson is not published yet. */
  order: number;
  /** Published lesson slugs a reader should do first. */
  prerequisites: string[];
  /** Following lesson on the same path, when one is published. */
  next?: string;
};
