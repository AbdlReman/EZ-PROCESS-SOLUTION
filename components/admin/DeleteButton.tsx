"use client";

import { IconTrash } from "./icons";

export default function DeleteButton({
  action,
  confirmMessage,
}: {
  action: () => Promise<void>;
  confirmMessage: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      <button type="submit" className="ez-admin-icon-btn danger" aria-label="Delete" title="Delete">
        <IconTrash />
      </button>
    </form>
  );
}
