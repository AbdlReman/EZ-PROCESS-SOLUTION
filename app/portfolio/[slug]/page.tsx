import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PortfolioDetailContent from "@/components/portfolio/PortfolioDetailContent";
import { getProjectBySlug } from "@/lib/models/project";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} | EZ Process Solution`,
    description: project.description,
  };
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
