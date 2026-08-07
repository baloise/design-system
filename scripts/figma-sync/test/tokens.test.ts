import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { computeTokenDiff as realComputeTokenDiff } from '../../../packages/tokens/src/config.brand.ts'
import { brandFilePath, computeTokenDiff, flattenTokens, listBrandNames, loadTokenFile, mergeBrandTree } from '../lib/tokens.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TOKENS_DIR = resolve(__dirname, '../../../packages/tokens/tokens')

const base = {
  '🌐 Global': {
    '🌈 Color': {
      White: {
        $type: 'color',
        $value: { hex: '#FFFFFF' },
        $extensions: { 'com.figma.variableId': 'VariableID:1:1', 'com.figma.scopes': ['ALL_SCOPES'] },
      },
      Black: {
        $type: 'color',
        $value: { hex: '#000000' },
      },
    },
  },
  '🔗 Alias': {
    Background: {
      $type: 'color',
      $value: '{🌐 Global.🌈 Color.White}',
      $extensions: { 'com.figma.variableId': 'VariableID:1:2' },
    },
  },
}

const brandOverride = {
  '🌐 Global': {
    '🌈 Color': {
      White: { $type: 'color', $value: { hex: '#EEEEEE' } },
    },
  },
}

/**
 * mergeBrandTree deliberately carries $extensions forward from Base onto an
 * overridden leaf (variableId is reused, never minted — see the
 * "keeping the base $extensions" test below), but a brand override *file*
 * on disk never has $extensions of its own. Stripped comparison is what
 * makes "diff the merge, get back the override" a meaningful round-trip
 * property instead of an apples-to-oranges one.
 */
function stripExtensions(node) {
  if (Array.isArray(node)) return node.map(stripExtensions)
  if (typeof node !== 'object' || node === null) return node
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(node)) {
    if (key === '$extensions') continue
    result[key] = stripExtensions(value)
  }
  return result
}

describe('flattenTokens', () => {
  it('emits one Token per $value leaf, skipping group nodes', () => {
    const tokens = flattenTokens(base)

    expect(tokens).toHaveLength(3)
    expect(tokens.map(t => t.path)).toEqual([
      ['🌐 Global', '🌈 Color', 'White'],
      ['🌐 Global', '🌈 Color', 'Black'],
      ['🔗 Alias', 'Background'],
    ])
  })

  it('carries variableId and scopes from the flat-keyed $extensions', () => {
    const [white] = flattenTokens(base)
    expect(white.variableId).toBe('VariableID:1:1')
    expect(white.figmaScopes).toEqual(['ALL_SCOPES'])
  })

  it('leaves variableId/figmaScopes undefined when never synced', () => {
    const [, black] = flattenTokens(base)
    expect(black.variableId).toBeUndefined()
    expect(black.figmaScopes).toBeUndefined()
  })

  it('parses a {Reference} string as a reference value, not a literal', () => {
    const [, , background] = flattenTokens(base)
    expect(background.value).toEqual({ kind: 'reference', path: ['🌐 Global', '🌈 Color', 'White'] })
  })

  it('parses a non-reference $value as a literal', () => {
    const [white] = flattenTokens(base)
    expect(white.value).toEqual({ kind: 'literal', value: { hex: '#FFFFFF' } })
  })
})

describe('mergeBrandTree', () => {
  it('overrides a leaf value while keeping the base $extensions (variableId reused, not minted)', () => {
    const resolved = mergeBrandTree(base, brandOverride)
    expect(resolved['🌐 Global']['🌈 Color'].White.$value).toEqual({ hex: '#EEEEEE' })
    expect(resolved['🌐 Global']['🌈 Color'].White.$extensions['com.figma.variableId']).toBe('VariableID:1:1')
  })

  it('copies through the base value for tokens the brand does not override', () => {
    const resolved = mergeBrandTree(base, brandOverride)
    expect(resolved['🌐 Global']['🌈 Color'].Black.$value).toEqual({ hex: '#000000' })
    expect(resolved['🔗 Alias'].Background.$value).toBe('{🌐 Global.🌈 Color.White}')
  })

  it('resolves identically to base when the brand file is empty (Tcs.tokens.json before any override)', () => {
    const resolved = mergeBrandTree(base, {})
    expect(resolved).toEqual(base)
  })

  it('round-trips through the real computeTokenDiff: diffing a merged tree against Base reproduces exactly the override that was merged in', () => {
    const resolved = mergeBrandTree(base, brandOverride)
    expect(stripExtensions(realComputeTokenDiff(base, resolved))).toEqual(brandOverride)
  })
})

describe('computeTokenDiff (local copy) matches packages/tokens/src/config.brand.ts', () => {
  it('produces the same output as the real Style Dictionary implementation', () => {
    expect(computeTokenDiff(base, brandOverride)).toEqual(realComputeTokenDiff(base, brandOverride))
  })

  it('produces the same output on the real Base + brand token files', () => {
    // Exercises both implementations against production data, not just the
    // synthetic fixture above — this is the parity check the Phase 1
    // milestone in docs/plans/figma-sync-action-plan.md calls for.
    const realBase = loadTokenFile(resolve(TOKENS_DIR, 'Base.tokens.json'))

    for (const brandName of listBrandNames(TOKENS_DIR)) {
      const override = loadTokenFile(brandFilePath(TOKENS_DIR, brandName))
      expect(computeTokenDiff(realBase, override), `mismatch for brand ${brandName}`).toEqual(
        realComputeTokenDiff(realBase, override),
      )
    }
  })
})

describe('mergeBrandTree round-trips on the real Base + brand token files', () => {
  it('resolving then diffing a real brand file against Base reproduces the same sparse diff the raw file itself produces', () => {
    // Not "reproduces the raw override file" — a real brand file can contain
    // an entry whose $value happens to equal Base's (e.g. Tcs.tokens.json's
    // White, which is byte-identical to Base's White today), and
    // computeTokenDiff correctly treats that as no override at all. The
    // real round-trip invariant is against the *diffed* override, not the
    // raw file on disk.
    const realBase = loadTokenFile(resolve(TOKENS_DIR, 'Base.tokens.json'))

    for (const brandName of listBrandNames(TOKENS_DIR)) {
      const override = loadTokenFile(brandFilePath(TOKENS_DIR, brandName))
      const resolved = mergeBrandTree(realBase, override)
      const expected = realComputeTokenDiff(realBase, override)
      const received = stripExtensions(realComputeTokenDiff(realBase, resolved))
      expect(received, `round-trip mismatch for brand ${brandName}`).toEqual(expected)
    }
  })

  it('flattening a resolved real brand tree yields one token per Base leaf, all with an explicit value', () => {
    const realBase = loadTokenFile(resolve(TOKENS_DIR, 'Base.tokens.json'))
    const baseTokenCount = flattenTokens(realBase).length

    for (const brandName of listBrandNames(TOKENS_DIR)) {
      const override = loadTokenFile(brandFilePath(TOKENS_DIR, brandName))
      const resolved = mergeBrandTree(realBase, override)
      expect(flattenTokens(resolved), `token count mismatch for brand ${brandName}`).toHaveLength(baseTokenCount)
    }
  })
})
