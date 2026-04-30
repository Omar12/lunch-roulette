# Roadmap

Lunch Roulette is a mobile-first app for randomly choosing where to eat from a saved list of favourite places. This roadmap outlines planned improvements and future features.

---

## Near-term enhancements

Small-scope improvements that build directly on existing features.

- **Search / filter bar** — real-time filter of the place list by name or category
- **Sort options** — toggle between: favorites-first (current default), alphabetical, most picked, least picked, recently added
- **Spin by category** — select a category chip before spinning so the roulette only draws from that category
- **Bulk actions** — "Exclude all" / "Include all" toggle above the list for quickly resetting a week
- **PWA support** — add `manifest.json` and meta tags so the app is installable on iOS/Android home screens

---

## Mid-term features

Moderate scope; some require new data or new UI surfaces.

- **Pick history log** — scrollable list of the last N picks (place name, date, time) stored in localStorage
- **Post-pick rating** — a quick 👍 / 👎 prompt after the result modal that records a rating per pick; lower-rated places get deprioritised in future spins
- **Smarter roulette weighting** — option to weight picks by `isFavorite` (2× chance) or inverse `timesPicked` (under-picked places get a higher chance)
- **"Skip today"** — per-place action that auto-excludes a place until the next calendar day, more intentional than the permanent exclude toggle
- **Dark mode** — respects `prefers-color-scheme` with a manual override toggle; preference stored in localStorage

---

## Longer-term ideas

Higher effort; some require infrastructure beyond localStorage.

- **Export / import** — download the full place list as JSON; import from a JSON file to restore or merge
- **Statistics view** — pick frequency by place, most-picked category, longest streak without a repeat; derived from `timesPicked` and pick history
- **Place photos** — attach a custom emoji icon or small image stored as a base64 data URL
- **Cross-device sync** — share your list via a URL (state encoded in the URL hash); no backend required
- **Group mode** — share a place list with coworkers via a URL so everyone spins from the same options independently
