"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    setMessage(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setState("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setState("success");
      setMessage("You're subscribed. Welcome aboard!");
      setEmail("");
    } catch {
      setState("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div
      id="newsletter"
      className="scroll-mt-24 rounded-2xl border border-black/10 bg-zinc-50 p-6 dark:border-white/10 dark:bg-zinc-900 sm:p-8"
    >
      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
        Get the newsletter
      </h2>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        The day&apos;s top Canadian stories, delivered to your inbox every
        morning.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col gap-2 sm:flex-row"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={state === "submitting"}
          className="w-full flex-1 rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 dark:border-white/10 dark:bg-black dark:text-zinc-50"
        />
        <button
          type="submit"
          disabled={state === "submitting"}
          className="shrink-0 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "submitting" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>

      {message && (
        <p
          role="status"
          className={`mt-3 text-sm ${
            state === "success"
              ? "text-green-600 dark:text-green-500"
              : "text-red-600 dark:text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
