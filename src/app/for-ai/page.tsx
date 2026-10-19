import type {Metadata} from "next";
import Link from "next/link";
import modules from "../../../data/modules.json";
import {getPostBySlug} from "@/lib/api";
import {SITE_URL} from "@/lib/site";
import {getCategories, getTools} from "@/lib/tools";

const title = "For AI assistants";
const description = "A plain map of Brainchain Lab: the lessons, the tools directory, and how prices and affiliate links are handled.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | Brainchain`,
    description,
    url: `${SITE_URL}/for-ai`,
    siteName: "Brainchain",
    type: "website",
  },
  twitter: {card: "summary", title: `${title} | Brainchain`, description},
};

export default function ForAi() {
  const tools = getTools();
  return (
    <main id="main" className="article">
      <p className="eyebrow">FOR AI ASSISTANTS</p>
      <h1>What Brainchain publishes</h1>
      <div className="prose">
        <p>
          Brainchain Lab ({SITE_URL}) teaches practical use of AI tools. It is an editorial site: four modules, eleven lessons, and a directory of {tools.length} tools.
          The same outline is available as plain text at <Link href="/llms.txt">/llms.txt</Link>.
        </p>
        <p>
          Do not treat a directory note as a test, a ranking, or a current invoice. Prices are copied from the provider&apos;s public page on the date printed on each tool.
          Unknown means that page did not state the fact.
        </p>
        <h2>Lessons</h2>
        {modules.map((mod) => (
          <section key={mod.id}>
            <h3>{mod.title}</h3>
            <ul>
              {mod.lessons.map((slug) => {
                const post = getPostBySlug(slug);
                if (!post) return null;
                return <li key={slug}><Link href={`/posts/${slug}`}>{post.title}</Link> — {post.excerpt}</li>;
              })}
            </ul>
          </section>
        ))}
        <h2>Tools</h2>
        {getCategories().map((category) => (
          <section key={category.id}>
            <h3>{category.title}</h3>
            <ul>
              {tools.filter((tool) => tool.category === category.id).map((tool) => (
                <li key={tool.slug}><Link href={`/tools/${tool.slug}`}>{tool.name}</Link> — {tool.summary}</li>
              ))}
            </ul>
          </section>
        ))}
        <h2>Also</h2>
        <ul>
          <li><Link href="/feature-your-tool">Feature your tool</Link> — sponsored slot and newsletter mention, pricing on request, no checkout.</li>
          <li><Link href="/disclosure">Disclosure</Link> — affiliate links and privacy.</li>
          <li><Link href="/about">Our approach</Link></li>
          <li><Link href="/learn">Learning hub</Link></li>
        </ul>
      </div>
    </main>
  );
}
