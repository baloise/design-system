import { describe, expect, it } from 'vitest'
import { buildConsumerTree } from './graph'
import type { FlatToken } from './types'

function makeToken(overrides: Partial<FlatToken>): FlatToken {
  return {
    path: [],
    name: '',
    layer: 'Global',
    type: 'color',
    rawValue: undefined,
    referenceTarget: null,
    resolvedValue: undefined,
    resolutionError: null,
    figmaId: null,
    ...overrides,
  }
}

describe('buildConsumerTree', () => {
  it('walks a simple 3-level chain in depth order', () => {
    const tokens: FlatToken[] = [
      makeToken({ path: ['🌐 Global', 'White'], name: 'White', layer: 'Global' }),
      makeToken({
        path: ['🔗 Alias', 'White'],
        name: 'White',
        layer: 'Alias',
        referenceTarget: '🌐 Global.White',
      }),
      makeToken({
        path: ['🧩 Component', 'Button'],
        name: 'Button',
        layer: 'Component',
        referenceTarget: '🔗 Alias.White',
      }),
    ]

    const tree = buildConsumerTree(tokens, '🌐 Global.White')

    expect(tree.nodes).toEqual([
      { id: '🌐 Global.White', name: 'White', layer: 'Global', depth: 0 },
      { id: '🔗 Alias.White', name: 'White', layer: 'Alias', depth: 1 },
      { id: '🧩 Component.Button', name: 'Button', layer: 'Component', depth: 2 },
    ])
    expect(tree.edges).toEqual([
      { id: '🔗 Alias.White->🌐 Global.White', source: '🔗 Alias.White', target: '🌐 Global.White' },
      { id: '🧩 Component.Button->🔗 Alias.White', source: '🧩 Component.Button', target: '🔗 Alias.White' },
    ])
  })

  it('branches when multiple tokens reference the same target', () => {
    const tokens: FlatToken[] = [
      makeToken({ path: ['🌐 Global', 'Primary5'], name: 'Primary5', layer: 'Global' }),
      makeToken({
        path: ['🔗 Alias', 'A'],
        name: 'A',
        layer: 'Alias',
        referenceTarget: '🌐 Global.Primary5',
      }),
      makeToken({
        path: ['🔗 Alias', 'B'],
        name: 'B',
        layer: 'Alias',
        referenceTarget: '🌐 Global.Primary5',
      }),
    ]

    const tree = buildConsumerTree(tokens, '🌐 Global.Primary5')

    expect(tree.nodes).toHaveLength(3)
    expect(
      tree.nodes
        .filter(n => n.depth === 1)
        .map(n => n.id)
        .sort(),
    ).toEqual(['🔗 Alias.A', '🔗 Alias.B'])
    expect(tree.edges).toHaveLength(2)
  })

  it('returns just the root node with no edges when nothing references it', () => {
    const tokens: FlatToken[] = [makeToken({ path: ['🌐 Global', 'Lonely'], name: 'Lonely', layer: 'Global' })]

    const tree = buildConsumerTree(tokens, '🌐 Global.Lonely')

    expect(tree.nodes).toEqual([{ id: '🌐 Global.Lonely', name: 'Lonely', layer: 'Global', depth: 0 }])
    expect(tree.edges).toEqual([])
  })

  it('returns an empty tree for an unknown root path', () => {
    const tree = buildConsumerTree([], '🌐 Global.DoesNotExist')
    expect(tree).toEqual({ nodes: [], edges: [] })
  })

  it('walks upward through what the root references, stopping at a real value', () => {
    const tokens: FlatToken[] = [
      makeToken({ path: ['🌐 Global', 'White'], name: 'White', layer: 'Global' }),
      makeToken({
        path: ['🔗 Alias', 'Text', 'Color', 'White'],
        name: 'White',
        layer: 'Alias',
        referenceTarget: '🌐 Global.White',
      }),
      makeToken({
        path: ['🧩 Component', 'Footer', 'Color', 'Link', 'Base'],
        name: 'Base',
        layer: 'Component',
        referenceTarget: '🔗 Alias.Text.Color.White',
      }),
    ]

    const tree = buildConsumerTree(tokens, '🧩 Component.Footer.Color.Link.Base')

    expect(tree.nodes).toEqual([
      { id: '🧩 Component.Footer.Color.Link.Base', name: 'Base', layer: 'Component', depth: 0 },
      { id: '🔗 Alias.Text.Color.White', name: 'White', layer: 'Alias', depth: -1 },
      { id: '🌐 Global.White', name: 'White', layer: 'Global', depth: -2 },
    ])
    expect(tree.edges).toEqual([
      {
        id: '🧩 Component.Footer.Color.Link.Base->🔗 Alias.Text.Color.White',
        source: '🧩 Component.Footer.Color.Link.Base',
        target: '🔗 Alias.Text.Color.White',
      },
      {
        id: '🔗 Alias.Text.Color.White->🌐 Global.White',
        source: '🔗 Alias.Text.Color.White',
        target: '🌐 Global.White',
      },
    ])
  })

  it('combines upward ancestors and downward consumers around the root', () => {
    const tokens: FlatToken[] = [
      makeToken({ path: ['🌐 Global', 'White'], name: 'White', layer: 'Global' }),
      makeToken({
        path: ['🔗 Alias', 'White'],
        name: 'White',
        layer: 'Alias',
        referenceTarget: '🌐 Global.White',
      }),
      makeToken({
        path: ['🧩 Component', 'Button'],
        name: 'Button',
        layer: 'Component',
        referenceTarget: '🔗 Alias.White',
      }),
    ]

    const tree = buildConsumerTree(tokens, '🔗 Alias.White')

    expect(tree.nodes).toEqual([
      { id: '🔗 Alias.White', name: 'White', layer: 'Alias', depth: 0 },
      { id: '🧩 Component.Button', name: 'Button', layer: 'Component', depth: 1 },
      { id: '🌐 Global.White', name: 'White', layer: 'Global', depth: -1 },
    ])
    expect(tree.edges).toEqual([
      { id: '🧩 Component.Button->🔗 Alias.White', source: '🧩 Component.Button', target: '🔗 Alias.White' },
      { id: '🔗 Alias.White->🌐 Global.White', source: '🔗 Alias.White', target: '🌐 Global.White' },
    ])
  })

  it('does not infinite-loop on a hand-built circular reference', () => {
    const tokens: FlatToken[] = [
      makeToken({ path: ['🔗 Alias', 'A'], name: 'A', layer: 'Alias', referenceTarget: '🔗 Alias.B' }),
      makeToken({ path: ['🔗 Alias', 'B'], name: 'B', layer: 'Alias', referenceTarget: '🔗 Alias.A' }),
    ]

    const tree = buildConsumerTree(tokens, '🔗 Alias.A')

    // A is depth 0; B references A so it's depth 1; A "references" B too, but A is
    // already visited, so the cycle guard stops it there instead of looping forever.
    expect(tree.nodes.map(n => n.id)).toEqual(['🔗 Alias.A', '🔗 Alias.B'])
  })
})
