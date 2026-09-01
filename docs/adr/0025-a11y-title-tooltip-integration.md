# 25. Surface `a11yTitle`/trigger accessible names via `ds-tooltip`, not the native `title` attribute

Package: `packages/core`

Date: 2026-08-31

## Status

Accepted

## Context

Icon-only interactive elements (`ds-button` with `a11yTitle`, `ds-close`'s
plain-glyph trigger, `ds-hint`'s popup trigger) currently rely on the native
`title` attribute and/or `aria-label` for their accessible name. Native
`title` tooltips are inconsistent across browsers (delayed, unstyled, absent
on touch), so sighted users often have no visible cue for what an icon-only
control does. `ds-tooltip` already exists
(`packages/core/src/components/tooltip/tooltip.tsx`) but resolves its
`reference` trigger via `document.querySelector('[id="..."]')` — a global,
light-DOM-only lookup that cannot find a trigger element living inside a
component's own shadow root. No component in the repo had ever composed
`ds-tooltip` internally; its only prior usage was against a plain native
`<button>` in a visual test fixture.

Considered alternatives:

- Leave `ds-tooltip` composition external, only fixing its reference lookup
  so consumers _could_ wire it up themselves — rejected because it puts the
  accessibility improvement opt-in per call site instead of by default.
- Pass the trigger element directly into `ds-tooltip` via a new prop/method,
  bypassing id-based lookup entirely — rejected in favor of the smaller,
  backward-compatible fix of scoping the existing `document.querySelector`
  lookup to `this.el.getRootNode()` (returns the shadow root when nested
  inside one, `document` otherwise, so existing external/light-DOM usage is
  unaffected).
- Consolidate `ds-close` and `ds-hint`'s own raw-`<button>` triggers to
  compose `ds-button` internally, so they'd inherit its tooltip handling for
  free instead of duplicating tooltip wiring — rejected in favor of
  preserving each component's existing native-element rendering strategy.

## Decision

`ds-button` renders an internal `<ds-tooltip>` in its own shadow root
whenever `a11yTitle` is set — regardless of whether the button also has
visible label text. Tooltip content is `a11yTitle` only (`a11yLabel` stays
reserved for accessible-name text that should NOT appear visually). The
native `title` attribute is dropped once the internal tooltip takes over, to
avoid a native + custom tooltip both firing on hover. There is no opt-out
prop: setting `a11yTitle` unconditionally renders a tooltip, since this is
treated as a pure accessibility improvement rather than a breaking change
needing a migration flag. A new optional `readonly tooltipPlacement?:
TooltipPlacement` prop forwards to the internal tooltip's `placement`
(default `bottom`, unchanged from `ds-tooltip`'s own default).

`ds-tooltip`'s `reference` resolution changes from `document.querySelector`
to a lookup scoped via `this.el.getRootNode()`, so it can find a trigger id
declared in the same shadow root — required for `ds-button`'s internal
composition to work at all.

`ds-close` and `ds-hint` each get their own independent tooltip wiring
rather than being refactored to compose `ds-button`:

- `ds-close`'s native-`<button>` branch (`button={false}`) gets its own
  internal `<ds-tooltip>` (same `getRootNode()`-scoped reference pattern)
  and drops its hardcoded `title={label}`. Its composed-`ds-button` branch
  (`button={true}`) instead passes `a11yTitle={label}`, inheriting
  `ds-button`'s tooltip behavior directly.
- `ds-hint`'s trigger (a raw `<button>`, not `ds-button`) gets its own
  internal `<ds-tooltip>` with content `triggerLabel`, independent of the
  same trigger's existing click-triggered `ds-popup`/`ds-drawer` hint-content
  interaction (`aria-haspopup="dialog"`, `aria-expanded`). Hover shows the
  tooltip (the trigger's own accessible name); click opens the actual hint
  content — two deliberately separate interactions on one element.

## Consequences

- `data-item`, `file-upload`, and `input-stepper` already pass
  `a11yLabel`/`a11yTitle` through to internally-composed `ds-button`
  instances (edit / remove-file / increment-decrement icon-only buttons), so
  they inherit the tooltip automatically with no code changes — but their
  visual regression snapshots will need re-baselining.
- Tooltip integration logic now exists in three places (`ds-button`,
  `ds-close`, `ds-hint`) instead of one. This is a deliberate, non-DRY choice
  to preserve each component's existing rendering strategy rather than
  forcing `ds-close`/`ds-hint` to compose `ds-button` — a future change to
  the tooltip pattern (e.g. placement defaults, dismiss behavior) must be
  applied in all three places.
- Any consumer relying on the native browser `title` tooltip's specific
  timing/styling on an icon-only `ds-button` will see different (custom)
  tooltip behavior instead.
