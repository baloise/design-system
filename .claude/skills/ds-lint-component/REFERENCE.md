# ds-lint-component Reference

Detailed rules and patterns for component linting.

## Divider Comment Format

### Structure

Each section divider is a JSDoc comment with:

1. Opening `/**`
2. Section name line: `   * SECTION_NAME`
3. Dash line: `   * ─────────────────────────────────────────────────────` (≈53 Unicode dashes)
4. Closing `   */`

```tsx
/**
 * PUBLIC PROPERTY API
 * ─────────────────────────────────────────────────────
 */
```

### Sections (In Order)

Only include sections that have content:

1. **PUBLIC PROPERTY API** — Contains `@Prop()` and `@Event()` declarations
2. **LIFECYCLE** — Contains lifecycle hooks: `connectedCallback()`, `componentWillLoad()`, `componentWillUpdate()`, `componentDidRender()`
3. **PUBLIC LISTENERS** — Contains `@Listen()` decorated methods
4. **PUBLIC METHODS** — Contains `@Method()` decorated public async methods
5. **EVENT HANDLERS** — Contains private event handlers and DOM event handlers (arrow functions or private methods with `handleX` naming)
6. **PRIVATE METHODS** — Contains other private helper methods
7. **RENDER** — Contains `render()` method

### Detection Logic

- **PUBLIC PROPERTY API** → Component has `@Prop()` or `@Event()` decorators
- **LIFECYCLE** → Component has `connectedCallback`, `componentWillLoad`, `componentWillUpdate`, or `componentDidRender` methods
- **PUBLIC LISTENERS** → Component has `@Listen()` decorated methods
- **PUBLIC METHODS** → Component has `@Method()` decorated methods
- **EVENT HANDLERS** → Component has private event handlers or DOM handlers
- **PRIVATE METHODS** → Component has other private methods (not event handlers)
- **RENDER** → Component has `render()` method (always present in Stencil)

---

## Prop Validation Rules

### Decorator Pattern

Every `@Prop()` must have a `@Validate*` decorator directly above it:

```tsx
@Prop()
@ValidateEmptyOrType('string')
readonly label: string = ''
```

### Validator Type Matching

Match the validator to the prop type:

| Prop Type  | Validator                                 | Condition                                                |
| ---------- | ----------------------------------------- | -------------------------------------------------------- |
| `string`   | `ValidateEmptyOrType('string')`           | Always                                                   |
| `number`   | `ValidateEmptyOrType('number')`           | Always                                                   |
| `boolean`  | `ValidateEmptyOrType('boolean')`          | Always                                                   |
| `EnumType` | `ValidateEmptyOrOneOf(...ENUM_CONST)`     | When optional (default is `''` or `undefined`)           |
| `EnumType` | `ValidateRequiredAndOneOf(...ENUM_CONST)` | **Only** when default is never empty (e.g., `'primary'`) |

### Type Matching Examples

**✅ Correct:**

```tsx
@Prop()
@ValidateEmptyOrType('string')
readonly name: string = ''

@Prop()
@ValidateEmptyOrOneOf(...BUTTON_SIZES)
readonly size: ButtonSize = ''

@Prop({ reflect: true })
@ValidateRequiredAndOneOf(...BUTTON_COLORS)
readonly color: ButtonColor = 'primary'  // default is never empty
```

**✗ Incorrect:**

```tsx
@Prop()
@ValidateEmptyOrType('boolean')  // ← type mismatch (prop is string)
readonly name: string = ''

@Prop()
@ValidateEmptyOrOneOf(...BUTTON_SIZES)
readonly text: string = ''  // ← validator doesn't match type (string, not enum)
```

### Finding Enum Constants

For enum props, parse the corresponding `.interfaces.ts` file:

**File:** `button.interfaces.ts`

```ts
export const BUTTON_COLORS = ['primary', 'secondary'] as const
export type ButtonColor = (typeof BUTTON_COLORS)[number]
```

**Usage in component:** Match `ButtonColor` type to `BUTTON_COLORS` const.

**Naming convention:** `TypeName` → `TYPE_NAMEs` (capitalized type becomes ALL_CAPS plural const).

### setupValidation() Calls

Every component with `@Prop()` decorators must call `setupValidation(this)` in:

1. `connectedCallback()` — Called when element is attached to DOM
2. `componentWillUpdate()` — Called before props update

```tsx
connectedCallback(): void {
  setupValidation(this)  // ← REQUIRED
  // other initialization
}

componentWillUpdate(): void {
  setupValidation(this)  // ← REQUIRED
  // other update logic
}
```

### Auto-Creating Lifecycle Hooks

If a component has `@Prop()` decorators but missing `connectedCallback()` or `componentWillUpdate()`:

- **Auto-create both hooks** with `setupValidation(this)` call
- Place in correct position (after PRIVATE PROPERTY API section, before other lifecycle methods or methods)
- Do **not** create if component has zero `@Prop()` declarations

---

## Validation Errors & Warnings

### Errors (Phase 1 always reports)

- Missing `@Validate*` decorator on `@Prop()`
- Missing `setupValidation(this)` in `connectedCallback()`
- Missing `setupValidation(this)` in `componentWillUpdate()`
- Validator type mismatch (e.g., `ValidateEmptyOrType('boolean')` on a string prop)
- Divider comment formatting incorrect or misplaced

### Warnings (Phase 1 reports but Phase 2 may skip)

- Complex prop type (union, object) cannot be automatically validated → requires manual review
- Enum prop missing matching const in `.interfaces.ts` → skips enum validation

### Edge Cases

**Union types:**

```tsx
@Prop()
readonly value: string | number = ''  // ← Cannot auto-validate
```

**Object types:**

```tsx
@Prop()
readonly config: SomeObject = {}  // ← Cannot auto-validate
```

**Missing interfaces file:**

```tsx
@Prop()
@ValidateEmptyOrOneOf(...BUTTON_SIZES)
readonly size: ButtonSize = ''  // ← If BUTTON_SIZES not found in interfaces.ts, warn
```

---

## Phase 2: Fix Operations

### Divider Comments

**Add missing:**

```tsx
// If component has @Listen() but no PUBLIC LISTENERS divider:
/**
 * PUBLIC LISTENERS
 * ─────────────────────────────────────────────────────
 */
```

**Fix formatting:**

- Correct dash count to ≈53 Unicode dashes
- Fix spacing/indentation
- Reorder sections if out of order

### Validators

**Add decorator:**

```tsx
// Before
@Prop()
readonly label: string = ''

// After
@Prop()
@ValidateEmptyOrType('string')
readonly label: string = ''
```

**Fix type mismatch:**

```tsx
// Before
@Prop()
@ValidateEmptyOrType('number')  // ← wrong type
readonly size: ButtonSize = ''

// After
@Prop()
@ValidateEmptyOrOneOf(...BUTTON_SIZES)
readonly size: ButtonSize = ''
```

### setupValidation() Calls

**Add missing calls:**

```tsx
// Before
connectedCallback(): void {
  // no setupValidation call
}

// After
connectedCallback(): void {
  setupValidation(this)
  // other logic
}
```

**Create missing lifecycle hooks:**

```tsx
// Before
@Component({ tag: 'ds-example', shadow: true })
export class Example {
  @Prop()
  @ValidateEmptyOrType('string')
  readonly label: string = ''

  render() {
    /* ... */
  }
}

// After
@Component({ tag: 'ds-example', shadow: true })
export class Example {
  @Prop()
  @ValidateEmptyOrType('string')
  readonly label: string = ''

  connectedCallback(): void {
    setupValidation(this)
  }

  componentWillUpdate(): void {
    setupValidation(this)
  }

  render() {
    /* ... */
  }
}
```

### Imports

When adding validators or `setupValidation`:

- Verify `@utils` import exists
- Add to existing import if already imported: `import { setupValidation, ValidateEmptyOrType, ... } from '@utils'`
- Do **not** create new imports; add to existing `@utils` import

---

## File Structure

### Component Discovery

Given component name (e.g., `button`), scan:

- `packages/core/src/components/<name>/<name>.tsx` — Main component
- `packages/core/src/components/<name>/**/*.tsx` — Sub-components (e.g., `carousel/carousel.tsx`, `carousel/carousel-item.tsx`)

### Interfaces File

For each `.tsx` file, look for corresponding `.interfaces.ts`:

- `button.tsx` → `button.interfaces.ts`
- `carousel/carousel.tsx` → `carousel/carousel.interfaces.ts`
- `carousel/carousel-item.tsx` → `carousel/carousel-item.interfaces.ts`

If missing, warn but continue with non-enum validation.

---

## Reporting Format

### Phase 1 Output (Check)

Report to terminal/Claude with tree structure:

```
component-name/
├─ component.tsx
│  ✓ Dividers: Present sections correctly ordered
│  ✓ Props: All N props have validators
│  ✓ setupValidation: Called in connectedCallback() and componentWillUpdate()
├─ sub-component.tsx
│  ⚠ Dividers: PUBLIC METHODS section missing (but @Method() present)
│  ✗ Props: "size" (ButtonSize) has ValidateEmptyOrType('string') — type mismatch
│  ✗ setupValidation: Missing from componentWillUpdate()
```

### Phase 2 Output (Fix)

Summary of changes:

```
✓ carousel/carousel.tsx
  • Added setupValidation() to componentWillUpdate()
  • Created connectedCallback() with setupValidation()

✓ carousel/carousel-item.tsx
  • Added PUBLIC LISTENERS divider comment
  • Fixed validator: "value" now ValidateEmptyOrType('string')
  • Added @ValidateEmptyOrOneOf(...) to "size" prop
```
