import { describe, expect, it } from 'vitest'
import { buildSyncState } from '../lib/baseline.mjs'
import { buildDeleteVariablesPayload, findRemovedVariableIds } from '../lib/deletion.mjs'

describe('findRemovedVariableIds', () => {
  const existingState = {
    lastSyncedCommit: 'sha1',
    lastSyncedAt: '2026-01-01T00:00:00Z',
    entries: {
      v1: { tokenPath: ['A'], resolvedValue: {}, lastModifiedSource: 'code', lastModifiedAt: '2026-01-01T00:00:00Z' },
      v2: { tokenPath: ['B'], resolvedValue: {}, lastModifiedSource: 'code', lastModifiedAt: '2026-01-01T00:00:00Z' },
    },
  }

  it('returns baseline ids that no longer appear in the current token tree', () => {
    const currentTokens = [{ path: ['A'], type: 'string', value: { kind: 'literal', value: 'x' }, variableId: 'v1' }]
    expect(findRemovedVariableIds(existingState, currentTokens)).toEqual(['v2'])
  })

  it('returns nothing when every baseline id is still present', () => {
    const currentTokens = [
      { path: ['A'], type: 'string', value: { kind: 'literal', value: 'x' }, variableId: 'v1' },
      { path: ['B'], type: 'string', value: { kind: 'literal', value: 'y' }, variableId: 'v2' },
    ]
    expect(findRemovedVariableIds(existingState, currentTokens)).toEqual([])
  })

  it('returns nothing when there is no baseline yet (first-ever sync)', () => {
    expect(findRemovedVariableIds(null, [])).toEqual([])
  })

  it('never flags a Figma-side-only variable — only ever compares against the baseline, not current Figma state', () => {
    // A variable current tokens don't reference, but that was ALSO never in
    // the baseline, must not appear — that's a designer's not-yet-synced
    // creation (docs/adr/0019-pull-auto-deletes-figma-variables.md), not
    // something this run ever owned.
    const currentTokens = [{ path: ['A'], type: 'string', value: { kind: 'literal', value: 'x' }, variableId: 'v1' }]
    const staleBaseline = { ...existingState, entries: { v1: existingState.entries.v1 } }
    expect(findRemovedVariableIds(staleBaseline, currentTokens)).toEqual([])
  })

  it("treats all 5 of a shadow token's sub-ids as present, not just one", () => {
    const shadowState = {
      ...existingState,
      entries: {
        ...existingState.entries,
        'shadow-x': {},
        'shadow-y': {},
        'shadow-b': {},
        'shadow-s': {},
        'shadow-c': {},
      },
    }
    const currentTokens = [
      { path: ['A'], type: 'string', value: { kind: 'literal', value: 'x' }, variableId: 'v1' },
      { path: ['B'], type: 'string', value: { kind: 'literal', value: 'y' }, variableId: 'v2' },
      {
        path: ['Global', 'Shadow', 'Base'],
        type: 'shadow',
        value: { kind: 'literal', value: {} },
        variableId: {
          offsetX: 'shadow-x',
          offsetY: 'shadow-y',
          blur: 'shadow-b',
          spread: 'shadow-s',
          color: 'shadow-c',
        },
      },
    ]
    expect(findRemovedVariableIds(shadowState, currentTokens)).toEqual([])
  })

  it('flags only the shadow sub-ids actually missing, not the whole token', () => {
    const shadowState = {
      ...existingState,
      entries: { 'shadow-x': {}, 'shadow-y': {}, 'shadow-b': {}, 'shadow-s': {}, 'shadow-c': {} },
    }
    // Current token only carries 4 of its 5 sub-ids (e.g. the color
    // variable was deleted in Figma out from under it).
    const currentTokens = [
      {
        path: ['Global', 'Shadow', 'Base'],
        type: 'shadow',
        value: { kind: 'literal', value: {} },
        variableId: { offsetX: 'shadow-x', offsetY: 'shadow-y', blur: 'shadow-b', spread: 'shadow-s' },
      },
    ]
    expect(findRemovedVariableIds(shadowState, currentTokens)).toEqual(['shadow-c'])
  })
})

describe('buildDeleteVariablesPayload', () => {
  it('builds one DELETE action per removed id', () => {
    expect(buildDeleteVariablesPayload(['v2', 'v3'])).toEqual({
      variables: [
        { action: 'DELETE', id: 'v2' },
        { action: 'DELETE', id: 'v3' },
      ],
    })
  })

  it('builds an empty variables array when nothing was removed', () => {
    expect(buildDeleteVariablesPayload([])).toEqual({ variables: [] })
  })
})

describe('buildSyncState with removedVariableIds', () => {
  const existingState = {
    lastSyncedCommit: 'old-sha',
    lastSyncedAt: '2026-01-01T00:00:00Z',
    entries: {
      v1: {
        tokenPath: ['A'],
        resolvedValue: { kind: 'literal', value: 'x' },
        lastModifiedSource: 'code',
        lastModifiedAt: '2026-01-01T00:00:00Z',
      },
      v2: {
        tokenPath: ['B'],
        resolvedValue: { kind: 'literal', value: 'y' },
        lastModifiedSource: 'code',
        lastModifiedAt: '2026-01-01T00:00:00Z',
      },
    },
  }

  it('drops entries for removed ids while leaving other entries untouched', () => {
    const state = buildSyncState({
      existingState,
      baseTokens: [],
      mergeCommitSha: 'sha2',
      syncedAt: '2026-08-06T00:00:00Z',
      removedVariableIds: ['v2'],
    })
    expect(state.entries).toEqual({ v1: existingState.entries.v1 })
  })

  it('a deletion-only run (empty baseTokens) still updates lastSyncedCommit/lastSyncedAt', () => {
    const state = buildSyncState({
      existingState,
      baseTokens: [],
      mergeCommitSha: 'sha2',
      syncedAt: '2026-08-06T00:00:00Z',
      removedVariableIds: ['v2'],
    })
    expect(state.lastSyncedCommit).toBe('sha2')
    expect(state.lastSyncedAt).toBe('2026-08-06T00:00:00Z')
  })

  it('removal and re-addition of the same id in one run keeps the new entry, not a dropped one', () => {
    const reAdded = [{ path: ['B'], type: 'string', value: { kind: 'literal', value: 'new' }, variableId: 'v2' }]
    const state = buildSyncState({
      existingState,
      baseTokens: reAdded,
      mergeCommitSha: 'sha2',
      syncedAt: '2026-08-06T00:00:00Z',
      removedVariableIds: ['v2'],
    })
    expect(state.entries.v2.resolvedValue).toEqual({ kind: 'literal', value: 'new' })
  })
})
