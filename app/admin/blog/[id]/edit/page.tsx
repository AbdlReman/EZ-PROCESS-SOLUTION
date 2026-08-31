import { notFound } from "next/navigation";
import BlogForm from "@/components/admin/BlogForm";
import { getBlogPostById } from "@/lib/models/blog";
import { updateBlogPost } from "@/lib/actions/blog";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostById(id);
  if (!post) notFound();

  return (
    <div>
      <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", marginBottom: "2rem" }}>Edit Blog Post</h1>
      <BlogForm action={updateBlogPost.bind(null, post.id)} initial={post} />
    </div>
  );
}
