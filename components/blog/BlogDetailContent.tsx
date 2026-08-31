import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/models/blog";
import BlogHtmlContent from "./BlogHtmlContent";

function formatBlogDate(iso: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export default function BlogDetailContent({
  post,
  relatedPosts,
}: {
  post: BlogPost;
  relatedPosts: BlogPost[];
}) {
  return (
    <div className="min-h-screen">
      <main>
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="hero-purple-section" style={{ paddingBottom: "5rem" }}>
          <div className="brelyx-container" style={{ position: "relative" }}>
            <div className="hero-p-badge">● {post.category}</div>
            <h1 className="slug-h1">{post.title}</h1>
            <p className="hero-p-sub" style={{ marginBottom: "1rem" }}>{post.excerpt}</p>
            <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>
              <span>{post.author}</span>
              <span>{formatBlogDate(post.date)}</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </section>

        {/* ── Article ───────────────────────────────────────── */}
        <section className="lt-section">
          <div className="brelyx-container" style={{ maxWidth: "48rem", margin: "0 auto" }}>
            <div style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/9",
              borderRadius: "1.25rem",
              overflow: "hidden",
              border: "1px solid #E5E7EB",
              marginBottom: "2.5rem",
            }}>
              <Image src={post.image} alt={post.title} fill className="object-cover object-center" priority />
            </div>

            <BlogHtmlContent html={post.content} />

            <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #E5E7EB" }}>
              <Link href="/blog" style={{ fontSize: "0.85rem", color: "#6C4CFF", fontWeight: 600, textDecoration: "none" }}>
                ← Back to Blog
              </Link>
            </div>
          </div>
        </section>

        {/* ── Related ───────────────────────────────────────── */}
        {relatedPosts.length > 0 && (
          <section className="lt-section-alt">
            <div className="brelyx-container">
              <div className="lt-sidebar-section-label" style={{ textAlign: "center" }}>More Articles</div>
              <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(3, minmax(0,1fr))" }}
                className="lt-portfolio-grid">
                {relatedPosts.map((related) => (
                  <Link key={related.slug} href={`/blog/${related.slug}`} className="lt-related-card">
                    <div className="lt-related-cat">{related.category}</div>
                    <div className="lt-related-title">{related.title}</div>
                    <p className="lt-related-excerpt">{related.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
