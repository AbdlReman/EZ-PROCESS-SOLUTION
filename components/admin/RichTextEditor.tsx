"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

export default function RichTextEditor({
  name,
  defaultValue = "",
}: {
  name: string;
  defaultValue?: string;
}) {
  const valueRef = useRef(defaultValue);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input ref={hiddenInputRef} type="hidden" name={name} defaultValue={defaultValue} />
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        initialValue={defaultValue}
        init={{
          height: 500,
          menubar: false,
          plugins: ["link", "lists", "image", "blockquote", "code", "hr"],
          toolbar:
            "undo redo | blocks | bold italic | bullist numlist blockquote | link image | hr | code",
          content_style: "body { font-family: sans-serif; font-size: 15px; }",
        }}
        onEditorChange={(content) => {
          valueRef.current = content;
          if (hiddenInputRef.current) {
            hiddenInputRef.current.value = content;
          }
        }}
      />
    </div>
  );
}
