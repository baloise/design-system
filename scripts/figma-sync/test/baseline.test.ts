import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { applyVariableIdPatch, buildSyncState } from '../lib/baseline.mjs'
import { flattenTokens, loadTokenFile } from '../lib/tokens.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TOKENS_DIR = resolve(__dirname, '../../../packages/tokens/tokens')

const tree = {
  '🌐 Global': {
    '🌈 Color': {
      White: { $type: 'color', $value: { hex: '#FFFFFF' } }, // no id yet
      Black: {
        $type: 'color',
        $value: { hex: '#000000' },
        $extensions: { 'com.figma.variableId': 'VariableID:1:1', 'com.figma.scopes': ['ALL_SCOPES'] },
      },
    },
  },
}

describe('applyVariableIdPatch', () => {
  it('sets variableId and a default ALL_SCOPES on a token that had neither', () => {
    const patched = applyVariableIdPatch(tree, [
      { path: ['🌐 Global', '🌈 Color', 'White'], variableId: 'VariableID:9:9' },
    ])
    expect(patched['🌐 Global']['🌈 Color'].White.$extensions).toEqual({
      'com.figma.variableId': 'VariableID:9:9',
      'com.figma.scopes': ['ALL_SCOPES'],
    })
  })

  it('does not touch a token outside the patch list', () => {
    const patched = applyVariableIdPatch(tree, [
      { path: ['🌐 Global', '🌈 Color', 'White'], variableId: 'VariableID:9:9' },
    ])
    expect(patched['🌐 Global']['🌈 Color'].Black.$extensions.variableId).toBeUndefined()
    expect(patched['🌐 Global']['🌈 Color'].Black.$extensions['com.figma.variableId']).toBe('VariableID:1:1')
  })

  it('does not mutate the input tree (returns a patched copy)', () => {
    applyVariableIdPatch(tree, [{ path: ['🌐 Global', '🌈 Color', 'White'], variableId: 'VariableID:9:9' }])
    expect(tree['🌐 Global']['🌈 Color'].White.$extensions).toBeUndefined()
  })

  it('throws if the path does not resolve to a token leaf', () => {
    expect(() => applyVariableIdPatch(tree, [{ path: ['🌐 Global', 'Nonexistent'], variableId: 'x' }])).toThrow(
      /no token leaf found/,
    )
  })

  it('patches correctly against the real Base.tokens.json shape', () => {
    const realBase = loadTokenFile(resolve(TOKENS_DIR, 'Base.tokens.json'))
    const [firstUnsynced] = flattenTokens(realBase).filter(t => !t.variableId)
    expect(firstUnsynced, 'expected at least one real token without a variableId to test against').toBeTruthy()

    const patched = applyVariableIdPatch(realBase, [{ path: firstUnsynced.path, variableId: 'VariableID:99:99' }])
    const [patchedToken] = flattenTokens(patched).filter(t => t.path.join('.') === firstUnsynced.path.join('.'))
    expect(patchedToken.variableId).toBe('VariableID:99:99')
  })
})

describe('buildSyncState', () => {
  const baseTokens = [
    { path: ['A'], type: 'string', value: { kind: 'literal', value: 'x' }, variableId: 'v1' },
    { path: ['B'], type: 'string', value: { kind: 'literal', value: 'y' }, variableId: 'v2' },
  ]

  it('builds one entry per token, keyed by variableId', () => {
    const state = buildSyncState({
      existingState: null,
      baseTokens,
      mergeCommitSha: 'sha1',
      syncedAt: '2026-08-06T00:00:00Z',
    })

    expect(state.lastSyncedCommit).toBe('sha1')
    expect(state.entries.v1).toEqual({
      tokenPath: ['A'],
      resolvedValue: { kind: 'literal', value: 'x' },
      lastModifiedSource: 'code',
      lastModifiedAt: '2026-08-06T00:00:00Z',
    })
  })

  it('overwrites a stale entry for a token this run touched, but keeps entries for tokens outside the run', () => {
    const existingState = {
      lastSyncedCommit: 'old-sha',
      lastSyncedAt: '2026-01-01T00:00:00Z',
      entries: {
        v1: {
          tokenPath: ['A'],
          resolvedValue: { kind: 'literal', value: 'stale' },
          lastModifiedSource: 'figma',
          lastModifiedAt: '2026-01-01T00:00:00Z',
        },
        vUntouched: {
          tokenPath: ['Z'],
          resolvedValue: { kind: 'literal', value: 'z' },
          lastModifiedSource: 'code',
          lastModifiedAt: '2026-01-01T00:00:00Z',
        },
      },
    }

    const state = buildSyncState({
      existingState,
      baseTokens,
      mergeCommitSha: 'sha2',
      syncedAt: '2026-08-06T00:00:00Z',
    })

    expect(state.entries.v1.resolvedValue).toEqual({ kind: 'literal', value: 'x' })
    expect(state.entries.v1.lastModifiedAt).toBe('2026-08-06T00:00:00Z')
    expect(state.entries.vUntouched).toEqual(existingState.entries.vUntouched)
  })

  it('throws if a token has no variableId — ids must be patched before the baseline is built', () => {
    const withoutId = [{ path: ['A'], type: 'string', value: { kind: 'literal', value: 'x' } }]
    expect(() =>
      buildSyncState({ existingState: null, baseTokens: withoutId, mergeCommitSha: 'sha', syncedAt: 'now' }),
    ).toThrow(/has no variableId/)
  })

  it("fans a shadow token's 5-id variableId out into 5 tagged baseline entries", () => {
    const shadowValue = { kind: 'literal', value: { color: {}, offsetX: {}, offsetY: {}, blur: {}, spread: {} } }
    const shadowTokens = [
      {
        path: ['Global', 'Shadow', 'Base'],
        type: 'shadow',
        value: shadowValue,
        variableId: { offsetX: 'id-x', offsetY: 'id-y', blur: 'id-b', spread: 'id-s', color: 'id-c' },
      },
    ]

    const state = buildSyncState({
      existingState: null,
      baseTokens: shadowTokens,
      mergeCommitSha: 'sha',
      syncedAt: 'now',
    })

    expect(Object.keys(state.entries).sort()).toEqual(['id-b', 'id-c', 'id-s', 'id-x', 'id-y'])
    expect(state.entries['id-c']).toEqual({
      tokenPath: ['Global', 'Shadow', 'Base'],
      subProperty: 'color',
      resolvedValue: shadowValue,
      lastModifiedSource: 'code',
      lastModifiedAt: 'now',
    })
  })

  it('does not throw for a multi-layer shadow token with no variableId — it was never eligible for sync', () => {
    const multiLayerToken = {
      path: ['Global', 'Shadow', 'Stacked'],
      type: 'shadow',
      value: { kind: 'literal', value: [{}, {}] },
    }
    expect(() =>
      buildSyncState({ existingState: null, baseTokens: [multiLayerToken], mergeCommitSha: 'sha', syncedAt: 'now' }),
    ).not.toThrow()
  })
})
