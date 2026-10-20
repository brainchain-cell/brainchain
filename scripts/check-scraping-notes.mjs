import {readFileSync} from "node:fs";

const file = process.argv[2] || "data/tools.json";
const text = readFileSync(file, "utf8");
const pattern = /text retrieved|retrieved text|retrieved pricing|not retrieved|was retrieved|were retrieved|in that text|page text|not printed/i;
const match = text.match(pattern);

if (match) {
  const index = match.index ?? 0;
  const line = text.slice(0, index).split("\n").length;
  console.error(`${file}:${line} contains a scraping note ("${match[0]}")`);
  process.exit(1);
}

const data = JSON.parse(text);
if (!Array.isArray(data.tools) || data.tools.length === 0) {
  console.error(`${file}: tools must be a non-empty array`);
  process.exit(1);
}

for (const tool of data.tools) {
  if (typeof tool.oneLiner !== "string" || tool.oneLiner.trim().length === 0 || tool.oneLiner.includes("\n")) {
    console.error(`${file}: ${tool.slug || "unknown"} needs a single-line oneLiner`);
    process.exit(1);
  }
}

console.log(`checked ${data.tools.length} tools in ${file}`);
