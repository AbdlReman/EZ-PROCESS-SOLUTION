import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PortfolioDetailContent from "@/components/portfolio/PortfolioDetailContent";
import { getProjectBySlug } from "@/lib/models/project";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `/portfolio/${project.slug}`,
    image: project.image,
    type: "article",
    keywords: [project.category, project.title, ...project.tech],
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  return <PortfolioDetailContent project={project} />;
}
