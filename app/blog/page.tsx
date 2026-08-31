import BlogListingContent from "@/components/blog/BlogListingContent";
import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/models/blog";

export const metadata: Metadata = {
  title: "Blog | EZ Process Solution",
  description:
    "Articles on web engineering, cloud-native delivery, AI in production, and design systems from EZ Process Solution.",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  return <BlogListingContent posts={posts} />;
}
