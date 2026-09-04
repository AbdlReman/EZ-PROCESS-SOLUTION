"use server";

import { revalidatePath } from "next/cache";
import { requiredString, optionalString } from "./form-utils";
import { createMessage } from "@/lib/models/message";

export type ContactActionState = { error?: string; success?: boolean } | undefined;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactMessage(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const name = requiredString(formData, "name");
  const email = requiredString(formData, "email");
  const message = requiredString(formData, "message");
  const company = optionalString(formData, "company");
  const budget = optionalString(formData, "budget");
  const services = formData.getAll("services").map((v) => String(v)).filter(Boolean);
  const source = optionalString(formData, "source");
  const pkg = optionalString(formData, "package");

  if (!name || !email || !message) {
    return { error: "Please fill in your name, email, and project details." };
  }
  if (!EMAIL_RE.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  try {
    await createMessage({ name, email, company, budget, services, source, package: pkg, message });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Something went wrong. Please try again." };
  }

  revalidatePath("/admin/messages");
  return { success: true };
}
