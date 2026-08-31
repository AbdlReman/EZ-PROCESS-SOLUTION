"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { registerUser } from "@/lib/actions/auth";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);

    const result = await registerUser(undefined, formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    const signInResult = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (signInResult?.error) {
      router.push("/login");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 1.5rem" }}>
      <div className="lt-form-card" style={{ width: "100%", maxWidth: "26rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111827", marginBottom: "0.5rem" }}>Create Account</h1>
        <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "2rem" }}>
          New accounts start with standard access.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label className="lt-form-label" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="lt-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              minLength={8}
              required
            />
          </div>

          {error && (
            <p style={{ fontSize: "0.82rem", color: "#DC2626" }}>{error}</p>
          )}

          <button type="submit" className="lt-btn" disabled={loading} style={{ justifyContent: "center" }}>
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <p style={{ fontSize: "0.82rem", color: "#6B7280", marginTop: "1.5rem", textAlign: "center" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#6C4CFF", fontWeight: 600, textDecoration: "none" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
