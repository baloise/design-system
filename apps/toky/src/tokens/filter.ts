import type { FlatToken } from './types'

export function filterTokensByName(tokens: FlatToken[], query: string): FlatToken[] {
  const trimmed = query.trim().toLowerCase()
  if (!trimmed) return tokens

  return tokens.filter(token => token.name.toLowerCase().includes(trimmed))
}
