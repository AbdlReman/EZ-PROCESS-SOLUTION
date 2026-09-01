"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "./require-admin";
import { deleteMessage as dbDeleteMessage, setMessageRead } from "@/lib/models/message";

export async function deleteMessage(id: string) {
  await requireAdmin();
  await dbDeleteMessage(id);
  revalidatePath("/admin/messages");
  redirect("/admin/messages");
}

export async function setMessageReadStatus(id: string, read: boolean) {
  await requireAdmin();
  await setMessageRead(id, read);
  revalidatePath("/admin/messages");
  revalidatePath(`/admin/messages/${id}`);
}
