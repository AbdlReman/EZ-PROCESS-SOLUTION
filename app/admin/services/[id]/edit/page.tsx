import { notFound } from "next/navigation";
import ServiceForm from "@/components/admin/ServiceForm";
import { getServiceById } from "@/lib/models/service";
import { updateService } from "@/lib/actions/services";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await getServiceById(id);
  if (!service) notFound();

  return (
    <div>
      <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", marginBottom: "2rem" }}>Edit Service</h1>
      <ServiceForm action={updateService.bind(null, service.id)} initial={service} />
    </div>
  );
}
