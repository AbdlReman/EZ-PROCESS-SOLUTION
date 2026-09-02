import Link from "next/link";
import { getAllPackages } from "@/lib/models/package";
import { deleteServicePackage } from "@/lib/actions/packages";
import PackagesTable, { type PackageRow } from "@/components/admin/PackagesTable";
import { IconPlus } from "@/components/admin/icons";

export default async function AdminPackagesPage() {
  const packages = await getAllPackages();

  const rows: PackageRow[] = packages.map((pkg) => ({
    id: pkg.id,
    serviceTitle: pkg.serviceTitle,
    name: pkg.name,
    price: pkg.price,
    highlight: pkg.highlight,
    deleteAction: deleteServicePackage.bind(null, pkg.id),
  }));

  return (
    <div>
      <div className="ez-admin-page-head">
        <div>
          <h1 className="ez-admin-page-title">Packages</h1>
          <p className="ez-admin-page-subtitle">Pricing packages shown on each service&apos;s detail page.</p>
        </div>
        <Link href="/admin/packages/new" className="brelyx-btn-primary">
          <IconPlus />
          New Package
        </Link>
      </div>

      <PackagesTable items={rows} />
    </div>
  );
}
