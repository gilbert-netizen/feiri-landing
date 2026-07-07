# FEIRI Milano — Design System

A design system for **FEIRI Milano** (**feiri.co.za**), a **proudly South African**
premium menswear label that designs **limited, Founders-Edition monogram knitwear
built from the ground up for bigger men (3XL–6XL)**. The house signature is the
interlocking **FF monogram** rendered as an all-over jacquard knit, a structured
collar that holds its shape, and an intentional fit — *never tight, never sloppy*.

> **Brand essence:** "Made for men who carry presence." Quiet luxury with a
> relaxed, confident voice. Soft, high-depth colours — deep marine navy, royal
> cobalt blue, warm cream — that read as expensive. Italian-inspired naming
> (*Milano*), South African craft, modelled with celebratory African styling.

The store runs on Shopify and is built & powered by **V8 Media**.

---

## Source materials provided

Originals live in `uploads/`; cleaned/cropped working copies are in `assets/`.

| File | What it is |
|------|------------|
| `FEIRI_4.svg` | **Vector lockup** — the scalable master mark (FF monogram + FEIRI MILANO) |
| `FEIRI_2.jpg` / `FEIRI_2 (2).png` | Logo lockup — cream on deep burgundy ground / cream on transparent |
| `FEIRI_3 (1).jpg` | Logo lockup — cream on navy |
| `FEIRI_4.jpg` / `FEIRI_4 (1).png` | Logo lockup — navy on cream / navy on transparent |
| `FEIRI Logo Design_2nd Draft (2).pdf` | Logo design draft (image-only PDF) |
| `Untitled-8_0019 / _0020 …copy.pdf` | Heavy image-only artwork layers (could not auto-render — see caveats) |
| `screencapture-…-monogram-tee-khaki-blue-…pdf` | Full product-detail page capture (image-only PDF) |
| `Screenshot 2026-06-18 at 13.43–13.44.*.png` | **Live homepage screenshots** — the source of truth for the storefront kit |

**The homepage screenshots are the source of truth.** All storefront imagery in
`assets/` (`hero.jpg`, `product-*.jpg`, `two-models.jpg`, `collar-detail.jpg`,
`life-*.jpg`) was cropped directly from these captures, so the UI kit mirrors the
real site rather than inventing one.

Live site: **https://feiri.co.za** · product example:
`https://feiri.co.za/products/feiri-signature-monogram-tee-khaki-blue`

---

## CONTENT FUNDAMENTALS — how FEIRI writes

**Voice:** professional but slightly relaxed. Confident and reassuring, never
shouty. Speaks plainly to a man who wants to look sharp and be taken seriously —
"luxury, confidence, and the perfect fit."

**Person & address:** address the customer as **you** / **men**; speak as **we**
("we design from the ground up", "we select for structure"). Reassurance is the
core job of the copy.

**Casing:**
- **Display headlines:** small-caps serif, sentence-cased input — renders as
  `Made For Men Who Carry Presence`, `Style Built For Bigger Men`, `Fit Matters`.
  This small-caps serif treatment is the single most recognisable FEIRI cue.
- **Logo lockup:** `FEIRI` (caps, tracked) over the tricolore rule over `MILANO`
  (caps, very wide tracking).
- **Body / UI:** sentence case, clean sans. Buttons Title Case ("Shop Limited
  Pieces", "Subscribe now") or UPPERCASE micro-labels.
- **Eyebrows / badges:** `FOUNDERS EDITION`, `ONLY 300 MADE` — uppercase, tracked.

**Reassurance-first messaging.** Copy answers a bigger man's real worries about
fit: *"Length that stays where it should." "Chest and midsection balanced — never
tight, never sloppy." "Structured collar that doesn't collapse." "Shoulders built
for strength."* Lead with the fit benefit, then the luxury.

**Scarcity, stated calmly.** "Founders Edition", "Only 300 made", "Limited 3XL–6XL
pieces" — exclusivity is a fact, not a hard sell.

**Local pride.** "Proudly South African", "Designed and crafted locally with
intention", "Crafted in South Africa." *Milano* is an aspirational style cue, not
a claim of Italian manufacture.

**Tone examples (write like this):**
- ✅ "Made for men who carry presence."
- ✅ "Most fashion brands design for smaller bodies and simply 'size up.' At FEIRI, we design from the ground up."
- ✅ "Premium fabrics that hold their shape after every wash."
- ✅ "Free shipping for all orders."
- ❌ "🔥 HUGE SALE!! Don't miss out!!!" (too loud, salesy)
- ❌ "Plus-size clothing for the larger gentleman." (clinical, distancing)

**Emoji:** **never** in product, marketing, or UI.

---

## VISUAL FOUNDATIONS

**Palette — soft, high depth.** Pulled from the live storefront:
- **Marine navy `#0D3D56`** — the **primary**. Dark sections, the footer, the
  announcement bar, primary CTAs, headings accents, star ratings.
- **Cobalt / royal blue `#2C53C9`** — the **accent**: the FF monogram knit itself,
  polo collars, links, the cart badge, secondary headline lines ("Fit Matters",
  "Styled for Real Life"), accent buttons.
- **Cream / ivory `#FAF0D6`** — the warm "paper". Soft section grounds and the
  knit base colour. White (`#FFFFFF`) is used for the header and product grounds.
- **Crimson `#7A1420`** — **limited/urgency only** ("ONLY 300 MADE"). Never a
  general UI colour.
- **Warm neutrals** — text and borders in warm ink/stone (`#15140F` → `#F2EDE2`).
- **Champagne gold `#C9A24B`** — a sparing premium hairline accent.
- **Italian tricolore** (`#CE2B37` / white / `#1B8A4B`) — **the logo lockup only**
  (the rule between `FEIRI` and `MILANO`). Never a UI colour.

**Typography.**
- **Primary — *Griffon*** (the brand CI typeface, by Tumelo Matabola / Pistis
  Creative Design): a retro-influenced **titling serif with true small caps**,
  weights **ExtraLight / Light / Regular / SemiBold**. Used for **all header
  copy** — the lockup, hero marks, and the dominant small-caps headlines
  (`Made For Men Who Carry Presence`, `Style Built For Bigger Men`, `Fit Matters`).
  Griffon is commercial and the licensed files have **not** been supplied, so it
  is scaffolded (see `tokens/fonts.css`) and the substitutes below render until
  the files are dropped into `assets/fonts/`.
- **Headline substitute:** *Cormorant Garamond* in small caps — closest free
  match to Griffon's headline look (`font-variant: small-caps`).
- **Lockup / caps substitute:** *Cinzel* — engraved Roman caps.
- **Body / UI:** *Jost* — clean geometric grotesque. Body, labels, buttons,
  prices, e-commerce chrome. 300–600. (No secondary/body face was specified in
  the CI pages provided — confirm if one exists.)
- See **caveats** for the substitution status.

**Backgrounds.** Alternating **white** and **flat warm cream** bands; **deep navy**
for the hero overlay, footer, and announcement bar. Full-bleed lifestyle
photography in the hero and editorial bands. **No gradients as decoration** — the
only gradient is a navy scrim over hero/feature photography for text legibility.
A scrolling small-caps **marquee** ("Made for plus-size bodies · Premium fabrics,
intentional fit · Crafted in South Africa") with FF-monogram separators.

**Imagery vibe.** Warm, aspirational lifestyle photography — bigger men in FEIRI
monogram knits, often with elegantly-styled partners, in lounges, offices, and
evening settings. Confident, celebratory, premium. Plus clean studio product
shots on near-white. Warm white balance; soft, golden ambient light.

**Corner radii.** Restrained. Buttons/inputs `4–6px`; cards/images `8–10px`.
**Pills** for badges, the cart count, the WhatsApp button, and filter chips.
Nothing bubbly.

**Cards.** Product cards are image-forward: full-bleed photo, soft `shadow-sm`
that lifts to `shadow-md` on hover, centred small-caps title + star rating + price
below. Panels use white/cream with a hairline border or a soft low-spread shadow.

**Shadows / elevation.** Warm, low-spread, tinted toward ink — "soft high depth".
The floating WhatsApp button carries a deeper drop shadow.

**Borders.** Hairline `1px` warm stone. Navy used as solid block dividers in
editorial and image-overlay captions.

**Motion.** Calm — fades and gentle eases, no bounce. The marquee scrolls
linearly and infinitely (paused under `prefers-reduced-motion`). Product cards
lift slightly on hover.

**Hover states.** Buttons darken one step (navy 800→700, cobalt 600→700); product
cards lift with `shadow-md`; links shift toward cobalt. No colour inversions.

**Press states.** A 1px nudge down; no aggressive shrink.

**Fixed elements.** Sticky header (announcement bar + nav), and a fixed green
**"Contact us" WhatsApp button** bottom-right on every page.

**Layout rules.** Centred max-width container, generous gutters
(`clamp(1.5rem,5vw,5rem)`), a centred logo flanked by nav (left) and
search/account/cart (right). Editorial two-column bands alternate text/image.

---

## ICONOGRAPHY

No proprietary icon font was supplied. The system standardises on
**[Lucide](https://lucide.dev)** (CDN) — thin, consistent **1.5–1.75px** strokes,
no fills — which suits the brand's clean, premium chrome. **This is a
substitution — see caveats.** The live store's value-prop tiles use small
illustrated navy icons (tee with "3XL", shopping bag with Rand, needle & spool,
SA map with heart); the kit maps these to the closest Lucide equivalents
(`shirt`, `truck`, `scissors`, `heart-handshake`).

Usage rules:
- Stroke icons only, sized 16 / 20 / 24 / 40px, colour `currentColor` (usually
  navy), never tricolore.
- The **FF monogram** is the only brand glyph — favicons, the marquee separator,
  packaging stamps. Render it from `assets/monogram.svg` / the lockups.
- **Instagram** is the one social glyph; core Lucide no longer ships brand marks,
  so the footer uses a small inline IG glyph (flagged).
- **No emoji.** The floating WhatsApp/"Contact us" button is brand-standard.
- Payment marks (Apple Pay, Samsung Pay, Mastercard, Visa, G Pay) appear in the
  footer; the kit renders them as simple lettered pills (not official logos).

---

## INDEX — what's in this system

**Root**
- `styles.css` — global entry point (`@import` list only). Consumers link this.
- `readme.md` — this file. · `SKILL.md` — Agent-Skill manifest.

**`tokens/`** — CSS custom properties (all reachable from `styles.css`)
- `colors.css` · `typography.css` · `spacing.css` · `effects.css` (radii/shadow/motion/z) · `fonts.css` (webfont import) · `base.css` (element defaults + `.feiri-smallcaps` / `.feiri-display` / tricolore helpers)

**`assets/`** — brand imagery
- `lockup-navy.svg` / `lockup-cream.svg` / `lockup-bordeaux.svg` — single-colour vector lockups
- `logo-lockup-cream.png` / `logo-lockup-navy.png` — full-colour lockups (incl. tricolore) on transparent
- `logo-cream-on-red.jpg` / `logo-cream-on-navy.jpg` / `logo-navy-on-cream.jpg` — lockups on solid grounds
- `monogram.svg` — raw vector FF mark
- **Storefront photography (cropped from the live site):** `hero.jpg`, `product-khaki-blue.jpg`, `product-black-sand.jpg`, `two-models.jpg`, `collar-detail.jpg`, `life-office-1.jpg`, `life-office-2.jpg`, `life-couple-1.jpg`, `life-couple-2.jpg`

**`guidelines/`** — foundation specimen cards (Design System tab)
- Colors: brand anchors (navy + cobalt), cream & neutrals, accents & heritage
- Type: display (Cinzel), editorial small-caps (Cormorant), interface (Jost), scale
- Spacing: scale, radii, elevation
- Brand: logo lockups, monochrome lockup & tricolore

**`components/core/`** — reusable React primitives (see each `*.prompt.md`)
- Button, IconButton, Badge, Tag, Input, Select, Card, Divider, Eyebrow, PriceTag (R/ZAR), ColorSwatch, Rating

**`ui_kits/storefront/`** — full storefront recreation (home, listing, product, cart, contact), clickable. Composes the core primitives; imagery cropped from the live site.

---

## CAVEATS — please review

1. **Fonts — primary is *Griffon*, files still needed.** The brand CI names
   **Griffon** (titling serif, small caps, ExtraLight–SemiBold; Tumelo Matabola /
   Pistis Creative) as the primary header typeface — now reflected throughout the
   system, leading every heading font stack with a ready-to-use `@font-face`
   scaffold in `tokens/fonts.css`. **But Griffon is commercial and I was only sent
   a specimen image, not the font files — a font cannot be installed from a PNG.**
   Until the licensed files arrive, headings render in the closest free
   substitutes (Cormorant Garamond small caps + Cinzel caps); body stays on Jost.
   **Please drag the Griffon `.otf` / `.ttf` / `.woff2` files into the Import
   menu** (or send your licence so I can fetch the webfont). Drop them in
   `assets/fonts/`, uncomment the `@font-face` block, and Griffon goes live
   everywhere automatically. Also confirm whether a separate **body** typeface is
   specified in CI pages I haven't seen.
2. **Iconography is a substitution** (Lucide), and the footer Instagram glyph and
   payment marks are simple stand-ins, not official brand logos. If you have the
   store's exact icon/illustration set or payment badges, share them.
3. **Storefront imagery is the real studio photography you supplied** (`blue 1`,
   `blue 6`, `IMG_8068/8069/8072`), cropped and downscaled into `assets/`
   (`hero-studio.jpg`, `shot-blue.jpg`, `shot-black.jpg`, `collar-detail.jpg`,
   `duo-pair.jpg`, `duo-torso.jpg`, `lounge.jpg`). Both colourways are covered
   (Khaki & Blue, Black & Sand).
4. **Two artwork PDFs** (`Untitled-8_0019/_0020`) and the product-page PDF are
   heavy image-only files that timed out on auto-render. If they hold patterns,
   textures, or extra product shots you want in the system, re-export as PNG/JPG.
5. **Catalogue scope.** The live store currently centres on the Signature Monogram
   Tee (Khaki & Blue, Black & Sand) at R 2,799.00. The kit mirrors exactly that;
   as the range grows, send new SKUs and I'll extend `data.js`.
6. **Earlier draft correction.** An initial pass mis-read "Milano" as Italian
   quiet-luxury (bordeaux/heritage). This system has been corrected to the real
   brand: South African plus-size luxury menswear, cream + navy + cobalt.
