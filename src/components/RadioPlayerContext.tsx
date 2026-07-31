"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { RADIO_STREAM_URL } from "@/lib/config";

type PlaybackStatus = "idle" | "loading" | "playing" | "paused" | "error";

type RadioPlayerContextValue = {
  status: PlaybackStatus;
  volume: number;
  isMuted: boolean;
  togglePlay: () => void;
  setVolume: (value: number) => void;
  toggleMute: () => void;
};

const RadioPlayerContext = createContext<RadioPlayerContextValue | null>(
  null
);

export function RadioPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<PlaybackStatus>("idle");
  const [volume, setVolumeState] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audio.src = RADIO_STREAM_URL;
    audio.volume = volume;

    const handlePlaying = () => setStatus("playing");
    const handleWaiting = () => setStatus("loading");
    const handlePause = () => setStatus("paused");
    const handleError = () => setStatus("error");

    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    audioRef.current = audio;

    return () => {
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      setStatus("loading");
      // Reloading the src on resume keeps a live stream tuned to "now"
      // instead of buffering from a stale position after being paused.
      audio.load();
      audio
        .play()
        .catch(() => setStatus("error"));
    } else {
      audio.pause();
    }
  }, []);

  const setVolume = useCallback((value: number) => {
    const clamped = Math.min(1, Math.max(0, value));
    setVolumeState(clamped);
    setIsMuted(clamped === 0);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
      audioRef.current.muted = false;
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioRef.current) audioRef.current.muted = next;
      return next;
    });
  }, []);

  return (
    <RadioPlayerContext.Provider
      value={{ status, volume, isMuted, togglePlay, setVolume, toggleMute }}
    >
      {children}
    </RadioPlayerContext.Provider>
  );
}

export function useRadioPlayer() {
  const ctx = useContext(RadioPlayerContext);
  if (!ctx) {
    throw new Error("useRadioPlayer must be used within RadioPlayerProvider");
  }
  return ctx;
}
