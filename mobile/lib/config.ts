// The mobile app reads content from the same backend as the website, so
// there is one source of truth for articles and newsletter signups.
//
// Override for local development by running with:
//   EXPO_PUBLIC_API_BASE_URL=http://192.168.1.23:3000 npx expo start
// (use your machine's LAN IP, not localhost, so a physical device/simulator
// can reach your local Next.js dev server).
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "https://thecanadianist.news";

export const RADIO_STREAM_URL = "https://streaming.live365.com/a24798";
export const RADIO_STATION_NAME = "The Canadianist Radio";

export const APP_NAME = "The Canadianist";

// Supabase's anon/public key is designed to be exposed in client apps —
// access is governed by Row Level Security policies on the database, not by
// keeping this key secret. Never put the service_role key here.
export const SUPABASE_URL = "https://mmzbgfazqwyjupkctmux.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1temJnZmF6cXd5anVwa2N0bXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxMzUzNjgsImV4cCI6MjEwMjcxMTM2OH0.IYzl9_A7901HHp9DMWWKUGut8QYPbg2_XPvQhF15EPg";
