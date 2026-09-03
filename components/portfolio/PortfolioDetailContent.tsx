import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/models/project";
import RichContent from "@/components/RichContent";

export default function PortfolioDetailContent({ project }: { project: Project }) {
  return (
    <div className="min-h-screen">
      <main>
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="hero-purple-section" style={{ paddingBottom: "5rem" }}>
          <div className="brelyx-container" style={{ position: "relative" }}>
            <div className="hero-p-badge">● {project.category}</div>
            <h1 className="slug-h1">{project.title}</h1>
            <p className="hero-p-sub">{project.tagline}</p>
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="hero-p-btn">
                Visit Live Site →
              </a>
            )}
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
                  aspectRatio: "16/10",
                  borderRadius: "1.25rem",
                  overflow: "hidden",
                  border: "1px solid #E5E7EB",
                  marginBottom: "2rem",
                }}>
                  <Image src={project.image} alt={project.title} fill className="object-cover object-top" priority />
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <RichContent html={project.longDescription} />
                </div>

                {(project.features?.length ?? 0) > 0 && (
                  <div style={{ marginBottom: "2rem" }}>
                    <div className="lt-sidebar-section-label">Key Features</div>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {project.features.map((feature) => (
                        <li key={feature} style={{ display: "flex", gap: "0.75rem", fontSize: "0.92rem", color: "#374151", lineHeight: 1.6 }}>
                          <span style={{ color: "#6C4CFF", fontWeight: 700 }}>→</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.detailImages && project.detailImages.length > 0 && (
                  <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                    {project.detailImages.map((img, index) => (
                      <div key={img} style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "16/10",
                        borderRadius: "1rem",
                        overflow: "hidden",
                        border: "1px solid #E5E7EB",
                      }}>
                        <Image src={img} alt={`${project.title} — screenshot ${index + 1}`} fill className="object-cover object-top" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <aside>
                <div className="lt-sidebar-card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div>
                    <div className="lt-sidebar-section-label">Category</div>
                    <div style={{ fontSize: "0.9rem", color: "#111827", fontWeight: 600 }}>{project.category}</div>
                  </div>
                  {project.year && (
                    <div>
                      <div className="lt-sidebar-section-label">Year</div>
                      <div style={{ fontSize: "0.9rem", color: "#111827", fontWeight: 600 }}>{project.year}</div>
                    </div>
                  )}
                  <div>
                    <div className="lt-sidebar-section-label">Tech Stack</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {(project.tech ?? []).map((t) => (
                        <span key={t} className="lt-tech-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                  {project.highlight && (
                    <div className="lt-quote-box">
                      <p className="lt-quote-text">{project.highlight}</p>
                    </div>
                  )}
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="lt-btn" style={{ justifyContent: "center" }}>
                      Visit Live Site →
                    </a>
                  )}
                  <Link href="/portfolio" style={{ fontSize: "0.85rem", color: "#6C4CFF", fontWeight: 600, textDecoration: "none", textAlign: "center" }}>
                    ← Back to Portfolio
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
