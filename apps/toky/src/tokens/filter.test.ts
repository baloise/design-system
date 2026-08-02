import { describe, expect, it } from 'vitest'
import { filterTokensByName } from './filter'
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
})
