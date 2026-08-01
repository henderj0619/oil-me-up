import { useState } from 'react'
import './App.css'
import { FILTERS, RECIPES, OILS, MOOD_MAP, DROP_COUNT, RHYTHM, CARE } from './data.js'

function generateBlend(input, exclude = new Set()) {
  if (!input.trim()) return null
  const lower = input.toLowerCase()

  const anchors = Object.keys(OILS).filter(oil => lower.includes(oil.toLowerCase()))

  const targetMoods = new Set()
  anchors.forEach(oil => OILS[oil].moods.forEach(m => targetMoods.add(m)))
  Object.entries(MOOD_MAP).forEach(([word, moods]) => {
    if (lower.includes(word)) moods.forEach(m => targetMoods.add(m))
  })
  lower.split(/\s+/).forEach(w => targetMoods.add(w))

  if (targetMoods.size === 0) return null

  const scored = Object.entries(OILS)
    .filter(([name]) => !anchors.includes(name) && !exclude.has(name))
    .map(([name, data]) => ({ name, ...data, score: data.moods.filter(m => targetMoods.has(m)).length }))
    .filter(o => o.score > 0)
    .sort((a, b) => b.score - a.score)

  let blend = [...anchors.map(n => ({ name: n, ...OILS[n] }))]
  let veryStrongCount = blend.filter(o => o.strength === 'very-strong').length

  for (const oil of scored) {
    if (blend.length >= 3) break
    if (oil.strength === 'very-strong' && veryStrongCount >= 1) continue
    if (blend.some(b => b.family === oil.family && oil.strength === 'strong')) continue
    blend.push(oil)
    if (oil.strength === 'very-strong') veryStrongCount++
  }

  if (blend.length < 2 && exclude.size > 0) return generateBlend(input, new Set())
  if (blend.length < 2) return null

  const oils = blend.map(o => ({ name: o.name, drops: DROP_COUNT[o.strength] }))
  const topMoods = [...targetMoods].filter(m => blend.some(o => o.moods?.includes(m))).slice(0, 3).join(', ')

  return { oils, desc: topMoods || 'a custom blend just for you' }
}

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
    const newExcluded = new Set([...excluded, ...(recommendation?.oils.map(o => o.name) ?? [])])
    setExcluded(newExcluded)
    setRecommendation(generateBlend(recInput, newExcluded))
  }

  return (
    <div className="app">
      <header className="hero">
        <h1>Farmbrook Aromas</h1>
        <p className="tagline">diffuser blends for every moment</p>
      </header>

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
              <button className="retry-btn" onClick={handleRetry}>not your vibe? try another →</button>
            </>
          )}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Blend Library</h2>
        <input
          className="search blend-search"
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
