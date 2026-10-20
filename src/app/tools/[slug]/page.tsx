import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import JsonLd from "@/components/json-ld";
import ToolListing from "@/components/ToolListing";
import {getPostBySlug} from "@/lib/api";
import {pageMetadata} from "@/lib/metadata";
import {SITE_URL} from "@/lib/site";
import {displayField, getCategory, getTool, getTools, isUnknown, priceText, type Tool} from "@/lib/tools";

type Props = {params: Promise<{slug: string}>};

export const dynamicParams = false;

function softwareJsonLd(tool: Tool) {
  const category = getCategory(tool.category);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.summary,
    url: tool.website,
    applicationCategory: category?.applicationCategory,
    mainEntityOfPage: `${SITE_URL}/tools/${tool.slug}`,
  };
  if (tool.offer) {
    data.offers = {
      "@type": "Offer",
      price: tool.offer.price,
      priceCurrency: tool.offer.priceCurrency,
      description: tool.offer.description,
      url: tool.pricingSource,
    };
  }
  return data;
}

export function generateStaticParams() {
  return getTools().map((tool) => ({slug: tool.slug}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const tool = getTool((await params).slug);
  if (!tool) return {};
  return pageMetadata({
    title: tool.name,
    description: tool.summary,
    path: `/tools/${tool.slug}`,
  });
}

export default async function ToolPage({params}: Props) {
  const tool = getTool((await params).slug);
  if (!tool) notFound();
  const category = getCategory(tool.category);
  const affiliate = Boolean(tool.affiliateUrl);
  const href = tool.affiliateUrl || tool.website;
  const lessons = tool.lessons
    .map((slug) => {
      const post = getPostBySlug(slug);
      return post ? {slug, title: post.title} : undefined;
    })
    .filter((lesson): lesson is {slug: string; title: string} => Boolean(lesson));

  return (
    <main id="main" className="article">
      <JsonLd data={softwareJsonLd(tool)} />
      <Link href="/tools">← All tools</Link>
      <p className="eyebrow tool-kicker">{category?.title.toUpperCase()}</p>
      <ToolListing tool={tool} titleAs="h1" />
      <p className="notice">Notes from the provider&apos;s public pages, checked {tool.pricingLastChecked}. This is not a hands-on review.</p>
      <div className="prose">
        <p>{tool.summary}</p>
        <p>
          <a className="button" href={href} rel={affiliate ? "sponsored noopener" : "noopener noreferrer"} target="_blank">
            {affiliate ? `${tool.name} (affiliate link)` : `Visit ${tool.name}`} <span aria-hidden="true">↗</span>
          </a>
        </p>
        {affiliate ? (
          <p>This button is an affiliate link. A qualifying signup may earn Brainchain a commission. <Link href="/disclosure">Read the disclosure</Link>.</p>
        ) : (
          <p>This button goes to the official site. <Link href="/disclosure">Affiliate disclosure</Link>.</p>
        )}
        <h2>Who it&apos;s for</h2>
        <p>{tool.whoItsFor}</p>
        <h2>Pricing</h2>
        <p>{tool.pricingModel}</p>
        <ul>
          <li>Free tier: {displayField(tool.freeTier)}</li>
          <li>Paid from: {priceText(tool)}</li>
          <li>Last checked: {tool.pricingLastChecked}. <a href={tool.pricingSource} rel="noopener noreferrer" target="_blank">Pricing source</a>.</li>
        </ul>
        <h2>India notes</h2>
        <p>{isUnknown(tool.indiaNotes) ? "Unknown. The official pages checked did not state an INR price, UPI, or whether Indian cards are accepted." : tool.indiaNotes}</p>
        <h2>Brainchain lessons</h2>
        {lessons.length ? (
          <ul>
            {lessons.map((lesson) => (
              <li key={lesson.slug}><Link href={`/posts/${lesson.slug}`}>{lesson.title}</Link></li>
            ))}
          </ul>
        ) : (
          <p>No Brainchain lesson teaches this tool yet.</p>
        )}
      </div>
    </main>
  );
}
