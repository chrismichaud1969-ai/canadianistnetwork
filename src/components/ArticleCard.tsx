import Link from "next/link";
import type { Article } from "@/lib/articles";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ArticleCard({
  article,
  size = "default",
}: {
  article: Article;
  size?: "default" | "large";
}) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group block rounded-xl border border-black/10 bg-white p-5 transition hover:border-red-600/40 hover:shadow-sm dark:border-white/10 dark:bg-zinc-950"
    >
      <span className="inline-block rounded-full bg-red-600/10 px-2.5 py-0.5 text-xs font-semibold text-red-600">
        {article.category}
      </span>
      <h3
        className={`mt-3 font-bold text-zinc-900 transition group-hover:text-red-600 dark:text-zinc-50 ${
          size === "large" ? "text-2xl leading-snug" : "text-lg leading-snug"
        }`}
      >
        {article.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
        {article.dek}
      </p>
      <p className="mt-4 text-xs text-zinc-400">
        {article.author} · {formatDate(article.publishedAt)} ·{" "}
        {article.readMinutes} min read
      </p>
    </Link>
  );
}
