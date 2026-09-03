import type { Metadata } from "next";
import HomeContent from "@/components/home/HomeContent";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "EZ Process Solution | Innovative IT & Digital Transformation Partner",
  description:
    "EZ Process Solution is a technology partner for web, mobile, cloud, and AI solutions, helping businesses accelerate digital transformation.",
  path: "/",
});

export default function Home() {
  return <HomeContent />;
}
