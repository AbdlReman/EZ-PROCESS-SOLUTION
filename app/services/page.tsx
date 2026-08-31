import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { serviceDetails } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services | EZ Process Solution",
  description: "End-to-end technology services — web, mobile, AI, cloud, design, and strategy.",
};

const whyUs = [
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "End-to-End Ownership",
    desc: "One team from strategy through shipping — no handoff friction, no accountability gaps.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Fast Time-to-Value",
    desc: "Two-week sprints, demo sessions every cycle — you see progress before the invoice.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Security by Default",
    desc: "Every engagement includes security-first architecture, code review, and compliance guidance.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Senior-Led Teams",
    desc: "No juniors on critical paths. Every engagement is led and reviewed by senior engineers.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <main>

        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="hero-purple-section" style={{ paddingBottom: "5rem" }}>
          <div className="brelyx-container" style={{ position: "relative" }}>
            <div className="hero-p-badge">● Our Services</div>
            <h1 className="hero-p-h1">Transform Your Business</h1>
            <p className="hero-p-sub">
              From product strategy to production deployment — six core practices,
              one team, end-to-end accountability.
            </p>
            <Link href="/contact" className="hero-p-btn">Start a Project →</Link>
          </div>
        </section>

        {/* ── Services grid ──────────────────────────────────── */}
        <section className="lt-section-alt">
          <div className="brelyx-container">
            <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 4rem" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="lt-kicker">What We Do</div>
              </div>
              <h2 className="lt-h2">Six core practices, one team.</h2>
              <p className="lt-lead">
                We don&apos;t just write code — we engineer outcomes across every layer of your digital product.
              </p>
            </div>
            <div style={{ display: "grid", gap: "1.75rem", gridTemplateColumns: "repeat(3, minmax(0,1fr))" }}
              className="lt-portfolio-grid">
              {serviceDetails.map((svc) => (
                <Link key={svc.slug} href={`/services/${svc.slug}`} className="lt-card">
                  <div className="lt-card-img lt-card-img-wide">
                    <Image
                      src={svc.image}
                      alt={svc.title}
                      fill
                      className="object-cover object-center"
                    />
                    <div className="lt-card-hover-btn">
                      <div className="lt-card-hover-btn-inner">Explore Service →</div>
                    </div>
                    <div style={{ position: "absolute", bottom: "0.75rem", left: "0.875rem" }}>
                      <span className="lt-card-cat">{svc.category}</span>
                    </div>
                  </div>
                  <div className="lt-card-body">
                    <div className="lt-card-title">{svc.title}</div>
                    <div className="lt-card-excerpt" style={{ WebkitLineClamp: 2, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {svc.tagline}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", paddingTop: "0.25rem" }}>
                      {svc.tools.slice(0, 3).map((t) => (
                        <span key={t} className="lt-tech-tag">{t}</span>
                      ))}
                      {svc.tools.length > 3 && (
                        <span className="lt-tech-tag">+{svc.tools.length - 3}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why EZ Process Solution ─────────────────────────────────────── */}
        <section className="lt-section">
          <div className="brelyx-container">
            <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 4rem" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="lt-kicker">Why EZ Process Solution</div>
              </div>
              <h2 className="lt-h2">Built differently, on purpose.</h2>
            </div>
            <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(4, minmax(0,1fr))" }}
              className="lt-why-grid">
              {whyUs.map((item) => (
                <div key={item.title} className="lt-why-card">
                  <div className="lt-why-icon">{item.icon}</div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>
                    {item.title}
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "#6B7280", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────── */}
        <div className="dark-cta-band">
          <div className="brelyx-container">
            <h2 className="dark-cta-h2">Not sure which service fits?</h2>
            <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "0.97rem", lineHeight: 1.8, maxWidth: "480px", margin: "0 auto 2rem" }}>
              Tell us your challenge — we&apos;ll map it to the right solution and give you an honest assessment.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/contact" className="dark-cta-btn">Get a Free Consultation →</Link>
              <Link href="/portfolio" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.9rem 2rem", borderRadius: "999px",
                border: "1.5px solid rgba(255,255,255,0.25)", background: "transparent",
                color: "#ffffff", fontSize: "0.95rem", fontWeight: 600, textDecoration: "none",
              }}>
                See Our Work
              </Link>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
