import { NextResponse } from "next/server";
import { getAllArticles, getArticlesByCategory } from "@/lib/articles";

// Public read-only feed of articles, consumed by the web app and the
// React Native mobile app so both stay in sync with a single content source.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const articles = category
    ? getArticlesByCategory(category)
    : getAllArticles();

  return NextResponse.json(
    { articles },
    { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }
  );
}
