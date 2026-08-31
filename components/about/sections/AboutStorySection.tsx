import Link from "next/link";
import { aboutStats, aboutStoryHighlights } from "../data/about-data";

export default function AboutStorySection() {
  return (
    <section className="lt-section">
      <div className="brelyx-container">
          <div className="about-grid">

            {/* Left — text */}
            <div>
              <div className="lt-kicker">Our Story</div>
              <h2 className="lt-h2" style={{ marginBottom: "1.25rem" }}>
                Built on trust, delivered<br />through excellence.
              </h2>
              <p className="lt-lead" style={{ marginBottom: "1.25rem" }}>
                EZ Process Solution is a collective of strategists, designers, cloud architects, and full-stack engineers.
                We plug into your teams as a trusted extension — aligning on outcomes and owning delivery end to end.
              </p>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.8, color: "#6B7280", marginBottom: "2rem" }}>
                From rapid discovery sprints to long-term managed teams, we adapt our engagement model to how you work
                — without compromising on quality or velocity.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2.5rem" }}>
                {aboutStoryHighlights.map(([title, desc]) => (
                  <div key={title} className="lt-highlight-item">
                    <div className="lt-highlight-title">{title}</div>
                    <p className="lt-highlight-desc">{desc}</p>
                  </div>
                ))}
              </div>

              <Link href="/contact" className="lt-btn">Meet the Team →</Link>
            </div>

            {/* Right — stats card */}
            <div style={{
              borderRadius: "1.5rem",
              border: "1px solid #E5E7EB",
              background: "#FFFFFF",
              padding: "2rem",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem 2rem", marginBottom: "2rem" }}>
                {aboutStats.slice(0, 4).map(({ num, desc }) => (
                  <div key={num}>
                    <div className="lt-about-stat-num">{num}</div>
                    <p className="lt-about-stat-desc">{desc}</p>
                  </div>
                ))}
              </div>
              <div className="lt-quote-box">
                <p className="lt-quote-text">
                  &ldquo;We measure success by the growth of our clients — not the size of our invoices.&rdquo;
                </p>
                <p className="lt-quote-author">— EZ Process Solution founding team</p>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
