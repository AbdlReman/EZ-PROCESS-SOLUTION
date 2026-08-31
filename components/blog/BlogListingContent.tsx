import BlogCard from "./BlogCard";
import type { BlogPost } from "@/lib/models/blog";

export default function BlogListingContent({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="min-h-screen">
      <main>

        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="hero-purple-section" style={{ paddingBottom: "5rem" }}>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 75% 35%, rgba(14,165,233,0.2) 0%, transparent 45%)",
            }}
          />
          <div className="brelyx-container" style={{ position: "relative" }}>
            <div className="hero-p-badge">● Insights &amp; Ideas</div>
            <h1 className="hero-p-h1">The EZ Process Solution Blog</h1>
            <p className="hero-p-sub">
              Practical notes on engineering, product delivery, AI, and design — from the team building
              digital products for ambitious companies.
            </p>
          </div>
        </section>

        {/* ── Blog grid ─────────────────────────────────────── */}
        <section className="lt-section">
          <div className="brelyx-container">
            <div style={{ display: "grid", gap: "1.75rem", gridTemplateColumns: "repeat(3, minmax(0,1fr))" }}
              className="lt-portfolio-grid">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
