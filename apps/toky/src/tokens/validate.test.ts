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
    expect(errors).toContainEqual({ tokenKey: 'a', message: 'Name cannot be empty.', severity: 'error' })
  })

  it('flags two tokens resolving to the same layer+name as duplicates', () => {
    const items = [
      working('a', { name: '🌈 Color.White', layer: 'Global' }),
      working('b', { name: '🌈 Color.White', layer: 'Global' }),
    ]
    const errors = validateWorkingTokens(items)
    expect(errors.map(e => e.tokenKey).sort()).toEqual(['a', 'b'])
  })

  it('renders the duplicate name in the message with Figma-style slashes, not dots', () => {
    const items = [
      working('a', { name: '🌈 Color.Neutral', layer: 'Global' }),
      working('b', { name: '🌈 Color.Neutral', layer: 'Global' }),
    ]
    const errors = validateWorkingTokens(items)
    expect(errors).toContainEqual({
      tokenKey: 'a',
      message: 'Another token already uses "🌈 Color/Neutral" in this layer.',
      severity: 'error',
    })
  })

  it('does not flag the same name in different layers as a duplicate', () => {
    const items = [working('a', { name: 'White', layer: 'Global' }), working('b', { name: 'White', layer: 'Alias' })]
    expect(validateWorkingTokens(items)).toEqual([])
  })

  it('flags an empty value on a non-reference token', () => {
    const items = [working('a', { name: 'Foo', rawValue: '', referenceTarget: null })]
    const errors = validateWorkingTokens(items)
    expect(errors).toContainEqual({ tokenKey: 'a', message: 'Value cannot be empty.', severity: 'error' })
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
      message: '"🌐 Global/🌈 Color/DoesNotExist" does not match an existing token.',
      severity: 'error',
    })
  })

  it('accepts a reference target that matches another working token', () => {
    const items = [
      working('a', { name: '🌈 Color.White', layer: 'Global' }),
      working('b', { name: 'Foo', layer: 'Alias', referenceTarget: '🌐 Global.🌈 Color.White' }),
    ]
    expect(validateWorkingTokens(items)).toEqual([])
  })

  it('warns when a Component token references Global directly', () => {
    const items = [
      working('a', { name: '🌈 Color.White', layer: 'Global' }),
      working('b', { name: 'Foo', layer: 'Component', referenceTarget: '🌐 Global.🌈 Color.White' }),
    ]
    const errors = validateWorkingTokens(items)
    expect(errors).toContainEqual({
      tokenKey: 'b',
      message: 'References "🌐 Global/🌈 Color/White" directly from Global — consider aliasing it instead.',
      severity: 'warning',
    })
  })

  it('does not warn when a Component token references Alias', () => {
    const items = [
      working('a', { name: '🎨 Background.White', layer: 'Alias' }),
      working('b', { name: 'Foo', layer: 'Component', referenceTarget: '🔗 Alias.🎨 Background.White' }),
    ]
    expect(validateWorkingTokens(items)).toEqual([])
  })

  it('does not warn when an Alias token references Global', () => {
    const items = [
      working('a', { name: '🌈 Color.White', layer: 'Global' }),
      working('b', { name: 'Foo', layer: 'Alias', referenceTarget: '🌐 Global.🌈 Color.White' }),
    ]
    expect(validateWorkingTokens(items)).toEqual([])
  })
})
