"use client";
import { useEffect, useState } from "react";
const KEY = "brainchain:completed:v1";
export function LessonProgress({ slug }: { slug: string }) {
  const [done, setDone] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const value = JSON.parse(localStorage.getItem(KEY) || "[]");
      setDone(Array.isArray(value) && value.includes(slug));
    } catch {
      setStorageError(true);
    }
    setReady(true);
  }, [slug]);
  function toggle() {
    const next = !done;
    setDone(next);
    try {
      const value = JSON.parse(localStorage.getItem(KEY) || "[]");
      const items: string[] = Array.isArray(value)
        ? value.filter((v: unknown) => typeof v === "string")
        : [];
      localStorage.setItem(
        KEY,
        JSON.stringify(
          next
            ? [...new Set([...items, slug])]
            : items.filter((v) => v !== slug),
        ),
      );
    } catch {
      setStorageError(true);
    }
  }
  return (
    <section className="completion">
      <div>
        <p className="eyebrow">MAKE IT YOURS</p>
        <h2>Finished the exercise?</h2>
        <p>
          Reading is the start. Try the workflow on sample material before
          marking it complete.
        </p>
      </div>
      <div>
        <button
          className="button"
          disabled={!ready}
          aria-pressed={done}
          onClick={toggle}
        >
          {done ? "✓ Lesson complete" : "Mark as complete"}
        </button>
        <p role="status" className="fine-print">
          {storageError
            ? "Progress lasts for this page visit only; browser storage is unavailable."
            : "Progress stays in this browser. No account needed."}
        </p>
      </div>
    </section>
  );
}
