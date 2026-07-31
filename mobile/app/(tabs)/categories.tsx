import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import { categories } from "../../lib/types";

export default function CategoriesScreen() {
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <Text style={styles.separator} />}
      renderItem={({ item }) => (
        <Link href={`/category/${item.toLowerCase()}`} asChild>
          <Pressable style={styles.row}>
            <Text style={styles.label}>{item}</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </Link>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#e4e4e7",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#18181b",
  },
  chevron: {
    fontSize: 20,
    color: "#a1a1aa",
  },
});
