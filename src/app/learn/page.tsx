import Link from "next/link";
import { NEWSLETTER_SIGNUP_COPY } from "@/components/NewsletterSignup";
import { postsInPath } from "@/lib/api";
import { pageMetadata } from "@/lib/metadata";
import { START_HERE_SLUG, getLearningPaths, levelLabel } from "@/lib/paths";

export const metadata = pageMetadata({
  title: "Learn",
  description: "Four paths: a first automation, briefs and research, meetings and operations, and building with agents. Beginners start with choosing a first automation.",
  path: "/learn",
});

export default function Learn() {
  const paths = getLearningPaths();
  return (
    <main id="main" className="updates">
      <p className="eyebrow">LEARNING HUB</p>
      <h1>Paths for useful AI work.</h1>
      <p>
        Lessons are grouped by path and listed in learning order. Beginners start with choosing a first automation.
        Each lesson includes an exercise and links to primary documentation. These are not hands-on product certifications.
      </p>
      <div className="module-list">
        {paths.map((path) => (
          <section className="module-card" key={path.id} id={path.id}>
            <p className="eyebrow">{path.title.toUpperCase()}</p>
            <h2>{path.title}</h2>
            <p>{path.summary}</p>
            <ol className="module-lessons">
              {postsInPath(path.id).map((post) => (
                <li key={post.slug}>
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  <span>
                    {" "}
                    · {levelLabel(post.level)} · {post.readTime} min
                    {post.slug === START_HERE_SLUG ? " · Start here" : ""}
                  </span>
                </li>
              ))}
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
