// The mobile app reads content from the same backend as the website, so
// there is one source of truth for articles and newsletter signups.
//
// Override for local development by running with:
//   EXPO_PUBLIC_API_BASE_URL=http://192.168.1.23:3000 npx expo start
// (use your machine's LAN IP, not localhost, so a physical device/simulator
// can reach your local Next.js dev server).
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "https://thecanadianist.news";

export const RADIO_STREAM_URL = "https://s5.radio.co/s246004886/listen";
export const RADIO_STATION_NAME = "The Canadianist Radio";

export const APP_NAME = "The Canadianist";
