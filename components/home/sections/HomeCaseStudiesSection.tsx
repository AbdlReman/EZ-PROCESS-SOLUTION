"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/models/project";

export default function HomeCaseStudiesSection({ projects }: { projects: Project[] }) {
  const featured = projects.slice(0, 6);
  const [active, setActive] = useState(0);

  if (featured.length === 0) return null;

  const cs = featured[active];
  const prev = () => setActive((a) => (a - 1 + featured.length) % featured.length);
  const next = () => setActive((a) => (a + 1) % featured.length);

  return (
    <section className="lt-section">
      <div className="brelyx-container">
        <div className="lt-proj-header">
          <div style={{ maxWidth: "480px" }}>
            <div className="lt-kicker">Last Update</div>
            <h2 className="lt-h2">Projects We Have<br />For Our Clients</h2>
          </div>
          <div className="lt-proj-arrows">
            <button className="lt-proj-arrow" onClick={prev} aria-label="Previous">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="lt-proj-arrow" onClick={next} aria-label="Next">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Project media */}
        <div className="lt-proj-media">
          <div style={{ position: "relative", width: "100%", aspectRatio: "16/8", overflow: "hidden" }}>
            <Image
              key={cs.id}
              src={cs.image}
              alt={cs.title}
              fill
              className="object-cover object-top transition-all duration-500"
            />
          </div>
        </div>

        {/* Caption */}
        <div className="lt-proj-caption">
          <div className="lt-proj-dot" />
          <div>
            <div className="lt-proj-label">{cs.category}</div>
            <div className="lt-proj-desc">{cs.title}</div>
          </div>
          <div style={{ marginLeft: "auto", flexShrink: 0 }}>
            <Link
              href={`/portfolio/${cs.slug}`}
              style={{ fontSize: "0.82rem", fontWeight: 600, color: "#6C4CFF", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
            >
              View Project →
            </Link>
          </div>
        </div>

        {/* Dot nav */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem", marginTop: "2rem" }}>
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Project ${i + 1}`}
              style={{
                width: active === i ? "2rem" : "0.5rem",
                height: "0.5rem",
                borderRadius: "999px",
                background: active === i ? "#6C4CFF" : "#C4B5FD",
                border: "none",
                cursor: "pointer",
                transition: "width 0.3s, background 0.3s",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
