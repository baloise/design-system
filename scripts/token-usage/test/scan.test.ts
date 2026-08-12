import { describe, expect, it } from 'vitest'
import { collectBaseTokens, computeUsage, extractUsedVarNames } from '../lib/scan.mjs'

describe('collectBaseTokens', () => {
  it('collects leaf tokens from the Global, Alias, and Component layers', () => {
    const docsJson = {
      '🌐 Global': {
        '🌈 Color': {
          White: { path: ['🌐 Global', '🌈 Color', 'White'], name: 'ds-global-color-white' },
        },
      },
      '🔗 Alias': {
        Color: {
          Surface: { path: ['🔗 Alias', 'Color', 'Surface'], name: 'ds-alias-color-surface' },
        },
      },
      '🧩 Component': {
        Button: {
          Bg: { path: ['🧩 Component', 'Button', 'Bg'], name: 'ds-button-bg' },
        },
      },
    }

    expect(collectBaseTokens(docsJson)).toEqual([
      { path: ['🌐 Global', '🌈 Color', 'White'], names: ['ds-global-color-white'] },
      { path: ['🔗 Alias', 'Color', 'Surface'], names: ['ds-alias-color-surface'] },
      { path: ['🧩 Component', 'Button', 'Bg'], names: ['ds-button-bg'] },
    ])
  })

  it('ignores layers other than Global, Alias, and Component', () => {
    const docsJson = {
      '🎨 Brand': {
        Tcs: { path: ['🎨 Brand', 'Tcs'], name: 'ds-brand-tcs' },
      },
    }

    expect(collectBaseTokens(docsJson)).toEqual([])
  })

  it('adds the shared -device name for responsive Mobile/Tablet/Desktop siblings', () => {
    const docsJson = {
      '🔗 Alias': {
        Space: {
          SM: {
            Mobile: { path: ['🔗 Alias', 'Space', 'SM', 'Mobile'], name: 'ds-alias-space-sm-mobile' },
            Tablet: { path: ['🔗 Alias', 'Space', 'SM', 'Tablet'], name: 'ds-alias-space-sm-tablet' },
            Desktop: { path: ['🔗 Alias', 'Space', 'SM', 'Desktop'], name: 'ds-alias-space-sm-desktop' },
          },
        },
      },
    }

    expect(collectBaseTokens(docsJson)).toEqual([
      {
        path: ['🔗 Alias', 'Space', 'SM', 'Mobile'],
        names: ['ds-alias-space-sm-mobile', 'ds-alias-space-sm-device'],
      },
      {
        path: ['🔗 Alias', 'Space', 'SM', 'Tablet'],
        names: ['ds-alias-space-sm-tablet', 'ds-alias-space-sm-device'],
      },
      {
        path: ['🔗 Alias', 'Space', 'SM', 'Desktop'],
        names: ['ds-alias-space-sm-desktop', 'ds-alias-space-sm-device'],
      },
    ])
  })
})

describe('extractUsedVarNames', () => {
  it('finds every distinct var(--name) reference in a file', () => {
    const content = `
      .button {
        color: var(--ds-alias-color-surface);
        background: var(--ds-global-color-white, #fff);
        border-color: var(--ds-alias-color-surface);
      }
    `

    expect(extractUsedVarNames(content)).toEqual(new Set(['ds-alias-color-surface', 'ds-global-color-white']))
  })

  it('returns an empty set when nothing references a CSS variable', () => {
    expect(extractUsedVarNames('.button { color: red; }')).toEqual(new Set())
  })
})

describe('computeUsage', () => {
  it('counts distinct files per token and records their package + path', () => {
    const tokens = [
      { path: ['🌐 Global', '🌈 Color', 'White'], names: ['ds-global-color-white'] },
      { path: ['🔗 Alias', 'Color', 'Surface'], names: ['ds-alias-color-surface'] },
      { path: ['🔗 Alias', 'Color', 'Dead'], names: ['ds-alias-color-dead'] },
    ]
    const files = [
      {
        package: 'core',
        file: 'components/button/button.host.css',
        content: 'a { color: var(--ds-alias-color-surface); }',
      },
      {
        package: 'css',
        file: 'utilities.css',
        content: 'b { background: var(--ds-global-color-white); color: var(--ds-alias-color-surface); }',
      },
      // Same var referenced twice in one file — should still count as one location.
      {
        package: 'core',
        file: 'components/card/card.host.css',
        content: 'c { color: var(--ds-global-color-white); } d { color: var(--ds-global-color-white); }',
      },
    ]

    expect(computeUsage(tokens, files)).toEqual({
      '🌐 Global.🌈 Color.White': {
        count: 2,
        locations: [
          { package: 'core', file: 'components/card/card.host.css' },
          { package: 'css', file: 'utilities.css' },
        ],
      },
      '🔗 Alias.Color.Surface': {
        count: 2,
        locations: [
          { package: 'core', file: 'components/button/button.host.css' },
          { package: 'css', file: 'utilities.css' },
        ],
      },
      '🔗 Alias.Color.Dead': { count: 0, locations: [] },
    })
  })

  it('treats a -device reference as usage of every Mobile/Tablet/Desktop sibling', () => {
    // Only Desktop's literal name is unused; -device is what's actually
    // consumed, and per the responsive formatter that one shared variable is
    // fed by all three siblings depending on breakpoint — so a single
    // -device reference should mark Mobile, Tablet, *and* Desktop as used.
    const tokens = [
      { path: ['🔗 Alias', 'Space', 'SM', 'Mobile'], names: ['ds-alias-space-sm-mobile', 'ds-alias-space-sm-device'] },
      { path: ['🔗 Alias', 'Space', 'SM', 'Tablet'], names: ['ds-alias-space-sm-tablet', 'ds-alias-space-sm-device'] },
      {
        path: ['🔗 Alias', 'Space', 'SM', 'Desktop'],
        names: ['ds-alias-space-sm-desktop', 'ds-alias-space-sm-device'],
      },
    ]
    const files = [
      {
        package: 'core',
        file: 'typography.host.css',
        content: '.heading { margin-bottom: var(--ds-alias-space-sm-device); }',
      },
    ]

    const usage = computeUsage(tokens, files)
    expect(usage['🔗 Alias.Space.SM.Mobile']).toEqual({
      count: 1,
      locations: [{ package: 'core', file: 'typography.host.css' }],
    })
    expect(usage['🔗 Alias.Space.SM.Tablet']).toEqual(usage['🔗 Alias.Space.SM.Mobile'])
    expect(usage['🔗 Alias.Space.SM.Desktop']).toEqual(usage['🔗 Alias.Space.SM.Mobile'])
  })
})
