"use client";

import Link from "next/link";

export default function HomeCtaSection() {
  return (
    <div className="dark-cta-band">
      <div className="pointer-events-none absolute inset-0">
        <div style={{ position: "absolute", left: "5%", top: "50%", transform: "translateY(-50%)", width: 360, height: 360, borderRadius: "50%", background: "rgba(108,76,255,0.18)", filter: "blur(100px)" }} />
        <div style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", width: 320, height: 320, borderRadius: "50%", background: "rgba(14,165,233,0.12)", filter: "blur(90px)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="brelyx-container relative">
        <h2 className="dark-cta-h2">
          Apply For Free Guide.<br />Build Yourself With This Free Guide.
        </h2>
        <Link href="/contact" className="dark-cta-btn">Let&apos;s Communicate →</Link>
      </div>
    </div>
  );
}
