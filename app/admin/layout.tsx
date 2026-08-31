import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }
  if (session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0d1a" }}>
      <AdminSidebar userName={session.user.name ?? session.user.email ?? "Admin"} />
      <div style={{ flex: 1, padding: "2.5rem 3rem", color: "#e5e7eb" }}>{children}</div>
    </div>
  );
}
