"use client";

import { useState } from "react";
import { faqItems } from "../data/home-data";

export default function HomeFaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="lt-section">
      <div className="brelyx-container">
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 4rem" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="lt-kicker">FAQ</div>
          </div>
          <h2 className="lt-h2">Frequently Asked Questions.</h2>
          <p className="lt-lead" style={{ maxWidth: "480px", margin: "0 auto" }}>
            Got questions? We have answers. Here are some of the most common things clients ask us before getting started.
          </p>
        </div>

        <div className="faq-list">
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`faq-item ${isOpen ? "faq-open" : ""}`}>
                <button
                  className="faq-trigger"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span className="faq-icon">{isOpen ? "−" : "+"}</span>
                </button>
                <div className="faq-body">
                  <div className="faq-body-inner">{item.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
