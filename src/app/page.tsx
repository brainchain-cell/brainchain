import Link from "next/link";
import {getAllPosts} from "@/lib/api";
export default function Home(){
  const posts=getAllPosts();
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
            <h2>Modules, not one-off tips.</h2>
          </div>
          <p><Link href="/learn">Browse all modules ↗</Link></p>
        </div>
        <div className="cards">
          <article className="card">
            <div className="card-top"><span>Start</span><span>01</span></div>
            <h3><Link href="/learn#foundations">Foundations</Link></h3>
            <p>Automation, writing verification and tool choice—the shared base for every module.</p>
            <div className="card-bottom"><span>3 lessons</span><Link href="/learn#foundations">Open module ↗</Link></div>
          </article>
          <article className="card">
            <div className="card-top"><span>Build</span><span>02</span></div>
            <h3><Link href="/learn#cursor">Cursor</Link></h3>
            <p>Brief a coding agent, review diffs, and direct Projects when work outlives one chat.</p>
            <div className="card-bottom"><span>3 lessons</span><Link href="/learn#cursor">Open module ↗</Link></div>
          </article>
          <article className="card">
            <div className="card-top"><span>Workspace</span><span>03</span></div>
            <h3><Link href="/learn#notion">Notion</Link></h3>
            <p>Use Notion AI without mixing drafts into your system of record, and share skills as SKILL.md.</p>
            <div className="card-bottom"><span>2 lessons</span><Link href="/learn#notion">Open module ↗</Link></div>
          </article>
          <article className="card">
            <div className="card-top"><span>Direct</span><span>04</span></div>
            <h3><Link href="/learn#agents">Agents and automation</Link></h3>
            <p>Tell fixed workflows from agents, then keep parallel threads and harnesses behind review.</p>
            <div className="card-bottom"><span>3 lessons</span><Link href="/learn#agents">Open module ↗</Link></div>
          </article>
        </div>
      </section>

      <section id="guides" className="guides">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE FIELD GUIDES</p>
            <h2>Useful before impressive.</h2>
          </div>
          <p>Automation · Writing · Productivity</p>
        </div>
        <div className="cards">
          {posts.map((post,i)=>(
            <article className="card" key={post.slug}>
              <div className="card-top"><span>{post.category}</span><span>{String(i+1).padStart(2,"0")}</span></div>
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
      <section id="newsletter" className="newsletter" aria-labelledby="newsletter-heading">
        <div className="newsletter-copy">
          <p className="eyebrow">BY EMAIL</p>
          <h2 id="newsletter-heading">Put one useful AI workflow into practice.</h2>
          <p>Get Brainchain&apos;s practical lessons, copyable prompts and workflow exercises by email. Start with the first-automation worksheet.</p>
        </div>
        <div className="newsletter-form">
          <div className="ml-embedded" data-form="QZNbil"></div>
        </div>
      </section>
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
