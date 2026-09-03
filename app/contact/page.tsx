import type { Metadata } from "next";
import ContactContent from "@/components/contact/ContactContent";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with EZ Process Solution to discuss your web, mobile, cloud, or AI project. We respond within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactContent />;
}
