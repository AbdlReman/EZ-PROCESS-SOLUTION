"use client";

import type { Project } from "@/lib/models/project";
import type { BlogPost } from "@/lib/models/blog";
import HomeAboutSection from "./sections/HomeAboutSection";
import HomeBlogSection from "./sections/HomeBlogSection";
import HomeCaseStudiesSection from "./sections/HomeCaseStudiesSection";
import HomeCtaSection from "./sections/HomeCtaSection";
import HomeFaqSection from "./sections/HomeFaqSection";
import HomeHeroSection from "./sections/HomeHeroSection";
import HomeIndustriesSection from "./sections/HomeIndustriesSection";
import HomeServicesSection from "./sections/HomeServicesSection";
import HomeStatsSection from "./sections/HomeStatsSection";
import HomeTestimonialsSection from "./sections/HomeTestimonialsSection";
import HomeTechMarqueeSection from "./sections/HomeTechMarqueeSection";

export default function HomeContent({ projects, posts }: { projects: Project[]; posts: BlogPost[] }) {
  return (
    <div className="min-h-screen">
      <main>
        {/* 1. Hero — purple gradient, centered */}
        <HomeHeroSection />
        {/* 2. Partner / brand logos strip */}
        <HomeTechMarqueeSection />
        {/* 3. About / Journey */}
        <HomeAboutSection />
        {/* 4. Services — 3 cards, middle highlighted */}
        <HomeServicesSection />
        {/* 5. Portfolio showcase with arrows */}
        <HomeCaseStudiesSection projects={projects} />
        {/* 6. CTA Banner */}
        <HomeCtaSection />
        {/* 7. Clients / Testimonial (2-col) */}
        <HomeTestimonialsSection />
        {/* 8. Stats strip (purple numbers) */}
        <HomeStatsSection />
        {/* 9. Industries */}
        <HomeIndustriesSection />
        {/* 10. Blog / News */}
        <HomeBlogSection posts={posts} />
        {/* 11. CTA Banner (repeat) */}
        <HomeCtaSection />
        {/* 12. FAQ */}
        <HomeFaqSection />
      </main>
    </div>
  );
}
