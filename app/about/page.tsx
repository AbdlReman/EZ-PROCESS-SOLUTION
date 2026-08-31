import AboutContent from "@/components/about/AboutContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | EZ Process Solution",
  description:
    "Learn about EZ Process Solution — a collective of strategists, designers, cloud architects, and engineers delivering world-class digital products.",
};

export default function AboutPage() {
  return <AboutContent />;
}
