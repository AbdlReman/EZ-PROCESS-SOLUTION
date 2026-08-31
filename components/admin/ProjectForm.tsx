"use client";

import { useActionState } from "react";
import type { Project } from "@/lib/models/project";
import type { ActionState } from "@/lib/actions/types";
import ImageUploadField from "./ImageUploadField";

type ProjectFormAction = (prevState: ActionState, formData: FormData) => Promise<ActionState>;

export default function ProjectForm({
  action,
  initial,
}: {
  action: ProjectFormAction;
  initial?: Project;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "42rem" }}>
      <div className="brelyx-form-group">
        <label className="brelyx-form-label" htmlFor="title">Title</label>
        <input id="title" name="title" className="brelyx-input" defaultValue={initial?.title} required />
      </div>

      <div className="brelyx-form-group">
        <label className="brelyx-form-label" htmlFor="slug">Slug (URL path, e.g. my-project)</label>
        <input id="slug" name="slug" className="brelyx-input" defaultValue={initial?.slug} required />
      </div>

      <div className="brelyx-form-group">
        <label className="brelyx-form-label" htmlFor="tagline">Tagline</label>
        <input id="tagline" name="tagline" className="brelyx-input" defaultValue={initial?.tagline} required />
      </div>

      <div className="brelyx-form-group">
        <label className="brelyx-form-label" htmlFor="category">Category</label>
        <input id="category" name="category" className="brelyx-input" defaultValue={initial?.category} required />
      </div>

      <div className="brelyx-form-group">
        <label className="brelyx-form-label" htmlFor="description">Short Description (used on cards)</label>
        <textarea id="description" name="description" className="brelyx-textarea" defaultValue={initial?.description} required />
      </div>

      <div className="brelyx-form-group">
        <label className="brelyx-form-label" htmlFor="longDescription">Long Description (detail page)</label>
        <textarea id="longDescription" name="longDescription" className="brelyx-textarea" defaultValue={initial?.longDescription} required />
      </div>

      <ImageUploadField name="image" label="Cover Image" defaultValue={initial?.image} />

      <div className="brelyx-form-group">
        <label className="brelyx-form-label" htmlFor="detailImages">Additional Detail Images (one URL per line, optional)</label>
        <textarea id="detailImages" name="detailImages" className="brelyx-textarea" defaultValue={initial?.detailImages?.join("\n")} />
      </div>

      <div className="brelyx-form-group">
        <label className="brelyx-form-label" htmlFor="tech">Tech Stack (comma-separated)</label>
        <input id="tech" name="tech" className="brelyx-input" defaultValue={initial?.tech?.join(", ")} placeholder="Next.js, React, MongoDB" required />
      </div>

      <div className="brelyx-form-group">
        <label className="brelyx-form-label" htmlFor="features">Features (one per line)</label>
        <textarea id="features" name="features" className="brelyx-textarea" defaultValue={initial?.features?.join("\n")} required />
      </div>

      <div className="brelyx-form-group">
        <label className="brelyx-form-label" htmlFor="url">Live Site URL (optional)</label>
        <input id="url" name="url" type="url" className="brelyx-input" defaultValue={initial?.url} />
      </div>

      <div className="brelyx-form-group">
        <label className="brelyx-form-label" htmlFor="year">Year (optional)</label>
        <input id="year" name="year" className="brelyx-input" defaultValue={initial?.year} />
      </div>

      <div className="brelyx-form-group">
        <label className="brelyx-form-label" htmlFor="highlight">Highlight Quote (optional)</label>
        <input id="highlight" name="highlight" className="brelyx-input" defaultValue={initial?.highlight} />
      </div>

      {state?.error && (
        <p style={{ fontSize: "0.85rem", color: "#F87171" }}>{state.error}</p>
      )}

      <button type="submit" className="brelyx-btn-primary" disabled={pending} style={{ width: "fit-content" }}>
        {pending ? "Saving…" : initial ? "Save Changes" : "Create Project"}
      </button>
    </form>
  );
}
