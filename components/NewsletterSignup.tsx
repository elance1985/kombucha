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

        <form
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Indirizzo email
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            required
            placeholder="La tua email"
            className="flex-1 rounded-full border border-gray-200 px-5 py-3 text-sm text-brand-charcoal outline-none transition-colors placeholder:text-gray-400 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
          />
          <button
            type="submit"
            className="rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#43a047] hover:shadow-md"
          >
            Iscriviti Gratis
          </button>
        </form>

        <p className="mt-4 text-xs text-brand-charcoal/50">
          Nessuno spam. Puoi cancellarti quando vuoi.
        </p>
      </div>
    </section>
  );
}
