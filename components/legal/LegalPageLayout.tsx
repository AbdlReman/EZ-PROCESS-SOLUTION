import type { ReactNode } from "react";

export default function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <main>
        <section className="hero-purple-section" style={{ paddingBottom: "5rem" }}>
          <div className="brelyx-container" style={{ position: "relative" }}>
            <h1 className="slug-h1">{title}</h1>
            <p className="hero-p-sub" style={{ marginBottom: 0 }}>Last updated: {lastUpdated}</p>
          </div>
        </section>

        <section className="lt-section">
          <div className="brelyx-container" style={{ maxWidth: "48rem", margin: "0 auto" }}>
            <div className="lt-article-body">{children}</div>
          </div>
        </section>
      </main>
    </div>
  );
}
