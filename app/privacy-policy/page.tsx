import type { Metadata } from "next";
import PrivacyPolicyContent from "@/components/legal/PrivacyPolicyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | EZ Process Solution",
  description: "How EZ Process Solution collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
