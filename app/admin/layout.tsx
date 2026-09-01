import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";
import { getUnreadMessageCount } from "@/lib/models/message";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }
  if (session.user.role !== "admin") {
    redirect("/");
  }

  const userName = session.user.name ?? session.user.email ?? "Admin";
  const unreadMessages = await getUnreadMessageCount();

  return (
    <AdminShell userName={userName} unreadMessages={unreadMessages}>
      {children}
    </AdminShell>
  );
}
