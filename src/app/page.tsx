import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";
import { getFeaturedArticles, slugifyCategory } from "@/lib/articles";

export default function Home() {
  const featured = getFeaturedArticles();
  const [lead, ...rest] = featured;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6">
      {lead && (
        <section className="mb-10">
          <ArticleCard article={lead} size="large" />
        </section>
      )}

      {rest.length > 0 && (
        <section className="mb-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {rest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      <section className="mb-12">
        <Link
          href={`/category/${slugifyCategory("Major News")}`}
          className="text-sm font-semibold text-red-600 hover:text-red-700"
        >
          See more stories →
        </Link>
      </section>

      <section>
        <NewsletterForm />
      </section>
    </div>
  );
}
