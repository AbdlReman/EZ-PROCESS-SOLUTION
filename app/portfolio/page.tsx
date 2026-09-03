import type { Metadata } from "next";
import PortfolioContent from "@/components/portfolio/PortfolioContent";
import { getAllProjects } from "@/lib/models/project";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio",
  description:
    "Explore case studies and projects delivered by EZ Process Solution across web, mobile, cloud, and AI engineering.",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const projects = await getAllProjects();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }])} />
      <PortfolioContent projects={projects} />
    </>
  );
}
