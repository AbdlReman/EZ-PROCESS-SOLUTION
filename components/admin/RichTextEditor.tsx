"use client";

import { useRef, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`ez-editor-btn${active ? " active" : ""}`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor, onToggleSource, sourceMode }: { editor: Editor; onToggleSource: () => void; sourceMode: boolean }) {
  const blockValue = editor.isActive("heading", { level: 1 })
    ? "h1"
    : editor.isActive("heading", { level: 2 })
      ? "h2"
      : editor.isActive("heading", { level: 3 })
        ? "h3"
        : "p";

  function setBlock(value: string) {
    const chain = editor.chain().focus();
    if (value === "p") chain.setParagraph().run();
    else chain.setHeading({ level: Number(value.slice(1)) as 1 | 2 | 3 }).run();
  }

  function setLink() {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previousUrl ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  function insertImage() {
    const url = window.prompt("Image URL");
    if (!url) return;
    editor.chain().focus().setImage({ src: url }).run();
  }

  return (
    <div className="ez-editor-toolbar">
      <ToolbarButton label="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={sourceMode || !editor.can().undo()}>
        ↶
      </ToolbarButton>
      <ToolbarButton label="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={sourceMode || !editor.can().redo()}>
        ↷
      </ToolbarButton>
      <div className="ez-editor-divider" />
      <select
        className="ez-editor-select"
        value={blockValue}
        disabled={sourceMode}
        onChange={(e) => setBlock(e.target.value)}
        aria-label="Text style"
      >
        <option value="p">Paragraph</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
      </select>
      <div className="ez-editor-divider" />
      <ToolbarButton label="Bold" active={editor.isActive("bold")} disabled={sourceMode} onClick={() => editor.chain().focus().toggleBold().run()}>
        <strong>B</strong>
      </ToolbarButton>
      <ToolbarButton label="Italic" active={editor.isActive("italic")} disabled={sourceMode} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <em>I</em>
      </ToolbarButton>
      <div className="ez-editor-divider" />
      <ToolbarButton
        label="Bullet list"
        active={editor.isActive("bulletList")}
        disabled={sourceMode}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        •≡
      </ToolbarButton>
      <ToolbarButton
        label="Numbered list"
        active={editor.isActive("orderedList")}
        disabled={sourceMode}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1≡
      </ToolbarButton>
      <ToolbarButton
        label="Blockquote"
        active={editor.isActive("blockquote")}
        disabled={sourceMode}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        &ldquo;
      </ToolbarButton>
      <div className="ez-editor-divider" />
      <ToolbarButton label="Link" active={editor.isActive("link")} disabled={sourceMode} onClick={setLink}>
        🔗
      </ToolbarButton>
      <ToolbarButton label="Image" disabled={sourceMode} onClick={insertImage}>
        🖼
      </ToolbarButton>
      <ToolbarButton label="Horizontal rule" disabled={sourceMode} onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        ―
      </ToolbarButton>
      <div className="ez-editor-divider" />
      <ToolbarButton label="Source code" active={sourceMode} onClick={onToggleSource}>
        {"</>"}
      </ToolbarButton>
    </div>
  );
}

export default function RichTextEditor({
  name,
  defaultValue = "",
}: {
  name: string;
  defaultValue?: string;
}) {
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [sourceMode, setSourceMode] = useState(false);
  const [sourceHtml, setSourceHtml] = useState(defaultValue);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, autolink: true }),
      Image,
    ],
    content: defaultValue,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setSourceHtml(html);
      if (hiddenInputRef.current) hiddenInputRef.current.value = html;
    },
  });

  function toggleSource() {
    if (!editor) return;
    if (!sourceMode) {
      setSourceHtml(editor.getHTML());
      setSourceMode(true);
    } else {
      editor.commands.setContent(sourceHtml);
      if (hiddenInputRef.current) hiddenInputRef.current.value = sourceHtml;
      setSourceMode(false);
    }
  }

  return (
    <div>
      <input ref={hiddenInputRef} type="hidden" name={name} defaultValue={defaultValue} />
      <div className="ez-editor-shell">
        {editor && <Toolbar editor={editor} sourceMode={sourceMode} onToggleSource={toggleSource} />}
        {sourceMode ? (
          <textarea
            className="ez-editor-source"
            value={sourceHtml}
            onChange={(e) => {
              setSourceHtml(e.target.value);
              if (hiddenInputRef.current) hiddenInputRef.current.value = e.target.value;
            }}
          />
        ) : (
          <div className="ez-editor-content">
            <EditorContent editor={editor} />
          </div>
        )}
      </div>
    </div>
  );
}
