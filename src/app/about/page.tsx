import Link from "next/link";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata({
  title: "About the lab",
  description:
    "Krishna Ravishankar’s independent learning project: practical AI workflows, clear sources and thoughtful review.",
  path: "/about",
});
export default function About() {
  return (
    <main id="main" className="wide-page">
      <header className="page-intro about-intro">
        <p className="eyebrow">INDEPENDENT. CURIOUS. PRACTICAL.</p>
        <h1>
          A small lab.
          <br />
          <em>A useful question.</em>
        </h1>
        <p className="lede">
          What does it take to turn an AI answer into work you can actually use?
        </p>
      </header>
      <div className="about-layout">
        <aside className="founder-card">
          <div className="founder-monogram large" aria-hidden="true">
            kr<span>↗</span>
          </div>
          <h2>Krishna Ravishankar</h2>
          <p>Founder, Brainchain Lab</p>
          <span className="level-tag">An independent learning project</span>
        </aside>
        <div className="prose">
          <h2>Hi, I’m Krishna.</h2>
          <p>
            I’m building Brainchain Lab for people whose working days are full
            of briefs, research, meetings and recurring tasks. AI can help with
            that work. Knowing what to delegate, what to keep and what to check
            takes practice.
          </p>
          <p>
            This is a place to build that practice, one useful workflow at a
            time. Start with a specific task, use the smallest suitable set of
            tools and keep your judgment in the loop.
          </p>
          <h2>What “lab” means here</h2>
          <p>
            It means explaining how a workflow fits together, where it may break
            and what the reader can try next. Existing guides are editorial
            explanations based on linked documentation. A hands-on test needs
            its own method, inputs and results before we describe it as tested.
          </p>
          <h2>How the guides earn your trust</h2>
          <ul>
            <li>
              <strong>Sources before certainty.</strong> Product claims should
              lead back to the provider’s documentation.
            </li>
            <li>
              <strong>Practice before promises.</strong> Exercises use fictional
              or non-sensitive material. Suggested time boxes are not
              performance claims.
            </li>
            <li>
              <strong>Visible boundaries.</strong> An AI draft and an approved
              record serve different purposes.
            </li>
            <li>
              <strong>Independent recommendations.</strong> Commercial links are
              labelled where they appear.
            </li>
          </ul>
          <h2>A separate project</h2>
          <p>
            Brainchain Lab is a personal education brand. It does not represent
            my employer or any client. The examples here are public, fictional
            or created for learning; they are not client deliverables.
          </p>
          <h2>Corrections are welcome.</h2>
          <p>
            Tools change, and a useful guide should change with them. If
            something is unclear or out of date, email{" "}
            <a href="mailto:hello@brainchainlab.com">hello@brainchainlab.com</a>{" "}
            with the page and the source we should check.
          </p>
          <p>
            <Link href="/disclosure">
              Read the disclosure and privacy notes →
            </Link>
          </p>
        </div>
      </div>
      <NewsletterSignup />
    </main>
  );
}
