import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import ArticleListItem from "../../components/ArticleListItem";
import { fetchArticles } from "../../lib/api";
import { categories, slugifyCategory } from "../../lib/types";
import type { Article } from "../../lib/types";

export default function CategoryScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [articles, setArticles] = useState<Article[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchArticles(slug).then((data) => {
      if (!cancelled) setArticles(data);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const title =
    categories.find((c) => slugifyCategory(c) === slug) ?? "Section";

  if (!articles) {
    return (
      <View style={styles.center}>
        <Stack.Screen options={{ title }} />
        <ActivityIndicator color="#dc2626" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title }} />
      <FlatList
        data={articles}
        keyExtractor={(item) => item.slug}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => <ArticleListItem article={item} />}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>
              No stories in this section yet.
            </Text>
          </View>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    flexGrow: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emptyText: {
    textAlign: "center",
    color: "#71717a",
  },
});
