# Number Input Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate `bal-number-input` to `ds-number-input` following the DS standard established by `ds-input` and `ds-textarea`, using Approach A (Partial FormControl) for numeric event handling.

**Architecture:** `FormControl` is used for lifecycle/focus/click plumbing only. All numeric event handling (`handleInput`, `handleFocus`, `handleBlur`, `handleKeydown`) is written custom and calls `control.setValue()` directly in `handleBlur`. The component maintains two parallel states: `value: number | null` (the semantic numeric value) and `nativeInputValue: string` (the formatted display string). No `number-input.mixin.scss` is needed — `input.mixin.scss` is imported directly.

**Tech Stack:** Stencil.js, SCSS, Playwright (`@baloise/ds-playwright`), Storybook (`@storybook/html-vite`), TypeScript, lodash

---

## File Map

| Action | Path |
|---|---|
| Create | `packages/core/src/components/number-input/number-input.tsx` |
| Create | `packages/core/src/components/number-input/number-input.interfaces.ts` |
| Create | `packages/core/src/components/number-input/number-input.utils.ts` |
| Create | `packages/core/src/components/number-input/number-input.utils.spec.ts` |
| Create | `packages/core/src/components/number-input/number-input.host.scss` |
| Create | `packages/core/src/components/number-input/number-input.style.scss` |
| Create | `packages/core/src/components/number-input/test/number-input.visual.html` |
| Create | `packages/core/src/components/number-input/test/number-input.style.html` |
| Create | `packages/core/src/components/number-input/test/number-input.visual.play.ts` |
| Create | `packages/core/src/components/number-input/test/number-input.a11y.play.ts` |
| Create | `packages/core/src/components/number-input/test/number-input.component.play.ts` |
| Create | `packages/playwright/src/lib/components/number-input.po.ts` |
| Modify | `packages/playwright/src/lib/components/index.ts` |
| Create | `docs/src/components/number-input/number-input.stories.ts` |
| Create | `docs/src/components/number-input/number-input.mdx` |
| Delete | `packages/core/src/components/bal-number-input/` |

---

## Phase 1: Component

### Task 1: Create directory and scaffold files

**Files:**
- Create: `packages/core/src/components/number-input/` (directory)

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p packages/core/src/components/number-input/test
```

- [ ] **Step 2: Commit**

```bash
git add packages/core/src/components/number-input/
git commit -m "chore: scaffold number-input directory for ds migration"
```

---

### Task 2: Write `number-input.interfaces.ts`

**Files:**
- Create: `packages/core/src/components/number-input/number-input.interfaces.ts`

Event detail types use `number | null` (DS null-first pattern), matching `FormControlInterface<number | null>`.

- [ ] **Step 1: Create file**

`packages/core/src/components/number-input/number-input.interfaces.ts`:
```ts
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../interfaces.d.ts" />

namespace DS {
  export interface NumberInputCustomEvent<T> extends CustomEvent<T> {
    detail: T
    target: HTMLDsNumberInputElement
  }

  export type NumberInputChangeDetail = number | null
  export type NumberInputChange = NumberInputCustomEvent<NumberInputChangeDetail>

  export type NumberInputInputDetail = number | null
  export type NumberInputInput = NumberInputCustomEvent<NumberInputInputDetail>

  export type NumberInputBlurDetail = FocusEvent
  export type NumberInputBlur = NumberInputCustomEvent<NumberInputBlurDetail>

  export type NumberInputKeyPressDetail = KeyboardEvent
  export type NumberInputKeyPress = NumberInputCustomEvent<NumberInputKeyPressDetail>

  export type NumberInputFocusDetail = FocusEvent
  export type NumberInputFocus = NumberInputCustomEvent<NumberInputFocusDetail>

  export type NumberInputClickDetail = MouseEvent
  export type NumberInputClick = NumberInputCustomEvent<NumberInputClickDetail>
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/core/src/components/number-input/number-input.interfaces.ts
git commit -m "feat: add ds-number-input interfaces (DS namespace)"
```

---

### Task 3: Write `number-input.utils.ts` and `number-input.utils.spec.ts`

**Files:**
- Create: `packages/core/src/components/number-input/number-input.utils.ts`
- Create: `packages/core/src/components/number-input/number-input.utils.spec.ts`

The utils logic is unchanged — only the file names change. The spec file's import path must be updated.

- [ ] **Step 1: Copy utils file (zero logic changes)**

```bash
cp packages/core/src/components/bal-number-input/bal-number-input.utils.ts \
   packages/core/src/components/number-input/number-input.utils.ts
```

- [ ] **Step 2: Copy spec file and update import**

```bash
cp packages/core/src/components/bal-number-input/bal-number-input.utils.spec.ts \
   packages/core/src/components/number-input/number-input.utils.spec.ts
```

Then open `packages/core/src/components/number-input/number-input.utils.spec.ts` and change line 1:
```ts
// Before:
import { ... } from './bal-number-input.utils'

// After:
import { ... } from './number-input.utils'
```

The exact imports to update (copy this exactly — replace the entire import statement):
```ts
import {
  countDecimalSeparators,
  isNotNumber,
  isNumber,
  toFixedNumber,
  toNumber,
  toUserFormattedNumber,
  validateKeyDown,
} from './number-input.utils'
```

- [ ] **Step 3: Run unit tests to verify**

```bash
npx nx run core:test --testFile=packages/core/src/components/number-input/number-input.utils.spec.ts
```

Expected: all tests pass (same logic, just renamed).

- [ ] **Step 4: Commit**

```bash
git add packages/core/src/components/number-input/number-input.utils.ts \
        packages/core/src/components/number-input/number-input.utils.spec.ts
git commit -m "feat: add number-input utils (renamed from bal-number-input)"
```

---

### Task 4: Write `number-input.tsx`

**Files:**
- Create: `packages/core/src/components/number-input/number-input.tsx`

Key design notes:
- `FormControl<number | null>` is used for plumbing only (`nativeEl`, `setFocus`, `setBlur`, `connectedCallback`, `componentDidLoad`, `listenOnClick`, `onClick`, `setValue`, `inputValue`, `initialValue`, `onFocus`, `onBlur`)
- All numeric event handlers (`handleInput`, `handleFocus`, `handleBlur`, `handleKeydown`) are custom
- `handleBlur` sets `control.inputValue` then calls `control.onBlur(ev)` so `setValue` uses the right numeric value
- Custom `listenOnReset` calls `control.setValue(control.initialValue)` directly — does NOT use `control.listenOnReset` (which would corrupt the formatted display)
- `@State() nativeInputValue` drives what the native `<input>` displays; changing it triggers a re-render
- `@Watch('value')` syncs external value changes to the display

- [ ] **Step 1: Create file**

`packages/core/src/components/number-input/number-input.tsx`:
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
import isEmpty from 'lodash/isEmpty'
import isNaN from 'lodash/isNaN'
import isNil from 'lodash/isNil'
import { ariaBooleanToString } from '../../utils/aria'
import { inheritAttributes } from '../../utils/attributes'
import { defaultConfig, DsConfigState, DsLanguage, DsRegion, ListenToConfig } from '../../utils/config'
import { FormControl, FormControlInterface, stopEventBubbling } from '../../utils/form-control'
import { debounceEvent } from '../../utils/helpers'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { getDecimalSeparator, getThousandSeparator } from '../../utils/number'
import { I18nDsLabel } from '../label/label.i18n'
import {
  isNotNumber,
  mapDecimalSeparator,
  toFixedNumber,
  toNumber,
  toUserFormattedNumber,
  validateKeyDown,
} from './number-input.utils'

@Component({
  tag: 'ds-number-input',
  styleUrl: 'number-input.host.scss',
  shadow: true,
  formAssociated: true,
})
export class NumberInput implements ComponentInterface, FormControlInterface<number | null>, Loggable {
  private numberInputId = `ds-number-input-${NumberInputIds++}`
  private inheritedAttributes: { [k: string]: any } = {}
  private selectTimeout?: NodeJS.Timeout
  private control = new FormControl<number | null>(this)

  lastValue = ''

  log!: LogInstance
  @Logger('number-input')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @State() focused = false
  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region
  @State() nativeInputValue = ''
  @State() inputPattern = ''

  @AttachInternals() internals!: ElementInternals

  // Convenience getter — avoids repeated casting throughout the component
  private get nativeInput(): HTMLInputElement | undefined {
    return this.control.nativeEl as HTMLInputElement | undefined
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The numeric value of the input. `null` means no value.
   */
  @Prop({ mutable: true, reflect: true }) value: number | null = null

  @Watch('value')
  protected valueChanged(newValue: number | null) {
    const isValueNotDefined = newValue === null || isNaN(newValue as number)
    const emptyValue = this.exactNumber ? '0' : ''
    const rawStr = isValueNotDefined ? emptyValue : (newValue as number).toFixed(this.decimal)

    this.lastValue = rawStr
    if (this.focused) {
      this.nativeInputValue = mapDecimalSeparator(rawStr)
    } else {
      this.nativeInputValue = toUserFormattedNumber(rawStr, this.decimal, this.suffix)
    }
  }

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.numberInputId

  /**
   * The label displayed above the field.
   */
  @Prop() label?: string

  /**
   * The description displayed below the field.
   */
  @Prop() description?: string

  /**
   * Defines the color state of the input.
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
   * Number of allowed decimal places. `0` means integers only.
   */
  @Prop() decimal = 0

  /**
   * When `true`, only positive numbers are accepted (blocks the minus sign).
   */
  @Prop() onlyPositive = false

  /**
   * Text appended to the formatted value after blur (e.g. `"CHF"`).
   */
  @Prop() suffix?: string

  /**
   * Overrides the auto-generated input validation pattern.
   */
  @Prop() pattern?: string

  /**
   * Instructional text shown when the input has no value.
   */
  @Prop() placeholder?: string

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() required = true

  /**
   * If `true`, the element is not mutable, focusable, or submitted with the form.
   */
  @Prop() disabled = false

  /**
   * If `true`, the element cannot be edited by the user.
   */
  @Prop() readonly = false

  /**
   * When `true`, displays `0` instead of an empty field when value is null.
   */
  @Prop() exactNumber = false

  /**
   * The maximum value.
   */
  @Prop() max?: string

  /**
   * The minimum value.
   */
  @Prop() min?: string

  /**
   * Milliseconds to wait before triggering `dsChange` after each keystroke.
   */
  @Prop() debounce = 0

  @Watch('debounce')
  protected debounceChanged() {
    this.dsChange = debounceEvent(this.dsChange, this.debounce)
  }

  /**
   * EVENTS
   * ------------------------------------------------------
   */

  /**
   * Emitted on each keystroke with the current numeric value (or null).
   */
  @Event() dsInput!: EventEmitter<DS.NumberInputInputDetail>

  /**
   * Emitted when the value changes on blur.
   */
  @Event() dsChange!: EventEmitter<DS.NumberInputChangeDetail>

  /**
   * Emitted when the input loses focus.
   */
  @Event() dsBlur!: EventEmitter<DS.NumberInputBlurDetail>

  /**
   * Emitted when the input gains focus.
   */
  @Event() dsFocus!: EventEmitter<DS.NumberInputFocusDetail>

  /**
   * Emitted when the input is clicked.
   */
  @Event() dsClick!: EventEmitter<DS.NumberInputClickDetail>

  /**
   * Emitted on keypress.
   */
  @Event() dsKeyPress!: EventEmitter<DS.NumberInputKeyPressDetail>

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
    const formElement = ev.target as HTMLElement
    if (formElement?.contains(this.el)) {
      // control.setValue emits dsChange if value changed and triggers @Watch('value')
      // @Watch('value') → valueChanged() → updates nativeInputValue with formatted display
      // (Do NOT use control.listenOnReset — its timer would overwrite the formatted display
      //  with the raw numeric string)
      this.control.setValue(this.control.initialValue)
    }
  }

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState): Promise<void> {
    this.language = state.language
    this.region = state.region
    this.inputPattern = this.createPattern()

    if (this.nativeInput) {
      if (this.focused) {
        this.nativeInputValue = mapDecimalSeparator(this.lastValue)
      } else {
        this.nativeInputValue = toUserFormattedNumber(this.lastValue, this.decimal, this.suffix)
      }
    }
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
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
    this.inputPattern = this.createPattern()
    this.valueChanged(this.value)
  }

  componentDidLoad() {
    this.control.componentDidLoad()
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * Sets focus on the native input element.
   */
  @Method()
  async setFocus() {
    return this.control.setFocus()
  }

  /**
   * Sets blur on the native input element.
   * @internal
   */
  @Method()
  async setBlur() {
    return this.control.setBlur()
  }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  getInputElement(): Promise<HTMLInputElement> {
    return Promise.resolve(this.nativeInput!)
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private get lastValueGetter(): string {
    if (this.exactNumber && (isNil(this.lastValue) || isEmpty(this.lastValue))) {
      return '0'
    }
    return this.lastValue
  }

  private createPattern(): string {
    if (this.pattern) return this.pattern

    let suffix = this.suffix || ''
    if (suffix !== '') suffix = ` ${suffix}`

    const thousandSeparator = getThousandSeparator()
    let decimalSeparator = getDecimalSeparator()
    if (decimalSeparator === ',') decimalSeparator = '\\,'

    const negativeSymbol = this.onlyPositive ? '' : '-'

    return `${negativeSymbol}?\\d{1,3}(?:${thousandSeparator}\\d{3})*(?:\\${decimalSeparator}\\d{1,2})?(?:${suffix})?`
  }

  private handleInput = (_ev: Event) => {
    if (this.nativeInput && isNotNumber(this.nativeInput.value)) {
      // Invalid character: restore last valid value via state (triggers Stencil re-render)
      this.nativeInputValue = this.lastValue || ''
      return
    }

    this.lastValue = this.nativeInput?.value || ''
    const numericValue = toNumber(this.lastValue, this.decimal) ?? null
    this.control.inputValue = numericValue
    this.dsInput.emit(numericValue)
  }

  private handleFocus = (ev: FocusEvent) => {
    // Sets focused=true, emits dsFocus
    this.control.onFocus(ev)
    // Show raw value without thousand-separator formatting for easier editing
    this.nativeInputValue = mapDecimalSeparator(this.lastValue || '')
    clearTimeout(this.selectTimeout)
    this.selectTimeout = setTimeout(() => this.nativeInput?.select())
  }

  private handleBlur = (ev: FocusEvent) => {
    // Apply locale-formatted display with suffix
    this.lastValue = toFixedNumber(this.lastValueGetter, this.decimal)
    this.nativeInputValue = toUserFormattedNumber(this.lastValueGetter, this.decimal, this.suffix)
    if (this.nativeInput) {
      this.nativeInput.value = this.nativeInputValue
    }

    // Set the numeric value on the control BEFORE calling onBlur,
    // so control.setValue() (called inside onBlur) uses the right value
    this.control.inputValue = toNumber(this.lastValueGetter, this.decimal) ?? null

    // Emits dsBlur and dsChange (via setValue, only if value changed)
    this.control.onBlur(ev)
  }

  private handleKeydown = (ev: KeyboardEvent) => {
    if (!this.nativeInput) return

    const oldValue = this.nativeInput.value || ''
    const selectionStart = this.nativeInput.selectionStart ?? 0
    const newValue = oldValue.slice(0, selectionStart) + ev.key + oldValue.slice(selectionStart)

    if (
      !validateKeyDown({
        key: ev.key,
        ctrlKey: ev.ctrlKey,
        metaKey: ev.metaKey,
        decimal: this.decimal,
        newValue,
        oldValue,
        selectionStart: this.nativeInput.selectionStart,
        selectionEnd: this.nativeInput.selectionEnd,
        onlyPositive: this.onlyPositive,
      })
    ) {
      return stopEventBubbling(ev)
    }
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
        <label htmlFor="input" part="label" id="label">
          <slot name="label">{this.label}</slot>
          {this.required === false && <span>{I18nDsLabel[this.language].optional || ''}</span>}
        </label>

        {/* ---------------------------------------- */}
        {/* Input Container                          */}
        {/* ---------------------------------------- */}
        <div id="container">
          <input
            id="input"
            part="input"
            type="text"
            inputMode="decimal"
            pattern={this.inputPattern}
            ref={el => (this.control.nativeEl = el)}
            aria-describedby="description"
            aria-invalid={this.invalid === true ? 'true' : 'false'}
            name={this.name}
            disabled={this.disabled}
            placeholder={this.placeholder || ''}
            readonly={this.readonly}
            required={this.required}
            min={this.min}
            max={this.max}
            value={this.nativeInputValue}
            onInput={ev => this.handleInput(ev)}
            onFocus={ev => this.handleFocus(ev)}
            onBlur={ev => this.handleBlur(ev)}
            onClick={ev => this.control.onClick(ev)}
            onKeyDown={ev => this.handleKeydown(ev)}
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

let NumberInputIds = 0
```

- [ ] **Step 2: Commit**

```bash
git add packages/core/src/components/number-input/number-input.tsx
git commit -m "feat: migrate bal-number-input to ds-number-input with shadow DOM and partial FormControl"
```

---

## Phase 2: Styles

### Task 5: Write `number-input.host.scss`

**Files:**
- Create: `packages/core/src/components/number-input/number-input.host.scss`

Imports `input.mixin` directly (no own mixin file needed — container is identical to `ds-input`).

- [ ] **Step 1: Create file**

`packages/core/src/components/number-input/number-input.host.scss`:
```scss
@use '@baloise/ds-styles/sass/mixins' as *;
@use '../../vars' as vars;
@use '../input/input.mixin' as input;

/**
 * Variables
 * --------------------------------
 */

:host {
  @include input.vars('input');
  @include input.vars-container('input');
  @include input.vars-label('input');
  @include input.vars-description('input');
}

/**
 * Basic Component Styles
 * --------------------------------
 */

:host {
  position: relative;
  display: grid;
  gap: 0.25rem;

  @include input.style('input', '#input');
  @include input.container('input');
  @include input.label('input');
  @include input.description('input');
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
  #input {
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
git add packages/core/src/components/number-input/number-input.host.scss
git commit -m "feat: add number-input.host.scss shadow DOM styles"
```

---

### Task 6: Write `number-input.style.scss`

**Files:**
- Create: `packages/core/src/components/number-input/number-input.style.scss`

- [ ] **Step 1: Create file**

`packages/core/src/components/number-input/number-input.style.scss`:
```scss
@use '@baloise/ds-styles/sass/mixins' as *;
@use '../../vars' as vars;
@use '../input/input.mixin' as input;

$use-host: false !default;

/**
 * Variables
 * --------------------------------
 */

.field {
  @include input.vars('input');
  @include input.vars-container('input');
  @include input.vars-label('input');
  @include input.vars-description('input');
}

/**
 * Basic Component Styles
 * --------------------------------
 */

.field {
  position: relative;
  display: grid;
  gap: 0.25rem;

  @include input.style('input', '.input');
  @include input.container('input', '.control');
  @include input.label('input', '.label');
  @include input.description('input', '.help');
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
  .input {
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
git add packages/core/src/components/number-input/number-input.style.scss
git commit -m "feat: add number-input.style.scss for CSS-only hybrid mode"
```

---

### Task 7: Delete old directory and verify build

**Files:**
- Delete: `packages/core/src/components/bal-number-input/`

The old component references `../../utils/bem` and `../../utils/form-input` (deleted utilities). It must be removed before the build will pass.

- [ ] **Step 1: Delete old directory**

```bash
rm -rf packages/core/src/components/bal-number-input
```

- [ ] **Step 2: Build to verify**

```bash
IS_DS_DEVELOPMENT=true npx stencil build --config packages/core/stencil.config.ts 2>&1 | tail -5
```

Expected: `build finished` with no errors. If TypeScript errors appear in `number-input.tsx`, fix them before committing.

Common TypeScript issues to watch for:
- `FormControl<number | null>` — ensure `FormControlInterface<number | null>` is satisfied (check all required props/events exist on the class)
- `stopEventBubbling` — imported from `'../../utils/form-control'`, not `form-input`
- `control.inputValue` — public property on `FormControl`, can be set directly

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove old bal-number-input, verify ds-number-input build"
```

---

## Phase 3: Tests

### Task 8: Create `number-input.po.ts` and export

**Files:**
- Create: `packages/playwright/src/lib/components/number-input.po.ts`
- Modify: `packages/playwright/src/lib/components/index.ts`

- [ ] **Step 1: Create PO file**

`packages/playwright/src/lib/components/number-input.po.ts`:
```ts
import { expect, Locator } from '@playwright/test'
import { E2ELocator } from '../page/utils'
import { PageObject } from './page-object'

export class DsNumberInput extends PageObject {
  readonly nativeInput: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.nativeInput = el.locator('[part="input"]')
  }

  async fill(value: string) {
    await this.nativeInput.fill(value)
  }

  async blur() {
    await this.nativeInput.blur()
  }

  async assertValue(value: string) {
    await expect(this.nativeInput).toHaveValue(value)
  }

  async assertToBeDisabled() {
    await expect(this.nativeInput).toBeDisabled()
  }
}
```

- [ ] **Step 2: Add export to index**

In `packages/playwright/src/lib/components/index.ts`, add this line between `input.po` and `label.po` (alphabetical order):
```ts
export * from './number-input.po'
```

- [ ] **Step 3: Commit**

```bash
git add packages/playwright/src/lib/components/number-input.po.ts \
        packages/playwright/src/lib/components/index.ts
git commit -m "feat: add DsNumberInput page object"
```

---

### Task 9: Write `number-input.component.play.ts`

**Files:**
- Create: `packages/core/src/components/number-input/test/number-input.component.play.ts`

`page.mount()` must be inside every test — never in `beforeEach`.

- [ ] **Step 1: Create file**

`packages/core/src/components/number-input/test/number-input.component.play.ts`:
```ts
import { DsNumberInput, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should fire dsInput with numeric value on fill', async ({ page }) => {
    await page.mount(`<ds-number-input label="Label"></ds-number-input>`)
    const input = new DsNumberInput(page.locator('ds-number-input'))
    const inputSpy = await input.el.spyOnEvent('dsInput')

    await input.fill('42')

    expect(inputSpy).toHaveReceivedEventTimes(1)
    expect(inputSpy).toHaveReceivedEventDetail(42)
  })

  test('should fire dsChange with numeric value on blur', async ({ page }) => {
    await page.mount(`<ds-number-input label="Label"></ds-number-input>`)
    const input = new DsNumberInput(page.locator('ds-number-input'))
    const changeSpy = await input.el.spyOnEvent('dsChange')

    await input.fill('100')
    await input.blur()

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail(100)
  })

  test('should not fire dsChange when value is unchanged on blur', async ({ page }) => {
    await page.mount(`<ds-number-input label="Label" value="42"></ds-number-input>`)
    const input = new DsNumberInput(page.locator('ds-number-input'))
    const changeSpy = await input.el.spyOnEvent('dsChange')

    await input.nativeInput.focus()
    await input.blur()

    expect(changeSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('decimal', () => {
  test('should emit decimal value when decimal="2"', async ({ page }) => {
    await page.mount(`<ds-number-input label="Label" decimal="2"></ds-number-input>`)
    const input = new DsNumberInput(page.locator('ds-number-input'))
    const changeSpy = await input.el.spyOnEvent('dsChange')

    await input.fill('42.5')
    await input.blur()

    expect(changeSpy).toHaveReceivedEventDetail(42.5)
  })

  test('should emit null for empty input with decimal="2"', async ({ page }) => {
    await page.mount(`<ds-number-input label="Label" decimal="2"></ds-number-input>`)
    const input = new DsNumberInput(page.locator('ds-number-input'))
    const changeSpy = await input.el.spyOnEvent('dsChange')

    await input.nativeInput.focus()
    await input.blur()

    expect(changeSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('onlyPositive', () => {
  test('should block negative sign when onlyPositive', async ({ page }) => {
    await page.mount(`<ds-number-input label="Label" only-positive></ds-number-input>`)
    const input = new DsNumberInput(page.locator('ds-number-input'))

    await input.nativeInput.focus()
    await input.nativeInput.press('-')
    await input.nativeInput.type('5')
    await input.blur()

    // Negative sign blocked — only '5' is accepted
    await input.assertValue('5')
  })
})

test.describe('exactNumber', () => {
  test('should display 0 when empty and exactNumber is set', async ({ page }) => {
    await page.mount(`<ds-number-input label="Label" exact-number></ds-number-input>`)
    const input = new DsNumberInput(page.locator('ds-number-input'))

    await input.assertValue('0')
  })
})

test.describe('disabled', () => {
  test('native input should be disabled', async ({ page }) => {
    await page.mount(`<ds-number-input label="Label" value="42" disabled></ds-number-input>`)
    const input = new DsNumberInput(page.locator('ds-number-input'))
    const inputSpy = await input.el.spyOnEvent('dsInput')

    await input.assertToBeDisabled()
    expect(inputSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('form reset', () => {
  test('should reset to initial value', async ({ page }) => {
    await page.mount(`
      <form>
        <ds-number-input name="amount" label="Amount" value="100"></ds-number-input>
        <button type="reset" data-testid="reset">Reset</button>
      </form>
    `)
    const input = new DsNumberInput(page.locator('ds-number-input'))
    const changeSpy = await input.el.spyOnEvent('dsChange')

    await input.fill('999')
    await input.blur()
    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail(999)

    await page.getByTestId('reset').click()
    expect(changeSpy).toHaveReceivedEventDetail(100)
  })
})
```

- [ ] **Step 2: Commit**

```bash
git add packages/core/src/components/number-input/test/number-input.component.play.ts
git commit -m "test: add ds-number-input component interaction tests"
```

---

### Task 10: Write `number-input.a11y.play.ts`

**Files:**
- Create: `packages/core/src/components/number-input/test/number-input.a11y.play.ts`

- [ ] **Step 1: Create file**

`packages/core/src/components/number-input/test/number-input.a11y.play.ts`:
```ts
import { test } from '@baloise/ds-playwright'

test('default', async ({ page, a11y }) => {
  await page.mount(`<ds-number-input label="Label" description="Description"></ds-number-input>`)
  await a11y('ds-number-input')
})

test('with placeholder', async ({ page, a11y }) => {
  await page.mount(`<ds-number-input label="Label" placeholder="0"></ds-number-input>`)
  await a11y('ds-number-input')
})

test('with value', async ({ page, a11y }) => {
  await page.mount(`<ds-number-input label="Label" value="42"></ds-number-input>`)
  await a11y('ds-number-input')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`<ds-number-input label="Label" value="42" disabled></ds-number-input>`)
  await a11y('ds-number-input')
})

test('invalid', async ({ page, a11y }) => {
  await page.mount(`<ds-number-input label="Label" value="42" invalid invalid-text="Validation Error"></ds-number-input>`)
  await a11y('ds-number-input')
})

test('success', async ({ page, a11y }) => {
  await page.mount(`<ds-number-input label="Label" value="42" color="success"></ds-number-input>`)
  await a11y('ds-number-input')
})

test('warning', async ({ page, a11y }) => {
  await page.mount(`<ds-number-input label="Label" value="42" color="warning"></ds-number-input>`)
  await a11y('ds-number-input')
})
```

- [ ] **Step 2: Commit**

```bash
git add packages/core/src/components/number-input/test/number-input.a11y.play.ts
git commit -m "test: add ds-number-input accessibility tests"
```

---

### Task 11: Write visual HTML fixtures

**Files:**
- Create: `packages/core/src/components/number-input/test/number-input.visual.html`
- Create: `packages/core/src/components/number-input/test/number-input.style.html`

- [ ] **Step 1: Create `number-input.visual.html`**

`packages/core/src/components/number-input/test/number-input.visual.html`:
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
        <ds-number-input label="Label 1" required="false"></ds-number-input>
        <ds-number-input label="Label 1" description="Description 1"></ds-number-input>
        <ds-number-input label="Label 2" description="Description 2" placeholder="0"></ds-number-input>
        <ds-number-input label="Label 3" description="Description 3" value="1234"></ds-number-input>
      </section>

      <!-- Disabled -->
      <section data-testid="disabled">
        <span>Disabled</span>
        <ds-number-input label="Label 1" description="Description 1" disabled></ds-number-input>
        <ds-number-input label="Label 2" description="Description 2" placeholder="0" disabled></ds-number-input>
        <ds-number-input label="Label 3" description="Description 3" value="1234" disabled></ds-number-input>
      </section>

      <!-- Invalid -->
      <section data-testid="invalid">
        <span>Invalid</span>
        <ds-number-input label="Label 1" description="Description 1" invalid-text="Validation Error 1" invalid></ds-number-input>
        <ds-number-input
          label="Label 2"
          description="Description 2"
          placeholder="0"
          invalid-text="Validation Error 2"
          invalid
        ></ds-number-input>
        <ds-number-input
          label="Label 3"
          description="Description 3"
          value="1234"
          invalid-text="Validation Error 3"
          invalid
        ></ds-number-input>
      </section>

      <!-- Valid -->
      <section data-testid="valid">
        <span>Valid</span>
        <ds-number-input label="Label 1" description="Description 1" color="success"></ds-number-input>
        <ds-number-input label="Label 2" description="Description 2" placeholder="0" color="success"></ds-number-input>
        <ds-number-input label="Label 3" description="Description 3" value="1234" color="success"></ds-number-input>
      </section>

      <!-- Warning -->
      <section data-testid="warning">
        <span>Warning</span>
        <ds-number-input label="Label 1" description="Description 1" color="warning"></ds-number-input>
        <ds-number-input label="Label 2" description="Description 2" placeholder="0" color="warning"></ds-number-input>
        <ds-number-input label="Label 3" description="Description 3" value="1234" color="warning"></ds-number-input>
      </section>

      <!-- Decimal -->
      <section data-testid="decimal">
        <span>Decimal</span>
        <ds-number-input label="Label" description="2 decimal places" decimal="2"></ds-number-input>
        <ds-number-input label="Label" description="2 decimal places" decimal="2" value="1234.56"></ds-number-input>
      </section>

      <!-- Suffix -->
      <section data-testid="suffix">
        <span>Suffix</span>
        <ds-number-input label="Label" description="With CHF suffix" suffix="CHF"></ds-number-input>
        <ds-number-input label="Label" description="With CHF suffix" suffix="CHF" value="1234"></ds-number-input>
      </section>
    </main>
  </body>
</html>
```

- [ ] **Step 2: Create `number-input.style.html`**

`packages/core/src/components/number-input/test/number-input.style.html`:
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
            <input class="input" type="text" />
          </div>
          <p class="help">Description</p>
        </div>
        <div class="field">
          <label class="label">Label</label>
          <div class="control">
            <input class="input" type="text" placeholder="0" />
          </div>
          <p class="help">Description</p>
        </div>
        <div class="field">
          <label class="label">Label</label>
          <div class="control">
            <input class="input" type="text" value="1 234" />
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
            <input class="input" type="text" disabled />
          </div>
          <p class="help">Description</p>
        </div>
        <div class="field is-disabled">
          <label class="label">Label</label>
          <div class="control">
            <input class="input" type="text" value="1 234" disabled />
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
            <input class="input" type="text" />
          </div>
          <p class="help">Validation Error</p>
        </div>
        <div class="field is-danger">
          <label class="label">Label</label>
          <div class="control">
            <input class="input" type="text" value="1 234" />
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
            <input class="input" type="text" value="1 234" />
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
            <input class="input" type="text" value="1 234" />
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
git add packages/core/src/components/number-input/test/number-input.visual.html \
        packages/core/src/components/number-input/test/number-input.style.html
git commit -m "feat: add number-input visual and style HTML fixtures"
```

---

### Task 12: Write `number-input.visual.play.ts`

**Files:**
- Create: `packages/core/src/components/number-input/test/number-input.visual.play.ts`

- [ ] **Step 1: Create file**

`packages/core/src/components/number-input/test/number-input.visual.play.ts`:
```ts
import { expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'ds-number-input'
const VARIANTS = ['basic', 'disabled', 'invalid', 'valid', 'warning', 'decimal', 'suffix']

const image = screenshot(TAG)

test.describe('style', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/${TAG}/test/${TAG}.style.html`)
  })

  VARIANTS.filter(v => !['decimal', 'suffix'].includes(v)).forEach(variant => {
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

- [ ] **Step 2: Commit**

```bash
git add packages/core/src/components/number-input/test/number-input.visual.play.ts
git commit -m "test: add ds-number-input visual regression tests"
```

---

## Phase 4: Docs

### Task 13: Write `number-input.stories.ts`

**Files:**
- Create: `docs/src/components/number-input/number-input.stories.ts`

- [ ] **Step 1: Create directory and file**

```bash
mkdir -p docs/src/components/number-input
```

`docs/src/components/number-input/number-input.stories.ts`:
```ts
import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsNumberInput

const tag = 'ds-number-input'

const meta: Meta<Args> = {
  title: 'Components/Form/Number Input',
  args: {},
  argTypes: {
    ...withComponentControls({ tag }),
  },
  ...withRender(({ ...args }) => `<ds-number-input ${props(args)}></ds-number-input>`),
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
<ds-number-input label="Label" description="Description" placeholder="0"></ds-number-input>
<ds-number-input label="Label" description="Description" placeholder="0" required="false"></ds-number-input>
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
    <input class="input" type="text" placeholder="0" />
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
<ds-number-input label="Label" description="Description" placeholder="0" disabled></ds-number-input>
<ds-number-input label="Label" description="Description" value="1234" disabled></ds-number-input>
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
    <input class="input" type="text" placeholder="0" disabled />
  </div>
  <p class="help">Description</p>
</div>
<div class="field is-disabled">
  <label class="label">Label</label>
  <div class="control">
    <input class="input" type="text" value="1 234" disabled />
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
<ds-number-input label="Label" description="Description" invalid-text="Validation Error" invalid></ds-number-input>
<ds-number-input label="Label" description="Description" value="1234" invalid-text="Validation Error" invalid></ds-number-input>
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
    <input class="input" type="text" />
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
<ds-number-input label="Label" description="Description" color="success"></ds-number-input>
<ds-number-input label="Label" description="Description" value="1234" color="success"></ds-number-input>
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
    <input class="input" type="text" value="1 234" />
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
<ds-number-input label="Label" description="Description" color="warning"></ds-number-input>
<ds-number-input label="Label" description="Description" value="1234" color="warning"></ds-number-input>
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
    <input class="input" type="text" value="1 234" />
  </div>
  <p class="help">Description</p>
</div>
`,
  ),
})
WarningHtml.storyName = '🌍 Warning'

export const Decimal = Story({
  ...withRender(
    () => `
<ds-number-input label="Label" description="2 decimal places" decimal="2"></ds-number-input>
<ds-number-input label="Label" description="2 decimal places" decimal="2" value="1234.56"></ds-number-input>
`,
  ),
})
Decimal.storyName = '🧩 Decimal'

export const Suffix = Story({
  ...withRender(
    () => `
<ds-number-input label="Label" description="With CHF suffix" suffix="CHF"></ds-number-input>
<ds-number-input label="Label" description="With CHF suffix" suffix="CHF" value="1234"></ds-number-input>
`,
  ),
})
Suffix.storyName = '🧩 Suffix'
```

- [ ] **Step 2: Commit**

```bash
git add docs/src/components/number-input/number-input.stories.ts
git commit -m "feat: add ds-number-input Storybook stories"
```

---

### Task 14: Write `number-input.mdx`

**Files:**
- Create: `docs/src/components/number-input/number-input.mdx`

- [ ] **Step 1: Create file**

`docs/src/components/number-input/number-input.mdx`:
```mdx
import { Canvas, Markdown, Meta } from '@storybook/addon-docs/blocks'
import { Banner, BasicStoryTabs, Footer, Lead, PlaygroundBar, StoryHeading, TokenOverview } from '../../../.storybook/blocks'
import * as NumberInputStories from './number-input.stories'

<Meta of={NumberInputStories} />

<StoryHeading of={NumberInputStories.Basic} hidden></StoryHeading>

<Banner of={NumberInputStories} />

<Lead>**Number Input** is a form field component that allows users to enter numeric values with locale-aware formatting, decimal precision, and optional suffix display.</Lead>

<BasicStoryTabs tag="number-input" htmlStory={NumberInputStories.BasicHtml} webComponentStory={NumberInputStories.Basic} index={1} />

<PlaygroundBar of={NumberInputStories.Basic}></PlaygroundBar>

{/* ------------------------------------------------------ */}

<StoryHeading of={NumberInputStories.Disabled}></StoryHeading>

<BasicStoryTabs tag="number-input" htmlStory={NumberInputStories.DisabledHtml} webComponentStory={NumberInputStories.Disabled} index={1} noGuide />

{/* ------------------------------------------------------ */}

<StoryHeading of={NumberInputStories.Invalid}></StoryHeading>

<BasicStoryTabs tag="number-input" htmlStory={NumberInputStories.InvalidHtml} webComponentStory={NumberInputStories.Invalid} index={1} noGuide />

{/* ------------------------------------------------------ */}

<StoryHeading of={NumberInputStories.Valid}></StoryHeading>

<BasicStoryTabs tag="number-input" htmlStory={NumberInputStories.ValidHtml} webComponentStory={NumberInputStories.Valid} index={1} noGuide />

{/* ------------------------------------------------------ */}

<StoryHeading of={NumberInputStories.Warning}></StoryHeading>

<BasicStoryTabs tag="number-input" htmlStory={NumberInputStories.WarningHtml} webComponentStory={NumberInputStories.Warning} index={1} noGuide />

{/* ------------------------------------------------------ */}

<StoryHeading of={NumberInputStories.Decimal}></StoryHeading>

<Canvas of={NumberInputStories.Decimal} sourceState={'shown'} />

{/* ------------------------------------------------------ */}

<StoryHeading of={NumberInputStories.Suffix}></StoryHeading>

<Canvas of={NumberInputStories.Suffix} sourceState={'shown'} />

{/* ------------------------------------------------------ */}

## Component API

import api from './api.md?raw'

<Markdown>{api}</Markdown>

## CSS Variables

<TokenOverview component="number-input" />

## Integration

import integration from '../../snippets/integration.md?raw'

<Markdown>{integration}</Markdown>

<Footer />
```

- [ ] **Step 2: Commit**

```bash
git add docs/src/components/number-input/number-input.mdx
git commit -m "feat: add ds-number-input Storybook MDX documentation"
```

---

## Self-Review

**Spec coverage:**
- ✅ File structure — Tasks 1–6 + 7 (delete)
- ✅ `number-input.interfaces.ts` — DS namespace, `number | null` types — Task 2
- ✅ `number-input.utils.ts` + `number-input.utils.spec.ts` — renamed + import fix — Task 3
- ✅ `number-input.tsx` — shadow DOM, partial FormControl, new props, custom event handlers — Task 4
- ✅ `number-input.host.scss` — imports input.mixin directly, all state variants — Task 5
- ✅ `number-input.style.scss` — CSS-only hybrid mode — Task 6
- ✅ Build verification (delete old directory first) — Task 7
- ✅ `number-input.po.ts` + playwright index export — Task 8
- ✅ `number-input.component.play.ts` — dsInput, dsChange, decimal, onlyPositive, exactNumber, disabled, form reset — Task 9
- ✅ `number-input.a11y.play.ts` — 7 states — Task 10
- ✅ `number-input.visual.html` + `number-input.style.html` — all 7 sections — Task 11
- ✅ `number-input.visual.play.ts` — style + host describe blocks — Task 12
- ✅ `number-input.stories.ts` — all stories with HTML pairs — Task 13
- ✅ `number-input.mdx` — Task 14
