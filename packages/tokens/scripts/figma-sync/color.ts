export interface FigmaColor {
  r: number
  g: number
  b: number
  a: number
}

export interface TokenColorValue {
  colorSpace: 'srgb'
  components: [number, number, number]
  alpha: number
  hex: string
}

function toHexByte(channel: number): string {
  const byte = Math.round(Math.min(1, Math.max(0, channel)) * 255)
  return byte.toString(16).padStart(2, '0').toUpperCase()
}

/**
 * Figma's Variables REST API returns colors as 0-1 float RGBA. Our tokens
 * format expects the DTCG-ish { colorSpace, components, alpha, hex } shape
 * that Figma's own "Export variables as JSON" UI produces.
 */
export function figmaColorToTokenValue(color: FigmaColor): TokenColorValue {
  const { r, g, b, a } = color
  return {
    colorSpace: 'srgb',
    components: [r, g, b],
    alpha: a,
    hex: `#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}`,
  }
}
