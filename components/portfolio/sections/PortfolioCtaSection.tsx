"use client";

import Link from "next/link";

export default function PortfolioCtaSection() {
  return (
    <div className="dark-cta-band">
      <div className="brelyx-container">
        <h2 className="dark-cta-h2">
          Have a project in mind?<br />Let&apos;s build it.
        </h2>
        <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "0.97rem", lineHeight: 1.8, maxWidth: "480px", margin: "0 auto 2rem" }}>
          We&apos;d love to hear about your idea. Our team will respond within one business day.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/contact" className="dark-cta-btn">Start a Conversation →</Link>
          <Link href="/about" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.9rem 2rem",
            borderRadius: "999px",
            border: "1.5px solid rgba(255,255,255,0.25)",
            background: "transparent",
            color: "#ffffff",
            fontSize: "0.95rem",
            fontWeight: 600,
            textDecoration: "none",
          }}>
            Learn About Us
          </Link>
        </div>
      </div>
    </div>
  );
}
