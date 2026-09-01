"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import DeleteButton from "./DeleteButton";
import { bulkDeleteSubscribers, importSubscribers } from "@/lib/actions/subscribers";
import { IconSearch, IconInbox, IconDownload, IconUpload } from "./icons";

export type SubscriberRow = {
  id: string;
  email: string;
  createdAtIso: string;
  dateLabel: string;
  deleteAction: () => Promise<void>;
};

const EMAIL_RE = /[^\s,;<>()"']+@[^\s,;<>()"']+\.[^\s,;<>()"']+/g;

function toCsv(rows: SubscriberRow[]) {
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const header = "email,subscribed_at\n";
  const body = rows.map((r) => `${escape(r.email)},${escape(r.createdAtIso)}`).join("\n");
  return header + body;
}

function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function SubscribersTable({ items }: { items: SubscriberRow[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [pending, startTransition] = useTransition();
  const [importOpen, setImportOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const [importResult, setImportResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => i.email.toLowerCase().includes(q));
  }, [items, query]);

  const allFilteredSelected = filtered.length > 0 && filtered.every((i) => selected.has(i.id));

  function toggleAll() {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allFilteredSelected) {
        filtered.forEach((i) => next.delete(i.id));
      } else {
        filtered.forEach((i) => next.add(i.id));
      }
      return next;
    });
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleExport(scope: "all" | "selected") {
    const rows = scope === "selected" ? items.filter((i) => selected.has(i.id)) : items;
    if (rows.length === 0) return;
    downloadCsv(`subscribers-${scope}-${new Date().toISOString().slice(0, 10)}.csv`, toCsv(rows));
  }

  function handleBulkDelete() {
    if (selected.size === 0) return;
    if (!confirm(`Delete ${selected.size} subscriber${selected.size === 1 ? "" : "s"}? This can't be undone.`)) return;
    const ids = Array.from(selected);
    startTransition(async () => {
      await bulkDeleteSubscribers(ids);
      setSelected(new Set());
      router.refresh();
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? "");
      setImportText((prev) => (prev ? `${prev}\n${text}` : text));
    };
    reader.readAsText(file);
  }

  function handleImport() {
    const found = importText.match(EMAIL_RE) ?? [];
    const unique = Array.from(new Set(found.map((e) => e.toLowerCase())));
    if (unique.length === 0) {
      setImportResult("No valid email addresses found.");
      return;
    }
    startTransition(async () => {
      const result = await importSubscribers(unique);
      setImportResult(`Added ${result.added}, skipped ${result.skipped} (already on the list or invalid).`);
      setImportText("");
      router.refresh();
    });
  }

  return (
    <div className="ez-admin-panel">
      <div className="ez-admin-panel-head">
        <span className="ez-admin-panel-title">{items.length} subscriber{items.length === 1 ? "" : "s"}</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center" }}>
          <div className="ez-admin-search">
            <IconSearch />
            <input
              type="text"
              placeholder="Search subscribers…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="brelyx-btn-ghost ez-admin-btn-sm"
            onClick={() => setImportOpen((v) => !v)}
          >
            <IconUpload />
            Import
          </button>
          <button
            type="button"
            className="brelyx-btn-ghost ez-admin-btn-sm"
            onClick={() => handleExport("all")}
            disabled={items.length === 0}
          >
            <IconDownload />
            Export All
          </button>
        </div>
      </div>

      {importOpen && (
        <div className="ez-admin-import-panel">
          <div className="ez-admin-import-row">
            <div className="ez-admin-import-col">
              <label className="brelyx-form-label">Upload a CSV or TXT file</label>
              <label className="ez-admin-import-file" htmlFor="subscriber-import-file">
                Click to choose a file, or drop one here
              </label>
              <input
                ref={fileInputRef}
                id="subscriber-import-file"
                type="file"
                accept=".csv,.txt"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
            <div className="ez-admin-import-col">
              <label className="brelyx-form-label" htmlFor="subscriber-import-text">Or paste emails</label>
              <textarea
                id="subscriber-import-text"
                className="brelyx-textarea"
                style={{ minHeight: "100px" }}
                placeholder="one@example.com, two@example.com&#10;three@example.com"
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button
              type="button"
              className="brelyx-btn-primary ez-admin-btn-sm"
              onClick={handleImport}
              disabled={pending || !importText.trim()}
            >
              {pending ? "Importing…" : "Import list"}
            </button>
            {importResult && <span className="ez-admin-import-result">{importResult}</span>}
          </div>
        </div>
      )}

      {selected.size > 0 && (
        <div className="ez-admin-selection-bar">
          <span className="ez-admin-selection-count">{selected.size} selected</span>
          <button type="button" className="brelyx-btn-ghost ez-admin-btn-sm" onClick={() => handleExport("selected")}>
            <IconDownload />
            Export Selected
          </button>
          <button type="button" className="ez-admin-link-btn danger" style={{ width: "auto" }} onClick={handleBulkDelete} disabled={pending}>
            {pending ? "Deleting…" : "Delete Selected"}
          </button>
          <button type="button" className="ez-admin-link-btn" style={{ width: "auto" }} onClick={() => setSelected(new Set())}>
            Clear
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="ez-admin-empty">
          <div className="ez-admin-empty-icon">
            <IconInbox />
          </div>
          <div className="ez-admin-empty-title">{items.length === 0 ? "No subscribers yet" : "No matches"}</div>
          <p className="ez-admin-empty-copy">
            {items.length === 0
              ? "Newsletter signups from your site will show up here."
              : "Try a different search term."}
          </p>
        </div>
      ) : (
        <div className="ez-admin-table-wrap">
          <table className="ez-admin-table">
            <thead>
              <tr>
                <th style={{ width: "2.5rem" }}>
                  <input
                    type="checkbox"
                    className="ez-admin-checkbox"
                    checked={allFilteredSelected}
                    onChange={toggleAll}
                    aria-label="Select all"
                  />
                </th>
                <th>Email</th>
                <th>Subscribed</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td>
                    <input
                      type="checkbox"
                      className="ez-admin-checkbox"
                      checked={selected.has(s.id)}
                      onChange={() => toggleOne(s.id)}
                      aria-label={`Select ${s.email}`}
                    />
                  </td>
                  <td>
                    <div className="ez-admin-row-title">{s.email}</div>
                  </td>
                  <td style={{ color: "var(--ez-admin-text-dim)", fontSize: "0.82rem", whiteSpace: "nowrap" }}>{s.dateLabel}</td>
                  <td>
                    <div className="ez-admin-row-actions">
                      <DeleteButton
                        action={s.deleteAction}
                        confirmMessage={`Remove "${s.email}" from your subscriber list?`}
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
