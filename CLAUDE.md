# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build + TypeScript type-check
npm run lint     # ESLint via next lint
```

There are no tests. `npm run build` is the primary correctness check — it runs the TypeScript compiler and will surface any type errors.

## Architecture

All application state lives in a single hook, `src/hooks/useLunchPlaces.ts`. It owns the `places[]` array and `lastPickedId`, reads from localStorage in a `useEffect` on mount (SSR-safe via `typeof window` guards), and persists back on every change. An `isHydrated` flag prevents a flash of empty content on first render — `page.tsx` shows a spinner until it is `true`.

`src/app/page.tsx` is the only route. It consumes `useLunchPlaces` and owns all UI state (which modal is open, whether the spinner is running, the picked place). Components are leaf nodes — they receive data and callbacks as props with no prop drilling beyond one level.

The roulette flow:
1. `pickPlace()` (`src/lib/roulette.ts`) selects the winner from eligible places, excluding the `lastPickedId` when possible.
2. `page.tsx` sets `isSpinning = true` and mounts `RoulettePicker` with the pre-determined winner.
3. `RoulettePicker` runs a `requestAnimationFrame` loop (not CSS keyframes) so the tick interval can grow quadratically for an ease-out deceleration effect. `buildSpinReel()` pre-computes the name array, ending with the winner's name.
4. On completion, `page.tsx` calls `recordPick()` to update `lastPickedAt` / `timesPicked` in state and localStorage, then shows `ResultModal`.

## Key conventions

**localStorage keys:** `"lunch-roulette-places"` and `"lunch-roulette-last-picked-id"` — defined in `src/lib/localStorage.ts`.

**`PlaceFormValues` vs `LunchPlace`:** Forms use `PlaceFormValues` where optional fields are empty strings rather than `undefined`. The hook's `addPlace`/`updatePlace` convert empty strings to `undefined` before writing to state.

**Bottom-sheet modals (`AddPlaceForm`, `EditPlaceForm`):** Use `max-h-[92dvh]` (not `vh`) so the sheet shrinks with the visual viewport when the iOS keyboard opens. The header is a separate `shrink-0` element outside the `overflow-y-auto` scroll area so it stays visible regardless of scroll position.

**Tailwind brand tokens** (defined in `tailwind.config.ts`):
- Colors: `brand-orange` `brand-yellow` `brand-green` `brand-bg` `brand-card` `brand-text` `brand-muted`
- Shadows: `shadow-card`, `shadow-primary`
- Animation: `animate-spin-slow`

**Delete confirmation:** `PlaceCard` implements a two-tap pattern purely in local component state — first tap turns the button red and sets a 3-second auto-reset timeout; second tap within the window confirms deletion.

**Sorting:** `PlaceList` sorts in-render (favorites first, then alphabetical). No separate sorted state is stored.
