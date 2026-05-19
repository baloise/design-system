# Style Guide — Helvetia Design System

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

### Section Dividers

Organize component class with these sections in order:

1. PUBLIC PROPERTY API
2. LIFECYCLE
3. PROPERTY VALIDATION
4. PUBLIC LISTENERS
5. PUBLIC METHODS
6. EVENT HANDLERS
7. PRIVATE METHODS
8. RENDER

## Creating Values and Types

Define allowed values as a `const` array, then derive the TypeScript type:

```ts
// ✅ button.interfaces.ts
namespace DS {
  export const BUTTON_SIZES = ['', 'sm', 'md', 'lg'] as const
  export type ButtonSize = (typeof BUTTON_SIZES)[number]
}
```

```ts
// ✅ button.tsx
@Prop()
@ValidateEmptyOrOneOf(...DS.BUTTON_SIZES)
readonly size: DS.ButtonSize = ''
```

## Prop Validation

Every component must have a `private validateProps()` method:

```ts
private validateProps() {
  checkEmptyOrType(this, 'label', 'string')
  checkEmptyOrOneOf(this, 'size', DS.BUTTON_SIZES)
}
```

Available validators from `@utils`:

- `checkEmptyOrType()` — optional string/number/boolean
- `checkEmptyOrOneOf()` — optional enum
- `checkRequiredAndType()` — required string/number/boolean
- `checkRequiredAndOneOf()` — required enum

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
