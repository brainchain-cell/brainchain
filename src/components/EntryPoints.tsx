import Link from "next/link";
import { getEntryPoints } from "@/lib/entryPoints";
import { levelLabel } from "@/lib/paths";

export function EntryPoints() {
  const entries = getEntryPoints();
  return (
    <div className="entry-points">
      {entries.map((entry) => (
        <section className="entry-point" id={entry.id} key={entry.id}>
          <h2>{entry.title}</h2>
          <p>{entry.copy}</p>
          <ul className="entry-lessons">
            {entry.paths.map(({ path, firstLesson }) => (
              <li key={path.id}>
                <Link className="entry-path" href={`/learn/${path.id}`}>
                  {path.title}
                </Link>
                <Link className="entry-lesson" href={`/posts/${firstLesson.slug}`}>
                  {firstLesson.title}
                </Link>
                <span className="lesson-meta">
                  {levelLabel(firstLesson.level)} · {firstLesson.readTime} min read
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
