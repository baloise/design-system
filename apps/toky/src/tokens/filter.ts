import type { FlatToken } from './types'

// Case, emoji, and separator style ("." vs "/") are all noise for matching
// intent — "Color/Danger", "color.danger", and "🌈 Color.Danger" should all
// find the same tokens.
const EMOJI_RE = /\p{Extended_Pictographic}️?/gu

export function normalizeSearchText(text: string): string {
  return text.replace(EMOJI_RE, ' ').replace(/[./]/g, ' ').toLowerCase().replace(/\s+/g, ' ').trim()
}

export function filterTokensByName(tokens: FlatToken[], query: string): FlatToken[] {
  const normalizedQuery = normalizeSearchText(query)
  if (!normalizedQuery) return tokens

  return tokens.filter(token => normalizeSearchText(token.name).includes(normalizedQuery))
}
