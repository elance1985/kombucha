export type HomepageGuideLink = {
  cardTitle: string;
  expectedUrl: string;
  articleTitle: string;
};

export type ArticleCrossLink = {
  fromSlug: string;
  linkText: string;
  toSlug: string;
  toTitle: string;
};

export const homepageGuideLinks: HomepageGuideLink[] = [
  {
    cardTitle: "Benefici",
    expectedUrl: "/blog/kombucha-benefici",
    articleTitle: "Kombucha benefici: cosa dice davvero la scienza",
  },
  {
    cardTitle: "Cos'è la Kombucha",
    expectedUrl: "/blog/kombucha-cose-davvero",
    articleTitle: "Kombucha: cos'è davvero",
  },
];

export const articleCrossLinks: ArticleCrossLink[] = [
  {
    fromSlug: "kombucha-cose-davvero",
    linkText: "guida ai benefici",
    toSlug: "kombucha-benefici",
    toTitle: "Kombucha benefici: cosa dice davvero la scienza",
  },
  {
    fromSlug: "kombucha-benefici",
    linkText: "cos'è la kombucha",
    toSlug: "kombucha-cose-davvero",
    toTitle: "Kombucha: cos'è davvero",
  },
];
