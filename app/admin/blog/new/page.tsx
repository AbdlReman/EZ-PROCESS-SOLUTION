import BlogForm from "@/components/admin/BlogForm";
import { createBlogPost } from "@/lib/actions/blog";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", marginBottom: "2rem" }}>New Blog Post</h1>
      <BlogForm action={createBlogPost} />
    </div>
  );
}
