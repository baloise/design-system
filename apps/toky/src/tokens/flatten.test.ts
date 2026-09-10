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
  '📱 Device': {
    '↔️ Space': {
      Sm: {
        $type: 'dimension',
        $value: { value: 12, unit: 'px' },
        $extensions: {
          'com.helvetia.responsive': {
            mobile: { value: 12, unit: 'px' },
            tablet: { value: 16, unit: 'px' },
            desktop: { value: 20, unit: 'px' },
          },
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
      Gap: {
        $type: 'dimension',
        $value: '{📱 Device.↔️ Space.Sm}',
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
    expect(layers).toEqual(new Set(['Global', 'Alias', 'Device', 'Component']))
  })

  it('tags a token under the 📱 Device top-level key with the Device layer', () => {
    const tokens = flattenTokenDocument(fixture)
    const spaceSm = tokens.find(t => t.path.join('.') === '📱 Device.↔️ Space.Sm')
    expect(spaceSm?.layer).toBe('Device')
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

  it('resolves a Component -> Device reference', () => {
    const tokens = parseTokenDocument(fixture)
    const buttonGap = tokens.find(t => t.path.join('.') === '🧩 Component.Button.Gap')
    expect(buttonGap?.resolvedValue).toEqual({ value: 12, unit: 'px' })
    expect(buttonGap?.resolutionError).toBeNull()
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

// docs/plans/responsive-dimension-token-plan.md — a dimension token's breakpoint values live in
// $extensions.com.helvetia.responsive, not $value (decision 2).
const responsiveFixture = {
  '🌐 Global': {
    '📏 Dimension': {
      Space16: { $type: 'dimension', $value: { value: 1, unit: 'rem' } },
    },
  },
  '🔗 Alias': {
    SpaceLg: {
      $type: 'dimension',
      $value: { value: 16, unit: 'px' },
      $extensions: {
        'com.helvetia.responsive': {
          mobile: '{🌐 Global.📏 Dimension.Space16}',
          tablet: { value: 24, unit: 'px' },
          desktop: { value: 32, unit: 'px' },
        },
      },
    },
    Plain: { $type: 'dimension', $value: { value: 8, unit: 'px' } },
  },
}

describe('responsive dimension extension', () => {
  it('extracts the 3 breakpoint values from $extensions for a responsive dimension token', () => {
    const tokens = flattenTokenDocument(responsiveFixture)
    const spaceLg = tokens.find(t => t.path.join('.') === '🔗 Alias.SpaceLg')
    expect(spaceLg?.responsive).toEqual({
      mobile: '{🌐 Global.📏 Dimension.Space16}',
      tablet: { value: 24, unit: 'px' },
      desktop: { value: 32, unit: 'px' },
    })
  })

  it('leaves a non-responsive dimension token with responsive: null', () => {
    const tokens = flattenTokenDocument(responsiveFixture)
    const plain = tokens.find(t => t.path.join('.') === '🔗 Alias.Plain')
    expect(plain?.responsive).toBeNull()
  })

  it('resolves a reference breakpoint value to its literal in resolvedResponsive', () => {
    const tokens = parseTokenDocument(responsiveFixture)
    const spaceLg = tokens.find(t => t.path.join('.') === '🔗 Alias.SpaceLg')
    expect(spaceLg?.resolvedResponsive).toEqual({
      mobile: { value: 1, unit: 'rem' },
      tablet: { value: 24, unit: 'px' },
      desktop: { value: 32, unit: 'px' },
    })
  })

  // decision 4 of the plan keeps a responsive dimension token's own $value mirroring `mobile` —
  // so whenever mobile is a reference, the token's OWN referenceTarget is non-null too, same shape
  // as a real token in Base.tokens.json (e.g. Alias.Space.Base, Text.Size.Base). This must resolve
  // breakpoints off the token's own `responsive` field, not off whatever the whole-token reference
  // chain-walk (built for true aliases) happens to land on.
  it('resolves breakpoints from its own responsive field when $value itself mirrors a reference mobile', () => {
    const mirroredFixture = {
      '🌐 Global': {
        '📏 Dimension': {
          Space16: { $type: 'dimension', $value: { value: 1, unit: 'rem' } },
        },
      },
      '🔗 Alias': {
        SpaceMirrored: {
          $type: 'dimension',
          $value: '{🌐 Global.📏 Dimension.Space16}',
          $extensions: {
            'com.helvetia.responsive': {
              mobile: '{🌐 Global.📏 Dimension.Space16}',
              tablet: { value: 24, unit: 'px' },
              desktop: { value: 32, unit: 'px' },
            },
          },
        },
      },
    }
    const tokens = parseTokenDocument(mirroredFixture)
    const token = tokens.find(t => t.path.join('.') === '🔗 Alias.SpaceMirrored')
    expect(token?.resolutionError).toBeNull()
    expect(token?.resolvedResponsive).toEqual({
      mobile: { value: 1, unit: 'rem' },
      tablet: { value: 24, unit: 'px' },
      desktop: { value: 32, unit: 'px' },
    })
  })
})
