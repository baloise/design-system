# ds-create-component — Reference Guide

Detailed rules, patterns, and implementation details for component generation.

## Table of Contents

- [File Generation Rules](#file-generation-rules)
- [Backwards Compatibility API Extraction](#backwards-compatibility-api-extraction)
- [Component Structure Templates](#component-structure-templates)
- [Design Token Patterns](#design-token-patterns)
- [i18n Patterns](#i18n-patterns)
- [Form Component Integration](#form-component-integration)
- [Animation Handling](#animation-handling)
- [Error Handling & Conflicts](#error-handling--conflicts)

---

## File Generation Rules

### Priority Order

Files are generated in this order to resolve dependencies:

1. **interfaces.ts** (defines types for everything else)
2. **component.tsx** (stub, implements types)
3. **host.scss + style.scss** (use component types in class/part selectors)
4. **i18n.ts** (if needed)
5. **Test files** (via orchestrated skills)
6. **Export** (add to index.ts)

### When to Create Each File

| File                 | Create if                     | Skip if                |
| -------------------- | ----------------------------- | ---------------------- |
| `interfaces.ts`      | Component has props/events    | Utility-only component |
| `component.tsx`      | Not css-html type             | Pure HTML/CSS utility  |
| `host.scss`          | wc-only or hybrid type        | css-html type          |
| `style.scss`         | hybrid or css-html type       | wc-only type           |
| `i18n.ts`            | Has aria-labels, titles, text | No text content        |
| `.component.play.ts` | Has props/events to test      | Utility component      |
| `.visual.play.ts`    | Always (unless user skips)    | Never                  |
| `.a11y.play.ts`      | Always (unless user skips)    | Never                  |

---

## Backwards Compatibility API Extraction

### Process

1. **Try to fetch from main branch:**

   ```bash
   git show origin/main:packages/core/src/components/button/button.tsx
   ```

2. **Parse for:**
   - `@Prop()` declarations → prop names, types, defaults
   - `@Event()` declarations → event names, detail types
   - `@Method()` declarations → public methods
   - Interfaces/enums → export as-is (if no conflicts)

3. **Conflict Detection:**
   - Check if prop violates A11y or SEO best practices
   - If conflict found, mark as `@deprecated` with migration guide

4. **Fallback:**
   - If old component not found, ask user: "Have a reference? (file path or skip)"
   - If user skips, create component with minimal interface

### Example: Extract from bal-button

Old component:

```tsx
@Prop() readonly color: 'primary' | 'danger' = 'primary'
@Prop() readonly size: 'sm' | 'md' | 'lg' = 'md'
@Prop() readonly disabled: boolean = false

@Event() readonly dsClick: EventEmitter<ButtonClickDetail>
@Event() readonly dsFocus: EventEmitter<ButtonFocusDetail>
```

Generated interfaces.ts:

```ts
export const BUTTON_COLORS = ['primary', 'danger'] as const
export type ButtonColor = (typeof BUTTON_COLORS)[number]

export const BUTTON_SIZES = ['sm', 'md', 'lg'] as const
export type ButtonSize = (typeof BUTTON_SIZES)[number]

export interface ButtonClickDetail {
  nativeEvent: MouseEvent
}

export interface ButtonFocusDetail {
  nativeEvent: FocusEvent
}
```

---

## Component Structure Templates

### Template: wc-only (Web Component)

```tsx
import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core'
import { AttachInternals, HTMLStencilElement } from '@stencil/core/internal'
import { DsComponentInterface } from '@global'
import { Logger, type LogInstance } from '@utils'
import { MY_COMPONENT_COLORS, type MyComponentColor, type MyComponentClickDetail } from './my-component.interfaces'

/**
 * MyComponent description (one sentence).
 *
 * @slot - Default slot content.
 * @part native - The native element wrapper.
 */
@Component({
  tag: 'ds-my-component',
  styleUrl: 'my-component.host.scss',
  shadow: true,
  formAssociated: false, // true if form component
})
export class MyComponent implements DsComponentInterface {
  log!: LogInstance

  @Logger('my-component')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * PUBLIC PROPERTY API
   * ─────────────────────────────────────────────────────
   */

  @Prop()
  @ValidateEmptyOrOneOf(...MY_COMPONENT_COLORS)
  readonly color: MyComponentColor = 'primary'

  /**
   * EVENTS
   * ─────────────────────────────────────────────────────
   */

  @Event()
  readonly dsClick: EventEmitter<MyComponentClickDetail>

  /**
   * LIFECYCLE
   * ─────────────────────────────────────────────────────
   */

  connectedCallback() {
    // TODO: Wire up validation, listeners
  }

  /**
   * PROPERTY VALIDATION
   * ─────────────────────────────────────────────────────
   */

  private validateProps() {
    // TODO: Validate prop combinations
  }

  /**
   * PRIVATE METHODS
   * ─────────────────────────────────────────────────────
   */

  /**
   * RENDER
   * ─────────────────────────────────────────────────────
   */

  render() {
    return (
      <Host>
        <button>{this.color}</button>
      </Host>
    )
  }
}
```

### Template: hybrid (Shadow DOM + Light DOM)

Same as above, but with `formAssociated: false` and both `host.scss` and `style.scss` files.

### Template: Form Component (add to any type)

```tsx
@Component({
  tag: 'ds-input',
  styleUrl: 'input.host.scss',
  shadow: true,
  formAssociated: true, // ← Key difference
})
export class Input implements DsComponentInterface {
  @AttachInternals() internals!: ElementInternals

  @Prop() readonly name: string = ''

  @Prop({ mutable: true })
  @Watch('value')
  value: string = ''
  valueChanged(newValue: string) {
    this.internals.setFormValue(newValue)
  }

  @Prop() readonly disabled: boolean = false
  @Prop() readonly required: boolean = false
  @Prop() readonly invalid: boolean = false

  connectedCallback() {
    this.internals.setFormValue(this.value)
    setupValidation(this)
  }

  private validateProps() {
    // TODO: Validate based on invalid, required, etc.
  }
}
```

---

## Design Token Patterns

### Token File Structure

The skill reads `packages/tokens/tokens/Base.tokens.json` and extracts:

```json
{
  "ds": {
    "color": {
      "primary": { "1": "#value", "2": "#value", ... },
      "danger": { ... }
    },
    "text": { ... },
    "spacing": { ... }
  }
}
```

### SCSS Template with Token Comments

```scss
// ═══════════════════════════════════════════════════════════════════════════
// Design Tokens Available
// ═══════════════════════════════════════════════════════════════════════════

// Colors:
// --ds-color-primary-{1..10}
// --ds-color-danger-{1..10}
// --ds-color-text
// --ds-color-background

// Typography:
// --ds-text-size-{xs,sm,md,lg,xl,2xl}
// --ds-text-weight-{regular,medium,bold}
// --ds-text-line-height-{tight,normal,loose}

// Spacing:
// --ds-spacing-{xs,sm,md,lg,xl,2xl}

// ═══════════════════════════════════════════════════════════════════════════
// Component Styles
// ═══════════════════════════════════════════════════════════════════════════

:host {
  display: inline-block;
}

button {
  // Spacing
  padding: var(--ds-spacing-md);

  // Colors
  background-color: var(--ds-color-primary-5);
  color: var(--ds-color-text);
  border: 1px solid var(--ds-color-primary-6);

  // Typography
  font-size: var(--ds-text-size-md);
  font-weight: var(--ds-text-weight-medium);
  line-height: var(--ds-text-line-height-normal);

  // Interaction
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: var(--ds-color-primary-6);
}

:host(.no-animation) button {
  transition: none !important;
}
```

### Warning on Missing Tokens

If old component references a token that doesn't exist in Base.tokens.json:

```
⚠️  Token not found: --ds-color-primary-11
   Referenced in old bal-button
   Options:
     - Add token to packages/tokens/tokens/Base.tokens.json
     - Use closest available: --ds-color-primary-10
     - Hardcode value (not recommended)
```

---

## i18n Patterns

### Detection

The skill checks for:

- `aria-label`, `aria-labelledby`, `aria-describedby`
- `title` attribute
- Component prop description mentions "text" or "label"
- Old component has i18n file

### Generated File Structure

```ts
import { I18n } from '../../interfaces'

interface I18nDsMyComponent {
  close: string
  labelText: string
  // ... other strings
}

export const i18nDsMyComponent: I18n<I18nDsMyComponent> = {
  de: {
    close: 'Schliessen',
    labelText: 'Beschriftung',
  },
  en: {
    close: 'Close',
    labelText: 'Label',
  },
  fr: {
    close: 'Fermer',
    labelText: 'Étiquette',
  },
  // ... populate with old component's i18n if available
  // Other languages left empty for translation
}
```

### Component Wiring

```tsx
import { i18nDsMyComponent } from './my-component.i18n'
import { DsConfigObserver, ListenToConfig, type DsConfigState, defaultConfig } from '@global'

@Component({...})
export class MyComponent implements DsComponentInterface, DsConfigObserver {
  @State() language = defaultConfig.language

  @Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState) {
    this.language = state.language
  }

  render() {
    const strings = i18nDsMyComponent[this.language]
    return (
      <Host>
        <button aria-label={strings.close}>{strings.labelText}</button>
      </Host>
    )
  }
}
```

---

## Form Component Integration

### ElementInternals Setup

```tsx
@Component({
  tag: 'ds-input',
  formAssociated: true, // Enable form association
})
export class Input implements DsComponentInterface {
  @AttachInternals() internals!: ElementInternals

  connectedCallback() {
    // Inform the browser about initial value
    this.internals.setFormValue(this.value)
  }

  @Watch('value')
  valueChanged(newValue: string) {
    // Keep form system in sync
    this.internals.setFormValue(newValue)
  }
}
```

### Form Submission/Reset Handling

Test pattern (generated by ds-sync-component-tests):

```ts
test('form submission includes component value', async ({ page }) => {
  await page.mount(`
    <form id="testForm">
      <ds-input name="username" value="john"></ds-input>
      <button type="submit">Submit</button>
    </form>
  `)

  const formData = new FormData(page.locator('#testForm').element)
  expect(formData.get('username')).toBe('john')
})

test('form reset clears component value', async ({ page }) => {
  await page.mount(`
    <form id="testForm">
      <ds-input name="username" value="john"></ds-input>
      <button type="reset">Reset</button>
    </form>
  `)

  const input = new DsInput(page.locator('ds-input'))
  await input.fill('jane')
  await page.locator('[type="reset"]').click()

  expect(await input.getValue()).toBe('')
})
```

---

## Animation Handling

### Detection Algorithm

1. Scan `.host.scss` and `.style.scss` for:
   - `animation:` property
   - `transition:` property
   - `@keyframes` rules

2. If found, mark component as "animated"

3. Auto-generate animation control:

```tsx
import { DsConfigObserver, ListenToConfig, type DsConfigState, defaultConfig } from '@global'

@Component({...})
export class MyComponent implements DsComponentInterface, DsConfigObserver {
  @State() animated = defaultConfig.animated

  @Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState) {
    this.animated = state.animated
  }

  render() {
    return <Host class={{ 'no-animation': !this.animated }}>{/* ... */}</Host>
  }
}
```

### SCSS Pattern

```scss
:host {
  button {
    transition: background-color 0.2s ease;
  }
}

// Disable animations for visual testing
:host(.no-animation) * {
  animation: none !important;
  transition: none !important;
}
```

### Visual Test Integration

The skill passes `animated: false` to `ds-sync-visual-tests` so snapshots are captured with animations disabled.

---

## Error Handling & Conflicts

### SEO Conflicts

**Problem:** Old component uses non-semantic HTML (e.g., `<div role="button">`)

**Solution:**

```tsx
/**
 * @deprecated Use semantic HTML elements. Old bal-component used
 * div[role="button"], but ds-component always renders <button>.
 *
 * Migration: Remove this prop, rely on semantic <button> rendering.
 * @see https://[docs]/migration/semantic-html
 */
@Prop()
readonly native?: boolean // Accepted but ignored
```

### A11y Conflicts

**Problem:** Old component lacks ARIA attributes or fails keyboard navigation

**Solution:**

```tsx
/**
 * @deprecated Keyboard interaction is now built-in. Old prop is ignored.
 *
 * The new component automatically supports:
 * - Tab navigation
 * - Enter/Space for activation
 * - Arrow keys for selection (if applicable)
 *
 * @see https://[docs]/migration/a11y
 */
@Prop()
readonly tabindex?: number // Accepted but ignored
```

### Missing Old Component

If `git show origin/main:...` fails:

1. Check if component name was different (e.g., renamed)
2. Ask user: "Provide path to old component file? (or skip)"
3. If user provides file, read from filesystem
4. If skip, generate minimal interface with TODOs

### Token Not Found

If old component uses a token that doesn't exist:

```
⚠️  Token not found in Base.tokens.json:
   --ds-color-primary-11 (referenced in old bal-button)

   Action:
   1. Add to packages/tokens/tokens/Base.tokens.json, OR
   2. Update bal-button reference to use --ds-color-primary-10
   3. Re-run skill

   For now, using comment placeholder.
```

---

## Testing Strategy

### Red Phase (Stub + Failing Tests)

Generated component is intentionally **incomplete**:

- Methods are empty stubs
- Render returns minimal placeholder
- Tests FAIL

User then implements to make tests pass (green phase).

### Test File Organization

| File                 | Generated by              | Tests                                   |
| -------------------- | ------------------------- | --------------------------------------- |
| `.component.play.ts` | `ds-sync-component-tests` | Events, props, methods, form behavior   |
| `.visual.play.ts`    | `ds-sync-visual-tests`    | Visual variants (sizes, colors, states) |
| `.a11y.play.ts`      | `ds-sync-a11y-tests`      | WCAG 2.2 AA compliance, keyboard nav    |

### Running Tests

```bash
# Component interaction tests
npm run play -- --grep="my-component" --grep="component"

# Visual regression tests
npm run play -- --grep="my-component" --grep="visual"

# A11y tests
npm run play -- --grep="my-component" --grep="a11y"

# All tests for component
npm run play -- --grep="my-component"
```

---

## Skill Orchestration

When `/ds-create-component` finishes:

1. **Files written** (interfaces, tsx, scss, i18n)
2. **Auto-export added** to index.ts
3. **Skills called in sequence:**
   ```
   ds-sync-component-tests my-component
   → ds-sync-visual-tests my-component
   → ds-sync-a11y-tests my-component
   ```

All tests are generated with files left **unstaged** for review.

---

## Glossary

| Term                 | Definition                                                             |
| -------------------- | ---------------------------------------------------------------------- |
| **wc-only**          | Web component with shadow DOM only, no light DOM styling               |
| **hybrid**           | Web component with both shadow DOM + light DOM support                 |
| **css-html**         | Pure HTML/CSS utility, no web component wrapper                        |
| **form component**   | Component that integrates with HTML forms (input, select, etc.)        |
| **i18n**             | Internationalization — multi-language string support                   |
| **Red phase**        | TDD phase where tests fail (component not yet implemented)             |
| **ElementInternals** | Browser API for form-associated custom elements                        |
| **dsConfig**         | Global design system configuration (language, brand, animations, etc.) |
