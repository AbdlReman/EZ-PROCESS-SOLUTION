"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "./require-admin";
import { requiredString } from "./form-utils";
import type { ActionState } from "./types";
import {
  createBlogPost as dbCreateBlogPost,
  updateBlogPost as dbUpdateBlogPost,
  deleteBlogPost as dbDeleteBlogPost,
  type BlogPostInput,
} from "@/lib/models/blog";

function parseBlogForm(formData: FormData): BlogPostInput {
  return {
    slug: requiredString(formData, "slug"),
    title: requiredString(formData, "title"),
    excerpt: requiredString(formData, "excerpt"),
    date: requiredString(formData, "date"),
    author: requiredString(formData, "author"),
    category: requiredString(formData, "category"),
    readTime: requiredString(formData, "readTime"),
    image: requiredString(formData, "image"),
    content: requiredString(formData, "content"),
  };
}

export async function createBlogPost(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const input = parseBlogForm(formData);

  if (!input.slug || !input.title || !input.image) {
    return { error: "Slug, title, and image are required." };
  }

  try {
    await dbCreateBlogPost(input);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to create blog post." };
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${input.slug}`);
  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, _prevState: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const input = parseBlogForm(formData);

  if (!input.slug || !input.title || !input.image) {
    return { error: "Slug, title, and image are required." };
  }

  try {
    await dbUpdateBlogPost(id, input);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to update blog post." };
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${input.slug}`);
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  await requireAdmin();
  await dbDeleteBlogPost(id);
  revalidatePath("/blog");
  redirect("/admin/blog");
}
