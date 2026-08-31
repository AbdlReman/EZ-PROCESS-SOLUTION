"use client";

import Image from "next/image";
import Link from "next/link";

const STATS = [
  { num: "120+", label: "Products Delivered" },
  { num: "98%",  label: "Client Satisfaction" },
  { num: "15+",  label: "Years Excellence" },
  { num: "23+",  label: "Countries Served" },
];

const CHIPS = [
  { key: "nextjs",  icon: "▲", label: "Next.js" },
  { key: "react",   icon: "⚛", label: "React" },
  { key: "ai-ml",   icon: "✦", label: "AI / ML" },
  { key: "aws",     icon: "☁", label: "AWS" },
];

export default function HomeHeroSection() {
  return (
    <section className="hero-purple-section">

      {/* Background decorations */}
      <div className="pointer-events-none" aria-hidden="true">
        <div className="hero-beam" />
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />
        <div className="hero-orb-3" />
        <div className="hero-grid-bg" />
        <div className="hero-bottom-fade" />
      </div>

      <div className="brelyx-container" style={{ position: "relative", zIndex: 1 }}>

        {/* Badge */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="hero-p-badge">
            <span className="hero-p-badge-dot" />
            Digital Agency · AI-Powered Solutions
            <span className="hero-p-badge-tag">NEW</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="hero-p-h1">
          We Craft Digital Products<br />
          <span className="hero-p-h1-gradient">That Scale</span>
        </h1>

        {/* Subtext */}
        <p className="hero-p-sub">
          EZ Process Solution designs and delivers cloud-native web, mobile, and AI solutions
          that take ambitious teams from idea to production — fast, secure, and built to last.
        </p>

        {/* CTA buttons */}
        <div className="hero-p-ctas">
          <Link href="/contact" className="hero-p-btn">
            Start Your Project
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link href="/portfolio" className="hero-p-ghost">
            View Case Studies
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Stats glass card */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="hero-stats-glass">
            {STATS.map((s) => (
              <div key={s.label} className="hero-stat-item">
                <div className="hero-stat-num">{s.num}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Browser mockup */}
        <div className="hero-mockup-wrap">
          <div className="hero-mockup-glow" />

          {/* Floating tech chips */}
          {CHIPS.map((chip) => (
            <div key={chip.key} className={`hero-chip hero-chip-${chip.key}`}>
              <span style={{ fontSize: "0.85em" }}>{chip.icon}</span>
              {chip.label}
            </div>
          ))}

          <div className="hero-screen">
            <div className="hero-screen-bar">
              <div className="hero-screen-dots">
                <div className="hero-screen-dot" style={{ background: "#FF5F57" }} />
                <div className="hero-screen-dot" style={{ background: "#FFBD2E" }} />
                <div className="hero-screen-dot" style={{ background: "#28C840" }} />
              </div>
              <div className="hero-screen-url">
                <svg className="hero-screen-url-lock" width="10" height="10" fill="none" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="hero-screen-url-text">ezprocesssolution.com</span>
              </div>
            </div>
            <div className="hero-screen-img">
              <Image
                src="/images/webportfolio_1.png"
                alt="EZ Process Solution — Digital Product"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="hero-screen-img-overlay" />
            </div>
          </div>
        </div>

      </div>

      {/* Scroll mouse indicator */}
      <div className="hero-scroll-cue" aria-hidden="true">
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-wheel" />
        </div>
      </div>

    </section>
  );
}
