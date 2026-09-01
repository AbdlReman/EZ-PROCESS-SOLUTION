"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DeleteButton from "./DeleteButton";
import { IconSearch, IconEdit, IconInbox } from "./icons";

export type ProjectRow = {
  id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  deleteAction: () => Promise<void>;
};

export default function ProjectsTable({ items }: { items: ProjectRow[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <div className="ez-admin-panel">
      <div className="ez-admin-panel-head">
        <span className="ez-admin-panel-title">{items.length} project{items.length === 1 ? "" : "s"}</span>
        <div className="ez-admin-search">
          <IconSearch />
          <input
            type="text"
            placeholder="Search projects…"
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
          <div className="ez-admin-empty-title">{items.length === 0 ? "No projects yet" : "No matches"}</div>
          <p className="ez-admin-empty-copy">
            {items.length === 0
              ? "Create your first project to see it show up here."
              : "Try a different search term."}
          </p>
        </div>
      ) : (
        <div className="ez-admin-table-wrap">
          <table className="ez-admin-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Category</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((project) => (
                <tr key={project.id}>
                  <td>
                    <div className="ez-admin-row-item">
                      <div className="ez-admin-row-thumb">
                        <Image src={project.image} alt={project.title} fill className="object-cover object-center" />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div className="ez-admin-row-title">{project.title}</div>
                        <div className="ez-admin-row-sub">/{project.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="ez-admin-badge">{project.category}</span>
                  </td>
                  <td>
                    <div className="ez-admin-row-actions">
                      <Link href={`/admin/projects/${project.id}/edit`} className="ez-admin-icon-btn" aria-label="Edit" title="Edit">
                        <IconEdit />
                      </Link>
                      <DeleteButton
                        action={project.deleteAction}
                        confirmMessage={`Delete "${project.title}"? This can't be undone.`}
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
