import { RESPONSIVE_DIMENSION_EXTENSION_KEY } from './types'
import type { FigmaId, FlatToken, ResponsiveDimensionValue, TokenLayer } from './types'

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

// A responsive dimension token's breakpoint values live in $extensions, not
// $value (decision 2) — only well-formed once all 3 keys are present, no
// partial responsive tokens (decision 6). A token whose whole $value is a
// reference can't also be responsive (see FlatToken.responsive), so this
// isn't checked against referenceMatch here — the mutual exclusivity is
// enforced by the editor, not by this reader.
function extractResponsive(node: Record<string, unknown>): ResponsiveDimensionValue | null {
  const extensions = node.$extensions
  if (!isPlainObject(extensions)) return null
  const responsive = extensions[RESPONSIVE_DIMENSION_EXTENSION_KEY]
  if (!isPlainObject(responsive)) return null
  if (!('mobile' in responsive) || !('tablet' in responsive) || !('desktop' in responsive)) return null
  return { mobile: responsive.mobile, tablet: responsive.tablet, desktop: responsive.desktop }
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
      responsive: node.$type === 'dimension' ? extractResponsive(node) : null,
      resolvedResponsive: null,
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

/**
 * Follows a single `{reference}` string (already stripped of braces) through possibly-several
 * hops of `referenceTarget`-only tokens to the literal `rawValue` it ultimately points at.
 * Shared by both the top-level whole-`$value` case and `resolveNestedReferences` below — a border
 * composite token's `color`/`width`/`style` sub-values are each a reference string one level
 * *inside* `$value`, not the whole-`$value` reference every other type used until now (see
 * docs/plans/border-token-type-plan.md decision 4), so they need the exact same chain-following,
 * just starting one level deeper.
 */
function resolveChain(
  startPath: string,
  byPath: Map<string, FlatToken>,
): { value: unknown } | { error: 'circular-reference' | 'missing-reference' } {
  const visited = new Set<string>()
  let currentPath = startPath

  for (;;) {
    if (visited.has(currentPath)) return { error: 'circular-reference' }
    visited.add(currentPath)

    const current = byPath.get(currentPath)
    if (!current) return { error: 'missing-reference' }
    if (!current.referenceTarget) return { value: current.rawValue }

    currentPath = current.referenceTarget
  }
}

/**
 * Resolves any `{reference}` string one level inside a composite `$value` object (e.g. a border
 * token's `color`/`width`/`style`) to its literal value. A no-op for every other type today —
 * shadow's sub-values are always inline literals, never references — but written generically
 * rather than border-specific, since nothing else about this function needs to know which
 * composite type it's looking at. An unresolvable nested reference resolves to `undefined` rather
 * than failing the whole token — same "best effort, don't block the rest of the value" spirit as
 * a top-level `missing-reference` surfacing on `resolutionError` instead of throwing.
 */
function resolveNestedReferences(value: unknown, byPath: Map<string, FlatToken>): unknown {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return value

  const result: Record<string, unknown> = {}
  for (const [key, sub] of Object.entries(value)) {
    if (typeof sub === 'string') {
      const match = REFERENCE_PATTERN.exec(sub)
      if (match) {
        const resolved = resolveChain(match[1], byPath)
        result[key] = 'value' in resolved ? resolved.value : undefined
        continue
      }
    }
    result[key] = sub
  }
  return result
}

export function resolveReferences(tokens: FlatToken[]): FlatToken[] {
  const byPath = new Map<string, FlatToken>()
  for (const token of tokens) {
    byPath.set(token.path.join('.'), token)
  }

  const resolveResponsive = (responsive: ResponsiveDimensionValue | null): ResponsiveDimensionValue | null =>
    responsive ? (resolveNestedReferences(responsive, byPath) as ResponsiveDimensionValue) : null

  return tokens.map(token => {
    if (!token.referenceTarget) {
      return {
        ...token,
        resolvedValue: resolveNestedReferences(token.rawValue, byPath),
        resolvedResponsive: resolveResponsive(token.responsive),
      }
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

    return {
      ...token,
      resolvedValue: resolveNestedReferences(current.rawValue, byPath),
      // A responsive dimension token's own $value mirrors its `mobile` breakpoint (decision 4 of
      // docs/plans/responsive-dimension-token-plan.md), so whenever `mobile` is itself a reference,
      // this token's OWN referenceTarget is non-null too — the whole-token chain-walk above exists
      // for true aliases (a plain token pointing at another token), not for this case. Breakpoints
      // must resolve off the token's own `responsive` field when it has one; only a true alias
      // (token.responsive === null) falls back to whatever the chain-walk landed on.
      resolvedResponsive: token.responsive ? resolveResponsive(token.responsive) : resolveResponsive(current.responsive),
    }
  })
}

export function parseTokenDocument(doc: Record<string, unknown>): FlatToken[] {
  return resolveReferences(flattenTokenDocument(doc))
}
