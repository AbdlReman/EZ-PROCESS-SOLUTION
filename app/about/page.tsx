import AboutContent from "@/components/about/AboutContent";
import type { Metadata } from "next";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about EZ Process Solution — a collective of strategists, designers, cloud architects, and engineers delivering world-class digital products.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <AboutContent />
    </>
  );
}
