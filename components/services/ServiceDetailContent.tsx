import Image from "next/image";
import Link from "next/link";
import type { ServiceDetail } from "@/lib/models/service";
import type { ServicePackage } from "@/lib/models/package";
import RichContent from "@/components/RichContent";
import QuickInquiryButton from "@/components/contact/QuickInquiryButton";

export default function ServiceDetailContent({
  service,
  packages = [],
}: {
  service: ServiceDetail;
  packages?: ServicePackage[];
}) {
  return (
    <div className="min-h-screen">
      <main>
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="hero-purple-section" style={{ paddingBottom: "5rem" }}>
          <div className="brelyx-container" style={{ position: "relative" }}>
            <div className="hero-p-badge">● {service.category}</div>
            <h1 className="slug-h1">{service.title}</h1>
            <p className="hero-p-sub">{service.tagline}</p>
            <QuickInquiryButton
              className="hero-p-btn"
              source="Service"
              serviceName={service.title}
              defaultMessage={`I'm interested in ${service.title}. `}
            >
              Start a Project →
            </QuickInquiryButton>
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

                {(service.features?.length ?? 0) > 0 && (
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

                {(service.process?.length ?? 0) > 0 && (
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
                  {(service.deliverables?.length ?? 0) > 0 && (
                    <div>
                      <div className="lt-sidebar-section-label">Deliverables</div>
                      <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                        {service.deliverables.map((item) => (
                          <li key={item} style={{ fontSize: "0.85rem", color: "#374151", lineHeight: 1.6 }}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {(service.tools?.length ?? 0) > 0 && (
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
                  <QuickInquiryButton
                    className="lt-btn"
                    style={{ justifyContent: "center" }}
                    source="Service"
                    serviceName={service.title}
                    defaultMessage={`I'm interested in ${service.title}. `}
                  >
                    Get Started →
                  </QuickInquiryButton>
                  <Link href="/services" style={{ fontSize: "0.85rem", color: "#6C4CFF", fontWeight: 600, textDecoration: "none", textAlign: "center" }}>
                    ← Back to Services
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ── Packages ──────────────────────────────────────── */}
        {packages.length > 0 && (
          <section className="lt-section-alt">
            <div className="brelyx-container">
              <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 3rem" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div className="lt-kicker">Pricing</div>
                </div>
                <h2 className="lt-h2">Choose Your Package</h2>
              </div>
              <div className="lt-pricing-grid">
                {packages.map((pkg) => (
                  <div key={pkg.id} className={`lt-pricing-card${pkg.highlight ? " highlight" : ""}`}>
                    {pkg.highlight && <span className="lt-pricing-badge">Most Popular</span>}
                    <div className="lt-pricing-name">{pkg.name}</div>
                    <div className="lt-pricing-price">{pkg.price}</div>
                    {pkg.deliveryTime && <div className="lt-pricing-delivery">⏱ {pkg.deliveryTime}</div>}
                    <p className="lt-pricing-desc">{pkg.description}</p>
                    {(pkg.features?.length ?? 0) > 0 && (
                      <ul className="lt-pricing-features">
                        {pkg.features.map((feature) => (
                          <li key={feature} className="lt-pricing-feature">
                            <span className="lt-pricing-feature-icon">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    <QuickInquiryButton
                      className="lt-btn"
                      style={{ justifyContent: "center" }}
                      source="Package"
                      serviceName={service.title}
                      packageName={pkg.name}
                      defaultMessage={`I'm interested in the ${pkg.name} package (${pkg.price}) for ${service.title}.`}
                    >
                      Get Started →
                    </QuickInquiryButton>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
