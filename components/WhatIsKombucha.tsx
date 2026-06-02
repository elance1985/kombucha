const features = [
  { emoji: "🌿", label: "100% Naturale" },
  { emoji: "🫧", label: "Ricca di Probiotici" },
  { emoji: "⚡", label: "Energizzante" },
];

export default function WhatIsKombucha() {
  return (
    <section id="che-cose" className="scroll-mt-20 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
          Che cos&apos;è?
        </p>
        <h2 className="text-balance text-2xl font-bold text-brand-charcoal md:text-3xl">
          La bevanda fermentata che sta conquistando l&apos;Italia
        </h2>
        <p className="mt-5 text-base leading-relaxed text-brand-charcoal/80 md:text-lg">
          La kombucha è una bevanda leggermente frizzante ottenuta dalla
          fermentazione del tè dolce con una coltura di batteri e lieviti
          benefici, chiamato Scoby. Dal sapore acidulo e rinfrescante, è
          amata da chi cerca un&apos;alternativa naturale alle bibite
          zuccherate — e sta diventando sempre più popolare anche in Italia.
        </p>

        <ul className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          {features.map((item) => (
            <li
              key={item.label}
              className="inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-light px-5 py-2.5 text-sm font-medium text-brand-charcoal"
            >
              <span aria-hidden>{item.emoji}</span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
