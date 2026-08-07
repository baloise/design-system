import { KEY_BY_LAYER } from './flatten'
import type { FlatToken, TokenLayer } from './types'

/**
 * Working-copy wrapper used while editing. `id` is the token's *original*
 * path (stable across renames) for existing tokens, or a synthetic id for
 * newly-created ones — this is what lets computeDiff tell a rename apart
 * from a delete+create.
 */
export interface WorkingToken {
  id: string
  token: FlatToken
}

export type TokenDiffKind = 'create' | 'update' | 'delete'

export interface TokenDiffEntry {
  kind: TokenDiffKind
  layer: TokenLayer
  oldPath: string[] | null
  newPath: string[] | null
  type: string
  value: unknown
  before: unknown
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

// Token/brand names come from user input (see pathFor) and end up as object
// keys when we walk/mutate the tokens document below — reject the names that
// would let a submitted path reach or overwrite Object.prototype.
const UNSAFE_KEYS = new Set(['__proto__', 'constructor', 'prototype'])

function isUnsafeKey(key: string): boolean {
  return UNSAFE_KEYS.has(key)
}

export function effectiveValue(token: FlatToken): unknown {
  return token.referenceTarget ? `{${token.referenceTarget}}` : token.rawValue
}

export function pathFor(layer: TokenLayer, name: string): string[] {
  return [KEY_BY_LAYER[layer], ...name.split('.').filter(Boolean)]
}

export type ChangeStatus = 'created' | 'renamed' | 'value'

// Per-row status for the editor's UI (badges) — a finer-grained cousin of the
// 'update' TokenDiffEntry kind, which doesn't distinguish a rename from a value edit.
export function describeChangeStatus(originalToken: FlatToken | undefined, token: FlatToken): ChangeStatus | null {
  if (!originalToken) return 'created'

  const newPath = pathFor(token.layer, token.name)
  if (JSON.stringify(newPath) !== JSON.stringify(originalToken.path)) return 'renamed'

  if (
    JSON.stringify(effectiveValue(token)) !== JSON.stringify(effectiveValue(originalToken)) ||
    token.type !== originalToken.type
  ) {
    return 'value'
  }

  return null
}

export function computeDiff(original: FlatToken[], working: WorkingToken[]): TokenDiffEntry[] {
  const originalById = new Map(original.map(t => [t.path.join('.'), t]))
  const workingIds = new Set(working.map(w => w.id))
  const entries: TokenDiffEntry[] = []

  for (const { id, token } of working) {
    const originalToken = originalById.get(id)
    const newPath = pathFor(token.layer, token.name)

    if (!originalToken) {
      entries.push({
        kind: 'create',
        layer: token.layer,
        oldPath: null,
        newPath,
        type: token.type,
        value: effectiveValue(token),
        before: undefined,
      })
      continue
    }

    const changed =
      JSON.stringify(newPath) !== JSON.stringify(originalToken.path) ||
      JSON.stringify(effectiveValue(token)) !== JSON.stringify(effectiveValue(originalToken)) ||
      token.type !== originalToken.type

    if (changed) {
      entries.push({
        kind: 'update',
        layer: token.layer,
        oldPath: originalToken.path,
        newPath,
        type: token.type,
        value: effectiveValue(token),
        before: originalToken.rawValue,
      })
    }
  }

  for (const originalToken of original) {
    const id = originalToken.path.join('.')
    if (!workingIds.has(id)) {
      entries.push({
        kind: 'delete',
        layer: originalToken.layer,
        oldPath: originalToken.path,
        newPath: null,
        type: originalToken.type,
        value: undefined,
        before: originalToken.rawValue,
      })
    }
  }

  return entries
}

function getNode(doc: Record<string, unknown>, path: string[]): Record<string, unknown> | undefined {
  let node: unknown = doc
  for (const key of path) {
    if (!isPlainObject(node) || isUnsafeKey(key)) return undefined
    node = node[key]
  }
  return isPlainObject(node) ? node : undefined
}

function deletePath(doc: Record<string, unknown>, path: string[]): void {
  const parentPath = path.slice(0, -1)
  const key = path[path.length - 1]
  if (isUnsafeKey(key)) return
  const parent = getNode(doc, parentPath)
  if (!parent) return
  delete parent[key]
  pruneEmpty(doc, parentPath)
}

function pruneEmpty(doc: Record<string, unknown>, path: string[]): void {
  if (path.length === 0) return
  const node = getNode(doc, path)
  if (node && Object.keys(node).length === 0) {
    deletePath(doc, path)
  }
}

function setPath(doc: Record<string, unknown>, path: string[], value: Record<string, unknown>): void {
  if (path.some(isUnsafeKey)) {
    throw new Error(`Refusing to write unsafe path segment in: ${path.join('.')}`)
  }

  let node: Record<string, unknown> = doc
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i]
    if (!isPlainObject(node[key])) {
      node[key] = {}
    }
    node = node[key] as Record<string, unknown>
  }
  node[path[path.length - 1]] = value
}

export function applyDiffToDocument(doc: Record<string, unknown>, diff: TokenDiffEntry[]): Record<string, unknown> {
  const next = structuredClone(doc)

  for (const entry of diff) {
    if ((entry.kind === 'delete' || entry.kind === 'update') && entry.oldPath) {
      deletePath(next, entry.oldPath)
    }
  }

  for (const entry of diff) {
    if ((entry.kind === 'create' || entry.kind === 'update') && entry.newPath) {
      const newNode: Record<string, unknown> = {
        $type: entry.type,
        $value: entry.value,
      }

      if (entry.kind === 'update' && entry.oldPath) {
        const originalLeaf = getNode(doc, entry.oldPath)
        if (originalLeaf?.$extensions) {
          newNode.$extensions = originalLeaf.$extensions
        }
      }

      setPath(next, entry.newPath, newNode)
    }
  }

  return next
}
