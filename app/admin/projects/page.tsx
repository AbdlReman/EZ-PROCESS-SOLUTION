import Link from "next/link";
import { getAllProjects } from "@/lib/models/project";
import { deleteProject } from "@/lib/actions/projects";
import ProjectsTable, { type ProjectRow } from "@/components/admin/ProjectsTable";
import { IconPlus } from "@/components/admin/icons";

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  const rows: ProjectRow[] = projects.map((project) => ({
    id: project.id,
    title: project.title,
    slug: project.slug,
    category: project.category,
    image: project.image,
    deleteAction: deleteProject.bind(null, project.id),
  }));

  return (
    <div>
      <div className="ez-admin-page-head">
        <div>
          <h1 className="ez-admin-page-title">Projects</h1>
          <p className="ez-admin-page-subtitle">Manage the case studies shown on your portfolio.</p>
        </div>
        <Link href="/admin/projects/new" className="brelyx-btn-primary">
          <IconPlus />
          New Project
        </Link>
      </div>

      <ProjectsTable items={rows} />
    </div>
  );
}
