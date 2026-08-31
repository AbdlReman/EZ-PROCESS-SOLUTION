import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "../data/home-data";

export default function HomeBlogSection() {
  return (
    <section className="lt-section-alt">
      <div className="brelyx-container">
        <div style={{ marginBottom: "3.5rem" }}>
          <div className="lt-kicker">Blog</div>
          <h2 className="lt-h2">Our Latest News And Article</h2>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <Link key={post.slug} href="/blog" className="blog-card">
              <div className="blog-card-img">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="blog-card-body">
                <div className="blog-date">{post.date}</div>
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
