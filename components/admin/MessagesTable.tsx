"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { IconSearch, IconMailOpen, IconInbox } from "./icons";

export type MessageRow = {
  id: string;
  name: string;
  email: string;
  company?: string;
  services: string[];
  source?: string;
  package?: string;
  preview: string;
  dateLabel: string;
  read: boolean;
  deleteAction: () => Promise<void>;
};

export default function MessagesTable({ items }: { items: MessageRow[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        (m.company ?? "").toLowerCase().includes(q) ||
        m.preview.toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <div className="ez-admin-panel">
      <div className="ez-admin-panel-head">
        <span className="ez-admin-panel-title">{items.length} message{items.length === 1 ? "" : "s"}</span>
        <div className="ez-admin-search">
          <IconSearch />
          <input
            type="text"
            placeholder="Search messages…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="ez-admin-empty">
          <div className="ez-admin-empty-icon">
            <IconInbox />
          </div>
          <div className="ez-admin-empty-title">{items.length === 0 ? "No messages yet" : "No matches"}</div>
          <p className="ez-admin-empty-copy">
            {items.length === 0
              ? "Submissions from your contact form will show up here."
              : "Try a different search term."}
          </p>
        </div>
      ) : (
        <div className="ez-admin-table-wrap">
          <table className="ez-admin-table">
            <thead>
              <tr>
                <th>From</th>
                <th>Message</th>
                <th>Interested in</th>
                <th>Received</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} style={{ background: m.read ? undefined : "rgba(108,76,255,0.045)" }}>
                  <td>
                    <Link href={`/admin/messages/${m.id}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      {!m.read && (
                        <span
                          aria-label="Unread"
                          style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--ez-admin-accent)", flexShrink: 0 }}
                        />
                      )}
                      <span style={{ minWidth: 0 }}>
                        <div className="ez-admin-row-title" style={{ fontWeight: m.read ? 700 : 800 }}>{m.name}</div>
                        <div className="ez-admin-row-sub">{m.email}{m.company ? ` · ${m.company}` : ""}</div>
                      </span>
                    </Link>
                  </td>
                  <td style={{ maxWidth: "22rem" }}>
                    <span style={{ color: "var(--ez-admin-text-dim)", fontSize: "0.82rem", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {m.preview}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                      {m.package ? (
                        <span className="ez-admin-badge" style={{ background: "rgba(108,76,255,0.14)" }}>
                          📦 {m.package}
                        </span>
                      ) : m.services.length > 0 ? (
                        <span className="ez-admin-badge">
                          {m.services[0]}{m.services.length > 1 ? ` +${m.services.length - 1}` : ""}
                        </span>
                      ) : (
                        <span style={{ color: "var(--ez-admin-text-dim)", fontSize: "0.78rem" }}>—</span>
                      )}
                    </div>
                  </td>
                  <td style={{ color: "var(--ez-admin-text-dim)", fontSize: "0.82rem", whiteSpace: "nowrap" }}>{m.dateLabel}</td>
                  <td>
                    <div className="ez-admin-row-actions">
                      <Link href={`/admin/messages/${m.id}`} className="ez-admin-icon-btn" aria-label="View" title="View">
                        <IconMailOpen />
                      </Link>
                      <DeleteButton
                        action={m.deleteAction}
                        confirmMessage={`Delete the message from "${m.name}"? This can't be undone.`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
