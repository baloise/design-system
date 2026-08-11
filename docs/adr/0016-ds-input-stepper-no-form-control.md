# 16. ds-input-stepper does not use the `FormControl` utility

Package: `packages/core`

Date: 2026-08-06

## Status

Accepted

## Context

The convention in `packages/core` is that form-associated components share
the `FormControl` helper
(`packages/core/src/utils/form-control.ts`). It encodes a **text-editing**
interaction model:

- `onInput` reads `nativeEl.value`, treats it as an uncommitted in-progress
  value and emits `dsInput`.
- `onBlur` commits: it calls `setValue(inputValue)`, which writes
  `internals.setFormValue(...)` and emits `dsChange`.
- `listenOnReset` restores `initialValue` **and writes it back onto
  `nativeEl.value`** so the visible text matches the committed state.

Every one of those pathways assumes there is a `nativeEl` — a
`<input>` or `<textarea>` — living inside the shadow root.

`ds-input-stepper` is a two-button widget with a plain `<span>` for the
displayed value; there is no native input element, no free-text editing,
and no "type then commit" sequence. Every button click is already a
discrete, committed value change. There is nothing for `FormControl.onInput`
to read, nothing for `FormControl.onBlur` to commit that hasn't already been
committed by the click handler, and nothing for `listenOnReset` to write to.

ADR 0010 already documents that `ds-input-slider` diverges from
`FormControl.onBlur` for a similar reason (its commit trigger is a native
`change`, not blur). The stepper takes the same reasoning one step further:
because it has no native form element at all, none of `FormControl`'s
lifecycle helpers apply.

## Decision

`ds-input-stepper` does not construct a `FormControl` instance. It follows
the `ds-input-slider` / `ds-toggle` pattern of a **web-component-only
form-associated control**:

1. `@AttachInternals()` provides `ElementInternals`; `internals.setFormValue()`
   is called directly from the click handlers.
2. A local `@Listen('reset', { capture: true, target: 'document' })`
   restores `initialValue` and re-syncs `setFormValue()` — no `nativeEl`
   round-trip.
3. A local `@Listen('click', { capture: true, target: 'document' })`
   prevents interaction while `disabled` or `readonly`, matching what
   `FormControl.listenOnClick` would have done.
4. `dsInput`, `dsChange`, `dsIncrease`/`dsDecrease` are emitted from the
   step handler; `dsFocus`/`dsBlur` come from container-level
   `focusin`/`focusout` with a `relatedTarget` inside-the-widget check
   (so tabbing between the two buttons does not fire spurious blur).

## Consequences

**Positive**

- No dead code paths (`FormControl` fields and methods that would exist but
  never fire because there's no `nativeEl`).
- The component's form participation is visible in one place — the click
  handler — instead of being spread across `FormControl.setValue`,
  `FormControl.componentDidLoad`, and `FormControl.listenOnReset`.
- The precedent is consistent with `ds-input-slider` (ADR 0010) and
  `ds-toggle`, both of which are also form-associated web components
  without a `nativeEl`-driven commit model.

**Negative / risks**

- A future contributor coming from `ds-input`, `ds-number-input`, or
  `ds-textarea` will look for `this.control = new FormControl(...)` and be
  briefly confused when it isn't there. Mitigated by this ADR and by the
  fact that `ds-input-slider` already establishes the same shape.
- If the shared `FormControl` grows behavior that is genuinely useful to
  no-native-input controls (e.g. reset bookkeeping), we would either need
  to extract that behavior into a smaller reusable helper or duplicate the
  small amount of code (~15 lines) that stepper needs.

## Alternatives considered

- **Instantiate `FormControl` and leave `nativeEl` undefined.** Rejected:
  `onBlur` would call `setValue(inputValue)` with a stale/undefined
  `inputValue`, and `listenOnReset` would silently fail its `nativeEl.value`
  write. Correct behavior only by luck.
- **Extract the reusable parts of `FormControl` into a smaller
  `FormAssociatedControl` mixin.** Deferred: only two components currently
  need it (slider, stepper), and both already have local implementations.
  If a third arrives, the extraction becomes worthwhile.
