import Link from "next/link";
import type { Post } from "@/interfaces/post";
import { levelLabel } from "@/lib/paths";

export function LessonList({ posts }: { posts: Post[] }) {
  return (
    <ol className="lesson-list">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          <span className="lesson-meta">
            {levelLabel(post.level)} · {post.readTime} min read
          </span>
        </li>
      ))}
    </ol>
  );
}
