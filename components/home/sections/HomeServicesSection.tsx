"use client";

import Link from "next/link";
import { services } from "../data/home-data";

export default function HomeServicesSection() {
  const featured = services.slice(0, 3);

  return (
    <section className="lt-section-alt">
      <div className="brelyx-container">
        {/* Centered header */}
        <div className="lt-svc-header">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="lt-kicker">Design Services</div>
          </div>
          <h2 className="lt-h2 lt-center" style={{ marginBottom: "1rem" }}>
            We Offer A Wide Range Of<br />Design Services
          </h2>
          <p className="lt-lead lt-center" style={{ maxWidth: "500px", margin: "0 auto" }}>
            From strategy to deployment, we deliver comprehensive digital solutions that drive
            growth and innovation for businesses worldwide.
          </p>
        </div>

        {/* 3-column service cards */}
        <div className="lt-svc-grid">
          {featured.map((svc, i) => (
            <Link
              key={svc.title}
              href="/services"
              className={`lt-svc-card ${i === 1 ? "lt-svc-card-active" : ""}`}
            >
              <div className="lt-svc-icon">{svc.icon}</div>
              <h3 className="lt-svc-title">{svc.title}</h3>
              <p className="lt-svc-desc">{svc.description}</p>
              <span className="lt-svc-link">Get Started <span>→</span></span>
            </Link>
          ))}
        </div>

        {/* All services link */}
        <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
          <Link href="/services" className="lt-btn">View All Services →</Link>
        </div>
      </div>
    </section>
  );
}
