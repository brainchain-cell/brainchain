import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(remarkGfm).use(remarkHtml).process(markdown);
  return wrapTables(String(result));
}

/** Keep wide GFM tables inside a scroller instead of crushing columns on a phone. */
function wrapTables(html: string) {
  return html.replace(/<table\b[\s\S]*?<\/table>/g, (table) => `<div class="table-scroll">${table}</div>`);
}
