import ProjectForm from "@/components/admin/ProjectForm";
import { createProject } from "@/lib/actions/projects";

export default function NewProjectPage() {
  return (
    <div>
      <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", marginBottom: "2rem" }}>New Project</h1>
      <ProjectForm action={createProject} />
    </div>
  );
}
