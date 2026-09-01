"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminShell({
  userName,
  children,
}: {
  userName: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="ez-admin-shell">
      <AdminSidebar userName={userName} open={open} onClose={() => setOpen(false)} />
      <div className="ez-admin-main">
        <AdminTopbar onMenuClick={() => setOpen(true)} userName={userName} />
        <div className="ez-admin-content">{children}</div>
      </div>
    </div>
  );
}
