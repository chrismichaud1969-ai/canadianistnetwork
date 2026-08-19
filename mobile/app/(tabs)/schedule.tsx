import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { fetchSchedule } from "../../lib/api";
import {
  DAY_ORDER,
  formatTime,
  type DayOfWeek,
  type ScheduleEntry,
} from "../../lib/schedule";

export default function ScheduleScreen() {
  const [entries, setEntries] = useState<ScheduleEntry[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setError(null);
      const data = await fetchSchedule();
      setEntries(data);
    } catch {
      setError("Couldn't load the schedule. Pull down to try again.");
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (!entries) {
    return (
      <View style={styles.center}>
        {error ? (
          <Text style={styles.emptyText}>{error}</Text>
        ) : (
          <ActivityIndicator color="#dc2626" />
        )}
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.content}
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
    >
      {DAY_ORDER.map((day) => {
        const dayEntries = entries.filter((e) => e.days.includes(day));
        if (dayEntries.length === 0) return null;
        return <DaySection key={day} day={day} entries={dayEntries} />;
      })}
    </ScrollView>
  );
}

function DaySection({
  day,
  entries,
}: {
  day: DayOfWeek;
  entries: ScheduleEntry[];
}) {
  return (
    <View style={styles.daySection}>
      <Text style={styles.dayLabel}>{day.toUpperCase()}</Text>
      <View style={styles.card}>
        {entries.map((entry, i) => (
          <View
            key={entry.id}
            style={[
              styles.row,
              i === entries.length - 1 && styles.rowLast,
            ]}
          >
            <View style={styles.rowInfo}>
              <Text style={styles.show}>{entry.show}</Text>
              {entry.host && <Text style={styles.host}>{entry.host}</Text>}
              {entry.description && (
                <Text style={styles.description}>{entry.description}</Text>
              )}
            </View>
            <Text style={styles.time}>
              {formatTime(entry.startTime)} – {formatTime(entry.endTime)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 32,
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
  daySection: {
    marginBottom: 20,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#a1a1aa",
    marginBottom: 8,
  },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#e4e4e7",
    borderRadius: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e4e4e7",
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  rowInfo: {
    flex: 1,
  },
  show: {
    fontSize: 15,
    fontWeight: "700",
    color: "#18181b",
  },
  host: {
    marginTop: 2,
    fontSize: 13,
    color: "#71717a",
  },
  description: {
    marginTop: 4,
    fontSize: 13,
    color: "#71717a",
  },
  time: {
    fontSize: 13,
    fontWeight: "600",
    color: "#3f3f46",
  },
});
