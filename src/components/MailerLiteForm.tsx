"use client";

import { useEffect, useRef } from "react";
import { MAILERLITE_ACCOUNT_ID, MAILERLITE_FORM_ID } from "@/lib/constants";

/**
 * Same embedded form as the homepage (`data-form` QZNbil, account 2632671).
 * The universal script scans `.ml-embedded` once. On a later client navigation
 * the container is empty, so this asks MailerLite to render that same form again.
 */
export function MailerLiteForm() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let cancelled = false;
    let script: HTMLScriptElement | null = null;

    const renderIfEmpty = () => {
      if (cancelled || !node.isConnected) return true;
      if (node.childElementCount > 0) return true;
      const ml = (window as Window & { ml?: { fn?: { renderEmbeddedForm?: unknown } } }).ml;
      if (!ml?.fn?.renderEmbeddedForm) return false;
      script = document.createElement("script");
      script.async = true;
      script.src = `https://assets.mailerlite.com/jsonp/${MAILERLITE_ACCOUNT_ID}/forms/${MAILERLITE_FORM_ID}?callback=ml.fn.renderEmbeddedForm&cache=${Date.now()}`;
      document.head.appendChild(script);
      return true;
    };

    if (renderIfEmpty()) {
      return () => {
        cancelled = true;
        script?.remove();
      };
    }

    const timer = window.setInterval(() => {
      if (renderIfEmpty()) window.clearInterval(timer);
    }, 200);
    const stop = window.setTimeout(() => window.clearInterval(timer), 8000);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      window.clearTimeout(stop);
      script?.remove();
    };
  }, []);

  return <div ref={ref} className="ml-embedded" data-form={MAILERLITE_FORM_ID} />;
}
