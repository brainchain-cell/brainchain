import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonList } from "@/components/LessonList";
import type { Post } from "@/interfaces/post";
import { getPostBySlug, postsInPathOrder } from "@/lib/api";
import { entryPointForPath } from "@/lib/entryPoints";
import { pageMetadata } from "@/lib/metadata";
import { getLearningPath, getLearningPaths } from "@/lib/paths";

type Props = { params: Promise<{ path: string }> };

export const dynamicParams = false;

function lessonsToReadFirst(lessons: Post[]): Post[] {
  const inPath = new Set(lessons.map((lesson) => lesson.slug));
  const slugs: string[] = [];
  for (const lesson of lessons) {
    for (const slug of lesson.prerequisites) {
      if (!inPath.has(slug) && !slugs.includes(slug)) slugs.push(slug);
    }
  }
  return slugs.map((slug) => getPostBySlug(slug)).filter((post): post is Post => !!post);
}

export default async function PathPage({ params }: Props) {
  const path = getLearningPath((await params).path);
  if (!path) notFound();
  const lessons = postsInPathOrder(path.id);
  const entry = entryPointForPath(path.id);
  const readFirst = lessonsToReadFirst(lessons);

  return (
    <main id="main" className="updates">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/learn">Workflows</Link>
        {entry && entry.title !== path.title ? (
          <>
            <span aria-hidden="true">/</span>
            <Link href={`/start#${entry.id}`}>{entry.title}</Link>
          </>
        ) : null}
        <span aria-hidden="true">/</span>
        <span aria-current="page">{path.title}</span>
      </nav>
      <h1>{path.title}</h1>
      <p className="lede">{path.summary}</p>
      {readFirst.length > 0 ? (
        <p>
          Read this first:{" "}
          {readFirst.map((post, index) => (
            <span key={post.slug}>
              {index > 0 ? ", " : null}
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </span>
          ))}
        </p>
      ) : null}
      <LessonList posts={lessons} />
    </main>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const path = getLearningPath((await params).path);
  if (!path) notFound();
  return pageMetadata({
    title: path.title,
    description: path.summary,
    path: `/learn/${path.id}`,
  });
}

export function generateStaticParams() {
  return getLearningPaths().map((path) => ({ path: path.id }));
}
