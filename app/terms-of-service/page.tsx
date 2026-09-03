import type { Metadata } from "next";
import TermsOfServiceContent from "@/components/legal/TermsOfServiceContent";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms and conditions that govern your use of the EZ Process Solution website.",
  path: "/terms-of-service",
});

export default function TermsOfServicePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Terms of Service", path: "/terms-of-service" }])} />
      <TermsOfServiceContent />
    </>
  );
}
