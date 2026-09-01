import Link from "next/link";
import ServiceForm from "@/components/admin/ServiceForm";
import { createService } from "@/lib/actions/services";
import { IconChevronLeft } from "@/components/admin/icons";

export default function NewServicePage() {
  return (
    <div>
      <Link href="/admin/services" className="ez-admin-back-link">
        <IconChevronLeft size={13} />
        Back to Services
      </Link>
      <div className="ez-admin-page-head">
        <div>
          <h1 className="ez-admin-page-title">New Service</h1>
          <p className="ez-admin-page-subtitle">Add a new service offering.</p>
        </div>
      </div>
      <ServiceForm action={createService} />
    </div>
  );
}
