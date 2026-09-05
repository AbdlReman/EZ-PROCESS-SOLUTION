import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllProjects } from "@/lib/models/project";
import { getAllServices } from "@/lib/models/service";
import { getAllBlogPosts } from "@/lib/models/blog";

function uniqueSlugRoutes<T extends { slug: string }>(
  records: T[],
  toUrl: (record: T) => MetadataRoute.Sitemap[number]
): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  const routes: MetadataRoute.Sitemap = [];
  for (const record of records) {
    if (!record.slug || seen.has(record.slug)) continue;
    seen.add(record.slug);
    routes.push(toUrl(record));
  }
  return routes;
}

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
    "/refund-policy",
    "/client-agreement",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  // Dynamic routes depend on the database; if it's unreachable at build/
  // request time, fall back to the static routes rather than failing the
  // whole sitemap (and taking search engines' view of the site down with it).
  const [projectsResult, servicesResult, postsResult] = await Promise.allSettled([
    getAllProjects(),
    getAllServices(),
    getAllBlogPosts(),
  ]);
  const projects = projectsResult.status === "fulfilled" ? projectsResult.value : [];
  const services = servicesResult.status === "fulfilled" ? servicesResult.value : [];
  const posts = postsResult.status === "fulfilled" ? postsResult.value : [];

  const projectRoutes = uniqueSlugRoutes(projects, (project) => ({
    url: `${SITE_URL}/portfolio/${project.slug}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = uniqueSlugRoutes(services, (service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: new Date(),
  }));

  const blogRoutes = uniqueSlugRoutes(posts, (post) => {
    const lastModified = new Date(post.date);
    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: Number.isNaN(lastModified.getTime()) ? new Date() : lastModified,
    };
  });

  return [...staticRoutes, ...projectRoutes, ...serviceRoutes, ...blogRoutes];
}
