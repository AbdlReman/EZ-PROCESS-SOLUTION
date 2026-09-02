"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { IconSearch, IconEdit, IconInbox } from "./icons";

export type PackageRow = {
  id: string;
  serviceTitle: string;
  name: string;
  price: string;
  highlight?: boolean;
  deleteAction: () => Promise<void>;
};

export default function PackagesTable({ items }: { items: PackageRow[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (p) => p.name.toLowerCase().includes(q) || p.serviceTitle.toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <div className="ez-admin-panel">
      <div className="ez-admin-panel-head">
        <span className="ez-admin-panel-title">{items.length} package{items.length === 1 ? "" : "s"}</span>
        <div className="ez-admin-search">
          <IconSearch />
          <input
            type="text"
            placeholder="Search packages…"
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
          <div className="ez-admin-empty-title">{items.length === 0 ? "No packages yet" : "No matches"}</div>
          <p className="ez-admin-empty-copy">
            {items.length === 0
              ? "Create your first package to see it show up here."
              : "Try a different search term."}
          </p>
        </div>
      ) : (
        <div className="ez-admin-table-wrap">
          <table className="ez-admin-table">
            <thead>
              <tr>
                <th>Package</th>
                <th>Service</th>
                <th>Price</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((pkg) => (
                <tr key={pkg.id}>
                  <td>
                    <div className="ez-admin-row-title">
                      {pkg.name}
                      {pkg.highlight && (
                        <span className="ez-admin-badge" style={{ marginLeft: "0.6rem" }}>Popular</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: "0.85rem", color: "var(--ez-admin-text-muted)" }}>{pkg.serviceTitle}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: "0.85rem", color: "var(--ez-admin-text)" }}>{pkg.price}</span>
                  </td>
                  <td>
                    <div className="ez-admin-row-actions">
                      <Link href={`/admin/packages/${pkg.id}/edit`} className="ez-admin-icon-btn" aria-label="Edit" title="Edit">
                        <IconEdit />
                      </Link>
                      <DeleteButton
                        action={pkg.deleteAction}
                        confirmMessage={`Delete "${pkg.name}"? This can't be undone.`}
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
