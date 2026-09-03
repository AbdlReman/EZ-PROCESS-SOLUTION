import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PortfolioDetailContent from "@/components/portfolio/PortfolioDetailContent";
import { getProjectBySlug } from "@/lib/models/project";
import { breadcrumbJsonLd, buildMetadata, creativeWorkJsonLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

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
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
          { name: project.title, path: `/portfolio/${project.slug}` },
        ])}
      />
      <JsonLd data={creativeWorkJsonLd(project)} />
      <PortfolioDetailContent project={project} />
    </>
  );
}
