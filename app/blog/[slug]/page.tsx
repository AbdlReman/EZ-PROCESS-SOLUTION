import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogDetailContent from "@/components/blog/BlogDetailContent";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/models/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | EZ Process Solution`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getAllBlogPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return <BlogDetailContent post={post} relatedPosts={relatedPosts} />;
}
