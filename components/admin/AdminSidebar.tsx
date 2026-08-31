"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems: [string, string][] = [
  ["Dashboard", "/admin"],
  ["Projects", "/admin/projects"],
  ["Services", "/admin/services"],
  ["Blog", "/admin/blog"],
];

export default function AdminSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <aside style={{
      width: "230px",
      flexShrink: 0,
      minHeight: "100vh",
      background: "#05070f",
      borderRight: "1px solid rgba(30,38,72,0.7)",
      padding: "2rem 1.25rem",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
    }}>
      <div>
        <div style={{ fontSize: "1rem", fontWeight: 800, color: "#ffffff" }}>Admin Panel</div>
        <div style={{ fontSize: "0.75rem", color: "#8892b0", marginTop: "0.25rem" }}>{userName}</div>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {navItems.map(([label, href]) => {
          const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              style={{
                padding: "0.65rem 0.9rem",
                borderRadius: "0.65rem",
                fontSize: "0.85rem",
                fontWeight: 600,
                textDecoration: "none",
                color: active ? "#ffffff" : "#a4acc9",
                background: active ? "rgba(108,76,255,0.18)" : "transparent",
              }}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Link href="/" style={{ fontSize: "0.8rem", color: "#8892b0", textDecoration: "none" }}>
          ← Back to site
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          style={{
            fontSize: "0.8rem",
            color: "#a4acc9",
            background: "none",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            padding: 0,
          }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
