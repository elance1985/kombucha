const categories = [
  {
    emoji: "🌟",
    title: "Benefici",
    description: "Scopri perché fa bene alla salute",
  },
  {
    emoji: "📖",
    title: "Cos'è la Kombucha",
    description: "Storia, origini e curiosità",
  },
  {
    emoji: "🧪",
    title: "Come Farla in Casa",
    description: "Guida completa per principianti",
  },
  {
    emoji: "🛒",
    title: "Dove Comprarla",
    description: "I migliori prodotti disponibili in Italia",
  },
  {
    emoji: "🌱",
    title: "Lo Scoby",
    description: "Tutto sulla madre della kombucha",
  },
  {
    emoji: "❓",
    title: "FAQ",
    description: "Le domande più frequenti",
  },
];

export default function ContentCategories() {
  return (
    <section id="ricette" className="scroll-mt-20 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 text-center md:mb-12">
          <h2 className="text-2xl font-bold text-brand-charcoal md:text-3xl">
            Esplora il Mondo della Kombucha
          </h2>
          <p className="mt-3 text-base text-brand-charcoal/70 md:text-lg">
            Le nostre guide arrivano presto — ecco cosa troverai
          </p>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <li key={cat.title} id={cat.title === "FAQ" ? "faq" : undefined}>
              <article className="group flex h-full flex-col rounded-xl border-t-4 border-brand-green bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <span className="text-3xl" aria-hidden>
                  {cat.emoji}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-brand-charcoal">
                  {cat.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-charcoal/70">
                  {cat.description}
                </p>
                <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wide text-brand-amber">
                  Presto disponibile
                </span>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
