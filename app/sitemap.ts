import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllProjects } from "@/lib/models/project";
import { getAllServices } from "@/lib/models/service";
import { getAllBlogPosts } from "@/lib/models/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/contact",
    "/services",
    "/portfolio",
    "/blog",
    "/privacy-policy",
    "/terms-of-service",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const [projects, services, posts] = await Promise.all([
    getAllProjects(),
    getAllServices(),
    getAllBlogPosts(),
  ]);

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/portfolio/${project.slug}`,
    lastModified: new Date(),
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: new Date(),
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...projectRoutes, ...serviceRoutes, ...blogRoutes];
}
