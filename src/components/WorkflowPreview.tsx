"use client";
import { useState } from "react";
import Link from "next/link";
const examples = [
  {
    id: "brief",
    label: "Write a brief",
    title: "A draft you can stand behind.",
    input: "Approved facts + a clear reader",
    draft: "A focused first draft",
    check: "Trace each claim to its source",
    result: "Ready for your final edit",
    slug: "ai-writing-with-a-verification-step",
    note: "A fluent answer is a starting point. The fact trail is what makes it useful.",
  },
  {
    id: "meeting",
    label: "Run a meeting",
    title: "Keep the record trustworthy.",
    input: "Approved notes + the decisions",
    draft: "A separate AI-assisted summary",
    check: "Check owners, dates and decisions",
    result: "Update the approved record",
    slug: "keep-notion-ai-drafts-separate",
    note: "Keep working drafts separate from the pages your team treats as the source of truth.",
  },
  {
    id: "automate",
    label: "Automate a task",
    title: "Start small. Keep an undo.",
    input: "One repetitive, bounded task",
    draft: "A trigger and a simple action",
    check: "Try sample inputs + failure cases",
    result: "A workflow you can reverse",
    slug: "choose-your-first-automation",
    note: "Define the exception and the stop condition before you hand work to an automation.",
  },
];
export function WorkflowPreview() {
  const [active, setActive] = useState(0);
  return (
    <div className="workflow-preview">
      <div className="preview-top">
        <span className="status-dot" /> THE WORKBENCH{" "}
        <span className="preview-small">A worked example</span>
      </div>
      <div
        className="preview-tabs"
        role="tablist"
        aria-label="Explore a workflow"
      >
        {examples.map((item, i) => (
          <button
            id={`tab-${item.id}`}
            role="tab"
            aria-selected={active === i}
            aria-controls={`panel-${item.id}`}
            tabIndex={active === i ? 0 : -1}
            key={item.id}
            onClick={() => setActive(i)}
            onKeyDown={(event) => {
              if (
                ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
              ) {
                event.preventDefault();
                const n =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? 2
                      : (active + (event.key === "ArrowRight" ? 1 : 2)) % 3;
                setActive(n);
                document.getElementById(`tab-${examples[n].id}`)?.focus();
              }
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      {examples.map((e, i) => (
        <div
          role="tabpanel"
          key={e.id}
          hidden={active !== i}
          id={`panel-${e.id}`}
          aria-labelledby={`tab-${e.id}`}
          className="preview-panel"
        >
          <p className="preview-kicker">FROM INPUT TO SOMETHING USEFUL</p>
          <h2>{e.title}</h2>
          <ol className="workflow-steps">
            {[
              ["01", "Your input", e.input],
              ["02", "AI helps", e.draft],
              ["03", "You check", e.check],
            ].map(([n, label, text]) => (
              <li key={n}>
                <span className="step-number">{n}</span>
                <div>
                  <span>{label}</span>
                  <strong>{text}</strong>
                </div>
                {n === "03" ? (
                  <span className="checkmark" aria-hidden="true">
                    ✓
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
          <div className="workflow-result">
            <span aria-hidden="true">↳</span>
            <div>
              <small>THE OUTPUT</small>
              <strong>{e.result}</strong>
            </div>
          </div>
          <p className="preview-note">{e.note}</p>
          <Link href={`/posts/${e.slug}`} className="preview-link">
            Walk through the lesson <span aria-hidden="true">↗</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
