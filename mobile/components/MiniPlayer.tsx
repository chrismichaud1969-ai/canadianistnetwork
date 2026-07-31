import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRadioPlayer } from "../context/RadioPlayerContext";
import { RADIO_STATION_NAME } from "../lib/config";

export default function MiniPlayer() {
  const { playing, isBuffering, error, togglePlay } = useRadioPlayer();

  const statusLabel = error
    ? "Stream unavailable"
    : isBuffering
      ? "Connecting…"
      : playing
        ? "Live now"
        : "Paused";

  return (
    <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
      <View style={styles.bar}>
        <Pressable
          onPress={togglePlay}
          accessibilityRole="button"
          accessibilityLabel={playing ? "Pause radio" : "Play radio"}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {isBuffering ? "…" : playing ? "❚❚" : "▶"}
          </Text>
        </Pressable>

        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {RADIO_STATION_NAME}
          </Text>
          <View style={styles.statusRow}>
            <View
              style={[
                styles.dot,
                {
                  backgroundColor:
                    playing && !error ? "#dc2626" : error ? "#a1a1aa" : "#f59e0b",
                },
              ]}
            />
            <Text style={styles.statusText}>{statusLabel}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "rgba(255,255,255,0.97)",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e4e4e7",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#dc2626",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#18181b",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    color: "#71717a",
  },
});
