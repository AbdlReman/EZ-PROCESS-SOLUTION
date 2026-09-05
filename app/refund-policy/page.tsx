import type { Metadata } from "next";
import RefundCancellationPolicyContent from "@/components/legal/RefundCancellationPolicyContent";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Refund & Cancellation Policy",
  description: "How refunds and cancellations work for software development and consulting engagements with EZ Process Solution.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Refund & Cancellation Policy", path: "/refund-policy" }])} />
      <RefundCancellationPolicyContent />
    </>
  );
}
