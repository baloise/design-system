# 7. ds-input-slider replaces the native `<input type="range">` with noUiSlider

Package: `packages/core`

Date: 2026-07-28

## Status

Accepted

## Context

`ds-input-slider` originally wrapped a native `<input type="range">` inside
the shadow root, using the same `FormControl` helper
(`packages/core/src/utils/form-control.ts`) as `ds-input`/`ds-number-input`,
with one deliberate divergence documented in
[ADR-0010](./0010-ds-input-slider-change-commit.md) (commit on native
`change`, not blur).

The brief for this pass is to replace the native range input with
**noUiSlider**, a dependency-free JS slider library, while keeping visual
styling out of scope. This is a materially different integration than
`ds-input`/`ds-number-input`:

- noUiSlider does not enhance a native `<input>`; it renders its own DOM
  (track + handle divs) onto a plain element and manages pointer/keyboard
  interaction itself.
- There is therefore no `nativeEl: HTMLInputElement` for `FormControl` to
  focus/blur/read from — the same situation `ds-select` already faces with
  slim-select.
- Form participation must come entirely from `formAssociated: true` +
  `@AttachInternals() internals!: ElementInternals`, with no native input
  backing it.

## Decision

1. Add **noUiSlider** (`nouislider`, zero runtime deps, ships its own
   TypeScript types) as a `packages/core` dependency, alongside the existing
   third-party UI libraries (`air-datepicker`, `slim-select`, `imask`).
2. Remove the native `<input type="range">` entirely. noUiSlider mounts on a
   plain `<div id="slider" part="slider">`; there is no native form control
   anywhere in the shadow root.
3. Wrap the noUiSlider instance in `InputSliderPickerController`
   (`input-slider.picker.ts`), mirroring the existing `SelectPickerController`
   shape (`select.picker.ts`): a config-driven class instantiated in
   `componentDidLoad`, destroyed in `disconnectedCallback`, exposing
   `setValue()`, `setDisabled()`, `updateRange()`, `focus()`, `blur()`.
   `input-slider.utils.ts` keeps its existing pure-function shape
   (`clampValue`, `resolveInitialValue`) rather than absorbing stateful
   lifecycle logic.
4. **Drop `FormControl` for this component**, matching `ds-select`:
   `input-slider.tsx` manages `internals.setFormValue()`, `initialValue`/
   reset-on-`reset`, and click-passthrough directly, instead of routing
   through the native-input-shaped `FormControl` helper.
5. Map noUiSlider's own events onto the existing public event contract:
   `update` (fires continuously, including every drag/keyboard step) →
   `dsInput`; `set` (fires once per discrete interaction — pointer release,
   one completed keyboard step, **or** a programmatic `.set()` API call) →
   `dsChange`. `set` was used instead of noUiSlider's `change` event
   because `change` fires only for real user interaction; a programmatic
   `.set()` call (used by the picker's own `setValue()`, and by test code
   driving the widget directly) fires `update` + `set` but never `change`.
   This choice is made specifically to preserve ADR-0010's
   commit-on-discrete-interaction semantics with a new event source, not to
   revisit that decision. A `suppressEvents` guard in
   `InputSliderPickerController.setValue()` additionally ensures an
   externally-driven `value` prop change does not itself cascade into a
   `dsInput`/`dsChange` emission — only real user interaction, or a test
   calling the underlying noUiSlider instance directly, should emit them.
6. Configure noUiSlider with a `format: { to, from }` pair that rounds to
   the decimal precision implied by the `step` prop, since noUiSlider's
   internal percentage-based math produces floating-point noise otherwise.
7. Rely on noUiSlider's built-in ARIA (`role="slider"`,
   `aria-valuemin`/`aria-valuemax`/`aria-valuenow`, keyboard support) for
   WCAG 2.2 AA compliance, wiring `aria-labelledby`/`aria-describedby` from
   the handle to the `Field`'s label/description ourselves (same pattern as
   `SelectPickerController.connectLabelToTrigger()`).
8. Import only noUiSlider's own base CSS (`nouislider/dist/nouislider.css`)
   — required for pointer/touch dragging to function at all (it sets the
   `position: relative`/`absolute` plumbing the handle's percentage offset
   depends on) — without adding any DS visual design on top. Styling is
   explicitly out of scope for this pass.

## Consequences

**Positive**

- Keyboard navigation, focus management, and screen-reader semantics come
  from noUiSlider's built-in ARIA support instead of being hand-rolled.
- No new abstraction beyond what `ds-select` already established for
  "library-backed widget with `ElementInternals`, no native input" — the
  picker-controller pattern is now used by two components instead of one.
- `dsInput`/`dsChange` semantics stay externally identical to before this
  change (same ADR-0010 commit model), so this is not a breaking behavior
  change for consumers, even though the internal event source changed.

**Negative / risks**

- `getInputElement(): Promise<HTMLElement>` now resolves noUiSlider's
  handle `<div>`, not an `<input>` — a breaking type change for any
  consumer that assumed `HTMLInputElement` (return type loosened; method
  name kept).
- `FormControl`'s onBlur/onInput/nativeEl model now has two known
  exceptions (`ds-select`, `ds-input-slider`) rather than one; a future
  library-backed component should default to the picker-controller pattern
  rather than trying to force-fit `FormControl`.
- Post-mount prop reactivity (`value`/`min`/`max`/`step` changed externally
  after mount) requires explicit `@Watch` → `picker.setValue()`/
  `updateRange()` calls, since noUiSlider's config is frozen after
  `.create()` — unlike the native input, which picked up prop changes for
  free through Stencil's JSX diffing.
- The slider is visually unstyled (stock noUiSlider look) until a follow-up
  design pass; only functional base CSS is included here.

## Alternatives considered

- **Keep the native `<input type="range">`, add tick marks/visual polish
  only** — rejected: contradicts the brief's explicit mandate to adopt
  noUiSlider.
- **Widen `FormControl.nativeEl` to `HTMLElement` and keep using it** —
  rejected: leaks a slider/select-specific need into a shared type used by
  every other form control's `nativeEl: HTMLInputElement |
HTMLTextAreaElement` contract.
- **Keep a hidden native `<input>` in sync as a fallback** — rejected: no
functional need once `ElementInternals` drives form participation
directly; would only add sync complexity (two sources of truth for one
value).
</content>
