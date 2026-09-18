# 31. Migrate `ds-toggle` onto the `Field` wrapper without routing its `label` prop through it

Package: `packages/core`, `packages/angular`

Date: 2026-09-17

## Status

Accepted

## Context

`ds-toggle` reactive-forms support (issue #2283) requires `invalidText`, since
`@baloise/ds-angular`'s `DsValueAccessor` (see `packages/angular/CONTEXT.md`)
derives `invalid`/`invalidText` from the bound `NgControl` and requires both
properties to exist on the target element. `ds-toggle` had `invalid` but no
`invalidText`, and — unlike every other `Field`-based form component
(`ds-input`, `ds-radio-group`, `ds-checkbox-group`, `ds-textarea`, ...) — no
visual mechanism to show it: `ds-toggle` has never used the shared `Field`
wrapper (`packages/core/src/components/input/field.util.tsx`); it renders its
own bare `<label>` wrapping `<input>` + the default slot.

Two problems needed resolving together:

- **Whether to render `invalidText` at all**, vs. adding it purely as a
  CVA-contract property with no visible output (the `ds-checkbox` precedent —
  no `invalidText`, no visual error state at the leaf-control level).
- **How to reconcile two label mechanisms.** `Field`'s `label` prop renders an
  explicit heading (`<label htmlFor={inputId}>`/`<legend>`) positioned above
  the control, tied via `aria-labelledby`. `ds-toggle`'s own `label` prop is
  declared but was never actually rendered anywhere in `toggle.tsx` — the
  switch's real accessible name has always come from its default slot content,
  implicitly associated by wrapping it inside `<label>`. Passing `this.label`
  into `Field`'s `label` would make a toggle carry two distinct label-shaped
  things (a `Field` heading plus the switch's own slotted caption) — a real,
  surprising UX/API change to how every existing `ds-toggle` consumer composes
  the component.

## Decision

`ds-toggle` adopts `Field` (`role="field"`, no `role="fieldset"` — it is a
single control, not a group) purely for the `invalid`/`invalidText`
description block, color-state classes, and `AttachInternals()`-adjacent
plumbing already standard across `Field`-based components. `Field`'s `label`
prop is **not** wired to `ds-toggle`'s `label` prop — it is passed nothing (or
left `undefined`), so `Field` renders no heading/legend of its own.
`ds-toggle` keeps its existing implicit-label markup (`<label>` wrapping
`<input>` + the default slot) nested inside `Field`'s `children`, unchanged.
`ds-toggle`'s own `label` prop remains as-is (still undocumented/unused in
render) — retiring or repurposing it is out of scope for this ticket.

This makes `ds-toggle` the first `Field` consumer that deliberately omits
`Field`'s label mechanism.

## Consequences

- `toggle.style.scss`/`toggle.host.scss` needed restructuring to nest the
  existing switch markup inside `Field`'s `div#inner > div#container`
  wrapper, which changes the shadow DOM shape and required updating visual
  regression snapshots for all `ds-toggle` variants (targeted at
  pixel-parity with the pre-`Field` layout, `tile` excepted — it's being
  removed on another branch).
- A future ticket that wants `ds-toggle` to show a `Field`-style heading
  distinct from the switch's own caption (finally giving the dead `label`
  prop a purpose) will need its own design/accessibility review — this ADR
  only records that the two label mechanisms were deliberately kept apart,
  not merged.
