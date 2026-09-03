import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Create Account",
  description: "Create an EZ Process Solution account.",
  path: "/register",
  noIndex: true,
});

export default function RegisterPage() {
  return <RegisterForm />;
}
