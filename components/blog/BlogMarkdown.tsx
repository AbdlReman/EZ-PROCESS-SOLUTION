import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

const mdComponents: Components = {
  h2: ({ children }) => (
    <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#111827", lineHeight: 1.35, marginTop: "2.5rem", marginBottom: "1rem" }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", lineHeight: 1.4, marginTop: "2rem", marginBottom: "0.75rem" }}>
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#374151", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p style={{ fontSize: "0.98rem", lineHeight: 1.9, color: "#374151", marginBottom: "1.25rem" }}>
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong style={{ fontWeight: 700, color: "#111827" }}>{children}</strong>
  ),
  a: ({ href, children }) => {
    if (!href) return <span>{children}</span>;
    const external = /^https?:\/\//.test(href);
    const style = { color: "#6C4CFF", fontWeight: 500, textDecoration: "underline", textDecorationColor: "rgba(108,76,255,0.4)" };
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" style={style}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} style={style}>
        {children}
      </Link>
    );
  },
  ul: ({ children }) => (
    <ul style={{ listStyleType: "disc", paddingLeft: "1.25rem", marginBottom: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol style={{ listStyleType: "decimal", paddingLeft: "1.25rem", marginBottom: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "#374151" }}>{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote style={{
      borderLeft: "3px solid #6C4CFF",
      paddingLeft: "1rem",
      margin: "1.5rem 0",
      background: "#F0FBFF",
      borderRadius: "0 0.5rem 0.5rem 0",
      padding: "1rem 1rem 1rem 1.25rem",
      fontStyle: "italic",
      fontSize: "0.92rem",
      lineHeight: 1.8,
      color: "#374151",
    }}>
      {children}
    </blockquote>
  ),
  hr: () => <hr style={{ borderColor: "#E5E7EB", margin: "2.5rem 0" }} />,
  img: ({ src, alt }) => {
    if (!src || typeof src !== "string") return null;
    return (
      <figure style={{ margin: "2rem 0" }}>
        <div style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          borderRadius: "1rem",
          border: "1px solid #E5E7EB",
          aspectRatio: "16/9",
          maxHeight: "24rem",
          background: "#E0F4FD",
        }}>
          <Image
            src={src}
            alt={alt ?? ""}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 42rem"
          />
        </div>
        {alt ? (
          <figcaption style={{ textAlign: "center", fontSize: "0.78rem", color: "#9CA3AF", marginTop: "0.5rem" }}>
            {alt}
          </figcaption>
        ) : null}
      </figure>
    );
  },
};

export default function BlogMarkdown({ markdown }: { markdown: string }) {
  return (
    <div>
      <ReactMarkdown components={mdComponents}>{markdown}</ReactMarkdown>
    </div>
  );
}
