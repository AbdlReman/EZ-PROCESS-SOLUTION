import Link from "next/link";
import { getAllServices } from "@/lib/models/service";
import { deleteService } from "@/lib/actions/services";
import ServicesTable, { type ServiceRow } from "@/components/admin/ServicesTable";
import { IconPlus } from "@/components/admin/icons";

export default async function AdminServicesPage() {
  const services = await getAllServices();

  const rows: ServiceRow[] = services.map((service) => ({
    id: service.id,
    title: service.title,
    slug: service.slug,
    category: service.category,
    image: service.image,
    deleteAction: deleteService.bind(null, service.id),
  }));

  return (
    <div>
      <div className="ez-admin-page-head">
        <div>
          <h1 className="ez-admin-page-title">Services</h1>
          <p className="ez-admin-page-subtitle">Manage the services listed across your site.</p>
        </div>
        <Link href="/admin/services/new" className="brelyx-btn-primary">
          <IconPlus />
          New Service
        </Link>
      </div>

      <ServicesTable items={rows} />
    </div>
  );
}
