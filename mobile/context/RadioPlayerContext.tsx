import React, { createContext, useContext, useEffect, useRef } from "react";
import {
  useAudioPlayer,
  useAudioPlayerStatus,
  setAudioModeAsync,
} from "expo-audio";
import { RADIO_STATION_NAME, RADIO_STREAM_URL } from "../lib/config";

type RadioPlayerContextValue = {
  playing: boolean;
  isBuffering: boolean;
  error: string | null;
  togglePlay: () => void;
  volume: number;
  setVolume: (value: number) => void;
  muted: boolean;
  toggleMute: () => void;
};

const RadioPlayerContext = createContext<RadioPlayerContextValue | null>(
  null
);

const STREAM_SOURCE = { uri: RADIO_STREAM_URL };

export function RadioPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const player = useAudioPlayer(STREAM_SOURCE, { updateInterval: 1000 });
  const status = useAudioPlayerStatus(player);
  const hasActivatedLockScreen = useRef(false);

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      interruptionMode: "doNotMix",
    });
  }, []);

  function togglePlay() {
    if (status.playing) {
      player.pause();
      return;
    }

    // Reconnect to the live edge rather than resuming a stale buffered
    // position after being paused for a while.
    player.replace(STREAM_SOURCE);
    player.play();

    if (!hasActivatedLockScreen.current) {
      player.setActiveForLockScreen(
        true,
        { title: RADIO_STATION_NAME, artist: "Live Radio" },
        { isLiveStream: true, showSeekForward: false, showSeekBackward: false }
      );
      hasActivatedLockScreen.current = true;
    }
  }

  function setVolume(value: number) {
    const clamped = Math.min(1, Math.max(0, value));
    player.volume = clamped;
    if (clamped > 0) player.muted = false;
  }

  function toggleMute() {
    player.muted = !player.muted;
  }

  return (
    <RadioPlayerContext.Provider
      value={{
        playing: status.playing,
        isBuffering: status.isBuffering,
        error: status.error,
        togglePlay,
        volume: player.volume,
        setVolume,
        muted: player.muted,
        toggleMute,
      }}
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
