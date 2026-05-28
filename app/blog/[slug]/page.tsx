import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/content";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-14 md:px-10">
      <Link href="/" className="text-sm text-[var(--kombucha-teal)]">
        Back to home
      </Link>
      <article className="mt-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.15em] text-slate-500">
          {post.category}
        </p>
        <h1 className="mt-2 text-4xl font-semibold">{post.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-700">
          {post.content}
        </p>
      </article>
    </main>
  );
}
