// Figma → DTCG value/alias mapping for Pull (from Figma) — the reverse of
// scripts/figma-sync/lib/figma-value.mjs's figmaValueFor/resolvedTypeFor and
// lib/alias.mjs's forward alias resolution. Not imported from there (Node-only,
// outside apps/toky's module boundary) — see docs/adr/0002.

const DTCG_TYPE_BY_RESOLVED_TYPE: Record<string, string> = {
  COLOR: 'color',
  FLOAT: 'number',
  STRING: 'string',
  BOOLEAN: 'boolean',
}

export function dtcgTypeFor(resolvedType: string): string {
  const dtcgType = DTCG_TYPE_BY_RESOLVED_TYPE[resolvedType]
  if (!dtcgType) {
    throw new Error(`Unsupported Figma resolvedType "${resolvedType}" — no known DTCG $type mapping.`)
  }
  return dtcgType
}

export interface FigmaColor {
  r: number
  g: number
  b: number
  a: number
}

export interface DtcgColorValue {
  colorSpace: 'srgb'
  components: [number, number, number]
  alpha: number
  hex: string
}

function channelToHexByte(value: number): string {
  return Math.round(Math.min(1, Math.max(0, value)) * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase()
}

// Figma's color value carries no hex field (unlike our DTCG leaves, which
// always do) — see figma-value.mjs's figmaValueFor, which only ever reads
// components/alpha off the DTCG side, never writes hex to the Figma side.
// `hex` is always 6 digits (RGB only) — alpha is carried separately in its
// own field, never baked into the hex string. Confirmed against real data:
// Base.tokens.json's translucent colors (e.g. Component.Close.Color.
// Background.Hover, alpha 0.1) still store a plain 6-digit hex.
export function dtcgColorFromFigma({ r, g, b, a }: FigmaColor): DtcgColorValue {
  const hex = `#${channelToHexByte(r)}${channelToHexByte(g)}${channelToHexByte(b)}`
  return { colorSpace: 'srgb', components: [r, g, b], alpha: a, hex }
}

// Tolerance-based per ADR-0002 — Figma's REST API round-trips floats (e.g.
// 0.5 becomes 0.5000000074505806), so bit-exact comparison would flag
// spurious "changes" on every pull. Comparing at hex/byte precision (the
// resolution that's actually visually/data meaningful) absorbs that drift.
// `hex` alone only covers r/g/b — alpha is compared the same way (rounded to
// a byte) since it's carried as its own field, not baked into hex.
export function isColorEqual(a: FigmaColor, b: FigmaColor): boolean {
  const colorA = dtcgColorFromFigma(a)
  const colorB = dtcgColorFromFigma(b)
  return colorA.hex === colorB.hex && channelToHexByte(colorA.alpha) === channelToHexByte(colorB.alpha)
}

// Compares two already-DTCG-shaped literal values (both sides have already
// gone through dtcgColorFromFigma by the time figma-pull.ts calls this — see
// isColorEqual above for comparing raw Figma {r,g,b,a} colors directly).
// Colors compare by `hex` + byte-rounded `alpha`, the same tolerance
// ADR-0002 calls for; every other type compares exactly.
export function isLiteralValueEqual(dtcgType: string, a: unknown, b: unknown): boolean {
  if (dtcgType === 'color') {
    const colorA = a as DtcgColorValue | undefined
    const colorB = b as DtcgColorValue | undefined
    if (!colorA || !colorB) return colorA === colorB
    return colorA.hex === colorB.hex && channelToHexByte(colorA.alpha) === channelToHexByte(colorB.alpha)
  }
  return JSON.stringify(a) === JSON.stringify(b)
}

// figmaVariableName's inverse (scripts/figma-sync/lib/write.mjs:12-14 —
// path.join('/')). Used only when a Figma variable has no matching
// figmaId (a brand-new variable) and its path has to be derived from its name.
export function pathFromFigmaVariableName(name: string): string[] {
  return name.split('/').filter(Boolean)
}

export interface FigmaVariableAlias {
  type: 'VARIABLE_ALIAS'
  id: string
}

export function isFigmaAlias(value: unknown): value is FigmaVariableAlias {
  return typeof value === 'object' && value !== null && (value as { type?: unknown }).type === 'VARIABLE_ALIAS'
}
