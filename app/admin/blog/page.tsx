import Link from "next/link";
import Image from "next/image";
import { getAllBlogPosts } from "@/lib/models/blog";
import { deleteBlogPost } from "@/lib/actions/blog";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminBlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff" }}>Blog Posts</h1>
        <Link href="/admin/blog/new" className="brelyx-btn-primary">+ New Post</Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              background: "#10132a",
              border: "1px solid rgba(30,38,72,0.9)",
              borderRadius: "0.85rem",
              padding: "0.9rem 1.1rem",
            }}
          >
            <div style={{ position: "relative", width: "56px", height: "56px", borderRadius: "0.6rem", overflow: "hidden", flexShrink: 0 }}>
              <Image src={post.image} alt={post.title} fill className="object-cover object-center" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#ffffff" }}>{post.title}</div>
              <div style={{ fontSize: "0.78rem", color: "#8892b0" }}>{post.category} · {post.date} · /{post.slug}</div>
            </div>
            <Link
              href={`/admin/blog/${post.id}/edit`}
              style={{ fontSize: "0.78rem", fontWeight: 600, color: "#a4acc9", textDecoration: "none" }}
            >
              Edit
            </Link>
            <DeleteButton
              action={deleteBlogPost.bind(null, post.id)}
              confirmMessage={`Delete "${post.title}"? This can't be undone.`}
            />
          </div>
        ))}

        {posts.length === 0 && (
          <p style={{ color: "#8892b0", fontSize: "0.9rem" }}>No blog posts yet.</p>
        )}
      </div>
    </div>
  );
}
