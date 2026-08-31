import Link from "next/link";

export default function AboutHeroSection() {
  return (
    <section className="hero-purple-section">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(14,165,233,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(3,105,161,0.2) 0%, transparent 40%)",
        }}
      />
      <div className="brelyx-container" style={{ position: "relative" }}>
        <div className="hero-p-badge">● Who We Are</div>
        <h1 className="hero-p-h1">
          Human-Centred.<br />Engineering-Led.
        </h1>
        <p className="hero-p-sub">
          EZ Process Solution is a collective of strategists, designers, cloud architects, and full-stack engineers —
          aligning on outcomes and owning delivery end to end.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
          <Link href="/contact" className="hero-p-btn">Work With Us →</Link>
          <Link href="/portfolio" className="hero-p-ghost">View Our Work</Link>
        </div>
      </div>
    </section>
  );
}
