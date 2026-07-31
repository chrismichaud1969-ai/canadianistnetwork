import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";
import { getAllArticles, getFeaturedArticles } from "@/lib/articles";

export default function Home() {
  const featured = getFeaturedArticles();
  const latest = getAllArticles();
  const [lead, ...restFeatured] = featured;
  const rest = latest.filter((a) => a.slug !== lead?.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6">
      {lead && (
        <section className="mb-10">
          <ArticleCard article={lead} size="large" />
        </section>
      )}

      {restFeatured.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">
            Top Stories
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {restFeatured.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      <section className="mb-12">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">
          Latest News
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section>
        <NewsletterForm />
      </section>
    </div>
  );
}
