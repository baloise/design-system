import { isTokenNode, type TokenNode, type TokenTree } from './transform.js'

interface FlatEntry {
  variableId: string
  path: string[]
  node: TokenNode
}

function flatten(tree: TokenTree, path: string[] = []): FlatEntry[] {
  const entries: FlatEntry[] = []
  for (const [key, value] of Object.entries(tree)) {
    const nextPath = [...path, key]
    if (isTokenNode(value)) {
      entries.push({ variableId: value.$extensions['com.figma.variableId'], path: nextPath, node: value })
    } else {
      entries.push(...flatten(value, nextPath))
    }
  }
  return entries
}

function setPath(tree: TokenTree, segments: string[], leaf: TokenNode): void {
  let node = tree
  for (let i = 0; i < segments.length - 1; i++) {
    const key = segments[i]
    if (node[key] === undefined) {
      node[key] = {}
    }
    node = node[key] as TokenTree
  }
  node[segments[segments.length - 1]] = leaf
}

/**
 * Reduces a brand's full mode tree down to only the tokens whose value
 * differs from Base, matching variables by variableId (ADR 0002) rather than
 * by name path, so a Figma rename is still recognized as the same token.
 */
export function diffBrandTree(baseTree: TokenTree, brandTree: TokenTree): TokenTree {
  const baseById = new Map(flatten(baseTree).map((entry) => [entry.variableId, entry]))

  const result: TokenTree = {}
  for (const entry of flatten(brandTree)) {
    const baseEntry = baseById.get(entry.variableId)
    const changed = !baseEntry || JSON.stringify(baseEntry.node.$value) !== JSON.stringify(entry.node.$value)
    if (changed) {
      setPath(result, entry.path, entry.node)
    }
  }
  return result
}
