import Link from "next/link";
import JsonLd from "@/components/json-ld";
import ToolListing from "@/components/ToolListing";
import {SITE_URL} from "@/lib/site";
import {pageMetadata} from "@/lib/metadata";
import {getTools, type Tool} from "@/lib/tools";

const title = "AI tools";
const description = "Most of us don't need more AI tools. We need the right one for the job in front of us.";

export const metadata = pageMetadata({title, description, path: "/tools"});

function directoryOrder(tools: Tool[]): Tool[] {
  return [...tools.filter((tool) => tool.slug === "zapier"), ...tools.filter((tool) => tool.slug !== "zapier")];
}

export default function ToolsIndex() {
  const tools = directoryOrder(getTools());
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Brainchain AI tools directory",
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `${SITE_URL}/tools/${tool.slug}`,
    })),
  };

  return (
    <main id="main" className="tools-page">
      <JsonLd data={itemList} />
      <p className="eyebrow">DIRECTORY</p>
      <h1>Tools, by the task.</h1>
      <p className="lede tools-lede">
        Most of us don&apos;t need more AI tools. We need the right one for the job in front of us. So we&apos;ve grouped these {tools.length} by what you&apos;re trying to get done. For each one you&apos;ll get a plain description of what it does, the price the company lists, and a link to try it yourself. We haven&apos;t ranked them, and we&apos;ll only call something tested when we&apos;ve actually tested it.
      </p>
      <p className="tools-links">
        <Link href="/disclosure">Affiliate disclosure</Link>
        <Link href="/feature-your-tool">Feature your tool</Link>
        <Link href="/llms.txt">llms.txt</Link>
      </p>
      <ul className="tool-lines">
        {tools.map((tool) => (
          <ToolListing key={tool.slug} tool={tool} layout="line" />
        ))}
      </ul>
      <p className="notice">
        One listing, Make, uses an affiliate link on its own page. Payment is not a sign of quality.{" "}
        <Link href="/disclosure">Read the disclosure</Link>. Tool makers can ask about a featured slot or a newsletter mention on{" "}
        <Link href="/feature-your-tool">Feature your tool</Link>. Pricing for those is on request.
      </p>
    </main>
  );
}
