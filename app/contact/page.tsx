import type { Metadata } from "next";
import ContactContent from "@/components/contact/ContactContent";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with EZ Process Solution to discuss your web, mobile, cloud, or AI project. We respond within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <ContactContent />
    </>
  );
}
