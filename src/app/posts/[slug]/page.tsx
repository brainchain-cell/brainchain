import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/json-ld";
import { MakeAffiliateCta } from "@/components/MakeAffiliateCta";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { getAllPosts, getPostBySlug, pathNeighbors } from "@/lib/api";
import { postShowsMakeAffiliate, SITE_NAME, SITE_URL } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import { pageMetadata } from "@/lib/metadata";
import { formatIsoDate, getLearningPath, levelLabel } from "@/lib/paths";
import type { Post } from "@/interfaces/post";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

function lessonFacts(post: Post): string {
  const path = getLearningPath(post.path);
  const parts = [
    post.category,
    levelLabel(post.level),
    path?.title ?? post.path,
    "Brainchain editorial",
  ];
  if (post.date) parts.push(`Published ${formatIsoDate(post.date)}`);
  if (post.lastReviewed) parts.push(`Last reviewed ${formatIsoDate(post.lastReviewed)}`);
  parts.push(`${post.readTime} min read`);
  return parts.join(" · ");
}

function articleJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    ...(post.date ? { datePublished: post.date } : {}),
    ...(post.lastReviewed ? { dateModified: post.lastReviewed } : {}),
    mainEntityOfPage: `${SITE_URL}/posts/${post.slug}`,
    url: `${SITE_URL}/posts/${post.slug}`,
    inLanguage: "en",
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

function breadcrumbJsonLd(post: Post) {
  const path = getLearningPath(post.path);
  const items = [
    { name: "Workflows", item: `${SITE_URL}/learn` },
    ...(path
      ? [{ name: path.title, item: `${SITE_URL}/learn/${path.id}` }]
      : []),
    { name: post.title, item: `${SITE_URL}/posts/${post.slug}` },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

export default async function Article({ params }: Props) {
  const post = getPostBySlug((await params).slug);
  if (!post) notFound();
  const path = getLearningPath(post.path);
  const { previous, next } = pathNeighbors(post);
  const prerequisites = post.prerequisites.map((slug) => getPostBySlug(slug)).filter((item): item is Post => !!item);

  return (
    <main id="main" className="article">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/learn">Workflows</Link>
        {path ? (
          <>
            <span aria-hidden="true">/</span>
            <Link href={`/learn/${path.id}`}>{path.title}</Link>
          </>
        ) : null}
        <span aria-hidden="true">/</span>
        <span aria-current="page">{post.title}</span>
      </nav>
      <h1>{post.title}</h1>
      <p className="meta">{lessonFacts(post)}</p>
      <p className="notice">
        {prerequisites.length === 0 ? (
          "Prerequisites: none."
        ) : (
          <>
            Prerequisites:{" "}
            {prerequisites.map((item, index) => (
              <span key={item.slug}>
                {index > 0 ? ", " : null}
                <Link href={`/posts/${item.slug}`}>{item.title}</Link>
              </span>
            ))}
            .
          </>
        )}
      </p>
      <p className="notice">
        An editorial guide based on linked documentation. This is not a hands-on product review.
      </p>
      <div className="prose" dangerouslySetInnerHTML={{ __html: await markdownToHtml(post.content) }} />
      {postShowsMakeAffiliate(post.slug) ? <MakeAffiliateCta /> : null}
      <p className="notice">
        Read our <Link href="/disclosure">affiliate disclosure</Link> and <Link href="/about">editorial standards</Link>.
      </p>
      <nav className="lesson-nav" aria-label="Lessons in this path">
        {previous ? (
          <Link href={`/posts/${previous.slug}`}>
            <small>Previous lesson</small>
            <strong>{previous.title}</strong>
          </Link>
        ) : (
          <span>
            <small>Previous lesson</small>
            <strong>No earlier lesson on this path</strong>
          </span>
        )}
        {next ? (
          <Link className="next" href={`/posts/${next.slug}`}>
            <small>Next lesson</small>
            <strong>{next.title}</strong>
          </Link>
        ) : (
          <span className="next">
            <small>Next lesson</small>
            <strong>No later lesson on this path</strong>
          </span>
        )}
      </nav>
      <NewsletterSignup />
      <JsonLd data={articleJsonLd(post)} />
      <JsonLd data={breadcrumbJsonLd(post)} />
    </main>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug((await params).slug);
  if (!post) notFound();
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/posts/${post.slug}`,
    type: "article",
  });
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}
