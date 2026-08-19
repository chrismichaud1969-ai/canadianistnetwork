import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ArticleListItem from "../../components/ArticleListItem";
import { fetchArticles } from "../../lib/api";
import { categories, slugifyCategory } from "../../lib/types";
import type { Article } from "../../lib/types";

// Homepage shows one post per section, in the order defined by `categories`
// (Radio Featured, Featured, Toronto, Montreal/West Island, National
// Politics, Opinion, Journeys) — mirrors the website's home page.
function toHomepageFeed(all: Article[]): Article[] {
  return categories
    .map((category) =>
      all.find((a) => slugifyCategory(a.category) === slugifyCategory(category))
    )
    .filter((a): a is Article => Boolean(a));
}

export default function HomeScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchArticles();
      setArticles(toHomepageFeed(data));
    } catch {
      setError("Couldn't load stories. Pull down to try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#dc2626" />
      </View>
    );
  }

  return (
    <FlatList
      data={articles}
      keyExtractor={(item) => item.slug}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => <ArticleListItem article={item} />}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            load();
          }}
          tintColor="#dc2626"
        />
      }
      ListEmptyComponent={
        <View style={styles.center}>
          <Text style={styles.emptyText}>
            {error ?? "No stories yet — check back soon."}
          </Text>
        </View>
      }
    />
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
