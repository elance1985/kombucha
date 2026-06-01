import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Shop — Mondo Kombucha",
  description:
    "Kit, kombucha artigianale, libri e accessori selezionati. Il nostro shop apre presto.",
};

export default function ShopPage() {
  return (
    <PageShell className="bg-brand-light">
      <main className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center md:px-6 md:py-24">
        <span className="rounded-full bg-brand-amber px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-charcoal">
          Presto
        </span>
        <h1 className="mt-6 text-3xl font-bold text-brand-charcoal md:text-4xl">
          Il nostro Shop apre presto
        </h1>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-brand-charcoal/75 md:text-lg">
          Stiamo selezionando kit per fare la kombucha in casa, kombucha
          artigianale, libri e accessori pensati per il pubblico italiano.
        </p>

        <ul className="mt-10 grid w-full gap-4 text-left sm:grid-cols-3">
          {[
            {
              emoji: "🧪",
              title: "Kit Kombucha",
              description: "Tutto il necessario per la tua prima fermentazione",
            },
            {
              emoji: "🫙",
              title: "Kombucha artigianale",
              description: "Bevande selezionate disponibili in Italia",
            },
            {
              emoji: "📚",
              title: "Libri e guide",
              description: "Risorse consigliate per imparare e migliorare",
            },
          ].map((item) => (
            <li
              key={item.title}
              className="rounded-xl border-t-4 border-brand-green bg-white p-5 shadow-sm"
            >
              <span className="text-2xl" aria-hidden>
                {item.emoji}
              </span>
              <h2 className="mt-3 font-semibold text-brand-charcoal">
                {item.title}
              </h2>
              <p className="mt-1 text-sm text-brand-charcoal/70">
                {item.description}
              </p>
            </li>
          ))}
        </ul>

        <Link
          href="/#newsletter"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-brand-green px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#43a047] hover:shadow-md md:text-base"
        >
          Avvisami quando apre →
        </Link>
      </main>
    </PageShell>
  );
}
