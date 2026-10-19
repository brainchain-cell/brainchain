import catalog from "../../data/tools.json";
import {getPostBySlug} from "@/lib/api";

export type ToolOffer = {
  price: string;
  priceCurrency: string;
  description: string;
};

export type ToolCategory = {
  id: string;
  title: string;
  description: string;
  applicationCategory: string;
};

export type Tool = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  whoItsFor: string;
  freeTier: string;
  paidFrom: string;
  pricingModel: string;
  pricingLastChecked: string;
  pricingSource: string;
  indiaNotes: string;
  website: string;
  affiliateUrl?: string;
  lessons: string[];
  featured: boolean;
  offer?: ToolOffer;
};

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const HTTP = /^https:\/\/\S+$/;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`data/tools.json: ${message}`);
}

function requireText(value: unknown, label: string): string {
  assert(typeof value === "string", `${label} must be a string`);
  return value;
}

function load(): {categories: ToolCategory[]; tools: Tool[]} {
  const categories = catalog.categories as ToolCategory[];
  const tools = catalog.tools as Tool[];
  const categoryIds = new Set<string>();
  assert(Array.isArray(categories) && categories.length > 0, "categories must be a non-empty array");
  for (const category of categories) {
    assert(SLUG.test(category.id), `bad category id ${category.id}`);
    assert(!categoryIds.has(category.id), `duplicate category ${category.id}`);
    categoryIds.add(category.id);
    assert(category.title.trim().length > 0, `category ${category.id} needs a title`);
    assert(category.description.trim().length > 0, `category ${category.id} needs a description`);
    assert(category.applicationCategory.trim().length > 0, `category ${category.id} needs applicationCategory`);
  }

  const slugs = new Set<string>();
  assert(Array.isArray(tools) && tools.length > 0, "tools must be a non-empty array");
  for (const tool of tools) {
    assert(SLUG.test(tool.slug), `bad slug ${tool.slug}`);
    assert(!slugs.has(tool.slug), `duplicate slug ${tool.slug}`);
    slugs.add(tool.slug);
    assert(categoryIds.has(tool.category), `${tool.slug} has unknown category ${tool.category}`);
    for (const field of ["name", "summary", "whoItsFor", "freeTier", "paidFrom", "pricingModel", "indiaNotes"] as const) {
      requireText(tool[field], `${tool.slug}.${field}`);
      assert(tool[field].trim().length > 0, `${tool.slug}.${field} is empty`);
    }
    assert(DATE.test(tool.pricingLastChecked), `${tool.slug}.pricingLastChecked must be YYYY-MM-DD`);
    assert(HTTP.test(tool.pricingSource), `${tool.slug}.pricingSource must be an https URL`);
    assert(HTTP.test(tool.website), `${tool.slug}.website must be an https URL`);
    if (tool.affiliateUrl !== undefined) {
      assert(HTTP.test(tool.affiliateUrl), `${tool.slug}.affiliateUrl must be an https URL`);
    }
    assert(Array.isArray(tool.lessons), `${tool.slug}.lessons must be an array`);
    for (const lesson of tool.lessons) {
      assert(SLUG.test(lesson), `${tool.slug} has a bad lesson slug ${lesson}`);
      assert(getPostBySlug(lesson), `${tool.slug} links to missing lesson ${lesson}`);
    }
    assert(typeof tool.featured === "boolean", `${tool.slug}.featured must be true or false`);
    if (tool.offer) {
      assert(/^\d+(\.\d+)?$/.test(tool.offer.price), `${tool.slug}.offer.price must be a number`);
      assert(/^[A-Z]{3}$/.test(tool.offer.priceCurrency), `${tool.slug}.offer.priceCurrency must be a 3-letter code`);
      assert(tool.offer.description.trim().length > 0, `${tool.slug}.offer.description is empty`);
    }
  }
  return {categories, tools};
}

const data = load();

export function getCategories(): ToolCategory[] {
  return data.categories;
}

export function getTools(): Tool[] {
  return data.tools;
}

export function getTool(slug: string): Tool | undefined {
  return data.tools.find((tool) => tool.slug === slug);
}

export function getCategory(id: string): ToolCategory | undefined {
  return data.categories.find((category) => category.id === id);
}

export function toolsInCategory(id: string): Tool[] {
  return data.tools.filter((tool) => tool.category === id);
}

export function featuredTools(categoryId?: string): Tool[] {
  return data.tools.filter((tool) => tool.featured && (categoryId === undefined || tool.category === categoryId));
}

export function isUnknown(value: string): boolean {
  return value.trim().toLowerCase() === "unknown";
}

export function displayField(value: string): string {
  return isUnknown(value) ? "Unknown" : value;
}
