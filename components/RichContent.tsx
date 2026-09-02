import { sanitizeRichHtml } from "@/lib/sanitizeHtml";

/**
 * Renders sanitized rich-text HTML (from the admin rich text editor) with
 * the shared "article body" typography used across detail pages.
 */
export default function RichContent({
  html,
  className = "lt-article-body",
}: {
  html: string;
  className?: string;
}) {
  const clean = sanitizeRichHtml(html);
  return <div className={className} dangerouslySetInnerHTML={{ __html: clean }} />;
}
