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
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../lib/config";
import { supabase } from "../../lib/supabase";

export default function AccountScreen() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#dc2626" />
      </View>
    );
  }

  return session ? <SignedIn email={session.user.email ?? ""} /> : <AuthForm />;
}

function SignedIn({ email }: { email: string }) {
  const [signingOut, setSigningOut] = useState(false);

  async function handleLogout() {
    setSigningOut(true);
    await supabase.auth.signOut();
    setSigningOut(false);
  }

  return (
    <View style={styles.content}>
      <Text style={styles.heading}>Account</Text>
      <Text style={styles.subheading}>
        Signed in as <Text style={styles.bold}>{email}</Text>
      </Text>

      <Pressable
        style={styles.secondaryButton}
        onPress={handleLogout}
        disabled={signingOut}
      >
        {signingOut ? (
          <ActivityIndicator color="#18181b" />
        ) : (
          <Text style={styles.secondaryButtonText}>Log out</Text>
        )}
      </Pressable>
    </View>
  );
}

type Mode = "sign-in" | "sign-up";

function AuthForm() {
  const [mode, setMode] = useState<Mode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmSent, setConfirmSent] = useState(false);

  async function handleSubmit() {
    if (!email.trim() || !password) return;
    setSubmitting(true);
    setError(null);

    if (mode === "sign-up") {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { emailRedirectTo: `${API_BASE_URL}/auth/confirm` },
      });
      setSubmitting(false);
      if (error) {
        setError(error.message);
        return;
      }
      setConfirmSent(true);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setSubmitting(false);
    if (error) setError(error.message);
  }

  if (confirmSent) {
    return (
      <View style={styles.content}>
        <Text style={styles.heading}>Check your email</Text>
        <Text style={styles.subheading}>
          We sent a confirmation link to {email}. Click it to finish creating
          your account, then come back and log in.
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.content}>
        <Text style={styles.heading}>
          {mode === "sign-in" ? "Log in" : "Sign up"}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#a1a1aa"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          editable={!submitting}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#a1a1aa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!submitting}
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <Pressable
          style={[styles.button, submitting && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {mode === "sign-in" ? "Log in" : "Sign up"}
            </Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => {
            setMode(mode === "sign-in" ? "sign-up" : "sign-in");
            setError(null);
          }}
        >
          <Text style={styles.toggleText}>
            {mode === "sign-in"
              ? "Don't have an account? Sign up"
              : "Already have an account? Log in"}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
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
  bold: {
    fontWeight: "700",
    color: "#18181b",
  },
  input: {
    marginTop: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#d4d4d8",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#18181b",
  },
  button: {
    marginTop: 16,
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
  secondaryButton: {
    marginTop: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#d4d4d8",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#18181b",
    fontWeight: "700",
    fontSize: 15,
  },
  toggleText: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 13,
    color: "#dc2626",
    fontWeight: "600",
  },
  error: {
    marginTop: 12,
    color: "#dc2626",
    fontSize: 13,
  },
});
