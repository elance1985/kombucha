import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleMeta from "@/components/ArticleMeta";
import PageShell from "@/components/PageShell";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import { compilePostMdx } from "@/lib/mdx";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Articolo non trovato — Mondo Kombucha" };
  return {
    title: `${post.title} — Mondo Kombucha`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const body = await compilePostMdx(post.content);

  return (
    <PageShell className="bg-white">
      <main className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <Link
          href="/blog"
          className="text-sm font-medium text-brand-green transition-colors hover:underline"
        >
          ← Torna al blog
        </Link>

        <article className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
            {post.category}
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-brand-charcoal md:text-4xl">
            {post.title}
          </h1>
          {post.draft ? (
            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-brand-amber">
              Anteprima — contenuto completo in arrivo
            </p>
          ) : null}
          <ArticleMeta
            subtitle={post.subtitle}
            readingTime={post.readingTime}
            level={post.level}
          />
          <div className="mt-8 rounded-xl border border-gray-100 bg-brand-light p-6 md:p-8">
            {body}
          </div>
        </article>

        <div className="mt-10 flex flex-col gap-3 border-t border-gray-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/blog"
            className="text-sm font-medium text-brand-charcoal/70 transition-colors hover:text-brand-green"
          >
            Tutti gli articoli
          </Link>
          <Link
            href="/#newsletter"
            className="text-sm font-medium text-brand-green transition-colors hover:underline"
          >
            Iscriviti alla newsletter →
          </Link>
        </div>
      </main>
    </PageShell>
  );
}
