import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";

const exploreLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/#ricette", label: "Ricette" },
  { href: "/blog/kombucha-cose-davvero#faq", label: "FAQ" },
];

const shopLinks = [
  { href: "/shop", label: "Prodotti" },
  { href: "/shop", label: "Kit Kombucha" },
  { href: "/shop", label: "Libri" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-block transition-opacity hover:opacity-80">
              <BrandLogo variant="footer" />
            </Link>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
              Esplora
            </h3>
            <ul className="space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  {link.href.includes("#") ? (
                    <a
                      href={link.href}
                      className="text-sm text-white/80 transition-colors hover:text-brand-amber"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 transition-colors hover:text-brand-amber"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
              Shop
            </h3>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-brand-amber"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="text-center text-xs text-white/50 md:text-left">
            © 2026 Mondo Kombucha · mondokombucha.it · Tutti i diritti riservati
          </p>
        </div>
      </div>
    </footer>
  );
}
