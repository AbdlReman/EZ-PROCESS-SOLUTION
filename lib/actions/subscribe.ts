"use server";

import { revalidatePath } from "next/cache";
import { addSubscriber } from "@/lib/models/subscriber";

export type SubscribeActionState = { error?: string; success?: boolean } | undefined;

export async function subscribeNewsletter(
  _prevState: SubscribeActionState,
  formData: FormData
): Promise<SubscribeActionState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return { error: "Please enter your email address." };
  }

  try {
    await addSubscriber(email);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Something went wrong. Please try again." };
  }

  revalidatePath("/admin/subscribers");
  return { success: true };
}
