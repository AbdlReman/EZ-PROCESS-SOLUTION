"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "./require-admin";
import { csvToArray, linesToArray, optionalString, requiredString } from "./form-utils";
import type { ActionState } from "./types";
import {
  createProject as dbCreateProject,
  updateProject as dbUpdateProject,
  deleteProject as dbDeleteProject,
  type ProjectInput,
} from "@/lib/models/project";

function parseProjectForm(formData: FormData): ProjectInput {
  return {
    slug: requiredString(formData, "slug"),
    title: requiredString(formData, "title"),
    tagline: requiredString(formData, "tagline"),
    description: requiredString(formData, "description"),
    longDescription: requiredString(formData, "longDescription"),
    image: requiredString(formData, "image"),
    detailImages: linesToArray(formData, "detailImages"),
    category: requiredString(formData, "category"),
    tech: csvToArray(formData, "tech"),
    url: optionalString(formData, "url"),
    features: linesToArray(formData, "features"),
    year: optionalString(formData, "year"),
    highlight: optionalString(formData, "highlight"),
  };
}

export async function createProject(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const input = parseProjectForm(formData);

  if (!input.slug || !input.title || !input.image) {
    return { error: "Slug, title, and image are required." };
  }

  try {
    await dbCreateProject(input);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to create project." };
  }

  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${input.slug}`);
  redirect("/admin/projects");
}

export async function updateProject(id: string, _prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const input = parseProjectForm(formData);

  if (!input.slug || !input.title || !input.image) {
    return { error: "Slug, title, and image are required." };
  }

  try {
    await dbUpdateProject(id, input);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to update project." };
  }

  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${input.slug}`);
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await dbDeleteProject(id);
  revalidatePath("/portfolio");
  redirect("/admin/projects");
}
