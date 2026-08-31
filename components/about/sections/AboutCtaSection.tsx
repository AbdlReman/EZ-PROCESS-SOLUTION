import Link from "next/link";

export default function AboutCtaSection() {
  return (
    <div className="dark-cta-band">
      <div className="brelyx-container">
        <h2 className="dark-cta-h2">
          Ready to work with a team<br />that delivers?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "0.97rem", lineHeight: 1.8, maxWidth: "480px", margin: "0 auto 2rem" }}>
          Let&apos;s discuss your project and build something exceptional together.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/contact" className="dark-cta-btn">Start a Conversation →</Link>
          <Link href="/portfolio" style={{
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
            transition: "background 0.2s, border-color 0.2s",
          }}>
            See Our Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
