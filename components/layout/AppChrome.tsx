"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import NewsletterSection from "@/components/layout/NewsletterSection";

/**
 * Renders the public site chrome (header, footer, WhatsApp widget) on every
 * route except the admin panel, which has its own sidebar/topbar shell and
 * must never show the marketing navbar.
 */
export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <NewsletterSection />
      <Footer />
      <WhatsAppWidget />
    </>
  );
}
