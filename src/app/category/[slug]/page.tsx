import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import { categories, getArticlesByCategory, slugifyCategory } from "@/lib/articles";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: slugifyCategory(category) }));
}

function resolveCategory(slug: string) {
  return categories.find((c) => slugifyCategory(c) === slug.toLowerCase());
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = resolveCategory(slug);
  if (!category) return {};
  return { title: category };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = resolveCategory(slug);
  if (!category) notFound();

  const articles = getArticlesByCategory(category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        {category}
      </h1>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        {articles.length} {articles.length === 1 ? "story" : "stories"}
      </p>

      {articles.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-zinc-500 dark:text-zinc-400">
          No stories in this section yet — check back soon.
        </p>
      )}
    </div>
  );
}
