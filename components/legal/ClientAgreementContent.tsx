import Link from "next/link";
import LegalPageLayout from "./LegalPageLayout";

export default function ClientAgreementContent() {
  return (
    <LegalPageLayout title="Client Agreement & Service Terms" lastUpdated="September 5, 2026">
      <p>
        This Client Agreement describes the general terms under which EZ Process Solution provides software
        development, design, cloud, AI, and digital strategy services to clients. It applies alongside — and is
        supplemented by — the written proposal, quote, or Statement of Work (&ldquo;SOW&rdquo;) for your specific
        engagement. Where the two conflict, your signed SOW controls.
      </p>

      <h2>Scope of services</h2>
      <p>
        We deliver services described in a written proposal, SOW, or quote agreed with you before work begins.
        Service descriptions on this website are informational and do not themselves constitute an offer or binding
        commitment for a specific project, timeline, or price.
      </p>

      <h2>Fees and invoicing</h2>
      <p>
        Engagements are billed on a fixed-price or time-and-materials basis, as set out in your SOW. Invoices are
        due within 15 days of the invoice date unless otherwise agreed in writing. Late payment may result in work
        being paused until the account is brought current. See our{" "}
        <Link href="/refund-policy">Refund &amp; Cancellation Policy</Link> for how refunds and cancellations are
        handled.
      </p>

      <h2>Client responsibilities</h2>
      <p>
        To keep your project on schedule, you agree to provide timely feedback, access, content, and decisions
        needed for us to do the work. Delays in providing these may extend agreed timelines.
      </p>

      <h2>Intellectual property and ownership</h2>
      <p>
        Upon full and final payment for an engagement, ownership of the custom deliverables created specifically for
        you — such as source code, designs, and documentation produced under that SOW — transfers to you. We retain
        ownership of our own pre-existing tools, frameworks, libraries, and general know-how used to build your
        project, and grant you a license to use them as part of the delivered work. Third-party and open-source
        components remain subject to their own licenses.
      </p>

      <h2>Confidentiality</h2>
      <p>
        Each party agrees to keep the other&rsquo;s confidential business and technical information private, and to
        use it only for the purpose of the engagement.
      </p>

      <h2>Warranty and post-launch support</h2>
      <p>
        We stand behind our work: unless your SOW states otherwise, we will fix defects in the delivered work that
        are reported within 30 days of final delivery, at no additional charge. Ongoing support, new features, and
        changes to requirements outside the original scope are billed separately, typically under a support
        retainer or change order.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, our total liability arising from an engagement is limited to the
        fees actually paid for that engagement. Neither party is liable to the other for indirect, incidental, or
        consequential damages.
      </p>

      <h2>Termination</h2>
      <p>
        Either party may terminate an ongoing engagement as described in our{" "}
        <Link href="/refund-policy">Refund &amp; Cancellation Policy</Link>, which governs notice periods, final
        billing, and delivery of completed work upon termination.
      </p>

      <h2>Governing law</h2>
      <p>
        This Agreement is governed by the laws of the State of Georgia, USA, without regard to its conflict of law
        principles.
      </p>

      <h2>Entire agreement</h2>
      <p>
        This Client Agreement, together with your signed proposal, quote, or SOW, constitutes the entire agreement
        between you and EZ Process Solution for the engagement. In the event of a conflict, the signed SOW takes
        precedence.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about this Client Agreement can be sent to{" "}
        <a href="mailto:support@ezprocesssolution.com">support@ezprocesssolution.com</a> or{" "}
        <a href="tel:+18433091515">+1 (843) 309-1515</a>.
      </p>
    </LegalPageLayout>
  );
}
