---
name: lint-stencil-component
description: Use when asked to check, audit, review, or fix a Stencil component in the Baloise Design System against the design system style guide and Stencil best practices — verifies and repairs props, event handlers, Watch handlers, Listen handlers, method visibility, event naming, ComponentInterface/Loggable implementation, section comment dividers, JSDocs, and code organization per Stencil style guide

# Lint Stencil Component

Audits a Stencil `.tsx` component file against the design system style guide and fixes every violation found.

## Process

1. Read the target component file
2. Run every check below in order (checks 1-13)
3. Report violations as a numbered list
4. Apply all fixes in a single Edit pass
5. Confirm what was changed

## Checks & Fixes

### 1. `@Prop()` — readonly and boolean type annotation

**Rule:** Every `@Prop()` that is never reassigned inside the class must be `readonly`.

```ts
// ❌
@Prop() label: string
// ✅
@Prop() readonly label: string
```

**How to detect:** `@Prop()` line without `readonly` keyword. Skip if the prop is assigned anywhere in the class body (e.g. inside a `@Watch` or method).

**Rule:** Every `@Prop() readonly` with a `true` or `false` default must have an explicit `: boolean` type annotation.

```ts
// ❌
@Prop() readonly disabled = false
@Prop({ reflect: true }) readonly required = true
// ✅
@Prop() readonly disabled: boolean = false
@Prop({ reflect: true }) readonly required: boolean = true
```

**How to detect:** `@Prop(…) readonly <name> = (true|false)` without `: boolean` before the `=`.

---

### 2. `@Listen()` — naming

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

### 3. `@Watch()` — naming

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

### 4. DOM event handlers — naming and arrow function

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

### 5. `@Event()` — `ds` prefix

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

### 6. `ComponentInterface` + `Loggable`

**Rule:** The class must implement both `ComponentInterface` and `Loggable`, and wire up the logger fields.

**Check for:**

- `implements ComponentInterface` (and `Loggable`)
- `log!: LogInstance` field
- `@Logger('ds-<tag>')` + `createLogger` method

**Fix:** Apply the full logger wiring (same as `add-component-logger` skill):

```ts
import { Loggable, Logger, LogInstance } from '../../utils/log'

export class MyComponent implements ComponentInterface, Loggable {
  log!: LogInstance

  @Logger('ds-my-component')
  createLogger(log: LogInstance) {
    this.log = log
  }
}
```

---

### 7. Method visibility — `private`

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

### 8. Section Comment Dividers

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
6. **PUBLIC LISTENERS** — `@ListenToBreakpoints()`, `@ListenToConfig()`, and other `@Listen()` methods (always named `listenTo*`)
7. **PUBLIC METHODS** — `@Method()` decorated methods
8. **EVENT HANDLERS** — DOM event handlers and click/interaction handlers (always named `handle*` as arrow functions)
9. **PRIVATE METHODS** — helper methods, state computations, utility functions
10. **RENDER** — `render()` method only

**How to detect:** Check if sections exist in the class body. Add missing dividers before the corresponding section.

---

### 9. JSDocs — `@Prop()`, `@Event()`, `@Method()`

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

### 10. Alphabetical Order — `@Prop()`, `@State()`, `@Event()`

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

### 11. `@Prop()` + `@Watch()` — Place Together

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

### 12. `@Method()` — Must be `async`

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

### 13. Component Tag — `ds-` Prefix

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

| Check | Required form                        | Example                                                |
| ----- | ------------------------------------ | ------------------------------------------------------ |
| 1     | `@Prop() readonly foo: T`            | `@Prop() readonly label: string`                       |
| 2     | `listenToEvent()`                    | `listenToClick()`                                      |
| 3     | `propChanged()`                      | `valueChanged()`                                       |
| 4     | `handleEvent = () => {}`             | `handleClick = () => {}`                               |
| 5     | `dsEventName: EventEmitter<T>`       | `dsChange: EventEmitter<number>`                       |
| 6     | `ComponentInterface, Loggable`       | `implements ComponentInterface, Loggable`              |
| 7     | `private methodName()`               | `private doSomething()`                                |
| 8     | Seven section dividers               | See Check 8 for exact format                           |
| 9     | JSDoc on @Prop, @Event, @Method      | `/** Label text */ @Prop()`                            |
| 10    | Alphabetical ordering                | align, disabled, name (not name, disabled, align)      |
| 11    | @Prop + @Watch together              | Prop immediately followed by Watch below               |
| 12    | @Method() must be async              | `@Method() async open(): Promise<void>`                |
| 13    | Tag with `ds-` prefix, class without | `@Component({ tag: 'ds-button' }) export class Button` |

## Output Format

Report violations before fixing:

```
Violations found in button.tsx:
1. @Prop() label — missing readonly
2. @Listen('click') onClick — rename to listenToClick
3. @Watch('value') onValueChange — rename to valueChanged
4. handleClick — not an arrow function
5. @Event() change — missing ds prefix → dsChange
6. Missing Loggable implementation
7. doSomething() — must be private
8. Missing section dividers: PUBLIC PROPERTY API, LIFECYCLE, PUBLIC LISTENERS, PUBLIC METHODS, EVENT HANDLERS, PRIVATE METHODS, RENDER
9. Missing JSDoc on @Prop() label, @Event() dsChange, @Method() open
10. Not in alphabetical order: value should come after name
11. @Watch('disabled') disabledChanged not immediately after @Prop() disabled
12. @Method() open — not async
13. Component tag missing ds- prefix or class name has ds prefix

Applying fixes...
Done. 13 violations fixed.
```

If no violations: `No style guide violations found in <file>.`

## References

Based on:

- [Stencil Style Guide](https://stenciljs.com/docs/style-guide)
- [Baloise Design System Component Guidelines](./CLAUDE.md)
