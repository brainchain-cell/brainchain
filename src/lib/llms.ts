import {postsInPath} from "@/lib/api";
import {getLearningPaths} from "@/lib/paths";
import {SITE_URL} from "@/lib/site";
import {getCategories, getTools, isUnknown, type Tool} from "@/lib/tools";

function toolLine(tool: Tool): string {
  const price = isUnknown(tool.paidFrom) ? "paid price unknown" : `paid from ${tool.paidFrom}`;
  const lessons = tool.lessons.length ? ` Lessons: ${tool.lessons.map((slug) => `${SITE_URL}/posts/${slug}`).join(", ")}.` : "";
  return `- [${tool.name}](${SITE_URL}/tools/${tool.slug}): ${tool.summary} ${price}. Checked ${tool.pricingLastChecked}.${lessons}`;
}

export function buildLlmsText(): string {
  const paths = getLearningPaths();
  const lessonLines: string[] = [];
  for (const path of paths) {
    lessonLines.push(`### ${path.title}`);
    lessonLines.push("");
    for (const post of postsInPath(path.id)) {
      lessonLines.push(`- [${post.title}](${SITE_URL}/posts/${post.slug}): ${post.excerpt}`);
    }
    lessonLines.push("");
  }

  const toolLines: string[] = [];
  for (const category of getCategories()) {
    const tools = getTools().filter((tool) => tool.category === category.id);
    toolLines.push(`### ${category.title}`);
    toolLines.push("");
    toolLines.push(category.description);
    toolLines.push("");
    for (const tool of tools) toolLines.push(toolLine(tool));
    toolLines.push("");
  }

  return [
    "# Brainchain",
    "",
    "> Practical guides to AI tools for useful work. Brainchain Lab teaches small teams and independent professionals how to choose and use automation, writing, coding, and productivity tools.",
    "",
    "Brainchain is an editorial learning site, not a ranking and not a test lab. Four paths and eleven lessons live at the learning hub. The tools directory summarises official pricing pages. If a price or an India-specific detail could not be verified, the tool page says Unknown. Prices change. Check the provider before you pay.",
    "",
    `Site: ${SITE_URL}`,
    "",
    "## Learning hub",
    "",
    `- [Learn](${SITE_URL}/learn): four paths — ${paths.map((path) => path.title).join(", ")}.`,
    "",
    ...lessonLines,
    "## Tools directory",
    "",
    `- [All tools](${SITE_URL}/tools): grouped by task. Featured slots stay empty unless a tool entry sets featured to true, and those slots are labelled Sponsored.`,
    "",
    ...toolLines,
    "## For tool makers",
    "",
    `- [Feature your tool](${SITE_URL}/feature-your-tool): featured listing and newsletter mention. Pricing on request. No checkout.`,
    "",
    "## Policies and notes for assistants",
    "",
    `- [For AI assistants](${SITE_URL}/for-ai): the same map as this file, as a page.`,
    `- [Disclosure and privacy](${SITE_URL}/disclosure): affiliate links and the newsletter processor.`,
    `- [Our approach](${SITE_URL}/about): what the guides claim and what they do not.`,
    `- [Updates](${SITE_URL}/updates): headlines linked to official announcements.`,
    "",
    "Only Make has an affiliate URL in the directory. That call to action is labelled as an affiliate link. Other tool links go to the official site.",
    "",
    "India notes cover INR prices, UPI, or Indian cards only when an official page stated them. Otherwise the field is Unknown.",
    "",
  ].join("\n");
}
