import Link from "next/link";
import { WorkflowPreview } from "@/components/WorkflowPreview";
import { LessonCard } from "@/components/LessonCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { getPostBySlug, postsInPath } from "@/lib/api";
import { getLearningPaths } from "@/lib/paths";
export default function Home() {
  const paths = [...getLearningPaths()].sort(
    (a, b) => a.planOrder - b.planOrder,
  );
  const featured = [
    "ai-writing-with-a-verification-step",
    "keep-notion-ai-drafts-separate",
    "choose-your-first-automation",
  ].map((slug) => getPostBySlug(slug)!);
  return (
    <main id="main" className="home">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="tiny-star" aria-hidden="true">
              ✳
            </span>{" "}
            PRACTICAL AI, A HUMAN POINT OF VIEW
          </p>
          <h1>
            Get better work
            <br />
            out of <em>AI.</em>
          </h1>
          <p className="hero-lede">
            For the briefs, meetings and repetitive tasks on your desk. Learn a
            workflow. Make something useful. Know how to check it.
          </p>
          <div className="hero-actions">
            <Link href="/learn" className="button">
              Find your next workflow <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/about" className="text-link">
              Meet the lab <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="hero-footnote">
            <span aria-hidden="true">◉</span> Independent lessons. Free to read.
            Built around your work.
          </div>
        </div>
        <WorkflowPreview />
      </section>
      <div className="principle-strip">
        <span>LESS TOOL COLLECTING. MORE DOING.</span>
        <p>
          Start with a task <b>→</b> Follow the steps <b>→</b> Check the result{" "}
          <b>→</b> Make it yours
        </p>
      </div>
      <section className="paths-section" id="modules">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CHOOSE A STARTING POINT</p>
            <h2>What’s on your desk?</h2>
          </div>
          <Link className="text-link" href="/learn">
            Explore all lessons <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="path-grid">
          {paths.map((path, i) => (
            <Link
              className="path-card"
              href={`/learn/${path.id}`}
              key={path.id}
            >
              <span className="path-number">
                0{i + 1}
                <span aria-hidden="true">↗</span>
              </span>
              <h3>{path.title}</h3>
              <p>{path.summary}</p>
              <span className="path-count">
                {postsInPath(path.id).length} lessons · Start learning{" "}
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="featured-lessons" id="guides">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A GOOD PLACE TO BEGIN</p>
            <h2>
              A small lesson.
              <br />A useful next step.
            </h2>
          </div>
          <p className="section-aside">
            Readable guides with a task, an exercise
            <br className="desktop-break" /> and sources you can follow.
          </p>
        </div>
        <div className="lesson-grid">
          {featured.map((post, i) => (
            <LessonCard post={post} index={i} key={post.slug} />
          ))}
        </div>
      </section>
      <section className="founder-note">
        <div className="founder-monogram" aria-hidden="true">
          kr<span>↗</span>
        </div>
        <div>
          <p className="eyebrow">A NOTE FROM KRISHNA</p>
          <h2>
            AI workflows for work
            <br />
            you have to get right.
          </h2>
          <p>
            Brainchain Lab is my independent learning project for people who
            want to put AI to work thoughtfully. The guides start with a task,
            explain the tradeoffs and keep the final judgment with you.
          </p>
          <Link href="/about" className="text-link">
            Why I’m building this <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="editorial-principles">
          <span>
            01 <b>Show the work</b>
          </span>
          <span>
            02 <b>Link the sources</b>
          </span>
          <span>
            03 <b>Name the limits</b>
          </span>
        </div>
      </section>
      <NewsletterSignup />
    </main>
  );
}
