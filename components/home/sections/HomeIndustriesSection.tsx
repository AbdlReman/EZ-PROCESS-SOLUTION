"use client";

import { industries } from "../data/home-data";

export default function HomeIndustriesSection() {
  return (
    <section className="lt-section-alt" id="industries">
      <div className="brelyx-container">
        <div style={{ maxWidth: "600px", marginBottom: "3.5rem" }}>
          <div className="lt-kicker">Industries</div>
          <h2 className="lt-h2">Domain-Aware Teams Across Every Vertical</h2>
          <p className="lt-lead">
            Engineering excellence combined with deep industry knowledge — solutions that are
            compliant, usable, and ready to scale.
          </p>
        </div>

        <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(3, minmax(0,1fr))" }}>
          {industries.map(({ name, desc, icon }) => (
            <div
              key={name}
              style={{
                borderRadius: "1.25rem",
                border: "1px solid #E5E7EB",
                background: "#FFFFFF",
                padding: "1.75rem",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
              }}
              className="group lt-ind-card"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2.75rem",
                  height: "2.75rem",
                  borderRadius: "0.875rem",
                  background: "#E0F4FD",
                  color: "#6C4CFF",
                  marginBottom: "1rem",
                }}
              >
                {icon}
              </div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem" }}>
                {name}
              </h3>
              <p style={{ fontSize: "0.82rem", color: "#6B7280", lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
