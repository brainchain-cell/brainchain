import Link from "next/link";
import type { Post } from "@/interfaces/post";
import { getLearningPath, levelLabel } from "@/lib/paths";
export function LessonArt({ kind = 0 }: { kind?: number }) {
  return (
    <div className={`lesson-art art-${kind % 3}`} aria-hidden="true">
      {kind % 3 === 0 ? (
        <>
          <div className="art-document">
            <span>THE BRIEF</span>
            <i />
            <i />
            <i className="short" />
            <div className="art-tick">✓ Source checked</div>
          </div>
          <span className="art-annotation">evidence → clarity</span>
        </>
      ) : kind % 3 === 1 ? (
        <>
          <div className="art-note note-back">
            APPROVED
            <br />
            <b>The source of truth.</b>
          </div>
          <div className="art-note note-front">
            AI DRAFT
            <br />
            <b>A place to think.</b>
            <i />
            <i />
          </div>
          <span className="art-corner">Keep a clear boundary ↗</span>
        </>
      ) : (
        <>
          <div className="art-node">Task</div>
          <span className="art-connector">→</span>
          <div className="art-node node-check">
            Check
            <br />
            <span>Human review</span>
          </div>
          <span className="art-connector">→</span>
          <div className="art-node node-last">
            Done
            <br />
            <span>Keep an undo</span>
          </div>
        </>
      )}
    </div>
  );
}
export function LessonCard({
  post,
  index = 0,
  art = true,
}: {
  post: Pick<
    Post,
    "slug" | "title" | "excerpt" | "path" | "readTime" | "level"
  >;
  index?: number;
  art?: boolean;
}) {
  return (
    <article className="lesson-card">
      {art ? <LessonArt kind={index} /> : null}
      <div className="lesson-card-body">
        <div className="card-meta">
          <span>{getLearningPath(post.path)?.title}</span>
          <span>{post.readTime} min read</span>
        </div>
        <h3>
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </h3>
        <p>{post.excerpt}</p>
        <div className="card-bottom">
          <span className="level-tag">{levelLabel(post.level)}</span>
          <Link
            href={`/posts/${post.slug}`}
            aria-label={`Read ${post.title}`}
            className="card-arrow"
          >
            ↗
          </Link>
        </div>
      </div>
    </article>
  );
}
