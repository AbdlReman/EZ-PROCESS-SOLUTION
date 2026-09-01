import { notFound } from "next/navigation";
import Link from "next/link";
import ServiceForm from "@/components/admin/ServiceForm";
import { getServiceById } from "@/lib/models/service";
import { updateService } from "@/lib/actions/services";
import { IconChevronLeft } from "@/components/admin/icons";

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
      <Link href="/admin/services" className="ez-admin-back-link">
        <IconChevronLeft size={13} />
        Back to Services
      </Link>
      <div className="ez-admin-page-head">
        <div>
          <h1 className="ez-admin-page-title">Edit Service</h1>
          <p className="ez-admin-page-subtitle">{service.title}</p>
        </div>
      </div>
      <ServiceForm action={updateService.bind(null, service.id)} initial={service} />
    </div>
  );
}
