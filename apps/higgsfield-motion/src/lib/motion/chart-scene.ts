/**
 * Deterministic RetireMe chart-motion scene. Pure drawing code: given a prompt-derived
 * spec and a normalized time t in [0, 1], paints one frame onto a 2D context.
 */

export interface SceneSpec {
  seed: number
  bias: 'up' | 'down'
  wordmark: string
  headline: string
  subline: string
  ticker: string
}

export interface Candle {
  o: number
  h: number
  l: number
  c: number
}

const WORDMARK = 'RetireMe'

function fnv1a(str: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function parsePrompt(prompt: string): SceneSpec {
  const text = prompt.trim()
  const lower = text.toLowerCase()
  const bearish = /\b(bear|bearish|drawdown|crash|sell[- ]?off|short|decline|down)\b/.test(lower)
  const quoted = text.match(/["“']([^"”']{3,60})["”']/)
  const tickerMatch = text.match(/\b\$?([A-Z]{2,5})\b(?=\s*(?:·|,|\s|$))/)

  let subline = 'Institutional-grade indicators for retail'
  if (/\bsignal|entry|alert\b/.test(lower)) subline = bearish ? 'Exit signal · risk-off' : 'Long entry · confirmed'
  else if (/\bretire|retirement\b/.test(lower)) subline = 'Retire on your terms'

  return {
    seed: fnv1a(text || WORDMARK),
    bias: bearish ? 'down' : 'up',
    wordmark: WORDMARK,
    headline: quoted?.[1] ?? (bearish ? 'Know when to step aside' : 'Retire on your terms'),
    subline,
    ticker: tickerMatch?.[1] && tickerMatch[1] !== 'RETIREME' ? `${tickerMatch[1]} · 1D` : 'SPY · 1D',
  }
}

export function generateSeries(spec: SceneSpec, count: number): Candle[] {
  const rand = mulberry32(spec.seed)
  const drift = spec.bias === 'up' ? 0.0035 : -0.003
  const candles: Candle[] = []
  let price = 100
  for (let i = 0; i < count; i++) {
    const shock = (rand() - 0.5) * 0.028
    const o = price
    const c = o * (1 + drift + shock)
    const span = Math.abs(c - o) + o * (0.002 + rand() * 0.01)
    const h = Math.max(o, c) + span * rand() * 0.6
    const l = Math.min(o, c) - span * rand() * 0.6
    candles.push({ o, h, l, c })
    price = c
  }
  return candles
}

function ema(values: number[], period: number): number[] {
  const k = 2 / (period + 1)
  const out: number[] = []
  let prev = values[0]
  for (const v of values) {
    prev = v * k + prev * (1 - k)
    out.push(prev)
  }
  return out
}

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3)
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
const clamp01 = (x: number) => Math.min(1, Math.max(0, x))
const window = (t: number, start: number, end: number) => clamp01((t - start) / (end - start))

const COLORS = {
  bg0: '#0a0d12',
  bg1: '#0f141b',
  grid: 'rgba(255,255,255,0.045)',
  text: '#e6e9ef',
  muted: 'rgba(230,233,239,0.55)',
  up: '#34d399',
  down: '#f87171',
  emaFast: '#7dd3fc',
  emaSlow: '#c4b5fd',
  signal: '#fbbf24',
}

export function drawFrame(
  ctx: CanvasRenderingContext2D,
  spec: SceneSpec,
  series: Candle[],
  t: number,
  w: number,
  h: number,
) {
  // Background
  const bg = ctx.createLinearGradient(0, 0, 0, h)
  bg.addColorStop(0, COLORS.bg1)
  bg.addColorStop(1, COLORS.bg0)
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)

  const pad = { l: w * 0.06, r: w * 0.11, t: h * 0.18, b: h * 0.2 }
  const plotW = w - pad.l - pad.r
  const plotH = h - pad.t - pad.b

  // Grid
  ctx.strokeStyle = COLORS.grid
  ctx.lineWidth = 1
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + (plotH * i) / 4
    ctx.beginPath()
    ctx.moveTo(pad.l, y)
    ctx.lineTo(pad.l + plotW, y)
    ctx.stroke()
  }

  // Wordmark + ticker
  const headerA = window(t, 0, 0.1)
  ctx.globalAlpha = easeOutCubic(headerA)
  ctx.fillStyle = COLORS.text
  ctx.font = `600 ${Math.round(h * 0.045)}px Inter, system-ui, -apple-system, sans-serif`
  ctx.textBaseline = 'alphabetic'
  ctx.textAlign = 'left'
  ctx.fillText(spec.wordmark, pad.l, h * 0.1)
  ctx.fillStyle = COLORS.muted
  ctx.font = `500 ${Math.round(h * 0.026)}px Inter, system-ui, -apple-system, sans-serif`
  ctx.textAlign = 'right'
  ctx.fillText(spec.ticker, w - pad.r, h * 0.1)
  ctx.globalAlpha = 1

  // Price scale
  const lo = Math.min(...series.map((c) => c.l))
  const hi = Math.max(...series.map((c) => c.h))
  const range = hi - lo || 1
  const yOf = (p: number) => pad.t + plotH - ((p - lo) / range) * plotH
  const n = series.length
  const slot = plotW / n
  const xOf = (i: number) => pad.l + slot * i + slot / 2

  ctx.fillStyle = COLORS.muted
  ctx.font = `400 ${Math.round(h * 0.022)}px ui-monospace, SFMono-Regular, Menlo, monospace`
  ctx.textAlign = 'left'
  ctx.globalAlpha = easeOutCubic(headerA) * 0.9
  for (let i = 0; i <= 4; i++) {
    const p = hi - (range * i) / 4
    ctx.fillText(p.toFixed(1), pad.l + plotW + w * 0.015, pad.t + (plotH * i) / 4 + h * 0.008)
  }
  ctx.globalAlpha = 1

  // Candles, revealed progressively
  const reveal = easeInOut(window(t, 0.06, 0.7))
  const visible = reveal * n
  const fullCount = Math.floor(visible)
  const partial = visible - fullCount
  const bodyW = Math.max(2, slot * 0.55)

  const drawCandle = (c: Candle, i: number, alpha: number) => {
    const upC = c.c >= c.o
    ctx.globalAlpha = alpha
    ctx.strokeStyle = upC ? COLORS.up : COLORS.down
    ctx.fillStyle = upC ? COLORS.up : COLORS.down
    ctx.lineWidth = Math.max(1, slot * 0.12)
    const x = xOf(i)
    ctx.beginPath()
    ctx.moveTo(x, yOf(c.h))
    ctx.lineTo(x, yOf(c.l))
    ctx.stroke()
    const top = yOf(Math.max(c.o, c.c))
    const bottom = yOf(Math.min(c.o, c.c))
    ctx.fillRect(x - bodyW / 2, top, bodyW, Math.max(1.5, bottom - top))
    ctx.globalAlpha = 1
  }
  for (let i = 0; i < fullCount && i < n; i++) drawCandle(series[i], i, 1)
  if (fullCount < n && partial > 0) drawCandle(series[fullCount], fullCount, partial)

  // EMA ribbon (fast/slow), trails the candles slightly
  const closes = series.map((c) => c.c)
  const fast = ema(closes, 8)
  const slow = ema(closes, 21)
  const ribbonCount = Math.max(0, Math.floor(visible) - 2)
  const drawLine = (vals: number[], color: string, width: number) => {
    if (ribbonCount < 2) return
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.lineJoin = 'round'
    ctx.beginPath()
    for (let i = 0; i < ribbonCount; i++) {
      const x = xOf(i)
      const y = yOf(vals[i])
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
  ctx.globalAlpha = 0.9
  drawLine(slow, COLORS.emaSlow, Math.max(1.5, h * 0.004))
  drawLine(fast, COLORS.emaFast, Math.max(1.5, h * 0.004))
  ctx.globalAlpha = 1

  // Signal marker: fires once the ribbon is complete
  const sigT = window(t, 0.7, 0.86)
  if (sigT > 0) {
    const idx = Math.floor(n * 0.78)
    const c = series[idx]
    const x = xOf(idx)
    const isUp = spec.bias === 'up'
    const y = isUp ? yOf(c.l) + h * 0.05 : yOf(c.h) - h * 0.05
    const pulse = easeOutCubic(sigT)
    ctx.globalAlpha = (1 - pulse) * 0.7
    ctx.strokeStyle = COLORS.signal
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(x, y, h * 0.02 + pulse * h * 0.09, 0, Math.PI * 2)
    ctx.stroke()
    ctx.globalAlpha = Math.min(1, sigT * 3)
    ctx.fillStyle = COLORS.signal
    const s = h * 0.018
    ctx.beginPath()
    if (isUp) {
      ctx.moveTo(x, y - s)
      ctx.lineTo(x - s, y + s)
      ctx.lineTo(x + s, y + s)
    } else {
      ctx.moveTo(x, y + s)
      ctx.lineTo(x - s, y - s)
      ctx.lineTo(x + s, y - s)
    }
    ctx.closePath()
    ctx.fill()
    ctx.globalAlpha = 1
  }

  // Headline + subline
  const textT = easeOutCubic(window(t, 0.76, 0.92))
  if (textT > 0) {
    const baseY = h - pad.b * 0.45
    const rise = (1 - textT) * h * 0.02
    ctx.globalAlpha = textT
    ctx.textAlign = 'left'
    ctx.fillStyle = COLORS.text
    ctx.font = `600 ${Math.round(h * 0.06)}px Inter, system-ui, -apple-system, sans-serif`
    ctx.fillText(spec.headline, pad.l, baseY + rise)
    ctx.fillStyle = COLORS.muted
    ctx.font = `400 ${Math.round(h * 0.028)}px Inter, system-ui, -apple-system, sans-serif`
    ctx.fillText(spec.subline, pad.l, baseY + rise + h * 0.05)
    // Underline sweep
    ctx.fillStyle = spec.bias === 'up' ? COLORS.up : COLORS.down
    ctx.fillRect(pad.l, baseY + rise + h * 0.075, plotW * 0.22 * textT, Math.max(2, h * 0.004))
    ctx.globalAlpha = 1
  }

  // Fade to background in the final beat so the loop restarts cleanly
  const fade = window(t, 0.95, 1)
  if (fade > 0) {
    ctx.globalAlpha = easeInOut(fade)
    ctx.fillStyle = COLORS.bg0
    ctx.fillRect(0, 0, w, h)
    ctx.globalAlpha = 1
  }
}
