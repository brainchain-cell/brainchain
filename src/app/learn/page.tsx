import Link from "next/link";
import { LessonCatalog } from "@/components/LessonCatalog";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { getAllPosts } from "@/lib/api";
import { getLearningPaths } from "@/lib/paths";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata({
  title: "Learn",
  description:
    "Find a practical AI workflow for your next brief, meeting, automation or small build.",
  path: "/learn",
});
export default function Learn() {
  const posts = getAllPosts().map(
    ({ slug, title, excerpt, path, level, readTime }) => ({
      slug,
      title,
      excerpt,
      path,
      level,
      readTime,
    }),
  );
  return (
    <main id="main" className="wide-page">
      <header className="page-intro">
        <p className="eyebrow">THE LEARNING LIBRARY</p>
        <h1>
          A workflow for
          <br />
          <em>the work in front of you.</em>
        </h1>
        <p className="lede">
          Pick a task, follow a short lesson and try the exercise. Every guide
          keeps the sources and the review step in view.
        </p>
      </header>
      <aside className="start-banner">
        <div>
          <span className="eyebrow">NEW TO AUTOMATION?</span>
          <p>Start with one task you can safely undo.</p>
        </div>
        <Link href="/posts/choose-your-first-automation" className="text-link">
          Choose your first automation ↗
        </Link>
      </aside>
      <LessonCatalog posts={posts} paths={getLearningPaths()} />
      <NewsletterSignup />
    </main>
  );
}
