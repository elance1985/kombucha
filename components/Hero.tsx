import Link from "next/link";

function KombuchaJarIcon() {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-32 w-24 text-brand-green opacity-60 md:h-40 md:w-28"
      aria-hidden
    >
      <rect
        x="30"
        y="20"
        width="60"
        height="12"
        rx="4"
        fill="currentColor"
        opacity="0.4"
      />
      <path
        d="M35 32h50c4 0 8 4 8 8v100c0 8-6 14-14 14H41c-8 0-14-6-14-14V40c0-4 4-8 8-8z"
        fill="currentColor"
        opacity="0.25"
      />
      <path
        d="M40 50h40v85c0 5-4 9-9 9H49c-5 0-9-4-9-9V50z"
        fill="currentColor"
        opacity="0.35"
      />
      <circle cx="52" cy="70" r="4" fill="#FFC107" opacity="0.8" />
      <circle cx="68" cy="85" r="3" fill="#FFC107" opacity="0.6" />
      <circle cx="58" cy="100" r="5" fill="#FFC107" opacity="0.7" />
      <ellipse
        cx="60"
        cy="130"
        rx="18"
        ry="6"
        fill="currentColor"
        opacity="0.2"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="bg-brand-light">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:gap-12 md:px-6 md:py-24 lg:py-28">
        <div className="flex flex-col gap-6">
          <h1 className="text-balance text-3xl font-bold leading-tight text-brand-charcoal md:text-4xl lg:text-5xl">
            Benvenuto nel Mondo della Kombucha
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-brand-charcoal/80 md:text-lg">
            Tutto quello che devi sapere sulla kombucha: benefici, ricette, come
            farla in casa e dove comprarla in Italia
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#che-cose"
              className="inline-flex items-center justify-center rounded-full bg-brand-green px-8 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#43a047] hover:shadow-md md:text-base"
            >
              Scopri la Kombucha
            </Link>
            <Link
              href="#newsletter"
              className="text-center text-sm font-medium text-brand-green transition-colors hover:text-[#43a047] hover:underline sm:text-left md:text-base"
            >
              Iscriviti alla newsletter →
            </Link>
          </div>
        </div>

        <div
          className="flex aspect-square max-h-[360px] w-full items-center justify-center rounded-3xl bg-brand-green/10 md:max-h-none md:justify-self-end"
          aria-hidden
        >
          <KombuchaJarIcon />
        </div>
      </div>
    </section>
  );
}
