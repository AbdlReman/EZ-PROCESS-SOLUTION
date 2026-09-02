import Link from "next/link";
import PackageForm from "@/components/admin/PackageForm";
import { createServicePackage } from "@/lib/actions/packages";
import { getAllServices } from "@/lib/models/service";
import { IconChevronLeft } from "@/components/admin/icons";

export default async function NewPackagePage() {
  const services = await getAllServices();
  const serviceOptions = services.map((s) => ({ id: s.id, title: s.title }));

  return (
    <div>
      <Link href="/admin/packages" className="ez-admin-back-link">
        <IconChevronLeft size={13} />
        Back to Packages
      </Link>
      <div className="ez-admin-page-head">
        <div>
          <h1 className="ez-admin-page-title">New Package</h1>
          <p className="ez-admin-page-subtitle">Select a service, then add the package details.</p>
        </div>
      </div>
      <PackageForm action={createServicePackage} services={serviceOptions} />
    </div>
  );
}
