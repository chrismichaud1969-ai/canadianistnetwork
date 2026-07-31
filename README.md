# The Canadianist

News site for [thecanadianist.news](https://thecanadianist.news) with a live radio player and email
newsletter signup. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Features

- **News homepage & articles** — featured story, top stories, latest news grid, and per-category
  pages (`/category/[slug]`) and article pages (`/news/[slug]`).
- **Live radio player** — a persistent player bar fixed to the bottom of every page, streaming
  from the station's Radio.co stream. Play/pause, volume, and mute are handled client-side and
  keep playing across page navigation because the player lives in the root layout.
- **Newsletter signup** — a form on the homepage (`#newsletter`) posts to `/api/subscribe`, which
  adds the subscriber to a Mailchimp audience.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

Articles currently live in [`src/lib/articles.ts`](src/lib/articles.ts) as placeholder sample
data so the site works out of the box. Every page reads through the helper functions in that
file (`getAllArticles`, `getArticleBySlug`, `getArticlesByCategory`, etc.), so swapping in a real
CMS or API (Sanity, Contentful, WordPress REST API, a headless newsroom CMS, etc.) only requires
rewriting that one file.

## Radio stream

The stream URL and station name are configured in [`src/lib/config.ts`](src/lib/config.ts):

```ts
export const RADIO_STREAM_URL = "https://s5.radio.co/s246004886/listen";
export const RADIO_STATION_NAME = "The Canadianist Radio";
```

Update `RADIO_STREAM_URL` there if the stream ever moves.

## Newsletter / Mailchimp setup

The signup form calls `POST /api/subscribe` ([`src/app/api/subscribe/route.ts`](src/app/api/subscribe/route.ts)),
which adds the email to a Mailchimp audience via the Marketing API. Copy `.env.example` to
`.env.local` and fill in:

```bash
MAILCHIMP_API_KEY=your-api-key
MAILCHIMP_SERVER_PREFIX=usXX        # the suffix of your API key, e.g. "us21"
MAILCHIMP_AUDIENCE_ID=your-audience-id
```

- **API key**: Mailchimp account → Profile → Extras → API keys.
- **Server prefix**: the part after the dash in your API key (e.g. key ending in `-us21` → `us21`).
- **Audience ID**: Audience → Settings → Audience name and defaults.

Without these env vars set, `/api/subscribe` still works — it validates the email and logs the
signup to the server console instead of calling Mailchimp, which is convenient for local
development. In production, set the three variables above in your hosting provider's environment
variable settings.

## Deployment

Any Next.js host works (Vercel, Netlify, etc.). Point the `thecanadianist.news` domain at the
deployment and set the Mailchimp env vars in the hosting provider's dashboard.

```bash
npm run build
npm run start
```
