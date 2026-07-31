export type Category =
  | "Politics"
  | "Business"
  | "Culture"
  | "Sports"
  | "Technology"
  | "World";

export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: Category;
  author: string;
  publishedAt: string;
  readMinutes: number;
  featured?: boolean;
  body: string[];
};

export const categories: Category[] = [
  "Politics",
  "Business",
  "Culture",
  "Sports",
  "Technology",
  "World",
];
