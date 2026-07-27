# Implementation Plan: `ds-input-slider`

Status: ready for implementation. Nothing in this plan has been implemented or committed yet.

Related decisions: [ADR-0006](../adr/0006-ds-input-slider-change-commit.md)
(commit on native `change`, not blur). Domain vocabulary:
[packages/core/CONTEXT.md § Input Slider](../../packages/core/CONTEXT.md#input-slider-ds-input-slider).

## Scope

Migrate `bal-input-slider` (Stencil, `packages/core/src/components/bal-input-slider/`,
present in this repo's git history but already removed on `next`) to the new
web-component-only `ds-*` standard: `@AttachInternals()` + `ElementInternals`
form participation, the shared `Field` functional component (label +
description/invalid-text), and `FormControl` for click/reset/focus
bookkeeping — the same pattern used by `ds-input` and `ds-number-input`.

**Explicitly out of scope for this pass** (confirmed in grilling session):

- Visual design / design tokens beyond global + alias token placeholders —
  no custom track fill, no thumb styling, no tick marks.
- Interaction/functional Playwright tests (`.component.play.ts`).
- Visual regression tests (`.visual.play.ts`).
- Dual-thumb / min+max range sliders.
- Tick marks (`hasTicks`) — old BEM div-based rendering is dropped, not
  ported. A future visual pass should use native `<datalist>`/`list`.
- True `readonly` semantics — `readonly` is treated as equivalent to
  `disabled` (see CONTEXT.md; native range inputs don't support `readonly`
  at all).

**In scope:**

- Full prop/event/method API parity with the `ds-input`/`ds-number-input`
  shape, adapted for range semantics (see prop table below).
- WCAG 2.2 AA compliance (native semantics + `Field`'s existing
  label/describedby wiring + correct `aria-*` attributes).
- Unit tests for the real logic this component has (clamping, value
  defaulting, `step="any"` handling).
- A11y Playwright test (`.a11y.play.ts`).
- A basic visual/manual HTML example page (`test/input-slider.visual.html`),
  matching the shape of `ds-input`'s `test/input.visual.html`.

## Key design decisions (from grilling)

| Decision | Resolution |
|---|---|
| Value type | `value: number`, never `null`/`''` — a range input always has a concrete value. Defaults to `min` when unset. |
| Dual-thumb | Out of scope — single thumb only. |
| `hasTicks` | Dropped entirely. |
| Track/fill markup | Bare native `<input type="range">` inside `Field`, no wrapper `<div>`s, no BEM. |
| `min`/`max` type | `@Type('number')` (diverges from `ds-input`/`ds-number-input`'s string-typed min/max, since these drive real component logic here). |
| `step` default | `1` (native default). Continuous mode via `step="any"`, not a `0` sentinel. |
| Value clamping | `@Watch('min')`/`@Watch('max')` clamp `value` into range — component state never drifts from the DOM. |
| `readonly` | Treated as `disabled` (`disabled={this.disabled \|\| this.readonly}`), matching the existing `ds-checkbox` convention — native range has no real `readonly`. |
| `color` prop | Included, same `InputColor` semantics as `ds-input` (state color for `Field`, not brand color). |
| `required` default | `true`, for parity with `ds-input`/`ds-number-input`. |
| `dsKeyPress` | Dropped — `keypress` never fires for arrow-key slider interaction. |
| Commit trigger | Native `change` event commits (`FormControl.setValue()`), not `blur`. See ADR-0006. |
| Styling | New web-component-only style structure (`form.mixin` cascade, `vars.base`/`vars.local`), no BEM. Global + alias tokens only. |
| Test scope | Unit spec + a11y Playwright only; skip interaction and visual Playwright tests. |

## Steps

### Phase 1 — Scaffolding & interfaces

- [ ] Create `packages/core/src/components/input-slider/` directory.
- [ ] `input-slider.interfaces.ts`:
  - Re-export/alias `InputColor` from `../input/input.interfaces` (or import
    directly — follow whatever `number-input.interfaces.ts` does for shared
    types).
  - `InputSliderInputDetail = number`, `InputSliderChangeDetail = number`,
    `InputSliderBlurDetail = FocusEvent`, `InputSliderFocusDetail = FocusEvent`,
    `InputSliderClickDetail = MouseEvent`.
- [ ] Confirm `INPUT_COLORS`/`InputColor` import path resolves without a
  circular dependency between `input-slider` and `input`.

### Phase 2 — Component logic (`input-slider.tsx`)

- [ ] `@Component({ tag: 'ds-input-slider', styleUrl: 'input-slider.host.scss', shadow: true, formAssociated: true })`.
- [ ] Implements `DsComponentInterface`, `FieldInterface`,
  `FormControlInterface<number>`.
- [ ] `@Element() el!`, `@AttachInternals() internals!: ElementInternals`,
  `private control = new FormControl<number>(this)`.
- [ ] `@Logger('input-slider')` per `Loggable` convention.
- [ ] `@State() focused = false`, `@State() language`, `@State() region`
  (config-driven, same as `ds-input`).
- [ ] **PUBLIC PROPERTY API** (divider-commented per STYLE_GUIDE.md), each
  with a validation decorator:
  - `value: number` (`{ mutable: true, reflect: true }`) — defaults to `min`
    at `componentWillLoad` if not explicitly set (track "was this prop
    passed?" the same way other components do, or default in
    `connectedCallback`/`componentWillLoad` — confirm against how `ds-date`
    handles a similarly derived default).
  - `name: string = this.inputId`.
  - `label: string = ''`, `description: string = ''`, `invalidText: string = ''`.
  - `color: InputColor = 'primary'`.
  - `invalid: boolean = false`.
  - `min: number = 0` (`@Type('number')`).
  - `max: number = 100` (`@Type('number')`).
  - `step: number | 'any' = 1`.
  - `disabled: boolean = false`, `readonly: boolean = false`.
  - `required: boolean = true`.
  - `debounce: number = 0` with `@Watch('debounce')` → `debounceChanged()`.
  - `autoInvalidOff: boolean = false` (`{ reflect: true }`), for parity with
    the rest of the form-control family / Angular reactive forms.
- [ ] `@Watch('min')` / `@Watch('max')` → clamp `this.value` into
  `[min, max]` (guard against `min > max` misconfiguration — clamp using
  `Math.min(max, Math.max(min, value))` order that degrades gracefully).
- [ ] **Events**: `dsInput`, `dsChange`, `dsBlur`, `dsFocus`, `dsClick`
  (matches `FormControlInterface`). No `dsKeyPress`.
- [ ] **LIFECYCLE**:
  - `connectedCallback()` — `this.debounceChanged()`, default `value` to
    `min` if unset, `this.control.connectedCallback()`.
  - `componentWillLoad()` — `inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])`.
  - `componentDidLoad()` — `this.control.componentDidLoad()`.
- [ ] **PUBLIC LISTENERS**: `listenToClick`/`listenToReset` delegate to
  `control.listenOnClick`/`control.listenOnReset`, same as `ds-input`.
  `configChanged` `@Method` for `@ListenToConfig()`.
- [ ] **PUBLIC METHODS**: `setFocus()`, `setBlur()`, `getInputElement()` —
  same shape as `ds-input`.
- [ ] **EVENT HANDLERS** (see ADR-0006 for the commit split):
  - `handleInput` — reads `nativeEl.valueAsNumber`, updates
    `control.inputValue`, emits `dsInput`. No commit.
  - `handleChange` — new, native-`change`-driven: sets
    `control.inputValue` from `nativeEl.valueAsNumber` then calls
    `control.setValue(control.inputValue)` directly (commits + emits
    `dsChange` + `internals.setFormValue`).
  - `handleFocus`/`handleBlur` — set `focused` state and emit
    `dsFocus`/`dsBlur` only; **do not** call `control.onBlur()` (it would
    re-trigger a commit path already handled by `handleChange`).
  - `handleClick` — delegate to `control.onClick`.
- [ ] **RENDER**:
  ```tsx
  <Field
    disabled={this.disabled || this.readonly}
    color={this.color}
    invalid={this.invalid}
    label={this.label}
    description={this.description}
    invalidText={this.invalidText}
    required={this.required}
    language={this.language}
  >
    <input
      id="input"
      part="input"
      type="range"
      ref={el => (this.control.nativeEl = el)}
      aria-describedby="description"
      aria-invalid={this.invalid === true ? 'true' : 'false'}
      name={this.name}
      disabled={this.disabled || this.readonly}
      required={this.required}
      min={this.min}
      max={this.max}
      step={this.step}
      value={this.value}
      onInput={this.handleInput}
      onChange={this.handleChange}
      onFocus={this.handleFocus}
      onBlur={this.handleBlur}
      onClick={ev => this.handleClick(ev)}
      {...this.inheritedAttributes}
    />
  </Field>
  ```
- [ ] No `pattern`/`allowedKeyPress`/mask-related props — none apply to a
  range input.

### Phase 3 — Styles (`input-slider.host.scss`)

- [ ] Web-component-only structure (no `.style.scss`), no BEM classes —
  follow the `form.mixin` cascade used by `number-input.host.scss`:
  ```scss
  @use '@baloise/ds-css/dist/scss/mixins' as *;
  @use '../form/form.mixin' as form;

  :host {
    @include form.vars-field();
    @include form.vars-container();
    @include form.vars-label();
    @include form.vars-description();
  }

  :host {
    @include form.field();
    @include form.container();
    @include form.label();
    @include form.description();
  }
  ```
- [ ] Style `#input` (the native range) with **global/alias tokens only**
  (no new component tokens/Figma work this pass) — e.g. `accent-color: var(--ds-alias-...)`,
  reasonable `width: 100%`, `block-size` sized off an alias spacing token.
  Explicitly minimal: this phase is not a visual-parity pass with the old
  `bal-input-slider.sass`.
- [ ] `:host(.is-disabled)` variant reusing the same
  `--mod-form-*` variables `number-input.host.scss` sets (pointer-events
  none, disabled colors from alias tokens) — this is what visually carries
  `readonly` too, since `readonly` maps to the same disabled state.
- [ ] `:host(.is-danger)` / `.is-success` / `.is-warning` variants, mirroring
  `number-input.host.scss` lines 74–99 (border/description color swaps via
  alias tokens).
- [ ] Explicitly **not** doing this pass: custom track fill/progress
  styling, custom thumb styling, tick marks, focus-ring redesign beyond
  browser default. Leave a comment marking these as deferred to a future
  visual/design-token pass.

### Phase 4 — Unit tests

- [ ] `test/input-slider.spec.ts` (Vitest) covering pure logic only
  (functional/interaction tests are out of scope, but this is logic, not
  interaction):
  - `value` defaults to `min` when unset.
  - clamping: `value` outside `[min, max]` gets clamped when `min`/`max`
    change.
  - clamping degrades sanely when `min > max`.
  - `step="any"` is accepted and passed through untouched.

### Phase 5 — A11y test

- [ ] `test/input-slider.a11y.play.ts`, page-object-mounted per
  `@baloise/ds-playwright` convention (see `input.a11y.play.ts` for shape):
  - axe scan with default label/description.
  - axe scan in `invalid` state (confirms `invalidText` + `role="alert"`
    wiring from `Field` still passes).
  - axe scan in `disabled` and `readonly` (→ rendered disabled) states.
  - keyboard: `Tab` reaches the slider once, Arrow keys move the value,
    `Home`/`End` jump to `min`/`max` (native browser behavior — assert it
    isn't broken by any custom keydown handling, since this component adds
    none).
  - confirm `aria-valuenow`/`aria-valuemin`/`aria-valuemax` are exposed
    automatically by the native `role="slider"` semantics (no manual
    `aria-value*` attributes needed — don't add them, they'd fight the
    browser's own updates).

### Phase 6 — Visual/manual HTML example

- [ ] `test/input-slider.visual.html`, following the section structure used
  across the repo's visual HTML examples — `<!-- Comment -->` + `<section
  data-testid="...">` + a `<span>` label, then the component instances (see
  `packages/core/src/components/tag/test/tag.visual.html` and
  `packages/core/src/components/input/test/input.visual.html`):
  ```html
  <!-- Basic Style -->
  <section data-testid="basic">
    <span>Basic</span>
    <ds-input-slider label="Volume" description="0–100"></ds-input-slider>
    <ds-input-slider label="Label" value="50"></ds-input-slider>
  </section>

  <!-- Disabled -->
  <section data-testid="disabled">
    <span>Disabled</span>
    <ds-input-slider label="Label" value="50" disabled></ds-input-slider>
  </section>

  <!-- Readonly -->
  <section data-testid="readonly">
    <span>Readonly</span>
    <ds-input-slider label="Label" value="50" readonly></ds-input-slider>
  </section>

  <!-- Invalid -->
  <section data-testid="invalid">
    <span>Invalid</span>
    <ds-input-slider label="Label" invalid-text="Out of range" invalid></ds-input-slider>
  </section>

  <!-- Valid -->
  <section data-testid="valid">
    <span>Valid</span>
    <ds-input-slider label="Label" value="50" color="success"></ds-input-slider>
  </section>

  <!-- Warning -->
  <section data-testid="warning">
    <span>Warning</span>
    <ds-input-slider label="Label" value="50" color="warning"></ds-input-slider>
  </section>

  <!-- Step -->
  <section data-testid="step">
    <span>Step</span>
    <ds-input-slider label="Step 10" min="0" max="100" step="10"></ds-input-slider>
    <ds-input-slider label="Continuous" min="0" max="1" step="any"></ds-input-slider>
  </section>

  <!-- Min/Max -->
  <section data-testid="min-max">
    <span>Min/Max</span>
    <ds-input-slider label="Range -50 to 50" min="-50" max="50" value="0"></ds-input-slider>
  </section>

  <!-- Form Reset -->
  <section data-testid="form-reset">
    <span>Form Reset</span>
    <form>
      <ds-input-slider required name="volume" label="Volume" value="30"></ds-input-slider>
      <ds-button-group>
        <ds-button element-type="submit" color="primary">Submit</ds-button>
        <ds-button data-testid="button-reset" element-type="reset" color="link">Reset</ds-button>
      </ds-button-group>
    </form>
  </section>
  ```
- [ ] Not creating `input-slider.cy.html` (legacy Cypress, superseded by
  Playwright) or `input-slider.style.html` (that variant exists on
  `number-input` for its now-out-of-scope `.style.scss`/CSS-only testing
  path — `ds-input-slider` is web-component-only with no `.style.scss`, so
  it doesn't apply here). Only `input-slider.visual.html` is created.

### Phase 7 — Wiring

- [ ] `@slot`/`@part` JSDoc on the component per STYLE_GUIDE.md ("Component
  JSDoc" section) — likely `@part input`.
- [ ] Confirm Stencil auto-registers the new component in
  `packages/core`'s component collection (no manual index edits expected,
  but verify against how `number-input` was wired in when it was added).

## Open follow-ups (explicitly out of scope for this plan)

- Visual/design-token pass: track fill, thumb styling, focus ring, tokens
  in `packages/tokens`.
- Tick marks via native `<datalist>`/`list`.
- Interaction (`component.play.ts`) and visual regression
  (`visual.play.ts`) test coverage.
- Dual-thumb / range-select variant, if ever needed — separate component.
- `aria-valuetext` / value-formatting prop (e.g. announcing "50 CHF" instead
  of "50") if a consuming team needs richer screen-reader value context —
  not requested for this MVP, native `aria-valuenow` already satisfies AA.
- Storybook documentation (`ds-document-component` skill).
- `pnpm changeset` entry.
