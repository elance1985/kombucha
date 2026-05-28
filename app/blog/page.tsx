import Link from "next/link";
import { featuredPosts } from "@/lib/content";

export default function BlogIndexPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-14 md:px-10">
      <h1 className="text-4xl font-semibold">Blog</h1>
      <p className="mt-3 text-slate-700">
        Placeholder listing page for future long-form articles and guides.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {featuredPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-slate-500">
              {post.category}
            </p>
            <h2 className="mt-2 text-2xl font-semibold">{post.title}</h2>
            <p className="mt-3 text-sm text-slate-600">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-4 inline-block text-sm font-medium text-[var(--kombucha-teal)]"
            >
              Open article
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
