"use client";

import { useActionState } from "react";
import type { ServiceDetail } from "@/lib/models/service";
import type { ActionState } from "@/lib/actions/types";
import ImageUploadField from "./ImageUploadField";

type ServiceFormAction = (prevState: ActionState, formData: FormData) => Promise<ActionState>;

export default function ServiceForm({
  action,
  initial,
}: {
  action: ServiceFormAction;
  initial?: ServiceDetail;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  const processDefault = initial?.process
    ?.map((step) => `${step.title} | ${step.desc}`)
    .join("\n");

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "42rem" }}>
      <div className="brelyx-form-group">
        <label className="brelyx-form-label" htmlFor="title">Title</label>
        <input id="title" name="title" className="brelyx-input" defaultValue={initial?.title} required />
      </div>

      <div className="brelyx-form-group">
        <label className="brelyx-form-label" htmlFor="slug">Slug (URL path, e.g. web-custom-software)</label>
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

      {state?.error && (
        <p style={{ fontSize: "0.85rem", color: "#F87171" }}>{state.error}</p>
      )}

      <button type="submit" className="brelyx-btn-primary" disabled={pending} style={{ width: "fit-content" }}>
        {pending ? "Saving…" : initial ? "Save Changes" : "Create Service"}
      </button>
    </form>
  );
}
