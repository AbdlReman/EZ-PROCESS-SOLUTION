"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "./require-admin";
import { linesToArray, optionalString, requiredString } from "./form-utils";
import type { ActionState } from "./types";
import { getServiceById } from "@/lib/models/service";
import {
  createPackage as dbCreatePackage,
  updatePackage as dbUpdatePackage,
  deletePackage as dbDeletePackage,
  getPackageById as dbGetPackageById,
  type ServicePackageInput,
} from "@/lib/models/package";

async function parsePackageForm(formData: FormData): Promise<{ input: ServicePackageInput | null; error?: string }> {
  const serviceId = requiredString(formData, "serviceId");
  const service = await getServiceById(serviceId);
  if (!service) {
    return { input: null, error: "Please select a valid service." };
  }

  const input: ServicePackageInput = {
    serviceId,
    serviceSlug: service.slug,
    serviceTitle: service.title,
    name: requiredString(formData, "name"),
    price: requiredString(formData, "price"),
    deliveryTime: optionalString(formData, "deliveryTime"),
    description: requiredString(formData, "description"),
    features: linesToArray(formData, "features"),
    highlight: formData.get("highlight") === "on",
  };

  return { input };
}

export async function createServicePackage(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const { input, error } = await parsePackageForm(formData);
  if (!input) return { error };

  if (!input.name || !input.price || !input.description) {
    return { error: "Name, price, and description are required." };
  }

  try {
    await dbCreatePackage(input);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to create package." };
  }

  revalidatePath(`/services/${input.serviceSlug}`);
  redirect("/admin/packages");
}

export async function updateServicePackage(id: string, _prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const { input, error } = await parsePackageForm(formData);
  if (!input) return { error };

  if (!input.name || !input.price || !input.description) {
    return { error: "Name, price, and description are required." };
  }

  try {
    await dbUpdatePackage(id, input);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to update package." };
  }

  revalidatePath(`/services/${input.serviceSlug}`);
  redirect("/admin/packages");
}

export async function deleteServicePackage(id: string) {
  await requireAdmin();
  const pkg = await dbGetPackageById(id);
  await dbDeletePackage(id);
  if (pkg) revalidatePath(`/services/${pkg.serviceSlug}`);
  redirect("/admin/packages");
}
