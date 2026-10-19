"use client";

import {useState, type FormEvent} from "react";
import {INQUIRY_EMAIL, inquiryEmailIsConfigured} from "@/lib/site";

type Status = {kind: "idle" | "sending" | "sent" | "mailto" | "unconfigured" | "error"; detail?: string};

const inboxReady = inquiryEmailIsConfigured(INQUIRY_EMAIL);

function mailtoHref(fields: {name: string; email: string; toolName: string; website: string; interest: string; message: string}) {
  const subject = `Feature a tool: ${fields.toolName || "inquiry"}`;
  const body = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Tool: ${fields.toolName}`,
    `Website: ${fields.website || ""}`,
    `Interest: ${fields.interest}`,
    "",
    fields.message,
  ].join("\n");
  return `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function InquiryForm() {
  const [status, setStatus] = useState<Status>({kind: "idle"});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const fields = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      toolName: String(data.get("toolName") || ""),
      website: String(data.get("website") || ""),
      interest: String(data.get("interest") || ""),
      message: String(data.get("message") || ""),
      company_website: String(data.get("company_website") || ""),
    };
    setStatus({kind: "sending"});
    try {
      const response = await fetch("/api/feature-inquiry", {
        method: "POST",
        headers: {"content-type": "application/json", accept: "application/json"},
        body: JSON.stringify(fields),
      });
      if (response.ok) {
        form.reset();
        setStatus({kind: "sent"});
        return;
      }
      if (response.status === 404 || response.status === 503) {
        openMailtoOrExplain(fields);
        return;
      }
      setStatus({kind: "error", detail: "Check the required fields and try again."});
    } catch {
      openMailtoOrExplain(fields);
    }
  }

  function openMailtoOrExplain(fields: {name: string; email: string; toolName: string; website: string; interest: string; message: string}) {
    if (inboxReady) {
      window.location.href = mailtoHref(fields);
      setStatus({kind: "mailto"});
      return;
    }
    setStatus({kind: "unconfigured"});
  }

  return (
    <form className="inquiry-form" action="/api/feature-inquiry" method="post" onSubmit={onSubmit}>
      <div className="form-grid">
        <label>Your name
          <input name="name" required maxLength={120} autoComplete="name" />
        </label>
        <label>Email
          <input name="email" type="email" required maxLength={200} autoComplete="email" />
        </label>
        <label>Tool name
          <input name="toolName" required maxLength={160} />
        </label>
        <label>Official website
          <input name="website" type="url" inputMode="url" placeholder="https://" maxLength={300} />
        </label>
        <label>What are you asking about?
          <select name="interest" required defaultValue="both">
            <option value="featured-listing">Featured listing</option>
            <option value="newsletter-mention">Newsletter mention</option>
            <option value="both">Featured listing and newsletter mention</option>
          </select>
        </label>
        <label>Message
          <textarea name="message" required maxLength={4000} rows={6} />
        </label>
        <label className="honeypot">Company website
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
        <button className="button" type="submit" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Sending…" : "Send inquiry"}
        </button>
      </div>
      <div className="form-status" role="status">
        {status.kind === "sent" ? <p>Received. There is no payment on this form. If it is a fit, Brainchain will reply by email.</p> : null}
        {status.kind === "mailto" ? (
          <p>
            Your email app will open with a draft to {INQUIRY_EMAIL}. Send that draft to finish. If it does not open, write to{" "}
            <a href={`mailto:${INQUIRY_EMAIL}`}>{INQUIRY_EMAIL}</a> directly.
          </p>
        ) : null}
        {status.kind === "unconfigured" ? <p>The inquiry form is not connected yet. Nothing was sent. The site owner still needs to add Cloudflare storage or replace the placeholder inbox.</p> : null}
        {status.kind === "error" ? <p>{status.detail}</p> : null}
      </div>
      <noscript>
        <p>JavaScript is off. The form still posts to the site. If storage is not configured, the next page explains what the owner needs to turn on.</p>
      </noscript>
    </form>
  );
}
