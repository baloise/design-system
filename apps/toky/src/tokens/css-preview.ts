import {
  resolvedValueToCss,
  tokenNameToCssVar,
  typographyValueToCss,
  TYPOGRAPHY_CSS_SUFFIXES,
  responsiveDimensionValueToCss,
  RESPONSIVE_DIMENSION_CSS_SUFFIXES,
} from '@baloise/ds-tokens/css-preview'

import { pathFor, type TokenDiffEntry, type WorkingToken } from './edit'
import type { FlatToken } from './types'

export interface PreviewToken {
  name: string
  value: string | null
}

// A typography token maps to 4 CSS custom properties, not 1 (see typographyValueToCss's own
// comment) — pushes 0 entries (unresolvable value, e.g. a dangling reference) or 4, never a
// partial set, so the preview never applies fontFamily without a matching fontSize.
//
// The `keyof typeof css` casts below (rather than importing a `TypographyCssValue` type) are
// deliberate — this package ships no .d.ts (see tsconfig.json), so apps/toky's TS only sees
// `@baloise/ds-tokens/css-preview` through allowJs inference over the compiled JS, which can't
// recover a type-only export. Deriving the key type structurally from `css` itself sidesteps that.
function pushTypographyPreviewTokens(tokens: PreviewToken[], path: string[], resolvedValue: unknown): void {
  const css = typographyValueToCss(resolvedValue)
  if (css === null) return
  const suffixes = TYPOGRAPHY_CSS_SUFFIXES as Record<keyof typeof css, string>
  for (const [field, suffix] of Object.entries(suffixes) as [keyof typeof css, string][]) {
    tokens.push({ name: `--${tokenNameToCssVar(path)}-${suffix}`, value: css[field] })
  }
}

// Deleting a typography token has to clear all 4 of its custom properties, not just the base name
// (which was never itself a declared property — see pushTypographyPreviewTokens).
function pushTypographyDeleteTokens(tokens: PreviewToken[], path: string[]): void {
  for (const suffix of Object.values(TYPOGRAPHY_CSS_SUFFIXES)) {
    tokens.push({ name: `--${tokenNameToCssVar(path)}-${suffix}`, value: null })
  }
}

// Same idea as pushTypographyPreviewTokens, but for a responsive dimension token's 3 breakpoint
// values (docs/plans/responsive-dimension-token-plan.md) — no `-device` entry, unlike the real
// build's media-query output: the live preview posts plain inline custom-property overrides, which
// can't express "switches at a breakpoint" the way a real `@media` block can, so mobile/tablet/
// desktop are the only 3 the preview can meaningfully show at once.
function pushResponsiveDimensionPreviewTokens(
  tokens: PreviewToken[],
  path: string[],
  resolvedResponsive: unknown,
): void {
  const css = responsiveDimensionValueToCss(resolvedResponsive)
  if (css === null) return
  const suffixes = RESPONSIVE_DIMENSION_CSS_SUFFIXES as Record<keyof typeof css, string>
  for (const [field, suffix] of Object.entries(suffixes) as [keyof typeof css, string][]) {
    tokens.push({ name: `--${tokenNameToCssVar(path)}-${suffix}`, value: css[field] })
  }
}

// Deleting a responsive dimension token has to clear its 3 breakpoint-suffixed custom properties,
// not just the base name — mirrors pushTypographyDeleteTokens.
function pushResponsiveDimensionDeleteTokens(tokens: PreviewToken[], path: string[]): void {
  for (const suffix of Object.values(RESPONSIVE_DIMENSION_CSS_SUFFIXES)) {
    tokens.push({ name: `--${tokenNameToCssVar(path)}-${suffix}`, value: null })
  }
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
        if (entry.type === 'typography') {
          pushTypographyDeleteTokens(tokens, entry.oldPath)
        } else if (entry.responsive) {
          pushResponsiveDimensionDeleteTokens(tokens, entry.oldPath)
        } else {
          tokens.push({ name: `--${tokenNameToCssVar(entry.oldPath)}`, value: null })
        }
      }
      continue
    }

    if (!entry.newPath) continue

    const workingToken = workingByPath.get(entry.newPath.join('.'))
    if (!workingToken) continue

    if (entry.type === 'typography') {
      pushTypographyPreviewTokens(tokens, entry.newPath, workingToken.resolvedValue)
      continue
    }

    if (entry.type === 'dimension' && workingToken.responsive) {
      pushResponsiveDimensionPreviewTokens(tokens, entry.newPath, workingToken.resolvedResponsive)
      continue
    }

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
        if (entry.type === 'typography') {
          pushTypographyDeleteTokens(tokens, entry.oldPath)
        } else if (entry.responsive) {
          pushResponsiveDimensionDeleteTokens(tokens, entry.oldPath)
        } else {
          tokens.push({ name: `--${tokenNameToCssVar(entry.oldPath)}`, value: null })
        }
      }
      continue
    }

    if (!entry.newPath || !entry.id) continue

    const resolved = resolvedById.get(entry.id)
    if (!resolved) continue

    if (entry.type === 'typography') {
      pushTypographyPreviewTokens(tokens, entry.newPath, resolved.resolvedValue)
      continue
    }

    if (entry.type === 'dimension' && resolved.responsive) {
      pushResponsiveDimensionPreviewTokens(tokens, entry.newPath, resolved.resolvedResponsive)
      continue
    }

    const cssValue = resolvedValueToCss(resolved.resolvedValue, entry.type, entry.newPath)
    if (cssValue === null) continue

    tokens.push({ name: `--${tokenNameToCssVar(entry.newPath)}`, value: cssValue })
  }

  return tokens
}
