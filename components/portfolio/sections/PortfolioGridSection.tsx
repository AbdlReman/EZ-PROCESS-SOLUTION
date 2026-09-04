"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project } from "@/lib/models/project";

export default function PortfolioGridSection({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [filterOpen, setFilterOpen] = useState(false);

  const portfolioCategories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="lt-section">
      <div className="brelyx-container">

        <div className="lt-filter-bar">
          <button
            type="button"
            className="lt-filter-toggle"
            aria-expanded={filterOpen}
            onClick={() => setFilterOpen((v) => !v)}
          >
            <span>Filter: {activeCategory}</span>
            <svg className="lt-filter-toggle-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className={`lt-filter-tabs${filterOpen ? " lt-filter-tabs--open" : ""}`}>
            {portfolioCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setFilterOpen(false);
                }}
                className={`lt-filter-tab${activeCategory === cat ? " active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gap: "1.75rem", gridTemplateColumns: "repeat(3, minmax(0,1fr))" }}
          className="lt-portfolio-grid">
          {filtered.map((project) => (
            <Link key={project.slug} href={`/portfolio/${project.slug}`} className="lt-card">
              <div className="lt-card-img lt-card-img-wide">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                />
                <div className="lt-card-hover-btn">
                  <div className="lt-card-hover-btn-inner">View Project →</div>
                </div>
                <div style={{ position: "absolute", bottom: "0.75rem", left: "0.875rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <span className="lt-card-cat">{project.category}</span>
                  {project.year && (
                    <span style={{ fontSize: "0.65rem", color: "#6B7280", fontWeight: 600, background: "rgba(255,255,255,0.9)", padding: "0.2rem 0.5rem", borderRadius: "0.4rem" }}>
                      {project.year}
                    </span>
                  )}
                </div>
              </div>
              <div className="lt-card-body">
                <div className="lt-card-title">{project.title}</div>
                <div className="lt-card-excerpt" style={{ WebkitLineClamp: 2, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {project.tagline}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", paddingTop: "0.25rem" }}>
                  {(project.tech ?? []).slice(0, 3).map((t) => (
                    <span key={t} className="lt-tech-tag">{t}</span>
                  ))}
                  {(project.tech?.length ?? 0) > 3 && (
                    <span className="lt-tech-tag">+{project.tech.length - 3}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "5rem 0", color: "#9CA3AF" }}>
            No projects found in this category.
          </div>
        )}

      </div>
    </section>
  );
}
