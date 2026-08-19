export type Category =
  | "Radio Featured"
  | "Featured"
  | "Toronto"
  | "Montreal, West Island"
  | "Ottawa"
  | "Opinion"
  | "Journeys";

export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: Category;
  author: string;
  publishedAt: string;
  readMinutes: number;
  body: string[];
};

export function slugifyCategory(category: string): string {
  return category.toLowerCase().replace(/[,\s]+/g, "-").replace(/-+$/, "");
}

// Homepage order: one post per section, in this exact sequence.
export const categories: Category[] = [
  "Radio Featured",
  "Featured",
  "Toronto",
  "Montreal, West Island",
  "Ottawa",
  "Opinion",
  "Journeys",
];
