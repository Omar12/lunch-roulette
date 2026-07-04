# Product

## Register

product

## Users

People (solo or a small group) facing the daily "where do we eat?" stall. They already know their options — they just can't decide. Context: on a phone, hungry, low patience, wanting the choice made *for* them in seconds. Returning users who've saved their regular spots; first-run users seeding a list of favorites.

## Product Purpose

Lunch Roulette kills decision paralysis. You save your go-to places once, then spin to have one picked at random — biased away from the last place you got. Everything lives in the browser (localStorage); no account, no backend, no friction. Success = open app → spin → have an answer, in under five seconds, with a small hit of delight from the spin.

## Brand Personality

**Playful, fast, frictionless.** The roulette spin is the emotional core — a beat of anticipation and a satisfying landing. Voice is light and casual, never corporate. Nothing on screen should feel like a form to fill out or a dashboard to manage; it should feel like a game that happens to be useful. Energy is bright and warm, but the interaction is snappy — delight never slows the user down.

## Anti-references

- **Corporate SaaS dashboard** — no enterprise gray, dense tables, cold utilitarian chrome, or settings-panel density.
- **Cheap casino / gambling** — the roulette motif must not tip into neon Vegas, slot-machine tackiness, or coin-shower kitsch. Anticipation, not gambling.
- **Generic AI-template look** — no cream/sand body background, no tiny tracked-uppercase eyebrows over every section, no identical icon-heading-text card grids, no gradient text.
- **Cluttered food-delivery app** — no promo banners, ad noise, ratings clutter, or overwhelming menus.

## Design Principles

1. **The spin earns its keep.** Motion is the product's signature moment — invest there, keep everything around it calm so it stands out.
2. **One tap to the answer.** The primary action (spin) is always the loudest, closest thing. Managing places is secondary and never competes with it.
3. **Playful, not childish.** Bright and warm carries the fun; restraint in layout and type keeps it credible for daily adult use.
4. **Fast beats fancy.** If a flourish adds a step or a wait, cut it. Delight rides on top of speed, never in place of it.
5. **It's yours, and it's private.** Local-first, no login — the UI should feel personal and low-stakes, like a note on your own phone.

## Accessibility & Inclusion

Best-effort, pragmatic. Hold body-text contrast at ~4.5:1 against its background (watch muted gray on the warm off-white bg). Honor `prefers-reduced-motion` for the spin — swap the animated deceleration for a quick crossfade to the result. Keep tap targets thumb-sized for mobile. Not chasing strict WCAG AA/AAA certification, but don't ship anything that's obviously unreadable or unusable one-handed.
