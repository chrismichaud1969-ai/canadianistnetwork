import { Link } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ArticleListItem from "../../components/ArticleListItem";
import { fetchArticles } from "../../lib/api";
import { slugifyCategory } from "../../lib/types";
import type { Article } from "../../lib/types";

export default function HomeScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchArticles();
      setArticles(data.filter((a) => a.featured));
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
      ListFooterComponent={
        articles.length > 0 ? (
          <Link href={`/category/${slugifyCategory("Major News")}`} asChild>
            <Pressable style={styles.seeMore}>
              <Text style={styles.seeMoreText}>See more stories →</Text>
            </Pressable>
          </Link>
        ) : null
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
  seeMore: {
    marginTop: 8,
    paddingVertical: 12,
  },
  seeMoreText: {
    color: "#dc2626",
    fontWeight: "700",
    fontSize: 14,
  },
});
