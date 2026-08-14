import type { FigmaId, FlatToken, TokenLayer } from './types'

const LAYER_KEYS: Record<string, TokenLayer> = {
  '🌐 Global': 'Global',
  '🔗 Alias': 'Alias',
  '🧩 Component': 'Component',
}

export const KEY_BY_LAYER: Record<TokenLayer, string> = {
  Global: '🌐 Global',
  Alias: '🔗 Alias',
  Component: '🧩 Component',
}

const REFERENCE_PATTERN = /^\{(.+)\}$/

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isLeaf(node: Record<string, unknown>): boolean {
  return '$value' in node
}

function extractFigmaId(node: Record<string, unknown>): FigmaId | null {
  const extensions = node.$extensions
  if (!isPlainObject(extensions)) return null
  const figmaId = extensions['com.figma.variableId']
  if (typeof figmaId === 'string') return figmaId
  // A shadow token's variableId is an object of 5 sub-ids (see
  // docs/plans/shadow-token-type-plan.md) — pass it through as-is rather
  // than discarding it the way a truly malformed value would be.
  if (isPlainObject(figmaId) && Object.values(figmaId).every(v => typeof v === 'string')) {
    return figmaId as Record<string, string>
  }
  return null
}

function walk(node: Record<string, unknown>, path: string[], layer: TokenLayer, tokens: FlatToken[]): void {
  if (isLeaf(node)) {
    const rawValue = node.$value
    const referenceMatch = typeof rawValue === 'string' ? REFERENCE_PATTERN.exec(rawValue) : null

    tokens.push({
      path,
      name: path.slice(1).join('.'),
      layer,
      type: typeof node.$type === 'string' ? node.$type : '',
      rawValue,
      referenceTarget: referenceMatch ? referenceMatch[1] : null,
      resolvedValue: undefined,
      resolutionError: null,
      figmaId: extractFigmaId(node),
    })
    return
  }

  for (const [key, value] of Object.entries(node)) {
    if (key === '$extensions') continue
    if (!isPlainObject(value)) continue
    walk(value, [...path, key], layer, tokens)
  }
}

export function flattenTokenDocument(doc: Record<string, unknown>): FlatToken[] {
  const tokens: FlatToken[] = []

  for (const [key, layer] of Object.entries(LAYER_KEYS)) {
    const layerNode = doc[key]
    if (isPlainObject(layerNode)) {
      walk(layerNode, [key], layer, tokens)
    }
  }

  return tokens
}

export function resolveReferences(tokens: FlatToken[]): FlatToken[] {
  const byPath = new Map<string, FlatToken>()
  for (const token of tokens) {
    byPath.set(token.path.join('.'), token)
  }

  return tokens.map(token => {
    if (!token.referenceTarget) {
      return { ...token, resolvedValue: token.rawValue }
    }

    const visited = new Set<string>([token.path.join('.')])
    let current: FlatToken = token

    while (current.referenceTarget) {
      if (visited.has(current.referenceTarget)) {
        return { ...token, resolutionError: 'circular-reference' }
      }

      const next = byPath.get(current.referenceTarget)
      if (!next) {
        return { ...token, resolutionError: 'missing-reference' }
      }

      visited.add(current.referenceTarget)
      current = next
    }

    return { ...token, resolvedValue: current.rawValue }
  })
}

export function parseTokenDocument(doc: Record<string, unknown>): FlatToken[] {
  return resolveReferences(flattenTokenDocument(doc))
}
