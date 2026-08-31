"use server";

import { createUser } from "@/lib/models/user";

export type RegisterState = { error?: string; success?: boolean } | undefined;

export async function registerUser(_prevState: RegisterState, formData: FormData): Promise<RegisterState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) {
    return { error: "Name, email, and password are all required." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  try {
    await createUser({ name, email, password });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Could not create account." };
  }

  return { success: true };
}
