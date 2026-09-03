import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ServiceDetailContent from "@/components/services/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/models/service";
import { getPackagesByServiceId } from "@/lib/models/package";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
    image: service.image,
    type: "article",
    keywords: [service.category, service.title],
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();
  const packages = await getPackagesByServiceId(service.id);
  return <ServiceDetailContent service={service} packages={packages} />;
}
