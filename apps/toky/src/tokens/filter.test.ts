import { describe, expect, it } from 'vitest'
import { filterTokensByName, normalizeSearchText } from './filter'
import type { FlatToken } from './types'

function makeToken(overrides: Partial<FlatToken>): FlatToken {
  return {
    path: ['🌐 Global'],
    name: '',
    layer: 'Global',
    type: 'color',
    rawValue: undefined,
    referenceTarget: null,
    resolvedValue: undefined,
    resolutionError: null,
    figmaId: null,
    responsive: null,
    resolvedResponsive: null,
    ...overrides,
  }
}

const tokens: FlatToken[] = [
  makeToken({ name: '🌈 Color.White', layer: 'Global', resolvedValue: '#FFFFFF' }),
  makeToken({ name: '🌈 Color.Black', layer: 'Global', resolvedValue: '#000000' }),
  makeToken({ name: '🎨 Background.Color.White', layer: 'Alias', resolvedValue: '#FFFFFF' }),
]

describe('filterTokensByName', () => {
  it('returns all tokens for an empty query', () => {
    expect(filterTokensByName(tokens, '')).toEqual(tokens)
  })

  it('treats a whitespace-only query as empty', () => {
    expect(filterTokensByName(tokens, '   ')).toEqual(tokens)
  })

  it('matches case-insensitively as a substring', () => {
    const result = filterTokensByName(tokens, 'white')
    expect(result.map(t => t.name)).toEqual(['🌈 Color.White', '🎨 Background.Color.White'])
  })

  it('returns an empty array when nothing matches', () => {
    expect(filterTokensByName(tokens, 'nonexistent')).toEqual([])
  })

  it('matches against name only, not layer or resolvedValue', () => {
    expect(filterTokensByName(tokens, 'Alias')).toEqual([])
    expect(filterTokensByName(tokens, '#FFFFFF')).toEqual([])
  })

  it('ignores emoji when matching', () => {
    expect(filterTokensByName(tokens, '🌈 white')).toEqual([tokens[0], tokens[2]])
  })

  it('treats "." and "/" as equivalent separators, on both sides', () => {
    expect(filterTokensByName(tokens, 'Background/Color')).toEqual([tokens[2]])
    expect(filterTokensByName(tokens, 'Background.Color')).toEqual([tokens[2]])
  })

  it('matches a multi-segment slash query against a dotted name', () => {
    expect(filterTokensByName(tokens, 'color/white')).toEqual([tokens[0], tokens[2]])
  })
})

describe('normalizeSearchText', () => {
  it('lowercases, strips emoji, and unifies "." and "/" into spaces', () => {
    expect(normalizeSearchText('🌈 Color.Danger/1')).toBe('color danger 1')
  })

  it('collapses repeated whitespace left by stripped separators/emoji', () => {
    expect(normalizeSearchText('  Color..Danger  ')).toBe('color danger')
  })
})
