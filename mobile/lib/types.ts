export type Category = "Major News";

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

export function slugifyCategory(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export const categories: Category[] = ["Major News"];
