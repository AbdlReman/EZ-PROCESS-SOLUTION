import { notFound } from "next/navigation";
import Link from "next/link";
import { getMessageById, setMessageRead } from "@/lib/models/message";
import { deleteMessage, setMessageReadStatus } from "@/lib/actions/messages";
import DeleteButton from "@/components/admin/DeleteButton";
import { IconChevronLeft, IconMail } from "@/components/admin/icons";

function formatDate(iso: string) {
  const date = new Date(iso);
  return date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function AdminMessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let message = await getMessageById(id);
  if (!message) notFound();

  // Viewing a message marks it read.
  if (!message.read) {
    const updated = await setMessageRead(message.id, true);
    if (updated) message = updated;
  }

  return (
    <div>
      <Link href="/admin/messages" className="ez-admin-back-link">
        <IconChevronLeft size={13} />
        Back to Messages
      </Link>

      <div className="ez-admin-page-head">
        <div>
          <h1 className="ez-admin-page-title">{message.name}</h1>
          <p className="ez-admin-page-subtitle">
            <a href={`mailto:${message.email}`} style={{ color: "inherit", textDecoration: "none" }}>
              {message.email}
            </a>
          </p>
        </div>
        <a href={`mailto:${message.email}`} className="brelyx-btn-primary ez-admin-btn-sm">
          <IconMail size={15} />
          Reply by email
        </a>
      </div>

      <div className="ez-admin-panel" style={{ maxWidth: "44rem", marginBottom: "1.5rem" }}>
        <div className="ez-admin-panel-body" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
            <div>
              <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ez-admin-text-dim)", fontWeight: 700, marginBottom: "0.35rem" }}>
                Company
              </div>
              <div style={{ fontSize: "0.86rem", color: "#e8eeff" }}>{message.company || "—"}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ez-admin-text-dim)", fontWeight: 700, marginBottom: "0.35rem" }}>
                Budget
              </div>
              <div style={{ fontSize: "0.86rem", color: "#e8eeff" }}>{message.budget || "—"}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ez-admin-text-dim)", fontWeight: 700, marginBottom: "0.35rem" }}>
                Received
              </div>
              <div style={{ fontSize: "0.86rem", color: "#e8eeff" }}>{formatDate(message.createdAt)}</div>
            </div>
            {message.package && (
              <div>
                <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ez-admin-text-dim)", fontWeight: 700, marginBottom: "0.35rem" }}>
                  Package
                </div>
                <div style={{ fontSize: "0.86rem", color: "#e8eeff" }}>📦 {message.package}</div>
              </div>
            )}
            {message.source && (
              <div>
                <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ez-admin-text-dim)", fontWeight: 700, marginBottom: "0.35rem" }}>
                  Source
                </div>
                <div style={{ fontSize: "0.86rem", color: "#e8eeff" }}>{message.source}</div>
              </div>
            )}
          </div>

          {message.services.length > 0 && (
            <div>
              <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ez-admin-text-dim)", fontWeight: 700, marginBottom: "0.5rem" }}>
                Interested in
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {message.services.map((s) => (
                  <span key={s} className="ez-admin-badge">{s}</span>
                ))}
              </div>
            </div>
          )}

          <div style={{ borderTop: "1px solid var(--ez-admin-border-soft)", paddingTop: "1.5rem" }}>
            <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ez-admin-text-dim)", fontWeight: 700, marginBottom: "0.65rem" }}>
              Project Details
            </div>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "#dfe3f5", whiteSpace: "pre-wrap" }}>
              {message.message}
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <form action={setMessageReadStatus.bind(null, message.id, !message.read)}>
          <button type="submit" className="brelyx-btn-ghost ez-admin-btn-sm">
            Mark as {message.read ? "unread" : "read"}
          </button>
        </form>
        <DeleteButton
          action={deleteMessage.bind(null, message.id)}
          confirmMessage={`Delete the message from "${message.name}"? This can't be undone.`}
        />
      </div>
    </div>
  );
}
