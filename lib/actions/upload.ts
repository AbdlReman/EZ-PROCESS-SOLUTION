"use server";

import { requireAdmin } from "./require-admin";
import { uploadImageBuffer } from "@/lib/cloudinary";

export async function uploadImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  await requireAdmin();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "No file selected." };
  }
  if (!file.type.startsWith("image/")) {
    return { error: "Only image files are allowed." };
  }
  if (file.size > 8 * 1024 * 1024) {
    return { error: "Image must be smaller than 8MB." };
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadImageBuffer(buffer);
    return { url };
  } catch {
    return { error: "Upload failed. Please try again." };
  }
}
