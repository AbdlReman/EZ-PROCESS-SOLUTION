import type { Metadata } from "next";
import TermsOfServiceContent from "@/components/legal/TermsOfServiceContent";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms and conditions that govern your use of the EZ Process Solution website.",
  path: "/terms-of-service",
});

export default function TermsOfServicePage() {
  return <TermsOfServiceContent />;
}
