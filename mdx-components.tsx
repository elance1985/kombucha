import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export const mdxComponents: MDXComponents = {
  h2: ({ children, id }) => (
    <h2
      id={id}
      className="scroll-mt-24 mt-8 text-2xl font-bold text-brand-charcoal first:mt-0"
    >
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3
      id={id}
      className="scroll-mt-24 mt-6 text-xl font-semibold text-brand-charcoal"
    >
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-4 text-base leading-relaxed text-brand-charcoal/80 md:text-lg first:mt-0">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-brand-charcoal/80 md:text-lg">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-base leading-relaxed text-brand-charcoal/80 md:text-lg">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-brand-charcoal">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="text-sm text-brand-charcoal/70">{children}</em>
  ),
  a: ({ href, children }) => {
    const className =
      "font-medium text-brand-green underline-offset-2 transition-colors hover:underline";
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={className}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="mt-4 border-l-4 border-brand-green pl-4 italic text-brand-charcoal/70">
      {children}
    </blockquote>
  ),
  img: ({ alt, src }) => (
    <div className="my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt ?? ""}
        className="w-full rounded-xl border border-gray-100 shadow-sm"
        loading="lazy"
      />
    </div>
  ),
};
