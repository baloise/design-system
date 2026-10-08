import type { HydrateDocumentOptions } from '@stencil/core/internal/hydrate/runner'

import { autoDsdTags } from './hydrate-defaults.generated'

/**
 * How to decide DSD vs. `scoped` for a component outside overlays/, navigation/, and forms/
 * (those three are DSD wholesale, see `dsdTags` below and docs/adr/0034-ssr-mixed-serialize-shadow-root.md).
 * Two independent reasons justify DSD; either is enough on its own:
 *
 * 1. It needs real shadow DOM semantics before hydration runs - teleporting, positioning against
 *    an anchor, or stacking above page content (a popover, a portal, `position: fixed`-style
 *    overlays). `scoped` content isn't in a real shadow root yet, so that behavior wouldn't work
 *    (or would visibly differ from the post-hydration result) until the client JS upgrades it.
 * 2. It typically appears few times per page - a singleton, or close to one. DSD's cost is
 *    "one `<style>` copy per instance"; at low instance counts that cost rounds down to
 *    negligible, so there's no reason to trade exact client-match rendering away for it.
 *
 * Neither applies to a component like `ds-button` or `ds-card`: no teleport/positioning behavior,
 * and typically many instances per page, so `scoped`'s "one shared stylesheet" saving actually
 * matters there - that's the entire reason this mixed default exists instead of defaulting
 * everything to DSD (ADR-0031's original, simpler, more expensive choice).
 *
 * Applying that to the four tags below:
 * - `ds-carousel`/`ds-carousel-item` - reason 1: scroll-snap behavior over slotted items. Also
 *   reason 2 in practice: rarely more than one carousel per page.
 * - `ds-app-footer` - reason 2: a page has at most one footer.
 * - `ds-hint`/`ds-hint-text`/`ds-hint-title` - reason 2: one per form field it annotates, so
 *   typically a handful per page, not dozens.
 * - `ds-spinner` - reason 2: usually conditional/transient (loading states), rarely several
 *   simultaneously.
 *
 * No shared folder boundary groups these four the way overlays/navigation/forms do, so this list
 * is hand-maintained rather than globbed by `generate-hydrate-defaults-tags.mjs`. When adding a
 * new component here, write down which reason (1, 2, or both) applies - that's the test for
 * "does this belong in the hand-curated list" going forward.
 */
const handCuratedDsdTags: string[] = [
  // structure/carousel/*
  'ds-carousel',
  'ds-carousel-item',

  // structure/app-footer
  'ds-app-footer',

  // indicators/hint
  'ds-hint',
  'ds-hint-text',
  'ds-hint-title',

  // indicators/spinner
  'ds-spinner',
]

/**
 * Tags that render as a real declarative shadow root during SSR instead of `scoped`: every
 * interactive/input component (`overlays/`, `navigation/`, `forms/` - categorical, regardless of
 * per-page usage count, see docs/adr/0034-ssr-mixed-serialize-shadow-root.md), plus
 * `handCuratedDsdTags` above (teleport/positioning behavior, or typically low usage count).
 * Everything else renders `scoped`: one shared stylesheet per tag instead of a duplicated
 * `<style>` per instance - the right tradeoff for simple, high-instance-count components like
 * `ds-button`/`ds-card`. Every tag still upgrades to a real shadow root on client-side hydration
 * regardless of SSR mode.
 */
export const dsdTags: string[] = [...autoDsdTags, ...handCuratedDsdTags]

/**
 * Drop-in value for `renderToString(fragment, { serializeShadowRoot: recommendedSerializeShadowRoot })`
 * from `@helvetia-design/core/hydrate`.
 */
export const recommendedSerializeShadowRoot: NonNullable<HydrateDocumentOptions['serializeShadowRoot']> = {
  'declarative-shadow-dom': dsdTags,
  'default': 'scoped',
}
