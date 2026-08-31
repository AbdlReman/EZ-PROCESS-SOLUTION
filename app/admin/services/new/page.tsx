import ServiceForm from "@/components/admin/ServiceForm";
import { createService } from "@/lib/actions/services";

export default function NewServicePage() {
  return (
    <div>
      <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", marginBottom: "2rem" }}>New Service</h1>
      <ServiceForm action={createService} />
    </div>
  );
}
