import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/models/blog";

function formatBlogDate(iso: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="lt-card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div className="lt-card-img">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover object-center"
        />
        <div style={{ position: "absolute", bottom: "0.75rem", left: "0.875rem", display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <span className="lt-card-cat">{post.category}</span>
          <span style={{ fontSize: "0.65rem", color: "#374151", fontWeight: 600, background: "rgba(255,255,255,0.92)", padding: "0.2rem 0.5rem", borderRadius: "0.4rem" }}>
            {formatBlogDate(post.date)}
          </span>
        </div>
      </div>
      <div className="lt-card-body" style={{ flex: 1 }}>
        <div className="lt-card-title">{post.title}</div>
        <div className="lt-card-excerpt" style={{ flex: 1, WebkitLineClamp: 3, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {post.excerpt}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
          <span className="lt-card-meta">{post.author}</span>
          <span className="lt-card-read">Read article →</span>
        </div>
      </div>
    </Link>
  );
}
