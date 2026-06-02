"use client";

import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/#ricette", label: "Ricette" },
  { href: "/shop", label: "Shop", badge: "Presto" },
  { href: "/#newsletter", label: "Newsletter" },
];

function NavLink({
  href,
  label,
  badge,
  onNavigate,
  className = "",
}: {
  href: string;
  label: string;
  badge?: string;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`flex items-center gap-2 font-medium text-brand-charcoal transition-colors hover:text-brand-green ${className}`}
    >
      {label}
      {badge && (
        <span className="rounded-full bg-brand-amber px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-charcoal">
          {badge}
        </span>
      )}
    </Link>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-6 w-6 text-brand-charcoal"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      {open ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      )}
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    if (menuOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <BrandLogo
          onClick={closeMenu}
          className="relative z-[60]"
        />

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink
                href={link.href}
                label={link.label}
                badge={link.badge}
                className="text-base"
              />
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          className="relative z-[60] -mr-1 rounded-lg p-2 transition-colors hover:bg-brand-light md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 top-[57px] z-40 bg-brand-charcoal/30 transition-opacity md:hidden ${
          menuOpen
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden={!menuOpen}
      />

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        className={`absolute left-0 right-0 top-full z-50 border-b border-gray-100 bg-white shadow-lg transition-all duration-200 ease-out md:hidden ${
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink
                href={link.href}
                label={link.label}
                badge={link.badge}
                onNavigate={closeMenu}
                className="rounded-lg px-3 py-3 text-base hover:bg-brand-light"
              />
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
