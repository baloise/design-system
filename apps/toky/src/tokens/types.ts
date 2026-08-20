export type TokenLayer = 'Global' | 'Alias' | 'Component'

export type ResolutionError = 'missing-reference' | 'circular-reference'

export interface FlatToken {
  path: string[]
  name: string
  layer: TokenLayer
  type: string
  rawValue: unknown
  referenceTarget: string | null
  resolvedValue: unknown
  resolutionError: ResolutionError | null
  figmaId: string | null
}
