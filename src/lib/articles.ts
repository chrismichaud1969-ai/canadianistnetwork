export type Category =
  | "Radio Featured"
  | "Featured"
  | "Toronto"
  | "National Politics"
  | "Montreal, West Island"
  | "Opinion"
  | "Journeys";

export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: Category;
  author: string;
  publishedAt: string; // ISO date
  readMinutes: number;
  body: string[];
};

export function slugifyCategory(category: string): string {
  return category.toLowerCase().replace(/[,\s]+/g, "-").replace(/-+$/, "");
}

// NOTE: This is placeholder editorial content so the site has something to
// render out of the box. Swap this module for a real CMS or API feed
// (Sanity, Contentful, WordPress REST API, etc.) when you're ready — every
// page in the app reads through the helpers below, so that's the only file
// that needs to change.
//
// The home page shows one post per category, in the order defined by
// `categories` below — one card each for Radio Featured, Featured, Toronto,
// National Politics, Montreal/West Island, Opinion, and Journeys.
export const articles: Article[] = [
  {
    slug: "morning-drive-mayor-transit-funding",
    title: "Radio Exclusive: Mayor Talks Transit Funding on Morning Drive",
    dek: "In a live interview on The Canadianist Radio, the mayor previewed the city's pitch for new federal transit dollars.",
    category: "Radio Featured",
    author: "The Canadianist Radio Desk",
    publishedAt: "2026-08-13",
    readMinutes: 3,
    body: [
      "Speaking live on Morning Drive, the mayor laid out the city's case for a new round of federal transit funding, pointing to ridership numbers that have climbed steadily since the spring.",
      "The interview touched on timelines for the proposed extension, with the mayor cautioning that federal approval is still the biggest open question.",
      "Listeners can catch the full segment on demand at The Canadianist Radio.",
    ],
  },
  {
    slug: "ottawa-unveils-housing-plan",
    title: "Ottawa Unveils New National Housing Plan",
    dek: "The federal government says the strategy will fast-track construction in major cities facing acute supply shortages.",
    category: "Featured",
    author: "Marie Tremblay",
    publishedAt: "2026-08-12",
    readMinutes: 5,
    body: [
      "The federal government announced a sweeping national housing strategy on Tuesday, promising to fast-track permitting and unlock federal land for new construction in cities across the country.",
      "Officials say the plan targets a doubling of the housing construction rate over the next decade, with dedicated funding streams for purpose-built rentals and co-operative housing.",
      "Provincial reaction was mixed, with several premiers welcoming the funding while raising questions about how quickly municipalities can actually approve new projects.",
    ],
  },
  {
    slug: "toronto-bike-lane-network-approved",
    title: "City Council Approves New Downtown Bike Lane Network",
    dek: "The plan adds protected lanes along three major corridors, with construction starting this fall.",
    category: "Toronto",
    author: "Priya Nair",
    publishedAt: "2026-08-11",
    readMinutes: 4,
    body: [
      "City council voted Wednesday to approve a new network of protected bike lanes spanning three downtown corridors, capping months of debate over road space and business access.",
      "Supporters say the network closes long-standing gaps in the city's cycling grid, while some local business owners raised concerns about loading zones during construction.",
      "Work is expected to begin this fall, with the first corridor slated for completion before next summer.",
    ],
  },
  {
    slug: "federal-budget-talks-resume",
    title: "Federal Budget Talks Resume as Opposition Pushes for Amendments",
    dek: "MPs return to Ottawa this week with spending, housing, and defence commitments still unresolved.",
    category: "National Politics",
    author: "Daniel Okafor",
    publishedAt: "2026-08-10",
    readMinutes: 5,
    body: [
      "Parliament resumes budget negotiations this week, with opposition parties signalling they'll push for amendments on housing and defence spending before offering support.",
      "The finance minister has defended the current spending framework, arguing that further changes risk delaying already-committed infrastructure funding.",
      "A vote is expected within the next two weeks, though the exact timeline remains fluid.",
    ],
  },
  {
    slug: "west-island-highway-expansion-pushback",
    title: "West Island Residents Push Back on Highway Expansion",
    dek: "A packed community meeting raised concerns over noise, traffic, and green space along the proposed route.",
    category: "Montreal, West Island",
    author: "Marie Tremblay",
    publishedAt: "2026-08-09",
    readMinutes: 4,
    body: [
      "Dozens of West Island residents turned out to a community meeting this week to voice concerns over a provincial highway expansion proposal that would run near several residential streets.",
      "Organizers presented alternative routing options they say would reduce the impact on green space, though provincial officials say cost and timeline constraints make changes unlikely at this stage.",
      "A follow-up consultation session is expected to be scheduled for next month.",
    ],
  },
  {
    slug: "opinion-national-housing-strategy-local",
    title: "Why Canada Needs a Housing Strategy That Works Locally",
    dek: "A national plan is only as good as its ability to bend to what individual cities actually need.",
    category: "Opinion",
    author: "Jordan Wick",
    publishedAt: "2026-08-08",
    readMinutes: 6,
    body: [
      "Ottawa's new housing strategy is a welcome step, but the real test will be whether it can flex to the wildly different pressures facing cities from Halifax to Surrey.",
      "A one-size-fits-all funding formula risks shortchanging mid-sized cities that don't have the lobbying power of Toronto or Vancouver.",
      "If this plan is going to work, the federal government needs to build in room for local governments to shape how the money actually gets spent.",
    ],
  },
  {
    slug: "journeys-damascus-to-downtown",
    title: "From Damascus to Downtown: One Family's First Year in Toronto",
    dek: "A Canadianist News Exclusive from our Journeys series, following newcomers building a life in a new city.",
    category: "Journeys",
    author: "Sam Levesque",
    publishedAt: "2026-08-07",
    readMinutes: 7,
    body: [
      "A year ago, the Haddad family arrived in Toronto with three suitcases and little else. Today, their small bakery near Dundas Street has become a neighbourhood fixture.",
      "\"The hardest part wasn't the language,\" says Layla Haddad. \"It was learning how to ask for help — that took longer than the English did.\"",
      "This is the first in an ongoing Journeys series following newcomer families in their first years in Canada.",
    ],
  },
];

export function getAllArticles(): Article[] {
  return [...articles].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  const targetSlug = slugifyCategory(category);
  return getAllArticles().filter(
    (a) => slugifyCategory(a.category) === targetSlug
  );
}

// Homepage order: one post per section, in this exact sequence.
export const categories: Category[] = [
  "Radio Featured",
  "Featured",
  "Toronto",
  "Montreal, West Island",
  "National Politics",
  "Opinion",
  "Journeys",
];

export function getHomepageFeed(): Article[] {
  return categories
    .map((category) => getArticlesByCategory(category)[0])
    .filter((a): a is Article => Boolean(a));
}
