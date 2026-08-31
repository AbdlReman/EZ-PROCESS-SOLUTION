import Link from "next/link";
import Image from "next/image";
import { getAllServices } from "@/lib/models/service";
import { deleteService } from "@/lib/actions/services";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminServicesPage() {
  const services = await getAllServices();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff" }}>Services</h1>
        <Link href="/admin/services/new" className="brelyx-btn-primary">+ New Service</Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {services.map((service) => (
          <div
            key={service.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              background: "#10132a",
              border: "1px solid rgba(30,38,72,0.9)",
              borderRadius: "0.85rem",
              padding: "0.9rem 1.1rem",
            }}
          >
            <div style={{ position: "relative", width: "56px", height: "56px", borderRadius: "0.6rem", overflow: "hidden", flexShrink: 0 }}>
              <Image src={service.image} alt={service.title} fill className="object-cover object-center" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#ffffff" }}>{service.title}</div>
              <div style={{ fontSize: "0.78rem", color: "#8892b0" }}>{service.category} · /{service.slug}</div>
            </div>
            <Link
              href={`/admin/services/${service.id}/edit`}
              style={{ fontSize: "0.78rem", fontWeight: 600, color: "#a4acc9", textDecoration: "none" }}
            >
              Edit
            </Link>
            <DeleteButton
              action={deleteService.bind(null, service.id)}
              confirmMessage={`Delete "${service.title}"? This can't be undone.`}
            />
          </div>
        ))}

        {services.length === 0 && (
          <p style={{ color: "#8892b0", fontSize: "0.9rem" }}>No services yet.</p>
        )}
      </div>
    </div>
  );
}
