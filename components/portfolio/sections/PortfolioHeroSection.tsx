"use client";

export default function PortfolioHeroSection({ projectCount }: { projectCount: number }) {
  return (
    <section className="hero-purple-section" style={{ paddingBottom: "5rem" }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at 30% 60%, rgba(14,165,233,0.18) 0%, transparent 45%)",
        }}
      />
      <div className="brelyx-container" style={{ position: "relative" }}>
        <div className="hero-p-badge">● Our Portfolio</div>
        <h1 className="hero-p-h1">
          Real projects.<br />Real results.
        </h1>
        <p className="hero-p-sub">
          From e-commerce platforms and healthcare systems to matrimonial apps and content management tools —
          here&apos;s a selection of the work we&apos;re proud of.
        </p>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5rem 1.25rem",
          borderRadius: "999px",
          background: "rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.8)",
          fontSize: "0.85rem",
          border: "1px solid rgba(255,255,255,0.15)",
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3FE0D0", display: "inline-block", flexShrink: 0 }} />
          {projectCount} projects across multiple industries
        </div>
      </div>
    </section>
  );
}
