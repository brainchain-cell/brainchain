import {pageMetadata} from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Disclosure and privacy",
  description: "How Brainchain earns a commission from Make affiliate links, and what the newsletter and this site collect.",
  path: "/disclosure",
});

export default function Disclosure(){
  return (
    <main id="main" className="article">
      <h1>Disclosure & privacy</h1>
      <div className="prose">
        <h2>Commercial relationships</h2>
        <p>Some guides include a link labelled as an affiliate link. Brainchain earns a commission from Make if you sign up through those links, at no extra cost to you. Recommendations are independent. A commission does not decide which tools we describe or whether we suggest them.</p>
        <h2>Editorial transparency</h2>
        <p>AI may assist with drafting and organising content. Guides must cite their factual sources and distinguish suggestions from documented capabilities. An article does not imply that Brainchain has tested a product unless a testing method and results are explicitly described.</p>
        <h2>Data collection</h2>
        <p>The newsletter signup is provided by MailerLite. If you subscribe, MailerLite processes your email address (and any confirmation action) on Brainchain&apos;s behalf so we can send learning emails and occasional resource updates. Subscription uses double opt-in. You can unsubscribe at any time using the link in each email. We do not operate an account system or advertising tracker on this site. Page visits may be counted with Cloudflare Web Analytics, which does not use cookies. The hosting provider may process ordinary connection information such as IP addresses and request logs to deliver and protect the site. External links lead to services with their own privacy policies. See also MailerLite&apos;s privacy documentation for processing details.</p>
        <h2>Before purchasing</h2>
        <p>Verify the provider’s current pricing, cancellation terms and data practices. Brainchain’s guides are general educational material; they cannot determine whether a particular tool fits your circumstances.</p>
      </div>
    </main>
  );
}
