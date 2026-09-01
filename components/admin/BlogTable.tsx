"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DeleteButton from "./DeleteButton";
import { IconSearch, IconEdit, IconInbox } from "./icons";

export type BlogRow = {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  image: string;
  deleteAction: () => Promise<void>;
};

export default function BlogTable({ items }: { items: BlogRow[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (b) => b.title.toLowerCase().includes(q) || b.category.toLowerCase().includes(q) || b.slug.toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <div className="ez-admin-panel">
      <div className="ez-admin-panel-head">
        <span className="ez-admin-panel-title">{items.length} post{items.length === 1 ? "" : "s"}</span>
        <div className="ez-admin-search">
          <IconSearch />
          <input
            type="text"
            placeholder="Search posts…"
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
          <div className="ez-admin-empty-title">{items.length === 0 ? "No blog posts yet" : "No matches"}</div>
          <p className="ez-admin-empty-copy">
            {items.length === 0
              ? "Publish your first post to see it show up here."
              : "Try a different search term."}
          </p>
        </div>
      ) : (
        <div className="ez-admin-table-wrap">
          <table className="ez-admin-table">
            <thead>
              <tr>
                <th>Post</th>
                <th>Category</th>
                <th>Date</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => (
                <tr key={post.id}>
                  <td>
                    <div className="ez-admin-row-item">
                      <div className="ez-admin-row-thumb">
                        <Image src={post.image} alt={post.title} fill className="object-cover object-center" />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div className="ez-admin-row-title">{post.title}</div>
                        <div className="ez-admin-row-sub">/{post.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="ez-admin-badge">{post.category}</span>
                  </td>
                  <td style={{ color: "var(--ez-admin-text-dim)", fontSize: "0.82rem" }}>{post.date}</td>
                  <td>
                    <div className="ez-admin-row-actions">
                      <Link href={`/admin/blog/${post.id}/edit`} className="ez-admin-icon-btn" aria-label="Edit" title="Edit">
                        <IconEdit />
                      </Link>
                      <DeleteButton
                        action={post.deleteAction}
                        confirmMessage={`Delete "${post.title}"? This can't be undone.`}
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
