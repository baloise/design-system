import { describe, expect, it } from 'vitest'
import { resolvedValueToCss, tokenNameToCssVar } from '@baloise/ds-tokens/css-preview'

import { computeBrandPreviewTokens, computePreviewTokens } from './css-preview'
import type { TokenDiffEntry, WorkingToken } from './edit'
import type { FlatToken } from './types'

// Each expected name/value below was pulled straight from packages/tokens/dist/css/base.tokens.css
// (built from tokens/Base.tokens.json) - this test exists to catch drift between that build output
// and apps/toky's live preview, which is the exact failure mode ADR-0021 extracted these functions
// to avoid.
describe('tokenNameToCssVar', () => {
  it('matches a component token, stripping the 🧩 Component path segment', () => {
    // dist/css/base.tokens.css: --ds-card-color-base-text: inherit;
    expect(tokenNameToCssVar(['🧩 Component', 'Card', 'Color', 'Base', 'Text'])).toBe('ds-card-color-base-text')
  })

  it('matches a global color token', () => {
    // dist/css/base.tokens.css: --ds-global-color-primary-2: #b3b6d4;
    expect(tokenNameToCssVar(['🌐 Global', '🌈 Color', 'Primary', '2'])).toBe('ds-global-color-primary-2')
  })

  it('keeps a t-shirt size suffix as N-size, not N-dash-size', () => {
    // dist/css/base.tokens.css: --ds-alias-breakpoint-desktop-2xl: ...;
    expect(tokenNameToCssVar(['🔗 Alias', '📐 Breakpoint', 'Desktop', '2XL'])).toBe('ds-alias-breakpoint-desktop-2xl')
  })
})

describe('resolvedValueToCss', () => {
  it('renders an opaque color as its hex value', () => {
    const value = { colorSpace: 'srgb', components: [1, 1, 1], alpha: 1, hex: '#FFFFFF' }
    expect(resolvedValueToCss(value, 'color', ['🌐 Global', '🌈 Color', 'White'])).toBe('#FFFFFF')
  })

  it('renders a translucent color as rgba()', () => {
    const value = { colorSpace: 'srgb', components: [0, 0.0266, 0.225], alpha: 0.1, hex: '#000739' }
    expect(resolvedValueToCss(value, 'color', ['🌐 Global', '🌈 Color', 'Overlay'])).toBe('rgba(0, 7, 57, 0.1)')
  })

  it('converts a plain px-scale number to rem, matching ds/size/rem', () => {
    // 16 -> 1rem is the base conversion; path has no LineHeight/Opacity/Breakpoint/Container marker
    expect(resolvedValueToCss(16, 'number', ['🌐 Global', '📏 Size', 'Space', '16'])).toBe('1rem')
  })

  it('rounds a line-height number to one decimal, matching ds/size/round + ds/size/rem', () => {
    // dist/css/base.tokens.css: --ds-global-font-line-height-2: 1.3;
    expect(resolvedValueToCss(1.2999999523162842, 'number', ['🌐 Global', '🔤 Font', 'LineHeight', '2'])).toBe('1.3')
  })

  it('passes a string value through unchanged', () => {
    expect(resolvedValueToCss('auto', 'string', ['🔗 Alias', '📏 Size', 'Width', 'Auto'])).toBe('auto')
  })

  it('returns null for an unresolved/dangling reference', () => {
    expect(resolvedValueToCss(undefined, 'color', ['🔗 Alias', 'Broken'])).toBeNull()
  })
})

function flatToken(overrides: Partial<FlatToken>): FlatToken {
  return {
    path: [],
    name: '',
    layer: 'Global',
    type: 'color',
    rawValue: null,
    referenceTarget: null,
    resolvedValue: null,
    resolutionError: null,
    figmaId: null,
    ...overrides,
  }
}

describe('computePreviewTokens', () => {
  it('maps an update entry to its resolved CSS value, looked up from the working token', () => {
    const path = ['🌐 Global', '🌈 Color', 'White']
    const diff: TokenDiffEntry[] = [
      {
        kind: 'update',
        layer: 'Global',
        oldPath: path,
        newPath: path,
        type: 'color',
        value: { colorSpace: 'srgb', components: [1, 1, 1], alpha: 1, hex: '#EEEEEE' },
        before: { colorSpace: 'srgb', components: [1, 1, 1], alpha: 1, hex: '#FFFFFF' },
      },
    ]
    const working: WorkingToken[] = [
      {
        id: path.join('.'),
        token: flatToken({
          path,
          name: '🌈 Color.White',
          layer: 'Global',
          type: 'color',
          resolvedValue: { colorSpace: 'srgb', components: [1, 1, 1], alpha: 1, hex: '#EEEEEE' },
        }),
      },
    ]

    expect(computePreviewTokens(diff, working)).toEqual([{ name: '--ds-global-color-white', value: '#EEEEEE' }])
  })

  it('maps a delete entry to a null-value removal, without needing a working token', () => {
    const path = ['🌐 Global', '🌈 Color', 'Retired']
    const diff: TokenDiffEntry[] = [
      { kind: 'delete', layer: 'Global', oldPath: path, newPath: null, type: 'color', value: undefined, before: {} },
    ]

    expect(computePreviewTokens(diff, [])).toEqual([{ name: '--ds-global-color-retired', value: null }])
  })

  it('skips an entry whose resolved value cannot be serialized to CSS', () => {
    const path = ['🔗 Alias', 'Broken']
    const diff: TokenDiffEntry[] = [
      { kind: 'update', layer: 'Alias', oldPath: path, newPath: path, type: 'color', value: undefined, before: {} },
    ]
    const working: WorkingToken[] = [
      {
        id: path.join('.'),
        token: flatToken({ path, name: 'Broken', layer: 'Alias', type: 'color', resolutionError: 'missing-reference' }),
      },
    ]

    expect(computePreviewTokens(diff, working)).toEqual([])
  })
})

describe('computeBrandPreviewTokens', () => {
  // Regression: the [data-theme] stylesheet the core listener injects only reflects what's
  // already built into dist/css/<brand>.tokens.css - an in-progress brand edit (e.g. changing
  // Tag's Tcs-brand background to a different color) isn't in there yet, so it needs to be sent
  // as its own inline override the same way a Base edit is.
  it('maps a brand update entry to its resolved CSS value, looked up by id', () => {
    const path = ['🧩 Component', 'Tag', 'Primary', 'Color', 'Bg']
    const id = path.join('.')
    const brandDiff: TokenDiffEntry[] = [
      {
        id,
        kind: 'update',
        layer: 'Component',
        oldPath: path,
        newPath: path,
        type: 'color',
        value: { colorSpace: 'srgb', components: [0.9, 0.1, 0.1], alpha: 1, hex: '#EA1800' },
        before: { colorSpace: 'srgb', components: [0.1, 0.1, 0.5], alpha: 1, hex: '#1919A6' },
      },
    ]
    const resolvedById = new Map([
      [
        id,
        flatToken({
          path,
          type: 'color',
          resolvedValue: { colorSpace: 'srgb', components: [0.9, 0.1, 0.1], alpha: 1, hex: '#EA1800' },
        }),
      ],
    ])

    expect(computeBrandPreviewTokens(brandDiff, resolvedById)).toEqual([
      { name: '--ds-tag-primary-color-bg', value: '#EA1800' },
    ])
  })

  it('maps a brand delete entry (un-overriding back to Base) to a null-value removal', () => {
    const path = ['🧩 Component', 'Tag', 'Primary', 'Color', 'Bg']
    const brandDiff: TokenDiffEntry[] = [
      {
        id: path.join('.'),
        kind: 'delete',
        layer: 'Component',
        oldPath: path,
        newPath: null,
        type: 'color',
        value: undefined,
        before: {},
      },
    ]

    expect(computeBrandPreviewTokens(brandDiff, new Map())).toEqual([
      { name: '--ds-tag-primary-color-bg', value: null },
    ])
  })

  it('skips an entry with no id (can never happen from computeDiff, but must not throw)', () => {
    const path = ['🧩 Component', 'Tag', 'Primary', 'Color', 'Bg']
    const brandDiff: TokenDiffEntry[] = [
      { kind: 'update', layer: 'Component', oldPath: path, newPath: path, type: 'color', value: undefined, before: {} },
    ]

    expect(computeBrandPreviewTokens(brandDiff, new Map())).toEqual([])
  })
})
