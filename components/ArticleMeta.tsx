import type { ReactNode } from "react";

type ArticleMetaProps = {
  subtitle?: string;
  readingTime?: string;
  level?: string;
};

function ClockIcon() {
  return (
    <svg
      aria-hidden
      className="size-[1.125em] shrink-0 text-brand-green"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  );
}

function LevelIcon() {
  return (
    <svg
      aria-hidden
      className="size-[1.125em] shrink-0 text-brand-amber"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M4 18h16M7 14l3-4 3 3 4-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MetaItem({
  label,
  icon,
  children,
}: {
  label: string;
  icon: ReactNode;
  children: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="sr-only">{label}: </span>
      {icon}
      <span>{children}</span>
    </span>
  );
}

export default function ArticleMeta({
  subtitle,
  readingTime,
  level,
}: ArticleMetaProps) {
  const hasMeta = subtitle || readingTime || level;
  if (!hasMeta) return null;

  const details = [readingTime, level].filter(Boolean);

  return (
    <div
      className="mt-5 rounded-xl border border-brand-green/20 bg-gradient-to-br from-brand-light via-white to-brand-amber/10 px-4 py-4 shadow-sm md:px-5 md:py-4"
      aria-label="Informazioni sull'articolo"
    >
      {subtitle ? (
        <p className="text-base font-semibold leading-snug text-brand-charcoal md:text-lg">
          {subtitle}
        </p>
      ) : null}

      {details.length > 0 ? (
        <p
          className={`flex flex-wrap items-center text-sm font-medium leading-relaxed text-brand-charcoal/80 md:text-[0.9375rem] ${subtitle ? "mt-2.5" : ""}`}
        >
          {readingTime ? (
            <MetaItem label="Tempo di lettura" icon={<ClockIcon />}>
              {readingTime}
            </MetaItem>
          ) : null}
          {readingTime && level ? (
            <span aria-hidden className="mx-2.5 text-brand-charcoal/30">
              ·
            </span>
          ) : null}
          {level ? (
            <MetaItem label="Livello" icon={<LevelIcon />}>
              {level}
            </MetaItem>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}
