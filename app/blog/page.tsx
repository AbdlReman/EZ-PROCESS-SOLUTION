import BlogListingContent from "@/components/blog/BlogListingContent";
import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/models/blog";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Articles on web engineering, cloud-native delivery, AI in production, and design systems from EZ Process Solution.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />
      <BlogListingContent posts={posts} />
    </>
  );
}
