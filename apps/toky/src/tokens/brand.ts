// PascalCase, letters/digits only — matches the existing "Tcs" brand file and
// doubles as a safe filename (<Name>.tokens.json) and a clean future Figma
// mode name (see ADR-0002 in packages/tokens/docs/adr).
const BRAND_NAME_PATTERN = /^[A-Z][A-Za-z0-9]*$/

export type BrandNameError = 'empty' | 'invalid-format' | 'reserved' | 'duplicate'

// A Map keyed by the closed BrandNameError union, not a plain object indexed
// dynamically — the caller-supplied brand name never becomes a property
// lookup key.
export const BRAND_NAME_ERROR_MESSAGE: ReadonlyMap<BrandNameError, string> = new Map([
  ['empty', 'Enter a brand name.'],
  ['invalid-format', 'Use PascalCase letters and digits only, e.g. "Acme".'],
  ['reserved', '"Base" is reserved.'],
  ['duplicate', 'A brand with this name already exists.'],
])

// `existing` should include both real (already-on-GitHub) brands and any
// staged-but-not-yet-submitted ones — callers merge those before validating.
export function validateBrandName(name: string, existing: string[]): BrandNameError | null {
  const trimmed = name.trim()
  if (!trimmed) return 'empty'
  if (!BRAND_NAME_PATTERN.test(trimmed)) return 'invalid-format'
  if (trimmed.toLowerCase() === 'base') return 'reserved'
  if (existing.some(brand => brand.toLowerCase() === trimmed.toLowerCase())) return 'duplicate'
  return null
}
