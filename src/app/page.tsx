import Link from "next/link";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import {getAllPosts} from "@/lib/api";
import { START_HERE_SLUG, getLearningPaths } from "@/lib/paths";

const moduleBlurbs: Record<string, {label: string; text: string}> = {
  "first-automation": {
    label: "Start",
    text: "Decide whether a task needs an agent or a fixed workflow, then scope one reversible automation.",
  },
  "briefs-and-research": {
    label: "Briefs",
    text: "Write a source-checked brief and choose a tool for that task.",
  },
  "meetings-and-ops": {
    label: "Meetings",
    text: "Keep AI drafts out of approved records, and turn a repeated routine into a skill.",
  },
  "build-with-agents": {
    label: "Build",
    text: "Brief a coding agent, review the diff, and direct work that outlives one chat.",
  },
};

export default function Home(){
  const posts=getAllPosts();
  const paths=getLearningPaths();
  return (
    <main id="main">
      <section className="hero">
        <div>
          <p className="eyebrow">THE PRACTICAL AI PUBLICATION</p>
          <h1>Less busywork.<br/><span>Better work.</span></h1>
          <p className="lede">Understand the tools. Find a useful workflow. Put AI to work on something that matters.</p>
          <a className="button" href="#guides">Explore the guides <span aria-hidden="true">↗</span></a>
        </div>
        <aside className="feature">
          <p className="eyebrow">START HERE / 01</p>
          <h2>Automate a task,<br/>not a broken process.</h2>
          <p>A practical checklist for choosing your first automation—and knowing whether it actually helps.</p>
          <Link href="/posts/choose-your-first-automation">Read the field guide <span aria-hidden="true">↗</span></Link>
          <div className="sequence"><span>Define</span><span>Test</span><span>Measure</span></div>
        </aside>
      </section>
      
      <section id="modules" className="guides">
        <div className="section-heading">
          <div>
            <p className="eyebrow">LEARNING HUB</p>
            <h2>Paths, not one-off tips.</h2>
          </div>
          <p><Link href="/learn">Browse the paths ↗</Link></p>
        </div>
        <div className="cards module-cards">
          {paths.map((mod, i) => {
            const blurb = moduleBlurbs[mod.id];
            const count = posts.filter((post) => post.path === mod.id).length;
            return (
              <article className="card" key={mod.id}>
                <div className="card-top"><span>{blurb?.label ?? "Module"}</span><span>{String(i + 1).padStart(2, "0")}</span></div>
                <h3><Link href={`/learn#${mod.id}`}>{mod.title}</Link></h3>
                <p>{blurb?.text ?? mod.summary}</p>
                <div className="card-bottom"><span>{count} {count === 1 ? "lesson" : "lessons"}</span><Link href={`/learn#${mod.id}`}>Open path ↗</Link></div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="guides" className="guides">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE FIELD GUIDES</p>
            <h2>Useful before impressive.</h2>
          </div>
          <p>First automation · Briefs & research · Meetings & operations · Build with agents</p>
        </div>
        <div className="cards">
          {posts.map((post,i)=>(
            <article className="card" key={post.slug}>
              <div className="card-top"><span>{post.slug === START_HERE_SLUG ? "Start here · " : ""}{post.category}</span><span>{String(i + 1).padStart(2, "0")}</span></div>
              <h3><Link href={`/posts/${post.slug}`}>{post.title}</Link></h3>
              <p>{post.excerpt}</p>
              <div className="card-bottom">
                <span>{post.readTime} min read</span>
                <Link aria-label={`Read ${post.title}`} href={`/posts/${post.slug}`}>Read guide ↗</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <NewsletterSignup />
      <section className="principles">
        <h2>Clear sources.<br/>Honest limitations.</h2>
        <div>
          <p>No invented hands-on tests. No made-up scores. Our guides distinguish documented features from editorial suggestions, and link to the original sources.</p>
          <Link href="/about">How Brainchain works ↗</Link>
        </div>
      </section>
    </main>
  );
}
