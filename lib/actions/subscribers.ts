"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "./require-admin";
import {
  deleteSubscriber as dbDeleteSubscriber,
  deleteSubscribersBulk as dbDeleteSubscribersBulk,
  addSubscribersBulk,
} from "@/lib/models/subscriber";

export async function deleteSubscriber(id: string) {
  await requireAdmin();
  await dbDeleteSubscriber(id);
  revalidatePath("/admin/subscribers");
  redirect("/admin/subscribers");
}

export async function bulkDeleteSubscribers(ids: string[]): Promise<{ deleted: number }> {
  await requireAdmin();
  const deleted = await dbDeleteSubscribersBulk(ids);
  revalidatePath("/admin/subscribers");
  return { deleted };
}

export async function importSubscribers(emails: string[]): Promise<{ added: number; skipped: number }> {
  await requireAdmin();
  const result = await addSubscribersBulk(emails);
  revalidatePath("/admin/subscribers");
  return result;
}
