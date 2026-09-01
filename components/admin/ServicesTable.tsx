"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DeleteButton from "./DeleteButton";
import { IconSearch, IconEdit, IconInbox } from "./icons";

export type ServiceRow = {
  id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  deleteAction: () => Promise<void>;
};

export default function ServicesTable({ items }: { items: ServiceRow[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (s) => s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || s.slug.toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <div className="ez-admin-panel">
      <div className="ez-admin-panel-head">
        <span className="ez-admin-panel-title">{items.length} service{items.length === 1 ? "" : "s"}</span>
        <div className="ez-admin-search">
          <IconSearch />
          <input
            type="text"
            placeholder="Search services…"
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
          <div className="ez-admin-empty-title">{items.length === 0 ? "No services yet" : "No matches"}</div>
          <p className="ez-admin-empty-copy">
            {items.length === 0
              ? "Create your first service to see it show up here."
              : "Try a different search term."}
          </p>
        </div>
      ) : (
        <div className="ez-admin-table-wrap">
          <table className="ez-admin-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Category</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((service) => (
                <tr key={service.id}>
                  <td>
                    <div className="ez-admin-row-item">
                      <div className="ez-admin-row-thumb">
                        <Image src={service.image} alt={service.title} fill className="object-cover object-center" />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div className="ez-admin-row-title">{service.title}</div>
                        <div className="ez-admin-row-sub">/{service.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="ez-admin-badge">{service.category}</span>
                  </td>
                  <td>
                    <div className="ez-admin-row-actions">
                      <Link href={`/admin/services/${service.id}/edit`} className="ez-admin-icon-btn" aria-label="Edit" title="Edit">
                        <IconEdit />
                      </Link>
                      <DeleteButton
                        action={service.deleteAction}
                        confirmMessage={`Delete "${service.title}"? This can't be undone.`}
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
