import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

import type { FigmaVariablesResponse } from './figma-client.js'
import { buildModeTree, isTokenNode, type TokenTree } from './transform.js'

const fixturePath = resolve(dirname(fileURLToPath(import.meta.url)), 'fixtures/variables-local-response.json')
const response = JSON.parse(readFileSync(fixturePath, 'utf8')) as FigmaVariablesResponse
const collectionId = Object.keys(response.meta.variableCollections)[0]

function group(tree: TokenTree, ...path: string[]): TokenTree {
  let node: TokenTree | TokenTree[string] = tree
  for (const key of path) {
    node = (node as TokenTree)[key]
  }
  if (isTokenNode(node as never)) {
    throw new Error(`Expected a group at ${path.join('.')}, found a token`)
  }
  return node as TokenTree
}

describe('buildModeTree', () => {
  it('builds a nested tree from variable name paths', () => {
    const { tree } = buildModeTree(response, collectionId, 'Base')
    const white = group(tree, '🌐 Global', '🌈 Color')['White']

    expect(isTokenNode(white)).toBe(true)
    if (!isTokenNode(white)) throw new Error('unreachable')
    expect(white.$type).toBe('color')
    expect(white.$value).toMatchObject({ hex: '#FFFFFF' })
    expect(white.$extensions['com.figma.variableId']).toBe('VariableID:1:1')
  })

  it('resolves variable aliases to a dotted reference string', () => {
    const { tree } = buildModeTree(response, collectionId, 'Base')
    const alias = group(tree, '🔗 Alias', 'Color', 'Text')['White']

    if (!isTokenNode(alias)) throw new Error('expected a token')
    expect(alias.$value).toBe('{🌐 Global.🌈 Color.White}')
  })

  it('converts FLOAT variables to number tokens and carries the description', () => {
    const { tree } = buildModeTree(response, collectionId, 'Base')
    const space = group(tree, '🌐 Global', '📏 Space')['Base']

    if (!isTokenNode(space)) throw new Error('expected a token')
    expect(space.$type).toBe('number')
    expect(space.$value).toBe(16)
    expect(space.$description).toBe('Base spacing unit in px')
  })

  it('resolves a different value for a non-default mode', () => {
    const { tree, modeId } = buildModeTree(response, collectionId, 'Tcs')
    const space = group(tree, '🌐 Global', '📏 Space')['Base']

    expect(modeId).toBe('1:1')
    if (!isTokenNode(space)) throw new Error('expected a token')
    expect(space.$value).toBe(20)
  })

  it('throws when the requested mode does not exist on the collection', () => {
    expect(() => buildModeTree(response, collectionId, 'Nonexistent')).toThrow(/Mode "Nonexistent" not found/)
  })

  it('throws when the collection id is unknown', () => {
    expect(() => buildModeTree(response, 'not-a-real-collection', 'Base')).toThrow(/not found in response/)
  })
})
