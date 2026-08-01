import { useState } from 'react'
import './App.css'

// ─── Data ───────────────────────────────────────────────────────────────────

const FILTERS = ['all', 'calm', 'citrus', 'woody', 'fresh', 'focus', 'sleep', 'floral', 'spicy']

const RECIPES = [
  { name: 'Arctic', desc: 'crisp, cool, energizing', oils: [{ name: 'Peppermint', drops: 3 }, { name: 'Arborvitae', drops: 2 }, { name: 'Wintergreen', drops: 1 }], tags: ['fresh', 'focus'] },
  { name: 'Autumn Lane', desc: 'grounding, earthy, woody', oils: [{ name: 'Balance', drops: 2 }, { name: 'Siberian Fir', drops: 2 }, { name: 'Cedarwood', drops: 1 }], tags: ['woody', 'calm'] },
  { name: 'Bloom', desc: 'bright, floral, feminine', oils: [{ name: 'Bergamot', drops: 3 }, { name: 'Ylang Ylang', drops: 2 }, { name: 'Litsea', drops: 2 }], tags: ['floral', 'citrus'] },
  { name: 'Clarity', desc: 'spiritual, calm focus', oils: [{ name: 'Copaiba', drops: 3 }, { name: 'Bergamot', drops: 2 }, { name: 'Frankincense', drops: 2 }], tags: ['focus', 'calm'] },
  { name: 'Cozy Wind-Down', desc: 'warm, grounding, sleepy', oils: [{ name: 'Serenity', drops: 3 }, { name: 'Cedarwood', drops: 3 }, { name: 'Vetiver', drops: 1 }], tags: ['sleep', 'calm', 'woody'] },
  { name: 'Fresh Clean Daytime', desc: 'bright, airy, clean', oils: [{ name: 'Peppermint', drops: 2 }, { name: 'Lemon Eucalyptus', drops: 3 }, { name: 'Siberian Fir', drops: 2 }], tags: ['fresh', 'focus'] },
  { name: 'Holiday Hearth', desc: 'warm, spicy, festive', oils: [{ name: 'Holiday Joy', drops: 3 }, { name: 'Wild Orange', drops: 2 }, { name: 'Clove', drops: 1 }], tags: ['spicy', 'citrus'] },
  { name: 'Keep Calm', desc: 'warm, floral, comforting', oils: [{ name: 'Wild Orange', drops: 3 }, { name: 'Cedarwood', drops: 3 }, { name: 'Ylang Ylang', drops: 1 }], tags: ['calm', 'floral'] },
  { name: 'Linen', desc: 'clean, soft, comforting', oils: [{ name: 'Lavender', drops: 3 }, { name: 'Bergamot', drops: 2 }, { name: 'Cedarwood', drops: 2 }], tags: ['calm', 'floral', 'sleep'] },
  { name: 'Masculine Evening', desc: 'clean, grounding, fresh', oils: [{ name: 'Breathe', drops: 3 }, { name: 'Cedarwood', drops: 3 }], tags: ['woody', 'fresh'] },
  { name: 'Peaceful Forest', desc: 'serene, earthy, forest', oils: [{ name: 'Peace', drops: 2 }, { name: 'Siberian Fir', drops: 3 }, { name: 'Frankincense', drops: 2 }], tags: ['calm', 'woody'] },
  { name: 'Santorini', desc: 'clean, coastal, fresh', oils: [{ name: 'Lemon Eucalyptus', drops: 3 }, { name: 'Siberian Fir', drops: 3 }, { name: 'Vetiver', drops: 1 }], tags: ['fresh', 'woody'] },
  { name: 'Spa / Hotel Lobby', desc: 'earthy, floral, serene', oils: [{ name: 'Frankincense', drops: 2 }, { name: 'Lavender', drops: 3 }, { name: 'Siberian Fir', drops: 2 }], tags: ['calm', 'floral'] },
  { name: 'Still', desc: 'deep calm, grounding, meditation', oils: [{ name: 'Balance', drops: 3 }, { name: 'Serenity', drops: 3 }], tags: ['calm', 'sleep'] },
  { name: 'Volcano', desc: 'bright, citrusy, tropical', oils: [{ name: 'Grapefruit', drops: 3 }, { name: 'Wild Orange', drops: 3 }, { name: 'Cassia', drops: 1 }], tags: ['citrus', 'fresh'] },
  { name: 'Winter Woods', desc: 'deep, meditative, forest', oils: [{ name: 'Arborvitae', drops: 3 }, { name: 'Cedarwood', drops: 2 }, { name: 'Frankincense', drops: 2 }], tags: ['woody', 'calm'] },
]

// Each oil: moods it evokes, scent strength, scent family
const OILS = {
  'Wild Orange':      { moods: ['citrus','energizing','uplifting','happy','morning','bright','cheerful'], strength: 'medium', family: 'citrus' },
  'Cedarwood':        { moods: ['grounding','calm','sleep','woody','earthy','cozy','relaxing'], strength: 'medium', family: 'woody' },
  'Siberian Fir':     { moods: ['fresh','forest','clean','crisp','outdoor','woody','cool'], strength: 'medium', family: 'woody' },
  'Bergamot':         { moods: ['calm','uplifting','citrus','stress','floral','balanced','focus'], strength: 'medium', family: 'citrus-floral' },
  'Vetiver':          { moods: ['grounding','earthy','sleep','calm','focus','anxious','deep'], strength: 'strong', family: 'earthy' },
  'Litsea':           { moods: ['citrus','fresh','energizing','bright','clean','uplifting'], strength: 'medium', family: 'citrus' },
  'Cassia':           { moods: ['spicy','warm','cozy','festive','sweet','earthy'], strength: 'very-strong', family: 'spice' },
  'Grapefruit':       { moods: ['citrus','fresh','energizing','uplifting','bright','morning','happy'], strength: 'medium', family: 'citrus' },
  'Frankincense':     { moods: ['calm','spiritual','meditative','grounding','focus','sacred','quiet'], strength: 'medium', family: 'resinous' },
  'Clove':            { moods: ['spicy','warm','cozy','festive','earthy'], strength: 'strong', family: 'spice' },
  'Balance':          { moods: ['grounding','calm','earthy','balanced','focus','stress','centered'], strength: 'medium', family: 'woody-earthy' },
  'Serenity':         { moods: ['sleep','calm','relaxing','stress','anxious','bedtime','quiet'], strength: 'medium', family: 'floral-herbal' },
  'Ylang Ylang':      { moods: ['floral','romantic','calm','sweet','sensual','warm'], strength: 'strong', family: 'floral' },
  'Breathe':          { moods: ['fresh','clean','clear','open','crisp','outdoor'], strength: 'medium', family: 'minty-woody' },
  'Peppermint':       { moods: ['energizing','focus','fresh','alert','morning','clear','crisp'], strength: 'strong', family: 'minty' },
  'Tea Tree':         { moods: ['clean','fresh','purifying','crisp'], strength: 'strong', family: 'medicinal' },
  'Peace':            { moods: ['calm','serene','stress','anxious','quiet','balanced','gentle'], strength: 'medium', family: 'floral-herbal' },
  'Copaiba':          { moods: ['calm','grounding','earthy','meditative','quiet','deep'], strength: 'medium', family: 'resinous' },
  'Holiday Joy':      { moods: ['festive','spicy','warm','cozy','seasonal','cheerful','citrus'], strength: 'medium', family: 'spice-citrus' },
  'Wintergreen':      { moods: ['crisp','fresh','cool','clean','minty','alert'], strength: 'strong', family: 'minty' },
  'Lavender':         { moods: ['calm','sleep','floral','relaxing','stress','soothing','bedtime','gentle'], strength: 'medium', family: 'floral' },
  'Lemon Eucalyptus': { moods: ['fresh','clean','citrus','outdoor','coastal','crisp','clear','bright'], strength: 'medium', family: 'citrus-fresh' },
  'Arborvitae':       { moods: ['woody','grounding','earthy','forest','meditative','deep'], strength: 'medium', family: 'woody' },
  'Motivate':         { moods: ['energizing','uplifting','morning','focus','productive','happy','citrus'], strength: 'medium', family: 'citrus-herbal' },
  'Deep Blue':        { moods: ['cool','crisp','fresh','minty','soothing','clean'], strength: 'strong', family: 'minty' },
  'Cinnamon Bark':    { moods: ['spicy','warm','cozy','festive','sweet','earthy'], strength: 'very-strong', family: 'spice' },
}

// Map plain-language words → mood tags
const MOOD_MAP = {
  stressed: ['calm','stress','relaxing','grounding'],
  stress: ['calm','stress','soothing'],
  anxious: ['calm','anxious','grounding','quiet'],
  anxiety: ['calm','anxious','grounding'],
  tired: ['energizing','uplifting','morning','alert'],
  exhausted: ['energizing','uplifting','morning'],
  awake: ['energizing','morning','alert','crisp'],
  sleep: ['sleep','calm','bedtime','relaxing'],
  sleeping: ['sleep','bedtime','calm'],
  bedtime: ['sleep','bedtime','calm','relaxing'],
  focus: ['focus','energizing','clear','alert'],
  focused: ['focus','clear','balanced'],
  concentrate: ['focus','clear','alert'],
  productive: ['focus','energizing','uplifting','productive'],
  happy: ['uplifting','citrus','cheerful','bright'],
  cozy: ['cozy','warm','spicy','woody','earthy'],
  warm: ['warm','cozy','spicy','earthy'],
  calm: ['calm','relaxing','grounding','quiet'],
  relax: ['calm','relaxing','stress','soothing'],
  relaxed: ['calm','relaxing','soothing'],
  energy: ['energizing','uplifting','morning','citrus'],
  energize: ['energizing','uplifting','morning'],
  morning: ['morning','energizing','uplifting','fresh'],
  romantic: ['romantic','floral','sensual','warm'],
  meditate: ['meditative','spiritual','grounding','calm'],
  meditation: ['meditative','spiritual','calm','quiet'],
  grounded: ['grounding','earthy','calm','centered'],
  uplifting: ['uplifting','citrus','cheerful','bright'],
  festive: ['festive','spicy','warm','seasonal','citrus'],
  clean: ['clean','fresh','purifying','crisp'],
  fresh: ['fresh','clean','crisp','outdoor'],
  forest: ['forest','woody','earthy','outdoor'],
  outdoor: ['outdoor','forest','fresh','crisp'],
  spa: ['calm','floral','clean','fresh','soothing'],
  sad: ['uplifting','citrus','cheerful','bright'],
  overwhelmed: ['calm','grounding','stress','quiet'],
  foggy: ['focus','clear','alert','energizing'],
  unmotivated: ['energizing','uplifting','productive','morning'],
  floral: ['floral','romantic','sweet','gentle'],
  citrus: ['citrus','uplifting','bright','fresh'],
  woody: ['woody','earthy','grounding','forest'],
  spicy: ['spicy','warm','cozy','festive'],
  night: ['sleep','calm','relaxing','bedtime'],
  evening: ['calm','relaxing','sleep','quiet'],
}

const DROP_COUNT = { 'very-strong': 1, 'strong': 2, 'medium': 3 }

function generateBlend(input, exclude = new Set()) {
  if (!input.trim()) return null
  const lower = input.toLowerCase()

  // Detect any oil names typed directly (anchors are never excluded)
  const anchors = Object.keys(OILS).filter(oil =>
    lower.includes(oil.toLowerCase())
  )

  // Collect target moods from input words + mood map
  const targetMoods = new Set()
  anchors.forEach(oil => OILS[oil].moods.forEach(m => targetMoods.add(m)))
  Object.entries(MOOD_MAP).forEach(([word, moods]) => {
    if (lower.includes(word)) moods.forEach(m => targetMoods.add(m))
  })
  lower.split(/\s+/).forEach(w => targetMoods.add(w))

  if (targetMoods.size === 0) return null

  // Score every oil, excluding previously shown ones (unless they're anchors)
  const scored = Object.entries(OILS)
    .filter(([name]) => !anchors.includes(name) && !exclude.has(name))
    .map(([name, data]) => ({
      name,
      ...data,
      score: data.moods.filter(m => targetMoods.has(m)).length
    }))
    .filter(o => o.score > 0)
    .sort((a, b) => b.score - a.score)

  // Build blend: anchors first, then top scored, max 3, max 1 very-strong
  let blend = [...anchors.map(n => ({ name: n, ...OILS[n] }))]
  let veryStrongCount = blend.filter(o => o.strength === 'very-strong').length

  for (const oil of scored) {
    if (blend.length >= 3) break
    if (oil.strength === 'very-strong' && veryStrongCount >= 1) continue
    if (blend.some(b => b.family === oil.family && oil.strength === 'strong')) continue
    blend.push(oil)
    if (oil.strength === 'very-strong') veryStrongCount++
  }

  // If excluding narrowed us to < 2 oils, fall back without exclusions
  if (blend.length < 2 && exclude.size > 0) {
    return generateBlend(input, new Set())
  }
  if (blend.length < 2) return null

  const oils = blend.map(o => ({ name: o.name, drops: DROP_COUNT[o.strength] }))

  const topMoods = [...targetMoods]
    .filter(m => blend.some(o => o.moods && o.moods.includes(m)))
    .slice(0, 3)
    .join(', ')

  return { oils, desc: topMoods || 'a custom blend just for you' }
}

const RHYTHM = [
  { time: 'Wake Up', oils: 'Wild Orange · Peppermint · Bergamot', drops: '3 + 2 + 2', purpose: 'Energy, mood lift, start moving' },
  { time: 'Focus', oils: 'Vetiver · Cedarwood · Peppermint', drops: '1 + 3 + 2', purpose: 'Grounded, sustained attention' },
  { time: 'Reset / Regroup', oils: 'Frankincense · Bergamot', drops: '3 + 3', purpose: 'Calm clarity, mid-day reset' },
  { time: 'Close of Business', oils: 'Serenity · Cedarwood · Vetiver', drops: '3 + 3 + 1', purpose: 'Wind down, let the day go' },
]

const CARE = [
  { freq: 'After Each Use', instruction: 'Empty reservoir and wipe dry.' },
  { freq: 'Weekly', instruction: 'Quick rinse with clean water.' },
  { freq: 'Monthly', instruction: '10 drops white vinegar, run 3–5 min, drain and wipe, air dry.' },
]

// ─── App ────────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState('all')
  const [search, setSearch] = useState('')
  const [recInput, setRecInput] = useState('')
  const [recommendation, setRecommendation] = useState(null)
  const [tried, setTried] = useState(false)
  const [excluded, setExcluded] = useState(new Set())

  const filtered = RECIPES
    .filter(r => {
      const matchesTag = active === 'all' || r.tags.includes(active)
      const matchesSearch = search === '' ||
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.desc.toLowerCase().includes(search.toLowerCase()) ||
        r.oils.some(o => o.name.toLowerCase().includes(search.toLowerCase()))
      return matchesTag && matchesSearch
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  function handleRecommend() {
    setTried(true)
    setExcluded(new Set())
    setRecommendation(generateBlend(recInput, new Set()))
  }

  function handleRetry() {
    const newExcluded = new Set([
      ...excluded,
      ...(recommendation?.oils.map(o => o.name) ?? [])
    ])
    setExcluded(newExcluded)
    setRecommendation(generateBlend(recInput, newExcluded))
  }

  return (
    <div className="app">
      <header className="hero">
        <h1>diffuser blends for every moment</h1>
        <input
          className="search"
          type="text"
          placeholder="search by oil, vibe, or name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="filters">
          {FILTERS.map(f => (
            <button key={f} className={`pill ${active === f ? 'active' : ''}`} onClick={() => setActive(f)}>
              {f}
            </button>
          ))}
        </div>
      </header>

      {/* DAILY RHYTHM */}
      <section className="section">
        <h2 className="section-title">Daily Rhythm</h2>
        <div className="card-grid four-col">
          {RHYTHM.map(r => (
            <div className="card rhythm-card" key={r.time}>
              <span className="time-label">{r.time}</span>
              <p className="oils-inline">{r.oils}</p>
              <p className="drops-inline">{r.drops} drops</p>
              <p className="purpose">{r.purpose}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RECOMMEND ME A BLEND */}
      <section className="section">
        <h2 className="section-title">Recommend Me a Blend</h2>
        <div className="rec-box">
          <p className="rec-hint">Tell me how you're feeling, or name a couple of oils you want to use.</p>
          <div className="rec-input-row">
            <input
              className="search rec-input"
              type="text"
              placeholder="e.g. 'cozy and calm' or 'lavender and cedarwood'..."
              value={recInput}
              onChange={e => { setRecInput(e.target.value); setTried(false); setRecommendation(null) }}
              onKeyDown={e => e.key === 'Enter' && handleRecommend()}
            />
            <button className="rec-btn" onClick={handleRecommend}>Go</button>
          </div>

          {tried && !recommendation && (
            <p className="rec-empty">Hmm, couldn't match that — try a mood word like "cozy", "focused", or an oil name.</p>
          )}

          {recommendation && (
            <>
              <div className="card rec-result">
                <p className="desc">{recommendation.desc}</p>
                <ul className="oils">
                  {recommendation.oils.map(o => (
                    <li key={o.name}>
                      <span className="oil-name">{o.name}</span>
                      <span className="drops">{o.drops} drops</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="retry-btn" onClick={handleRetry}>
                not your vibe? try another →
              </button>
            </>
          )}
        </div>
      </section>

      {/* BLENDS */}
      <section className="section">
        <h2 className="section-title">Blends</h2>
        <div className="card-grid">
          {filtered.map(r => (
            <div className="card" key={r.name}>
              <h3>{r.name}</h3>
              <p className="desc">{r.desc}</p>
              <ul className="oils">
                {r.oils.map(o => (
                  <li key={o.name}>
                    <span className="oil-name">{o.name}</span>
                    <span className="drops">{o.drops} drops</span>
                  </li>
                ))}
              </ul>
              <div className="tag-row">
                {r.tags.map(t => <span className="tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DIFFUSER CARE */}
      <section className="section care-section">
        <h2 className="section-title">Diffuser Care</h2>
        <div className="care-grid">
          {CARE.map(c => (
            <div className="care-card" key={c.freq}>
              <span className="care-freq">{c.freq}</span>
              <p className="care-instruction">{c.instruction}</p>
            </div>
          ))}
        </div>
      </section>

      <footer><p>made with love · {new Date().getFullYear()}</p></footer>
    </div>
  )
}
