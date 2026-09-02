"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { ServicePackage } from "@/lib/models/package";
import type { ActionState } from "@/lib/actions/types";

type PackageFormAction = (prevState: ActionState, formData: FormData) => Promise<ActionState>;

export default function PackageForm({
  action,
  services,
  initial,
}: {
  action: PackageFormAction;
  services: { id: string; title: string }[];
  initial?: ServicePackage;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="ez-admin-form-card">
      <div className="ez-admin-form-section">
        <div className="ez-admin-form-section-head">
          <span className="ez-admin-form-section-title">Service</span>
          <span className="ez-admin-form-section-copy">Which service this package belongs to.</span>
        </div>

        <div className="brelyx-form-group">
          <label className="brelyx-form-label" htmlFor="serviceId">Service</label>
          <select
            id="serviceId"
            name="serviceId"
            className="brelyx-select"
            defaultValue={initial?.serviceId ?? ""}
            required
          >
            <option value="" disabled>
              Select a service…
            </option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="ez-admin-form-section">
        <div className="ez-admin-form-section-head">
          <span className="ez-admin-form-section-title">Package details</span>
          <span className="ez-admin-form-section-copy">Shown as a pricing card on the service&apos;s detail page.</span>
        </div>

        <div className="ez-admin-form-row">
          <div className="brelyx-form-group">
            <label className="brelyx-form-label" htmlFor="name">Package Name</label>
            <input id="name" name="name" className="brelyx-input" placeholder="Basic, Standard, Premium…" defaultValue={initial?.name} required />
          </div>
          <div className="brelyx-form-group">
            <label className="brelyx-form-label" htmlFor="price">Price</label>
            <input id="price" name="price" className="brelyx-input" placeholder="$499" defaultValue={initial?.price} required />
          </div>
          <div className="brelyx-form-group">
            <label className="brelyx-form-label" htmlFor="deliveryTime">Delivery Time (optional)</label>
            <input id="deliveryTime" name="deliveryTime" className="brelyx-input" placeholder="5 days" defaultValue={initial?.deliveryTime} />
          </div>
        </div>

        <div className="brelyx-form-group">
          <label className="brelyx-form-label" htmlFor="description">Short Description</label>
          <textarea id="description" name="description" className="brelyx-textarea" defaultValue={initial?.description} required />
        </div>

        <div className="brelyx-form-group">
          <label className="brelyx-form-label" htmlFor="features">What&apos;s Included (one per line)</label>
          <textarea id="features" name="features" className="brelyx-textarea" defaultValue={initial?.features?.join("\n")} />
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.85rem", color: "#c8cfe8", cursor: "pointer" }}>
          <input type="checkbox" name="highlight" defaultChecked={initial?.highlight} style={{ width: 16, height: 16 }} />
          Mark as &ldquo;Most Popular&rdquo;
        </label>
      </div>

      {state?.error && <p className="ez-admin-form-error">{state.error}</p>}

      <div className="ez-admin-form-actions">
        <button type="submit" className="brelyx-btn-primary" disabled={pending}>
          {pending ? "Saving…" : initial ? "Save Changes" : "Create Package"}
        </button>
        <Link href="/admin/packages" className="brelyx-btn-ghost">
          Cancel
        </Link>
      </div>
    </form>
  );
}
