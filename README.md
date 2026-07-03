# 🍜 Lunch Roulette

A mobile-first web app that randomly picks where to eat from your saved list of favourite spots. No more "where do you want to go?" — spin the wheel and go.

Built with Next.js + React, everything stored in your browser (localStorage). No account, no backend.

## Features

- **Save places** — name, category, price, and notes for each spot
- **Spin the roulette** — animated deceleration picks a winner, avoiding the last-picked place when possible
- **Favorites** — star spots to surface them first
- **Include / exclude** — toggle a place out of the running without deleting it
- **Pick tracking** — records how many times and when each place was last picked

## Getting started

```bash
npm install
npm run dev      # start dev server at localhost:3000
```

Other scripts:

```bash
npm run build    # production build + TypeScript type-check
npm run lint     # ESLint
```

There are no tests — `npm run build` is the primary correctness check (runs `tsc`).

## Tech stack

- **Next.js 14** (App Router) + **React 18**
- **TypeScript**
- **Tailwind CSS** — brand tokens defined in `tailwind.config.ts`
- **Framer Motion** — UI animation
- **localStorage** — all persistence

## How it works

All state lives in one hook, `src/hooks/useLunchPlaces.ts` — it owns the places list, reads from localStorage on mount, and persists on every change. `src/app/page.tsx` is the only route and owns the UI state.

The roulette itself (`src/lib/roulette.ts`) picks the winner up front; `RoulettePicker` then runs a `requestAnimationFrame` loop where the tick interval grows quadratically for an ease-out spin, landing on the pre-chosen winner.

See [CLAUDE.md](./CLAUDE.md) for architecture details and [ROADMAP.md](./ROADMAP.md) for planned features.
