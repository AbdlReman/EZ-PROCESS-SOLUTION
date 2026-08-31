import AboutCtaSection from "./sections/AboutCtaSection";
import AboutHeroSection from "./sections/AboutHeroSection";
import AboutProcessSection from "./sections/AboutProcessSection";
import AboutStorySection from "./sections/AboutStorySection";
import AboutTestimonialsSection from "./sections/AboutTestimonialsSection";

export default function AboutContent() {
  return (
    <div className="min-h-screen">
      <main>
        <AboutHeroSection />
        <AboutStorySection />
        <AboutProcessSection />
        <AboutTestimonialsSection />
        <AboutCtaSection />
      </main>
    </div>
  );
}
