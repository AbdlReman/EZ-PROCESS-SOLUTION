import { notFound } from "next/navigation";
import Link from "next/link";
import ProjectForm from "@/components/admin/ProjectForm";
import { getProjectById } from "@/lib/models/project";
import { updateProject } from "@/lib/actions/projects";
import { IconChevronLeft } from "@/components/admin/icons";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  return (
    <div>
      <Link href="/admin/projects" className="ez-admin-back-link">
        <IconChevronLeft size={13} />
        Back to Projects
      </Link>
      <div className="ez-admin-page-head">
        <div>
          <h1 className="ez-admin-page-title">Edit Project</h1>
          <p className="ez-admin-page-subtitle">{project.title}</p>
        </div>
      </div>
      <ProjectForm action={updateProject.bind(null, project.id)} initial={project} />
    </div>
  );
}
