"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import QuickInquiryModal from "./QuickInquiryModal";

export default function QuickInquiryButton({
  source,
  serviceName,
  packageName,
  defaultMessage,
  className,
  style,
  children,
}: {
  source: string;
  serviceName?: string;
  packageName?: string;
  defaultMessage?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={className} style={style} onClick={() => setOpen(true)}>
        {children}
      </button>
      <QuickInquiryModal
        open={open}
        onClose={() => setOpen(false)}
        source={source}
        serviceName={serviceName}
        packageName={packageName}
        defaultMessage={defaultMessage}
      />
    </>
  );
}
