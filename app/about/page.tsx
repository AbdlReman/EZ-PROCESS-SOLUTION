import AboutContent from "@/components/about/AboutContent";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about EZ Process Solution — a collective of strategists, designers, cloud architects, and engineers delivering world-class digital products.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutContent />;
}
