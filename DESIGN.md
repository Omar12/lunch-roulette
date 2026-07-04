---
name: Lunch Roulette
description: A playful, mobile-first roulette that picks where you eat.
colors:
  orange: "#FF6B35"
  yellow: "#FFD166"
  green: "#06D6A0"
  purple: "#7B2D8B"
  bg: "#FFFBF5"
  card: "#FFFFFF"
  text: "#1A1A2E"
  muted: "#6B7280"
typography:
  display:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.1em"
rounded:
  xl: "12px"
  2xl: "16px"
  3xl: "24px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.card}"
    rounded: "{rounded.3xl}"
    padding: "20px 24px"
    typography: "{typography.title}"
  button-primary-active:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.card}"
    rounded: "{rounded.3xl}"
    size: "scale(0.95)"
  button-secondary:
    backgroundColor: "{colors.card}"
    textColor: "{colors.muted}"
    rounded: "{rounded.2xl}"
    padding: "14px 24px"
  chip-selected:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.card}"
    rounded: "{rounded.xl}"
    padding: "10px 12px"
  chip-unselected:
    backgroundColor: "#F9FAFB"
    textColor: "{colors.muted}"
    rounded: "{rounded.xl}"
    padding: "10px 12px"
  card-place:
    backgroundColor: "{colors.card}"
    textColor: "{colors.text}"
    rounded: "{rounded.2xl}"
    padding: "16px"
  input-field:
    backgroundColor: "#F9FAFB"
    textColor: "{colors.text}"
    rounded: "{rounded.xl}"
    padding: "12px 16px"
---

# Design System: Lunch Roulette

## 1. Overview

**Creative North Star: "The Confetti Machine"**

Lunch Roulette holds one belief: the screen stays calm until it has a reason not to. A warm off-white canvas, one loud orange call-to-action, a clean list of your spots — that's the resting state, and it should feel almost boring in its restraint. Then you tap, the reel spins, and the whole app erupts: names blur past a highlighted window, decelerate, land on a winner, and the result modal fires confetti across a color-banded card. All the energy is concentrated in the payoff. The interface is a machine whose entire purpose is to earn that one burst.

This is a **product** surface, not a marketing page. Design serves speed: open → spin → answer in under five seconds. Playfulness rides on top of that speed as color, emoji, and springy motion — never as decoration that slows the user down. Chunky rounded corners, tactile press feedback, and a bright three-color accent set (orange → yellow → green) give it a game-show warmth without the tackiness.

It explicitly rejects the **corporate SaaS dashboard** (no enterprise gray, no dense tables, no settings-panel chrome), the **cheap casino** (the roulette is anticipation, never neon Vegas or coin-shower kitsch), the **generic AI template** (no cream-sand body tint sold as "warmth," no tracked-uppercase eyebrow on every block, no identical icon-card grids, no gradient text), and the **cluttered food-delivery app** (no promo banners, no ad noise, no ratings pile-up).

**Key Characteristics:**
- Calm canvas, loud payoff — energy is concentrated, not spread evenly.
- One primary action, always the loudest thing on screen.
- Bright warm accents (orange primary, yellow + green support) on an off-white base.
- Chunky radii and springy, tactile motion — bouncy, never stiff.
- Emoji as functional garnish, not filler.

## 2. Colors

A warm, bright, high-energy accent set floating on a soft off-white base — three saturated brand colors doing deliberate jobs, backed by a near-black ink and a single muted gray.

### Primary
- **Roulette Orange** (`#FF6B35`): The one voice of the product. Every primary action — Pick Lunch, Add Place, submit, selected chips — and every "this is the answer" highlight (the winning name, the reel's center window, links). Nothing else competes with it.

### Secondary
- **Golden Yellow** (`#FFD166`): The favorites color and the middle band of the win gradient. Stars, favorite borders, the celebratory sweep on the result card.

### Tertiary
- **Mint Green** (`#06D6A0`): The tail of the win gradient and the "cheap / $" price signal. Used sparingly, only in celebration or as a positive data tint.
- **Deep Grape** (`#7B2D8B`): A reserved accent defined in the token set but not yet placed on screen. Available for a future fourth role (e.g. a distinct secondary category or a "surprise me" mode); do not introduce it as random decoration.

### Neutral
- **Warm Paper** (`#FFFBF5`): The body background. A true off-white with the faintest warm cast — the app's resting canvas. This is the app's own warmth, not a stand-in for a cream-template look.
- **Pure White** (`#FFFFFF`): Card and modal surfaces, lifted off the paper background by shadow, not by a heavy border.
- **Midnight Ink** (`#1A1A2E`): All primary text and headings. Near-black with a hint of blue; the workhorse reading color.
- **Slate Muted** (`#6B7280`): Secondary text — metadata, notes, counts, labels. Holds ~4.5:1 on white; keep it on white/paper, never on a tinted or colored fill.

### Named Rules
**The One Voice Rule.** Orange is the only call-to-action color. If two things on screen are orange, they are both "the thing to tap" — so there is almost never more than one primary orange element per view. Its scarcity is what makes the Pick Lunch button impossible to miss.

**The Celebration-Only Gradient Rule.** The orange→yellow→green gradient is reserved for the win moment (the result card's top band). It never appears as background chrome, section dividers, or button fills. Seeing the gradient means *you got an answer*.

## 3. Typography

**Display / Body Font:** System UI stack (`system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`) — one family, multiple weights. No web font is loaded; the app leans on the platform's native sans for instant render and a familiar, app-native feel.

**Character:** Friendly and neutral by default, muscular when it counts. Personality comes from weight (extrabold headlines) and color (orange winners), not from a distinctive typeface. Because it's a single family, hierarchy is carried entirely by size and weight.

### Hierarchy
- **Display** (extrabold 800, 1.875rem / `text-3xl`, tight leading): The winning place name in the reel and result modal. The single biggest, boldest moment of type in the app.
- **Headline** (extrabold 800, 1.5rem / `text-2xl`, `-0.02em`): The app title ("🍔 Lunch Roulette") and sheet payoff headings.
- **Title** (bold 700, 1.25rem / `text-xl`): Modal titles ("Add a Place"), primary CTA label.
- **Body** (regular/semibold, 1rem / `text-base`): Input text, place names in cards (bold), the readable default.
- **Label** (semibold 600, 0.75rem / `text-xs`, `0.1em` tracking, uppercase): The two intentional all-caps moments — "SPINNING…" during the reel and "TODAY YOU'RE EATING AT" on the result card. These are earned dramatic beats, not section eyebrows.

### Named Rules
**The Earned Caps Rule.** Uppercase tracked type appears in exactly two places, both tied to the spin ceremony. It is a spotlight, never a scaffold — never place a tracked-uppercase kicker above an ordinary section.

## 4. Elevation

A **soft-lifted** system: surfaces are flat-tinted at rest and float on diffuse shadows rather than borders. Depth is ambient (white cards hovering over warm paper), and it turns *structural* only for the primary action, which carries a colored orange glow to advertise its importance. Borders exist but are hairline and mostly transparent — they signal state (a favorite's yellow ring, an excluded card's gray) rather than construct the box.

### Shadow Vocabulary
- **Card Rest** (`box-shadow: 0 2px 16px 0 rgba(26,26,46,0.08)`): Default lift for place cards and surfaces. Barely-there, ambient.
- **Card Hover** (`box-shadow: 0 6px 24px 0 rgba(26,26,46,0.14)`): The raised state on interaction.
- **Primary Glow** (`box-shadow: 0 4px 20px 0 rgba(255,107,53,0.35)`): The signature. A colored orange shadow under every primary button — it makes the CTA feel lit from within and separates "the action" from "the content."

### Named Rules
**The Colored-Glow-Means-Go Rule.** Only primary orange actions get the orange glow. Neutral surfaces get neutral ink shadows. The glow is a promise: tap this.

## 5. Components

Everything is chunky, rounded, and springy. The shared motion signature is `active:scale-95` (or `-90` on small icon buttons) plus Framer Motion springs on anything that enters — press feedback is instant and physical.

### Buttons
- **Shape:** Generously rounded — primary actions use `24px` (`rounded-3xl`), secondary/submit use `16px` (`rounded-2xl`), fully-round for icon buttons.
- **Primary:** Solid Roulette Orange, white label, extrabold, the Primary Glow shadow, wide vertical padding (~20px on the main CTA). Presses down to `scale(0.95)`. This is the loudest object on any screen it appears on.
- **Hover / Active:** No hover color shift (touch-first); the feedback is the scale-down press and the ever-present glow.
- **Secondary / Cancel:** Transparent fill, hairline gray-200 border, muted-gray semibold label. Recedes deliberately next to the orange primary.
- **Icon buttons:** `36px` circles (`w-9 h-9`), gray-50 fill, state-colored contents (yellow star when favorited, orange when excluded-toggle active, red when a delete is armed). Press to `scale(0.90)`.

### Chips (price / distance selectors)
- **Style:** Equal-width pills, `12px` radius, hairline border.
- **State:** Selected = solid orange fill + white text + orange border. Unselected = gray-50 fill, gray-200 border, muted text. Tapping a selected chip again clears it (toggle, not radio-lock).

### Cards / Containers (place card)
- **Corner Style:** `16px` (`rounded-2xl`).
- **Background:** Pure White on the Warm Paper canvas.
- **Shadow Strategy:** Card Rest by default (see Elevation).
- **Border:** Transparent by default; **yellow-300** ring when favorited; **gray-200 + 60% opacity** when temporarily excluded. Border is a state channel, never structure.
- **Internal Padding:** `16px`. Enters with a Framer `layout` animation (fade + 12px rise), exits fade + slight shrink.

### Inputs / Fields
- **Style:** `12px` radius, gray-50 fill, gray-200 hairline border, comfortable 16px text (prevents iOS zoom).
- **Focus:** 2px orange focus ring (`ring-brand-orange`), no default outline. Error state swaps the border to red-400 with red helper text below.
- **Labels:** Small semibold ink labels above each field; required marked with a red asterisk.

### Navigation
- **Style:** A single sticky top header (`bg` at 90% opacity + `backdrop-blur-sm`, hairline orange-100 bottom border). Left: title + live count ("5 places · 3 eligible"). Right: the round orange **+** add button. No tab bar, no side nav — the app is one screen.

### Signature Component — The Reel & The Payoff
- **Reel (RoulettePicker):** A full-screen paper-colored takeover. Place names fly through a centered highlight window (a `border-y-2 border-orange/30`, faint orange-tinted band) with top/bottom fade masks. Tick interval grows quadratically (60ms→380ms over 2.4s) for a hand-built ease-out deceleration; the winner lands in orange. This is a `requestAnimationFrame` loop, not CSS keyframes, precisely so the deceleration can be authored.
- **Result Modal:** A spring-scaled white card with the celebration gradient band across its top, a bouncing 🎉, the "TODAY YOU'RE EATING AT" label, the winner in Display type, metadata pills, and 8 emoji falling as confetti. The single richest moment in the app — this is where The Confetti Machine pays out.

## 6. Do's and Don'ts

### Do:
- **Do** keep orange as the one voice — one primary orange action per view, backed by its Primary Glow (`0 4px 20px rgba(255,107,53,0.35)`).
- **Do** keep the resting canvas calm (Warm Paper `#FFFBF5`, white cards, one CTA) so the spin and result read as an eruption by contrast.
- **Do** reserve the orange→yellow→green gradient and falling emoji for the win moment only.
- **Do** give every interactive element tactile press feedback (`active:scale-95` / `-90`) and spring entrances — bouncy is the brand.
- **Do** use round radii at scale: `24px` primary buttons, `16px` cards, `12px` inputs/chips, full-round icon buttons.
- **Do** keep muted gray (`#6B7280`) on white or paper only, where it holds ~4.5:1; and honor `prefers-reduced-motion` by crossfading to the result instead of running the reel.

### Don't:
- **Don't** build a corporate SaaS dashboard — no enterprise gray fields, dense tables, or settings-panel density.
- **Don't** let the roulette drift into cheap-casino territory — no neon, no slot-machine chrome, no coin-shower kitsch. Anticipation, not gambling.
- **Don't** ship the generic AI-template look: no cream/sand body tint dressed up as "warmth," no tiny tracked-uppercase eyebrow over ordinary sections (caps live only in "SPINNING…" and the result label), no identical icon-heading-text card grids, no `background-clip: text` gradient text.
- **Don't** clutter like a food-delivery app — no promo banners, ad strips, or ratings noise.
- **Don't** use `border-left`/`border-right` colored stripes as accents; borders here signal state (favorite/excluded) with full hairline rings only.
- **Don't** give neutral or secondary buttons the orange glow — the colored shadow is a "tap this" promise reserved for the primary action.
