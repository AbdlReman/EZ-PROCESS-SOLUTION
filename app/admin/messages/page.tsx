import { getAllMessages } from "@/lib/models/message";
import { deleteMessage } from "@/lib/actions/messages";
import MessagesTable, { type MessageRow } from "@/components/admin/MessagesTable";

function formatDate(iso: string) {
  const date = new Date(iso);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function AdminMessagesPage() {
  const messages = await getAllMessages();

  const rows: MessageRow[] = messages.map((m) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    company: m.company,
    services: m.services,
    source: m.source,
    package: m.package,
    preview: m.message.length > 140 ? `${m.message.slice(0, 140)}…` : m.message,
    dateLabel: formatDate(m.createdAt),
    read: m.read,
    deleteAction: deleteMessage.bind(null, m.id),
  }));

  return (
    <div>
      <div className="ez-admin-page-head">
        <div>
          <h1 className="ez-admin-page-title">Messages</h1>
          <p className="ez-admin-page-subtitle">Submissions from your site&apos;s contact form.</p>
        </div>
      </div>

      <MessagesTable items={rows} />
    </div>
  );
}
