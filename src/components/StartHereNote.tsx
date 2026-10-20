import Link from "next/link";
import { getPostBySlug } from "@/lib/api";
import { START_HERE_SLUG, getLearningPath, levelLabel } from "@/lib/paths";

export function StartHereNote() {
  const post = getPostBySlug(START_HERE_SLUG);
  if (!post) throw new Error(`Missing start-here lesson ${START_HERE_SLUG}`);
  const path = getLearningPath(post.path);

  return (
    <aside className="start-note">
      <p className="eyebrow">Start here</p>
      <h2>
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </h2>
      <p>{post.excerpt}</p>
      <p className="lesson-meta">
        {levelLabel(post.level)} · {post.readTime} min read
        {path ? ` · ${path.title}` : ""}
      </p>
    </aside>
  );
}
