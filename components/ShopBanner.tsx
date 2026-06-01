import Link from "next/link";

export default function ShopBanner() {
  return (
    <section className="bg-brand-green py-14 md:py-16">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <h2 className="text-2xl font-bold text-white md:text-3xl">
          Il nostro Shop apre presto
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/90 md:text-lg">
          Kit per fare la kombucha in casa, kombucha artigianale, libri e molto
          altro
        </p>
        <Link
          href="#newsletter"
          className="mt-8 inline-flex items-center justify-center rounded-full border-2 border-brand-amber px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-amber hover:text-brand-charcoal md:text-base"
        >
          Avvisami quando apre →
        </Link>
      </div>
    </section>
  );
}
