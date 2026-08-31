"use client";

const partners = [
  "HubSpot", "Buzzing", "Beehiive", "Opinari", "Astra-Net",
  "Shopify", "Stripe", "AWS", "Google Cloud", "Azure",
];

export default function HomeTechMarqueeSection() {
  return (
    <div className="partner-strip">
      <div className="brelyx-container">
        <div className="partner-list">
          {partners.map((name) => (
            <span key={name} className="partner-item">{name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
