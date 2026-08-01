# oil-me-up

A React web app for essential oil diffuser blends. Built for easy daily use — spa-like, calm, minimal. Deployed via GitHub Pages.

**Live URL:** https://henderj0619.github.io/oil-me-up/
**Deploy:** `npm run deploy`

---

## Design Principles

- Spa-like aesthetic — calm, peaceful, minimal
- ADHD-friendly UX: easy to navigate, minimal choices, clear and concise
- No walls of text — one-line descriptions max
- Card format for every recipe
- Searchable/filterable by vibe, scent profile, or oil name

## Color & Style

- Background: warm linen/cream
- Accents: sage green
- Text: soft taupe
- Cards: rounded corners, soft shadow, generous padding
- Typography: serif for blend names, clean sans-serif for details
- Filter tags: minimal pill-shaped buttons

---

## App Sections

### 1. Blend Recipes (main section)
Searchable card grid. Filter pills at top: `calm` `citrus` `woody` `fresh` `focus` `sleep` `floral` `spicy`

Each card shows:
- Blend name
- One-line vibe description
- Oils + drop counts
- Tags

### 2. Daily Rhythm
Four cards — same visual format as recipes, with a time-of-day label. No ADHD language anywhere.

| Time | Blend | Oils | Drops | Purpose |
|---|---|---|---|---|
| Wake Up | — | Wild Orange + Peppermint + Bergamot | 3+2+2 | Energy, mood lift, start moving |
| Focus | — | Vetiver + Cedarwood + Peppermint | 1+3+2 | Grounded, sustained attention |
| Reset / Regroup | — | Frankincense + Bergamot | 3+3 | Calm clarity, mid-day reset |
| Close of Business | — | Serenity + Cedarwood + Vetiver | 3+3+1 | Wind down, let the day go |

### 3. Diffuser Care
Bottom of page. Three simple rules only:
- **After each use** — empty reservoir, wipe dry
- **Weekly** — quick rinse with clean water
- **Monthly** — 10 drops white vinegar, run 3–5 min, drain, swab ultrasonic chip, air dry

---

## All Blend Recipes

Standard diffuser: 6–8 drops total per 200ml water. Potent oils (vetiver, cassia, clove, wintergreen, peppermint) capped at 1–2 drops.

| Name | Oils | Drops | Vibe Tags |
|---|---|---|---|
| Volcano | Grapefruit + Wild Orange + Cassia | 3+3+1 | citrus, tropical, bright, energizing |
| Santorini | Lemon Eucalyptus + Siberian Fir + Vetiver | 3+3+1 | clean, coastal, fresh |
| Masculine Evening | Breathe + Cedarwood | 3+3 | clean, grounding, masculine, evening |
| Spa/Hotel Lobby | Frankincense + Lavender + Siberian Fir | 2+3+2 | spa, floral, earthy, calm |
| Cozy Wind-Down | Serenity + Cedarwood + Vetiver | 3+3+1 | cozy, warm, sleep, grounding |
| Fresh Clean Daytime | Peppermint + Lemon Eucalyptus + Siberian Fir | 2+3+2 | fresh, clean, energizing, focus |
| Autumn Lane | Balance + Siberian Fir + Cedarwood | 2+2+1 | grounding, earthy, woody |
| Winter Woods | Arborvitae + Cedarwood + Frankincense | 3+2+2 | deep, meditative, forest, woody |
| Still | Balance + Serenity | 3+3 | deep calm, grounding, meditation |
| Clarity | Copaiba + Bergamot + Frankincense | 3+2+2 | spiritual, calm focus |
| Keep Calm | Wild Orange + Cedarwood + Ylang Ylang | 3+3+1 | warm, floral, comforting, calm |
| Peaceful Forest | Peace + Siberian Fir + Frankincense | 2+3+2 | serene, earthy, forest |
| Linen | Lavender + Bergamot + Cedarwood | 3+2+2 | clean, soft, bedroom, floral |
| Holiday Hearth | Holiday Joy + Wild Orange + Clove | 3+2+1 | warm, spicy, festive, cozy |
| Bloom | Bergamot + Ylang Ylang + Litsea | 3+2+2 | bright, floral, feminine, citrus |
| Arctic | Peppermint + Arborvitae + Wintergreen | 3+2+1 | crisp, cool, energizing |

---

## Oils We Own

Wild Orange, Cedarwood, Siberian Fir, Bergamot, Vetiver, Litsea, Cassia, Grapefruit, Frankincense, Clove, Balance, Serenity, Ylang Ylang, Breathe, Peppermint, Tea Tree, DigestZen, Peace, Oregano, Copaiba, Holiday Joy, Wintergreen, Lavender, Lemon Eucalyptus, Arborvitae, Motivate, Summer Savory, Deep Blue, Cinnamon Bark

---

## File Structure

```
src/
  data.js   ← ALL content lives here (oils, recipes, mood map, rhythm, care)
  App.jsx   ← UI only — imports everything from data.js
  App.css   ← All styles
```

### How to add a new oil
Open `src/data.js` and add an entry to the `OILS` object:
```js
'Oil Name': { moods: ['calm','cozy',...], strength: 'medium', family: 'floral' },
```
- `strength`: `'medium'` (3 drops) | `'strong'` (2 drops) | `'very-strong'` (1 drop)
- `family`: used to avoid duplicate scent families in a blend (e.g. `'citrus'`, `'woody'`, `'floral'`)
- `moods`: used by the recommender to match user input

### How to add a new recipe
Open `src/data.js` and add an entry to the `RECIPES` array:
```js
{ name: 'Blend Name', desc: 'one-line vibe', oils: [{ name: 'Lavender', drops: 3 }, ...], tags: ['calm', 'floral'] },
```
- Valid tags: `calm` `citrus` `woody` `fresh` `focus` `sleep` `floral` `spicy`

### How to add a mood keyword (recommender)
Open `src/data.js` and add an entry to `MOOD_MAP`:
```js
keyword: ['mood1', 'mood2', ...],
```

---

## Tech Stack

- Vite + React 19
- No UI library — custom CSS only, keep it lightweight
- `gh-pages` for deployment (`npm run deploy`)
- No backend — all data is static in `src/data.js`
