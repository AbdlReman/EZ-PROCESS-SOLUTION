"use client";

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
      <button
        type="submit"
        style={{
          fontSize: "0.78rem",
          fontWeight: 600,
          color: "#F87171",
          background: "rgba(248,113,113,0.1)",
          border: "1px solid rgba(248,113,113,0.3)",
          borderRadius: "0.5rem",
          padding: "0.4rem 0.8rem",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </form>
  );
}
