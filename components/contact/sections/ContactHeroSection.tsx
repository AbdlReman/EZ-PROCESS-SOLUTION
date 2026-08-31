"use client";

export default function ContactHeroSection() {
  return (
    <section className="hero-purple-section" style={{ paddingBottom: "5rem" }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at 70% 40%, rgba(14,165,233,0.2) 0%, transparent 45%)",
        }}
      />
      <div className="brelyx-container" style={{ position: "relative" }}>
        <div className="hero-p-badge">● Get in Touch</div>
        <h1 className="hero-p-h1" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}>
          Ready to explore what we<br />can build together?
        </h1>
        <p className="hero-p-sub" style={{ maxWidth: "560px" }}>
          Share a bit about your project and our team will reach out with a tailored response
          — usually within one business day.
        </p>
      </div>
    </section>
  );
}
