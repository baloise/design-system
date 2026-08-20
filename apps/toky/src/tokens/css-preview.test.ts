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

  it('passes a plain unitless number through unchanged — number no longer rem/px-converts (dimension does)', () => {
    // dist/css/base.tokens.css: --ds-global-elevation-zindex-100: 100;
    expect(resolvedValueToCss(100, 'number', ['🌐 Global', '🗂️ Elevation', 'ZIndex', '100'])).toBe('100')
  })

  it('rounds a line-height number to one decimal, matching ds/size/round', () => {
    // dist/css/base.tokens.css: --ds-global-font-line-height-2: 1.3;
    expect(resolvedValueToCss(1.2999999523162842, 'number', ['🌐 Global', '🔤 Font', 'LineHeight', '2'])).toBe('1.3')
  })

  it('passes a string value through unchanged', () => {
    expect(resolvedValueToCss('auto', 'string', ['🔗 Alias', '📏 Size', 'Width', 'Auto'])).toBe('auto')
  })

  it('renders a fontWeight number as a bare CSS number, not rem/px-converted', () => {
    // dist/css/base.tokens.css: --ds-global-font-weight-700: 700;
    expect(resolvedValueToCss(700, 'fontWeight', ['🌐 Global', '🔤 Font', 'Weight', '700'])).toBe('700')
  })

  it('joins a fontFamily array, leaving simple names and generic keywords unquoted', () => {
    // dist/css/base.tokens.css: --ds-global-font-family-heading: BaloiseCreateHeadline, Arial, sans-serif;
    expect(resolvedValueToCss(['BaloiseCreateHeadline', 'Arial', 'sans-serif'], 'fontFamily', [])).toBe(
      'BaloiseCreateHeadline, Arial, sans-serif',
    )
  })

  it('quotes only a fontFamily entry that needs it (contains whitespace)', () => {
    expect(resolvedValueToCss(['Comic Sans MS', 'cursive'], 'fontFamily', [])).toBe('"Comic Sans MS", cursive')
  })

  it('renders a single-entry fontFamily keyword bare — not quoted', () => {
    // dist/css/base.tokens.css: --ds-link-family: inherit;
    expect(resolvedValueToCss(['inherit'], 'fontFamily', [])).toBe('inherit')
  })

  it('renders a rem-unit dimension as-is, no further conversion', () => {
    // dist/css/base.tokens.css: --ds-global-dimension-space-24: 1.5rem;
    expect(resolvedValueToCss({ value: 1.5, unit: 'rem' }, 'dimension', [])).toBe('1.5rem')
  })

  it('renders a px-unit dimension as-is, no rem conversion', () => {
    // dist/css/base.tokens.css: --ds-global-dimension-breakpoint-1: 769px;
    expect(resolvedValueToCss({ value: 769, unit: 'px' }, 'dimension', [])).toBe('769px')
  })

  it('returns null for a malformed dimension value', () => {
    expect(resolvedValueToCss({ value: 1.5, unit: 'em' }, 'dimension', [])).toBeNull()
    expect(resolvedValueToCss(24, 'dimension', [])).toBeNull()
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
    responsive: null,
    resolvedResponsive: null,
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

  // docs/plans/responsive-dimension-token-plan.md — no -device entry here, unlike the real build:
  // the live preview posts plain inline overrides, which can't express a media-query switch.
  it('maps a responsive dimension update entry to its 3 breakpoint-suffixed CSS vars', () => {
    const path = ['🔗 Alias', 'SpaceLg']
    const diff: TokenDiffEntry[] = [
      {
        kind: 'update',
        layer: 'Alias',
        oldPath: path,
        newPath: path,
        type: 'dimension',
        value: { value: 16, unit: 'px' },
        before: { value: 16, unit: 'px' },
        responsive: {
          mobile: { value: 16, unit: 'px' },
          tablet: { value: 24, unit: 'px' },
          desktop: { value: 32, unit: 'px' },
        },
      },
    ]
    const working: WorkingToken[] = [
      {
        id: path.join('.'),
        token: flatToken({
          path,
          name: 'SpaceLg',
          layer: 'Alias',
          type: 'dimension',
          responsive: { mobile: { value: 16, unit: 'px' }, tablet: undefined, desktop: undefined },
          resolvedResponsive: {
            mobile: { value: 16, unit: 'px' },
            tablet: { value: 24, unit: 'px' },
            desktop: { value: 32, unit: 'px' },
          },
        }),
      },
    ]

    expect(computePreviewTokens(diff, working)).toEqual([
      { name: '--ds-alias-space-lg-mobile', value: '16px' },
      { name: '--ds-alias-space-lg-tablet', value: '24px' },
      { name: '--ds-alias-space-lg-desktop', value: '32px' },
    ])
  })

  it('maps a responsive dimension delete entry to 3 null-value removals', () => {
    const path = ['🔗 Alias', 'SpaceLg']
    const diff: TokenDiffEntry[] = [
      {
        kind: 'delete',
        layer: 'Alias',
        oldPath: path,
        newPath: null,
        type: 'dimension',
        value: undefined,
        before: { value: 16, unit: 'px' },
        responsive: {
          mobile: { value: 16, unit: 'px' },
          tablet: { value: 24, unit: 'px' },
          desktop: { value: 32, unit: 'px' },
        },
      },
    ]

    expect(computePreviewTokens(diff, [])).toEqual([
      { name: '--ds-alias-space-lg-mobile', value: null },
      { name: '--ds-alias-space-lg-tablet', value: null },
      { name: '--ds-alias-space-lg-desktop', value: null },
    ])
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
