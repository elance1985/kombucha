import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "#ricette", label: "Ricette" },
  { href: "/shop", label: "Shop", badge: "Presto" },
  { href: "#newsletter", label: "Newsletter" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <Link
          href="/"
          className="flex shrink-0 items-center transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo.png"
            alt="Mondo Kombucha"
            width={180}
            height={48}
            className="h-10 w-auto md:h-12"
            priority
          />
        </Link>

        <ul className="flex items-center gap-3 overflow-x-auto md:gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex items-center gap-1.5 text-sm font-medium text-brand-charcoal transition-colors hover:text-brand-green md:text-base"
              >
                {link.label}
                {link.badge && (
                  <span className="rounded-full bg-brand-amber px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-charcoal md:text-xs">
                    {link.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
