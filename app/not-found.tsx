import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or may have been moved.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <main>
        <section className="hero-purple-section" style={{ paddingBottom: "5rem" }}>
          <div className="brelyx-container" style={{ position: "relative", textAlign: "center" }}>
            <div className="hero-p-badge">● 404</div>
            <h1 className="hero-p-h1">Page not found</h1>
            <p className="hero-p-sub" style={{ margin: "0 auto 2rem" }}>
              The page you&apos;re looking for doesn&apos;t exist or may have been moved.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/" className="hero-p-btn">Back to Home →</Link>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.9rem 2rem", borderRadius: "999px",
                  border: "1.5px solid rgba(255,255,255,0.25)", background: "transparent",
                  color: "#ffffff", fontSize: "0.95rem", fontWeight: 600, textDecoration: "none",
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
