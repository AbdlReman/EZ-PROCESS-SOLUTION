import DOMPurify from "isomorphic-dompurify";

export default function BlogHtmlContent({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html);
  return <div className="lt-article-body" dangerouslySetInnerHTML={{ __html: clean }} />;
}
