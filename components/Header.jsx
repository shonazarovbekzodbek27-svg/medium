"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Bosh sahifa" },
    { href: "/explore", label: "Kashf etish" },
    { href: "/profile", label: "Profil" }
  ];

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Qalam bosh sahifa">
          <span className="brand-mark">q.</span>
          <span>qalam</span>
        </Link>

        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Menyuni ochish"
          aria-expanded={menuOpen}
        >
          ☰
        </button>

        <nav className={`main-nav ${menuOpen ? "nav-open" : ""}`}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={pathname === link.href ? "nav-link active" : "nav-link"}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/write" className="write-button" onClick={() => setMenuOpen(false)}>
            <span aria-hidden="true">＋</span> Maqola yozish
          </Link>
        </nav>
      </div>
    </header>
  );
}
