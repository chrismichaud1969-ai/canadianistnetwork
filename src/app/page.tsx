import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";
import { getHomepageFeed } from "@/lib/articles";

export default function Home() {
  const [lead, ...rest] = getHomepageFeed();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6">
      {lead && (
        <section className="mb-8">
          <ArticleCard article={lead} size="large" />
        </section>
      )}

      {rest.length > 0 && (
        <section className="mb-12 space-y-4">
          {rest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </section>
      )}

      <section>
        <NewsletterForm />
      </section>
    </div>
  );
}
