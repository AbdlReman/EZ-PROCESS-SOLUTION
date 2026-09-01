import Image from "next/image";
import Link from "next/link";
import type { ServiceDetail } from "@/lib/models/service";
import RichContent from "@/components/RichContent";

export default function ServiceDetailContent({ service }: { service: ServiceDetail }) {
  return (
    <div className="min-h-screen">
      <main>
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="hero-purple-section" style={{ paddingBottom: "5rem" }}>
          <div className="brelyx-container" style={{ position: "relative" }}>
            <div className="hero-p-badge">● {service.category}</div>
            <h1 className="slug-h1">{service.title}</h1>
            <p className="hero-p-sub">{service.tagline}</p>
            <Link href="/contact" className="hero-p-btn">Start a Project →</Link>
          </div>
        </section>

        {/* ── Detail ────────────────────────────────────────── */}
        <section className="lt-section">
          <div className="brelyx-container">
            <div className="lt-detail-split" style={{ display: "grid", gap: "2.5rem" }}>
              <div>
                <div style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16/9",
                  borderRadius: "1.25rem",
                  overflow: "hidden",
                  border: "1px solid #E5E7EB",
                  marginBottom: "2rem",
                }}>
                  <Image src={service.image} alt={service.title} fill className="object-cover object-center" priority />
                </div>

                <div style={{ marginBottom: "2.5rem" }}>
                  <RichContent html={service.longDescription} />
                </div>

                {service.features.length > 0 && (
                  <div style={{ marginBottom: "2.5rem" }}>
                    <div className="lt-sidebar-section-label">What&apos;s Included</div>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {service.features.map((feature) => (
                        <li key={feature} style={{ display: "flex", gap: "0.75rem", fontSize: "0.92rem", color: "#374151", lineHeight: 1.6 }}>
                          <span style={{ color: "#6C4CFF", fontWeight: 700 }}>→</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.process.length > 0 && (
                  <div>
                    <div className="lt-sidebar-section-label">Our Process</div>
                    <div className="lt-process-grid" style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(2, minmax(0,1fr))" }}>
                      {service.process.map((step) => (
                        <div key={step.step} className="lt-process-card">
                          <div className="lt-process-num">{step.step}</div>
                          <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>
                            {step.title}
                          </div>
                          <p style={{ fontSize: "0.82rem", color: "#6B7280", lineHeight: 1.7 }}>{step.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <aside>
                <div className="lt-sidebar-card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {service.deliverables.length > 0 && (
                    <div>
                      <div className="lt-sidebar-section-label">Deliverables</div>
                      <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                        {service.deliverables.map((item) => (
                          <li key={item} style={{ fontSize: "0.85rem", color: "#374151", lineHeight: 1.6 }}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {service.tools.length > 0 && (
                    <div>
                      <div className="lt-sidebar-section-label">Tools &amp; Tech</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        {service.tools.map((t) => (
                          <span key={t} className="lt-tech-tag">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {service.highlight && (
                    <div className="lt-quote-box">
                      <p className="lt-quote-text">{service.highlight}</p>
                    </div>
                  )}
                  <Link href="/contact" className="lt-btn" style={{ justifyContent: "center" }}>
                    Get Started →
                  </Link>
                  <Link href="/services" style={{ fontSize: "0.85rem", color: "#6C4CFF", fontWeight: 600, textDecoration: "none", textAlign: "center" }}>
                    ← Back to Services
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
