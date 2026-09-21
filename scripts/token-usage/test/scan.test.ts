import { describe, expect, it } from 'vitest'
import { collectBaseTokens, computeUsage, extractUsedVarNames } from '../lib/scan.mjs'

describe('collectBaseTokens', () => {
  it('collects leaf tokens from the Global, Alias, Device, and Component layers', () => {
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
      '📱 Device': {
        Space: {
          Sm: { path: ['📱 Device', 'Space', 'Sm'], name: 'ds-device-space-sm' },
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
      { path: ['📱 Device', 'Space', 'Sm'], names: ['ds-device-space-sm'] },
      { path: ['🧩 Component', 'Button', 'Bg'], names: ['ds-button-bg'] },
    ])
  })

  it('ignores layers other than Global, Alias, Device, and Component', () => {
    const docsJson = {
      '🎨 Brand': {
        Tcs: { path: ['🎨 Brand', 'Tcs'], name: 'ds-brand-tcs' },
      },
    }

    expect(collectBaseTokens(docsJson)).toEqual([])
  })

  it('adds the shared bare (auto-switching) name for responsive Mobile/Tablet/Desktop siblings', () => {
    const docsJson = {
      '📱 Device': {
        Space: {
          SM: {
            Mobile: { path: ['📱 Device', 'Space', 'SM', 'Mobile'], name: 'ds-device-space-sm-mobile' },
            Tablet: { path: ['📱 Device', 'Space', 'SM', 'Tablet'], name: 'ds-device-space-sm-tablet' },
            Desktop: { path: ['📱 Device', 'Space', 'SM', 'Desktop'], name: 'ds-device-space-sm-desktop' },
          },
        },
      },
    }

    expect(collectBaseTokens(docsJson)).toEqual([
      {
        path: ['📱 Device', 'Space', 'SM', 'Mobile'],
        names: ['ds-device-space-sm-mobile', 'ds-device-space-sm'],
      },
      {
        path: ['📱 Device', 'Space', 'SM', 'Tablet'],
        names: ['ds-device-space-sm-tablet', 'ds-device-space-sm'],
      },
      {
        path: ['📱 Device', 'Space', 'SM', 'Desktop'],
        names: ['ds-device-space-sm-desktop', 'ds-device-space-sm'],
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

  it('treats a bare auto-switching reference as usage of every Mobile/Tablet/Desktop sibling', () => {
    // Only Desktop's literal name is unused; the bare name is what's actually
    // consumed, and per the responsive formatter that one shared variable is
    // fed by all three siblings depending on breakpoint — so a single bare
    // reference should mark Mobile, Tablet, *and* Desktop as used.
    const tokens = [
      { path: ['📱 Device', 'Space', 'SM', 'Mobile'], names: ['ds-device-space-sm-mobile', 'ds-device-space-sm'] },
      { path: ['📱 Device', 'Space', 'SM', 'Tablet'], names: ['ds-device-space-sm-tablet', 'ds-device-space-sm'] },
      {
        path: ['📱 Device', 'Space', 'SM', 'Desktop'],
        names: ['ds-device-space-sm-desktop', 'ds-device-space-sm'],
      },
    ]
    const files = [
      {
        package: 'core',
        file: 'typography.host.css',
        content: '.heading { margin-bottom: var(--ds-device-space-sm); }',
      },
    ]

    const usage = computeUsage(tokens, files)
    expect(usage['📱 Device.Space.SM.Mobile']).toEqual({
      count: 1,
      locations: [{ package: 'core', file: 'typography.host.css' }],
    })
    expect(usage['📱 Device.Space.SM.Tablet']).toEqual(usage['📱 Device.Space.SM.Mobile'])
    expect(usage['📱 Device.Space.SM.Desktop']).toEqual(usage['📱 Device.Space.SM.Mobile'])
  })
})
