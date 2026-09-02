import { sanitizeRichHtml } from "@/lib/sanitizeHtml";

export default function BlogHtmlContent({ html }: { html: string }) {
  const clean = sanitizeRichHtml(html);
  return <div className="lt-article-body" dangerouslySetInnerHTML={{ __html: clean }} />;
}
