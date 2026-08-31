"use client";

import { useActionState } from "react";
import type { BlogPost } from "@/lib/models/blog";
import type { ActionState } from "@/lib/actions/types";
import ImageUploadField from "./ImageUploadField";
import RichTextEditor from "./RichTextEditor";

type BlogFormAction = (prevState: ActionState, formData: FormData) => Promise<ActionState>;

function toDateInputValue(iso?: string) {
  if (!iso) return new Date().toISOString().slice(0, 10);
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return new Date().toISOString().slice(0, 10);
  return date.toISOString().slice(0, 10);
}

export default function BlogForm({
  action,
  initial,
}: {
  action: BlogFormAction;
  initial?: BlogPost;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "48rem" }}>
      <div className="brelyx-form-group">
        <label className="brelyx-form-label" htmlFor="title">Title</label>
        <input id="title" name="title" className="brelyx-input" defaultValue={initial?.title} required />
      </div>

      <div className="brelyx-form-group">
        <label className="brelyx-form-label" htmlFor="slug">Slug (URL path)</label>
        <input id="slug" name="slug" className="brelyx-input" defaultValue={initial?.slug} required />
      </div>

      <div className="brelyx-form-group">
        <label className="brelyx-form-label" htmlFor="excerpt">Excerpt (used on cards)</label>
        <textarea id="excerpt" name="excerpt" className="brelyx-textarea" defaultValue={initial?.excerpt} required />
      </div>

      <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(2, minmax(0,1fr))" }}>
        <div className="brelyx-form-group">
          <label className="brelyx-form-label" htmlFor="author">Author</label>
          <input id="author" name="author" className="brelyx-input" defaultValue={initial?.author ?? "EZ Process Solution"} required />
        </div>
        <div className="brelyx-form-group">
          <label className="brelyx-form-label" htmlFor="date">Date</label>
          <input id="date" name="date" type="date" className="brelyx-input" defaultValue={toDateInputValue(initial?.date)} required />
        </div>
        <div className="brelyx-form-group">
          <label className="brelyx-form-label" htmlFor="category">Category</label>
          <input id="category" name="category" className="brelyx-input" defaultValue={initial?.category} required />
        </div>
        <div className="brelyx-form-group">
          <label className="brelyx-form-label" htmlFor="readTime">Read Time</label>
          <input id="readTime" name="readTime" className="brelyx-input" defaultValue={initial?.readTime ?? "5 min read"} required />
        </div>
      </div>

      <ImageUploadField name="image" label="Cover Image" defaultValue={initial?.image} />

      <div className="brelyx-form-group">
        <label className="brelyx-form-label">Content</label>
        <RichTextEditor name="content" defaultValue={initial?.content} />
      </div>

      {state?.error && (
        <p style={{ fontSize: "0.85rem", color: "#F87171" }}>{state.error}</p>
      )}

      <button type="submit" className="brelyx-btn-primary" disabled={pending} style={{ width: "fit-content" }}>
        {pending ? "Saving…" : initial ? "Save Changes" : "Publish Post"}
      </button>
    </form>
  );
}
