/**
 * Token loading, flattening, and per-brand resolution — the read side of
 * Pull (from Code). Mirrors packages/tokens/src/config.brand.ts's
 * computeTokenDiff shape (see docs/plans/figma-sync-action-plan.md §7,
 * Phase 1) without importing it: config.brand.ts is TypeScript compiled by
 * Style Dictionary's own toolchain, and this script runs as plain Node ESM
 * in CI (docs/adr/0020-figma-sync-action-standalone-script.md).
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const REFERENCE_PATTERN = /^\{(.+)\}$/

/** @param {string} path */
export function loadTokenFile(path) {
  return JSON.parse(readFileSync(path, 'utf-8'))
}

/**
 * Every `<Brand>.tokens.json` sibling of Base.tokens.json in a tokens
 * directory, brand name only (no extension) — mirrors
 * apps/toky/src/tokens/github.ts's listTokenBrandFiles, re-derived per
 * ADR-0020 rather than imported.
 */
export function listBrandNames(tokensDir) {
  return readdirSync(tokensDir)
    .filter(name => name.endsWith('.tokens.json') && name !== 'Base.tokens.json')
    .map(name => name.slice(0, -'.tokens.json'.length))
    .sort((a, b) => a.localeCompare(b))
}

export function brandFilePath(tokensDir, brandName) {
  return join(tokensDir, `${brandName}.tokens.json`)
}

function isTokenLeaf(node) {
  return typeof node === 'object' && node !== null && '$value' in node
}

/** @param {unknown} rawValue */
function parseValue(rawValue) {
  if (typeof rawValue === 'string') {
    const match = REFERENCE_PATTERN.exec(rawValue)
    if (match) {
      return { kind: 'reference', path: match[1].split('.') }
    }
  }
  return { kind: 'literal', value: rawValue }
}

/**
 * Walks a token tree (Base or a brand override file) and yields one Token
 * per `$value` leaf, in the domain shape from
 * docs/plans/figma-sync-action-plan.md §3 (path/type/value/variableId/figmaScopes).
 * Group nodes (no `$value`) are recursed into, not emitted.
 *
 * At each level, leaves are emitted before subgroups are recursed into —
 * variables are created in Figma in this same order, and Figma's panel
 * lists a group's direct values above its nested subgroups regardless of
 * JSON key order, so this keeps the two in sync.
 */
export function flattenTokens(tree, path = []) {
  /** @type {import('./tokens.d.ts').Token[]} */
  const tokens = []
  const groupEntries = []

  for (const [key, node] of Object.entries(tree)) {
    if (typeof node !== 'object' || node === null) continue
    const nextPath = [...path, key]

    if (isTokenLeaf(node)) {
      // $extensions uses flat dotted keys ("com.figma.variableId"), not a
      // nested "com.figma" object — see packages/tokens/tokens/Base.tokens.json.
      const extensions = node.$extensions ?? {}
      tokens.push({
        path: nextPath,
        type: node.$type,
        value: parseValue(node.$value),
        variableId: extensions['com.figma.variableId'] ?? undefined,
        figmaScopes: extensions['com.figma.scopes'] ?? undefined,
        // A dimension token's breakpoint values (docs/plans/responsive-dimension-token-plan.md) —
        // undefined for every other type and for a plain (non-responsive) dimension token.
        responsive: extensions['com.helvetia.responsive'] ?? undefined,
      })
    } else {
      groupEntries.push([node, nextPath])
    }
  }

  for (const [node, nextPath] of groupEntries) {
    tokens.push(...flattenTokens(node, nextPath))
  }

  return tokens
}

/**
 * Resolves the full per-brand tree for a single brand: every token gets an
 * explicit value (the brand's override where one exists, Base's value
 * copied through otherwise) — Figma requires an explicit per-mode value
 * (docs/adr/0012-brand-modes-not-collections.md), so a resolved tree, not a
 * sparse one, is what Pull needs to push into a brand's mode. `variableId`
 * always comes from Base: a brand override is a different mode-value on
 * the *same* Figma variable, never a variable of its own
 * (see the "Figma id metadata" note carried over from toky.md's
 * multi-brand section, and docs/adr/0012).
 */
// A brand override's own $extensions.com.helvetia.responsive (if present) replaces Base's
// wholesale, never merges field-by-field (docs/plans/responsive-dimension-token-plan.md decision
// 7 — whole-token override only, same model typography's brand override already uses). If the
// override doesn't carry one at all, the merged leaf gets none either — overriding $value to a
// new literal is a complete replacement, not a partial edit that should still inherit Base's
// breakpoints. Every other extension key (today, only com.figma.variableId, which a brand override
// never carries of its own — see this file's own header comment) passes through from Base
// untouched either way.
function mergeLeafExtensions(baseExtensions, overrideExtensions) {
  const merged = { ...baseExtensions }
  if (overrideExtensions && 'com.helvetia.responsive' in overrideExtensions) {
    merged['com.helvetia.responsive'] = overrideExtensions['com.helvetia.responsive']
  } else {
    delete merged['com.helvetia.responsive']
  }
  return merged
}

export function mergeBrandTree(base, brandOverride) {
  const result = {}

  for (const [key, baseNode] of Object.entries(base)) {
    if (typeof baseNode !== 'object' || baseNode === null) continue
    const overrideNode = brandOverride?.[key]

    if (isTokenLeaf(baseNode)) {
      const overridesLeaf = overrideNode && typeof overrideNode === 'object' && '$value' in overrideNode
      result[key] = overridesLeaf
        ? {
            ...baseNode,
            $value: overrideNode.$value,
            $extensions: mergeLeafExtensions(baseNode.$extensions, overrideNode.$extensions),
          }
        : baseNode
    } else {
      result[key] = mergeBrandTree(baseNode, typeof overrideNode === 'object' ? overrideNode : undefined)
    }
  }

  return result
}

/**
 * Recursively walks both token trees and returns only the tokens whose
 * `$value` differs from base. Identical in shape to
 * packages/tokens/src/config.brand.ts's computeTokenDiff — kept here as a
 * parity check (see test/tokens.test.ts), not used by Pull itself, which
 * only ever needs the merged tree, never the sparse diff back out of it.
 */
export function computeTokenDiff(base, brand) {
  const result = {}

  for (const [key, brandVal] of Object.entries(brand)) {
    if (typeof brandVal !== 'object' || brandVal === null) continue
    const baseVal = base?.[key] ?? {}

    if ('$value' in brandVal) {
      const brandSerialized = JSON.stringify(brandVal.$value)
      const baseSerialized = JSON.stringify(baseVal.$value)
      if (brandSerialized !== baseSerialized) {
        result[key] = brandVal
      }
    } else {
      const nested = computeTokenDiff(baseVal, brandVal)
      if (Object.keys(nested).length > 0) {
        result[key] = nested
      }
    }
  }

  return result
}
