"use client";
import { useState } from "react";
import { LessonCard } from "@/components/LessonCard";
import type { Post } from "@/interfaces/post";
type Summary = Pick<
  Post,
  "slug" | "title" | "excerpt" | "path" | "level" | "readTime"
>;
export function LessonCatalog({
  posts,
  paths,
}: {
  posts: Summary[];
  paths: { id: string; title: string }[];
}) {
  const [query, setQuery] = useState("");
  const [path, setPath] = useState("all");
  const [level, setLevel] = useState("all");
  const shown = posts.filter(
    (p) =>
      (path === "all" || p.path === path) &&
      (level === "all" || p.level === level) &&
      `${p.title} ${p.excerpt} ${paths.find((x) => x.id === p.path)?.title}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  function clear() {
    setQuery("");
    setPath("all");
    setLevel("all");
  }
  return (
    <section className="catalog" aria-label="Lesson catalog">
      <h2 className="sr-only">Browse the lessons</h2>
      <div className="catalog-toolbar">
        <label className="search-label">
          <span>Find a lesson</span>
          <div>
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Try writing, Notion, automation…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </label>
        <label className="level-filter">
          Experience level
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="all">All levels</option>
            <option value="foundations">Foundations</option>
            <option value="core">Core</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>
      </div>
      <div className="filter-chips" aria-label="Filter by learning path">
        {[{ id: "all", title: "All lessons" }, ...paths].map((p) => (
          <button
            key={p.id}
            aria-pressed={path === p.id}
            onClick={() => setPath(p.id)}
          >
            {p.title}
          </button>
        ))}
      </div>
      <div className="catalog-meta">
        <p role="status">
          {shown.length} {shown.length === 1 ? "lesson" : "lessons"}
          {path !== "all"
            ? ` in ${paths.find((p) => p.id === path)?.title}`
            : " to explore"}
        </p>
        {query || path !== "all" || level !== "all" ? (
          <button className="text-button" onClick={clear}>
            Clear filters ×
          </button>
        ) : null}
      </div>
      {shown.length ? (
        <div className="lesson-grid catalog-grid">
          {shown.map((post, i) => (
            <LessonCard key={post.slug} post={post} index={i} art={false} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No lessons match those filters.</h2>
          <p>Try a broader search, or clear the filters to see every lesson.</p>
          <button className="button" onClick={clear}>
            Show all lessons
          </button>
        </div>
      )}
      <noscript>
        <p>
          Search and filters need JavaScript. All lesson links are listed above.
        </p>
      </noscript>
    </section>
  );
}
