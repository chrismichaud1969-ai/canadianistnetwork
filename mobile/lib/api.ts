import { API_BASE_URL } from "./config";
import type { Article } from "./types";
import type { ScheduleEntry } from "./schedule";

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Request to ${path} failed with status ${res.status}`);
  }
  return res.json();
}

export async function fetchArticles(category?: string): Promise<Article[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  const data = await getJson<{ articles: Article[] }>(`/api/articles${query}`);
  return data.articles;
}

export async function fetchArticle(slug: string): Promise<Article> {
  const data = await getJson<{ article: Article }>(
    `/api/articles/${encodeURIComponent(slug)}`
  );
  return data.article;
}

export async function fetchSchedule(): Promise<ScheduleEntry[]> {
  const data = await getJson<{ schedule: ScheduleEntry[] }>("/api/schedule");
  return data.schedule;
}

export async function subscribe(
  email: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { ok: false, error: data.error ?? "Something went wrong." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}
