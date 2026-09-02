import { notFound } from "next/navigation";
import Link from "next/link";
import PackageForm from "@/components/admin/PackageForm";
import { getPackageById } from "@/lib/models/package";
import { updateServicePackage } from "@/lib/actions/packages";
import { getAllServices } from "@/lib/models/service";
import { IconChevronLeft } from "@/components/admin/icons";

export default async function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [pkg, services] = await Promise.all([getPackageById(id), getAllServices()]);
  if (!pkg) notFound();

  const serviceOptions = services.map((s) => ({ id: s.id, title: s.title }));

  return (
    <div>
      <Link href="/admin/packages" className="ez-admin-back-link">
        <IconChevronLeft size={13} />
        Back to Packages
      </Link>
      <div className="ez-admin-page-head">
        <div>
          <h1 className="ez-admin-page-title">Edit Package</h1>
          <p className="ez-admin-page-subtitle">{pkg.name} — {pkg.serviceTitle}</p>
        </div>
      </div>
      <PackageForm action={updateServicePackage.bind(null, pkg.id)} services={serviceOptions} initial={pkg} />
    </div>
  );
}
