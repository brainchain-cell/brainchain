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
          For the work that has to be right, and for the first automation or agent you still want to check yourself.
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
          No invented hands-on tests, and no made-up scores. Guides separate documented features from suggestions, and
          link to the original sources.
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
