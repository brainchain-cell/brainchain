import modules from "../../data/modules.json";
import { LEVELS, type Level } from "@/interfaces/post";

const SLUG = /^[a-z0-9-]+$/;

export type LearningPath = {
  id: string;
  title: string;
  summary: string;
  /** Position in the site plan (1 Briefs, 2 Meetings, 3 First automation, 4 Build with agents). */
  planOrder: number;
  /**
   * Order used by /learn and the homepage lists.
   * First automation leads so beginners meet the Start here lesson before the other paths.
   */
  catalogOrder: number;
};

/** Homepage "Start here" lesson. Listed first inside its path for beginners. */
export const START_HERE_SLUG = "choose-your-first-automation";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function fail(message: string): never {
  throw new Error(message);
}

function loadPaths(): LearningPath[] {
  if (!Array.isArray(modules)) fail("data/modules.json must be a list of paths");
  const paths: LearningPath[] = [];
  const ids = new Set<string>();
  const planOrders = new Set<number>();
  const catalogOrders = new Set<number>();
  for (const entry of modules) {
    if (!entry || typeof entry !== "object") fail("data/modules.json has an entry that is not an object");
    const path = entry as Record<string, unknown>;
    const id = path.id;
    const title = path.title;
    const summary = path.summary;
    const planOrder = path.planOrder;
    const catalogOrder = path.catalogOrder;
    if (typeof id !== "string" || !SLUG.test(id)) fail(`path id must be a slug, got ${String(id)}`);
    if (ids.has(id)) fail(`duplicate path id ${id}`);
    ids.add(id);
    if (typeof title !== "string" || title.trim() === "") fail(`${id} needs a title`);
    if (typeof summary !== "string" || summary.trim() === "") fail(`${id} needs a summary`);
    if (typeof planOrder !== "number" || !Number.isInteger(planOrder) || planOrder < 1) {
      fail(`${id} planOrder must be a positive integer`);
    }
    if (typeof catalogOrder !== "number" || !Number.isInteger(catalogOrder) || catalogOrder < 1) {
      fail(`${id} catalogOrder must be a positive integer`);
    }
    if (planOrders.has(planOrder)) fail(`duplicate planOrder ${planOrder}`);
    if (catalogOrders.has(catalogOrder)) fail(`duplicate catalogOrder ${catalogOrder}`);
    planOrders.add(planOrder);
    catalogOrders.add(catalogOrder);
    paths.push({ id, title, summary, planOrder, catalogOrder });
  }
  return paths.sort((a, b) => a.catalogOrder - b.catalogOrder);
}

export const learningPaths: LearningPath[] = loadPaths();

export function getLearningPaths(): LearningPath[] {
  return learningPaths;
}

export function getLearningPath(id: string): LearningPath | undefined {
  return learningPaths.find((path) => path.id === id);
}

export function isLevel(value: string): value is Level {
  return (LEVELS as readonly string[]).includes(value);
}

export function levelLabel(level: Level): string {
  if (level === "foundations") return "Foundations";
  if (level === "core") return "Core";
  return "Advanced";
}

/** Format YYYY-MM-DD without shifting the calendar day across time zones. */
export function formatIsoDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const month = MONTHS[Number(match[2]) - 1];
  if (!month) return iso;
  return `${Number(match[3])} ${month} ${match[1]}`;
}
