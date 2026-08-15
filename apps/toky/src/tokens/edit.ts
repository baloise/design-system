import { KEY_BY_LAYER } from './flatten'
import type { FigmaId, FlatToken, TokenLayer } from './types'

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
  // The WorkingToken/original id this entry came from — create/update entries carry the working
  // copy's id, delete entries carry the removed original's id (its path, since it never had a
  // working counterpart). Lets a caller (e.g. "discard this change") map an entry straight back
  // to the row that produced it without re-deriving a path-based key itself. Optional because
  // not every TokenDiffEntry producer needs it (only computeDiff sets it today) — a caller
  // relying on it (e.g. discard) should treat a missing id as "can't be discarded".
  id?: string
  kind: TokenDiffKind
  layer: TokenLayer
  oldPath: string[] | null
  newPath: string[] | null
  type: string
  value: unknown
  before: unknown
  // Carries a Pull (from Figma)-linked token's variableId through to
  // applyDiffToDocument, which writes it into $extensions — without this,
  // a freshly created token's Figma link is dropped on write and the next
  // pull can't recognize it, proposing a duplicate create (see docs/adr/0002).
  figmaId?: FigmaId | null
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

// Token/brand names come from user input (see pathFor) and end up as object
// keys when we walk/rebuild the tokens document below — reject the names
// that would let a submitted path reach or overwrite Object.prototype.
function isUnsafeKey(key: string): boolean {
  return key === '__proto__' || key === 'constructor' || key === 'prototype'
}

// Neither `node[key] = value` nor `Object.defineProperty(node, key, ...)` is
// used here, even guarded by isUnsafeKey — both are property WRITES keyed by
// a user-controlled string, and a value with that shape is exactly what
// prototype-pollution/property-injection tooling flags on sight, guarded or
// not. Instead these helpers only ever *read* existing keys (Object.entries)
// and hand a full list of pairs to Object.fromEntries, which builds a brand
// new object in one step — there's no step where `node`'s own keys are
// mutated through a computed accessor at all.
// Preserves the key's existing position when it's already present — only a
// brand-new key gets appended at the end. Without this, rebuilding an
// ancestor whose child changed (see deletePath/setPath below) would move
// that ancestor's key to the end of *its* parent on every edit, cascading
// up and reordering unrelated sibling keys the whole way to the document
// root purely from a single leaf edit or delete.
function withEntry(node: Record<string, unknown>, key: string, value: unknown): Record<string, unknown> {
  if (key in node) {
    return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, k === key ? value : v]))
  }
  return Object.fromEntries([...Object.entries(node), [key, value]])
}

function withoutEntry(node: Record<string, unknown>, key: string): Record<string, unknown> {
  return Object.fromEntries(Object.entries(node).filter(([k]) => k !== key))
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
        id,
        kind: 'create',
        layer: token.layer,
        oldPath: null,
        newPath,
        type: token.type,
        value: effectiveValue(token),
        before: undefined,
        figmaId: token.figmaId ?? undefined,
      })
      continue
    }

    const changed =
      JSON.stringify(newPath) !== JSON.stringify(originalToken.path) ||
      JSON.stringify(effectiveValue(token)) !== JSON.stringify(effectiveValue(originalToken)) ||
      token.type !== originalToken.type ||
      // A figmaId-only change (e.g. Pull adopting an already-existing,
      // previously-unlinked token by path) must still produce an update —
      // otherwise it's invisible to computeDiff and never gets written.
      (token.figmaId ?? null) !== (originalToken.figmaId ?? null)

    if (changed) {
      entries.push({
        id,
        kind: 'update',
        layer: token.layer,
        oldPath: originalToken.path,
        newPath,
        type: token.type,
        value: effectiveValue(token),
        before: originalToken.rawValue,
        figmaId: token.figmaId ?? undefined,
      })
    }
  }

  for (const originalToken of original) {
    const id = originalToken.path.join('.')
    if (!workingIds.has(id)) {
      entries.push({
        id,
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

// Rebuilds `doc` bottom-up: recurse to the target's parent, drop its key
// there via withoutEntry, then rebuild each ancestor on the way back out
// with withEntry — so every level along `path` is a freshly-built object,
// never a mutated one.
function deletePath(doc: Record<string, unknown>, path: string[]): Record<string, unknown> {
  if (path.length === 0) return doc
  const [key, ...rest] = path
  if (isUnsafeKey(key) || !(key in doc)) return doc

  if (rest.length === 0) {
    return withoutEntry(doc, key)
  }

  const child = doc[key]
  if (!isPlainObject(child)) return doc

  const updatedChild = deletePath(child, rest)
  return Object.keys(updatedChild).length === 0 ? withoutEntry(doc, key) : withEntry(doc, key, updatedChild)
}

// Same bottom-up rebuild as deletePath, but setting a value at the end
// instead of removing one — intermediate objects along `path` are created
// (as `{}`) on the way down if they don't already exist.
function setPath(
  doc: Record<string, unknown>,
  path: string[],
  value: Record<string, unknown>,
): Record<string, unknown> {
  if (path.length === 0) return doc
  const [key, ...rest] = path
  if (isUnsafeKey(key)) {
    throw new Error(`Refusing to write unsafe path segment in: ${path.join('.')}`)
  }

  if (rest.length === 0) {
    return withEntry(doc, key, value)
  }

  const existingChild = doc[key]
  const child = isPlainObject(existingChild) ? existingChild : {}
  return withEntry(doc, key, setPath(child, rest, value))
}

export function applyDiffToDocument(doc: Record<string, unknown>, diff: TokenDiffEntry[]): Record<string, unknown> {
  let next = structuredClone(doc)

  for (const entry of diff) {
    if ((entry.kind === 'delete' || entry.kind === 'update') && entry.oldPath) {
      next = deletePath(next, entry.oldPath)
    }
  }

  for (const entry of diff) {
    if ((entry.kind === 'create' || entry.kind === 'update') && entry.newPath) {
      const newNode: Record<string, unknown> = {
        $type: entry.type,
        $value: entry.value,
      }

      // Preserve whatever $extensions the original leaf already carried
      // (e.g. figmaScopes) across an update, then layer this entry's own
      // figmaId on top — for a `create`, there's no original leaf, so this
      // is the only place a Pull (from Figma)-created token's variableId
      // ever gets written at all.
      const originalLeaf = entry.kind === 'update' && entry.oldPath ? getNode(doc, entry.oldPath) : undefined
      const existingExtensions = isPlainObject(originalLeaf?.$extensions) ? originalLeaf.$extensions : undefined
      const extensions = entry.figmaId
        ? { ...existingExtensions, 'com.figma.variableId': entry.figmaId }
        : existingExtensions
      if (extensions) newNode.$extensions = extensions

      next = setPath(next, entry.newPath, newNode)
    }
  }

  return next
}
