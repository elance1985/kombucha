import Link from "next/link";

type Category = {
  emoji: string;
  title: string;
  description: string;
  href?: string;
  cta: string;
  status: "available" | "chapter" | "soon";
};

const categories: Category[] = [
  {
    emoji: "🌟",
    title: "Benefici",
    description: "Scopri perché fa bene alla salute",
    href: "/blog/kombucha-benefici",
    cta: "Leggi la guida →",
    status: "available",
  },
  {
    emoji: "📖",
    title: "Cos'è la Kombucha",
    description: "Storia, origini e curiosità",
    href: "/blog/kombucha-cose-davvero",
    cta: "Leggi la guida →",
    status: "available",
  },
  {
    emoji: "🧪",
    title: "Come Farla in Casa",
    description: "Guida completa per principianti",
    cta: "Presto disponibile",
    status: "soon",
  },
  {
    emoji: "🛒",
    title: "Dove Comprarla",
    description: "I migliori prodotti disponibili in Italia",
    href: "/blog/kombucha-cose-davvero#dove-comprarla",
    cta: "Leggi il capitolo →",
    status: "chapter",
  },
  {
    emoji: "🌱",
    title: "Lo Scoby",
    description: "Tutto sulla madre della kombucha",
    href: "/blog/kombucha-cose-davvero#lo-scoby",
    cta: "Leggi il capitolo →",
    status: "chapter",
  },
  {
    emoji: "❓",
    title: "FAQ",
    description: "Le domande più frequenti",
    href: "/blog/kombucha-cose-davvero#faq",
    cta: "Leggi il capitolo →",
    status: "chapter",
  },
];

const cardClassName =
  "group flex h-full flex-col rounded-xl border-t-4 border-brand-green bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md";

function CategoryCard({ category }: { category: Category }) {
  const content = (
    <>
      <span className="text-3xl" aria-hidden>
        {category.emoji}
      </span>
      <h3 className="mt-4 text-lg font-semibold text-brand-charcoal">
        {category.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-charcoal/70">
        {category.description}
      </p>
      {category.status === "soon" ? (
        <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wide text-brand-amber">
          {category.cta}
        </span>
      ) : (
        <span className="mt-4 text-sm font-medium text-brand-green transition-colors group-hover:underline">
          {category.cta}
        </span>
      )}
    </>
  );

  if (category.href) {
    const className = cardClassName;

    if (category.href.includes("#")) {
      return (
        <a href={category.href} className={className}>
          {content}
        </a>
      );
    }

    return (
      <Link href={category.href} className={className}>
        {content}
      </Link>
    );
  }

  return <article className={cardClassName}>{content}</article>;
}

export default function ContentCategories() {
  return (
    <section id="ricette" className="scroll-mt-20 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 text-center md:mb-12">
          <h2 className="text-2xl font-bold text-brand-charcoal md:text-3xl">
            Esplora il Mondo della Kombucha
          </h2>
          <p className="mt-3 text-base text-brand-charcoal/70 md:text-lg">
            Esplora le nostre guide — altre in arrivo
          </p>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <li
              key={category.title}
              id={category.title === "FAQ" ? "faq" : undefined}
            >
              <CategoryCard category={category} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
