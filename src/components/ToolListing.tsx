import Link from "next/link";
import {priceText, type Tool} from "@/lib/tools";

type Props = {
  tool: Tool;
  titleAs?: "h1" | "h3";
};

export default function ToolListing({tool, titleAs = "h3"}: Props) {
  const Title = titleAs;
  const name = titleAs === "h1" ? tool.name : <Link href={`/tools/${tool.slug}`}>{tool.name}</Link>;
  return (
    <div className="tool-listing">
      {tool.featured ? <p className="sponsored">Sponsored</p> : null}
      <Title>{name}</Title>
      <p className="tool-oneliner">{tool.oneLiner}</p>
      <p className="tool-price">{priceText(tool)}</p>
      <p className="tool-site">
        <a href={tool.website} rel="noopener noreferrer" target="_blank">
          Website <span aria-hidden="true">↗</span>
        </a>
      </p>
    </div>
  );
}
