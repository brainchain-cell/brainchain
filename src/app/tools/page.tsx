import Link from "next/link";
import JsonLd from "@/components/json-ld";
import {SITE_URL} from "@/lib/site";
import {pageMetadata} from "@/lib/metadata";
import {displayField, featuredTools, getCategories, getTools, isUnknown, toolsInCategory, type Tool} from "@/lib/tools";

const title = "AI tools";
const description = "A directory of AI tools grouped by task, with pricing notes checked against official pages and links to the Brainchain lessons that teach them.";

export const metadata = pageMetadata({title, description, path: "/tools"});

function priceLabel(tool: Tool): string {
  if (!isUnknown(tool.paidFrom)) return `Paid from ${tool.paidFrom}`;
  if (!isUnknown(tool.freeTier)) return "Paid price unknown";
  return "Pricing unknown";
}

function FeaturedSlot({tools, label}: {tools: Tool[]; label: string}) {
  return (
    <aside className={tools.length ? "featured-slot" : "featured-slot featured-slot-empty"} data-featured-slot={label} aria-label={tools.length ? "Sponsored" : undefined}>
      {tools.map((tool) => (
        <div key={tool.slug}>
          <p className="sponsored">Sponsored</p>
          <h3><Link href={`/tools/${tool.slug}`}>{tool.name}</Link></h3>
          <p>{tool.summary}</p>
          <Link href={`/tools/${tool.slug}`}>View the sponsored listing ↗</Link>
        </div>
      ))}
    </aside>
  );
}

export default function ToolsIndex() {
  const tools = getTools();
  const categories = getCategories();
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
        {tools.length} AI tools, grouped by what you are trying to get done. Notes come from each company&apos;s public pages.
        If a price or an India detail could not be checked, the field says Unknown. This is not a ranking and not a hands-on test.
      </p>
      <p className="tools-links">
        <Link href="/disclosure">Affiliate disclosure</Link>
        <Link href="/feature-your-tool">Feature your tool</Link>
        <Link href="/llms.txt">llms.txt</Link>
      </p>
      <nav className="tool-jumps" aria-label="Tool categories">
        {categories.map((category) => (
          <a key={category.id} href={`#${category.id}`}>{category.title}</a>
        ))}
      </nav>

      <FeaturedSlot tools={featuredTools()} label="index" />

      {categories.map((category) => {
        const group = toolsInCategory(category.id);
        return (
          <section className="tool-group" key={category.id} id={category.id}>
            <div className="section-heading">
              <div>
                <p className="eyebrow">{category.title.toUpperCase()}</p>
                <h2>{category.title}</h2>
              </div>
              <p>{category.description}</p>
            </div>
            <FeaturedSlot tools={featuredTools(category.id)} label={category.id} />
            <div className="tool-grid">
              {group.map((tool) => (
                <article className="tool-card" key={tool.slug}>
                  <div className="card-top">
                    <span>{tool.lessons.length ? "In a lesson" : "Directory"}</span>
                    {tool.featured ? <span className="sponsored">Sponsored</span> : null}
                  </div>
                  <h3><Link href={`/tools/${tool.slug}`}>{tool.name}</Link></h3>
                  <p>{tool.summary}</p>
                  <div className="card-bottom">
                    <span>{priceLabel(tool)}</span>
                    <Link href={`/tools/${tool.slug}`}>Details ↗</Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
      <p className="notice">
        One listing, Make, uses an affiliate link on its own page. Payment is not a sign of quality.{" "}
        <Link href="/disclosure">Read the disclosure</Link>. Tool makers can ask about a featured slot or a newsletter mention on{" "}
        <Link href="/feature-your-tool">Feature your tool</Link>. Pricing for those is on request.
      </p>
      <p className="tools-footnote">Fields marked {displayField("unknown")} were not on the official page when Brainchain last checked.</p>
    </main>
  );
}
