import Image from "next/image";

export default function HomeTestimonialsSection() {
  return (
    <section className="lt-section">
      <div className="brelyx-container">
        <div className="clients-grid">
          {/* Left — image */}
          <div className="clients-img-wrap">
            <Image
              src="/images/281.jpg"
              alt="Our Client Support Team"
              fill
              className="object-cover"
            />
          </div>

          {/* Right — content */}
          <div>
            <div className="lt-kicker">Creative Solutions</div>
            <h2 className="lt-h2" style={{ marginBottom: "1.25rem" }}>
              Clients Adore Our Support Staff, And You Will Too
            </h2>
            <p className="lt-lead" style={{ marginBottom: "2rem" }}>
              Best solutions for your business. We create ideas and educate for your problem and
              more growth solutions. We offer a range of services to our clients tailored to help
              them succeed.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="clients-feature">
                <div className="clients-feature-icon">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="clients-feature-title">High Standard</div>
                  <p className="clients-feature-text">
                    We maintain the highest quality standards in every project we deliver,
                    ensuring your product exceeds expectations every time.
                  </p>
                </div>
              </div>

              <div className="clients-feature">
                <div className="clients-feature-icon">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="clients-feature-title">Focus On People</div>
                  <p className="clients-feature-text">
                    Our people-first approach means dedicated support, transparent communication,
                    and a team that genuinely cares about your success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
