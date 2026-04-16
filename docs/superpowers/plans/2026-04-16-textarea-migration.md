# Textarea Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate `bal-textarea` to `ds-textarea` following the DS standard established by `ds-input`, and produce a reusable Claude skill for future component migrations.

**Architecture:** Component-first (tsx + interfaces) → Styles (mixin/host/style SCSS) → Tests (PO + play files) → Docs (stories + MDX) → Skill. Each phase produces a working build checkpoint. Shadow DOM is enabled via `shadow: true` + `formAssociated: true`. The `FormControl` class replaces all old `FormInput` utilities. `BEM` is removed entirely; elements use `id` attributes, state variants use host modifier classes.

**Tech Stack:** Stencil.js, SCSS, Playwright (`@baloise/ds-playwright`), Storybook (`@storybook/html-vite`), TypeScript

---

## File Map

| Action | Path |
|---|---|
| Create | `packages/core/src/components/textarea/textarea.tsx` |
| Create | `packages/core/src/components/textarea/textarea.interfaces.ts` |
| Create | `packages/core/src/components/textarea/textarea.mixin.scss` |
| Create | `packages/core/src/components/textarea/textarea.host.scss` |
| Create | `packages/core/src/components/textarea/textarea.style.scss` |
| Create | `packages/core/src/components/textarea/test/textarea.visual.html` |
| Create | `packages/core/src/components/textarea/test/textarea.style.html` |
| Create | `packages/core/src/components/textarea/test/textarea.visual.play.ts` |
| Create | `packages/core/src/components/textarea/test/textarea.a11y.play.ts` |
| Create | `packages/core/src/components/textarea/test/textarea.component.play.ts` |
| Create | `packages/playwright/src/lib/components/textarea.po.ts` |
| Modify | `packages/playwright/src/lib/components/index.ts` |
| Create | `docs/src/components/textarea/textarea.stories.ts` |
| Create | `docs/src/components/textarea/textarea.mdx` |
| Delete | `packages/core/src/components/bal-textarea/` (entire directory) |
| Create | `/Users/hirsch/.claude/plugins/cache/claude-plugins-official/superpowers/5.0.7/skills/migrate-component.md` |
| Modify | `/Users/hirsch/.claude/plugins/cache/claude-plugins-official/superpowers/5.0.7/skills.json` (or equivalent manifest) |

---

## Phase 1: Component

### Task 1: Create directory and copy source files

**Files:**
- Create: `packages/core/src/components/textarea/` (directory)
- Source: `packages/core/src/components/bal-textarea/bal-textarea.tsx` → copy as starting point
- Source: `packages/core/src/components/bal-textarea/bal-textarea.interfaces.ts` → copy as starting point

- [ ] **Step 1: Create the new directory**

```bash
mkdir -p packages/core/src/components/textarea/test
```

- [ ] **Step 2: Copy source files as starting points**

```bash
cp packages/core/src/components/bal-textarea/bal-textarea.tsx \
   packages/core/src/components/textarea/textarea.tsx

cp packages/core/src/components/bal-textarea/bal-textarea.interfaces.ts \
   packages/core/src/components/textarea/textarea.interfaces.ts

cp packages/core/src/components/bal-textarea/test/bal-textarea.visual.html \
   packages/core/src/components/textarea/test/textarea.visual.html
```

- [ ] **Step 3: Commit scaffolding**

```bash
git add packages/core/src/components/textarea/
git commit -m "chore: scaffold textarea directory for ds migration"
```

---

### Task 2: Write `textarea.interfaces.ts`

**Files:**
- Modify: `packages/core/src/components/textarea/textarea.interfaces.ts`

Replace the entire file content. The `BalProps`/`BalEvents` namespaces become `DS`. `TextareaInputMode` reuses `InputInputMode` already defined in `input.interfaces.ts` (same `DS` namespace, TypeScript merges them).

- [ ] **Step 1: Replace file content**

`packages/core/src/components/textarea/textarea.interfaces.ts`:
```ts
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  export type TextareaWrap = 'hard' | 'soft' | 'off'
  export type TextareaInputMode = InputInputMode

  export interface TextareaCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLDsTextareaElement
  }

  export type TextareaInputDetail = string | null
  export type TextareaInput = TextareaCustomEvent<TextareaInputDetail>

  export type TextareaChangeDetail = string | null
  export type TextareaChange = TextareaCustomEvent<TextareaChangeDetail>

  export type TextareaBlurDetail = FocusEvent
  export type TextareaBlur = TextareaCustomEvent<TextareaBlurDetail>

  export type TextareaKeyPressDetail = KeyboardEvent
  export type TextareaKeyPress = TextareaCustomEvent<TextareaKeyPressDetail>

  export type TextareaFocusDetail = FocusEvent
  export type TextareaFocus = TextareaCustomEvent<TextareaFocusDetail>

  export type TextareaClickDetail = MouseEvent
  export type TextareaClick = TextareaCustomEvent<TextareaClickDetail>
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/core/src/components/textarea/textarea.interfaces.ts
git commit -m "feat: add ds-textarea interfaces (DS namespace)"
```

---

### Task 3: Write `textarea.tsx`

**Files:**
- Modify: `packages/core/src/components/textarea/textarea.tsx`

Replace the entire file. Key changes from the old `bal-textarea.tsx`:
- Decorator: `tag: 'ds-textarea'`, `shadow: true`, `formAssociated: true`
- Class implements `FormControlInterface<string | null>` + `Loggable` (instead of `FormInput` + `BalAriaFormLinking`)
- `FormControl` instance replaces all `inputHandle*` utilities
- `BEM` removed; elements use `id` attributes
- New props: `label`, `description`, `color`, `invalidText`
- Removed props: `clickable`, `autoInvalidOff` replaced by FormControl
- Events renamed: `balChange` → `dsChange` etc., plus new `dsClick`
- Render: `<label id="label">`, `<div id="container">`, `<textarea id="textarea" part="textarea">`, `<span id="description">`

`FormControlInterface` (from `packages/core/src/utils/form-control.ts`) requires these on the component:
`el`, `internals`, `disabled`, `readonly`, `focused`, `value`, `dsClick`, `dsFocus`, `dsBlur`, `dsInput`, `dsChange`

- [ ] **Step 1: Replace file content**

`packages/core/src/components/textarea/textarea.tsx`:
```tsx
import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import { AttachInternals, HTMLStencilElement } from '@stencil/core/internal'
import { ariaBooleanToString } from '../../utils/aria'
import { inheritAttributes } from '../../utils/attributes'
import { FormControl, FormControlInterface } from '../../utils/form-control'
import { debounceEvent } from '../../utils/helpers'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { defaultConfig, DsConfigState, DsLanguage, DsRegion, ListenToConfig } from '../../utils/config'
import { I18nDsLabel } from '../label/label.i18n'

@Component({
  tag: 'ds-textarea',
  styleUrl: 'textarea.host.scss',
  shadow: true,
  formAssociated: true,
})
export class Textarea implements ComponentInterface, FormControlInterface<string | null>, Loggable {
  private textareaId = `ds-textarea-${TextareaIds++}`
  private inheritedAttributes: { [k: string]: any } = {}
  private control = new FormControl(this)

  log!: LogInstance
  @Logger('textarea')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @State() focused = false
  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region

  @AttachInternals() internals!: ElementInternals

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The value of the textarea.
   */
  @Prop({ mutable: true, reflect: true }) value: string | null = null

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.textareaId

  /**
   * The label displayed above the textarea field.
   */
  @Prop() label?: string

  /**
   * The description displayed below the textarea field.
   */
  @Prop() description?: string

  /**
   * Defines the color state of the textarea.
   */
  @Prop() color: 'primary' | 'danger' | 'success' | 'warning' = 'primary'

  /**
   * Text shown in the description area when `invalid` is true.
   */
  @Prop() invalidText?: string

  /**
   * If `true` the component gets an invalid style.
   */
  @Prop() invalid = false

  /**
   * Indicates whether and how the text value should be automatically capitalized.
   */
  @Prop() autocapitalize = 'off'

  /**
   * Indicates whether the value of the control can be automatically completed by the browser.
   */
  @Prop() autocomplete: DS.InputAutocomplete = 'off'

  /**
   * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
   */
  @Prop() autofocus = false

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `dsChange` event after each keystroke.
   */
  @Prop() debounce = 0

  @Watch('debounce')
  protected debounceChanged() {
    this.dsChange = debounceEvent(this.dsChange, this.debounce)
  }

  /**
   * Instructional text that shows before the textarea has a value.
   */
  @Prop() placeholder?: string

  /**
   * Specifies the maximum number of characters that the user can enter.
   */
  @Prop() maxLength?: number

  /**
   * Specifies the minimum number of characters that the user can enter.
   */
  @Prop() minLength?: number

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form.
   */
  @Prop() disabled = false

  /**
   * If `true` the element can not be mutated, meaning the user can not edit the control.
   */
  @Prop() readonly = false

  /**
   * The visible width of the text control, in average character widths.
   */
  @Prop() cols?: number

  /**
   * The number of visible text lines for the control.
   */
  @Prop() rows?: number

  /**
   * Indicates how the control wraps text.
   */
  @Prop() wrap?: DS.TextareaWrap

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() required = true

  /**
   * A hint to the browser for which keyboard to display.
   */
  @Prop() inputmode?: DS.TextareaInputMode

  /**
   * If `true`, in Angular reactive forms the control will not be set invalid.
   */
  @Prop({ reflect: true }) autoInvalidOff = false

  /**
   * EVENTS
   * ------------------------------------------------------
   */

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() dsBlur!: EventEmitter<DS.TextareaBlurDetail>

  /**
   * Emitted when a keyboard key has been pressed.
   */
  @Event() dsKeyPress!: EventEmitter<DS.TextareaKeyPressDetail>

  /**
   * Emitted when the textarea has focus.
   */
  @Event() dsFocus!: EventEmitter<DS.TextareaFocusDetail>

  /**
   * Emitted when the textarea has been clicked.
   */
  @Event() dsClick!: EventEmitter<DS.TextareaClickDetail>

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() dsInput!: EventEmitter<DS.TextareaInputDetail>

  /**
   * Emitted when the textarea value has changed.
   */
  @Event() dsChange!: EventEmitter<DS.TextareaChangeDetail>

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    this.control.listenOnClick(ev)
  }

  @Listen('reset', { capture: true, target: 'document' })
  listenOnReset(ev: UIEvent) {
    this.control.listenOnReset(ev)
  }

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState): Promise<void> {
    this.language = state.language
    this.region = state.region
  }

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.debounceChanged()
    this.control.connectedCallback()
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title', 'data-hj-allow'])
  }

  componentDidLoad() {
    this.control.componentDidLoad()
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * Sets focus on the native `textarea` element.
   */
  @Method()
  async setFocus() {
    return this.control.setFocus()
  }

  /**
   * Sets blur on the native `textarea` element.
   * @internal
   */
  @Method()
  async setBlur() {
    return this.control.setBlur()
  }

  /**
   * Returns the native `<textarea>` element used under the hood.
   */
  @Method()
  getInputElement(): Promise<HTMLTextAreaElement> {
    return Promise.resolve(this.control.nativeEl as HTMLTextAreaElement)
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private handleClick = (ev: MouseEvent) => {
    this.control.onClick(ev)
  }

  private handleFocus = (ev: FocusEvent) => {
    this.control.onFocus(ev)
  }

  private handleBlur = (ev: FocusEvent) => {
    this.control.onBlur(ev)
  }

  private handleInput = (ev: InputEvent) => {
    this.control.onInput(ev)
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return (
      <Host
        aria-disabled={ariaBooleanToString(this.disabled)}
        class={{
          'ds-field': true,
          'is-disabled': this.disabled,
          'is-danger': this.color === 'danger' || this.invalid,
          'is-success': this.color === 'success' && !this.invalid,
          'is-warning': this.color === 'warning' && !this.invalid,
        }}
      >
        {/* ---------------------------------------- */}
        {/* Label                                    */}
        {/* ---------------------------------------- */}
        <label htmlFor="textarea" part="label" id="label">
          <slot name="label">{this.label}</slot>
          {this.required === false && <span>{I18nDsLabel[this.language].optional || ''}</span>}
        </label>

        {/* ---------------------------------------- */}
        {/* Textarea Container                       */}
        {/* ---------------------------------------- */}
        <div id="container">
          <textarea
            id="textarea"
            part="textarea"
            name={this.name}
            ref={el => (this.control.nativeEl = el)}
            aria-describedby="description"
            aria-invalid={this.invalid === true ? 'true' : 'false'}
            disabled={this.disabled}
            autoCapitalize={this.autocapitalize}
            autocomplete={this.autocomplete}
            autofocus={this.autofocus}
            minLength={this.minLength}
            maxLength={this.maxLength}
            placeholder={this.placeholder || ''}
            readonly={this.readonly}
            required={this.required}
            inputMode={this.inputmode}
            cols={this.cols}
            rows={this.rows}
            wrap={this.wrap}
            onClick={ev => this.handleClick(ev)}
            onFocus={ev => this.handleFocus(ev)}
            onBlur={ev => this.handleBlur(ev)}
            onInput={ev => this.handleInput(ev as InputEvent)}
            onKeyPress={ev => this.dsKeyPress.emit(ev)}
            {...this.inheritedAttributes}
          />
        </div>

        {/* ---------------------------------------- */}
        {/* Description                              */}
        {/* ---------------------------------------- */}
        <span id="description" part="description">
          {this.invalid && this.invalidText && <ds-icon name="alert"></ds-icon>}
          <slot name="description">{this.invalid && this.invalidText ? this.invalidText : this.description}</slot>
        </span>
      </Host>
    )
  }
}

let TextareaIds = 0
```

- [ ] **Step 2: Commit**

```bash
git add packages/core/src/components/textarea/textarea.tsx
git commit -m "feat: migrate bal-textarea to ds-textarea with shadow DOM and FormControl"
```

---

## Phase 2: Styles

### Task 4: Write `textarea.mixin.scss`

**Files:**
- Create: `packages/core/src/components/textarea/textarea.mixin.scss`

The container mixin is textarea-specific (top-aligned, no min-height, resize enabled). All other mixins delegate to `input.mixin.scss`.

- [ ] **Step 1: Create file**

`packages/core/src/components/textarea/textarea.mixin.scss`:
```scss
@use '@baloise/ds-styles/sass/mixins' as *;
@use '../../vars' as vars;
@use '../input/input.mixin' as input;

/**
 * Control Mixins (delegated to input.mixin)
 * --------------------------------
 */

@mixin vars($prefix) {
  @include input.vars($prefix);
}

@mixin style($prefix, $selector: '#textarea') {
  @include input.style($prefix, $selector);
}

/**
 * Container Mixins (textarea-specific)
 * --------------------------------
 * Same design tokens as input but:
 * - align-items: flex-start (text anchored to top)
 * - padding-block instead of fixed min-height
 * - resize: vertical on the native textarea
 */

@mixin vars-container($prefix) {
  @include input.vars-container($prefix);
}

@mixin container($prefix, $selector: '#container') {
  #{$selector} {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    align-items: flex-start;
    padding-block: 0.5rem;
    padding-inline: 0.5rem;
    gap: 0.25rem;

    background: var(--_#{$prefix}-container-background);
    border: var(--_#{$prefix}-container-border-width) solid var(--_#{$prefix}-container-border-color);
    border-radius: var(--_#{$prefix}-container-radius);

    @include hover {
      &:hover,
      &.is-hovered {
        background: var(--_#{$prefix}-container-hover-background);
        border-color: var(--_#{$prefix}-container-hover-border);
      }
    }

    &:active,
    &.is-pressed {
      background: var(--_#{$prefix}-container-active-background);
      border-color: var(--_#{$prefix}-container-active-border);
    }

    &:focus-within,
    &.is-focused {
      &:not(:active) {
        background: var(--_#{$prefix}-container-focus-background);
        border-color: var(--_#{$prefix}-container-focus-border);
      }
    }

    textarea {
      resize: vertical;
    }
  }
}

/**
 * Label Mixins (delegated to input.mixin)
 * --------------------------------
 */

@mixin vars-label($prefix) {
  @include input.vars-label($prefix);
}

@mixin label($prefix, $selector: 'label') {
  @include input.label($prefix, $selector);
}

/**
 * Description Mixins (delegated to input.mixin)
 * --------------------------------
 */

@mixin vars-description($prefix) {
  @include input.vars-description($prefix);
}

@mixin description($prefix, $selector: '#description') {
  @include input.description($prefix, $selector);
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/core/src/components/textarea/textarea.mixin.scss
git commit -m "feat: add textarea.mixin.scss with textarea-specific container"
```

---

### Task 5: Write `textarea.host.scss`

**Files:**
- Create: `packages/core/src/components/textarea/textarea.host.scss`

Shadow DOM styles. CSS variable prefix is `input` throughout — textarea reuses the same `--ds-input-*` design token space.

- [ ] **Step 1: Create file**

`packages/core/src/components/textarea/textarea.host.scss`:
```scss
@use '@baloise/ds-styles/sass/mixins' as *;
@use '../../vars' as vars;
@use './textarea.mixin' as textarea;

/**
 * Variables
 * --------------------------------
 */

:host {
  @include textarea.vars('input');
  @include textarea.vars-container('input');
  @include textarea.vars-label('input');
  @include textarea.vars-description('input');
}

/**
 * Basic Component Styles
 * --------------------------------
 */

:host {
  position: relative;
  display: grid;
  gap: 0.25rem;

  @include textarea.style('input', '#textarea');
  @include textarea.container('input');
  @include textarea.label('input');
  @include textarea.description('input');
}

/**
 * Variants and States
 * --------------------------------
 */

//
// Invalid or Color Danger
// --------------------------------
:host(.is-danger) {
  --mod-input-container-border-color: var(--ds-input-container-color-danger-border);
  --mod-input-description-color: var(--ds-input-description-color-danger);
  --mod-input-container-hover-border: var(--ds-input-container-color-danger-border);
  --mod-input-container-active-border: var(--ds-input-container-color-danger-border);
}

//
// Valid or Color Success
// --------------------------------
:host(.is-success) {
  --mod-input-container-border-color: var(--ds-input-container-color-success-border);
  --mod-input-description-color: var(--ds-input-description-color-success);
  --mod-input-container-hover-border: var(--ds-input-container-color-success-border);
  --mod-input-container-active-border: var(--ds-input-container-color-success-border);
}

//
// Color Warning
// --------------------------------
:host(.is-warning) {
  --mod-input-container-border-color: var(--ds-input-container-color-warning-border);
  --mod-input-description-color: var(--ds-input-description-color-warning);
  --mod-input-container-hover-border: var(--ds-input-container-color-warning-border);
  --mod-input-container-active-border: var(--ds-input-container-color-warning-border);
}

//
// Disabled
// --------------------------------
:host(.is-disabled) {
  &,
  #label,
  #description,
  #textarea {
    pointer-events: none;
    cursor: default;
  }

  --mod-input-container-background: var(--ds-input-container-color-disabled-background);
  --mod-input-container-border-color: var(--ds-input-container-color-disabled-border);
  --mod-input-label-color: var(--ds-input-label-color-disabled);
  --mod-input-description-color: var(--ds-input-description-color-disabled);

  --mod-input-color: var(--ds-input-control-color-value-disabled);
  --mod-input-placeholder: var(--ds-input-control-color-placeholder-disabled);
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/core/src/components/textarea/textarea.host.scss
git commit -m "feat: add textarea.host.scss shadow DOM styles"
```

---

### Task 6: Write `textarea.style.scss`

**Files:**
- Create: `packages/core/src/components/textarea/textarea.style.scss`

CSS-only / hybrid mode. Targets class selectors (`.field`, `.textarea`, `.label`, `.help`) matching the global stylesheet pattern.

- [ ] **Step 1: Create file**

`packages/core/src/components/textarea/textarea.style.scss`:
```scss
@use '@baloise/ds-styles/sass/mixins' as *;
@use '../../vars' as vars;
@use './textarea.mixin' as textarea;

$use-host: false !default;

/**
 * Variables
 * --------------------------------
 */

.field {
  @include textarea.vars('input');
  @include textarea.vars-container('input');
  @include textarea.vars-label('input');
  @include textarea.vars-description('input');
}

/**
 * Basic Component Styles
 * --------------------------------
 */

.field {
  position: relative;
  display: grid;
  gap: 0.25rem;

  @include textarea.style('input', '.textarea');
  @include textarea.container('input', '.control');
  @include textarea.label('input', '.label');
  @include textarea.description('input', '.help');
}

/**
 * Variants and States
 * --------------------------------
 */

//
// Invalid or Color Danger
// --------------------------------
.field.is-invalid,
.field.is-danger {
  --mod-input-container-border-color: var(--ds-input-container-color-danger-border);
  --mod-input-description-color: var(--ds-input-description-color-danger);
  --mod-input-container-hover-border: var(--ds-input-container-color-danger-border);
  --mod-input-container-active-border: var(--ds-input-container-color-danger-border);
}

//
// Valid or Color Success
// --------------------------------
.field.is-valid,
.field.is-success {
  --mod-input-container-border-color: var(--ds-input-container-color-success-border);
  --mod-input-description-color: var(--ds-input-description-color-success);
  --mod-input-container-hover-border: var(--ds-input-container-color-success-border);
  --mod-input-container-active-border: var(--ds-input-container-color-success-border);
}

//
// Color Warning
// --------------------------------
.field.is-warning {
  --mod-input-container-border-color: var(--ds-input-container-color-warning-border);
  --mod-input-description-color: var(--ds-input-description-color-warning);
  --mod-input-container-hover-border: var(--ds-input-container-color-warning-border);
  --mod-input-container-active-border: var(--ds-input-container-color-warning-border);
}

//
// Disabled
// --------------------------------
.field.is-disabled {
  &,
  .label,
  .help,
  .textarea {
    pointer-events: none;
    cursor: default;
  }

  --mod-input-container-background: var(--ds-input-container-color-disabled-background);
  --mod-input-container-border-color: var(--ds-input-container-color-disabled-border);
  --mod-input-label-color: var(--ds-input-label-color-disabled);
  --mod-input-description-color: var(--ds-input-description-color-disabled);

  --mod-input-color: var(--ds-input-control-color-value-disabled);
  --mod-input-placeholder: var(--ds-input-control-color-placeholder-disabled);
}

//
// Default spacing between multiple fields
// --------------------------------
.field + .field,
.ds-field + .ds-field {
  margin-top: 0.5rem;
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/core/src/components/textarea/textarea.style.scss
git commit -m "feat: add textarea.style.scss for CSS-only hybrid mode"
```

---

### Task 7: Verify the component builds

**Files:** none — verification checkpoint only

- [ ] **Step 1: Start the dev server**

```bash
npm start
```

Expected: Stencil compiler runs without errors. Watch for any TypeScript errors related to `FormControlInterface` — the component must implement `dsClick`, `dsChange`, `dsInput`, `dsBlur`, `dsFocus` events and `el`, `internals`, `disabled`, `readonly`, `focused`, `value` properties.

- [ ] **Step 2: Verify `ds-textarea` is registered**

Open browser at `http://localhost:3333`. The component should be available in the custom elements registry.

- [ ] **Step 3: Fix any TypeScript errors before continuing**

Common issues:
- Missing `dsClick` event — add `@Event() dsClick!: EventEmitter<DS.TextareaClickDetail>`
- `FormControlInterface` property mismatch — check `packages/core/src/utils/form-control.ts` for the exact interface

---

## Phase 3: Tests

### Task 8: Create `textarea.po.ts` and export it

**Files:**
- Create: `packages/playwright/src/lib/components/textarea.po.ts`
- Modify: `packages/playwright/src/lib/components/index.ts`

- [ ] **Step 1: Create PO file**

`packages/playwright/src/lib/components/textarea.po.ts`:
```ts
import { expect, Locator } from '@playwright/test'
import { E2ELocator } from '../page/utils'
import { PageObject } from './page-object'

export class DsTextarea extends PageObject {
  readonly nativeTextarea: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.nativeTextarea = el.locator('[part="textarea"]')
  }

  async fill(value: string) {
    await this.nativeTextarea.fill(value)
  }

  async blur() {
    await this.nativeTextarea.blur()
  }

  async assertValue(value: string) {
    await expect(this.nativeTextarea).toHaveValue(value)
  }

  async assertToBeDisabled() {
    await expect(this.nativeTextarea).toBeDisabled()
  }
}
```

- [ ] **Step 2: Add export to index**

In `packages/playwright/src/lib/components/index.ts`, add this line (keep alphabetical order with the other exports):
```ts
export * from './textarea.po'
```

- [ ] **Step 3: Commit**

```bash
git add packages/playwright/src/lib/components/textarea.po.ts \
        packages/playwright/src/lib/components/index.ts
git commit -m "feat: add DsTextarea page object"
```

---

### Task 9: Write and run `textarea.component.play.ts`

**Files:**
- Create: `packages/core/src/components/textarea/test/textarea.component.play.ts`

`page.mount` must be inside each individual test, never in `beforeEach` — this is a known constraint of the test harness.

- [ ] **Step 1: Create file**

`packages/core/src/components/textarea/test/textarea.component.play.ts`:
```ts
import { DsTextarea, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should fire dsInput on fill', async ({ page }) => {
    await page.mount(`<ds-textarea label="Label"></ds-textarea>`)
    const textarea = new DsTextarea(page.locator('ds-textarea'))
    const inputSpy = await textarea.el.spyOnEvent('dsInput')

    await textarea.fill('hello')

    expect(inputSpy).toHaveReceivedEventTimes(1)
    expect(inputSpy).toHaveReceivedEventDetail('hello')
  })

  test('should fire dsChange with value on blur', async ({ page }) => {
    await page.mount(`<ds-textarea label="Label"></ds-textarea>`)
    const textarea = new DsTextarea(page.locator('ds-textarea'))
    const changeSpy = await textarea.el.spyOnEvent('dsChange')

    await textarea.fill('hello')
    await textarea.blur()

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail('hello')
  })

  test('should not fire dsChange when value is unchanged on blur', async ({ page }) => {
    await page.mount(`<ds-textarea label="Label" value="hello"></ds-textarea>`)
    const textarea = new DsTextarea(page.locator('ds-textarea'))
    const changeSpy = await textarea.el.spyOnEvent('dsChange')

    await textarea.nativeTextarea.focus()
    await textarea.blur()

    expect(changeSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('disabled', () => {
  test('native textarea should be disabled', async ({ page }) => {
    await page.mount(`<ds-textarea label="Label" value="Fixed" disabled></ds-textarea>`)
    const textarea = new DsTextarea(page.locator('ds-textarea'))
    const inputSpy = await textarea.el.spyOnEvent('dsInput')

    await textarea.assertToBeDisabled()
    expect(inputSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('form reset', () => {
  test('should reset to initial value', async ({ page }) => {
    await page.mount(`
      <form>
        <ds-textarea name="notes" label="Notes" value="Initial value"></ds-textarea>
        <button type="reset" data-testid="reset">Reset</button>
      </form>
    `)
    const textarea = new DsTextarea(page.locator('ds-textarea'))
    const changeSpy = await textarea.el.spyOnEvent('dsChange')

    await textarea.fill('Changed value')
    await textarea.blur()
    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail('Changed value')

    await page.getByTestId('reset').click()
    await textarea.assertValue('Initial value')
  })
})
```

- [ ] **Step 2: Run the tests**

```bash
npm run play
```

Open the Playwright UI, find `textarea.component.play.ts`, run all tests. Expected: all pass.

- [ ] **Step 3: Commit**

```bash
git add packages/core/src/components/textarea/test/textarea.component.play.ts
git commit -m "test: add ds-textarea component interaction tests"
```

---

### Task 10: Write and run `textarea.a11y.play.ts`

**Files:**
- Create: `packages/core/src/components/textarea/test/textarea.a11y.play.ts`

- [ ] **Step 1: Create file**

`packages/core/src/components/textarea/test/textarea.a11y.play.ts`:
```ts
import { test } from '@baloise/ds-playwright'

test('default', async ({ page, a11y }) => {
  await page.mount(`<ds-textarea label="Label" description="Description"></ds-textarea>`)
  await a11y('ds-textarea')
})

test('with placeholder', async ({ page, a11y }) => {
  await page.mount(`<ds-textarea label="Label" placeholder="Placeholder"></ds-textarea>`)
  await a11y('ds-textarea')
})

test('with value', async ({ page, a11y }) => {
  await page.mount(`<ds-textarea label="Label" value="Value"></ds-textarea>`)
  await a11y('ds-textarea')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`<ds-textarea label="Label" value="Value" disabled></ds-textarea>`)
  await a11y('ds-textarea')
})

test('invalid', async ({ page, a11y }) => {
  await page.mount(`<ds-textarea label="Label" value="Value" invalid invalid-text="Validation Error"></ds-textarea>`)
  await a11y('ds-textarea')
})

test('success', async ({ page, a11y }) => {
  await page.mount(`<ds-textarea label="Label" value="Value" color="success"></ds-textarea>`)
  await a11y('ds-textarea')
})

test('warning', async ({ page, a11y }) => {
  await page.mount(`<ds-textarea label="Label" value="Value" color="warning"></ds-textarea>`)
  await a11y('ds-textarea')
})
```

- [ ] **Step 2: Run tests**

```bash
npm run play
```

Open Playwright UI, find `textarea.a11y.play.ts`, run all. Expected: all pass (WCAG 2.1 AA).

- [ ] **Step 3: Commit**

```bash
git add packages/core/src/components/textarea/test/textarea.a11y.play.ts
git commit -m "test: add ds-textarea accessibility tests"
```

---

### Task 11: Write visual HTML fixtures

**Files:**
- Modify: `packages/core/src/components/textarea/test/textarea.visual.html` (replace the copied old content)
- Create: `packages/core/src/components/textarea/test/textarea.style.html`

- [ ] **Step 1: Overwrite `textarea.visual.html`**

`packages/core/src/components/textarea/test/textarea.visual.html`:
```html
<!doctype html>
<html dir="ltr" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <link rel="stylesheet" href="/assets/section.css" />
    <link rel="stylesheet" href="/assets/styles/design-system.local.min.css" />
    <script type="module" src="/build/design-system.esm.js"></script>
    <script nomodule src="/build/design-system.js"></script>
  </head>
  <body>
    <main class="container">
      <!-- Basic -->
      <section data-testid="basic">
        <span>Basic</span>
        <ds-textarea label="Label 1" required="false"></ds-textarea>
        <ds-textarea label="Label 1" description="Description 1"></ds-textarea>
        <ds-textarea label="Label 2" description="Description 2" placeholder="Placeholder"></ds-textarea>
        <ds-textarea label="Label 3" description="Description 3" value="Value"></ds-textarea>
      </section>

      <!-- Disabled -->
      <section data-testid="disabled">
        <span>Disabled</span>
        <ds-textarea label="Label 1" description="Description 1" disabled></ds-textarea>
        <ds-textarea label="Label 2" description="Description 2" placeholder="Placeholder" disabled></ds-textarea>
        <ds-textarea label="Label 3" description="Description 3" value="Value" disabled></ds-textarea>
      </section>

      <!-- Invalid -->
      <section data-testid="invalid">
        <span>Invalid</span>
        <ds-textarea label="Label 1" description="Description 1" invalid-text="Validation Error 1" invalid></ds-textarea>
        <ds-textarea
          label="Label 2"
          description="Description 2"
          placeholder="Placeholder"
          invalid-text="Validation Error 2"
          invalid
        ></ds-textarea>
        <ds-textarea
          label="Label 3"
          description="Description 3"
          value="Value"
          invalid-text="Validation Error 3"
          invalid
        ></ds-textarea>
      </section>

      <!-- Valid -->
      <section data-testid="valid">
        <span>Valid</span>
        <ds-textarea label="Label 1" description="Description 1" color="success"></ds-textarea>
        <ds-textarea label="Label 2" description="Description 2" placeholder="Placeholder" color="success"></ds-textarea>
        <ds-textarea label="Label 3" description="Description 3" value="Value" color="success"></ds-textarea>
      </section>

      <!-- Warning -->
      <section data-testid="warning">
        <span>Warning</span>
        <ds-textarea label="Label 1" description="Description 1" color="warning"></ds-textarea>
        <ds-textarea label="Label 2" description="Description 2" placeholder="Placeholder" color="warning"></ds-textarea>
        <ds-textarea label="Label 3" description="Description 3" value="Value" color="warning"></ds-textarea>
      </section>

      <!-- Rows -->
      <section data-testid="rows">
        <span>Rows</span>
        <ds-textarea label="Label" description="6 rows" rows="6"></ds-textarea>
        <ds-textarea label="Label" description="2 rows" rows="2" value="Short text"></ds-textarea>
      </section>

      <!-- Long Content -->
      <section data-testid="long-content">
        <span>Long Content</span>
        <ds-textarea
          label="Label Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
          description="Description Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore."
          value="Value Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat."
        ></ds-textarea>
      </section>
    </main>
  </body>
</html>
```

- [ ] **Step 2: Create `textarea.style.html`**

`packages/core/src/components/textarea/test/textarea.style.html`:
```html
<!doctype html>
<html dir="ltr" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <link rel="stylesheet" href="/assets/section.css" />
    <link rel="stylesheet" href="/assets/styles/design-system.local.min.css" />
    <script type="module" src="/build/design-system.esm.js"></script>
    <script nomodule src="/build/design-system.js"></script>
  </head>
  <body>
    <main class="container">
      <!-- Basic -->
      <section data-testid="basic">
        <span>Basic</span>
        <div class="field">
          <label class="label">Label</label>
          <div class="control">
            <textarea class="textarea"></textarea>
          </div>
          <p class="help">Description</p>
        </div>
        <div class="field">
          <label class="label">Label</label>
          <div class="control">
            <textarea class="textarea" placeholder="Placeholder"></textarea>
          </div>
          <p class="help">Description</p>
        </div>
        <div class="field">
          <label class="label">Label</label>
          <div class="control">
            <textarea class="textarea">Value</textarea>
          </div>
          <p class="help">Description</p>
        </div>
      </section>

      <!-- Disabled -->
      <section data-testid="disabled">
        <span>Disabled</span>
        <div class="field is-disabled">
          <label class="label">Label</label>
          <div class="control">
            <textarea class="textarea" disabled></textarea>
          </div>
          <p class="help">Description</p>
        </div>
        <div class="field is-disabled">
          <label class="label">Label</label>
          <div class="control">
            <textarea class="textarea" placeholder="Placeholder" disabled></textarea>
          </div>
          <p class="help">Description</p>
        </div>
        <div class="field is-disabled">
          <label class="label">Label</label>
          <div class="control">
            <textarea class="textarea" disabled>Value</textarea>
          </div>
          <p class="help">Description</p>
        </div>
      </section>

      <!-- Invalid -->
      <section data-testid="invalid">
        <span>Invalid</span>
        <div class="field is-danger">
          <label class="label">Label</label>
          <div class="control">
            <textarea class="textarea"></textarea>
          </div>
          <p class="help">Validation Error</p>
        </div>
        <div class="field is-danger">
          <label class="label">Label</label>
          <div class="control">
            <textarea class="textarea" placeholder="Placeholder"></textarea>
          </div>
          <p class="help">Validation Error</p>
        </div>
        <div class="field is-danger">
          <label class="label">Label</label>
          <div class="control">
            <textarea class="textarea">Value</textarea>
          </div>
          <p class="help">Validation Error</p>
        </div>
      </section>

      <!-- Valid -->
      <section data-testid="valid">
        <span>Valid</span>
        <div class="field is-success">
          <label class="label">Label</label>
          <div class="control">
            <textarea class="textarea"></textarea>
          </div>
          <p class="help">Description</p>
        </div>
      </section>

      <!-- Warning -->
      <section data-testid="warning">
        <span>Warning</span>
        <div class="field is-warning">
          <label class="label">Label</label>
          <div class="control">
            <textarea class="textarea"></textarea>
          </div>
          <p class="help">Description</p>
        </div>
      </section>
    </main>
  </body>
</html>
```

- [ ] **Step 3: Commit**

```bash
git add packages/core/src/components/textarea/test/textarea.visual.html \
        packages/core/src/components/textarea/test/textarea.style.html
git commit -m "feat: add textarea visual and style HTML fixtures"
```

---

### Task 12: Write and run `textarea.visual.play.ts`

**Files:**
- Modify: `packages/core/src/components/textarea/test/textarea.visual.play.ts` (replace old bal-textarea content)

- [ ] **Step 1: Overwrite file**

`packages/core/src/components/textarea/test/textarea.visual.play.ts`:
```ts
import { expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'ds-textarea'
const VARIANTS = ['basic', 'disabled', 'invalid', 'valid', 'warning', 'rows', 'long-content']

const image = screenshot(TAG)

test.describe('style', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/${TAG}/test/${TAG}.style.html`)
  })

  VARIANTS.filter(v => !['rows', 'long-content'].includes(v)).forEach(variant => {
    test(variant, async ({ page }) => {
      const el = page.getByTestId(variant)
      await expectScreenshot(el, image(`style-${variant}`))
    })
  })
})

test.describe('host', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
  })

  VARIANTS.forEach(variant => {
    test(variant, async ({ page }) => {
      const el = page.getByTestId(variant)
      await expectScreenshot(el, image(variant))
    })
  })
})
```

- [ ] **Step 2: Run the visual tests to generate baseline screenshots**

```bash
npm run play
```

Open Playwright UI, find `textarea.visual.play.ts`. Run all tests. On first run they will generate baseline screenshots — this is expected. Verify the screenshots look correct in the Playwright UI viewer.

- [ ] **Step 3: Commit**

```bash
git add packages/core/src/components/textarea/test/textarea.visual.play.ts
git commit -m "test: add ds-textarea visual regression tests"
```

---

## Phase 4: Docs

### Task 13: Write `textarea.stories.ts`

**Files:**
- Create: `docs/src/components/textarea/` (directory)
- Create: `docs/src/components/textarea/textarea.stories.ts`

Pattern: mirrors `docs/src/components/input/input.stories.ts`. Each visual section needs both a web-component story (`🧩`) and an HTML story (`🌍`) so the MDX can use `BasicStoryTabs`.

- [ ] **Step 1: Create directory and file**

```bash
mkdir -p docs/src/components/textarea
```

`docs/src/components/textarea/textarea.stories.ts`:
```ts
import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsTextarea

const tag = 'ds-textarea'

const meta: Meta<Args> = {
  title: 'Components/Form/Textarea',
  args: {},
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(({ ...args }) => `<ds-textarea ${props(args)}></ds-textarea>`),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  ...withRender(
    () => `
<ds-textarea label="Label" description="Description" placeholder="Enter text here"></ds-textarea>
<ds-textarea label="Label" description="Description" placeholder="Enter text here" required="false"></ds-textarea>
`,
  ),
})
Basic.storyName = '🧩 Basic'

export const BasicHtml = Story({
  ...withRender(
    () => `
<div class="field">
  <label class="label">Label</label>
  <div class="control">
    <textarea class="textarea" placeholder="Enter text here"></textarea>
  </div>
  <p class="help">Description</p>
</div>
`,
  ),
})
BasicHtml.storyName = '🌍 Basic'

export const Disabled = Story({
  ...withRender(
    () => `
<ds-textarea label="Label" description="Description" placeholder="Placeholder" disabled></ds-textarea>
<ds-textarea label="Label" description="Description" value="Value" disabled></ds-textarea>
`,
  ),
})
Disabled.storyName = '🧩 Disabled'

export const DisabledHtml = Story({
  ...withRender(
    () => `
<div class="field is-disabled">
  <label class="label">Label</label>
  <div class="control">
    <textarea class="textarea" placeholder="Placeholder" disabled></textarea>
  </div>
  <p class="help">Description</p>
</div>
<div class="field is-disabled">
  <label class="label">Label</label>
  <div class="control">
    <textarea class="textarea" disabled>Value</textarea>
  </div>
  <p class="help">Description</p>
</div>
`,
  ),
})
DisabledHtml.storyName = '🌍 Disabled'

export const Invalid = Story({
  ...withRender(
    () => `
<ds-textarea label="Label" description="Description" invalid-text="Validation Error" invalid></ds-textarea>
<ds-textarea label="Label" description="Description" value="Value" invalid-text="Validation Error" invalid></ds-textarea>
`,
  ),
})
Invalid.storyName = '🧩 Invalid'

export const InvalidHtml = Story({
  ...withRender(
    () => `
<div class="field is-danger">
  <label class="label">Label</label>
  <div class="control">
    <textarea class="textarea"></textarea>
  </div>
  <p class="help">Validation Error</p>
</div>
`,
  ),
})
InvalidHtml.storyName = '🌍 Invalid'

export const Valid = Story({
  ...withRender(
    () => `
<ds-textarea label="Label" description="Description" color="success"></ds-textarea>
<ds-textarea label="Label" description="Description" value="Value" color="success"></ds-textarea>
`,
  ),
})
Valid.storyName = '🧩 Valid'

export const ValidHtml = Story({
  ...withRender(
    () => `
<div class="field is-success">
  <label class="label">Label</label>
  <div class="control">
    <textarea class="textarea">Value</textarea>
  </div>
  <p class="help">Description</p>
</div>
`,
  ),
})
ValidHtml.storyName = '🌍 Valid'

export const Warning = Story({
  ...withRender(
    () => `
<ds-textarea label="Label" description="Description" color="warning"></ds-textarea>
<ds-textarea label="Label" description="Description" value="Value" color="warning"></ds-textarea>
`,
  ),
})
Warning.storyName = '🧩 Warning'

export const WarningHtml = Story({
  ...withRender(
    () => `
<div class="field is-warning">
  <label class="label">Label</label>
  <div class="control">
    <textarea class="textarea">Value</textarea>
  </div>
  <p class="help">Description</p>
</div>
`,
  ),
})
WarningHtml.storyName = '🌍 Warning'

export const Rows = Story({
  ...withRender(
    () => `
<ds-textarea label="Label" description="6 rows" rows="6"></ds-textarea>
<ds-textarea label="Label" description="2 rows" rows="2" value="Short text"></ds-textarea>
`,
  ),
})
Rows.storyName = '🧩 Rows'
```

- [ ] **Step 2: Commit**

```bash
git add docs/src/components/textarea/textarea.stories.ts
git commit -m "feat: add ds-textarea Storybook stories"
```

---

### Task 14: Write `textarea.mdx`

**Files:**
- Create: `docs/src/components/textarea/textarea.mdx`

Pattern: mirrors `docs/src/components/input/input.mdx`. Uses `BasicStoryTabs` for sections that have both web-component and HTML variants.

- [ ] **Step 1: Create file**

`docs/src/components/textarea/textarea.mdx`:
```mdx
import { Canvas, Markdown, Meta } from '@storybook/addon-docs/blocks'
import { Banner, BasicStoryTabs, Footer, Lead, PlaygroundBar, StoryHeading, TokenOverview } from '../../../.storybook/blocks'
import * as TextareaStories from './textarea.stories'

<Meta of={TextareaStories} />

<StoryHeading of={TextareaStories.Basic} hidden></StoryHeading>

<Banner of={TextareaStories} />

<Lead>**Textarea** is a form field component that allows users to enter and edit multi-line text.</Lead>

<BasicStoryTabs tag="textarea" htmlStory={TextareaStories.BasicHtml} webComponentStory={TextareaStories.Basic} index={1} />

<PlaygroundBar of={TextareaStories.Basic}></PlaygroundBar>

{/* ------------------------------------------------------ */}

<StoryHeading of={TextareaStories.Disabled}></StoryHeading>

<BasicStoryTabs tag="textarea" htmlStory={TextareaStories.DisabledHtml} webComponentStory={TextareaStories.Disabled} index={1} noGuide />

{/* ------------------------------------------------------ */}

<StoryHeading of={TextareaStories.Invalid}></StoryHeading>

<BasicStoryTabs tag="textarea" htmlStory={TextareaStories.InvalidHtml} webComponentStory={TextareaStories.Invalid} index={1} noGuide />

{/* ------------------------------------------------------ */}

<StoryHeading of={TextareaStories.Valid}></StoryHeading>

<BasicStoryTabs tag="textarea" htmlStory={TextareaStories.ValidHtml} webComponentStory={TextareaStories.Valid} index={1} noGuide />

{/* ------------------------------------------------------ */}

<StoryHeading of={TextareaStories.Warning}></StoryHeading>

<BasicStoryTabs tag="textarea" htmlStory={TextareaStories.WarningHtml} webComponentStory={TextareaStories.Warning} index={1} noGuide />

{/* ------------------------------------------------------ */}

<StoryHeading of={TextareaStories.Rows}></StoryHeading>

<Canvas of={TextareaStories.Rows} sourceState={'shown'} />

{/* ------------------------------------------------------ */}

## Component API

import api from './api.md?raw'

<Markdown>{api}</Markdown>

## CSS Variables

<TokenOverview component="textarea" />

## Integration

import integration from '../../snippets/integration.md?raw'

<Markdown>{integration}</Markdown>

<Footer />
```

- [ ] **Step 2: Commit**

```bash
git add docs/src/components/textarea/textarea.mdx
git commit -m "feat: add ds-textarea Storybook MDX documentation"
```

---

### Task 15: Delete the old `bal-textarea` directory

**Files:**
- Delete: `packages/core/src/components/bal-textarea/` (entire directory)

- [ ] **Step 1: Delete**

```bash
rm -rf packages/core/src/components/bal-textarea
```

- [ ] **Step 2: Verify build still works**

```bash
npm run build
```

Expected: builds without errors. If anything still references `bal-textarea`, fix those references before committing.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove old bal-textarea component"
```

---

## Phase 5: Migration Skill

### Task 16: Write the `migrate-component` Claude skill

**Files:**
- Create: `/Users/hirsch/.claude/plugins/cache/claude-plugins-official/superpowers/5.0.7/skills/migrate-component.md`

This skill teaches Claude how to migrate any `bal-*` component to the `ds-*` DS standard using `bal-textarea` → `ds-textarea` as the canonical reference. It must be added to the superpowers plugin manifest so the skill tool can discover it.

- [ ] **Step 1: Check the plugin manifest for how skills are registered**

```bash
ls /Users/hirsch/.claude/plugins/cache/claude-plugins-official/superpowers/5.0.7/
cat /Users/hirsch/.claude/plugins/cache/claude-plugins-official/superpowers/5.0.7/plugin.json 2>/dev/null \
  || cat /Users/hirsch/.claude/plugins/cache/claude-plugins-official/superpowers/5.0.7/manifest.json 2>/dev/null \
  || ls /Users/hirsch/.claude/plugins/cache/claude-plugins-official/superpowers/5.0.7/skills/
```

Understand how existing skills (e.g. `write-component-docs`) are registered in the manifest. You need to add `migrate-component` in the same way.

- [ ] **Step 2: Create the skill file**

`/Users/hirsch/.claude/plugins/cache/claude-plugins-official/superpowers/5.0.7/skills/migrate-component.md`:
```markdown
---
name: migrate-component
description: >
  Migrate a `bal-*` Stencil component to the `ds-*` DS standard.
  Covers: file rename, shadow DOM, FormControl, BEM removal,
  interfaces namespace, SCSS (host + style + mixin), and all test/docs files.
trigger: >
  Use when the user asks to migrate a bal- component, or when working in
  packages/core/src/components/bal-*/
---

# Migrating a `bal-*` Component to DS Standard

Reference migration: `bal-textarea` → `ds-textarea`
Reference plan: `docs/superpowers/plans/2026-04-16-textarea-migration.md`

## Overview

Each `bal-*` component must be migrated to the new DS standard:

1. **File rename** — Remove `bal-` prefix from directory and all files
2. **Component decorator** — `tag: 'ds-<name>'`, `shadow: true`, `formAssociated: true`
3. **FormControl** — Replace `FormInput` + `inputHandle*` utils with `new FormControl(this)`
4. **No BEM** — Remove `BEM` import. Use `id` attributes on internal elements (`id="container"`, `id="label"`, `id="description"`, `id="<native-element>"`). Use `part` attributes for CSS part piercing.
5. **Interfaces** — Rename `BalProps`/`BalEvents` namespaces to `DS`. Types like `BalTextareaWrap` → `DS.TextareaWrap`.
6. **New props** — Add `label`, `description`, `color` (`'primary' | 'danger' | 'success' | 'warning'`), `invalidText`
7. **Events** — Rename `bal*` → `ds*` events. Add `dsClick` (required by `FormControlInterface`).
8. **SCSS** — Create `<name>.mixin.scss`, `<name>.host.scss`, `<name>.style.scss`
9. **Tests** — Create `<name>.component.play.ts`, `<name>.a11y.play.ts`, rewrite `<name>.visual.play.ts`
10. **HTML fixtures** — Rewrite `<name>.visual.html`, create `<name>.style.html`
11. **PO** — Create `<name>.po.ts` in `packages/playwright/src/lib/components/`, export from `index.ts`
12. **Storybook** — Create `<name>.stories.ts` and `<name>.mdx` in `docs/src/components/<name>/`
13. **Delete** — Remove old `bal-<name>/` directory after verifying the build

## FormControlInterface Requirements

The component class must provide these members (checked by TypeScript):

```ts
el: HTMLStencilElement           // @Element()
internals: ElementInternals      // @AttachInternals()
disabled: boolean                // @Prop()
readonly: boolean                // @Prop()
focused: boolean                 // @State()
value: Value                     // @Prop({ mutable: true, reflect: true })
dsClick: EventEmitter<MouseEvent>
dsFocus: EventEmitter<FocusEvent>
dsBlur: EventEmitter<FocusEvent>
dsInput: EventEmitter<ReturnValue>
dsChange: EventEmitter<ReturnValue>
```

Source of truth: `packages/core/src/utils/form-control.ts`

## Host Class Pattern

```tsx
<Host class={{
  'ds-field': true,
  'is-disabled': this.disabled,
  'is-danger': this.color === 'danger' || this.invalid,
  'is-success': this.color === 'success' && !this.invalid,
  'is-warning': this.color === 'warning' && !this.invalid,
}}>
```

## SCSS Variable Prefix

All CSS variables use the `input` prefix even for non-input components — they share the same `--ds-input-*` design token space. Only create new tokens if the component has genuinely different visual properties.

```scss
// In host.scss state variants:
:host(.is-danger) {
  --mod-input-container-border-color: var(--ds-input-container-color-danger-border);
  --mod-input-description-color: var(--ds-input-description-color-danger);
  --mod-input-container-hover-border: var(--ds-input-container-color-danger-border);
  --mod-input-container-active-border: var(--ds-input-container-color-danger-border);
}
```

## Mixin Strategy

- `<name>.mixin.scss` imports `input.mixin.scss` and delegates unchanged mixins (`vars`, `style`, `vars-label`, `label`, `vars-description`, `description`)
- Only implement a new `container` mixin if the layout differs from input (e.g. textarea needs `align-items: flex-start` + `resize: vertical`)
- If the container is identical to input, skip `<name>.mixin.scss` and import `input.mixin` directly in `host.scss`/`style.scss`

## Test Rules

- `page.mount()` must be inside each individual test — **never in `beforeEach`**
- Component play tests verify: `dsInput` on fill, `dsChange` on blur, no `dsChange` when unchanged, disabled state, form reset
- A11y tests mount each state: default, placeholder, value, disabled, invalid, success, warning
- Visual play tests use two `describe` blocks: `style` (loads `style.html`) and `host` (loads `visual.html`)

## Execution

Use the implementation plan at `docs/superpowers/plans/2026-04-16-textarea-migration.md` as the step-by-step reference. Adapt file names and component-specific props for each new migration.
```

- [ ] **Step 3: Register the skill in the manifest**

Add `migrate-component` to the plugin's skill list in the same way existing skills are listed. The exact format depends on what you found in Step 1. For example, if skills are listed in `plugin.json`:

```json
{
  "skills": [
    "...",
    "migrate-component"
  ]
}
```

- [ ] **Step 4: Verify the skill appears**

Start a new Claude Code session and check that `superpowers:migrate-component` appears in the available skills list.

- [ ] **Step 5: Commit the plan**

```bash
git add docs/superpowers/plans/2026-04-16-textarea-migration.md
git commit -m "docs: add textarea migration implementation plan"
```

---

## Self-Review Notes

**Spec coverage check:**
- ✅ File structure (Task 1)
- ✅ `textarea.interfaces.ts` — DS namespace (Task 2)
- ✅ `textarea.tsx` — shadow DOM, FormControl, BEM removal, new props, events (Task 3)
- ✅ `textarea.mixin.scss` — own container, delegates rest (Task 4)
- ✅ `textarea.host.scss` — shadow DOM styles with all state variants (Task 5)
- ✅ `textarea.style.scss` — CSS-only hybrid mode (Task 6)
- ✅ Build verification (Task 7)
- ✅ `textarea.po.ts` + playwright index export (Task 8)
- ✅ `textarea.component.play.ts` — all 5 scenarios (Task 9)
- ✅ `textarea.a11y.play.ts` — all 7 states (Task 10)
- ✅ `textarea.visual.html` + `textarea.style.html` — all sections (Task 11)
- ✅ `textarea.visual.play.ts` — style + host describe blocks (Task 12)
- ✅ `textarea.stories.ts` — all stories with HTML pairs (Task 13)
- ✅ `textarea.mdx` (Task 14)
- ✅ Delete old `bal-textarea/` (Task 15)
- ✅ Migration skill (Task 16)
