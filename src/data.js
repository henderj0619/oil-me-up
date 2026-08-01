// ─────────────────────────────────────────────────────────────────────────────
// data.js — All content for Farmbrook Aromas
//
// TO ADD A NEW OIL:
//   1. Add an entry to OILS with moods, strength, and family (see existing for reference)
//      strength: 'medium' | 'strong' | 'very-strong'
//      very-strong = 1 drop max (cassia, cinnamon bark)
//      strong      = 2 drops max (vetiver, peppermint, clove, ylang ylang)
//      medium      = 3 drops (everything else)
//
// TO ADD A NEW RECIPE:
//   2. Add an entry to RECIPES with name, desc, oils array, and tags
//      Tags must be from: calm, citrus, woody, fresh, focus, sleep, floral, spicy
//
// TO ADD A NEW MOOD KEYWORD (for the recommender):
//   3. Add an entry to MOOD_MAP mapping the word to relevant mood tags
// ─────────────────────────────────────────────────────────────────────────────

export const FILTERS = ['all', 'calm', 'citrus', 'woody', 'fresh', 'focus', 'sleep', 'floral', 'spicy']

// ─── Blend Library ───────────────────────────────────────────────────────────

export const RECIPES = [
  { name: 'Arctic', desc: 'crisp, cool, energizing', oils: [{ name: 'Peppermint', drops: 3 }, { name: 'Arborvitae', drops: 2 }, { name: 'Wintergreen', drops: 1 }], tags: ['fresh', 'focus'] },
  { name: 'Autumn Lane', desc: 'grounding, earthy, woody', oils: [{ name: 'Balance', drops: 2 }, { name: 'Siberian Fir', drops: 2 }, { name: 'Cedarwood', drops: 1 }], tags: ['woody', 'calm'] },
  { name: 'Bloom', desc: 'bright, floral, feminine', oils: [{ name: 'Bergamot', drops: 3 }, { name: 'Ylang Ylang', drops: 2 }, { name: 'Litsea', drops: 2 }], tags: ['floral', 'citrus'] },
  { name: 'Clarity', desc: 'spiritual, calm focus', oils: [{ name: 'Copaiba', drops: 3 }, { name: 'Bergamot', drops: 2 }, { name: 'Frankincense', drops: 2 }], tags: ['focus', 'calm'] },
  { name: 'Cozy Wind-Down', desc: 'warm, grounding, sleepy', oils: [{ name: 'Serenity', drops: 3 }, { name: 'Cedarwood', drops: 3 }, { name: 'Vetiver', drops: 1 }], tags: ['sleep', 'calm', 'woody'] },
  { name: 'Fresh Clean Daytime', desc: 'bright, airy, clean', oils: [{ name: 'Peppermint', drops: 2 }, { name: 'Eucalyptus', drops: 3 }, { name: 'Siberian Fir', drops: 2 }], tags: ['fresh', 'focus'] },
  { name: 'Holiday Hearth', desc: 'warm, spicy, festive', oils: [{ name: 'Holiday Joy', drops: 3 }, { name: 'Wild Orange', drops: 2 }, { name: 'Clove', drops: 1 }], tags: ['spicy', 'citrus'] },
  { name: 'Keep Calm', desc: 'warm, floral, comforting', oils: [{ name: 'Wild Orange', drops: 3 }, { name: 'Cedarwood', drops: 3 }, { name: 'Ylang Ylang', drops: 1 }], tags: ['calm', 'floral'] },
  { name: 'Linen', desc: 'clean, soft, comforting', oils: [{ name: 'Lavender', drops: 3 }, { name: 'Bergamot', drops: 2 }, { name: 'Cedarwood', drops: 2 }], tags: ['calm', 'floral', 'sleep'] },
  { name: 'Masculine Evening', desc: 'clean, grounding, fresh', oils: [{ name: 'Breathe', drops: 3 }, { name: 'Cedarwood', drops: 3 }], tags: ['woody', 'fresh'] },
  { name: 'Peaceful Forest', desc: 'serene, earthy, forest', oils: [{ name: 'Peace', drops: 2 }, { name: 'Siberian Fir', drops: 3 }, { name: 'Frankincense', drops: 2 }], tags: ['calm', 'woody'] },
  { name: 'Santorini', desc: 'clean, coastal, fresh', oils: [{ name: 'Eucalyptus', drops: 3 }, { name: 'Siberian Fir', drops: 3 }, { name: 'Vetiver', drops: 1 }], tags: ['fresh', 'woody'] },
  { name: 'Spa / Hotel Lobby', desc: 'earthy, floral, serene', oils: [{ name: 'Frankincense', drops: 2 }, { name: 'Lavender', drops: 3 }, { name: 'Siberian Fir', drops: 2 }], tags: ['calm', 'floral'] },
  { name: 'Still', desc: 'deep calm, grounding, meditation', oils: [{ name: 'Balance', drops: 3 }, { name: 'Serenity', drops: 3 }], tags: ['calm', 'sleep'] },
  { name: 'Volcano', desc: 'bright, citrusy, tropical', oils: [{ name: 'Grapefruit', drops: 3 }, { name: 'Wild Orange', drops: 3 }, { name: 'Cassia', drops: 1 }], tags: ['citrus', 'fresh'] },
  { name: 'Winter Woods', desc: 'deep, meditative, forest', oils: [{ name: 'Arborvitae', drops: 3 }, { name: 'Cedarwood', drops: 2 }, { name: 'Frankincense', drops: 2 }], tags: ['woody', 'calm'] },
]

// ─── Oil Library (used by the recommender) ───────────────────────────────────

export const OILS = {
  'Wild Orange':    { moods: ['citrus','energizing','uplifting','happy','morning','bright','cheerful'], strength: 'medium', family: 'citrus' },
  'Cedarwood':      { moods: ['grounding','calm','sleep','woody','earthy','cozy','relaxing'], strength: 'medium', family: 'woody' },
  'Siberian Fir':   { moods: ['fresh','forest','clean','crisp','outdoor','woody','cool'], strength: 'medium', family: 'woody' },
  'Bergamot':       { moods: ['calm','uplifting','citrus','stress','floral','balanced','focus'], strength: 'medium', family: 'citrus-floral' },
  'Vetiver':        { moods: ['grounding','earthy','sleep','calm','focus','anxious','deep'], strength: 'strong', family: 'earthy' },
  'Litsea':         { moods: ['citrus','fresh','energizing','bright','clean','uplifting'], strength: 'medium', family: 'citrus' },
  'Cassia':         { moods: ['spicy','warm','cozy','festive','sweet','earthy'], strength: 'very-strong', family: 'spice' },
  'Grapefruit':     { moods: ['citrus','fresh','energizing','uplifting','bright','morning','happy'], strength: 'medium', family: 'citrus' },
  'Frankincense':   { moods: ['calm','spiritual','meditative','grounding','focus','sacred','quiet'], strength: 'medium', family: 'resinous' },
  'Clove':          { moods: ['spicy','warm','cozy','festive','earthy'], strength: 'strong', family: 'spice' },
  'Balance':        { moods: ['grounding','calm','earthy','balanced','focus','stress','centered'], strength: 'medium', family: 'woody-earthy' },
  'Serenity':       { moods: ['sleep','calm','relaxing','stress','anxious','bedtime','quiet'], strength: 'medium', family: 'floral-herbal' },
  'Ylang Ylang':    { moods: ['floral','romantic','calm','sweet','sensual','warm'], strength: 'strong', family: 'floral' },
  'Breathe':        { moods: ['fresh','clean','clear','open','crisp','outdoor'], strength: 'medium', family: 'minty-woody' },
  'Peppermint':     { moods: ['energizing','focus','fresh','alert','morning','clear','crisp'], strength: 'strong', family: 'minty' },
  'Tea Tree':       { moods: ['clean','fresh','purifying','crisp'], strength: 'strong', family: 'medicinal' },
  'Peace':          { moods: ['calm','serene','stress','anxious','quiet','balanced','gentle'], strength: 'medium', family: 'floral-herbal' },
  'Copaiba':        { moods: ['calm','grounding','earthy','meditative','quiet','deep'], strength: 'medium', family: 'resinous' },
  'Holiday Joy':    { moods: ['festive','spicy','warm','cozy','seasonal','cheerful','citrus'], strength: 'medium', family: 'spice-citrus' },
  'Wintergreen':    { moods: ['crisp','fresh','cool','clean','minty','alert'], strength: 'strong', family: 'minty' },
  'Lavender':       { moods: ['calm','sleep','floral','relaxing','stress','soothing','bedtime','gentle'], strength: 'medium', family: 'floral' },
  'Eucalyptus':     { moods: ['fresh','clean','citrus','outdoor','coastal','crisp','clear','bright'], strength: 'medium', family: 'citrus-fresh' },
  'Arborvitae':     { moods: ['woody','grounding','earthy','forest','meditative','deep'], strength: 'medium', family: 'woody' },
  'Motivate':       { moods: ['energizing','uplifting','morning','focus','productive','happy','citrus'], strength: 'medium', family: 'citrus-herbal' },
  'Deep Blue':      { moods: ['cool','crisp','fresh','minty','soothing','clean'], strength: 'strong', family: 'minty' },
  'Cinnamon Bark':  { moods: ['spicy','warm','cozy','festive','sweet','earthy'], strength: 'very-strong', family: 'spice' },
}

// ─── Mood keyword map (for the recommender) ──────────────────────────────────

export const MOOD_MAP = {
  stressed:     ['calm','stress','relaxing','grounding'],
  stress:       ['calm','stress','soothing'],
  anxious:      ['calm','anxious','grounding','quiet'],
  anxiety:      ['calm','anxious','grounding'],
  tired:        ['energizing','uplifting','morning','alert'],
  exhausted:    ['energizing','uplifting','morning'],
  awake:        ['energizing','morning','alert','crisp'],
  sleep:        ['sleep','calm','bedtime','relaxing'],
  sleeping:     ['sleep','bedtime','calm'],
  bedtime:      ['sleep','bedtime','calm','relaxing'],
  focus:        ['focus','energizing','clear','alert'],
  focused:      ['focus','clear','balanced'],
  concentrate:  ['focus','clear','alert'],
  productive:   ['focus','energizing','uplifting','productive'],
  happy:        ['uplifting','citrus','cheerful','bright'],
  cozy:         ['cozy','warm','spicy','woody','earthy'],
  warm:         ['warm','cozy','spicy','earthy'],
  calm:         ['calm','relaxing','grounding','quiet'],
  relax:        ['calm','relaxing','stress','soothing'],
  relaxed:      ['calm','relaxing','soothing'],
  energy:       ['energizing','uplifting','morning','citrus'],
  energize:     ['energizing','uplifting','morning'],
  morning:      ['morning','energizing','uplifting','fresh'],
  romantic:     ['romantic','floral','sensual','warm'],
  meditate:     ['meditative','spiritual','grounding','calm'],
  meditation:   ['meditative','spiritual','calm','quiet'],
  grounded:     ['grounding','earthy','calm','centered'],
  uplifting:    ['uplifting','citrus','cheerful','bright'],
  festive:      ['festive','spicy','warm','seasonal','citrus'],
  clean:        ['clean','fresh','purifying','crisp'],
  fresh:        ['fresh','clean','crisp','outdoor'],
  forest:       ['forest','woody','earthy','outdoor'],
  outdoor:      ['outdoor','forest','fresh','crisp'],
  spa:          ['calm','floral','clean','fresh','soothing'],
  sad:          ['uplifting','citrus','cheerful','bright'],
  overwhelmed:  ['calm','grounding','stress','quiet'],
  foggy:        ['focus','clear','alert','energizing'],
  unmotivated:  ['energizing','uplifting','productive','morning'],
  floral:       ['floral','romantic','sweet','gentle'],
  citrus:       ['citrus','uplifting','bright','fresh'],
  woody:        ['woody','earthy','grounding','forest'],
  spicy:        ['spicy','warm','cozy','festive'],
  night:        ['sleep','calm','relaxing','bedtime'],
  evening:      ['calm','relaxing','sleep','quiet'],
}

export const DROP_COUNT = { 'very-strong': 1, 'strong': 2, 'medium': 3 }

// ─── Daily Rhythm ─────────────────────────────────────────────────────────────

export const RHYTHM = [
  { time: 'Wake Up',           oils: 'Wild Orange · Peppermint · Bergamot', drops: '3 + 2 + 2', purpose: 'Energy, mood lift, start moving' },
  { time: 'Focus',             oils: 'Vetiver · Cedarwood · Peppermint',    drops: '1 + 3 + 2', purpose: 'Grounded, sustained attention' },
  { time: 'Reset / Regroup',   oils: 'Frankincense · Bergamot',             drops: '3 + 3',     purpose: 'Calm clarity, mid-day reset' },
  { time: 'Close of Business', oils: 'Serenity · Cedarwood · Vetiver',      drops: '3 + 3 + 1', purpose: 'Wind down, let the day go' },
]

// ─── Diffuser Care ────────────────────────────────────────────────────────────

export const CARE = [
  { freq: 'After Each Use', instruction: 'Empty reservoir and wipe dry.' },
  { freq: 'Weekly',         instruction: 'Quick rinse with clean water.' },
  { freq: 'Monthly',        instruction: '10 drops white vinegar, run 3–5 min, drain and wipe, air dry.' },
]
