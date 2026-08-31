"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 1.5rem" }}>
      <div className="lt-form-card" style={{ width: "100%", maxWidth: "26rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111827", marginBottom: "0.5rem" }}>Sign In</h1>
        <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "2rem" }}>
          Sign in to your account.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label className="lt-form-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="lt-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="lt-form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="lt-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p style={{ fontSize: "0.82rem", color: "#DC2626" }}>{error}</p>
          )}

          <button type="submit" className="lt-btn" disabled={loading} style={{ justifyContent: "center" }}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p style={{ fontSize: "0.82rem", color: "#6B7280", marginTop: "1.5rem", textAlign: "center" }}>
          Don&apos;t have an account?{" "}
          <Link href="/register" style={{ color: "#6C4CFF", fontWeight: 600, textDecoration: "none" }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
