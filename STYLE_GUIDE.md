# ✨ Style Guide — Helvetia Design System

This is a quick reference for component code standards. For comprehensive details, see the [Component Style Guide](docs/src/contributing/10-style-guide.mdx) in the documentation.

## Table of Contents

- [Key Rules at a Glance](#key-rules-at-a-glance)
- [Creating Values and Types](#creating-values-and-types)
- [Prop Validation](#prop-validation)
- [Quick Reference Table](#quick-reference-table)
- [Full Documentation](#full-documentation)
- [Enforcement](#enforcement)

## Key Rules at a Glance

### Imports

Always use `@utils` and `@global` aliases — never relative paths:

```ts
import { Loggable, Logger, inheritAttributes } from '@utils'
import { DsConfigState } from '@global'
```

### Component Tag and Class

- Tag: `ds-button` (always `ds-` prefix)
- Class: `Button` (no prefix)

```ts
@Component({ tag: 'ds-button', shadow: true })
export class Button implements ComponentInterface, Loggable {}
```

### Props

- Always use `readonly`
- Always add type annotation when there's a default value
- Use `reflect: true` only for state props (disabled, value, checked, open, etc.)
- Use empty string `''` as default for optional enum props

```ts
@Prop() readonly label: string = ''                    // ✅ visual prop
@Prop({ reflect: true }) readonly disabled: boolean = false  // ✅ state prop
@Prop() readonly size: ButtonSize = ''                 // ✅ optional enum
```

### Event Listeners, Watchers, and Handlers

| Type         | Naming               | Example                   |
| ------------ | -------------------- | ------------------------- |
| `@Listen()`  | `listenTo*`          | `listenToClick() { }`     |
| `@Watch()`   | `*Changed`           | `valueChanged() { }`      |
| DOM handlers | `handle*` (arrow fn) | `handleClick = () => { }` |

### Events

All custom events must start with `ds`:

```ts
@Event() dsChange: EventEmitter<string>
@Event() dsCloseClick: EventEmitter<void>
```

### Methods

- Public methods must be `@Method()` and `async`
- All other methods must be `private`

```ts
@Method()
async open(): Promise<void> { }

private computeLabel() { }
```

### Styling

Use CSS classes, never attribute selectors:

```scss
// ❌ Don't
:host([color="primary"]) { ... }

// ✅ Do
:host(.is-primary) { ... }
```

### Class Management — Use JSX, Not DOM Mutation

Always manage classes through JSX class binding. Never use `classList.add()`, `classList.remove()`, or `classList.toggle()` unless there's a critical performance reason.

```tsx
// ❌ Don't — imperative DOM mutation
this.drawerEl.classList.add('is-open')
this.drawerEl.classList.remove('is-open')

// ✅ Do — declarative JSX class binding
<aside class={{ 'is-open': isMenuOpen }}>
  {/* content */}
</aside>
```

JSX class binding automatically applies/removes classes during the render cycle based on state, avoiding manual DOM manipulation and keeping the component model predictable.

### Never Modify External Element Styles

**Never directly modify styles on elements outside the component** (like `body`, `html`, or other global elements). This can interfere with other components and application logic.

```ts
// ❌ Don't — directly modifying external element styles
document.body.style.overflow = 'hidden'
document.body.style.backgroundColor = 'red'

// ✅ Do — use utility helpers designed for this purpose
ScrollHandler.disable() // Properly manages document scroll
ScrollHandler.enable() // Restores scroll and cleans up state
```

Always use the provided utility helpers from `@utils` for managing global state (scroll behavior, focus traps, etc.). These utilities handle cleanup and side-effect management properly.

### Responsive Design & Mobile-First Styling

All components must follow a **mobile-first** approach: define styles for mobile/narrow viewports first, then progressively enhance for larger screens using `@media` queries.

```scss
// ✅ Mobile-first: base styles for small screens (320px+)
:host {
  display: block;
  padding: var(--ds-space-sm);
  font-size: var(--ds-text-size-sm);
}

// Then enhance for tablet (≥ tablet breakpoint)
@include media('>tablet') {
  padding: var(--ds-space-md);
  font-size: var(--ds-text-size-base);
}

// Further enhance for desktop (≥ desktop breakpoint)
@include media('>desktop') {
  padding: var(--ds-space-lg);
}
```

**Benefits:**

- Smaller CSS payloads on mobile devices
- Better performance by default
- Easier to maintain — additions rather than overrides
- Aligns with browser capability progression (mobile → desktop)

Use the design system breakpoint tokens from `packages/tokens`:

- `--ds-alias-breakpoint-mobile` (default, no media query needed)
- `--ds-alias-breakpoint-tablet` (≥ 960px)
- `--ds-alias-breakpoint-desktop` (≥ 1440px)

Reference breakpoints via design tokens, **never hardcoded pixel values**.

### Accessibility & SEO for Web Components

Ensure components are accessible to assistive technologies and search engines by exposing semantic content and proper ARIA markup.

#### Light DOM Exposure

Place important content in the light DOM (slots), not shadow DOM, so search engines can crawl and index it:

```tsx
// ✅ Good: Content in light DOM (slot)
render() {
  return (
    <Host>
      <div part="container">
        <slot /> {/* User content is in light DOM */}
      </div>
    </Host>
  )
}

// ❌ Avoid: Critical content only in shadow DOM
render() {
  return (
    <Host>
      <div>{this.computedContent}</div> {/* Hidden from search engines */}
    </Host>
  )
}
```

#### Host Element Semantics

Set appropriate `role` and `aria-*` attributes on the host element:

```tsx
// ✅ Good: Role and ARIA on Host
render() {
  return (
    <Host
      role="tablist"
      aria-orientation={this.vertical ? 'vertical' : 'horizontal'}
      aria-labelledby="tabs-label"
    >
      {/* content */}
    </Host>
  )
}
```

#### ARIA Attributes

Always include ARIA attributes for interactive components:

```tsx
// ✅ Good: Complete ARIA attributes
<button
  role="tab"
  aria-selected={this.selected ? 'true' : 'false'}
  aria-controls={`panel-${this.id}`}
  aria-disabled={this.disabled ? 'true' : null}
  aria-label={this.label}
>
  {this.label}
</button>

// ✅ Good: Hidden decorative content
<span aria-hidden="true" class="icon">→</span>
```

#### Semantic HTML

Use semantic HTML elements when possible — `<button>`, `<a>`, `<nav>`, etc. — especially for navigation and interactive components:

```tsx
// ✅ Good: Semantic elements when providing navigation
item.href ? (
  <a href={item.href} role="tab">
    Tab 1
  </a>
) : (
  <button role="tab">Tab 1</button>
)
```

### Component JSDoc

Every component must have a one-sentence description and `@slot` / `@part` tags:

```ts
/**
 * Button provides a clickable element for triggering actions or navigating.
 *
 * @slot - Button label text and/or icon.
 * @part native - The native `<button>` or `<a>` element.
 */
@Component({ tag: 'ds-button', shadow: true })
export class Button {}
```

### Element Internals (Form-Associated Components)

This is the standard web component "element internals" pattern. Use it for any component that participates in an HTML `<form>` (inputs, checkboxes, radios, etc.).

Enable `formAssociated: true` in the decorator and declare an `internals` field with `@AttachInternals()`:

```ts
@Component({
  tag: 'ds-checkbox',
  styleUrl: 'checkbox.host.scss',
  shadow: true,
  formAssociated: true, // ← enables ElementInternals
})
export class Checkbox implements DsComponentInterface {
  @AttachInternals() internals!: ElementInternals // ← browser-managed internals

  connectedCallback() {
    this.internals.setFormValue(this.checked ? this.value : null)
  }

  private handleChange = (ev: Event) => {
    this.checked = (ev.target as HTMLInputElement).checked
    this.internals.setFormValue(this.checked ? this.value : null)
  }
}
```

- Call `this.internals.setFormValue(value)` whenever the value changes so the form sees the current value.
- Pass `null` to unset the field (e.g. unchecked checkbox).
- `formAssociated: true` also enables the native form-reset lifecycle (`formResetCallback`).

### Section Dividers

Organize component class with these sections in the order shown. **Only include sections that have content** — empty sections should be omitted:

1. PUBLIC PROPERTY API — `@Prop()` and `@Event()` declarations
2. LIFECYCLE — `connectedCallback()`, `componentWillLoad()`, `componentWillUpdate()`, `componentDidRender()`
3. PUBLIC LISTENERS — `@Listen()` methods
4. PUBLIC METHODS — `@Method()` declarations
5. EVENT HANDLERS — Private event handlers and DOM event handlers
6. PRIVATE METHODS — Private helper methods
7. RENDER — `render()` method

Each section should be separated by a comment divider using Unicode dashes:

```tsx
/**
 * PUBLIC PROPERTY API
 * ─────────────────────────────────────────────────────
 */
```

## Creating Values and Types

Define allowed values as a `const` array, then derive the TypeScript type:

```ts
// ✅ button.interfaces.ts
export const BUTTON_SIZES = ['', 'sm', 'md', 'lg'] as const
export type ButtonSize = (typeof BUTTON_SIZES)[number]
```

```ts
// ✅ button.tsx
import { BUTTON_SIZES, ButtonSize } from '../button.interfaces'

@Prop()
@ValidateEmptyOrOneOf(...BUTTON_SIZES)
readonly size: ButtonSize = ''
```

Do **not** wrap these in a `namespace DS { }` block — export them directly.

## Prop Validation

Every `@Prop()` must have a corresponding `@Validate*` decorator that matches its type. Call `setupValidation(this)` in both `connectedCallback()` and `componentWillUpdate()`:

```ts
// ✅ Define validator decorator on each prop
@Prop()
@ValidateEmptyOrType('string')
readonly label: string = ''

@Prop()
@ValidateEmptyOrOneOf(...BUTTON_SIZES)
readonly size: ButtonSize = ''

// ✅ Call setupValidation in lifecycle hooks
connectedCallback(): void {
  setupValidation(this)
}

componentWillUpdate(): void {
  setupValidation(this)
}
```

Available validators from `@utils`:

- `@ValidateEmptyOrType('string' | 'number' | 'boolean')` — optional primitive
- `@ValidateEmptyOrOneOf(...CONST_ARRAY)` — optional enum
- `@ValidateRequiredAndType(...)` — required primitive (only if default is never empty)
- `@ValidateRequiredAndOneOf(...)` — required enum (only if default is never empty)

## Quick Reference Table

| What           | Example                                               |
| -------------- | ----------------------------------------------------- |
| Imports        | `import { ... } from '@utils'`                        |
| Tag            | `ds-button`                                           |
| Class          | `Button`                                              |
| Readonly prop  | `@Prop() readonly label: string = ''`                 |
| State prop     | `@Prop({ reflect: true }) readonly disabled: boolean` |
| Enum prop      | `@Prop() readonly size: ButtonSize = ''`              |
| Listen         | `@Listen('click') listenToClick() { }`                |
| Watch          | `@Watch('value') valueChanged() { }`                  |
| Handler        | `handleClick = () => { }`                             |
| Event          | `@Event() dsChange: EventEmitter<string>`             |
| Public method  | `@Method() async open(): Promise<void>`               |
| Private method | `private computeLabel()`                              |
| CSS class      | `:host(.is-primary)`                                  |

## Full Documentation

For detailed explanations, examples, and comprehensive guidelines, see:

- **[Component Style Guide](docs/src/contributing/10-style-guide.mdx)** — Full reference with code examples
- **[CONTRIBUTING.md](CONTRIBUTING.md)** — Contribution workflow and testing requirements
- **[ARCHITECTURE.md](ARCHITECTURE.md)** — System design, component patterns, and testing strategy

## Enforcement

Style violations are caught by:

- **ESLint** — `npm run lint` — custom rules defined in `libs/eslint-plugin/` enforce naming conventions, imports, prop patterns, and code organization
- **TypeScript** — type checking during build ensures type safety and prop annotations
- **Code review** — manual review before merge

Always run linting and formatting before opening a PR:

```bash
npm run lint      # Check for violations
npm run format    # Auto-fix formatting issues
```
