export const TShirtSizesMapping = {
  '3xs': 'xx-small',
  '2xs': 'xx-small',
  'xs': 'x-small',
  'sm': 'small',
  'base': 'normal',
  'md': 'medium',
  'lg': 'large',
  'xl': 'x-large',
  '2xl': 'xx-large',
  '3xl': 'xxx-large',
  '4xl': 'xxxx-large',
  '5xl': 'xxxxx-large',
  '6xl': 'xxxxxx-large',
} as const

export type TShirtSizeShort = keyof typeof TShirtSizesMapping
export type TShirtSizeVerbose = (typeof TShirtSizesMapping)[TShirtSizeShort]

/**
 * Normalizes a t-shirt size so that deprecated verbose values (small, normal, medium, ...)
 * are mapped to the new short values (sm, base, md, ...).
 *
 * This keeps the public API backward compatible while encouraging projects to
 * adopt the new shorthand sizes. Unknown values are passed through unchanged.
 */
export const normalizeDeprecatedTShirtSize = <T extends string | undefined | null>(size: T) => {
  if (size == null || size === '') {
    return size
  }

  const normalized = String(size).toLowerCase()

  // Map old verbose sizes like "small", "normal", ... to their new short counterparts.
  const short = verboseToShortEntries[normalized]
  if (short) {
    // eslint-disable-next-line no-console
    console.warn(`[bal] The t-shirt size "${size}" is deprecated. Please use the short value "${short}" instead.`)
    return short as T
  }

  return size
}

/**
 * Returns the short t-shirt size (sm, base, md, ...) for a given verbose
 * value (small, normal, medium, ...). If no mapping exists the value is
 * returned unchanged.
 */
const verboseToShortEntries = Object.entries(TShirtSizesMapping).reduce<Record<string, string>>(
  (result, [short, verbose]) => {
    if (!result[verbose]) {
      result[verbose] = short
    }
    return result
  },
  {},
)

export const toShortTShirtSize = (size: string) => {
  return verboseToShortEntries[size] || size
}
