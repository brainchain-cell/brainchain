import Link from "next/link";
import {priceText, type Tool} from "@/lib/tools";

type Props = {
  tool: Tool;
  titleAs?: "h1" | "h3";
  layout?: "stack" | "line";
};

export default function ToolListing({tool, titleAs = "h3", layout = "stack"}: Props) {
  const price = priceText(tool);
  const website = (
    <a href={tool.website} rel="noopener noreferrer" target="_blank">
      Website <span aria-hidden="true">↗</span>
    </a>
  );
  if (layout === "line") {
    return (
      <li className="tool-line">
        <span className="tool-line-name">
          <Link href={`/tools/${tool.slug}`}>{tool.name}</Link>
          {tool.featured ? <span className="sponsored">Sponsored</span> : null}
        </span>
        <span className="tool-oneliner">{tool.oneLiner}</span>
        <span className="tool-price">{price}</span>
        {website}
      </li>
    );
  }
  const Title = titleAs;
  const name = titleAs === "h1" ? tool.name : <Link href={`/tools/${tool.slug}`}>{tool.name}</Link>;
  return (
    <div className="tool-listing">
      {tool.featured ? <p className="sponsored">Sponsored</p> : null}
      <Title>{name}</Title>
      <p className="tool-oneliner">{tool.oneLiner}</p>
      <p className="tool-price">{price}</p>
      <p className="tool-site">{website}</p>
    </div>
  );
}
