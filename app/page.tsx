import type { Metadata } from "next";
import HomeContent from "@/components/home/HomeContent";
import { buildMetadata } from "@/lib/seo";
import { getAllProjects } from "@/lib/models/project";
import { getLatestBlogPosts } from "@/lib/models/blog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "EZ Process Solution | Innovative IT & Digital Transformation Partner",
  description:
    "EZ Process Solution is a technology partner for web, mobile, cloud, and AI solutions, helping businesses accelerate digital transformation.",
  path: "/",
});

export default async function Home() {
  // The rest of the homepage doesn't depend on the database — if it's
  // briefly unreachable, degrade to hiding the projects carousel instead of
  // taking the whole homepage down with it.
  const projects = await getAllProjects().catch(() => []);
  const latestPosts = await getLatestBlogPosts(3).catch(() => []);
  return <HomeContent projects={projects} posts={latestPosts} />;
}
