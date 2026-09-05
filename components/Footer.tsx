import Image from "next/image";
import Link from "next/link";

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
                    {label}
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
                <span className="footer-contact-text">support@EZPROCESSSOLUTION.com</span>
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

        <div className="footer-bottom-bar">
          <p className="footer-bottom-text">© {new Date().getFullYear()} EZ Process Solution LLC. All rights reserved.</p>
          <div className="footer-bottom-links">
            {([
              ["Terms of Service", "/terms-of-service"],
              ["Privacy Policy", "/privacy-policy"],
             
            ] as [string, string][]).map(([label, href]) => (
              <Link key={label} href={href} className="brelyx-footer-link">{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
