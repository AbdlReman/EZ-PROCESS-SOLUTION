import Link from "next/link";
import BlogForm from "@/components/admin/BlogForm";
import { createBlogPost } from "@/lib/actions/blog";
import { IconChevronLeft } from "@/components/admin/icons";

export default function NewBlogPostPage() {
  return (
    <div>
      <Link href="/admin/blog" className="ez-admin-back-link">
        <IconChevronLeft size={13} />
        Back to Blog Posts
      </Link>
      <div className="ez-admin-page-head">
        <div>
          <h1 className="ez-admin-page-title">New Blog Post</h1>
          <p className="ez-admin-page-subtitle">Write and publish a new article.</p>
        </div>
      </div>
      <BlogForm action={createBlogPost} />
    </div>
  );
}
