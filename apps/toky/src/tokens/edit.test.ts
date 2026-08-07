import { describe, expect, it } from 'vitest'
import { applyDiffToDocument, computeDiff, describeChangeStatus } from './edit'
import { flattenTokenDocument } from './flatten'
import type { WorkingToken } from './edit'
import type { FlatToken } from './types'

const fixtureDoc = {
  '🌐 Global': {
    '🌈 Color': {
      White: {
        $type: 'color',
        $value: { colorSpace: 'srgb', components: [1, 1, 1], alpha: 1, hex: '#FFFFFF' },
        $extensions: { 'com.figma.variableId': 'VariableID:1:1' },
      },
      Black: {
        $type: 'color',
        $value: { colorSpace: 'srgb', components: [0, 0, 0], alpha: 1, hex: '#000000' },
      },
    },
  },
  '🔗 Alias': {
    Background: {
      White: {
        $type: 'color',
        $value: '{🌐 Global.🌈 Color.White}',
      },
    },
  },
}

function toWorking(tokens: FlatToken[]): WorkingToken[] {
  return tokens.map(token => ({ id: token.path.join('.'), token }))
}

interface TokenNode {
  $type?: string
  $value?: unknown
  $extensions?: Record<string, unknown>
  [key: string]: unknown
}

function node(doc: Record<string, unknown>, ...path: string[]): TokenNode {
  let current: unknown = doc
  for (const key of path) {
    current = (current as Record<string, unknown>)[key]
  }
  return current as TokenNode
}

describe('computeDiff', () => {
  it('produces no entries when nothing changed', () => {
    const original = flattenTokenDocument(fixtureDoc)
    const diff = computeDiff(original, toWorking(original))
    expect(diff).toEqual([])
  })

  it('detects a value change as an update, keyed by the original path', () => {
    const original = flattenTokenDocument(fixtureDoc)
    const working = toWorking(original).map(w =>
      w.token.name === '🌈 Color.Black'
        ? { ...w, token: { ...w.token, rawValue: { ...(w.token.rawValue as object), hex: '#111111' } } }
        : w,
    )

    const diff = computeDiff(original, working)
    expect(diff).toHaveLength(1)
    expect(diff[0]).toMatchObject({ kind: 'update', oldPath: ['🌐 Global', '🌈 Color', 'Black'] })
  })

  it('detects a rename as a single update, not a delete+create', () => {
    const original = flattenTokenDocument(fixtureDoc)
    const working = toWorking(original).map(w =>
      w.token.name === '🌈 Color.White' ? { ...w, token: { ...w.token, name: '🌈 Color.OffWhite' } } : w,
    )

    const diff = computeDiff(original, working)
    expect(diff).toHaveLength(1)
    expect(diff[0]).toMatchObject({
      kind: 'update',
      oldPath: ['🌐 Global', '🌈 Color', 'White'],
      newPath: ['🌐 Global', '🌈 Color', 'OffWhite'],
    })
  })

  it('detects a removed working token as a delete', () => {
    const original = flattenTokenDocument(fixtureDoc)
    const working = toWorking(original).filter(w => w.id !== '🔗 Alias.Background.White')

    const diff = computeDiff(original, working)
    expect(diff).toHaveLength(1)
    expect(diff[0]).toMatchObject({ kind: 'delete', oldPath: ['🔗 Alias', 'Background', 'White'] })
  })

  it('detects a brand-new working token (no matching original id) as a create', () => {
    const original = flattenTokenDocument(fixtureDoc)
    const working = toWorking(original)
    working.push({
      id: 'new-1',
      token: {
        path: [],
        name: '🌈 Color.OffWhite',
        layer: 'Global',
        type: 'color',
        rawValue: { colorSpace: 'srgb', components: [0.9, 0.9, 0.9], alpha: 1, hex: '#E5E5E5' },
        referenceTarget: null,
        resolvedValue: undefined,
        resolutionError: null,
        figmaId: null,
      },
    })

    const diff = computeDiff(original, working)
    expect(diff).toHaveLength(1)
    expect(diff[0]).toMatchObject({
      kind: 'create',
      oldPath: null,
      newPath: ['🌐 Global', '🌈 Color', 'OffWhite'],
      before: undefined,
    })
  })
})

describe('describeChangeStatus', () => {
  it('returns "created" when there is no matching original token', () => {
    const original = flattenTokenDocument(fixtureDoc)
    const [white] = original
    expect(describeChangeStatus(undefined, white)).toBe('created')
  })

  it('returns "renamed" when the name (and therefore path) changed', () => {
    const original = flattenTokenDocument(fixtureDoc)
    const white = original.find(t => t.name === '🌈 Color.White')!
    expect(describeChangeStatus(white, { ...white, name: '🌈 Color.OffWhite' })).toBe('renamed')
  })

  it('returns "value" when the raw value changed', () => {
    const original = flattenTokenDocument(fixtureDoc)
    const black = original.find(t => t.name === '🌈 Color.Black')!
    const changed = { ...black, rawValue: { ...(black.rawValue as object), hex: '#111111' } }
    expect(describeChangeStatus(black, changed)).toBe('value')
  })

  it('returns "value" when the type changed', () => {
    const original = flattenTokenDocument(fixtureDoc)
    const black = original.find(t => t.name === '🌈 Color.Black')!
    expect(describeChangeStatus(black, { ...black, type: 'string' })).toBe('value')
  })

  it('returns "value" when a reference target changed', () => {
    const original = flattenTokenDocument(fixtureDoc)
    const aliasWhite = original.find(t => t.name === 'Background.White')!
    expect(describeChangeStatus(aliasWhite, { ...aliasWhite, referenceTarget: '🌐 Global.🌈 Color.Black' })).toBe(
      'value',
    )
  })

  it('returns null when nothing changed', () => {
    const original = flattenTokenDocument(fixtureDoc)
    const [white] = original
    expect(describeChangeStatus(white, { ...white })).toBeNull()
  })
})

describe('applyDiffToDocument', () => {
  it('applies an update, replacing $value and leaving the rest of the document untouched', () => {
    const result = applyDiffToDocument(fixtureDoc, [
      {
        kind: 'update',
        layer: 'Global',
        oldPath: ['🌐 Global', '🌈 Color', 'Black'],
        newPath: ['🌐 Global', '🌈 Color', 'Black'],
        type: 'color',
        value: { colorSpace: 'srgb', components: [0.1, 0.1, 0.1], alpha: 1, hex: '#111111' },
        before: fixtureDoc['🌐 Global']['🌈 Color'].Black.$value,
      },
    ])

    const black = node(result, '🌐 Global', '🌈 Color', 'Black')
    expect((black.$value as { hex: string }).hex).toBe('#111111')
    const white = node(result, '🌐 Global', '🌈 Color', 'White')
    expect((white.$value as { hex: string }).hex).toBe('#FFFFFF')
  })

  it('carries over $extensions (figma id) on update', () => {
    const result = applyDiffToDocument(fixtureDoc, [
      {
        kind: 'update',
        layer: 'Global',
        oldPath: ['🌐 Global', '🌈 Color', 'White'],
        newPath: ['🌐 Global', '🌈 Color', 'White'],
        type: 'color',
        value: { colorSpace: 'srgb', components: [1, 1, 1], alpha: 1, hex: '#FEFEFE' },
        before: fixtureDoc['🌐 Global']['🌈 Color'].White.$value,
      },
    ])

    const white = node(result, '🌐 Global', '🌈 Color', 'White')
    expect(white.$extensions).toEqual({ 'com.figma.variableId': 'VariableID:1:1' })
  })

  it('moves a node on rename (removes old path, creates new path)', () => {
    const result = applyDiffToDocument(fixtureDoc, [
      {
        kind: 'update',
        layer: 'Global',
        oldPath: ['🌐 Global', '🌈 Color', 'White'],
        newPath: ['🌐 Global', '🌈 Color', 'OffWhite'],
        type: 'color',
        value: fixtureDoc['🌐 Global']['🌈 Color'].White.$value,
        before: fixtureDoc['🌐 Global']['🌈 Color'].White.$value,
      },
    ])

    const colorGroup = node(result, '🌐 Global', '🌈 Color')
    expect(colorGroup.White).toBeUndefined()
    const offWhite = node(result, '🌐 Global', '🌈 Color', 'OffWhite')
    expect((offWhite.$value as { hex: string }).hex).toBe('#FFFFFF')
  })

  it('applies a create, adding a brand-new node', () => {
    const result = applyDiffToDocument(fixtureDoc, [
      {
        kind: 'create',
        layer: 'Alias',
        oldPath: null,
        newPath: ['🔗 Alias', 'Background', 'Black'],
        type: 'color',
        value: '{🌐 Global.🌈 Color.Black}',
        before: undefined,
      },
    ])

    const black = node(result, '🔗 Alias', 'Background', 'Black')
    expect(black).toEqual({ $type: 'color', $value: '{🌐 Global.🌈 Color.Black}' })
    // untouched sibling still there
    const white = node(result, '🔗 Alias', 'Background', 'White')
    expect(white.$value).toBe('{🌐 Global.🌈 Color.White}')
  })

  it('applies a delete and prunes an emptied parent group', () => {
    const result = applyDiffToDocument(fixtureDoc, [
      {
        kind: 'delete',
        layer: 'Alias',
        oldPath: ['🔗 Alias', 'Background', 'White'],
        newPath: null,
        type: 'color',
        value: undefined,
        before: '{🌐 Global.🌈 Color.White}',
      },
    ])

    // Background had only White under it, and 🔗 Alias had only Background — both prune away
    expect(result['🔗 Alias']).toBeUndefined()
    // original document is not mutated
    expect(node(fixtureDoc, '🔗 Alias', 'Background', 'White')).toBeDefined()
  })

  it('leaves an untouched sibling group intact after deleting one leaf from another', () => {
    const result = applyDiffToDocument(fixtureDoc, [
      {
        kind: 'delete',
        layer: 'Global',
        oldPath: ['🌐 Global', '🌈 Color', 'Black'],
        newPath: null,
        type: 'color',
        value: undefined,
        before: fixtureDoc['🌐 Global']['🌈 Color'].Black.$value,
      },
    ])

    const colorGroup = node(result, '🌐 Global', '🌈 Color')
    expect(colorGroup.Black).toBeUndefined()
    const white = node(result, '🌐 Global', '🌈 Color', 'White')
    expect((white.$value as { hex: string }).hex).toBe('#FFFFFF')
  })
})
