import Image from "next/image";
import Link from "next/link";

export default function HomeAboutSection() {
  return (
    <section className="lt-section">
      <div className="brelyx-container">
        <div className="about-grid">
          {/* Left — content */}
          <div>
            <div className="lt-kicker">Get Started</div>
            <h2 className="lt-h2" style={{ marginBottom: "1.25rem" }}>
              Our Journey, Vision,<br />And Values
            </h2>
            <p className="lt-lead" style={{ marginBottom: "1rem" }}>
              Since 2009, EZ Process Solution has been delivering digital products that combine deep technical
              expertise with a genuine understanding of business outcomes. We have helped over 120 ambitious
              teams across 23+ countries launch platforms that scale.
            </p>
            <p className="lt-lead" style={{ marginBottom: "2rem" }}>
              Our values are simple: build with integrity, deliver with precision, and always design for the
              people who use it. From discovery to deployment, we are your growth partner.
            </p>
            <Link href="/about" className="lt-btn">Get Started →</Link>
          </div>

          {/* Right — image */}
          <div className="about-img-wrap">
            <div className="about-img-inner">
              <Image
                src="/images/webportfolio_2.png"
                alt="Our Team"
                fill
                className="object-cover"
              />
            </div>
            <div className="about-star-badge">
              <div className="about-star-text">★★★★★</div>
              <div className="about-star-label">5 Star Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
