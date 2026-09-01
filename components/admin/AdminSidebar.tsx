"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  IconDashboard,
  IconFolder,
  IconLayers,
  IconDocument,
  IconClose,
  IconLogout,
  IconChevronLeft,
} from "./icons";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: IconDashboard },
  { label: "Projects", href: "/admin/projects", icon: IconFolder },
  { label: "Services", href: "/admin/services", icon: IconLayers },
  { label: "Blog", href: "/admin/blog", icon: IconDocument },
];

function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "A";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function AdminSidebar({
  userName,
  open,
  onClose,
}: {
  userName: string;
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`ez-admin-sidebar-overlay${open ? " open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`ez-admin-sidebar${open ? " open" : ""}`}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="ez-admin-brand">
            <div className="ez-admin-brand-mark">EZ</div>
            <div className="ez-admin-brand-text">
              <span className="ez-admin-brand-title">Admin Panel</span>
              <span className="ez-admin-brand-sub">EZ Process Solution</span>
            </div>
          </div>
          <button
            type="button"
            className="ez-admin-sidebar-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <IconClose size={16} />
          </button>
        </div>

        <nav className="ez-admin-nav">
          <span className="ez-admin-nav-label">Content</span>
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`ez-admin-nav-item${active ? " active" : ""}`}
              >
                <span className="ez-admin-nav-icon">
                  <Icon />
                </span>
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="ez-admin-sidebar-footer">
          <div className="ez-admin-user-card">
            <div className="ez-admin-user-avatar">{initialsFrom(userName)}</div>
            <div className="ez-admin-user-meta">
              <div className="ez-admin-user-name">{userName}</div>
              <div className="ez-admin-user-role">Administrator</div>
            </div>
          </div>
          <div className="ez-admin-sidebar-links">
            <Link href="/" className="ez-admin-link-btn">
              <IconChevronLeft size={14} />
              Back to site
            </Link>
            <button
              type="button"
              className="ez-admin-link-btn danger"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <IconLogout size={14} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
