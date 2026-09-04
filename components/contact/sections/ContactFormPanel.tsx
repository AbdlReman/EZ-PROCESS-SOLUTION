"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContactMessage, type ContactActionState } from "@/lib/actions/contact";

const serviceOptions = ["Web Development", "Mobile Apps", "Cloud & DevOps", "Data & AI", "UI/UX Design", "Digital Strategy"] as const;
const budgetOptions = ["Under $10K", "$10K – $50K", "$50K – $150K", "$150K – $500K", "$500K+"] as const;

export default function ContactFormPanel() {
  const [state, formAction, pending] = useActionState<ContactActionState, FormData>(submitContactMessage, undefined);
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [dismissedSuccess, setDismissedSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      setSelectedServices(new Set());
      setDismissedSuccess(false);
    }
  }, [state?.success]);

  function toggleService(service: string) {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(service)) {
        next.delete(service);
      } else {
        next.add(service);
      }
      return next;
    });
  }

  if (state?.success && !dismissedSuccess) {
    return (
      <div className="lt-form-card">
        <div className="lt-form-success">
          <div className="lt-form-success-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#111827", marginBottom: "0.4rem" }}>
              Message sent
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#6B7280", lineHeight: 1.6 }}>
              Thanks for reaching out — our team will get back to you within one business day.
            </p>
          </div>
          <button type="button" className="lt-chip-btn" onClick={() => setDismissedSuccess(true)}>
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lt-form-card">
      <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#111827", marginBottom: "0.4rem" }}>
        Send us a message
      </h3>
      <p style={{ fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "2rem" }}>
        We&apos;ll reply within one business day.
      </p>

      <form ref={formRef} action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <input type="hidden" name="source" value="General" />
        <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "1fr 1fr" }} className="lt-form-2col">
          <div>
            <label className="lt-form-label">Full Name <span style={{ color: "#6C4CFF" }}>*</span></label>
            <input name="name" className="lt-input" placeholder="Alex Johnson" required />
          </div>
          <div>
            <label className="lt-form-label">Work Email <span style={{ color: "#6C4CFF" }}>*</span></label>
            <input name="email" type="email" className="lt-input" placeholder="you@company.com" required />
          </div>
        </div>

        <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "1fr 1fr" }} className="lt-form-2col">
          <div>
            <label className="lt-form-label">Company</label>
            <input name="company" className="lt-input" placeholder="Company name" />
          </div>
          <div>
            <label className="lt-form-label">Budget Range</label>
            <div style={{ position: "relative" }}>
              <select name="budget" className="lt-select" style={{ paddingRight: "2.5rem" }} defaultValue="">
                <option value="">Select range</option>
                {budgetOptions.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              <div style={{
                pointerEvents: "none",
                position: "absolute",
                right: "0.875rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9CA3AF",
              }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="lt-form-label">Services you&apos;re interested in</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
            {serviceOptions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => toggleService(s)}
                className={`lt-chip-btn${selectedServices.has(s) ? " active" : ""}`}
                aria-pressed={selectedServices.has(s)}
              >
                {s}
              </button>
            ))}
          </div>
          {Array.from(selectedServices).map((s) => (
            <input key={s} type="hidden" name="services" value={s} />
          ))}
        </div>

        <div>
          <label className="lt-form-label">Project Details <span style={{ color: "#6C4CFF" }}>*</span></label>
          <textarea
            name="message"
            className="lt-textarea"
            placeholder="Tell us about your project, timelines, and what success looks like for you."
            required
          />
        </div>

        {state?.error && <p className="lt-form-error-text">{state.error}</p>}

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", paddingTop: "0.5rem" }}>
          <button type="submit" className="lt-btn" style={{ padding: "0.85rem 2.25rem" }} disabled={pending}>
            {pending ? "Sending…" : "Send Message →"}
          </button>
          <p style={{ fontSize: "0.72rem", color: "#9CA3AF", lineHeight: 1.5 }}>
            No spam, ever. We reply within 1 business day.
          </p>
        </div>
      </form>
    </div>
  );
}
