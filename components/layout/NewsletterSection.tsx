"use client";

import { useActionState, useEffect, useRef } from "react";
import { subscribeNewsletter, type SubscribeActionState } from "@/lib/actions/subscribe";

export default function NewsletterSection() {
  const [state, formAction, pending] = useActionState<SubscribeActionState, FormData>(subscribeNewsletter, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state?.success]);

  return (
    <section className="newsletter-band">
      <div className="brelyx-container newsletter-inner">
        <div className="newsletter-copy">
          <span className="newsletter-eyebrow">Stay in the loop</span>
          <h2 className="newsletter-heading">Get updates  in your inbox</h2>
          <p className="newsletter-sub">No spam — just the occasional update on what we&apos;re building and learning.</p>
        </div>

        <div style={{ width: "100%", maxWidth: "26rem" }}>
          {state?.success ? (
            <div className="newsletter-success">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              You&apos;re subscribed — thanks for joining!
            </div>
          ) : (
            <form ref={formRef} action={formAction} className="newsletter-form">
              <input
                type="email"
                name="email"
                placeholder="you@company.com"
                className="newsletter-input"
                required
              />
              <button type="submit" className="brelyx-btn-primary" disabled={pending} style={{ whiteSpace: "nowrap" }}>
                {pending ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          )}
          {state?.error && <p className="newsletter-error">{state.error}</p>}
        </div>
      </div>
    </section>
  );
}
