import { processSteps } from "../data/about-data";

export default function AboutProcessSection() {
  return (
    <section className="lt-section-alt">
      <div className="brelyx-container">

        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 4rem" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="lt-kicker">How We Work</div>
          </div>
          <h2 className="lt-h2">A proven process.<br />Predictable outcomes.</h2>
          <p className="lt-lead" style={{ maxWidth: "480px", margin: "1rem auto 0" }}>
            Our structured delivery model eliminates guesswork and keeps you in control from discovery to deployment.
          </p>
        </div>

        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(4, minmax(0,1fr))" }}
          className="lt-process-grid">
          {processSteps.map((s) => (
            <div key={s.step} className="lt-process-card">
              <div className="lt-process-icon">
                <span style={{ fontSize: "1.4rem" }}>{s.icon}</span>
              </div>
              <div className="lt-process-num">{s.step}</div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", marginBottom: "0.75rem" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: "0.8rem", color: "#6B7280", lineHeight: 1.75, marginBottom: "1rem" }}>
                {s.description}
              </p>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.3rem 0.75rem",
                borderRadius: "999px",
                background: "#E0F4FD",
                color: "#6C4CFF",
                fontSize: "0.72rem",
                fontWeight: 700,
              }}>
                ⏱ {s.duration}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
