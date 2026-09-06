import Image from "next/image";
import Link from "next/link";

const socialIcons: Record<string, React.ReactNode> = {
  x: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  yt: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a2.994 2.994 0 00-2.107-2.117C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.391.524A2.994 2.994 0 00.502 6.186 31.32 31.32 0 000 12a31.32 31.32 0 00.502 5.814 2.994 2.994 0 002.107 2.117c1.886.524 9.391.524 9.391.524s7.505 0 9.391-.524a2.994 2.994 0 002.107-2.117A31.32 31.32 0 0024 12a31.32 31.32 0 00-.502-5.814zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z" />
    </svg>
  ),
  ig: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" />
    </svg>
  ),
  wa: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.528 5.845L.057 23.268a.75.75 0 00.923.924l5.484-1.476A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.694-.5-5.24-1.378l-.375-.217-3.884 1.046 1.046-3.823-.234-.389A9.959 9.959 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  ),
};

export default function Footer() {
  return (
    <footer className="brelyx-footer">
      <div className="brelyx-container">
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-col footer-col--brand">
            <Image src="/images/logo.png" alt="EZ Process Solution" width={150} height={42} className="object-contain" style={{ marginLeft: 0 }} />
            <p className="footer-copy">
              Designing and delivering technology that keeps you ahead of the curve.
            </p>
            <div className="footer-socials">
              {([
               
                ["x", "X (Twitter)", "https://x.com/ezprocesssol"],
                // ["gh", "GitHub", "#"],
                ["yt", "YouTube", "https://www.youtube.com/@EZPROCESSSOLUTION"],
                ["ig", "Instagram", "https://www.instagram.com/ezprocesssolution/"],
                ["wa", "WhatsApp", "https://wa.me/18433091515"],
              ] as [string, string, string][]).map(([label, title, href]) => {
                const external = href !== "#";
                return (
                  <a
                    key={label}
                    href={href}
                    title={title}
                    className="brelyx-social-link"
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {socialIcons[label] ?? label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div className="footer-col">
            <p className="footer-heading">Services</p>
            <ul className="footer-list">
              {[
                "Web & Custom Software",
                "Mobile & Experience",
                "Cloud, DevOps & Security",
                "Data & AI",
                "UI/UX Design",
                "Digital Strategy & Product Consulting",
              ].map((s) => (
                <li key={s}><Link href="/#services" className="brelyx-footer-link">{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="footer-col">
            <p className="footer-heading">Company</p>
            <ul className="footer-list">
              {([
                ["About Us", "/about"],
                ["Blog", "/blog"],
                ["Portfolio", "/portfolio"],
                ["Industries", "/#industries"],
                ["Contact", "/contact"],
                ["Privacy Policy", "/privacy-policy"],
              ] as [string, string][]).map(([label, href]) => (
                <li key={label}><Link href={href} className="brelyx-footer-link">{label}</Link></li>
              ))}
            </ul>
          </div>


          {/* Contact */}
          <div className="footer-col">
            <p className="footer-heading">Contact</p>
            <ul className="footer-list">
              <li className="footer-contact-row">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="footer-contact-icon">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                <span className="footer-contact-text">support@ezprocesssolution.com</span>
              </li>
              <li className="footer-contact-row">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="footer-contact-icon">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                <span className="footer-contact-text">+1-843-309-1515</span>
              </li>
              <li className="footer-contact-row">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="footer-contact-icon">
                  <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                <span className="footer-contact-text">3217 Blackstone Run, Lawrenceville, GA 30043</span>
              </li>
            </ul>
            <Link href="/contact" className="lt-btn" style={{ fontSize: "0.82rem", padding: "0.7rem 1.25rem", justifyContent: "center" }}>
              Get a Free Quote
            </Link>
          </div>

        </div>

        <div className="footer-payments-bar">
          <span className="footer-payments-label">Cards Accepted</span>
          <Image
            src="/images/payment-cards-row.png"
            alt="Visa, Mastercard, American Express, and Discover accepted"
            width={588}
            height={86}
            className="footer-payments-img"
          />
        </div>

        <div className="footer-bottom-bar">
          <p className="footer-bottom-text">© {new Date().getFullYear()} EZ Process Solution LLC. All rights reserved.</p>
          <div className="footer-bottom-links">
            {([
              ["Terms of Service", "/terms-of-service"],
              ["Privacy Policy", "/privacy-policy"],
              ["Refund & Cancellation Policy", "/refund-policy"],
              ["Client Agreement", "/client-agreement"],
            ] as [string, string][]).map(([label, href]) => (
              <Link key={label} href={href} className="brelyx-footer-link">{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
