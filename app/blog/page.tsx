import Link from "next/link";
import PageShell from "@/components/PageShell";
import { featuredPosts } from "@/lib/content";

export const metadata = {
  title: "Blog — Mondo Kombucha",
  description:
    "Articoli e guide sulla kombucha in italiano. Contenuti in arrivo presto.",
};

export default function BlogIndexPage() {
  return (
    <PageShell className="bg-brand-light">
      <main className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
            Blog
          </p>
          <h1 className="mt-2 text-3xl font-bold text-brand-charcoal md:text-4xl">
            Guide e articoli sulla kombucha
          </h1>
          <p className="mt-4 text-base leading-relaxed text-brand-charcoal/75 md:text-lg">
            Stiamo preparando articoli approfonditi, ricette e consigli per
            principianti. Nel frattempo, ecco un&apos;anteprima di cosa troverai
            presto.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {featuredPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col rounded-xl border-t-4 border-brand-green bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-green">
                {post.category}
              </p>
              <h2 className="mt-2 text-xl font-semibold text-brand-charcoal">
                {post.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-charcoal/70">
                {post.excerpt}
              </p>
              <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wide text-brand-amber">
                Presto disponibile
              </span>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-3 text-sm font-medium text-brand-green transition-colors group-hover:underline"
              >
                Anteprima articolo →
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-brand-charcoal/60">
          Vuoi essere avvisato quando pubblichiamo?{" "}
          <Link
            href="/#newsletter"
            className="font-medium text-brand-green hover:underline"
          >
            Iscriviti alla newsletter
          </Link>
        </p>
      </main>
    </PageShell>
  );
}
