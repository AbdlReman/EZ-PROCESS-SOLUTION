import Link from "next/link";
import { getAllProjects } from "@/lib/models/project";
import { getAllServices } from "@/lib/models/service";
import { getAllBlogPosts } from "@/lib/models/blog";

const cardStyle: React.CSSProperties = {
  background: "#10132a",
  border: "1px solid rgba(30,38,72,0.9)",
  borderRadius: "1rem",
  padding: "1.75rem",
  textDecoration: "none",
  display: "block",
};

export default async function AdminDashboardPage() {
  const [projects, services, blogPosts] = await Promise.all([
    getAllProjects(),
    getAllServices(),
    getAllBlogPosts(),
  ]);

  const stats: [string, number, string][] = [
    ["Projects", projects.length, "/admin/projects"],
    ["Services", services.length, "/admin/services"],
    ["Blog Posts", blogPosts.length, "/admin/blog"],
  ];

  return (
    <div>
      <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", marginBottom: "0.5rem" }}>Dashboard</h1>
      <p style={{ fontSize: "0.9rem", color: "#8892b0", marginBottom: "2rem" }}>
        Manage your portfolio, services, and blog content.
      </p>

      <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        {stats.map(([label, count, href]) => (
          <Link key={label} href={href} style={cardStyle}>
            <div style={{ fontSize: "2rem", fontWeight: 900, color: "#ffffff", marginBottom: "0.35rem" }}>{count}</div>
            <div style={{ fontSize: "0.85rem", color: "#a4acc9", fontWeight: 600 }}>{label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
