"use client";

import { useState } from "react";
import { slugify } from "@/lib/slugify";

/**
 * Keeps a slug field in sync with a title field until the admin edits the
 * slug directly — at which point it stops auto-generating. Starts "touched"
 * when an existing slug is passed in (edit forms), so retyping the title
 * never silently changes an already-published URL.
 */
export function useSlugField(initialSlug?: string) {
  const [slug, setSlug] = useState(initialSlug ?? "");
  const [touched, setTouched] = useState(Boolean(initialSlug));

  function onTitleChange(title: string) {
    if (!touched) setSlug(slugify(title));
  }

  function onSlugChange(value: string) {
    setTouched(true);
    setSlug(value);
  }

  return { slug, onTitleChange, onSlugChange };
}
