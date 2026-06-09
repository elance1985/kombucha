export type CriticalPost = {
  slug: string;
  title: string;
  section: string;
  published: boolean;
};

export const criticalPosts: CriticalPost[] = [
  {
    slug: "kombucha-cose-davvero",
    title: "Kombucha: cos'è davvero",
    section: "1. Kombucha: la definizione che nessuno ti dà per intero",
    published: true,
  },
  {
    slug: "kombucha-benefici",
    title: "Kombucha benefici: cosa dice davvero la scienza",
    section:
      "1. Come leggere la ricerca scientifica sulla kombucha: una guida rapida",
    published: true,
  },
  {
    slug: "first-brew",
    title: "La tua prima kombucha fatta in casa",
    section: "",
    published: false,
  },
];

export const publishedPosts = criticalPosts.filter((post) => post.published);
