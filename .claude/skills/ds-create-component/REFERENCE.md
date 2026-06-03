# REFERENCE — ds-create-component Templates & Patterns

This file documents the file templates and code patterns the skill generates.

## Table of Contents

- [Component File Structure](#component-file-structure)
- [Template: component.tsx](#template-componenttsx)
- [Template: component.interfaces.ts](#template-componentinterfacests)
- [Template: component.host.scss](#template-componenthostscss)
- [Template: component.visual.html](#template-componentvisualhtml)
- [Token Validation Rules](#token-validation-rules)
- [Migration from Old Components](#migration-from-old-components)

## Component File Structure

Each component generated follows this structure:

```
packages/core/src/components/button/
├── button.tsx              # Stencil component class
├── button.interfaces.ts    # TypeScript types and enums
├── button.host.scss        # Shadow DOM styles with tokens
└── test/
    ├── button.visual.html  # Visual test file
    ├── button.spec.ts      # (created by ds-sync-component-tests skill)
    ├── button.component.play.ts
    ├── button.visual.play.ts
    └── button.a11y.play.ts
```

For subcomponents:

```
packages/core/src/components/tabs/
├── tabs.tsx
├── tabs.interfaces.ts
├── tabs.host.scss
├── tab/
│   ├── tab.tsx
│   ├── tab.interfaces.ts
│   └── tab.host.scss
└── test/
    ├── tabs.visual.html
    └── (test files)
```

---

## Template: component.tsx

The generated `.tsx` file implements `DsComponentInterface` and `Loggable`:

```typescript
import { Component, Element, Host, Prop, State, Watch, h } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Logger, type LogInstance, hasValue } from '@utils'
import { DsComponentInterface } from '@global'
import { BUTTON_SIZES, ButtonSize } from './button.interfaces'

/**
 * Button renders a customizable button element with multiple variants and states.
 *
 * @part button - The button element.
 */
@Component({
  tag: 'ds-button',
  styleUrl: 'button.host.scss',
  shadow: true,
})
export class Button implements DsComponentInterface {
  log!: LogInstance

  @Logger('ds-button')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  // ═══════════════════════════════════════════════════════════════════════════════
  // PUBLIC PROPERTY API
  // ═══════════════════════════════════════════════════════════════════════════════

  /**
   * The text label of the button.
   */
  @Prop() readonly label: string = ''

  /**
   * The button type (primary, secondary, danger, etc.).
   */
  @Prop({ reflect: true }) readonly type: ButtonType = 'primary'

  /**
   * The button size (sm, md, lg).
   */
  @Prop() readonly size: ButtonSize = ''

  /**
   * If `true`, the button is disabled.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * If `true`, the button is in a loading state.
   */
  @Prop({ reflect: true }) readonly loading: boolean = false

  // ═══════════════════════════════════════════════════════════════════════════════
  // LIFECYCLE
  // ═══════════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════════
  // PROPERTY VALIDATION
  // ═══════════════════════════════════════════════════════════════════════════════

  @Watch('type')
  typeChanged(newValue: ButtonType) {
    if (!hasValue(newValue)) {
      this.type = 'primary'
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // PUBLIC LISTENERS
  // ═══════════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════════
  // PUBLIC METHODS
  // ═══════════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════════
  // EVENT HANDLERS
  // ═══════════════════════════════════════════════════════════════════════════════

  private handleClick = () => {
    if (this.disabled || this.loading) return
    // Handle click
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // PRIVATE METHODS
  // ═══════════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════════

  render() {
    return (
      <Host
        class={{
          'is-disabled': this.disabled,
          'is-loading': this.loading,
        }}
      >
        <button
          disabled={this.disabled}
          class={`is-${this.type}`}
          onClick={this.handleClick}
        >
          <slot></slot>
        </button>
      </Host>
    )
  }
}
```

**Key patterns:**

- ✅ Implements `DsComponentInterface` + logger setup
- ✅ All props have `@Prop()` with `readonly`
- ✅ State props use `reflect: true`
- ✅ Events start with `ds` prefix
- ✅ Sections organized with dividers (PUBLIC PROPERTY API, LIFECYCLE, etc.)
- ✅ Render uses `<Host>` and `<slot>` for light DOM content
- ✅ CSS classes use `.is-<variant>`, never attribute selectors

---

## Template: component.interfaces.ts

The generated interfaces file exports types and enums:

```typescript
export type ButtonType = 'primary' | 'secondary' | 'danger' | 'ghost'

export const BUTTON_TYPES: ButtonType[] = [
  'primary',
  'secondary',
  'danger',
  'ghost',
]

export type ButtonSize = 'sm' | 'md' | 'lg'

export const BUTTON_SIZES: ButtonSize[] = [
  'sm',
  'md',
  'lg',
]
```

**Key patterns:**

- ✅ Export union types for props
- ✅ Export const arrays of valid values (used in prop validation with `ValidateEmptyOrOneOf`)
- ✅ Use `type` not `interface` for prop types
- ✅ Naming: `PascalCase` for types (e.g., `ButtonType`), `UPPER_SNAKE_CASE` for arrays (e.g., `BUTTON_TYPES`)

---

## Template: component.host.scss

The generated SCSS file includes token structure, variables, and variants:

```scss
@use '@baloise/ds-css/dist/scss/mixins' as *;
@use '../../vars' as vars;

/**
 * Variables
 * ═══════════════════════════════════════════════════════════════════════════════
 * Define CSS custom properties that can be overridden by consumers.
 *
 * @prop --button-color-text: Text color of the button
 * @prop --button-color-background: Background color of the button
 * @prop --button-border-radius: Border radius of the button
 */

:host {
  @include vars.base(button);

  // Use alias tokens (preferred)
  @include vars.local(
    button-color-text,
    var(--ds-alias-interaction-text-default)
  );
  @include vars.local(
    button-color-background,
    var(--ds-button-color-primary-base)
  );
  @include vars.local(
    button-border-radius,
    var(--ds-alias-radius-base)
  );

  // Variant: Primary (default)
  @include vars.local(
    button-color-background,
    var(--ds-button-color-primary-base)
  );

  // Variant: Secondary
  :host(.is-secondary) {
    @include vars.local(
      button-color-background,
      var(--ds-button-color-secondary-base)
    );
  }

  // Variant: Danger
  :host(.is-danger) {
    @include vars.local(
      button-color-background,
      var(--ds-alias-color-danger)
    );
  }

  // State: Disabled
  :host(.is-disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

/**
 * Component Styles
 * ═══════════════════════════════════════════════════════════════════════════════
 */

:host {
  display: inline-block;

  button {
    background-color: var(--_button-color-background);
    color: var(--_button-color-text);
    border-radius: var(--_button-border-radius);
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-weight: 500;
    transition: all 200ms ease-in-out;

    &:hover:not(:disabled) {
      opacity: 0.9;
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
}
```

**Key patterns:**

- ✅ Use `@include vars.local()` mixin to set private CSS variables
- ✅ Reference tokens via `var(--_button-property)` in CSS rules
- ✅ Use alias tokens first: `var(--ds-alias-color-primary)`
- ✅ Use component tokens if available: `var(--ds-button-color-primary-base)`
- ✅ Variants as `:host(.is-variant)` selectors, never `:host([variant="primary"])`
- ✅ States also use class selectors: `:host(.is-disabled)`, `:host(.is-hover)`

---

## Template: component.visual.html

The generated visual HTML file for testing variants:

```html
<!doctype html>
<html dir="ltr" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0"
    />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <link rel="stylesheet" href="/assets/section.css" />
    <link rel="stylesheet" href="/assets/css/design-system.local.min.css" />

    <script type="module" src="/build/design-system.esm.js"></script>
    <script nomodule src="/build/design-system.js"></script>
  </head>
  <body>
    <main class="container">
      <!-- Primary (default) -->
      <section data-testid="primary">
        <span>Primary</span>
        <ds-button type="primary" label="Click me"></ds-button>
      </section>

      <!-- Secondary -->
      <section data-testid="secondary">
        <span>Secondary</span>
        <ds-button type="secondary" label="Secondary button"></ds-button>
      </section>

      <!-- Danger -->
      <section data-testid="danger">
        <span>Danger</span>
        <ds-button type="danger" label="Delete"></ds-button>
      </section>

      <!-- Disabled -->
      <section data-testid="disabled">
        <span>Disabled</span>
        <ds-button disabled label="Disabled"></ds-button>
      </section>

      <!-- Loading -->
      <section data-testid="loading">
        <span>Loading</span>
        <ds-button loading label="Loading..."></ds-button>
      </section>

      <!-- Sizes -->
      <section data-testid="sizes">
        <span>Sizes</span>
        <div class="stack as-row">
          <ds-button size="sm" label="Small"></ds-button>
          <ds-button size="md" label="Medium"></ds-button>
          <ds-button size="lg" label="Large"></ds-button>
        </div>
      </section>

      <!-- Themeing -->
      <section class="custom-theme" data-testid="themeing">
        <span>Custom Theme (CSS Variable Override)</span>
        <style>
          .custom-theme ds-button {
            --button-color-background: #ff6600;
            --button-color-text: #ffffff;
          }
        </style>
        <ds-button label="Custom themed"></ds-button>
      </section>
    </main>
  </body>
</html>
```

**Key patterns:**

- ✅ `<section data-testid="variant-name">` for each variant
- ✅ Heading `<span>` inside each section
- ✅ One section per variant specified in questionnaire
- ✅ Include a "Themeing" section showing CSS variable override
- ✅ Include a "Disabled" and "Loading" section if applicable
- ✅ Use design system utilities (e.g., `class="stack as-row"` for flexbox layouts)

---

## Token Validation Rules

The skill validates tokens according to these rules:

### ✅ Valid Tokens

**Alias tokens** — Start with `--ds-alias-`:
```scss
var(--ds-alias-color-primary)
var(--ds-alias-interaction-focus-color)
var(--ds-alias-radius-base)
```

**Component tokens** — Start with `--ds-<component>-`:
```scss
var(--ds-button-color-primary-base)
var(--ds-button-border-radius)
var(--ds-button-padding)
```

### ⚠️ Warning Tokens

**Global tokens** — Start with `--ds-` but aren't alias or component tokens:
```scss
var(--ds-color-primary)         // ⚠️ Global token
var(--ds-space-md)              // ⚠️ Global token
```

The skill warns and suggests:
```
⚠️ Global token detected: var(--ds-color-primary)
   Recommendation: Use alias token var(--ds-alias-color-primary)
   Or create component token: --ds-button-color-primary
```

### 🚫 Invalid Values

**Hardcoded values** — No literals, only variables:
```scss
background-color: #ff0000;      // 🚫 Hardcoded hex
padding: 1rem;                  // 🚫 Hardcoded size
color: blue;                    // 🚫 Hardcoded color name
```

---

## Migration from Old Components

When migrating from the old design system:

### 1. Auto-Extract Props & Events

The skill fetches the old component from `main` branch and extracts:

```typescript
// Old component (main branch)
@Prop() readonly size: 'small' | 'medium' | 'large' = 'medium'
@Event() closeClick: EventEmitter<void>

// Skill extracts and pre-fills in questionnaire:
Q: Props?
A: size: 'small'|'medium'|'large' = 'medium'

Q: Events?
A: dsCloseClick  // (renamed to ds prefix convention)
```

### 2. Flag a11y/SEO Breaking Changes

If the old structure conflicts with accessibility:

```typescript
// Old structure (main branch)
render() {
  return <button>{this.label}</button>
}

// New structure (accessible)
render() {
  return (
    <Host>
      <button>
        <slot></slot>
      </button>
    </Host>
  )
}

// Skill flags:
⚠️ BREAKING CHANGE (a11y): 
   Old: <ds-button label="text"></ds-button>
   New: <ds-button>Click me</ds-button>
   
   Reason: Light DOM content improves accessibility and SEO.
   Update consumers to use slot instead of label prop.
```

### 3. Token Migration Path

If old component used global tokens:

```scss
// Old component
background-color: var(--ds-color-primary);

// New component gets generated with:
var(--ds-alias-color-primary)  // alias token

// Skill warns:
⚠️ Token recommendation:
   Current: var(--ds-alias-color-primary)
   Consider creating: --ds-button-color-primary in Base.tokens.json
   Migration plan: Use alias token initially, create component token later.
```

---

## File Registration

After generating, the skill registers the component in `packages/core/src/index.ts`:

```typescript
// Before
export { Button } from './components/button/button'
export type { ButtonSize, ButtonType } from './components/button/button.interfaces'

// After
export { Button, NewComponent } from './components/button/button'
export { NewSubcomponent } from './components/button/new-subcomponent/new-subcomponent'
export type {
  ButtonSize,
  ButtonType,
  NewComponentType,
} from './components/button/button.interfaces'
```

The skill:
- ✅ Adds export statements in alphabetical order
- ✅ Handles subcomponents (nested exports)
- ✅ Exports both component class and type definitions
