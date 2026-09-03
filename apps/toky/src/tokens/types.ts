export type TokenLayer = 'Global' | 'Alias' | 'Component'

export type ResolutionError = 'missing-reference' | 'circular-reference'

// A shadow token's Figma identity is 5 variableIds (one per sub-property:
// offsetX, offsetY, blur, spread, color), not 1 — see
// docs/plans/shadow-token-type-plan.md. Every other type still uses a plain
// string.
export type FigmaId = string | Record<string, string>

// The $extensions key a responsive dimension token's breakpoint values live
// under — see docs/plans/responsive-dimension-token-plan.md. Kept as `dimension`
// $type (not a new type) so DTCG tools that don't understand this extension
// still see a valid plain dimension via $value (decision 2).
export const RESPONSIVE_DIMENSION_EXTENSION_KEY = 'com.helvetia.responsive'

// A dimension token's breakpoint values — each independently a literal
// {value, unit} or a `{reference}` string (decision 3), narrowed downstream
// the same way TypographyValue's sub-fields are kept `unknown` at this layer.
export interface ResponsiveDimensionValue {
  mobile: unknown
  tablet: unknown
  desktop: unknown
}

export interface FlatToken {
  path: string[]
  name: string
  layer: TokenLayer
  type: string
  rawValue: unknown
  referenceTarget: string | null
  resolvedValue: unknown
  resolutionError: ResolutionError | null
  figmaId: FigmaId | null
  // Raw (possibly-reference) breakpoint values from $extensions, null for a
  // non-responsive (or non-dimension) token. Mutually exclusive with
  // referenceTarget — a token whose whole $value is itself a reference can't
  // also carry local breakpoint overrides.
  responsive: ResponsiveDimensionValue | null
  // Same shape as `responsive`, with any `{reference}` sub-value resolved to
  // its literal — mirrors resolvedValue's relationship to rawValue.
  resolvedResponsive: ResponsiveDimensionValue | null
}
