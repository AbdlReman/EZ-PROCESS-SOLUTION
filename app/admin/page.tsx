import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "@/lib/models/project";
import { getAllServices } from "@/lib/models/service";
import { getAllBlogPosts } from "@/lib/models/blog";
import { getAllMessages } from "@/lib/models/message";
import { getAllSubscribers } from "@/lib/models/subscriber";
import { IconFolder, IconLayers, IconDocument, IconMail, IconUsers, IconPlus, IconInbox } from "@/components/admin/icons";

function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default async function AdminDashboardPage() {
  const [projects, services, blogPosts, messages, subscribers] = await Promise.all([
    getAllProjects(),
    getAllServices(),
    getAllBlogPosts(),
    getAllMessages(),
    getAllSubscribers(),
  ]);

  const unreadCount = messages.filter((m) => !m.read).length;

  const stats = [
    { label: "Projects", count: projects.length, href: "/admin/projects", icon: IconFolder, sublabel: undefined as string | undefined },
    { label: "Services", count: services.length, href: "/admin/services", icon: IconLayers, sublabel: undefined as string | undefined },
    { label: "Blog Posts", count: blogPosts.length, href: "/admin/blog", icon: IconDocument, sublabel: undefined as string | undefined },
    {
      label: "Messages",
      count: messages.length,
      href: "/admin/messages",
      icon: IconMail,
      sublabel: unreadCount > 0 ? `${unreadCount} unread` : undefined,
    },
    { label: "Subscribers", count: subscribers.length, href: "/admin/subscribers", icon: IconUsers, sublabel: undefined as string | undefined },
  ];

  const recentPanels = [
    {
      label: "Recent Projects",
      href: "/admin/projects",
      items: projects.slice(0, 4).map((p) => ({ id: p.id, title: p.title, sub: p.category, image: p.image as string | undefined, editHref: `/admin/projects/${p.id}/edit` })),
      emptyLabel: "No projects yet",
    },
    {
      label: "Recent Services",
      href: "/admin/services",
      items: services.slice(0, 4).map((s) => ({ id: s.id, title: s.title, sub: s.category, image: s.image as string | undefined, editHref: `/admin/services/${s.id}/edit` })),
      emptyLabel: "No services yet",
    },
    {
      label: "Recent Blog Posts",
      href: "/admin/blog",
      items: blogPosts.slice(0, 4).map((b) => ({ id: b.id, title: b.title, sub: b.date, image: b.image as string | undefined, editHref: `/admin/blog/${b.id}/edit` })),
      emptyLabel: "No blog posts yet",
    },
    {
      label: "Recent Messages",
      href: "/admin/messages",
      items: messages.slice(0, 4).map((m) => ({ id: m.id, title: m.name, sub: m.email, image: undefined as string | undefined, editHref: `/admin/messages/${m.id}` })),
      emptyLabel: "No messages yet",
    },
    {
      label: "Recent Subscribers",
      href: "/admin/subscribers",
      items: subscribers.slice(0, 4).map((s) => ({ id: s.id, title: s.email, sub: "Subscribed", image: undefined as string | undefined, editHref: "/admin/subscribers" })),
      emptyLabel: "No subscribers yet",
    },
  ];

  return (
    <div>
      <div className="ez-admin-page-head">
        <div>
          <h1 className="ez-admin-page-title">Dashboard</h1>
          <p className="ez-admin-page-subtitle">Manage your portfolio, services, blog, and inbound messages from one place.</p>
        </div>
      </div>

      <div className="ez-admin-stats-grid">
        {stats.map(({ label, count, href, icon: Icon, sublabel }) => (
          <Link key={label} href={href} className="ez-admin-stat-card">
            <div className="ez-admin-stat-icon">
              <Icon size={21} />
            </div>
            <div className="ez-admin-stat-body">
              <div className="ez-admin-stat-value">{count}</div>
              <div className="ez-admin-stat-label">
                {label}
                {sublabel && <span className="ez-admin-topbar-badge" style={{ marginLeft: "0.5rem" }}>{sublabel}</span>}
              </div>
            </div>
            <span className="ez-admin-stat-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 19 19 5M9 5h10v10" />
              </svg>
            </span>
          </Link>
        ))}
      </div>

      <div className="ez-admin-quick-actions">
        <Link href="/admin/projects/new" className="brelyx-btn-primary ez-admin-btn-sm">
          <IconPlus />
          New Project
        </Link>
        <Link href="/admin/services/new" className="brelyx-btn-ghost ez-admin-btn-sm">
          <IconPlus />
          New Service
        </Link>
        <Link href="/admin/blog/new" className="brelyx-btn-ghost ez-admin-btn-sm">
          <IconPlus />
          New Post
        </Link>
      </div>

      <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {recentPanels.map((panel) => (
          <div key={panel.label} className="ez-admin-panel">
            <div className="ez-admin-panel-head">
              <span className="ez-admin-panel-title">{panel.label}</span>
              <Link href={panel.href} style={{ fontSize: "0.76rem", fontWeight: 600, color: "var(--ez-admin-text-dim)", textDecoration: "none" }}>
                View all
              </Link>
            </div>
            <div className="ez-admin-panel-body">
              {panel.items.length === 0 ? (
                <div className="ez-admin-empty" style={{ padding: "1.5rem 0.5rem" }}>
                  <div className="ez-admin-empty-icon">
                    <IconInbox size={22} />
                  </div>
                  <p className="ez-admin-empty-copy">{panel.emptyLabel}</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  {panel.items.map((item) => (
                    <Link
                      key={item.id}
                      href={item.editHref}
                      className="ez-admin-row-item"
                      style={{ textDecoration: "none" }}
                    >
                      {item.image ? (
                        <div className="ez-admin-row-thumb">
                          <Image src={item.image} alt={item.title} fill className="object-cover object-center" />
                        </div>
                      ) : (
                        <div className="ez-admin-user-avatar" style={{ width: "42px", height: "42px", borderRadius: "0.6rem", fontSize: "0.72rem" }}>
                          {initialsFrom(item.title)}
                        </div>
                      )}
                      <div style={{ minWidth: 0 }}>
                        <div className="ez-admin-row-title">{item.title}</div>
                        <div className="ez-admin-row-sub">{item.sub}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
