import type { Metadata } from "next";
import PortfolioContent from "@/components/portfolio/PortfolioContent";
import { getAllProjects } from "@/lib/models/project";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio",
  description:
    "Explore case studies and projects delivered by EZ Process Solution across web, mobile, cloud, and AI engineering.",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const projects = await getAllProjects();
  return <PortfolioContent projects={projects} />;
}
