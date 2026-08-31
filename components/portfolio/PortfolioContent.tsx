"use client";

import type { Project } from "@/lib/models/project";
import PortfolioCtaSection from "./sections/PortfolioCtaSection";
import PortfolioGridSection from "./sections/PortfolioGridSection";
import PortfolioHeroSection from "./sections/PortfolioHeroSection";

export default function PortfolioContent({ projects }: { projects: Project[] }) {
  return (
    <div className="min-h-screen">
      <main>
        <PortfolioHeroSection projectCount={projects.length} />
        <PortfolioGridSection projects={projects} />
        <PortfolioCtaSection />
      </main>
    </div>
  );
}
