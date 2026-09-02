import LegalPageLayout from "./LegalPageLayout";

export default function PrivacyPolicyContent() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="September 2, 2026">
      <p>
        EZ Process Solution (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) respects your privacy and is
        committed to protecting the personal information you share with us. This policy explains what we collect,
        why we collect it, and the choices you have.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li><strong>Contact form submissions</strong> — name, email address, company, budget range, requested services, and your message, when you reach out through our contact form.</li>
        <li><strong>Newsletter subscriptions</strong> — your email address, when you subscribe to updates from us.</li>
        <li><strong>Account information</strong> — name and email address for team members who log in to our admin panel.</li>
        <li><strong>Usage data</strong> — standard technical information (such as browser type and pages visited) collected automatically as you browse the site.</li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to inquiries submitted through our contact form.</li>
        <li>To send newsletter updates to subscribers who opt in, and to let you unsubscribe at any time.</li>
        <li>To operate and secure our admin panel and internal tools.</li>
        <li>To maintain, improve, and troubleshoot our website.</li>
      </ul>

      <h2>How we store and share your information</h2>
      <p>
        We use trusted third-party service providers to operate our website and store data on our behalf, including
        a database provider for storing form submissions and subscriber lists, a media provider for hosting images,
        and an email provider for delivering messages submitted through our contact form. We do not sell your
        personal information to third parties.
      </p>

      <h2>Cookies</h2>
      <p>
        We use a minimal, essential cookie to keep administrators securely signed in to our admin panel. We do not
        use advertising or third-party tracking cookies.
      </p>

      <h2>Your rights</h2>
      <p>
        You may request access to, correction of, or deletion of the personal information we hold about you, and
        you can unsubscribe from our newsletter at any time using the link in any email we send. To make a request,
        contact us using the details below.
      </p>

      <h2>Data retention</h2>
      <p>
        We retain contact form submissions and subscriber records for as long as needed to respond to inquiries and
        operate our newsletter, or until you ask us to remove them.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an
        updated &ldquo;Last updated&rdquo; date.
      </p>

      <h2>Contact us</h2>
      <p>
        If you have any questions about this Privacy Policy or how we handle your information, contact us at{" "}
        <a href="mailto:support@ezprocesssolution.com">support@ezprocesssolution.com</a>.
      </p>
    </LegalPageLayout>
  );
}
