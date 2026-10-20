import Link from "next/link";
import { LessonList } from "@/components/LessonList";
import { NEWSLETTER_SIGNUP_COPY } from "@/components/NewsletterSignup";
import { postsInPathOrder } from "@/lib/api";
import { getEntryPoints } from "@/lib/entryPoints";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Workflows",
  description: "Lessons for briefs and meetings, a first automation, and building with agents.",
  path: "/learn",
});

export default function Learn() {
  const entries = getEntryPoints();
  return (
    <main id="main" className="updates">
      <h1>Workflows</h1>
      <p className="lede">Lessons for briefs and meetings, a first automation, and building with agents.</p>
      {entries.map((entry) => (
        <section className="path-group" key={entry.id}>
          <h2>{entry.title}</h2>
          <p>{entry.copy}</p>
          {entry.paths.map(({ path }) => (
            <section className="path-block" id={path.id} key={path.id}>
              <h3>
                <Link href={`/learn/${path.id}`}>{path.title}</Link>
              </h3>
              <p>{path.summary}</p>
              <LessonList posts={postsInPathOrder(path.id)} />
            </section>
          ))}
        </section>
      ))}
      <p className="home-note">
        These lessons are editorial guidance, not hands-on product certifications.{" "}
        <Link href="/#newsletter">{NEWSLETTER_SIGNUP_COPY}</Link>
      </p>
    </main>
  );
}
