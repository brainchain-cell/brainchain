import type { Post } from "@/interfaces/post";
import { firstLessonInPath } from "@/lib/api";
import { getLearningPath, getLearningPaths, type LearningPath } from "@/lib/paths";

export type EntryPoint = {
  id: string;
  title: string;
  copy: string;
  paths: { path: LearningPath; firstLesson: Post }[];
};

const DEFINITIONS: { id: string; title: string; copy: string; pathIds: string[] }[] = [
  {
    id: "work-you-must-get-right",
    title: "Work you must get right",
    copy: "Briefs, research, and the notes you treat as the record. Start with a draft you can check before anyone relies on it.",
    pathIds: ["briefs-and-research", "meetings-and-ops"],
  },
  {
    id: "automate-one-task",
    title: "Automate one task",
    copy: "One repetitive task, kept small enough to undo. First, see whether it wants a fixed workflow or an agent.",
    pathIds: ["first-automation"],
  },
  {
    id: "build-with-agents",
    title: "Build with agents",
    copy: "A coding agent can take a real task. Begin with a brief tight enough to review, and read the change before you merge it.",
    pathIds: ["build-with-agents"],
  },
];

export function getEntryPoints(): EntryPoint[] {
  const known = new Set(getLearningPaths().map((path) => path.id));
  const seen = new Set<string>();
  const entries: EntryPoint[] = [];

  for (const entry of DEFINITIONS) {
    const paths: EntryPoint["paths"] = [];
    for (const pathId of entry.pathIds) {
      if (seen.has(pathId)) throw new Error(`Path ${pathId} is listed in more than one entry point`);
      seen.add(pathId);
      const path = getLearningPath(pathId);
      const firstLesson = firstLessonInPath(pathId);
      if (!path || !firstLesson) throw new Error(`Entry point ${entry.id} has no published lesson for ${pathId}`);
      paths.push({ path, firstLesson });
    }
    entries.push({ id: entry.id, title: entry.title, copy: entry.copy, paths });
  }

  for (const id of known) {
    if (!seen.has(id)) throw new Error(`Path ${id} is not listed in an entry point`);
  }

  return entries;
}

export function entryPointForPath(pathId: string): EntryPoint | undefined {
  return getEntryPoints().find((entry) => entry.paths.some((item) => item.path.id === pathId));
}
