# 10. ds-input-slider commits its value on the native `change` event, not on blur

Package: `packages/core`

Date: 2026-07-27

## Status

Accepted

## Context

Every existing form-associated component in `packages/core` (`ds-input`,
`ds-number-input`, `ds-textarea`, ...) shares the `FormControl` helper
(`packages/core/src/utils/form-control.ts`). `FormControl` encodes a
**text-editing** interaction model:

- native `input` event → live, uncommitted value (`dsInput` emitted, nothing
  written to `ElementInternals` yet)
- native `blur` → the moment the value is considered "final": `onBlur()`
  calls `setValue()`, which writes `internals.setFormValue(...)` and emits
  `dsChange`.

This mapping is correct for typed text: while the user is mid-keystroke the
value isn't "done"; only leaving the field signals completion.

`ds-input-slider` wraps a native `<input type="range">`. Range inputs already
expose a **committed vs. in-progress** distinction natively, and it does not
line up with focus/blur:

- native `input` → fires continuously while dragging or arrow-stepping
  (in-progress, exactly like text input's `input` event).
- native `change` → fires once per **discrete interaction**: once when a
  drag/arrow-step sequence ends (pointer release, or after each arrow-key
  step), independent of whether the element still has focus.

A user can drag the thumb multiple times in a row without ever blurring the
slider (mouse stays over the control, keyboard focus never leaves). Under the
`FormControl` blur-commit model, none of those intermediate drags would
reach `ElementInternals.setFormValue()` or emit `dsChange` until the user
finally tabs/clicks away — meaning a form could be submitted mid-interaction
with a stale committed value, and `dsChange` listeners (e.g. live totals,
analytics) would miss every change except the last.

## Decision

`ds-input-slider` does not reuse `FormControl.onBlur()` for its commit logic.
Instead:

1. `focus`/`blur` native events only toggle `focused` state and emit
   `dsFocus`/`dsBlur` — no value side effects.
2. The native `input` event updates the live/display value and emits
   `dsInput`, same as every other form control.
3. The native `change` event is the commit point: it calls
   `control.setValue()` directly (writing `ElementInternals.setFormValue()`
   and emitting `dsChange`), independent of focus state.

This is a deliberate, one-component divergence from the shared `FormControl`
convention, kept narrow (only the commit trigger changes; `FormControl` is
still used for click/reset/focus bookkeeping and `ElementInternals` writes).

## Consequences

**Positive**

- `dsChange`/form value stays accurate throughout a multi-drag interaction
  instead of only firing on blur — matches how a native, non-web-component
  `<input type="range">` inside a `<form>` already behaves.
- No new abstraction: the existing `FormControl.setValue()` is reused,
  just invoked from a different trigger.

**Negative / risks**

- Someone reading `ds-input-slider` after having learned the `FormControl`
  blur-commit pattern from `ds-input`/`ds-number-input` will find the commit
  trigger in a different place than expected — mitigated by this ADR and by
  a code comment at the `change` handler pointing here.
- `FormControl.onBlur()` is not used at all for this component;
  `dsBlur` is emitted via a thin local handler instead, so `FormControl`'s
  onBlur/onInput split doesn't fully apply to range-type controls in
  general (worth reconsidering if a future component — e.g. a slider variant
  or scrubber — needs the same treatment).

## Alternatives considered

- **Reuse `FormControl.onBlur()` for commit, matching every other
  component** — rejected: silently drops intermediate `dsChange` events
  during a single focus session, which is a real behavioral regression
  compared to how native `<input type="range">` participates in a `<form>`.
- **Commit on every native `input` event (no separate commit step)** —
  rejected: would spam `dsChange`/`setFormValue` on every pixel of a drag
  instead of once per discrete interaction, and conflates the "live" and
  "committed" event semantics that `dsInput`/`dsChange` are meant to keep
  distinct.
