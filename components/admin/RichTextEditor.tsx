"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

// @tinymce/tinymce-react's Editor touches browser-only globals as soon as it
// renders. Next.js still runs an SSR pass for client components, so
// importing it directly crashes the server render (500) on every admin page
// that uses this field. Loading it with `ssr: false` skips that entirely —
// it only ever mounts in the browser, after hydration.
const Editor = dynamic(() => import("@tinymce/tinymce-react").then((mod) => mod.Editor), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: 400,
        borderRadius: "0.6rem",
        border: "1px solid rgba(30,38,72,0.9)",
        background: "rgba(4,7,32,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#8892b0",
        fontSize: "0.85rem",
      }}
    >
      Loading editor…
    </div>
  ),
});

export default function RichTextEditor({
  name,
  defaultValue = "",
}: {
  name: string;
  defaultValue?: string;
}) {
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input ref={hiddenInputRef} type="hidden" name={name} defaultValue={defaultValue} />
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        initialValue={defaultValue}
        init={{
          height: 400,
          menubar: false,
          // "blockquote" and "hr" are core TinyMCE 6+ commands, not
          // separately-loadable plugins — listing them here makes TinyMCE
          // try (and fail with a 404) to fetch a nonexistent plugin script.
          // Their toolbar buttons below still work without being listed here.
          plugins: ["link", "lists", "image", "code"],
          toolbar:
            "undo redo | blocks | bold italic | bullist numlist blockquote | link image | hr | code",
          content_style: "body { font-family: sans-serif; font-size: 15px; }",
        }}
        onEditorChange={(content) => {
          if (hiddenInputRef.current) {
            hiddenInputRef.current.value = content;
          }
        }}
      />
    </div>
  );
}
