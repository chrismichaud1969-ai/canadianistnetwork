export type Category = "Major News";

export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: Category;
  author: string;
  publishedAt: string; // ISO date
  readMinutes: number;
  featured?: boolean;
  body: string[];
};

export function slugifyCategory(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

// NOTE: This is placeholder editorial content so the site has something to
// render out of the box. Swap this module for a real CMS or API feed
// (Sanity, Contentful, WordPress REST API, etc.) when you're ready — every
// page in the app reads through the helpers below, so that's the only file
// that needs to change.
export const articles: Article[] = [
  {
    slug: "ottawa-unveils-housing-plan",
    title: "Ottawa Unveils New National Housing Plan",
    dek: "The federal government says the strategy will fast-track construction in major cities facing acute supply shortages.",
    category: "Major News",
    author: "Marie Tremblay",
    publishedAt: "2026-07-29",
    readMinutes: 5,
    featured: true,
    body: [
      "The federal government announced a sweeping national housing strategy on Tuesday, promising to fast-track permitting and unlock federal land for new construction in cities across the country.",
      "Officials say the plan targets a doubling of the housing construction rate over the next decade, with dedicated funding streams for purpose-built rentals and co-operative housing.",
      "Provincial reaction was mixed, with several premiers welcoming the funding while raising questions about how quickly municipalities can actually approve new projects.",
    ],
  },
  {
    slug: "loonie-steadies-after-rate-decision",
    title: "Loonie Steadies After Bank of Canada Rate Decision",
    dek: "The central bank held its policy rate steady, citing cooling inflation and a softening labour market.",
    category: "Major News",
    author: "Daniel Okafor",
    publishedAt: "2026-07-28",
    readMinutes: 4,
    featured: true,
    body: [
      "The Bank of Canada held its benchmark interest rate unchanged Wednesday, matching economists' expectations after a run of cooler-than-forecast inflation readings.",
      "Governor's remarks pointed to a gradually softening labour market as a key factor in the decision, alongside steady but unspectacular consumer spending.",
      "Markets shrugged off the announcement, with the Canadian dollar trading in a narrow range against its U.S. counterpart through the session.",
    ],
  },
  {
    slug: "toronto-film-festival-lineup",
    title: "Homegrown Films Headline This Year's Festival Lineup",
    dek: "A record number of Canadian features made the cut, organizers say, as the festival leans into local storytelling.",
    category: "Major News",
    author: "Priya Nair",
    publishedAt: "2026-07-27",
    readMinutes: 3,
    body: [
      "Festival organizers unveiled this year's lineup, highlighting a record slate of Canadian-directed features spanning drama, documentary, and animation.",
      "Several selections were shot in Atlantic Canada and the Prairies, part of a broader push to spotlight production outside Toronto and Vancouver.",
      "Tickets for the public program go on sale next week, with galas expected to sell out within hours based on past years.",
    ],
  },
  {
    slug: "raptors-trade-deadline-moves",
    title: "Raptors Make Moves Ahead of Trade Deadline",
    dek: "The front office added size and playoff experience in a flurry of deadline-day trades.",
    category: "Major News",
    author: "Jordan Wick",
    publishedAt: "2026-07-26",
    readMinutes: 4,
    body: [
      "Toronto's front office was active in the hours before the deadline, sending out a future second-round pick in exchange for frontcourt depth.",
      "The moves signal the club's intent to push for a playoff spot down the stretch after a middling first half of the season.",
      "Coaches say the new additions could be in the rotation as soon as this weekend's back-to-back.",
    ],
  },
  {
    slug: "waterloo-startup-ai-chips",
    title: "Waterloo Startup Raises Series B for Efficient AI Chips",
    dek: "The company says its low-power inference chips could cut data centre energy use significantly.",
    category: "Major News",
    author: "Sam Levesque",
    publishedAt: "2026-07-25",
    readMinutes: 5,
    featured: true,
    body: [
      "A Waterloo-based semiconductor startup announced a $48 million Series B round Thursday, led by a Toronto venture fund with participation from two U.S. investors.",
      "The company's inference chips are designed to cut power draw for on-device AI workloads, a growing pain point for data centre operators.",
      "Founders say the funding will go toward scaling manufacturing partnerships and expanding the Waterloo engineering team.",
    ],
  },
  {
    slug: "arctic-shipping-route-talks",
    title: "Arctic Nations Meet Over Shipping Route Rules",
    dek: "Talks focused on safety standards and Indigenous consultation as traffic through northern waters increases.",
    category: "Major News",
    author: "Marie Tremblay",
    publishedAt: "2026-07-24",
    readMinutes: 6,
    body: [
      "Representatives from several Arctic nations met this week to discuss updated safety and environmental standards for commercial shipping through northern waters.",
      "Indigenous leaders from northern communities pressed for a binding consultation process before new routes are approved.",
      "No formal agreement was reached, but delegates described the talks as constructive ahead of a follow-up summit later this year.",
    ],
  },
  {
    slug: "wildfire-season-outlook",
    title: "Forecasters Warn of Above-Average Wildfire Risk",
    dek: "Dry conditions across the West are raising early concerns heading into peak fire season.",
    category: "Major News",
    author: "Daniel Okafor",
    publishedAt: "2026-07-23",
    readMinutes: 4,
    body: [
      "National forecasters issued an early-season advisory Tuesday, warning that persistent dry conditions across several western provinces could lead to an above-average wildfire season.",
      "Provincial fire agencies say they've pre-positioned additional crews and equipment in high-risk zones compared with last year.",
      "Residents in affected areas are being urged to review evacuation plans and sign up for local emergency alerts.",
    ],
  },
  {
    slug: "small-business-export-boom",
    title: "Small Exporters Ride Wave of New Trade Deals",
    dek: "Recent trade agreements are opening doors for smaller manufacturers looking beyond the U.S. market.",
    category: "Major News",
    author: "Priya Nair",
    publishedAt: "2026-07-22",
    readMinutes: 4,
    body: [
      "Small and mid-sized manufacturers are reporting a jump in export inquiries following the ratification of two new trade agreements this spring.",
      "Trade groups say diversification away from a single dominant export market has become a priority for many firms after recent supply chain disruptions.",
      "Government-backed export financing programs have also seen a surge in applications, according to figures released this week.",
    ],
  },
];

export function getAllArticles(): Article[] {
  return [...articles].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)
  );
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter((a) => a.featured);
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

export const categories: Category[] = ["Major News"];
