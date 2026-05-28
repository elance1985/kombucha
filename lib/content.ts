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
    title: "Your First Homemade Kombucha Brew",
    excerpt: "A calm weekend guide to brewing your first fizzy batch.",
    category: "Brewing Basics",
    content:
      "Start with clean equipment, quality tea, and a healthy SCOBY. This placeholder article will later be replaced by MDX or CMS content.",
  },
  {
    slug: "gut-friendly-routines",
    title: "Gut-Friendly Morning Routines",
    excerpt: "Three tiny habits to pair with your daily glass.",
    category: "Wellness",
    content:
      "Keep routines simple and sustainable. This placeholder post is here so blog pages can be built now and connected to real content later.",
  },
  {
    slug: "seasonal-flavors",
    title: "Seasonal Flavor Pairings",
    excerpt: "Fresh ideas for spring and summer fermentation notes.",
    category: "Recipes",
    content:
      "Fruit, herbs, and spices can shape flavor naturally. This placeholder text is a stand-in for future editorial content.",
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return featuredPosts.find((post) => post.slug === slug);
}
