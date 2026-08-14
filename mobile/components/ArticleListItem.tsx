import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import type { Article } from "../lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
  });
}

export default function ArticleListItem({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article.slug}`} asChild>
      <Pressable style={styles.card}>
        <Text style={styles.category}>{article.category}</Text>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.dek} numberOfLines={2}>
          {article.dek}
        </Text>
        <Text style={styles.meta}>
          {article.author} · {formatDate(article.publishedAt)} ·{" "}
          {article.readMinutes} min read
        </Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#e4e4e7",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#fff",
  },
  category: {
    alignSelf: "flex-start",
    fontSize: 11,
    fontWeight: "700",
    color: "#dc2626",
    backgroundColor: "#fee2e2",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: "hidden",
  },
  title: {
    marginTop: 8,
    fontSize: 17,
    fontWeight: "700",
    color: "#18181b",
  },
  dek: {
    marginTop: 4,
    fontSize: 13,
    color: "#71717a",
  },
  meta: {
    marginTop: 10,
    fontSize: 11,
    color: "#a1a1aa",
  },
});
