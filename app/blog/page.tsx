import BlogListingContent from "@/components/blog/BlogListingContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | EZ Process Solution",
  description:
    "Articles on web engineering, cloud-native delivery, AI in production, and design systems from EZ Process Solution.",
};

export default function BlogPage() {
  return <BlogListingContent />;
}
