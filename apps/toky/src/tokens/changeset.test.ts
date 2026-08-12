import { describe, expect, it } from 'vitest'
import { buildChangesetContent, bumpLevelForDiff } from './changeset'
import type { TokenDiffEntry } from './edit'

function makeEntry(overrides: Partial<TokenDiffEntry>): TokenDiffEntry {
  return {
    kind: 'update',
    layer: 'Global',
    oldPath: ['🌐 Global', 'White'],
    newPath: ['🌐 Global', 'White'],
    type: 'color',
    value: { hex: '#EEEEEE' },
    before: { hex: '#FFFFFF' },
    ...overrides,
  }
}

describe('bumpLevelForDiff', () => {
  it('is major when anything was deleted', () => {
    expect(bumpLevelForDiff([makeEntry({ kind: 'delete' }), makeEntry({ kind: 'create' })])).toBe('major')
  })

  it('is minor when something was created but nothing deleted', () => {
    expect(bumpLevelForDiff([makeEntry({ kind: 'create' }), makeEntry({ kind: 'update' })])).toBe('minor')
  })

  it('is patch when everything is just a value/rename update', () => {
    expect(bumpLevelForDiff([makeEntry({ kind: 'update' })])).toBe('patch')
  })

  it('is minor for a brand-only change, even with no token diff', () => {
    expect(bumpLevelForDiff([], ['Acme'])).toBe('minor')
  })

  it('stays major when a token was deleted even alongside a new brand', () => {
    expect(bumpLevelForDiff([makeEntry({ kind: 'delete' })], ['Acme'])).toBe('major')
  })
})

describe('buildChangesetContent', () => {
  it('writes frontmatter for @baloise/ds-tokens at the computed bump level', () => {
    const content = buildChangesetContent([makeEntry({ kind: 'update' })], '')
    expect(content).toContain("'@baloise/ds-tokens': patch")
  })

  it('uses the caller-supplied description as the summary when given', () => {
    const content = buildChangesetContent([makeEntry({ kind: 'update' })], 'Lighten the white token slightly')
    expect(content).toContain('**tokens**: Lighten the white token slightly')
  })

  it('falls back to a generated summary counting created/updated/deleted tokens', () => {
    const diff = [makeEntry({ kind: 'create' }), makeEntry({ kind: 'update' }), makeEntry({ kind: 'delete' })]
    const content = buildChangesetContent(diff, '')
    expect(content).toContain('**tokens**: 1 created, 1 updated, 1 deleted design tokens.')
  })

  it('singularizes "token" when there is exactly one change', () => {
    const content = buildChangesetContent([makeEntry({ kind: 'create' })], '')
    expect(content).toContain('**tokens**: 1 created design token.')
  })

  it('lists created/updated/deleted tokens by name below the summary', () => {
    const diff: TokenDiffEntry[] = [
      makeEntry({ kind: 'create', oldPath: null, newPath: ['🌐 Global', '🌈 Color', 'OffWhite'] }),
      makeEntry({
        kind: 'update',
        oldPath: ['🌐 Global', '🌈 Color', 'White'],
        newPath: ['🌐 Global', '🌈 Color', 'White'],
      }),
      makeEntry({ kind: 'delete', oldPath: ['🌐 Global', '🌈 Color', 'Old'], newPath: null }),
    ]

    const content = buildChangesetContent(diff, 'Some changes')

    expect(content).toContain('**Created:** 🌐 Global/🌈 Color/OffWhite')
    expect(content).toContain('**Updated:** 🌐 Global/🌈 Color/White')
    expect(content).toContain('**Deleted:** 🌐 Global/🌈 Color/Old')
  })

  it('renders a rename as "old → new" in the Updated line', () => {
    const diff: TokenDiffEntry[] = [
      makeEntry({
        kind: 'update',
        oldPath: ['🌐 Global', '🌈 Color', 'White'],
        newPath: ['🌐 Global', '🌈 Color', 'OffWhite'],
      }),
    ]

    const content = buildChangesetContent(diff, 'Renamed a token')

    expect(content).toContain('**Updated:** 🌐 Global/🌈 Color/White → 🌐 Global/🌈 Color/OffWhite')
  })

  it('mentions a created brand and bumps minor, even with no token diff', () => {
    const content = buildChangesetContent([], '', ['Acme'])

    expect(content).toContain("'@baloise/ds-tokens': minor")
    expect(content).toContain('**tokens**: Add the Acme brand.')
    expect(content).toContain('**Created brand:** Acme')
  })

  it('mentions multiple created brands', () => {
    const content = buildChangesetContent([], '', ['Acme', 'Bravo'])

    expect(content).toContain('**tokens**: Add the Acme, Bravo brands.')
    expect(content).toContain('**Created brand:** Acme, Bravo')
  })

  it('combines a token summary and a brand summary when both are present', () => {
    const content = buildChangesetContent([makeEntry({ kind: 'update' })], '', ['Acme'])

    expect(content).toContain('**tokens**: 1 updated design token. Add the Acme brand.')
  })

  it('mentions brand overrides in the summary and lists them by name, staying patch-level', () => {
    const brandDiffs = {
      Tcs: [
        makeEntry({ kind: 'update', oldPath: ['🌐 Global', 'White'], newPath: ['🌐 Global', 'White'] }),
        makeEntry({ kind: 'delete', oldPath: ['🌐 Global', 'Black'], newPath: null }),
      ],
    }

    const content = buildChangesetContent([], '', [], brandDiffs)

    expect(content).toContain("'@baloise/ds-tokens': patch")
    expect(content).toContain('**tokens**: 2 brand overrides.')
    expect(content).toContain('**Tcs — Overridden:** 🌐 Global/White')
    expect(content).toContain('**Tcs — Reverted:** 🌐 Global/Black')
  })
})
