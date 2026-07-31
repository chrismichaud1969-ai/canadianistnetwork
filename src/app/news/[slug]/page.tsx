import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.dek,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getAllArticles()
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href={`/category/${article.category.toLowerCase()}`}
        className="inline-block rounded-full bg-red-600/10 px-2.5 py-0.5 text-xs font-semibold text-red-600"
      >
        {article.category}
      </Link>

      <h1 className="mt-4 text-3xl font-bold leading-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        {article.title}
      </h1>
      <p className="mt-3 text-lg text-zinc-500 dark:text-zinc-400">
        {article.dek}
      </p>
      <p className="mt-4 text-sm text-zinc-400">
        By {article.author} · {formatDate(article.publishedAt)} ·{" "}
        {article.readMinutes} min read
      </p>

      <div className="mt-8 space-y-5 text-base leading-relaxed text-zinc-800 dark:text-zinc-200">
        {article.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">
            More in {article.category}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
