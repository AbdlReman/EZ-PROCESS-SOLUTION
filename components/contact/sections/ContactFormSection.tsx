"use client";

import ContactFormPanel from "./ContactFormPanel";
import ContactInfoPanel from "./ContactInfoPanel";

export default function ContactFormSection() {
  return (
    <section className="lt-section">
      <div className="brelyx-container">
        <div className="grid-split-contact">
          <ContactInfoPanel />
          <ContactFormPanel />
        </div>
      </div>
    </section>
  );
}
