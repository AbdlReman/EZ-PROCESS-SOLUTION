import type { Metadata } from "next";
import TermsOfServiceContent from "@/components/legal/TermsOfServiceContent";

export const metadata: Metadata = {
  title: "Terms of Service | EZ Process Solution",
  description: "The terms and conditions that govern your use of the EZ Process Solution website.",
};

export default function TermsOfServicePage() {
  return <TermsOfServiceContent />;
}
