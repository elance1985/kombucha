import Link from "next/link";
import { featuredPosts } from "@/lib/content";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 py-14 md:px-10">
      <section className="rounded-2xl bg-[var(--kombucha-sage)] p-10 md:p-14">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[var(--kombucha-teal)]">
          Kombucha Journal
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
          Fermentation stories for calmer mornings and healthier rituals.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-700">
          Explore simple recipes, ingredient deep-dives, and mindful lifestyle
          notes while we prepare a curated wellness shop.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/blog/first-brew"
            className="rounded-full bg-[var(--kombucha-teal)] px-5 py-3 text-sm font-medium text-white"
          >
            Read a sample post
          </Link>
          <Link
            href="/shop"
            className="rounded-full border border-[var(--kombucha-teal)] px-5 py-3 text-sm font-medium text-[var(--kombucha-teal)]"
          >
            Visit future shop
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Latest Articles</h2>
          <Link href="/blog/first-brew" className="text-sm text-[var(--kombucha-teal)]">
            View sample article
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featuredPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-xs uppercase tracking-[0.15em] text-slate-500">
                {post.category}
              </p>
              <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-block text-sm font-medium text-[var(--kombucha-teal)]"
              >
                Read more
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
