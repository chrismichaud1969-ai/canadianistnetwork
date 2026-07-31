"use client";

import { useRadioPlayer } from "@/components/RadioPlayerContext";
import { RADIO_STATION_NAME } from "@/lib/config";

export default function RadioPlayer() {
  const { status, volume, isMuted, togglePlay, setVolume, toggleMute } =
    useRadioPlayer();

  const isPlaying = status === "playing" || status === "loading";

  const statusLabel =
    status === "playing"
      ? "Live now"
      : status === "loading"
        ? "Connecting…"
        : status === "error"
          ? "Stream unavailable"
          : "Paused";

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-white/10 dark:bg-black/90">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 sm:gap-4 sm:px-6">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause radio" : "Play radio"}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          {status === "loading" ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          ) : isPlaying ? (
            <PauseIcon />
          ) : (
            <PlayIcon />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {RADIO_STATION_NAME}
          </p>
          <p className="flex items-center gap-1.5 truncate text-xs text-zinc-500 dark:text-zinc-400">
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full ${
                status === "playing"
                  ? "bg-red-600"
                  : status === "error"
                    ? "bg-zinc-400"
                    : "bg-amber-500"
              }`}
              aria-hidden
            />
            {statusLabel}
          </p>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            {isMuted || volume === 0 ? <MuteIcon /> : <VolumeIcon />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="Volume"
            className="h-1.5 w-24 accent-red-600"
          />
        </div>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-4 w-4">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 0 0-2.5-4.03v8.05a4.5 4.5 0 0 0 2.5-4.02z" />
    </svg>
  );
}

function MuteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M3 10v4h4l5 5V5L7 10H3zm14.73 2 2.77 2.77-1.41 1.41L16.32 13.4l-2.77 2.78-1.41-1.41L14.9 12l-2.76-2.77 1.41-1.41 2.77 2.77 2.77-2.77 1.41 1.41L17.73 12z" />
    </svg>
  );
}
