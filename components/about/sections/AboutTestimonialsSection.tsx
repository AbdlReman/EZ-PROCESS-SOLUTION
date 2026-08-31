import Image from "next/image";
import { testimonials } from "../data/about-data";

export default function AboutTestimonialsSection() {
  return (
    <section className="lt-section">
      <div className="brelyx-container">

        <div style={{ maxWidth: "560px", marginBottom: "4rem" }}>
          <div className="lt-kicker">Client Stories</div>
          <h2 className="lt-h2">Don&apos;t take our word for it.</h2>
          <p className="lt-lead">Real feedback from the teams we&apos;ve worked with.</p>
        </div>

        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(3, minmax(0,1fr))" }}
          className="lt-testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="lt-testimonial-card" style={{ justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", gap: "0.15rem", marginBottom: "1rem" }}>
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <span key={s} style={{ color: "#F59E0B", fontSize: "1rem" }}>★</span>
                  ))}
                </div>
                <blockquote style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "#374151", marginBottom: "1.5rem" }}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.875rem",
                paddingTop: "1.25rem",
                borderTop: "1px solid #F3F4F6",
              }}>
                <div style={{
                  position: "relative",
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                  border: "2px solid #E0F4FD",
                }}>
                  <Image src={t.image} alt={t.author} fill className="object-cover" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#111827" }}>{t.author}</div>
                  <div style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>{t.role}</div>
                </div>
                <div style={{
                  padding: "0.25rem 0.625rem",
                  borderRadius: "999px",
                  background: "#E0F4FD",
                  color: "#6C4CFF",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {t.company}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
