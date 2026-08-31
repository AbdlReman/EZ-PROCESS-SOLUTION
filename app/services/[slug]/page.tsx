import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ServiceDetailContent from "@/components/services/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/models/service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} | EZ Process Solution`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();
  return <ServiceDetailContent service={service} />;
}
