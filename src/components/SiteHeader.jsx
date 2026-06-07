"use client";

import { SITE_LOGO_SVG_PATH } from "@/lib/siteMetadata";
import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="home-v2-nav">
      <Link href="/" className="home-v2-brand" onClick={() => setMobileMenuOpen(false)}>
        <img
          src={SITE_LOGO_SVG_PATH}
          alt="NoLogin"
          width={28}
          height={28}
          className="home-v2-brand-logo"
          fetchPriority="high"
        />
        <span>NoLogin</span>
      </Link>
      <button
        type="button"
        className="home-v2-menu-btn"
        aria-label="Toggle navigation"
        aria-expanded={mobileMenuOpen}
        onClick={() => setMobileMenuOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={`home-v2-links ${mobileMenuOpen ? "home-v2-links-open" : ""}`}>
        <Link href="/" onClick={() => setMobileMenuOpen(false)}>
          Home
        </Link>
        <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
          About
        </Link>
        <Link href="/features-of-nologin" onClick={() => setMobileMenuOpen(false)}>
          Features
        </Link>
        <Link href="/why-nologin" onClick={() => setMobileMenuOpen(false)}>
          Why NoLogin
        </Link>
        <Link href="/faq" onClick={() => setMobileMenuOpen(false)}>
          FAQ
        </Link>
      </nav>
    </header>
  );
}
