import { MailerLiteForm } from "@/components/MailerLiteForm";

type NewsletterSignupProps = {
  heading?: string;
  copy?: string;
};

export function NewsletterSignup({
  heading = "Put one useful AI workflow into practice.",
  copy = "Get Brainchain's practical lessons, copyable prompts and workflow exercises by email. Start with the first-automation worksheet.",
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
