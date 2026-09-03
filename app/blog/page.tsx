import BlogListingContent from "@/components/blog/BlogListingContent";
import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/models/blog";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Articles on web engineering, cloud-native delivery, AI in production, and design systems from EZ Process Solution.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  return <BlogListingContent posts={posts} />;
}
