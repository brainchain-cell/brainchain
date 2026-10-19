import Link from "next/link";
import modules from "../../../data/modules.json";
import { NEWSLETTER_SIGNUP_COPY } from "@/components/NewsletterSignup";
import {getPostBySlug} from "@/lib/api";
import {pageMetadata} from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Learn",
  description: "Short modules on automation, writing, Cursor, Notion and agents. Each lesson is an editorial guide with an exercise.",
  path: "/learn",
});

type Module = {
  id: string;
  title: string;
  summary: string;
  lessons: string[];
};

export default function Learn() {
  const catalog = modules as Module[];
  return (
    <main id="main" className="updates">
      <p className="eyebrow">LEARNING HUB</p>
      <h1>Modules for useful AI work.</h1>
      <p>
        Short courses built from editorial guides. Each lesson includes an exercise and links to primary documentation.
        These are not hands-on product certifications.
      </p>
      <div className="module-list">
        {catalog.map((mod) => (
          <section className="module-card" key={mod.id} id={mod.id}>
            <p className="eyebrow">{mod.title.toUpperCase()}</p>
            <h2>{mod.title}</h2>
            <p>{mod.summary}</p>
            <ol className="module-lessons">
              {mod.lessons.map((slug) => {
                const post = getPostBySlug(slug);
                if (!post) return null;
                return (
                  <li key={slug}>
                    <Link href={`/posts/${slug}`}>{post.title}</Link>
                    <span> · {post.readTime} min</span>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
      <p className="notice">
        <Link href="/#newsletter">{NEWSLETTER_SIGNUP_COPY}</Link>
      </p>
    </main>
  );
}
