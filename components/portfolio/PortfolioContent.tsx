"use client";

import PortfolioCtaSection from "./sections/PortfolioCtaSection";
import PortfolioGridSection from "./sections/PortfolioGridSection";
import PortfolioHeroSection from "./sections/PortfolioHeroSection";

export default function PortfolioContent() {
  return (
    <div className="min-h-screen">
      <main>
        <PortfolioHeroSection />
        <PortfolioGridSection />
        <PortfolioCtaSection />
      </main>
    </div>
  );
}
