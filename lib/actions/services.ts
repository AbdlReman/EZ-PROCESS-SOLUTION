"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "./require-admin";
import { csvToArray, linesToArray, optionalString, parseProcessSteps, requiredString } from "./form-utils";
import type { ActionState } from "./types";
import {
  createService as dbCreateService,
  updateService as dbUpdateService,
  deleteService as dbDeleteService,
  type ServiceInput,
} from "@/lib/models/service";

function parseServiceForm(formData: FormData): ServiceInput {
  return {
    slug: requiredString(formData, "slug"),
    title: requiredString(formData, "title"),
    tagline: requiredString(formData, "tagline"),
    category: requiredString(formData, "category"),
    description: requiredString(formData, "description"),
    longDescription: requiredString(formData, "longDescription"),
    image: requiredString(formData, "image"),
    features: linesToArray(formData, "features"),
    deliverables: linesToArray(formData, "deliverables"),
    tools: csvToArray(formData, "tools"),
    process: parseProcessSteps(formData, "process"),
    highlight: optionalString(formData, "highlight"),
  };
}

export async function createService(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const input = parseServiceForm(formData);

  if (!input.slug || !input.title || !input.image) {
    return { error: "Slug, title, and image are required." };
  }

  try {
    await dbCreateService(input);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to create service." };
  }

  revalidatePath("/services");
  revalidatePath(`/services/${input.slug}`);
  redirect("/admin/services");
}

export async function updateService(id: string, _prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const input = parseServiceForm(formData);

  if (!input.slug || !input.title || !input.image) {
    return { error: "Slug, title, and image are required." };
  }

  try {
    await dbUpdateService(id, input);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to update service." };
  }

  revalidatePath("/services");
  revalidatePath(`/services/${input.slug}`);
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await requireAdmin();
  await dbDeleteService(id);
  revalidatePath("/services");
  redirect("/admin/services");
}
