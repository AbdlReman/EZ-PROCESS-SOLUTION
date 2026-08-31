"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

const navLinks: [string, string][] = [
  ["Services", "/services"],
  ["Portfolio", "/portfolio"],
  ["Blog", "/blog"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = scrolled || hovered;

  return (
    <>
      {/* ━━━ MOBILE NAV ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="md:hidden">
        <div className={`brelyx-mobile-nav ${menuOpen ? "open" : ""}`}>
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-white transition-colors"
            aria-label="Close"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          {navLinks.map(([label, href]) => (
            <Link key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          {session?.user?.role === "admin" && (
            <Link href="/admin" onClick={() => setMenuOpen(false)}>
              Admin
            </Link>
          )}
          {session ? (
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                signOut();
              }}
            >
              Logout
            </Link>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          )}
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="brelyx-btn-talk">
            Let&apos;s Talk
          </Link>
        </div>
      </div>

      {/* ━━━ HEADER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header
        className={`brelyx-header ${active ? "brelyx-header--active" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="brelyx-container brelyx-header-inner">
          <Link href="/" className="brelyx-header-logo">
            <Image
              src={active ? "/images/logoforlight.png" : "/images/logo.png"}
              alt="EZ Process Solution"
              width={160}
              height={44}
              className="object-contain"
              priority
            />
          </Link>

          <nav className="brelyx-header-nav">
            {navLinks.map(([label, href]) => (
              <Link key={href} href={href} className="brelyx-nav-link">
                {label}
              </Link>
            ))}
          </nav>

          <div className="brelyx-header-actions">
            {session?.user?.role === "admin" && (
              <Link href="/admin" className="brelyx-nav-link hidden md:inline-flex">
                Admin
              </Link>
            )}
            {session ? (
              <button
                type="button"
                onClick={() => signOut()}
                className="brelyx-nav-link hidden md:inline-flex"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                Logout
              </button>
            ) : (
              <Link href="/login" className="brelyx-nav-link hidden md:inline-flex">
                Login
              </Link>
            )}
            <Link href="/contact" className="brelyx-btn-talk hidden md:inline-flex">
              Let&apos;s Talk
            </Link>
            <button
              className={`brelyx-hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
