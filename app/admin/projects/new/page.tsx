import Link from "next/link";
import ProjectForm from "@/components/admin/ProjectForm";
import { createProject } from "@/lib/actions/projects";
import { IconChevronLeft } from "@/components/admin/icons";

export default function NewProjectPage() {
  return (
    <div>
      <Link href="/admin/projects" className="ez-admin-back-link">
        <IconChevronLeft size={13} />
        Back to Projects
      </Link>
      <div className="ez-admin-page-head">
        <div>
          <h1 className="ez-admin-page-title">New Project</h1>
          <p className="ez-admin-page-subtitle">Add a new case study to your portfolio.</p>
        </div>
      </div>
      <ProjectForm action={createProject} />
    </div>
  );
}
