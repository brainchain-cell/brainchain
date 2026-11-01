import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata({
  title: "The Brainchain Letter",
  description:
    "See a sample before subscribing to new practical AI workflows from Brainchain Lab.",
  path: "/subscribe",
});
// Local HTML embed retains the verified existing MailerLite form action and consent.
const FORM_URL = "/newsletter-form.html";
export default function Subscribe() {
  return (
    <main id="main" className="wide-page">
      <header className="page-intro">
        <p className="eyebrow">THE BRAINCHAIN LETTER</p>
        <h1>
          One useful idea.
          <br />
          <em>Something to try.</em>
        </h1>
        <p className="lede">
          Get new Brainchain Lab workflows by email: a practical task, a clear
          review step and sources for going deeper. Free. Unsubscribe anytime.
        </p>
      </header>
      <div className="subscribe-layout">
        <section className="sample-letter" aria-labelledby="sample-heading">
          <span className="letter-stamp">FROM THE LAB ↗</span>
          <p className="eyebrow">
            ILLUSTRATIVE ISSUE · READ BEFORE YOU SUBSCRIBE
          </p>
          <h2 id="sample-heading">
            Your AI draft needs
            <br />a fact trail.
          </h2>
          <p>
            A draft can sound finished before its facts are ready. Try this with
            a fictional customer update.
          </p>
          <ol>
            <li>Write down the approved facts.</li>
            <li>Ask for a draft that only uses those facts.</li>
            <li>Mark each claim and trace it back.</li>
            <li>Remove what you can’t support.</li>
          </ol>
          <div className="letter-takeaway">
            <span className="eyebrow">THE TAKEAWAY</span>
            <p>Fluent wording is useful. A reviewable draft is better.</p>
          </div>
          <Link
            className="text-link"
            href="/posts/ai-writing-with-a-verification-step"
          >
            Read the full lesson ↗
          </Link>
          <p className="fine-print">
            A sample of the format, not a previously sent issue. No fixed
            sending schedule is promised.
          </p>
        </section>
        <section className="signup-panel">
          <p className="eyebrow">JOIN THE LETTER</p>
          <h2>
            Make room for
            <br />
            useful work.
          </h2>
          <p>
            Subscriptions are handled by MailerLite. Confirm your email using
            the link they send you.
          </p>
          <iframe
            title="Subscribe to Brainchain Lab learning emails with MailerLite"
            src={FORM_URL}
            loading="lazy"
            className="newsletter-frame"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <p className="fine-print">
            Form not loading?{" "}
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer">
              Open the signup form in a new tab ↗
            </a>
          </p>
          <p className="fine-print">
            <Link href="/disclosure">How your email is used</Link>. The signup
            form sends your email to MailerLite; this page does not store it.
          </p>
        </section>
      </div>
    </main>
  );
}
