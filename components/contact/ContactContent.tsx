"use client";

import ContactFormSection from "./sections/ContactFormSection";
import ContactHeroSection from "./sections/ContactHeroSection";

export default function ContactContent() {
  return (
    <div className="min-h-screen">
      <main>
        <ContactHeroSection />
        <ContactFormSection />
      </main>
    </div>
  );
}
