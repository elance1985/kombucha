const reasons = [
  {
    icon: "🇮🇹",
    title: "Solo in Italiano",
    description:
      "Contenuti pensati per il pubblico italiano, chiari e senza complicazioni",
  },
  {
    icon: "🎓",
    title: "Per Tutti i Livelli",
    description:
      "Che tu sia curioso o esperto, trovi quello che cerchi",
  },
  {
    icon: "🛍️",
    title: "Prodotti Selezionati",
    description:
      "Kit, libri e accessori scelti con cura per la tua kombucha perfetta",
  },
];

export default function WhyMondoKombucha() {
  return (
    <section className="bg-brand-light py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="mb-10 text-center text-2xl font-bold text-brand-charcoal md:mb-12 md:text-3xl">
          Perché Mondo Kombucha?
        </h2>

        <ul className="grid gap-8 md:grid-cols-3 md:gap-10">
          {reasons.map((item) => (
            <li key={item.title} className="text-center">
              <span
                className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm"
                aria-hidden
              >
                {item.icon}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-brand-charcoal">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/75 md:text-base">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
