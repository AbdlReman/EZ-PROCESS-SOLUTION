import { notFound } from "next/navigation";
import Link from "next/link";
import BlogForm from "@/components/admin/BlogForm";
import { getBlogPostById } from "@/lib/models/blog";
import { updateBlogPost } from "@/lib/actions/blog";
import { IconChevronLeft } from "@/components/admin/icons";

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
      <Link href="/admin/blog" className="ez-admin-back-link">
        <IconChevronLeft size={13} />
        Back to Blog Posts
      </Link>
      <div className="ez-admin-page-head">
        <div>
          <h1 className="ez-admin-page-title">Edit Blog Post</h1>
          <p className="ez-admin-page-subtitle">{post.title}</p>
        </div>
      </div>
      <BlogForm action={updateBlogPost.bind(null, post.id)} initial={post} />
    </div>
  );
}
