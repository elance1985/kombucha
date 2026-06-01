export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
};

export const featuredPosts: Post[] = [
  {
    slug: "first-brew",
    title: "La tua prima kombucha fatta in casa",
    excerpt:
      "Una guida rilassata per preparare il tuo primo lotto frizzante nel weekend.",
    category: "Basi della fermentazione",
    content:
      "Inizia con attrezzatura pulita, tè di qualità e uno Scoby sano. Questo articolo segnaposto sarà sostituito in futuro da contenuti MDX o da un CMS.",
  },
  {
    slug: "gut-friendly-routines",
    title: "Routine mattutine amiche del benessere",
    excerpt: "Tre piccole abitudini da abbinare al tuo bicchiere quotidiano.",
    category: "Benessere",
    content:
      "Mantieni le routine semplici e sostenibili. Questo post segnaposto è qui per permettere di costruire le pagine del blog ora e collegarle ai contenuti reali in seguito.",
  },
  {
    slug: "seasonal-flavors",
    title: "Abbinamenti di sapori stagionali",
    excerpt:
      "Idee fresche per note di fermentazione primaverili ed estive.",
    category: "Ricette",
    content:
      "Frutta, erbe e spezie possono modellare il sapore in modo naturale. Questo testo segnaposto è un sostituto temporaneo per i futuri contenuti editoriali.",
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return featuredPosts.find((post) => post.slug === slug);
}
