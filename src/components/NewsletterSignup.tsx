import Link from "next/link";
export const NEWSLETTER_SIGNUP_COPY =
  "New Brainchain Lab workflows by email. Free to read; unsubscribe anytime.";
export function NewsletterSignup({
  heading = "A more useful inbox.",
  copy = NEWSLETTER_SIGNUP_COPY,
}: {
  heading?: string;
  copy?: string;
}) {
  return (
    <section
      className="newsletter"
      id="newsletter"
      aria-labelledby="newsletter-heading"
    >
      <div>
        <p className="eyebrow">THE BRAINCHAIN LETTER</p>
        <h2 id="newsletter-heading">{heading}</h2>
        <p>{copy}</p>
      </div>
      <div className="newsletter-action">
        <Link href="/subscribe" className="button button-paper">
          Take a look & subscribe <span aria-hidden="true">↗</span>
        </Link>
        <span>See what you’ll get before you sign up.</span>
      </div>
    </section>
  );
}
