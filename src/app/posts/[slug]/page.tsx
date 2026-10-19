import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MakeAffiliateCta } from "@/components/MakeAffiliateCta";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { postShowsMakeAffiliate } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export default async function Article({ params }: Props) {
  const post = getPostBySlug((await params).slug);
  if (!post) notFound();
  return (
    <main id="main" className="article">
      <Link href="/#guides">← All guides</Link>
      <h1>{post.title}</h1>
      <p className="meta">
        {post.category} · Brainchain editorial · {post.readTime} min read
      </p>
      <p className="notice">
        An editorial guide based on linked documentation. This is not a hands-on product review.
      </p>
      <div className="prose" dangerouslySetInnerHTML={{ __html: await markdownToHtml(post.content) }} />
      {postShowsMakeAffiliate(post.slug) ? <MakeAffiliateCta /> : null}
      <p className="notice">
        Read our <Link href="/disclosure">affiliate disclosure</Link> and <Link href="/about">editorial standards</Link>.
      </p>
      <NewsletterSignup />
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
