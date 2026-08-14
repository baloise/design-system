export type TokenLayer = 'Global' | 'Alias' | 'Component'

export type ResolutionError = 'missing-reference' | 'circular-reference'

// A shadow token's Figma identity is 5 variableIds (one per sub-property:
// offsetX, offsetY, blur, spread, color), not 1 — see
// docs/plans/shadow-token-type-plan.md. Every other type still uses a plain
// string.
export type FigmaId = string | Record<string, string>

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
}
