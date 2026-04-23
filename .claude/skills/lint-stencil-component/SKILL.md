---
name: lint-stencil-component
description: Use when asked to check, audit, review, or fix a Stencil component in the Baloise Design System against the component style guide — verifies and repairs props, event handlers, Watch handlers, Listen handlers, method visibility, event naming, and ComponentInterface/Loggable implementation
---

# Lint Stencil Component

Audits a Stencil `.tsx` component file against the design system style guide and fixes every violation found.

## Process

1. Read the target component file
2. Run every check below in order
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

## Quick Reference

| Decorator / Pattern   | Required form                           |
| --------------------- | --------------------------------------- |
| `@Prop()` (immutable) | `@Prop() readonly foo: T`               |
| `@Prop()` (boolean)   | `@Prop() readonly foo: boolean = false` |
| `@Listen('event')`    | `listenToEvent()`                       |
| `@Watch('prop')`      | `propChanged()`                         |
| DOM handler           | `handleEvent = () => {}`                |
| `@Event()`            | `dsEventName: EventEmitter<T>`          |
| Class implements      | `ComponentInterface, Loggable`          |
| Logger field          | `log!: LogInstance`                     |
| Regular methods       | `private methodName()`                  |

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

Applying fixes...
Done. 7 violations fixed.
```

If no violations: `No style guide violations found in <file>.`
