---
name: lint-stencil-component
description: Use when asked to check, audit, review, or fix a Stencil component in the Baloise Design System against the design system style guide and Stencil best practices — verifies and repairs imports (@utils, @global aliases), component interfaces (const arrays with derived types), props (readonly, type annotations on defaults, reflect attribute, enum types), lifecycle validation, event handlers, Watch handlers, Listen handlers, method visibility, event naming, ComponentInterface/Loggable implementation, @Validate decorators, section comment dividers, JSDocs, code organization per Stencil style guide, a short one-sentence component description, and @slot/@part JSDoc tags on the class for every slot and shadow part used in render()

# Lint Stencil Component

Audits a Stencil `.tsx` component file against the design system style guide and fixes every violation found.

## Process

1. Read the target component file AND its corresponding interfaces file
2. Run every check below in order (checks 0-16)
3. Report violations as a numbered list
4. Apply all fixes in single Edit passes (to component file and interfaces file as needed)
5. Confirm what was changed

## Checks & Fixes

### 0. Imports — `@utils` and `@global` aliases

**Rule:** All imports from utility and global modules must use the centralized `@utils` and `@global` path aliases instead of relative paths. Multiple imports from the same source must be consolidated into a single import statement.

```ts
// ❌ (relative paths, scattered imports)
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { inheritAttributes } from '../../utils/attributes'
import { normalizeDeprecatedTShirtSize } from '../../utils/t-shirt'
import { DsConfigState, ListenToConfig } from '../../global'

// ✅ (alias imports, consolidated)
import { Loggable, Logger, type LogInstance, inheritAttributes, normalizeDeprecatedTShirtSize } from '@utils'
import { DsConfigState, ListenToConfig } from '@global'
```

**How to detect:**

- Any `import ... from '../../utils/...'` or `import ... from '../../global'` — should use `@utils` or `@global` instead
- Multiple imports from same source in separate lines — consolidate into single import
- TypeScript types must use `type` keyword: `type LogInstance` not just `LogInstance` in import

**Alias reference:**

- `@utils/*` → `packages/core/src/utils/*` — all utility functions, decorators, helpers
- `@global/*` → `packages/core/src/global/*` — global config, constants, initialization

**Example fixes:**

```ts
// Before (scattered, relative paths)
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { normalizeDeprecatedTShirtSize } from '../../utils/t-shirt'
import { defaultConfig, DsConfigState, ListenToConfig } from '../../global'

// After (consolidated, aliases)
import { Loggable, Logger, type LogInstance, normalizeDeprecatedTShirtSize } from '@utils'
import { defaultConfig, DsConfigState, ListenToConfig } from '@global'
```

---

### 1. Component Interface File — Const Arrays with Derived Types

**Location:** `packages/core/src/components/<component>/<component>.interfaces.ts`

**Rule:** Component interfaces must define const arrays as the **single source of truth** for enum/union type values. Types are then derived from these arrays using `typeof arr[number]` pattern. This eliminates duplication and ensures validators always match the type system.

**Pattern:**

```ts
/* component.interfaces.ts */

namespace DS {
  // Define const arrays as the SOURCE OF TRUTH
  export const BADGE_SIZES = ['', 'xs', 'sm', 'md', 'lg', 'xl'] as const
  export const BADGE_COLORS = ['grey', 'danger', 'warning', 'success', 'red', 'yellow', 'green', 'purple', ''] as const
  export const BADGE_POSITIONS = ['card', 'button', 'tabs', ''] as const

  // Derive the types from the arrays
  export type BadgeSize = (typeof BADGE_SIZES)[number]
  export type BadgeColor = (typeof BADGE_COLORS)[number]
  export type BadgePosition = (typeof BADGE_POSITIONS)[number]
}
```

**Usage in component:**

```ts
/* component.tsx */

import { ValidateEmptyOrOneOf } from '@utils'

@Prop({ reflect: true })
@ValidateEmptyOrOneOf(...DS.BADGE_SIZES)
readonly size: DS.BadgeSize = ''

@Prop({ reflect: true })
@ValidateEmptyOrOneOf(...DS.BADGE_COLORS)
readonly color: DS.BadgeColor = ''

@Prop({ reflect: true })
@ValidateEmptyOrOneOf(...DS.BADGE_POSITIONS)
readonly position: DS.BadgePosition = ''
```

**Benefits:**

- ✅ Single source of truth — values defined once in const array
- ✅ Types automatically stay in sync with validators
- ✅ Validators use exact same values as type system
- ✅ No manual duplication of enum values
- ✅ Easy to maintain — update const array once, type and validators both update

**How to detect violations:**

- Type is defined as a union string literal instead of derived from const: `type BadgeSize = 'xs' | 'sm' | 'md'` (not `typeof BADGE_SIZES[number]`)
- Const array and type definition don't match — array has different values than type union
- Component uses hardcoded values in `@ValidateEmptyOrOneOf(...)` instead of spreading const array: `@ValidateEmptyOrOneOf('xs', 'sm', 'md')` instead of `@ValidateEmptyOrOneOf(...DS.BADGE_SIZES)`

**How to fix:**

1. Create const arrays in interfaces file for all constrained types
2. Change type definitions to use `typeof` derivation
3. Update all `@ValidateEmptyOrOneOf(...)` decorators to spread the const array: `@ValidateEmptyOrOneOf(...DS.BADGE_SIZES)`
4. Verify build passes and types are correct

---

### 2. `@Prop()` — readonly and type annotations

**Rule:** Every `@Prop()` that is never reassigned inside the class must be `readonly`.

```ts
// ❌
@Prop() label: string
// ✅
@Prop() readonly label: string
```

**How to detect:** `@Prop()` line without `readonly` keyword. Skip if the prop is assigned anywhere in the class body (e.g. inside a `@Watch` or method).

**Rule:** Every `@Prop() readonly` **with a default value must have an explicit type annotation**. This applies to all prop types: boolean, number, string, enum, etc.

```ts
// ❌ (missing type annotations)
@Prop() readonly disabled = false
@Prop() readonly count = 2
@Prop() readonly align = 'left'
@Prop({ reflect: true }) readonly variant = ''
@Prop() readonly required = true
// ✅ (type annotations provided)
@Prop() readonly disabled: boolean = false
@Prop() readonly count: number = 2
@Prop() readonly align: string = 'left'
@Prop({ reflect: true }) readonly variant: DS.PaginationVariant = ''
@Prop() readonly required: boolean = true
```

**How to detect:** Check every `@Prop(…) readonly <name> = <value>` pattern. If there is NO `: <Type>` before the `=`, it's a violation.

**Special rule for enum types:** If a prop uses an enum or union type (like `DS.PaginationAlignment`), the default value MUST be either:

- An empty string `''`
- A valid enum value from that type

```ts
// ❌ (enum prop without explicit type or invalid default)
@Prop() readonly variant = ''       // type not specified, but should be
@Prop() readonly size = 'lg'        // type not specified; unclear what 'lg' means

// ✅ (enum prop with explicit type and valid default)
@Prop() readonly variant: DS.PaginationVariant = ''
@Prop() readonly size: DS.ButtonSize = 'md'
```

**How to detect:**

- Check if a prop has a non-primitive default value or string default (like `'left'`, `'lg'`, `'primary'`)
- If yes, verify the type annotation exists
- If the prop name or JSDoc suggests it's an enum/variant/alignment/color/size prop, ensure the type is an explicit enum type (not just `: string`)
- Verify the default value is either `''` or a valid member of that enum

---

### 3. `@Prop()` — `reflect` attribute for state props

**Rule:** State-related props (props that reflect the component's internal state and are typically form-related or data-state) MUST have `reflect: true` so the HTML attribute stays in sync with the JS property. Customizable UI props (visual/behavioral options) MUST NOT have `reflect: true`.

**State props (must reflect):**

- `value` — form input or internal value
- `disabled` — form state
- `invalid` — validation state
- `readonly` — form state
- `loading` — async operation state
- `checked` — checkbox/radio state
- `open` — open/closed state
- `active` — active selection state

**Customizable UI props (must NOT reflect):**

- `size`, `color`, `variant` — visual styling options
- `label`, `placeholder` — UI text
- `align`, `justify` — layout options
- `icon`, `slot` — content slots
- Custom styling or theme props

```ts
// ❌ (state prop without reflect, or customizable prop with reflect)
@Prop() readonly value = ''           // state prop MUST reflect
@Prop({ reflect: true }) readonly size = 'md'  // customizable prop must NOT reflect

// ✅ (correct usage)
@Prop({ reflect: true }) readonly value = ''   // state prop reflects
@Prop() readonly size = 'md'          // customizable prop doesn't reflect
```

**How to detect:** Check each `@Prop()` declaration:

- If it's a state prop (value, disabled, invalid, readonly, loading, checked, open, active, etc.) → must have `reflect: true`
- If it's a customizable UI prop (size, color, variant, label, etc.) → must NOT have `reflect: true` or must have `reflect: false`

---

### 4. Property Validation — @Validate decorators

**Rule:** Every component with `@Prop()` declarations **MUST** implement a `private validateProps()` method. This is not optional. This method ensures all props are validated at runtime:

- After the component is inserted into the DOM (`connectedCallback()`)
- After any prop update (`componentWillUpdate()`)

Runtime validation catches developer errors early (e.g., passing invalid enum values, wrong types, out-of-range strings, invalid URLs, malformed dates) and logs helpful error messages to the console with the DOM element selector.

**Mandatory requirements:**

- ✅ **Every component with `@Prop()` must have `validateProps()`** — no exceptions
- ✅ **Call from `connectedCallback()`** — validate props when component is inserted into DOM
- ✅ **Call from `componentWillUpdate()`** — validate props on every update
- ✅ **Validate every `@Prop()` declaration** — include a checker for each prop
- ✅ String/enum props must use `checkEmptyOrOneOf()` or `checkRequiredAndOneOf()`
- ✅ Boolean/number props must use `checkEmptyOrType()` or `checkRequiredAndType()`
- ✅ Complex types (URLs, dates, arrays) must use appropriate checkers
- ✅ If a component has **no `@Prop()` declarations**, add a comment: `// no props to validate`

**Available validation checkers** from `@utils/property-checkers/`:

| Checker                                                                       | Usage                                                        | Example                                                                     |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------- |
| `checkEmptyOrType(component, 'prop', 'string'\|'number'\|'boolean'\|'array')` | Optional prop that must match type if provided               | `checkEmptyOrType(this, 'label', 'string')` — label can be `''` or a string |
| `checkEmptyOrOneOf(component, 'prop', ['val1', 'val2'])`                      | Optional enum prop (empty string is valid, or one of values) | `checkEmptyOrOneOf(this, 'size', ['', 'sm', 'md', 'lg'])`                   |
| `checkEmptyOrPattern(component, 'prop', /regex/)`                             | Optional string matching pattern                             | `checkEmptyOrPattern(this, 'pattern', /^[a-z]+$/)`                          |
| `checkEmptyOrUrl(component, 'prop')`                                          | Optional valid URL string                                    | `checkEmptyOrUrl(this, 'href')`                                             |
| `checkEmptyOrArrayOf(component, 'prop', 'string'\|'number')`                  | Optional array of specific type                              | `checkEmptyOrArrayOf(this, 'items', 'string')`                              |
| `checkEmptyOrDate(component, 'prop')`                                         | Optional valid date string                                   | `checkEmptyOrDate(this, 'birthDate')`                                       |
| `checkRequiredAndType(component, 'prop', 'string'\|...)`                      | Required prop that must match type                           | `checkRequiredAndType(this, 'id', 'string')`                                |
| `checkRequiredAndOneOf(component, 'prop', [...])`                             | Required enum prop (must be one of values)                   | `checkRequiredAndOneOf(this, 'role', ['button', 'link'])`                   |
| `checkRequiredAndPattern(component, 'prop', /regex/)`                         | Required string matching pattern                             | `checkRequiredAndPattern(this, 'id', /^[a-z0-9-]+$/)`                       |
| `checkIsoDate(component, 'prop')`                                             | Validates ISO 8601 date format (YYYY-MM-DD)                  | `checkIsoDate(this, 'date')`                                                |

**Example: Pagination component** (from design system)

```ts
// ✅ REQUIRED: Every prop must be validated
import { checkEmptyOrType, checkEmptyOrOneOf } from '@utils'

export class DsPagination implements ComponentInterface {
  @Prop() readonly label: string = ''
  @Prop() readonly align: 'start' | 'end' = ''
  @Prop() readonly size: 'sm' | '' = ''
  @Prop() readonly variant: 'dots' | '' = ''
  @Prop() readonly textNext: string = ''
  @Prop() readonly textPrevious: string = ''

  connectedCallback(): void {
    this.validateProps()
  }

  componentWillUpdate() {
    this.validateProps()
  }

  /**
   * PROPERTY VALIDATION
   * ------------------------------------------------------
   */

  private validateProps() {
    checkEmptyOrType(this, 'label', 'string')
    checkEmptyOrOneOf(this, 'align', ['', 'start', 'end'])
    checkEmptyOrOneOf(this, 'size', ['', 'sm'])
    checkEmptyOrOneOf(this, 'variant', ['', 'dots'])
    checkEmptyOrType(this, 'textNext', 'string')
    checkEmptyOrType(this, 'textPrevious', 'string')
  }
}
```

**Example: Accordion component** (all optional props)

```ts
// ✅ REQUIRED: Even with optional props, add validateProps()
import { checkEmptyOrType, checkEmptyOrOneOf } from '@utils'

export class Accordion implements ComponentInterface {
  @Prop() readonly button: boolean = false
  @Prop() readonly buttonColor: DS.ButtonColor = 'primary'
  @Prop() readonly marker?: DS.AccordionMarker
  @Prop() readonly group?: string

  connectedCallback(): void {
    this.validateProps()
  }

  componentWillUpdate() {
    this.validateProps()
  }

  /**
   * PROPERTY VALIDATION
   * ------------------------------------------------------
   */

  private validateProps() {
    checkEmptyOrType(this, 'button', 'boolean')
    checkEmptyOrOneOf(this, 'buttonColor', ['primary', 'secondary'])
    checkEmptyOrOneOf(this, 'marker', ['', 'plus', 'plus-minus', 'none'])
    checkEmptyOrType(this, 'group', 'string')
  }
}
```

**Example: Component with no props**

```ts
// ✅ REQUIRED: Add validateProps() with comment if no props
export class Spinner implements ComponentInterface {
  connectedCallback(): void {
    this.validateProps()
  }

  componentWillUpdate() {
    this.validateProps()
  }

  /**
   * PROPERTY VALIDATION
   * ------------------------------------------------------
   */

  private validateProps() {
    // no props to validate
  }
}
```

**How to detect validation violations:**

1. **Component exists but no `validateProps()` method** → VIOLATION: Add the method
2. **`validateProps()` exists but not called from `connectedCallback()`** → VIOLATION: Add call
3. **`validateProps()` exists but not called from `componentWillUpdate()`** → VIOLATION: Add call
4. **`@Prop()` has no corresponding validation checker call** → VIOLATION: Add the checker call
5. **Wrong checker used for prop type** → VIOLATION: Replace with correct checker from table above
6. **Component has no `@Prop()` but no `validateProps()` method** → VIOLATION: Add the method with comment

**Placement in class body:**

Add the `validateProps()` method **after LIFECYCLE** and **before PUBLIC LISTENERS**. It must be called from both `connectedCallback()` and `componentWillUpdate()`:

```ts
/**
 * LIFECYCLE
 * ─────────────────────────────────────────────────────
 */
connectedCallback(): void {
  this.validateProps()  ← Call validateProps() first
}

componentWillUpdate() {
  this.validateProps()  ← Call validateProps() on every update
}

/**
 * PROPERTY VALIDATION          ← Add this section
 * ─────────────────────────────────────────────────────
 */
private validateProps() {
  checkEmptyOrType(this, 'label', 'string')
  checkEmptyOrOneOf(this, 'size', ['', 'sm', 'md'])
  // ... one checker per @Prop()
}

/**
 * PUBLIC LISTENERS
 * ─────────────────────────────────────────────────────
 */
@Listen(...) listenTo...() { ... }
```

---

### 5. `@Listen()` — naming

**Rule:** Methods decorated with `@Listen()` must be named `listenTo<Event>` in PascalCase.

```ts
// ❌
@Listen('click') onClick() {}
@Listen('keydown') onKeyDown() {}
// ✅
@Listen('click') listenToClick() {}
@Listen('keydown') listenToKeyDown() {}
```

---

### 6. `@Watch()` — naming

**Rule:** Methods decorated with `@Watch('propName')` must be named `<propName>Changed` in camelCase.

```ts
// ❌
@Watch('value') onValueChange() {}
@Watch('disabled') watchDisabled() {}
// ✅
@Watch('value') valueChanged() {}
@Watch('disabled') disabledChanged() {}
```

---

### 7. DOM event handlers — naming and arrow function

**Rule:** Inline DOM event handlers must be named `handle<Event>` (camelCase) and defined as arrow functions.

```ts
// ❌
onClick() { ... }
onKeyDown() { ... }
handleClick() { ... }           // not an arrow function
// ✅
handleClick = () => { ... }
handleKeyDown = () => { ... }
```

Arrow function form: `handleFoo = (event?: Event) => { ... }` — keeps `this` bound without explicit binding.

---

### 8. `@Event()` — `ds` prefix

**Rule:** All `@Event()` emitters and their `EventEmitter` type must use the `ds` prefix, lowercase `d` + lowercase `s`.

```ts
// ❌
@Event() change: EventEmitter<string>
@Event() balChange: EventEmitter<string>
// ✅
@Event() dsChange: EventEmitter<string>
@Event() dsCloseClick: EventEmitter<void>
```

Also check call sites: `this.change.emit(...)` → `this.dsChange.emit(...)`.

---

### 9. `ComponentInterface` + `Loggable`

**Rule:** The class must implement both `ComponentInterface` and `Loggable`, and wire up the logger fields.

**Check for:**

- `implements ComponentInterface` (and `Loggable`)
- `log!: LogInstance` field
- `@Logger('ds-<tag>')` + `createLogger` method

**Fix:** Apply the full logger wiring (same as `add-component-logger` skill):

```ts
import { Loggable, Logger, type LogInstance } from '@utils'

export class MyComponent implements ComponentInterface, Loggable {
  log!: LogInstance

  @Logger('ds-my-component')
  createLogger(log: LogInstance) {
    this.log = log
  }
}
```

---

### 10. Method visibility — `private`

**Rule:** All methods must be `private` **except**:

- Stencil lifecycle hooks: `connectedCallback`, `disconnectedCallback`, `componentWillLoad`, `componentDidLoad`, `componentWillRender`, `componentDidRender`, `componentWillUpdate`, `componentDidUpdate`
- Methods decorated with `@Method()`
- Methods decorated with `@Watch()`
- Methods decorated with `@Listen()` — TypeScript cannot see that Stencil calls these externally; marking them `private` causes a "declared but never read" TS error
- `render()`

**Class fields exempt from `private`:**

- `inputId` — used as a public linking attribute between the component and its associated `<label>` or form element; must remain accessible from the template/outside scope.

```ts
// ❌
doSomething() { ... }
async fetchData() { ... }
// ✅
private doSomething() { ... }
private async fetchData() { ... }
```

---

### 11. Section Comment Dividers

**Rule:** The component class body must include section dividers to organize code logically. Add these dividers at the top of each section:

```ts
/**
 * PUBLIC PROPERTY API
 * ------------------------------------------------------
 */

/**
 * LIFECYCLE
 * ------------------------------------------------------
 */

/**
 * PUBLIC LISTENERS
 * ------------------------------------------------------
 */

/**
 * PUBLIC METHODS
 * ------------------------------------------------------
 */

/**
 * EVENT HANDLERS
 * ------------------------------------------------------
 */

/**
 * PRIVATE METHODS
 * ------------------------------------------------------
 */

/**
 * RENDER
 * ------------------------------------------------------
 */
```

**Order of sections (in class):**

1. `log!: LogInstance` and `@Logger(...)` createLogger method
2. `@Element()` field
3. `@State()` fields
4. **PUBLIC PROPERTY API** — `@Prop()` declarations with `@Watch()` handlers
5. **LIFECYCLE** — lifecycle hooks like `componentWillLoad()`, `componentDidLoad()`
6. **PROPERTY VALIDATION** — validation method called from `connectedCallback()` and `componentWillUpdate()`
7. **PUBLIC LISTENERS** — `@ListenToBreakpoints()`, `@ListenToConfig()`, and other `@Listen()` methods (always named `listenTo*`)
8. **PUBLIC METHODS** — `@Method()` decorated methods
9. **EVENT HANDLERS** — DOM event handlers and click/interaction handlers (always named `handle*` as arrow functions)
10. **PRIVATE METHODS** — helper methods, state computations, utility functions
11. **RENDER** — `render()` method only

**How to detect:** Check if sections exist in the class body. Add missing dividers before the corresponding section.

---

### 12. JSDocs — `@Prop()`, `@Event()`, `@Method()`

**Rule:** All `@Prop()`, `@Event()`, and `@Method()` declarations must have a JSDoc comment block above them. This enables documentation generation and improves IDE intellisense.

```ts
// ❌
@Prop() readonly label: string
@Event() dsChange: EventEmitter<string>
@Method() async open() { }

// ✅
/**
 * The button label text
 */
@Prop() readonly label: string

/**
 * Fires when the value changes
 */
@Event() dsChange: EventEmitter<string>

/**
 * Opens the component
 */
@Method()
async open() { }
```

**How to detect:** Check for `/**` comment block on lines directly before `@Prop()`, `@Event()`, or `@Method()` decorators.

---

### 13. Alphabetical Order — `@Prop()`, `@State()`, `@Event()`

**Rule:** Group related declarations and order them alphabetically within each group for consistency and easier scanning.

```ts
// ❌
@Prop() readonly name: string
@Prop() readonly align: string
@Prop() readonly disabled: boolean
@State() isMobile: boolean
@State() active: boolean

// ✅
@Prop() readonly align: string
@Prop() readonly disabled: boolean
@Prop() readonly name: string

@State() active: boolean
@State() isMobile: boolean
```

**How to detect:** Compare the order of prop/state/event names within their section. Flag if not alphabetical.

---

### 13. `@Prop()` + `@Watch()` — Place Together

**Rule:** When a `@Prop()` has a corresponding `@Watch()` method, place them directly together (Prop first, then Watch below it). This makes the relationship clear and easier to maintain.

```ts
// ❌
@Prop() readonly value = 1
@Prop() readonly disabled = false
@Watch('disabled')
disabledChanged() { }

// ✅
@Prop() readonly disabled = false
@Watch('disabled')
disabledChanged() { }

@Prop() readonly value = 1
```

**How to detect:** Find `@Prop()` declarations that have a corresponding `@Watch()`. Check if the `@Watch()` is within 1-2 lines below the `@Prop()`.

---

### 14. `@Method()` — Must be `async`

**Rule:** All methods decorated with `@Method()` must be declared as `async` and return `Promise<T>` or `Promise<void>`. Public methods must be callable asynchronously.

```ts
// ❌
@Method()
open() { }

// ✅
@Method()
async open(): Promise<void> { }
```

**How to detect:** Find lines with `@Method()` and check if the method declaration includes `async`.

---

### 15. Component Tag — `ds-` Prefix

**Rule:** All component tags must use the `ds-` prefix (lowercase). The ES6 class name should NOT have a prefix (use PascalCase only).

```ts
// ❌
@Component({ tag: 'button' })
export class DsButton {}

@Component({ tag: 'ds_button' })
export class Button {}

// ✅
@Component({ tag: 'ds-button' })
export class Button {}
```

**How to detect:** Check `@Component({ tag: '...' })` for `ds-` prefix and `export class` name has no prefix.

---

### 16. `@slot` and `@part` — Class-level JSDoc tags

**Rule:** Every component that uses `<slot />` in its `render()` must document each slot with a `@slot` JSDoc tag on the component class. Every component that uses `part="..."` attributes in its `render()` must document each part with a `@part` JSDoc tag on the component class. These tags are parsed by the Stencil compiler and populate the `slots` and `parts` arrays in `components.json`.

**Slot format:** `@slot <name> - <description>`  
For the unnamed default slot, use an empty name: `@slot - <description>`

**Part format:** `@part <name> - <description>`

```ts
// ❌ — has <slot /> and part="..." in render() but no class JSDoc
@Component({ tag: 'ds-button', shadow: true })
export class Button implements ComponentInterface {
  render() {
    return <button part="native"><span part="label"><slot /></span></button>
  }
}

// ✅ — all slots and parts documented on the class
/**
 * @slot - Button label text and/or icon children. Rendered inside the `label` part.
 * @part native - The native `<button>` or `<a>` element.
 * @part label - The text label wrapper (`<span>`).
 * @part icon - The leading icon wrapper.
 * @part icon-right - The trailing icon wrapper.
 * @part spinner - The loading spinner shown when `loading` is true.
 */
@Component({ tag: 'ds-button', shadow: true })
export class Button implements ComponentInterface {
  render() {
    return <button part="native"><span part="label"><slot /></span></button>
  }
}
```

**Named slot example:**

```ts
/**
 * @slot - Default content area.
 * @slot header - Content placed in the card header.
 * @slot footer - Content placed in the card footer.
 * @part container - The outer wrapper element.
 */
@Component({ tag: 'ds-card', shadow: true })
export class Card implements ComponentInterface {
  render() {
    return (
      <div part="container">
        <slot name="header" />
        <slot />
        <slot name="footer" />
      </div>
    )
  }
}
```

**How to detect violations:**

1. Scan the `render()` method for `<slot` occurrences:
   - `<slot />` or `<slot></slot>` → requires `@slot - <description>` on the class
   - `<slot name="foo"` → requires `@slot foo - <description>` on the class
2. Scan the `render()` method for `part="..."` attributes:
   - `part="native"` → requires `@part native - <description>` on the class
   - Multiple parts in one element (e.g. `part="icon icon-sm"`) → each part name needs its own `@part` tag
3. Check the class-level JSDoc block (the comment directly above `@Component(...)`) for matching `@slot` and `@part` entries
4. **Violation if:** a slot or part is used in `render()` but has no corresponding tag in the class JSDoc
5. **Also violation if:** a `@slot` or `@part` tag is present in the class JSDoc but the slot/part is not used in `render()` (stale documentation)

**How to fix:**

1. Collect all unique slot names from `render()` (empty string for unnamed slots)
2. Collect all unique part names from `render()` (split space-separated `part="foo bar"` attributes)
3. Add or update the class-level JSDoc block directly above `@Component(...)` with matching `@slot` and `@part` tags
4. Write meaningful descriptions — refer to the element type and purpose
5. Remove any stale tags that no longer have a corresponding slot/part in `render()`

**Placement:** The `@slot`/`@part` JSDoc block goes **directly above `@Component(...)`**, before the class declaration.

```ts
/**
 * @slot - ...
 * @part native - ...
 */
@Component({ tag: 'ds-button', shadow: true })
export class Button implements ComponentInterface { ... }
```

---

### 17. Component Description — One-sentence class JSDoc

**Rule:** Every component class must have a one-sentence plain-English description as the first line of its class-level JSDoc block (the comment directly above `@Component(...)`). The description must:

- Start with the component name in title case (e.g. `Badge`, `Button`, `Notification`)
- Use a single sentence ending with a period
- Summarise what the component is and what it does — no implementation details
- Come **before** any `@slot` or `@part` tags in the same JSDoc block

```ts
// ❌ — no description
/**
 * @slot - Button label text.
 * @part native - The native button element.
 */
@Component({ tag: 'ds-button', shadow: true })
export class Button implements ComponentInterface {}

// ❌ — description too vague or missing component name
/**
 * This is a button.
 */
@Component({ tag: 'ds-button', shadow: true })
export class Button implements ComponentInterface {}

// ✅ — correct: one clear sentence, component name first
/**
 * Button provides a clickable element for triggering actions, submitting forms, or navigating — supporting text, icons, or both.
 *
 * @slot - Button label text and/or icon children.
 * @part native - The native `<button>` or `<a>` element.
 */
@Component({ tag: 'ds-button', shadow: true })
export class Button implements ComponentInterface {}
```

**More examples (from the design system):**

```ts
// Badge
/**
 * Badge displays a small indicator or counter on a child component to highlight notifications, counts, or status information.
 */

// Notification
/**
 * Notification presents inline feedback messages for success, warning, error, or informational states.
 */

// Spinner
/**
 * Spinner indicates an ongoing operation with an animated loading indicator.
 */
```

**How to detect violations:**

1. Find the JSDoc block directly above `@Component(...)`
2. Check that the **first non-empty line** of the block is a plain sentence (not a `@tag`)
3. **Violation if:** the block is missing entirely, starts with a `@tag` instead of a sentence, or the sentence does not begin with the component’s display name

**How to fix:**

1. Derive the display name from the component tag: `ds-button` → `Button`, `ds-progress-bar` → `Progress Bar`
2. Write a single sentence describing what the component is and what it does
3. Insert it as the first line of the class JSDoc, followed by a blank line before any `@slot`/`@part` tags

---

| Check | Required form                                  | Example                                                                                         |
| ----- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 0     | Import from `@utils` or `@global`              | `import { Loggable, Logger, type LogInstance } from '@utils'`                                   |
| 1     | Const arrays with derived types in interfaces  | `export const BADGE_SIZES = ['xs', 'sm'] as const; type BadgeSize = typeof BADGE_SIZES[number]` |
| 2     | `@Prop() readonly foo: T = default`            | `@Prop() readonly count: number = 2`; `@Prop() readonly align: DS.Align = ''`                   |
| 3     | State props have `reflect: true`               | `@Prop({ reflect: true }) readonly disabled: boolean`                                           |
| 4     | `@Validate` decorators on every @Prop          | `@Prop() @ValidateEmptyOrType('string') readonly label: string`                                 |
| 5     | `listenToEvent()`                              | `listenToClick()`                                                                               |
| 6     | `propChanged()`                                | `valueChanged()`                                                                                |
| 7     | `handleEvent = () => {}`                       | `handleClick = () => {}`                                                                        |
| 8     | `dsEventName: EventEmitter<T>`                 | `dsChange: EventEmitter<number>`                                                                |
| 9     | `ComponentInterface, Loggable`                 | `implements ComponentInterface, Loggable`                                                       |
| 10    | `private methodName()`                         | `private doSomething()`                                                                         |
| 11    | Seven section dividers                         | See Check 11 for exact format                                                                   |
| 12    | JSDoc on @Prop, @Event, @Method                | `/** Label text */ @Prop()`                                                                     |
| 13    | Alphabetical ordering                          | align, disabled, name (not name, disabled, align)                                               |
| 14    | @Prop + @Watch together                        | Prop immediately followed by Watch below                                                        |
| 15    | @Method() must be async                        | `@Method() async open(): Promise<void>`                                                         |
| 16    | Tag with `ds-` prefix, class without           | `@Component({ tag: 'ds-button' }) export class Button`                                          |
| 17    | One-sentence description on the class JSDoc    | `Button provides a clickable element for triggering actions...`                                 |
| 18    | `@slot` tag for every `<slot>` in render()     | `@slot - Label text and icon children` / `@slot header - Card header content`                   |
| 18    | `@part` tag for every `part="..."` in render() | `@part native - The native button element` / `@part label - The text wrapper`                   |

## Output Format

Report violations before fixing:

```
Violations found in button.tsx:
0. Imports using relative paths — must use @utils and @global aliases; consolidate multiple imports from same source
1. @Prop() readonly count — missing type annotation (= 2 without : number); @Prop() readonly variant — enum prop should have explicit enum type (e.g., DS.ButtonVariant), not just string
2. @Prop() value — state prop missing reflect: true; @Prop() size — customizable prop should not have reflect: true
3. @Listen('click') onClick — rename to listenToClick
4. @Watch('value') onValueChange — rename to valueChanged
5. handleClick — not an arrow function
6. @Event() change — missing ds prefix → dsChange
7. Missing Loggable implementation
8. doSomething() — must be private
9. Missing section dividers: PUBLIC PROPERTY API, LIFECYCLE, PUBLIC LISTENERS, PUBLIC METHODS, EVENT HANDLERS, PRIVATE METHODS, RENDER
10. Missing JSDoc on @Prop() label, @Event() dsChange, @Method() open
11. Not in alphabetical order: value should come after name
12. @Watch('disabled') disabledChanged not immediately after @Prop() disabled
13. @Method() open — not async
14. Component tag missing ds- prefix or class name has ds prefix

Applying fixes...
Done. 14 violations fixed.
```

If no violations: `No style guide violations found in <file>.`

## References

Based on:

- [Stencil Style Guide](https://stenciljs.com/docs/style-guide)
- [Baloise Design System Component Guidelines](./CLAUDE.md)
