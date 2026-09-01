"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { IconMenu, IconExternal, IconLogout } from "./icons";

const sectionLabels: Record<string, { title: string; singular: string }> = {
  projects: { title: "Projects", singular: "Project" },
  services: { title: "Services", singular: "Service" },
  blog: { title: "Blog Posts", singular: "Post" },
  messages: { title: "Messages", singular: "Message" },
  subscribers: { title: "Subscribers", singular: "Subscriber" },
};

function useAdminTitle(pathname: string) {
  const segments = pathname.split("/").filter(Boolean); // e.g. ["admin","projects","new"]
  const section = segments[1];

  if (!section) {
    return { title: "Dashboard", crumb: "Overview" };
  }

  const meta = sectionLabels[section];
  if (!meta) {
    return { title: "Admin", crumb: "" };
  }

  const third = segments[2];
  if (third === "new") {
    return { title: `New ${meta.singular}`, crumb: meta.title };
  }
  if (third && segments[3] === "edit") {
    return { title: `Edit ${meta.singular}`, crumb: meta.title };
  }
  if (third) {
    return { title: meta.singular, crumb: meta.title };
  }
  return { title: meta.title, crumb: "Content" };
}

export default function AdminTopbar({
  onMenuClick,
  userName,
}: {
  onMenuClick: () => void;
  userName: string;
}) {
  const pathname = usePathname() ?? "/admin";
  const { title, crumb } = useAdminTitle(pathname);

  return (
    <header className="ez-admin-topbar">
      <div className="ez-admin-topbar-left">
        <button type="button" className="ez-admin-menu-btn" onClick={onMenuClick} aria-label="Open menu">
          <IconMenu />
        </button>
        <div style={{ minWidth: 0 }}>
          {crumb && <div className="ez-admin-topbar-crumb">{crumb}</div>}
          <div className="ez-admin-topbar-title">{title}</div>
        </div>
      </div>

      <div className="ez-admin-topbar-right">
        <span className="hidden md:inline-flex" style={{ fontSize: "0.78rem", color: "var(--ez-admin-text-dim)", marginRight: "0.25rem" }}>
          {userName}
        </span>
        <Link href="/" target="_blank" className="brelyx-btn-ghost ez-admin-btn-sm hidden sm:inline-flex">
          <IconExternal />
          View site
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="ez-admin-icon-btn danger"
          aria-label="Logout"
          title="Logout"
        >
          <IconLogout size={15} />
        </button>
      </div>
    </header>
  );
}
