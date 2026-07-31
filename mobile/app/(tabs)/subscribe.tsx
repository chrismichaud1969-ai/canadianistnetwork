import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { subscribe } from "../../lib/api";

type FormState = "idle" | "submitting" | "success" | "error";

export default function SubscribeScreen() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit() {
    if (!email.trim()) return;
    setState("submitting");
    setMessage(null);

    const result = await subscribe(email.trim());

    if (result.ok) {
      setState("success");
      setMessage("You're subscribed. Welcome aboard!");
      setEmail("");
    } else {
      setState("error");
      setMessage(result.error);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.content}>
        <Text style={styles.heading}>Get the newsletter</Text>
        <Text style={styles.subheading}>
          The day&apos;s top Canadian stories, delivered to your inbox every
          morning.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          placeholderTextColor="#a1a1aa"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          editable={state !== "submitting"}
        />

        <Pressable
          style={[styles.button, state === "submitting" && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={state === "submitting"}
        >
          {state === "submitting" ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Subscribe</Text>
          )}
        </Pressable>

        {message && (
          <Text
            style={[
              styles.message,
              state === "success" ? styles.success : styles.error,
            ]}
          >
            {message}
          </Text>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "800",
    color: "#18181b",
  },
  subheading: {
    marginTop: 8,
    fontSize: 14,
    color: "#71717a",
    lineHeight: 20,
  },
  input: {
    marginTop: 24,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#d4d4d8",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#18181b",
  },
  button: {
    marginTop: 12,
    backgroundColor: "#dc2626",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  message: {
    marginTop: 14,
    fontSize: 13,
    textAlign: "center",
  },
  success: {
    color: "#16a34a",
  },
  error: {
    color: "#dc2626",
  },
});
