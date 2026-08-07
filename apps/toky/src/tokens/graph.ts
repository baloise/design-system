import type { FlatToken, TokenLayer } from './types'

export interface GraphNode {
  id: string
  name: string
  layer: TokenLayer
  depth: number
}

export interface GraphEdge {
  id: string
  source: string
  target: string
}

export interface ConsumerTree {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

/**
 * Direct reference counts for every token: how many other tokens point at
 * it via `referenceTarget`, keyed by path. Used for a "used N times" badge —
 * unlike `buildConsumerTree`, this doesn't walk transitively.
 */
export function countDirectReferences(tokens: FlatToken[]): Map<string, number> {
  const counts = new Map<string, number>()
  for (const token of tokens) {
    if (!token.referenceTarget) continue
    counts.set(token.referenceTarget, (counts.get(token.referenceTarget) ?? 0) + 1)
  }
  return counts
}

/**
 * Everything connected to `rootPath` through references, in both directions:
 * downward, everything that (transitively) references it — depth 0 is the
 * token itself, depth 1 is everything that points directly at it, depth 2 is
 * everything that points at those, etc.; and upward, the chain of tokens it
 * (transitively) references — depth -1, -2, etc. — up to the first token
 * holding a real (non-reference) value. Edges always point from a consumer
 * toward what it consumes, matching how the graph is meant to read
 * bottom-to-top.
 */
export function buildConsumerTree(tokens: FlatToken[], rootPath: string): ConsumerTree {
  const root = tokens.find(t => t.path.join('.') === rootPath)
  if (!root) return { nodes: [], edges: [] }

  const byPath = new Map(tokens.map(t => [t.path.join('.'), t]))
  const consumersByTarget = new Map<string, FlatToken[]>()
  for (const token of tokens) {
    if (!token.referenceTarget) continue
    const list = consumersByTarget.get(token.referenceTarget) ?? []
    list.push(token)
    consumersByTarget.set(token.referenceTarget, list)
  }

  const nodes: GraphNode[] = [{ id: rootPath, name: root.name, layer: root.layer, depth: 0 }]
  const edges: GraphEdge[] = []
  const visited = new Set<string>([rootPath])

  let frontier = [rootPath]
  let depth = 0

  while (frontier.length > 0) {
    depth += 1
    const next: string[] = []

    for (const currentPath of frontier) {
      for (const consumer of consumersByTarget.get(currentPath) ?? []) {
        const consumerPath = consumer.path.join('.')
        // Cycle guard — shouldn't be reachable given the one-referenceTarget-per-token
        // invariant, but defensive the same way resolveReferences (flatten.ts) is.
        if (visited.has(consumerPath)) continue
        visited.add(consumerPath)
        nodes.push({ id: consumerPath, name: consumer.name, layer: consumer.layer, depth })
        edges.push({ id: `${consumerPath}->${currentPath}`, source: consumerPath, target: currentPath })
        next.push(consumerPath)
      }
    }

    frontier = next
  }

  // Upward: walk the chain rootPath itself references, until a token with a
  // real value (no referenceTarget) or the chain runs out.
  let currentPath = rootPath
  let current = root
  let ancestorDepth = 0

  while (current.referenceTarget) {
    const targetPath = current.referenceTarget
    const target = byPath.get(targetPath)
    if (!target || visited.has(targetPath)) break
    ancestorDepth -= 1
    visited.add(targetPath)
    nodes.push({ id: targetPath, name: target.name, layer: target.layer, depth: ancestorDepth })
    edges.push({ id: `${currentPath}->${targetPath}`, source: currentPath, target: targetPath })
    currentPath = targetPath
    current = target
  }

  return { nodes, edges }
}

/**
 * The union of `buildConsumerTree` for every path in `rootPaths` — every node
 * and edge reachable from any of them, deduplicated. Used for a group's graph
 * (e.g. every token under "Footer/Color/Link"), where several tokens act as
 * roots at once rather than just one.
 */
export function buildConsumerTreeForRoots(tokens: FlatToken[], rootPaths: string[]): ConsumerTree {
  const nodesById = new Map<string, GraphNode>()
  const edgesById = new Map<string, GraphEdge>()

  for (const rootPath of rootPaths) {
    const tree = buildConsumerTree(tokens, rootPath)
    for (const node of tree.nodes) {
      if (!nodesById.has(node.id)) nodesById.set(node.id, node)
    }
    for (const edge of tree.edges) {
      if (!edgesById.has(edge.id)) edgesById.set(edge.id, edge)
    }
  }

  return { nodes: [...nodesById.values()], edges: [...edgesById.values()] }
}
