import { describe, expect, it } from 'vitest'
import { validateWorkingTokens } from './validate'
import type { WorkingToken } from './edit'
import type { FlatToken } from './types'

function makeToken(overrides: Partial<FlatToken>): FlatToken {
  return {
    path: [],
    name: '',
    layer: 'Global',
    type: 'color',
    rawValue: { hex: '#FFFFFF' },
    referenceTarget: null,
    resolvedValue: undefined,
    resolutionError: null,
    figmaId: null,
    ...overrides,
  }
}

function working(id: string, token: Partial<FlatToken>): WorkingToken {
  return { id, token: makeToken(token) }
}

describe('validateWorkingTokens', () => {
  it('returns no errors for a valid set of tokens', () => {
    const items = [
      working('a', { name: '🌈 Color.White', layer: 'Global' }),
      working('b', { name: '🎨 Background.White', layer: 'Alias', referenceTarget: '🌐 Global.🌈 Color.White' }),
    ]
    expect(validateWorkingTokens(items)).toEqual([])
  })

  it('flags an empty name', () => {
    const items = [working('a', { name: '' })]
    const errors = validateWorkingTokens(items)
    expect(errors).toContainEqual({ tokenKey: 'a', message: 'Name cannot be empty.' })
  })

  it('flags two tokens resolving to the same layer+name as duplicates', () => {
    const items = [
      working('a', { name: '🌈 Color.White', layer: 'Global' }),
      working('b', { name: '🌈 Color.White', layer: 'Global' }),
    ]
    const errors = validateWorkingTokens(items)
    expect(errors.map(e => e.tokenKey).sort()).toEqual(['a', 'b'])
  })

  it('does not flag the same name in different layers as a duplicate', () => {
    const items = [
      working('a', { name: 'White', layer: 'Global' }),
      working('b', { name: 'White', layer: 'Alias' }),
    ]
    expect(validateWorkingTokens(items)).toEqual([])
  })

  it('flags an empty value on a non-reference token', () => {
    const items = [working('a', { name: 'Foo', rawValue: '', referenceTarget: null })]
    const errors = validateWorkingTokens(items)
    expect(errors).toContainEqual({ tokenKey: 'a', message: 'Value cannot be empty.' })
  })

  it('does not flag a zero value as empty', () => {
    const items = [working('a', { name: 'Foo', type: 'number', rawValue: 0, referenceTarget: null })]
    expect(validateWorkingTokens(items)).toEqual([])
  })

  it('flags a reference target that does not match any working token path', () => {
    const items = [working('a', { name: 'Foo', referenceTarget: '🌐 Global.🌈 Color.DoesNotExist' })]
    const errors = validateWorkingTokens(items)
    expect(errors).toContainEqual({
      tokenKey: 'a',
      message: '"🌐 Global.🌈 Color.DoesNotExist" does not match an existing token.',
    })
  })

  it('accepts a reference target that matches another working token', () => {
    const items = [
      working('a', { name: '🌈 Color.White', layer: 'Global' }),
      working('b', { name: 'Foo', layer: 'Alias', referenceTarget: '🌐 Global.🌈 Color.White' }),
    ]
    expect(validateWorkingTokens(items)).toEqual([])
  })
})
