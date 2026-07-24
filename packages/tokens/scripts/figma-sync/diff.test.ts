import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

import { diffBrandTree } from './diff.js'
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
  return node as TokenTree
}

describe('diffBrandTree', () => {
  const { tree: baseTree } = buildModeTree(response, collectionId, 'Base')
  const { tree: tcsTree } = buildModeTree(response, collectionId, 'Tcs')
  const diffed = diffBrandTree(baseTree, tcsTree)

  it('keeps a color token whose value differs from Base', () => {
    const white = group(diffed, '🌐 Global', '🌈 Color')['White']
    if (!isTokenNode(white)) throw new Error('expected White to survive the diff')
    expect(white.$value).toMatchObject({ hex: '#E6E6E6' })
  })

  it('keeps a number token whose value differs from Base', () => {
    const space = group(diffed, '🌐 Global', '📏 Space')['Base']
    if (!isTokenNode(space)) throw new Error('expected Space/Base to survive the diff')
    expect(space.$value).toBe(20)
  })

  it('drops a color token whose value is identical to Base', () => {
    expect(group(diffed, '🌐 Global', '🌈 Color')['Black']).toBeUndefined()
  })

  it('drops an alias token that resolves to the same reference in both modes, pruning the empty group', () => {
    expect(diffed['🔗 Alias']).toBeUndefined()
  })

  it('matches by variableId so a rename in the brand tree is still recognized', () => {
    const renamedTcsTree: TokenTree = JSON.parse(JSON.stringify(tcsTree))
    const black = group(renamedTcsTree, '🌐 Global', '🌈 Color')['Black']
    delete (group(renamedTcsTree, '🌐 Global', '🌈 Color') as Record<string, unknown>)['Black']
    ;(group(renamedTcsTree, '🌐 Global', '🌈 Color') as TokenTree)['Renamed'] = black

    const diffedAfterRename = diffBrandTree(baseTree, renamedTcsTree)
    expect(group(diffedAfterRename, '🌐 Global', '🌈 Color')['Renamed']).toBeUndefined()
  })
})
