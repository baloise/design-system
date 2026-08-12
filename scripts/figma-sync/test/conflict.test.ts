import { describe, expect, it } from 'vitest'
import { buildCommentBody, COMMENT_MARKER, findConflicts } from '../lib/conflict.mjs'

const modeId = 'm-base'

function state(resolvedValue) {
  return {
    lastSyncedCommit: 'sha1',
    lastSyncedAt: '2026-01-01T00:00:00Z',
    entries: {
      'VariableID:1:1': {
        tokenPath: ['A'],
        resolvedValue,
        lastModifiedSource: 'code',
        lastModifiedAt: '2026-01-01T00:00:00Z',
      },
    },
  }
}

const baselineNumber = { kind: 'literal', value: 16 }

function token(value) {
  return { path: ['A'], type: 'number', value: { kind: 'literal', value }, variableId: 'VariableID:1:1' }
}

describe('findConflicts', () => {
  it('returns nothing when there is no baseline yet', () => {
    expect(
      findConflicts({ existingState: null, currentBaseTokens: [token(24)], figmaVariablesById: {}, modeId }),
    ).toEqual([])
  })

  it('is not a conflict when only GitHub changed (Figma still matches baseline)', () => {
    const conflicts = findConflicts({
      existingState: state(baselineNumber),
      currentBaseTokens: [token(24)],
      figmaVariablesById: { 'VariableID:1:1': { valuesByMode: { [modeId]: 16 } } },
      modeId,
    })
    expect(conflicts).toEqual([])
  })

  it('is not a conflict when only Figma changed (GitHub still matches baseline)', () => {
    const conflicts = findConflicts({
      existingState: state(baselineNumber),
      currentBaseTokens: [token(16)],
      figmaVariablesById: { 'VariableID:1:1': { valuesByMode: { [modeId]: 32 } } },
      modeId,
    })
    expect(conflicts).toEqual([])
  })

  it('is a conflict when both GitHub and Figma changed since baseline, to different values', () => {
    const conflicts = findConflicts({
      existingState: state(baselineNumber),
      currentBaseTokens: [token(24)],
      figmaVariablesById: { 'VariableID:1:1': { valuesByMode: { [modeId]: 32 } } },
      modeId,
    })
    expect(conflicts).toHaveLength(1)
    expect(conflicts[0]).toMatchObject({
      variableId: 'VariableID:1:1',
      tokenPath: ['A'],
      baselineValue: 16,
      githubValue: 24,
      figmaValue: 32,
    })
  })

  it('is not flagged as a conflict if both sides changed to the exact same value', () => {
    const conflicts = findConflicts({
      existingState: state(baselineNumber),
      currentBaseTokens: [token(24)],
      figmaVariablesById: { 'VariableID:1:1': { valuesByMode: { [modeId]: 24 } } },
      modeId,
    })
    expect(conflicts).toEqual([])
  })

  it('skips a token with no variableId (never synced)', () => {
    const unsynced = { path: ['B'], type: 'number', value: { kind: 'literal', value: 1 } }
    expect(
      findConflicts({
        existingState: state(baselineNumber),
        currentBaseTokens: [unsynced],
        figmaVariablesById: {},
        modeId,
      }),
    ).toEqual([])
  })

  it('skips a reference-kind token (out of scope for this pass, see module doc)', () => {
    const ref = {
      path: ['A'],
      type: 'color',
      value: { kind: 'reference', path: ['Global', 'White'] },
      variableId: 'VariableID:1:1',
    }
    expect(
      findConflicts({
        existingState: state({ kind: 'reference', path: ['x'] }),
        currentBaseTokens: [ref],
        figmaVariablesById: {},
        modeId,
      }),
    ).toEqual([])
  })

  it('skips a token whose variableId has no live Figma variable (deleted, or never actually pushed)', () => {
    const conflicts = findConflicts({
      existingState: state(baselineNumber),
      currentBaseTokens: [token(24)],
      figmaVariablesById: {},
      modeId,
    })
    expect(conflicts).toEqual([])
  })
})

describe('buildCommentBody', () => {
  it('always includes the marker, for find-or-update on re-runs', () => {
    expect(buildCommentBody([])).toContain(COMMENT_MARKER)
    expect(buildCommentBody([{ tokenPath: ['A'], baselineValue: 1, githubValue: 2, figmaValue: 3 }])).toContain(
      COMMENT_MARKER,
    )
  })

  it('reports "no conflicts" clearly when the list is empty', () => {
    expect(buildCommentBody([])).toMatch(/No conflicts detected/)
  })

  it('lists each conflicting token path in the body', () => {
    const body = buildCommentBody([
      { tokenPath: ['🌐 Global', 'Spacing', 'Lg'], baselineValue: 16, githubValue: 24, figmaValue: 32 },
    ])
    expect(body).toContain('🌐 Global.Spacing.Lg')
    expect(body).toMatch(/1 token\(s\)/)
  })
})
