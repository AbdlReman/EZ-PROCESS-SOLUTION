"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { Project } from "@/lib/models/project";
import type { ActionState } from "@/lib/actions/types";
import { useSlugField } from "@/lib/hooks/useSlugField";
import ImageUploadField from "./ImageUploadField";
import RichTextEditor from "./RichTextEditor";

type ProjectFormAction = (prevState: ActionState, formData: FormData) => Promise<ActionState>;

export default function ProjectForm({
  action,
  initial,
}: {
  action: ProjectFormAction;
  initial?: Project;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const { slug, onTitleChange, onSlugChange } = useSlugField(initial?.slug);

  return (
    <form action={formAction} className="ez-admin-form-card">
      <div className="ez-admin-form-section">
        <div className="ez-admin-form-section-head">
          <span className="ez-admin-form-section-title">Basic info</span>
          <span className="ez-admin-form-section-copy">The name and category shown across your site.</span>
        </div>

        <div className="ez-admin-form-row">
          <div className="brelyx-form-group">
            <label className="brelyx-form-label" htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              className="brelyx-input"
              defaultValue={initial?.title}
              onChange={(e) => onTitleChange(e.target.value)}
              required
            />
          </div>
          <div className="brelyx-form-group">
            <label className="brelyx-form-label" htmlFor="slug">Slug (URL path, e.g. my-project)</label>
            <input
              id="slug"
              name="slug"
              className="brelyx-input"
              value={slug}
              onChange={(e) => onSlugChange(e.target.value)}
              required
            />
          </div>
          <div className="brelyx-form-group">
            <label className="brelyx-form-label" htmlFor="tagline">Tagline</label>
            <input id="tagline" name="tagline" className="brelyx-input" defaultValue={initial?.tagline} required />
          </div>
          <div className="brelyx-form-group">
            <label className="brelyx-form-label" htmlFor="category">Category</label>
            <input id="category" name="category" className="brelyx-input" defaultValue={initial?.category} required />
          </div>
        </div>
      </div>

      <div className="ez-admin-form-section">
        <div className="ez-admin-form-section-head">
          <span className="ez-admin-form-section-title">Description</span>
          <span className="ez-admin-form-section-copy">Used on project cards and the case study detail page.</span>
        </div>

        <div className="brelyx-form-group">
          <label className="brelyx-form-label" htmlFor="description">Short Description (used on cards)</label>
          <textarea id="description" name="description" className="brelyx-textarea" defaultValue={initial?.description} required />
        </div>

        <div className="brelyx-form-group">
          <label className="brelyx-form-label">Long Description (detail page)</label>
          <RichTextEditor name="longDescription" defaultValue={initial?.longDescription} />
        </div>
      </div>

      <div className="ez-admin-form-section">
        <div className="ez-admin-form-section-head">
          <span className="ez-admin-form-section-title">Media</span>
          <span className="ez-admin-form-section-copy">Cover image plus optional extra images for the detail page.</span>
        </div>

        <ImageUploadField name="image" label="Cover Image" defaultValue={initial?.image} />

        <div className="brelyx-form-group">
          <label className="brelyx-form-label" htmlFor="detailImages">Additional Detail Images (one URL per line, optional)</label>
          <textarea id="detailImages" name="detailImages" className="brelyx-textarea" defaultValue={initial?.detailImages?.join("\n")} />
        </div>
      </div>

      <div className="ez-admin-form-section">
        <div className="ez-admin-form-section-head">
          <span className="ez-admin-form-section-title">Details</span>
          <span className="ez-admin-form-section-copy">Tech stack, features, and optional extras.</span>
        </div>

        <div className="brelyx-form-group">
          <label className="brelyx-form-label" htmlFor="tech">Tech Stack (comma-separated)</label>
          <input id="tech" name="tech" className="brelyx-input" defaultValue={initial?.tech?.join(", ")} placeholder="Next.js, React, MongoDB" required />
        </div>

        <div className="brelyx-form-group">
          <label className="brelyx-form-label" htmlFor="features">Features (one per line)</label>
          <textarea id="features" name="features" className="brelyx-textarea" defaultValue={initial?.features?.join("\n")} required />
        </div>

        <div className="ez-admin-form-row">
          <div className="brelyx-form-group">
            <label className="brelyx-form-label" htmlFor="url">Live Site URL (optional)</label>
            <input id="url" name="url" type="url" className="brelyx-input" defaultValue={initial?.url} />
          </div>
          <div className="brelyx-form-group">
            <label className="brelyx-form-label" htmlFor="year">Year (optional)</label>
            <input id="year" name="year" className="brelyx-input" defaultValue={initial?.year} />
          </div>
        </div>

        <div className="brelyx-form-group">
          <label className="brelyx-form-label" htmlFor="highlight">Highlight Quote (optional)</label>
          <input id="highlight" name="highlight" className="brelyx-input" defaultValue={initial?.highlight} />
        </div>
      </div>

      {state?.error && <p className="ez-admin-form-error">{state.error}</p>}

      <div className="ez-admin-form-actions">
        <button type="submit" className="brelyx-btn-primary" disabled={pending}>
          {pending ? "Saving…" : initial ? "Save Changes" : "Create Project"}
        </button>
        <Link href="/admin/projects" className="brelyx-btn-ghost">
          Cancel
        </Link>
      </div>
    </form>
  );
}
