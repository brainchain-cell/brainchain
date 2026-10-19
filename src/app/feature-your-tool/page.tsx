import Link from "next/link";
import {pageMetadata} from "@/lib/metadata";
import InquiryForm from "./inquiry-form";

const title = "Feature your tool";
const description = "Ask Brainchain about a sponsored tools-directory listing or a newsletter mention. Pricing is on request. There is no checkout.";

export const metadata = pageMetadata({title, description, path: "/feature-your-tool"});

export default function FeatureYourTool() {
  return (
    <main id="main" className="article">
      <p className="eyebrow">FOR TOOL MAKERS</p>
      <h1>Feature your tool</h1>
      <div className="prose">
        <p>
          Brainchain is a free learning site for small teams and independent professionals who want AI tools to earn a place in the working day.
          The public site has four modules and eleven short lessons on automation, writing, Cursor, Notion, and agents.
        </p>
        <h2>Who reads it</h2>
        <p>
          Readers are choosing a workflow, not collecting demos. Lessons start from a task, link to the company&apos;s own documentation, and say when something was not tested.
          The <Link href="/tools">tools directory</Link> groups products by task and records only pricing details that appear on an official page.
        </p>
        <h2>What you can ask about</h2>
        <p>Two options. Neither has a price on this page. Pricing is on request. Brainchain does not take payment here.</p>
        <ul>
          <li>
            <strong>Featured listing.</strong> One Sponsored slot on the tools index and one Sponsored slot in a single category.
            The slot stays empty until a tool entry is marked featured. It is labelled Sponsored when it is used.
          </li>
          <li>
            <strong>Newsletter mention.</strong> A mention in the Brainchain email, which already sends practical lessons and worksheets.
          </li>
        </ul>
        <p>
          A featured slot is an advertisement. It is not an editorial endorsement and it does not change a lesson.
          Affiliate links, when they exist, stay labelled. Read the <Link href="/disclosure">disclosure</Link>.
        </p>
        <h2>Send an inquiry</h2>
        <p>Tell us the tool, the official site, and which option you want. No account and no card.</p>
      </div>
      <InquiryForm />
    </main>
  );
}
