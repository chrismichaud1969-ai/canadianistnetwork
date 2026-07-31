import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { fetchArticle } from "../../lib/api";
import type { Article } from "../../lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function ArticleScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchArticle(slug)
      .then((data) => {
        if (!cancelled) setArticle(data);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load this story.");
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!article) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#dc2626" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: article.category }} />
      <Text style={styles.category}>{article.category}</Text>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.dek}>{article.dek}</Text>
      <Text style={styles.meta}>
        By {article.author} · {formatDate(article.publishedAt)} ·{" "}
        {article.readMinutes} min read
      </Text>

      <View style={styles.body}>
        {article.body.map((paragraph, i) => (
          <Text key={i} style={styles.paragraph}>
            {paragraph}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  errorText: {
    color: "#71717a",
    textAlign: "center",
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
    marginTop: 12,
    fontSize: 26,
    fontWeight: "800",
    color: "#18181b",
    lineHeight: 32,
  },
  dek: {
    marginTop: 10,
    fontSize: 16,
    color: "#52525b",
    lineHeight: 22,
  },
  meta: {
    marginTop: 12,
    fontSize: 12,
    color: "#a1a1aa",
  },
  body: {
    marginTop: 20,
    gap: 14,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#27272a",
  },
});
