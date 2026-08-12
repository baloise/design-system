import { resolvedValueToCss, tokenNameToCssVar } from '@baloise/ds-tokens/css-preview'

import { pathFor, type TokenDiffEntry, type WorkingToken } from './edit'
import type { FlatToken } from './types'

export interface PreviewToken {
  name: string
  value: string | null
}

/**
 * Turns the working-vs-baseline diff into the `{ name, value }` pairs the Live Preview sidebar
 * posts to `packages/core`'s token-preview listener. Reuses `@baloise/ds-tokens/css-preview` (see
 * ADR-0021) so the preview never computes a CSS var name or value differently than the real
 * build. Deletions map to `value: null` so the listener calls `removeProperty` instead of leaving
 * a stale override in place. Entries whose value can't be resolved to a CSS string (e.g. a
 * dangling reference) are skipped rather than sent as garbage.
 */
export function computePreviewTokens(diff: TokenDiffEntry[], working: WorkingToken[]): PreviewToken[] {
  const workingByPath = new Map(working.map(w => [pathFor(w.token.layer, w.token.name).join('.'), w.token]))

  const tokens: PreviewToken[] = []

  for (const entry of diff) {
    if (entry.kind === 'delete') {
      if (entry.oldPath) {
        tokens.push({ name: `--${tokenNameToCssVar(entry.oldPath)}`, value: null })
      }
      continue
    }

    if (!entry.newPath) continue

    const workingToken = workingByPath.get(entry.newPath.join('.'))
    if (!workingToken) continue

    const cssValue = resolvedValueToCss(workingToken.resolvedValue, entry.type, entry.newPath)
    if (cssValue === null) continue

    tokens.push({ name: `--${tokenNameToCssVar(entry.newPath)}`, value: cssValue })
  }

  return tokens
}

/**
 * Same idea as `computePreviewTokens`, but for the currently selected brand's own diff (against
 * that brand's sparse override baseline) rather than Base's. The `[data-theme]` stylesheet the
 * core listener injects only reflects whatever's already *built* into `dist/css/<brand>.tokens.css`
 * - an in-progress brand edit isn't in there yet, so without this the preview would keep showing
 * Base's value (or a stale build) for anything the user just changed under that brand. Sent as
 * plain `--ds-*` overrides the same way Base's diff is - inline style wins over the `[data-theme]`
 * selector's specificity regardless, so no brand-scoping is needed on the value itself.
 */
export function computeBrandPreviewTokens(
  brandDiff: TokenDiffEntry[],
  resolvedById: Map<string, FlatToken>,
): PreviewToken[] {
  const tokens: PreviewToken[] = []

  for (const entry of brandDiff) {
    if (entry.kind === 'delete') {
      if (entry.oldPath) {
        tokens.push({ name: `--${tokenNameToCssVar(entry.oldPath)}`, value: null })
      }
      continue
    }

    if (!entry.newPath || !entry.id) continue

    const resolved = resolvedById.get(entry.id)
    if (!resolved) continue

    const cssValue = resolvedValueToCss(resolved.resolvedValue, entry.type, entry.newPath)
    if (cssValue === null) continue

    tokens.push({ name: `--${tokenNameToCssVar(entry.newPath)}`, value: cssValue })
  }

  return tokens
}
