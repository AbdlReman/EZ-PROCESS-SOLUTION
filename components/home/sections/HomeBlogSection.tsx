import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/models/blog";

function formatBlogDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function HomeBlogSection({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="lt-section-alt">
      <div className="brelyx-container">
        <div style={{ marginBottom: "3.5rem" }}>
          <div className="lt-kicker">Blog</div>
          <h2 className="lt-h2">Our Latest News And Article</h2>
        </div>

        <div className="blog-grid">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
              <div className="blog-card-img">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="blog-card-body">
                <div className="blog-date">{formatBlogDate(post.date)}</div>
                <div className="blog-title">{post.title}</div>
                <div className="blog-excerpt">{post.excerpt}</div>
                <span className="blog-read-link">Read More →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
