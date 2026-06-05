"use client";

export default function NewsletterSignup() {
  return (
    <section id="newsletter" className="scroll-mt-20 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-lg px-4 text-center md:px-6">
        <h2 className="text-2xl font-bold text-brand-charcoal md:text-3xl">
          Resta aggiornato sul Mondo della Kombucha
        </h2>
        <p className="mt-4 text-base leading-relaxed text-brand-charcoal/75">
          Iscriviti e ricevi gratuitamente le nostre guide, ricette e consigli
          direttamente nella tua email
        </p>

        <div className="newsletter-form mt-8">
          <div className="ml-embedded" data-form="xGDQlE" />
        </div>

        <p className="mt-4 text-xs text-brand-charcoal/50">
          Nessuno spam. Puoi cancellarti quando vuoi.
        </p>
      </div>
    </section>
  );
}
