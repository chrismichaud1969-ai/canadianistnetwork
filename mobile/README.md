# The Canadianist — Mobile App

iOS and Android app for The Canadianist, built with [Expo](https://expo.dev) (React Native + TypeScript
+ Expo Router). It shares its backend with the website (`../` in this repo) — news content and
newsletter signups both go through the same Next.js API, so there's one source of truth.

## Features

- **News browsing** — Home feed, per-section browsing (Politics, Business, Culture, Sports,
  Technology, World), and article detail screens, all fetched from `/api/articles`.
- **Live radio, with real background playback** — a mini-player bar pinned above the tab bar plays
  the station's live stream and keeps playing when the app is backgrounded or the screen is
  locked, with lock-screen / notification playback controls (via `expo-audio`).
- **Newsletter signup** — a Subscribe tab posts to the same `/api/subscribe` endpoint the website
  uses (Mailchimp-backed).

## Running it locally

```bash
npm install
npx expo start
```

Scan the QR code with the **Expo Go** app (iOS App Store / Google Play) to run it on your own
phone instantly — no simulator, no Mac, no build required. This is the fastest way to try changes
during development.

### Pointing at a local backend

By default the app talks to `https://thecanadianist.news`. To point it at a Next.js dev server
running on your machine instead, set `EXPO_PUBLIC_API_BASE_URL` to your machine's LAN IP (not
`localhost` — a physical device or simulator can't reach your machine's localhost):

```bash
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.23:3000 npx expo start
```

## Background radio playback

Configured via the `expo-audio` config plugin in `app.json` (`enableBackgroundPlayback: true`),
which sets up:
- **iOS**: `UIBackgroundModes: ["audio"]` so playback continues when the app is backgrounded.
- **Android**: a foreground media-playback service with the required permissions, so playback
  survives backgrounding/screen-lock and shows lock-screen controls.

The player itself (`context/RadioPlayerContext.tsx`) calls `setAudioModeAsync` with
`shouldPlayInBackground: true` and activates lock-screen controls (`setActiveForLockScreen`) once
playback starts.

**This needs to be verified on a real device build** (a "development build" or a full EAS build —
Expo Go itself has limited background-audio support) before shipping, since it can't be verified
headlessly in this environment. See the EAS section below.

## Building real installable apps (EAS)

[EAS Build](https://docs.expo.dev/build/introduction/) builds iOS and Android binaries in Expo's
cloud — no Xcode or Android Studio required, even for iOS.

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform ios       # requires an Apple Developer account ($99/yr)
eas build --platform android   # requires a Google Play Developer account ($25 one-time)
```

The first run will prompt you to log in with (or create) your own Apple/Google developer
credentials — those accounts, and the App Store Connect / Play Console listings, belong to you.
EAS can also manage submission directly:

```bash
eas submit --platform ios
eas submit --platform android
```

## Before you submit to the stores

- **Replace the placeholder assets** in `assets/` (`icon.png`, `splash-icon.png`, the Android
  adaptive icon layers, `favicon.png`) with real branding — these are still the default Expo
  placeholders.
- **Bundle identifiers** are currently set to `news.thecanadianist.app` for both
  `ios.bundleIdentifier` and `android.package` in `app.json`. Change these if you'd prefer a
  different reverse-DNS identifier — they can't be changed after your first store submission.
- **Test background playback and lock-screen controls on a physical device** via a development
  build or EAS build, as noted above.
- Update `expo.name` / `expo.slug` in `app.json` if you want a different display name than "The
  Canadianist".

## Project structure

```
app/                  Expo Router file-based routes
  (tabs)/              Home, Sections, Subscribe tabs
  article/[slug].tsx    Article detail
  category/[slug].tsx   Section listing
  _layout.tsx           Root layout: navigation stack + persistent mini-player
components/
  ArticleListItem.tsx
  MiniPlayer.tsx        Persistent radio player bar
context/
  RadioPlayerContext.tsx  expo-audio playback state, shared across all screens
lib/
  api.ts                Fetches from the shared backend (articles + subscribe)
  config.ts              API base URL, radio stream URL
  types.ts                Article/category types (mirrors the website's)
```
