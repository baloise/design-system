---
name: lint-stencil-component
description: Use when asked to check, audit, review, or fix a Stencil component in the Baloise Design System against the design system style guide and Stencil best practices — verifies and repairs imports (@utils, @global aliases), props (readonly, type annotations on defaults, reflect attribute, enum types), lifecycle validation, event handlers, Watch handlers, Listen handlers, method visibility, event naming, ComponentInterface/Loggable implementation, section comment dividers, JSDocs, and code organization per Stencil style guide

# Lint Stencil Component

Audits a Stencil `.tsx` component file against the design system style guide and fixes every violation found.

## Process

1. Read the target component file
2. Run every check below in order (checks 0-15)
3. Report violations as a numbered list
4. Apply all fixes in a single Edit pass
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

### 1. `@Prop()` — readonly and type annotations

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

### 2. `@Prop()` — `reflect` attribute for state props

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

### 3. Property Validation — `validateProps()` method

**Rule:** Components with `@Prop()` values that need runtime validation must implement a `private validateProps()` method. This method is called from `connectedCallback()` and `componentWillUpdate()` to ensure props are valid after initial render and any updates.

**Available validation checkers** from `@utils/property-checkers/`:

- `checkEmptyOrType(component, 'prop', 'string'|'number'|'boolean'|'array')` — validates prop is either empty or matches type
- `checkEmptyOrOneOf(component, 'prop', ['option1', 'option2'])` — validates prop is empty or one of allowed values
- `checkEmptyOrPattern(component, 'prop', /regex/)` — validates prop is empty or matches regex
- `checkEmptyOrUrl(component, 'prop')` — validates prop is empty or valid URL
- `checkEmptyOrArrayOf(component, 'prop', 'string'|'number'|...)` — validates prop is empty or array of specified type
- `checkEmptyOrDate(component, 'prop')` — validates prop is empty or valid date
- `checkRequiredAndType(component, 'prop', 'string'|...)` — validates prop is required and matches type
- `checkRequiredAndOneOf(component, 'prop', [...])` — validates prop is required and one of allowed values
- `checkRequiredAndPattern(component, 'prop', /regex/)` — validates prop is required and matches pattern
- `checkIsoDate(component, 'prop')` — validates prop is ISO 8601 date format

```ts
// ❌ (no validation)
export class MyComponent implements ComponentInterface {
  @Prop() readonly label: string = ''
  @Prop() readonly size: 'sm' | 'md' | 'lg' = 'md'
  // No validation method
}

// ✅ (with validation)
import { checkEmptyOrType, checkEmptyOrOneOf } from '@utils'

export class MyComponent implements ComponentInterface {
  @Prop() readonly label: string = ''
  @Prop() readonly size: 'sm' | 'md' | 'lg' = 'md'

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
    checkEmptyOrOneOf(this, 'size', ['sm', 'md', 'lg'])
  }
}
```

**How to detect:**

- Find each `@Prop()` that should have runtime validation (typically string/enum props with default values)
- Check if `connectedCallback()` and `componentWillUpdate()` exist and call a `validateProps()` method
- Check if a `private validateProps()` method exists with appropriate checker calls
- Match each `@Prop()` that needs validation with the appropriate checker function

---

### 4. `@Listen()` — naming

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

### 5. `@Watch()` — naming

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

### 6. DOM event handlers — naming and arrow function

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

### 7. `@Event()` — `ds` prefix

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

### 8. `ComponentInterface` + `Loggable`

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

### 9. Method visibility — `private`

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

### 10. Section Comment Dividers

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

### 11. JSDocs — `@Prop()`, `@Event()`, `@Method()`

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

### 12. Alphabetical Order — `@Prop()`, `@State()`, `@Event()`

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

## Quick Reference

| Check | Required form                        | Example                                                                       |
| ----- | ------------------------------------ | ----------------------------------------------------------------------------- |
| 0     | Import from `@utils` or `@global`    | `import { Loggable, Logger, type LogInstance } from '@utils'`                 |
| 1     | `@Prop() readonly foo: T = default`  | `@Prop() readonly count: number = 2`; `@Prop() readonly align: DS.Align = ''` |
| 2     | State props have `reflect: true`     | `@Prop({ reflect: true }) readonly disabled: boolean`                         |
| 3     | `listenToEvent()`                    | `listenToClick()`                                                             |
| 4     | `propChanged()`                      | `valueChanged()`                                                              |
| 5     | `handleEvent = () => {}`             | `handleClick = () => {}`                                                      |
| 6     | `dsEventName: EventEmitter<T>`       | `dsChange: EventEmitter<number>`                                              |
| 7     | `ComponentInterface, Loggable`       | `implements ComponentInterface, Loggable`                                     |
| 8     | `private methodName()`               | `private doSomething()`                                                       |
| 9     | Seven section dividers               | See Check 9 for exact format                                                  |
| 10    | JSDoc on @Prop, @Event, @Method      | `/** Label text */ @Prop()`                                                   |
| 11    | Alphabetical ordering                | align, disabled, name (not name, disabled, align)                             |
| 12    | @Prop + @Watch together              | Prop immediately followed by Watch below                                      |
| 13    | @Method() must be async              | `@Method() async open(): Promise<void>`                                       |
| 14    | Tag with `ds-` prefix, class without | `@Component({ tag: 'ds-button' }) export class Button`                        |

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
