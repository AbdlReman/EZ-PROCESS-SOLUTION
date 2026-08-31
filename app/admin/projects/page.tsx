import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "@/lib/models/project";
import { deleteProject } from "@/lib/actions/projects";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff" }}>Projects</h1>
        <Link href="/admin/projects/new" className="brelyx-btn-primary">+ New Project</Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {projects.map((project) => (
          <div
            key={project.id}
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
              <Image src={project.image} alt={project.title} fill className="object-cover object-center" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#ffffff" }}>{project.title}</div>
              <div style={{ fontSize: "0.78rem", color: "#8892b0" }}>{project.category} · /{project.slug}</div>
            </div>
            <Link
              href={`/admin/projects/${project.id}/edit`}
              style={{ fontSize: "0.78rem", fontWeight: 600, color: "#a4acc9", textDecoration: "none" }}
            >
              Edit
            </Link>
            <DeleteButton
              action={deleteProject.bind(null, project.id)}
              confirmMessage={`Delete "${project.title}"? This can't be undone.`}
            />
          </div>
        ))}

        {projects.length === 0 && (
          <p style={{ color: "#8892b0", fontSize: "0.9rem" }}>No projects yet.</p>
        )}
      </div>
    </div>
  );
}
