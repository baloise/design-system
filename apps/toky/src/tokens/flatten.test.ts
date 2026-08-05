import { describe, expect, it } from 'vitest'
import { flattenTokenDocument, parseTokenDocument } from './flatten'

const fixture = {
  '🌐 Global': {
    '🌈 Color': {
      White: {
        $type: 'color',
        $value: { colorSpace: 'srgb', components: [1, 1, 1], alpha: 1, hex: '#FFFFFF' },
        $extensions: { 'com.figma.variableId': 'VariableID:1:1' },
      },
    },
    'Opacity': {
      '0': { $type: 'number', $value: 0 },
    },
    'Shadow': {
      '0': { $type: 'string', $value: '0 1px 2px rgba(0,0,0,0.1)' },
    },
  },
  '🔗 Alias': {
    '🎨 Background': {
      Color: {
        White: {
          $type: 'color',
          $value: '{🌐 Global.🌈 Color.White}',
        },
        Missing: {
          $type: 'color',
          $value: '{🌐 Global.🌈 Color.DoesNotExist}',
        },
      },
    },
  },
  '🧩 Component': {
    Button: {
      Color: {
        Primary: {
          $type: 'color',
          $value: '{🔗 Alias.🎨 Background.Color.White}',
        },
      },
    },
  },
  '$extensions': { 'com.figma.modeName': 'Base' },
}

const cyclicFixture = {
  '🔗 Alias': {
    A: { $type: 'color', $value: '{🔗 Alias.B}' },
    B: { $type: 'color', $value: '{🔗 Alias.A}' },
  },
}

describe('flattenTokenDocument', () => {
  it('tags tokens with the correct layer from their top-level key', () => {
    const tokens = flattenTokenDocument(fixture)
    const layers = new Set(tokens.map(t => t.layer))
    expect(layers).toEqual(new Set(['Global', 'Alias', 'Component']))
  })

  it('produces the full path and a display name without the layer segment', () => {
    const tokens = flattenTokenDocument(fixture)
    const white = tokens.find(t => t.path.join('.') === '🌐 Global.🌈 Color.White')
    expect(white).toBeDefined()
    expect(white?.name).toBe('🌈 Color.White')
  })

  it('skips the root $extensions key', () => {
    const tokens = flattenTokenDocument(fixture)
    expect(tokens.some(t => t.path[0] === '$extensions')).toBe(false)
  })

  it('extracts the figma variable id when present, null otherwise', () => {
    const tokens = flattenTokenDocument(fixture)
    const white = tokens.find(t => t.path.join('.') === '🌐 Global.🌈 Color.White')
    const opacity = tokens.find(t => t.path.join('.') === '🌐 Global.Opacity.0')
    expect(white?.figmaId).toBe('VariableID:1:1')
    expect(opacity?.figmaId).toBeNull()
  })

  it('passes non-color $value types through untouched', () => {
    const tokens = flattenTokenDocument(fixture)
    const opacity = tokens.find(t => t.path.join('.') === '🌐 Global.Opacity.0')
    const shadow = tokens.find(t => t.path.join('.') === '🌐 Global.Shadow.0')
    expect(opacity?.rawValue).toBe(0)
    expect(shadow?.rawValue).toBe('0 1px 2px rgba(0,0,0,0.1)')
  })

  it('detects a reference target from a curly-brace string value', () => {
    const tokens = flattenTokenDocument(fixture)
    const aliasWhite = tokens.find(t => t.path.join('.') === '🔗 Alias.🎨 Background.Color.White')
    expect(aliasWhite?.referenceTarget).toBe('🌐 Global.🌈 Color.White')
  })
})

describe('parseTokenDocument (flatten + resolve)', () => {
  it('resolves a direct (1-hop) reference to the target raw value', () => {
    const tokens = parseTokenDocument(fixture)
    const aliasWhite = tokens.find(t => t.path.join('.') === '🔗 Alias.🎨 Background.Color.White')
    expect(aliasWhite?.resolvedValue).toEqual({ colorSpace: 'srgb', components: [1, 1, 1], alpha: 1, hex: '#FFFFFF' })
    expect(aliasWhite?.resolutionError).toBeNull()
  })

  it('resolves a 2-hop reference chain (Component -> Alias -> Global)', () => {
    const tokens = parseTokenDocument(fixture)
    const buttonPrimary = tokens.find(t => t.path.join('.') === '🧩 Component.Button.Color.Primary')
    expect(buttonPrimary?.resolvedValue).toEqual({
      colorSpace: 'srgb',
      components: [1, 1, 1],
      alpha: 1,
      hex: '#FFFFFF',
    })
    expect(buttonPrimary?.resolutionError).toBeNull()
  })

  it('resolves a non-reference leaf to itself', () => {
    const tokens = parseTokenDocument(fixture)
    const opacity = tokens.find(t => t.path.join('.') === '🌐 Global.Opacity.0')
    expect(opacity?.resolvedValue).toBe(0)
  })

  it('flags a reference to a nonexistent path as missing-reference without throwing', () => {
    const tokens = parseTokenDocument(fixture)
    const missing = tokens.find(t => t.path.join('.') === '🔗 Alias.🎨 Background.Color.Missing')
    expect(missing?.resolutionError).toBe('missing-reference')
    expect(missing?.resolvedValue).toBeUndefined()
  })

  it('flags a circular reference chain without infinite-looping', () => {
    const tokens = parseTokenDocument(cyclicFixture)
    const a = tokens.find(t => t.path.join('.') === '🔗 Alias.A')
    const b = tokens.find(t => t.path.join('.') === '🔗 Alias.B')
    expect(a?.resolutionError).toBe('circular-reference')
    expect(b?.resolutionError).toBe('circular-reference')
  })
})
