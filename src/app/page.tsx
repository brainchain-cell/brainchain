import Link from "next/link";
import { EntryPoints } from "@/components/EntryPoints";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { StartHereNote } from "@/components/StartHereNote";
import { recentPosts } from "@/lib/api";
import { formatIsoDate, getLearningPath } from "@/lib/paths";

const RECENT_LIMIT = 3;

export default function Home() {
  const recent = recentPosts(RECENT_LIMIT);
  return (
    <main id="main" className="home">
      <section className="home-intro">
        <h1>Practical AI workflows for professionals, from your first automation to building with agents.</h1>
        <p className="lede">
          Learn one workflow at a time, try it on real work, and keep what actually saves you time.
        </p>
        <Link className="button" href="/start">Find your starting point</Link>
      </section>

      <div id="modules">
        <EntryPoints />
      </div>

      <StartHereNote />

      <section className="recent" id="guides">
        <h2>Recent lessons</h2>
        <ul className="lesson-list">
          {recent.map((post) => {
            const path = getLearningPath(post.path);
            return (
              <li key={post.slug}>
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                <span className="lesson-meta">
                  {path ? path.title : post.category}
                  {post.date ? ` · ${formatIsoDate(post.date)}` : ""} · {post.readTime} min read
                </span>
              </li>
            );
          })}
        </ul>
        <Link className="more-link" href="/learn">
          All workflows
        </Link>
      </section>

      <NewsletterSignup />

      <section className="home-note">
        <p>
          We only tell you what we've checked, and we link the sources so you can check too.
        </p>
        <p>
          <Link href="/about">Our approach</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/disclosure">Disclosure & privacy</Link>
        </p>
      </section>
    </main>
  );
}
