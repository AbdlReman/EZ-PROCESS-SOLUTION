import Link from "next/link";
import { getAllBlogPosts } from "@/lib/models/blog";
import { deleteBlogPost } from "@/lib/actions/blog";
import BlogTable, { type BlogRow } from "@/components/admin/BlogTable";
import { IconPlus } from "@/components/admin/icons";

export default async function AdminBlogPage() {
  const posts = await getAllBlogPosts();

  const rows: BlogRow[] = posts.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    category: post.category,
    date: post.date,
    image: post.image,
    deleteAction: deleteBlogPost.bind(null, post.id),
  }));

  return (
    <div>
      <div className="ez-admin-page-head">
        <div>
          <h1 className="ez-admin-page-title">Blog Posts</h1>
          <p className="ez-admin-page-subtitle">Write and manage articles for your blog.</p>
        </div>
        <Link href="/admin/blog/new" className="brelyx-btn-primary">
          <IconPlus />
          New Post
        </Link>
      </div>

      <BlogTable items={rows} />
    </div>
  );
}
