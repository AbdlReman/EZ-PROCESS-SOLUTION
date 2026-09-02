"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { ServiceDetail } from "@/lib/models/service";
import type { ActionState } from "@/lib/actions/types";
import { useSlugField } from "@/lib/hooks/useSlugField";
import ImageUploadField from "./ImageUploadField";
import RichTextEditor from "./RichTextEditor";

type ServiceFormAction = (prevState: ActionState, formData: FormData) => Promise<ActionState>;

export default function ServiceForm({
  action,
  initial,
}: {
  action: ServiceFormAction;
  initial?: ServiceDetail;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const { slug, onTitleChange, onSlugChange } = useSlugField(initial?.slug);

  const processDefault = initial?.process
    ?.map((step) => `${step.title} | ${step.desc}`)
    .join("\n");

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
            <label className="brelyx-form-label" htmlFor="slug">Slug (URL path, e.g. web-custom-software)</label>
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
          <span className="ez-admin-form-section-copy">Used on service cards and the service detail page.</span>
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
          <span className="ez-admin-form-section-copy">Cover image for this service.</span>
        </div>

        <ImageUploadField name="image" label="Cover Image" defaultValue={initial?.image} />
      </div>

      <div className="ez-admin-form-section">
        <div className="ez-admin-form-section-head">
          <span className="ez-admin-form-section-title">Details</span>
          <span className="ez-admin-form-section-copy">Features, deliverables, tooling, and the process you follow.</span>
        </div>

        <div className="brelyx-form-group">
          <label className="brelyx-form-label" htmlFor="features">Features (one per line)</label>
          <textarea id="features" name="features" className="brelyx-textarea" defaultValue={initial?.features?.join("\n")} required />
        </div>

        <div className="brelyx-form-group">
          <label className="brelyx-form-label" htmlFor="deliverables">Deliverables (one per line)</label>
          <textarea id="deliverables" name="deliverables" className="brelyx-textarea" defaultValue={initial?.deliverables?.join("\n")} required />
        </div>

        <div className="brelyx-form-group">
          <label className="brelyx-form-label" htmlFor="tools">Tools &amp; Tech (comma-separated)</label>
          <input id="tools" name="tools" className="brelyx-input" defaultValue={initial?.tools?.join(", ")} required />
        </div>

        <div className="brelyx-form-group">
          <label className="brelyx-form-label" htmlFor="process">
            Process Steps — one per line, format: <code>Title | Description</code>
          </label>
          <textarea id="process" name="process" className="brelyx-textarea" defaultValue={processDefault} required />
        </div>

        <div className="brelyx-form-group">
          <label className="brelyx-form-label" htmlFor="highlight">Highlight Quote (optional)</label>
          <input id="highlight" name="highlight" className="brelyx-input" defaultValue={initial?.highlight} />
        </div>
      </div>

      {state?.error && <p className="ez-admin-form-error">{state.error}</p>}

      <div className="ez-admin-form-actions">
        <button type="submit" className="brelyx-btn-primary" disabled={pending}>
          {pending ? "Saving…" : initial ? "Save Changes" : "Create Service"}
        </button>
        <Link href="/admin/services" className="brelyx-btn-ghost">
          Cancel
        </Link>
      </div>
    </form>
  );
}
