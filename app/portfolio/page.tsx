import PortfolioContent from "@/components/portfolio/PortfolioContent";
import { getAllProjects } from "@/lib/models/project";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const projects = await getAllProjects();
  return <PortfolioContent projects={projects} />;
}
