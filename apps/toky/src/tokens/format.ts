function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function getColorHex(value: unknown): string | null {
  if (!isPlainObject(value)) return null
  return typeof value.hex === 'string' ? value.hex : null
}

const HEX_COLOR_RE = /^#([0-9a-fA-F]{6})$/

export interface ColorValue {
  colorSpace: string
  components: [number, number, number]
  alpha: number
  hex: string
}

// Builds a full DTCG color object from a hex string, preserving colorSpace/alpha
// from the token's previous value when available (defaults to srgb / opaque).
export function hexToColorValue(hex: string, previous?: unknown): ColorValue | null {
  const match = HEX_COLOR_RE.exec(hex.trim())
  if (!match) return null

  const int = parseInt(match[1], 16)
  const components: [number, number, number] = [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255]
  const alpha = isPlainObject(previous) && typeof previous.alpha === 'number' ? previous.alpha : 1
  const colorSpace = isPlainObject(previous) && typeof previous.colorSpace === 'string' ? previous.colorSpace : 'srgb'

  return { colorSpace, components, alpha, hex: `#${match[1].toUpperCase()}` }
}

export function formatValue(value: unknown): string {
  if (value === undefined || value === null) return '—'

  const hex = getColorHex(value)
  if (hex) return hex

  if (typeof value === 'number' || typeof value === 'string') return String(value)

  return JSON.stringify(value)
}
