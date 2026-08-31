"use client";

const serviceOptions = ["Web Development", "Mobile Apps", "Cloud & DevOps", "Data & AI", "UI/UX Design", "Digital Strategy"] as const;

export default function ContactFormPanel() {
  return (
    <div className="lt-form-card">
      <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#111827", marginBottom: "0.4rem" }}>
        Send us a message
      </h3>
      <p style={{ fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "2rem" }}>
        We&apos;ll reply within one business day.
      </p>

      <form style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "1fr 1fr" }} className="lt-form-2col">
          <div>
            <label className="lt-form-label">Full Name <span style={{ color: "#6C4CFF" }}>*</span></label>
            <input className="lt-input" placeholder="Alex Johnson" required />
          </div>
          <div>
            <label className="lt-form-label">Work Email <span style={{ color: "#6C4CFF" }}>*</span></label>
            <input type="email" className="lt-input" placeholder="you@company.com" required />
          </div>
        </div>

        <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "1fr 1fr" }} className="lt-form-2col">
          <div>
            <label className="lt-form-label">Company</label>
            <input className="lt-input" placeholder="Company name" />
          </div>
          <div>
            <label className="lt-form-label">Budget Range</label>
            <div style={{ position: "relative" }}>
              <select className="lt-select" style={{ paddingRight: "2.5rem" }}>
                <option value="">Select range</option>
                <option>Under $10K</option>
                <option>$10K – $50K</option>
                <option>$50K – $150K</option>
                <option>$150K – $500K</option>
                <option>$500K+</option>
              </select>
              <div style={{
                pointerEvents: "none",
                position: "absolute",
                right: "0.875rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9CA3AF",
              }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="lt-form-label">Services you&apos;re interested in</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
            {serviceOptions.map(s => (
              <button key={s} type="button" className="lt-chip-btn">{s}</button>
            ))}
          </div>
        </div>

        <div>
          <label className="lt-form-label">Project Details <span style={{ color: "#6C4CFF" }}>*</span></label>
          <textarea
            className="lt-textarea"
            placeholder="Tell us about your project, timelines, and what success looks like for you."
            required
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", paddingTop: "0.5rem" }}>
          <button type="submit" className="lt-btn" style={{ padding: "0.85rem 2.25rem" }}>
            Send Message →
          </button>
          <p style={{ fontSize: "0.72rem", color: "#9CA3AF", lineHeight: 1.5 }}>
            No spam, ever. We reply within 1 business day.
          </p>
        </div>
      </form>
    </div>
  );
}
