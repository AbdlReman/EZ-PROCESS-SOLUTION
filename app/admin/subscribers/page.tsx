import { getAllSubscribers } from "@/lib/models/subscriber";
import { deleteSubscriber } from "@/lib/actions/subscribers";
import SubscribersTable, { type SubscriberRow } from "@/components/admin/SubscribersTable";

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

export default async function AdminSubscribersPage() {
  const subscribers = await getAllSubscribers();

  const rows: SubscriberRow[] = subscribers.map((s) => ({
    id: s.id,
    email: s.email,
    createdAtIso: s.createdAt,
    dateLabel: formatDate(s.createdAt),
    deleteAction: deleteSubscriber.bind(null, s.id),
  }));

  return (
    <div>
      <div className="ez-admin-page-head">
        <div>
          <h1 className="ez-admin-page-title">Subscribers</h1>
          <p className="ez-admin-page-subtitle">Newsletter signups from your site. Select rows to export or delete in bulk.</p>
        </div>
      </div>

      <SubscribersTable items={rows} />
    </div>
  );
}
