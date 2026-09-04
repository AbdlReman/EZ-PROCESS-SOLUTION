"use client";

const partners = [
  "HubSpot", "Buzzing", "Beehiive", "Opinari", "Astra-Net",
  "Shopify", "Stripe", "AWS", "Google Cloud", "Azure",
];

export default function HomeTechMarqueeSection() {
  return (
    <div className="partner-strip">
      <div className="brelyx-container">
        <div className="partner-marquee">
          <div className="partner-list">
            {partners.map((name) => (
              <span key={name} className="partner-item">{name}</span>
            ))}
          </div>
          <div className="partner-list partner-list--duplicate" aria-hidden="true">
            {partners.map((name) => (
              <span key={`dup-${name}`} className="partner-item">{name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
