import type { Metadata } from "next";
import ClientAgreementContent from "@/components/legal/ClientAgreementContent";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Client Agreement & Service Terms",
  description: "The general terms that govern software development and consulting engagements with EZ Process Solution.",
  path: "/client-agreement",
});

export default function ClientAgreementPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Client Agreement & Service Terms", path: "/client-agreement" }])} />
      <ClientAgreementContent />
    </>
  );
}
