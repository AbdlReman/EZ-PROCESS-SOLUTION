"use client";

import { useState, useTransition } from "react";
import { uploadImage } from "@/lib/actions/upload";

export default function ImageUploadField({
  name,
  label,
  defaultValue = "",
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setError(null);
    const formData = new FormData();
    formData.set("file", file);

    startTransition(async () => {
      const result = await uploadImage(formData);
      if (result.error) {
        setError(result.error);
        return;
      }
      if (result.url) {
        setValue(result.url);
      }
    });
  }

  return (
    <div>
      <label className="brelyx-form-label">{label}</label>
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", marginTop: "0.4rem" }}>
        {value && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt=""
            style={{ width: "64px", height: "64px", objectFit: "cover", borderRadius: "0.6rem", border: "1px solid rgba(30,38,72,0.9)", flexShrink: 0 }}
          />
        )}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <input
            type="text"
            name={name}
            className="brelyx-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Image URL, or upload a file below"
            required
          />
          <input type="file" accept="image/*" onChange={handleFileChange} disabled={pending} style={{ fontSize: "0.8rem", color: "#a4acc9" }} />
          {pending && <span style={{ fontSize: "0.78rem", color: "#8892b0" }}>Uploading…</span>}
          {error && <span style={{ fontSize: "0.78rem", color: "#F87171" }}>{error}</span>}
        </div>
      </div>
    </div>
  );
}
