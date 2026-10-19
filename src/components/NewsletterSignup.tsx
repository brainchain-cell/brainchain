import { MailerLiteForm } from "@/components/MailerLiteForm";

/** The only signup promise. MailerLite is not set up to email a specific lesson's exercises. */
export const NEWSLETTER_SIGNUP_COPY =
  "Get new Brainchain Lab workflows by email. No spam; unsubscribe anytime.";

type NewsletterSignupProps = {
  heading?: string;
  copy?: string;
};

export function NewsletterSignup({
  heading = "Put one useful AI workflow into practice.",
  copy = NEWSLETTER_SIGNUP_COPY,
}: NewsletterSignupProps) {
  return (
    <section id="newsletter" className="newsletter" aria-labelledby="newsletter-heading">
      <div className="newsletter-copy">
        <p className="eyebrow">BY EMAIL</p>
        <h2 id="newsletter-heading">{heading}</h2>
        <p>{copy}</p>
      </div>
      <div className="newsletter-form">
        <MailerLiteForm />
      </div>
    </section>
  );
}
